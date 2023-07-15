const bcrypt = require("bcrypt")
const Joi = require("joi")
const Contact = require("../models/contacts")
const jwt = require("jsonwebtoken")
const {verify} = require("../utils/jwt")

const sendMessage = async(req, res) =>{
    try{
        const token = await req.headers["authorization"].split(" ")[1];
        const { full_name, phone, message } = req.body;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);
        const id = decoded.id;
  const scheme = Joi.object({
    full_name: Joi.string().min(1).max(64).required(),
    phone: Joi.number().required(),
    message: Joi.string().required(),
  });
  const { error } = scheme.validate({ full_name, phone, message });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
 
  const newUser = await Contact.contactadd(full_name,phone,message,id);
  res.status(200).json({ message: "success", newUser });
    }catch(error){
    // return res.status(500).json({message:error.message})
    console.log(error.message);
    }
}

module.exports = {sendMessage}



// full_name, phone, message