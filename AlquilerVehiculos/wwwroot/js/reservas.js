window.onload = function () {
    listarReservas();
}

let objReservas;

async function listarReservas() {
    objReservas = {
        url: "Reservas/listarReservas",
        cabeceras: ["ID Reserva", "ID Cliente", "Nombre", "Apellido", "Id Vehiculo", "Vehiculo Marca", "Vehiculo Modelo", "Vehiculo Año", "Fecha Inicial", "Fecha Final", "Estado"],
        propiedades: ["idReserva", "idCliente", "clienteNombre", "clienteApellido", "idVehiculo", "vehiculoMarca", "vehiculoModelo", "vehiculoAño", "fechaInicio", "fechaFin", "estado"],
        editar: true,
        eliminar: true
    }
    pintar(objReservas);
}