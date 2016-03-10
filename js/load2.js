/**
 * @author Sam
 */
// Only executed our code once the DOM is ready.
window.onload = function() {
	// Get a reference to the canvas object
	var canvas = document.getElementById('myCanvas');
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
	
	
	var handle;
	// Create a circle shaped path at the center of the view,
	// with a radius of 100:
	var path = new paper.Path.Circle(paper.view.center, 100);
	path.strokeColor = 'black';
	
	// Fully select the path, so we can see its handles:
	path.fullySelected = true;
	path.onmousedowm= function onMouseDown(event) {
		handle = null;
		// Do a hit test on path for handles:
		var hitResult = path.hitTest(event.point, { handles: true });
		if (hitResult) {
			if (hitResult.type == 'handle-in') {
				handle = hitResult.segment.handleIn;
			} else {
				handle = hitResult.segment.handleOut;
			};
		}
	}
	
	function onMouseDrag(event) {
		// If we hit a handle before, move it:
		if (handle) {
			handle.x += event.delta.x;
			handle.y += event.delta.y;
		}
	}

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
		lastPoint : null

	};
	Pro.pro.page.test={
	    addrect: function() {
	    	var point = new paper.Point(20, 20);
	    	var size = new paper.Size(60, 60);
	    	var shape = new paper.Shape.Rectangle(point, size);
	    	shape.tt=true;
	    	Pro.pro.page.curentrect=shape;
	    	shape.strokeColor = 'black';
shape.selected=true;
		},
		
		removerect: function() {
			console.log("rem");

	
		Pro.pro.page.curentrect.remove();
			paper.view.update();
		}
		
	};
	Pro.pro.page.func = {
		// takecanvas.. later
		/*
		 * draw one image
		 */
		drawimageOnCanvas : function(imageId, pointState, imageSize) {

			var rastertGif = new paper.Raster(imageId);
			rastertGif.ondragstart = function() {
				return false;
			};
			if (pointState) {
				rastertGif.position = pointState;
			}
			;
			if (imageSize) {
				rastertGif.size = imageSize;
			}
			;
			rastertGif.position = paper.view.center;
			return rastertGif;
		},
		/*
		 * draw border around image. return border
		 * 
		 */
		drawrect : function(point, size) {
			var shape = new paper.Shape.Rectangle(point, size);
			console.log(shape);
			shape.stateDraw=true;
			console.log(shape);
			shape.onMouseUp =Pro.pro.page.events.eventRectMouseUp;
			shape.onMouseMove=Pro.pro.page.events.eventRectMouseMove;
			shape.onMouseDown=Pro.pro.page.events.eventRectMouseDown;
			shape.strokeColor = 'black';
			shape.opacity = 0.2;
			shape.fillColor= 'grey';
			// Set the shadow color of the circle to RGB black:
		    shape.shadowColor= new paper.Color(0, 0, 80);
		    // Set the shadow blur radius to 12:
		    shape.shadowBlur= 20;
		    // Offset the shadow by { x: 5, y: 5 }
		    shape=shadowOffset= new paper.Point(5, 5);
		  
		    
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
		addnewObj : function(idObj) {
			var obj = {
				stateDraw : false
			};
			obj.img = Pro.pro.page.func.drawimageOnCanvas(idObj);

			obj.img.position = new paper.Point(obj.img.position.x - 150,
					obj.img.position.y);
			obj.img.onMouseEnter = Pro.pro.page.events.eventMouseEnter;
			obj.img.onClick = Pro.pro.page.events.eventMouseClick;
			obj.img.onMouseDown = Pro.pro.page.events.eventMouseDown;
			// add to arrayList
			Pro.pro.page.objectsArray.push(obj.img);
//obj.img.onMouseMove = Pro.pro.page.events.eventMouseMove;
			obj.img.onMouseUp = Pro.pro.page.events.eventMouseUp;
			Pro.pro.page.objectsArray.push(obj.img);
		},
		drawcirkce: function() {
			
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

			this.stateDraw = true;
			this.bringToFront();
			Pro.pro.page.lastPoint = event.point;

			if (Pro.pro.page.curentrect)
				Pro.pro.page.curentrect.removeOn();//removeOn({
			     //   drag: true,
			   //     down: true
			 //   });
			Pro.pro.page.curentrect = Pro.pro.page.func.drawrect(
					this.bounds.point, this.bounds.size);
			//Pro.pro.page.curentrect.bringToFront();
			Pro.pro.page.curentrect.onMouseEnter = function(event) {
				console.log("curentrect enter reckt");
			};
			Pro.pro.page.curentrect.onMouseMove = function(event) {
				console.log("curentrect mOVE mouse");
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
			console.log("121 move RECT "+" P: "+Pro.pro.page.lastPoint+ " SD "+this.stateDraw );
			if (Pro.pro.page.lastPoint && this.stateDraw == true) {

				var pos = Pro.pro.page.func.newPosition(this.position, e.point);
				this.position = pos;
				Pro.pro.page.curentrect.position = pos;

			}
		},
			eventRectMouseUp : function(event, obj) {

				Pro.pro.page.lastPoint = null;
				// Pro.pro.page.buzystate=false;
				this.stateDraw = false;

			},
		eventRectMouseDown : function(event, obj) {

			Pro.pro.page.lastPoint = event.point;
			console.log("Mouse Down: "+event.point);
			// Pro.pro.page.buzystate=false;
			this.stateDraw = true;

		}
		
		

	};
	Pro.pro.page.test.addrect();
	// push mew image
	//Pro.pro.page.func.addnewObj("td1");
	//Pro.pro.page.func.addnewObj("td1");
	// Pro.pro.page.func.addnewObj("t1");
	//Pro.pro.page.func.addnewObj("gif1");

};