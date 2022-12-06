const CELL_SIZE = 15;
const OFF_SET = 20;

const canvas = document.getElementById('canvas');

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

canvas.width = (windowWidth*0.78 - OFF_SET) - (windowWidth*0.78) % CELL_SIZE;
canvas.height = (window.innerHeight) - window.innerHeight % CELL_SIZE;

const stage = new createjs.Stage(canvas);

class Cell{
    constructor(canvas){
        this.canvas = canvas;
        this.state = 1; // state is whether or not the cell is dead or alive.
        this.color = 'lime';
        this.xPos = 0;
        this.yPos = 0;
        this.cellShape = new createjs.Shape();
        this.cell = this.cellShape.graphics;
        this.backgroudColor = 'black';
        this.called = 0;
        this.number_of_neighours_living = 0;
        this.cmdColor = null;
        this.cmdStroke = null;
        
    }

    update(){
        if (this.state) {
            this.cmdColor.style = this.color;
            this.cmdStroke.style = this.backgroudColor;
        } else {
           this.cmdColor.style = this.backgroudColor;
           this.cmdStroke.style = this.color;
        }
        this.number_of_neighours_living = 0;
    }

    init(x, y){
        if(!this.called){
            this.xPos = x; this.yPos = y;
            if (this.state) {
                this.cmdColor = this.cell.beginFill(this.color).command;
                this.cmdStroke = this.cell.beginStroke(this.color).command;
            } else {
                this.cmdColor = this.cell.beginFill(this.backgroudColor).command;
                this.cmdStroke = this.cell.beginStroke(this.color).command;
            }
            this.cell.drawRect(this.xPos, this.yPos, CELL_SIZE, CELL_SIZE);

            this.update();
            this.canvas.addChild(this.cellShape);
            // this.cellShape.cache(this.xPos, this.yPos, CELL_SIZE, CELL_SIZE);
            this.called = 1;
            return this.cellShape;
        }
        return this.cellShape;
    }

    init(){
        if(!this.called){
            if (this.state) {
                this.cmdColor = this.cell.beginFill(this.color).command;
                this.cmdStroke= this.cell.beginStroke(this.color).command;
            } else {
                this.cmdColor = this.cell.beginFill(this.backgroudColor).command;
                this.cmdStroke =  this.cell.beginStroke(this.color).command;
            }
            this.cell.drawRect(this.xPos, this.yPos, CELL_SIZE, CELL_SIZE); 
            // this.cellShape.cache(this.xPos, this.yPos, CELL_SIZE, CELL_SIZE);
            this.update();
            this.canvas.addChild(this.cellShape);
            this.called = 1;
            return this.cellShape;
        }
        return this.cellShape;
    }

    setXPos(x){this.xPos = x;}
    setYPos(y){this.yPos = y;}

    setState(state){this.state = state;}
    getState(){ return this.state;}

    setColor(color){this.color = color;}

    setLiveN(n){this.number_of_neighours_living = n;}
    getLiveN(){return this.number_of_neighours_living;}
}


class Grid{
    constructor(canvas){
        this.x_offset=0;
        this.y_offset=0;
        this.stage = canvas;

        this.state_grid = Array(Number(this.stage.canvas.width));

        
        this.cells = [];
        // Initialize cells
        for(let r=0; r<this.stage.canvas.width/CELL_SIZE; r++){
            let row = [];
            for(let x=0; x<this.stage.canvas.width/CELL_SIZE;x++){
                let cell = new Cell(this.stage);
                cell.state = false;
                cell.setXPos(x*CELL_SIZE);
                cell.setYPos(r*CELL_SIZE);
                let c = cell.init();
                c.addEventListener('click', (e)=>{
                    cell.state = !cell.state;
                    cell.update();
                    // c.updateCache();
                    if(createjs.Ticker.paused){
                        this.stage.update();
                    }
                });
                row.push(cell);
            }
            this.cells.push(row);
        }
    }

    setState(state){
        console.log("state changed");
        this.state_grid = [... state];
    }
    getState(){return this.state_grid;}

    getGrid(){return this.cells;}
    loadState(){
        for(let r=this.y_offset; r<this.cells.length; r++){
            for(let x=this.x_offset; x<this.cells[r].length; x++){
                    this.cells[r-this.y_offset][x-this.x_offset].setState(this.state_grid[r][x]);
                    console.log(this.state_grid[r][x]);
            }
        }
    }

    update(){
        this.stage.update();
    }
}

const grid = new Grid(stage);



