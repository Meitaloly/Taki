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
        // check color 
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
        //closeChooseAColorWindow(); 
    }
    else if(card.value === "stop")
    {
        changeTurn(2);
    }
    else if(card.value === "taki")
    {
        //openTaki = true;
        console.log("open taki");
    }
    else
    {
            changeTurn(1);
    }
}