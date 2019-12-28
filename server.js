const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'pugbrain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegistration(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.getId(req, res, db)})

app.put('/profile/update', (req, res) => {profile.updateEntries(req, res, db)})

app.post('/image/faces', (req, res) => { image.handleFaceCall(req, res)})

app.post('/image/pug', (req, res) => { image.handlePugCall(req, res)})

const PORT = 3000;//process.env.PORT;
app.listen(PORT, ()=> {
	console.log(`app is running on port ${PORT}`);
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/