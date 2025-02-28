window.onload = function () {
    listarPagos();
}

let objPagos;

async function listarPagos() {
    objPagos = {
        url: "Pagos/listarPagos",
        cabeceras: ["Id", "Id Reserva", "Monto", "Metodo de Pago", "Fecha de Pago"],
        propiedades: ["idPago", "idReserva", "monto", "metodoPago", "fechaPago"]
    }
    pintar(objPagos);
}