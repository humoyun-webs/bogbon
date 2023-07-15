const {fetch,fetchOne} = require("../utils/pg")


// const getallplans = 'SELECT u.user_email,u.user_id, u.user_name, t.todo_title, t.todo_desc, t.created_at, t.ended_at from todo_def_u as t INNER JOIN users as u ON t.user_id = u.user_id WHERE    u.user_id = $1'

// const getallplans = 'select user_email, user_name from users'
 const padd = 'Insert into aids(title,descr,user_id)values($1, $2, $3) ';
 const deleteid = 'Delete from aids WHERE id = $1'
 const update = 'UPDATE aids SET title = $1, descr = $2 WHERE id = $3';
const aid = 'select *  from  aids'
const aidedd = 'Update aids SET aided = true, aided_user_id = $1  where id = $2'
//  const addid = 'insert into todo_def_u(user_id)values($1)'

 const aidadd = (title,desc,id) => fetchOne(padd, title, desc,id);
//  const allplans = (id) => fetch(getallplans, id);
//  const idadd = (id) => fetchOne(addid, id);
const aided = (id,user_id) => fetchOne(aidedd,id,user_id)
const aids = () => fetch(aid)
const updated = (title, desc,id) =>fetchOne(update,title, desc,id);
const deleted = (id) => fetchOne(deleteid, id);



module.exports = {aids, updated, deleted, aidadd, aided}