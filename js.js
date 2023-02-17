'use_strict'

/*CONEXION A FIREBASE*/

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

import {firebaseConfig} from "./firebase.js";

// Inicialiar la conexión Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const analytics = getAnalytics(app);

////////////////////////////
/*LOGICA DEL JUEGO Y FORMULARIOS*/ 
var correcto;


var movido = true;
var casillaCofre  = Math.floor((Math.random() * 99) + 1);;
var randomValue = 0;
var posibilidad1 = 0;
var posibilidad2 = 0;
var posibilidad3 = 0;
var posibilidad4 = 0;
var nTiradas = 0;
var casillaActual = 0;
const time = 2;
const main = document.createElement("main");

let ncancion = Math.floor((Math.random() * 6) + 1);
const audio = document.createElement("audio");
    //audio.controls = true;
    //audio.autoplay = true;
    switch(ncancion){
        case 1:
            audio.src = "./recursos/wuguwoot.mp3";
        break;
        case 2:
            audio.src = "./recursos/ark.mp3";
        break;
        case 3:
            audio.src = "./recursos/timetomakehistory.mp3";
        break; 
        case 4:
            audio.src = "./recursos/wof.mp3";
        break;
        case 5:
            audio.src = "./recursos/massdestruction.mp3";
        break;
        default:
            case 1:
            audio.src = "./recursos/takeover.mp3";
    }
    
    
const audioDado = document.createElement("audio");
audioDado.src = "./recursos/sonidodado.mp3";


function inicio(){
    document.body.appendChild(main);
    generarlogin();
    /*document.body.appendChild(audio);
    document.body.appendChild(audioDado);
    audio.play();
    generarTabla();
    generarDado();*/
}
function generarlogin(){
    main.textContent = "";
    let contenedorLogin = document.createElement("div");
    main.appendChild(contenedorLogin);
    let formulogin = document.createElement("form");
    let labelUsuario = document.createElement("label");
    let inputUsuario = document.createElement("input");
    labelUsuario.textContent = "Nombre de Usuario";
    inputUsuario.type = "text";
    inputUsuario.id = "email"
    inputUsuario.placeholder = "Introduce un nombre de usuario";
    let  labelContra = document.createElement("label");
    let inputContra = document.createElement("input");
    labelContra.textContent = "Contraseña";
    inputContra.type = "password";
    inputContra.id = "password"
    inputContra.placeholder = "Introduce un nombre de usuario";
    let btnRegistro = document.createElement("input");
    btnRegistro.type = "button";
    btnRegistro.value = "REGISTRATE"
    btnRegistro.addEventListener("click",()=>{
        generarRegistro();
    });
    let btnLogin= document.createElement("input");
    btnLogin.type = "button"
    btnLogin.value = "INICIAR SESIÓN"
    btnLogin.addEventListener("click",()=>{
        console.log("LOGIN");
        var email = document.getElementById("email").value;
        var password = document.getElementById('password').value;
        const auth = getAuth();
        //alert(`auth: ${auth} email: ${email}   password: ${password}`)
        //signInWithEmailAndPassword(auth,email, password)
        //.then(function(user) {
        //    console.log("User logged in: ", user);
        //    alert("User logged in: ", user);
            main.textContent = "";
            main.appendChild(audio);
        audio.play();
        console.log("Te has logueado con éxito");
        generarTabla();
        generarDado();
            // Redirigir al panel de usuario o mostrar un mensaje
        //})
    /*.catch(function(error) {
        console.log("Error logging in: ", error);
        alert("Error logging in: ", error)
        // Mostrar mensaje de error
    });*/
        
    });
    contenedorLogin.appendChild(formulogin);
    formulogin.appendChild(labelUsuario);
    formulogin.appendChild(inputUsuario);
    formulogin.appendChild(labelContra);
    formulogin.appendChild(inputContra);
    formulogin.appendChild(btnLogin);
    formulogin.appendChild(btnRegistro);
}

function generarRegistro(){
    main.textContent = "";
    main.textContent = "";
    let contenedorLogin = document.createElement("div");
    main.appendChild(contenedorLogin);
    let formulogin = document.createElement("form");
    let labelUsuario = document.createElement("label");
    let inputUsuario = document.createElement("input");
    labelUsuario.textContent = "Nombre de Usuario";
    inputUsuario.type = "text";
    inputUsuario.id = "email";
    inputUsuario.placeholder = "Introduce un nombre de usuario";
    let labelContra = document.createElement("label");
    let inputContra = document.createElement("input");
    labelContra.textContent = "Contraseña";
    inputContra.type = "password";
    inputContra.id = "password"; 
    inputContra.placeholder = "Introduce un nombre de usuario";
    let btnRegistro = document.createElement("input");
    btnRegistro.type = "button";
    btnRegistro.value = "REGISTRATE"
    btnRegistro.addEventListener("click",()=>{
        correcto = registro();
        if(correcto == true){
            console.log("Te has registrado");
            generarlogin();
        }
    });
    let btnLogin= document.createElement("input");
    btnLogin.type = "button"
    btnLogin.value = "VOLVER AL INICIO"
    btnLogin.addEventListener("click",()=>{
        generarlogin();
    });
    contenedorLogin.appendChild(formulogin);
    formulogin.appendChild(labelUsuario);
    formulogin.appendChild(inputUsuario);
    formulogin.appendChild(labelContra);
    formulogin.appendChild(inputContra);
    formulogin.appendChild(btnLogin);
    formulogin.appendChild(btnRegistro);
}

function registro() {
    console.log("REGISTER");
  alert("REGISTER")
    var email = document.getElementById("email").value;;
    var password = document.getElementById('password').value;
    const auth = getAuth();
    alert(`auth: ${auth} email: ${email}   password: ${password}`)
    createUserWithEmailAndPassword(auth,email, password)
    .then(function(user) {
        console.log("User registered: ", user);
        // Redirigir al panel de usuario o mostrar un mensaje
        alert("User registered: ", user)
        return true;
    })
    .catch(function(error) {
        console.log("Error registering: ", error);
        // Mostar mensaje de error
        alert("Error registering: ", error);
        return false;
    });
}


function generarTabla(){
    let idtabla = 0;
    let contenedorTabla = document.createElement("div");
    contenedorTabla.id = "contenedorTabla";
    let tabla = document.createElement("table");
    tabla.id = "tablero";
    let filas = 10;
    let columnas = 10;
    for(let i = 0;i<filas;i++){
        let fila = document.createElement("tr")
        for(let j = 0;j<columnas;j++){
            let columna = document.createElement("td");
            columna.style.border = "solid 1px black"
            columna.id = idtabla;
            columna.addEventListener('click', (eve) => {
                console.log(eve)
                if(eve.target.getAttribute('class') == "casillaPuedeUsarse"){
                    moverJugador(eve);
                }
            }) 
            idtabla++;
            fila.appendChild(columna);
        }
        fila.style.border = "solid 1px black"
        tabla.appendChild(fila)
    }
    tabla.style.border = "solid 10px black";
    tabla.style.borderCollapse = "collapse"
    tabla.style.width = "100%";
    tabla.style.height = "100%";
    contenedorTabla.appendChild(tabla);
    /*tabla.style.backgroundImage = "url(./recursos/mementos.png)";
    tabla.style.backgroundSize = "auto";*/
    contenedorTabla.style.width = "50vw";
    contenedorTabla.style.height = "50vh";
    document.body.appendChild(contenedorTabla);
    
    let casillas = document.getElementsByTagName("td");
    //casillas[0].appendChild(imagen);
    casillas[0].className = "casillaActual"
    casillas[casillaCofre].className = "casillaCofre";
}

function generarDado(){
    let contador = document.createElement("header");
    main.appendChild(contador);

    let contenedorDado = document.createElement("div");
    contenedorDado.className += " container ";
    
    let dado = document.createElement("div");
    dado.className += " cube "
    const cube = dado;
    cube.addEventListener('click', () => {
    if(movido){
        movido = false;
        nTiradas++;
        cube.style.transition = '';
        cube.style.transform = `translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        setTimeout(() => {
            cube.style.transition = `transform ${time}s`;
            randomValue = Math.floor((Math.random() * 6) + 1);
            console.log(`randomValue: ${randomValue}` );
            audioDado.play();
            contador.textContent = "Has lanzado el dado " + nTiradas + " veces ";
            switch(randomValue) {
                case 1:             
                    cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
                    break;
                case 2:
                    cube.style.transform = `translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                    break;
                case 3:
                    cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                    break;
                case 4:
                    cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                    break;
                case 5:
                    cube.style.transform = `translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                    break;
                case 6:
                    cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                    break;
            };
            
        posibilidad1 = casillaActual + randomValue;
        if(casillaActual> 0 && casillaActual< 9 && posibilidad1 > 9){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 9;
        }
        else if(casillaActual> 10 && casillaActual< 19 && posibilidad1 > 19){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 19;
        }
        else if(casillaActual> 20 && casillaActual< 29 && posibilidad1 > 29){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 29;
        }
        else if(casillaActual> 30 && casillaActual< 39 && posibilidad1 > 39){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 39;
        }
        else if(casillaActual> 40 && casillaActual< 49 && posibilidad1 > 49){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 49;
        }
        else if(casillaActual> 50 && casillaActual< 59 && posibilidad1 > 59){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 59;
        }
        else if(casillaActual> 60 && casillaActual< 69 && posibilidad1 > 69){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 69;
        }
        else if(casillaActual> 70 && casillaActual< 79 && posibilidad1 > 79){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 79;
        }
        else if(casillaActual> 80 && casillaActual< 89 && posibilidad1 > 89){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 89;
        }
        else if(casillaActual> 90 && casillaActual< 99 && posibilidad1 > 99){
            //posibilidad1 = posibilidad1 + 100;
            posibilidad1 = 99;
        }
        posibilidad2 = casillaActual- randomValue;
        if(casillaActual> 0 && casillaActual< 9 && posibilidad2 < 0){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 0
        }
        else if(casillaActual> 10 && casillaActual< 19 && posibilidad2 < 10){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 10
        }
        else if(casillaActual> 20 && casillaActual< 29 && posibilidad2 < 20){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 20
        }
        else if(casillaActual> 30 && casillaActual< 39 && posibilidad2 < 30){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 30
        }
        else if(casillaActual> 40 && casillaActual< 49 && posibilidad2 < 40){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 40
        }
        else if(casillaActual> 50 && casillaActual< 59 && posibilidad2 < 50){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 50
        }
        else if(casillaActual> 60 && casillaActual< 69 && posibilidad2 < 60){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 60
        }
        else if(casillaActual> 70 && casillaActual< 79 && posibilidad2 < 70){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 70
        }
        else if(casillaActual> 80 && casillaActual< 89 && posibilidad2 < 80){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 80
        }
        else if(casillaActual> 90 && casillaActual< 99 && posibilidad2 < 90){
            //posibilidad2 = posibilidad2 + 100;
            posibilidad2 = 90
        }

        posibilidad3 = casillaActual+ (randomValue * 10);
        while(posibilidad3 > 100){
            posibilidad3 = posibilidad3 - 10
        }

        posibilidad4 = casillaActual- (randomValue * 10);
        while(posibilidad4 < 0){
            posibilidad4 = posibilidad4 + 10
        }
        if(casillaActual == 0 || casillaActual == 10 || casillaActual == 20
            || casillaActual == 30 || casillaActual == 40 || casillaActual == 50
            || casillaActual == 60 || casillaActual == 70 || casillaActual == 80
            || casillaActual == 90){
                posibilidad2 = null;
        }

        if(casillaActual == 9 || casillaActual == 19 || casillaActual == 29
            || casillaActual == 39 || casillaActual == 49 || casillaActual == 59
            || casillaActual == 69 || casillaActual == 79 || casillaActual == 89
            || casillaActual == 99){
                posibilidad1 = null;
        }


        let tabla = document.getElementsByTagName("td");
        
        for ( let i = 0 ; i < tabla.length; i++) {
            if(tabla[i].getAttribute('id') == casillaActual){
                tabla[i].className = "casillaActual"
            }
            else if ((tabla[i].getAttribute('id') == posibilidad1 || tabla[i].getAttribute('id')== posibilidad2 || tabla[i].getAttribute('id') == posibilidad3 || tabla[i].getAttribute('id') == posibilidad4 )){
                if(tabla[i].className != "casillaUsada"){
                    tabla[i].setEnabled = true;
                    tabla[i].className = "casillaPuedeUsarse"
                }
                
            }else if(tabla[i].getAttribute('id') != casillaActual){

                if(tabla[i].className != "casillaUsada" ){
                    tabla[i].setEnabled = false;
                    tabla[i].className = " "
                }
                
                if(tabla[i].getAttribute('id') == casillaCofre){
                    tabla[i].className = "casillaCofre";
                }
            }


        }
        }, time * 10);
    }

    });
    for(let i = 1 ; i <= 6 ; i++){
        let cara  = document.createElement("div");
        cara.className = "cube-face"
        switch(i){
            case 1:
                cara.className += " front "
            break;
            case 2:
                cara.className += " bottom "
            break;
            case 3:
                cara.className += " left "
            break;
            case 4:
                cara.className += " right "
            break;
            case 5:
                cara.className += " top "
            break;
            case 6:
                cara.className += " back "
            break;
            default:
        console.log(`Error`);
        }

        let dentro = document.createElement("div");
        dentro.className = "inside";
        
        
        for(let j = 1 ; j <= i ; j++){
            let span = document.createElement("span");
            span.className = "dot"
            dentro.appendChild(span);
        }
        cara.appendChild(dentro);
        dado.appendChild(cara)
    }

    
    contenedorDado.appendChild(dado);
    document.body.appendChild(contenedorDado);
}


function moverJugador(eve){
    let tablero = document.getElementsByTagName("td");
    if(!movido){
        
        for(let i = 0; i < tablero.length ; i++){
            if(tablero[i].getAttribute("id") == eve.target.getAttribute("id")){
                tablero[i].className = "casillaActual";
                movido = true;
              //  tablero[i].getAttribute("enable") = false;
            }
            else if(tablero[i].getAttribute("id") == casillaActual){
                tablero[i].className = "casillaUsada";
            }
            
        }
        casillaActual = parseInt(eve.target.getAttribute("id"));
        console.log("La casilla actual es " + casillaActual)
        if(casillaActual == casillaCofre){
            victoria();
        }
    }
   
    
}



function victoria(){
    console.log("Has ganado en " + nTiradas);
 //audio = document.createElement("audio");
audio.preload = "auto";
//audio.src = "https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3";
audio.src = "./recursos/victory.mp3"

let audioVictoria = document.createElement("audio");
audioVictoria.src = "./recursos/looking_cool_joker.mp3";
audioVictoria.autoplay = true
document.body.appendChild(audioVictoria);
audio.play();

}


window.onload = inicio;