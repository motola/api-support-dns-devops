const extractDnsRequest = (req, res, next) => {
    const { recordId, name } = req.body;
   

   
 
     if (name) {
      req.pagesInfo = {
        name : name.toLowerCase()
    }  
    }

    else if (recordId) {
      req.pagesInfo = {
        recordId : recordId,   
    }
    }
    else if (!name && req.method === 'POST'){
      return res.status(400).send({ error: 'name required' });
    }
    else if (!recordId && req.method === 'DELETE'){
        return res.status(400).send({ error: 'Id required' });
      }
    next();
  };
  
  module.exports = extractDnsRequest;