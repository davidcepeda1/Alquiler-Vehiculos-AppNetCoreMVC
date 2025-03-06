let vehiculos = [];

window.onload = function () {
    //if (document.getElementById("divtabla")) {
    //    listarVehiculos();
    //}
    listarVehiculosSlider();
    listarVehiculosCard();
};

let objVehiculos;

async function listarVehiculos() {
    objVehiculos = {
        url: "Vehiculos/listarVehiculos",
        cabeceras: ["Id", "Marca", "Modelo", "Año", "Precio", "Estado"],
        propiedades: ["idVehiculo", "marca", "modelo", "año", "precio", "estado"],
        editar: true,
        eliminar: true,
        propiedadID: "idVehiculo"

    }
    pintar(objVehiculos);
    
}
function listarVehiculosSlider() {
    fetchGet("Vehiculos/listarVehiculos", "json", function (res) {
        console.log(res);
        generarSliderVehiculos(res);
        new Swiper(".vehicles-slider", {
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            loop: true, 
            autoplay: {
                delay: 3000,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
}

function listarVehiculosCard() {
    fetch("Vehiculos/listarVehiculos")
        .then(response => response.json())
        .then(vehiculos => {
            if (document.getElementById("vehicles-container")) {
                generarLista(vehiculos, "vehicles-container", {});
            }
        })
        .catch(error => console.error("Error al obtener vehículos:", error));
}

