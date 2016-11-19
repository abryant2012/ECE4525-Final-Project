var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


/*
Andrew Bryant
Final Project - ECE 4525
Last edited 11/4/2016
Description: 
*/

/*
Andrew Bryant
Final Project
ECE 4525
Last edited 10/31/2016
Description: Final Project 
*/

var gameState = 0;



var draw = function(){
	switch(gameState){
		
		case 0:
		    background(100, 100, 100);
		    fill(255, 255, 255);
		    textSize(30);
		    text("Zombie Island", 100, 100);
		    textSize(20);
		    text("ECE 4525 - Final Project", 90, 140);
		    text("Andrew Bryant", 130, 170);
			break;
			
		case 1:
			break;
		
	}
};


 


}};
