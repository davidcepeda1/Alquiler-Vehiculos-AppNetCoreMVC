window.onload = function () {
    if (document.getElementById("divtabla")) {
        listarVehiculos();
    }
    if (document.getElementById("vehicles")) {
        listarVehiculosSlider();
    }
};

let objVehiculos;

async function listarVehiculos() {
    objVehiculos = {
        url: "Vehiculos/listarVehiculos",
        cabeceras: ["Id", "Marca", "Modelo", "Año", "Precio", "Estado"],
        propiedades: ["idVehiculo", "marca", "modelo", "año", "precio", "estado"],
        editar: true,
        eliminar: true
    }
    pintar(objVehiculos);
}
function listarVehiculosSlider() {
    fetchGet("Vehiculos/listarVehiculos", "json", function (res) {
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