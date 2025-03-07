window.onload = function () {
    listarClientes();
}

let objClientes;

async function listarClientes() {
    objClientes = {
        url: "Clientes/listarClientes",
        cabeceras: ["ID Cliente", "Nombre Usuario", "Email","Nombre", "Apellido", "Telefono"],
        propiedades: ["idCliente", "nombreUsuario", "email", "nombre", "apellido", "telefono"],
        editar: true,
        eliminar: true,
        propiedadID: "idCliente"

    }
    pintar(objClientes);
}
function MostrarModal() {
    LimpiarDatos("frmCliente");
    var myModal = new bootstrap.Modal(document.getElementById('modalCliente'));
    myModal.show();
}

async function GuardarCliente() {
    let form = document.getElementById("frmCliente");
    let frm = new FormData(form);

    // Obtener los valores de los campos

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let nombreUsuario = document.getElementById("nombreUsuario");
    let telefono = document.getElementById("telefono");
    let email = document.getElementById("email");

    let contraseña = nombre.value.trim() + apellido.value.trim();

    // Solo encriptar si la contraseña no está vacía
    if (contraseña.trim() !== "") {
        let contraseñaEncrip = await encriptarSha256(contraseña); // Encriptación
        console.log("mi contrase:" + contraseñaEncrip);

        frm.append("contraseña", contraseñaEncrip); // Añadir contraseña encriptada
    } else {
        // Si la contraseña está vacía, no agregarla o agregar un valor por defecto si es necesario
        frm.append("contrasena", ""); // O cualquier valor predeterminado
    }

    for (let [key, value] of frm.entries()) {
        console.log(`${key}: ${value}`);
    }
    // Validar que ningún campo esté vacío o solo tenga espacios en blanco
    if (!nombre.value.trim() || !apellido.value.trim() || !nombreUsuario.value.trim() || !telefono.value.trim() || !email.value.trim()) {
        Swal.fire("Error", "Por favor, complete todos los campos.", "error");
        return;
    }

    fetchPost("Clientes/GuardarCliente", "text", frm, function (res) {


        if (res >= 0) {
            Swal.fire("Guardado", "Se guardo cliente correctamente.", "success");
            listarClientes();
            LimpiarDatos("frmCliente");

            var myModal = bootstrap.Modal.getInstance(document.getElementById('modalCliente'));
            myModal.hide();
        } else {
            Swal.fire("Eror", "No se puedo guardar empleado", "error");
        }

    });
}

function LimpiarClientes() {
    LimpiarDatos("frmCliente");
    listarClientes();
}

function Editar(id) {
    console.log(id);
    fetchGet("Clientes/RecuperarCliente/?idCliente=" + id, "json", function (data) {
        try {
            setN("idCliente", data.idCliente);
            setN("idUsuario", data.idUsuario);
            setN("nombre", data.nombre);
            setN("apellido", data.apellido);
            setN("email", data.email);
            setN("telefono", data.telefono);

            set("nombreUsuario", data.nombreUsuario);

            console.log(data);

            // Show the modal
            var myModal = new bootstrap.Modal(document.getElementById('modalCliente'));
            myModal.show();
        } catch (e) {
            console.log(` Wesdasdas${e.message}`);
        }
    });
}

function Eliminar(id) {
    console.log(id);
    fetchGet("Clientes/RecuperarCliente/?idCliente=" + id, "json", function (data) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea eliminar el Cliente " + data.nombre + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realizar la eliminación
                fetchGet("Clientes/EliminarCliente/?idCliente=" + id, "text", function (r) {
                    Swal.fire('¡Eliminado!', 'El registro ha sido eliminado con éxito.', 'success').then(() => {
                        listarClientes();
                    });
                });
            }
        });
    });
}
