const DeploymentAPI = require('../cloudFlareAPIs/deployPagesApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const owner = process.env.OWNER





// Making Pages Info Global for use

  
// Instantiate CloudFlareApis

const deployment = new DeploymentAPI(apiKey, email);

// Receive deployment initiated from Clients and send a response
async function createDeploy (req, res, next) {

    const {projectName } = req.pagesInfo;

    try {
     const {status, data}   = await deployment.createDeployment(accountId, projectName)
     console.log(data);
     res.status(status).send(data);
    }
    catch (error) {
        error.status = 500; // Optionally set a custom status code on the error object
        next(error);

    }

}
// Get deployment initiated from Clients and send a response
async function getDeploy (req,res, next) {
   const {projectName, deploymentId } = req.pagesInfo
   try {
    const {status, data}  = await deployment.getDeployment(accountId, projectName, deploymentId);
    res.status(status).send(data);

   }
   catch (error) {
    error.status = 500; // Optionally set a custom status code on the error object
    next(error);
   }
}
// Get deployment Info initiated from Clients and send a response
async function getDeployInfo (req,res, next) {
    try {
     const {projectName, deploymentId } = req.pagesInfo
     const{status, data}= await deployment.getDeploymentInfo(accountId, projectName,deploymentId);
     res.status(status).send(data);
 
    }
    catch (error) {
        error.status = 500; // Optionally set a custom status code on the error object
        next(error);
    }
 }
 // Get deployment Logs initiated from Clients and send a response
 async function getDeployLogs (req,res, next) {
    try {
     const {projectName, deploymentId } = req.pagesInfo
     const {status, data}= await deployment.getDeploymentLogs(accountId, projectName, deploymentId);
     res.status(status).send(data);
 
    }
    catch (error) {
        error.status = 500; // Optionally set a custom status code on the error object
        next(error);
    }
 }

 // Delete deployment  and send a response
 async function deleteDeploy (req,res,next) {
    try {
        const {projectName, deploymentId } = req.pagesInfo
     const {status, data} = await deployment.deleteDeployment(accountId, projectName, deploymentId);
     res.status(status).send(data);
 
    }
    catch (error) {
        error.status = 500; // Optionally set a custom status code on the error object
        next(error);
    }
 }
// Retry deployment initiated from Clients and send a response 
async function retryDeploy (req,res, next) {
    const {projectName, deploymentId } = req.pagesInfo
    try {
     const {status, data} = await deployment.retryDeployment(accountId, projectName, deploymentId);
     console.log(response);
     res.status(status).send(data);
 
    }
    catch (error) {
        error.status = 500; // Optionally set a custom status code on the error object
        next(error);
    }
 }


module.exports = {createDeploy, 
    getDeploy, 
    getDeployInfo, 
    getDeployLogs, 
    deleteDeploy,
    retryDeploy, 
}



