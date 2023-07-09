"use strict"

import Map from "./map.js";

let overworld = new Map(21);

document.getElementById("hp").innerHTML = `HP : ${overworld.player.hp}`;
document.getElementById("dmg").innerHTML = `DMG : ${overworld.player.dmg}`;
document.getElementById("score").innerHTML = `Score : ${overworld.player.score}`;

function teleport(id){
    overworld.teleport2(id);
}

window.teleport=teleport;