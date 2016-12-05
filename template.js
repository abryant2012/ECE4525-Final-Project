var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);
/*
Andrew Bryant
Final Project
ECE 4525
Last edited 10/31/2016
Description: Final Project. Zombie survival game, last
as long as you can. All zombies in the game are random,
including their clothing, scars, hair color, and speed.
Use W, A, S, D keys to move UP, LEFT, DOWN, RIGHT, 
respectively. Use the mouse to shoot.
*/

var gameState = 0;//Keep track of level & gamestate
var frameCount = 0;
/********** Hero(user) Obj **********/

var hero = function(x, y){
    this.pos = new PVector(x, y);
    this.step = new PVector(0,0);
    this.a = 0;
};

hero.prototype.draw = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    //Draw Head
    fill(255, 217, 66);
    rect(-4, -25, 8, 8);
    ellipse(0, -30, 15, 20);
    fill(0, 0, 0);
    ellipse(0, -25, 6, 1);
    
    fill(35, 117, 2);
    arc(0, -36, 15, 15, 180, 360);
    
    //Draw the Eyes
    fill(255, 255, 255);
    noStroke();
    ellipse(-3, -33, 3, 2);
    ellipse(3, -33, 3, 2);
    stroke(0,0,0);
    strokeWeight(1);
    point(-3, -33);
    point(3, -33);
    
    //Draw Legs
    fill(50, 50, 50);
    rect(-7, 10, 7, 25, 5);
    rect(0, 10, 7, 25, 5);
    
    //Draw Feet
    fill(0, 0, 0);
    rect(-9, 33, 9, 5, 4);
    rect(0, 33, 9, 5, 4);
    
    //Start shirt
    fill(200, 200, 200);
    rect(-8, -18, 16, 30, 5);
    rect(8, -15, 4, 4);
    rect(10, -15, 4, 13);
    rect(10, -2, 12, 4);
    rect(-12, -15, 4, 4);
    
    rotate(this.a);
    //Draw Gun
    fill(0, 0, 0);
    rect(-5, -7, 20, 5);
    fill(135, 73, 3);
    rect(15, -8, 15, 7, 2);
    rect(-20, -7, 15, 8);
    fill(0, 0, 0);
    rect(30, -6, 15, 3);
    rotate(-this.a);
    
    //Finish shirt
    fill(200, 200, 200);
    rect(-14, -15, 4, 13);
    rect(-14,-2, 12, 4);
    
    //Draw Hands
    fill(255, 217, 66);
    ellipse(0, 0, 8, 5);
    ellipse(25, 0, 8, 5);
    popMatrix();
};

hero.prototype.move = function(){
    
};



var user = new hero(50, 300);

/********** Zombie Obj **********/

var zombie = function(x, y){
    this.pos = new PVector(x, y);
    this.step = new PVector(0,0);
    this.a = 0;
    this.p1 = random(0, 1);
    this.p2 = random(0, 1);
    this.p3 = random(0, 1);
};

zombie.prototype.draw = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    //Draw Head
    fill(255, 217, 66);
    rect(-4, -25, 8, 8);
    ellipse(0, -30, 15, 20);
    fill(0, 0, 0);
    ellipse(0, -25, 6, 2);
    
    //Draw the Eyes
    fill(255, 255, 255);
    noStroke();
    ellipse(-3, -33, 3, 2);
    ellipse(3, -33, 3, 2);
    stroke(0,0,0);
    strokeWeight(1);
    point(-3, -33);
    point(3, -33);
    
    
    //Draw Legs
    fill(143, 99, 3);
    rect(-7, 10, 7, 25, 5);
    rect(0, 10, 7, 25, 5);
    
    //Draw Feet
    fill(0, 0, 0);
    rect(-9, 33, 9, 5, 4);
    rect(0, 33, 9, 5, 4);
    
    //Draw shirt
    fill(255*this.p1, 255*this.p2, 255*this.p3);
    rect(-8, -18, 16, 30, 5);
    rect(-20, -15, 12, 4);
    rect(8, -15, 12, 4);
    
    //Draw Hands
    fill(255, 217, 66);
    ellipse(-23, -13, 8, 5);
    ellipse(23, -13, 8, 5);
    
    
    //Draw Blonde Hair
    if(this.p1 < 0.33){
        fill(231, 247, 108);
        arc(0, -36, 15, 15, 180, 360); 
        fill(255, 0, 0);
        bezier(-5, 5, -4, -13, -1, 5, 4, -15);
    }
    
    //Draw Brown Hair
    else if(this.p1 > 0.67){
        fill(173, 118, 0);
        arc(0, -36, 15, 15, 180, 360);
        fill(255, 0, 0);
        bezier(-5, -5, 8, 1, 2, 2, 8, 5);
    }
    
    //Draw head wound
    else{
        fill(237, 0, 8);
        strokeWeight(2);
        stroke(255, 0, 0);
        line(-2, -38, 2, -36);
        strokeWeight(1);
        stroke(0, 0, 0);
        fill(255, 0, 0);
        bezier(-5, -5, -8, -1, 1, 8, 5, 5);
    }
    popMatrix();
};

zombie.prototype.move = function(){
	if(frameCount % 5 === 0){
	        this.step.set(user.pos.x - this.pos.x, user.pos.y - this.pos.y);
            this.step.normalize();
            this.pos.add(this.step);   
	}
};

var zombies = [];
zombies.push(new zombie(330, 305));
zombies.push(new zombie(200, 290));
zombies.push(new zombie(220, 350));
zombies.push(new zombie(260, 320));


/********** Shooting *********/

var shoot = function(x, y){
    this.pos = new PVector(user.pos.x, user.pos.y);
    this.dest = new PVector(x, y);
    this.step = new PVector();
    this.step.set(this.pos.x - this.dest.x, this.pos.y - this.dest.y);
    this.step.normalize();
    this.step.div(2);
};

shoot.prototype.draw = function() {
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
    strokeWeight(1);
};

var ind = 0;
shoot.prototype.move = function(){
    this.pos.add(this.step);       
};

var bullets = [];



/********** Map 1 **********/
var map1 = [
        new PVector(-400, 0),
        new PVector(-350, 50),
        new PVector(-300, 450), 
        new PVector(0, 400),
        new PVector(100, 250),
        new PVector(200, 300),
        new PVector(400, 0),
        new PVector(350, -10),
        new PVector(250, -200),
        new PVector(0, -400),
        new PVector(-250, -350)
        
    ];
var drawMap1 = function(){
    beginShape();
    fill(20, 200, 20);
     for (var i = 0; i < map1.length; i++) {
        vertex(map1[i].x, map1[i].y);   
    }    
    vertex(map1[0].x, map1[0].y);
    endShape();
    
};


/**********  USER INPUT **********/
mouseClicked = function(){
  if (gameState === 0){
    gameState = 1;//Move on past start screen
    zombies[0].pos.set(-100,-100);
    zombies[1].pos.set(-150, -50);
    zombies[2].pos.set(-200, -75);
    zombies[3].pos.set(-180, -90);
    user.pos.set(0, 0);
  }
  if(gameState === 1){
    bullets.push( new shoot(mouseX, mouseY) );    
  }
};

keyPressed = function(){
    var k = keyCode;
    if(k === UP){
        user.pos.y -= 10;    
    }
    if(k === DOWN){
        user.pos.y += 10;    
    }
    if(k === LEFT){
        user.pos.x -= 10;    
    }
    if(k === RIGHT){
        user.pos.x += 10;    
    }
};


/********** Draw function **********/
var draw = function(){
	switch(gameState){
		case 0:
		    background(100, 100, 100);
		    fill(255, 0, 0);
		    noStroke();
		    bezier(50, 0, 75,200, 100, 150, 150, 0);
		    bezier(250, 0, 300, 300, 310, 300, 420, 0);
		    bezier(0,0, 20, 100, 30, 350, 50, 0);
		    bezier(150, 0, 210, 300, 250, 310, 275, 0);
		    stroke(0, 0, 0);
		    fill(255, 255, 255);
		    textSize(30);
		    text("Zombie Island", 100, 75);
		    textSize(20);
		    text("ECE 4525 - Final Project", 90, 110);
		    text("Andrew Bryant", 130, 130);
		    text("Survive the zombie apocolypse.", 50, 160);
		    text("Use your mouse to shoot. Use the arrow", 20, 180);
		    text("keys to move UP,LEFT,DOWN,RIGHT", 30, 200);
		    text("Click to start game", 115, 220);
		    
		    zombies[0].draw();
		    zombies[1].draw();
		    zombies[2].draw();
		    zombies[3].draw();
		    user.draw();
		    
		    stroke(300, 300, 0);
		    triangle(user.pos.x+50, user.pos.y-5, user.pos.x+60, user.pos.y, user.pos.x+60, user.pos.y-10);
		    line(user.pos.x + 90, user.pos.y-5, user.pos.x + 100, user.pos.y-5);
		    line(user.pos.x + 70, user.pos.y-5, user.pos.x + 80, user.pos.y-5);
		    line(user.pos.x + 110, user.pos.y-5, user.pos.x + 120, user.pos.y-5);
		    fill(255, 123, 0);
			stroke(0, 0, 0);
			break;
			
		case 1:
		    background(0,20,200);
            translate(-user.pos.x + 200, -user.pos.y + 200);
		    drawMap1();
            user.draw();
            zombies[0].draw();
            zombies[1].draw();
            zombies[2].draw();
            zombies[3].draw();
            zombies[0].move();
            zombies[1].move();
            zombies[2].move();
            zombies[3].move();
            var i = 0;
            while(i < bullets.length){
                bullets[i].draw();
                bullets[i].move();
                i++;
            }
			break;
		
	}
};
}};
