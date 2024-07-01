const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

const clients = {
    'dc.akinolaolutola.com': {
        name: 'dc',
        urls: [
            { loc: 'https://dc.akinolaolutola.com/', lastmod: '2024-06-25', changefreq: 'daily', priority: 1.0 },
            { loc: 'https://dc.akinolaolutola.com/about', lastmod: '2024-06-24', changefreq: 'monthly', priority: 0.8 }
        ]
    },
    'ds.akinolaolutola.com': {
        name: 'ds',
        urls: [
            { loc: 'https://ds.akinolaolutola.com/', lastmod: '2024-06-25', changefreq: 'daily', priority: 1.0 },
            { loc: 'https://ds.akinolaolutola.com/about', lastmod: '2024-06-24', changefreq: 'monthly', priority: 0.5 }
        ]
    }
};

const generateSitemap = (urls) => {
    const sitemapStart = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const sitemapEnd = `</urlset>`;

    const generateUrlEntry = (url) => `
<url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
</url>`;

    const sitemapContent = urls.map(generateUrlEntry).join('') + sitemapEnd;
    return sitemapStart + sitemapContent;
};

app.use((req, res, next) => {
    const host = req.headers.host.split(':')[0];
    req.clientInfo = clients[host];
    console.log(host, clients[host]);
    next();
});

app.get('/sitemap.xml', (req, res) => {
    const clientInfo = req.clientInfo;
    if (clientInfo) {
        res.sendFile(path.join(__dirname, clientInfo.sitemap));
    } else {
        res.status(404).send('Sitemap not found');
    }
});

app.listen(port, () => {
    console.log(`Node.js app listening at http://localhost:${port}`);
});
