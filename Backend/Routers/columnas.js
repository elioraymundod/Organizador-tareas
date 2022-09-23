const columnas = require('../Models/columnas');
const express = require('express');
const router = express.Router();

router.post('/columnas', (req, res) => {
    columnas.insertColumna(req.body)
        .then(columna => {
            res.status(200).send({
                mesage: 'Se creo la columna correctamente'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al crear la columna'
            });
        });
});

router.get('/columnas/:codigoTablero', (req, res) => {
    columnas.getColumnaByCodigoTablero(req.params.codigoTablero)
        .then(columna => {
            res.status(200).send(columna);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al obtener datos'
            });
        });
});

router.put('/columnas/actualizar', (req, res) => {
    columnas.actualizarColumna(req.body)
        .then(columna => {
            res.status(200).send({
                mesage: 'Se actualizo la columna correctamente'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al crear la columna'
            });
        });
});

module.exports = router;