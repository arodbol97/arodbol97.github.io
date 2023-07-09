export default class IconLibrary{
    #player="<img class='icon' src='img/player.png'>"; //Icono jugador
    #enemy="<img class='icon' src='img/enemy.png'>"; //Icono enemigo
    #boss="<img class='icon' src='img/boss.png'>"; //Icono jefe

    constructor(){
        
    }

    get player() {return this.#player;}
    get enemy() {return this.#enemy;}
    get boss() {return this.#boss;}
}