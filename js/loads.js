/**
 * @author Sam
 */
  var iconSelect;
function hi() {
	console.log("HIHI");
}
        window.onload = function(){

            iconSelect = new IconSelect("my-icon-select", 
                {'selectedIconWidth':48,
                'selectedIconHeight':48,
                'selectedBoxPadding':1,
                'iconsWidth':23,
                'iconsHeight':23,
                'boxIconSpace':1,
                'vectoralIconNumber':4,
                'horizontalIconNumber':4,
                'onclick': 'hi'});

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

            var elem = $('.icon img');
            var iter=0;
            elem.each(function() {
            	 $(this).attr("id", "ic"+iter++);
            	 $(this).click(function (e) {
            		 console.log("Qwi qwi");
            	 Pro.pro.page.func.addnewObj("ic6");
            	 });
            	 
			});
            
            
            
        };
            