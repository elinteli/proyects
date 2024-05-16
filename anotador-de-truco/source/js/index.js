
let paloACambiar;
let puntosNos = 0;
let puntosEllos = 100;
let puntos;
let numeroSumar;
let opacidadFinal;
let faseDeJuegoNos = "malas";
let faseDeJuegoEllos = "malas";
let contadorNos = document.getElementById("contadorNos");
let contadorEllos = document.getElementById("contadorEllos");
let puntosGanar = 20;
let menu;
let mostradorPuntosGanar;
let alertaDiv;
let partida = 1;


function cambiarOpacidadPalos(idInicio, cantidad, opacidad){
    for (let id=idInicio; id<idInicio+cantidad;id++){
        paloACambiar = document.getElementById(id);
        paloACambiar.style.opacity = opacidad;
    }
}

function sumarRestarPuntos(equipo, accion) {
if (partida == 1){
    if (accion == "sumar") {
        numeroSumar = 1;
        opacidadFinal = 1;

        if ((equipo == "nos") && (faseDeJuegoNos == "malas")) {
            if (puntosNos == (puntosGanar - 1)){
                faseDeJuegoNos = "buenas";
                puntosNos -= puntosGanar;
                cambiarOpacidadPalos(1,puntosGanar,0);
            }
        } 
        else if ((equipo == "ellos") && (faseDeJuegoEllos == "malas")){
            if ((puntosEllos - 100) == (puntosGanar - 1)){
                faseDeJuegoEllos = "buenas";
                puntosEllos -= puntosGanar;
                cambiarOpacidadPalos(101,puntosGanar,0 );
            }
        }

        if ((equipo == "nos") && (faseDeJuegoNos == "buenas")) {
            if (puntosNos == (puntosGanar - 1)){
                alertaDiv = document.getElementById("alerta");
                let inputNos = document.getElementById("inputnos");
                alertaDiv.className = "alerta";
                alertaDiv.style.backgroundColor = "#5555ff";
                alertaDiv.innerHTML += "¡Felicidades, Gano " + inputNos.value + "!";
                partida = 0;
            }
        } 
        else if ((equipo == "ellos") && (faseDeJuegoEllos == "buenas")){
            if ((puntosEllos - 100) == (puntosGanar - 1)){
                alertaDiv = document.getElementById("alerta");
                let inputEllos = document.getElementById("inputellos");
                alertaDiv.className = "alerta";
                alertaDiv.style.backgroundColor = "#11bb55";
                alertaDiv.innerHTML += "¡Felicidades, Gano " + inputEllos.value + "!";
                partida = 0;
            }
        }
    }
    else if (accion == "restar"){
        numeroSumar = -1;
        opacidadFinal = 0;

        if (equipo == "nos" && puntosNos == 0) {
            numeroSumar = 0;
        } 
        
        else if (equipo == "ellos" && (puntosEllos - 100) == 0) {
            numeroSumar = 0;
        } 

        if ((equipo == "nos") && (faseDeJuegoNos == "buenas")) {
            if (puntosNos == 0){
                faseDeJuegoNos = "malas";
                puntosNos += (puntosGanar - 1);
                cambiarOpacidadPalos(1,(puntosGanar - 1),1);
            }
        } 
        else if ((equipo == "ellos") && (faseDeJuegoEllos == "buenas")){
            if ((puntosEllos - 100) == 0){
                faseDeJuegoEllos = "malas";
                puntosEllos += (puntosGanar - 1);
                cambiarOpacidadPalos(101,(puntosGanar - 1),1);
            }
        }
    }

if (equipo == "nos") {
    puntosNos += numeroSumar;
    puntos = puntosNos;
} 

else if (equipo == "ellos"){
    puntosEllos += numeroSumar;
    puntos = puntosEllos;
}

    if (accion == "sumar") {
        paloACambiar = document.getElementById(puntos);
    }
    else if (accion == "restar"){
        paloACambiar = document.getElementById(puntos + 1);

}

    puntosDeContador();
    paloACambiar.style.opacity = opacidadFinal;
    }
}

function puntosDeContador() {
if (faseDeJuegoNos == "malas") {
    contadorNos.innerHTML = puntosNos + " Malas";
} 
else if (faseDeJuegoNos == "buenas"){
    contadorNos.innerHTML = puntosNos + " Buenas";
}

if (faseDeJuegoEllos == "malas") {
    contadorEllos.innerHTML = (puntosEllos - 100) + " Malas";
} 
else if (faseDeJuegoEllos == "buenas"){
    contadorEllos.innerHTML = (puntosEllos - 100) + " Buenas";
}
}

function mostrarMenu() {
    if (partida == 1){
    menu = document.getElementById("menu");

    if (menu.className == "displaynone") {
        menu.className = "displayinline"; 
    } else {
        menu.className = "displaynone";
    }
}
}

function cambiarPuntosGanar(nuevosPG){
    puntosGanar = nuevosPG;
    mostradorPuntosGanar = document.getElementById("ajustes");
    mostradorPuntosGanar.innerHTML = ""+(puntosGanar * 2);
    menu = document.getElementById("menu");
    menu.className = "displaynone";
    puntosNos = 0;
    puntosEllos = 100;
    faseDeJuegoEllos = "malas";
    faseDeJuegoNos = "malas";
    cambiarOpacidadPalos(1,20,0);
    cambiarOpacidadPalos(101,20,0);
    puntosDeContador();
}

function empezarNuevaPartida() {
    window.location.reload();
}