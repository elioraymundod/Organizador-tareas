const users = require('../Models/usuariosTableros');
const express = require('express');
const router = express.Router();


router.post('/usuarios-tableros', (req, res) => {
    users.insertUser(req.body)
        .then(user => {
            res.status(200).send({
                mesage: 'Se creo el registro correctamente'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al crear un usuario'
            });
        });
});

router.get('/get/all/usuarios/tablero/:codigoTablero', (req, res) => {
    users.getUsuariosByTablero(req.params.codigoTablero)
        .then(usuarios => {
            res.status(200).send(usuarios);
        })
        .catch(err => {
            console.error(err);
            res.status(404).send({
                mesage: 'Error al obtener datos'
            });
        });
});

module.exports = router;