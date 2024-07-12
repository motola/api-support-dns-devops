const axios = require('axios');


class CloudflareAPI {
  constructor(apiKey, email) {
    this.apiKey = apiKey;
    this.email = email;
    this.baseURL = 'https://api.cloudflare.com/client/v4';
  }

  // Declaring headers as a method since it would be accessed by all the function in the class.
    headers() {
      return {
        'X-Auth-Email': this.email,
        'X-Auth-Key': this.apiKey,
        'Content-Type': 'application/json'
      }
     }

  // Create a DNS Record
  async createDNSRecord(zoneId, record) {
    try {
      const url = `${this.baseURL}/zones/${zoneId}/dns_records`;
    
      
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify(record)
      });
      return await response.json();
    } catch (error) {
      throw new Error(`Error creating DNS record: ${error.message}`);
    }
  }
  // End Creation



  // Delete a DNS Record

  async deleteDNSRecord(zoneId, recordId) {
    try {
      const response = await axios.delete(`${this.baseURL}/zones/${zoneId}/dns_records/${recordId}`, {
        headers: this.headers(),
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(`Error deleting DNS record: ${error.message}`);
    }
  }
   // End Deletion
  

  // List all Records and Index them
  async listDNSRecords(zoneId) {
   const url = `${this.baseURL}/zones/${zoneId}/dns_records`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers()
      });
      
      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        // Attempt to parse Cloudflare API error message from response body
        try {
          const errorResponse = await response.json();
          if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
            errorMessage += `\nCloudflare API Error: ${errorResponse.errors.map(err => err.message).join(', ')}`;
          }
        } catch (parseError) {
          console.error('Error parsing Cloudflare API response:', parseError);
        }
        throw new Error(errorMessage);
      }
      return response.json();
     

    } catch (error) {
      throw new Error(`Error listing DNS records: ${error.message}`);
    }
  }
  // End Listing



  // Create Pages project 
 
  
}

module.exports = CloudflareAPI;
