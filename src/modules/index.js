const publicModules = require('./public')
const adminModules = require('./admin')

module.exports = [
    ...publicModules,
    ...adminModules
]