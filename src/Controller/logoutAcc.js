
const logout = async (req , res) => {
	try{
		// console.log(req.user);
		res.clearCookie("jwt");

		return res.send({
			success : true,
			message : 'Logout Berhasil'
		});
	}
	catch{
		return res.send({
			success : false,
			message : 'Logout Gagal'
		});
	}
}

module.exports = logout;