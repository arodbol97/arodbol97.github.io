export default class Enemy{
    #name;
    #dmg;   //damage
    #hp;    //health
    #icon;
    #y;     //coordsY
    #x;     //coordsX

    constructor(n,d,h,i){
        this.#name=n;
        this.#dmg=d;
        this.#hp=h;
        this.#icon=i;
    }

    //getter
    get name()  {return this.#name;}
    get dmg()   {return this.#dmg;}
    get hp()    {return this.#hp;}
    get icon()  {return this.#icon;}
    get y()     {return this.#y;}
    get x()     {return this.#x;}

    //setter
    set name(value){
        this.#name=value;
    }
    set dmg(value){
        this.#dmg=value;
    }
    set hp(value){
        this.#hp=value;
    }
    set y(value){
        this.#y=value;
    }
    set x(value){
        this.#x=value;
    }

    //toString
    toString(){
        return `Enemy ${this.#name} has ${this.#hp} health points and deals ${this.#dmg} damage`;
    }
}