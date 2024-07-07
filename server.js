const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = process.env.PORT || 2000;

// const {createDeploy } = require('./test');
const deployRoutes = require('./Routes/deploymentRoutes');
const dnsRoutes = require('./Routes/dnsRoutes');
const pagesRoutes = require('./Routes/pagesRoutes');



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))



// Routes for all dns Records
app.use('/dns', dnsRoutes)
app.use('/api', pagesRoutes)
app.use('/api', deployRoutes)







           
// Create a deployment
// app.post('/api/deployments', async (req, res) => {

//   try {
//      const response = await createDeploy();
//      res.status(200).send({message: "deployment initiation in progress", data: response});
//   } catch (error) {

//   }

// })

// Default Pages
app.use('/', (req, res) => {
    res.send('sign up complete')

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
