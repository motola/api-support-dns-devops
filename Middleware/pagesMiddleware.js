const extractPagesRequest = (req, res, next) => {
    const { projectName, repo} = req.body;
  

  // Middleware for all route types for Pages API
    if (projectName && repo) {
      req.pagesInfo = {
        projectName : projectName,
        gitRepo:repo,
    }  
    }

    if (projectName && (req.method === 'GET' || req.method === 'DELETE')) {
      req.pagesInfo = {
        projectName : projectName,
        domain: null
      }

    }

  else if (projectName  && !repo) {
      return res.status(400).send({ error: 'Repository is required' });  
    }

   else if (repo && !projectName) {
      return res.status(400).send({ error: 'A project Name is required' });  
    }

   else if (!projectName && !repo) {
      return res.status(400).send({ error: 'Repository and Project Name is required' });
    }
   
     

    next();
  };
  
  module.exports = extractPagesRequest;