const client = require('../utils/redis');

const cache = async(req,res,next) =>{
  try{
    const {email}=req.user.email;

    await client.get(email,(err,data)=>{
    if(err) throw err;

    if(data !== null){
      return res.render("index", {
        nama: req.user.nama,
        photo: req.user.photo,
        layout: "layouts/main-layout",
        title: "Home",
        css: "styleHome",
        events: data.events,
        newestEvents: data.newestEvents,
        landing: data.landing,
    });
    }
    else{
      next();
    }
  });
  }catch(err){
    return console.log('eror:',err);
  }
  
  
}

module.exports = cache;