"use strict"
let gameSize = 600;                             //Tamaño del mapa
let x = gameSize/2, y = x;                      //Coordenadas iniciales
let movex = 0, movey = 0;                       //Movimiento que va a hacer el jugador
let w = false, a = false, s = false, d = false; //Dirección en que se va a mover el jugador
let player = $(".red");                         //Jugador
let pTop, pLeft;                                //Coordenadas del jugador
let bulletId=0;                                 //Contador de balas
let enemyId=0;                                  //Contador de enemigos
let enemyIntervals=[];
let points = 0;



$(function(){
    $("#game").css({width:gameSize,height:gameSize});   //Configura el tamaño del mapa
    $("span").text(points);
    playerMovement();                                   //Configura el movimiento del personaje
    keyEvents();                                        //Prepara los eventos del teclado
    mouseEvents();                                      //Prepara los eventos del ratón
    chunkSpawn();      
    checkHit();                                 //Rellena el mapa
});



function playerMovement(){
    setInterval(()=>{
        x += movex;                                     //Cantidad que se va a mover
        y += movey;

        if (w){                                         //Prepara el movimiento de la siguiente ejecución del intervalo
            movey=-14;                                  //w,a,s,d son booleans que cambian en la función keyEvents
        }
        if(a){
            movex=-14;
        }
        if(s){
            movey=14;
        }
        if(d){
            movex=14;
        }

        if(x < 0){                                      //Si el jugador choca contra la pared deja de moverse
            x = 0;
        }
        if(y < 0){
            y = 0;
        }
        if(x>gameSize-$(".red").width()){
            x=gameSize-$(".red").width();
        }
        if(y>gameSize-$(".red").height()){
            y=gameSize-$(".red").height();
        }

        if(movex > 0){                                  //El jugador se desliza al parar
            movex-=2;                                   //reduciendo el movimiento con cada ejecución del intervalo
        }
        if(movex < 0){
            movex+=2;
        }
        if(movey > 0){
            movey-=2;
        } else if(movey < 0){
            movey+=2;
        }

        $(".red").css({top:y,left:x});                  //Mueve al jugador

        pTop = parseInt($(".red").position().top);
        pLeft = parseInt($(".red").position().left);     
    },100);
}

function keyEvents(){                   /*--- Eventos del teclado ---*/
    $("body").keydown(function(e){      //Cuando la tecla se pulsa cambia su respectivo boolean a true
        if (e.keyCode == 87){
            w = true;
        } else if(e.keyCode == 65){
            a = true;
        } else if(e.keyCode == 83){
            s = true;
        } else if(e.keyCode == 68){
            d = true;
        }
    });

    $("body").keyup(function(e){        //Cuando la tecla se deja de pulsar cambia su respectivo boolean a false
        if (e.keyCode == 87){
            w = false;
        } else if(e.keyCode == 65){
            a = false;
        } else if(e.keyCode == 83){
            s = false;
        } else if(e.keyCode == 68){
            d = false;
        }
    });
}

function mouseEvents(){                                                             /*--- Eventos del ratón ---*/
    $("body").mousemove(function(e){                                                //Al mover el ratón:
        let playerPos = {x:pLeft+$(".red").width()/2,y:pTop+$(".red").height()/2};  //Guarda las coordenadas del jugador
        let angle = Math.atan2(e.pageY-playerPos.y,e.pageX-playerPos.x);            //Calcula el ángulo de rotación entre jugador y ratón
        $(".red").css("transform",`rotate(${angle}rad)`);                           //Rota al jugador
    });

    $("#game").click(function(e){                                                   //Al hacer click:        
        let bullet = $(`<div class='bullet' id='bullet${bulletId}' style="top:${pTop+$(".red").height()/2}px;left:${pLeft+$(".red").width()/2}px"></div>`);        
        $("#game").append(bullet);                                                  //Crea la bala

        let playerPos = {x:pLeft+$(".red").width()/2,y:pTop+$(".red").height()/2};  //Guarda las coordenadas del jugador
        let angle = Math.atan2(e.pageY-playerPos.y,e.pageX-playerPos.x);            //Calcula el ángulo de rotación entre jugador y ratón
        $(bullet).css("transform",`rotate(${angle}rad)`);                           //Rota la bala
        let thisId = "bullet"+bulletId;                                             //Prepara la id que se usará en el intervalo


        let interval = setInterval(()=>{                                            //Intervalo que mueve la bala:
            let interBullet = $(".bullet#"+thisId);                                 //Guarda la bala en una variable

            let oldX = $(interBullet).position().left;                              //Posiciones originales de la bala
            let oldY = $(interBullet).position().top;

            let angleX = e.pageX-playerPos.x;                                       //Cantidad que se va a mover la bala
            let angleY = e.pageY-playerPos.y;                                       //(calcula la posición del ratón relativa al jugador en el momento de disparar)

            if(Math.abs(angleX)>Math.abs(angleY)){                                  //Limita la velocidad de la bala con una regla de tres
                let aux = 50;
                if(angleX<0){
                    aux = -aux;
                }
                angleY = (aux * angleY) /angleX;
                angleX = aux;
            }else{
                let aux = 50;
                if(angleY<0){
                    aux = -aux;
                }
                angleX = (aux * angleX) /angleY;
                angleY = aux;
            }

            let newX = oldX+angleX;                                                 //Nueva posición de la bala
            let newY = oldY+angleY;

            $(interBullet).css({top:newY,left:newX});                               //Coloca la bala
                                                                                    
            if(($(interBullet).width()/2+$(interBullet).position().left > gameSize+$("#game").offset().left)
            || ($(interBullet).height()/2+$(interBullet).position().top > gameSize+$("#game").offset().top)
            || $(interBullet).width()/2+$(interBullet).position().left <0+$("#game").offset().left
            || $(interBullet).height()/2+$(interBullet).position().top <0+$("#game").offset().top){
                $(interBullet).remove();                                            //Si la bala choca contra la pared desaparece
                clearInterval(interval);                                            //y se cierra el intervalo
            }
        },100);
        bulletId++;                                                                 //Aumenta el contador de balas
    });
}

function chunkSpawn(){                              /*--- Rellena el mapa ---*/
    for(let i=0;i<25;i++){                          //Genera 25 árboles
        let tree = $(`
        <img class='clutter' id='tree' style="top:${(Math.random()*gameSize-5)+$("#game").offset().top}px;left:${(Math.random()*gameSize-5)+$("#game").offset().left}px" src='assets/img/tree.png'>`);
        $("#game").append(tree);        
    }
                                                    //Coloca el portal
    let portal = $(`
    <img class='clutter' id='portal' style="top:${(Math.random()*gameSize-5)+$("#game").offset().top}px;left:${(Math.random()*gameSize-5)+$("#game").offset().left}px" src='assets/img/portal.png'>`);
    $("#game").append(portal);
    
    let portalInterval = setInterval(function(e){   //Intervalo del portal:
        enemySpawn();                               //Genera un enemigo cada 5 segundos
    },2000);
}

function enemySpawn(){              /*--- Genera un enemigo ---*/
    let enemy = $(`<img class='enemy' id='enemy${enemyId}' style="top:${$("#portal").offset().top}px;left:${$("#portal").offset().left}px" src='assets/img/skeleton.png'>`);
    $("#game").append(enemy);       //Genera el enemigo
    enemyMove(enemy);               //Le da movimiento
}

function enemyMove(enemy){                                                      /*--- Configura el movimiento de los enemigos ---*/
    let playerPos = {                                                           //Guarda la posición del jugador
        x:pLeft+$(".red").width()/2,
        y:pTop+$(".red").height()/2
    };
    let enemyPos = {                                                            //Guarda la posición del enemigo
        x:$(enemy).position().left+$(enemy).width()/2,
        y:$(enemy).position().top+$(enemy).height()/2
    };
    
    let thisId = "enemy"+enemyId;                                               //Prepara la id que se usará en el intervalo
    let enemyMoveX = 0;
    let enemyMoveY = 0;
    let maxSpeed = 15;
    let acceleration = 1;

    let interval = setInterval(()=>{                                            //Intervalo de movimiento del enemigo:
        playerPos = {                                                           //Guarda la posición del jugador
            x:parseInt(pLeft+$(".red").width()/2),
            y:parseInt(pTop+$(".red").height()/2)
        };                                                                      //Guarda la posición del enemigo
        enemyPos = {
            x:parseInt($(enemy).position().left+$(enemy).width()/2),
            y:parseInt($(enemy).position().top+$(enemy).height()/2)
        };

        let angle = Math.atan2(playerPos.y-enemyPos.y,playerPos.x-enemyPos.x);  //Calcula el ángulo entre jugador y enemigo
        $(enemy).css("transform",`rotate(${angle-1.5}rad)`);                    //rota al enemigo
        let interEnemy = $(".enemy#"+thisId);                                   //Guarda al enemigo en una variable

        let oldX = enemyPos.x;                               //Posición del enemigo al comienzo del bucle
        let oldY = enemyPos.y;
        let angleX = playerPos.x-enemyPos.x;                                    //Distancia que se va a mover
        let angleY = playerPos.y-enemyPos.y;
        if(angleX < 0){
            if(enemyMoveX > -maxSpeed){
                enemyMoveX-=acceleration;
            }            
        }else{
            enemyMoveX+=acceleration;
        }
        if(angleX > 0){
            if(enemyMoveX < maxSpeed){
                enemyMoveX+=acceleration;
            }            
        }else{
            enemyMoveX-=acceleration;
        }
        if(angleY < 0){
            if(enemyMoveY > -maxSpeed){
                enemyMoveY-=acceleration;
            }            
        }else{
            enemyMoveY+=acceleration;
        }
        if(angleY > 0){
            if(enemyMoveY < maxSpeed){
                enemyMoveY+=acceleration;
            }            
        }else{
            enemyMoveY-=acceleration;
        }

        let newX = oldX+enemyMoveX-$(enemy).width()/2;                                                 //Nueva posición del enemigo al final del bucle
        let newY = oldY+enemyMoveY-$(enemy).height()/2;

        $(interEnemy).css({top:newY,left:newX});                                //CColoca al enemigo
    },100);  
    enemyIntervals[enemyId] = interval;  
    enemyId++;                                                                  //Aumenta el contador de enemigos
}

function checkHit(){    /*--- Eventualmente comprobará si la bala golpea al enemigo ---*/
    setInterval(()=>{
        $(".bullet").each(function(){ 
            let bulletX = parseInt($(this).offset().left+$(this).width()/2);
            let bulletY = parseInt($(this).offset().top+$(this).height()/2);            
            
            $(".enemy").each(function(){                
                let enemy = {
                    top:$(this).offset().top,
                    bottom:$(this).offset().top+$(this).width(),
                    left:$(this).offset().left,
                    right:$(this).offset().left+$(this).width()
                };
                let hit = false;
                let thisId = this.id.slice(5,6);

                if(bulletY < enemy.bottom
                && bulletY > enemy.top
                && bulletX > enemy.left
                && bulletX < enemy.right){
                    hit=true;
                }

                if(hit){
                    $(this).remove();
                    clearInterval(enemyIntervals[thisId]);        
                    points++;
                    $("span").text(points);            
                }
            });            
        });        
    },10);
}