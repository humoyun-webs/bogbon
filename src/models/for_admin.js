const {fetchOne, fetch}  = require("../utils/pg")

const getUserByemail = 'select * from users where email = $1';
const getbyAdmin = 'select * from users where role = "admin"';
const getallusers = 'select * from users';
const creatUser = 'Insert into users (email, password, role, name,l_name,country)values($1, $2, $3, $4, $5, $6) returning *';
const onecontacts  ='SELECT u.email,u.user_id,u.role,c.full_name, c.phone, c.message,c.created_at from contacts as c INNER JOIN users as u ON c.user_id = u.user_id WHERE  u.user_id = c.user_id';
const allcontact = 'select * from contacts';
const deleteid = 'UPDATE users SET isDelete = true WHERE user_id = $1';
const profile = 'select * from users where user_id = $1'
const update = 'UPDATE users SET name = $1, l_name = $2, image = $3, country = $4 WHERE user_id = $5';
// const google = "Insert into users (userg_id, user_name, user_email)values($1, $2, $3) "



const findbyemail = (email) => fetchOne(getUserByemail, email);
const allusers = () => fetch(getallusers);
// const googleby = (id,name,email) => fetchOne(google, id, name, email)
const create = (name,email, password, role,last_name, country) => fetchOne(creatUser, name, email, password, role,last_name, country);
const deleteUser = (user_id) => fetchOne(deleteid, user_id);
const byadmin = (id) => fetchOne(getbyAdmin, id);
const getallcontacts = () => fetch(onecontacts);
const getprofile = (id) => fetchOne(profile, id)
const allcontacts = () => fetchOne(allcontact)
const updateuser = (name, last_name, image, country, id) => fetchOne(update, name, last_name,image, country, id)

module.exports = {
 findbyemail,
 create,
 allusers,
 deleteUser,
 byadmin,
 getallcontacts,
 getprofile,
 allcontacts,
 updateuser

//  googleby
}