const extractPagesRequest = (req, res, next) => {
    const { name, repo} = req.body;
  

  // Middleware for all route types for Pages API
    if (name && repo) {
      req.pagesInfo = {
        projectName : name,
        gitRepo:repo,
    }  
    }

    if (name && (req.method === 'GET' || req.method === 'DELETE')) {
      req.pagesInfo = {
        projectName : name,
        domain: null
      }
     // In a delete or get method respond if req.body is not provided
    } else if ((!name && !repo) && (req.method === 'GET' || req.method === 'DELETE')) {
      return res.status(400).send({ error: 'Project Name is required' }); 
    }

  else if (name  && !repo) {
      return res.status(400).send({ error: 'Repository is required' });  
    }

   else if (repo && !name) {
      return res.status(400).send({ error: 'A project Name is required' });  
    }

   else if (!name && !repo) {
      return res.status(400).send({ error: 'Repository and Project Name is required' });
    }

    else if (!name && req.method === 'DELETE') {
      return res.status(400).send({ error: 'Repository is required' });
    }
   
     

    next();
  };
  
  module.exports = extractPagesRequest;