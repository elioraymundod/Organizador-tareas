const con = require('../Configs/cone');

module.exports = {
    insertColumna(columna) {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO organizador_tareas.columnas_tableros SET ?';
            con.query(query, [columna], (err, rows) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    },

    getColumnaByCodigoTablero(codigoTablero) {
        return new Promise((resolve, reject) => {
            con.query('select * from organizador_tareas.columnas_tableros where ID = ?', codigoTablero, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    },

    actualizarColumna(columna){
        return new Promise((resolve,reject)=>{
            let query='UPDATE organizador_tareas.columnas_tableros SET COLUMNAS = ? WHERE ID = ?';
            con.query(query,[
                columna.COLUMNAS,
                columna.ID],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },
}