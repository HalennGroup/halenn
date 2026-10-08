"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type LatestVersion = {
  build: string;
  deployment?: string | null;
  checkedAt?: number;
};

type UpdateState = {
  latest: string;
  missed: number;
};

function shortVersion(value: string) {
  if (!value) return "unknown";
  return value.length > 8 ? value.slice(0, 8) : value;
}

function UpdateMark() {
  return (
    <img
      className="deployment-update-mark"
      src="/halenn-mark-cinematic.webp"
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}

export default function DeploymentUpdateGate({
  currentBuild,
}: {
  currentBuild: string;
}) {
  const [update, setUpdate] = useState<UpdateState | null>(null);
  const detectedBuilds = useRef<Set<string>>(new Set());
  const inFlight = useRef(false);

  const checkForUpdate = useCallback(async () => {
    if (
      inFlight.current ||
      !currentBuild ||
      currentBuild === "local" ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    inFlight.current = true;

    try {
      const response = await fetch(`/api/version?ts=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          "X-Halenn-Version-Check": "1",
        },
      });

      if (!response.ok) return;

      const latest = (await response.json()) as LatestVersion;

      if (!latest.build || latest.build === currentBuild) return;

      if (!detectedBuilds.current.has(latest.build)) {
        detectedBuilds.current.add(latest.build);
        setUpdate((previous) => ({
          latest: latest.build,
          missed: previous ? previous.missed + 1 : 1,
        }));
      } else {
        setUpdate((previous) =>
          previous
            ? { ...previous, latest: latest.build }
            : { latest: latest.build, missed: 1 }
        );
      }
    } catch {
      // Version checks should never interrupt the current site.
    } finally {
      inFlight.current = false;
    }
  }, [currentBuild]);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has("__halenn_update")) {
      url.searchParams.delete("__halenn_update");
      window.history.replaceState(
        null,
        "",
        `${url.pathname}${url.search}${url.hash}`
      );
    }

    const initialCheck = window.setTimeout(checkForUpdate, 12_000);
    const interval = window.setInterval(checkForUpdate, 60_000);

    const handleFocus = () => {
      void checkForUpdate();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void checkForUpdate();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearTimeout(initialCheck);
      window.clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [checkForUpdate]);

  useEffect(() => {
    if (!update) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [update]);

  const refreshToLatest = () => {
    if (!update) return;

    const url = new URL(window.location.href);
    url.searchParams.set("__halenn_update", shortVersion(update.latest));
    window.location.replace(url.toString());
  };

  if (!update) return null;

  return (
    <div className="deployment-update-overlay" role="presentation">
      <div
        className="deployment-update-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deployment-update-title"
        aria-describedby="deployment-update-description"
      >
        <div className="deployment-update-card-glow" aria-hidden="true" />

        <div className="deployment-update-top">
          <div className="deployment-update-status">
            <span className="deployment-update-status-dot" />
            New deployment detected
          </div>

          <div className="deployment-update-count">
            <strong>{update.missed}</strong>
            <span>{update.missed === 1 ? "update missed" : "updates missed"}</span>
          </div>
        </div>

        <div className="deployment-update-brand" aria-hidden="true">
          <UpdateMark />
        </div>

        <h2 id="deployment-update-title">
          Halenn just got <span>newer.</span>
        </h2>

        <p id="deployment-update-description">
          A newer production build is live while this tab is still running an
          older version. Refresh once to move onto the latest Halenn experience.
        </p>

        <div className="deployment-update-version">
          <div className="deployment-update-version-labels">
            <span>Version change</span>
            <span>Ready to refresh</span>
          </div>

          <div className="deployment-update-version-line">
            <span />
          </div>

          <div className="deployment-update-hashes">
            <code>{shortVersion(currentBuild)}</code>
            <code>{shortVersion(update.latest)}</code>
          </div>
        </div>

        <button
          type="button"
          className="deployment-update-button"
          onClick={refreshToLatest}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M15.7 7.2A6 6 0 1 0 16 11" />
            <path d="M15.7 3.8v3.4h-3.4" />
          </svg>
          Refresh to latest version
        </button>

        <p className="deployment-update-note">
          <span />
          This prompt stays until you explicitly load the update.
        </p>
      </div>
    </div>
  );
}
