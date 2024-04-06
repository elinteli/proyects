//Canvas Funcion
const canvas = document.getElementById("canvasGraficarFuncion");
canvas.width = 800;
canvas.height = 800;
const context = canvas.getContext("2d");
const coloresGraficar = ["#a81c1f","#1c7728","#030265","#81008b","#ec9714","#f72e8c","#7c3e00"];
let colorActual = -1;

//Puntos a Ecuacion
let puntoH;
let puntoI;
let puntoJ;
let aEcuacionMetRed;
let bEcuacionMetRed;
let cEcuacionMetRed;
const xPuntoH = document.getElementById("xPuntoH");
const yPuntoH = document.getElementById("yPuntoH");
const xPuntoI = document.getElementById("xPuntoI");
const yPuntoI = document.getElementById("yPuntoI");
const xPuntoJ = document.getElementById("xPuntoJ");
const yPuntoJ = document.getElementById("yPuntoJ");
const puntos = [[xPuntoH,yPuntoH],[xPuntoI,yPuntoI],[xPuntoJ,yPuntoJ]];
let puntoEnfocado = 0; //Punto H
let aumento = 1;
let disminucion = 1;
let zoomBucle;

window.addEventListener("load", function () { //Al iniciar
    //Fondo de la Grafica
    context.scale(1*(5), 1*(5));
    graficarPuntosHIJ();
    document.getElementById("funcion").innerHTML = "f(x) = "+calcularFuncion();
    graficarParabola(aEcuacionMetRed,bEcuacionMetRed,cEcuacionMetRed);
});

//------------- PUNTO -------------//
document.getElementById("canvasGraficarFuncion").addEventListener("click", function(event) {
    let posicion = document.getElementById("canvasGraficarFuncion").getBoundingClientRect(); //Posicion en la pantalla
    let coordX = (event.clientX - posicion.left);     // Obtén la coordenada horizontal del mouse
    let coordY = (event.clientY - posicion.top);     // Obtén la coordenada vertical del mouse
    coordX = ((coordX/25)-8)*aumento; //Coordenada numero normal
    coordY = (-(coordY/25)+8)*aumento; //Coordenada numero normal
    puntos[puntoEnfocado][0].value = parseFloat(coordX.toFixed(1));
    puntos[puntoEnfocado][1].value = parseFloat(coordY.toFixed(1));
    let eventoChange = new Event('change');
    puntos[puntoEnfocado][0].dispatchEvent(eventoChange);
    puntos[puntoEnfocado][1].dispatchEvent(eventoChange);
});

document.getElementById("botonMas").addEventListener("click", function(event) {
    if (aumento >= 1) {
        aumento += 1;
    }
    else {
        disminucion -= 1;
        aumento = 2 / disminucion;
    }
    graficarPuntosHIJ();
    graficarParabola(aEcuacionMetRed,bEcuacionMetRed,cEcuacionMetRed);
});

document.getElementById("botonZoomOriginal").addEventListener("click", function(event) {
    disminucion = 1;
    let valorAumentarPorVuelta = ((aumento - 1)/5);
    let animacionCentrar = setInterval(() => {
        aumento -= valorAumentarPorVuelta;
        if (aumento == 1 || (aumento <= 1.1 && aumento >= 0.9)) {
            clearInterval(animacionCentrar);
            aumento = 1;
        }
        graficarPuntosHIJ();
        graficarParabola(aEcuacionMetRed,bEcuacionMetRed,cEcuacionMetRed);
    }, 1);
});
document.getElementById("botonMenos").addEventListener("click", function(event) {
    if (aumento > 1) {
        aumento -= 1;
    }
    else {
        disminucion += 1;
        aumento = 2 / disminucion;
    }
    graficarPuntosHIJ();
    graficarParabola(aEcuacionMetRed,bEcuacionMetRed,cEcuacionMetRed);
});

for (let i = 0; i < puntos.length; i++) { //Ej: Punto = H
    for (let j = 0; j < puntos[i].length; j++) { //Ej: j = xPuntoH
        puntos[i][j].addEventListener("change", function() {
            graficarPuntosHIJ();
            document.getElementById("funcion").innerHTML = "f(x) = "+calcularFuncion();
            graficarParabola(aEcuacionMetRed,bEcuacionMetRed,cEcuacionMetRed);
        });
        puntos[i][j].addEventListener("focus", function() {
            puntoEnfocado = i;
        });
    }
}

function graficarPuntosHIJ() {
    canvasFondo(canvas, context);
    graficarPunto(xPuntoH.value, yPuntoH.value);
    graficarPunto(xPuntoI.value, yPuntoI.value);
    graficarPunto(xPuntoJ.value, yPuntoJ.value);
}

function obtenerPunto(x, y) {
    return {
        a: Decimal(x).toPower(2),
        b: Decimal(x),
        c: Decimal(1),
        igualdad: Decimal(y)
    };
}

function sumarPuntos(punto1,punto2,variableAEliminar) {
    let newPunto1;
    if (punto1[variableAEliminar] != 0) {
        newPunto1 = { //Dividimos entre la variable a eliminar para que esta sea 1 (x/x = 1). Luego lo multiplicamos por el opuesto de la misma pero del punto 2, para que cuando se sumen de 0 (x + (-x) = 0).
            a: ((new Decimal(punto1.a)).dividedBy(new Decimal(punto1[variableAEliminar]))).times(new Decimal(-punto2[variableAEliminar])),
            b: ((new Decimal(punto1.b)).dividedBy(new Decimal(punto1[variableAEliminar]))).times(new Decimal(-punto2[variableAEliminar])),
            c: ((new Decimal(punto1.c)).dividedBy(new Decimal(punto1[variableAEliminar]))).times(new Decimal(-punto2[variableAEliminar])),
            igualdad: ((new Decimal(punto1.igualdad)).dividedBy(new Decimal(punto1[variableAEliminar]))).times(new Decimal(-punto2[variableAEliminar]))
        }
    }
    else {
        newPunto1 = punto1;
    }
    return {
        a: (newPunto1.a).plus(new Decimal(punto2.a)),
        b: (newPunto1.b).plus(new Decimal(punto2.b)),
        c: (newPunto1.c).plus(new Decimal(punto2.c)),
        igualdad: (newPunto1.igualdad).plus(new Decimal(punto2.igualdad)),
    }
}

function calcularFuncion() {
    if (xPuntoH.value != "0") {
    puntoH = obtenerPunto(xPuntoH.value, yPuntoH.value);
    puntoI = obtenerPunto(xPuntoI.value, yPuntoI.value);
    puntoJ = obtenerPunto(xPuntoJ.value, yPuntoJ.value);
    }
    else {
        puntoH = obtenerPunto(xPuntoJ.value, yPuntoJ.value);
        puntoI = obtenerPunto(xPuntoI.value, yPuntoI.value);
        puntoJ = obtenerPunto(xPuntoH.value, yPuntoH.value);
    }

    //Calcular A
    let sumaDeLosPuntos = sumarPuntos(sumarPuntos(puntoH,puntoJ,"b"),sumarPuntos(puntoH,puntoI,"b"),"c"); //a: num, b: 0, c: 0, igualdad: num
    aEcuacionMetRed = (sumaDeLosPuntos.igualdad).dividedBy(sumaDeLosPuntos.a); //paso el coeficiente de a al otro lado dividiendo

    //Calcular B
    sumaDeLosPuntos = sumarPuntos(sumarPuntos(puntoH,puntoJ,"a"),sumarPuntos(puntoH,puntoI,"a"),"c"); //a: 0, b: num, c: 0, igualdad: num
    bEcuacionMetRed = (sumaDeLosPuntos.igualdad).dividedBy(sumaDeLosPuntos.b); //paso el coeficiente de b al otro lado dividiendo

    //Calcular C
    if (!(new Decimal(xPuntoH.value) == '0' || new Decimal(xPuntoI.value) == '0' || new Decimal(xPuntoJ.value) == '0')) { //Si ningun x de los puntos = 0
        sumaDeLosPuntos = sumarPuntos(sumarPuntos(puntoH,puntoJ,"a"),sumarPuntos(puntoH,puntoI,"a"),"b"); //a: 0, b: 0, c: num, igualdad: num
        cEcuacionMetRed = (sumaDeLosPuntos.igualdad).dividedBy(sumaDeLosPuntos.c); //paso el coeficiente de c al otro lado dividiendo
    }
    else {
        if (new Decimal(xPuntoH.value) == '0') {
            cEcuacionMetRed = yPuntoH.value;
        }
        else if (new Decimal(xPuntoI.value) == '0') {
            cEcuacionMetRed = yPuntoI.value;
        }
        else if (new Decimal(xPuntoJ.value) == '0') {
            cEcuacionMetRed = yPuntoJ.value;
        }
    }
    return simplificarEcuacion((aEcuacionMetRed.toString())+"x² + "+(bEcuacionMetRed.toString())+"x + "+(cEcuacionMetRed.toString())).replace(/x/g,"<i>x</i>");
};

function simplificarEcuacion(ecuacionDesordenada) {
    // Remover espacios en blanco
    ecuacionDesordenada = ecuacionDesordenada.replace(/\s+/g, '');
    // Asegurarse de que no haya dobles signos
    ecuacionDesordenada = ecuacionDesordenada.replace(/\+-/g, '-');
    // Reemplazar "1x" por "x"
    ecuacionDesordenada = ecuacionDesordenada.replace(/(?<![0-9\.])1x/g, 'x') //remplaza todos los 1x que NO tiene antes un numero o un punto
    // Eliminar términos con coeficiente 0x²
    ecuacionDesordenada = ecuacionDesordenada.replace(/(?<![0-9\.])0x²/g, '');
    // Eliminar términos con coeficiente 0x
    ecuacionDesordenada = ecuacionDesordenada.replace(/\+(?<![0-9\.])0x/g, '').replace(/-(?<![0-9\.])0x/g, '');
    // Eliminar +/- 0
    ecuacionDesordenada = ecuacionDesordenada.replace(/\+(?<![0-9\.])0(?![0-9\.])/g, '').replace(/-(?<![0-9])0(?![0-9\.])/g, ''); //Remplaza los +/- 0, siempre y cuando no tenga un numero o punto antes o despues
    // Remover espacios en blanco y asegurarse de que los signos de suma/diferencia estén espaciados
    ecuacionDesordenada = ecuacionDesordenada.replace(/\s+/g, '').replace(/x²\+/g, "x² + ").replace(/x²-/g, "x² - ").replace(/x\+/g, "x + ").replace(/x\-/g, "x - ");
    return ecuacionDesordenada;
  }

function canvasFondo(lienzo, contexto) {
    lienzo.style.display = "inline-block";

    //Borrar el canvas
    contexto.clearRect(0, 0, lienzo.width, lienzo.height);

    //Fondo Blanco
    contexto.fillStyle = "white";
    contexto.fillRect(0, 0, lienzo.width, lienzo.height);

    // Lineas verticales
    for (let i = 0; i < 17; i++){
        contexto.beginPath();
        contexto.moveTo(i*10, 0);
        contexto.lineTo(i*10, 500);
        contexto.strokeStyle = "#c8c8c8";
        contexto.lineWidth = 0.3;
        contexto.stroke();
    }

    // Lineas horizontales
    for (let i = 0; i < 17; i++){
        contexto.beginPath();
        contexto.moveTo(0, i*10);
        contexto.lineTo(500, i*10);
        contexto.strokeStyle = "#c8c8c8";
        contexto.lineWidth = 0.3;
        contexto.stroke();
    }

    // Indice de numeros X
    for (let i = 0; i < 17; i++){
        contexto.font = "3px Arial";
        contexto.fillStyle = "#000";
        contexto.textAlign = "center";
        if (i !== 8 && i !== 0 && i !== 16){
            contexto.fillText(redondearNum((i-8)/aumento), i*10, 84);
        }
        else if (i === 8){ //0
            continue;
        }
        else if (i === 0){ //-8
            contexto.fillText(redondearNum((i-8)/aumento), (i*10)+2, 84); //Para que no quede cortado
        }
        else if (i === 16){ //8
            contexto.fillText(redondearNum((i-8)/aumento), (i*10)-2, 84); //Para que no quede cortado
        }
    }

    // Indice de numeros Y
    for (let i = 0; i < 17; i++){
        contexto.font = "3px Arial";
        contexto.fillStyle = "#000";
        contexto.textAlign = "center";
        if (i !== 8 && i !== 0 && i !== 16){
            contexto.fillText(redondearNum((-i+8)/aumento), 78, i*(10));
        }
        else if (i === 8){ //0
            contexto.fillText(redondearNum((-i+8)/aumento), 78, i*(10)+4); //Para que no quede cortado
        }
        else if (i === 0){ //-8
            contexto.fillText(redondearNum((-i+8)/aumento), 78, i*(10)+3); //Para que no quede cortado
        }
        else if (i === 16){ //5
            contexto.fillText(redondearNum((-i+8)/aumento), 78, i*(10)-1); //Para que no quede cortado
        }
    }    

    //Eje X
    contexto.beginPath();
    contexto.moveTo(0, 80);
    contexto.lineTo(500, 80);
    contexto.strokeStyle = "#000";
    contexto.lineWidth = 0.3;
    contexto.stroke();

    //Eje Y
    contexto.beginPath();
    contexto.moveTo(80, 0);
    contexto.lineTo(80, 500);
    contexto.strokeStyle = "#000";
    contexto.lineWidth = 0.3;
    contexto.stroke();
}

function graficarPunto (x, y) {
    let valorX = parseFloat(x);
    let valorY = parseFloat(y);
    context.beginPath();
    context.strokeStyle = "#191e3a";
    context.fillStyle = "#7d9fe5";
    context.lineWidth = 1;
    context.arc((valorX*10*aumento)+80, (-(valorY)*10*aumento)+80, .5, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
}

function graficarParabola(a,b,c) {
    context.beginPath();
    for (let i = (-10000); i < 10000; i++) {
        let coordenadaX = (i-1)/100;
        // Coordenada Y = Imagen de Coordenada X
        let coordenadaY = (new Decimal(a)).times((new Decimal(coordenadaX)).toPower(2)).plus((new Decimal(b)).times(new Decimal(coordenadaX))).plus(new Decimal(c));
        coordenadaY = parseFloat(coordenadaY);
        context.strokeStyle = "#485d93";
        context.lineWidth = 0.5;
        context.lineTo((coordenadaX*aumento*10)+80, ((-coordenadaY)*aumento*10)+80);
        context.moveTo((coordenadaX*aumento*10)+80, ((-coordenadaY)*aumento*10)+80);
    }
    context.stroke();
}

function redondearNum(numero) {
    if (numero % 1 !== 0) {
        // Si tiene decimales, usar toFixed para formatear a un decimal
        return numero.toFixed(1);
      } else {
        // Si no tiene decimales, devolver el número igual
        return numero;
      }
}