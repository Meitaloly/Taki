function shareCards(playerType) {
    var elementClassName = playerType + "-" + "cards";
    var cards = [];
    for (var i = 0; i < numOfCardsForEachPlayer; i++) {
        var index = addCardToPlayersArr(cards);
        addCardToPlayersDom(playerType, elementClassName, index);
    }
    return cards;
}

function addCardToPlayersDom(playerType, elementClassName, index) {
    var elementToAddTo = document.getElementsByClassName(elementClassName)[0];

    var CardImage = document.createElement('img');
    CardImage.className = 'card';
    if (playerType === "rival") {
        CardImage.src = deck[index].imgSourceBack;
    }
    else {
        CardImage.src = deck[index].imgSourceFront;
    }

    CardImage.alt = elementClassName;
    CardImage.onclick = function () {
        if (checkPlayerTurn()) {
            checkCard(elementClassName, deck[index], cardOntop);
        }
    };
    CardImage.id = deck[index].cardId;
    elementToAddTo.appendChild(CardImage);
    resizeCards();
}

function removeCardFromPlayersDom(card, elemntClassName) {
    var cardParent = document.getElementsByClassName(elemntClassName)[0];
    var cardElement = document.getElementById(card.cardId);
    cardParent.removeChild(cardElement);
    resizeCards();

}

function showdeck() {

    var elementToAddTo = document.getElementsByClassName("player-cards");
    var deckImage = document.getElementById("backDeck");
    deckImage.onclick = function () {
        checkStatus();
    };
    var index = drawOpeningCard();
    var openDeckImg = document.getElementById("opendeck");
    openDeckImg.src = deck[index].imgSourceFront;
    setNumOfCardsText();
}

function setNumOfCardsText() {
    var deckStatusElement = document.getElementById("deckStatus");
    deckStatusElement.innerText = "Cards in deck: " + (deck.length - takenCardsCounter);

}

function showNewCardOnTop(cardToPutOnTop) {
    var cardOnTopElement = document.getElementById("opendeck");
    cardOnTopElement.src = cardToPutOnTop.imgSourceFront;
}

function showChooseAColorWindow() {
    var deckElement = document.getElementsByClassName("deck")[0];

    var colorWindow = document.createElement('div');
    colorWindow.id = "colorWindow";
    var colorWindowId = document.getElementById("colorWindow");

    for (var i = 0; i < 4; i++) {
        var button = document.createElement('button');
        button.className = cardColors[i];
        button.onclick = function () {
            closetButton("deck", colorWindow.id);
            cardOntop.color = this.className;
            changeOpenDeckColor(this.className);
            checkPlayerWin(1);

        };
        colorWindow.appendChild(button);
    }
    deckElement.appendChild(colorWindow);
}

function changeOpenDeckColor(color) {
    changeColorSound.play();
    var openDeck = document.getElementById("opendeck");
    openDeck.src = "cards/" + "change_colorful_" + color + ".png";
}

function createTakiButton() {
    var deckElement = document.getElementsByClassName("deck")[0];
    var takiButton = document.createElement('img');
    takiButton.id = "takiButton";
    takiButton.src = "images/done.png";
    deckElement.appendChild(takiButton);
    takiButton.onclick = function () {
        closetButton("deck", takiButton.id);
        openTaki = false;
        checkPlayerWin(checkTopCard())
    };
}

function closetButton(parentName, childId) {
    var parent = document.getElementsByClassName(parentName)[0];
    var elementToRemove = document.getElementById(childId);
    parent.removeChild(elementToRemove);
}


function resizeCards() {
    var cardWidth = 120;
    var cardSpace = 60;
    var resizeArr = [0, 0];

    for (var i = 0; i < numOfPlayers; i++) {
        if (gameStarted) {
            checkSpacesBetweenCards(resizeArr, i);
        }
        for (var key in players[i]) {
            var card = document.getElementById(players[i][key].cardId);
            if (card) {
                card.style.marginLeft = -(cardWidth - cardSpace - resizeArr[i]);
            }
        }
    }
}
function checkSpacesBetweenCards(resizeArr, index) {
    if (players[index].length > 21) {
        resizeArr[index] -= 40;
    }
    else if (players[index].length > 18) {
        resizeArr[index] -= 35;
    }
    else if (players[index].length > 15) {
        resizeArr[index] -= 30;
    }
    else if (players[index].length > 12) {
        resizeArr[index] -= 25;
    }
    else if (players[index].length > 9) {
        resizeArr[index] -= 12;
    }
    else if (players[index].length < 5) {
        resizeArr[index] += 25;
    }
}

function showStats() {
    var statsDiv = document.createElement('div');
    var newGameButton = document.createElement('button');
    newGameButton.className = "NewGameButton";
    newGameButton.textContent = "New Game";
    newGameButton.onclick = function () { resetAll(); };
    if (quitButtonClicked) {
        loserSound.play();
        statsDiv.innerHTML += "The computer is the winner!<br />";

    }
    else {
        if (turnIndex === player) {
            winnerSound.play();
            statsDiv.innerHTML += "You are the winner!<br />";

        }
        else {
            loserSound.play();
            statsDiv.innerHTML += "The computer is the winner!<br />";
        }
        numOfTurns++;
    }
    statsDiv.innerHTML += "Number of turns in the game: " + numOfTurns +
        "<br /> The game time is: " + timer.getTime() +
        "<br /> The computer had one card " + oneCardLeftPerPlayer[0] + " times" +
        "<br /> You had one card " + oneCardLeftPerPlayer[1] + " times" +
        "<br /> Avg of your turns time is: " + findAvgOfTurnTime(turnTime, false) +
        "<br /> Avg of your turns time in all games is: " + findAvgOfTurnTime(avgTurnTimePerGame, true);
    statsDiv.style.color = "white";
    statsDiv.style.textAlign = "center";
    statsDiv.style.fontSize = "20px";
    var container = document.getElementById("mainContainer");
    container.style.display = "none";
    var statsContainer = document.getElementsByClassName("stats")[0];
    statsContainer.style.display = "flex";
    statsContainer.appendChild(statsDiv);
    statsContainer.appendChild(newGameButton);
}

function removeAllElementsFromDom() {
    removeAllChildren("statsContainer");
    removeAllChildren("rival");
    removeAllChildren("player");

}

function removeAllChildren(parentId) {
    var parent = document.getElementById(parentId);
    var currChild = parent.firstChild;
    while (currChild) {
        parent.removeChild(currChild);
        currChild = parent.firstChild;
    }
}

function showDomElements() {
    var container = document.getElementById("mainContainer");
    container.style.display = "";
}