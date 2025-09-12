const API_BASE_URL = 'https://join-backend.jb-webdevelopment.com/api/'
const TASKS_URL = `${API_BASE_URL}tasks/`
const SUBTASKS_URL = `${API_BASE_URL}subtasks/`
const CONTACTS_URL = `${API_BASE_URL}contacts/`
const SUMMARY_URL = `${API_BASE_URL}summary/`
let currentTask_ID = ""

async function setNewTaskAtStorage(task) {
    const payload = task
    const response = await fetch(TASKS_URL,
        {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        })
    let data = await response.json();
    currentTask_ID = data.id;
}

async function editTaskAtStorage(task) {

    task.id = task.backend_id
    delete task.backend_id
    let id = task.id
    task.assigned_to_ids = contactIDs
    const payload = task
    const response = await fetch(`${TASKS_URL}${id}/`,
        {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
}

async function deleteTaskAtStorage(task) {
    task.id = task.backend_id
    delete task.backend_id
    let id = task.id
    const response = await fetch(`${TASKS_URL}${id}/`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
}

async function setNewContactsAtStorage(contact) {
    let stringyfidContact = JSON.stringify(contact)
    const payload = contact
    return fetch(CONTACTS_URL, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
}

async function editContactAtStorage(contact) {
    id = contact.id
    convertStringToNumber = Number(contact.phone)
    contact.phone = convertStringToNumber;
    return fetch(`${CONTACTS_URL}${id}/`,
        {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' }
        })
}

async function deleteContactAtStorage(contact) {

    let id = contact.id

    return fetch(`${CONTACTS_URL}${id}/`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
}

async function setNewSubtaskStorage(subtask) {
    if (subtask.task) {
        subtask.task_id = subtask.task;
        delete subtask.task;
    }
    const subtasksAsString = JSON.stringify(subtask);
    const payload = subtasksAsString
    return fetch(SUBTASKS_URL, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).catch(error => console.error("Fehler beim Speichern der Subtasks:", error));
}

async function PUTSubtaskAtStorage(subtasks) {
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        if (subtask.id) {
            await editSubtaskAtStorage(subtask);
        } else {
            setNewSubtaskStorage(subtask)
        }

    }
}

async function editSubtaskAtStorage(subtask) {
    subtask.task_id = subtask.task;
    delete subtask.task;
    let id = subtask.id;
    const subtasksAsString = JSON.stringify(subtask);
    const payload = subtasksAsString;

    return fetch(`${SUBTASKS_URL}${id}/`, {
        method: 'PUT',
        body: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).catch(error => console.error("Fehler beim Speichern der Subtasks:", error));
}

async function deleteSubtaskAtStorage(subtask) {
    let id = subtask.id;
    return fetch(`${SUBTASKS_URL}${id}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}

async function setTaskIDsAtSubtasks() {
    for (let i = 0; i < subtasksList.length; i++) {
        const subtask = subtasksList[i];
        subtask.task_id = currentTask_ID
        await setNewSubtaskStorage(subtask);
    }

}