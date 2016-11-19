var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);
/*
Andrew Bryant
Final Project
ECE 4525
Last edited 10/31/2016

Description: Final Project 

*/

var gameState = 0;//Keep track of level & gamestate

/********** Hero(user) Obj **********/

var hero = function(x, y){
    this.pos = new PVector(x, y);
    this.step = new PVector(0,0);
    this.a = 0;
    this.bullets = [];
    this.bulletDir = [];
};

hero.prototype.draw = function() {
    pushMatrix();
    var y = this.pos.y - 200;
    translate(-this.pos.x, -y);
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
    fill(0, 0, 0);
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

hero.prototype.shoot = function(x, y){
    this.bullets.push(new PVector(this.pos.x, this.pos.y));
    this.bulletDir.push(new PVector(this.pos.x - x, this.pos.y - y));
    
};

var user = new hero(50, 300);

/********** Zombie Obj **********/

var zombie = function(x, y){
    this.pos = new PVector(x, y);
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
        bezier(-5, -5, 8, 1, 1, 8, 5, 5);
    }
    popMatrix();
};

var zombies = [];
zombies.push(new zombie(330, 305));
zombies.push(new zombie(200, 290));
zombies.push(new zombie(220, 350));
zombies.push(new zombie(260, 320));

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

mouseClicked = function(){
  if (gameState === 0){
    gameState = 1;//Move on past start screen
    zombies[0].pos.set(100,100);
    zombies[1].pos.set(150, 50);
    zombies[2].pos.set(200, 75);
    zombies[3].pos.set(180, 90);
    user.pos.set(-100, 0);
  }
};



/********** Draw function **********/
var draw = function(){
	switch(gameState){
		
		case 0:
		    background(100, 100, 100);
		    fill(255, 0, 0);
		    bezier(0, 20, 200,200, 20, 250, 400, 20);
		    bezier(250, 20, 300, 300, 310, 300, 400, 20);
		    fill(255, 255, 255);
		    textSize(30);
		    text("Zombie Island", 100, 100);
		    textSize(20);
		    text("ECE 4525 - Final Project", 90, 140);
		    text("Andrew Bryant", 130, 170);
		    zombies[0].draw();
		    zombies[1].draw();
		    zombies[2].draw();
		    zombies[3].draw();
		    translate(0, 400);
		    user.draw();
		    translate(0, -400);
		    stroke(300, 300, 0);
		    triangle(user.pos.x+50, user.pos.y-5, user.pos.x+60, user.pos.y, user.pos.x+60, user.pos.y-10);
		    line(user.pos.x + 90, user.pos.y-5, user.pos.x + 100, user.pos.y-5);
		    line(user.pos.x + 70, user.pos.y-5, user.pos.x + 80, user.pos.y-5);
		    line(user.pos.x + 110, user.pos.y-5, user.pos.x + 120, user.pos.y-5);
			stroke(0, 0, 0);
			break;
			
		case 1:
		    background(0,20,200);
		    drawMap1();
            zombies[0].draw();
            zombies[1].draw();
            zombies[2].draw();
            zombies[3].draw();
		    user.draw();
			break;
		
	}
};




}};
