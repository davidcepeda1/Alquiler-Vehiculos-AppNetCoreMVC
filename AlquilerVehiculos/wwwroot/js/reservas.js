window.onload = function () {
    listarReservas();
}

let objReservas;

async function listarReservas() {
    objReservas = {
        url: "Reservas/listarReservas",
        cabeceras: ["Id", "Id Cliente", "Id Vehiculo", "Fecha Inicial", "Fecha Final", "Estado"],
        propiedades: ["idReserva", "idCliente", "idVehiculo", "fechaInicio", "fechaFin", "estado"]
    }
    pintar(objReservas);
}