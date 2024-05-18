const express = require('express');

const app = express();

// Datos

const Data_Dummy = [
    {
        id: '1',
        name: 'Pablo Gallagher',
        pais: 'Chile'
    }
]

//rutas

app.get('/users', (req, res) => {
    console.log('Listening Users');

    res.json({
        status: 'exito',
        data: {
            users: Data_Dummy
        }
    });
});

//Listening global

app.listen(3500, () => {
    console.log('Listening');
});