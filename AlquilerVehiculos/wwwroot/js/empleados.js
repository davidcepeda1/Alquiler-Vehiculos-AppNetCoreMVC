window.onload = function () {
    listarEmpleados();
}

let objEmpleados;

async function listarEmpleados() {
    objEmpleados = {
        url: "Empleados/listarEmpleados",
        cabeceras: ["Id", "Nombre", "Apellido", "Cargo", "Telefono", "Email"],
        propiedades: ["idEmpleado", "nombre", "apellido", "cargo", "telefono", "email"]
    }
    pintar(objEmpleados);
}