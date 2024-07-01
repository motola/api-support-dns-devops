const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = 2000;

const { spinUp, spinDown, listAll } = require('./spinup');
console.log(spinUp);

app.use(express.json());

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



// app.post('/api/spindown', async (req, res) => {
//   const { recordId } = req.body;

//   try {
//     await spinDown(recordId);
//     res.status(200).send('Spin down completed successfully');
//   } catch (error) {
//     res.status(500).send(`Spin down failed: ${error.message}`);
//   }
// });

app.use('/', (req, res) => {
    res.send('sign up complete')

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
