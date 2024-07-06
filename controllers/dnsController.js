const CloudflareAPI = require('../cloudFlareAPIs/dnsApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;



// Instantiate CloudFlareApis for DNS Resolution and Crud Operations
const dns = new CloudflareAPI(apiKey, email);





// List all DNS Records created on CloudFlare
async function listAll(req, res) {
    try {
      const data = await dns.listDNSRecords(zoneId);
      console.log(`5yth -->`, zoneId);
      
      console.log('DNS Record Listed:', data.result);
      const dnsRecords = data.result;
      const indexedRecords = dnsRecords.map((record, index) => ({
        index: index++,
        ...record
      }));
      res.status(200).send(indexedRecords);
    } catch (error) {
      console.log('Error Listing Records:', error);
       res.status(500).send(`Spin up failed: ${error.message}`)
    }
  }

// Create DNS Records and Post on CloudFlare
async function spinUp(req, res) {
  const newRecord = {
    type: 'A',
    name: 'mndrew',
    content: '192.15.1.3',
    ttl: 120,     
    proxied: false
  };

  try {
    const result = await dns.createDNSRecord(zoneId, newRecord);
    
    console.log('DNS Record Created:', result.result);
    return res.status(200).send(result.result);;
  } catch (error) {
    console.error('Error creating DNS record:', error);
    res.status(500).send(`Error creating pages: ${error.message}`)
  }
}


// Delete DNS Record
async function spinDown(req, res) {
  // Read from the request body on postman
  try {
    const result = await dns.deleteDNSRecord(zoneId, recordId);
    
    console.log('DNS Record Created:', result);
    return res.status(200).send(result);
  } catch (error) {
    console.error('Error creating DNS record:', error);
   return res.status(500).send(`Error returning pages: ${error.message}`)
  }
}



module.exports = { spinUp, spinDown, listAll };