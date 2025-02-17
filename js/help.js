/**
 * This function is used to render the help page
 */
function renderHelp() {
    let content = document.getElementById('content');
    let originalText = tempRenderHelp();
    let coloredText = originalText.replace(/Join/g, '<span style="color: #29ABE2;">Join</span>');
    content.innerHTML = coloredText;
};