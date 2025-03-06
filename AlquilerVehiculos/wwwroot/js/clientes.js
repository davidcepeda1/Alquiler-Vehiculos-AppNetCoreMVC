window.onload = function () {
    listarClientes();
}

let objClientes;

async function listarClientes() {
    objClientes = {
        url: "Clientes/listarClientes",
        cabeceras: ["ID Cliente", "ID Usuario", "Nombre Usuario", "Email","Nombre", "Apellido", "Telefono"],
        propiedades: ["idCliente", "idUsuario", "nombreUsuario", "email", "nombre", "apellido", "telefono"],
        editar: true,
        eliminar: true,
        propiedadID: "icCliente"

    }
    pintar(objClientes);
}

