const CELL_SIZE = 20;
const OFF_SET = 50;

const canvas = document.getElementById('canvas');

canvas.width = (window.innerWidth-OFF_SET) - window.innerWidth%CELL_SIZE;
canvas.height =(window.innerHeight-OFF_SET)-window.innerHeight%CELL_SIZE;

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
        
    }

    

    update(){
        if(this.state == 1){
            this.cell.beginFill(this.color);
        }else{
            this.cell.beginFill(this.backgroudColor);
        }
        this.cell.drawRect(this.xPos, this.yPos, CELL_SIZE, CELL_SIZE);   
    }

    init(x, y){
        if(!this.called){
            this.xPos = x; this.yPos = y;
            this.update();
            this.canvas.addChild(this.cellShape);
            this.called = 1;
            return this.cellShape;
        }
        return this.cellShape;
    }

    init(){
        if(!this.called){
            this.update();
            this.canvas.addChild(this.cellShape);
            this.called = 1;
            return this.cellShape;
        }
        return this.cellShape;
    }

    setXPos(x){
        this.xPos = x;
    }

    setYPos(y){
        this.yPos = y;
    }
    setState(state){
        this.state = state;
    }

    getState(){
        return this.state;
    }
    setColor(color){
        this.color = color;
    }
    setLiveN(n){
        this.number_of_neighours_living = n;
    }
    getLiveN(){return this.number_of_neighours_living;}
}


class Grid{
    constructor(canvas){
        this.stage = canvas;
        console.log(this.stage)
        this.cells = [];
        for(let r=0; r<this.stage.canvas.width/CELL_SIZE; r++){
            let row = [];
            for(let x=0; x<this.stage.canvas.width/CELL_SIZE;x++){
                let cell = new Cell(this.stage);
                cell.state = 0;
                cell.setXPos(x*CELL_SIZE);
                cell.setYPos(r*CELL_SIZE);
                let c = cell.init();
                c.addEventListener('click', (e)=>{
                    cell.state = !cell.state;
                    cell.update();
                    this.stage.update();
                });
                row.push(cell);
            }
            this.cells.push(row);
        }
    }

    getGrid(){
        return this.cells;
    }

    drawLineVertLine(x){
        const shape = new createjs.Shape();
        const line = shape.graphics;
        line.beginStroke("#32CD32");
        line.moveTo(CELL_SIZE*x, 0);
        line.lineTo(CELL_SIZE*x, this.stage.canvas.height);
        this.stage.addChild(shape);
    }

    drawLineHor(y){
        const shape = new createjs.Shape();
        const line = shape.graphics;
        line.beginStroke("#32CD32");
        line.moveTo(0, CELL_SIZE*y);
        line.lineTo(this.stage.canvas.width,CELL_SIZE*y);
        this.stage.addChild(shape);
    }

    drawGrid(){
        for(let x=1; x<this.stage.canvas.width/CELL_SIZE; x++)this.drawLineVertLine(x);
        for(let y=1; y<this.stage.canvas.height/CELL_SIZE; y++)this.drawLineHor(y);
        this.stage.update();
    }

    update(){
        this.stage.update();
    }
}


const grid = new Grid(stage);

grid.drawGrid();