import IconLibrary from "./IconLibrary.js";
export default class Player{
#icons = new IconLibrary();
#hp;
#maxhp = 100;
#hpbar;
#dmg;
#score;
#arrows = 0;
#icon;
#y;
#x;

constructor(y = 0,x = 0,h = this.#maxhp, d = 3,s = 0,i = this.#icons.player){
    this.#y=y;
    this.#x=x;
    this.#hp=h;
    this.#dmg=d;
    this.#score=s;    
    this.#icon=i;
}

//getters

get hp()    {return this.#hp;}
get maxhp()    {return this.#maxhp;}
get hpbar()    {return this.#hpbar;}
get dmg()   {return this.#dmg;}
get score() {return this.#score;}
get arrows() {return this.#arrows;}
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
}
set dmg(d)  {this.#dmg=d;}
set score(s){this.#score=s;}
set arrows(s){this.#arrows=s;}
set icon(i) {this.#icon=i;}
set y(y)    {this.#y=y;}
set x(x)    {this.#x=x;}

takeArrow(num=1){
    if(num==1){
        this.#arrows++;        
        document.getElementById("arrows").innerHTML+=this.#icons.arrow;
    }else if(num==-1 && this.arrows>0){
        this.#arrows--;        
        let arrow = document.querySelector("#arrows img");
        document.getElementById("arrows").removeChild(arrow);
    }    
}
}