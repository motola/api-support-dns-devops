module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Set default error status code and message
  let statusCode = 500;
  let message = 'Status: 500';

  // Customize status code and message based on error type or properties
  if (err.message.includes('Status: 404')) {
    statusCode = 404;
    message = `Resource not found: ${err.message}`;
  } else if (err.message.includes('Status: 403')) {
    statusCode = 403;
    message = `Forbidden Request: ${err.message}`;
  }
    else if (err.message.includes('Status: 401')) {
      statusCode = 401;
      message = `Unauthotized: ${err.message}`;
  } else if (err.message.includes('Status: 400')) {
    statusCode = 400;
    message = `Bad Request: ${err.message}`;
  } else if (err.message.includes('Status: 409')) {
    statusCode = 409;
    message = `Conflict Similar Project Name Exists: ${err.message}`;
  }
  else if (err.status) {
    // If the error object contains a status property, use it
    statusCode = err.status;
    message = err.message;
  }

  res.status(statusCode).send(message);
};