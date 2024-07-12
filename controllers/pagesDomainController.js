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
async function addDomain(req, res, next) {
    const {domainName, projectName } = req.pagesInfo
    try {
        console.log(accountId, projectName);
      let { status, data } = await domain.addDomain(accountId, projectName, domainName);
      // Api Error from CloudFlare. Delete success comes has 500 and Unknown error. Changed Status code to 200 & message also
      if (status === 500 && data.errors[0].code === 8000000) {
        status = 200;
        data.success = true;
        data.errors[0].message = `Domain Created Succesfully`
      } else {
      data.errors[0].message
      }
      res.status(status).send({data});
    } catch (error) {
      console.error('Error creating Pages', error);
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }
  
  }
 // 
  async function getDomains(req, res, next) {
    const { projectName } = req.pagesInfo
    try {
      const {status, data } = await domain.getDomains(accountId, projectName);

      res.status(status).send({data: data})
    } catch (error) {
      // console.error('Error creating Pages', error);
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }
  
  
  }
  async function getDomain(req, res, next) {
    const {domainName, projectName } = req.pagesInfo
    
    try {
      const {status, data } = await domain.getDomain(accountId, projectName, domainName);
      res.status(status).send({data: data})
    } catch (error) {
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }
  }

  async function deleteDomain(req, res, next) {
    const {domainName, projectName } = req.pagesInfo
    try {
      let {status, data} = await domain.deleteDomain(accountId, projectName, domainName);
     
     if (status === 500 && data.errors[0].code === 8000000) {
      status = 200
      data.errors[0].message = `Deleted Successfully`
    } 
      res.status(status).send({message: data.errors[0].message})
    } catch (error) {
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }
  
  
  }

  async function patchDomain(req, res, next) {
    const {domainName, projectName } = req.pagesInfo
    try {
      const {status, data} = await domain.patchDomain(accountId, projectName, domainName);
      res.status(status).send({message: 'Domain created successfully:', data: data})
    } catch (error) {
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }
  
  
  }

  module.exports = {addDomain, getDomains, getDomain, deleteDomain, patchDomain }