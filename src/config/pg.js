const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    PORT: process.env.PG_PORT,
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    PASSWORD: process.env.PG_PASSWORD,
    DATABASE: process.env.PG_DATABASE
}