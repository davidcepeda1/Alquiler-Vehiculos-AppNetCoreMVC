window.onload = function () {
    listarPagos();
}

let objPagos;

async function listarPagos() {
    objPagos = {
        url: "Pagos/listarPagos",
        cabeceras: ["ID Pago", "ID Reserva", "ID Cliente", "Nombre", "Apellido", "Monto", "ID Metodo de Pago", "Metodo de Pago", "Fecha de Pago"],
        propiedades: ["idPago", "idReserva", "idCliente", "clienteNombre", "clienteApellido", "monto", "idMetodoPago", "metodoPago", "fechaPago"],
        editar: true,
        eliminar: true
    }
    pintar(objPagos);
}