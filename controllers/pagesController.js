const PagesAPI = require('../cloudFlareAPIs/pagesApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;


// Instantiate CloudFlareApis
const pages = new PagesAPI(apiKey, email);


// Making Pages Info Global for use
const pagesInfo = {
    projectName : 'poiuhu',
    projectOwner: 'motola1',
    gitRepo: 'testprod',
    branch: 'main',
    deployment_id: 'a7b3ad54-1ab0-4604-926c-6f724bde3c5c'
    
  }
  
  
  
  // Create CloudFlare Pages
  async function startPage(req, res) {
    try {
      const result = await pages.createPages(accountId, pagesInfo.projectName, pagesInfo.projectOwner, pagesInfo.gitRepo, pagesInfo.branch);
      res.status(200).send({message: 'Pages created successfully:', data: result})
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error creating CloudFlare Pages: ${error.message}`)
    }
  
  
  }
  // List all pages
  async function listAllPages(req, res) {
    try {
      const result = await pages.getAllPages(accountId);
      
      console.log('Page Created', result);
      res.status(200).send(result)
    } catch (error) {
      console.error('Error listing CloudFlare Pages', error);
      res.status(500).send(`Error listing CloudFlare Pages: ${error.message}`)
    }
  
    
  }
  
  // Delete pages
  async function removePage(req, res) {
  
    const projectName = 'baked'
    try {
      const result = await pages.deletePages(accountId, projectName);
      
      console.log('Page Deleted', { result });
      res.status(200).send(`Project deleted successfully `)
    } catch (error) {
      console.error('Error creating Pages', error);
      res.status(500).send(`Error deleting CloudFlare Pages: ${error.message}`)
      
    }
  }
  

  module.exports = {startPage, listAllPages, removePage };