const express = require('express');

const UsersRouter = require('./rutas/user');

const app = express();

//rutas

app.use('/api/v1/users', UsersRouter);

//Listening global

app.listen(3500, () => {
    console.log('Listening');
});