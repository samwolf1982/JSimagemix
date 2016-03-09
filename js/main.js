/**
 * @author Sam
 */

var Pro={};
Pro.pro={};

/*
 * global value
 */
Pro.pro.page={
	curentrect: null,    //curent rectangle 
	 alfarect: null,      // mainrect
	 stateofmouseDow: false,  // state of mouse
	 objectsArray: new Array(),
	 lastPoint: null
	 //buzystate: false     //     состояние рисование
	 
	 
};
Pro.pro.page.func={
	//takecanvas.. later
		/*
		 * draw  one image
		 */
		 drawimageOnCanvas: function(imageId,pointState,imageSize){
			 
			  var rastertGif = new Raster(imageId);
			  rastertGif.ondragstart = function() {
				  return false;
				};
			  if(pointState) {rastertGif.position=pointState;};
			  if(imageSize) {rastertGif.size=imageSize;};
			 rastertGif.position = view.center;
			 return rastertGif;
		},
	    /*
	     * draw border around image.  return border
	     * 
	     */
		 drawrect: function(point,size) {
	    	var shape = new Shape.Rectangle(point, size);
	    	shape.strokeColor = 'black';
	    	return shape;
	    	
	    },
	    newPosition: function(pointFigure,pointMouse) {
	    	if(Pro.pro.page.lastPoint){
	    		//console.log("newPos x"+Pro.pro.page.lastPoint.x);
	    		console.log("newPos x"+pointMouse);
	    	var x=	Pro.pro.page.lastPoint.x-pointMouse.x;
	    	var y=	Pro.pro.page.lastPoint.y-pointMouse.y;
	    	Pro.pro.page.lastPoint=pointMouse;
	    x=	pointFigure.x-x;
	    y=	pointFigure.y-y;
	    return new Point(x,y);
	    	}else return null;
		}, 
		addnewObj: function (idObj){
			var obj={stateDraw: false};
			 obj.img=Pro.pro.page.func.drawimageOnCanvas(idObj);
		
			obj.img.position=new Point(obj.img.position.x-150,obj.img.position.y);
			obj.img.onMouseEnter = Pro.pro.page.events.eventMouseEnter;
			obj.img.onClick=Pro.pro.page.events.eventMouseClick;
			obj.img.onMouseDown=Pro.pro.page.events.eventMouseDown;
			Pro.pro.page.objectsArray.push(obj.img);
			obj.img.onMouseMove=Pro.pro.page.events.eventMouseMove;
			obj.img.onMouseUp=Pro.pro.page.events.eventMouseUp;
			Pro.pro.page.objectsArray.push(obj.img);
		}
              };
Pro.pro.page.events={
		/*
		 * event when mouse enter in area object
		 */
		eventMouseEnter: function(event,obj) {
	    	console.log("gif1 enter");
	    	//Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
	    	
	    },
	    /*
	     * event when mouse click in area object
	     * draw alfa rectangle
	     */
	    eventMouseClick: function(event,obj) {
	    	console.log("click");
	    	
	 
	    	//this.selected = true;
	  
	    
	    //curentrect.onMouseMove== function(event) {
	    //	console.log("move & down");
	    //	this.selected = true;
	   // };
	    	//Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
	    	
	    },
	    /*
	     * event when mouse move and dowd in curentRect object
	     * draw alfa rectangle
	     */
	    eventMouseDown: function(event,obj) {
	    	console.log("move & down "+event.point);
	    //	Pro.pro.page.buzystate=true;
	    	this.stateDraw=true;
	    	this.bringToFront();
	    	Pro.pro.page.lastPoint=event.point;
	    	
	    	if(Pro.pro.page.curentrect)Pro.pro.page.curentrect.remove();
	    	Pro.pro.page.curentrect=Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
	    	Pro.pro.page.curentrect.onMouseEnter=function(event){
		    	console.log("curentrect enter reckt");
		    };
		    Pro.pro.page.curentrect.onMouseMove= function(event){
		    	console.log("curentrect mOVE mouse");
		    };
	    //	if(curentrect)curentrect.remove();
	   // curentrect=	Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
	    	//Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
	    	
	    },
	    eventMouseUp: function(event,obj) {
	    	
	    	Pro.pro.page.lastPoint=null;
	    	//Pro.pro.page.buzystate=false;
	    	this.stateDraw=false;
	    
	    	
	      
	    //	if(curentrect)curentrect.remove();
	   // curentrect=	Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
	    	//Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
	    	
	    },
	    eventMouseMove: function(e){
	    	console.log("121 move "+ this.stateDraw);
	    	
	          if(Pro.pro.page.lastPoint && this.stateDraw==true){
		
		var pos=	Pro.pro.page.func.newPosition(this.position, e.point);
		this.position=pos;
Pro.pro.page.curentrect.position=pos;
		// move curent rect
		
	          }}
	    
	  

};
//var canv= document.getElementById('can');
//canv.onmousemove(function( event ) {
  //       console.log("CanMove");
//	});

// push mew image
Pro.pro.page.func.addnewObj("t1");
Pro.pro.page.func.addnewObj("t1");
Pro.pro.page.func.addnewObj("gif1");


	//var curentrect=null;
	//var stateofmouseDown=false;


