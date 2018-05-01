function checkStatus() {
    if (!gameOver) {
        var isPlayerTurn = checkPlayerTurn();
        if (isPlayerTurn) {
            var hasCardsToUse = checkPlayerCards();
            if (hasCardsToUse) {
                wrongSound.play();
            }
            else if (!hasCardsToUse && !openTaki) {

                addCardToPlayersArrAndDom();
            }
        }
    }
}

function addCardToPlayersArrAndDom() {

    var index = addCardToPlayersArr(players[turnIndex]);
    takingCard.play();
    if (turnIndex === player) {
        addCardToPlayersDom("player", "player-cards", index);
    }
    else {
        addCardToPlayersDom("rival", "rival-cards", index);

    }
    checkAndShuffleDeck();
    setNumOfCardsText();
    checkPlayerWin(1);
}

function checkPlayerTurn() {
    var res = false;
    if (turnIndex === player) {
        res = true;
    }
    return res;
}

function checkPlayerCards() {
    var res = false;
    for (var i = 0; i < players[turnIndex].length; i++) {
        if (players[turnIndex][i].value == cardOntop.value || players[turnIndex][i].color == cardOntop.color || players[turnIndex][i].value == "change_colorful") {
            res = true;
            break;
        }
    }
    return res;
}

function checkCard(elemntClassName, card, cardOntop) {
    if (elemntClassName === "player-cards") {
        if (openTaki) {
            if (turnIndex === player) {
                if (card.color === cardOntop.color) {
                    removeAndSetTopCard(card, elemntClassName);
                }
                else
                {
                    wrongSound.play();
                }
            }
        }
        else {
            if (card.color === cardOntop.color || card.value === cardOntop.value || card.value === "change_colorful") {
                removeAndSetTopCard(card, elemntClassName);
                isSpecialCard(card);
            }
            else {
                if (turnIndex === player)
                    wrongSound.play();
            }
        }
    }
}

function removeAndSetTopCard(card, elemntClassName) {
    removeCardFromPlayersArr(card);
    removeCardFromPlayersDom(card, elemntClassName);
    setNewCardOnTop(card);
    if (players[turnIndex].length === 1) {
        oneCardLeftPerPlayer[turnIndex]++;
    }
}

function isSpecialCard(card) {
    if (card.value === "change_colorful" && turnIndex === player) {
        waitingForPlayer = true;
        showChooseAColorWindow();
    }
    else if (card.value === "stop") {
        if (players[turnIndex].length === 0) {
            stopTheGame();
        }
        else
        {
            changeTurn(2);
        }
    }
    else if (card.value === "taki") {
        if (turnIndex !== player) {
            putAllCardsWithSameColorOfTaki();
            checkPlayerWin(checkTopCard());
        }
        else {
            if (!openTaki) {
                createTakiButton();
                openTaki = true;
            }
        }
    }
    else if (card.value === "plus") {
        changeTurn(numOfPlayers);
    }
    else {
        checkPlayerWin(1);
    }
}