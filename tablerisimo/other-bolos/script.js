"use strict"
let players = 2;                    //Número de jugadores
let activePlayer = 1;               //Jugador seleccionado
let turn = 1;                       //Turno
let shot = 1;                       //Tirada
let pinArray;                       //Array con los bolos
let scores = new Array(players);    //Array con las puntuaciones de cada turno, tirada y puntuación máxima

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

//Comienza el juego
function createGame(size){
    let ballInterval = 0;       //Variable del intervalo de la animación de la bola    
    let nextSpot = 105;         //Siguiente posición de la bola en la animación
    let animDirection = "down"; //Dirección de la bola
    let ballSpot = 70;          //Posición actual de la bola

    tables();
    pins();    

    $(document).ready(()=>{
        $("#throw").click(()=>{          
          if(ballInterval == 0){
            ballInterval = setInterval(()=>{    //Mover la bola verticalmente
                $("#ball").animate({top: `${nextSpot}px`},100,"linear");                
                ballSpot = nextSpot;
                if(nextSpot==0){
                    nextSpot = 35;                    
                }else if(nextSpot==35 && animDirection=="down"){
                    nextSpot = 70;
                }else if(nextSpot==70 && animDirection=="down"){
                    nextSpot = 105;
                }else if(nextSpot==105 && animDirection=="down"){
                    nextSpot = 140;
                }else if(nextSpot==140 && animDirection=="down"){
                    nextSpot = 175;
                    animDirection = "up";
                }else if(nextSpot==175){                    
                    nextSpot = 140;
                }else if(nextSpot==140 && animDirection=="up"){
                    nextSpot = 105;
                }else if(nextSpot==105 && animDirection=="up"){
                    nextSpot = 70;
                }else if(nextSpot==70 && animDirection=="up"){
                    nextSpot = 35;
                }else if(nextSpot==35 && animDirection=="up"){
                    nextSpot = 0;
                    animDirection = "down";
                }
            },100);
            }else{                              //Cancela la animación de la bola y la lanza desde la posición en la que se encuentre
                nextSpot = 105;
                animDirection = "up";
                clearInterval(ballInterval);
                ballInterval = 0;                
                throwBall(ballSpot);
            }
        });
    });
}

//Genera la tabla de puntuaciones, prepara el array de punuaciones y genera los divs del juego y del botón de lanzar
function tables(){
    //Genera tabla de puntuaciones
    let table = $("<table></table>").attr("class","score");    
    $("body").append(table);

    for(let i = 0 ; i < players ; i++){
        let player = $("<tr></tr>").attr("id",`player${i+1}`).attr("class","playerRow");
        let pnumbr = $("<td></td>").text(`Jugador ${i+1}`).attr("class","playerNumber");
        player.append(pnumbr);
        for(let e = 0 ; e < 9 ; e++){
            let turn = $("<td></td>").attr("id",`turn${e+1}`).attr("class","turn");
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

    //Genera botón
    let throwDiv = $("<div></div>").attr("id","throw").text("Lanzar");
    $("body").append(throwDiv);

    //Genera div del juego
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

    //Prepara el array de puntuaciones
    for(let i =0;i < players;i++){
        scores[i] = new Array();
    }

    let p1t1 = {shot1: 0,shot2: 0,span: 0};
    let p1t2 = {shot1: 0,shot2: 0,span: 0};
    let p1t3 = {shot1: 0,shot2: 0,span: 0};
    let p1t4 = {shot1: 0,shot2: 0,span: 0};
    let p1t5 = {shot1: 0,shot2: 0,span: 0};
    let p1t6 = {shot1: 0,shot2: 0,span: 0};
    let p1t7 = {shot1: 0,shot2: 0,span: 0};
    let p1t8 = {shot1: 0,shot2: 0,span: 0};
    let p1t9 = {shot1: 0,shot2: 0,span: 0};
    let p1t10 = {shot1: 0,shot2: 0,shot3: 0,span: 0};
    let totalscorep1 = 0;

    let p2t1 = {shot1: 0,shot2: 0,span: 0};
    let p2t2 = {shot1: 0,shot2: 0,span: 0};
    let p2t3 = {shot1: 0,shot2: 0,span: 0};
    let p2t4 = {shot1: 0,shot2: 0,span: 0};
    let p2t5 = {shot1: 0,shot2: 0,span: 0};
    let p2t6 = {shot1: 0,shot2: 0,span: 0};
    let p2t7 = {shot1: 0,shot2: 0,span: 0};
    let p2t8 = {shot1: 0,shot2: 0,span: 0};
    let p2t9 = {shot1: 0,shot2: 0,span: 0};
    let p2t10 = {shot1: 0,shot2: 0,shot3: 0,span: 0};
    let totalscorep2 = 0;

    scores[0].push(p1t1);
    scores[0].push(p1t2);
    scores[0].push(p1t3);
    scores[0].push(p1t4);
    scores[0].push(p1t5);
    scores[0].push(p1t6);
    scores[0].push(p1t7);
    scores[0].push(p1t8);
    scores[0].push(p1t9);
    scores[0].push(p1t10);
    scores[0].push(totalscorep1);

    scores[1].push(p2t1);
    scores[1].push(p2t2);
    scores[1].push(p2t3);
    scores[1].push(p2t4);
    scores[1].push(p2t5);
    scores[1].push(p2t6);
    scores[1].push(p2t7);
    scores[1].push(p2t8);
    scores[1].push(p2t9);
    scores[1].push(p2t10);
    scores[1].push(totalscorep2);
}

//Actualiza la tabla de puntuaciones con el contenido del array
function updateScores(){
    let spareOverflow = 0;  //Puntos extra por spare
    let strikeOverflow = 0; //Puntos extra por strike
    for(let i = 0;i < players;i++){
        scores[i][10] = 0;  //Resetea la puntuación total

        //Primero recorre el array desde el final para añadir los puntos extra por spare o strike
        $(`#player${i+1} #turnf #shot1`).text(scores[i][9].shot1);
        $(`#player${i+1} #turnf #shot2`).text(scores[i][9].shot2);
        $(`#player${i+1} #turnf #shot3`).text(scores[i][9].shot3);
        scores[i][9].span = scores[i][9].shot1 + scores[i][9].shot2 + scores[i][9].shot3;
        $(`#player${i+1} #turnf span`).text(scores[i][9].span);
        if(scores[i][9].shot1==10){
            $(`#player${i+1} #turnf #shot1`).text("X");
        }
        if(scores[i][9].shot2==10){
            $(`#player${i+1} #turnf #shot2`).text("X");
        }
        if(scores[i][9].shot3==10){
            $(`#player${i+1} #turnf #shot3`).text("X");
        }

        strikeOverflow = scores[i][9].shot1 + scores[i][9].shot2;
        spareOverflow = scores[i][9].shot1;

        for(let e = 8;e > -1;e--){
            $(`#player${i+1} #turn${e+1} #shot1`).text(scores[i][e].shot1);
            $(`#player${i+1} #turn${e+1} #shot2`).text(scores[i][e].shot2);
            
            scores[i][e].span = scores[i][e].shot1 + scores[i][e].shot2;
            if(scores[i][e].shot1==10){
                $(`#player${i+1} #turn${e+1} #shot1`).text("X");
                scores[i][e].span = scores[i][e].shot1 + scores[i][e].shot2 + strikeOverflow;
            }else if(scores[i][e].shot1+scores[i][e].shot2 == 10){
                $(`#player${i+1} #turn${e+1} #shot2`).text("/");
                scores[i][e].span = scores[i][e].shot1 + scores[i][e].shot2 + spareOverflow;
            }

            $(`#player${i+1} #turn${e+1} span`).text(scores[i][e].span);

            if(e == 8){
                strikeOverflow = scores[i][e].shot1 + scores[i][e].shot2 + scores[i][9].shot1;
            }else{
                strikeOverflow = scores[i][e].shot1 + scores[i][e].shot2 + scores[i][e+1].shot1 + scores[i][e+1].shot2;
            }
            spareOverflow = scores[i][e].shot1;
        }

        //Después lo recorre desde el principio para que cada turno arrastre los puntos del turno anterior
        for(let e = 0;e < 10;e++){
            if(e < 9){
                $(`#player${i+1} #turn${e+1} span`).text(scores[i][e].span+scores[i][10]);
            }else{
                $(`#player${i+1} #turnf span`).text(scores[i][e].span+scores[i][10]);
            }
            
            scores[i][10] += scores[i][e].span;
        }        
    }    
}

//Prepara el array de los bolos
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

    //Cada bolo tiene como variable los bolos que tenga detrás
    let p9 = {spot: 9,left: "none",right: "none",knocked: false};
    let p8 = {spot: 8,left: "none",right: "none",knocked: false};
    let p7 = {spot: 7,left: "none",right: "none",knocked: false};
    let p6 = {spot: 6,left: "none",right: "none",knocked: false};
    let p5 = {spot: 5,left: p8,right: p9,knocked: false};
    let p4 = {spot: 4,left: p7,right: p8,knocked: false};
    let p3 = {spot: 3,left: p6,right: p7,knocked: false};
    let p2 = {spot: 2,left: p4,right: p5,knocked: false};
    let p1 = {spot: 1,left: p3,right: p4,knocked: false};
    let p0 = {spot: 0,left: p1,right: p2,knocked: false};

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

//Lanza la bola
function throwBall(ballSpot){
    let points = 0;     //Puntos de la tirada
    let lucky = false;  //Lanzamiento especial que garantiza un strike
    ballSpot /= 35;     //Posición de la bola, se divide por 35 porque cada posición en la pantalla está a 35 px de la anterior
    
    $("#throw").attr("id","notThrow");  //Cambia la id del botón para que no permita lanzar hasta el final de la tirada.

    switch(ballSpot){   //Calcula si el tiro es especial, cuanto más cerca del centro más probable será
        case 2:
        case 3:
            if(parseInt(Math.random()*5)==0 && shot==1){
                lucky = true;                
            }
            $("img").animate({left: '96%'},1000);
        break;

        case 1:
        case 4:
            if(parseInt(Math.random()*7)==0 && shot==1){
                lucky = true;
                $("img").animate({left: '96%',top: '80px'},1000);
                if(parseInt(Math.random()*2)==0){
                    ballSpot = 2;
                }else{
                    ballSpot = 3;
                }
            }else{
                $("img").animate({left: '96%'},1000);
            }
        break;

        case 0:
        case 5:
            if(parseInt(Math.random()*8)==0 && shot==1){
                lucky = true;
                $("img").animate({left: '96%',top: '80px'},1000);
                if(parseInt(Math.random()*2)==0){
                    ballSpot = 2;
                }else{
                    ballSpot = 3;
                }
            }else{
                $("img").animate({left: '96%'},1000);
            }
        break;
    }
    
    if(lucky){
        $("#notThrow").text("Buen tiro!!");
    }else{
        $("#notThrow").text("Espera");
    }

    $("img").animate({left: '0px',top: '80px'});    //Devuelve la bola al punto de salida

    for(let i = 0 ; i < 5 ; i++){   //Limpia la bola del turno anterior
        for(let e = 0 ; e < 7 ; e++){   
            if(pinArray[i][e] == "ballLeft" || pinArray[i][e] == "ballRight"){
                pinArray[i][e] = "na";
            }
        }   
    } 
    
    //Coloca la bola en el array de los bolos
    pinArray[4][ballSpot + 0] = "ballLeft";    
    pinArray[4][ballSpot + 1] = "ballRight";

    //points += knockPin(pinArray[3][3],"ballLeft",false);    
    
    setTimeout(()=>{
        if(pinArray[3][ballSpot + 0] != "na"){
            if(!pinArray[3][ballSpot + 0].knocked){     //Si la bola encuentra un bolo que no esté tumbado, intenta tumbarlo
                points += knockPin(pinArray[3][ballSpot + 0],"ballLeft",lucky);
            }
        }
        if(pinArray[3][ballSpot + 1] != "na"){
            if(!pinArray[3][ballSpot + 1].knocked){
                points += knockPin(pinArray[3][ballSpot + 1],"ballRight",lucky);
            }
        }        
    },900);

    setTimeout(()=>{
        if(pinArray[2][ballSpot + 0] != "na"){
            if(!pinArray[2][ballSpot + 0].knocked){
                points += knockPin(pinArray[2][ballSpot + 0],"ballLeft",lucky);
            }
        }
        if(pinArray[2][ballSpot + 1] != "na"){
            if(!pinArray[2][ballSpot + 1].knocked){
                points += knockPin(pinArray[2][ballSpot + 1],"ballRight",lucky);
            }
        }        
    },925);

    setTimeout(()=>{
        if(pinArray[1][ballSpot + 0] != "na"){
            if(!pinArray[1][ballSpot + 0].knocked){
                points += knockPin(pinArray[1][ballSpot + 0],"ballLeft",lucky);
            }
        }
        if(pinArray[1][ballSpot + 1] != "na"){
            if(!pinArray[1][ballSpot + 1].knocked){
                points += knockPin(pinArray[1][ballSpot + 1],"ballRight",lucky);
            }
        }        
    },950);

    setTimeout(()=>{
        if(pinArray[0][ballSpot + 0] != "na"){
            if(!pinArray[0][ballSpot + 0].knocked){
                points += knockPin(pinArray[0][ballSpot + 0],"ballLeft",lucky);
            }
        }
        if(pinArray[0][ballSpot + 1] != "na"){
            if(!pinArray[0][ballSpot + 1].knocked){
                points += knockPin(pinArray[0][ballSpot + 1],"ballRight",lucky);
            }
        }  

        //Coloca los puntos conseguidos en el array de puntuaciones
        if(turn!=10){  
            if(shot == 2 || points == 10){  //Segunda tirada           
                setTimeout(()=>{
                    if(points == 10 && shot == 1){
                        scores[activePlayer-1][turn-1].shot1 = 10;
                        scores[activePlayer-1][turn-1].span = scores[activePlayer-1][turn-1].shot1 + scores[activePlayer-1][turn-1].shot2;                                   
                        $(`#player${activePlayer} #turn${turn} #shot1`).css('opacity','1');
                    } else{
                        scores[activePlayer-1][turn-1].shot2 = points;
                        scores[activePlayer-1][turn-1].span = scores[activePlayer-1][turn-1].shot1 + scores[activePlayer-1][turn-1].shot2;
                        $(`#player${activePlayer} #turn${turn} #shot2`).css('opacity','1');
                    }
                    $(`#player${activePlayer} #turn${turn} span`).css('opacity','1');                

                    shot = 1;
                    pins(); //Resetea bolos
                    for(let i = 0;i < 10;i++){
                        $(`#p${i}`).css("opacity","1");    
                    }                

                    //Cambia jugador seleccionado
                    if(activePlayer != players){
                        activePlayer++;
                    }else{
                        activePlayer = 1;
                        turn++;
                    }

                    //Resetea el botón de lanzar y actualiza la tabla de puntuaciones
                    setTimeout(()=>{
                        $("#notThrow").attr("id","throw");
                        $("#throw").text("Lanzar");
                    },500);
                    updateScores();
                },1000);            
            }else{                          //Primera tirada
                scores[activePlayer-1][turn-1].shot1 = points;
                shot++;
                $(`#player${activePlayer} #turn${turn} #shot1`).css('opacity','1');
                setTimeout(()=>{
                    $("#notThrow").attr("id","throw");
                    $("#throw").text("Lanzar");
                },500);
                updateScores();
            }
        }else{
            if(shot < 4){            
                setTimeout(()=>{
                    if(shot == 1){
                        scores[activePlayer-1][9].shot1 = points;                        
                        $(`#player${activePlayer} #turnf #shot1`).css('opacity','1');
                    }else if(shot == 2){
                        scores[activePlayer-1][9].shot2 = points;                        
                        $(`#player${activePlayer} #turnf #shot2`).css('opacity','1');
                    }else if(shot == 3){
                        scores[activePlayer-1][9].shot3 = points;                        
                        $(`#player${activePlayer} #turnf #shot3`).css('opacity','1');
                    }

                    $(`#player${activePlayer} #turnf span`).css('opacity','1');                
                    
                    pins();
                    for(let i = 0;i < 10;i++){
                        $(`#p${i}`).css("opacity","1");    
                    }                

                    if(shot == 3){
                        activePlayer++;
                        shot = 1;
                    }else{
                        shot++;
                    }
                    setTimeout(()=>{
                        $("#notThrow").attr("id","throw");
                        $("#throw").text("Lanzar");
                    },500);                    
                    updateScores();
                    
                    if(activePlayer > players){ //El juego termina cuando el jugador seleccionado se sale de rango en el último turno
                        win();
                    }
                },1000);            
            }
        }
    },975);    
}

//Tumba cualquier bolo que encuentre la bola e intenta tumbar los bolos siguientes
//Devuelve la cantidad de bolos tumbados
function knockPin(pin,ballSide,lucky){
    let knocked = 1;
    pin.knocked = true;
    $(`#p${pin.spot}`).css("opacity","0.2");    

    if(pin.left!="none"){                
        switch(ballSide){   //Solo tira los bolos que estén en la dirección en la que haya golpeado la bola
            case "ballLeft":
                if((parseInt(Math.random()*2)==0 || lucky) && !pin.left.knocked){                    
                    knocked += knockPin(pin.left,ballSide,lucky);
                }
            break;
            case "ballRight":
                if((parseInt(Math.random()*2)==0 || lucky) && !pin.right.knocked){
                    knocked += knockPin(pin.right,ballSide,lucky);
                }
            break;
        }
    }

    return knocked;
}

function win(){
    let winner;
    if(scores[0][10] > scores[1][10]){
        winner = 1;
    }else{
        winner = 2;
    }
    let sweetAlert = document.createElement("div");
    sweetAlert.setAttribute("class","sweetAlert");
    sweetAlert.innerHTML=`
    <div>
        <div id='results'>
            <h1>Juego finalizado.<br>Ha ganado el jugador ${winner} con ${scores[winner-1][10]} puntos totales.</h1>
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
        $("body").text("");
        document.body.innerHTML=`<h2>Juego de Bolos</h2>`;
        createGame();
        activePlayer = 1
        turn = 1;
        shot = 1;
        pinArray;
        scores = new Array(players);
    });

    document.getElementById("abandon").addEventListener("click",()=>{
        sweetAlert.remove();
        window.close();
    });
}