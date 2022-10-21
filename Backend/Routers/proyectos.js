const proyectos = require("../Models/proyectos");
const express = require("express");
const router = express.Router();

router.post("/proyectos", (req, res) => {
  proyectos
    .insertProyecto(req.body)
    .then((proyectos) => {
      res.status(200).send({
        mesage: "Se creo el proyecto correctamente",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        mesage: "Error al crear el proyecto",
      });
    });
});

router.get("/proyectos/:codigoProyecto", (req, res) => {
  proyectos
    .getProyectoByCodigo(req.params.codigoProyecto)
    .then((proyectos) => {
      res.status(200).send(proyectos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        mesage: "Error al obtener datos",
      });
    });
});

router.get("/obtener/all/proyectos/:usuario", (req, res) => {
  proyectos
    .getAllProyectos(req.params.usuario)
    .then((proyectos) => {
      res.status(200).send(proyectos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        mesage: "Error al obtener datos",
      });
    });
});

router.put("/actualizar/proyecto", (req, res) => {
  //console.log("request =>", req.body);
  proyectos
    .putProyectoByCodigo(req.body)
    .then(() => {
      res.status(200).send({
        mesage: "Se actualizaron los datos correctamente",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        mesage: "Error al actualizar datos",
      });
    });
});

router.delete("/eliminar/proyecto/:codigoProyecto", (req, res) => {
  proyectos
    .eliminarProyectoByCodigo(req.params.codigoProyecto)
    .then(() => {
      res.status(200).send({
        mesage: "Se eliminaron los datos correctamente",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        mesage: "Error al actualizar datos",
      });
    });
});
module.exports = router;
