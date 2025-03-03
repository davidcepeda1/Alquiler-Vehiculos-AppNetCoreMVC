let dataPro = [];
if (localStorage.User != null) {
    dataPro = JSON.parse(localStorage.User);
} else {

    let admin = {
        Username: "admin",
        Email: "admin@gmail.com",
        Password: "admin142021",
    };
    dataPro.push(admin);
    localStorage.setItem("User", JSON.stringify(dataPro))
}

function totxt(e) {
    e = e.value.trim();
    return e;
}

function validation(input, inputName, re, label) {

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
        if (totxt(input).length < less || totxt(input).length > more) {
            Swal.fire("Error", `El ${inputName} Debe debe tener más que ${less} y menos que ${more}.`, "error");

        } else {
            content()
        }
    }

    function empty() {
        Swal.fire("Error", `No debes dejar  ${inputName} en blanco .`, "error");

    }
    function incorrect() {
        Swal.fire("Error", `El  ${inputName} es incorrecto.`, "error");
    }

    if (re.test(totxt(input))) {
        if (inputName == "username") {

            for (let i = 0; i < dataPro.length; i++) {

                if (dataPro[i].Username == totxt(username)) {

                    Swal.fire("Error", "La cuenta ya ha sido creada, por favor elija otra", "error");

                    Rfalse();
                    return false;

                } else {

                    if (dataPro.length - i == 1) {

                        Rtrue();
                        return true;
                    }
                }
            }
        } else {

            Rtrue();
            return true;
        }
    } else {
        if (totxt(input) == "") {
            empty();
        } else {

            if (inputName == "username") {
                number(5, 15)
            } else if (inputName == "password") {
                number(7, 14)
            } else {
                if (inputName == "email") {
                    incorrect()
                } else {
                    content()
                }
            }
        }

        Rfalse();
        return false
    }
}

function check() {
    let usernameRe = /^[A-Za-z0-9]{5,15}$/;
    let emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRe = /^[A-Za-z0-9]{7,14}$/;
    let nameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}$/;  
    let lastNameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,20}$/;
    let telephoneRe = /^[0-9]{10}$/;

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let name = document.getElementById("name");
    let lastName = document.getElementById("lastName");
    let telephone = document.getElementById("telephone");

    let button = document.getElementById("button");
    let usernameLabel = document.getElementById("usernameLabel");
    let emailLabel = document.getElementById("emailLabel");
    let passwordLabel = document.getElementById("passwordLabel");
    let nameLabel = document.getElementById("nameLabel");
    let lastNameLabel = document.getElementById("lastNameLabel");
    let telephoneLabel = document.getElementById("telephoneLabel");


    let passwordCorrect = validation(password, "password", passwordRe);
    let emailCorrect = validation(email, "email", emailRe);
    let usernameCorrect = validation(username, "username", usernameRe);
    let nameCorrect = validation(name, "name", nameRe);
    let lastNameCorrect = validation(lastName, "lastName", lastNameRe);
    let telephoneCorrect = validation(telephone, "telephone", telephoneRe);

    console.log(usernameCorrect);
    console.log(emailCorrect);
    console.log(passwordCorrect);
    console.log("###########");

    if (usernameCorrect && emailCorrect && passwordCorrect && nameCorrect && lastNameCorrect && telephoneCorrect) {
        let newUser = {
            Username: totxt(username),
            Email: totxt(email),
            Password: totxt(password),
            Name: totxt(name),
            LastName: totxt(lastName),
            Telephone: totxt(telephone),
        };

        dataPro.push(newUser);
        localStorage.setItem("User", JSON.stringify(dataPro));

        // Limpiar los campos
        username.value = "";
        email.value = "";
        password.value = "";
        name.value = "";
        lastName.value = "";
        telephone.value = "";

        username.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        email.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        password.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        name.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        lastName.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";
        telephone.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        Swal.fire("La cuenta se ha creado con éxito", "La cuenta ha sido creada, por favor inicie sesión", "success");

        let chk = document.getElementById("chk");
        chk.checked = true;
        console.log("Usuario agregado");
    } else {
        Swal.fire("Error en el registro", "Por favor, revise los campos ingresados.", "error");
    }
}

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

function login() {
    let username = document.getElementById("username2");

    let password = document.getElementById("password2");
    let button = document.getElementById("button2");


    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].Username == totxt(username)) {
            if (dataPro[i].Password == totxt(password)) {
                Swal.fire("Inicio de Sesion exitoso", "", "success");
            } else {
                Swal.fire("Contraseña Incorrecta", "Por favor revise su contraseña", "error");
                break;
            }
        } else {
            if (dataPro.length - i == 1) {
                Swal.fire("Inicio de Sesion fallida", "No podemos encontrar su nombre de Usuario", "error","easdsad");
            }
        }
    }
}
