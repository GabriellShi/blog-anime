// routes/sitemapIndexRoute.js

const express = require('express');
const router = express.Router();

router.get('/sitemap-index.xml', (req, res) => {
  // Lógica para criar o índice de sitemaps XML

  const sitemapIndexXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>https://www.gogeekanimes.com//sitemap-estatico.xml</loc>
      </sitemap>
      <sitemap>
        <loc>https://www.gogeekanimes.com//sitemap-dinamico.xml</loc>
      </sitemap>
    </sitemapindex>
  `;

  // Defina o tipo de conteúdo como XML na resposta
  res.header('Content-Type', 'application/xml');

  // Envie o índice de sitemaps como resposta
  res.send(sitemapIndexXml);
});

module.exports = router;
