if (localStorage.getItem("user") === null) {
    document.querySelector(".register").style.display = "block";
} else {
    document.querySelector(".login").style.display = "block";
}

function register() {
    let newUser = {};

    document.querySelector(".register-username").value.replace(/ /g, '');
    newUser.username = document.querySelector(".register-username").value;
    newUser.password = document.querySelector(".register-password").value;
    let passwordRepeated = document.querySelector(".register-password__repeat").value;

    if (newUser.username.length < 5 || newUser.username.length > 10) {
        document.querySelector(".register-errors").innerHTML = "Username should be between 5 and 10 characters!";
        return;
    }

    if (newUser.password.length < 5 || newUser.password.length > 15) {
        document.querySelector(".register-errors").innerHTML = "Password should be between 5 and 15 characters!";
        return;
    }

    if (newUser.password !== passwordRepeated) {
        document.querySelector(".register-errors").innerHTML = "Passwords do not match!";
        return;
    }

    localStorage.setItem("user", JSON.stringify(newUser));
}

function login(){
    let userInfo = {};
    userInfo.username = document.querySelector(".login-username").value;
    userInfo.password = document.querySelector(".login-password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (userInfo.username!==user.username || userInfo.password!==user.password) {
        document.querySelector(".login-errors").innerHTML = "No such user found!";
        return;
    }

    localStorage.setItem("logged", true);
}