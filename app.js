//started this project on 23/03/2020

var canvas=document.getElementById("canvas");
var c= canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
canvas.style.background="#000";

//variable

var ball,powerMeter,py,side,pausePower,angle,shoot,tapCount,movingRateX,movingRateY;
var newX,newY,movX,movY,direction=[],factor,friction,moving;
var diamond,movingFrame,accuracy,rock=[],lv,rockCount,lifeCount;

//classes


class Ball
{
	constructor(x,y,vx,vy,a,ang,rad)
	{
		this.x=x;
		this.y=y;
		this.vx=vx;
		this.vy=vy;
		this.a=a;
		this.ang=ang;
		this.rad=rad;
	}

	draw(){

	c.beginPath();
	c.strokeStyle="#fff";
	c.arc(this.x,this.y,this.rad,2*Math.PI,false);
	c.stroke();
//	console.log(""+this.x);

	}

	

}

class Diamond
{
	constructor(x,y,vx,vy,a,ang,rad)
	{
		this.x=x;
		this.y=y;
		this.vx=vx;
		this.vy=vy;
		this.a=a;
		this.ang=ang;
		this.rad=rad;
	}

	draw(){

	c.beginPath();
	c.strokeStyle="#fff";
	c.fillStyle="#fff";
	c.arc(this.x,this.y,this.rad,2*Math.PI,false);
	c.stroke();
	c.fill();
//	console.log(""+this.x);

	}
}

class Rock{
	constructor(x,y,vx,vy,a,ang,rad)
	{
		this.x=x;
		this.y=y;
		this.vx=vx;
		this.vy=vy;
		this.a=a;
		this.ang=ang;
		this.rad=rad;
	}

	draw(){

	c.beginPath();
	c.strokeStyle="#fff";
	c.fillStyle="brown";
	c.arc(this.x,this.y,this.rad,2*Math.PI,false);
	c.stroke();
	c.fill();
//	console.log(""+this.x);

	}

}


ball=new Ball(100,100,5,5,3,0.1,15);
//diamond=new Diamond(Math.random()*1000%canvas.width,Math.random()*1000%canvas.height,0,0,0,0,12);
//rock=new Rock(Math.random()*1000%canvas.width,Math.random()*1000%canvas.height,0,0,0,0,12);

//event Listeners




canvas.addEventListener('click',function X(){
	if(!pausePower)
		pausePower=true;
	else
		pausePower=false;

	if(!moving)
	tapCount++;

	if(tapCount==2)
	{
		tapCount=0;
		moving=true;
		cancelAnimationFrame(info);
		c.clearRect(0,0,canvas.width,canvas.height);

		//console.log(angle);

		
		if( angle>=(0) && angle <=(Math.PI/2) )
			{
				direction.push(1);
				direction.push(1);
			}
		else if(angle > (Math.PI/2) && angle<=Math.PI)
		{
			direction.push(-1);
			direction.push(1);
		}

		else if(angle > Math.PI && angle<=1.5*Math.PI) //prob 2=angle
			{
				direction.push(-1);
				direction.push(-1);
			}
		else
			{
				direction.push(1);
				direction.push(-1);
			}

		//	var distance=0;

		// newX=ball.x+((direction[0]*py)%100) + direction[0]*py*Math.cos(angle) ;
		// newY=ball.y+((direction[1]*py)%100) +direction[1]* py*Math.sin(angle);

		// distance=(py%100)*Math.cos(angle)*10;

		// if((ball.x>=0&& distance<0 )|| (ball.x<0 && distance>=0))
		// 	distance=distance*10;

		// newX=ball.x+(distance);

		// distance=(py%100)*Math.sin(angle)*10;
		// if((ball.y>=0 && distance<0 )|| (ball.y<0 && distance>=0))
		// 	distance=distance*10;

		// newY=ball.y+(distance);

		//newX=ball.x+((direction[0]*py)%100) + py*Math.cos(angle) ;
		//newY=ball.y+((direction[1]*py)%100) + py*Math.sin(angle);

		//angle=Math.PI;

		py=Math.floor(canvas.height-py);
		ball.vx=(Math.floor(10*Math.cos(angle)*py))/50;
		ball.vy=(Math.floor(10*Math.sin(angle)*py))/50;


		movX=ball.x;
		movY=ball.y;

		// newX < 0? movingRateX=-1:movingRateX=1;
		// newY < 0? movingRateY=-1:movingRateY=1;

		ball.vx < 0? movingRateX=1:movingRateX=-1;
		ball.vy< 0? movingRateY=1:movingRateY=-1;


		//console.log(direction);
	//	console.log(ball.vy);
	//	console.log(newY);

		direction.splice(0,direction.lenght);

		accuracy++;

		move();


	}
		//console.log(""+tapCount);
})

//global variabls intialisation
direction.splice(0,direction.lenght);
py=canvas.height;
side=-10;
pausePower=false;
angle=0;
shoot=false;
tapCount=0;
movingRate=2;
factor=200;
friction=0.9;
moving=false;
accuracy=0;
lv=1;
rockCount=0;
lifeCount=3;

//functions;


function powerLayout()
{
	//power meter layout 


	c.beginPath();
	c.moveTo(10,10);
	c.lineTo(30,10);
	c.strokeStyle="#fff";
	c.stroke();

	c.beginPath();
	c.moveTo(10,10);
	c.lineTo(10,canvas.height);
	c.strokeStyle="#fff";
	c.stroke();

	c.beginPath();
	c.moveTo(30,10);
	c.lineTo(30,canvas.height);
	c.strokeStyle="#fff";
	c.stroke();

	if(side<0)
	{
		c.beginPath();
		c.fillStyle="#fff";
		c.fillRect(13,py,14,py);
		c.lineTo(30,10);
		c.fill();
	}
	else
	{
		c.clearRect(13,py/2,14,py/2);
	}


	if(py<15 || py>canvas.height)
	{
		side=-side;
	}
	
	py=py+side;
	//console.log(""+py+" ");
	

}


function firingAngle()
{
	c.clearRect(0,0,canvas.width,canvas.height);

	ball.draw();

	c.beginPath();
	c.arc(ball.x+(50*Math.cos(angle)),
		ball.y+(50*Math.sin(angle)),11,2*Math.PI,false);
	c.lineWidth="2";
	c.strokeStyle="#fff";
	c.stroke();


	angle=(angle+0.01)%(2*Math.PI);
	//console.log(angle);
}


 function move()
 {

	/*
	if(ball.ang<=angle)
	{

		c.clearRect(0,0,canvas.width,canvas.height);

		c.beginPath();
		c.arc(ball.x+(50*Math.sin(ball.ang)),
		ball.y+(50*Math.sin(ball.ang)),ball.rad,2*Math.PI,false);
		c.strokeStyle="#fff";
		c.stroke();

		if(ball.x < (Math.cos(angle)*py)%canvas.innerWidth)
		ball.x+=movingRate;
		if(ball.y <(Math.sin(angle)*py)%canvas.innerWidth)
		ball.y+=movingRate;

		requestAnimationFrame(move);

	}*/

	//if(Math.floor(movX) != Math.floor(newX))
	// if(py!=0)	
	// {
	// 	movY=movingRateY*((newY-ball.y)*(movX-ball.x)/(newX-ball.x)) + ball.y;
		
	// 	if(movX<0 || movX>canvas.width)
	// 	{
	// 		movingRateX=-movingRateX;
	// 	}
	// 	if(movY<0 )
	// 	{
	// 		movingRateY=-1;
	// 		console.log(":hi");
	// 	}
	// 	if( movY>canvas.height)
	// 	{
	// 		movingRateY=1;
	// 	}
	// 	console.log(movY);

	// 	c.clearRect(0,0,canvas.width,canvas.height);
	// 	c.beginPath();
	// 	c.arc(movX,movY,ball.rad,2*Math.PI,false);
	// 	c.strokeStyle="#fff";
	// 	c.stroke();

	// 	movX=movX+movingRateX;
	// 	py=py-1;
	// 	requestAnimationFrame(move);


	// }

	if(py!=0 && ( Math.ceil(ball.vx)!=0 && Math.ceil(ball.vy)!=0 && Math.floor(ball.vx)!=0 && Math.floor(ball.vy)!=0))
	{
		if(ball.x-ball.rad <0 || ball.x+ball.rad >canvas.width)
		{
			ball.vx=-ball.vx;
		}

		if(ball.y-ball.rad <0 || ball.y+ball.rad> canvas.height)
		{
			ball.vy=-ball.vy;
		}

		//ball.vx < 0? movingRateX=1:movingRateX=-1;
		//ball.vy< 0? movingRateY=1:movingRateY=-1;


				
		ball.x=ball.x+ball.vx;
		ball.vx=(ball.vx*friction);

		ball.y=ball.y+ball.vy;
		ball.vy=(ball.vy*friction);

		c.clearRect(0,0,canvas.width,canvas.height);
		c.beginPath();
		c.arc(ball.x,ball.y,ball.rad,2*Math.PI,false);
		c.strokeStyle="#fff";
		c.stroke();

		py--;

		//console.log(py+" "+Math.floor(ball.vx)+" "+Math.floor(ball.vy));
		

	if(getDistance(ball.x,ball.y,diamond.x,diamond.y) < ball.rad+diamond.rad)
	{
		accuracy=Math.ceil((1/accuracy)*100);
		//alert("Bulls Eyee!!!");
		rockCount=0;
		alert("Bulls Eyee!!!\nAccuracy:"+accuracy+"%");
		ball.x=100;
		ball.y=100;
		ball.vx=0;
		accuracy=0;

		c.clearRect(0,0,canvas.width,canvas.height);
	}


	// if(getDistance(ball.x,ball.y,rock.x,rock.y)< ball.rad+rock.rad)
	// {
	// 	alert("Ball Destroyed !!!!");
	// 	cancelAnimationFrame(movingFrame);
	// }
	// else{
	// 	movingFrame=requestAnimationFrame(move)	;	
		
	// }

		for(var i=0;i<lv-1;i++)
			{
			rock[i].draw();
			
				if(getDistance(ball.x,ball.y,rock[i].x,rock[i].y)< ball.rad+rock[i].rad)
				{
					alert("Ball Destroyed !!!!");
					decreaseLife();
					cancelAnimationFrame(movingFrame);
					ball.x=100;
					ball.y=100;
					ball.vx=0;
					c.clearRect(0,0,canvas.width,canvas.height);

				}
			}

			movingFrame=requestAnimationFrame(move)	;	


	}
	else{

		if(ball.x+ball.rad > canvas.width|| ball.x-ball.rad< 0 ||
		ball.y-ball.rad <0 || ball.y+ball.rad> canvas.height	)
		{
			alert('An Error Occured !!! ');
			ball.x=100;
			ball.y=100;

		}
		moving=false;
		py=canvas.height;
		animate();
	}



}


function getDistance(x1,y1,x2,y2)
{
	var xDist=x2-x1;
	var yDist=y2-y1;
	return Math.sqrt((xDist*xDist)+(yDist*yDist));
}


function lvUp()
{
	for(var i=0;i<lv;i++)
		{

			var rx=Math.random()*1000%canvas.width;
			var ry=Math.random()*1000%canvas.height;
			if(getDistance(ball.x,ball.y,rx,ry) > ball.rad+12)
			rock.push(new Rock(rx,ry,0,0,0,0,12));
			else
				i--;

		}
		lv++;
		rockCount=lv;

		var dx=Math.random()*1000%canvas.width;
		var dy=Math.random()*1000%canvas.height;
		diamond=new Diamond(dx,dy,0,0,0,0,12);

		while(getDistance(ball.x,ball.y,dx,dy) < ball.rad + 12)
		{
		var dx=Math.random()*1000%canvas.width;
		var dy=Math.random()*1000%canvas.height;
		diamond=new Diamond(dx,dy,0,0,0,0,12);
			
		}

		console.log(diamond);


}
function decreaseLife()
{
	lifeCount--;
}




function animate()
{
	
	if(rockCount == 0)
	{
		lvUp();
	}
	else{

		for(var i=0;i<lv-1;i++)
			{
			rock[i].draw();
			
				if(getDistance(ball.x,ball.y,rock[i].x,rock[i].y)< ball.rad+rock[i].rad)
				{
					alert("Ball Destroyed !!!!");
					decreaseLife();
				}
			}

			for(var i=0;i<lifeCount;i++)
			{
				c.beginPath();
				// c.moveTo(20,(canvas.width-1000))+3*lifeCount;
				// c.lineTo(30,(canvas.width-100))+3*lifeCount;
				c.moveTo(canvas.width-100+30*i,20);
				c.lineTo(canvas.width-100+30*i,50);
				
				c.strokeStyle="#fff";
				c.stroke();

			}
		diamond.draw();
		ball.draw();
		//rock[0].draw();
	}
	//
	if(!pausePower)
	powerLayout();
	else
	firingAngle();
	
	if(getDistance(ball.x,ball.y,diamond.x,diamond.y) < ball.rad+diamond.rad)
	{
		alert("Bulls eeyee");
		rockCount=0;
	}
	
	if(lifeCount==0)
	{
		alert('Game Over!!!');
		cancelAnimationFrame(info);
		lifeCount=-1;
	}
	else
	info=	requestAnimationFrame(animate);



}

animate();






















