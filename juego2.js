const frases = [
    {
        texto: "This book is ______ than the other one.",
        base: "good",
        respuesta: "better"
    },
    {
        texto: "He is the ______ player in the team.",
        base: "good",
        respuesta: "best"
    },
    {
        texto: "Today is ______ than yesterday.",
        base: "cold",
        respuesta: "colder"
    },
    {
        texto: "That was the ______ movie I've ever seen.",
        base: "bad",
        respuesta: "worst"
    },
    {
        texto: "She is ______ than her sister.",
        base: "tall",
        respuesta: "taller"
    },
    {
        texto: "It’s the ______ building in the city.",
        base: "tall",
        respuesta: "tallest"
    }
];

let fraseActual = {};

function nuevaFrase() {
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];
    fraseActual = aleatoria;
    document.getElementById("frase").textContent = aleatoria.texto;
    document.getElementById("pista").textContent = aleatoria.base;
    document.getElementById("respuesta").value = "";
    document.getElementById("resultado").textContent = "";
}

function verificarRespuesta() {
    const userInput = document.getElementById("respuesta").value.trim().toLowerCase();
    const resultado = document.getElementById("resultado");

    if (userInput === fraseActual.respuesta.toLowerCase()) {
        resultado.textContent = "✅ ¡Correcto!";
        resultado.style.color = "green";
    } else {
        resultado.textContent = `❌ Incorrecto. La respuesta era: ${fraseActual.respuesta}`;
        resultado.style.color = "red";
    }
}

window.onload = nuevaFrase;
