const etiqueta = require('../Models/etiqueta');
const express = require('express');
const router = express.Router();

router.post('/etiqueta', (req, res) => {
    etiqueta.insertEtiqueta(req.body)
        .then(etiqueta => {
            res.status(200).send({
                mesage: 'Se creo la etiqueta correctamente'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al crear etiqueta'
            });
        });
});

router.get('/etiqueta/:codigoEtiqueta', (req, res) => {
    etiqueta.getEtiquetaByCodigo(req.params.codigoEtiqueta)
        .then(etiqueta => {
            res.status(200).send(etiqueta);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al obtener datos'
            });
        });

});

router.get('/obtener/all/etiqueta', (req, res) => {
    etiqueta.getAllEtiquetas()
        .then(etiqueta => {
            res.status(200).send(etiqueta);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al obtener datos'
            });
        });

});

module.exports = router;