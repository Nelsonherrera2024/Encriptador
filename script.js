// selección de los elementos html

var btnEncriptar = document.querySelector(".btnEncriptar"); 
var btnDesencriptar = document.querySelector(".btnDesencriptar"); 
var btnCopiar = document.querySelector(".btnCopiar");
var contenedorImagenPanel = document.querySelector(".contenedorImagenPanel");
var contenedorH3 = document.querySelector(".contenedorH3");
var contenedorP = document.querySelector(".contenedorParrafo");
var contenedorResultado = document.querySelector(".contenedorResultado");
var contenedorCopiar = document.querySelector(".contenedorCopiar");
var resultado = document.querySelector(".textoResultado");
var textArea = document.querySelector(".textArea"); // Esste seleccióna el textarea

// Funciones de botones "onclick"
btnEncriptar.onclick = encriptar;
btnDesencriptar.onclick = decrypter;
btnCopiar.onclick = copiar;

function encriptar() {
    var text = recuperarTexto();
    if (text === "") {
        alert("Tienes que escribir algo en el campo de texto");
    } else if (!/^[a-z\s.,;¡!¿?]+$/.test(text)) {
        alert("Debes ingresar sólo letras minúsculas sin acentos, y sin caracteres especiales.");
    } else {
        //Aquí se vacia el textoResultado para que no se repita al presionar el botón "Encriptar"...
        document.querySelector(".textoResultado").textContent = "";
        ocultarPanel();
        // Esta función muestra el contenedor Resultado y muestra Botón oculto
        mostrarResultado();
        resaltarBloque();
        mostrarTextoDeFormaGradual(encrypter(text));
    }
}

function decrypter() {
    ocultarPanel();
    var textoDesencriptado = decrypt(recuperarTexto());
    if (textoDesencriptado === "") {
        alert("No has ingresado letras por lo tanto no existe texto a desencriptar.");
    } else {
        mostrarResultado();
        resultado.textContent = "";
        mostrarTextoDeFormaGradual(textoDesencriptado);
    }
}

// Método para copiar el texto del resultado directamente al portapapeles.
function copiar() {
    var textoCopiar = recuperarTextoBloque2();
    navigator.clipboard.writeText(textoCopiar);
    mostrarCheck();
}

//recuperación del texto del TextArea
function recuperarTexto() {
    var text = document.querySelector(".textArea");
    return text.value;
}

function ocultarPanel() {
    contenedorImagenPanel.classList.add("hide");
    contenedorH3.classList.add("hide");
    contenedorP.classList.add("hide");
}

function mostrarResultado() {
    //Función que remueve el método "hide" de la clases ocultas por defecto//
    contenedorResultado.classList.remove("hide");
    contenedorCopiar.classList.remove("hide");
}

function encrypter(mensaje) {
    var text = mensaje;
    var final = "";

    for (var i = 0; i < text.length; i++) {
        if (text[i] == "a") {
            final = final + "ai";
        } else if (text[i] == "e") {
            final = final + "enter";
        } else if (text[i] == "i") {
            final = final + "imes";
        } else if (text[i] == "o") {
            final = final + "ober";
        } else if (text[i] == "u") {
            final = final + "ufat";
        } else {
            final = final + text[i];
        }
    }
    return final;
}

function decrypt(mensaje) {
    var text = mensaje;
    var final = "";

    for (var i = 0; i < text.length; i++) {
        if (text[i] == "a") {
            final = final + "a";
            i = i + 1;
        } else if (text[i] == "e") {
            final = final + "e";
            i = i + 4;
        } else if (text[i] == "i") {
            final = final + "i";
            i = i + 3;
        } else if (text[i] == "o") {
            final = final + "o";
            i = i + 3;
        } else if (text[i] == "u") {
            final = final + "u";
            i = i + 3;
        } else {
            final = final + text[i];
        }
    }
    return final;
}

function recuperarTextoBloque2() {
    var text = document.querySelector(".textoResultado");
    return text.textContent;
}

textArea.addEventListener("click", function () {
    textArea.focus();
});

//Efecto máquina de escribir (Type)
function mostrarTextoDeFormaGradual(texto) {
    var i = 0;
    var intervalo = 100; // intervalo en milisegundos entre letra y letra
    var resultado = document.querySelector(".textoResultado");

    function mostrarSiguienteCaracter() {
        if (i < texto.length) {
            resultado.textContent += texto.charAt(i);
            i++;
            setTimeout(mostrarSiguienteCaracter, intervalo);
        }
    }
    mostrarSiguienteCaracter();
}

function resaltarBloque() {
    var bloque2 = document.querySelector(".bloque2");
    bloque2.classList.add("resaltado"); 

    // Vuelve al estado anterior despues de 1000 milisegundos
    setTimeout(function () {
        bloque2.classList.remove("resaltado");
    }, 1000); // Duración en milisegundo
}

// función que muestra el símbolo check por 2 segundos y lo oculta
function mostrarCheck() {
    // Obtenemos el elemento div que contiene el check
    var check = document.getElementById("check");
    // Cambiamos el estilo del div para que se muestre
    check.style.display = "block";
    // Temporizador para ocultar el check después de 2000 milisegundos
    setTimeout(function () {
        check.style.display = "none";
    }, 2000);
}

// Función que activa el modo oscuro
var switchMode = document.querySelector('.switch-button'); // Seleccion del botón por su clase
var moonIcon = document.querySelector('.fa-moon'); // Seleccion del ícono de la luna para oscuro

switchMode.addEventListener('change', function (event) {
    if (event.target.checked) { // Con esto verifica si el checkbox está marcado
        document.body.classList.add('darkMode'); // Aquí grega la clase darkMode al body
        moonIcon.classList.remove('fa-moon'); // Esto remove la clase fa-moon del ícono
        moonIcon.classList.add('fa-sun'); // Aquí grega la clase fa-sun al ícono
    } else {
        document.body.classList.remove('darkMode'); // Este remuevo la clase darkMode del cuerpo del documento
        moonIcon.classList.remove('fa-sun'); // Aquí remuevo la clase fa-sun del ícono
        moonIcon.classList.add('fa-moon'); // Esto agrega la clase fa-moon al ícono
        document.body.style.transition = 'background-color 1.5s'; 
    }
});
