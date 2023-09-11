// routes/staticSitemapRoute.js

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/sitemap.xml', (req, res) => {
  // Lógica para criar o sitemap XML estático
  const sitemapXml = fs.readFileSync('../public/sitemap.xml', 'utf8');

  // Defina o tipo de conteúdo como XML na resposta
  res.header('Content-Type', 'application/xml');

  // Envie o sitemap como resposta
  res.send(sitemapXml);
});

module.exports = router;
