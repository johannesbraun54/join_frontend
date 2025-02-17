/**
 * @returns the complete Html from the Board
 */
function renderBoardHtml() {

    return /*html*/`
    <div class="boardContent">
    <header class="boardHeaderContent" id="headerContent">
        <div class="boardHeadline">
           <h1>Board</h1> 
        </div>
        <div class="headBar">
            <form class="formArea" action="#">
                <input id="searchBoard" class="inputArea" onkeyup="updateBoardHtml()"  type="text" placeholder="Find Task">
                <div>
                    <img src="./img/borderDash.svg">
                </div> 
                <img onclick="updateBoardHtml()" class="searchBoard" src="./img/search.svg">
            </form>
            <div class="addTaskBtn" onclick="openDialog('dialogAddTaskBoard','addTaskWindow'); setStatus('todo')">
                Add Task
                <img src="./img/add.svg">
            </div>
            <div class="respBtn" onclick="renderAddTask('todo')">
                <img src="./img/responsiveAddButton.svg">
            </div>
            
        </div>

    </header>

    <form class="respFormArea" action="#">
        <input id="respSearchBoard" class="inputArea" onkeydown="updateBoardHtml()"  type="text" placeholder="Find Task">
        <div>
            <img src="./img/borderDash.svg">
        </div> 
            <img onclick="updateBoardHtml()" class="searchBoard" src="./img/search.svg">
    </form>

    <div id="dialogAddTaskBoard" class="dialog-bgAddTask d-none" onclick="closeDialog('dialogAddTaskBoard','addTaskWindow')">
                <div id="addTaskWindow" style="transform: translateX(200%);" class="dialogAddTaskBoard" onclick="doNotClose(event)">
                </div>
    </div>

    <div id="dialogShowCard" class="dialog-bgBoard d-none" onclick="closeDialog('dialogShowCard','taskOverlay', )">

    </div>


        <div class="board">
            <div class="todoSection">
                <div class="statusheader">
                    <h3>To do</h3>
                    <div class="addTaskHeader filterBlue" onclick="openDialog('dialogAddTaskBoard','addTaskWindow'); setStatus('todo')">
                        <img src="img/plusB.svg">
                    </div>
                    <div class="respAddTaskHeader filterBlue" onclick="renderAddTask('todo')">
                        <img src="./img/responsiveAddPlus.svg">
                    </div>
                </div>
                <div id="todo" ondrop="moveTo('todo')" class="todos" ondragover="allowDrop(event); highlight('todo')" ondragleave="removeHighlight('todo')">
                    <div class="noTasks">
                        No Tasks to do
                    </div>
                </div>
            </div>

            <div class="todoSection">
                <div class="statusheader">
                    <h3>In progress</h3>
                    <div class="addTaskHeader filterBlue" onclick="openDialog('dialogAddTaskBoard','addTaskWindow'); setStatus('inProgress')">
                        <img src="img/plusB.svg">
                    </div>
                    <div class="respAddTaskHeader filterBlue" onclick="renderAddTask('inProgress')">
                        <img src="./img/responsiveAddPlus.svg">
                    </div>
                </div>
                <div id="inProgress" ondrop="moveTo('inProgress')" class="todos" ondragover="allowDrop(event); highlight('inProgress')" ondragleave="removeHighlight('inProgress')">
                    <div class="noTasks">
                        No Tasks to do
                    </div>
                </div>
            </div>

            <div class="todoSection">
                <div class="statusheader">
                    <h3>Await feedback</h3>
                    <div class="addTaskHeader filterBlue"  onclick="openDialog('dialogAddTaskBoard','addTaskWindow'); setStatus('awaitFeedback')">
                        <img src="img/plusB.svg">
                    </div>
                    <div class="respAddTaskHeader filterBlue" onclick="renderAddTask('awaitFeedback')">
                        <img src="./img/responsiveAddPlus.svg">
                    </div>
                </div>
                <div id="awaitFeedback" ondrop="moveTo('awaitFeedback')" class="todos" ondragover="allowDrop(event); highlight('awaitFeedback')" ondragleave="removeHighlight('awaitFeedback')">
                    <div class="noTasks">
                        No Tasks to do
                    </div>
                </div>
            </div>

            <div class="todoSection">
                <div class="statusheader">
                    <h3>Done</h3>
                </div>
                <div id="done" class="todos" ondrop="moveTo('done')" ondragover="allowDrop(event); highlight('done')" ondragleave="removeHighlight('done')">
                    <div class="noTasks">
                        No Tasks to do
                    </div>
                </div> 
            </div>
        </div>
    </div>`
}

/**
 * @param {object} todo
 * @param {string} array 
 * @param {integer} i 
 * @returns the whole Html that is used for the Card
 */
function renderCardHtml(todo) {

    let idFromTask = todo['id']
    return/*html*/` <div class="card" id="${todo['id']}" ondragstart="startDragging(${todo['id']}); rotateCard(${todo['id']})">
    <div onclick="renderBoardTaskOverlay(${idFromTask}); openDialog('dialogShowCard','taskOverlay')">
        <div draggable="true" class="cardContent">
            <div class="cardHeader">
                <div id="category${todo['id']}" class="category">
                    ${todo['category']}
                </div>
                <div class="changeStatus" id="openPopUp${idFromTask}" onclick="doNotClose(event)">
                <div onclick="togglePopup(${idFromTask})">
                    ...
                </div>
                </div>
            </div>
      
                <div onclick="doNotClose(event)" id="changeStatusPopUp${idFromTask}" class="changeStatusPopUp">
                    Move to:
                    <p onclick="changeStatusInPopUp(${idFromTask},'todo')">todo</p>
                    <p onclick="changeStatusInPopUp(${idFromTask},'inProgress')">in Progress</p>
                    <p onclick="changeStatusInPopUp(${idFromTask},'awaitFeedback')">await feedback</p>
                    <p onclick="changeStatusInPopUp(${idFromTask},'done')">Done</p>
                </div>    
             
            <h4>${todo['title']}</h4>
            <p>${renderDescription(todo['description'])}</p>

            <div id="progressBar${todo['id']}" class="progressBar">
               
            </div>
            <div class="endSection">
                <div id="assignedBox${todo['id']}" class="avatars">

                </div>
                <div id="cardPrio${todo['id']}">
                    
                </div>
            </div>
        </div>
    </div>
</div>`
}

/**
 * 
 * @param {integer} idFromTask 
 * @returns the Html for the content of the taskoverlay
 */
function renderTaskOverlayHtml(idFromTask, actuellyTask) {

    currentClickedTask = actuellyTask

    return /*html*/ `<div id="taskOverlay" class="dialogShowCard" onclick="doNotClose(event);">
    <div class="taskHeader">
        <p id="ctgry${idFromTask}" class="category">${actuellyTask['category']}</p> 
        <img onclick="closeDialog('dialogShowCard','taskOverlay')" class="editCard" src="img/close.svg">
    </div>

    <div class="taskTemplate">
    <h1 class="headline">${actuellyTask['title']}</h1>
    <span>
        <p>${actuellyTask['description']}</p>
    </span>
   
    <div class="dueDate"> 
        <span class="grey">Due date:</span>
        <span>${actuellyTask['dueDate']}</span>
    </div>

    <div class="dueDate">
       <span class="grey">Priority:</span>  
        <div id="prio${actuellyTask['id']}" class="cardPrio">
    
        </div>
    </div>
       
    <p class="grey">Assigned to:</p> 
    <div id="assignedUser" class="cardContact">
       
    </div>
                 
    <h3 id="subHeadline${idFromTask}">Subtasks</h3>
    <div id="subtask${actuellyTask['id']}" class="subtask">
       
    </div>

    </div>
    
    <div class="closeSection">
        <div onclick="deleteBoardTask(${actuellyTask['id']})" class="closeSectionItem filterBlue">Delete <img src="./img/delete.svg"></div>  
        <div onclick="renderBoardEditForm(${actuellyTask['id']})" class="closeSectionItem filterBlue">Edit <img src="./img/edit.svg"></div>    
    </div>
</div>`
}
