function MostrarModal() {
    LimpiarDatos("frmVehiculoAdmin");
    var myModal = new bootstrap.Modal(document.getElementById('modalVehiculoAdmin'));
    myModal.show();
}

async function GuardarVehiculo() {
    let form = document.getElementById("frmVehiculoAdmin");
    let frm = new FormData(form);

    // Obtener los valores de los campos

    let marca = document.getElementById("marca");
    let modelo = document.getElementById("modelo");
    let año = document.getElementById("año");
    let precio = document.getElementById("precio");
    let estado = document.getElementById("estado");
    let imagen = document.getElementById("imagen");

    estado.value = "Disponible";

    for (let [key, value] of frm.entries()) {
        console.log(`${key}: ${value}`);
    }
    // Validar que ningún campo esté vacío o solo tenga espacios en blanco
    if (!marca.value.trim() || !modelo.value.trim() || !año.value.trim() || !precio.value.trim() || !imagen.value.trim()) {
        Swal.fire("Error", "Por favor, complete todos los campos.", "error");
        return;
    }

    fetchPost("AdminVehiculos/GuardarVehiculo", "text", frm, function (res) {

        console.log(res +"mis esasd");
        if (res >= 0) {
            Swal.fire("Guardado", "Se guardo vehiculo correctamente.", "success");
            listarVehiculos();
            LimpiarDatos("frmVehiculosAdmin");

            var myModal = bootstrap.Modal.getInstance(document.getElementById('modalVehiculoAdmin'));
            myModal.hide();
        } else {
            Swal.fire("Error", "No se puedo guardar vehiculo", "error");
        }

    });
}

function LimpiarVehiculo() {
    LimpiarDatos("frmVehiculoAdmin");
    listarVehiculos();
}

function Editar(id) {
    console.log("el id de edtiar vehiculo es:" + id);
    fetchGet("AdminVehiculos/RecuperarVehiculo/?idVehiculo=" + id, "json", function (data) {
        try {
            setN("idVehiculo", data.idVehiculo);
            setN("marca", data.marca);
            setN("modelo", data.modelo);
            setN("año", data.año);
            setN("precio", data.precio);
            setN("estado", data.estado);
            setN("imagen", data.imagen);

            console.log(data);

            // Show the modal
            var myModal = new bootstrap.Modal(document.getElementById('modalVehiculoAdmin'));
            myModal.show();
            LimpiarDatos("frmVehiculosAdmin");

        } catch (e) {

            console.log(`El error es: ${e.message}`);
        }
    });
}

function Eliminar(id) {
    console.log(id);
    fetchGet("AdminVehiculos/RecuperarVehiculo/?idVehiculo=" + id, "json", function (data) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea eliminar el Vehiculo " + data.marca + " " + data.modelo + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realizar la eliminación
                fetchGet("AdminVehiculos/EliminarVehiculo/?idVehiculo=" + id, "text", function (r) {
                    Swal.fire('¡Eliminado!', 'El registro ha sido eliminado con éxito.', 'success').then(() => {
                        listarVehiculos();
                    });
                });
            }
        });
    });
}
