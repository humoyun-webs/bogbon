const getPhoto = (req, res) => {
    const {filename} = req.params;
    const filePath = `${process.cwd()}/src/upload/${filename}`;
  
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  
    res.sendFile(filePath);
  };

  module.exports = {getPhoto}