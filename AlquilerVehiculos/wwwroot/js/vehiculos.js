﻿let vehiculos = [];

window.onload = function () {
    if (document.getElementById("divtabla")) {
       listarVehiculos();
    }
    if (document.getElementById("vehicles")) {
        listarVehiculosSlider();
    }
    if (document.getElementById("vehicles-container")) {
        listarVehiculosCard();
    }
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

async function listarVehiculosDisponibles() {
    objVehiculos = {
        url: "Vehiculos/listarVehiculosDisponibles",
        cabeceras: ["Id", "Marca", "Modelo", "Año", "Precio", "Estado"],
        propiedades: ["idVehiculo", "marca", "modelo", "año", "precio", "estado"],
    }
    pintar(objVehiculos);
}

function listarVehiculosSlider() {
    fetchGet("Vehiculos/listarVehiculosDisponibles", "json", function (res) {
        console.log(res);
        generarSliderVehiculos(res);
        new Swiper(".vehicles-slider", {
            grabCursor: true,
            centeredSlides: true,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 9500,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
}


function listarVehiculosCard() {
    fetch("Vehiculos/listarVehiculosDisponibles")
        .then(response => response.json())
        .then(vehiculos => {
            if (document.getElementById("vehicles-container")) {
                generarLista(vehiculos, "vehicles-container", {});
            }
        })
        .catch(error => console.error("Error al obtener vehículos:", error));
}

