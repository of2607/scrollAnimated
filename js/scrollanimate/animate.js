
(function($) {
				 
	$.fn.scrollAnimate = function(options) {

				var animatedNameIn  =  ["bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flipInX", "flipInY", "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rollIn", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "slideInDown", "slideInLeft", "slideInRight", "slideInUp"];
				var animatedNameOut =  ["hinge","bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flipOutX", "flipOutY", "lightSpeedOut", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "rollOut", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"];
				var randomAnimate   =  Math.floor(Math.random()*((animatedNameIn.length-1)-0));
                
                
                //預設值
				var settings = $.extend({
								            animate       : animatedNameIn[randomAnimate],  // animated name (亂數)
								            infinite      : "no",                           // 是否循環 (yes/no)
								            byItem        : "no",                           // 多個依序顯示 (yes/no)
								            time          : "800",                          // 動畫時間 (預設 1000=1s)
								            delay         : "200",                          // 延遲時間 (預設 200)
								            animate_out   : false,                          // 設定是否逆動畫
								            triggerSet    : .5,                             // 觸發位置

								            distance      : "150",                           // animate = scrollMove用，設定移動距離
								            moveto        : "top",                           // animate = scrollMove用，設定移動方向
								        }, options );

				//設定
				var animatedSetting=[
										{
											"target"        :  this,              // 目標 
											"animate"       :  settings.animate,  // animated name
											"infinite"      :  settings.infinite, // 是否循環 (yes/no)
											"byItem"        :  settings.byItem,   // 多個依序顯示 (yes/no)
											"time"          :  settings.time,     // 動畫時間 (預設 1000=1s)
											"delay"         :  settings.delay,    // 延遲時間 (預設 200)
											"animate_out"   :  settings.animate_out,    // 設定是否逆動畫 (預設 否)
											"triggerSet"    :  settings.triggerSet,    // 觸發位置

											"distance"      :  settings.distance, // 設定移動距離 (預設 150)
											"moveto"        :  settings.moveto  , // 設定移動方向 (預設 top)
										}
									];

			//判斷模式：進出動畫或移動
			$.each(animatedSetting, function( index, item ) {
				var scrollMode=item["animate"];
				// console.log(scrollMode);
					

				switch(scrollMode){

					//scroll move
					case 'scrollMove':
						//scroll move Start  -------------------
							$(function(){
								scrollMove(item["target"] , moveDistance=item["distance"] , item["moveto"]);  
							});

							function scrollMove( $obj , moveDistance , moveto ){
							   

							    if($obj.length){

							        $obj.css({
							             'position':'relative',
							             'transition':'top 1s cubic-bezier(0.11, 0.29, 0.62, 0.88)',
							             '-webkit-transition':'top 1s cubic-bezier(0.11, 0.29, 0.62, 0.88)',
							         });



							        //set distance and moveto
							        tmpData=$obj.attr('data-scrollMove');
							        
							        if(tmpData!=undefined && tmpData !=''){
							            tmpData=JSON.parse(tmpData);
							            moveDistance = (tmpData['moveDistance']!=undefined) ? tmpData['moveDistance'] : moveDistance;
							            moveto = (tmpData['moveto']!=undefined) ? tmpData['moveto'] : moveto;
							        }           

							       
							       $(window).scroll(function(){
							            objHeight     = $obj.height();
							            objOffsetTop  = $obj.offset().top;            
							            winH          = $(window).innerHeight();
							            objViewStart  = objOffsetTop;
							            objViewEnd    = objHeight+objOffsetTop;

							            scrollTop     = $(window).scrollTop();
							            nowViewStart  = scrollTop;
							            nowViewEnd    = scrollTop+winH;
							                

							            if( (objViewStart<nowViewEnd) && (nowViewStart<objViewEnd) ) {                
							                // console.log("obj in");
							                
							                // set move distance (%)
							                movePercent = parseInt((nowViewEnd-objViewStart) / winH * moveDistance);
							                // get now css top
							                objCssTop   = parseInt($obj.css('top').replace('px',''));

							                // set new pos
							                if (moveto=='top')   {newTop=(moveDistance*.5)-movePercent; }
							                if (moveto=='bottom'){newTop=(-moveDistance*.5)+movePercent }
							                
							                $obj.css({'top':newTop});
							                return false;

							            
							            } else {

							                // console.log("obj out");
							                return false;
							            }

							       });
							    }
							}
						//scroll move END  -------------------
						break;





					//scroll animate
					default:

						//scroll animate.css  START -------------------

							var itemPos=[];
							$.each(animatedSetting, function( index, item ) {
								var target      =  item["target"];
								var animateTime =  (item["time"] / 1000) + 's';
								//設定動畫執行時間
								if(animateTime){$(target).css({"animation-duration":animateTime,"-webkit-animation-duration":animateTime}); }
					   			
					   			setTimeout(function(){
										//記錄初始pos
								   	 	itemPos[index]=$(target).offset().top;
										// console.log(itemPos[index]);
										
										//預先隱藏target
										$(target).addClass("animated " + item["animate_out"]);
							   	},300);
							});

							var nowscroll;
							$(window).on('load scroll resize',function(e){
								nowscroll = scrollUpDown(e);
								// console.log(nowscroll);
								
								$.each(animatedSetting, function( index, item ) {
								   var target             =   item["target"];
								   var targetPos          =   itemPos[index];
								   var startPos           =   targetPos-$(window).scrollTop();
								   var triggerPos         =   window.screen.height*item["triggerSet"];
								   var animateMode        =   item["infinite"]=='yes'? " infinite":"";
								   var animateClass       =   "animated " + item["animate"] + animateMode;
								   var animateClass_out   =   "animated " + item["animate_out"] + animateMode;
								   var animateEnd         =   "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
								   var animateDelay       =   (item["delay"])?item["delay"]:parseInt(200);


								   if(nowscroll=='down' && startPos<triggerPos) {
									   	// console.log('animate down');
									   	if(!$(target).hasClass(item["animate"])){
									   		
									   		if(item["byItem"]=="yes"){
									   			$(target).each(function(index){
									   				setTimeout(function(){
									   					$(target).eq(index).addClass(animateClass).removeClass(item["animate_out"]);
									   				},animateDelay*(index+1));
									   			});
									   		}else{
									   			setTimeout(function(){
												   	 	$(target).addClass(animateClass).removeClass(item["animate_out"]);
											   	},animateDelay);
									   		}
										   
									   	}

								   }else if(nowscroll=='up' && startPos>triggerPos) {
									   	
									   	// console.log('animate up');
									   	if(!$(target).hasClass(item["animate_out"])){

								   	   		if(item["byItem"]=="yes"){
								   	   			$(target).each(function(index){
								   	   				setTimeout(function(){
								   	   					$(target).eq(index).addClass(animateClass_out).removeClass(item["animate"]);;
								   	   				},animateDelay*(index+1));
								   	   			});
								   	   		}else{
								   	   			setTimeout(function(){
								   				   	 	$(target).addClass(animateClass_out).removeClass(item["animate"]);;
								   			   	},animateDelay);
								   	   		}
									   	}

								   }//end up

								});
							});

						//scroll animate.css END  -------------------

						break;
						//end  default

				}//end switch (scrollMode)

			});//結束判斷 


			//判斷往下/往上滾
			var tmpPos=0;
			var nowPos=0;
			function scrollUpDown(){
			    nowPos=$(window).scrollTop();
	    		// console.log("nowpos:"+nowPos);
    		    nowscroll=(nowPos>tmpPos)?'down':'up';
				tmpPos=nowPos;
			    return  nowscroll ;
			}



	}; //end scrollAnimate

})(jQuery);