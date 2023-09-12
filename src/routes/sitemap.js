const express = require('express');
const router = express.Router();
const sitemap = require('./sitemap'); // Importe o módulo de configuração do sitemap

// Rota para gerar o sitemap
router.get('/gerar-sitemap', (req, res) => {
  res.header('Content-Type', 'application/xml');
  const xml = sitemap.toString();
  res.send(xml);
});

module.exports = router;
