const Event = require('../Models/event');
const pdf = require('pdf').pdf
const fs = require('fs')

var doc = new pdf()

const download = async (req,res) => {
  try {
    const events = await Event.find({}).select('id_event nama_event tanggal_event poster_event kategori -_id');{
      doc.setFontSize(5)

      // var num = [20,40,60,80,100,120,140,160]
      // var temp = events.toString();
      // var arrString = arr.join("{");
      for (var i=1 ; i <= events.length ; i++){
        doc.text(20, 20*i, events.toString())
      }

      

      doc.setProperties({
        title : 'Pdf Download',
        subject : 'Tes',
        creator : 'Crystal',
        keywords : 'Tes'
      })

      var filename = "output.pdf"

      fs.writeFile(filename,doc.output(),function(err , data){
        return res.status(200).send({
        success : true,
        message : 'Berhasil download',
          })
        })

      
    }
  }
  catch (err){
    return res.send({
      success : false,
      message : 'Gagal download'
    });
  }
}

module.exports = download;