let TextoBola = document.querySelector("#texto-bola");
let mensajes = ["Sí", "No", "Todavía no", "En un futuro", "Es cierto", "Es dificil responder"];
let sizeMensajes = ["70px", "70px", "35px", "30px", "40px", "23px"];
let Bola = document.querySelector(".bola");
let Triangulo = document.querySelector(".triangulo");
let efectoDeSonido = new Audio("./sounds/transicion_magica.wav")
TextoBola.setAttribute("mensaje" , "8");
TextoBola.style.fontSize = "170px";
Triangulo.style.backgroundImage = "none";
Input = document.querySelector(".input");


function VerificarEscribioMensaje(){
    if (Input.value != "") {
        Input.value = "";
        decirmensaje();
      }
}

async function decirmensaje(){
    TextoBola.style.fontSize = "30px";
    Triangulo.style.backgroundImage = "url(./img/triangulo.png)";
    TextoBola.style.marginTop = "60px";
    let eleccion =  elegirNumeroAleatorio(mensajes.length);
    TextoBola.setAttribute("mensaje" , mensajes[eleccion]);
    TextoBola.style.fontSize = sizeMensajes[eleccion];
    TextoBola.style.width = "100px";
    efectoDeSonido.play();
    //Hace efecto de blur y se desvanece lentamente
    for (let i = 0; i <= 15; i++) {
        let cantidadBlur = 15;
        cantidadBlur -= i;
        TextoBola.style.filter = `blur(${cantidadBlur}px)`;
        await new Promise(r => setTimeout(r, 120));
        //espera 80 milisegundos
      }
      efectoDeSonido.stop();
}

function elegirNumeroAleatorio(max) {
    return Math.floor(Math.random() * max);
  }