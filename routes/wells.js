const router = require('express-promise-router')();
const WellController = require('../controllers/well');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/:year')
  .get(validateParam(schemas.yearSchema, 'year'), WellController.getWellsForYear);

module.exports = router;
