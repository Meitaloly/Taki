var cardColors = {0:"blue", 1:"red", 2:"green", 3:"yellow"}
var takenCardsCounter = 0;
var cardOntop;
var gameStarted = false;
var deck;
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
    console.log(arrToAddTheCard);
    do{
        var index = Math.floor(Math.random() * deck.length);
    }while(deck[index].taken === true);
    deck[index].taken = true;
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
    //resizeCards();
        // console.log("after removing len of player : " + playerCards.length);
        // console.log("card removed index: " + card.cardId);  
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

// function resizeCards()
// {
//     var left = 50;
//     for(var i=0; i<numOfPlayers; i++)
//     {
//         for(var key in players[i])
//         {
//             var card = document.getElementById(players[i][key].cardId);
//             console.log("*****************" + players[i][key].cardId);
//             var newLeft = left * key;
//             card.style.left =newLeft + "px";
//         }

//         var cardId = document.getElementById(i===0?"rival":"player");
//         cardId.style.transform = 'translateX('+ -120 +'px)';
//     }
// }