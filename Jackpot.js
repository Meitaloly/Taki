var cardColors = {0:"blue", 1:"red", 2:"green", 3:"yellow"}
function createCard(color,value)
{
    this.color = color;
    this.value = value;
    this.taken = false;
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

var Jackpot = createJackpot();
var rivalCards = shareCards();
var playerCards = shareCards();

function shareCards()
{
    console.log("Jackpot length is " ,Jackpot.length);
    var cards = [];
    for(var i = 0; i < 8; i++)
    {
        do{
            var index = Math.floor(Math.random() * Jackpot.length);
        }while(Jackpot[index].taken === true);

        Jackpot[index].taken = true;
        cards.push(Jackpot[index]);
        console.log(index);
    }
    return cards;
}
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

function showCards()
{
    var playerCards1 = document.getElementById("playerCards").children;
    
    for (var i = 0; i< playerCards1.length; i++)
    {
        var cardSource = getCardSource(i,playerCards);
        
        console.log(cardSource);
        playerCards1[i].src = cardSource;
    }
}
showCards();
function getCardSource(index, cards)
{
    var cardSource;
    if(cards[index].value === "change_colorful")
        {
            cardSource =  "cards/" + cards[index].value + ".png";
        }
        else
        {
            cardSource = "cards/" + cards[index].value + "_" + cards[index].color + ".png";
        }
        return cardSource;
}

startGame();
function startGame()
{
    do{
        var index = Math.floor( Math.random() * Jackpot.length);
    }while(Jackpot[index].taken === true);

    Jackpot[index].taken = true;
    var newImage = document.createElement('img');
    newImage.src = getCardSource(index,Jackpot);
    console.log(newImage);
    newImage.className = "card";
    var JackpotElement = document.getElementsByClassName("Jackpot")[0];
    JackpotElement.appendChild(newImage);
    //var JackpotElement = document.getElementsByTagName("Jackpot");
    
}