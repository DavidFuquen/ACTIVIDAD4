var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel

var usuariosController = {}

var listasoportada = function(cadena,texto){
    for (let a = 0; a < texto.length; a++) {
        var r = cadena.indexOf (texto[a])
        
        if(r == -1){
            return false
        }else{
            if(a == texto.length - 1){
                return true
            }
        }
    
    }
}

usuariosController.guardar = function (request, response){
    
    var datos = {
        cedula: request.body.cedula,
        password: request.body.password,
        pnombre: request.body.pnombre,
        snombre: request.body.snombre,
        papellido: request.body.papellido,
        sapellido: request.body.sapellido,
    }
    if(datos.cedula == undefined || datos.cedula == null || datos.cedula ==""){
        response.json({state:false, mensaje:"el campo cedula es obligatorio"})
        return false
    }
    if(datos.password == undefined || datos.password == null || datos.password ==""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }
    if(datos.pnombre == undefined || datos.pnombre == null || datos.pnombre ==""){
        response.json({state:false, mensaje:"el campo pnombre es obligatorio"})
        return false
    }
    if (datos.pnombre.lenght < 4){
        response.json({ state: false, mensaje: "El pnombre no puede ser inferior a 4 caracteres"})
        return false
    }
    if (datos.pnombre.lenght > 15){
        response.json({ state: false, mensaje: "El pnombre no puede ser superior a 15 caracteres"})
        return false
    }

    var autorizada ="abcdefghijklmnoprstuvwxyz1234567890$"
    var text = datos.pnombre.toLowerCase()

    if(listasoportada(autorizada, text) == false) {
        response.json({state: false, mensaje: "Existe un caracter no permitido"})
        return false
    }
    if(datos.papellido == undefined || datos.papellido == null || datos.papellido ==""){
        response.json({state:false, mensaje:"el campo papellido es obligatorio"})
        return false
    } 
   

    usuariosModel.guardar(datos,function(respuesta){
        response.json(respuesta)
    })
 
    //response.json({state: true, mensaje: "Se almaceno con exito"})
}

usuariosController.listar = function (request, response){
    
    usuariosModel.listar(null,function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.login = function (request, response){
    var datos = {
        cedula: request.body.cedula,
        password: request.body.password,
    }

    if(datos.password == undefined || datos.password == null || datos.password ==""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    if(datos.cedula == undefined || datos.cedula == null || datos.cedula ==""){
        response.json({state:false, mensaje:"el campo cedula es obligatorio"})
        return false
    }

    usuariosModel.login(datos, function(posicion){

    if(posicion == -1){
        response.json({state:false, mensaje: "Credenciales invalidas"})
        return false
    }
    else{
        response.json({state:true, mensaje: "Bienvenido"})
        return false
    }
})
}

usuariosController.actualizarpassword = function (request, response){
    var datos = {
        cedula: request.body.cedula,
        password: request.body.password,
        nuevopass: request.body.nuevopass
    }
    if(datos.password == undefined || datos.password == null || datos.password ==""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    if(datos.cedula == undefined || datos.cedula == null || datos.cedula ==""){
        response.json({state:false, mensaje:"el campo cedula es obligatorio"})
        return false
    }

    if(datos.nuevopass == undefined || datos.nuevopass == null || datos.nuevopass ==""){
        response.json({state:false, mensaje:"el campo nuevopass es obligatorio"})
        return false
    }
    usuariosModel.login(datos,function(posicion){
        if(posicion == -1){
            response.json({state: false, mensaje: "Credenciales invalida no se puede cambiar el password"})
            return false
        }  else {
        
        datos.posicion = posicion    
        usuariosModel.actualizarpassword(datos, function (respuesta){
            response.json(respuesta)
        })
        
      
        }
    })

  
}

usuariosController.borrar = function (request, response) {
    var datos = {
        cedula: request.body.cedula,
    }
    
    if(datos.cedula == undefined || datos.cedula == null || datos.cedula ==""){
        response.json({state:false, mensaje:"el campo cedula es obligatorio"})
        return false
    }

    usuariosModel.buscarporcedula(datos,function(posicion){
        if(posicion == -1){
            response.json({state: false, mensaje: "No se puede borrar porque no esta"})
            return false
        } 
        else {
    
        datos.posicion = posicion
        usuariosModel.borrar(datos, function(respuesta){
            response.json({state: true, mensaje: "Usiario eliminado correctamente"})
        return false
        })
        }

        
    })  
}





module.exports.usuariosController = usuariosController


module.exports.usuariosController = usuariosController