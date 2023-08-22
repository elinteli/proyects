let ecuacionAlgebraica;
let aEcuacionAlgebraica = 0;
let bEcuacionAlgebraica = 0;
let cEcuacionAlgebraica = 0;
let valoresABCEcuacionAlgebraica;

// Elementos del HTML
const inputEcuacion = document.getElementById("ecuacion");
const inputFuncion = document.getElementById("inputFuncion");
const spanAEcuacion = document.getElementById("aEcuacion");
const spanBEcuacion = document.getElementById("bEcuacion");
const spanCEcuacion = document.getElementById("cEcuacion");
const divMostrarEcuacion = document.getElementById("mostrarEcuacion");
const spanX1 = document.getElementById("resultadoUno");
const spanX2 = document.getElementById("resultadoDos");
const inputImagen = document.getElementById("input-imagen");
const inputPreimagen = document.getElementById("input-preimagen");
const divMostrarEcuacionIgualdadImagen = document.getElementById("mostrarEcuacionImagen");
const raiz1 = document.getElementById("raizUno");
const raiz2 = document.getElementById("raizDos");
const spanOrdenadaOrigen = document.getElementById("ordenadaOrigen");
const spanVerticeX = document.getElementById("xVertice");
const spanVerticeY = document.getElementById("yVertice");
const spanConcavidad = document.getElementById("concavidad");
const spanEjeSimetria = document.getElementById("ejeSimetria");
const spanImagen = document.getElementById("imagen");
const spanPreimagenX1 = document.getElementById("resultadoX1");
const spanPreimagenX2 = document.getElementById("resultadoX2");
const datosEcuacion = document.getElementById("datosEcuacion");
const datosFuncionDiv = document.getElementById("datosFuncion");
const spanEcuacionFuncion = document.getElementById("ecuacionAlgebraicaFuncion");
const inputX1Personalizada = document.getElementById("inputX1Personalizada");
const inputX2Personalizada = document.getElementById("inputX2Personalizada");
const divMostrarEcuacionPersonalizada = document.getElementById("mostrarEcuacionPersonalizada");
const contenedorEcuacion = document.getElementById("ecuacionContenedor");
const contenedorFuncion = document.getElementById("funcionContenedor");
const contenedorPuntosAFuncion = document.getElementById("puntosAFuncionContenedor");
const radioBtnEcuacion = document.getElementById("btnEcuacion");
const radioBtnFuncion = document.getElementById("btnFuncion");
const radioBtnPuntosAFuncion = document.getElementById("btnPuntosAFuncion");
const xPuntoH = document.getElementById("xPuntoH");
const xPuntoI = document.getElementById("xPuntoI");
const xPuntoJ = document.getElementById("xPuntoJ");
const yPuntoH = document.getElementById("yPuntoH");
const yPuntoI = document.getElementById("yPuntoI");
const yPuntoJ = document.getElementById("yPuntoJ");
const contenedorFuncionMetodoReduccion = document.getElementById("contenedorFuncionMetodoReduccion");
const mostrarFuncionMetodoReduccion = document.getElementById("mostrarFuncionMetodoReduccion");

//Canvas Grafica
const canvas = document.getElementById("graficaCanvas");
const context = canvas.getContext("2d");
const coloresGraficar = ["#a81c1f","#1c7728","#030265","#81008b","#ec9714","#f72e8c","#7c3e00"];
let colorActual = -1;

//Puntos a Ecuacion
let puntoH;
let puntoI;
let puntoJ;
let aDeLaEcuacion;
let bDeLaEcuacion;
let cDeLaEcuacion;

window.addEventListener("load", function () { //Al iniciar
    datosEcuacion.style.display = "none";
    datosFuncionDiv.style.display = "none";
    contenedorFuncionMetodoReduccion.style.display = "none";
    actualizarModoActual();
    radioBtnEcuacion.addEventListener('change', actualizarModoActual);
    radioBtnFuncion.addEventListener('change', actualizarModoActual);
    radioBtnPuntosAFuncion.addEventListener('change', actualizarModoActual);

    //Fondo de la Grafica
    context.fillStyle = "white";
    context.fillRect(0, 0, 1000, 1000);
    context.scale(1*(8), 1*(8));
    context.stroke();
    // Lineas verticales
    for (let i = 0; i < 11; i++){
        context.beginPath();
        context.moveTo(i*10, 0);
        context.lineTo(i*10, 100);
        context.strokeStyle = "#c8c8c8";
        context.lineWidth = 0.3;
        context.stroke();
    }
    // Lineas horizontales
    for (let i = 0; i < 11; i++){
        context.beginPath();
        context.moveTo(0, i*10);
        context.lineTo(100, i*10);
        context.strokeStyle = "#c8c8c8";
        context.lineWidth = 0.3;
        context.stroke();
    }
    // Indice de numeros X
    for (let i = 0; i < 11; i++){
        context.font = "3px Arial";
        context.fillStyle = "#000";
        context.textAlign = "center";
        if (i !== 5 && i !== 0 && i !== 10){
            context.fillText(i-5, i*10, 54);
        }
        else if (i === 5){ //0
            continue;
        }
        else if (i === 0){ //-5
            context.fillText(i-5, (i*10)+2, 54); //Para que no quede cortado
        }
        else if (i === 10){ //5
            context.fillText(i-5, (i*10)-2, 54); //Para que no quede cortado
        }
    }
    // Indice de numeros Y
    for (let i = 0; i < 11; i++){
        context.font = "3px Arial";
        context.fillStyle = "#000";
        context.textAlign = "center";
        if (i !== 5 && i !== 0 && i !== 10){
            context.fillText(-i+5, 48, i*(10));
        }
        else if (i === 5){ //0
            context.fillText(-i+5, 48, i*(10)+4); //Para que no quede cortado
        }
        else if (i === 0){ //-5
            context.fillText(-i+5, 48, i*(10)+3); //Para que no quede cortado
        }
        else if (i === 10){ //5
            context.fillText(-i+5, 48, i*(10)-1); //Para que no quede cortado
        }
    }    
    //Eje X
    context.beginPath();
    context.moveTo(0, 50);
    context.lineTo(100, 50);
    context.strokeStyle = "#000";
    context.lineWidth = 0.3;
    context.stroke();

    //Eje Y
    context.beginPath();
    context.moveTo(50, 0);
    context.lineTo(50, 100);
    context.strokeStyle = "#000";
    context.lineWidth = 0.3;
    context.stroke();
});

function actualizarModoActual (){
    if (radioBtnEcuacion.checked) {
        contenedorEcuacion.style = "";
        contenedorFuncion.style.display = "none";
        contenedorPuntosAFuncion.style.display = "none";
        encontrarABC(inputEcuacion.value)
    }
    else if (radioBtnFuncion.checked) {
        contenedorFuncion.style = "";
        contenedorEcuacion.style.display = "none";
        contenedorPuntosAFuncion.style.display = "none";
        encontrarABC(inputFuncion.value)
    }
    else if (radioBtnPuntosAFuncion.checked) {
        contenedorPuntosAFuncion.style = "";
        contenedorFuncion.style.display = "none";
        contenedorEcuacion.style.display = "none";
    }
}

document.getElementById("botonSiguienteEcuacion").addEventListener('click', function(event) { //Cuando se presiona el boton siguiente
    if (inputEcuacion.value != "") { // Si hay algo escrito
        inputEcuacion.style.borderColor = "";
        datosEcuacion.style.display = "inline-block"; //se muestran los datos
        encontrarABC(inputEcuacion.value);
        
        //Mostrar la Ecuacion en el div
        divMostrarEcuacion.innerHTML = aEcuacionAlgebraica.toString() +"x^2 + "+ bEcuacionAlgebraica.toString() +"x + "+ cEcuacionAlgebraica.toString();
        divMostrarEcuacion.innerHTML = divMostrarEcuacion.innerHTML.replace(/1x/g,"x").replace("x^2",`x²`).replace(/0x² \+/g,'').replace(/\+ 0x/g,"").replace(/- 0x/g,"").replace(/0x \+/g,"").replace(/\+ 0/g,"").replace(/\+ -/g,"- ").replace(/x/g,`<i>x</i>`); // cambio cosas esteticas como no mostrar "0x", "1x", o "+ -"
        
        //Mostrar A, B y C
        spanAEcuacion.innerHTML = aEcuacionAlgebraica.toString();
        spanBEcuacion.innerHTML = bEcuacionAlgebraica.toString();
        spanCEcuacion.innerHTML = cEcuacionAlgebraica.toString();

        // Encontrar las raices usando bhaskara
        spanX1.innerHTML = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(1));
        spanX2.innerHTML = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(-1));
    }
    else {
        inputEcuacion.style.borderColor = "#a00";
    }
  });

  document.getElementById("botonSiguienteFuncion").addEventListener('click', function(event) { //Cuando se presiona el boton siguiente
    if (inputFuncion.value != "") { // Si hay algo escrito
        inputFuncion.style.borderColor = "";
        datosFuncionDiv.style.display = "flex"; //se muestran los datos
        encontrarABC(inputFuncion.value);
        
        //Mostrar la Funcion en el div
        spanEcuacionFuncion.innerHTML = aEcuacionAlgebraica +"x^2 + "+ bEcuacionAlgebraica +"x + "+ cEcuacionAlgebraica;
        spanEcuacionFuncion.innerHTML = spanEcuacionFuncion.innerHTML.replace(/1x/g,"x").replace("x^2",`x²`).replace(/0x² \+/g,'').replace(/\+ 0x/g,"").replace(/- 0x/g,"").replace(/0x \+/g,"").replace(/\+ 0/g,"").replace(/\+ -/g,"- ").replace(/x/g,`<i>x</i>`); // cambio cosas esteticas como no mostrar "0x", "1x", o "+ -"
        divMostrarEcuacionIgualdadImagen.innerHTML = spanEcuacionFuncion.innerHTML;

        // Encontrar las raices usando bhaskara
        raiz1.innerHTML = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(1));
        raiz2.innerHTML = bhaskara(new Decimal(aEcuacionAlgebraica), new Decimal(bEcuacionAlgebraica), new Decimal(cEcuacionAlgebraica), new Decimal(-1));

        datosFuncion();
        graficar()
    }
    else {
        inputFuncion.style.borderColor = "#a00";
    }
});

inputImagen.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        imagenYPreimagen("imagen");
    }
});
  
inputPreimagen.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        imagenYPreimagen("preimagen");
    }
});

document.getElementById("botonSiguienteMetodoReduccion").addEventListener('click', function() {
    calcularFuncion();
});

function encontrarABC(ecuacion){
    aEcuacionAlgebraica = 0;
    bEcuacionAlgebraica = 0;
    cEcuacionAlgebraica = 0;
    ecuacionAlgebraica = ecuacion;
    ecuacionAlgebraica = ecuacionAlgebraica.replace(/X/g,"x").replace("x2","x^2").replace("x²","x^2");
    valoresABCEcuacionAlgebraica = ecuacionAlgebraica;
    valoresABCEcuacionAlgebraica = valoresABCEcuacionAlgebraica.replace(/ /g, "").replace(/--/g, "+").replace(/-/g, "+-").split('+'); // saco los espacios, y separo en terminos creando un array
    valoresABCEcuacionAlgebraica = valoresABCEcuacionAlgebraica.filter(function(arrayElement) { //Recorro el array porque si hay alguno vacio
        return arrayElement !== ""; // Devuelvo los que no estan vacios
    });

    for (let i = 0; i < valoresABCEcuacionAlgebraica.length; i++) { //recorro los array elements de valoresABCEcuacionAlgebraica
        if (valoresABCEcuacionAlgebraica[i].includes("x^2")) { // a
            aEcuacionAlgebraica = valoresABCEcuacionAlgebraica[i].replace("x^2", "");
                if (aEcuacionAlgebraica === "" || aEcuacionAlgebraica === "-"){ //si luego de sacar la x^2, el numero me queda como "" o "-" le sumamos 1 porque el original era "-x^2" o "x^2" que es lo mismo que "-1x^2" y "1x^2"
                    aEcuacionAlgebraica += "1"; //Concatenamos en vez de poner un = porque queremos que si era 1 negativo originalmente siga siendolo
                }
            aEcuacionAlgebraica = new Decimal(aEcuacionAlgebraica);
        }
        if (valoresABCEcuacionAlgebraica[i].includes("x") && !(valoresABCEcuacionAlgebraica[i].includes("x^2"))) { //b
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

function datosFuncion() {
    spanOrdenadaOrigen.innerHTML = cEcuacionAlgebraica.toString();
    let coordXVertice = ((new Decimal(parseFloat(bEcuacionAlgebraica))).times(new Decimal(-1))).dividedBy((new Decimal(2)).times(new Decimal(parseFloat(aEcuacionAlgebraica)))); //opuesto de b sobre 2a
    spanVerticeX.innerHTML = coordXVertice;
    spanVerticeY.innerHTML = (new Decimal(parseFloat(aEcuacionAlgebraica))).times((coordXVertice).toPower(new Decimal(2))).plus((new Decimal(parseFloat(bEcuacionAlgebraica))).times(coordXVertice)).plus(new Decimal(parseFloat(cEcuacionAlgebraica))); //imagen de la coordenada x del vertice
    if (aEcuacionAlgebraica > 0) {
        spanConcavidad.innerHTML = "Positiva";
    }
    else {
        spanConcavidad.innerHTML = "Negativa";
    }
    spanEjeSimetria.innerHTML = coordXVertice.toString();
}

function imagenYPreimagen(imagenPreimagen) {
    if (imagenPreimagen === "imagen"){
        spanImagen.innerHTML = (new Decimal(parseFloat(aEcuacionAlgebraica))).times((new Decimal(parseFloat(inputImagen.value))).toPower(2)).plus((new Decimal(parseFloat(bEcuacionAlgebraica))).times(new Decimal(parseFloat(inputImagen.value)))).plus(new Decimal(parseFloat(cEcuacionAlgebraica))).toString();
    }
    else { //preimagen
        spanPreimagenX1.innerHTML = bhaskara(new Decimal(parseFloat(aEcuacionAlgebraica)),new Decimal(parseFloat(bEcuacionAlgebraica)),((new Decimal(parseFloat(cEcuacionAlgebraica))).plus((new Decimal(parseFloat(inputPreimagen.value))).times(new Decimal(-1)))), new Decimal(1)); //El numero del lado de la igualdad pasa lo cambiamos de lado como su opuesto y sumamos con semejantes(c)
        spanPreimagenX2.innerHTML = bhaskara(new Decimal(parseFloat(aEcuacionAlgebraica)),new Decimal(parseFloat(bEcuacionAlgebraica)),((new Decimal(parseFloat(cEcuacionAlgebraica))).plus((new Decimal(parseFloat(inputPreimagen.value))).times(new Decimal(-1)))), new Decimal(-1));
    }
}

function graficar(){
    //Parabola
    if (colorActual < coloresGraficar.length) {
        colorActual++;
    }
    else {
        colorActual = 0;
    }
    document.getElementById("mostrarEcuacionGrafica").innerHTML += `
    <div style="color: ${coloresGraficar[colorActual]}"><i style="color: ${coloresGraficar[colorActual]}">f</i> (<i>x</i>) = ${spanEcuacionFuncion.innerHTML}</div>`
    document.getElementById("mostrarEcuacionGrafica").innerHTML = document.getElementById("mostrarEcuacionGrafica").innerHTML.replace(/\<i\>x\<\/i\>/g,`<i style="color: ${coloresGraficar[colorActual]}">x</i>`);
    context.beginPath();
    for (let i = (-10000); i < 10000; i++) {
        let coordenadaX = (i-1)/1000;
        let coordenadaY = (new Decimal(aEcuacionAlgebraica)).times((new Decimal(coordenadaX)).toPower(2)).plus((new Decimal(bEcuacionAlgebraica)).times(new Decimal(coordenadaX))).plus(new Decimal(cEcuacionAlgebraica)).toString();
        coordenadaY = parseFloat(coordenadaY);
        context.strokeStyle = coloresGraficar[colorActual];
        context.lineWidth = 0.5;
        context.lineTo((coordenadaX*10)+50, (-coordenadaY*10)+50);
        context.moveTo((coordenadaX*10)+50, (-coordenadaY*10)+50);
    }
    context.stroke();
}

function calcularFuncion() {
    puntoH = {
        a: (new Decimal(xPuntoH.value)).toPower(2), //toPower = Exponenciacion
        b: (new Decimal(xPuntoH.value)),
        c: new Decimal('1'),
        igualdad: (new Decimal(yPuntoH.value))
    };
    puntoI = {
        a: (new Decimal(xPuntoI.value)).toPower(2),
        b: new Decimal(xPuntoI.value),
        c: new Decimal('1'),
        igualdad: new Decimal(yPuntoI.value)
    };
    puntoJ = {
        a: (new Decimal(xPuntoJ.value)).toPower(2),
        b: new Decimal(xPuntoJ.value),
        c: new Decimal('1'),
        igualdad: new Decimal(yPuntoJ.value)
    };
    calcularAFuncion();
    calcularBFuncion();
    calcularCFuncion();
    contenedorFuncionMetodoReduccion.style.display = "inline-block";
    mostrarFuncionMetodoReduccion.innerHTML = ((aDeLaEcuacion.toString())+"x² + "+(bDeLaEcuacion.toString())+"x + "+(cDeLaEcuacion.toString()));
    mostrarFuncionMetodoReduccion.innerHTML = mostrarFuncionMetodoReduccion.innerHTML.replace(/1x/g,"x").replace("x^2",`x²`).replace(/0x² \+/g,'').replace(/\+ 0x/g,"").replace(/- 0x/g,"").replace(/0x \+/g,"").replace(/\+ 0/g,"").replace(/\+ -/g,"- ").replace(/x/g,`<i>x</i>`);
};

function calcularAFuncion() {
    //Suma H e I
    let newPuntoH = {
        a: ((puntoH.a).dividedBy(puntoH.b)).times(-puntoI.b),
        b: ((puntoH.b).dividedBy(puntoH.b)).times(-puntoI.b), //Queremos que al sumar cancelemos b
        c: ((puntoH.c).dividedBy(puntoH.b)).times(-puntoI.b),
        igualdad: ((puntoH.igualdad).dividedBy(puntoH.b)).times(-puntoI.b)
    };
    let sumaHI = {
        a: (newPuntoH.a).plus(puntoI.a),
        //b = 0
        c: (newPuntoH.c).plus(puntoI.c),
        igualdad: (newPuntoH.igualdad).plus(puntoI.igualdad)
    };

    //Suma H y J
    newPuntoH = { //Lo cambiamos para sumarlo con el punto J
        a: ((puntoH.a).dividedBy(puntoH.b)).times(-puntoJ.b),
        b: ((puntoH.b).dividedBy(puntoH.b)).times(-puntoJ.b), //Queremos que al sumar cancelemos b
        c: ((puntoH.c).dividedBy(puntoH.b)).times(-puntoJ.b),
        igualdad: ((puntoH.igualdad).dividedBy(puntoH.b)).times(-puntoJ.b)
    };
    let sumaHJ = {
        a: (newPuntoH.a).plus(puntoJ.a),
        //b = 0 
        c: (newPuntoH.c).plus(puntoJ.c),
        igualdad: (newPuntoH.igualdad).plus(puntoJ.igualdad)
    };

    //Suma de los resultados (H + J) y (H + 1)
    let newSumaHI;
    if (sumaHI.c != 0) {
        newSumaHI = { //Lo cambiamos para sumarlo con (H + J)
            a: ((sumaHI.a).dividedBy(sumaHI.c)).times(-sumaHJ.c), 
            c: ((sumaHI.c).dividedBy(sumaHI.c)).times(-sumaHJ.c), //Queremos que al sumar cancelemos c
            igualdad: ((sumaHI.igualdad).dividedBy(sumaHI.c)).times(-sumaHJ.c),
        };
        aDeLaEcuacion = ((newSumaHI.igualdad).plus(sumaHJ.igualdad)).dividedBy((newSumaHI.a).plus(sumaHJ.a)); //a = Suma de los resultados
    }
    else {
        //Ya está despejado a
        aDeLaEcuacion = ((sumaHI.igualdad).plus(sumaHJ.igualdad)).dividedBy((sumaHI.a).plus(sumaHJ.a)); //b = Suma de los resultados
    }
}

function calcularBFuncion() {
    //Suma H e I
    let newPuntoH = { //Lo cambiamos para sumarlo con el punto I
        a: ((puntoH.a).dividedBy(puntoH.a)).times(-puntoI.a), //Queremos que al sumar cancelemos a
        b: ((puntoH.b).dividedBy(puntoH.a)).times(-puntoI.a), 
        c: ((puntoH.c).dividedBy(puntoH.a)).times(-puntoI.a),
        igualdad: ((puntoH.igualdad).dividedBy(puntoH.a)).times(-puntoI.a)
    };
    let sumaHI = {
        //a = 0
        b: (newPuntoH.b).plus(puntoI.b),
        c: (newPuntoH.c).plus(puntoI.c),
        igualdad: (newPuntoH.igualdad).plus(puntoI.igualdad)
    };

    //Suma H y J
    newPuntoH = { //Lo cambiamos para sumarlo con el punto J
        a: ((puntoH.a).dividedBy(puntoH.a)).times(-puntoJ.a), //Queremos que al sumar cancelemos a
        b: ((puntoH.b).dividedBy(puntoH.a)).times(-puntoJ.a), 
        c: ((puntoH.c).dividedBy(puntoH.a)).times(-puntoJ.a),
        igualdad: ((puntoH.igualdad).dividedBy(puntoH.a)).times(-puntoJ.a)
    };
    let sumaHJ = {
        //a = 0 
        b: (newPuntoH.b).plus(puntoJ.b),
        c: (newPuntoH.c).plus(puntoJ.c),
        igualdad: (newPuntoH.igualdad).plus(puntoJ.igualdad)
    };

    //Suma de los resultados (H + J) y (H + 1)
    let newSumaHI;
    if (sumaHI.c != 0) {//Si c no esta despejado
        newSumaHI = { //Lo cambiamos para sumarlo con (H + J)
            b: ((sumaHI.b).dividedBy(sumaHI.c)).times(-sumaHJ.c), 
            c: ((sumaHI.c).dividedBy(sumaHI.c)).times(-sumaHJ.c), //Queremos que al sumar cancelemos c
            igualdad: ((sumaHI.igualdad).dividedBy(sumaHI.c)).times(-sumaHJ.c),
        };
        bDeLaEcuacion = ((newSumaHI.igualdad).plus(sumaHJ.igualdad)).dividedBy((newSumaHI.b).plus(sumaHJ.b)); //b = Suma de los resultados
    }
    else {
        //Ya está despejado c
        bDeLaEcuacion = ((sumaHI.igualdad).plus(sumaHJ.igualdad)).dividedBy((sumaHI.b).plus(sumaHJ.b)); //b = Suma de los resultados
    }
}

function calcularCFuncion() {
    //Suma H e I
    let newPuntoH = { //Lo cambiamos para sumarlo con el punto I
        a: ((puntoH.a).dividedBy(puntoH.a)).times(-puntoI.a), //Queremos que al sumar cancelemos a
        b: ((puntoH.b).dividedBy(puntoH.a)).times(-puntoI.a), 
        c: ((puntoH.c).dividedBy(puntoH.a)).times(-puntoI.a),
        igualdad: ((puntoH.igualdad).dividedBy(puntoH.a)).times(-puntoI.a)
    };
    let sumaHI = {
        //a = 0
        b: (newPuntoH.b).plus(puntoI.b),
        c: (newPuntoH.c).plus(puntoI.c),
        igualdad: (newPuntoH.igualdad).plus(puntoI.igualdad)
    };

    //Suma H y J
    newPuntoH = { //Lo cambiamos para sumarlo con el punto J
        a: ((puntoH.a).dividedBy(puntoH.a)).times(-puntoJ.a), //Queremos que al sumar cancelemos a
        b: ((puntoH.b).dividedBy(puntoH.a)).times(-puntoJ.a), 
        c: ((puntoH.c).dividedBy(puntoH.a)).times(-puntoJ.a),
        igualdad: ((puntoH.igualdad).dividedBy(puntoH.a)).times(-puntoJ.a)
    };
    let sumaHJ = {
        //a = 0 
        b: (newPuntoH.b).plus(puntoJ.b),
        c: (newPuntoH.c).plus(puntoJ.c),
        igualdad: (newPuntoH.igualdad).plus(puntoJ.igualdad)
    };

    //Suma de los resultados (H + J) y (H + 1)
    let newSumaHI;
    if (sumaHI.b != 0) { //Si b no esta despejado
        newSumaHI = { //Lo cambiamos para sumarlo con (H + J)
            b: ((sumaHI.b).dividedBy(sumaHI.b)).times(-sumaHJ.b), //Queremos que al sumar cancelemos b
            c: ((sumaHI.c).dividedBy(sumaHI.b)).times(-sumaHJ.b), 
            igualdad: ((sumaHI.igualdad).dividedBy(sumaHI.b)).times(-sumaHJ.b),
        };
        cDeLaEcuacion = ((newSumaHI.igualdad).plus(sumaHJ.igualdad)).dividedBy((newSumaHI.c).plus(sumaHJ.c)); //c = Suma de los resultados
    }
    else {
        //No es necesario hacer cuentas porque ya está despejado b
        cDeLaEcuacion = ((sumaHI.igualdad).plus(sumaHJ.igualdad)).dividedBy((sumaHI.c).plus(sumaHJ.c));
    }
}