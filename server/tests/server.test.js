const expect = require('expect');
const request = require('supertest');
const app = require('./../server');
const {Usuario} = require('./../models/usuario');
const auth = require('http-auth');
const faker = require('faker');

describe('POST /users', function(){

  it('Should create a new user', function(done){

    var user = new Usuario();
    user.first_name = faker.name.firstName();
    user.last_name = faker.name.lastName();
    user.email = faker.internet.email();
    user.personal_phone = faker.phone.phoneNumber();

    request(app)
      .post('/users')
      .auth('admin', 'theVelops')
      .send(user)
      .expect(201)
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('Should not create a new user with invalid body', function(){

    request(app)
      .post('/users')
      .auth('admin', 'theVelops')
      .send(
        {
          "last_name": "Koga",
          "first_name": "Bruno"
        }
      )
      .expect(400)
      .end(function(err, res){
        if (err) {
          return done(err);
        }
      });
  });
});

describe('GET /users/', function(){
  it('Should return a JSON array with all the users registered', function(done){

    request(app)
      .get('/users/')
      .auth('admin', 'theVelops')
      .expect(200)
      .end(done);
  });
});

describe('GET /users/:id', function(){

  it('Should return a specific user identified by its id', function(done){

    var user = new Usuario({first_name: "Bruno", last_name: "Koga", email: faker.internet.email(), personal_phone: "00000000"})

    user.save(function(err, user){
      request(app)
        .get('/users/' + user.id)
        .auth('admin', 'theVelops')
        .expect(200)
        .end(done);
    });
  });

  it('Should not return a user (invalid id)', function(done){

    request(app)
      .get('/users/' + "0")
      .auth('admin', 'theVelops')
      .expect(404)
      .end(done);
  });

});

describe('PUT /users/:id', function(){

  it('Should update a specific user identified by its id', function(done){

    var user = new Usuario({first_name: "Bruno", last_name: "Koga", email: faker.internet.email(), personal_phone: "00000000"})

    user.save(function(err, user){
      request(app)
        .put('/users/' + user.id)
        .auth('admin', 'theVelops')
        .send({last_name: "Fazano", personal_phone: "0"})
        .expect(200)
        .end(done);
    });
  });

  it('Should not update a specific user (invalid id)', function(done){

    request(app)
      .put('/users/' + "0")
      .auth('admin', 'theVelops')
      .send({last_name: "Fazano", personal_phone: "0"})
      .expect(404)
      .end(done);
  });

});

describe('DELETE /users/:id', function(){

  it('Should delete a specific user identified by its id', function(done){

    var user = new Usuario({first_name: "Bruno", last_name: "Koga", email: faker.internet.email(), personal_phone: "00000000"})

    user.save(function(err, user){
      request(app)
        .delete('/users/' + user.id)
        .auth('admin', 'theVelops')
        .expect(200)
        .end(done);
    });
  });

  it('Should not delete a user (invalid id)', function(done){

    request(app)
      .delete('/users/' + "0")
      .auth('admin', 'theVelops')
      .expect(404)
      .end(done);
  });

});
