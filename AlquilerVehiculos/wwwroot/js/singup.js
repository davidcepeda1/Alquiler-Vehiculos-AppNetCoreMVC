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
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let button = document.getElementById("button");
    let usernameLabel = document.getElementById("usernameLabel");
    let emailLabel = document.getElementById("emailLabel");
    let passwordLabel = document.getElementById("passwordLabel");

    let passwordCorrect = validation(password, "password", passwordRe);
    let emailCorrect = validation(email, "email", emailRe);
    let usernameCorrect = validation(username, "username", usernameRe);
    console.log(usernameCorrect);
    console.log(emailCorrect);
    console.log(passwordCorrect);
    console.log("###########");

    if (usernameCorrect == true && emailCorrect == true && passwordCorrect == true) {
        let newUser = {
            Username: totxt(username),
            Email: totxt(email),
            Password: totxt(password),
        };
        dataPro.push(newUser);
        localStorage.setItem("User", JSON.stringify(dataPro))


        username.value = "";
        email.value = "";
        password.value = "";

        username.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        email.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        password.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        Swal.fire("La cuenta se ha creado con éxito", "La cuenta ha sido creada, por favor inicie sesión", "éxito");

        let chk = document.getElementById("chk");
        chk.checked = true;
        console.log("added")
    }
}

let userIcon = document.getElementById("userIcon");
let emailIcon = document.getElementById("emailIcon");
let passIcon = document.getElementById("passIcon");

userIcon.onclick = function () {

    Swal.fire(`El usuario debe
          # Contener solo letras y números.
          # Tener de 5 a 15 caracteres`);
}
emailIcon.onclick = function () {

    Swal.fire(`El correo electrónico debe ser válido.`);
}
passIcon.onclick = function () {

    Swal.fire(`La contraseña no olvidarse y debe
                #Contener números y letras
                #Tener de 7 a 14 caracteres`);
}

function login() {
    let username = document.getElementById("username2");

    let password = document.getElementById("password2");
    let button = document.getElementById("button2");


    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].Username == totxt(username)) {
            if (dataPro[i].Password == totxt(password)) {
                Swal.fire("Inicio de Secion exitoso", "", "success");
            } else {
                Swal.fire("Contraseña Incorrecta", "Por favor revise su contraseña", "error");
                break;
            }
        } else {
            if (dataPro.length - i == 1) {
                Swal.fire("Inicio de Secion fallida", "No podemos encontrar su nombre de Usuario", "error","easdsad");
            }
        }
    }
}

<<<<<<< HEAD
Swal.fire({
  title: '¡Alerta!',
  text: 'Este es un mensaje de alerta.',
  icon: 'warning',
  confirmButtonText: 'OK',
  confirmButtonColor: '#FF5733'  // Cambia el color del botón a naranja
});
=======
>>>>>>> 93744c76ce29b2f98b6047bf292d0f25e99d9155
