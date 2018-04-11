var cardColors = {0:"blue", 1:"red", 2:"green", 3:"yellow"}
var takenCardsCounter = 0;
var cardOntop;
var gameStarted = false;
var Jackpot;
var rivalCards;
var playerCards;

Jackpot = createJackpot();
rivalCards = shareCards("rival");
showJackpot();
playerCards = shareCards("player");
gameStarted= true;

function createCard(color,value)
{
    this.color = color;
    this.value = value;
    this.taken = false;
    this.isOnTop = false;
    this.played = false;
}

function createJackpot()
{
    var Jackpot = [];

    for(var i = 0; i < 4; i++)
    {
        for(var j = 1; j < 10; j++)
        {
            if(j!==2)
            {
                Jackpot.push(new createCard(cardColors[i],j));
                Jackpot.push(new createCard(cardColors[i],j));
            }
        }
        for(var j = 0; j < 2; j++)
        {
            Jackpot.push(new createCard(cardColors[i],"taki"));
            Jackpot.push(new createCard(cardColors[i],"stop"));
        }
        Jackpot.push(new createCard(null,"change_colorful"))

    }
    return Jackpot;
}



function shareCards(playerType)
{
    var containerElement = document.getElementsByClassName('container')[0];
    var elementToAdd = document.createElement('div');
    var elemntClassName = playerType + "-" + "cards";
    elementToAdd.className = elemntClassName; 
    elementToAdd.id = playerType;
    containerElement.appendChild(elementToAdd);


    var cards = [];
    for(var i = 0; i < 8; i++)
    {
        addCard(playerType,elemntClassName, i, cards);
    }  
    return cards;
}

function addCard(playerType, elemntClassName, indexForCardId, arrToAddTheCard)
{
    var playersCardsIndex = indexForCardId;
    do{
        var index = Math.floor(Math.random() * Jackpot.length);
    }while(Jackpot[index].taken === true);
    
    var elementToAddTo = document.getElementsByClassName(elemntClassName)[0];
    Jackpot[index].taken = true;
    var CardImage = document.createElement('img');
    CardImage.className = 'card'; 
    if (playerType === "rival")
    {
        CardImage.src = "cards/card_back.png";
        if(gameStarted === true)
        {
            playersCardsIndex = rivalCards.length-1;
        }
    }
    else
    {
        CardImage.src = getCardSource(Jackpot[index]);
        if(gameStarted === true)
        {
            playersCardsIndex = playerCards.length;
        }
    }
    
    CardImage.alt = elemntClassName;
    CardImage.onclick =  function() {checkCard(elemntClassName,Jackpot[index],cardOntop, CardImage.id)};
    CardImage.id = playerType + playersCardsIndex;
    elementToAddTo.appendChild(CardImage);
    arrToAddTheCard.push(Jackpot[index]);
}

function removeCard(card, elemntClassName, cardId)
{

    var cardParent = document.getElementsByClassName(elemntClassName)[0];
    var cardElement = document.getElementById(cardId);

    if(elemntClassName === "player-cards")
    {
        var arrIndex = cardId.match(/\d+$/)[0];
        playerCards.splice(arrIndex,1);
        card.played = true;
        cardParent.removeChild(cardElement);
    }    
}

//check

function printall()
{
    console.log ("rival cards are:");
    for (let key in rivalCards)
    {
        console.log(rivalCards[key]);
    }
    console.log ("player cards are:");

    for (let key in playerCards)
    {
        console.log(playerCards[key]);
    }
}
// end of check 


function getCardSource(card)
{
    var cardSource;
    if(card.value === "change_colorful")
    {
        cardSource =  "cards/" + card.value + ".png";
    }
    else
    {
        cardSource = "cards/" + card.value + "_" + card.color + ".png";
    }
    return cardSource;
}

function showJackpot()
{

    var containerElement = document.getElementsByClassName('container')[0];
    var jackpotDiv = document.createElement('div');
    jackpotDiv.className = "jackpot"; 
    containerElement.appendChild(jackpotDiv);
    var jackpotImage = document.createElement('img');
    jackpotImage.className = 'card'; 

    jackpotImage.src = "cards/card_back.png";        
    jackpotImage.alt = "jackpot Card";
    jackpotDiv.appendChild(jackpotImage);
    var elementToAddTo = document.getElementsByClassName("player-cards");
    jackpotImage.onclick = function() {addCard("player","player-cards",0,playerCards)};


    do{
        var index = Math.floor( Math.random() * Jackpot.length);
    }while(Jackpot[index].taken === true);
    Jackpot[index].taken = true;
    Jackpot[index].isOnTop = true;
    cardOntop = Jackpot[index];
    var newImage = document.createElement('img');
    newImage.src = getCardSource(Jackpot[index]);
    newImage.alt = 'open jackpot card';
    newImage.className = "card";
    newImage.id = "openJackpot";
   
    var JackpotElement = document.getElementsByClassName("Jackpot")[0];
    JackpotElement.appendChild(newImage);

}

function setNewCardOnTop(cardToPutOnTop)
{
    cardOntop = cardToPutOnTop;
    cardToPutOnTop.isOnTop = true;
    cardToPutOnTop.played = true;

    var cardOnTopElement = document.getElementById("openJackpot");
    cardOnTopElement.src = getCardSource(cardToPutOnTop);

}