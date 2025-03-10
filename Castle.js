import IconLibrary from "./IconLibrary.js";
export default class Castle{
#icons = new IconLibrary();
#hp;
#maxhp = 100;
#hpbar;
#dmg = 0;
#icon;
#y;
#x;

constructor(y , x , h=this.#maxhp , i = this.#icons.castle1){
    this.#y=y;
    this.#x=x;
    this.#hp=h;        
    this.#icon=i;
}

//getters

get hp()    {return this.#hp;}
get maxhp()    {return this.#maxhp;}
get hpbar()    {return this.#hpbar;}
get dmg()  {return this.#dmg;}
get icon()  {return this.#icon;}
get y()     {return this.#y;}
get x()     {return this.#x;}

//setters

set hp(h)   {
    if(h>this.#maxhp){
        this.#hp=this.#maxhp;
    }else{
        this.#hp=h;
    }
    this.#hpbar=this.#hp/this.#maxhp*100;
    if(this.#hpbar>100){
        this.#hpbar=100;
    }
}
set dmg(i) {this.#dmg=i;}
set icon(i) {this.#icon=i;}
set y(y)    {this.#y=y;}
set x(x)    {this.#x=x;}
}