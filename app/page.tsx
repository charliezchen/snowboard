import Link from "next/link";
import { resorts } from "@/app/data/resorts";
import { regions, defaultRegion } from "@/app/data/regions";
import { PassComparison } from "@/app/components/PassComparison";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
              Ikon Base vs Ikon Pass
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Select your region and the resorts you plan to ski — we&apos;ll tell you which pass is actually worth it.
            </p>
          </div>
          <Link
            href="/forecast"
            className="inline-flex items-center gap-2 shrink-0 rounded-full bg-zinc-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Snow Forecast &rarr;
          </Link>
        </div>

        <PassComparison
          resorts={resorts}
          regions={regions}
          defaultRegionId={defaultRegion.id}
        />
      </div>
    </main>
  );
}
