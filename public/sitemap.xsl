<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="tr">
      <head>
        <title>Sitemap — toko.com.tr</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a2e; background: #fefcf9; }
          .header { background: linear-gradient(135deg, #0a5c5f, #0d7377, #0f8a8e); color: #fff; padding: 2rem; }
          .header h1 { font-size: 1.5rem; font-weight: 700; }
          .header p { margin-top: .5rem; opacity: .8; font-size: .9rem; }
          .container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
          .count { background: #fff; border: 1px solid #e5e5e5; border-radius: .5rem; padding: 1rem 1.5rem; margin-bottom: 1.5rem; font-size: .9rem; color: #666; }
          .count strong { color: #0d7377; }
          table { width: 100%; border-collapse: collapse; background: #fff; border-radius: .5rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
          th { background: #f8f8f8; text-align: left; padding: .75rem 1rem; font-size: .75rem; text-transform: uppercase; letter-spacing: .05em; color: #666; border-bottom: 2px solid #e5e5e5; }
          td { padding: .6rem 1rem; border-bottom: 1px solid #f0f0f0; font-size: .85rem; }
          tr:hover td { background: #f9fffe; }
          td a { color: #0d7377; text-decoration: none; }
          td a:hover { text-decoration: underline; }
          .priority { display: inline-block; padding: .15rem .5rem; border-radius: .25rem; font-size: .75rem; font-weight: 600; }
          .p-high { background: #dcfce7; color: #166534; }
          .p-med { background: #fef9c3; color: #854d0e; }
          .p-low { background: #f3f4f6; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Toko Trading — XML Sitemap</h1>
          <p>Bu sitemap arama motorları tarafından kullanılmaktadır.</p>
        </div>
        <div class="container">
          <div class="count">
            Toplam <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URL listelenmektedir.
          </div>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Öncelik</th>
                <th>Güncelleme</th>
                <th>Son Değişiklik</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                <tr>
                  <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                  <td>
                    <xsl:variable name="p" select="sitemap:priority"/>
                    <xsl:choose>
                      <xsl:when test="$p &gt;= 0.8">
                        <span class="priority p-high"><xsl:value-of select="$p"/></span>
                      </xsl:when>
                      <xsl:when test="$p &gt;= 0.6">
                        <span class="priority p-med"><xsl:value-of select="$p"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority p-low"><xsl:value-of select="$p"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
