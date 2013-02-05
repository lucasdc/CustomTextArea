(function($,w,d,u){
	$.fn.customScroll = function(opts){
		var settings = {
			step : 5,
			time : 20	
		};
		$.extend(settings, opts);
		
		function doScroll(elm, scrollmax, isup){
			var s = elm.scrollTop();
			s += isup ? -settings.step : settings.step;
			elm.scrollTop(s);
			
			elm.parent().find('.btnup').toggleClass('disabled', s <= 0);
			elm.parent().find('.btndown').toggleClass('disabled', s >= scrollmax);
			
			if(elm.data('mdown'))
				setTimeout(function(){doScroll(elm, scrollmax, isup);},settings.time);
		}
		
		return $(this).each(function(i,elm){
			elm = $(this);
			var pai = elm.wrap('<div class="scrollwrapper" />').closest('.scrollwrapper'),
				scrollmax = elm.prop('scrollHeight') - elm.outerHeight();
			
			pai.prepend('<div class="scrollbtn btnup" />');
			pai.prepend('<h2><span>' + elm.data('titulo') + '</span></h2>'); 
			pai.append('<div class="scrollbtn btndown" />');
				
			if(scrollmax > 0) {
				elm.css({overflow:'hidden'});
				scrollmax = elm.prop('scrollHeight') - elm.outerHeight();
				
				pai.find('.scrollbtn').hover(function(e){
					elm.data('mdown', e.type == "mouseenter");
					if(elm.data('mdown'))
						doScroll(elm, scrollmax, $(this).hasClass('btnup'));
				});
				
				elm.bind('mousewheel',function(ev,dx,dy,delta){
					doScroll(elm, scrollmax, dx > 0);
					return false;
				});
				
				var s = elm.scrollTop();
				elm.parent().find('.btnup').toggleClass('disabled', s <= 0);
				elm.parent().find('.btndown').toggleClass('disabled', s >= scrollmax);
				
			} else {
				elm.css({overflow:'hidden'});
				elm.parent().find('.btnup').addClass('disabled');
				elm.parent().find('.btndown').addClass('disabled');
			}
		});
	};
}(jQuery, window, document));