// Datos

const Data_Dummy = [
    {
        id: '1',
        name: 'Pablo Gallagher',
        pais: 'Chile'
    }
]

const getAllUsers = (req, res) => {
    console.log('Listening Users');

    res.json({
        status: 'exito',
        data: {
            users: Data_Dummy
        }
    });
}

module.exports = {
    getAllUsers
}