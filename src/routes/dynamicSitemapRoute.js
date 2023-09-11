// routes/sitemap.js

const express = require('express');
const router = express.Router();
const xmlbuilder = require('xmlbuilder');

router.get('/sitemap.xml', (req, res) => {
  // Crie um objeto XMLBuilder para o sitemap
  const root = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
  root.attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  // Suponha que você tenha arrays com as URLs das páginas dinâmicas
  const detailsNews = [
    {
      url: 'https://www.gogeekanimes.com/detailsNews',
      lastmod: '2023-09-10',
      priority: '0.75',
      changefreq: 'daily',
    },
    // Adicione outras páginas dinâmicas aqui
  ];

  const detailsRecomenda = [
    {
      url: 'https://www.gogeekanimes.com/detailsRecomenda',
      lastmod: '2023-09-10',
      priority: '0.75',
      changefreq: 'daily',
    },
    // Adicione outras páginas dinâmicas aqui
  ];

  const detailsTemporada = [
    {
      url: 'https://www.gogeekanimes.com/detailsTemporada',
      lastmod: '2023-09-10',
      priority: '0.75',
      changefreq: 'daily',
    },
    // Adicione outras páginas dinâmicas aqui
  ];

  // Adicione as páginas dinâmicas de detalhes de notícias ao sitemap
  detailsNews.forEach((details) => {
    root.ele('url')
      .ele('loc', details.url)
      .up()
      .ele('lastmod', details.lastmod)
      .up()
      .ele('priority', details.priority)
      .up()
      .ele('changefreq', details.changefreq)
      .up();
  });

  // Adicione as páginas dinâmicas de detalhes de recomendações ao sitemap
  detailsRecomenda.forEach((details) => {
    root.ele('url')
      .ele('loc', details.url)
      .up()
      .ele('lastmod', details.lastmod)
      .up()
      .ele('priority', details.priority)
      .up()
      .ele('changefreq', details.changefreq)
      .up();
  });

  // Adicione as páginas dinâmicas de detalhes de temporada ao sitemap
  detailsTemporada.forEach((details) => {
    root.ele('url')
      .ele('loc', details.url)
      .up()
      .ele('lastmod', details.lastmod)
      .up()
      .ele('priority', details.priority)
      .up()
      .ele('changefreq', details.changefreq)
      .up();
  });

  // Converta o objeto XMLBuilder em uma string XML
  const sitemapXml = root.end({ pretty: true });

  // Defina o tipo de conteúdo como XML na resposta
  res.header('Content-Type', 'application/xml');
  
  // Envie o sitemap como resposta
  res.send(sitemapXml);
});

module.exports = router;
