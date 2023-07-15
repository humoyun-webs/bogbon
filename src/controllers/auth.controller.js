require("dotenv").config();
const Joi = require("joi");
const Users = require("../models/auth");
const bcrypt = require("bcrypt");
const { sign } = require("../utils/jwt");
const {v4:uuid} = require("uuid")

const loginC = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const scheme = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = scheme.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const user = await Users.findbyemail(email);
    if (!user) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(403).json({ message: "Incorrect email or password" });
    }
    const token = sign({ id: user.user_id, role: user.role });
    res.status(200).json({ message: "Success", token });
  } catch (error) {
    return res.status(401).json({ message: "Permission denied" });
  }
};

const Registratisya = async (req, res) => {
  try {
    const { name, last_name, email, password,role, country} = req.body;

    const {image} = req.files
    

    
    
    const scheme = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      last_name: Joi.string().required(),
      role: Joi.string()
      .valid("bogbon","nihol")
      .required(),
      country: Joi.string().min(3).required()
    });
    const { error } = scheme.validate({ name, last_name, email, password, role, country  });
    
    if (error) return res.status(403).json({ message: error.message });
    const user = await Users.findbyemail(email);
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const format = image.mimetype.split("/")[1];
    
    const ImageLink = `${uuid()}` + `.${format}`;
    // console.log(ImageLink);
      const path = `${process.cwd()}/src/upload/${ImageLink}`;
    const hashedpass = await bcrypt.hash(password, 12);
    const newUser = await Users.register(
      name,
      last_name,
      email,
      hashedpass,
      role,
      country,
      ImageLink
    );
    const token = sign({ id: newUser.user_id, role: newUser.role });
    // console.log(token);
    image.mv(path)
    return res
      .status(201)
      .json({ message: "Successfull registration", token, newUser });
  } catch (error) {
    // return res.status(401).json({ message: "Permission denied" });
    console.log(error.message);
  }
};
module.exports = {
  loginC,
  Registratisya,
};