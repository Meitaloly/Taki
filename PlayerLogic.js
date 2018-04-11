function checkCard(elemntClassName, card, cardOntop)
{
    if(elemntClassName === "player-cards")
    {
        // check color 
        if(card.color === cardOntop.color)
        {
            console.log("color ok!");
            removeCard(card,elemntClassName);
            setNewCardOnTop(card);
        }

        // check number
        else if(card.value === cardOntop.value)
        {
            console.log("value ok!");
            removeCard(card,elemntClassName);
            setNewCardOnTop(card);
        }

        // change color
        else if(card.value === "change_colorful")
        {
            removeCard(card,elemntClassName);
            setNewCardOnTop(card);        
            
        }
        else
        {
            console.log("wrong!");
        }
    }
}