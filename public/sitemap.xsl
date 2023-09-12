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
        <xsl:apply-templates />
      </body>
    </html>
  </xsl:template>

  <!-- Define o estilo para cada URL no sitemap -->
  <xsl:template match="url">
    <p>
      <strong>URL:</strong> <a href="{loc}">xxs<xsl:value-of select="loc" />ssss</a><br />
      <strong>Última Modificação:</strong> <xsl:value-of select="lastmod" /><br />
      <strong>Changefreq:</strong> <xsl:value-of select="changefreq" /><br />
      <strong>Prioridade:</strong> <xsl:value-of select="priority" /><br />
    </p>
  </xsl:template>

</xsl:stylesheet>
