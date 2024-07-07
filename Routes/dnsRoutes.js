const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const { spinUp, spinDown, listAll } = require('../controllers/dnsController');


// --- 1 List all DNS Records ---- //
app.get('/api/listall', listAll);


// --- 2 Spin Up DNS Records ---- //
app.post('/api/spinup', spinUp);



// --- 3 Spin DOWN DNS Records ---- //
app.delete('/api/spindown', spinDown);
















module.exports = app
    