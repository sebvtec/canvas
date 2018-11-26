window.onload = function() {
	var canvas =  document.getElementById('canvas'),
		context = canvas.getContext("2d");
		
	const VITESSE_MAX = 2;


	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var audio = new Audio('ost.mp3');


	var largeur = 32;
	var vitesseX = 0;
	var vitesseY = 0;
	var gravity = 0;
	var stay = true;
	var step =0;
	var timeline =0;
	var r = 40;
	var sprites = new Image();
	sprites.src = "plane.png";
	sprites.onload = animate;



	var laser = new Image();
	laser.src = "laser.png";
	var soundLaser= new Audio('laser.mp3');
	var xLaser = [];
	var yLaser = [];
	var laserSpeed = 7;

	var imgBackground = new Image();
	imgBackground.src = 'backC.png';
	var CanvasXSize = 20000;
	var CanvasYSize = 1000;
	var speed = 500; 
	var scale = 0.16;
	var yBackground = -4.5; 
	var speedBackground = -0.75;
	var imgBackgroundW;
	var imgBackgroundH;
	var xBackground = 0;
	var clearX;
	var clearY;
	var ctx;
    imgBackgroundW = imgBackground.width * scale;
    imgBackgroundH = imgBackground.height * scale;
    
    if (imgBackgroundW > CanvasXSize) {
      
        xBackground = CanvasXSize - imgBackgroundW;
    }
    if (imgBackgroundW > CanvasXSize) {
        clearX = imgBackgroundW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgBackgroundH > CanvasYSize) {
       
        clearY = imgBackgroundH;
    } else {
        clearY = CanvasYSize;
    }


	window.addEventListener('keydown', function(e) {
		var r = e;
		switch (e.key) {
			case "d":
				vitesseX++;
				vitesseX = maxSpeedX(vitesseX);
				break;
			case "q":
				vitesseX--;
				break;
			case " ":
				//stay = false;
				shoot(xLaser, yLaser, x, y, largeur);
				soundLaser.play();
				break;
			case "z":
			vitesseY--;
			vitesseY = jump(vitesseY);
				break;
			case "Enter":
				audio.play();
				break;
		}
	});

	window.addEventListener('keyup', function(e) {
		var r = e;
		switch (e.key) {
			case "d":
				vitesseX = 0;
				break;
			case "q":
				vitesseX = 0;
				break;
			case " ":
				//stay = false;
				shoot(xLaser, yLaser, x, y, largeur);
				break;
			case "z":
			vitesseY--;
			vitesseY = jump(vitesseY);
				break;
			case "Enter":
				audio.play();
				break;
		}
	});

	function animate(){
		var colision = collisionCanevas(largeur, canvas.width, x);
		var res = applicationRebond(colision, vitesseX, x, largeur, canvas.width);
		x = res['z'];
		vitesseX = res['vitesseX'];

		context.clearRect(0, 0, canvas.width, canvas.height);

		drawBackground(CanvasXSize, context, imgBackground, imgBackgroundW, imgBackgroundH, xBackground, yBackground);

		xBackground = deplacementbackground(xBackground, speedBackground);

		draw(largeur, xLaser, yLaser, x, y);
		res = deplacement(x, y, vitesseX, vitesseY);
		vitesseX = res['vitesseX'];
		vitesseY = res['vitesseY'];
		x = res['x'];
		y = res['y'];

		deplacementLaser(xLaser, yLaser, laserSpeed);
		requestAnimationFrame(animate);
	  	//update();
	}
}