var cardColors = {0:"blue", 1:"red", 2:"green", 3:"yellow"}
var takenCardsCounter = 0;
var cardOntop;
var gameStarted = false;
var deck = [];
var players = [];
var numOfPlayers = 2;
var turnIndex = numOfPlayers-1;
var player = turnIndex;
var openTaki = false;

deck = createdeck();
shareCardsToPlayers();
printall();

function shareCardsToPlayers()
{
    for(var i = 0; i< numOfPlayers; i++)
    {
        players[i] = new Array();
        if(i == numOfPlayers-1)
        {
            showdeck();
            players[i] = shareCards("player");
        }
        else
        {
            players[i] = shareCards("rival");
        }
    }
    resizeCards();
}

function createCard(color,value,counterId)
{
    this.color = color;
    this.value = value;
    this.taken = false;
    this.isOnTop = false;
    this.played = false;
    this.cardId = counterId;
    this.imgSourceFront = getCardSource(value,color);
    this.imgSourceBack = "cards/card_back.png";
}

function createdeck()
{
    var deck = [];
    var cardIdCounter = 0;

    for(var i = 0; i < 4; i++)
    {
        for(var j = 1; j < 10; j++)
        {
            if(j!==2)
            {
                deck.push(new createCard(cardColors[i],j,cardIdCounter));
                cardIdCounter++;
                deck.push(new createCard(cardColors[i],j,cardIdCounter));
                cardIdCounter++;
            }
        }
        for(var j = 0; j < 2; j++)
        {
            deck.push(new createCard(cardColors[i],"taki",cardIdCounter));
            cardIdCounter++;
            deck.push(new createCard(cardColors[i],"stop",cardIdCounter));
            cardIdCounter++;
        }
        deck.push(new createCard(null,"change_colorful",cardIdCounter))
        cardIdCounter++;

    }
    return deck;
}



function addCardToPlayersArr(arrToAddTheCard)
{
    if(takenCardsCounter === deck.length)
    {
        alert("deck is over!");
        shuffleDeckCards();   
    }
    console.log(arrToAddTheCard);
    do{
        var index = Math.floor(Math.random() * deck.length);
    }while(deck[index].taken === true);
    deck[index].taken = true;
    takenCardsCounter++;
    arrToAddTheCard.push(deck[index]);
    return index;
}



function removeCardFromPlayersArr(card)
{
    for(var key in players[turnIndex])
    {
        if(players[turnIndex][key].cardId === card.cardId)
        {
            players[turnIndex].splice(players[turnIndex].indexOf(players[turnIndex][key]),1);
            break;
        }
    }
    card.played = true;
}


//check

function printall()
{
    console.log ("rival cards are:");
    for (let key in players[0])
    {
        console.log(players[0][key]);
    }
    // console.log ("player cards are:");

    // for (let key in playerCards)
    // {
    //     console.log(playerCards[key]);
    // }
}
// end of check 


function getCardSource(value, color)
{
    var cardSource;
    if(value === "change_colorful")
    {
        cardSource =  "cards/" + value + ".png";
    }
    else
    {
        cardSource = "cards/" + value + "_" + color + ".png";
    }
    return cardSource;
}


function drawOpeningCard()
{
    do{
        var index = Math.floor( Math.random() * deck.length);
    }while(deck[index].taken === true);
    deck[index].taken = true;
    takenCardsCounter++;
    deck[index].isOnTop = true;
    cardOntop = deck[index];
    return index;
}

function setNewCardOnTop(cardToPutOnTop)
{
    cardOntop = cardToPutOnTop;
    cardToPutOnTop.isOnTop = true;
    cardToPutOnTop.played = true;
    showNewCardOnTop(cardToPutOnTop);
    console.log(cardToPutOnTop);

}

function changeTurn(number)
{
    if(!openTaki)
    {
        console.log("***********");
        console.log("turnIndex before changing: " + turnIndex);   
        turnIndex = (turnIndex + number) % numOfPlayers;
        console.log("turnIndex after changing: " + turnIndex);
        console.log("player index: " + player);
        if(turnIndex !== player)
        {
            setTimeout(rivalPlay,2000);
        }
    }
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

function shuffleDeckCards()
{
    for(let key in deck)
    {
        if(deck[key].played === true)
        {
            deck[key].taken = false;
            deck[key].played = false;
        }
    }
}
