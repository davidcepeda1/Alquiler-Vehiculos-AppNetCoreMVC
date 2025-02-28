window.onload = function () {
    listarClientes();
}

let objClientes;

async function listarClientes() {
    objClientes = {
        url: "Clientes/listarClientes",
        cabeceras: ["Id", "Nombre", "Apellido", "Telefono", "Email"],
        propiedades: ["idCliente", "nombre", "apellido", "telefono", "email"]
    }
    pintar(objClientes);
}

/*
function buscarClientes() {
    let forma = document.getElementById("frmBusqueda");
    let frm = new FormData(forma);
    fetchPost("Clientes/filtrarClientes", "json", frm, function (res) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(res);
    });
}

function LimpiarClientes() {
    LimpiarDatos("frmBusqueda")
    listarClientes();
}

function guardarClientes() {
    let frmGuardar = document.getElementById("frmBusqueda");

    let frm = new FormData(frmGuardar);
    fetchPost("Clientes/guardarClientes", "text", frm, function (data) {
        if (data == "1") {
            listarClientes("frmBusqueda");
            LimpiarClientes("frmBusqueda");
        }
    });
}

*/