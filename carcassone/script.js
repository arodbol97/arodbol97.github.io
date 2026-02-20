"use strict"

import Game from "./Game.js";

let game = new Game();

gameStart();

function reload(){
    location.reload();    
}

function gameStart(){
    game.start();
}

window.reload=reload;
window.gameStart=gameStart;