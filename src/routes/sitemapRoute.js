// routes/sitemap.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const xmlbuilder = require('xmlbuilder');

router.get('/sitemap.xml', (req, res) => {

    
    // Crie um objeto XMLBuilder para o sitemap
    const root = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
    root.attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    
    // Adicione as páginas principais ao sitemap (como você já fez)
    
    // Suponha que você tenha um array chamado "detalhesNoticias" com detalhes de notícias dinâmicas
    const detailsNews = [
      {
        url: 'https://www.gogeekanimes.com/detailsNews',
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
    
    // Converta o objeto XMLBuilder em uma string XML
    const sitemapXml = root.end({ pretty: true });
    
    // Salve o sitemap em um arquivo
    fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');
    
    console.log('Sitemap gerado com sucesso!');
    
});

module.exports = router;