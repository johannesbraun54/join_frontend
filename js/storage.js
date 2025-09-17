let currentTask_ID = "";

/**
 * Fetches the summary from the backend.
 * @returns {Promise<Object>} - JSON object containing the summary
 * @throws {Error} - if the fetch request fails
 */
async function loadSummaryFromStorage() {
    const response = await fetch(SUMMARY_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error(`Error fetching summary: ${response.status}`);
    }

    summary = await response.json();
    return summary;
}

/**
 * Sends a new task to the backend.
 * @param {Object} task - The task object to be stored
 * @returns {Promise<void>}
 */
async function setNewTaskAtStorage(task) {
    const payload = task;
    const response = await fetch(TASKS_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    });
    let data = await response.json();
    currentTask_ID = data.id; // store the id of the newly created task
}

/**
 * Fetches all tasks from the backend.
 * @returns {Promise<Array>} - Array of all tasks
 * @throws {Error} - if the fetch request fails
 */
async function loadTasksFromStorage() {
    const response = await fetch(TASKS_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error(`Error fetching tasks: ${response.status}`);
    }

    allTasks = await response.json();
    generateIDs(); // presumably generates IDs for internal use
    return allTasks;
}

/**
 * Updates an existing task in the backend.
 * @param {Object} task - Task object containing updated information
 * @returns {Promise<void>}
 */
async function editTaskAtStorage(task) {
    task.id = task.backend_id;
    delete task.backend_id;
    let id = task.id;

    task.assigned_to_ids = getIDsFromAssignedTo(task.assignedTo);
    const payload = task;

    await fetch(`${TASKS_URL}${id}/`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}

/**
 * Gets contact ids from an array of assigned contacts and pushs them into an array, which stores their IDs.
 * @param {Array} assignedTo - Array of contact objects
 * @returns {Array} - Array of contact IDs
 */
function getIDsFromAssignedTo(assignedTo){
    let contact_ids = [];

    for (let i = 0; i < assignedTo.length; i++) {
        const contact = assignedTo[i];
        contact_ids.push(contact['id']); 
    }

    return contact_ids;
}

/**
 * Deletes a task from the backend.
 * @param {Object} task - Task object to be deleted
 * @returns {Promise<void>}
 */
async function deleteTaskAtStorage(task) {
    task.id = task.backend_id;
    delete task.backend_id;
    let id = task.id;

    await fetch(`${TASKS_URL}${id}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Sends a new contact to the backend.
 * @param {Object} contact - Contact object to be created
 * @returns {Promise<Object>} - JSON response of the created contact
 */
async function setNewContactsAtStorage(contact) {
    const payload = contact;
    return fetch(CONTACTS_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}

/**
 * Fetches all contacts from the backend.
 * @returns {Promise<Array>} - Array of contacts
 * @throws {Error} - if the fetch request fails
 */
async function loadContactsFromStorage() {
    const response = await fetch(CONTACTS_URL, {        
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });

    if (!response.ok) {
        throw new Error(`Error fetching contacts: ${response.status}`);
    }

    contactsJson = await response.json();
    return contactsJson;
}

/**
 * Updates an existing contact in the backend.
 * @param {Object} contact - Contact object with updated data
 * @returns {Promise<Response>}
 */
async function editContactAtStorage(contact) {
    let id = contact.id;
    contact.phone = Number(contact.phone); // convert phone string to number
    return fetch(`${CONTACTS_URL}${id}/`, {
        method: 'PUT',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Deletes a contact from the backend.
 * @param {Object} contact - Contact object to delete
 * @returns {Promise<Response>}
 */
async function deleteContactAtStorage(contact) {
    let id = contact.id;
    return fetch(`${CONTACTS_URL}${id}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Creates a new subtask in the backend.
 * @param {Object} subtask - Subtask object to be created
 * @returns {Promise<Object>} - JSON response of the created subtask
 */
async function setNewSubtaskStorage(subtask) {
    if (subtask.task) {
        subtask.task_id = subtask.task;
        delete subtask.task;
    }
    const payload = JSON.stringify(subtask);
    return fetch(SUBTASKS_URL, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .catch(error => console.error("Error saving subtask:", error));
}

/**
 * Updates or creates multiple subtasks in the backend.
 * @param {Array} subtasks - Array of subtask objects
 */
async function PUTSubtaskAtStorage(subtasks) {
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        if (subtask.id) {
            await editSubtaskAtStorage(subtask);
        } else {
            await setNewSubtaskStorage(subtask);
        }
    }
}

/**
 * Updates an existing subtask in the backend.
 * @param {Object} subtask - Subtask object with updated data
 * @returns {Promise<Object>} - JSON response of updated subtask
 */
async function editSubtaskAtStorage(subtask) {
    subtask.task_id = subtask.task;
    delete subtask.task;
    let id = subtask.id;
    const payload = JSON.stringify(subtask);

    return fetch(`${SUBTASKS_URL}${id}/`, {
        method: 'PUT',
        body: payload,
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .catch(error => console.error("Error saving subtask:", error));
}

/**
 * Deletes a subtask from the backend.
 * @param {Object} subtask - Subtask object to delete
 * @returns {Promise<Response>}
 */
async function deleteSubtaskAtStorage(subtask) {
    let id = subtask.id;
    return fetch(`${SUBTASKS_URL}${id}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
}

/**
 * Assigns the current task ID to all subtasks and stores them in the backend.
 */
async function setTaskIDsAtSubtasks() {
    for (let i = 0; i < subtasksList.length; i++) {
        const subtask = subtasksList[i];
        subtask.task_id = currentTask_ID;
        await setNewSubtaskStorage(subtask);
    }
}
