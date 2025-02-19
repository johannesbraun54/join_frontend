loginFailed = false

/**
 * This function is used to validate the email input
 * @returns error if validation does not succeed
 */
function validateEmail() {
    let emailContainer = document.getElementById("loginMailInputContainer");
    let emailInput = document.getElementById("loginMailInput");
    let email = emailInput.value;
    let emailMsg = document.getElementById("loginMailInputMsg");

    if (!email.includes('@')) {
        emailContainer.style.borderColor = "red";
        emailMsg.style.display = "block";
        return false;
    } else {
        emailContainer.style.borderColor = "";
        emailMsg.style.display = "none";
        return true;
    }
}

/**
 * This function is used to validate the password input
 * @returns error if validation does not succeed
 */
function validatePassword() {
    let passwordContainer = document.getElementById("loginPasswordInputContainer");
    let passwordInput = document.getElementById("loginPasswordInput");
    let password = passwordInput.value;
    let passwordMsg = document.getElementById("loginPasswordInputMsg");

    if (password.length < 3) {
        passwordContainer.style.borderColor = "red";
        passwordMsg.style.display = "block";
        return false;
    } else {
        passwordContainer.style.borderColor = "";
        passwordMsg.style.display = "none";
        return true;
    }
}

/**
 * This function is used to compare email and password
 * @param {string} email - this is the email of the user 
 * @param {string} password - this is the password of the user
 * @returns error if email and password don't match
 */
function checkUser(email, password) {
    let user = users.find(u => u.email === email && u.password === password);
    let passwordContainer = document.getElementById("loginPasswordInputContainer");
    let passwordMsg = document.getElementById("loginPasswordInputMsg");
    let index = users.indexOf(user);
    let currentName = index !== -1 ? users[index]['name'] : null;

    if (user) {
        window.location.href = 'application.html?username=' + encodeURIComponent(currentName);
    } else {
        passwordContainer.style.borderColor = "red";
        passwordMsg.style.display = "block";
        return false;
    }
}
/**
 * This function is used to validate email and password and checks if the user is already signed up
 * @returns error if validation doesn't succeed
 */

function login() {
    let username = document.getElementById("loginMailInput").value;
    let password = document.getElementById("loginPasswordInput").value;
    sendLoginDataToBackend(username, password);
}

async function sendLoginDataToBackend(email, password) {
    let loginData = {
        username: email,
        password: password
    }
    let payload = JSON.stringify(loginData);
    let response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' }
    })

    data = await response.json();
    data.login_successful ? setAuthenticatedUserToLocalStorage(data) : loginFailed = true;
    loginFailed ? document.getElementById("loginPasswordInputMsg").style.display = "block" : ""
}

function setAuthenticatedUserToLocalStorage(user) {
    localStorage.clear()
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('token', user.token);
    window.location.href = 'application.html'
}

/**
 * This function is used to toggle a checkbox for the user to decide, wether to be remembered by the website or not
 */
function toggleCheckBoxRememberMe() {
    let checkedBox = document.getElementById('checkBoxChecked');
    let uncheckedBox = document.getElementById('checkBoxUnchecked');

    if (checkedBox.style.display === "" || checkedBox.style.display === "none") {
        checkedBox.style.display = "block";
        uncheckedBox.style.display = "none";
    } else {
        checkedBox.style.display = "none";
        uncheckedBox.style.display = "block";
    }
}