const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
  PORT: process.env.SERVER_PORT || 5000,
  KEY: process.env.SECRET_KEY
};

