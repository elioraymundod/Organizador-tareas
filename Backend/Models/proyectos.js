const con = require("../Configs/cone");

module.exports = {
  insertProyecto(proyecto) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO organizador_tareas.proyectos SET ?";
      con.query(query, [proyecto], (err, rows) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  },

  getProyectoByCodigo(codigoProyecto) {
    return new Promise((resolve, reject) => {
      con.query(
        "select * from organizador_tareas.proyectos where id = ?",
        codigoProyecto,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  getAllProyectos(user) {
    return new Promise((resolve, reject) => {
      con.query(
        "select distinct pr.*, ca.NOMBRE as nombrePrivacidad from organizador_tareas.proyectos as pr " +
          "inner join organizador_tareas.cat_dato as ca on ca.ID = pr.PRIVACIDAD  " +
          "where (pr.USUARIO_CREACION = ?) or (pr.ID in (select usu.PROYECTO " +
          "from organizador_tareas.usuarios_proyectos as usu  " +
          "where usu.USUARIO = (select usua.EMAIL from organizador_tareas.usuarios as usua where usua.ID = ?)))",
        [user, user],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  putProyectoByCodigo(tablero) {
    console.log("data recibida =>", tablero);
    return new Promise((resolve, reject) => {
      let query =
        "UPDATE organizador_tareas.proyectos SET NOMBRE = ?, ABREVIATURA = ?, DESCRIPCION = ?, PRIVACIDAD = ? WHERE ID = ?";
      con.query(
        query,
        [
          tablero.NOMBRE,
          tablero.ABREVIATURA,
          tablero.DESCRIPCION,
          tablero.PRIVACIDAD,
          tablero.ID,
        ],
        (err, rows) => {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  },

  eliminarProyectoByCodigo(idProyecto) {
    return new Promise((resolve, reject) => {
      let query = "DELETE FROM organizador_tareas.proyectos WHERE ID = ?";
      con.query(query, idProyecto, (err, rows) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  },
};
