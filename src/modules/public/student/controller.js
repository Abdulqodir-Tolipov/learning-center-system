const model = require("./model.js")
const htmlController = require('../../../utils/htmlController.js')

const STUDENTS = async (req, res) => {
    res.render(...htmlController(
        req.userInfo,
        await model.get(req.query, req.userInfo)
    ))
}

const STUDENT = async (req, res) => {
    res.render(...htmlController(
        req.userInfo,
        await model.get_score(req.params, req.userInfo)
    ))
}

const SEARCH = async (req, res) => {
    res.render(...htmlController(
        req.userInfo,
        await model.search(req.query, req.userInfo)
    ))
}


module.exports = {
    STUDENTS,
    STUDENT,
    SEARCH
}