document.getElementById("botonCalcular").addEventListener("click", function () {
    mostrarNuevosValores();
});

const canvas = document.getElementById("canvasGraficar");
const context = canvas.getContext("2d");

window.addEventListener("load", function () { //Al iniciar
    canvas.width = 800;
    canvas.height = 800;
    context.scale(1*(5), 1*(5));
    canvasFondo(canvas, context);
    graficarTriangulo(6,8,10);
});

function mostrarNuevosValores() {
    let inputA = document.getElementById("a");
    let inputB = document.getElementById("b");
    let inputHipotenusa = document.getElementById("c");
    let cantidadInputsVacios = 0;
    cantidadInputsVacios += inputA.value == ''; // Suma uno si esta vacio
    cantidadInputsVacios += inputB.value == '';
    cantidadInputsVacios += inputHipotenusa.value == '';
    if (inputA.value == '') valorQueCambia = 'a';
    if (inputB.value == '') valorQueCambia = 'b';
    if (inputHipotenusa.value == '') valorQueCambia = 'c';
    if (cantidadInputsVacios == 1) {
        let res = pitagoras(Number(inputA.value),Number(inputB.value),Number(inputHipotenusa.value),valorQueCambia);
        inputA.value = res.a;
        inputB.value = res.b;
        inputHipotenusa.value = res.c;
        graficarTriangulo(res.a,res.b,res.c);
    }
    else {
        alert("Tiene que haber dos campos de texto rellenados y uno vacío.");
    }
}

function pitagoras(a,b,c,valorAjustar) {
    let catetoA = a;
    let catetoB = b;
    let hipotenusa = c;
    if (valorAjustar == 'c') {
        hipotenusa = Math.sqrt((catetoA ** 2) + (catetoB ** 2));
    } else if (valorAjustar == 'a') { 
        catetoA = Math.sqrt((hipotenusa ** 2) - (catetoB ** 2));
    }
    else { // valorAjustar == 'b'
        catetoB = Math.sqrt((hipotenusa ** 2) - (catetoA ** 2));
    }

    if (catetoA >= hipotenusa || catetoB >= hipotenusa) {
        alert("La longitud de cualquier cateto debe ser siempre inferior a la longitud de la hipotenusa.");
        return;
    }
    catetoA = parseFloat(catetoA);
    catetoB = parseFloat(catetoB);
    hipotenusa = parseFloat(hipotenusa);
    return {
        a: catetoA,
        b: catetoB,
        c: hipotenusa
    };
}

function graficarTriangulo(a,b,c) {
    canvasFondo(canvas, context);

    context.lineWidth = 1;
    context.strokeStyle = "#485d93";
    context.fillStyle = "#7d9fe5";

    //TRIANGULO
    context.beginPath();
    context.moveTo((0*10)+(80 -(b*5)), (-0*10)+(80 +(a*5)));
    context.lineTo((b*10)+(80 -(b*5)), (-0*10)+(80 +(a*5)));
    context.lineTo((0*10)+(80 -(b*5)), (-a*10)+(80 +(a*5)));
    context.lineTo((0*10)+(80 -(b*5)), (-0*10)+(80 +(a*5)));
    context.stroke();
    context.fill();

    //Texto A
    context.font = '5px Roboto, sans-serif';
    context.fillStyle = "#000";
    context.fillText('A', (-1*10)+(80 -(b*5)), (-a*5)+(80 +(a*5)));
    context.fillText('B', (b*5)+(80 -(b*5)), (10)+(80 +(a*5)));
    context.fillText('C', (b*5+10)+(80 -(b*5)), (-a*5)+(80 +(a*5)));
}

function canvasFondo(lienzo, contexto) {
    lienzo.style.display = "inline-block";

    //Borrar el canvas
    contexto.clearRect(0, 0, lienzo.width, lienzo.height);

    //Fondo Blanco
    contexto.fillStyle = "white";
    contexto.fillRect(0, 0, lienzo.width, lienzo.height);
}