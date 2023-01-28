const FS = require('fs');

const httpMethods = ['get', 'post', 'put', 'delete', 'patch'];

const getRoutePaths = (basePath, pathsArray = []) => {
  const directoryContents = FS.readdirSync(basePath);
  directoryContents.forEach((content) => {
    if (FS.statSync(`${basePath}/${content}`).isDirectory()) {
      getRoutePaths(`${basePath}/${content}`, pathsArray);
    } else {
      pathsArray.push(`${basePath}/${content}`);
    }
  });
  return pathsArray;
};

const filenameToUrl = (filename, basePath) => filename.replace(basePath, '').replace(/\.js$/, '');

const createApiDocPaths = (basePath) => {
  const filePaths = getRoutePaths(basePath);
  const collectedPaths = {};
  filePaths.forEach((filePath) => {
    const handler = require(filePath);
    const path = {};
    if (handler.parameters) {
      path.parameters = handler.parameters;
    }
    httpMethods.forEach((method) => {
      if (handler[method] && handler[method].apiDoc) {
        path[method] = handler[method].apiDoc;
      }
    });
    if (Object.keys(path)) {
      collectedPaths[filenameToUrl(filePath, basePath)] = path;
    }
  });
  return collectedPaths;
};

module.exports = createApiDocPaths;
