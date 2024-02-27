const express = require("express")
global.app = express ()
global.config = require("./config").config
var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


global.db = []
global.registroactividad = []

require("./rutas.js")

app.use("/", express.static(__dirname + "/pagina"))

app.listen(config.puerto, () => console.log ("Servidor funcionando por el puerto" + config.puerto))