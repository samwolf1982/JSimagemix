/**
 * @author Sam
 */
// лечить мишку так обработать момент когда мишка покидает если она нажата
// обработать
// Only executed our code once the DOM is ready.
window.onload = function() {
	// Get a reference to the canvas object
	var canvas = document.getElementById('myCanvas');
	  canvas.syncDimension= true;
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	// Create a Paper.js Path to draw a line into it:
	var path = new paper.Path();
	// Give the stroke a color
	path.strokeColor = 'black';
	var start = new paper.Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note that the plus operator on Point objects does not work
	// in JavaScript. Instead, we need to call the add() function:
	path.lineTo(start.add([ 200, -50 ]));
	// Draw the view now:
	paper.view.draw();

	Pro = {};
	Pro.pro = {};

	/*
	 * global value
	 */
	Pro.pro.page = {
		curentrect : null, // curent rectangle
		alfarect : null, // mainrect
		stateofmouseDow : false, // state of mouse
		objectsArray : new Array(),
		lastPoint : null,
		lastPointCircle: null,
		curentImageIndex: null

	};
	Pro.pro.page.func = {
		/*
		 * draw one image
		 */
		drawimageOnCanvas : function(imageId, pointState, imageSize) {

			var rastertGif = new paper.Raster(imageId);
			//rastertGif.size=new paper.Size(50,50);
			//rastertGif.ondragstart = function() {
			//	return false;
			//};
			//if (pointState) {
			//	rastertGif.position = pointState;
		//	}
			//;
			//if (imageSize) {
			//	rastertGif.size = imageSize;
			//}
			//;
			rastertGif.position = paper.view.center;
		
			return rastertGif;
		},
		/*
		 * draw border around image. return border
		 * 
		 */
		drawrect : function(point, size) {
			var shape = new paper.Shape.Rectangle(point, size);
			shape.stateDraw = true;
		
			shape.arrCircles=Pro.pro.page.func.drawcirclesOnRect(point, size);
			//shape.arrCircles.push(Pro.pro.page.func.drawcircle(point));
			shape.onMouseUp = Pro.pro.page.events.eventRectMouseUp;
			shape.onMouseMove = Pro.pro.page.events.eventRectMouseMove;
			shape.onMouseDown = Pro.pro.page.events.eventRectMouseDown;
			shape.strokeColor = 'black';
			shape.opacity = 0.2;
			shape.fillColor = 'grey';
			// Set the shadow color of the circle to RGB black:
			shape.shadowColor = new paper.Color(0, 0, 80);
			// Set the shadow blur radius to 12:
			shape.shadowBlur = 20;
			// Offset the shadow by { x: 5, y: 5 }
			shape.shadowOffset = new paper.Point(5, 5);
			// shape.selected=true;

			return shape;

		},
		newPosition : function(pointFigure, pointMouse) {
			if (Pro.pro.page.lastPoint) {
				// console.log("newPos x"+Pro.pro.page.lastPoint.x);
				console.log("newPos x" + pointMouse);
				var x = Pro.pro.page.lastPoint.x - pointMouse.x;
				var y = Pro.pro.page.lastPoint.y - pointMouse.y;
				Pro.pro.page.lastPoint = pointMouse;
				x = pointFigure.x - x;
				y = pointFigure.y - y;
				return new paper.Point(x, y);
			} else
				return null;
		},
		newPositionCircle : function(pointFigure, pointMouse) {
			if (Pro.pro.page.lastPointCircle) {
				// console.log("newPos x"+Pro.pro.page.lastPoint.x);
				console.log("newPos x" + pointMouse);
				var x = Pro.pro.page.lastPointCircle.x - pointMouse.x;
				var y = Pro.pro.page.lastPointCircle.y - pointMouse.y;
				Pro.pro.page.lastPointCircle = pointMouse;
				x = pointFigure.x - x;
				y = pointFigure.y - y;
				return new paper.Point(x, y);
			} else
				return null;
		},
		addnewObj : function(idObj) {

			var obj = Pro.pro.page.func.drawimageOnCanvas(idObj);
			obj.stateDraw = false;

			obj.position = new paper.Point(obj.position.x - 150, obj.position.y);
			obj.onMouseEnter = Pro.pro.page.events.eventMouseEnter;
			obj.onClick = Pro.pro.page.events.eventMouseClick;
			obj.onMouseDown = Pro.pro.page.events.eventMouseDown;
			// add to arrayList
			// Pro.pro.page.objectsArray.push(obj.img);
			// obj.img.onMouseMove = Pro.pro.page.events.eventMouseMove;
			obj.onMouseUp = Pro.pro.page.events.eventMouseUp;
			Pro.pro.page.objectsArray.push(obj);
		},
		/*
		 * what image is selected return index
		 */
		whoisimagestate : function() {

			// search img where stateDraw+ move image to new destination
			var res = null;
			Pro.pro.page.objectsArray.forEach(function(item, i, arr) {
				if (item.stateDraw == true) {
					console.log("OK search" + i);
					// arr[i].position=Pro.pro.page.curentrect.position;
					// arr[i].stateDraw=false;
					res = i;
					// break;
					// return nor work ((
				}
			});
			return res;
		},
		drawcirclesOnRect: function(point, size) {
			var arr=new Array();
			var x=point.x,y=point.y,wi=size.width,he=size.height;
			var obj=Pro.pro.page.func.drawcircle(x,y);   // 1 top left Rotate
			obj.onMouseEnter=Pro.pro.page.events.eventCircleRotateMouseEnter;
			obj.onMouseDown=Pro.pro.page.events.eventCircleRotateMouseDown;
			obj.onMouseUp=Pro.pro.page.events.eventCircleRotateMouseUp;
			obj.onMouseMove=Pro.pro.page.events.eventCircleRotateMouseMove;
			obj.stateDraw=false;
			arr.push(obj);
			
			//    просто разкоментировать
		//	arr.push(Pro.pro.page.func.drawcircle(x+wi,y));//2 top rigth
			//arr.push(Pro.pro.page.func.drawcircle(x+wi,y+he));//3 rigth bottom 
			//arr.push(Pro.pro.page.func.drawcircle(x,y+he));//4 down left
			
			return arr;
			
			
		},
		drawcircle: function(x,y) {
			var shape = new paper.Shape.Circle({
			    center: [x,y],
			    radius: 20,
			    strokeColor: 'black',
			    fillColor : 'blue'
			});
			return shape;
		}
	};

	Pro.pro.page.events = {
		/*
		 * event when mouse enter in area object
		 */
		eventMouseEnter : function(event, obj) {
			console.log("gif1 enter");
			// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);

		},
		/*
		 * event when mouse click in area object draw alfa rectangle
		 */
		eventMouseClick : function(event, obj) {
			console.log("click");

		},
		/*
		 * event when mouse move and dowd in curentRect object draw alfa
		 * rectangle
		 */
		eventMouseDown : function(event, obj) {
			console.log("move & down " + event.point);

			var index = Pro.pro.page.func.whoisimagestate();
			console.log("157 index " + index);
			if (index != null) {
				Pro.pro.page.objectsArray[index].stateDraw = false;
			}
			;

			this.stateDraw = true;
			this.bringToFront();
			Pro.pro.page.lastPoint = event.point;

			if (Pro.pro.page.curentrect) {
				// console.log(Pro.pro.page.curentrect);
				Pro.pro.page.curentrect.arrCircles[0].remove();
				Pro.pro.page.curentrect.remove();// removeOn({
				paper.view.update();
			}
			 

			// drag: true,
			// down: true
			// });
			Pro.pro.page.curentrect = Pro.pro.page.func.drawrect(
					this.bounds.point, this.bounds.size);
			// Pro.pro.page.curentrect.bringToFront();
			Pro.pro.page.curentrect.onMouseEnter = function(event) {
				console.log("curentrect enter reckt");
			};

		},
		eventMouseUp : function(event, obj) {

			Pro.pro.page.lastPoint = null;
			// Pro.pro.page.buzystate=false;
			this.stateDraw = false;

		},
		eventMouseMove : function(e) {
			console.log("121 move " + this.stateDraw);

			if (Pro.pro.page.lastPoint && this.stateDraw == true) {

				var pos = Pro.pro.page.func.newPosition(this.position, e.point);
				this.position = pos;
				Pro.pro.page.curentrect.position = pos;

			}
		},
		eventRectMouseMove : function(e) {
	
			if (Pro.pro.page.lastPoint && this.stateDraw == true) {

				var pos = Pro.pro.page.func.newPosition(this.position, e.point);
				this.position = pos;
				Pro.pro.page.curentrect.position = pos;
				//console.log("MMMMMMMMMMMM: "+pos);
				var p= new paper.Point(pos.x-(Pro.pro.page.curentrect.size.width/2),pos.y-(Pro.pro.page.curentrect.size.height/2));
				//console.log("MMMMMMMMMMMMeee: "+Pro.pro.page.curentrect.size.width);
				Pro.pro.page.curentrect.arrCircles[0].position=p;

			}
		},
		eventRectMouseUp : function(event, obj) {

			this.stateDraw = false;
			// search img where stateDraw+ move image to new destination
			console.log(Pro.pro.page.func.whoisimagestate());
			var index = Pro.pro.page.func.whoisimagestate();
			if (index == null) {
				return;
			}
			;
			// console.log("index " + index);
			Pro.pro.page.objectsArray[index].position = Pro.pro.page.curentrect.position;
			// console.log("index " + index);
			// Pro.pro.page.objectsArray[index].stateDraw=false;
			// Pro.pro.page.objectsArray.forEach(function(item, i, arr) {
			// if(item.stateDraw==true){
			// console.log("OK");
			// arr[i].position=Pro.pro.page.curentrect.position;
			// arr[i].stateDraw=false;
			// return;
			// }
			// }
			// );

		},
		eventRectMouseDown : function(event, obj) {

			Pro.pro.page.lastPoint = event.point;
		//	console.log("Mouse Down: " + event.point);
			// Pro.pro.page.buzystate=false;
			this.stateDraw = true;
		
			

		},
		 
		eventCircleRotateMouseEnter : function(event, obj) {
			//console.log("mouseRotateEnter");
			// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);

		},
		eventCircleRotateMouseDown : function(e, obj) {
		//console.log("mouseRotateDown "+e.point);
			Pro.pro.page.lastPointCircle=e.point;
			this.fillColor="gold";
			this.stateDraw=true;
			// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
			Pro.pro.page.objectsArray.forEach(function(element, index, array) {
				if(element.stateDraw==true){Pro.pro.page.curentImageIndex=index;
				};
			});

		},
		eventCircleRotateMouseUp : function(event, obj) {
			//console.log("mouseRotateDown");
			Pro.pro.page.lastPointCircle=null;
			this.fillColor="blue";
			this.stateDraw=false;
			// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
			Pro.pro.page.curentImageIndex=null;

		},
		eventCircleRotateMouseMove : function(e, obj) {
			//console.log("mouseRotateDown");
			console.log("300 moveCircle " + " P: " + Pro.pro.page.lastPointCircle
					+ " SD " + this.stateDraw);
			if (Pro.pro.page.lastPointCircle && this.stateDraw == true) {
				//var pos = Pro.pro.page.func.newPosition(e.point, this.position);
				try {
					
				
				var xc=Pro.pro.page.lastPointCircle.x;
				var yc=Pro.pro.page.lastPointCircle.y;
				//var xr=Pro.pro.page.curentrect.point.x;
				//var yr=Pro.pro.page.curentrect.point.y;
				var pos = Pro.pro.page.func.newPositionCircle(this.position, e.point);
				this.position = pos;
				// move squere n image
				//Pro.pro.page.curentrect.position=e.point;
				//var res=e.point.y-Pro.pro.page.curentrect.position.y-Pro.pro.page.curentrect.position.y-yc;
		//	var res1=e.point.y-Pro.pro.page.lastPointCircle.y;
			var newH=(Pro.pro.page.curentrect.position.y-pos.y)*2;
			var newW=(Pro.pro.page.curentrect.position.x-pos.x)*2;
				//console.log("heightrect ::: "+s);
				//Pro.pro.page.curentrect.scale(1.05,Pro.pro.page.curentrect.position);
			//Pro.pro.page.curentrect.bounds=new paper.Rectangle(e.point.x,e.point.y,Pro.pro.page.curentrect.size.width,Pro.pro.page.curentrect.size.height+res1);
			var oldH=Pro.pro.page.curentrect.size.height;
			var oldW=Pro.pro.page.curentrect.size.width;
			Pro.pro.page.curentrect.size=new paper.Size(newW,newH);
				
				// take image and resize
				if(Pro.pro.page.curentImageIndex!=null){
				var obj=Pro.pro.page.objectsArray[Pro.pro.page.curentImageIndex];
				//obj.size=Pro.pro.page.curentrect.size;
		 // matrix
				//obj.translate(new paper.Point(2,7));
				newH=Pro.pro.page.curentrect.size.height;
			    newW=Pro.pro.page.curentrect.size.width;
				var resW=(newW*100/oldW)/100;
				var resH=(newH*100/oldH)/100;//ready
				console.log("resH: "+resH+ " resW: "+resW);
				obj.scale(resW, resH);
				
				
				};
				} catch (e) {
					console.log(e.stack);
				}
				}
			
			
			
			//this.fillColor="blue";
			// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);

		}
		

	};

	// push mew image
	Pro.pro.page.func.addnewObj("td1");
	Pro.pro.page.func.addnewObj("td1");
	// Pro.pro.page.func.addnewObj("t1");
	Pro.pro.page.func.addnewObj("gif1");

};