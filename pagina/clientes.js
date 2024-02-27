var crearmensaje = function (tipo, mensaje) {
  var mismensajes = document.getElementById("mismensajes")
  mismensajes.innerHTML = `<div class="alert alert-${tipo}" role="alert">
                           ${mensaje}
                           </div>`
}

var peticion = function (tipo, url, payload, callback) {


  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var respuesta = JSON.parse(this.responseText);
      return callback(respuesta)
    }
  });

  xhr.open(tipo, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(payload);
}


var guardar = function () {

  var nombre = document.getElementById("nombre").value
  var apellidos = document.getElementById("apellidos").value
  var direccion = document.getElementById("direccion").value
  var telefono = document.getElementById("telefono").value
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
  



  var payload = "nombre=" + nombre + "&apellidos=" + apellidos + "&direccion=" + direccion + "&telefono=" + telefono + "&email" + email + "&password" + password + "";

  peticion("POST", "http://localhost:3000/clientes/guardar", payload, function (respuesta) {
    if (respuesta.state == false) {
      crearmensaje("danger", respuesta.mensaje)
    }
    else {
      crearmensaje("success", respuesta.mensaje)
      listar()
    }
  })
}

var listar = function (){
  var payload = "";

  peticion("POST", "http://localhost:3000/clientes/listar", payload, function (respuesta) {
   var misdatos = document.getElementById("datos")
   misdatos.innerHTML = ""

  for (let a = 0; a < respuesta.datos.length; a++) {
      misdatos.innerHTML += `<tr>
      <th scope="row">${respuesta.datos[a].nombre}</th>
      <td>${respuesta.datos[a].apellidos}</td>
      <td>${respuesta.datos[a].direccion}</td>
      <td>${respuesta.datos[a].telefono}</td>
      <td>${respuesta.datos[a].email}</td>
      <td>${respuesta.datos[a].password}</td>
  </tr>`
      
    }
  })
}

listar()