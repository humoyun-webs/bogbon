const {fetch} = require("../utils/pg");


const allnihols = "SELECT count(*) FROM users WHERE role = 'nihol'"
const allbogbons = "SELECT count(*) FROM users WHERE role = 'bogbon'"
const allusers = "SELECT count(*) FROM users"


const nihols  = () => fetch(allnihols)
const bogbon = () => fetch(allbogbons)
const users = () => fetch(allusers)


module.exports = {nihols, bogbon, users}
