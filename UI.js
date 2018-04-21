function shareCards(playerType)
{
    var containerElement = document.getElementsByClassName('container')[0];
    var elementToAdd = document.createElement('div');
    var elementClassName = playerType + "-" + "cards";
    elementToAdd.className = elementClassName; 
    elementToAdd.id = playerType;
    containerElement.appendChild(elementToAdd);

    var cards = [];
    for(var i = 0; i < 8; i++)
    {
        var index = addCardToPlayersArr(cards);
        addCardToPlayersDom(playerType,elementClassName,index);
    }  
    return cards;
}



function addCardToPlayersDom(playerType, elementClassName,index)
{
    var elementToAddTo = document.getElementsByClassName(elementClassName)[0];
   
    var CardImage = document.createElement('img');
    CardImage.className = 'card'; 
    if (playerType === "rival")
    {
        CardImage.src = deck[index].imgSourceBack;
    }
    else
    {
        CardImage.src = deck[index].imgSourceFront;
    }
    
    CardImage.alt = elementClassName;
    CardImage.onclick =  function() 
    {
        if(checkPlayerTurn())
        {
            checkCard(elementClassName,deck[index],cardOntop);
        }
    };
    CardImage.id = deck[index].cardId;
    elementToAddTo.appendChild(CardImage);
    

    // if( gameStarted === true)
    // {
    //     console.log("after adding len of player : " + playerCards.length);
    //     console.log("card added index: " + CardImage.id);
    // }
}

function removeCardFromPlayersDom(card, elemntClassName)
{
    var cardParent = document.getElementsByClassName(elemntClassName)[0];
    var cardElement = document.getElementById(card.cardId);
    cardParent.removeChild(cardElement);
}

function showdeck()
{

    var containerElement = document.getElementsByClassName('container')[0];
    var deckDiv = document.createElement('div');
    deckDiv.className = "deck"; 
    containerElement.appendChild(deckDiv);
    var deckImage = document.createElement('img');
    deckImage.className = 'card'; 

    deckImage.src = "cards/card_back.png";        
    deckImage.alt = "deck Card";
    deckDiv.appendChild(deckImage);
    var elementToAddTo = document.getElementsByClassName("player-cards");
    deckImage.onclick = function() {
        checkStatus();
    };

    var index = drawOpeningCard();
    
    var newImage = document.createElement('img');
    newImage.src = deck[index].imgSourceFront;
    newImage.alt = 'open deck card';
    newImage.className = "card";
    newImage.id = "opendeck";
   
    var deckElement = document.getElementsByClassName("deck")[0];
    deckElement.appendChild(newImage);

}

function showNewCardOnTop(cardToPutOnTop) 
{
    var cardOnTopElement = document.getElementById("opendeck");
    cardOnTopElement.src = cardToPutOnTop.imgSourceFront;
}

function showChooseAColorWindow()
{
    var deckElement = document.getElementsByClassName("deck")[0];

    var colorWindow = document.createElement('div');
    colorWindow.id = "colorWindow";
    var colorWindowId = document.getElementById("colorWindow");

    for(var i =0;i<4;i++)
    {
        var button = document.createElement('button');
        button.className = cardColors[i];
        button.onclick = function ()
        {
            closeChooseAColorWindow();
            cardOntop.color = this.className;
            changeOpenDeckColor(this.className);
            changeTurn(1);
        };
        colorWindow.appendChild(button);
    }
    deckElement.appendChild(colorWindow);
}

function closeChooseAColorWindow()
{
    var parent = document.getElementsByClassName("deck")[0];
    var colorWindowElement = document.getElementById("colorWindow");
    parent.removeChild(colorWindowElement);
}

function changeOpenDeckColor(color)
{
    var openDeck = document.getElementById("opendeck");
    openDeck.src =  "cards/" + "change_colorful_" + color + ".png";
}