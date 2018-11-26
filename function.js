function maxSpeedX(vitesseX) {
	if(vitesseX > VITESSE_MAX) {
		vitesseX = VITESSE_MAX;
	}
	if(vitesseX < -VITESSE_MAX) {
		vitesseX = -VITESSE_MAX;
	}
	return vitesseX;
} 

function jump(vitesseY){
	if(vitesseY > VITESSE_MAX) {
		vitesseY = VITESSE_MAX;
	}
	if(vitesseY < -VITESSE_MAX) {
		vitesseY = -VITESSE_MAX;
	}

	return vitesseY;
}

function shoot(xLaser, yLaser, x, y, largeur) {
	var margeLaser = 17;
	xLaser.push(x + largeur);
	yLaser.push(y + margeLaser);
}

function draw(largeur, xLaser, yLaser, x, y){
	
	if(stay) {
		context. drawImage(sprites, 0, 0, 64, 64, x, y, largeur, largeur);
		for(var i = 0; i <= xLaser.length - 1; i++) {
			context.drawImage(laser, 0, 0, 64, 64, xLaser[i], yLaser[i], largeur, largeur);
		}
	} 
	//else {
	//	drawBomber(x, y, step);	
	//}
}

function drawBackground(CanvasXSize, ctx, img, imgW, imgH, xBackground, yBackground) {
    if (imgW <= CanvasXSize) {
        if (xBackground > CanvasXSize) {
            xBackground = -imgW + xBackground;
        }
      
        if (xBackground > 0) {
            ctx.drawImage(img, -imgW + xBackground, y, imgW, imgH);
        }
    
        if (xBackground - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + xBackground, y, imgW, imgH);
        }
    } else {
        
        if (xBackground > (CanvasXSize)) {
            xBackground = CanvasXSize - imgW;
        }
       
        if (xBackground > (CanvasXSize - imgW)) {
            ctx.drawImage(img, xBackground - imgW + 1, y, imgW, imgH);
        }
    }
 
    ctx.drawImage(img, xBackground, yBackground,imgW, imgH);
    
}

function deplacementbackground(x, dx) {
	x += dx;
	return x
}

function deplacement(x, y, vitesseX, vitesseY) {
	x+= vitesseX;
	
	if (y + 70 > canvas.height){
		gravity=0.00;
		if(vitesseY>0){
			vitesseY=0;
		}
	} else {
		gravity =0.05;
	}
	y+=vitesseY;

	vitesseY+=gravity;
	var resultat = [];
	resultat['vitesseX'] = vitesseX;
	resultat['vitesseY'] = vitesseY;
	resultat['x'] = x;
	resultat['y'] = y;
	return resultat;
}

function deplacementLaser(xLaser, yLaser, laserSpeed) {
	for(var i = 0; i <= xLaser.length - 1; i++) {
		xLaser[i] += laserSpeed;
	}
}

function drawBomber(x, y){
	var s = r/8;
	context.drawImage(sprites, 0, 0, 64, 64, x, y, 32, 32);
}

function update() {
 timeline++;
 if (timeline==8){
 	timeline=0;
 	    step++;
 }
    
  if (step >= 6) {
  	step = 0;
  	stay = true;
  } 
}

function collisionCanevas(largeur, canvasSize, x) {
	var colision = false;
	if(x<0 || x + largeur >= canvasSize) {
		colision = true;
	}
	return colision;
}

function applicationRebond(colision, vitesseX, x, largeur, ) {
	if(colision) {
		vitesseX *= -1;
		if(x<0) {
			x = 5;	
		} else {
			x = canvas.width - 5 - largeur;
		}
	}
	var tab = [];
	tab['z'] = x;
	tab['vitesseX'] = vitesseX;
	return tab;
}