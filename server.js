const express = require('express');

const app = express();

app.use(express.json());

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
	res.send('this is working');
});

app.post('/signin', (req, res) => {
	const valid = validate(database, req.body.email, req.body.password);
	return valid ? res.json('success') : res.status(400).json('error logging in');
	res.json('success');
});

app.listen(3000, ()=> {
	console.log('app is running on port 3000');
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/