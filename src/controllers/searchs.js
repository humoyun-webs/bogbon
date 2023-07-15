const {serching} = require("../models/search")
const {fetch,fetchOne} = require("../utils/pg")

const searchUser = async (req, res) => {
      const {email} = req.body;
      
    const query = `SELECT * FROM users WHERE email ILIKE $1`;

  const values = [`%${email}%`];
  
   const a = (values) => fetch((query), values);
   const resutl = await a(email)
   return res.json(resutl)
};
  






module.exports = {searchUser}