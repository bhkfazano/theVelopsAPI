// Import modules
var express = require('express'),
 		auth = require('http-auth'),
 		{mongoose} = require('./db/mongoose'),
 		bodyParser = require('body-parser'),
    faker = require('faker');

// Import user model
var {Usuario} = require('./models/usuario');

var objectId = require('mongodb').ObjectId;

var app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// http-auth
var basic = auth.basic({
	realm: 'RESTRITO'
}, function(username, password, callback){
	callback(username == 'admin' && password == 'theVelops');
});
var authMiddleWare = auth.connect(basic);

// Initialize
var port = 8080;
app.listen(port);
console.log('Servidor HTTP esta escutando na porta ' + port);

/****************************************************************/
// Fill database with fake data from FakerJS
// Every time the server initializes it posts 50 new random users
for (var i = 0; i < 50; i++) {
  var user = new Usuario();
  user.first_name = faker.name.firstName();
	user.last_name = faker.name.lastName();
	user.email = faker.internet.email();
	user.personal_phone = faker.phone.phoneNumber();
  user.save();
}
/****************************************************************/

/**
	* GET /
	* Sends a welcome message to the user
*/
app.get('/', function(req, res){
	res.send({msg:'Bem Vindo!'});
});

/**
	* POST /users
	* Inserts a new 'user' into the database
*/
app.post('/users', authMiddleWare, function(req, res){

	var usuario = new Usuario();
	usuario.first_name = req.body.first_name;
	usuario.last_name = req.body.last_name;
	usuario.email = req.body.email;
	usuario.personal_phone = req.body.personal_phone;

	usuario.save(function(err, usuario){
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(201).json(usuario);
		}
	});
});

/**
	* GET /users
	* Returns an array of JSON with all the users registered in the database
*/
app.get('/users', authMiddleWare, function(req, res){

	Usuario.find(function(err, users){
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json(users);
		}
	});
});

/**
	* GET /users/:id
	* Returns a specific user identified by its id
*/
app.get('/users/:id', authMiddleWare, function(req, res){

	var id = req.params.id;
	if (!objectId.isValid(id)) {
		return res.status(404).send();
	}

	Usuario.findById(id, function(err, users){
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(200).json(users);
		}
	});
});

/**
	* DELETE /users/:id
	* Excludes a specific user from the database
*/
app.delete('/users/:id', authMiddleWare, function(req, res){

	var id = req.params.id;
	if (!objectId.isValid(id)) {
		return res.status(404).send();
	}
	Usuario.findByIdAndRemove(id, function(err, users){
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(200).json(users);
		}
	});
});

/**
	* PUT /users/:id
	* Updates one or more user properties
*/
app.put('/users/:id', authMiddleWare, function(req, res){
  
	var id = req.params.id;
	if (!objectId.isValid(id)) {
		return res.status(404).send();
	}
	Usuario.findByIdAndUpdate(id, {$set : req.body}, {}, function(err, users){
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json({'Status' : 'Atualizado com sucesso'});
		}
	});
});

module.exports = app;
