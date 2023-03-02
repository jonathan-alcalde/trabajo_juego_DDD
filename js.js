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
import {getFirestore , collection, addDoc,query,where,getDocs,deleteDoc,doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Inicialiar la conexión Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const analytics = getAnalytics(app);

//Inicializar base de datos
const db = getFirestore(app)


/*db.collection("puntuacionmasAlta").get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
        console.log(doc)
    })
});*/
//const obtenerPuntuaciones = getDocs(collection(db,"puntuaciones DAW209"))

////////////////////////////
/*LOGICA DEL JUEGO Y FORMULARIOS*/ 
var recordActual = funcionBd;
var correcto;
var email;
var password;
var fechaInicio = 0;
var fechaFin = 0;
var movido = true;
//var casillaCofre  = Math.floor((Math.random() * 99) + 1);;
var casillaCofre  = 99
var posibilidad1 = 0;
var posibilidad2 = 0;
var posibilidad3 = 0;
var posibilidad4 = 0;
var nTiradas = 0;
var casillaActual = 0;
const time = 2;
const main = document.createElement("main");
let ncancion = Math.floor((Math.random() * 3) + 1);
const audio = document.createElement("audio");
    
    
const audioDado = document.createElement("audio");
audioDado.src = "./recursos/sonidodado.mp3";


function inicio(){
    document.body.appendChild(main);
    generarlogin();
    funcionBd();
    document.body.appendChild(audio);
    audio.src = "./recursos/wuguwoot.mp3";
    audio.autoplay;
    audio.play()
}


function generarlogin(){
    main.textContent = "";
    let contenedorLogin = document.createElement("div");
    main.appendChild(contenedorLogin);
    let formulogin = document.createElement("form");
    let h1 = document.createElement("h1");
    h1.textContent = "iniciar sesion";
    formulogin.appendChild(h1);
    let hr = document.createElement("hr");
    formulogin.appendChild(hr)
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
    inputContra.placeholder = "Introduce una contraseña";
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
        login();
        
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
    let h1 = document.createElement("h1");
    h1.textContent = "REGISTRARSE";
    formulogin.appendChild(h1);
    let hr = document.createElement("hr");
    formulogin.appendChild(hr)
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
    inputContra.placeholder = "Introduce una contraseña";
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
    formulogin.appendChild(btnRegistro);
    formulogin.appendChild(btnLogin);
}


function login(){

    console.log("LOGIN");
        email = document.getElementById("email").value;
        password = document.getElementById('password').value;
        const auth = getAuth();
        //alert(`auth: ${auth} email: ${email}   password: ${password}`)
        signInWithEmailAndPassword(auth,email, password)
        .then(function(user) {
            console.log("User logged in: ", user);
        alert("Loggeo existoso, para jugar pulsa sobre el dado y escoge una casilla");
            main.textContent = "";
            main.appendChild(audio);
        audio.play();
        console.log("Te has logueado con éxito");
        fechaInicio = new Date();
        let contador = document.createElement("header");
        contador.id = "contador"
        contador.textContent = " Has realizado " + nTiradas + " tirada(s)"
        main.appendChild(contador);
        switch(ncancion){
            case 1:
                audio.src = "./recursos/lifewillchange.mp3"
                break;
            case 2:
                audio.src = "./recursos/wof.mp3";
            break;
            case 3:
            audio.src = "./recursos/takeover.mp3";
        }
        audio.autoplay;
        audio.play();
        generarTabla();
        generarDado();
            // Redirigir al panel de usuario o mostrar un mensaje
        })
    .catch(function(error) {
        console.log("Error logging in: ", error);
        alert("Error logging in: ", error)
        // Mostrar mensaje de error
    })
}

function registro() {
    console.log("REGISTER");
    var email = document.getElementById('email').value;;
    var password = document.getElementById('password').value;
    const auth = getAuth();
    //alert(`auth: ${auth} email: ${email}   password: ${password}`)

        createUserWithEmailAndPassword(auth,email, password)
            .then(function(user) {
            console.log("User registered: ", user);
            // Redirigir al panel de usuario o mostrar un mensaje
            alert("User registered: ", user)
            return true;
    })
    .catch(function(error) {
        //Validacion de errores
        if(error.code === 'auth/email-already-in-use'){
            alert("El correo ya está en uso ","error");
        }else if(error.code === 'auth/invalid-email'){
            alert('Correo no válido',"error");
        }else if(error.code === 'auth/weak-password'){
            alert('La constraseña es débil',"error");
        }else if(error.code){
            alert('Error en el sistema',"error");
        }
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
    contenedorTabla.style.width = "50vw";
    contenedorTabla.style.height = "50vh";
    main.appendChild(contenedorTabla);
    
    let casillas = document.getElementsByTagName("td");
    casillas[0].className = "casillaActual"
    casillas[casillaCofre].className = "casillaCofre";
}



function girar(){
    let dado = document.getElementById("dado")
    audioDado.play();
	dado.style.transitionDuration='0ms';
	dado.style.transform='rotateX(360deg) rotateY(1080deg) rotateZ(360deg)';
	setTimeout(tirar,10)
}

function tirar(){
	let contador = document.getElementById("contador");
    contador.textContent = "Has realizado " + nTiradas + " tirada(s)"

    let dado = document.getElementById("dado")
	dado.style.transitionDuration='3s';
	

	//calcular el nÃºmero
    let numero = Math.floor(Math.random()*6)+1;                    
    //hacer la rotaciÃ³n pertinente
    switch(numero){
        case 1: dado.style.transform='rotateX(90deg) rotateY(0deg) rotateZ(0deg)';break;
        case 2: dado.style.transform='rotateX(-90deg) rotateY(0deg) rotateZ(0deg)';break;
        case 3: dado.style.transform='rotateX(0deg) rotateY(90deg) rotateZ(0deg)';break;
        case 4: dado.style.transform='rotateX(0deg) rotateY(270deg) rotateZ(0deg)';break;
        case 5: dado.style.transform='rotateX(0deg) rotateY(0deg) rotateZ(0deg)';break;
        case 6: dado.style.transform='rotateX(0deg) rotateY(180deg) rotateZ(10deg)';break;
    }
    setTimeout(function(){
        pintarCasillas(numero);
    },3100);
    
}

function pintarCasillas(randomValue){
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
}}
function generarDado(){
    
    let contenedorDado = document.createElement("div");
    contenedorDado.className += " container ";
    
    let dado = document.createElement("div");
    dado.id = "dado"
    dado.className += " dado "
    const cube = dado;
    cube.addEventListener('click', () => {
    if(movido){
        movido = false;
        nTiradas++;
        girar();
    }});
    for(let i = 1 ; i <= 6 ; i++){
        let cara  = document.createElement("div");
        cara.className = "cara"
        let img = document.createElement("img");
        switch(i){
            case 1:
                cara.className += " top ";
                img.src = "./recursos/dado1.png"
                img.alt = i;
            break;
            case 2:
                cara.className += " bottom "
                img.src = "./recursos/dado2.png"
                img.alt = i;
            break;
            case 3:
                cara.className += " left "
                img.src = "./recursos/dado3.png"
                img.alt = i;
            break;
            case 4:
                cara.className += " right "
                img.src = "./recursos/dado4.png"
                img.alt = i;
            break;
            case 5:
                cara.className += " front "
                img.src = "./recursos/dado5.png"
                img.alt = i;
            break;
            case 6:
                cara.className += " back "
                img.src = "./recursos/dado6.png"
                img.alt = i;
            break;
            default:
        console.log(`Error`);
        
        }
        
        cara.appendChild(img)
        dado.appendChild(cara)
    }

    
    contenedorDado.appendChild(dado);
    main.appendChild(contenedorDado);
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
main.textContent ="";    
let audio = document.createElement("audio")
console.log("Has ganado en " + nTiradas);
audio.preload = "auto";
audio.src = "./recursos/victory.mp3"
document.body.appendChild(audio);

audio.play();
fechaFin = new Date();

let form = document.createElement("form");
main.appendChild(form);
let h1 = document.createElement("h1");
h1.textContent = "ENHORABUENA";
form.appendChild(h1);
let p = document.createElement("p");
p.textContent = "nombre : " + email;
form.appendChild(p)
let p2 = document.createElement("p");
p2.textContent = "puntuacion : " + nTiradas;
form.appendChild(p2);
let p3 = document.createElement("p");
p3.textContent = "INICIO : DIA/" + fechaInicio.getDate() + "/" + fechaInicio.getMonth() + "/" + fechaInicio.getFullYear() 
+ " hora/" + fechaInicio.getHours() + ":" + fechaInicio.getMinutes() + ":" +fechaInicio.getSeconds();
form.appendChild(p3);
let p4 = document.createElement("p");
p4.textContent = "FIN : DIA/" + fechaFin.getDate() + "/" + fechaFin.getMonth() + "/" + fechaFin.getFullYear() 
+ " hora/" + fechaFin.getHours() + ":" + fechaFin.getMinutes() + ":" +fechaFin.getSeconds();
form.appendChild(p4);

funcionBd(nTiradas,form,email,fechaInicio,fechaFin);
}


async function funcionBd(nTiradas,form,email,fechaInicio,fechaFin){
    let record = 0;
    console.log("Estoy en el evento");
    const users = collection(db, "puntuacionmasAlta");
    const consulta = query(users, where("nombre", "!=", ""));
    const querySnapshot = await getDocs(consulta);
    querySnapshot.forEach((doc) => { 
        record = doc.data();
        console.log(record.tiradas)
        
        
    })

    if(nTiradas < parseInt(record.tiradas)){
        console.log("nuevo record")
        let p5 = document.createElement("p");
        p5.textContent = "Enhorabuena has batido el record de " + record.tiradas + " tiradas";
        form.appendChild(p5)    

        let audioVictoria = document.createElement("audio");
        audioVictoria.src = "./recursos/looking_cool_joker.mp3";
        audioVictoria.autoplay = true
        document.body.appendChild(audioVictoria);

        const washingtonRef = doc(db, "puntuacionmasAlta", "puntuacionMasAlta");
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            nombre: email,
            tiradas: nTiradas,
            fechaInicio:"DIA/" + fechaInicio.getDate() + "/" + fechaInicio.getMonth() + "/" + fechaInicio.getFullYear() 
            + " hora/" + fechaInicio.getHours() + ":" + fechaInicio.getMinutes() + ":" +fechaInicio.getSeconds(),
            fechaFin : "DIA/" + fechaFin.getDate() + "/" + fechaFin.getMonth() + "/" + fechaFin.getFullYear() 
            + " hora/" + fechaFin.getHours() + ":" + fechaFin.getMinutes() + ":" +fechaFin.getSeconds()
        });
        

}
}


window.onload = inicio;