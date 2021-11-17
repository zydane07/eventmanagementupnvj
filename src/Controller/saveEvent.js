const save = async (req , res) => {
	try{
		return res.send({
			success : true,
			message : 'Save Berhasil'
		});
	}
	catch(err){
		return res.send({
			success : false,
			message : 'Save Gagal'
		});
	}
}

module.exports = save;