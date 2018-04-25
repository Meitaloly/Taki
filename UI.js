function shareCards(playerType) {
    // var containerElement = document.getElementsByClassName('container')[0];
    // var cardsContainerElement = document.createElement('div');
    // var cardsContainerClassName = playerType + "-" + "container";
    // cardsContainerElement.className = cardsContainerClassName;
    // containerElement.appendChild(cardsContainerElement);

    // var elementToAdd = document.createElement('div');
     var elementClassName = playerType + "-" + "cards";
    // elementToAdd.className = elementClassName;
    // elementToAdd.id = playerType;
    // cardsContainerElement.appendChild(elementToAdd);

    var cards = [];
    for (var i = 0; i < 8; i++) {
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
    var deckImage = document.getElementsByClassName("card");
    deckImage.onclick = function () {
        checkStatus();
    };
    var index = drawOpeningCard();
    var openDeckImg = document.getElementById("opendeck");
    openDeckImg.src = deck[index].imgSourceFront;
}


function showGameDate()
{
    
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
    var openDeck = document.getElementById("opendeck");
    openDeck.src = "cards/" + "change_colorful_" + color + ".png";
}

function createTakiButton() {
    var deckElement = document.getElementsByClassName("deck")[0];
    var takiButton = document.createElement('button');
    takiButton.id = "takiButton";
    deckElement.appendChild(takiButton);
    takiButton.onclick = function () {
        closetButton("deck", takiButton.id);
        openTaki = false;
        checkPcheckTopCard()};
    }


function closetButton(parentName, childId) {
    var parent = document.getElementsByClassName(parentName)[0];
    var elementToRemove = document.getElementById(childId);
    parent.removeChild(elementToRemove);
}

function resizeCards()
{
    var cardWidth = 120;
    var cardSpace = 70;

    for(var i=0; i<numOfPlayers; i++)
    {
        console.log("-------------start---------------")
        for(var key in players[i])
        {
            console.log("player " + i + ": " + players[i][key].value + " " + players[i][key].color);
            var card = document.getElementById(players[i][key].cardId);
            if(card) {
                card.style.marginLeft = -(cardWidth-cardSpace);
            }
        }
        console.log("-------------end-----------------")

    }
}