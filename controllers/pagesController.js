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
  async function startPage(req, res, next) {
    const { projectName, gitRepo } = req.pagesInfo;
    
    try {
      const result = await pages.createPages(accountId, projectName, projectOwner, gitRepo, branch);
      console.log(result);
  
      res.status(result.status).send({data: result.data})
   
     
    } catch (error) {
      console.error('Error creating Pages', error);
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }
  }
  // // List Cloudfare Pages
  async function listAllPages(req, res, next) {
    try {
      const {status, data} = await pages.getAllPages(accountId);
      
      console.log(status);
      const indexResult = data.result.map((result, index) => ({
         uniqueId: index++,
         ...result
        }));

      console.log('Page Created');
      res.status(status).send(indexResult)
    } catch (error) {
      console.error('Error listing CloudFlare Pages', error);
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }
  
    
  }
  // List a Cloudfare Page
  async function listPage(req, res, next) {
    const { projectName } = req.pagesInfo
    try {
      const {status, data} = await pages.getPage(projectName);

     
      
      console.log('Page Listed', data);
      res.status(status).send(data);
    } catch (error) {
      console.error('Error listing CloudFlare Pages', error);
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
    }  
  }
  
  // Delete pages
  async function removePage(req, res, next) {
  
    const { projectName } = req.pagesInfo
    try {
      let {status, data} = await pages.deletePages(accountId,projectName);

      
      console.log('Page Deleted', { data});
      if (status === 200) {
        data = `Deleted Successfully`
      }
      else {
        data = `Page Not Found`
      }
      res.status(status).send(data)
    } catch (error) {
      console.error('Error creating Pages', error);
      // res.status(500).send(`Error deleting CloudFlare Pages: ${error.message}`)
      error.status = 500; // Optionally set a custom status code on the error object
      next(error);
      
    }
  }
  

  module.exports = {startPage, listAllPages, removePage, listPage };