var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

//CREATE
app.post("/usuarios/guardar", function (request, response){
    usuariosController.guardar(request, response)
})
//READ
app.post("/usuarios/listar" ,function(request,response){
    usuariosController.listar(request,response)
})
//READ
app.post("/usuarios/login" , function(request,response){
    usuariosController.login(request, response)
})
//UPDATE
app.post("/usuarios/actualizarpassword", function(request, response){
    usuariosController.actualizarpassword(request,response)
})
//DELETE
app.post("/usuarios/borrar", function(request, response){
    usuariosController.borrar(request, response)
})



var productosController = require("./api/controladores/productosController.js").productosController


app.post("/productos/guardar", function (request, response){
    productosController.guardar(request, response)
})

app.post("/productos/listar" ,function(request,response){
    productosController.listar(request,response)
})

app.post("/productos/borrar", function(request, response){
    productosController.borrar(request, response)
})

app.post("/productos/actualizar", function(request, response){
    productosController.actualizar(request, response)
})


var clientesController = require("./api/controladores/clientesConrtoller.js").clientesController


app.post("/clientes/guardar", function (request, response){
    clientesController.guardar(request, response)
})

app.post("/clientes/listar" ,function(request,response){
    clientesController.listar(request,response)
})

app.post("/clientes/borrar", function(request, response){
    clientesController.borrar(request, response)
})

app.post("/clientes/actualizar", function(request, response){
    clientesController.actualizar(request, response)
})

