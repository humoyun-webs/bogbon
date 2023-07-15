const { Router } = require("express");
const {
    loginC,
    Registratisya
} = require("../controllers/auth.controller");
const { CheckRole } = require("../middlewares/check-role-middleware");
const { isAuth } = require("../middlewares/isAuth-middleware");
const {addUser,deleteUsers,getAllUser,getAllcontacts,getProfile, EditUsers} = require("../controllers/for_admin")
  const routes = Router();
  const {getPhoto} = require("../controllers/get_photos")
  const {searchUser} = require("../controllers/searchs")
  const {statistics} = require("../controllers/statistik")
  const {sendMessage} = require("../controllers/contacts")  
  const {addaids,deleteAids,editAids,getaids,aided} = require("../controllers/aids")
  
  
  
  
  routes
  .post("/register", Registratisya)
  .post("/auth/login", loginC)
  .post('/aids', isAuth,CheckRole("nihol"), addaids)
  .put('/aids/:id',isAuth, CheckRole("nihol","admin"),editAids)
  .get('/aids', getaids)
  .get("/home/humoyun/Desktop/mohir_back/src/upload/:filename",getPhoto)
  .delete('/aids/:id', isAuth,CheckRole("nihol","admin"),deleteAids)
  .post("/user", isAuth, CheckRole("admin"), addUser)
  .get("/get/users", isAuth,CheckRole("admin") ,getAllUser)
  .delete("/user/:id", isAuth, CheckRole("admin"), deleteUsers)
  .get("/get/contacts", isAuth, CheckRole("admin"), getAllcontacts)
  .post("/email/search", searchUser)
  .get("/get/statik", statistics)
  .post("/add/contacts",isAuth, sendMessage)
  .get("/profile",isAuth,getProfile ) 
  .put("/aided/:user_id", isAuth, CheckRole("bogbon"), aided)
  .put("/users/update/:id",isAuth,EditUsers)
  
  module.exports = { routes };