const sitemap = require('sitemap');

// Array de URLs do seu site
const urls = [
  { url: '/', changefreq: 'daily', priority: 0.7 },
  { url: '/noticias', changefreq: 'daily', priority: 0.7 },
  // Adicione mais URLs aqui conforme necessário
];

// Crie o sitemap
const sitemapObject = sitemap.createSitemap({
  hostname: 'https://seusite.com',
  cacheTime: 600000, // 600 segundos (10 minutos)
  urls,
});

module.exports = sitemapObject;
const sitemap = require('./sitemap'); // Importe o módulo de configuração do sitemap

// Função para adicionar uma nova URL ao sitemap
function adicionarNovaURL(url, changefreq, priority) {
  const novaURL = { url, changefreq, priority };
  sitemap.addURL(novaURL);
  sitemap.toFile('./sitemap.xml', (err, xml) => {
    if (err) {
      console.error('Erro ao salvar o sitemap:', err);
    } else {
      console.log('Sitemap atualizado com sucesso.');
    }
  });
}

// Exemplo de uso após adicionar um novo artigo
const novaURLDoArtigo = '/novo-artigo';
adicionarNovaURL(novaURLDoArtigo, 'daily', 0.7);
