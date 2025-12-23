const datosArtistas = {
    adele: {
        nombre: "Adele",
        imagen: "https://lastfm.freetls.fastly.net/i/u/300x300/b4eac8fadb0c4e669f2e2e5c16b0df12.jpg",
        canciones: ["Easy On Me", "Hello", "Someone Like You"],
        spotify: "https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY"
    },

    yatra: {
        nombre: "Sebastián Yatra",
        imagen: "https://via.placeholder.com/300x300?text=Yatra",
        canciones: ["Tacones Rojos", "Pareja del Año", "Traicionera"],
        spotify: "https://open.spotify.com/artist/07qeQ8jPuROE3E3Zts3aFP"
    },

    morat: {
        nombre: "Morat",
        imagen: "https://via.placeholder.com/300x300?text=Morat",
        canciones: [
            "Cómo Te Atreves", "Besos en Guerra", "A Dónde Vamos", "No Se Va", "Huele a Gol", "Del Estadio al Cielo", "Ladrona", "Mil tormentas", "Mi Suerte", 
            "Cuando Nadie Ve", "Mi Nuevo Vicio", "En Un Sólo Día", "Aprender A Quererte", "Yo Más Te Adoro", "Di Que No Te Vas", "Una Vez Más", "Ahora Que No Puedo Hablar",
            "Cuánto Me Duele", "Ya No Estás Tú", "En Coma", "No Termino", "Al Aire", "De Cero"
        ],
        spotify: "https://open.spotify.com/artist/4jUOqGkYuP7gac63qX3d3j"
    },

    camila: {
        nombre: "Camila",
        imagen: "https://via.placeholder.com/300x300?text=Camila",
        canciones: ["Todo Cambió", "Mientes", "Aléjate de Mí"],
        spotify: "https://open.spotify.com/artist/7n2wHs1TKAczGzO7Dd2rGr"
    },

    airbag: {
        nombre: "Airbag",
        imagen: "https://via.placeholder.com/300x300?text=Airbag",
        canciones: ["Cae el Sol", "Por Mil Noches", "Huracán"],
        spotify: "https://open.spotify.com/artist/2AeC5f7QmQnGMZhh7kwd32"
    },

    alanwalker: {
        nombre: "Alan Walker",
        imagen: "https://via.placeholder.com/300x300?text=Alan+Walker",
        canciones: ["Faded", "Alone", "The Spectre"],
        spotify: "https://open.spotify.com/artist/7vk5e3vY1uw9plTHJAMwjN"
    },

    aitana: {
        nombre: "Aitana",
        imagen: "https://via.placeholder.com/300x300?text=Aitana",
        canciones: ["Vas a Quedarte", "Lo Malo", "Teléfono"],
        spotify: "https://open.spotify.com/artist/7x5Slu77YaUve0vCq8kNjC"
    },

    hakuna: {
        nombre: "Hakuna Group Music",
        imagen: "https://via.placeholder.com/300x300?text=Hakuna",
        canciones: ["Huracán", "Sencillamente", "Amanece"],
        spotify: "https://open.spotify.com/artist/4nmS1pgPkn8xJ9K2Uc4FZz"
    },

    enrique: {
        nombre: "Enrique Iglesias",
        imagen: "https://via.placeholder.com/300x300?text=Enrique+Iglesias",
        canciones: ["Héroe", "Bailando", "Duele el Corazón"],
        spotify: "https://open.spotify.com/artist/7qG3b048QCHVRO5Pv1T5lw"
    },

    dvicio: {
        nombre: "Dvicio",
        imagen: "https://via.placeholder.com/300x300?text=Dvicio",
        canciones: ["Enamorate", "Paraíso", "Casi Humanos"],
        spotify: "https://open.spotify.com/artist/0B6G2LIbITb7fDma4K18G9"
    },

    cnco: {
        nombre: "CNCO",
        imagen: "https://via.placeholder.com/300x300?text=CNCO",
        canciones: ["Reggaetón Lento", "Mamita"],
        spotify: "https://open.spotify.com/artist/3qsKSpcV3ncke3hw52JSMB"
    },

    restart: {
        nombre: "Restart",
        imagen: "https://via.placeholder.com/300x300?text=Restart",
        canciones: ["Levo Comigo", "Restart"],
        spotify: "https://open.spotify.com/artist/5YPjbtD3N5teLoYyE1Qf1z"
    },

    laurapausini: {
        nombre: "Laura Pausini",
        imagen: "https://via.placeholder.com/300x300?text=Laura+Pausini",
        canciones: ["La Soledad", "En Cambio No"],
        spotify: "https://open.spotify.com/artist/3gqv1kgIVCheQYuyoijAI8"
    },

    chinonacho: {
        nombre: "Chino & Nacho",
        imagen: "https://via.placeholder.com/300x300?text=Chino+%26+Nacho",
        canciones: ["Mi Niña Bonita", "Andas en Mi Cabeza"],
        spotify: "https://open.spotify.com/artist/2LRo0xZX5Uae4ji01vLQ7c"
    },

    calidandee: {
        nombre: "Cali y el Dandee",
        imagen: "https://via.placeholder.com/300x300?text=Cali+y+El+Dandee",
        canciones: ["Yo Te Esperaré", "Por Fin Te Encontré"],
        spotify: "https://open.spotify.com/artist/1ChdXC2EKI8WzNL9NVt5Bi"
    },

    hombresg: {
        nombre: "Hombres G",
        imagen: "https://via.placeholder.com/300x300?text=Hombres+G",
        canciones: ["Devuélveme a Mi Chica", "Venezia"],
        spotify: "https://open.spotify.com/artist/2AoU3s2fz3D8HKp5fEuV64"
    }

};

const botones = document.querySelectorAll(".ver-canciones");
const panel = document.getElementById("panel-canciones");
const cerrar = document.querySelector(".cerrar-panel");
const contenido = document.getElementById("contenido");

botones.forEach(btn => {
    btn.addEventListener("click", e => {

        const tarjeta = e.target.closest(".tarjeta-artista");
        const id = tarjeta.dataset.artista;
        const data = datosArtistas[id];

        document.getElementById("img-artista").src = data.imagen;
        document.getElementById("nombre-artista").textContent = data.nombre;

        const ul = document.getElementById("lista-canciones");
        ul.innerHTML = "";
        data.canciones.forEach(c => {
            const li = document.createElement("li");
            li.textContent = c;
            ul.appendChild(li);
        });

        document.getElementById("spotify-link").href = data.spotify;

        panel.classList.add("activo");
        contenido.classList.add("ajustado");
    });
});

cerrar.addEventListener("click", () => {
    panel.classList.remove("activo");
    contenido.classList.remove("ajustado");
});

const img = document.getElementById("img-artista");
img.onload = () => console.log("IMG cargada");
img.onerror = (e) => console.log("IMG ERROR", e);
const url = "https://lastfm.freetls.fastly.net/i/u/300x300/b4eac8fadb0c4e669f2e2e5c16b0df12.jpg"; // prueba con esta y con otras
img.src = url;