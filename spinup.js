const CloudflareAPI = require('./cloudflare');
const dotenv = require('dotenv');

dotenv.config();


// Environment Variables
const apiKey = process.env.CLOUDFLARE_API_KEY;
const email = process.env.CLOUDFLARE_EMAIL;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;

// Instantiate CloudFlareApi
const cloudflare = new CloudflareAPI(apiKey, email);

// List all DNS Records created on CloudFlare
async function listAll() {
    try {
      const data = await cloudflare.listDNSRecords(zoneId);
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
    name: 'akin',
    content: '192.141.1.3',
    ttl: 120,     
    proxied: false
  };

  try {
    const result = await cloudflare.createDNSRecord(zoneId, newRecord);
    
    console.log('DNS Record Created:', result);
    return result;
  } catch (error) {
    console.error('Error creating DNS record:', error);
  }
}

 




module.exports = { spinUp, listAll };
