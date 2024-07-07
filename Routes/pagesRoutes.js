const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const {startPage, listAllPages, removePage  } = require('../controllers/pagesController');


// --- 1 List all DNS Records ---- //
app.post('/create/pages', startPage);
app.get('/list/pages', listAllPages);
app.delete('/delete/pages', removePage);



module.exports = app