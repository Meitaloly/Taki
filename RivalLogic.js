function getCardsFromRivalArrbByValue(value) {
    var cards = [];
    for (let key in players[turnIndex]) {
        if (players[turnIndex][key].value === value) {
            cards.push(players[turnIndex][key]);
        }
    }
    return cards;
}

function getCardsFromRivalArrbByColor(color) {
    var cards = [];
    for (let key in players[turnIndex]) {
        if (players[turnIndex][key].color === color) {
            cards.push(players[turnIndex][key]);
        }
    }
    return cards;
}

function rivalPlay() {
    
    console.log("rival cards are:");
    for (let key in players[0]) {
        console.log(players[0][key]);
    }
    if (!gameOver) {
        var goodCardFound = false;

        var changeColorCards = getCardsFromRivalArrbByValue("change_colorful");

        if (changeColorCards.length > 0) //change color exists
        {
            playWithColorChangeCard(changeColorCards[0]);
        }
        else //change color doesn't exist
        {
            var stopCards = getCardsFromRivalArrbByValue("stop");
            if (stopCards.length > 0) {
                goodCardFound = findSpcialCardWithSameColor(stopCards);
            }
            if (!goodCardFound) // stop with the same color wasn't found
            {
                var takiCards = getCardsFromRivalArrbByValue("taki");

                if (takiCards.length > 0) {
                    goodCardFound = findSpcialCardWithSameColor(takiCards);
                }
                if (!goodCardFound) // taki with the same color wasn't found
                {
                    var plusCards = getCardsFromRivalArrbByValue("plus");
                    if (plusCards.length > 0) {
                        goodCardFound = findSpcialCardWithSameColor(plusCards);
                    }
                    if (!goodCardFound) {
                        var sameColorCards = getCardsFromRivalArrbByColor(cardOntop.color);
                        if (sameColorCards.length > 0) //a number with the same color exists
                        {
                            removeAndSetTopCard(sameColorCards[0], "rival-cards");
                            goodCardFound = true;
                            checkPlayerWin(1);
                        }
                        if (!goodCardFound) //a number with the same color doesn't exist
                        {
                            var sameValuecards = getCardsFromRivalArrbByValue(cardOntop.value);
                            if (sameValuecards.length > 0) //the same number exists
                            {
                                removeAndSetTopCard(sameValuecards[0], "rival-cards");
                                isSpecialCard(sameValuecards[0]);
                                goodCardFound = true;
                            }
                            else //the same number doesn't exist
                            {
                                addCardToPlayersArrAndDom();
                            }
                        }
                    }
                }
            }
        }
    }
}

function findSpcialCardWithSameColor(cards) {
    var goodCardFound = false;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].color === cardOntop.color) {
            removeAndSetTopCard(cards[i], "rival-cards");
            if (cards[i].value === "stop") {
                checkPlayerWin(2);
            }
            else if (cards[i].value === "plus") {
                changeTurn(numOfPlayers);
            }
            else if (cards[i].value === "taki") {
                putAllCardsWithSameColorOfTaki();
            }
            goodCardFound = true;
            break;
        }
    }
    return goodCardFound;
}

var arrIndex = 0;
function putAllCardsWithSameColorOfTaki() {
    var SameColorCards = getCardsFromRivalArrbByColor(cardOntop.color);
    if (SameColorCards.length > 0) {
        openTaki = true;
        var takiTime = setInterval(function () { newTimeOut(SameColorCards, takiTime) }, 1000);
    }
    else {
        checkPlayerWin(1);
    }
}

function newTimeOut(arrOfSameCards, takiTime) {
    if (arrIndex < arrOfSameCards.length) {
        removeAndSetTopCard(arrOfSameCards[arrIndex], "rival-cards");
        arrIndex++;
    }
    else {
        clearTimeout(takiTime);
        openTaki = false;
        arrIndex = 0;
        checkPlayerWin(1);
    }

}

function chooseColor() {
    var colorsArr = setColorsArr();
    color = getColorFromColorsArr(colorsArr);
    return cardColors[color];
}

function setColorsArr() {
    var resArr = [0, 0, 0, 0];
    for (var i = 0; i < players[turnIndex].length; i++) {
        if (players[turnIndex][i].color !== null) {
            switch (players[turnIndex][i].color) {
                case "blue":
                    resArr[0]++;
                    break;
                case "red":
                    resArr[1]++;
                    break;
                case "green":
                    resArr[2]++;
                    break;
                case "yellow":
                    resArr[3]++;
                    break;

            }
        }
    }
    return resArr;
}

function getColorFromColorsArr(colorsArr) {
    var max = 0;
    var indexOfMaxNum = 0;
    var res;

    for (var i = 0; i < colorsArr.length; i++) {
        if (colorsArr[i] > max) {
            max = colorsArr[i];
            indexOfMaxNum = i;
        }
    }
    res = indexOfMaxNum;
    return res;
}

function playWithColorChangeCard(card) {
    removeAndSetTopCard(card, "rival-cards");
    var color = chooseColor();
    cardOntop.color = color;
    setTimeout(function () { changeOpenDeckColor(color); }, 1000);
    setTimeout(function () { checkPlayerWin(1); }, 1000);
}