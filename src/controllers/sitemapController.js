// sitemapController.js

const Sitemap = require('sitemap');

const generateSitemap = (req, res) => {
  // Crie uma lista de URLs do seu site aqui. Pode ser obtida a partir das rotas ou do banco de dados.
  const urls = [
    { url: '/', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    // Adicione mais URLs conforme necessário
  ];

  const sitemap = Sitemap.createSitemap({
    hostname: 'https://www.gogeekanimes.com/', // Substitua pelo seu domínio
    urls,
  });

  sitemap.toXML((err, xml) => {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
};

module.exports = {
  generateSitemap,
};
