document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul.menu li a');
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    links.forEach(link => {
        const href = link.getAttribute('href').toLowerCase();
        if (href === currentPage) {
        link.classList.add('active');
        }
    });
});


console.log("general.js cargado correctamente");
