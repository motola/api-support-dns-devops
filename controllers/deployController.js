const DeploymentAPI = require('../cloudFlareAPIs/deployPagesApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;





// Making Pages Info Global for use
const pagesInfo = {
    projectName : 'poiuhu',
    projectOwner: 'motola1',
    gitRepo: 'blain',
    branch: 'main',
    deploymentId: 'c3d90af1-4b83-448a-8e43-392c1d104e96'
    
  }
  
// Instantiate CloudFlareApis

const deployment = new DeploymentAPI(apiKey, email);

// Receive deployment initiated from Clients and send a response
async function createDeploy (req, res) {

    try {
     const response = await deployment.createDeployment(accountId, pagesInfo.projectName)
     console.log(response);
     res.status(200).send({message: "Page Created Successfully", data: response});
    }
    catch (error) {
        console.log(error);
        res.status(200).send(`Pages Deployment Issues: ${error.message}`)

    }

}
// Get deployment initiated from Clients and send a response
async function getDeploy (req,res) {
   const {projectName, deploymentId } = pagesInfo
   try {
    const response = await deployment.getDeployment(accountId, projectName, deploymentId);
    console.log(response);
    res.status(500).send({message: "Deployment retrieved Sucessfully", data: response});

   }
   catch (error) {
    res.status(500).send(`Error Retrieving Deployment: ${error.message}`)
   }
}
// Get deployment Info initiated from Clients and send a response
async function getDeployInfo (req,res) {
    try {
     const response = await deployment.getDeploymentInfo(accountId, pagesInfo.projectName, pagesInfo.deploymentId);
     console.log(response);
     res.status(500).send({message: "Deployment Information retrieved Sucessfully", data: response});
 
    }
    catch (error) {
     res.status(500).send(`Error Retrieving Deployment Info: ${error.message}`)
    }
 }
 // Get deployment Logs initiated from Clients and send a response
 async function getDeployLogs (req,res) {
    try {
     const response = await deployment.getDeploymentLogs(accountId, pagesInfo.projectName, pagesInfo.deploymentId);
     console.log(response);
     res.status(500).send({message: "Deployment Logs retrieved Sucessfully", data: response});
 
    }
    catch (error) {
     res.status(500).send(`Error Retrieving Deployment Logs: ${error.message}`)
    }
 }

 // Delete deployment  and send a response
 async function deleteDeploy (req,res) {
    try {
     const response = await deployment.deleteDeployment(accountId, pagesInfo.projectName, pagesInfo.deploymentId);
     console.log(response);
     res.status(500).send({message: "Deployment deleted Sucessfully", data: response});
 
    }
    catch (error) {
     res.status(500).send(`Error deleting Deployment: ${error.message}`)
    }
 }
// Retry deployment initiated from Clients and send a response 
async function retryDeploy (req,res) {
    try {
     const response = await deployment.retryDeployment(accountId, pagesInfo.projectName, pagesInfo.deploymentId);
     console.log(response);
     res.status(500).send({message: "Retrying Deployment Initiation", data: response});
 
    }
    catch (error) {
     res.status(500).send(`Error Retrying Deployment: ${error.message}`)
    }
 }


module.exports = {createDeploy, 
    getDeploy, 
    getDeployInfo, 
    getDeployLogs, 
    deleteDeploy,
    retryDeploy, 
}



