const model = require('./model.js');
const { sign, verify } = require('../../../utils/jwt.js');
const htmlController = require('../../../utils/htmlController.js');

const GET = async (req, res) => {
  res.render(...htmlController(req.userInfo, { html: 'public/login.html' }));
};

const POST = async (req, res) => {
  let user = await model.validate(req.body);
  if (user) {
    res.cookie('token', sign(user));
    res.redirect('/groups');
  } else {
    res.render(...htmlController(req.userInfo, {html: 'public/login.html',errorMessage: `Wrong username or password!`,}));
  }
};

const LOGOUT = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

module.exports = {
  GET,
  POST,
  LOGOUT,
};