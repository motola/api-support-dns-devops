const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

const clients = {
    'ds.akinolaolutola.com': { name: 'ds', sitemap: '/sitemap-ds.xml' },
    'dc.akinolaolutola.com': { name: 'dc', sitemap: '/sitemap-dc.xml' }
};

console.log(clients);



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
