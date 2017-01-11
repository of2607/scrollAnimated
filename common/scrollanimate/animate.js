
(function($) {
				 
	$.fn.scrollAnimate = function(options) {

				var animatedNameIn  =  ["bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flipInX", "flipInY", "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rollIn", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "slideInDown", "slideInLeft", "slideInRight", "slideInUp"];
				var animatedNameOut =  ["hinge","bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flipOutX", "flipOutY", "lightSpeedOut", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "rollOut", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"];
				var randomAnimate   =  Math.floor(Math.random()*((animatedNameIn.length-1)-0));
                
                
                //預設值
				var settings = $.extend({
								            animate   : animatedNameIn[randomAnimate],  // animated name
								            infinite  : "no",                         // 是否循環 (yes/no)
								            byItem    : "no",                           // 多個依序顯示 (yes/no)
								            time      : "1000",                           // 動畫時間 (預設 1000=1s)
								            delay     : "200",                           // 延遲時間 (預設 200)
								        }, options );

				//設定
				var animatedSetting=[
										{
											"target"    :  this,              // 目標 
											"animate"   :  settings.animate,  // animated name
											"infinite"  :  settings.infinite, // 是否循環 (yes/no)
											"byItem"    :  settings.byItem,   // 多個依序顯示 (yes/no)
											"time"      :  settings.time,     // 動畫時間 (預設 1000=1s)
											"delay"     :  settings.delay,    // 延遲時間 (預設 200)
										}
									];




				$.each(animatedSetting, function( index, item ) {
					var target      =  item["target"];
					var animateTime =  (item["time"] / 1000) + 's';
					//預先隱藏target
					$(target).css("opacity",0);
					//設定動畫執行時間
					if(animateTime){$(target).css({"animation-duration":animateTime,"-webkit-animation-duration":animateTime}); }
				});



				$(window).on('load scroll resize',function(){
					$.each(animatedSetting, function( index, item ) {
					   var target         =   item["target"];
					   var targetPos      =   $(target).offset().top-window.screen.height*.50;
					   var animateMode    =   item["infinite"]=='yes'? " infinite":"";
					   var animateClass   =   "animated " + item["animate"] + animateMode;
					   var animateEnd     =   "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
					   var animateDelay   =   (item["delay"])?item["delay"]:parseInt(200);
					   
					   if($(window).scrollTop()>=targetPos) {
					   		if(item["byItem"]=="yes"){
					   			$(target).each(function(index){
					   				setTimeout(function(){
					   					$(target).eq(index).addClass(animateClass).css({opacity:1});
					   				},animateDelay*(index+1));
					   			});
					   		}else{
					   			setTimeout(function(){
							   	 	$(target).addClass(animateClass).css({opacity:1});
							   	},animateDelay);
					   		}

					   }
					});	
				});
	};

})(jQuery);