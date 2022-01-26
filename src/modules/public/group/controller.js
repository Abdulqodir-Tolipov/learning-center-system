const model = require('./model.js');
const htmlController = require('../../../utils/htmlController.js');

const GET = async (req, res) => {
  res.render(...htmlController(
      req.userInfo, 
      await model.get(req.query, req.userInfo)));
};

module.exports = {
  GET,
};
