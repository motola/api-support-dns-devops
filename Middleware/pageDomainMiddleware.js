const extractDomainName = (req, res, next) => {
    const { domainName, projectName } = req.body;

 
    if (domainName || (domainName && projectName)) {
      req.pagesInfo = {
        projectName : domainName.split('.')[0],
        domainName: domainName,
    }  
    }

    else if (projectName) {
      req.pagesInfo = {
        projectName : projectName,   
    }
    }
    else {
      return res.status(400).send({ error: 'domainName is required' });
    }
    next();
  };
  
  module.exports = extractDomainName;