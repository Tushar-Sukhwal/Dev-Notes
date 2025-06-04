import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { FullSlug } from "../../util/path"
import { BuildCtx } from "../../util/ctx"
import { ProcessedContent } from "../vfile"

interface SearchIndexOptions {
  enableSearchIndex: boolean
  enableSiteIndex: boolean
  maxIndexEntries?: number
}

const defaultOptions: SearchIndexOptions = {
  enableSearchIndex: true,
  enableSiteIndex: true,
  maxIndexEntries: 1000,
}

function generateSearchIndex(content: ProcessedContent[], cfg: any): string {
  const searchIndex = content
    .filter(([_, file]) => {
      const slug = file.data.slug!
      return !slug.endsWith("/index") && !slug.startsWith("tags/") && slug !== "404"
    })
    .map(([tree, file]) => ({
      id: file.data.slug,
      url: `/${file.data.slug}`,
      title: file.data.frontmatter?.title || file.data.slug,
      content: file.data.text || "",
      description: file.data.description || "",
      tags: file.data.frontmatter?.tags || [],
      date: file.data.dates?.modified?.toISOString() || new Date().toISOString(),
      wordCount: file.data.text ? file.data.text.split(/\s+/).length : 0,
      readingTime: Math.ceil((file.data.text?.split(/\s+/).length || 0) / 200),
    }))
    .slice(0, defaultOptions.maxIndexEntries)

  return JSON.stringify(
    {
      version: "1.0",
      generated: new Date().toISOString(),
      baseUrl: cfg.baseUrl,
      totalPages: searchIndex.length,
      pages: searchIndex,
    },
    null,
    2,
  )
}

function generateSiteIndex(content: ProcessedContent[], cfg: any): string {
  const pages = content
    .filter(([_, file]) => {
      const slug = file.data.slug!
      return !slug.endsWith("/index") && !slug.startsWith("tags/") && slug !== "404"
    })
    .map(([tree, file]) => {
      const slug = file.data.slug!
      return {
        url: `https://${cfg.baseUrl}/${slug}`,
        title: file.data.frontmatter?.title || slug,
        description: file.data.description || "",
        lastModified: file.data.dates?.modified?.toISOString() || new Date().toISOString(),
        tags: file.data.frontmatter?.tags || [],
        ampUrl: `https://${cfg.baseUrl}/${slug}/amp`,
      }
    })

  // Generate different categories
  const categories = {
    all: pages,
    recent: pages
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
      .slice(0, 50),
    byTags: {},
  }

  // Group by tags
  const tagGroups: { [key: string]: any[] } = {}
  pages.forEach((page) => {
    page.tags.forEach((tag: string) => {
      if (!tagGroups[tag]) tagGroups[tag] = []
      tagGroups[tag].push(page)
    })
  })
  ;(categories as any).byTags = tagGroups

  return JSON.stringify(
    {
      site: {
        name: cfg.pageTitle,
        url: `https://${cfg.baseUrl}`,
        description: `Digital notes and knowledge base`,
        language: cfg.locale,
      },
      generated: new Date().toISOString(),
      stats: {
        totalPages: pages.length,
        totalTags: Object.keys(tagGroups).length,
        lastUpdated: Math.max(...pages.map((p) => new Date(p.lastModified).getTime())),
      },
      categories,
    },
    null,
    2,
  )
}

export const SearchIndex: QuartzEmitterPlugin<Partial<SearchIndexOptions>> = (opts) => {
  const options = { ...defaultOptions, ...opts }

  return {
    name: "SearchIndex",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration

      if (options.enableSearchIndex) {
        // Generate enhanced search index
        yield write({
          ctx,
          content: generateSearchIndex(content, cfg),
          slug: "search-index" as FullSlug,
          ext: ".json",
        })
      }

      if (options.enableSiteIndex) {
        // Generate comprehensive site index
        yield write({
          ctx,
          content: generateSiteIndex(content, cfg),
          slug: "site-index" as FullSlug,
          ext: ".json",
        })
      }

      // Generate a simple page list for search engines
      const pageList = content
        .filter(([_, file]) => {
          const slug = file.data.slug!
          return !slug.endsWith("/index") && !slug.startsWith("tags/") && slug !== "404"
        })
        .map(([_, file]) => `https://${cfg.baseUrl}/${file.data.slug}`)
        .join("\n")

      yield write({
        ctx,
        content: pageList,
        slug: "pages" as FullSlug,
        ext: ".txt",
      })
    },
  }
}
