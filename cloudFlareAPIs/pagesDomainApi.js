const axios = require('axios');


class DomainAPI {
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


  
     async addDomain(account_id,project_name, domainName) {

      try {
        const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects/${project_name}/domains`, {
          method: 'POST',
          headers: this.headers(),
          body: `{"name":"${domainName}"}`
         
        })
        console.log(domainName);
       
        let responseBody = await response.json();
        return {status: response.status, data: responseBody}

      }
      catch (error) {
        throw new Error(`Error creating pages: ${error.message}`)

      }

     }

     async getDomains(account_id, project_name) {
     
      try {         
        console.log('CFapis: ',account_id, project_name, `${this.baseURL}/accounts/${account_id}/pages/projects/${project_name}/domains`)                
        const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects/${project_name}/domains`, {
          method: 'GET',
          headers: this.headers(),
        })

        let responseBody = await response.json();
        return {status: response.status, data: responseBody}

      }
      catch (error) {
        throw new Error(`Error getting pages domain: ${error.message}`)

      }
      
     }

     async getDomain(account_id, project_name, domain_name) {
      try {
        const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects/${project_name}/domains/${domain_name}`, {
          method: 'GET',
          headers: this.headers(),
        })

        let responseBody = await response.json();
        return {status: response.status, data: responseBody}
      }
      catch (error) {
        throw new Error(`Error a page domain: ${error.message}`)

      }
      
     }

     async deleteDomain(account_id, project_name, domain_name) {
      try {
        const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects/${project_name}/domains/${domain_name}`, {
          method: 'DELETE',
          headers: this.headers(),
        })

        let responseBody = await response.json();
        return {status: response.status, data: responseBody}

      }
      catch (error) {
        throw new Error(`Error a page domain: ${error.message}`)

      }
      
     }

     async patchDomain(account_id, project_name, domain_name) {
      try {
        const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects/${project_name}/domains/${domain_name}`, {
          method: 'PATCH',
          headers: this.headers(),
          body:'false'
        })

        let responseBody = await response.json();
        return {status: response.status, data: responseBody}

      }
      catch (error) {
        throw new Error(`Error a patching domain: ${error.message}`)

      }
      
     }


}



module.exports = DomainAPI