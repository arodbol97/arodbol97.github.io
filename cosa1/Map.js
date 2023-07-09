import IconLibrary from "./IconLibrary.js";
import Enemy from "./Enemy.js";
import Player from "./Player.js";

export default class Map{    
    #size; //Tamaño mapa (size*size)
    #grid; //Array bidimensional
    #enem; //Array enemigos
    #icons=new IconLibrary();
    #player;

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
    
        this.#grid[cp][cp]=this.#icons.player; //Jugador
        this.#player=new Player(cp,cp);
    
        this.addEvents();
        this.enemSpawn();
        this.printMap();
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
            if (name === 't') {
                this.teleport1();
            }
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
                tr.appendChild(td);                              //Tabla
            }         
        }    
    }

    //Mueve al jugador
    // d = direccion
    move(d = "not"){
        let yp = this.#player.y,xp = this.#player.x;
    
        switch (d){
            case "up":
                if(yp>0) {   
                    if(this.#grid[yp - 1][xp]==this.#icons.enemy){
                        
                    }else{
                        this.#grid[yp][xp] = "";
                        this.#player.y--;
                        this.#grid[yp - 1][xp] = this.#icons.player;
                    }                                  
                }
                break;
            case "left":
                if(xp>0) {                    
                    this.#grid[yp][xp]="";
                    this.#player.x--;
                    this.#grid[yp][xp-1]=this.#icons.player;
                }
                break;
            case "down":
                if(yp<this.#grid.length-1) {                    
                    this.#grid[yp][xp] = "";
                    this.#player.y++;
                    this.#grid[yp + 1][xp] = this.#icons.player;
                }
                break;
            case "right":
                if(xp<this.#grid.length-1) {                    
                    this.#grid[yp][xp] = "";
                    this.#player.x++;
                    this.#grid[yp][xp + 1] = this.#icons.player;
                }
                break;
        }
    
        this.printMap();
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
    
    //Borra un boton (coordenada, coordenada, texto que deja en su lugar)
    rmButton(y=-1,x=-1,title=""){    
        for (let i=0;i<this.#grid.length;i++){
            for (let e=0;e<this.#grid.length;e++){
                if(i==y&&e==x){
                    let td = document.getElementById("cell/"+y+"/"+x);                
                    this.#grid[i][e] = title;
                }
            }
        }
    }
    
    //Primera fase del metodo teletransporte: Seleccionar destino
    teleport1(){
        for (let i=0;i<this.#grid.length;i++){
            for (let e=0;e<this.#grid.length;e++){
                this.addButton(i,e,"","teleport(this.id)");
            }
        }
    }
    
    //Segundo fase del metodo teletransporte: Borrar botones de selección (id boton seleccionado)
    teleport2(idButton = "btn/0/0"){    
        let coords = idButton.split("/");    
        for (let i=0;i<this.#grid.length;i++){
            for (let e=0;e<this.#grid.length;e++){
                if(i==coords[1] && e==coords[2]){
                    this.rmButton(i,e,this.#icons.player);
                }else{
                    this.rmButton(i,e);
                }            
            }
        }
        this.printMap();
    }

    enemSpawn(e=new Enemy("slime",2,5)){

        let eY=0,eX=0;

        do{
            eY = parseInt(Math.random()*this.#size);
            eX = parseInt(Math.random()*this.#size);
        }while(this.#grid[eY][eX]!=="");

        e.y=eY;
        e.x=eX;
        this.#grid[e.y][e.x]=this.#icons.enemy;
        this.#enem.push(e);        
    }
}