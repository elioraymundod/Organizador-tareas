const con = require('../Configs/cone');

module.exports={
    insertUser(user){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO organizador_tareas.usuarios SET ?';
            con.query(query,[user],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },

    getUserByLoginAndPass(login, pass){
        return new Promise((resolve,reject)=>{
            con.query('select * from organizador_tareas.usuarios where usuario = ? and pass = ?', [login, pass], (err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getAlllUsers(){
        return new Promise((resolve,reject)=>{
            con.query('select us.*, ca.nombre as nombreRol, ti.nombre as nombreTienda from organizador_tareas.usuarios as us ' +
            'inner join sistema_ventas.cat_dato as ca on us.rol = ca.id '+
            'inner join sistema_ventas.tiendas as ti on us.tienda_asignada = ti.id where us.estado = 1', (err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    getCatalogoByCodigo(codigoCatalogo){
        return new Promise((resolve,reject)=>{
            con.query('select * from organizador_tareas.cat_dato as ca ' +
            'where ca.catalogo = ?', codigoCatalogo,(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 

    updateUsuario(usuario){
        return new Promise((resolve,reject)=>{
            let query='UPDATE organizador_tareas.usuarios SET id = ?, nombre=?, usuario = ?, pass=?, usuario_modifica=?, fecha_modifica=?, ip_modifica=? WHERE id = ?';
            con.query(query,[usuario.nit,
                usuario.nombre,
                usuario.usuario,
                usuario.pass,
                usuario.usuario_modifica,
                usuario.fecha_modifica,
                usuario.ip_modifica,
                usuario.nit],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);

            });
        });
    },

    getUsuarioById(id){
        return new Promise((resolve,reject)=>{
            con.query('select * from organizador_tareas.usuarios as us ' +
            'where us.ID = ?', id,(err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }, 
}