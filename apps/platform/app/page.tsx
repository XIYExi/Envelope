export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold tracking-tight">Envelope V3</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Full-stack lowcode project generation platform
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/inner"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Open Editor
        </a>
      </div>
    </main>
  );
}
