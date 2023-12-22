'use-strict'

/*Variable para ver si ya se ha mostrado un panel por fallar la contraseña*/

var mostradoUnaVez = false;

/*Se cogen los datos del JSON y se guardan en el localStorage del navegador*/

let path = 'json/usuarios.json'

let request = new Request(path, {
    headers: new Headers({
    'Content-Type': 'text/json'
    }),
    method: 'GET'
})
  
fetch(request).then(response => {
    response.json().then(data => {
    localStorage.setItem("usuarios", JSON.stringify(data));
    } )
})

/*Al pulsar el botón se comprueban si los datos son correctos*/

$(document).ready(function(){
    var boton = $("#boton");
    boton.click(function(e){
        e.preventDefault();
        comprobarDatos();
    });
});

/*Función que comprueba los datos*/

function comprobarDatos() {

    /*Coge los valores coge los valores metidos en el formulario y carga los usuarios desde el localStorage*/
    var usuario= $("#usuario").val();
    var contraseña= $("#contraseña").val();
    var usuarios = localStorage.getItem("usuarios");

    /*Parsea los usuarios para poder compararlos*/
    usuarios = JSON.parse(usuarios);

    /*Compara si coinciden*/
    var correcto = "no";
    for (let i=0; i<usuarios.length; i++) {
        if ((usuario == usuarios[i].usuario) && (contraseña == usuarios[i].contraseña) ) {
            correcto= "si";
        }
    }
    if (correcto == "si") {
        /*Cambia de página*/
        window.location.href="juego.html";      
    } else {
        /*Crea un div avisando del error si aún no se había mostrado*/
        if (mostradoUnaVez != true) {
            $( "<div>",{
                text: "El usuario no está registrado",
                id: "noRegistrado",
            }).appendTo("form");
            mostradoUnaVez = true;
        }
        hayCaracteres(contraseña);        
    }
}
/*Función que compara y avisa si hay un carácter especial en la contraseña*/
function hayCaracteres(contraseña) {
    var especiales = "\"!#$%&'()*+,-./:;<=>¿@[\\]^_'{";
    for (let i=0; i<especiales.length; i++) {
        for (let j=0; j<contraseña.length; j++) {
            if (especiales[i] == contraseña[j]) {
                alert("La contraseña contiene un carácter especial no válido: " + especiales[i]);
            }       
        }
    }
}


