const express = require('express');
const dotenv = require('dotenv');
const extractPagesRequest = require('../Middleware/pagesMiddleware');

dotenv.config();


const app = express();
const {startPage, listAllPages, removePage, listPage  } = require('../controllers/pagesController');


// --- 1 List all DNS Records ---- //
app.post('/create/pages',extractPagesRequest, startPage);
app.get('/list/pages', listAllPages);
app.get('/list/page',extractPagesRequest, listPage);
app.delete('/delete/pages',extractPagesRequest, removePage);


module.exports = app