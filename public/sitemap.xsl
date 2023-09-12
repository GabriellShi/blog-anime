<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Define o estilo para o elemento raiz (urlset ou sitemapindex) -->
  <xsl:template match="/">
    <html>
      <head>
        <title>Seu Sitemap</title>
        <style>
          /* Adicione seu CSS personalizado aqui para estilizar o sitemap */
          /* Exemplo: */
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
          }
          /* Adicione mais estilos conforme necessário */
        </style>
      </head>
      <body>
        <!-- Renderiza o conteúdo do sitemap -->
        <h1>Seu Sitemap</h1>
        <table border="1">
          <tr>
            <th>URL</th>
            <th>Última Modificação</th>
            <th>Changefreq</th>
            <th>Prioridade</th>
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
      <td><xsl:value-of select="changefreq" /></td>
      <td><xsl:value-of select="priority" /></td>
    </tr>
  </xsl:template>

</xsl:stylesheet>
