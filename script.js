// Arreglo que contiene los verbos irregulares (en pasado)
let arrayPalabras = ["BOUGHT", "ATE", "WROTE", "FELL", "GAVE", "TOOK"];

// Ayuda: verbo en presente (para que adivinen su forma pasada)
let ayudas = [
    "Tiempo pasado de: Buy",
    "Tiempo pasado de: Eat",
    "Tiempo pasado de: Write",
    "Tiempo pasado de: Fall",
    "Tiempo pasado de: Give",
    "Tiempo pasado de: Take"
];

let cantPalabrasJugadas = 0;
let intentosRestantes = 5;
let posActual;
let arrayPalabraActual = [];
let cantidadAcertadas = 0;
let divsPalabraActual = [];
let totalQueDebeAcertar;

function cargarNuevaPalabra() {
    cantPalabrasJugadas++;
    if (cantPalabrasJugadas > arrayPalabras.length) {
        arrayPalabras = ["BOUGHT", "ATE", "WROTE", "FELL", "GAVE", "TOOK"];
        ayudas = [
            "Tiempo pasado de: Buy",
            "Tiempo pasado de: Eat",
            "Tiempo pasado de: Write",
            "Tiempo pasado de: Fall",
            "Tiempo pasado de: Give",
            "Tiempo pasado de: Take"
        ];
        cantPalabrasJugadas = 1;
    }

    posActual = Math.floor(Math.random() * arrayPalabras.length);
    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;
    arrayPalabraActual = palabra.split('');
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    for (let i = 0; i < palabra.length; i++) {
        const divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    divsPalabraActual = document.getElementsByClassName("letra");
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);
}

cargarNuevaPalabra();

document.addEventListener("keydown", event => {
    if (isLetter(event.key)) {
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML.split('');

        if (letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1) {
            let acerto = false;

            for (let i = 0; i < arrayPalabraActual.length; i++) {
                if (arrayPalabraActual[i] === event.key.toUpperCase()) {
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    cantidadAcertadas++;
                }
            }

            if (acerto) {
                if (totalQueDebeAcertar === cantidadAcertadas) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            } else {
                intentosRestantes--;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                if (intentosRestantes <= 0) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintarError";
                    }
                }
            }

            document.getElementById("letrasIngresadas").innerHTML += event.key.toUpperCase() + " - ";
        }
    }
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
