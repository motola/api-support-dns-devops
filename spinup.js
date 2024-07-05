
const CloudflareAPI = require('./cfIntegration/dnsApi');
const pagesAPI = require('./cfIntegration/pagesApi');

const dotenv = require('dotenv');


dotenv.config();




// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;


// Instantiate CloudFlareApi
const dns = new CloudflareAPI(apiKey, email);
const pages = new pagesAPI(apiKey, email);

// List all DNS Records created on CloudFlare
async function listAll() {
    try {
      const data = await dns.listDNSRecords(zoneId);
      console.log(`5yth -->`, zoneId);
      
      console.log('DNS Record Listed:', data.result);
      const dnsRecords = data.result;
      const indexedRecords = dnsRecords.map((record, index) => ({
        index: index++,
        ...record
      }));
      return indexedRecords
    } catch (error) {
      console.error('Error Listing Records:', error);
    }
  }

// Create DNS Records and Post on CloudFlare
async function spinUp() {
  const newRecord = {
    type: 'A',
    name: 'hr',
    content: '192.15.1.3',
    ttl: 120,     
    proxied: false
  };

  try {
    const result = await dns.createDNSRecord(zoneId, newRecord);
    
    console.log('DNS Record Created:', result.result);
    return result;
  } catch (error) {
    console.error('Error creating DNS record:', error);
  }
}



async function spinDown(recordId) {
  // Read from the request body on postman
  try {
    const result = await dns.deleteDNSRecord(zoneId, recordId);
    
    console.log('DNS Record Created:', result);
    return result;
  } catch (error) {
    console.error('Error creating DNS record:', error);
  }
}


async function startPage() {
  const pagesInfo = {
    projectName : 'spocket',
    gitRepository: 'sleek2'
  }
  try {
    const result = await pages.createPages(accountId, pagesInfo.projectName);
    
    
    return result;
  } catch (error) {
    console.error('Error creating Pages', error);
  }


}
// List all pages
async function listAllPages() {
  try {
    const result = await pages.getAllPages(accountId);
    
    console.log('Page Created', result);
    return result;
  } catch (error) {
    console.error('Error creating Pages', error);
  }

  
}

// Delete pages
async function removePage(projectNameFromReq) {

  const projectName = 'fuiguf'
  try {
    const result = await pages.deletePages(accountId, projectName);
    
    console.log('Page Deleted', result);
    return result;
  } catch (error) {
    console.error('Error creating Pages', error);
  }
}





module.exports = { spinUp, spinDown, listAll, startPage, listAllPages, removePage };
