const homeRoute = require('./home')
const authRoute = require('./auth')
const groupRouter = require('./group');
const studentRouter = require('./student');
const staffRoute = require('./staff')

module.exports = [homeRoute, authRoute, groupRouter, studentRouter, staffRoute];
