var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


/*
Andrew Bryant
Project7
Last edited 10/28/2016

Description: There are five fish in a tank that swim around the screen. Their tails are               drawn with bezier and change in size so it looks like they are swimming. 
            The seaweed is also drawn with a bezier and is moved slightly in a random   
            direction so it looks like they are moving with slight waves. If you click on 
            the screen a random number of bubbles appear and float to the top of the     
            screen. 


*/

 

/********** Fish Object **********/
var fishObj = function(x, y, w, h, r, g, b){
    this.w=w;
    this.h=h;
    this.r = r;
    this.g = g;
    this.b = b;
    this.pos = new PVector(x, y);
    this.dir = new PVector(random(-1, 1), random(-1, 1));
    this.angle = random(0, Math.PI);
    this.wanderDist = random(50, 100);
    this.fin = true;
    this.dX = 0;
    this.dY = 0;
};

//Draw fish
fishObj.prototype.draw = function(){
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    noStroke();
    rotate(this.dir.heading());
    fill(this.r, this.g, this.b);
    
    //Move fins
    if(this.fin){
        this.dX+=0.25;
        this.dY+=0.25;
        if(this.dX > this.h/10 || this.dY > this.h/10){
            this.fin = false;    
        }
    }
    else{
        this.dX-=0.25;
        this.dY-=0.25;
        if(this.dX < -this.h/10 || this.dY < -this.h/10){
            this.fin = true;    
        }
        
    }
    strokeWeight(1);
    stroke(0, 0, 0);
    triangle(-this.w/10, 0, this.w/10, 0, -this.w/10, -this.h*4/5);
    noStroke();
    bezier(-this.w*2/3 + this.dX, -this.h/2 + this.dY, this.w,this.h*2, 
        this.w, -this.h*2, -this.w*2/3 + this.dX, this.h/2 - this.dY);
    ellipse(this.w/10, 0, this.w, this.h);

    fill(255-this.r, 255-this.g, 255-this.b);
    ellipse(this.w/10, 0, this.w, this.h*4/5);
    fill(this.r, this.g, this.b);
    stroke(0, 0, 0);
    strokeWeight(1);
    triangle(this.w/10+10, 0, -this.w/10+10, 0, 0, this.h*2/3);
    noStroke();
    ellipse(this.w/10, 0, this.w, this.h*1/2);

    
    strokeWeight(1);
    fill(255, 255, 255);
    ellipse(this.w/2.5, 0, this.h/5, this.h/5);
    
    stroke(0, 0, 0);
    strokeWeight(2);
    point(this.w/2.5, 0);
    popMatrix();
};

//Move the fish, keeping them in the screen
fishObj.prototype.move = function(){
    this.dir.set(cos(degrees(this.angle)), sin(degrees(this.angle)));
    this.pos.add(this.dir);
    this.angle += random(-0.03, 0.03);
    this.wanderDist--;
    if(this.wanderDist < 0){
        this.wanderDist = random(50, 100);
        this.angle += random(-Math.PI/8, Math.PI/8);
    }
    if(this.pos.x > 400-this.w/2){this.angle = Math.PI;}
    if(this.pos.x < this.w/2){this.angle = 0;}
    if(this.pos.y > 400-this.w/2){this.angle = Math.PI * 3/2;}
    if(this.pos.y < this.w/2){this.angle = Math.PI/2;}
};

//Fish objects
var fish1 = new fishObj(100, 100, 80, 30, 200, 0, 200);
var fish2 = new fishObj(200, 200, 50, 20, 10, 200, 10);
var fish3 = new fishObj(30, 300, 120, 40, 300, 300, 0); 
var fish4 = new fishObj(250, 100, 60, 30, 255, 0, 255);
var fish5 = new fishObj(30, 30, 120, 40, 255, 0, 0); 


/********** BUBBLE OBJECT *********/
var bubbleObj = function(x, y){
    this.pos = new PVector(x, y);
    this.dir = new PVector(0, -1);
    this.size = random(10, 30);
};

//Function to draw bubble
bubbleObj.prototype.draw = function(){
    pushMatrix();
    translate(this.pos.x, this.pos.y);

    strokeWeight(1);
    stroke(174, 236, 245);
    fill(0, 255, 234, 100);
    ellipse(0, 0, this.size, this.size);
    arc(0, 0, this.size * 2/3, this.size *2/3, 150, 300);
    stroke(0, 0, 0);

    popMatrix();
};

//Move bubbles
bubbleObj.prototype.move = function(){
    this.pos.add(this.dir);    
};
//Bubbles array
var bubbles = [];

/********** SEAWEED OBJECT **********/
var seaweedObj = function(x, h, w){
    this.x = x;
    this.h = h;
    this.w = w;
    this.move = true;
};
//Draw seaweed
seaweedObj.prototype.draw = function(){
    pushMatrix();
    translate(this.x, 420);
    //Create slight random movement
    this.w += random(-1, 1);
    strokeWeight(0.5);
    fill(32, 158, 0);
    bezier(0, 0, this.w+10, -this.h/4, this.w-10, -this.h/2, this.w-5, -this.h); 
    popMatrix();
};
//Seaweed objects
var sw1 = new seaweedObj(300, 180, 20);
var sw2 = new seaweedObj(100, 200, 40);
var sw3 = new seaweedObj(120, 120, 30);
var sw4 = new seaweedObj(50, 130, 30);
var sw5 = new seaweedObj(260, 90, 25);
var sw6 = new seaweedObj(210, 160, 40);
var sw7 = new seaweedObj(20, 110, 20);


/********* ROCK OBJECT **********/
var rockObj = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};
//Function to draw rock objects
rockObj.prototype.draw = function() {
        strokeWeight(5);
    stroke(180, 150, 100);
    fill(180, 150, 100);
    ellipse(this.x,this.y, this.w, this.h);
    stroke(200, 200, 100);
    arc(this.x, this.y, this.w, this.h, 120, 320);
    arc(this.x, this.y, this.w, this.h, 50, 150);
};

//Create rocks 
var rock1 = new rockObj(20, 390, 80, 40);
var rock2 = new rockObj(200, 390, 100, 50);
var rock3 = new rockObj(280, 400, 80, 40);
var rock4 = new rockObj(110, 400, 80, 40);
var rock5 = new rockObj(360, 390, 80, 40);

/********* HANDLE INPUT ************/

//Create a random number of new bubbles every time the user clicks
mouseClicked = function(){
    var num = random(5, 10);
    var i = 0;

    while(num > 0){
        var x = random(-30, 30);
        var y = random(-30, 30);
        bubbles.push(new bubbleObj(mouseX+x, mouseY+y));
        num--;
    }
};

//Main draw function, loops indefinitely 
var draw = function() {
    background(0, 225, 255);
    
    //Draw Seaweed
    sw1.draw();
    sw2.draw();
    sw3.draw();
    sw4.draw();
    sw5.draw();
    sw6.draw();
    sw7.draw();
    
    //Draw Rocks
    rock1.draw();
    rock2.draw();
    rock3.draw();
    rock4.draw();
    rock5.draw();
    
    //Draw and move rocks
    fish1.draw();
    fish1.move();
    fish2.draw();
    fish2.move();
    fish3.draw();
    fish3.move();
    fish4.draw();
    fish4.move();
    fish5.draw();
    fish5.move();
    
    //Loop through the bubbles and raw them. If the bubble
    //has floated out of the screen splice it from the array
    for(var i=0; i < bubbles.length; i++){
        bubbles[i].draw();
        bubbles[i].move();
        if(bubbles[i].pos.y < -50){ bubbles.splice(1, i); }

        i++;
    }
    
};


}};
