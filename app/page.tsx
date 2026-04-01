import { resorts } from "@/app/data/resorts";
import { regions, defaultRegion } from "@/app/data/regions";
import { PassComparison } from "@/app/components/PassComparison";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            Ikon Base vs Ikon Pass
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Select your region and the resorts you plan to ski — we&apos;ll tell you which pass is actually worth it.
          </p>
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
