/**
 * @author Sam
 */

var Pro={
		
		errorfunn: function(e) {
			return "Message: "+e.stack;
		},
		testvlick:	function () {
			console.log("testvlick");
		}
};
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
			 try {	
				 var rastertGif=null;
			 
				rastertGif = new paper.Raster(imageId);
				 
				  rastertGif.ondragstart = function() {
					  return false;
					};
				  if(pointState) {rastertGif.position=pointState;};
				  if(imageSize) {rastertGif.size=imageSize;};
				 rastertGif.position = view.center;
				 return rastertGif;
				
			} catch (e) {
				// TODO: handle exception
				console.log(Pro.errorfunn(e));
			}
		
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
			try {
				var obj={stateDraw: false};
				 obj.img=Pro.pro.page.func.drawimageOnCanvas(idObj);
				// if(obj.img.position==undefined){
					 //if(view==undefined){obj.img.position=new paper.Point(200,200); }
					 //else{
					// obj.img.position=view.center;}}
				 //else{
				//	 obj.img.position=new paper.Point(obj.img.position.x-150,obj.img.position.y);
			//	 };
			
				
				obj.img.onMouseEnter = Pro.pro.page.events.eventMouseEnter;
				obj.img.onClick=Pro.pro.page.events.eventMouseClick;
				obj.img.onMouseDown=Pro.pro.page.events.eventMouseDown;
				Pro.pro.page.objectsArray.push(obj.img);
				obj.img.onMouseMove=Pro.pro.page.events.eventMouseMove;
				obj.img.onMouseUp=Pro.pro.page.events.eventMouseUp;
				Pro.pro.page.objectsArray.push(obj.img);
			} catch (e) {
				console.log(Pro.errorfunn(e));
			}
		
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
Pro.pro.page.func.addnewObj("td1");
Pro.pro.page.func.addnewObj("td1");
//Pro.pro.page.func.addnewObj("t1");
Pro.pro.page.func.addnewObj("gif1");
function go() {
	Pro.pro.page.func.addnewObj("td1");	
}

	//var curentrect=null;
	//var stateofmouseDown=false;






function testvlick() {
	console.log("testvlick");
}
  var iconSelect;

        window.onload = function(){
        	paper.install(window);
        	paper.install(Pro);
            iconSelect = new IconSelect("my-icon-select", 
                {'selectedIconWidth':48,
                'selectedIconHeight':48,
                'selectedBoxPadding':1,
                'iconsWidth':23,
                'iconsHeight':23,
                'boxIconSpace':1,
                'vectoralIconNumber':4,
                'horizontalIconNumber':4});

            var icons = [];
            icons.push({'iconFilePath':'img/turang/1.png', 'iconValue':'1'});
            icons.push({'iconFilePath':'images/icons/2.png', 'iconValue':'2'});
            icons.push({'iconFilePath':'images/icons/3.png', 'iconValue':'3'});
            icons.push({'iconFilePath':'images/icons/4.png', 'iconValue':'4'});
            icons.push({'iconFilePath':'images/icons/5.png', 'iconValue':'5'});
            icons.push({'iconFilePath':'images/icons/6.png', 'iconValue':'6'});
            icons.push({'iconFilePath':'images/icons/7.png', 'iconValue':'7'});
            icons.push({'iconFilePath':'images/icons/8.png', 'iconValue':'8'});
            icons.push({'iconFilePath':'images/icons/9.png', 'iconValue':'9'});
            icons.push({'iconFilePath':'images/icons/10.png', 'iconValue':'10'});
            icons.push({'iconFilePath':'images/icons/11.png', 'iconValue':'11'});
            icons.push({'iconFilePath':'images/icons/12.png', 'iconValue':'12'});
            icons.push({'iconFilePath':'images/icons/13.png', 'iconValue':'13'});
            icons.push({'iconFilePath':'images/icons/14.png', 'iconValue':'14'});
            
            iconSelect.refresh(icons);

        };
            