summary = [];

/**
 * This function renders the content of the summary 
 */
async function renderSummary() {
    await getSummary();
    let content = document.getElementById('content');
    content.innerHTML = tempRenderSummary();
    setActiveNavItem("summary");
    renderGreetingMessage();
    renderInitials();
}

async function getSummary() {
    summary = await getItem('summary');
}

/**
 * This function is utilized to filter and display the closest deadline.
 */
function showDate() {
    const urgentTasksWithDueDates = allTasks.filter(item => item.prio === 'Urgent' && item.dueDate !== '');
    let closestDate = '';
    let upcomingDeadline = '';

    if (urgentTasksWithDueDates.length > 0) {
        const dates = urgentTasksWithDueDates.map(item => new Date(item.dueDate));
        closestDate = new Date(Math.min.apply(null, dates));
        // upcomingDeadline = closestDate.toISOString().split('T')[0];
    }
    const formattedDate = upcomingDeadline.replace(/(\d{4})-(\d{2})-(\d{2})/, function (match, year, month, day) {
        const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return months[parseInt(month, 10) - 1] + ' ' + parseInt(day, 10) + ', ' + year;
    });

    updateElementText('calendarDate', formattedDate);
}