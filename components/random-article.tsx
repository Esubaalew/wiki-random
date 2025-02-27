"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Bookmark, ExternalLink, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface WikiArticle {
  title: string
  extract: string
  thumbnail?: {
    source: string
  }
  pageid: number
}

export function RandomArticle() {
  const [article, setArticle] = useState<WikiArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const fetchRandomArticle = useCallback(async () => {
    setIsLoading(true)
    try {
      // Fetch random article title
      const randomRes = await fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*",
      )
      const randomData = await randomRes.json()
      const title = randomData.query.random[0].title

      // Fetch article content
      const articleRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&pithumbsize=800&format=json&origin=*&titles=${encodeURIComponent(
          title,
        )}`,
      )
      const articleData = await articleRes.json()
      const page = Object.values(articleData.query.pages)[0] as WikiArticle

      setArticle(page)

      // Save to history
      const history = JSON.parse(localStorage.getItem("wikiHistory") || "[]")
      const newHistory = [page, ...history].slice(0, 20) // Keep only 20 most recent
      localStorage.setItem("wikiHistory", JSON.stringify(newHistory))

      // Check if bookmarked
      const bookmarks = JSON.parse(localStorage.getItem("wikiBookmarks") || "[]")
      setIsBookmarked(bookmarks.some((bookmark: WikiArticle) => bookmark.pageid === page.pageid))
    } catch (error) {
      console.error("Error fetching article:", error)
      toast({
        title: "Error",
        description: "Failed to fetch article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const toggleBookmark = () => {
    if (!article) return

    const bookmarks = JSON.parse(localStorage.getItem("wikiBookmarks") || "[]")

    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((bookmark: WikiArticle) => bookmark.pageid !== article.pageid)
      localStorage.setItem("wikiBookmarks", JSON.stringify(newBookmarks))
      setIsBookmarked(false)
      toast({
        title: "Removed from bookmarks",
        description: `"${article.title}" has been removed from your bookmarks.`,
      })
    } else {
      const newBookmarks = [article, ...bookmarks]
      localStorage.setItem("wikiBookmarks", JSON.stringify(newBookmarks))
      setIsBookmarked(true)
      toast({
        title: "Bookmarked!",
        description: `"${article.title}" has been added to your bookmarks.`,
      })
    }
  }

  const shareArticle = () => {
    if (!article) return

    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, "_"))}`

    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.extract.substring(0, 100) + "...",
          url: url,
        })
        .catch(console.error)
    } else {
      navigator.clipboard.writeText(url)
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      })
    }
  }

  useEffect(() => {
    fetchRandomArticle()
  }, [fetchRandomArticle])

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <Card
        className={cn(
          "border-none shadow-lg overflow-hidden transition-all duration-500",
          "bg-gradient-to-br from-card/50 to-card via-background/80",
          "hover:shadow-xl hover:from-card/60 hover:to-card/90",
          isLoading ? "opacity-80" : "opacity-100",
        )}
      >
        {isLoading ? (
          <CardContent className="p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        ) : article ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold">{article.title}</CardTitle>
            </CardHeader>
            {article.thumbnail && (
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={article.thumbnail.source || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">{article.extract}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-6 pt-0">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={toggleBookmark}>
                  <Bookmark className={cn("h-4 w-4", isBookmarked ? "fill-primary" : "")} />
                  <span className="sr-only">{isBookmarked ? "Remove bookmark" : "Bookmark"}</span>
                </Button>
                <Button variant="outline" size="icon" onClick={shareArticle}>
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={fetchRandomArticle}>
                  Next Article
                </Button>
                <Button variant="default" asChild>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, "_"))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read on Wikipedia
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardFooter>
          </>
        ) : (
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Failed to load article. Please try again.</p>
            <Button className="mx-auto mt-4 block" onClick={fetchRandomArticle}>
              Try Again
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

