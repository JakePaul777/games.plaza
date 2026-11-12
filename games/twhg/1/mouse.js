function getMousePos(evt) {
    var rect = canvasElement.getBoundingClientRect();
    var scaleX = CANVAS_WIDTH / rect.width;
    var scaleY = CANVAS_HEIGHT / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

canvasElement.addEventListener("mousemove", function(evt) {
    var mousePos = getMousePos(evt);
	mouseX = mousePos.x;
    mouseY = mousePos.y;
}, false);

canvasElement.addEventListener("mousedown", function(evt) {
    mouseDown = true;
    clickButtons();
}, false);

canvasElement.addEventListener("mouseup", function(evt) {
    mouseDown = false;
}, false);

// not called in mobile version
function resetMouse() {
	if (justClicked) {
        justClicked = false;
    }
    else if (cursorType == 1) {
        $("#twhgCanvas").css("cursor", "auto");
        cursorType = 0;
    }
}