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

// Función que se llama al hacer clic en el botón de reserva
function crearReserva() {
    const userId = sessionStorage.getItem("UserId");  // Obtener el UserId de sessionStorage
    if (!userId) {
        Swal.fire("Error", "Debes iniciar sesión primero.", "error");
        return; // Salir de la función si no hay un UserId
    }

    // Recuperar los otros datos necesarios para la reserva
    const vehiculoId = document.getElementById("vehiculoId").value;  // Suponiendo que tienes el ID del vehículo
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    // Crear un objeto FormData para enviar los datos al servidor
    const frm = new FormData();
    frm.append("ClienteID", userId);
    frm.append("VehiculoID", vehiculoId);
    frm.append("FechaInicio", fechaInicio);
    frm.append("FechaFin", fechaFin);
    frm.append("Estado", "Pendiente");

    // Enviar los datos al servidor para crear la reserva
    fetch("/Reservas/CrearReserva", {
        method: "POST",
        body: frm,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire("Reserva exitosa", "Tu reserva ha sido realizada con éxito.", "success");
            } else {
                Swal.fire("Error", "Hubo un problema al crear la reserva.", "error");
            }
        })
        .catch(error => {
            console.error("Error al enviar los datos:", error);
            Swal.fire("Error", "Ocurrió un error inesperado.", "error");
        });
}
