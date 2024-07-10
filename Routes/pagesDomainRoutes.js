const express = require("express");
const extractDomainName = require("../Middleware/pageDomainMiddleware");
const dotenv = require("dotenv");
dotenv.config();



const app = express();



const { addDomain, getDomains, getDomain, deleteDomain, patchDomain } = require('../controllers/pagesDomainController');



app.post('/add/domain', extractDomainName, addDomain)
app.get('/list/domains',extractDomainName, getDomains)
app.get('/list/domain', extractDomainName, getDomain)
app.delete('/remove/domain',extractDomainName, deleteDomain)
app.patch('/update/domain',extractDomainName, patchDomain)



module.exports = app;