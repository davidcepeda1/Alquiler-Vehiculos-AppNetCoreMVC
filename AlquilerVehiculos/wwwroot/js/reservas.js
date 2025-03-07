window.onload = function () {
    listarReservas();
}

let objReservas;

async function listarReservas() {
    objReservas = {
        url: "Reservas/listarReservas",
        cabeceras: ["ID Reserva", "Nombre", "Apellido", "Vehiculo Marca", "Vehiculo Modelo", "Vehiculo Año", "Fecha Inicial", "Fecha Final", "Estado"],
        propiedades: ["idReserva", "clienteNombre", "clienteApellido", "vehiculoMarca", "vehiculoModelo", "vehiculoAño", "fechaInicio", "fechaFin", "estado"],
        editar: true,
        eliminar: true,
        propiedadID: "idReserva"
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

function LimpiarReserva() {

    LimpiarDatos("frmReserva");
    listarReservas();
}

function ActualizarEstadoVehiculo() {
    let form = document.getElementById("frmReserva");
    let frm = new FormData(form);

    // Obtener los valores de los campos
    let estado = document.getElementById("estado");


    // Validar que ningún campo esté vacío o solo tenga espacios en blanco
    if (!estado.value.trim()) {
        Swal.fire("Error", "Por favor, complete todos los campos.", "error");
        return;
    }


    fetchPost("Reservas/ActualizarEstadoReserva", "text", frm, function (res) {


        if (res >= 0) {
            Swal.fire("Guardado", "Se actualizo el estado correctamente.", "success");
            listarReservas();
            LimpiarDatos("frmReserva");

            var myModal = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
            myModal.hide();
        } else {
            Swal.fire("Eror", "No se puedo guardar empleado", "error");
        }

    });
}
function Editar(id) {
    console.log(id);
    fetchGet("Reservas/RecuperarReserva/?idReserva=" + id, "json", function (data) {
        setN("idReservas", data.idReserva);
        setN("idCliente", data.idCliente);
        setN("idVehiculo", data.idVehiculo);
        setN("nombre", data.clienteNombre);
        setN("apellido", data.clienteApellido);
        setN("marca", data.vehiculoMarca);
        setN("modelo", data.vehiculoModelo);
        setN("año", data.vehiculoAño);
        setN("fechaInicio", data.fechaInicio);
        setN("fechaFinal", data.fechaFin);
        setN("telefono", data.estado);


        // Show the modal
        var myModal = new bootstrap.Modal(document.getElementById('modalReserva'));
        myModal.show();
    });
} 
function Eliminar(id) {
    fetchGet("Reservas/RecuperarReserva/?idReserva=" + id, "json", function (data) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea eliminar la Reserva de  " + data.clienteNombre + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realizar la eliminación
                fetchGet("Reservas/EliminarReserva/?idReserva=" + id, "text", function (r) {
                    Swal.fire('¡Eliminado!', 'El registro ha sido eliminado con éxito.', 'success').then(() => {
                        // Recargar la lista de laboratorios después de eliminar
                        listarReservas();
                    });
                });
            }
        });
    });
}