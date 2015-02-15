var Board = function(width, height){
    this.width = width;
    this.height = height;
    this.svg = null;
    this.player = [];
    this.enemies = [];
}

Board.prototype.createBoard = function(numberOfEnemies){
    // Initialize svg
    this.svg = d3.select('.container')
                 .append('svg:svg')
                 .attr("width", this.width)
                 .attr("height", this.height)

    // Create enemies and place on board
    for(var i = 0; i < numberOfEnemies;i++){
        var enemy = {};
        enemy.x = getRandomArbitrary(0.05,0.95) * this.width;
        enemy.y = getRandomArbitrary(0.05,0.95) * this.height;
        enemy.colliding = false;
        this.enemies.push(enemy);        
    }

    var enemies = this.svg.selectAll('circle.enemy')
                          .data(this.enemies);
    
    enemies.enter().append('svg:circle')
           .attr('class', 'enemy')
           .attr('cx', function(d) {return d.x;} )
           .attr('cy', function(d) {return d.y;} )
           .attr('r', 10)
           .attr('fill', 'gray')
           .attr("stroke", "black")

    // Create player and place on board
    // TDOD: Refactor this
    var p = {};
    p.x = this.width / 2;
    p.y = this.height / 2;
    p.isColliding = false;
    this.player.push(p);

    var player = this.svg.selectAll('circle.player')
                          .data(this.player);

    player.enter().append('svg:circle')
                  .attr('class', 'player')
                  .attr('cx', function(d) {return d.x;} )
                  .attr('cy', function(d) {return d.y;} )
                  .attr('r', 10)
                  .attr('fill', 'yellow')
                  .attr("stroke", "orange")
                  .call(dragPlayer);
}


Board.prototype.moveEnemies = function(){
    var enemies = this.svg.selectAll('circle.enemy')
                          .data(this.enemies);
                              // Create enemies and place on board
    for(var i = 0; i < this.enemies.length;i++){
        this.enemies[i].x = getRandomArbitrary(0.05,0.95) * this.width;
        this.enemies[i].y = getRandomArbitrary(0.05,0.95) * this.height;      
    }

    enemies.transition().duration(3000)
           .attr('class', 'enemy')
           .attr('cx', function(d) {return d.x;} )
           .attr('cy', function(d) {return d.y;} )
           .attr('r', 10)
           .attr('fill', 'gray');
}

Board.prototype.checkCollision = function(){
    var enemies = this.svg.selectAll('circle.enemy');
    var player = this.svg.selectAll('circle.player');
    

    // calculate distance from player to enemy
    // sqrt((x2-x1)^2 + (y2-y1)^2)
    enemies.each(function(d){
        var x1 = d3.select(this).attr('cx');
        var y1 = d3.select(this).attr('cy');
        var x2 = player.attr('cx');
        var y2 = player.attr('cy');
        var distanceToPlayer = lineDistance(x1,y1,x2,y2);

        // If we collide for the first time
        if(distanceToPlayer < 20 && !d.colliding){
            var currentHighScore = parseInt(d3.select('.high span').text());
            var currentScore = parseInt(d3.select('.current span').text());

            d.colliding = true;

            d3.select('.current span')
                     .text(0);

            if(currentHighScore < currentScore)
            {
                d3.select('.high span')
                        .text(currentScore);   
            }

            d3.select('.collisions span')
                      .text(parseInt(d3.select('.collisions span').text())+1);
        }
        if(distanceToPlayer > 20)
            d.colliding = false;
    });
}

Board.prototype.currentScore = function(){
    d3.select('.current span')
              .text(parseInt(d3.select('.current span').text())+1);
}

var dragPlayer = d3.behavior.drag()
    .on('dragstart', function () {
        d3.event.sourceEvent.stopPropagation();
        d3.event.sourceEvent.preventDefault(); })
    .on('drag', function (d) {
            if(d3.event.x >= 500){
                d.x = 500-10;
            }
            else if(d3.event.x < 0){
                d.x = 10;
            }
            else{
                d.x += d3.event.dx;
            }

            if(d3.event.y >= 500){
                d.y = 500-10;
            }
            else if(d3.event.y < 0){
                d.y = 10;
            }
            else{
                d.y += d3.event.dy;
            }

            d3.select(this).attr('cx', d.x).attr('cy', d.y)});
                
        
function lineDistance(x1,y1,x2,y2)
{
  var xs = 0;
  var ys = 0;
 
  xs = x2 - x1;
  xs = xs * xs;
 
  ys = y2- y1;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}





