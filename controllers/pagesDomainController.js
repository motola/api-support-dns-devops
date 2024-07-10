const DomainAPI = require('../cloudFlareAPIs/pagesDomainApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;


// Instantiate CloudFlareApis
const domain = new DomainAPI(apiKey, email);


// Adds domain name to a CloudFlare Pages, if not done DNS Records wont work.
async function addDomain(req, res) {
    const {domainName, projectName } = req.pagesInfo
    try {
        console.log(accountId, projectName);
      const result = await domain.addDomain(accountId, projectName, domainName);
      console.log(result);
      res.status(200).send({message: 'Domain created successfully:', data: result})
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error creating CloudFlare Pages Domain: ${error.message}`)
    }
  
  }

  async function getDomains(req, res) {
    const { projectName } = req.pagesInfo
    try {
      const result = await domain.getDomains(accountId, projectName);
      res.status(200).send({message: 'Domain retrieved successfully:', data: result})
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error retrieving CloudFlare Pages Domain: ${error.message}`)
    }
  
  
  }
  async function getDomain(req, res) {
    const {domainName, projectName } = req.pagesInfo
    
    try {
      const result = await domain.getDomain(accountId, projectName, domainName);
      res.status(200).send({message: 'Domain retrieved successfully:', data: result})
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error retrieving CloudFlare Pages Domain: ${error.message}`)
    }
  }

  async function deleteDomain(req, res) {
    const {domainName, projectName } = req.pagesInfo
    try {
      const result = await domain.deleteDomain(accountId, projectName, domainName);
      res.status(200).send({message: 'Domain created successfully:', data: result})
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error creating CloudFlare Pages Domain: ${error.message}`)
    }
  
  
  }

  async function patchDomain(req, res) {
    const {domainName, projectName } = req.pagesInfo
    try {
      const result = await domain.patchDomain(accountId, projectName, domainName);
      res.status(200).send({message: 'Domain created successfully:', data: result})
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error creating CloudFlare Pages Domain: ${error.message}`)
    }
  
  
  }

  module.exports = {addDomain, getDomains, getDomain, deleteDomain, patchDomain }