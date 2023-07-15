const {fetch,fetchOne} = require("../utils/pg")

const addcontact = 'insert into contacts(full_name,phone,message,user_id)values($1,$2,$3,$4)';


const contactadd = (full_name,phone, message, user_id) =>fetchOne(addcontact, full_name, phone, message, user_id)


module.exports = {contactadd}