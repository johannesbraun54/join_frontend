let urlParams = new URLSearchParams(window.location.search);
let parameterWert = urlParams.get('parameter');

/**
 * Initializes the application by including HTML, loading contacts from storage,
 * initializing the registration process, loading tasks from storage, and rendering
 * the appropriate content based on the URL parameters.
 */
async function init() {
    await includeHTML();
    await loadContactsFromStorage();
    await getSummary();
    initRegister();
    await loadTasksFromStorage();
    if (parameterWert == 'privacyPolicy') {
        renderPrivacyPolicy();
        hideElements();
    } else if (parameterWert == 'legalNotice') {
        renderLegalNotice();
        hideElements();
    } else {
        renderSummary();
        renderInitials();
    }
}

/**
 * checks Status, if user is authenticated
 * @returns 
 */
function checkAuthentication() {
    let token = localStorage.getItem('token');
    let guest = sessionStorage.getItem('guest');
    if (!token && !guest) {
        window.location.href = 'index.html';
        return
    }
}

/**
 * Hides various elements on the page, such as the header, summary, add task button, board, and contacts.
 * Disables the click event on the navigation logo and sets its cursor style to default.
 */
function hideElements() {
    let headerRight = document.getElementById('headerRight');
    let summary = document.getElementById('summary');
    let addTask = document.getElementById('addTask');
    let board = document.getElementById('board');
    let contacts = document.getElementById('contacts');
    let navLogo = document.getElementById('navLogo');
    navLogo.onclick = null;
    navLogo.style.cursor = 'default';
    headerRight.style.display = 'none';
    summary.style.display = 'none';
    addTask.style.display = 'none';
    board.style.display = 'none';
    contacts.style.display = 'none';
}

/**
 * Sets the active state for the navigation item with the given ID and removes the active state from other items.
 * @param {string} activeId - The ID of the navigation item to set as active.
 */
function setActiveNavItem(activeId) {
    const navItems = document.querySelectorAll(".navItem");
    navItems.forEach(item => {
        if (item.id === activeId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

/**
 * Renders a greeting message based on the current time of day and updates HTML elements.
 */
function renderGreetingMessage() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting = "";

    if (currentHour >= 6 && currentHour < 12) {
        greeting = `Good morning`;
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = `Good afternoon`;
    } else if (currentHour >= 17 && currentHour < 21) {
        greeting = `Good evening`;
    } else {
        greeting = "Hello";
    }

    document.getElementById('greetingMessage').innerHTML = greeting;
    document.getElementById('mobileGreetingMessage').innerHTML = greeting;
    getCurrentUserName();
};

/**
 * Renders the user's initials based on the username from the URL parameters.
 */
function renderInitials() {
    let params = new URLSearchParams(window.location.search);
    let username = params.get('username');

    if (username !== null) {
        let names = username.split(" ")
        let firstNameCharacter = names[0].charAt(0)
        if (names.length > 1) {
            renderDoubleInitials(names, firstNameCharacter);
        } else {
            renderSingleinitials(firstNameCharacter);
        }
    }
}

/**
 * Renders double initials based on the given names and the first characters of each name.
 * @param {Array} names - An array containing the first and last names of the user.
 * @param {string} firstNameCharacter - The first character of the user's first name.
 */
function renderDoubleInitials(names, firstNameCharacter) {

    let secondNameCharacter = names[1].charAt(0)
    document.getElementById('initials').innerHTML = `${firstNameCharacter}${secondNameCharacter}`;
}

/**
 * Renders single initials based on the given first name character.
 * @param {string} firstNameCharacter - The first character of the user's first name.
 */
function renderSingleinitials(firstNameCharacter) {
    document.getElementById('initials').innerHTML = `${firstNameCharacter}`;
}

/**
 * Updates the HTML elements with the current user's name based on the username from the URL parameters.
 */
function getCurrentUserName() {
    let username = localStorage.getItem('username');
    document.getElementById('currentUserName').innerHTML = username
    document.getElementById('mobileCurrentUserName').innerHTML = username
}

/**
 * Loads the join summary, redirects to 'index.html' for privacy policy and legal notice,
 * or renders the summary based on the URL parameters.
 */
function loadJoinSummary() {
    if (parameterWert == 'privacyPolicy') {
        window.location.href = 'index.html';
    } else if (parameterWert == 'legalNotice') {
        window.location.href = 'index.html';
    } else {
        renderSummary();
    }
}