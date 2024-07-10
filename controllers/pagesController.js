const PagesAPI = require('../cloudFlareAPIs/pagesApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const projectOwner = process.env.OWNER
const branch = process.env.BRANCH


// Instantiate CloudFlareApis
const pages = new PagesAPI(apiKey, email, accountId);


  // Create CloudFlare Pages
  async function startPage(req, res) {
    const {projectName, gitRepo } = req.pagesInfo;
    
    try {
      const result = await pages.createPages(accountId, projectName, projectOwner, gitRepo, branch);
      console.log(result);
      res.status(200).send({message: 'Pages created successfully:', data: result})
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error creating CloudFlare Pages: ${error.message}`)
    }
  
  
  }
  // // List Cloudfare Pages
  async function listAllPages(req, res) {
    try {
      const results = await pages.getAllPages(accountId);
      
      
      const indexResult = results.result.map((result, index) => ({
         uniqueId: index++,
         ...result
        }));
      console.log('Page Created', indexResult);
      res.status(200).send(indexResult)
    } catch (error) {
      console.error('Error listing CloudFlare Pages', error);
      res.status(500).send(`Error listing CloudFlare Pages: ${error.message}`)
    }
  
    
  }
  // List a Cloudfare Page
  async function listPage(req, res) {
    const { projectName } = req.pagesInfo
    try {
      const result = await pages.getPage(projectName);
      
      console.log('Page Created', result);
      res.status(200).send(result)
    } catch (error) {
      console.error('Error listing CloudFlare Pages', error);
      res.status(500).send(`Error listing CloudFlare Pages: ${error.message}`)
    }  
  }
  
  // Delete pages
  async function removePage(req, res) {
  
    const { projectName } = req.pagesInfo
    try {
      const result = await pages.deletePages(accountId,projectName);
      
      console.log('Page Deleted', { result });
      res.status(200).send(`Project deleted successfully `)
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error deleting CloudFlare Pages: ${error.message}`)
      
    }
  }
  

  module.exports = {startPage, listAllPages, removePage, listPage };