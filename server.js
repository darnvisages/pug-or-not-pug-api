const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

const validate = (db, email, password) => {
	return db.users.some( (entry) => entry.email === email && entry.password === password )
}

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => {
	const valid = validate(database, req.body.email, req.body.password);
	return valid ? res.json('success') : res.status(400).json('error logging in');
	res.json('success');
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, (err, hash) => {
		console.log(hash);
	})
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	database.users.forEach(user => {
		if (user.id === id) {
			return res.json(user);
		} 
	})
	return res.status(404).send('no such user');
})

app.put('/profile/update', (req, res) => {
	const { id } = req.body;
	database.users.forEach(user => {
		if (user.id === id) {
			user.entries++;
			return res.json(user.entries);
		} 
	})
	return res.status(400).send('not found');
})

app.listen(3000, ()=> {
	console.log('app is running on port 3001');
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/