const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');


const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'luminarc',
    database : 'smart_brain'
  }
})

app.use(bodyParser.json());
app.use(cors());


//app.get('/', (req,res) =>{res.send(database.users)});
app.post('/register',(req,res) => {register.handleRegister(req, res, db, bcrypt)});
app.post('/signin' ,(req,res) => {signin.handleSignin(req, res, bcrypt, db)} );
app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res,db)});
app.put('/image',(req,res) => {image.handleImage(req, res, db)});
app.post('/imageurl',(req,res) => {image.handleApiCall(req, res)})

    
app.listen(process.env.PORT || 3001, () =>{
	console.log(`App is running on port ${process.env.PORT}`);
});


/*
	/----> res = this is working
	/signin ----> POST = sucess/fail
	/register ---> POST = user
	/profile?:userId ---> GET = user
	/image --->	PUT ---> user 
*/

