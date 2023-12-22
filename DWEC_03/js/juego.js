'use-strict'

//Se define el cuadrado que limita el juego
const cuadrado = document.querySelector(".cuadrado")

//Se crean y se posicionan los cuatro bloques

//Bloque de abajo
var posicionBloqueAbajo = [200,-20]

var bloqueAbajo = document.createElement("div")
bloqueAbajo.classList.add("bloqueHorizontal")

function dibujarBloqueAbajo() {
    bloqueAbajo.style.left = posicionBloqueAbajo[0] + "px"
    bloqueAbajo.style.bottom = posicionBloqueAbajo[1] + "px"
}
cuadrado.append(bloqueAbajo)
dibujarBloqueAbajo()

//Bloque de arriba
var posicionBloqueArriba = [200,500]

var bloqueArriba = document.createElement("div")
bloqueArriba.classList.add("bloqueHorizontal")

function dibujarBloqueArriba() {
    bloqueArriba.style.left = posicionBloqueArriba[0] + "px"
    bloqueArriba.style.bottom = posicionBloqueArriba[1] + "px"
}
cuadrado.append(bloqueArriba)
dibujarBloqueArriba()

//Bloque de la izquierda
var posicionBloqueIzq = [-20,200]

var bloqueIzq = document.createElement("div")
bloqueIzq.classList.add("bloqueVertical")

function dibujarBloqueIzq() {
    bloqueIzq.style.left = posicionBloqueIzq[0] + "px"
    bloqueIzq.style.bottom = posicionBloqueIzq[1] + "px"
}
cuadrado.append(bloqueIzq)
dibujarBloqueIzq()

//Bloque de la derecha
var posicionBloqueDer = [500,200]

var bloqueDer = document.createElement("div")
bloqueDer.classList.add("bloqueVertical")

function dibujarBloqueDer() {
    bloqueDer.style.left = posicionBloqueDer[0] + "px"
    bloqueDer.style.bottom = posicionBloqueDer[1] + "px"
}
cuadrado.append(bloqueDer)
dibujarBloqueDer()

//Mover los bloques con teclas
document.addEventListener("keydown", moverBloques)

function moverBloques(e) {
    switch(e.key) {
        case "ArrowUp":
        case "w":
            if (posicionBloqueIzq[1] < 400) {
                posicionBloqueIzq[1] += 10
                posicionBloqueDer[1] += 10
                dibujarBloqueIzq()
                dibujarBloqueDer()
            }
            break
        case "ArrowDown":
        case "s":
            if (posicionBloqueIzq[1] > 0) {
                posicionBloqueIzq[1] -= 10
                posicionBloqueDer[1] -= 10
                dibujarBloqueIzq()
                dibujarBloqueDer()
            }
            break
        case "ArrowLeft":
        case "a":
            if (posicionBloqueAbajo[0] > 0) {
                posicionBloqueAbajo[0] -= 10
                posicionBloqueArriba[0] -= 10
                dibujarBloqueAbajo()
                dibujarBloqueArriba()
            }
            break 
        case "ArrowRight":
        case "d":
            if (posicionBloqueAbajo[0] < 400) {
                posicionBloqueAbajo[0] += 10
                posicionBloqueArriba[0] += 10
                dibujarBloqueAbajo()
                dibujarBloqueArriba()
            }
            break    
    }
}

//Bola
var posicionBola = [250,250]
var radio= 10

var bola = document.createElement("div")
bola.classList.add("bola")
function dibujarBola(){
    bola.style.left = posicionBola[0]-radio + "px"
    bola.style.bottom = posicionBola[1]-radio + "px"
}
cuadrado.append(bola)
dibujarBola()

//Elegir bola
var color1= document.querySelector(".color1");
color1.addEventListener("click",function(){
    bola.style.backgroundColor = "green"
})

var color2= document.querySelector(".color2");
color2.addEventListener("click",function(){
    bola.style.backgroundColor = "rgb(0, 140, 255)"
})

var color3= document.querySelector(".color3");
color3.addEventListener("click",function(){
    bola.style.backgroundColor = "yellow"
})

//Mover la bola
movimientoBolaX = Math.sqrt(Math.random()*4.8+1.6)
movimientoBolaY = Math.sqrt(8 - (movimientoBolaX)**2)
movimientoBola=[movimientoBolaX,movimientoBolaY]

function moverBola() {
    posicionBola[0] += movimientoBola[0]
    posicionBola[1] += movimientoBola[1]
    dibujarBola()
}


//Cambiar dirección al chocar
function cambiarDireccion(){
    if((posicionBola[0] <= radio) || (posicionBola[0] >= 500-radio))  {
        if((posicionBloqueIzq[1] <= posicionBola[1]) && (posicionBloqueIzq[1] >= posicionBola[1] - 100)) {
            movimientoBola[0] = -movimientoBola[0]
        }   
    }
    if ((posicionBola[1] <= radio ) || (posicionBola[1] >= 500-radio)) {
        if((posicionBloqueAbajo[0] <= posicionBola[0]) && (posicionBloqueAbajo[0] >= posicionBola[0] - 100)) {
            movimientoBola[1] = -movimientoBola[1]
        }
    }
}

//Revisa si la bola se ha salido
function revisarGameOver() {
    if ((posicionBola[0]>500) || 
    (posicionBola[1]>500) || 
    (posicionBola[0]<0) || 
    (posicionBola[1]<0)){
        alert("Game Over")
        document.location.reload()
        clearInterval(timer)
    }   
}

//Empezar juego
let timer 

var start= document.querySelector("p");
start.addEventListener("click",empezarJuego)

var empezado=false

function empezarJuego() { 
    if (empezado == false){
        timer= setInterval(function() {
            moverBola()
            revisarGameOver()
            cambiarDireccion()
        }, 20)
        empezado=true
    }  
}






