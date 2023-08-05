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
const inputx1Descomposicion = document.getElementById("inputX1Descomposicion");
const inputx2Descomposicion = document.getElementById("inputX2Descomposicion");
const xDelPuntoDescomposicion = document.getElementById("xDelPuntoDescomposicion");
const yDelPuntoDescomposicion = document.getElementById("yDelPuntoDescomposicion");
const mostrarFuncionDescomposicion = document.getElementById("mostrarFuncionDescomposicion");
const contenedorEcuacion = document.getElementById("ecuacionContenedor");
const contenedorFuncion = document.getElementById("funcionContenedor");
const contenedorDatosAEcuacion = document.getElementById("datosAEcuacionContenedor");
const radioBtnEcuacion = document.getElementById("btnEcuacion");
const radioBtnFuncion = document.getElementById("btnFuncion");
const radioBtnDatosAEcuacion = document.getElementById("btnDatosAEcuacion");
datosEcuacion.style.display = "none";
datosFuncionDiv.style.display = "none";
actualizarModoActual();
function actualizarModoActual (){
if (radioBtnEcuacion.checked) {
    contenedorEcuacion.style = "";
    contenedorFuncion.style.display = "none";
    contenedorDatosAEcuacion.style.display = "none";
    encontrarABC(inputEcuacion.value)
}
else if (radioBtnFuncion.checked) {
    contenedorFuncion.style = "";
    contenedorEcuacion.style.display = "none";
    contenedorDatosAEcuacion.style.display = "none";
    encontrarABC(inputFuncion.value)
}
else if (radioBtnDatosAEcuacion.checked) {
    contenedorDatosAEcuacion.style = "";
    contenedorFuncion.style.display = "none";
    contenedorEcuacion.style.display = "none";
}
}
radioBtnEcuacion.addEventListener('change', actualizarModoActual);
radioBtnFuncion.addEventListener('change', actualizarModoActual);
radioBtnDatosAEcuacion.addEventListener('change', actualizarModoActual);
yDelPuntoDescomposicion.addEventListener('keypress', function(event) { //Cuando se presiona una tecla en el inputEcuacion
    if (event.keyCode === 13) { // Si se presiona enter:
        let coordYDescomposicion = parseFloat(yDelPuntoDescomposicion.value);
        let coordXDescomposicion = parseFloat(xDelPuntoDescomposicion.value);
        let raiz1Descomposicion = parseFloat(inputx1Descomposicion.value);
        let raiz2Descomposicion = parseFloat(inputx2Descomposicion.value);
        let aDescomposicion = ( coordYDescomposicion /((coordXDescomposicion - raiz1Descomposicion)*(coordXDescomposicion - raiz2Descomposicion)));
        //mostrarFuncionDescomposicion.innerHTML = aDescomposicion+`( <i>x</i> - `+raiz1+`) ( <i>x</i> - `+raiz2+")";
        mostrarFuncionDescomposicion.innerHTML = `${aDescomposicion}x^2 - ${aDescomposicion*(raiz1Descomposicion + raiz2Descomposicion)}x + ${aDescomposicion*(raiz1Descomposicion * raiz2Descomposicion)}`;
        mostrarFuncionDescomposicion.innerHTML = mostrarFuncionDescomposicion.innerHTML.replace(/1x/g,"x").replace("+ 0x","").replace("+ 0","").replace("- 0x","").replace("- 0","").replace(/\+ -/g,"- ").replace("x^2",`x²`).replace(/x/g,`<i>x</i>`);
    }
});

/*inputX2Personalizada.addEventListener('keypress', function(event) { //Cuando se presiona una tecla en el inputEcuacion
    if (event.keyCode === 13) { // Si se presiona enter:
        divMostrarEcuacionPersonalizada.innerHTML = encontrarABC(divMostrarEcuacionPersonalizada.innerHTML)[0] +"x^2 + "+ encontrarABC(divMostrarEcuacionPersonalizada.innerHTML)[1] +"x + "+ encontrarABC(divMostrarEcuacionPersonalizada.innerHTML)[2];
        divMostrarEcuacionPersonalizada.innerHTML = `<i>x</i>² - `+(parseInt(inputX1Personalizada.value)+parseInt(inputX2Personalizada.value))+`<i>x</i>`+' + '+(parseInt(inputX1Personalizada.value)*parseInt(inputX2Personalizada.value));
        divMostrarEcuacionPersonalizada.innerHTML = divMostrarEcuacionPersonalizada.innerHTML.replace(/1x/g,"x").replace("+ 0x","").replace("+ 0","").replace(/\+ -/g,"- ").replace("x^2",`x²`).replace(/x/g,`<i>x</i>`);
    }
});*/

inputEcuacion.addEventListener('keypress', function(event) { //Cuando se presiona una tecla en el inputEcuacion
    if (event.keyCode === 13) { // Si se presiona enter:
        datosEcuacion.style.display = "inline-block"; //se muestran los datos
        encontrarABC(inputEcuacion.value);
        
        //Mostrar la Ecuacion en el div
        divMostrarEcuacion.innerHTML = aEcuacionAlgebraica +"x^2 + "+ bEcuacionAlgebraica +"x + "+ cEcuacionAlgebraica;
        divMostrarEcuacion.innerHTML = divMostrarEcuacion.innerHTML.replace(/1x/g,"x").replace("+ 0x","").replace("- 0x","").replace("+ 0","").replace(/\+ -/g,"- ").replace("x^2",`x²`).replace(/x/g,`<i>x</i>`); // cambio cosas esteticas como no mostrar "0x", "1x", o "+ -"
        
        //Mostrar A, B y C
        spanAEcuacion.innerHTML = aEcuacionAlgebraica;
        spanBEcuacion.innerHTML = bEcuacionAlgebraica;
        spanCEcuacion.innerHTML = cEcuacionAlgebraica;

        // Encontrar las raices usando bhaskara
        spanX1.innerHTML = bhaskara(aEcuacionAlgebraica, bEcuacionAlgebraica, cEcuacionAlgebraica, 1);
        spanX2.innerHTML = bhaskara(aEcuacionAlgebraica, bEcuacionAlgebraica, cEcuacionAlgebraica, -1);
    }
  });

  inputFuncion.addEventListener('keypress', function(event) { //Cuando se presiona una tecla en el inputEcuacion
    if (event.keyCode === 13) { // Si se presiona enter:
        datosFuncionDiv.style.display = "flex"; //se muestran los datos
        encontrarABC(inputFuncion.value);
        
        //Mostrar la Funcion en el div
        spanEcuacionFuncion.innerHTML = aEcuacionAlgebraica +"x^2 + "+ bEcuacionAlgebraica +"x + "+ cEcuacionAlgebraica;
        spanEcuacionFuncion.innerHTML = spanEcuacionFuncion.innerHTML.replace(/1x/g,"x").replace("+ 0x","").replace("- 0x","").replace("+ 0","").replace(/\+ -/g,"- ").replace("x^2",`x²`).replace(/x/g,`<i>x</i>`); // cambio cosas esteticas como no mostrar "0x", "1x", o "+ -"
        divMostrarEcuacionIgualdadImagen.innerHTML = spanEcuacionFuncion.innerHTML;

        // Encontrar las raices usando bhaskara
        raiz1.innerHTML = bhaskara(aEcuacionAlgebraica, bEcuacionAlgebraica, cEcuacionAlgebraica, 1);
        raiz2.innerHTML = bhaskara(aEcuacionAlgebraica, bEcuacionAlgebraica, cEcuacionAlgebraica, -1);

        datosFuncion();
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

function encontrarABC(ecuacion){
    aEcuacionAlgebraica = 0;
    bEcuacionAlgebraica = 0;
    cEcuacionAlgebraica = 0;
    ecuacionAlgebraica = ecuacion;
    ecuacionAlgebraica = ecuacionAlgebraica.replace(/X/g,"x").replace("x2","x^2").replace("x²","x^2");
    valoresABCEcuacionAlgebraica = ecuacionAlgebraica;
    valoresABCEcuacionAlgebraica = valoresABCEcuacionAlgebraica.replace(/ /g, "").replace(/--/g, "+").replace(/-/g, "+-").split('+'); // saco los espacios, y separo en terminos creando un array
    console.log(valoresABCEcuacionAlgebraica);
    valoresABCEcuacionAlgebraica = valoresABCEcuacionAlgebraica.filter(function(arrayElement) { //Recorro el array porque si hay alguno vacio
        return arrayElement !== ""; // Devuelvo los que no estan vacios
      });

    for (let i = 0; i < valoresABCEcuacionAlgebraica.length; i++) { //recorro los array elements de valoresABCEcuacionAlgebraica
        if (valoresABCEcuacionAlgebraica[i].includes("x^2")) { // a
            aEcuacionAlgebraica = valoresABCEcuacionAlgebraica[i].replace("x^2", "");
                if (aEcuacionAlgebraica === "" || aEcuacionAlgebraica === "-"){ //si luego de sacar la x^2, el numero me queda como "" o "-" le sumamos 1 porque el original era "-x^2" o "x^2" que es lo mismo que "-1x^2" y "1x^2"
                    aEcuacionAlgebraica += "1"; //Concatenamos en vez de poner un = porque queremos que si era 1 negativo originalmente siga siendolo
                }
            aEcuacionAlgebraica = parseFloat(aEcuacionAlgebraica);
        }
        if (valoresABCEcuacionAlgebraica[i].includes("x") && !(valoresABCEcuacionAlgebraica[i].includes("x^2"))) { //b
            bEcuacionAlgebraica = valoresABCEcuacionAlgebraica[i].replace("x", "");
                if (bEcuacionAlgebraica === "" || bEcuacionAlgebraica === "-"){ //si luego de sacar la x, el numero me queda como "" o "-" le sumamos 1 porque el original era "-x" o "x" que es lo mismo que "-1x" y "1x"
                    bEcuacionAlgebraica += "1"; //Concatenamos en vez de poner un = porque queremos que si era 1 negativo originalmente siga siendolo
                }
            bEcuacionAlgebraica = parseFloat(bEcuacionAlgebraica);
        }
        if (!(valoresABCEcuacionAlgebraica[i].includes("x"))) { //c (si NO tiene x)
            cEcuacionAlgebraica = valoresABCEcuacionAlgebraica[i];
            cEcuacionAlgebraica = parseFloat(cEcuacionAlgebraica);
        }
    }
    return [aEcuacionAlgebraica, bEcuacionAlgebraica, cEcuacionAlgebraica];
}

function bhaskara(a,b,c,signo) {
    let delta = (b ** 2) /* b a la 2*/- (4 * a * c);
    return ((b * (-1)) + signo * Math.sqrt(delta)) / (2 * a);
    //si "signo" es -1 equivale a "- Math.sqrt(delta)" y si es 1 equivale a "+ Math.sqrt(delta)"
}

function datosFuncion() {
    spanOrdenadaOrigen.innerHTML = cEcuacionAlgebraica;
    let coordXVertice = (bEcuacionAlgebraica * -1) / (2 * aEcuacionAlgebraica); //opuesto de b sobre 2a
    spanVerticeX.innerHTML = coordXVertice;
    spanVerticeY.innerHTML = aEcuacionAlgebraica * (coordXVertice ** 2) + bEcuacionAlgebraica * coordXVertice + cEcuacionAlgebraica; //imagen de la coordenada x del vertice
    if (aEcuacionAlgebraica > 0) {
        spanConcavidad.innerHTML = "Positiva";
    }
    else {
        spanConcavidad.innerHTML = "Negativa";
    }
    spanEjeSimetria.innerHTML = coordXVertice;
}

function imagenYPreimagen(imagenPreimagen) {
    if (imagenPreimagen === "imagen"){
        spanImagen.innerHTML = aEcuacionAlgebraica * (inputImagen.value ** 2) + bEcuacionAlgebraica * inputImagen.value + cEcuacionAlgebraica
    }
    else { //preimagen
        spanPreimagenX1.innerHTML = bhaskara(aEcuacionAlgebraica,bEcuacionAlgebraica,(cEcuacionAlgebraica + (inputPreimagen.value * (-1))), 1); //El numero del lado de la igualdad pasa lo cambiamos de lado como su opuesto y sumamos con semejantes(c)
        spanPreimagenX2.innerHTML = bhaskara(aEcuacionAlgebraica,bEcuacionAlgebraica,(cEcuacionAlgebraica + (inputPreimagen.value * (-1))), -1);
    }
}