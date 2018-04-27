var cardColors = { 0: "blue", 1: "red", 2: "green", 3: "yellow" }
var takenCardsCounter = 0;
var cardOntop;
var gameOver = false;
var deck;
var players = [];
var oneCardLeftPerPlayer = [0, 0]
var numOfPlayers = 2;
var turnIndex = numOfPlayers - 1;
var player = turnIndex;
var openTaki = false;
var numOfTurns = 0;
var turnTime = [];
var quitButtonClicked = false;
var timer = gameTimer();
var date = new Date();
var startTime = timer.getTime();

startGame();

function startGame() {
    setQuitButtonLogic();
    deck = createdeck();
    shareCardsToPlayers();
    showdeck(); 
}


function setQuitButtonLogic() {
    var quitButton = document.getElementById("quitButton");
    quitButton.onclick = function () {
        quitButtonClicked = true;
        stopTheGame();

    };
}

function gameTimer() {
    var sec = 00;
    var min = 00;
    var stopTimer = false;
    var fullTime = "";

    var handler = function () {
        if (!stopTimer) {
            if (++sec === 60) {
                sec = 0;
                ++min;
            }
            fullTime = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
            document.getElementById("timer").innerHTML = fullTime;
        }
        else {
            clearInterval(timeInterval);
        }
    };
    var timeInterval = setInterval(handler, 1000);
    handler();

    return {
        getTime: function () {
            var timeOnDom = document.getElementById("timer")
            return timeOnDom.textContent;
        },
        stopGameTimer: function () {
            stopTimer = true;
        }
    };
}

printall();

function shareCardsToPlayers() {
    for (var i = 0; i < numOfPlayers; i++) {
        players[i] = new Array();
        if (i == numOfPlayers - 1) {
            players[i] = shareCards("player");
        }
        else {
            players[i] = shareCards("rival");
        }
    }
    resizeCards();
}

function checkPlayerWin(num) {
    if (players[turnIndex].length === 0) {
        //console.log("player " + turnIndex + " is the winner!");
        setTimeout(stopTheGame, 1000);
    }
    else {
        if (players[turnIndex].length === 1)
            oneCardLeftPerPlayer[turnIndex]++;
        changeTurn(num);
    }

}

function stopTheGame() {
    timer.stopGameTimer();
    gameOver = true;

    //var elementToAddTo = document.getElementsByClassName(elementClassName)[0];
    var statsDiv = document.createElement('div');
    if (quitButtonClicked) {
        statsDiv.innerHTML += "Player 0 is the winner!<br />";
    }
    else {
        statsDiv.innerHTML += "Player " + turnIndex + " is the winner!<br />";
    }

    statsDiv.innerHTML += "Number of turns in the game: " + numOfTurns +
        "<br /> The game time is: " + timer.getTime() +
        "<br />Player 0 had one card " + oneCardLeftPerPlayer[0] + " times" +
        "<br /> Player 1 had one card " + oneCardLeftPerPlayer[1] + " times" +
        "<br /> Avg of turns time is: " + findAvgOfTurnTime();
    statsDiv.style.color = "white";
    var container = document.getElementById("mainContainer");
    container.style.visibility = "hidden";
    document.body.appendChild(statsDiv);
}

function findAvgOfTurnTime() {
    var sum = 0;
    for (var i = 0; i < turnTime.length; i++) {
        sum += turnTime[i];
    }

    var avgStr = sum / turnTime.length;
    return avgStr;
}
function checkTopCard() {
    var nextTurn = 1;
    if (cardOntop.value === "stop") {
        nextTurn = 2;
    }
    return nextTurn;

}

function createCard(color, value, counterId, specialCard) {
    this.color = color;
    this.value = value;
    this.taken = false;
    this.played = false;
    this.specialCard = specialCard;
    this.cardId = counterId;
    this.imgSourceFront = getCardSource(value, color);
    this.imgSourceBack = "cards/card_back.png";
}

function createdeck() {
    var deck = [];
    var cardIdCounter = 0;

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 10; j++) {
            if (j !== 2) {
                deck.push(new createCard(cardColors[i], j, cardIdCounter, false));
                cardIdCounter++;
                deck.push(new createCard(cardColors[i], j, cardIdCounter, false));
                cardIdCounter++;
            }
        }
        for (var j = 0; j < 2; j++) {
            deck.push(new createCard(cardColors[i], "taki", cardIdCounter, true));
            cardIdCounter++;
            deck.push(new createCard(cardColors[i], "stop", cardIdCounter, true));
            cardIdCounter++;
        }
        deck.push(new createCard(null, "change_colorful", cardIdCounter, true))
        cardIdCounter++;

    }
    return deck;
}



function addCardToPlayersArr(arrToAddTheCard) {
    console.log(arrToAddTheCard);
    do {
        var index = Math.floor(Math.random() * deck.length);
    } while (deck[index].taken === true);
    deck[index].taken = true;
    takenCardsCounter++;
    arrToAddTheCard.push(deck[index]);

    return index;
}

function removeCardFromPlayersArr(card) {
    console.log("*+*+*+*** turn index is " + turnIndex);
    for (var key in players[turnIndex]) {
        if (players[turnIndex][key].cardId === card.cardId) {
            players[turnIndex].splice(players[turnIndex].indexOf(players[turnIndex][key]), 1);
            break;
        }
    }
    card.played = true;
}

function checkAndShuffleDeck() {
    if (takenCardsCounter === deck.length) {
        alert("Shuffling!");
        for (var i = 0; i < deck.length; i++) {
            if (deck[i].played) {
                deck[i].played = false;
                deck[i].taken = false;
                takenCardsCounter--;
            }
        }
    }
}

function printDeckArr() {
    for (var i = 0; i < deck.length; i++) {
        console.log(deck[i]);
    }
}

//check

function printall() {
    console.log("rival cards are:");
    for (let key in players[0]) {
        console.log(players[0][key]);
    }
    // console.log ("player cards are:");

    // for (let key in playerCards)
    // {
    //     console.log(playerCards[key]);
    // }
}
// end of check 


function getCardSource(value, color) {
    var cardSource;
    if (value === "change_colorful") {
        cardSource = "cards/" + value + ".png";
    }
    else {
        cardSource = "cards/" + value + "_" + color + ".png";
    }
    return cardSource;
}


function drawOpeningCard() {
    do {
        var index = Math.floor(Math.random() * deck.length);
    } while (deck[index].taken || deck[index].specialCard);
    deck[index].taken = true;
    takenCardsCounter++;
    cardOntop = deck[index];
    return index;
}

function setNewCardOnTop(cardToPutOnTop) {
    cardOntop.played = true;
    cardOntop = cardToPutOnTop;
    showNewCardOnTop(cardToPutOnTop);
    console.log(cardToPutOnTop);

}

function changeTurn(number) {

    console.log("***********");
    console.log("turnIndex before changing: " + turnIndex);
    var endTime = timer.getTime();
    if (!openTaki) {
        if (number !== 2) {
            setTurnTime(endTime);
            rotateArrow();
        }
        else {
            turnTime.push(0);
        }
        turnIndex = (turnIndex + number) % numOfPlayers;
        numOfTurns += number;
        console.log("turnIndex after changing: " + turnIndex);
        console.log("player index: " + player);
        startTime = timer.getTime();
        if (turnIndex !== player) {
            setTimeout(rivalPlay, 2000);
        }
    }

}

function rotateArrow() {
    var arrow = document.getElementById("arrow");
    arrow.style.transform += "rotate(180deg)";
}

function setTurnTime(endTime) {
    var start = startTime.split(":");
    var startMin = Number(start[0]);
    startMin = startMin * 60;
    var startSec = Number(start[1]);
    var fullStartTimeInSec = startMin + startSec;

    var end = endTime.split(":");
    var endMin = Number(end[0]);
    endMin = endMin * 60;
    var endSec = Number(end[1]);
    var fullendTimeInSec = endMin + endSec;

    var timeInSec = fullendTimeInSec - fullStartTimeInSec;
    var min = 0;
    while (timeInSec > 59) {
        min++;
        timeInSec -= 60;
    }

    var turnTimeStr = min + ":" + timeInSec;

    turnTime.push(fullendTimeInSec - fullStartTimeInSec);
}
