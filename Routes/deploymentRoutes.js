const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const { createDeploy, getDeploy, getDeployInfo, getDeployLogs, deleteDeploy, retryDeploy } = require('../controllers/deployController');



app.post('/create/deploy', createDeploy);
app.get('/deployment', getDeploy)
app.get('/deploy/info', getDeployInfo)
app.get('/deploy/logs', getDeployLogs)
app.delete('/delete/deploy', deleteDeploy)
app.post('/retry/deploy', retryDeploy)


module.exports = app