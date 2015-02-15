var WatchoutGame = function(width, height, numberOfEnemies){
    this.width = width;
    this.height = height;
    this.numberOfEnemies = numberOfEnemies;
    this.board = null;
}

WatchoutGame.prototype.play = function(){
    // Create board
    this.board = new Board(this.width, this.height);
    this.board.createBoard(this.numberOfEnemies);

    // Interval move enemies
     setInterval(function(){
        this.board.moveEnemies();}.bind(this), 3500);

     setInterval(function(){
        this.board.checkCollision();}.bind(this) , 50);

    setInterval(function(){
        this.board.currentScore();}.bind(this) , 100);
}