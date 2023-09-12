const fs = require('fs');
const { create } = require('xmlbuilder2');

// Obtém as URLs das notícias de anime do seu banco de dados
const newsUrls = getNewsUrlsFromDatabase(); // Substitua por sua lógica real

// Crie um objeto XMLBuilder para construir o sitemap
const xml = create({ version: '1.0' }).ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

// Adicione cada URL das notícias ao sitemap
newsUrls.forEach((url) => {
  xml.ele('url').ele('loc', url).up().up();
});

// Converta o XMLBuilder em uma string XML
const sitemapXml = xml.end({ prettyPrint: true });

// Salve o sitemap.xml
fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');
