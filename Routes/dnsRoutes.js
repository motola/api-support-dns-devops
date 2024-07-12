const express = require('express');
const dotenv = require('dotenv');
const extractDnsRequest = require('../Middleware/dnsMiddleware');

dotenv.config();


const app = express();
const { spinUp, spinDown, listAll } = require('../controllers/dnsController');


// --- 1 List all DNS Records ---- //
app.get('/api/listall',extractDnsRequest, listAll);


// --- 2 Spin Up DNS Records ---- //
app.post('/api/spinup',extractDnsRequest, spinUp);



// --- 3 Spin DOWN DNS Records ---- //
app.delete('/api/spindown',extractDnsRequest, spinDown);















module.exports = app
    