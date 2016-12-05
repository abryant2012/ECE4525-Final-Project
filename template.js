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

/********** Hero(user) Obj **********/

var hero = function(x, y){
    this.pos = new PVector(x, y);
    
};

hero.prototype.draw_front = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    //Draw Head
    fill(255, 217, 66);
    rect(-4, -25, 8, 8);
    ellipse(0, -30, 15, 20);
    fill(0, 0, 0);
    ellipse(0, -25, 6, 1);
    
    fill(35, 117, 2);
//    arc(0, -36, 15, Math.PI, 0);
    
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

hero.prototype.draw_back = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    //Draw Head
    fill(255, 217, 66);
    rect(-4, -25, 8, 8);
    ellipse(0, -30, 15, 20);
    fill(0, 0, 0);

    fill(35, 117, 2);
    ellipse(0, -32, 15, 15);
    
    
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
    rect(8, -15, 4, 4);
    rect(10, -15, 4, 13);
    rect(2, -2, 12, 4);
    rect(-12, -15, 4, 4);
    rect(-14, -15, 4, 13);
    rect(-14,-2, 12, 4);
    rect(-8, -18, 16, 30, 5);
    
    //Draw Guns
    fill(135, 73, 3);
    ellipse(9, -2, 6, 12);
    
    popMatrix();
};




var user = new hero(50, 300);

/********** Zombie Obj **********/

var zombie = function(x, y, h){
    this.pos = new PVector(x, y);
    this.step = new PVector(0,0);
    this.h = h;
    this.a = 0;
    this.p1 = random(0, 1);
    this.p2 = random(0, 1);
    this.p3 = random(0, 1);
    this.speed = random(0.5, 1);
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
//        arc(0, -36, 15, Math.PI, 0); 
        fill(255, 0, 0);
        bezier(-5, 5, -4, -13, -1, 5, 4, -15);
    }
    
    //Draw Brown Hair
    else if(this.p1 > 0.67){
        fill(173, 118, 0);
//        arc(0, -36, 15, Math.PI, 0);
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
	this.step = PVector.sub(user.pos, this.pos);
        this.step.normalize();
        this.pos.add(this.step);   
	
	
	if(dist(this.pos.x, this.pos.y, 
	        user.pos.x, user.pos.y) < 30){
	    gameState = 5;            
	}
};

var zombies = [];
zombies.push(new zombie(330, 305, 1));
zombies.push(new zombie(200, 290, 1));
zombies.push(new zombie(220, 350, 1));
zombies.push(new zombie(260, 320, 1));


/********** Shooting *********/
//Bullets array
var bullets = [];

var shoot = function(x, y){
    this.pos = new PVector(user.pos.x, user.pos.y);
    this.dest = new PVector(x, y);
    this.step = PVector.sub(this.dest, this.pos);
    this.step.normalize();
};

shoot.prototype.draw = function() {
    fill(0, 0, 0);
    strokeWeight(3);
    point(this.pos.x,this.pos.y);
    strokeWeight(1);
};

shoot.prototype.move = function(i){
    this.pos.add(this.step);    
    
    if(dist(user.pos.x, user.pos.y,
            this.pos.x, this.pos.y) > 400){
        bullets.splice(i,1);
        return;
    }
    else{
        var z = 0;
        while(z < zombies.length){
            if(dist(zombies[z].pos.x, zombies[z].pos.y,
                    bullets[i].pos.x, bullets[i].pos.y)<30){
                zombies[z].h--;
                bullets.splice(i,1);
                if(zombies[z].h <= 0){
                    zombies.splice(z, 1);    
                }
                return;
            }
            z++;
        }
    }
};



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


/********** Map 2 **********/
var map2 = [
        new PVector(-500, 0),
        new PVector(-250, 50),
        new PVector(-300, 450), 
        new PVector(-100, 400),
        new PVector(100, 550),
        new PVector(200, 500),
        new PVector(400, 400),
        new PVector(350, 300),
        new PVector(250, -200),
        new PVector(0, -400),
        new PVector(-250, -350)
    ];
var drawMap2 = function(){
    beginShape();
    fill(235, 255, 84);
     for (var i = 0; i < map2.length; i++) {
        vertex(map2[i].x, map2[i].y);   
    }    
    vertex(map2[0].x, map2[0].y);
    endShape();
};

/**********  USER INPUT **********/
mousePressed = function(){
  if (gameState === 0){
    gameState = 1;//Move on past start screen
    zombies[0].pos.set(-100,-100);
    zombies[1].pos.set(-150, -50);
    zombies[2].pos.set(-250, -75);
    zombies[3].pos.set(-180, -90);
    user.pos.set(200, 200);
  }
  else if(gameState === 1){ 
    if(zombies.length === 0){
        zombies.push(new zombie(-200, -200, 2));
        zombies.push(new zombie(-200, -300, 2));
        zombies.push(new zombie(-300, -300, 2));
        zombies.push(new zombie(0, -350, 2));
        user.pos.set(200, 200);
        gameState = 2;
    }
    else{bullets.push(new shoot(mouseX, mouseY));}
  }
  else if(gameState === 2){
    if(zombies.length === 0){gameState = 2;}
    else{bullets.push(new shoot(mouseX, mouseY));}
  }
  
};

keyPressed = function(){
    if(keyCode === UP){
        user.pos.y -= 10;    
    }
    if(keyCode === DOWN){
        user.pos.y += 10;    
    }
    if(keyCode === LEFT){
        user.pos.x -= 10;    
    }
    if(keyCode === RIGHT){
        user.pos.x += 10;    
    }
};

var drawBlood = function(){
            fill(255, 0, 0);
		    noStroke();
		    bezier(50, 0, 75,200, 100, 150, 150, 0);
		    bezier(250, 0, 300, 300, 310, 300, 420, 0);
		    bezier(0,0, 20, 100, 30, 350, 50, 0);
		    bezier(150, 0, 210, 300, 250, 310, 275, 0);
		    stroke(0, 0, 0);    
};

/********** Draw function **********/
var draw = function(){
	switch(gameState){
		case 0:
		    background(100, 100, 100);
		    drawBlood();
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
		    user.draw_front();
		    
		    stroke(300, 300, 0);
		    triangle(user.pos.x+50, user.pos.y-5, user.pos.x+60, user.pos.y, user.pos.x+60, user.pos.y-10);
		    line(user.pos.x + 90, user.pos.y-5, user.pos.x + 100, user.pos.y-5);
		    line(user.pos.x + 70, user.pos.y-5, user.pos.x + 80, user.pos.y-5);
		    line(user.pos.x + 110, user.pos.y-5, user.pos.x + 120, user.pos.y-5);
		    fill(255, 123, 0);
			stroke(0, 0, 0);
			break;
			
		case 1:
		    pushMatrix();
		    background(0,20,200);
		    
            translate(-user.pos.x + 200, -user.pos.y + 200);
            drawMap1();
            
            var c = 0;
            while(c<zombies.length){
                zombies[c].move();
                zombies[c].draw();
                c++;
            }
            var i = 0;
            while(i < bullets.length){
                bullets[i].draw();
                bullets[i].move(i);
                i++;
            }
            user.draw_back();
            popMatrix();
            if(c === 0){
                fill(255, 0, 0);
                text("Level 1 Cleared!", 100, 100);
                text("Click to Go to Level 2", 75, 130);
            }
			break;
			
		case 2:
		    //Level 2
		    pushMatrix();
		    background(0,20,200);
		    
            translate(-user.pos.x + 200, -user.pos.y + 200);
            drawMap2();
            
            var c = 0;
            while(c<zombies.length){
                zombies[c].move();
                zombies[c].draw();
                c++;
            }
            var i = 0;
            while(i < bullets.length){
                bullets[i].draw();
                bullets[i].move(i);
                i++;
            }
            user.draw_back();

            
            popMatrix();
            if(c === 0){
                fill(255, 0, 0);
                text("Level 2 Cleared!", 100, 100);
                text("Click to Go to Level 3", 75, 130);
            }
			break;
		    
		case 3:
		     //Level 3
		     break;
		     
		case 4:
		    //You Win!
		    break;
		    
		case 5:
		    //You Lose!
		    drawBlood();
		    fill(0, 0, 0);
		    text("Game Over", 150, 300);
	}
};
}};
