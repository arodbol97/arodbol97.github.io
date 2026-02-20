export default class game {
    #size = 11;
    #grid;
    #cp;
    #tiles = [];
    #meeples = [];
    
    constructor(){
        let cp=parseInt(this.#size/2); //Centro del mapa
        this.#grid = new Array(this.#size);
    
        for (let y=0;y<this.#grid.length;y++){
            this.#grid[y]= new Array(this.#size);
            for (let x=0;x<this.#grid.length;x++){
                this.#grid[y][x]="";
            }
        }
    }
    
    start(){
        this.printMap();
    }
    printMap(){        
        const container = document.getElementById("game-container");
        container.innerHTML = "";

        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";

        for (let y = 0; y < this.#grid.length; y++){
            const row = document.createElement("tr");

            for (let x = 0; x < this.#grid[y].length; x++){
                const cell = document.createElement("td");
                cell.textContent = this.#grid[y][x] || "";
                cell.style.width = "30px";
                cell.style.height = "30px";
                cell.style.border = "1px solid black";
                cell.style.textAlign = "center";
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        container.appendChild(table);
    }
}