const express = require("express");
const extractDomainName = require("../Middleware/pageDomainMiddleware");
const dotenv = require("dotenv");
dotenv.config();



const app = express();



const { addDomain, getDomains, getDomain, deleteDomain, patchDomain } = require('../controllers/pagesDomainController');



app.post('/add/domain', extractDomainName, addDomain) // Needs a Request body { "domainName":"mot" } 
app.get('/list/domains',extractDomainName, getDomains)  // Needs a Request body domain Name
app.get('/list/domain', extractDomainName, getDomain)   // Needs a Request body domain Name
app.delete('/remove/domain',extractDomainName, deleteDomain) // Needs a Request body domain Name
app.patch('/update/domain',extractDomainName, patchDomain)



module.exports = app;