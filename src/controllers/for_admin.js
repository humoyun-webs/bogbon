const Joi = require("joi");
const Users = require("../models/for_admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {v4:uuid} = require("uuid")

const addUser = async (req, res) => {
  try{
    const { email, password, name, role,last_name,country } = req.body;
    const scheme = Joi.object({
      name: Joi.string().min(1).max(32).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string()
        .valid("nihol", "bogbon","admin")
        .required(),
        last_name:Joi.string().required(),
        country:Joi.string().required()
    });
    const { error } = scheme.validate({ email, password,role, name, last_name ,country});
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const user = await Users.findbyemail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await Users.create(email, hashpassword, role, name,last_name,country);
    res.status(200).json({ message: "success", newUser });
  }catch(error){
return res.status(404).json({message: error.message})
}};
const getAllUser = async (req, res) => {
  try {
    const users = await Users.allusers();
    return res.status(200).json(users);
  }catch (error) {
    console.log(error.message);
  }
};
const deleteUsers = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "user is not found" });
  }
  const admin = await Users.byadmin(id)
  const user = await Users.deleteUser(id);
  res.status(200).json({ message: "successfull deleted", user });
};

const getAllcontacts = async (req, res) => {
  try {
    // const token = await req.headers["authorization"].split(" ")[1];
    // const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const id = decoded.id;
    const contacts = await Users.getallcontacts();
    return res.status(200).json({contacts:contacts});
  }catch (error) {
    console.log(error.message);
  }
}

const EditUsers = async ( req, res ) => {
 try{
  const { name, last_name, country} = req.body;
  const { image } = req.files;
  const { id } = req.params;

  console.log(req.body);
  const scheme = Joi.object({
    name: Joi.string().required(),
    last_name: Joi.string().min(1).max(32).required(),
    country: Joi.string().min(1).max(32).required()
    
  });

  const { error } = scheme.validate({ name, last_name, country });

  if (error) return res.status(403).json({ message: error.message });
  const format = image.mimetype.split("/")[1];
      const ImageLink = uuid() + `.${format}`;
      const path = `${process.cwd()}/src/upload/${ImageLink}`;

  const Userss = await Users.updateuser(
    name,
    last_name,
    ImageLink,
    country,
    id
  );
  image.mv(path)

  return res.status(201).json({ message: "edit success", newUsers: Userss });
 }catch(error){
// return res.status(404 ).json({message:"Permission denied"})
console.log(error.message);
 }
}

 const getProfile = async (req, res) => {
  try{
    const token = await req.headers["authorization"].split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = decoded.id;
    const profile = await Users.getprofile(id);
    return res.status(200).json({profile:profile})
  }catch (error) {
   return res.status(500).json("Error: " + error.message)
  }
};




module.exports = {
  addUser,
  deleteUsers,
  getAllUser,
  getAllcontacts,
  getProfile,
  EditUsers
};
