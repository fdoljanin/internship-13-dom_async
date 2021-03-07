if (localStorage.getItem("user") === null) {
    document.querySelector(".register").style.display = "flex";
} else {
    document.querySelector(".login").style.display = "flex";
}

function register() {
    let newUser = {};

    document.querySelector("input[name='register-username']").value = document.querySelector('input[name="register-username"]').value.replace(/ /g, '');;
    newUser.username = document.querySelector("input[name='register-username']").value;
    newUser.password = document.querySelector("input[name='register-password']").value;
    let passwordRepeated = document.querySelector("input[name='register-password__repeat']").value;

    let errorBox = document.querySelector("#register-errors");
    if (newUser.username.length < 5 || newUser.username.length > 10) {
        errorBox.innerHTML = "Username should be between 5 and 10 characters!";
        return;
    }

    if (newUser.password.length < 5 || newUser.password.length > 15) {
        errorBox.innerHTML = "Password should be between 5 and 15 characters!";
        return;
    }

    if (newUser.password !== passwordRepeated) {
        errorBox.innerHTML = "Passwords do not match!";
        return;
    }

    localStorage.setItem("user", JSON.stringify(newUser));

    location.reload();
}

function login() {
    let userInfo = {};
    userInfo.username = document.querySelector("input[name='login-username']").value;
    userInfo.password = document.querySelector("input[name='login-password']").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (userInfo.username !== user.username || userInfo.password !== user.password) {
        document.querySelector("#login-errors").innerHTML = "No such user found!";
        return;
    }

    localStorage.setItem("logged", true);
    location.replace("jokes.html");
}