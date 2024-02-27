var clientes = []
var clientesModel = {}

clientesModel.Buscar = function(payload, callback){
    var posicion = clientes.findIndex((item) => item.codigo == payload.codigo)
    return callback(posicion)
}

clientesModel.guardar = function(payload, callback){
    clientes.push(payload)
    return callback({state:true, mensaje: "el elemento se guardo correctamente"})
}

clientesModel.listar = function(payload,callback){
    return callback({state:true,datos:clientes })
}

clientesModel.borrar = function(posicion,callback){
    clientes.splice(posicion, 1)
    return callback({state:true,mensaje: "Elemento borrado correctamente" })
}

clientesModel.actualizar = function(payload,callback){
    clientes[payload.posicion].nombre = payload.nombre
    clientes[payload.posicion].apellidos = payload.apellidos
    clientes[payload.posicion].direccion = payload.direccion
    clientes[payload.posicion].telefono = payload.telefono
    clientes[payload.posicion].email = payload.email
    clientes[payload.posicion].password = payload.password
    return callback({state:true,mensaje: "Elemento actualizado correctamente" })
}

module.exports.clientesModel = clientesModel