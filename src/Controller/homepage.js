const HomePage = require('../Models/homepage');

const postHomePage = async (req, res) => {
	try {
		// const {idevent,namaevent} = req.body;
		const homepagePost = await new HomePage ({
			id_event : req.body.idevent,
			nama_event : req.body.namaevent
		})
		homepagePost.save();
		return res.send({
			success : true,
			message : 'Berhasil'
		})
	}
	catch(err){
		return res.send({
			success : false,
			message : 'Gagal Input'
		});
	}
}

module.exports = postHomePage;