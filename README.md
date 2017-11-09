# REST API for User Control


This API allows the management and control of a database containing user registries. It allows you to insert, query, remove and update records kept in JSON format. The entire application is built in Node.js and the data persisted with MongoDB.


## Routes

- **GET /users -** Returns a JSON array containing all registered users
- **GET /users/:id -** Returns a specific user from the database, identified by its own id
- **POST /users -** Inserts into the database a new register containing necessarily: first name, last name, email and phone
- **PUT /users/:id -** Updates a specific user identified by its own id
- **DELETE /users/:id -** Remove a specific user from the database

## User Model

A user is a JSON document as bellow

```javascript
{
  _id: "54hfs5f87fgfh5",
  first_name: "Bruno",
  last_name: "Koga",
  email: "brunokoga@gmail.com",
  personal_phone: "998877665"
}
```

## How to Run

1. Download and extract the projct
2. Start MongoDB:
```javascript
    $ sudo service mongod start // starts the service
    $ sudo service mongod status // check the status
```
2. On the terminal:
```javascript
    $ cd ~/server
    $ node server.js // by starting the server, it automatically fills the database with 50 random users from FakerJS
```
3. The server is now running at localhost:8080
4. You can manually test all the routes using Postman or similar to manage the entries on the database
5. If you do so, the API will require basic authentication, wich is:
```javascript
    username: admin
    password: theVelops
```
6. It's impossible to register more than one user with the same email adress

## How to Run the Tests with Jest

1. On the terminal:
```javascript
    $ cd ~/server
    $ npm test
```
2. The tests simulate all situations that may occur, evaluating HTTP status responses

