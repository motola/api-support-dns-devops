const extractDeployRequest = (req, res, next) => {
    const {projectName, id } = req.body;
   

   
 
     if (projectName) {
      req.pagesInfo = {
        projectName : projectName
    }  
    }
    if (projectName && id) {
        req.pagesInfo = {
            projectName : projectName,
            deploymentId : id,  

    }
}
  // Deployment
    else if (id) {
      req.pagesInfo = {
        deploymentId : id,   
    }
    }
    else if (!projectName && req.method === 'POST'){
      return res.status(400).send({ error: 'project Name required' });
    }
    else if (!projectName && !id && (req.method === 'DELETE' || req.method === 'POST' || req.method === 'GET'  )) {
        return res.status(400).send({ error: 'Project Name and Id required' });
    }
    else if (!id && (req.method === 'DELETE' || req.method === 'GET' )){
        return res.status(400).send({ error: 'Id required' });
      }

   
    next();
  };
  
  module.exports = extractDeployRequest;