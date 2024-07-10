const CloudflareAPI = require('../cloudFlareAPIs/dnsApi');
const PagesAPI = require('../cloudFlareAPIs/pagesApi');
const dotenv = require('dotenv');
dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;



// Instantiate CloudFlareApis for DNS Resolution and Crud Operations
const dns = new CloudflareAPI(apiKey, email);
const pages = new PagesAPI(apiKey, email);






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
  let finalResult;
  let newRecord;
  const { name } = req.body;
// try {
//   const resPage = await pages.getPage(name);
//    finalResult = resPage;
//   finalResult;
// }
// catch (error) {

// }
 

  
  console.log(finalResult);


  
  // let userChoice = domainType;
  console.log(name);
  
  

  // switch (userChoice) {
  //   case 'platform': // Handle platform domain
  //     // Assuming `zoneId` is the Cloudflare zone ID for the account
  //     newRecord = {
  //       type: 'CNAME',
  //       name: `${name}.${zoneId}`, // Create a sub-domain under Cloudflare zone
  //       content: finalResult, // Replace with actual CNAME target
  //       ttl: 120,
  //       proxied: false
  //     };
  //     break;
  //   case 'own_domain': // Handle customer's own domain
  //     newRecord = {
  //       type: 'A',
  //       name: name, // Replace with customer's domain name
  //       content: '192.15.1.3', // Replace with actual IP address
  //       ttl: 120,
  //       proxied: false
  //     };
  //     break;
  //   case 'own_subdomain': // Handle customer's own sub-domain
  //     newRecord = {
  //       type: 'CNAME',
  //       name: name, // Replace with customer's sub-domain name
  //       content: 'example.com', // Replace with actual CNAME target
  //       ttl: 120,
  //       proxied: false
  //     };
  //     break;
  //   default:
  //     return res.status(400).send('Invalid domain type specified');
  // }

      newRecord = {
        type: 'CNAME',
        name: `${name}`, // Replace with customer's domain name
        content: `${name}.pages.dev`, // Replace with actual IP address
        ttl: 120,
        proxied: true
      };

  try {
    const result = await dns.createDNSRecord(zoneId, newRecord);
    
    console.log('DNS Record Created:', result);
   res.status(200).send(result);;
  } catch (error) {
    console.error('Error creating DNS record:', error);
    res.status(500).send(`Error creating pages: ${error.message}`)
  }
}


// Delete DNS Record
async function spinDown(req, res) {
  // Read from the request body on postman
  const { recordId } = req.body;
  console.log(recordId);
  try {
    const result = await dns.deleteDNSRecord(zoneId, recordId);
    
    console.log('DNS Record Created:', result.result);
    res.status(200).send(result.data);
  } catch (error) {
    console.error('Error creating DNS record:', error);
   return res.status(500).send(`Error returning pages: ${error.message}`)
  }
}



module.exports = { spinUp, spinDown, listAll };