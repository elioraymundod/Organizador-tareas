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
    
    getAllProyectos() {
        return new Promise((resolve, reject) => {
            con.query('select * from organizador_tareas.proyectos', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }
}