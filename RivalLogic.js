function getCardsFromRivalArrbByValue(value)
{
    var cards = [];
    for(let key in players[turnIndex])
    {
        if(players[turnIndex][key].value === value)
        {
            cards.push(players[turnIndex][key]);
        }
    }
    return cards;
}

function getCardsFromRivalArrbByColor(color)
{
    var cards = [];
    for(let key in players[turnIndex])
    {
        if(players[turnIndex][key].color === color)
        {
            cards.push(players[turnIndex][key]);
        }
    }
    return cards;
}


function rivalPlay()
{
    console.log("rival plays");
    var goodCardFound = false;

    var changeColorCards = getCardsFromRivalArrbByValue("change_colorful");
    
    if(changeColorCards.length>0) //change color exists
    {
        playWithColorChangeCard(changeColorCards[0]);
    }
    else //change color doesn't exist
    {
        var stopCards = getCardsFromRivalArrbByValue("stop");
        if(stopCards.length > 0) 
        {
            goodCardFound =findSpcialCardWithSameColor(stopCards);
        }
        if(!goodCardFound) // stop with the same color wasn't found
        {
            var takiCards = getCardsFromRivalArrbByValue("taki");

            if(takiCards.length > 0)
            {
                goodCardFound = findSpcialCardWithSameColor(takiCards);            
            }
            if(!goodCardFound) // taki with the same color wasn't found
            {
                var sameColorCards = getCardsFromRivalArrbByColor(cardOntop.color);
                if(sameColorCards.length > 0) //a number with the same color exists
                {
                    removeAndSetTopCard(sameColorCards[0],"rival-cards");
                    goodCardFound = true;
                    changeTurn(1);
                }
                if (!goodCardFound) //a number with the same color doesn't exist
                {
                    var sameValuecards = getCardsFromRivalArrbByValue(cardOntop.value);
                    if(sameValuecards.length > 0) //the same number exists
                    {
                        removeAndSetTopCard(sameValuecards[0],"rival-cards");
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
    console.log("**********Rival cards after his turn: ");
    printall();
}

function findSpcialCardWithSameColor(cards)
{
    var goodCardFound = false;
    for (var i =0; i<cards.length;i++)
    {
        if(cards[i].color === cardOntop.color)
        {
            removeAndSetTopCard(cards[i],"rival-cards");
            if(cards[i].value === "stop")
            {
                changeTurn(2);
            }
            else if(cards[i].value === "taki")
            {
                console.log("Taki - rival");
                console.log("IN findSpcialCardWithSameColor, TURN INEX IS: "+ turnIndex);
                putAllCardsWithSameColorOfTaki();
                
            }     
            goodCardFound = true;
            break;
        }
    }
    return goodCardFound;
}

function putAllCardsWithSameColorOfTaki()
{
    console.log("IN putAllCardsWithSameColorOfTaki, TURN INEX IS: "+ turnIndex);
    var SameColorCards = getCardsFromRivalArrbByColor(cardOntop.color);
    if(SameColorCards.length > 0)
    {
        for (var i = 0 ; i< SameColorCards.length; i++)
        {
            doSetTimeout(SameColorCards[i], i+1, SameColorCards.length );
        }
    }
    else
    {
        changeTurn(1);
    }

}

function doSetTimeout(card, i, length)
{
    console.log("IN doSetTimeout, TURN INEX IS: "+ turnIndex);
    setTimeout(function() { removeAndSetTopCard(card,"rival-cards");
    if (i === length)
    {
        changeTurn(1);
    }}
    , i * 2000);
}

function chooseColor()
{
    var color = Math.floor(Math.random() * 4);
    return cardColors[color];
}

function playWithColorChangeCard(card)
{
    removeAndSetTopCard(card, "rival-cards");
    var color = chooseColor();
    cardOntop.color = color;
    setTimeout(function(){changeOpenDeckColor(color);},2000);
    changeTurn(1);
}