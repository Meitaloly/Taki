function checkStatus()
{
    var isPlayerTurn = checkPlayerTurn();
    if(isPlayerTurn)
    {
        var hasCardsToUse = checkPlayerCards();
        if(!hasCardsToUse)
        {
            addCardToPlayersArrAndDom()
        }
    }
}

function addCardToPlayersArrAndDom()
{
    var index = addCardToPlayersArr(players[turnIndex]);
    if(turnIndex === player)
    {
        addCardToPlayersDom("player","player-cards",index);
    }
    else
    {
        addCardToPlayersDom("rival","rival-cards",index);

    }
    changeTurn(1);
}

function checkPlayerTurn()
{
    var res = false;
     if(turnIndex === player)
     {
         res =  true;
     }
     return res;
}

function checkPlayerCards()
{
    var res = false;
    for(var i=0 ; i<players[turnIndex].length; i++ )
    {
        if(players[turnIndex][i].value == cardOntop.value || players[turnIndex][i].color == cardOntop.color || players[turnIndex][i].value == "change_colorful")
        {
            res = true;
            break;
        }
    }
    return res;
}

function checkCard(elemntClassName, card, cardOntop)
{
    if(elemntClassName === "player-cards")
    {
        if(!openTaki)
        { 
            if(card.color === cardOntop.color ||card.value === cardOntop.value || card.value === "change_colorful")
            {
                removeAndSetTopCard(card,elemntClassName);
                isSpecialCard(card);
                
            }
            else
            {
                console.log("wrong!");
            }
        }
        else
        {
            if(card.color === cardOntop.color)
            {
                removeAndSetTopCard(card,elemntClassName);
                isSpecialCard(card);
            }
        }
    }
}

function removeAndSetTopCard(card, elemntClassName)
{
    removeCardFromPlayersArr(card);
    removeCardFromPlayersDom(card,elemntClassName);
    setNewCardOnTop(card);

}

function isSpecialCard(card)
{
    if(card.value === "change_colorful" && turnIndex === player)
    {
        waitingForPlayer = true;
        console.log("choose a color");
        showChooseAColorWindow();
        if(openTaki)
        {
            closeButton("deck","takiButton");
            openTaki = false;
        }
    }
    else if(card.value === "stop")
    {
        if(!openTaki)
        {
            changeTurn(2);
        }
    }
    else if(card.value === "taki")
    {
        if(!openTaki)
        {
            if(turnIndex!== player)
            {
                var takiCards =getCardsFromRivalArrbByValue("taki")
                findSpcialCardWithSameColor(takiCards);    
                changeTurn(1);    
            }
            console.log("open taki");
            openTaki = true;
            createTakiButton();
        }
    }
    else
    {
            changeTurn(1);
    }
}