import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import { ProcessedContent } from "../vfile"
import { FullSlug, joinSegments, pathToRoot, simplifySlug } from "../../util/path"
import { write } from "./helpers"
import { render } from "preact-render-to-string"
import { JSX } from "preact"
import { BuildCtx } from "../../util/ctx"
import { StaticResources } from "../../util/resources"
import { unescapeHTML } from "../../util/escape"
import { toHtml } from "hast-util-to-html"
import { Root } from "hast"

interface AMPOptions {
  enableAMP: boolean
  generateCanonicalAMP: boolean
}

const defaultOptions: AMPOptions = {
  enableAMP: true,
  generateCanonicalAMP: false,
}

// AMP-specific Head component
function AMPHead({ cfg, fileData, pageData }: any) {
  const title = fileData.frontmatter?.title ?? cfg.pageTitle
  const description = fileData.description ?? "AMP Page"
  const canonicalUrl = `https://${cfg.baseUrl}/${fileData.slug}`
  const ampUrl = `https://${cfg.baseUrl}/${fileData.slug}/amp`

  return (
    <head>
      <meta charSet="utf-8" />
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <meta name="description" content={description} />

      {/* AMP boilerplate CSS */}
      <style amp-boilerplate>
        {`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}
      </style>
      <noscript>
        <style amp-boilerplate>
          {`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}
        </style>
      </noscript>

      {/* Custom AMP CSS */}
      <style amp-custom>
        {`
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; }
          h1, h2, h3, h4, h5, h6 { color: #2c3e50; margin-top: 1.5em; margin-bottom: 0.5em; }
          h1 { font-size: 2em; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
          h2 { font-size: 1.5em; }
          h3 { font-size: 1.2em; }
          p { margin-bottom: 1em; }
          code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; }
          pre { background: #f8f8f8; padding: 15px; border-radius: 5px; overflow-x: auto; }
          pre code { background: none; padding: 0; }
          blockquote { border-left: 4px solid #3498db; margin: 0; padding-left: 20px; font-style: italic; color: #666; }
          .meta { color: #666; font-size: 0.9em; margin-bottom: 20px; }
          .tags { margin-top: 20px; }
          .tag { display: inline-block; background: #3498db; color: white; padding: 2px 8px; border-radius: 3px; font-size: 0.8em; margin-right: 5px; text-decoration: none; }
          .amp-notice { background: #e8f5e8; padding: 10px; border-radius: 5px; margin-bottom: 20px; font-size: 0.9em; }
          .back-link { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
          .back-link a { color: #3498db; text-decoration: none; }
          .back-link a:hover { text-decoration: underline; }
          amp-img { max-width: 100%; height: auto; }
        `}
      </style>

      {/* Structured data for AMP */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: description,
          url: ampUrl,
          mainEntityOfPage: canonicalUrl,
          author: {
            "@type": "Person",
            name: cfg.pageTitle.replace("'s Notes", "").replace(" Notes", ""),
          },
          publisher: {
            "@type": "Person",
            name: cfg.pageTitle.replace("'s Notes", "").replace(" Notes", ""),
          },
          datePublished: fileData.dates?.created?.toISOString(),
          dateModified: fileData.dates?.modified?.toISOString(),
        })}
      </script>
    </head>
  )
}

// Convert HTML content to AMP-compatible HTML
function convertToAMPContent(htmlContent: string): string {
  return (
    htmlContent
      // Replace img tags with amp-img
      .replace(/<img([^>]*?)src="([^"]*)"([^>]*?)>/g, (match, before, src, after) => {
        const width = before.match(/width="(\d+)"/) || after.match(/width="(\d+)"/)
        const height = before.match(/height="(\d+)"/) || after.match(/height="(\d+)"/)
        const alt = before.match(/alt="([^"]*)"/) || after.match(/alt="([^"]*)"/)

        const w = width ? width[1] : "800"
        const h = height ? height[1] : "600"
        const altText = alt ? alt[1] : ""

        return `<amp-img src="${src}" width="${w}" height="${h}" alt="${altText}" layout="responsive"></amp-img>`
      })
      // Remove style attributes (not allowed in AMP)
      .replace(/\s*style="[^"]*"/g, "")
      // Remove script tags (not allowed in AMP)
      .replace(/<script[^>]*>.*?<\/script>/gs, "")
      // Replace iframe with amp-iframe (if any)
      .replace(/<iframe([^>]*?)>/g, '<amp-iframe$1 sandbox="allow-scripts allow-same-origin">')
      .replace(/<\/iframe>/g, "</amp-iframe>")
      // Remove any onclick or other JS event handlers
      .replace(/\s*on\w+="[^"]*"/g, "")
  )
}

// AMP Body component
function AMPBody({ cfg, fileData, content }: any) {
  const ampContent = convertToAMPContent(content)
  const tags = fileData.frontmatter?.tags || []
  const canonicalUrl = `https://${cfg.baseUrl}/${fileData.slug}`

  return (
    <body>
      <div className="container">
        <div className="amp-notice">
          ⚡ This is the AMP version of this page. <a href={canonicalUrl}>View full version</a>
        </div>

        <h1>{fileData.frontmatter?.title || "Untitled"}</h1>

        {fileData.dates && (
          <div className="meta">
            Published: {fileData.dates.created?.toLocaleDateString()}
            {fileData.dates.modified &&
              ` | Updated: ${fileData.dates.modified.toLocaleDateString()}`}
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: ampContent }} />

        {tags.length > 0 && (
          <div className="tags">
            <strong>Tags: </strong>
            {tags.map((tag: string) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="back-link">
          <a href={canonicalUrl}>← Back to full version</a>
        </div>
      </div>
    </body>
  )
}

async function processAMPContent(ctx: BuildCtx, tree: Root, fileData: any, opts: AMPOptions) {
  const slug = fileData.slug!
  const cfg = ctx.cfg.configuration

  // Convert content to HTML
  const htmlContent = toHtml(tree as Root, { allowDangerousHtml: false })

  const ampSlug = `${slug}/amp` as FullSlug

  const ampPageData = {
    cfg,
    fileData,
    content: htmlContent,
  }

  const doc = (
    <html amp="">
      <AMPHead {...ampPageData} />
      <AMPBody {...ampPageData} />
    </html>
  )

  const content = "<!DOCTYPE html>\n" + render(doc)

  return write({
    ctx,
    content,
    slug: ampSlug,
    ext: ".html",
  })
}

export const AMPPages: QuartzEmitterPlugin<Partial<AMPOptions>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "AMPPages",
    async *emit(ctx, content, resources) {
      if (!opts.enableAMP) return

      for (const [tree, file] of content) {
        const slug = file.data.slug!

        // Skip certain pages
        if (slug.endsWith("/index") || slug.startsWith("tags/") || slug === "404") continue

        // Only generate AMP for content pages
        if (file.data.frontmatter && file.data.text) {
          yield processAMPContent(ctx, tree, file.data, opts)
        }
      }
    },
  }
}
