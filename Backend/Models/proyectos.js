const con = require('../Configs/cone');

module.exports = {
    insertProyecto(proyecto) {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO organizador_tareas.proyectos SET ?';
            con.query(query, [proyecto], (err, rows) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    },

    getProyectoByCodigo(codigoProyecto) {
        return new Promise((resolve, reject) => {
            con.query('select * from organizador_tareas.proyectos where id = ?', codigoProyecto, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    },
    
    getAllProyectos(user) {
        return new Promise((resolve, reject) => {
            con.query('select pr.*, ca.NOMBRE as nombrePrivacidad from organizador_tareas.proyectos as pr '+
            'inner join organizador_tareas.cat_dato as ca on ca.ID = pr.PRIVACIDAD '+
            'where pr.USUARIO_CREACION = ?', user, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }
}