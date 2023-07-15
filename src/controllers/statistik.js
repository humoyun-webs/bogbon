const Statitik = require("../models/statistik")





const statistics = async ( req, res) =>{
  const allnihols = await Statitik.nihols()
  const allbogbons = await Statitik.bogbon()
  const users = await Statitik.users()

  return res.status(200).json({nihols: allnihols, bogbons: allbogbons,allusers: users})
}

module.exports = {statistics}