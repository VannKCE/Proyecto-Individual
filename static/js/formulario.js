const form = document.getElementById("contacForm");

const resultado = document.createElement("div");
resultado.id = "resultado";
form.appendChild(resultado);

const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const moodSelect = document.getElementById("mood");
const mensajeInput = document.getElementById("mensaje");

const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMood = document.getElementById("error-mood");
const errorMensaje = document.getElementById("error-mensaje");

moodSelect.addEventListener("change", function () {
    const body = document.body;
    switch (this.value) {
        case "Feliz": body.style.backgroundColor = "#c2e0ffff"; break;
        case "Pensativo": body.style.backgroundColor = "#feefdbff"; break;
        case "Tranquilo": body.style.backgroundColor = "#dcfce7"; break;
        case "Motivado": body.style.backgroundColor = "#f2daffff"; break;
        case "Cansado": body.style.backgroundColor = "#e5e7eb"; break;
        default: body.style.backgroundColor = "white";
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorNombre.innerText = "";
    errorEmail.innerText = "";
    errorMood.innerText = "";
    errorMensaje.innerText = "";
    resultado.innerText = "";

    let isValid = true;

    if (nombreInput.value.trim() === "") {
        errorNombre.innerText = "Por favor escribe tu nombre";
        errorNombre.style.color = "red";
        isValid = false;
    }

    if (!emailInput.value.includes("@") || emailInput.value.trim() === "") {
        errorEmail.innerText = "Correo inválido, necesita @";
        errorEmail.style.color = "red";
        isValid = false;
    }

    if (moodSelect.value === "") {
        errorMood.innerText = "Seleccione una opción";
        errorMood.style.color = "red";
        isValid = false;
    }

    if (mensajeInput.value.trim().length < 5) {
        errorMensaje.innerText = "Envie un mensaje más largo";
        errorMensaje.style.color = "red";
        isValid = false;
    }

    if (!isValid) return;

    const formData = new FormData(form);

    try {
        const response = await fetch("/enviar", {
            method: "POST",
            body: new URLSearchParams(formData)
        });

        const resultText = await response.text();

        if (!response.ok) {
            // Si el servidor devolvió error, lo mostramos en rojo
            resultado.innerText = "Error: " + resultText;
            resultado.style.color = "red";
            return;
        }

        // Si todo va bien
        resultado.innerText = resultText;
        resultado.style.color = "green";

        form.reset();
        document.body.style.backgroundColor = "white";

    } catch (err) {
        // Error de red
        resultado.innerText = "Error al enviar el mensaje";
        resultado.style.color = "red";
        console.error(err);
    }
});
