const {sign, verify} = require('jsonwebtoken')
const {KEY} = require('../config/server.js')

module.exports =  {
    sign: (payload) => sign(payload, KEY),
    verify: (token) => verify(token, KEY)
}