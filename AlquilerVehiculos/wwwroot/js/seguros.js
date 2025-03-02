window.onload = function () {
    listarSeguros();
}

let objSeguros;

async function listarSeguros() {
    objSeguros = {
        url: "Seguros/listarSeguros",
        cabeceras: ["ID", "ID Reserva", "ID Cliente", "Nombre", "Apellido", "ID Tipo Seguro", "Tipo Seguro", "Descripcion Seguro", "Costo", "Fecha Contratacion"],
        propiedades: ["idSeguro", "idReserva", "idCliente", "clienteNombre", "clienteApellido", "idTipoSeguro", "tipoSeguro", "descripcionSeguro", "costo", "fechaContratacion"],
        editar: true,
        eliminar: true
    }
    pintar(objSeguros);
}