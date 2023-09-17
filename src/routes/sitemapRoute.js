// routes.js

const express = require('express');
const router = express.Router();
const sitemapController = require('../controllers/sitemapController');

// Rota para gerar o sitemap.xml
router.get('/sitemap.xml', sitemapController.generateSitemap);

module.exports = router;
