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

    if (objConfiguracionGlobal.divContenedorTabla == undefined) {
        objConfiguracionGlobal.divContenedorTabla = "divContenedorTabla"
    }

    fetchGet(objConfiguracion.url, "json", function (res) {
        let contenido = "";

        contenido += "<div id='" + objConfiguracionGlobal.divContenedorTabla + "'>"

        contenido += generarTabla(res);

        contenido += "</div>";

        document.getElementById("divtabla").innerHTML = contenido;
    })
}

function generarTabla(res) {

    let contenido = " ";

    let cabeceras = objConfiguracionGlobal.cabeceras;

    let nombrePropiedades = objConfiguracionGlobal.propiedades;

    contenido = '<table class="table">';
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