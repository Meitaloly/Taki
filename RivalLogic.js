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
    console.log("rival plays");
    var goodCardFound = false;
    printall();
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
                var sameColorCards = getCardsFromRivalArrbByColor(cardOntop.color);
                if (sameColorCards.length > 0) //a number with the same color exists
                {
                    removeAndSetTopCard(sameColorCards[0], "rival-cards");
                    goodCardFound = true;
                    changeTurn(1);
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
    printall();
}

function findSpcialCardWithSameColor(cards) {
    var goodCardFound = false;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].color === cardOntop.color) {
            removeAndSetTopCard(cards[i], "rival-cards");
            if (cards[i].value === "stop") {
                changeTurn(2);
            }
            else {
                if (cards[i].value === "taki") {
                    openTaki = true;
                    console.log("Taki - rival");
                    putAllCardsWithSameColorOfTaki();
                    openTaki = false;
                }
                changeTurn(1);
            }
            goodCardFound = true;
            break;
        }
    }
    return goodCardFound;
}

function putAllCardsWithSameColorOfTaki() {

    for (let key in players[turnIndex])
    {
        var currCard = players[turnIndex][key];
        if (currCard.color === cardOntop.color) 
        {
            (function (card) 
            {
                setTimeout(function ()
                {
                    removeAndSetTopCard(card, "rival-cards");
                }, 3000);
            })(currCard);
        }
    }
}
    //     var SameColorCards = getCardsFromRivalArrbByColor(cardOntop.color);
    //     for (let key in SameColorCards)
    //     {
    //         var card = SameColorCards[key];
    //         new Promise(function (resolve) {
    //             setTimeout(function() {
    //                 removeAndSetTopCard(card,"rival-cards");
    //                 resolve();
    //             }, 2000);
    //         });
    // }

    // var SameColorCards = getCardsFromRivalArrbByColor(cardOntop.color);

    // if (SameColorCards.length > 0) {
    //     setTimeout(function () {
    //         removeAndSetTopCard(SameColorCards[0], "rival-cards");
    //         SameColorCards.splice(0, 1);
    //     },2000);
    // }

function mySleep(milliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + milliseconds >= new Date().getTime()) { }
}


// function putCardOnDeck(card)
// {
//     setTimeout(function() {removeAndSetTopCard(card, "rival-cards");},2000);
// }

function chooseColor() {
    var color = Math.floor(Math.random() * 4);
    return cardColors[color];
}

function playWithColorChangeCard(card) {
    removeAndSetTopCard(card, "rival-cards");
    var color = chooseColor();
    cardOntop.color = color;
    setTimeout(function () { changeOpenDeckColor(color); }, 2000);
    changeTurn(1);
}