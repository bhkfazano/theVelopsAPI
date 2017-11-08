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

1. Download the projct
2. On the terminal:
```
    $ cd ~/server
    $ node server.js
```

