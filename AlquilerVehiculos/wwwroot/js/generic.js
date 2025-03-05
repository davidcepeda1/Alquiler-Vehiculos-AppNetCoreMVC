function get(valor) {
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
        let raiz = document.getElementById("hdfOculto")?.value || "";
        let urlCompleta = `${window.location.protocol}//${window.location.host}/${raiz}${url}`;
        console.log("🔍 URL completa que intenta acceder: ", urlCompleta);  // Verifica la URL

        let res = await fetch(urlCompleta);
        if (!res.ok) {
            throw new Error('Error en la solicitud: ' + res.statusText);
        }


        
        if (tipoRespuesta == "json") {
            res = await res.json();
        } else if (tipoRespuesta == "text") {
            res = await res.text();
        }

        console.log("✅ Datos recibidos del backend:", res);
        callback(res);

    } catch (e) {
        console.error("❌ Error en fetchGet:", e);
        alert("Ocurrió un problema: " + e.message);
    }
}

//async function fetchGet(url, tipoRespuesta, callback) {
//    try {
//        let raiz = document.getElementById("hdfOculto")?.value || "";
//        let urlCompleta = `${window.location.protocol}//${window.location.host}/${raiz}${url}`;

//        console.log("🔍 URL completa que intenta acceder: ", urlCompleta);  // Verifica la URL

//        let res = await fetch(urlCompleta);
//        console.log(res);

//        // Verifica si la respuesta es exitosa
//        if (!res.ok) {
//            throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
//        }

//        // Procesa la respuesta según el tipo solicitado
//        if (tipoRespuesta === "json") {
//            try {
//                res = await res.json();
//            } catch (jsonError) {
//                throw new Error("Error al procesar la respuesta como JSON: " + jsonError.message);
//            }
//        } else if (tipoRespuesta === "text") {
//            try {
//                res = await res.text();
//            } catch (textError) {
//                throw new Error("Error al procesar la respuesta como texto: " + textError.message);
//            }
//        }

//        console.log("✅ Datos recibidos del backend:", res);
//        callback(res);

//    } catch (e) {
//        // Manejo de errores más específicos
//        if (e.name === 'TypeError' && e.message.includes('Failed to fetch')) {
//            console.error("❌ Error de red: No se pudo conectar al servidor.");
//            alert("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
//        } else if (e.message.includes('Error en la solicitud')) {
//            console.error("❌ Error en la solicitud:", e.message);
//            alert(`Ocurrió un error en la solicitud: ${e.message}`);
//        } else if (e.message.includes('Error al procesar la respuesta')) {
//            console.error("❌ Error en el procesamiento de la respuesta:", e.message);
//            alert(`Error al procesar la respuesta del servidor: ${e.message}`);
//        } else {
//            console.error("❌ Error desconocido:", e);
//            alert("Ocurrió un problema desconocido: " + e.message);
//        }
//    }
//}


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

//async function fetchPost(url, tipoRespuesta, frm, callback) {
//    try {
//        // Validar que la URL no esté vacía
//        if (!url || typeof url !== "string") {
//            throw new Error("URL no válida o vacía.");
//        }

//        let raiz = document.getElementById("hdfOculto")?.value || ""; 
//        let urlCompleta = `${window.location.protocol}//${window.location.host}/${raiz}${url}`;

//        let res;
//        try {
//            res = await fetch(urlCompleta, {
//                method: "POST",
//                body: frm
//            });
//        } catch (networkError) {
//            throw new Error(`Error de red: No se pudo conectar con el servidor. Detalles: ${networkError.message}`);
//        }

//        // Manejo de errores HTTP
//        if (!res.ok) {
//            throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
//        }

//        let responseData;
//        try {
//            if (tipoRespuesta === "json") {
//                responseData = await res.json();
//            } else if (tipoRespuesta === "text") {
//                responseData = await res.text();
//            } else {
//                throw new Error(`Tipo de respuesta desconocido: '${tipoRespuesta}'. Usa 'json' o 'text'.`);
//            }
//        } catch (parseError) {
//            throw new Error(`Error al procesar la respuesta: ${parseError.message}`);
//        }

//        // Validar que el callback sea una función
//        if (typeof callback !== "function") {
//            throw new Error("El callback proporcionado no es una función válida.");
//        }

//        callback(responseData);

//    } catch (e) {
//        console.error("Error en fetchPost:", e);
//        alert(`Ocurrió un problema en POST: ${e.message}`);
//    }
//}


let objConfiguracionGlobal;

function pintar(objConfiguracion) {
    objConfiguracionGlobal = objConfiguracion;

    if (objConfiguracionGlobal.divContenedorTabla == undefined) {
        objConfiguracionGlobal.divContenedorTabla = "divContenedorTabla"
    }

    fetchGet(objConfiguracion.url, "json", function (res) {
        let contenido = "";

        contenido += "<div id='" + objConfiguracionGlobal.divContenedorTabla + "'>"

        contenido += generarTabla(res);

        contenido += "</div>";

        document.getElementById("divtabla").innerHTML = contenido;
        new DataTable("#dataTable")
    })
}

function generarTabla(res) {

    let contenido = " ";

    let cabeceras = objConfiguracionGlobal.cabeceras;

    let nombrePropiedades = objConfiguracionGlobal.propiedades;

    contenido = '<table class="table" id="dataTable">';
    contenido += "<thead>"

    /* Primera fila de la tabla con los headers */

    contenido += "<tr>"

    for (var i = 0; i < cabeceras.length; i++) {
        contenido += "<td>" + cabeceras[i] + "</td>";
    }

    if (objConfiguracionGlobal.editar || objConfiguracionGlobal.eliminar) {
        contenido += "<td>Operaciones</td>";
    }

    contenido += "</tr>"

    contenido += "</thead>"

    // Cuerpo

    contenido += "<tbody>"

    let nroRegistros = res.length;
    let obj;
    let propiedadActual;

    for (let i = 0; i < nroRegistros; i++) {
        obj = res[i];
        contenido += "<tr>";

        for (var j = 0; j < nombrePropiedades.length; j++) {
            propiedadActual = nombrePropiedades[j];
            contenido += "<td>" + obj[propiedadActual] + "</td>";
        }

        if (objConfiguracionGlobal.editar || objConfiguracionGlobal.eliminar) {
            contenido += "<td>";

            if (objConfiguracionGlobal.editar) {
                contenido += `<button class="btn btn-primary" type="submit">
                    <i class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </i>
                </button>`;
            }

            contenido += " ";
            if (objConfiguracionGlobal.eliminar) {
                contenido += `<button class="btn btn-danger" type="submit">
                    <i class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </i>
                </button>`;
            }
            contenido += "</td>";
        }
        contenido += "</tr>";
    }

    contenido += "</tbody>"
    contenido += "</table>"

    return contenido;
}

function generarSliderVehiculos(res) {
    let slider = '<div class="swiper vehicles-slider">';
    slider += '<div class="swiper-wrapper">';

    res.forEach(vehiculo => {
        slider += '<div class="swiper-slide box">';
        slider += `<h3>${vehiculo.marca} ${vehiculo.modelo}</h3>`;
        slider += '<div class="content">';
        slider += `<img src="${vehiculo.imagen}" alt="${vehiculo.marca} ${vehiculo.modelo}">`;
        slider += `<p>Precio : $${vehiculo.precio}</p>`;
        slider += `<p>Año: ${vehiculo.año}</p>`;
        slider += `<p>Estado: ${vehiculo.estado}</p>`;
        slider += `<button class="btn" onclick="mostrarModal(${vehiculo.idVehiculo})">Rentar Ahora</button>`;
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

function generarLista(data, contenedorId, opciones) {
    let contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    let listaHTML = '<div class="lista-generica">';

    data.forEach(item => {
        listaHTML += `
        <div class="tarjeta">
            <div class="tarjeta-imagen">
                <img src="${item.imagen}" alt="${item.marca} ${item.modelo}">
            </div>
            <div class="tarjeta-detalles">
                <h2><span class="marca">${item.marca}</span> ${item.modelo}</h2>
                <ul class="detalles">
                    <li><i class="fas fa-calendar"></i> ${item.año}</li>
                    <li><i class="fas fa-check-circle"></i> ${item.estado}</li>
                </ul>
            </div>
            <div class="tarjeta-precio">
                <h3>Pago x Día</h3>
                <p class="precio">$${item.precio}</p>
                <button class="btn" onclick="mostrarModal(${item.idVehiculo})">Rentar Ahora</button>
                <a href="https://wa.me/message/5BYYLRCUIQBEB1" class="btn whatsapp">Whatsapp</a>
            </div>
        </div>`;
    });

    listaHTML += '</div>';
    contenedor.innerHTML = listaHTML;
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

function mostrarModal(vehiculoId) {
    const vehiculo = vehiculos.find(v => v.idVehiculo === vehiculoId);
    if (vehiculo) {
        const modal = new bootstrap.Modal(document.getElementById('modalReserva')); // Usamos el modal de Bootstrap
        const modalInfo = document.getElementById("modalVehiculoInfo");
        modalInfo.setAttribute("data-id", vehiculoId);
        modalInfo.innerHTML = `
            <p>Marca: ${vehiculo.marca}</p>
            <p>Modelo: ${vehiculo.modelo}</p>
            <p>Año: ${vehiculo.año}</p>
            <p>Precio x Día: $${vehiculo.precio}</p>
        `;
        modal.show();  // Abrimos el modal
    } else {
        console.error("Vehículo no encontrado");
    }
}

document.getElementById("btnReservar").onclick = function () {
    const vehiculoId = document.getElementById("modalVehiculoInfo").getAttribute("data-id");
    console.log("VehiculoId:", vehiculoId);
    const fechaInicio = document.getElementById("fechaInicio").value;
    console.log("FechaInicio:", fechaInicio);
    const fechaFin = document.getElementById("fechaFin").value;
    console.log("FechaFin:", fechaFin);
    const userId = sessionStorage.getItem("UserId");
    console.log("UserId:", userId);

    if (!userId) {
        // Si no está en sessionStorage, redirigir a la página de inicio de sesión
        Swal.fire("Error", "Debes iniciar sesión primero.", "error").then(() => {
            window.location.href = "InicioSesion/InicioSesion";  // Redirigir al login si no está autenticado
        });
    } else {
        // Si el UserId está en sessionStorage, permitir la reserva
        console.log("UserId:", userId);  // Puedes comprobar que se ha obtenido correctamente
    }

    // Validación de fechas
    if (!fechaInicio || !fechaFin) {
        alert("Por favor selecciona un rango de fechas.");
        return;
    }

    // Preparar los datos para enviar como JSON
    const reservaData = {
        idCliente: userId,
        idVehiculo: vehiculoId,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        estado: "Pendiente"
    };

    // Enviar los datos como JSON
    fetch("Reservas/crearReserva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  // Asegúrate de que el servidor espere JSON
        },
        body: JSON.stringify(reservaData)  // Convertir los datos a formato JSON
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Reserva realizada con éxito.");
                // Cerrar el modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
                modal.hide();
            } else {
                alert("Hubo un error al realizar la reserva.");
            }
        })
        .catch(error => {
            console.error("Error al enviar los datos de reserva:", error);
            alert("Error al realizar la reserva.");
        });
}
