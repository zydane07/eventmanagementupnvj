// var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

const share = async (req , res) => {
	try{
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		return res.send({
			success : true,
			message : 'Share Berhasil',
			Url : {
				fullUrl
			}
		});
	}
	catch(err){
		return res.send({
			success : false,
			message : 'Share Gagal'
		});
	}
}

module.exports = share;