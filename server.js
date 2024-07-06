const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = process.env.PORT || 2000;

const { startPage, listAllPages, removePage, createDeploy } = require('./spinup');
const dnsRoutes = require('./Routes/dnsRoutes');



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))



// Routes for all dns Records
app.use('/dns', dnsRoutes)


/// Create a Cloud Fare Page
app.post('/create/pages', async (req, res) => {
  try {
  
 const resAe = await startPage();
 res.status(200).send({message: 'Pages created successfully:', data: resAe});
  } catch (error) {
    res.status(500).send(`Create Pages failed: ${error.message}`);
  }
})


/// get All CloudFare Pages
app.get('/list/pages', async (req, res) => {
  try {
 const response = await listAllPages();
 console.log(res);
 const data = response.result.map((page, index) => ({
  index: index + 1,
  ...page
 }));
 res.status(200).send({message: 'Pages listed successfully:', data: data});
  } catch (error) {
    res.status(500).send(`List Pages failed: ${error.message}`);
  }
})
// Delete a page
app.delete('/delete/page', async (req, res) => {
  try {
 const response = await removePage();
 console.log(response);
 
 res.status(200).send({message: 'Project deleted successfully:'});
  } catch (error) {
    res.status(500).send(`Page Delete failed: ${error.message}`);
  }
})
// Create a deployment
app.post('/api/deployments', async (req, res) => {

  try {
     const response = await createDeploy();
     res.status(200).send({message: "deployment initiation in progress", data: response});
  } catch (error) {

  }

})

// Default Pages
app.use('/', (req, res) => {
    res.send('sign up complete')

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
