let usuario;

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

    sessionStorage.setItem("bienvenidaMostrada", "true");

    sessionStorage.setItem("usuario", usuario);
} else {
    usuario = sessionStorage.getItem("usuario");
}

const bienvenida = document.querySelector(".bienvenida");
bienvenida.textContent = `Hola ${usuario}, disfruta este pequeño espacio mío.`;

console.log("JS funcionando");
