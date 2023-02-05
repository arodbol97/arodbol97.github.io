import IconLibrary from "./IconLibrary.js";
import Enemy from "./Enemy.js";
import Player from "./Player.js";
import Castle from "./Castle.js";
import Rankings from "./Ranking.js";

export default class Map{    
    #size; //Tamaño mapa (size*size)
    #grid; //Array bidimensional
    #enem; //Array enemigos
    #icons=new IconLibrary();    
    #player;
    #castle;
    #time = 0;

    constructor(size){
        this.#size=size;
        this.#enem = new Array();

        this.mapStart();    //Inicializa grid y añade eventos
    }

    //getters

    get size()  {return this.#size;}
    get grid()  {return this.#grid;}
    get enem()  {return this.#enem;}
    get player(){return this.#player;}

    //inicializa grid
    mapStart(){
        let cp=parseInt(this.#size/2); //Centro del mapa
        this.#grid = new Array(this.#size);
    
        for (let y=0;y<this.#grid.length;y++){
            this.#grid[y]= new Array(this.#size);
            for (let x=0;x<this.#grid.length;x++){
                this.#grid[y][x]="";
            }
        }
    
        this.#player=new Player(cp-2,cp);//Jugador
        this.#grid[cp-2][cp]=this.#player.icon;         
        this.#castle=new Castle(cp,cp);
        this.#grid[cp][cp]=this.#castle.icon; //Castillo        
            
        this.addEvents();
        this.enemSpawn();        
        this.printMap();

        document.getElementById("legend").innerHTML = `
        <p class="legendItem">${this.#icons.player} : Caballero</p>
        <p class="legendItem">${this.#icons.castle1} : Castillo nivel 1</p>
        <p class="legendItem">${this.#icons.castle2} : Castillo nivel 2</p>
        <p class="legendItem">${this.#icons.castle3} : Castillo nivel 3</p>
        <div class="legendItem">${this.#icons.slime} : Slime
        <p>HP : 5 DMG : 2</p>
        </div>        
        <div class="legendItem">${this.#icons.skeleton} : Esqueleto
        <p>HP : 1 DMG : 10</p>
        </div>        
        <div class="legendItem">${this.#icons.ghost} : Fantasma
        <p>HP : 10 DMG : 2</p>
        </div>        
        <p class="legendItem">${this.#icons.potion} : Poción de salud</p>
        <p class="legendItem">${this.#icons.weapon} : Aumento de daño</p>
        `;
    }
    
    //Añade eventos de teclado
    addEvents(){
        document.addEventListener('keyup', (event) => {
            let name = event.key;        
            if (name === 'w') {
                this.move("up");
            }
            if (name === 'a') {
                this.move("left");
            }
            if (name === 's') {
                this.move("down");
            }
            if (name === 'd') {
                this.move("right");
            }
        });
        document.getElementById("buttonup").addEventListener("click",()=>{
            this.move("up");
        });
        document.getElementById("buttonleft").addEventListener("click",()=>{
            this.move("left");
        });
        document.getElementById("buttonright").addEventListener("click",()=>{
            this.move("right");
        });
        document.getElementById("buttondown").addEventListener("click",()=>{
            this.move("down");
        });
    }

    //Imprime grid
    printMap(){
        let print = document.getElementById("table");
        print.innerHTML="";
    
        for (let y=0;y<this.#grid.length;y++){
            let tr = print.appendChild(document.createElement("tr"));            
            for (let x=0;x<this.#grid.length;x++){
                let td = document.createElement("td");           //Tabla
                td.innerHTML=this.#grid[y][x];                   //Tabla
                td.setAttribute("id","cell/"+y+"/"+x);           //Tabla
                td.addEventListener("click",()=>{
                    this.click(y,x);
                })
                tr.appendChild(td);                              //Tabla
            }         
        }
        this.updateStats();
    }

    updateMap(){
        for (let y=0;y<this.#grid.length;y++){            
            for (let x=0;x<this.#grid.length;x++){
                let td = document.getElementById("cell/"+y+"/"+x);        
                td.innerHTML=this.#grid[y][x];                   //Tabla                
            }         
        }
        this.updateStats();
    }

    //actualizar stats
    updateStats(){        
        document.getElementById("hpstat").innerHTML = `HP : ${this.#player.hp}`;
        document.getElementById("hp").style.width = `${this.#player.hpbar}%`;
        document.getElementById("dmg").innerHTML = `DMG : ${this.#player.dmg}`;
        document.getElementById("score").innerHTML = `Puntos : ${this.#player.score}`;
        if(document.cookie.indexOf("highscore")!=-1){            
            let highscore = document.cookie.replace(/(?:(?:^|.*;\s*)highscore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            document.getElementById("highscore").innerHTML = `Record : ${highscore}`;
        }        
        document.getElementById("castlehpstat").innerHTML = `HP : ${this.#castle.hp}`;
        document.getElementById("castlehp").style.width = `${this.#castle.hpbar}%`;
        if(this.#castle.dmg!=0){
            document.getElementById("castledmg").innerHTML = `DMG : ${this.#castle.dmg}`;
        }

        Rankings.readRankings();
    }

    //Mueve al jugador
    // d = direccion
    move(d = "not"){
        let yp = this.#player.y,xp = this.#player.x;
    
        switch (d){
            case "up":
                if(yp>0) {   
                    if(this.#icons.enemies.includes(this.#grid[yp - 1][xp])){
                        if(this.enemFight(yp - 1,xp)){                            
                            this.#grid[yp - 1][xp] = "";                            
                        }                        
                    }else if(this.#grid[yp - 1][xp]==""||this.#icons.objects.includes(this.#grid[yp - 1][xp])){
                        this.#grid[yp][xp] = "";
                        this.#player.y--;
                        this.consumeObject(this.#grid[yp - 1][xp]);
                        this.#grid[yp - 1][xp] = this.#player.icon;
                    }                                  
                }
                break;
            case "left":
                if(xp>0) {                    
                    if(this.#icons.enemies.includes(this.#grid[yp][xp-1])){
                        if(this.enemFight(yp,xp-1)){                            
                            this.#grid[yp][xp-1]="";
                        }
                    } else if(this.#grid[yp][xp-1]==""||this.#icons.objects.includes(this.#grid[yp][xp-1])){
                        this.#grid[yp][xp]="";
                        this.#player.x--;
                        this.consumeObject(this.#grid[yp][xp-1]);
                        this.#grid[yp][xp-1]=this.#player.icon;
                    }
                }
                break;
            case "down":
                if(yp<this.#grid.length-1) {                    
                    if(this.#icons.enemies.includes(this.#grid[yp+1][xp])){
                        if(this.enemFight(yp+1,xp)){                            
                            this.#grid[yp+1][xp]="";
                        }
                    } else if(this.#grid[yp+1][xp]==""||this.#icons.objects.includes(this.#grid[yp + 1][xp])){
                        this.#grid[yp][xp] = "";
                        this.#player.y++;
                        this.consumeObject(this.#grid[yp+1][xp]);
                        this.#grid[yp + 1][xp] = this.#player.icon;
                    }
                }
                break;
            case "right":
                if(xp<this.#grid.length-1) {     
                    if(this.#icons.enemies.includes(this.#grid[yp][xp+1])){
                        if(this.enemFight(yp,xp+1)){                            
                            this.#grid[yp][xp+1]="";
                        }
                    } else if(this.#grid[yp][xp+1]==""||this.#icons.objects.includes(this.#grid[yp][xp+1])){               
                        this.#grid[yp][xp] = "";
                        this.#player.x++;
                        this.consumeObject(this.#grid[yp][xp+1]);
                        this.#grid[yp][xp + 1] = this.#player.icon;
                    }
                }
                break;
        }
        this.#time++;
        if(this.#time%5==0){
            this.enemSpawn();
        }
        
        if(this.#time%10==0){
            this.enemSpawn(new Enemy("skeleton",10,1,this.#icons.skeleton));
        }

        if(this.#time%50==0){
            this.enemSpawn(new Enemy("ghost",2,10,this.#icons.ghost));
        }

        if(this.#time%2==0){
            this.enemMove();
        }

        if(this.#time==25){
            this.spawnObject("archer");
        }

        if(this.#time==20){
            this.spawnObject("weapon");
        }

        if(this.#time==15){
            this.spawnObject("potion");
        }

        if(this.#player.score>29 && this.#castle.icon==this.#icons.castle1){
            this.#castle.hp+=20;
            this.#castle.icon=this.#icons.castle2;
            this.#grid[this.#castle.y][this.#castle.x]=this.#castle.icon;
        } else if(this.#player.score>59 && this.#castle.icon==this.#icons.castle2){
            this.#castle.hp+=20;
            this.#castle.icon=this.#icons.castle3;
            this.#grid[this.#castle.y][this.#castle.x]=this.#castle.icon;
        }        
        this.updateMap();

        if(this.#player.hp<1 || this.#castle.hp<1){
            this.lose();
        }
    }
    
    //Añade un boton (coodenada, coordenada, texto de boton, funcion que activa el boton)
    addButton(y=-1,x=-1,title="",funct=""){    
        for (let i=0;i<this.#grid.length;i++){
            for (let e=0;e<this.#grid.length;e++){
                if(i==y&&e==x){
                    let td = document.getElementById("cell/"+y+"/"+x);
                    td.innerHTML = "";
    
                    let button = document.createElement("button");
                    button.innerHTML = title;
                    button.setAttribute("id","btn/"+i+"/"+e);
                    button.setAttribute("class","mapBttn");
                    if(funct!=""){
                        button.setAttribute("onclick",funct);
                    }
    
                    td.appendChild(button);
                }
            }
        }
    }
   
    enemSpawn(e=new Enemy("slime",2,5,this.#icons.slime)){

        let eY=0,eX=0;

        do{
            eY = parseInt(Math.random()*this.#size);
            eX = parseInt(Math.random()*this.#size);
        }while(this.#grid[eY][eX]!=="");

        e.y=eY;
        e.x=eX;
        this.#grid[e.y][e.x]=e.icon;
        this.#enem.push(e);
    }

    /*Jugador golpea enemigo*/
    enemFight(y,x){
        let killed = false;
        let enemy = 0;        
        document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: rgb(250, 106, 106)");
        setTimeout(()=>{
            document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: white");
        },"100");  
        this.#enem.forEach(e => {
            if(e.y==y && e.x==x){
                enemy = e;
            }
        });        
        if(enemy!=0){
            enemy.hp -= this.#player.dmg;            
            if(enemy.hp>0){
                this.#player.hp -= enemy.dmg;
                document.getElementById("cell/"+this.#player.y+"/"+this.#player.x).setAttribute("style", "background-color: rgb(250, 106, 106)");
                setTimeout(()=>{
                    document.getElementById("cell/"+this.#player.y+"/"+this.#player.x).setAttribute("style", "background-color: white");
                },"100");  
            } else {
                killed = true;
                this.#player.score += enemy.dmg;
                if(enemy.name=="skeleton"){
                    this.#player.takeArrow();
                }
                this.#enem.splice(this.#enem.indexOf(enemy),1);                                
                if(this.#player.score>59){
                    this.#castle.hp++;
                }
            }
        }

        return killed;
    }

    /*Enemigo golpea a jugador*/
    playerFight(y,x){
        let killed = false;
        let enemy = 0;
        document.getElementById("cell/"+this.#player.y+"/"+this.#player.x).setAttribute("style", "background-color: rgb(250, 106, 106)");
        setTimeout(()=>{
            document.getElementById("cell/"+this.#player.y+"/"+this.#player.x).setAttribute("style", "background-color: white");
        },"100");  

        this.#enem.forEach(e => {
            if(e.y==y && e.x==x){
                enemy = e;
            }
        });

        if(enemy!=0){
            this.#player.hp = this.#player.hp - enemy.dmg;
            if(this.#player.hp>0){              
                enemy.hp = enemy.hp - this.#player.dmg;
                document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: rgb(250, 106, 106)");
                setTimeout(()=>{
                    document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: white");
                },"100");  
            } 
            if(enemy.hp<1){
                killed = true;
                this.#player.score += enemy.dmg;  
                if(enemy.name=="skeleton"){
                    this.#player.takeArrow();
                }                                           
            }
        }
        
        return killed;
    }

        /*Enemigo golpea a castillo*/
        castleFight(y,x){
            let killed = false;
            let enemy = 0;
            document.getElementById("cell/"+this.#castle.y+"/"+this.#castle.x).setAttribute("style", "background-color: rgb(250, 106, 106)");
            setTimeout(()=>{
                document.getElementById("cell/"+this.#castle.y+"/"+this.#castle.x).setAttribute("style", "background-color: white");
            },"100");  
    
            this.#enem.forEach(e => {
                if(e.y==y && e.x==x){
                    enemy = e;
                }
            });
    
            if(enemy!=0){
                this.#castle.hp = this.#castle.hp - enemy.dmg;
                if(this.#castle.hp>0 && this.#castle.dmg>0){
                    enemy.hp = enemy.hp - this.#castle.dmg;
                    document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: rgb(250, 106, 106)");
                    setTimeout(()=>{
                        document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: white");
                    },"100");  
                    if(enemy.hp<1){
                        killed = true;
                        this.#player.score += enemy.dmg;
                    }
                }
            }
            return killed;
        }

    enemMove(){
        this.#enem.forEach(enemy => {
            if(parseInt(Math.random()*2)==1){
                if(enemy.y<this.#castle.y){
                    if(this.#grid[enemy.y+1][enemy.x]==""){
                        this.#grid[enemy.y][enemy.x]="";
                        enemy.y++;
                        this.#grid[enemy.y][enemy.x]=enemy.icon;
                    } else if(enemy.y+1==this.#player.y && enemy.x==this.#player.x) {
                        this.playerFight(enemy.y,enemy.x);                        
                    } else if(enemy.y+1==this.#castle.y && enemy.x==this.#castle.x) {
                        this.castleFight(enemy.y,enemy.x);
                    }
                } else {
                    if(this.#grid[enemy.y-1][enemy.x]==""){
                        this.#grid[enemy.y][enemy.x]="";
                        enemy.y--;
                        this.#grid[enemy.y][enemy.x]=enemy.icon;
                    } else if(enemy.y-1==this.#player.y && enemy.x==this.#player.x) {
                        this.playerFight(enemy.y,enemy.x);                        
                    } else if(enemy.y-1==this.#castle.y && enemy.x==this.#castle.x) {
                        this.castleFight(enemy.y,enemy.x);                        
                    }
                }
            } else {
                if(enemy.x<this.#castle.x){
                    if(this.#grid[enemy.y][enemy.x+1]==""){
                        this.#grid[enemy.y][enemy.x]="";
                        enemy.x++;
                        this.#grid[enemy.y][enemy.x]=enemy.icon;
                    } else if(enemy.y==this.#player.y && enemy.x+1==this.#player.x) {
                        this.playerFight(enemy.y,enemy.x);                        
                    } else if(enemy.y==this.#castle.y && enemy.x+1==this.#castle.x) {
                        this.castleFight(enemy.y,enemy.x);                        
                    }
                } else {
                    if(this.#grid[enemy.y][enemy.x-1]==""){
                        this.#grid[enemy.y][enemy.x]="";
                        enemy.x--;
                        this.#grid[enemy.y][enemy.x]=enemy.icon;
                    } else if(enemy.y==this.#player.y && enemy.x-1==this.#player.x) {
                        this.playerFight(enemy.y,enemy.x);                        
                    } else if(enemy.y==this.#castle.y && enemy.x-1==this.#castle.x) {
                        this.castleFight(enemy.y,enemy.x);                        
                    }
                }
            }
        });
        this.corpseClean();
    }

    corpseClean(){
        for (let y=0;y<this.#grid.length;y++){            
            for (let x=0;x<this.#grid.length;x++){
                let corpse = 0;        
                if(this.#icons.enemies.includes(this.#grid[y][x])){
                    this.#enem.forEach(e => {
                        if(e.y==y && e.x==x && e.hp<1){
                            corpse = e;
                        }
                    });
                    if(corpse!=0){
                        this.#grid[y][x] = "";
                        this.#enem.splice(this.#enem.indexOf(corpse),1);  
                    }
                }
            }         
        }        
    }

    spawnObject(type){
        let y=0,x=0;

        do{
            y = parseInt(Math.random()*this.#size);
            x = parseInt(Math.random()*this.#size);
        }while(this.#grid[y][x]!=="");

        if(type=="potion"){
            this.#grid[y][x]=this.#icons.potion;
        }    
        if(type=="weapon"){
            this.#grid[y][x]=this.#icons.weapon;
        }        
        if(type=="archer"){
            this.#grid[y][x]=this.#icons.archer;
        }        
    }

    consumeObject(type){
        if(type==this.#icons.potion){
            this.#player.hp+=20;
            this.spawnObject("potion");
        }    
        if(type==this.#icons.weapon){
            this.#player.dmg+=1;
            this.spawnObject("weapon");
        }        
        if(type==this.#icons.archer){
            this.#castle.dmg+=1;
            this.spawnObject("archer");
        }        
    }

    click(y,x){
        if(this.#icons.enemies.includes(this.#grid[y][x]) && this.#player.arrows>0){ //if flecha
            let killed = false;
            let enemy = 0;        
            document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: rgb(250, 106, 106)");
            setTimeout(()=>{
                document.getElementById("cell/"+y+"/"+x).setAttribute("style", "background-color: white");
            },"100");  
            this.#enem.forEach(e => {
                if(e.y==y && e.x==x){
                    enemy = e;
                }
            });        
            if(enemy!=0){
                enemy.hp -= this.#player.dmg;            
                if(enemy.hp<1){
                    killed = true;
                    this.#player.score += enemy.dmg;
                    this.#enem.splice(this.#enem.indexOf(enemy),1);                                
                    this.#grid[y][x]="";
                    if(this.#player.score>59){
                        this.#castle.hp++;
                    }
                }
            }
            this.#player.takeArrow(-1);
            this.updateMap();
        }            
    }
    

    lose(){
        document.getElementById("divTable").innerHTML = `<h1>Has muerto</h1><br><h2>Puntuación: ${this.#player.score}</h2>`;                
        document.getElementById("tutorial").innerHTML = `<button class="info retry" onclick="recargar()">Volver a intentar</button>`;                
        document.getElementById("phonebuttons").innerHTML = ``;                
        if(document.cookie.indexOf("highscore")==-1){
            document.cookie = `highscore=${this.#player.score}`;
        }else{
            let highscore = document.cookie.replace(/(?:(?:^|.*;\s*)highscore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if(highscore<this.#player.score){
                document.cookie = `highscore=${this.#player.score}`;
                highscore = this.#player.score;
                document.getElementById("tutorial").innerHTML = `<button class="info retry" id="postRecord">Añadir a ranking</button>`;
                document.getElementById("postRecord").addEventListener("click",()=>{
                    
                })
            }
            document.getElementById("divTable").innerHTML += `<br><h2>Puntuación mayor: ${highscore}</h2>`;
        }
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
}