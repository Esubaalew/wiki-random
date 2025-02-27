"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Bookmark, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface WikiArticle {
  title: string
  extract: string
  thumbnail?: {
    source: string
  }
  pageid: number
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<WikiArticle[]>([])

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("wikiBookmarks") || "[]")
    setBookmarks(savedBookmarks)
  }, [])

  const removeBookmark = (article: WikiArticle) => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.pageid !== article.pageid)
    localStorage.setItem("wikiBookmarks", JSON.stringify(newBookmarks))
    setBookmarks(newBookmarks)
    toast({
      title: "Bookmark removed",
      description: `"${article.title}" has been removed from your bookmarks.`,
    })
  }

  const clearBookmarks = () => {
    localStorage.setItem("wikiBookmarks", "[]")
    setBookmarks([])
    toast({
      title: "Bookmarks cleared",
      description: "All bookmarks have been removed.",
    })
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Bookmarks</h1>
        </div>
        {bookmarks.length > 0 && (
          <Button variant="destructive" size="sm" onClick={clearBookmarks}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't bookmarked any articles yet.</p>
          <Button className="mt-4" asChild>
            <Link href="/">Discover Articles</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((article) => (
            <Card key={article.pageid} className="overflow-hidden">
              {article.thumbnail && (
                <div className="relative w-full h-40">
                  <Image
                    src={article.thumbnail.source || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              )}
              <CardHeader className="p-4">
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">{article.extract}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => removeBookmark(article)}>
                  <Bookmark className="h-4 w-4 mr-2 fill-primary" />
                  Remove
                </Button>
                <Button variant="default" size="sm" asChild>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, "_"))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

