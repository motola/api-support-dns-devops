const express = require('express');
const dotenv = require('dotenv');
const extractDeployRequest = require('../Middleware/deployMiddleware');
dotenv.config();


const app = express();
const { createDeploy, getDeploy, getDeployInfo, getDeployLogs, deleteDeploy, retryDeploy } = require('../controllers/deployController');



app.post('/create/deploy',extractDeployRequest, createDeploy);
app.get('/deployment',extractDeployRequest, getDeploy)
app.get('/deploy/info',extractDeployRequest, getDeployInfo)
app.get('/deploy/logs',extractDeployRequest, getDeployLogs)
app.delete('/delete/deploy',extractDeployRequest, deleteDeploy)
app.post('/retry/deploy',extractDeployRequest, retryDeploy)


module.exports = app