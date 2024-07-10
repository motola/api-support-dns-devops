class pagesAPI {
    constructor(apiKey, email, accountId) {
      this.apiKey = apiKey;
      this.email = email;
      this.baseURL = 'https://api.cloudflare.com/client/v4';
      this.account_id = accountId
    }

    headers() {
        return {
          'X-Auth-Email': this.email,
          'X-Auth-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
       }

async createPages(account_id, projectName, projectOwner, gitRepo, branch) {
    try { 
      const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects`, {
        method: 'POST',
        headers: this.headers(),
        body: `{"build_config":{"build_caching":true,"build_command":"npm run build","destination_dir":"build","root_dir":"/","web_analytics_tag":"cee1c73f6e4743d0b5e6bb1a0bcaabcc","web_analytics_token":"021e1057c18547eca7b79f2516f06o7x"},"canonical_deployment":{},"deployment_configs":{"preview":{"ai_bindings":{"AI_BINDING":{}},"analytics_engine_datasets":{"ANALYTICS_ENGINE_BINDING":{"dataset":"api_analytics"}},"browsers":{"BROWSER":{}},"compatibility_date":"2022-01-01","compatibility_flags":["url_standard"],"d1_databases":{"D1_BINDING":{"id":"445e2955-951a-43f8-a35b-a4d0c8138f63"}},"durable_object_namespaces":{"DO_BINDING":{"namespace_id":"5eb63bbbe01eeed093cb22bb8f5acdc3"}},"env_vars":{"ENVIRONMENT_VARIABLE":{"type":"plain_text","value":"hello world"}},"hyperdrive_bindings":{"HYPERDRIVE":{"id":"a76a99bc342644deb02c38d66082262a"}},"kv_namespaces":{"KV_BINDING":{"namespace_id":"5eb63bbbe01eeed093cb22bb8f5acdc3"}},"mtls_certificates":{"MTLS":{"certificate_id":"d7cdd17c-916f-4cb7-aabe-585eb382ec4e"}},"placement":{"mode":"smart"},"queue_producers":{"QUEUE_PRODUCER_BINDING":{"name":"some-queue"}},
        "r2_buckets":{"R2_BINDING":{"name":"some-bucket"}},"services":{"SERVICE_BINDING":{"entrypoint":"MyHandler","environment":"production",
        "service":"example-worker"}},"vectorize_bindings":{"VECTORIZE":{"index_name":"my_index"}}},
        "production":{"ai_bindings":{"AI_BINDING":{}},"analytics_engine_datasets":{"ANALYTICS_ENGINE_BINDING":{"dataset":"api_analytics"}},
        "browsers":{"BROWSER":{}},"compatibility_date":"2022-01-01","compatibility_flags":["url_standard"],"d1_databases":{"D1_BINDING":{"id":"445e2955-951a-43f8-a35b-a4d0c8138f63"}},"durable_object_namespaces":{"DO_BINDING":{"namespace_id":"5eb63bbbe01eeed093cb22bb8f5acdc3"}},"env_vars":{"ENVIRONMENT_VARIABLE":{"type":"plain_text","value":"hello world"}},"hyperdrive_bindings":{"HYPERDRIVE":{"id":"a76a99bc342644deb02c38d66082262a"}},"kv_namespaces":{"KV_BINDING":{"namespace_id":"5eb63bbbe01eeed093cb22bb8f5acdc3"}},"mtls_certificates":{"MTLS":{"certificate_id":"d7cdd17c-916f-4cb7-aabe-585eb382ec4e"}},
        "placement":{"mode":"smart"},"queue_producers":{"QUEUE_PRODUCER_BINDING":{"name":"some-queue"}},"r2_buckets":{"R2_BINDING":{"name":"some-bucket"}},
        "services":{"SERVICE_BINDING":{"entrypoint":"MyHandler","environment":"production","service":"example-worker"}},
        "vectorize_bindings":{"VECTORIZE":{"index_name":"my_index"}}}},"latest_deployment":{},"name":"${projectName}","production_branch":"main", "source":{"type":"gitlab","config":{"owner":"${projectOwner}","repo_name":"${gitRepo}","production_branch":"${branch}"}}}`
       });

      return response.json();
  }
  catch (error) {
    throw new Error(`Error creating pages: ${error.message}`);
  }
  }

  async getAllPages(account_id) {
    try { 
      const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects`, {
        method: 'GET',
        headers: this.headers(),
       });

      return response.json();
  }
  catch (error) {
    throw new Error(`Error getting pages: ${error.message}`);
  }
  }

  async getPage(project_name) {
    try { 
      const response = await fetch(`${this.baseURL}/accounts/${this.account_id}/pages/projects/${project_name}`, {
        method: 'GET',
        headers: this.headers(),
       });

      return response.json();
  }
  catch (error) {
    throw new Error(`Error getting a page: ${error.message}`);
  }
  }

  async deletePages(account_id,projectName) {
    try { 
      const response = await fetch(`${this.baseURL}/accounts/${account_id}/pages/projects/${projectName}`, {
        method: 'DELETE',
        headers: this.headers(),
       });

      return response.json();
  }
  catch (error) {
    throw new Error(`Error deleting a page: ${error.message}`);
  }
  }
}


module.exports = pagesAPI;