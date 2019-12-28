const getId = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				res.json(user[0]);	
			} else {
				res.status(404).send('Not found');
			}
		})
		.catch(err => {
			res.status(404).send('error getting user');
		})
}

const updateEntries = (req, res, db) => {
	const { id } = req.body;
	db('users').where({id})
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	getId: getId,
	updateEntries: updateEntries
}