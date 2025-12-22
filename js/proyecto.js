let usuario;

// Verificar si ya se mostró la bienvenida
if (!sessionStorage.getItem("bienvenidaMostrada")) {
    usuario = prompt("Ingrese su nombre:");

    Swal.fire({
        title: `Hola, ${usuario}`,
        html: 'Bienvenida a mi página<br>¡Me alegra que estés aquí!',
        background: '#fff',
        color: '#000000ff',
        confirmButtonColor: '#000000ff',
        showConfirmButton: true,
        customClass: {
            popup: 'mi-fuente'
        }
    });

    // Guardar en sessionStorage que ya se mostró
    sessionStorage.setItem("bienvenidaMostrada", "true");

    // También podemos guardar el nombre para usarlo después
    sessionStorage.setItem("usuario", usuario);
} else {
    // Si ya se mostró, tomamos el nombre guardado
    usuario = sessionStorage.getItem("usuario");
}

// Actualizar el texto de la bienvenida
const bienvenida = document.querySelector(".bienvenida");
bienvenida.textContent = `Hola ${usuario}, disfruta este pequeño espacio mío.`;

console.log("JS funcionando");
