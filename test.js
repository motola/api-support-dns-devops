
const DeploymentAPI = require('./cloudFlareAPIs/deployPagesApi');

const dotenv = require('dotenv');


dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;


// Instantiate CloudFlareApis

const deployment = new DeploymentAPI(apiKey, email);

// Making Pages Info Global for use
const pagesInfo = {
  projectName : 'fashiondev',
  projectOwner: 'motola1',
  gitRepo: 'blain',
  branch: 'main',
  deployment_id: 'a7b3ad54-1ab0-4604-926c-6f724bde3c5c'
  
}




// Create Deployment
async function createDeploy () {
  try {
    const result = await deployment.createDeployment(accountId, pagesInfo.projectName);
    
    console.log(result);
    return result;
  } catch (error){
    throw new Error(`Error deploying pages: ${error.message}`)
  }
}

//Get all deployments

async function getAllDeployment () {
  try {
    const result = await deployment.getDeployment(accountId, pagesInfo.projectName, pagesInfo.deployment_id);
    
    console.log(result);
    return result;
  } catch (error){
    throw new Error(`Error deploying pages: ${error.message}`)
  }

}




module.exports = { createDeploy, getAllDeployment };
