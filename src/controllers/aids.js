const Joi = require("joi");
require("dotenv").config();
const Dusers = require("../models/aids");
const jwt = require("jsonwebtoken");

const addaids= async (req, res) => {
  try {
    const token = await req.headers["authorization"].split(" ")[1];
    const { title, desc } = req.body;

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const id = decoded.id;
    console.log(id);

    const scheme = Joi.object({
      title: Joi.string().min(5).max(32).required(),
      desc: Joi.string().required(),
    });
    const { error } = scheme.validate({ title, desc});

    if (error) return res.status(403).json({ message: error.message });

    const newAids = await Dusers.aidadd(title, desc, id);

    return res.status(201).json({ message: "Aids created", new: { newAids } });
  } catch (error) {
    return res.status(401).json({ message: "Permission denied", error });
  }
};
// const getAidss = async (req, res) => {
//   try {
//     const token = await req.headers["authorization"].split(" ")[1];
//     const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const id = decoded.id;
//     const Aidss = await Dusers.allAidss(id);
//     return res.status(200).json(Aidss);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
const deleteAids = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Aids is not found" });
  }
  const Aids = await Dusers.deleted(id);
  res.status(200).json({ message: "successfull deleted", Aids });
};

const editAids = async (req, res) => {
  const { title, desc} = req.body;
  const { id } = req.params;
  const scheme = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().min(5).max(32).required(),


  });
  const { error } = scheme.validate({ title, desc, });

  if (error) return res.status(403).json({ message: error.message });

  const Aids = await Dusers.updated(title, desc, id);

  return res.status(201).json({ message: "edit success", newAids: Aids });
};

const getaids = async (req, res) => {
    try {
     const aids = await Dusers.aids()
      return res.status(200).json({allaids: aids});
    } catch (error) {
      console.log(error.message);
    }
}
const aided  = async (req, res) => {
    try {
    const {user_id} = req.params
    const token = await req.headers["authorization"].split(" ")[1];
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = decoded.id;
    const aids = await Dusers.aided(id,user_id)
    const newaid = await Dusers.aids()
    return res.status(200).json({allaids: newaid});
      
    } catch (error) {
      return res.status(500).json("Permission denied")
    }
}
module.exports = {
  addaids,
  editAids,
  deleteAids,
  getaids,
  aided
};
