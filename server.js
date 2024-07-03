const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = 2000;

const { spinUp, spinDown, listAll, startPage, listAllPages } = require('./spinup');
console.log(spinUp);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

//Spin down DNS Records
app.post('/api/spinup', async (req, res) => {
  try {
   const result = await spinUp();
   console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(`Spin up failed: ${error.message}`);
  }
});


// List All DNS Records
app.get('/api/listall', async (req, res) => {
    try {
     const result = await listAll();
    
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(`Spin up failed: ${error.message}`);
    }
  });


//Spin up DNS Records
app.post('/api/spindown', async (req, res) => {
  

  try {
    const { recordId } = req.body;
  console.log(recordId);
  const result =  await spinDown(recordId);
  console.log(result);
    res.status(200).send('Spin down completed successfully:');
  } catch (error) {
    res.status(500).send(`Spin down failed: ${error.message}`);
  }
});
/// Create a Cloud Fare Page
app.post('/create/pages', async (req, res) => {
  try {
 const resAe = await startPage();
 console.log(res);
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

// Default Pages
app.use('/', (req, res) => {
    res.send('sign up complete')

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
