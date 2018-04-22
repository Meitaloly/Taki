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
            break;
        }
    }
    return cards;
}


function rivalPlay()
{
    console.log("rival plays");
    var cards = [];
    var stop = false;

    cards = getCardsFromRivalArrbByValue("change_colorful");
    
    console.log ("cards after change color:");
    for (var i = 0; i <cards.length; i++)
    {
        console.log(cards[i]);  
    }

    if(cards.length > 0) //change color exists
    {
        removeAndSetTopCard(cards[0],"rival-cards");
        var color = chooseColor();
        cardOntop.color = color;
        changeOpenDeckColor(color);
        stop = true;
        //setTimeout(function() {changeOpenDeckColor(color);},2000);
        changeTurn(1);

    }
    if(stop === false) //change color doesn't exist
    {
        cards = getCardsFromRivalArrbByValue("stop");

        console.log ("cards after stop:");
        for (var i =0; i<cards.length;i++)
        {
            console.log(cards[i]);  
        }

        if(cards.length > 0) 
        {
            for (var i =0; i<cards.length;i++)
            {
                if(cards[i].color === cardOntop.color) //stop with the same color exists
                {
                    removeAndSetTopCard(cards[i],"rival-cards");
                    changeTurn(2);
                    stop = true;
                    break;
                }
            }
            

        } 
        if(stop === false) //stop with the same color doesn't exist
        {
            cards = getCardsFromRivalArrbByValue("taki");

            console.log ("cards after change taki:");
            for (var i =0; i<cards.length;i++)
            {
                console.log(cards[i]);  
            }
            if(cards.length > 0)
            {
                for (var i =0; i<cards.length;i++)
                {
                    if(cards[i].color === cardOntop.color)//taki with the same color exists
                    {
                        removeAndSetTopCard(cards[i],"rival-cards");
                        console.log("Taki - rival");
                        //findAllCardWithSameColor(players[i], cardOntop.color);
                        changeTurn(1);
                        stop = true;
                        break;
                    }
                }
                
            }
            if(stop === false)//taki with the same color doesn't exist
            {
                cards = getCardsFromRivalArrbByColor(cardOntop.color);

                console.log ("cards after number same color color:");
                for (var i =0; i<cards.length;i++)
                {
                    console.log(cards[i]);  
                }

                if(cards.length > 0) //a number with the same color exists
                {
                    removeAndSetTopCard(cards[0],"rival-cards");
                    stop = true;
                    changeTurn(1);
                }
                if (stop ===false) //a number with the same color doesn't exist
                {
                    cards = getCardsFromRivalArrbByValue(cardOntop.value);

                    console.log ("cards after same number:");
                    for (var i =0; i<cards.length;i++)
                    {
                        console.log(cards[i]);  
                    }

                    if(cards.length > 0) //the same number exists
                    {
                        removeAndSetTopCard(cards[0],"rival-cards");
                        isSpecialCard(cards[0]);
                        stop = true;
                        changeTurn(1);
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


function findAllCardWithSameColor(playerArr, color)
{
    for(var i in playerArr)
    {
        if(playerArr[k].color === color)
        {
            setTimeout(function()
            { 
                removeAndSetTopCard(playerArr[k],"rival-cards");
            }
            ,2000);
        }
    }
}

function chooseColor()
{
    var color = Math.floor(Math.random() * 4);
    return cardColors[color];
}
