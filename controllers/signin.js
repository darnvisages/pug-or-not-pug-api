const handleSignIn = (req, res, db, bcrypt) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const valid = bcrypt.compareSync(req.body.password, data[0].hash);
			console.log('valid = ', valid);
			if (valid) {
				return db('users').select('*')
					.where('email', '=', req.body.email)
					.then(user => {
						console.log(user);
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('bad credentials'))
}

module.exports = {
	handleSignIn: handleSignIn
}