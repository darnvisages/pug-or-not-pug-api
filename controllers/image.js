const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '85b2c0bb35bb4922b6c1166ab9c63611'
});

const handlePugCall = (req, res) => {
	const {input} = req.body;
	app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
	    .then(generalModel => {
	    	return generalModel.predict(input);
	    })
	    .then(data => {
			return res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleFaceCall = (req, res) =>{
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			return res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
	handleFaceCall,
	handlePugCall
}