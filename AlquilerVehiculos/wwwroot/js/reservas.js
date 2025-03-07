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

// Función que se llama al hacer clic en el botón de reserva

function validarFormulario() {
    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaFin = document.getElementById("fechaFin").value;

    if (!fechaInicio || !fechaFin) {
        Swal.fire("Error", "Por favor, complete ambas fechas.", "error");
        return false;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
        Swal.fire("Error", "La fecha de fin no puede ser anterior a la fecha de inicio.", "error");
        return false;
    }

    return true;
}
function crearReserva(idVehiculo) {
    const userId = sessionStorage.getItem("UserId");  // Obtener el UserId de sessionStorage
    if (!userId) {
        Swal.fire("Error", "Debes iniciar sesión primero.", "error");
        return; // Salir de la función si no hay un UserId
    }
    mostrarModal(idVehiculo);
}

function guardarReserva() {
    if (!validarFormulario()) {
        return;
    }

    const userId = sessionStorage.getItem("UserId");  // Obtener el UserId de sessionStorage
    let form = document.getElementById("frmReserva");

    // Crear un objeto FormData para enviar los datos al servidor
    let frm = new FormData(form);
    frm.append("idCliente", userId);  
    frm.append("estado", "Pendiente");  

    let formObject = Object.fromEntries(frm.entries());
    console.log("Formulario enviado:", formObject);
    fetchPost("Reservas/CrearReserva", "text", frm, function () {
        Swal.fire("Reserva exitosa", "Tu reserva ha sido realizada con éxito.", "success");
        LimpiarDatos("frmReserva");
        var myModal = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
        myModal.hide();
    });
}