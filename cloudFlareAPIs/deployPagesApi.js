class deploymentAPI {
    constructor(apiKey, email) {
      this.apiKey = apiKey;
      this.email = email;
      this.baseURL = 'https://api.cloudflare.com/client/v4/accounts'; 
    }
  // A class method carry header tokens
    headers() {
        return {
          'X-Auth-Email': this.email,
          'X-Auth-Key': this.apiKey,
          'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
        }
       }

     // Initiate a Deployment of Cloudflare connected to a gitlab Repository
     async createDeployment (account_id, projectName) {
        const form = new FormData();
        form.append("branch", "");
     try {
        const response = await fetch(`${this.baseURL}/${account_id}/pages/projects/${projectName}/deployments`, {
            method: 'POST',
            headers: this.headers(),
            body: form
        });
        
        return response.json()
       } catch (error) {
        throw new Error(`Error creating pages: ${error.message}`);

       }
    }
    // Get all deployments
    async getDeployment (account_id, projectName) {
      try {
        const response = await fetch(`${this.baseURL}/${account_id}/pages/projects/${projectName}/deployments`, {
            method: 'GET',
            headers: this.headers()
      })
             return response.json()
      }  catch (error) {

        throw new Error(` Error retrieving deployments: ${error.message}`)
      }
    }

    // Get a Deployment Info 

    async getDeploymentInfo (account_id, projectName, deploymentId) {
        try {
          const response = await fetch(`${this.baseURL}/${account_id}/pages/projects/${projectName}/deployments/${deploymentId}`, {
              method: 'GET',
              headers: this.headers()
        })
               return response.json()
        }  catch (error) {
  
          throw new Error(` Error retrieving deployments Info: ${error.message}`)
        }
      }

    // Get a Deployment Log

    async getDeploymentLogs (account_id, projectName, deploymentId) {
        try {
            const response = await fetch(`${this.baseURL}/${account_id}/pages/projects/${projectName}/deployments/${deploymentId}/history/logs`, {
                method: 'GET',
                headers: this.headers()
          })
                 return response.json();
          }  catch (error) {
    
            throw new Error(` Error retrieving deployments Logs: ${error.message}`)
          }
    }

    // Delete Deployment
       async deleteDeployment (account_id, projectName, deploymentId) {
        try {
            const response = await fetch(`${this.baseURL}/${account_id}/pages/projects/${projectName}/deployments/${deploymentId}`, {
                method: 'DELETE',
                headers: this.headers()
          })
                 return response.json();
          }  catch (error) {
    
            throw new Error(` Error deleting deployments Logs: ${error.message}`)
          }

       }

      // Retry Failed Deployment
       async retryDeployment (account_id, projectName, deploymentId) {
        try {
            const response = await fetch(`${this.baseURL}/${account_id}/pages/projects/${projectName}/deployments/${deploymentId}/retry`, {
                method: 'POST',
                headers: this.headers()
          })
                 return response.json();
          }  catch (error) {
    
            throw new Error(` Error retrying deployments: ${error.message}`)
          }
       }


       
      // Rollback Deployment
      async rollBackDeployment(account_id, projectName, deploymentId) {
        try {
            const response = await fetch(`${this.baseURL}/${account_id}/pages/projects/${projectName}/deployments/${deploymentId}/rollback`, {
                method: 'POST',
                headers: this.headers()
          })
                 return response.json()
          }  catch (error) {
    
            throw new Error(` Error rolling back deployments: ${error.message}`)
          }
       }


    }

module.exports = deploymentAPI