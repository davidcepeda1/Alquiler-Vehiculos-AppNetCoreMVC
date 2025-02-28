window.onload = function () {
    listarVehiculos();
}

let objVehiculos;

async function listarVehiculos() {
    objVehiculos = {
        url: "Vehiculos/listarVehiculos",
        cabeceras: ["Id", "Marca", "Modelo", "Año", "Precio", "Estado", "Imagen"],
        propiedades: ["idVehiculo", "marca", "modelo", "año", "precio", "estado", "imagen"]
    }
    pintar(objVehiculos);
}