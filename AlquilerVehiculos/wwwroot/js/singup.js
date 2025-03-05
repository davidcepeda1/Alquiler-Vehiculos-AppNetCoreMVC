//---------Eliminar Espacios en Blanco---------
function totxt(e) {
    e = e.value.trim();
    return e;
}
//-----Validaciones--------------------------
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
//----------------MENSAJES DE ICONOS---------------
let userIcon = document.getElementById("userIcon");
let emailIcon = document.getElementById("emailIcon");
let passIcon = document.getElementById("passIcon");
let nameIcon = document.getElementById("nameIcon");
let lastNameIcon = document.getElementById("lastNameIcon");
let telephoneIcon = document.getElementById("telephoneIcon");

userIcon.onclick = function () {

    Swal.fire(`El usuario debe contener solo letras y números, además de tener de 5 a 15 caracteres`);
}
emailIcon.onclick = function () {

    Swal.fire(`El correo electrónico debe ser válido.`);
}
passIcon.onclick = function () {

    Swal.fire(`La contraseña debe contener números y letras de 7 a 14 caracteres`);
}
nameIcon.onclick = function () {
    Swal.fire(`El nombre debe contener solo letras y estar entre 2 y 20 caracteres.`);
}

lastNameIcon.onclick = function () {
    Swal.fire(`El apellido debe contener solo letras y estar entre 2 y 20 caracteres.`);
}

telephoneIcon.onclick = function () {
    Swal.fire(`El teléfono debe contener solo números y tener 10 dígitos.`);
}

/*

                 INICIO DE LA LOGICA DE FUNCIONES

*/

//Funcion para Registrar Usuario
async function Registrar() {
    //--------------Validar que nomas permite en registro--------------
    let usernameRe = /^[A-Za-z0-9]{5,15}$/;
    let emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRe = /^[A-Za-z0-9]{7,14}$/;
    let nameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}$/;
    let lastNameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}$/;
    let telephoneRe = /^09[0-9]{8}$/;

    //-----------------Campos de registro----------------
    let username = document.getElementById("nombreUsuario");
    let email = document.getElementById("email");
    let password = document.getElementById("contraseña");
    let name = document.getElementById("nombre");
    let lastName = document.getElementById("apellido");
    let telephone = document.getElementById("telefono");

    //-----------------Validar campos---------------------
    let passwordCorrect = validation(password, "contraseña", passwordRe);
    let emailCorrect = validation(email, "email", emailRe);
    let usernameCorrect = validation(username, "nombreUsuario", usernameRe);
    let nameCorrect = validation(name, "nombre", nameRe);
    let lastNameCorrect = validation(lastName, "apellido", lastNameRe);
    let telephoneCorrect = validation(telephone, "telefono", telephoneRe);


    //-----------------Validar que todos los campos estén correctos---------------------
    if (usernameCorrect && emailCorrect && passwordCorrect && nameCorrect && lastNameCorrect && telephoneCorrect) {
        // Limpiar los estilos de los campos
        username.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        email.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        password.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        name.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        lastName.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        telephone.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        let contraseñaEncriptada = await encriptarSha256(password.value);  //Encriptar la contraseña

        // Crear un objeto FormData para enviar los datos al servidor
        let frm = new FormData();
        frm.append("nombre", name.value);
        frm.append("apellido", lastName.value);
        frm.append("telefono", telephone.value);
        frm.append("nombreUsuario", username.value);
        frm.append("email", email.value);
        frm.append("contraseña", contraseñaEncriptada);

        // Limpiar los campos
        username.value = "";
        email.value = "";
        password.value = "";
        name.value = "";
        lastName.value = "";
        telephone.value = "";

        // Enviar los datos al servidor para registrar el usuario
        fetchPost("InicioSesion/Registrar", "text", frm, function (res) {
            

            Swal.fire("La cuenta se ha creado con éxito", "La cuenta ha sido creada, por favor inicie sesión", "success");
           
            let chk = document.getElementById("chk");
            chk.checked = true;
            console.log("Usuario agregado");
        });

    } else {
        Swal.fire("Error en el registro", "Por favor, revise los campos ingresados.", "error");
    }
}

//Funcion para Iniciar Sesion
async function ValidarInicioSesion() {
    let username = document.getElementById("nombreUsuario2"); // Campo de nombre de usuario
    let password = document.getElementById("contraseña2"); // Campo de contraseña

    // Validar que los campos no estén vacíos
    if (!username.value.trim() || !password.value.trim()) {
        Swal.fire("Error", "Por favor, complete todos los campos.", "error");
        return;
    }

    let contraseñaEncriptada = await encriptarSha256(password.value); // Encriptar la contraseña

    // Crear un objeto FormData para enviar los datos al servidor
    let frm = new FormData();
    frm.append("nombreUsuario", username.value);
    frm.append("contraseña", contraseñaEncriptada);

    // Enviar los datos al servidor para validar el inicio de sesión
    fetchPost("InicioSesion/Validar", "text", frm, function (res) {
        console.log(res + "respuesta");
        if (res >= 0) {
            // Si las credenciales son correctas
            Swal.fire("Bienvenido", "Has iniciado sesión correctamente.", "success").then(() => {
                // Redirigir al usuario a la página principal
                window.location.href = "/Home";
            });
        } else if ( res == -1) {
            Swal.fire("Bienvenido Administrador", "Has iniciado sesión correctamente.", "success").then(() => {
                // Redirigir al administrador a su página específica
                window.location.href = "/Admin/Admin";
            });
        }
        else {
            // Si las credenciales son incorrectas
            Swal.fire("Error", "Usuario o contraseña incorrectos.", "error");
        }
    });
}

