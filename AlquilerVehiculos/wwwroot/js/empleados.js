window.onload = function () {
    listarEmpleados();
}

let objEmpleados;

async function listarEmpleados() {
    objEmpleados = {
        url: "Empleados/listarEmpleados",
        cabeceras: ["ID Empleado", "ID Usuario", "Nombre Usuario", "Email", "Nombre", "Apellido", "Cargo", "Telefono"],
        propiedades: ["idEmpleado", "idUsuario", "nombreUsuario", "email", "nombre", "apellido", "cargo", "telefono"],
        editar: true,
        eliminar: true,
        propiedadID: "idEmpleado"
    }
    pintar(objEmpleados);
}
function MostrarModal() {
    // LimpiarDatos("frmLaboratorio");
    var myModal = new bootstrap.Modal(document.getElementById('modalEmpleado'));
    myModal.show();
}

async function GuardarEmpleado() {
    let form = document.getElementById("frmEmpleado");
    let frm = new FormData(form);

    // Obtener los valores de los campos

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let cargo = document.getElementById("cargo");
    let telefono = document.getElementById("telefono");
    let email = document.getElementById("email");
    //let contraseña = document.getElementById("contrasena");


    let nombreUsuario = nombre.value;
    let contraseña = nombre.value.trim() + apellido.value.trim();

    

    // Solo encriptar si la contraseña no está vacía
    if (contraseña.trim() !== "") {
        let contraseñaEncrip = await encriptarSha256(contraseña); // Encriptación
        console.log("mi contrase:" + contraseñaEncrip);
        frm.append("contraseña", contraseñaEncrip); // Añadir contraseña encriptada
        frm.append("nombreUsuario", nombreUsuario);
    } else {
        // Si la contraseña está vacía, no agregarla o agregar un valor por defecto si es necesario
        frm.append("contrasena", ""); // O cualquier valor predeterminado
    }

    for (let [key, value] of frm.entries()) {
        console.log(`${key}: ${value}`);
    }
    // Validar que ningún campo esté vacío o solo tenga espacios en blanco
    if (!nombre.value.trim() || !apellido.value.trim() || !cargo.value.trim() || !telefono.value.trim() || !email.value.trim()) {
        Swal.fire("Error", "Por favor, complete todos los campos.", "error");
        return;
    }
    

    fetchPost("Empleados/GuardarEmpleado", "text", frm, function (res) {


        if (res >= 0) {
            Swal.fire("Guardado", "Se guardo empleado correctamente.", "success");
            listarEmpleados();
            LimpiarDatos("frmEmpleado");

            var myModal = bootstrap.Modal.getInstance(document.getElementById('modalEmpleado'));
            myModal.hide();
        } else {
            Swal.fire("Eror", "No se puedo guardar empleado", "error");
        }

    });
}

function LimpiarEmpleados() {

    LimpiarDatos("frmEmpleado");
    listarEmpleados();
}

function Editar(id) {
    console.log(id);
    fetchGet("Empleados/RecuperarEmpleado/?idEmpleado=" + id, "json", function (data) {
        setN("idEmpleado", data.idEmpleado);
        setN("idUsuario", data.idUsuario);
        setN("nombre", data.nombre);
        setN("apellido", data.apellido);
        setN("email", data.email);
        setN("cargo", data.cargo);
        setN("telefono", data.telefono);


        // Show the modal
        var myModal = new bootstrap.Modal(document.getElementById('modalEmpleado'));
        myModal.show();
    });
} 

function Eliminar(id) {
    fetchGet("Empleados/RecuperarEmpleado/?idEmpleado=" + id, "json", function (data) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea eliminar el Empleado" + data.nombre + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, realizar la eliminación
                fetchGet("Empleados/EliminarEmpleado/?idEmpleado=" + id, "text", function (r) {
                    Swal.fire('¡Eliminado!', 'El registro ha sido eliminado con éxito.', 'success').then(() => {
                        // Recargar la lista de laboratorios después de eliminar
                        listarEmpleados();
                    });
                });
            }
        });
    });
}