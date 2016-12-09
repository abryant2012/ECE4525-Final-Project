var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);
/*
Andrew Bryant
Final Project
ECE 4525
Last edited 12/9/2016
Description: Final Project. Zombie survival game, last
as long as you can. All zombies in the game are random,
including their clothing, scars, hair color, and speed.
Use the arrow keys to move. Use the mouse to aim and shoot. Each level has more zombies and the zombies 
take one more shot to be killed than the previous level.

*/

var gameState = 0;//Keep track of level & gamestate

/********** Hero(user) Obj **********/

var hero = function(x, y){
    this.pos = new PVector(x, y);
    this.a = 0;
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
    
    //Draw Gun
    fill(0, 0, 0);
    rect(-5, -7, 20, 5);
    fill(135, 73, 3);
    rect(15, -8, 15, 7, 2);
    rect(-20, -7, 15, 8);
    fill(0, 0, 0);
    rect(30, -6, 15, 3);
    
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

hero.prototype.draw_top = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    fill(200,200,200);
    //Body
    rect(10, -15, 5, 20, 2);//Right arm
    rect(-15, -4, 10, 8, 2);//Left arm
    rect(-12, -5, 24, 10, 4);//Body
    
    //Helmet
    fill(9, 140, 2);
    ellipse(0,0, 12, 15);//Helmet
    fill(128, 92, 2);
    ellipse(-2, -2, 3, 8);
    ellipse(2,5,4,2);
    ellipse(3, -3, 2, 3);
    
    //Draw Hand & Gun
    fill(255, 217, 66);
    ellipse(13, -15, 7,8);
    fill(75, 75, 75);
    rect(10, -25, 4, 10);
    
    popMatrix();
};




var user = new hero(50, 300);

/********** Zombie Obj **********/

var zombie = function(x, y, h){
    this.pos = new PVector(x, y);
    this.step = new PVector(0,0);
    this.h = h;
    this.a = Math.PI;
    this.p1 = random(0, 1);
    this.p2 = random(0, 1);
    this.p3 = random(0, 1);
    this.speed = random(0.75, 1.25);
};

zombie.prototype.draw_front = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    //Draw Head
    if(this.p2 >= 0.5){
        fill(255, 217, 66);
    }
    else{
        fill(130, 82, 4);
    }
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
    if(this.p2 >= 0.5){
        fill(255, 217, 66);
    }
    else{
        fill(130, 82, 4);
    }ellipse(-23, -13, 8, 5);
    ellipse(23, -13, 8, 5);
    
    
    //Draw Blonde Hair
    if(this.p1 < 0.33){
        fill(231, 247, 108);
        arc(0, -36, 15, 15, Math.PI, 0); 
        fill(255, 0, 0);
        bezier(-5, 5, -4, -13, -1, 5, 4, -15);
    }
    
    //Draw Brown Hair
    else if(this.p1 > 0.67){
        fill(173, 118, 0);
        arc(0, -36, 15, 15, Math.PI, 0);
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

zombie.prototype.draw = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(Math.PI+this.a);
    //Draw shirt
    fill(255*this.p1, 255*this.p2, 255*this.p3);
    rect(7, -15, 5, 20, 2);//Right arm
    rect(-12, -15, 5, 20, 2);//Left arm
    rect(-12, -5, 24, 10, 6);//Body
    
    //Draw Head and hands
    if(this.p2 >= 0.5){
        fill(255, 217, 66);
    }
    else{
        fill(130, 82, 4);
    }    
    ellipse(0,0, 10, 10);
    ellipse(10, -18, 5, 8);
    ellipse(-9, -18, 5, 8);
    
    //Draw Blonde Hair
    if(this.p1 < 0.33){
        fill(231, 247, 108);
    }
    
    //Draw Brown Hair
    else if(this.p1 > 0.67){
        fill(173, 118, 0);
    }
    
    //Draw head wound
    else{
        fill(237, 0, 8);
    }
    popMatrix();
};

zombie.prototype.move = function(){
    this.step = PVector.sub(user.pos, this.pos);
    this.step.normalize();
    this.step.mult(this.speed);
    this.pos.add(this.step);   
    this.a = PVector.angleBetween(user.pos, this.pos);
	
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
    var aX=0;
    var aY=0;
    if(user.a === 0){aX = 10; aY = -25;}
    if(user.a === (Math.PI*3/2)){aX = -25; aY = -11;}
    if(user.a === Math.PI){aX = -10; aY = 25;}
    if(user.a === Math.PI/2){aX = 25; aY = 11;}
    
    this.pos = new PVector(user.pos.x+aX, user.pos.y+aY);
    this.dest = new PVector(x + user.pos.x - 200, y + user.pos.y - 200);
    this.step = PVector.sub(this.dest, this.pos);
    this.step.normalize();
    this.step.mult(3);

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
                    this.pos.x, this.pos.y)<30){
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
        new PVector(-320, 50),
        new PVector(-300, 320), 
        new PVector(-290, 400),
        new PVector(100, 420),
        new PVector(200, 350),
        new PVector(400, 320),
        new PVector(350, 300),
        new PVector(300, -300),
        new PVector(0, -400),
        new PVector(-300, -350)
        
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
    
        new PVector(-380, 0),
        new PVector(-350, 100),
        new PVector(-300, 350), 
        new PVector(0, 400),
        new PVector(100, 350),
        new PVector(350, 300),
        new PVector(400, 0),
        new PVector(370, -10),
        new PVector(320, -200),
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

/********** Map 3 **********/
var map3 = [
        new PVector(-370, 0),
        new PVector(-350, 150),
        new PVector(-300, 450), 
        new PVector(0, 345),
        new PVector(100, 320),
        new PVector(200, 300),
        new PVector(400, 0),
        new PVector(350, -10),
        new PVector(310, -300),
        new PVector(0, -370),
        new PVector(-250, -350)    ];
        
var drawMap3 = function(){
    beginShape();
    fill(6, 153, 18);
     for (var i = 0; i < map3.length; i++) {
        vertex(map3[i].x, map3[i].y);   
    }    
    vertex(map3[0].x, map3[0].y);
    endShape();
};

var map4 = [
        new PVector(-400, 0),
        new PVector(-320, 50),
        new PVector(-300, 320), 
        new PVector(-290, 400),
        new PVector(100, 420),
        new PVector(200, 350),
        new PVector(400, 320),
        new PVector(350, 300),
        new PVector(300, -300),
        new PVector(0, -400),
        new PVector(-300, -350)
        
    ];
var drawMap4 = function(){
    beginShape();
    fill(33, 163, 0);
     for (var i = 0; i < map4.length; i++) {
        vertex(map1[i].x, map4[i].y);   
    }    
    vertex(map4[0].x, map4[0].y);
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
    while(bullets.length !== 0){
        bullets.splice(0,1);
    }
    user.pos.set(200, 200);
  }
  else if(gameState === 1){ 
    if(zombies.length === 0){
        zombies.push(new zombie(-200, -200, 2));
        zombies.push(new zombie(-200, -300, 2));
        zombies.push(new zombie(-300, -300, 2));
        zombies.push(new zombie(0, -350, 2));
        zombies.push(new zombie(-100, -350, 2));
        user.pos.set(200, 200);
        while(bullets.length !== 0){
            bullets.splice(0,1);
        }
        gameState = 2;
    }
    else{bullets.push(new shoot(mouseX, mouseY));}
  }
  else if(gameState === 2){
    if(zombies.length === 0){
        zombies.push(new zombie(-200, -200, 3));
        zombies.push(new zombie(-200, -300, 3));
        zombies.push(new zombie(-300, -300, 3));
        zombies.push(new zombie(0, -350, 3));
        zombies.push(new zombie(-300, -200, 3));
        zombies.push(new zombie(-100, -350, 3));
        user.pos.set(200, 200);
        while(bullets.length !== 0){
            bullets.splice(0,1);
        }
        gameState = 3;
    }
    else{bullets.push(new shoot(mouseX, mouseY));}
    
  }
  else if(gameState === 3){
    if(zombies.length === 0){
        zombies.push(new zombie(-200, -200, 4));
        zombies.push(new zombie(-200, -300, 4));
        zombies.push(new zombie(-300, -300, 4));
        zombies.push(new zombie(0, -350, 4));
        zombies.push(new zombie(-300, -200, 4));
        zombies.push(new zombie(100, -200, 4));
        zombies.push(new zombie(-10, -50, 4));
        zombies.push(new zombie(-100, -35, 4));
        zombies.push(new zombie(0, 0, 4));
        user.pos.set(200, 200);
        while(bullets.length !== 0){
            bullets.splice(0,1);
        }
        gameState = 4;
    }
    else{bullets.push(new shoot(mouseX, mouseY));}
  }
  
  else if(gameState === 4){
      bullets.push(new shoot(mouseX, mouseY));
  }
  
  else if(gameState === 5){

  }
};


keyPressed = function(){
    if(keyCode === UP && user.pos.y > -300){
        user.pos.y -= 10;
        user.a = 0;
    }
    if(keyCode === DOWN && user.pos.y < 300){
        user.pos.y += 10;    
        user.a = Math.PI;
    }
    if(keyCode === LEFT && user.pos.x > -300){
        user.pos.x -= 10; 
        user.a = Math.PI*3/2;
    }
    if(keyCode === RIGHT && user.pos.x < 300){
        user.pos.x += 10;  
        user.a = Math.PI/2;
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

var index = 0;
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
		    
		    zombies[0].draw_front();
		    zombies[1].draw_front();
		    zombies[2].draw_front();
		    zombies[3].draw_front();
		    user.draw_front();
		    
		    stroke(300, 300, 0);
		    
		    if(index < 60){
		        triangle(user.pos.x+50, user.pos.y-5, user.pos.x+60, user.pos.y, user.pos.x+60, user.pos.y-10);
		        index++;
		    }
		    else if(index < 120){
		        index++;    
		    }
		    else if(index < 180){
		        
		    }
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
            user.draw_top();
            popMatrix();
            if(c === 0){
                fill(255, 0, 0);
                textSize(20);
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
            user.draw_top();

            popMatrix();
            if(c === 0){
                fill(255, 0, 0);
                textSize(20);
                text("Level 2 Cleared!", 100, 100);
                text("Click to Go to Level 3", 75, 130);
            }
			break;
		    
		case 3:
		    //Level 3
		    pushMatrix();
		    background(0,20,200);
		    
            translate(-user.pos.x + 200, -user.pos.y + 200);
            drawMap3();
            
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
            user.draw_top();

            
            popMatrix();
            if(c === 0){
                fill(255, 0, 0);
                textSize(20);
                text("Level 3 Cleared!", 100, 100);
                text("Click to Go to Level 4", 75, 130);
            }
		     break;

        //Level 4		     
		case 4:
		    pushMatrix();
		    background(0,20,200);
		    
            translate(-user.pos.x + 200, -user.pos.y + 200);
            drawMap4();
            
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
            user.draw_top();

            
            popMatrix();
            if(c === 0){
                fill(255, 0, 0);
                textSize(20);
                text("All Levels Cleared!", 100, 100);
                text("You Survived!", 120, 130);
            }
		    break;
		    
		case 5:
		    //You Lose!
		    drawBlood();
		    fill(0, 0, 0);
		    text("Game Over", 150, 300);
	}
};
}};
