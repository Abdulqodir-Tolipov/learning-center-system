// const model = require("./model.js")
const htmlController = require('../../../utils/htmlController.js')

const GET = async (req, res) => {
    res.redirect('/admin/groups')
}

module.exports = {
    GET
}