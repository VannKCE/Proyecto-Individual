document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contacForm");
    const msgSuccess = document.getElementById("msgSuccess");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita recargar la página

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();
        const mood = form.mood.value;

        if (!nombre || !email || !mensaje) {
            alert("Completa todos los campos obligatorios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Ingresa un correo válido.");
            return;
        }

        const data = new URLSearchParams();
        data.append("nombre", nombre);
        data.append("email", email);
        data.append("mood", mood);
        data.append("mensaje", mensaje);

        fetch("http://localhost:8000/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data.toString()
        })
        .then(response => response.text())
        .then(text => {
            msgSuccess.textContent = text;
            msgSuccess.style.display = "block";
            form.reset();
        })
        .catch(err => {
            console.error("Error al enviar:", err);
            alert("Ocurrió un error al enviar el mensaje.");
        });
    });
});
