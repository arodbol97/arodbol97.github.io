"use strict"
let players = 2;
let pinArray;

document.addEventListener("DOMContentLoaded",()=>{
    document.body.innerHTML=`<h2>Juego de Bolos</h2>`;
    createGame();
});

/* REGLAS
    Tumbar todos los bolos en 2 tiradas es un spare.
    Tumbar todos los bolos en 1 tirada es un strike.

    Puntuar un spare implica que en ese turno se sume la puntuación de la primera tirada del siguiente turno.
    Puntuar un strike implica que en ese turno se sume la puntuación del siguiente turno.
*/

function createGame(size){
    let ballInterval = 0;
    let ball = $("img");
    let nextSpot = 120;
    let animDirection = "down";
    let ballSpot = 80;
    tables();
    pins();    
    $(document).ready(()=>{
        $("#throw").click(()=>{          
          if(ballInterval == 0){
            ballInterval = setInterval(()=>{
                $("#ball").animate({top: `${nextSpot}px`},100,"linear");
                ballSpot = nextSpot;
                if(nextSpot==0){
                    nextSpot = 40;                    
                }else if(nextSpot==40 && animDirection=="down"){
                    nextSpot = 80;
                }else if(nextSpot==80 && animDirection=="down"){
                    nextSpot = 120;
                }else if(nextSpot==120 && animDirection=="down"){
                    nextSpot = 160;
                    animDirection = "up";
                }else if(nextSpot==160){                    
                    nextSpot = 120;
                }else if(nextSpot==120 && animDirection=="up"){
                    nextSpot = 80;
                }else if(nextSpot==80 && animDirection=="up"){
                    nextSpot = 40;
                }else if(nextSpot==40 && animDirection=="up"){
                    nextSpot = 0;
                    animDirection = "down";
                }
            },100);
            }else{
                clearInterval(ballInterval);
                ballInterval = 0;
                console.log(ballSpot);
                $("img").animate({left: '96%'});
                $("img").animate({left: '0px',top: '80px'});
            }
        });
    });
}

function tables(){
    let table = $("<table></table>").attr("class","score");    
    $("body").append(table);
    for(let i = 0 ; i < players ; i++){
        let player = $("<tr></tr>").attr("id",`player${i}`).attr("class","playerRow");
        let pnumbr = $("<td></td>").text(`Jugador ${i+1}`).attr("class","playerNumber");
        player.append(pnumbr);
        for(let e = 0 ; e < 9 ; e++){
            let turn = $("<td></td>").attr("id",`turn${e}`).attr("class","turn");
            let shots = $("<table></table>").attr("id","shots");            
            let turnDiv = $("<div></div>").attr("class","turnDiv");
            shots.append($("<td></td>").attr("id",`shot1`).attr("class","shot"));
            shots.append($("<td></td>").attr("id",`shot2`).attr("class","shot"));
            turnDiv.append(shots).append($("<span></span>").text("0"));
            turn.append(turnDiv);
            player.append(turn);
        }
        let turn = $("<td></td>").attr("id",`turnf`).attr("class","turn");
            let shots = $("<table></table>").attr("id","shotsf");
            let turnDiv = $("<div></div>").attr("class","turnDiv");
            shots.append($("<td></td>").attr("id",`shot1`).attr("class","shot"));
            shots.append($("<td></td>").attr("id",`shot2`).attr("class","shot"));
            shots.append($("<td></td>").attr("id",`shot3`).attr("class","shot"));
            turnDiv.append(shots).append($("<span></span>").text("0"));
            turn.append(turnDiv);
            player.append(turn);
                
        table.append(player);
    }

    let throwDiv = $("<div></div>").attr("id","throw");
    $("body").append(throwDiv);
    let gameDiv = $("<div></div>").attr("id","game");    
    let ball = $("<img>").attr("src","img/ball.png").attr("id","ball");
    let pins = $("<div></div>").attr("id","pins");
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p0"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p1"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p2"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p3"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p4"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p5"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p6"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p7"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p8"));
    pins.append($("<img>").attr("src","img/pin.png").attr("id","p9"));
    gameDiv.append(ball).append(pins);
    $("body").append(gameDiv);
}

function pins(){
    pinArray = new Array(5);
    for(let i = 0 ; i < 5 ; i++){
        pinArray[i] = ["na","na","na","na","na","na","na"];
    }

    /*
    6 n 7 n 8 n 9
    n 3 n 4 n 5 n
    n n 1 n 2 n n
    n n n 0 n n n
    n n n n n n n
    */

    let p0 = {
        left: 1,
        right: 2,
        knocked: false
    };
    let p1 = {
        left: 3,
        right: 4,
        knocked: false
    };
    let p2 = {
        left: 4,
        right: 5,
        knocked: false
    };
    let p3 = {
        left: 6,
        right: 7,
        knocked: false
    };
    let p4 = {
        left: 7,
        right: 8,
        knocked: false
    };
    let p5 = {
        left: 8,
        right: 9,
        knocked: false
    };
    let p6 = {
        left: "none",
        right: "none",
        knocked: false
    };
    let p7 = {
        left: "none",
        right: "none",
        knocked: false
    };
    let p8 = {
        left: "none",
        right: "none",
        knocked: false
    };
    let p9 = {
        left: "none",
        right: "none",
        knocked: false
    };

    pinArray[3][3] = p0;
    pinArray[2][2] = p1;
    pinArray[2][4] = p2;
    pinArray[1][1] = p3;
    pinArray[1][3] = p4;
    pinArray[1][5] = p5;
    pinArray[0][0] = p6;
    pinArray[0][2] = p7;
    pinArray[0][4] = p8;
    pinArray[0][6] = p9;
}



function win(){
    let sweetAlert = document.createElement("div");
    sweetAlert.setAttribute("class","sweetAlert");
    sweetAlert.innerHTML=`
    <div>
        <div id='results'>
            <h1>Juego finalizado. Has fallado ${water} veces.</h1>
        </div>
        <br>
        <span>¿Desea continuar jugando?</span>
        <br><br>
        <button id='continue'>Continuar</button>
        <button id='abandon'>Abandonar</button>
    </div>
    `;    
    document.body.appendChild(sweetAlert);

    document.getElementById("continue").addEventListener("click",()=>{
        sweetAlert.remove();   
        document.querySelector("table").remove();   
        createForm();     
    });

    document.getElementById("abandon").addEventListener("click",()=>{
        sweetAlert.remove();
    });
}