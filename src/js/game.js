


class GameOfLife{
    constructor(stage, grid, scanner){
        this.stage = stage;
        this.grid = grid;
        this.scanner = scanner;
        this.play_status = true;
    }

    play(){
        this.grid.update();
        this.scanner.scan(); 
    }

}

window.addEventListener('load', ()=>{
    const gof = new GameOfLife(stage, grid, scanner)
    gof.play();
});

window.addEventListener('resize', e=>{
    const gof = new GameOfLife(stage, grid, scanner)
    gof.play();
})





createjs.Ticker.addEventListener("tick", ()=>{
    
    
})