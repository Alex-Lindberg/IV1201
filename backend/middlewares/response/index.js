/**
 * It takes a status code and a path to a property on the `res.locals.outData` object, and returns a
 * function that takes a request and a response object, and sends the response with the status code and
 * the data at the path
 * @param status - The HTTP status code to send back to the client.
 * @param path - The path to the data you want to send back.
 */
const sendResponse = (status, path) => (req, res) => {
  if (!!path)
    res.status(status).json(path === 'outData' ? res.locals.outData : res.locals.outData[path]);
  else res.sendStatus(status);
};

module.exports = {
  sendResponse,
};
