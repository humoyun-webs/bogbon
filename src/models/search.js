const {fetch,fetchOne} = require("../utils/pg")

const searchbyuser = "SELECT * FROM email WHERE email ILIKE $1"

const serching  = (email) => fetch(searchbyuser, email)

module.exports = {serching}