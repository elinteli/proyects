//VARIABLES
let ecuacionAlgebraica;
let aEcuacionAlgebraica = 0;
let bEcuacionAlgebraica = 0;
let cEcuacionAlgebraica = 0;
let valoresABCEcuacionAlgebraica;
const canvas = document.getElementById("canvasGraficarFuncion");
const context = canvas.getContext("2d");

//------------- AL INICIAR -------------//
window.addEventListener("load", function () {
    canvas.width = 800;
    canvas.height = 800;
    context.scale(1*(5), 1*(5));
    canvasFondo(canvas, context);
});

//------------- DATOS -------------//
document.getElementById("funcionInput").addEventListener('input', function() {
    encontrarABC(document.getElementById("funcionInput").value);
});

document.getElementById("selectDatos").addEventListener('change', function() {
    document.getElementById("dato").innerHTML = datosFuncion(document.getElementById("selectDatos").value);
});

//------------- IMAGEN Y PREIMAGEN -------------//
document.getElementById("selectImgPreimg").addEventListener('change', function() {
    document.getElementById("imagenPreimagen").innerHTML = imagenYPreimagen(document.getElementById("selectImgPreimg").value, document.getElementById("inputNumImgPreimg").value);
});

document.getElementById("inputNumImgPreimg").addEventListener('input', function() {
    document.getElementById("imagenPreimagen").innerHTML = imagenYPreimagen(document.getElementById("selectImgPreimg").value, document.getElementById("inputNumImgPreimg").value);
});

//------------- GRAFICAR -------------//
document.getElementById("botonGraficar").addEventListener('click', function() {
    canvasFondo(canvas, context);
    graficarParabola(aEcuacionAlgebraica, bEcuacionAlgebraica, cEcuacionAlgebraica, context, "#485d93")
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
}

function bhaskara(a,b,c,signo) {
    let delta = (b.toPower(new Decimal(2))).minus((new Decimal(4)).times(a).times(c));
    return ((b.times(new Decimal(-1))).plus(signo.times(delta.sqrt()))).dividedBy((new Decimal(2)).times(a));
    //si "signo" es -1 equivale a "- raizCuadrada(delta)" y si es 1 equivale a "+ raizCuadrada(delta)"
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

    //PREIMAGEN
    let solucionPreimagen1 = bhaskara(new Decimal(parseFloat(aEcuacionAlgebraica)),new Decimal(parseFloat(bEcuacionAlgebraica)),((new Decimal(parseFloat(cEcuacionAlgebraica))).plus((new Decimal(parseFloat(valor))).times(new Decimal(-1)))), new Decimal(1)); //El numero del lado de la igualdad pasa lo cambiamos de lado como su opuesto y sumamos con semejantes(c)
    let solucionPreimagen2 = bhaskara(new Decimal(parseFloat(aEcuacionAlgebraica)),new Decimal(parseFloat(bEcuacionAlgebraica)),((new Decimal(parseFloat(cEcuacionAlgebraica))).plus((new Decimal(parseFloat(valor))).times(new Decimal(-1)))), new Decimal(-1));
    if (solucionPreimagen1.toString() == 'NaN' || solucionPreimagen2.toString() == 'NaN') {
        solucionPreimagen1 = "Error";
        solucionPreimagen2 = "Error";
    }
    return `${solucionPreimagen1} y ${solucionPreimagen2}`;
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

function graficarParabola(a,b,c,contexto,color) {
    contexto.beginPath();
    for (let i = (-10000); i < 10000; i++) {
        let coordenadaX = (i-1)/1000;
        // Coordenada Y = Imagen de Coordenada X
        let coordenadaY = (new Decimal(a)).times((new Decimal(coordenadaX)).toPower(2)).plus((new Decimal(b)).times(new Decimal(coordenadaX))).plus(new Decimal(c)).toString();
        coordenadaY = parseFloat(coordenadaY);
        contexto.strokeStyle = color;
        contexto.lineWidth = 0.5;
        contexto.lineTo((coordenadaX*10)+80, (-coordenadaY*10)+80);
        contexto.moveTo((coordenadaX*10)+80, (-coordenadaY*10)+80);
    }
    contexto.stroke();
}