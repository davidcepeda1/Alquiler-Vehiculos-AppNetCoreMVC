window.onload = function () {
    listarSeguros();
}

let objSeguros;

async function listarSeguros() {
    objSeguros = {
        url: "Seguros/listarSeguros",
        cabeceras: ["Id", "Id Reserva", "Tipo Seguro", "Costo"],
        propiedades: ["idSeguro", "idReserva", "tipoSeguro", "costo"]
    }
    pintar(objSeguros);
}