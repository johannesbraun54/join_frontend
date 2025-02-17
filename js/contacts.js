let contactsJson = [];
let contactsFirstLetter = [];
let contactPosition = 0;
let contactColorsMap = new Map();

/**
 * This function renders the 'Contacts' page.
 */
function renderContacts() {
    let content = document.getElementById('content');
    content.innerHTML = tempRenderContactContent();
    getFirstLetter();
    fillContactListHeader();
    content.innerHTML += tempAddContactForm('contacts');
    content.innerHTML += tempEditForm();
    setActiveNavItem("contacts");
}

/**
 * This function opens the responsive edit and delete section
 */
function openEditDeleteResponsive() {
    let responsiveEditDelete = document.getElementById('responsiveEditDelete');
    let contactButton = document.getElementById('contactButton');
    responsiveEditDelete.style.display = 'block';
    contactButton.style.display = 'flex';
}

/**
 * Event listener that handles click events to close responsive sections.
 */
document.addEventListener('click', function(event) {
    let responsiveEditDelete = document.getElementById('responsiveEditDelete');
    let threeDots = document.getElementById('threeDots');
    let contactButton = document.getElementById('contactButton');
    if (responsiveEditDelete && threeDots && contactButton) {
        if (!responsiveEditDelete.contains(event.target) && event.target !== threeDots && event.target !== threeDots.querySelector('img')) {
            responsiveEditDelete.style.display = 'none';
            contactButton.style.display = 'none';
        }
    }
});

/**
 * This function displays the form to add a new contact.
 */
function addNewContact() {
    document.getElementById('addNewContactForm').style.display = "flex";
    setTimeout(() => {
        document.getElementById('addNewContactForm').style.transform = 'translate(0%, 0%)';
    },50)
}

/**
 * Closes the popup form for adding or editing a contact.
 */
function closePopup() {
    //addNewContactForm
    let form = document.getElementById('addNewContactForm');
    let formEdit = document.getElementById('editForm');
    document.getElementById('addNewContactForm').style.transform = 'translate(220%, 0%)';
        if (formEdit) {
            formEdit.style.transform = 'translate(220%, 0%)';
            setTimeout(() => {
                formEdit.style.display = "none";
            },100);
    }
    setTimeout(() => {
        form.style.display = "none";
    }, 100);
    resetInputFields();
}

/**
 * This function prevents the propagation of the provided event.
 * 
 * @param {Event} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * This function is an onclick event handler for a contact. It opens a form that retrieves the contact's information for editing purposes.
 * 
 * @param {int} i - Represents the position ID of the clicked contact.
 */
function renderEditForm(i) {
    contactPosition = i;
    document.getElementById('editForm').style.display = "flex"
    setTimeout(() => {
        document.getElementById('editForm').style.transform = 'translate(0%, 0%)';
    },50)
    let inputNameEdit = document.getElementById('inputNameEdit');
    let inputEmailEdit = document.getElementById('inputEmailEdit');
    let inputPhoneEdit = document.getElementById('inputPhoneEdit');
    let formProfile = document.getElementById('formProfile');
    let contactListImg = document.getElementById(`contactInListImg${i}`);
    formProfile.innerHTML = getInitials(i);
    formProfile.style.backgroundColor = contactListImg.style.backgroundColor;
    inputNameEdit.value = contactsJson[i].fullName;
    inputEmailEdit.value = contactsJson[i].email;
    inputPhoneEdit.value = contactsJson[i].phone;
}

/**
 * This function is used to save the edited contact.
 */
function saveEdit() {
    let inputNameEdit = document.getElementById('inputNameEdit').value;
    let inputEmailEdit = document.getElementById('inputEmailEdit').value;
    let inputPhoneEdit = document.getElementById('inputPhoneEdit').value;
    contactsJson[contactPosition].fullName = inputNameEdit;
    contactsJson[contactPosition].email = inputEmailEdit;
    contactsJson[contactPosition].phone = inputPhoneEdit;
    getFirstLetter();
    editContactAtStorage(contactsJson[contactPosition])
    renderContacts();
    setActualContact(contactPosition);
    closePopup();
}

/**
 * This function retrieves the first letter of each contact's full name and populates an array.
 */
function getFirstLetter() {
    contactsFirstLetter = [];
    for (let i = 0; i < contactsJson.length; i++) {
        if (contactsFirstLetter.indexOf(contactsJson[i].fullName.charAt(0).toUpperCase()) == -1) {
            contactsFirstLetter.push(contactsJson[i].fullName.charAt(0).toUpperCase());
            contactsFirstLetter.sort();
        }
    }
}

/**
 * This function fills the contact list header based on available first letters of contacts.
 */
function fillContactListHeader() {
    let contactsList = document.getElementById('contactsList');
    for (let i = 0; i < contactsFirstLetter.length; i++) {
        contactsList.innerHTML += tempRenderContactsList(i);
        fillContactWithHeader(contactsFirstLetter[i]);
    }
}

/**
 * This function fills the contacts under the specified header with contacts sharing the initial letter.
 * 
 * @param {int} i - the index indicating the header
 */
function fillContactWithHeader(i) {
    let contactsUnderHeader = document.getElementById(`contactsUnderHeader${i}`);
    for (let i = 0; i < contactsJson.length; i++) {
        if (contactsUnderHeader.id.slice(-1) == contactsJson[i].fullName.charAt(0).toUpperCase()) {
            contactsUnderHeader.innerHTML += tempRenderContactsUnderHeader(i);
            setContactListImgColor(i);
        }
    }
}

/**
 * This function retrieves the initials of a contact's full name.
 * 
 * @param {int} i - The index of the contact in the contacts array 
 * @returns - The initials of the contact's full name
 */
function getInitials(i) {
    if (contactsJson[i].fullName.split(' ').length > 1) {
        return contactsJson[i].fullName.split(' ')[0].charAt(0).toUpperCase() + contactsJson[i].fullName.split(' ')[1].charAt(0).toUpperCase();
    } else {
        return contactsJson[i].fullName.split(' ')[0].charAt(0).toUpperCase();
    }
}

/**
 * This function sets the Background Image color for each Contact. Using Mapping for temporary matchin contact with a color.
 * 
 * @param {int} - Contact Position 
 */
function setContactListImgColor(i) {
    const color = ["#ff7a00", "#ff5eb3", "#6e52ff", "#9327ff", "#00bee8", "#1fd7c1", "#ff745e", "#ffa35e", "#fc71ff", "#ffc701", "#0038ff", "#c3ff2b", "#ffe62b", "#ff4646", "#ffbb2b"];
    let id = i;
    i = i % color.length;
    const contactColor = color[i];
    let imgColor = document.getElementById(`contactInListImg${id}`);
    imgColor.style.backgroundColor = contactColor;
    contactColorsMap.set(contactsJson[i].fullName, contactColor);
}

/**
 * This function displays the contact information section to the right of the contact list.
 * 
 * @param {int} i - Contact Position 
 */
function renderContactInfoSection(i) {
    let infoSectionContact = document.getElementById('infoSectionContact');
    let imgColor = document.getElementById(`contactInListImg${i}`);
    infoSectionContact.innerHTML = tempRenderContact(i, imgColor);
    let contactSection = document.getElementById('contactSection');
    let contactSectionRight = document.getElementById('contactSectionRight');
    if (window.innerWidth <= 1050) {
        contactSection.style.display = 'none';
        contactSectionRight.style.display = 'block';
    }
}

/**
 * This function navigates back to the contacts section by displaying it and hiding the right section.
 */
function backToContacts() {
    let contactSection = document.getElementById('contactSection');
    let contactSectionRight = document.getElementById('contactSectionRight');
    contactSection.style.display = 'block';
    contactSectionRight.style.display = 'none';
}

let activeElement = false;
/**
 * This function modifies the background of an active contact in the list.
 * 
 * @param {HTML element} element - Contact in List
*/
function setActiveBackgroundColor(element) {
    if (activeElement === element) {
        element.style.backgroundColor = '';
        element.classList.add('contactInListHover');
        element.children[1].children[0].style.color = '';
        activeElement = false;
    } else {
        if (activeElement) {
            activeElement.style.backgroundColor = '';
            activeElement.classList.add('contactInListHover');
            activeElement.children[1].children[0].style.color = '';
        }
    }
    element.style.backgroundColor = "#2A3647";
    element.classList.remove('contactInListHover');
    element.children[1].children[0].style.color = "#fff";
    activeElement = element;
}

/**
 * This function opens the "Create Contact" form on the current page.
 * 
 * @param {String} page - Located Page Name
 */
async function createContact(page) {
    const inputName = document.getElementById('inputName').value;
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPhone = document.getElementById('inputPhone').value;
    const newContact = { fullName: inputName, email: inputEmail, phone: inputPhone };
    contactsJson.push(newContact)
    await setNewContactsAtStorage(newContact);
    await loadContactsFromStorage()
    if (page.innerText == 'AddTask') {
        renderDropDownContacts();
        document.getElementById(`contactInListImg${contactsJson.length - 1}`).scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (page.innerText == 'Contacts') {
        renderContacts();
        const lastIndex = contactsJson.length - 1;
        setActualContact(lastIndex);
    }
    closePopup();
}

/**
 * This function resets the input fields by clearing their values.
 */
function resetInputFields() {
    inputName.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
}

/**
 * This function deletes a contact from the contacts array based on the provided index.
 * Updates the contacts storage and re-renders the contacts.
 *
 *  @param {int} i - the index of the contact to be deleted
 */
async function deleteContact(i) {
    await deleteContactAtStorage(contactsJson[i])
    contactsJson.splice(i, 1);
    renderContacts();
}

/**
 * This function deletes a contact from the contacts array using the stored contact position.
 * Updates the contacts storage, closes the popup, and re-renders the contacts.
 */
async function deleteContactInForm() {
    await deleteContactAtStorage(contactsJson[contactPosition])
    contactsJson.splice(contactPosition, 1);
    closePopup();
    renderContacts();
}

/**
 * This function shows a new Created Contact and Scroll in List to the Position
 * 
 * @param {int} position  - contact Positon
 */
function setActualContact(position) {
    document.getElementById('infoSectionContact').innerHTML = tempRenderContact(position, document.getElementById(`contactInListImg${position}`));
    setActiveBackgroundColor(document.getElementById(`contactInList${position}`));
    document.getElementById(`contactInList${position}`).scrollIntoView({ behavior: "smooth", block: "center" });
}

/**
 * This function loads contacts from storage asynchronously and updates the contacts array.
 */
async function loadContactsFromStorage() {
    contactsJson = await getItem('contacts');
}

/**
 * This funciton validates input by removing unwanted characters and leading spaces.
 * 
 * @param {HTMLInputElement} input - the input element to validate.
 */
function validateInputChars(input) {
    input.value = input.value.replace(/[^a-zA-ZäöüÄÖÜ\s]+/g, '');
    input.value = input.value.replace(/^[\s]+/, '');
}

/**
 * This function validates input by allowing only numbers and removing leading spaces.
 * 
 * @param {HTMLInputElement} input - the input element to validate.
 */
function validateInputNumbers(input) {
    input.value = input.value.replace(/[^0-9\s]+/g, '');
    input.value = input.value.replace(/^[\s]+/, '');
}