import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-mono text-sm text-green-400">404</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          This page took a wrong edge
        </h1>
        <p className="mt-4 max-w-md text-neutral-400">
          Even Dijkstra&apos;s algorithm could not find a path to it. Try one of
          these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-600"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="rounded-lg border border-white/15 px-5 py-2.5 hover:bg-white/5"
          >
            Features
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-white/15 px-5 py-2.5 hover:bg-white/5"
          >
            Blog
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
