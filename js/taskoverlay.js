/**
 * renders the whole taskoverlay 
 * @param {integer} idFromTask 
 */
function renderBoardTaskOverlay(idFromTask) {
    taskoverlay_window_clicked = true;
    let actuellyTask = allTasks[idFromTask]
    document.getElementById('dialogShowCard').innerHTML =  /*html*/ `${renderTaskOverlayHtml(idFromTask, actuellyTask)}`
    renderSubtasks(idFromTask);
    renderCategory(actuellyTask['category'], `ctgry${idFromTask}`);
    renderAssignedTo(idFromTask, 'assignedUser');
    renderPrio(actuellyTask['prio'], `prio${idFromTask}`, actuellyTask);
}

/**
 * renders the contacts which are assigned to the task into the taskoverlay 
 * @param {integer} idFromTask 
 * @param {string} idOfContainer 
 */
function renderAssignedTo(idFromTask, idOfContainer) {

    let assigned = allTasks[idFromTask]['assignedTo']

    if (assigned) {
        for (let j = 0; j < assigned.length; j++) {
            const fullname = assigned[j].fullName
            let names = fullname.split(" ")
            let firstNameCharacter = names[0].charAt(0)
            if (names.length > 1) {
                renderDoubleName(names, idOfContainer, j, firstNameCharacter, fullname)
            } else {
                renderSingleName(idOfContainer, j, firstNameCharacter, fullname)
            }
            //renderCardContacts(fullname, `assignedContact${j}`);
        }
    }
}

/**
 * renders the name of the contact to which the task is assigned, if the contact has got two names
 * @param {array} names 
 * @param {string} idOfContainer 
 * @param {integer} j 
 * @param {string} firstNameCharacter 
 * @param {string} fullname 
 */
function renderDoubleName(names, idOfContainer, j, firstNameCharacter, fullname) {
    let secondNameCharacter = names[1].charAt(0)
    document.getElementById(idOfContainer).innerHTML += /*html*/`
    <div class="assignedContact">
        <div id="assignedContact${j}" class="avatar">${firstNameCharacter}${secondNameCharacter}</div>${fullname} 
    </div>`
    renderCardContacts(fullname, `assignedContact${j}`);
}

/**
 *  renders the name of the contact to which the task is assigned, if the contact has got only one names
 * @param {string} idOfContainer 
 * @param {integer} j 
 * @param {string} firstNameCharacter 
 * @param {string} fullname 
 */
function renderSingleName(idOfContainer, j, firstNameCharacter, fullname) {
    document.getElementById(idOfContainer).innerHTML += /*html*/ `
            <div class="assignedContact">
                <div id="assignedContact${j}" class="avatar">${firstNameCharacter}</div><span>${fullname}</span> 
            </div>`
    renderCardContacts(fullname, `assignedContact${j}`);
}

/**
 * renders the current subtaks into the taskoverlay
 * @param {integer} idFromTask 
 */
function renderSubtasks(idFromTask) {
    let subtasks = allTasks[idFromTask]['subtasks']
    let id = idFromTask;

    renderSubtaskArray(subtasks, id)
}

/**
 * renders the Subtaskarray from the current task
 * @param {Array} subtasks 
 * @param {integer} id 
 */
function renderSubtaskArray(subtasks, id) {
    if (subtasks.length == 0) {
        document.getElementById(`subHeadline${id}`).classList.add('d-none')
    }
    else {
        for (let k = 0; k < subtasks.length; k++) {
            const subtask = subtasks[k];

            if (subtask['done'] == false) {
                renderNotCheckedSubtask(id, k, subtask)
            }
            else {
                renderCheckedSubtask(id, k, subtask)
            }
        }
    }
}

/**
 * if the subtask isn't checked, the right img will be renderd 
 * @param {integer} id 
 * @param {integer} k 
 * @param {array} subtask 
 */
function renderNotCheckedSubtask(id, k, subtask) {
    document.getElementById(`subtask${id}`).innerHTML += /*html*/` 
    <div id="box${id, k}" class="subConti">
        <div class="checkBg">
            <img onclick="checkBox(${id},${k})" class="notChecked" src="img/checkButton.svg">
        </div>
        ${subtask['name']}
    </div>`
}

/**
 * renders the accordingly img if the subtask is checked
 * @param {integer} id 
 * @param {integer} k 
 * @param {array} subtask 
 */
function renderCheckedSubtask(id, k, subtask) {
    document.getElementById(`subtask${id}`).innerHTML += /*html*/` 
    <div id="box${id, k}" class="subConti">
        <div class="checkBg"><img onclick="checkBox(${id},${k})" src="img/boxChecked.svg"></div>
        ${subtask['name']}
    </div>`
}

/**
 * renders the accordingly prio to the tasks
 * @param {string} prio
 * @param {string} id 
 * @param {Object} actuellyTask 
 */
function renderPrio(prio, id, actuellyTask) {

    let img;
    let string;

    switch (prio) {
        case 'Low':
            string = actuellyTask['prio'];
            img = '<img src="img/prioLow.svg"></img>'
            break;

        case 'Medium':
            string = actuellyTask['prio'];
            img = '<img src="img/prioMid.svg"></img>'
            break;

        case 'Urgent':
            string = actuellyTask['prio'];
            img = '<img src="img/prioUp.svg"></img>'
            break;
        default:
            string = 'No Priority Set';
            img = '';
    }
    document.getElementById(id).innerHTML = `${string} ${img}`
}

/**
 * onlick the clicked checkbox changes its boolean and renders the accordingly checked box
 * @param {integer} id 
 * @param {integer} k 
 */
function checkBox(id, k) {

    let subtask = allTasks[id]['subtasks'][k]

    subtask['done'] = !subtask['done']
    changeBox(subtask, id, k);
    updateBoardHtml();
}

/**
 * gets the status of the checkbox from the task array and renders the accordingly checkbox
 * @param {Object} subtask 
 * @param {integer} id 
 * @param {integer} k 
 */
function changeBox(subtask, id, k) {

    if (subtask['done']) {
        document.getElementById(`box${id, k}`).innerHTML = /*html*/ `
        <div class="checkBg">
            <img onclick="checkBox(${id},${k})" src="img/boxChecked.svg">
        </div>
        ${subtask['name']}`
    } else {
        document.getElementById(`box${id, k}`).innerHTML = /*html*/ `
            <div class="checkBg">
                <img class="notChecked" onclick="checkBox(${id},${k})" src="img/checkButton.svg">
            </div>    
            ${subtask['name']} `
    }
    updateBoardHtml();
}

/**
 * renders the form of edit with "x" and "OK"-Button
 * @param {integer} idFromTask 
 * @returns 
 */

function renderEditContainer(idFromTask) {
    return /*html*/ `
     <div class="headerEditForm">
        <img onclick="closeDialog('dialogShowCard','taskOverlay')" class="editCard" src="img/close.svg">    
    </div>
    
    <div id="editTemplate" class="editTemplate">
        ${tempRenderAddTask()}
    </div>
    
    <div onclick="closeEditContent(${idFromTask})" class="editSubmitButton">
        <div class="buttonFilled saveEditButton">
            Ok <img src="./img/check-white.svg">
        <div>
    </div>`
}

/**
 * renders the complete edit container
 * @param {integer} idFromTask 
 */
function renderBoardEditForm(idFromTask) {
    let taskOverlay = document.getElementById('taskOverlay');
    let tempRenderAddTaskDivEdit = document.createElement('div');

    tempRenderAddTaskDivEdit.innerHTML = renderEditContainer(idFromTask);
    tempRenderAddTaskDivEdit.id = 'tempRenderAddTaskDivEdit';
    taskOverlay.replaceChildren(tempRenderAddTaskDivEdit);
    renderEditContent(idFromTask);
    // renderAssignedToEditBoard(idFromTask);
}

/**
 * renders the content to edit
 * @param {integer} idFromTask 
 */

function renderEditContent(idFromTask) {

    selectedContacts = [];
    selectedCompleteContacts = [];
    let actuellyTask = allTasks[idFromTask]
    let editPrio = actuellyTask['prio']
    document.getElementById('addTaskInputTitle').value = `${actuellyTask['title']}`
    document.getElementById('addTaskTextArea').value = `${actuellyTask['description']}`
    document.getElementById('selectTaskCategorySpan').innerText = `${actuellyTask['category']}`
    document.getElementById('addTaskDate').value = `${actuellyTask['dueDate']}`
    renderAssignedToEditBoard(idFromTask);
    renderEditPrio(editPrio, idFromTask);
    renderEditSubtasksInTask(actuellyTask, idFromTask);
}

/**
 * closes the edit option and renders the taskoverlay
 * @param {integer} idFromTask 
 */
async function closeEditContent(idFromTask) {
    await saveEditChanges(idFromTask);
    await loadTasksFromStorage();
    openDialog('dialogShowCard', 'taskOverlay');
    renderBoardTaskOverlay(idFromTask);
}

/**
 * saves the changes that are done into the edit form
 * @param {integer} idFromTask 
 */
async function saveEditChanges(idFromTask) {
    let actuellyTask = allTasks[idFromTask]
    actuellyTask['title'] = document.getElementById('addTaskInputTitle').value
    actuellyTask['description'] = document.getElementById('addTaskTextArea').value
    actuellyTask['dueDate'] = document.getElementById('addTaskDate').value
    actuellyTask['category'] = document.getElementById('selectTaskCategorySpan').innerText
    actuellyTask['prio'] = prioLabel;
    pushEditAssignedTo(idFromTask);
    await editTaskAtStorage(actuellyTask);
    await pushEditSubtasks(idFromTask);
}

/**
 * redners the assignedto-contacts into the edit board
 * @param {integer} idFromTask 
 */
function renderAssignedToEditBoard(idFromTask) {

    let assignedTo = allTasks[idFromTask]['assignedTo']

    for (let i = 0; i < assignedTo.length; i++) {

        const contact = assignedTo[i]
        const contactName = assignedTo[i].fullName

        selectedCompleteContacts.push(contact)      // includes the complete contact data
        selectedContacts.push(contactName) // includes only the names of contacts



    }
    renderAssignedToImages();
}

/**
 * pushs the assignedto conatcs into the array from add task, so that they're work with the same array
 * @param {integer} idFromTask 
 */
async function pushEditAssignedTo(idFromTask) {

    let assignedTo = allTasks[idFromTask]['assignedTo']

    assignedTo = [];
    let assigned_to_ids = [];

    for (let i = 0; i < selectedCompleteContacts.length; i++) {
        const contact = selectedCompleteContacts[i];

        assignedTo.push(contact)
        assigned_to_ids.push(contact['id'])
    }
    allTasks[idFromTask]['assignedTo'] = assignedTo
    allTasks[idFromTask]['assigned_to_ids'] = assigned_to_ids
}

/**
 * renders the choosen prio into the edit form
 * @param {string} prio 
 */
function renderEditPrio(prio) {
    switch (prio) {
        case 'Urgent':
            prioLabel = 'Urgent'
            changePrioColor(editPrioUrgent, '#FF3D00')
            break;

        case 'Medium':
            prioLabel = 'Medium'
            changePrioColor(editPrioMediun, '#FFA800')
            break;

        case 'Low':
            prioLabel = 'Low'
            changePrioColor(editPrioLow, '#7AE229')
            break;
    }
}

/**
 * renders the current subtasks into the edit form
 * @param {object} actuellyTask 
 */
function renderEditSubtasksInTask(actuellyTask) {
    let subtasks = actuellyTask['subtasks']
    subtasksList = [];
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i]
        subtasksList.push(subtask)
    }

    renderSubtasksInTask();
}

/**
* pushs the current subtasks into the same array from add task, so that they're work with the same array
 * @param {integer} idFromTask 
 */
async function pushEditSubtasks(idFromTask) {

    let subtasks = allTasks[idFromTask]['subtasks']
    let actuallyTask = allTasks[idFromTask];
    subtasks = [];

    for (let i = 0; i < subtasksList.length; i++) {
        const subtask = subtasksList[i];
        subtask.task = actuallyTask.id
        subtasks.push(subtask)
    }

    subtasksList = [];
    allTasks[idFromTask]['subtasks'] = subtasks;
    await PUTSubtaskAtStorage(subtasks)
}




