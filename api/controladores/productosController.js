var productosModel = require("../modelos/productosModel.js").productosModel
var productosController = {}


productosController.guardar = function (request, response) {

    var datos = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
    }
    if (datos.codigo == undefined || datos.codigo == null || datos.codigo == "") {
        response.json({ state: false, mensaje: "el campo codigo es obligatorio" })
        return false
    }

    if (datos.nombre == undefined || datos.nombre == null || datos.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio" })
        return false
    }

    productosModel.Buscar(datos, function (existe) {
        if (existe == -1) {
            productosModel.guardar(datos, function (respuesta) {
                response.json(respuesta)
            })
        }
        else {
            response.json({ state: false, mensaje: "El codigo ya existe para este elemento" })
        }
    })


}

productosController.listar = function (request, response) {
    productosModel.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

productosController.borrar = function (request, response) {
    var datos = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
    }
    if (datos.codigo == undefined || datos.codigo == null || datos.codigo == "") {
        response.json({ state: false, mensaje: "el campo codigo es obligatorio" })
        return false
    }

    productosModel.Buscar(datos, function (existe) {
        if (existe == -1) {
            response.json({ state: false, mensaje: "El codigo ya no existe y no se puede borrar" })   
        } else {
            productosModel.borrar(existe, function (respuesta){
                response.json(respuesta)
            })
        }
    })
}

productosController.actualizar = function (request, response) {
    
    var datos = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
    }
    if (datos.codigo == undefined || datos.codigo == null || datos.codigo == "") {
        response.json({ state: false, mensaje: "el campo codigo es obligatorio" })
        return false
    }

    if (datos.nombre == undefined || datos.nombre == null || datos.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio" })
        return false
    }

    productosModel.Buscar(datos, function(posicion){
        if(posicion == -1){
            response.json({state: false,mensaje: "este registro no se puede actualizar"})
        }else{
            datos.posicion = posicion
            productosModel.actualizar(datos, function(respuesta){
                response.json(respuesta)
            })
        }
    })
}


module.exports.productosController = productosController