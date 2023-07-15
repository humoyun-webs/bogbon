const {fetchOne, fetch}  = require("../utils/pg")


const getUserByemail = 'select * from users where email = $1';
const cregister = 'Insert into users (name, l_name, email,password,role,country,image)values($1, $2, $3, $4, $5, $6, $7) returning *';

// const google = "Insert into users (userg_id, user_name, user_email)values($1, $2, $3) 

const register = (name,last_name, email, password, role, country, path) => fetchOne(cregister , name, last_name, email , password, role, country, path);
const findbyemail = (email) => fetchOne(getUserByemail, email);

module.exports = {
 findbyemail,
 register
//  googleby
}