function rivalPlay()
{
    console.log("rival plays:");

    if(players[turnIndex].indexOf())


function getCardIndex(value)
{
    for(let key in players[turnIndex])
    {
        if(players[turnIndex][key].value === value)
        {
            players[turnIndex].splice(key,1);
            break;
        }
    }
}
    for(var j=0; j<players[turnIndex].length; j++)
    {
        var card = players[turnIndex][j];
        if(card.value === "change_colorful")
        {
            removeAndSetTopCard(card,"rival-cards");
            var color = chooseColor();
            cardOntop.color = color;
            setTimeout(function() {changeOpenDeckColor(color);},2000);
            changeTurn(1);
            break;
        }
        else if(card.color === cardOntop.color)
        {
            if(card.value === "stop")
            {
                removeAndSetTopCard(card,"rival-cards");
                changeTurn(2);
                break;
            } 
            else if(card.value === "taki")
            {
                removeAndSetTopCard(card,"rival-cards");
                console.log("Taki - rival");
                //findAllCardWithSameColor(players[i], cardOntop.color);
                changeTurn(1);
                break;    
            }
            else // number with the same color
            {
                removeAndSetTopCard(card,"rival-cards");
                changeTurn(1);
                break;
            }
        }
        else // not same color
        { 
            if(card.value === cardOntop.value)
            {
                removeAndSetTopCard(card,"rival-cards");
                isSpecialCard(card);
                changeTurn(1);
                break;
            }
            else
            {
                addCardToPlayersArrAndDom();
                break;
            }
        }
    }
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
