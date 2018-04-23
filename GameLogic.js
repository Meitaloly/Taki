var cardColors = { 0: "blue", 1: "red", 2: "green", 3: "yellow" }

function deckClass() {
    var deckArr = [];
    var takenCards = 0;
    var cardOnTop;
    var openTaki = false;
    var numOfColors = 4;
    var numOfRegularCardsPerColor = 8;
    var openingCardIndex;

    function drawOpeningCard() {
        do {
            var index = Math.floor(Math.random() * deckArr.length);
        } while (deckArr[index].taken === true);
        deckArr[index].setCardTaken(true);
        takenCards++;
        cardOntop = deckArr[index];
        return index;
    }

    return {
        createDeck: function () {
            var cardIdCounter = 0;
            for (var i = 0; i < numOfColors; i++) {
                for (var j = 0; j < numOfRegularCardsPerColor + 1; j++) {
                    if (j + 1 !== 2) {
                        deckArr.push(cardClass(cardColors[i], j + 1, cardIdCounter));
                        cardIdCounter++;
                        deckArr.push(cardClass(cardColors[i], j + 1, cardIdCounter));
                        cardIdCounter++;
                    }
                }
                for (var j = 0; j < 2; j++) {
                    deckArr.push(cardClass(cardColors[i], "taki", cardIdCounter));
                    cardIdCounter++;
                    deckArr.push(cardClass(cardColors[i], "stop", cardIdCounter));
                    cardIdCounter++;
                }
                deckArr.push(cardClass(null, "change_colorful", cardIdCounter))
                cardIdCounter++;
            }
            openingCardIndex = drawOpeningCard();
        },

        isEndOfDeck: function () {
            return takenCards === deckArr.length;
        },

        shuffleDeckCards: function () {
            for (let key in deckArr) {
                if (deckArr[key].getPlayedCardValue) {
                    deckArr[key].setCardTaken(false);
                    deckArr[key].setCardPlayed(false);
                }
            }
        },

        getOpeningCardIndex: openingCardIndex,



    }
}

function cardClass(i_color, i_value, i_cardId) {
    var color = i_color;
    var value = i_value;
    var cardId = i_counterId;
    var played = false;
    var taken = false;
    var imgSourceFront = getCardSource(value, color);
    var imgSourceBack = "cards/card_back.png";

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

    return {
        getImgSourceFront: function () {
            return imgSourceFront;
        },

        getImgSourceBack: function () {
            return imgSourceBack;
        },

        getPlayedCardValue: played,

        getTakenCardValue: taken,

        setCardPlayed: function (setValue) {
            played = setValue;
        },

        setCardTaken: function (setValue) {
            taken = setValue;
        },
    }
}

function playersCardsArraysClass() {
    
    var numOfPlayers = 2;    
    var players = [];
    var turnIndex = numOfPlayers - 1;
    var myPlayer = turnIndex;
    var numOfCardsToShare = 8;
  
    function shareCardsToPlayers() {
        for (var i = 0; i < numOfPlayers; i++) {
            players[i] = new Array();
            if (i == numOfPlayers - 1) {
                showdeck();
                players[i] = shareCards("player");
            }
            else {
                players[i] = shareCards("rival");
            }
        }
        resizeCards();
    }

}



shareCardsToPlayers();
printall();

function shareCardsToPlayers() {
    for (var i = 0; i < numOfPlayers; i++) {
        players[i] = new Array();
        if (i == numOfPlayers - 1) {
            showdeck();
            players[i] = shareCards("player");
        }
        else {
            players[i] = shareCards("rival");
        }
    }
    resizeCards();
}


function addCardToPlayersArr(arrToAddTheCard) {
    if (takenCardsCounter === deck.length) {
        alert("deck is over!");
        shuffleDeckCards();
    }
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
    for (var key in players[turnIndex]) {
        if (players[turnIndex][key].cardId === card.cardId) {
            players[turnIndex].splice(players[turnIndex].indexOf(players[turnIndex][key]), 1);
            break;
        }
    }
    card.played = true;
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

function setNewCardOnTop(cardToPutOnTop) {
    cardOntop = cardToPutOnTop;
    cardToPutOnTop.played = true;
    showNewCardOnTop(cardToPutOnTop);
    console.log(cardToPutOnTop);

}

function changeTurn(number) {
    if (!openTaki) {
        console.log("***********");
        console.log("turnIndex before changing: " + turnIndex);
        turnIndex = (turnIndex + number) % numOfPlayers;
        console.log("turnIndex after changing: " + turnIndex);
        console.log("player index: " + player);
        if (turnIndex !== player) {
            setTimeout(rivalPlay, 2000);
        }
    }
}

function resizeCards() {
    var cardWidth = 120;
    var cardSpace = 70;

    for (var i = 0; i < numOfPlayers; i++) {
        console.log("-------------start---------------")
        for (var key in players[i]) {
            console.log("player " + i + ": " + players[i][key].value + " " + players[i][key].color);
            var card = document.getElementById(players[i][key].cardId);
            if (card) {
                card.style.marginLeft = -(cardWidth - cardSpace);
            }
        }
        console.log("-------------end-----------------")

    }
}

function shuffleDeckCards() {
    for (let key in deck) {
        if (deck[key].played === true) {
            deck[key].taken = false;
            deck[key].played = false;
        }
    }
}
