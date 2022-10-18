const con = require('../Configs/cone');

module.exports = {
    insertEtiqueta(etiqueta) {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO organizador_tareas.etiquetas SET ?';
            con.query(query, [etiqueta], (err, rows) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    },

    getEtiquetaByCodigo(codigoEtiqueta) {
        return new Promise((resolve, reject) => {
            con.query('select * from organizador_tareas.etiquetas where id = ?', codigoEtiqueta, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    },
    
    getAllEtiquetas(tablero) {
        return new Promise((resolve, reject) => {
            con.query('select * from organizador_tareas.etiquetas where TABLERO=?', tablero, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }
}