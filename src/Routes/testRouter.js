const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const Test = require('../Models/testing');

router.post('/test',upload.single('image'), async(req,res)=>{
  try{
    console.log(req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path);

    let user = new Test({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    });
    await user.save();
    res.json(result);
  }
  catch(err){
    console.log(err);
  }
});

router.put('/:id',upload.single('image'), async(req,res)=>{
  try{
   let test = await Test.findById(req.params.id);

    await cloudinary.uploader.destroy(test.cloudinary_id);

    const result = await cloudinary.uploader.upload(req.file.path);

    const data = {
      name: req.body.name || test.name,
      avatar: result.secure_url || test.avatar,
      cloudinary_id: result.public_id || user.cloudinary_id
    }

     test = await Test.findByIdAndUpdate(req.params.id, data, {new: true});
    res.json(test);

  }
  catch(err){
    console.log(err);
  }
});

module.exports = router;