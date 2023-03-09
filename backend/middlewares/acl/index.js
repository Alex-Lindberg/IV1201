const { errorCodes } = require('../errorcodes'),
  { roleMap } = require('../../utils/maps');

const isReqruiter = (role_id) => roleMap.recruiter === role_id;
const isApplicant = (role_id) => roleMap.applicant === role_id;

const aclDefinitions = (req, res) => {
  const { person_id, role_id } = res.locals.user;
  return {
    '/api/applicants': {
      GET: isReqruiter(role_id),
    },
    '/api/applicants/:applicantId': {
      GET: isReqruiter(role_id) || (isApplicant(role_id) && person_id === req.params.applicantId),
    },
    '/api/applications': {
      POST: isApplicant(role_id),
    },
  };
};

/**
 * If the path and method of the request are not defined in the aclDefinitions function, then return a
 * 403 error
 * @param req - The request object
 * @param res - the response object
 * @param next - the next middleware in the chain
 * @returns A function that takes in a request, response, and next.
 */
const checkAcl = (req, res, next) => {
  const path = req.path.replace(/\/\d+/g, '/:applicantId');
  const method = req.method;
  if (!aclDefinitions(req, res)[path][method])
    return next(errorCodes.forbidden({ req, message: 'Forbidden' }));
  else return next();
};
module.exports = { checkAcl };
