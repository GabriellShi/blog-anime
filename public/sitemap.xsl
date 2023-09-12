<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Define o estilo para o elemento raiz (urlset ou sitemapindex) -->
  <xsl:template match="/">
    <html>
      <head>
        <title>Seu Sitemap</title>
        <style>
          /* Estilos CSS para o sitemap */
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <!-- Renderiza o conteúdo do sitemap -->
        <h1>Seu Sitemap</h1>
        <table>
          <tr>
            <th>URL</th>
            <th>Última Modificação</th>
          </tr>
          <xsl:apply-templates />
        </table>
      </body>
    </html>
  </xsl:template>

  <!-- Define o estilo para cada URL no sitemap -->
  <xsl:template match="url">
    <tr>
      <td><a href="{loc}"><xsl:value-of select="loc" /></a></td>
      <td><xsl:value-of select="lastmod" /></td>
    </tr>
  </xsl:template>

</xsl:stylesheet>
