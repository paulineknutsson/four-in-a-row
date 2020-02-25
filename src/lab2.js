  
'use strict';


// eslint-disable-next-line no-unused-vars



//koppla inputvariablen till en grid för att de ska bli kvadratiskt!!! 


var dict = {}; // här sparas alla knappar
var counter = 0;
var sign;

/* exported createGameboard() */
/* global createGameboard() */
function createGameboard(){
    var boardSize = parseInt(document.getElementById("userInput").value);
    console.log(boardSize*boardSize);
    document.documentElement.style.setProperty("--columns-row", boardSize);

    const createboard = () => {

        const container = document.getElementsByClassName('gameboard')
        container.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`
    }
    console.log(createboard);

    var i = 1;
    var gameboard = document.getElementsByClassName("gameboard")[0];
    console.log(boardSize)
    for (i; i <= boardSize*boardSize; i++) {
        var button = document.createElement("button");
        button.className = "boardcomponent";
        button.id = i;
        dict[parseInt(button.id)] = button; // appendar objektet till dict
        button.innerHTML = "";
        gameboard.appendChild(button);
        button.addEventListener ("click", click);
    }
    return(boardSize);
    }
//skriv en funktion givet ett knapptryck ger alla grannar till den, randvillkor, om den fungerar bra: gå vidare
function numForWin(current) { // här kollar vi om någon har vunnit
    var numForWin = parseInt(document.getElementById("userInput2").value);
    console.log(numForWin);
    var win = checkWin(numForWin, current);
    if (win == true){
        alert("Grattis du vann!");
        var a = document.createElement('a');  
        var link = document.createTextNode("Klicka här om du vill spela igen"); 
        a.appendChild(link); 
        a.href = "test.html";  
        var section = document.getElementById("hej");
        section.appendChild(a);
        createGameboard();
    }

}

function checkWin(numForWin, current) { // här går vi igenom alla grannar och kollar efter lika tecken
    var win = false;
    var boardSize = parseInt(document.getElementById("userInput").value);
    var i = 1;
    var FIRST = current;
    var left = 0; var right = 0; var upper = 0; var lower = 0; 
    var upperLeft = 0; var lowerLeft = 0; var upperRight = 0; var lowerRight = 0;

    current = FIRST;
    while(dict[current+i] && dict[current].innerHTML == dict[current+i].innerHTML){
        current = current+i;
        right += 1;
    } 

    current = FIRST;
    while(dict[current-i] && dict[current].innerHTML == dict[current-i].innerHTML){
        current = current-i;
        left += 1;
    } 

    current = FIRST;
    while(dict[current+i*boardSize] && dict[current].innerHTML == dict[current+i*boardSize].innerHTML){
        current = current+i*boardSize;
        lower += 1;
    } 

    current = FIRST;
    while(dict[current-i*boardSize] && dict[current].innerHTML == dict[current-i*boardSize].innerHTML){
        current = current-i*boardSize;
        upper += 1;
    } 

    current = FIRST;
    while(dict[current-i*boardSize-i] && dict[current].innerHTML == dict[current-i*boardSize-i].innerHTML){
        current = current-i*boardSize-i;
        upperLeft += 1;
    } 

    current = FIRST;
    while(dict[current-i*boardSize+i] && dict[current].innerHTML == dict[current-i*boardSize+i].innerHTML){
        current = current-i*boardSize+i;
        upperRight += 1;
    } 

    current = FIRST;
    while(dict[current+i*boardSize-i] && dict[current].innerHTML == dict[current+i*boardSize-i].innerHTML){
        current = current+i*boardSize-i;
        lowerLeft += 1;
    } 

    current = FIRST;
    while(dict[current+i*boardSize+i] && dict[current].innerHTML == dict[current+i*boardSize+i].innerHTML){
        current = current+i*boardSize+i;
        lowerRight += 1;
    } 

    var horiz = left + right +1;
    console.log("här är hori", horiz, left, right);
    var verti = upper + lower +1;
    console.log("här är verti", verti, upper, lower);
    var diag1 = upperLeft + lowerRight +1;
    console.log("här är diag1", diag1, upperLeft, lowerRight);
    var diag2 = lowerLeft + upperRight +1;
    console.log("här är diag2", diag2, lowerLeft, upperRight);

    if (numForWin <= horiz){
        win = true;
    } else if (numForWin <= verti){
        win = true;
    } else if (numForWin <= diag1){
        win = true;
    } else if (numForWin <= diag2){
        win = true;
    }
    return win

}

function click(){
    var boardSize = parseInt(document.getElementById("userInput").value);
    console.log(`You clicked on ${this.id}`);
    var current = parseInt(this.id);
    if (this.innerHTML == ""){
        var neighbours = checkNeigh(current, boardSize);
        // returnera knappar som inte är tomma
        if (counter == 0){
            console.log('hallåååå');
            this.innerHTML = setSign(); //sätt detta till en "spelarvariablel"
            this.className = sign;
            counter +=1;
        } else{
            var play = checkButton(neighbours);
            if (play == true){
                this.innerHTML = setSign();
                this.className = sign;
                counter +=1;
                numForWin(parseInt(this.id));
            }
        }
    } else{
        console.log("NE");
    }
}

function checkNeigh(current, boardSize){
    var add = parseInt(1)
    var neigh1 = current+add;
    var neigh2 = current-add;
    var neigh3 = current+boardSize;
    var neigh4 = current+boardSize+add;
    var neigh5 = current+boardSize-add;
    var neigh6 = current-boardSize;
    var neigh7 = current-boardSize+add;
    var neigh8 = current-boardSize-add;

    if (current%boardSize == 0){
        console.log("sista i raden", current, neigh2, neigh3, neigh5, neigh6, neigh8);
        return [neigh2, neigh3, neigh5, neigh6, neigh8];
    } else if (current%boardSize == 1){
        console.log("första i raden", current, neigh1, neigh3, neigh4, neigh6, neigh7);
        return [neigh1, neigh3, neigh4, neigh6, neigh7];
    } else{
        console.log(current, neigh1, neigh2, neigh3, neigh4, neigh5, neigh6, neigh7, neigh8);
        return [neigh1, neigh2, neigh3, neigh4, neigh5, neigh6, neigh7, neigh8];
    }
}

//if current = free -> check neighbours.. 
//hur kommer vi åt knapparna?

function checkButton(neighbours){
    console.log(neighbours);
    var play = false;
    var index;
    for (index = 0; index < neighbours.length; ++index) {
        if (neighbours[index] in dict){
            if (neighbours[index] && dict[neighbours[index]].innerHTML == ""){ 
                // om alla är tomma får vi inte spela
            } else{
                play = true;
            }
        }
    }
    return play
}

function setSign(){
    if (counter%2 == 0){
        sign = "x"
    } else{
        sign = "o"
    }
    return sign
}

