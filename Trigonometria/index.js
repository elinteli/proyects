const inputA = document.getElementById("a");
const inputB = document.getElementById("b");
const inputC = document.getElementById("c");
const inputAlpha = document.getElementById("alpha");
const inputBeta = document.getElementById("beta");
const btnCalcular = document.getElementById("botonCalcular");
const procedimiento = document.getElementById("procedimiento");
const selectAngulo = document.getElementById("selectAngulo");
const seno = document.getElementById("seno");
const coseno = document.getElementById("coseno");
const tangente = document.getElementById("tangente");

selectAngulo.addEventListener('change', function () {
    if (inputA.value != "" && inputB.value != "" && inputC.value != "" && inputAlpha.value != "" && inputBeta.value != "") {
        mostrarRazones();
    }
});

btnCalcular.addEventListener('click', function () {
    procedimiento.innerHTML = "";
    agregarPaso(`Vamos a tener en cuenta el ángulo β`);
    let catetoOpuesto = Number(inputB.value);
    let catetoAdyacente = Number(inputA.value);
    let hipotenusa = Number(inputC.value);
    let anguloAlpha = Number(inputAlpha.value);
    let anguloBeta = Number(inputBeta.value);
    let cantidadInfo = 0;
    cantidadInfo += catetoOpuesto != "";
    cantidadInfo += catetoAdyacente != "";
    cantidadInfo += hipotenusa != "";
    cantidadInfo += anguloBeta != "" || anguloAlpha != "";
    if (cantidadInfo < 2) {
        alert("Falta información para poder calcular");
        return;
    }

    //Angulos
    if (anguloAlpha == "" && anguloBeta != "") {
        anguloAlpha = 180 - (anguloBeta + 90);
        inputAlpha.value = anguloAlpha;
        agregarPaso(`α = 180 - ${anguloBeta} - 90`);
    } else if (anguloBeta == "" && anguloAlpha != "") {
        anguloBeta = 180 - (anguloAlpha + 90);
        inputBeta.value = anguloBeta;
        agregarPaso(`β = 180 - ${anguloAlpha} - 90`);
    } else if (anguloBeta == "" && anguloAlpha == ""){ //Si no tenemos el valor de ningun angulo
        if (catetoOpuesto != "" && hipotenusa != "") { //Si tengo el cat op y la hip
            anguloBeta = Math.asin(catetoOpuesto/hipotenusa);
            agregarPaso(`β = sen⁻¹(${catetoOpuesto}÷${hipotenusa})`);
        } else if (catetoAdyacente != "" && hipotenusa != "") { //Si tengo el cat ady y la hip
            anguloBeta = Math.acos(catetoAdyacente/hipotenusa);
            agregarPaso(`β = cos⁻¹(${catetoAdyacente}÷${hipotenusa})`);
        } else if (catetoOpuesto != "" && catetoAdyacente != "") { //Si tengo el cat op y el cat ady
            anguloBeta = Math.atan(catetoOpuesto/catetoAdyacente);
            agregarPaso(`β = tan⁻¹(${catetoOpuesto}÷${catetoAdyacente})`);
        }
        anguloBeta = anguloBeta*180/Math.PI;
        inputBeta.value = anguloBeta;
        anguloAlpha = 180 - (anguloBeta + 90);
        inputAlpha.value = anguloAlpha;
        agregarPaso(`α = 180 - ${anguloBeta} - 90`);
    }

    //Lados
    if (catetoAdyacente == "") {
        if (catetoOpuesto != "") {
            catetoAdyacente = catetoOpuesto / Math.tan(anguloBeta * Math.PI / 180);
            agregarPaso(`a = ${catetoOpuesto}÷ tan(${anguloBeta})`);
        } else if (hipotenusa != "") {
            catetoAdyacente = hipotenusa * Math.cos(anguloBeta * Math.PI / 180);
            agregarPaso(`a = ${hipotenusa} · cos(${anguloBeta})`);
        }
        inputA.value = catetoAdyacente;
    }

    if (catetoOpuesto == "") {
        if (catetoAdyacente != "") {
            catetoOpuesto = catetoAdyacente * Math.tan(anguloBeta * Math.PI / 180);
            agregarPaso(`b = ${catetoAdyacente} · tan(${anguloBeta})`);
        } else if (hipotenusa != "") {
            catetoOpuesto = hipotenusa * Math.sin(anguloBeta * Math.PI / 180);
            agregarPaso(`b = ${hipotenusa} · sen(${anguloBeta})`);
        }
        inputB.value = catetoOpuesto;
    }

    if (hipotenusa == "") {
        if (catetoOpuesto != "") {
            hipotenusa = catetoOpuesto / Math.sin(anguloBeta * Math.PI / 180);
            agregarPaso(`c = ${catetoOpuesto} ÷ sen(${anguloBeta})`);
        } else if (catetoAdyacente != "") {
            hipotenusa = catetoAdyacente * Math.cos(anguloBeta * Math.PI / 180);
            agregarPaso(`c = ${catetoAdyacente} · cos(${anguloBeta})`);
        }
        inputC.value = hipotenusa;
    }
    mostrarRazones();
});

function mostrarRazones () {
    let anguloSeleccionado = Number(inputAlpha.value);
    if (selectAngulo.value == 'beta') {
        anguloSeleccionado = Number(inputBeta.value);
    }
    seno.value = Math.sin(anguloSeleccionado * Math.PI / 180); //Lo convierto a radianes
    coseno.value = Math.cos(anguloSeleccionado * Math.PI / 180);
    tangente.value = Math.tan(anguloSeleccionado * Math.PI / 180);
}

function agregarPaso(contenido) {
    let newPaso = document.createElement("li");
    newPaso.innerHTML = contenido;
    procedimiento.appendChild(newPaso);
}