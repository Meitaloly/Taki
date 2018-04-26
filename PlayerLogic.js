function checkStatus() {
    if (!gameOver) {
        var isPlayerTurn = checkPlayerTurn();
        if (isPlayerTurn) {
            var hasCardsToUse = checkPlayerCards();
            if (!hasCardsToUse) {
                addCardToPlayersArrAndDom();
            }
        }
    }
}

function addCardToPlayersArrAndDom() {
    checkAndShuffleDeck();
    var index = addCardToPlayersArr(players[turnIndex]);
    if (turnIndex === player) {
        addCardToPlayersDom("player", "player-cards", index);
    }
    else {
        addCardToPlayersDom("rival", "rival-cards", index);

    }
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
            if (card.color === cardOntop.color) {
                removeAndSetTopCard(card, elemntClassName);
                // isSpecialCard(card);
            }
        }
        else {
            if (card.color === cardOntop.color || card.value === cardOntop.value || card.value === "change_colorful") {
                removeAndSetTopCard(card, elemntClassName);
                isSpecialCard(card);
            }
            else {
                console.log("wrong!");
            }
        }
    }
}

function removeAndSetTopCard(card, elemntClassName) {
    console.log("IN removeAndSetTopCard, TURN INEX IS: " + turnIndex);

    removeCardFromPlayersArr(card);
    removeCardFromPlayersDom(card, elemntClassName);
    setNewCardOnTop(card);

}

function isSpecialCard(card) {
    if (card.value === "change_colorful" && turnIndex === player) {
        waitingForPlayer = true;
        console.log("choose a color");
        showChooseAColorWindow();
    }
    else if (card.value === "stop") {
        if (players[turnIndex].length === 0) {
            console.log("you have to pull another card!");
        }
        changeTurn(2);
    }
    else if (card.value === "taki") {
        if (turnIndex !== player) {
            putAllCardsWithSameColorOfTaki();
            checkPlayerWin(checkTopCard());
        }
        else {
            if (!openTaki) {
                createTakiButton();
                console.log("open taki");
                openTaki = true;
            }
        }
    }
    else {
        checkPlayerWin(1);
    }
}