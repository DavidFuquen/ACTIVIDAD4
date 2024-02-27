var productos = []
var productosModel = {}

productosModel.Buscar = function(payload, callback){
    var posicion = productos.findIndex((item) => item.codigo == payload.codigo)
    return callback(posicion)
}

productosModel.guardar = function(payload, callback){
    productos.push({codigo: payload.codigo, nombre:payload.nombre})
    return callback({state:true, mensaje: "el elemento se guardo correctamente"})
}

productosModel.listar = function(payload,callback){
    return callback({state:true,datos:productos })
}

productosModel.borrar = function(posicion,callback){
    productos.splice(posicion, 1)
    return callback({state:true,mensaje: "Elemento borrado correctamente" })
}

productosModel.actualizar = function(payload,callback){
    productos[payload.posicion].nombre = payload.nombre
    return callback({state:true,mensaje: "Elemento actualizado correctamente" })
}

module.exports.productosModel = productosModel