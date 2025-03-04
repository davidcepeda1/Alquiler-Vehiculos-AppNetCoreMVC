function totxt(e) {
    e = e.value.trim();
    return e;
}

function validation(input, inputName, re, label) {
    let value = totxt(input);

    function Rfalse() {
        input.style = "border-bottom:1px solid red;background-image: linear-gradient(0deg, rgba(255,0,0,.3) 0%, rgba(0,0,0,0) 30%);";
    }

    function Rtrue() {
        input.style = "border-bottom:1px solid green;background-image: linear-gradient(0deg, rgba(0,255,0,.3) 0%, rgba(0,0,0,0) 30%);";
    }

    function content() {
        Swal.fire("Error", `El ${inputName} debe contener solo letras y numeros para su facil memorizacion`, "error");
    }

    function number(less, more) {
        if (value.length < less || value.length > more) {
            Swal.fire("Error", `El ${inputName} debe tener más que ${less} y menos que ${more}.`, "error");
        } else {
            content();
        }
    }

    function empty() {
        Swal.fire("Error", `No debes dejar ${inputName} en blanco.`, "error");
    }

    function incorrect() {
        Swal.fire("Error", `El ${inputName} es incorrecto.`, "error");
    }

    if (!value) {
        empty();
        Rfalse();
        return false;
    }

    if (!re.test(value)) {
        if (inputName === "nombreUsuario") {
            number(5, 15);
        } else if (inputName === "contraseña") {
            number(7, 14);
        } else if (inputName === "email") {
            incorrect();
        } else {
            content();
        }
        Rfalse();
        return false;
    }

    Rtrue();
    return true;
}

async function Registrar() {
    let form = document.getElementById("frmRegistro"); 
    let frm = new FormData(form);

    let usernameRe = /^[A-Za-z0-9]{5,15}$/;
    let emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRe = /^[A-Za-z0-9]{7,14}$/;
    let nameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}$/;
    let lastNameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}$/;
    let telephoneRe = /^09[0-9]{8}$/;

    let username = document.getElementById("nombreUsuario");
    let email = document.getElementById("email");
    let password = document.getElementById("contraseña");
    let name = document.getElementById("nombre");
    let lastName = document.getElementById("apellido");
    let telephone = document.getElementById("telefono");

    let passwordCorrect = validation(password, "contraseña", passwordRe);
    let emailCorrect = validation(email, "email", emailRe);
    let usernameCorrect = validation(username, "nombreUsuario", usernameRe);
    let nameCorrect = validation(name, "nombre", nameRe);
    let lastNameCorrect = validation(lastName, "apellido", lastNameRe);
    let telephoneCorrect = validation(telephone, "telefono", telephoneRe);

    if (usernameCorrect && emailCorrect && passwordCorrect && nameCorrect && lastNameCorrect && telephoneCorrect) {

       
        username.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        email.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        password.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        name.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        lastName.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        telephone.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        let contraseñaEncriptada = await encriptarSha256(password.value);
        frm.set("contraseña", contraseñaEncriptada);

        // Limpiar los campos
        username.value = "";
        email.value = "";
        password.value = "";
        name.value = "";
        lastName.value = "";
        telephone.value = "";

        fetchPost("InicioSecion/Registrar", "text", frm, function (res) {
            

            Swal.fire("La cuenta se ha creado con éxito", "La cuenta ha sido creada, por favor inicie sesión", "success");

            let chk = document.getElementById("chk");
            chk.checked = true;
            console.log("Usuario agregado");
        });

    } else {
        Swal.fire("Error en el registro", "Por favor, revise los campos ingresados.", "error");
    }
}

async function ValidarInicioSesion() {
    //let form = document.getElementById("frmRegistro");
    //let frm = new FormData(form);

    //for (let [key, value] of frm.entries()) {
    //    console.log(`${key}: ${value}`);
    //}


    let username = document.getElementById("nombreUsuario2"); // Campo de nombre de usuario
    //let email = document.getElementById("email"); // Campo de correo electrónico
    let password = document.getElementById("contraseña2"); // Campo de contraseña

    // Validar que los campos no estén vacíos
    if (!username.value.trim() || !password.value.trim()) {
        Swal.fire("Error", "Por favor, complete todos los campos.", "error");
        return;
    }

    // Encriptar la contraseña antes de enviarla al servidor
    let contraseñaEncriptada = await encriptarSha256(password.value);
    let frm = new FormData();
    frm.append("nombreUsuario", username.value);
    frm.append("contraseña", contraseñaEncriptada);

    // Enviar los datos al servidor para validar el inicio de sesión
    fetchPost("InicioSecion/Validar", "text",frm, function (res) {
        console.log("Respuesta del servidor:", res);  // 🔍 Ver qué devuelve realmente el backend

        if (res != -1) {
            // Si las credenciales son correctas
            Swal.fire("Bienvenido", "Has iniciado sesión correctamente.", "success").then(() => {
                // Redirigir al usuario a la página principal
                window.location.href = "/Home";
            });
        } else {
            // Si las credenciales son incorrectas
            Swal.fire("Error", "Usuario o contraseña incorrectos.", "error");
        }
    });
}

//----------------MENSAJES DE ICONOS---------------
let userIcon = document.getElementById("userIcon");
let emailIcon = document.getElementById("emailIcon");
let passIcon = document.getElementById("passIcon");
let nameIcon = document.getElementById("nameIcon");
let lastNameIcon = document.getElementById("lastNameIcon");
let telephoneIcon = document.getElementById("telephoneIcon");

userIcon.onclick = function () {

    Swal.fire(`El usuario debe
          # Contener solo letras y números.
          # Tener de 5 a 15 caracteres`);
}
emailIcon.onclick = function () {

    Swal.fire(`El correo electrónico debe ser válido.`);
}
passIcon.onclick = function () {

    Swal.fire(`La contraseña debe:
                #Contener números y letras
                #Tener de 7 a 14 caracteres`);
}
nameIcon.onclick = function () {
    Swal.fire(`El nombre debe:
          # Contener solo letras.
          # Tener entre 2 y 20 caracteres.`);
}

lastNameIcon.onclick = function () {
    Swal.fire(`El apellido debe:
          # Contener solo letras.
          # Tener entre 2 y 20 caracteres.`);
}

telephoneIcon.onclick = function () {
    Swal.fire(`El teléfono debe:
          # Contener solo números.
          # Tener 10 dígitos.`);
}


async function encriptarSha256(texto) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}