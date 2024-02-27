var usuariosModel ={}

usuariosModel.guardar = function(payload, callback){

    db.push(payload)
    return callback({state:true,mensaje: "Usiario Almacenado"})
}

usuariosModel.listar = function(payload, callback){
    return callback ({state:true,db:db})
}

usuariosModel.login = function(payload, callback){
    var posicion =db.findIndex((item) => item.cedula == payload.cedula && item.password == payload.password )
    return callback(posicion)
} 

usuariosModel.actualizarpassword = function(payload, callback){
    db [payload.posicion].password = payload.nuevopass
    return callback({state: true, mensaje: "Password cambiado correctamente!"})
}

usuariosModel.buscarporcedula = function (payload,callback){
    var posicion = db.findIndex((item) => item.cedula == payload.cedula)
    return callback(posicion)
}

usuariosModel.borrar = function (payload, callback){
    db.splice(payload.posicion,1)
    return callback ({state: true})
}
module.exports.usuariosModel = usuariosModel