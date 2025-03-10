﻿function get(valor) {
    return document.getElementById(valor).value;
}

function set(idControl, valor) {
    return document.getElementById(idControl).value = valor;
}

function setN(namecontrol, valor) {
    let elementos = document.getElementsByName(namecontrol);
    if (elementos.length > 0) {
        elementos[0].value = valor;
    }
}

function GetN(namecontrol) {
    let elementos = document.getElementsByName(namecontrol);
    return elementos.length > 0 ? elementos[0].value : "";
}

function LimpiarDatos(idFormulario) {
    let formulario = document.getElementById(idFormulario);
    if (formulario) {
        let elementos = formulario.querySelectorAll("input, textarea, select");
        elementos.forEach(elemento => {
            elemento.value = "";
        });
    }
}

async function fetchGet(url, tipoRespuesta, callback) {
    try {
        let urlCompleta = window.location.protocol + "//" + window.location.host + "/" + url;
        let res = await fetch(urlCompleta)

        if (tipoRespuesta == "json")
            res = await res.json();
        else if (tipoRespuesta == "text")
            res = await res.text();

        callback(res)

    } catch (e) {
        console.error("Error en fetchGET:", e);

        alert("ERROR! Ocurre un problema.");
    }
}

async function fetchPost(url, tipoRespuesta, frm, callback) {
    try {
        let raiz = document.getElementById("hdfOculto")?.value || "";
        let urlCompleta = `${window.location.protocol}//${window.location.host}/${raiz}${url}`;

        let res = await fetch(urlCompleta, {
            method: "POST",
            body: frm
        });

        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
        }

        if (tipoRespuesta === "json") {
            res = await res.json();
        } else if (tipoRespuesta === "text") {
            res = await res.text();
        }

        callback(res);
    } catch (e) {
        console.error("Error en fetchPost:", e);
        alert(`Ocurrió un problema en POST: ${e.message}`);
    }
}


let objConfiguracionGlobal;

function pintar(objConfiguracion) {
    objConfiguracionGlobal = objConfiguracion;

    if (objConfiguracionGlobal.divContenedorTabla == undefined)
        objConfiguracionGlobal.divContenedorTabla = "divTabla";
    if (objConfiguracionGlobal.editar == undefined)
        objConfiguracionGlobal.editar = false;
    if (objConfiguracionGlobal.eliminar == undefined)
        objConfiguracionGlobal.eliminar = false;
    if (objConfiguracionGlobal.propiedadID == undefined)
        objConfiguracionGlobal.propiedadID = "";

    fetchGet(objConfiguracion.url, "json", function (res) {
        let contenido = "";

        contenido += "<div id='divContenedor'>";

        contenido += generarTabla(res);

        contenido += "</div>";

        document.getElementById(objConfiguracionGlobal.divContenedorTabla).innerHTML = contenido;

        new DataTable('#myTable');
    });
}

function generarTabla(res) {
    
        let contenido = "";

        // ["Id tipo Medicamento", "Nombre", "Descripcion", "Stock"]
        let cabeceras = objConfiguracionGlobal.cabeceras;
        let propiedades = objConfiguracionGlobal.propiedades;

        contenido += "<table id='myTable' class='table table-striped'>";
        contenido += "<thead>";
        contenido += "<tr>";

        for (let i = 0; i < cabeceras.length; i++) {
            contenido += "<th>" + cabeceras[i] + "</th>";
        }

        if (objConfiguracionGlobal.editar === true || objConfiguracionGlobal.eliminar === true) {
            contenido += "<th>Operaciones</th>";
        }

        contenido += "</tr>";
        contenido += "</thead>";

        let nroRegistros = res.length;
        let obj;
        let propiedadActual;

        contenido += "<tbody>";

        for (let i = 0; i < nroRegistros; i++) {
            obj = res[i];
            contenido += "<tr>";
            for (let j = 0; j < propiedades.length; j++) {
                propiedadActual = propiedades[j];
                contenido += "<td>" + obj[propiedadActual] + "</td>";
            }

            if (objConfiguracionGlobal.editar === true || objConfiguracionGlobal.eliminar === true) {
                let propiedadID = objConfiguracionGlobal.propiedadID;
                contenido += "<td>";
                if (objConfiguracionGlobal.editar === true) {
                    contenido += `<i onclick="Editar(${obj[propiedadID]})" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </i>`;
                }
                contenido += " ";
                if (objConfiguracionGlobal.eliminar === true) {
                    contenido += `<i onclick="Eliminar(${obj[propiedadID]})" class="btn btn-danger">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg></i>`;
                }
                contenido += "</td>";
            }

            contenido += "</tr>";
        }

        contenido += "</tbody>";
        contenido += "</table>";
    
    console.log(contenido);
    return contenido;
}

function generarSliderVehiculos(res) {
    let slider = '<div class="swiper vehicles-slider">';
    slider += '<div class="swiper-wrapper">';

    res.forEach(vehiculo => {
        slider += '<div class="swiper-slide box">';
        slider += `<span style="display: none;" id="idVehiculo">${vehiculo.idVehiculo}</span>`
        slider += `<h3>${vehiculo.marca} ${vehiculo.modelo}</h3>`;
        slider += '<div class="content">';
        slider += `<img src="${vehiculo.imagen}" alt="${vehiculo.marca} ${vehiculo.modelo}">`;
        slider += `<p>Precio : $${vehiculo.precio}</p>`;
        slider += `<p>Año: ${vehiculo.año}</p>`;
        slider += `<p>Estado: ${vehiculo.estado}</p>`;
        slider += `<button class="btn" onclick="crearReserva(${vehiculo.idVehiculo})">Rentar Ahora</button>`;
        slider += '</div>';
        slider += '</div>';
    });
    slider += '</div>';
    slider += '<div class="swiper-pagination"></div>';
    slider += '<div class="swiper-button-next"></div>';
    slider += '<div class="swiper-button-prev"></div>';
    slider += '</div>';

    document.getElementById("vehicles").innerHTML = slider;
}

function generarLista(data, contenedorId) {
    let contenedor = document.getElementById(contenedorId);

    let listaHTML = '<div class="lista-generica">';

    data.forEach(vehiculo => {
        listaHTML += `
        <div class="tarjeta">
            <div class="tarjeta-imagen">
                <span style="display: none;" id="idVehiculo">${vehiculo.idVehiculo}</span>
                <img src="${vehiculo.imagen}" alt="${vehiculo.marca} ${vehiculo.modelo}">
            </div>
            <div class="tarjeta-detalles">
                <h2><span class="marca">${vehiculo.marca}</span> ${vehiculo.modelo}</h2>
                <ul class="detalles">
                    <li><i class="fas fa-calendar"></i> ${vehiculo.año}</li>
                    <li><i class="fas fa-check-circle"></i> ${vehiculo.estado}</li>
                </ul>
            </div>
            <div class="tarjeta-precio">
                <h3>Pago x Día</h3>
                <p class="precio">$${vehiculo.precio}</p>
                <button class="btn" onclick="crearReserva(${vehiculo.idVehiculo})">Rentar Ahora</button>
                <a href="https://wa.me/message/5BYYLRCUIQBEB1" class="btn whatsapp">Whatsapp</a>
            </div>
        </div>`;
    });

    listaHTML += '</div>';
    contenedor.innerHTML = listaHTML;
}

function LimpiarDatos(idFormulario) {
    let elementsName = document.querySelectorAll('#' + idFormulario + " [name]");

    elementsName.forEach(element => {
        element.value = "";
    });
}

//Funcion para Encriptar Contraseña
async function encriptarSha256(texto) {
    let hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getClienteId() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('clienteId=')) {
            return cookie.substring('clienteId='.length, cookie.length);
        }
    }
    return null;  // Si no se encuentra el idCliente
}

async function mostrarModal(vehiculoId) {
    try {
        // Realizamos la solicitud para obtener los vehículos
        const response = await fetch("Vehiculos/listarVehiculosDisponibles");

        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error al cargar los vehículos');
        }

        // Obtenemos los vehículos en formato JSON
        const vehiculos = await response.json();

        // Buscamos el vehículo por su id
        const vehiculo = vehiculos.find(v => v.idVehiculo === vehiculoId);

        // Si el vehículo existe, mostramos el modal
        if (vehiculo) {
            const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
            const modalInfo = document.getElementById("modalVehiculoInfo");

            modalInfo.innerHTML = `
                <p>Marca: ${vehiculo.marca}</p>
                <p>Modelo: ${vehiculo.modelo}</p>
                <p>Año: ${vehiculo.año}</p>
                <p>Precio x Día: $${vehiculo.precio}</p>
            `;
            document.getElementById("idVehiculofrm").value = vehiculo.idVehiculo;
            modal.show();  // Abrimos el modal
        } else {
            console.error("Vehículo no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener vehículos:", error);
    }
}



//document.getElementById("btnReservar").onclick = function () {
//    const vehiculoId = document.getElementById("modalVehiculoInfo").getAttribute("data-id");
//    console.log("VehiculoId:", vehiculoId);
//    const fechaInicio = document.getElementById("fechaInicio").value;
//    console.log("FechaInicio:", fechaInicio);
//    const fechaFin = document.getElementById("fechaFin").value;
//    console.log("FechaFin:", fechaFin);
//    const userId = sessionStorage.getItem("UserId");
//    console.log("UserId:", userId);

//    if (!userId) {
//        // Si no está en sessionStorage, redirigir a la página de inicio de sesión
//        Swal.fire("Error", "Debes iniciar sesión primero.", "error").then(() => {
//            window.location.href = "InicioSesion/InicioSesion";  // Redirigir al login si no está autenticado
//        });
//    } else {
//        // Si el UserId está en sessionStorage, permitir la reserva
//        console.log("UserId:", userId);  // Puedes comprobar que se ha obtenido correctamente
//    }

//    // Validación de fechas
//    if (!fechaInicio || !fechaFin) {
//        alert("Por favor selecciona un rango de fechas.");
//        return;
//    }

//    // Preparar los datos para enviar como JSON
//    const reservaData = {
//        idCliente: userId,
//        idVehiculo: vehiculoId,
//        fechaInicio: fechaInicio,
//        fechaFin: fechaFin,
//        estado: "Pendiente"
//    };

//    // Enviar los datos como JSON
//    fetch("Reservas/crearReserva", {
//        method: "POST",
//        headers: {
//            "Content-Type": "application/json",  // Asegúrate de que el servidor espere JSON
//        },
//        body: JSON.stringify(reservaData)  // Convertir los datos a formato JSON
//    })
//        .then(response => response.json())
//        .then(data => {
//            if (data.success) {
//                alert("Reserva realizada con éxito.");
//                // Cerrar el modal
//                const modal = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
//                modal.hide();
//            } else {
//                alert("Hubo un error al realizar la reserva.");
//            }
//        })
//        .catch(error => {
//            console.error("Error al enviar los datos de reserva:", error);
//            alert("Error al realizar la reserva.");
//        });
//}