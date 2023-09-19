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

window.addEventListener("load", function () { //Al iniciar
    //Fondo de la Grafica
    context.scale(1*(5), 1*(5));
    canvasFondo(canvas, context);
});

//------------- PUNTO -------------//
document.getElementById("canvasGraficarFuncion").addEventListener("click", function(event) {
    let posicion = document.getElementById("canvasGraficarFuncion").getBoundingClientRect(); //Posicion en la pantalla
    let coordX = (event.clientX - posicion.left);     // Obtén la coordenada horizontal del mouse
    let coordY = (event.clientY - posicion.top);     // Obtén la coordenada vertical del mouse
    coordX = (coordX/25)-8; //Coordenada numero normal
    coordY = -(coordY/25)+8; //Coordenada numero normal
    puntos[puntoEnfocado][0].value = parseFloat(coordX.toFixed(1));
    puntos[puntoEnfocado][1].value = parseFloat(coordY.toFixed(1));
    //graficarPunto(coordX, coordY)
    let eventoChange = new Event('change');
    puntos[puntoEnfocado][0].dispatchEvent(eventoChange);
    puntos[puntoEnfocado][1].dispatchEvent(eventoChange);
});

//------------- ENCONTRAR PARABOLA -------------//
document.getElementById("botonEncontrarParabola").addEventListener("click", function() {
    document.getElementById("funcion").innerHTML = "f(x) = "+calcularFuncion();
    graficarParabola(aEcuacionMetRed,bEcuacionMetRed,cEcuacionMetRed);
});

for (let i = 0; i < puntos.length; i++) { //Ej: Punto = H
    for (let j = 0; j < puntos[i].length; j++) { //Ej: j = xPuntoH
        puntos[i][j].addEventListener("change", function() {
            graficarPuntosHIJ();
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

btnSiguienteFuncion.addEventListener('click', function() { //Cuando se presiona el boton siguiente
    if (inputFuncion.value != "") { // Si hay algo escrito
        inputFuncion.style.borderColor = "";
        datosFuncionDiv.style.display = "flex"; //se muestran los datos
        encontrarABC(inputFuncion.value);
        
        //Mostrar la Funcion en el div
        spanEcuacionFuncion.innerHTML = simplificarEcuacion(aEcuacionAlgebraica +"x² + "+ bEcuacionAlgebraica +"x + "+ cEcuacionAlgebraica).replace(/x/g,"<i>x</i>");
        mostrarEcuacionImagen.innerHTML = spanEcuacionFuncion.innerHTML;

        // Encontrar las raices usando bhaskara
        mostrarRaiz1.innerHTML = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(1));
        mostrarRaiz2.innerHTML = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(-1));
        if (mostrarRaiz1.innerHTML == 'NaN' || mostrarRaiz2.innerHTML == 'NaN') {
            mostrarRaiz1.innerHTML = "Error";
            mostrarRaiz2.innerHTML = "Error";
        }
        datosFuncion();
        if (colorActual < coloresGraficar.length) {
            colorActual++;
        }
        else {
            colorActual = 0;
        }
        document.getElementById("mostrarEcuacionGrafica").innerHTML += `
        <div style="color: ${coloresGraficar[colorActual]}"><i style="color: ${coloresGraficar[colorActual]}">f</i> (<i>x</i>) = ${spanEcuacionFuncion.innerHTML}</div>`;
        document.getElementById("mostrarEcuacionGrafica").innerHTML = document.getElementById("mostrarEcuacionGrafica").innerHTML.replace(/\<i\>x\<\/i\>/g,`<i style="color: ${coloresGraficar[colorActual]}">x</i>`);
        graficarParabola(aEcuacionAlgebraica,bEcuacionAlgebraica,cEcuacionAlgebraica, context, coloresGraficar[colorActual]);
    }
    else {
        inputFuncion.style.borderColor = "rgb(164, 38, 44)";
        inputFuncion.style.outlineColor = "rgb(164, 38, 44)";
    }
});

document.getElementById("botonEnterImagen").addEventListener('click', function() {
    imagenYPreimagen("imagen");
});
  
document.getElementById("botonEnterPreimagen").addEventListener('click', function() {
    imagenYPreimagen("preimagen");
});

btnSiguientePtosAFunc.addEventListener('click', function() {
    calcularFuncion();
    canvasFondo(canvasPtosAFunc, contextoPtosAFunc);
    graficarParabola(aEcuacionMetRed,bEcuacionMetRed,cEcuacionMetRed,contextoPtosAFunc, coloresGraficar[0]);
    graficarPunto(parseFloat(xPuntoH.value),parseFloat(yPuntoH.value),contextoPtosAFunc);
    graficarPunto(parseFloat(xPuntoI.value),parseFloat(yPuntoI.value),contextoPtosAFunc);
    graficarPunto(parseFloat(xPuntoJ.value),parseFloat(yPuntoJ.value),contextoPtosAFunc);
});

btnPrevisualisarPtosAFunc.addEventListener('click', function() {
    canvasFondo(canvasPtosAFunc, contextoPtosAFunc);
    graficarPunto(parseFloat(xPuntoH.value),parseFloat(yPuntoH.value),contextoPtosAFunc);
    graficarPunto(parseFloat(xPuntoI.value),parseFloat(yPuntoI.value),contextoPtosAFunc);
    graficarPunto(parseFloat(xPuntoJ.value),parseFloat(yPuntoJ.value),contextoPtosAFunc);
});

function encontrarABC(ecuacion){
    aEcuacionAlgebraica = 0;
    bEcuacionAlgebraica = 0;
    cEcuacionAlgebraica = 0;
    ecuacionAlgebraica = ecuacion;
    ecuacionAlgebraica = ecuacionAlgebraica.replace(/X/g,"x").replace("x2","x²").replace("x^2","x²");
    valoresABCEcuacionAlgebraica = ecuacionAlgebraica;
    valoresABCEcuacionAlgebraica = valoresABCEcuacionAlgebraica.replace(/ /g, "").replace(/--/g, "+").replace(/-/g, "+-").split('+'); // saco los espacios, y separo en terminos creando un array
    valoresABCEcuacionAlgebraica = valoresABCEcuacionAlgebraica.filter(function(arrayElement) { //Recorro el array porque si hay alguno vacio
        return arrayElement !== ""; // Devuelvo los que no estan vacios
    });

    for (let i = 0; i < valoresABCEcuacionAlgebraica.length; i++) { //recorro los array elements de valoresABCEcuacionAlgebraica
        if (valoresABCEcuacionAlgebraica[i].includes("x²")) { // a
            aEcuacionAlgebraica = valoresABCEcuacionAlgebraica[i].replace("x²", "");
                if (aEcuacionAlgebraica === "" || aEcuacionAlgebraica === "-"){ //si luego de sacar la x^2, el numero me queda como "" o "-" le sumamos 1 porque el original era "-x^2" o "x^2" que es lo mismo que "-1x^2" y "1x^2"
                    aEcuacionAlgebraica += "1"; //Concatenamos en vez de poner un = porque queremos que si era 1 negativo originalmente siga siendolo
                }
            aEcuacionAlgebraica = new Decimal(aEcuacionAlgebraica);
        }
        if (valoresABCEcuacionAlgebraica[i].includes("x") && !(valoresABCEcuacionAlgebraica[i].includes("x²"))) { //b
            bEcuacionAlgebraica = valoresABCEcuacionAlgebraica[i].replace("x", "");
                if (bEcuacionAlgebraica === "" || bEcuacionAlgebraica === "-"){ //si luego de sacar la x, el numero me queda como "" o "-" le sumamos 1 porque el original era "-x" o "x" que es lo mismo que "-1x" y "1x"
                    bEcuacionAlgebraica += "1"; //Concatenamos en vez de poner un = porque queremos que si era 1 negativo originalmente siga siendolo
                }
            bEcuacionAlgebraica = new Decimal(bEcuacionAlgebraica);
        }
        if (!(valoresABCEcuacionAlgebraica[i].includes("x"))) { //c (si NO tiene x)
            cEcuacionAlgebraica = valoresABCEcuacionAlgebraica[i];
            cEcuacionAlgebraica = new Decimal(cEcuacionAlgebraica);
        }
    }
    return [aEcuacionAlgebraica, bEcuacionAlgebraica, cEcuacionAlgebraica];
}

function bhaskara(a,b,c,signo) {
    let delta = (b.toPower(new Decimal(2))).minus((new Decimal(4)).times(a).times(c));
    return ((b.times(new Decimal(-1))).plus(signo.times(delta.sqrt()))).dividedBy((new Decimal(2)).times(a));
    //si "signo" es -1 equivale a "- Math.sqrt(delta)" y si es 1 equivale a "+ Math.sqrt(delta)"
}

function datosFuncion(dato) {
    switch (dato) {
        case "raices":
            let raiz1 = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(1));
            let raiz2 = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(-1));
            if (raiz1.toString() == 'NaN' || raiz2.toString() == 'NaN') {
                raiz1 = "Error";
                raiz2 = "Error";
            }
            return `${raiz1} y ${raiz2}`;
        case "vertice":
            let coordXVertice = ((new Decimal(parseFloat(bEcuacionAlgebraica))).times(new Decimal(-1))).dividedBy((new Decimal(2)).times(new Decimal(parseFloat(aEcuacionAlgebraica)))); //opuesto de b sobre 2a
            let coordYVertice = (new Decimal(parseFloat(aEcuacionAlgebraica))).times((coordXVertice).toPower(new Decimal(2))).plus((new Decimal(parseFloat(bEcuacionAlgebraica))).times(coordXVertice)).plus(new Decimal(parseFloat(cEcuacionAlgebraica))); //imagen de la coordenada x del vertice
            return `( ${coordXVertice} ; ${coordYVertice} )`
        case "concavidad":
            if (aEcuacionAlgebraica > 0) {
                return "Positiva";
            }
            else {
                return "Negativa";
            }
        case "ejeSimetria":
            return ((new Decimal(parseFloat(bEcuacionAlgebraica))).times(new Decimal(-1))).dividedBy((new Decimal(2)).times(new Decimal(parseFloat(aEcuacionAlgebraica)))).toString(); //opuesto de b sobre 2a
        case "ordenadaOrigen":
            return cEcuacionAlgebraica.toString();
        case "a":
            return aEcuacionAlgebraica.toString();
        case "b":
            return bEcuacionAlgebraica.toString();
        case "c":
            return cEcuacionAlgebraica.toString();
    }
}

function imagenYPreimagen(imagenPreimagen, valor) {
    //IMAGEN
    if (imagenPreimagen === "imagen"){
        let imagen = (new Decimal(parseFloat(aEcuacionAlgebraica))).times((new Decimal(parseFloat(valor))).toPower(2)).plus((new Decimal(parseFloat(bEcuacionAlgebraica))).times(new Decimal(parseFloat(valor)))).plus(new Decimal(parseFloat(cEcuacionAlgebraica))).toString();
        if (imagen.toString() == 'NaN') {
            imagen = "Error";
        }
        return imagen;
    }

    //IMAGEN
    let solucionPreimagen1 = bhaskara(new Decimal(parseFloat(aEcuacionAlgebraica)),new Decimal(parseFloat(bEcuacionAlgebraica)),((new Decimal(parseFloat(cEcuacionAlgebraica))).plus((new Decimal(parseFloat(valor))).times(new Decimal(-1)))), new Decimal(1)); //El numero del lado de la igualdad pasa lo cambiamos de lado como su opuesto y sumamos con semejantes(c)
    let solucionPreimagen2 = bhaskara(new Decimal(parseFloat(aEcuacionAlgebraica)),new Decimal(parseFloat(bEcuacionAlgebraica)),((new Decimal(parseFloat(cEcuacionAlgebraica))).plus((new Decimal(parseFloat(valor))).times(new Decimal(-1)))), new Decimal(-1));
    if (solucionPreimagen1.toString() == 'NaN' || solucionPreimagen2.toString() == 'NaN') {
        solucionPreimagen1 = "Error";
        solucionPreimagen2 = "Error";
    }
    return `${solucionPreimagen1} y ${solucionPreimagen2}`;
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
        puntoH = obtenerPunto(xPuntoI.value, yPuntoI.value);
        puntoI = obtenerPunto(xPuntoH.value, yPuntoH.value);
        puntoJ = obtenerPunto(xPuntoJ.value, yPuntoJ.value);
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
    ecuacionDesordenada = ecuacionDesordenada.replace(/(?<![0-9])1x/g, 'x');
    // Eliminar términos con coeficiente 0x²
    ecuacionDesordenada = ecuacionDesordenada.replace(/(?<![0-9])0x²/g, '');
    // Eliminar términos con coeficiente 0x
    ecuacionDesordenada = ecuacionDesordenada.replace(/\+(?<![0-9])0x/g, '').replace(/-(?<![0-9])0x/g, '');
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
            contexto.fillText(i-8, i*10, 84);
        }
        else if (i === 8){ //0
            continue;
        }
        else if (i === 0){ //-8
            contexto.fillText(i-8, (i*10)+2, 84); //Para que no quede cortado
        }
        else if (i === 16){ //8
            contexto.fillText(i-8, (i*10)-2, 84); //Para que no quede cortado
        }
    }

    // Indice de numeros Y
    for (let i = 0; i < 17; i++){
        contexto.font = "3px Arial";
        contexto.fillStyle = "#000";
        contexto.textAlign = "center";
        if (i !== 8 && i !== 0 && i !== 16){
            contexto.fillText(-i+8, 78, i*(10));
        }
        else if (i === 8){ //0
            contexto.fillText(-i+8, 78, i*(10)+4); //Para que no quede cortado
        }
        else if (i === 0){ //-8
            contexto.fillText(-i+8, 78, i*(10)+3); //Para que no quede cortado
        }
        else if (i === 16){ //5
            contexto.fillText(-i+8, 78, i*(10)-1); //Para que no quede cortado
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
    context.arc(((valorX+8)*10), (-(valorY-8))*10, .5, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
}

function graficarParabola(a,b,c) {
    context.beginPath();
    for (let i = (-10000); i < 10000; i++) {
        let coordenadaX = (i-1)/1000;
        // Coordenada Y = Imagen de Coordenada X
        let coordenadaY = (new Decimal(a)).times((new Decimal(coordenadaX)).toPower(2)).plus((new Decimal(b)).times(new Decimal(coordenadaX))).plus(new Decimal(c)).toString();
        coordenadaY = parseFloat(coordenadaY);
        context.strokeStyle = "#485d93";
        context.lineWidth = 0.5;
        context.lineTo((coordenadaX*10)+80, (-coordenadaY*10)+80);
        context.moveTo((coordenadaX*10)+80, (-coordenadaY*10)+80);
    }
    context.stroke();
}