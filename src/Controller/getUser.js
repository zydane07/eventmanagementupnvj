const profile = (req,res,next)=>{
  const nama = 'Bagas Prabaswara';
  const umur = 19;
  const namadepan = nama.split(' ');
  req.obj = {nama,umur,namadepan};
  next();
  
}

module.exports = profile;