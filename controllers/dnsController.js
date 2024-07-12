const CloudflareAPI = require('../cloudFlareAPIs/dnsApi');
const PagesAPI = require('../cloudFlareAPIs/pagesApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;



// Instantiate CloudFlareApis for DNS Resolution and Crud Operations
const dns = new CloudflareAPI(apiKey, email);
const pages = new PagesAPI(apiKey, email, accountId);



// Create DNS Records and Post on CloudFlare
async function spinUp(req, res, next) {
  let newRecord;
  const { name } = req.pagesInfo;
  let target;


  try {

   const {data} = await pages.getPage(name);
    target = data.result.subdomain
    console.log('inside ', target);
    
  }
  catch (error) {
    error.status = 500; // Optionally set a custom status code on the error object
    next(error);

  }

  console.log('DNS record target: ', target);
  // let userChoice = domainType;
  console.log(name);
      newRecord = {
        type: 'CNAME',
        name: `${name}`, // Replace with customer's domain name
        content: target, // CNAME TARGET
        ttl: 120,
        proxied: true
      };

  try {
     const {status, data} = await dns.createDNSRecord(zoneId, newRecord);
     res.status(status).send(data);
  } catch (error) {
    console.error('Error creating DNS record:', error);
    error.status = 500; // Optionally set a custom status code on the error object
    next(error);
  }
}


// List all DNS Records created on CloudFlare
async function listAll(req, res, next) {
   
  try {
    const {status, data} = await dns.listDNSRecords(zoneId);
    console.log(`5yth -->`, zoneId);
    
    console.log('DNS Record Listed:', data.result);
    const dnsRecords = data.result;
    const indexedRecords = dnsRecords.map((record, index) => ({
      index: index++,
      ...record
    }));
    res.status(status).send(indexedRecords);
  } catch (error) {
    console.log('Error Listing Records:', error);
    error.status = 500; // Optionally set a custom status code on the error object
    next(error);
  }
}

// Delete DNS Record
async function spinDown(req, res, next) {
  // Read from the request body on postman
  const { recordId } = req.body;
  console.log(recordId);
  try {
    const {status, data}  = await dns.deleteDNSRecord(zoneId, recordId);
    console.log(data);
    res.status(status).send(data);
  } catch (error) {
    console.error('Error creating DNS record:', error);
    error.status = 500; // Optionally set a custom status code on the error object
    next(error);
  }
}



module.exports = { spinUp, spinDown, listAll };