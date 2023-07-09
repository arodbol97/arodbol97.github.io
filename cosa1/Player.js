
export default class Player{
#hp;
#dmg;
#score;
#y;
#x;

constructor(y = 0,x = 0,h = 100, d = 3,s = 0){
    this.#y=y;
    this.#x=x;
    this.#hp=h;
    this.#dmg=d;
    this.#score=s;    
}

//getters

get hp()    {return this.#hp;}
get dmg()   {return this.#dmg;}
get score() {return this.#score;}
get y()     {return this.#y;}
get x()     {return this.#x;}

//setters

set hp(h)   {this.#hp=h;}
set dmg(d)  {this.#dmg=d;}
set score(s){this.#score=s;}
set y(y)    {this.#y=y;}
set x(x)    {this.#x=x;}
}