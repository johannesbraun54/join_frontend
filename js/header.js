/**
 * This function is used to open/close the drop down menu onclick of the initials div element
 */
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

/**
 * This function is used to close the drop down menu onclick anywhere outside the menu
 */
function closeDropdown(event) {
    let dropdown = document.getElementById("dropdown");
    let initials = document.getElementById("initials");

    if (event.target !== dropdown && event.target !== initials) {
        dropdown.style.display = "none";
    }
}