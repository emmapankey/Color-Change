// RGB guessing game JavaScript functions

// globals
var pickedColor = null;
var numSquares = null;

initGame();

function initGame() {

    setupGameFormat("hard");

    addNewGameEventHandler();
    addSquareEventHandlers();
    addEasyHardEventHandlers();

    resetGame();
}

function resetGame() {
    initHeaderColor();
    initNewGameButton();
    initSquareColors();
    pickedColor = chooseWinningColor();
    initWinningDisplayColor(pickedColor);

    var message = document.getElementById("messageId");
    message.textContent = "";
}

function setupGameFormat(type) {
    var easy = document.getElementById("easyId");
    var hard = document.getElementById("hardId");
    var squares = document.querySelectorAll(".square");

    if (type === "hard") {
        hard.classList.add("selected");
        easy.classList.remove("selected");
        numSquares = 6;

        for (var i = 0; i < squares.length; i++) {
            squares[i].classList.remove("hide");
        }
    } else if (type === "easy") {
        easy.classList.add("selected");
        hard.classList.remove("selected");
        numSquares = 3;

        for (var i = 0; i < squares.length; i++) {
            if (i < numSquares) {
                squares[i].classList.remove("hide");
            } else {
                squares[i].classList.add("hide");
            }
        }
    }
}

function initHeaderColor(initColor) {
    var header = document.getElementById("headerId");
    if (initColor !== null && initColor !== undefined) {
        header.style.backgroundColor = initColor;
    } else {
        header.style.backgroundColor = "steelblue";
    }
}

function initSquareColors(initColor) {
    var squares = document.querySelectorAll(".square");

    for (var i = 0; i < squares.length && i < numSquares; i++) {

        var rgbStr = initColor;
        while (rgbStr === null || rgbStr === undefined) {
            var color = generateRgbString();
            if (!colorExists(color)) {
                rgbStr = color;
            }
        }

        squares[i].style.backgroundColor = rgbStr;
        squares[i].classList.remove("hide");
    }
}

function initNewGameButton(txtMsg) {
    var msg = "NEW COLORS";
    if (txtMsg !== null && txtMsg !== undefined) {
        msg = txtMsg;
    }

    var newGameButton = document.getElementById("playNewGameId");
    newGameButton.textContent = msg;
}

function chooseWinningColor() {
    var squares = document.querySelectorAll(".square");
    var selectedSquare = squares[getRandomInt(numSquares)];
    return selectedSquare.style.backgroundColor;
}

function initWinningDisplayColor(color) {
    var colorDisplay = document.getElementById("colorDisplayId");
    colorDisplay.textContent = color;
}

function addNewGameEventHandler() {
    var newGameButton = document.getElementById("playNewGameId");
    newGameButton.addEventListener("click", function () {
        resetGame();
    });
}

function addEasyHardEventHandlers() {
    var easy = document.getElementById("easyId");
    var hard = document.getElementById("hardId");

    easy.addEventListener("click", function () {
        setupGameFormat("easy");
        resetGame();
    });

    hard.addEventListener("click", function () {
        setupGameFormat("hard");
        resetGame();
    });
}

function addSquareEventHandlers() {
    var squares = document.querySelectorAll(".square");

    for (var i = 0; i < squares.length && i < numSquares; i++) {
        // add click event listeners to squares
        squares[i].addEventListener("click", function () {
            var message = document.getElementById("messageId");
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                message.textContent = "CORRECT!";
                initSquareColors(pickedColor);
                initHeaderColor(pickedColor);
                initNewGameButton("PLAY AGAIN");
            } else {
                this.classList.add("hide");
                message.textContent = "Try Again";
            }
        });
    }
}

function colorExists(color) {
    var answer = false;
    var squares = document.querySelectorAll(".square");
    for (var i = 0; i < squares.length && i < numSquares; i++) {
        var squareColor = squares[i].style.backgroundColor;
        if (color === squareColor) {
            answer = true;
            break;
        }
    }

    return answer;
}

function generateRgbString() {
    var red = getRandomInt(256);
    var green = getRandomInt(256);
    var blue = getRandomInt(256);

    return ("rgb(" + red + ", " + green + ", " + blue + ")");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}