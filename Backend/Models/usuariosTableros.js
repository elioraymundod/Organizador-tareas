const con = require('../Configs/cone');

module.exports = {
    insertUser(user) {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO organizador_tareas.usuarios_proyectos SET ?';
            con.query(query, [user], (err, rows) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    },

    getUsuariosByTablero(codigoTablero) {
        return new Promise((resolve, reject) => {
            con.query('select DISTINCT * from organizador_tareas.usuarios as us ' +
                'where us.id = (select ct.USUARIO_CREACION from organizador_tareas.proyectos as ct where ct.ID = ?) OR ' +
                '(us.id in (select DISTINCT uss.id from organizador_tareas.usuarios as uss ' +
                'where uss.email in (select upp.USUARIO from organizador_tareas.usuarios_proyectos as upp where upp.PROYECTO = ?)))', [codigoTablero, codigoTablero], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                })
        })
    },

}