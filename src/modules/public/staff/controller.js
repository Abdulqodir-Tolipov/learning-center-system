const model = require('./model.js');
const htmlController = require('../../../utils/htmlController.js')

const TEACHERS = async (req, res) => {
    res.render(...htmlController(
    req.userInfo,
    await model.get_teachers(req.userInfo)
  ))
};

const ASSISTANTS = async (req, res) => {
    res.render(...htmlController(
    req.userInfo,
    await model.get_assistants(req.query, req.userInfo))
    )
};

module.exports = {
  TEACHERS,
  ASSISTANTS,
};
