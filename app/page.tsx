import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Bookmark, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RandomArticle } from "@/components/random-article"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <div className="container px-4 py-8 mx-auto flex-grow">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">Wiki</span>
            <span className="text-muted-foreground">Random</span>
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/history">
                <History className="w-5 h-5" />
                <span className="sr-only">History</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/bookmarks">
                <Bookmark className="w-5 h-5" />
                <span className="sr-only">Bookmarks</span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-gradient">
                  Discover the World of Knowledge
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore random Wikipedia articles and expand your horizons with each click.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="group">
                  Discover Random Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<ArticleSkeleton />}>
          <RandomArticle />
        </Suspense>
      </div>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "WikiRandom Explorer",
            url: "https://wiki.esubalew.et",
            description: "Discover random Wikipedia articles and expand your knowledge",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://wiki.esubalew.et/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  )
}

function ArticleSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 rounded-xl border bg-card p-6 shadow-sm animate-pulse">
      <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
      <div className="h-4 w-full bg-muted rounded mb-2"></div>
      <div className="h-4 w-full bg-muted rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-muted rounded"></div>
    </div>
  )
}

