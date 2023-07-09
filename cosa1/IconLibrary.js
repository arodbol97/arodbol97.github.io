export default class IconLibrary{
    #player="<img class='icon' src='img/player.png'>"; //Icono jugador
    #castle1="<img class='icon' src='img/castillo1.png'>"; //Icono castillo 1
    #castle2="<img class='icon' src='img/castillo2.png'>"; //Icono castillo 2
    #castle3="<img class='icon' src='img/castillo3.png'>"; //Icono castillo 3
    #slime="<img class='icon' src='img/slime.png'>"; //Icono slime
    #ghost="<img class='icon' src='img/ghost.png'>"; //Icono fantasma
    #skeleton="<img class='icon' src='img/skeleton.png'>"; //Icono esqueleto
    #potion="<img class='icon' src='img/potion.png'>"; //Icono pocion
    #weapon="<img class='icon' src='img/weapon.png'>"; //Icono arma
    #archer="<img class='icon' src='img/archer.png'>"; //Icono arquero
    #enemies = new Array(this.#slime,this.#skeleton,this.#ghost);
    #objects = new Array(this.#potion,this.#weapon,this.#archer);

    constructor(){
        
    }

    get player()    {return this.#player;}
    get castle1()   {return this.#castle1;}
    get castle2()   {return this.#castle2;}
    get castle3()   {return this.#castle3;}
    get slime()     {return this.#slime;}
    get ghost()     {return this.#ghost;}
    get skeleton()  {return this.#skeleton;}
    get potion()    {return this.#potion;}
    get weapon()    {return this.#weapon;}
    get archer()    {return this.#archer;}
    get enemies()   {return this.#enemies;}
    get objects()   {return this.#objects;}
}