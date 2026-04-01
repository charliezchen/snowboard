export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          Ikon Base vs Ikon Pass
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
          Find out which Ikon pass is right for your season — without the
          spreadsheet.
        </p>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <p className="text-blue-900 dark:text-blue-100 font-medium">
            For most NYC-area skiers, Ikon Base is enough. We&apos;ll tell you
            exactly when it isn&apos;t.
          </p>
        </div>
        {/* Comparison and recommendation UI built in later tasks */}
        <p className="text-zinc-400 text-sm">
          Region: New York City (default) — region selector coming soon
        </p>
      </div>
    </main>
  );
}
