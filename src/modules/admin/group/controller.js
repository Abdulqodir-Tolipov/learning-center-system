const model = require('./model.js');
const htmlController = require('../../../utils/htmlController.js');

const GET = async (req, res) => {
  res.render(...htmlController(
      req.userInfo, 
      await model.get(req.query, req.userInfo),
      {header: 'private/header.html'},
    ))
};

const DELETE = async (req, res) => {
  const delGroups = await model.remove(req.body)
  if (delGroups) {
    res.status(204).json({
      status: 204,
      message: 'The group deleted!'
    })
  } else {
    res.status(400).json({
      status: 400,
      message: 'Something went wrong!'
    })
  }
};


module.exports = {
  GET,
  DELETE
};
