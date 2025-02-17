/**
 * renders the whole content of the todo cards
 * @param {Object} todo 
 * @param {string} array 
 * @param {integer} i 
 */
function renderCard(todo, array, i) {
    document.getElementById(todo['status']).innerHTML += /*html*/`
    ${renderCardHtml(todo, array, i)}`
    renderCategory(todo['category'], `category${todo['id']}`);
    renderCardAssignedTo(`assignedBox${todo['id']}`, todo);
    renderProgressbar(todo, todo['id']);
    renderCardPrio(todo['prio'], `cardPrio${todo['id']}`);
}

/**
 * Checks if the todo description is too long, and returns a short version if it is too long
 * @param {string} description 
 * @returns a string that ends with "..." if it is longer then the maxLength.
 */
function renderDescription(description){
    let maxLength = 50;
    if(description.length <= maxLength ){
        return description;
    }else {
        let shortText = description.slice(0, maxLength - 3) + "...";
        return shortText;
    }
}


/**
 * checks the subtask array and renders the progress bar
 * @param {object} todo 
 * @param {integer} id 
 */
function renderProgressbar(todo, id) {
    let subtasks = todo['subtasks']
    let readySubtask = 0
    for (let l = 0; l < subtasks.length; l++) {
        let SbTask = subtasks[l]
        SbTask['done'] ? readySubtask++ : ''
    }
    calculateProgress(subtasks, readySubtask, id, todo);
}

/**
 * caculates the progress and renders the bar
 * @param {array} subtasks 
 * @param {integer} readySubtask 
 * @param {integer} id 
 * @param {object} todo 
 */
function calculateProgress(subtasks, readySubtask, id, todo) {
    let percent = subtasks.length / readySubtask
    result = 100 / percent
    if (subtasks.length > 0) {
        document.getElementById(`progressBar${id}`).innerHTML = /*html*/`
        <progress id="file" max="100" value="${result}"></progress>
        ${readySubtask}/${todo['subtasks'].length} Subtasks`
    }
}

/**
 * renders the accordingly prio to todo cards
 * @param {string} prio 
 * @param {string} id 
 */
function renderCardPrio(prio, id) {
    let img;

    switch (prio) {
        case 'Low':
            img = '<img src="img/prioLow.svg"></img>'
            break;

        case 'Medium':
            img = '<img src="img/prioMid.svg"></img>'
            break;

        case 'Urgent':
            img = '<img src="img/prioUp.svg"></img>'
            break;
        default:
            img = '';
    }
    document.getElementById(id).innerHTML = `${img}`
}

/**
 * renders the contacts which are assigned to the task into the todo cards 
 * @param {string} idOfContainer 
 * @param {string} todo 
 */
function renderCardAssignedTo(idOfContainer, todo) {
    let assigned = todo['assignedTo']
    let remainingContacts = assigned.length - 3
    let id = todo['id']

    if (assigned.length > 3) {
        for (let j = 0; j < 3; j++) {
            const fullname = assigned[j].fullName
            let names = fullname.split(" ")
            let firstNameCharacter = names[0].charAt(0).toUpperCase();
            let avatarId = `avatar${id}pic${j}`
            renderCharacters(names, idOfContainer, avatarId, firstNameCharacter);
            renderCardContacts(fullname, avatarId);
        }
        renderRemainingContacts(idOfContainer, remainingContacts)

    } else {
        for (let i = 0; i < assigned.length; i++) {
            const fullName = assigned[i].fullName
            let names = fullName.split(" ")
            let firstNameCharacter = names[0].charAt(0).toUpperCase();
            let avatarId = `avatar${id}pic${i}`
            renderCharacters(names, idOfContainer, avatarId, firstNameCharacter);
            renderCardContacts(fullName, avatarId);
        }
    }
}

function renderRemainingContacts(idOfContainer, remainingContacts) {
    document.getElementById(idOfContainer).innerHTML += /*html*/`
    <div class="assignedContact">
        <div class="avatar">${remainingContacts}+</div>
    </div>`
}

/**
 * renders the the first characters of the names from the contact to which the task is assigned to into the avatar
 * @param {string} names 
 * @param {string} idOfContainer 
 * @param {string} avatarId 
 * @param {string} firstNameCharacter 
 */
function renderTwoCharacters(names, idOfContainer, avatarId, firstNameCharacter) {

    let secondNameCharacter = names[1].charAt(0).toUpperCase();
    document.getElementById(idOfContainer).innerHTML += /*html*/`
        <div class="assignedContact">
            <div id=${avatarId} class="avatar">${firstNameCharacter}${secondNameCharacter}</div>
        </div>`
}

/**
 * renders the first character of the name from the contact to which is the task assigned to, if the contact only has got one name
 * @param {string} idOfContainer 
 * @param {string} avatarId 
 * @param {string} firstNameCharacter 
 */
function renderOneCharacter(idOfContainer, avatarId, firstNameCharacter) {
    document.getElementById(idOfContainer).innerHTML += /*html*/`
    <div class="assignedContact">
        <div id=${avatarId} class="avatar">${firstNameCharacter}</div>
    </div>`
}

/**
 * checks the length from the "names" array and renders the accordingly function for the contact names
 * @param {string} names 
 * @param {string} idOfContainer 
 * @param {string} avatarId 
 * @param {string} firstNameCharacter 
 */
function renderCharacters(names, idOfContainer, avatarId, firstNameCharacter) {
    if (names.length > 1) {
        renderTwoCharacters(names, idOfContainer, avatarId, firstNameCharacter)
    } else {
        renderOneCharacter(idOfContainer, avatarId, firstNameCharacter)
    }
}