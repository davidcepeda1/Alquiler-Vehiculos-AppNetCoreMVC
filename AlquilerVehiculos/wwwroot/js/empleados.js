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
        eliminar: true
    }
    pintar(objEmpleados);
}