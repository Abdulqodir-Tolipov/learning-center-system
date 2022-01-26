// const model = require("./model.js")
const htmlController = require('../../../utils/htmlController.js')

const GET = async (req, res) => {
    res.render(...htmlController(req.userInfo, {html: 'public/home.html'}))
}

module.exports = {
    GET
}