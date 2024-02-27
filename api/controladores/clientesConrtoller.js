var clientesModel = require("../modelos/clientesModel.js").clientesModel
var clientesController = {}


clientesController.guardar = function (request, response) {

    var datos = {
        nombre: request.body.nombre,
        apellidos: request.body.apellidos,
        direccion: request.body.direccion,
        telefono: request.body.telefono,
        email: request.body.email,
        password: request.body.password,
    }
    
    if (datos.nombre == undefined || datos.nombre == null || datos.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio" })
        return false
    }

    if (datos.apellidos == undefined || datos.apellidos == null || datos.apellidos == "") {
        response.json({ state: false, mensaje: "el campo apellidos es obligatorio" })
        return false
    }

    if (datos.direccion == undefined || datos.direccion == null || datos.direccion == "") {
        response.json({ state: false, mensaje: "el campo direccion es obligatorio" })
        return false
    }

    if (datos.telefono == undefined || datos.telefono == null || datos.telefono == "") {
        response.json({ state: false, mensaje: "el campo telefono es obligatorio" })
        return false
    }

    if (datos.email == undefined || datos.email == null || datos.email == "") {
        response.json({ state: false, mensaje: "el campo email es obligatorio" })
        return false
    }

    if (datos.password == undefined || datos.password == null || datos.password == "") {
        response.json({ state: false, mensaje: "el campo password es obligatorio" })
        return false
    }

    clientesModel.Buscar(datos, function (existe) {
        if (existe == -1) {
            clientesModel.guardar(datos, function (respuesta) {
                response.json(respuesta)
            })
        }
        else {
            response.json({ state: false, mensaje: "El codigo ya existe para este elemento" })
        }
    })


}

clientesController.listar = function (request, response) {
    clientesModel.listar(null, function (respuesta) {
        response.json(respuesta)
    })
}

clientesController.borrar = function (request, response) {
    var datos = {
        email: request.body.email,
        password: request.body.password,  
    }

    if (datos.email == undefined || datos.email == null || datos.email == "") {
        response.json({ state: false, mensaje: "el campo email es obligatorio" })
        return false
    }
    
    if (datos.password == undefined || datos.password == null || datos.password == "") {
        response.json({ state: false, mensaje: "el campo password es obligatorio" })
        return false
    }

    clientesModel.Buscar(datos, function (existe) {
        if (existe == -1) {
            response.json({ state: false, mensaje: "El usuario ya no existe y no se puede borrar" })   
        } else {
            clientesModel.borrar(existe, function (respuesta){
                response.json(respuesta)
            })
        }
    })
}

clientesController.actualizar = function (request, response) {
    
    var datos = {
        nombre: request.body.nombre,
        apellidos: request.body.apellidos,
        direccion: request.body.direccion,
        telefono: request.body.telefono,
        email: request.body.email,
        password: request.body.password,
    }
    
    if (datos.nombre == undefined || datos.nombre == null || datos.nombre == "") {
        response.json({ state: false, mensaje: "el nombre es obligatorio" })
        return false
    }

    if (datos.apellidos == undefined || datos.apellidos == null || datos.apellidos == "") {
        response.json({ state: false, mensaje: "los apellidos son obligatorios" })
        return false
    }

    if (datos.direccion == undefined || datos.direccion == null || datos.direccion == "") {
        response.json({ state: false, mensaje: "la direccion es obligatoria" })
        return false
    }

    if (datos.telefono == undefined || datos.telefono == null || datos.telefono == "") {
        response.json({ state: false, mensaje: "el telefono es obligatorio" })
        return false
    }

    if (datos.email == undefined || datos.email == null || datos.email == "") {
        response.json({ state: false, mensaje: "el email es obligatorio" })
        return false
    }

    if (datos.password == undefined || datos.password == null || datos.password == "") {
        response.json({ state: false, mensaje: "el password es obligatorio" })
        return false
    }


    clientesModel.Buscar(datos, function(posicion){
        if(posicion == -1){
            response.json({state: false,mensaje: "este registro no se puede actualizar"})
        }else{
            datos.posicion = posicion
            clientesModel.actualizar(datos, function(respuesta){
                response.json(respuesta)
            })
        }
    })
}


module.exports.clientesController = clientesController