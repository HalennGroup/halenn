export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-5xl border-t border-[var(--border)] py-10 sm:py-14">
        <div className="flex flex-col gap-16 sm:gap-24">
          <header className="flex items-center justify-between gap-6">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase">
              Halenn
            </p>
            <p className="text-sm text-[var(--muted)]">Amsterdam</p>
          </header>

          <div className="max-w-3xl">
            <p className="mb-5 text-sm text-[var(--muted)]">Website in development</p>
            <h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Building enduring digital businesses.
            </h1>
          </div>

          <footer className="flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>Halenn is the parent company of Aevell.</p>
            <p>© {new Date().getFullYear()} Halenn</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
