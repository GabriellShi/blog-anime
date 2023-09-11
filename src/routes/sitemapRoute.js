// routes/sitemap.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const xmlbuilder = require('xmlbuilder');

router.get('/sitemap.xml', (req, res) => {

    
    // Crie um objeto XMLBuilder para o sitemap
    const root = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
    root.attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    
   
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
 
    
    
    <url>
      <loc>https://www.gogeekanimes.com/</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <priority>1.00</priority>
      <changefreq>daily</changefreq>
    </url>
    <url>
      <loc>https://www.gogeekanimes.com/Animes</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <priority>0.80</priority>
      <changefreq>daily</changefreq>
    </url>
    <url>
      <loc>https://www.gogeekanimes.com/Mangas</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://www.gogeekanimes.com/recomendas</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://www.gogeekanimes.com/calendario</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <priority>0.80</priority>
      <changefreq>daily</changefreq>
    </url>
    <url>
      <loc>https://www.gogeekanimes.com/curiosidade</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://www.gogeekanimes.com/temporadas</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://www.gogeekanimes.com/contato</loc>
      <lastmod>2023-09-09T08:31:09+00:00</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.80</priority>
    </url>

    </urlset>
    

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

    const detailsRecomenda = [
        {
          url: 'https://www.gogeekanimes.com/detailsRecomenda',
          lastmod: '2023-09-10',
          priority: '0.75',
          changefreq: 'daily',
        },
        // Adicione outras páginas dinâmicas aqui
      ];
      
      // Adicione as páginas dinâmicas de detalhes de notícias ao sitemap
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
    
    // Salve o sitemap em um arquivo
    fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');
    
    console.log('Sitemap gerado com sucesso!');
    
});

module.exports = router;