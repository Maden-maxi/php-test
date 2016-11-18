( $ => {
	$('.material-form--block input').focusout(function(){
		var textVal = $(this).val();
		if (textVal === "") {
			$(this).removeClass('hasValue');
		} else {
			$(this).addClass('hasValue');
		}
	});
	var material;
	$(document).ready(function () {
		return material.init();
	});
	material = {
		init: function () {
			return this.bind_events();
		},
		bind_events: function () {
			return $(document).on('click', '.btn', function (e) {
				var circle, size, x, y;
				e.preventDefault();
				circle = $('<div class=\'circle\'></div>');
				$(this).append(circle);
				x = e.pageX - $(this).offset().left - circle.width() / 2;
				y = e.pageY - $(this).offset().top - circle.height() / 2;
				size = $(this).width();
				circle.css({
					top: y + 'px',
					left: x + 'px',
					width: size + 'px',
					height: size + 'px'
				}).addClass('animate');
				return setTimeout(function () {
					return circle.remove();
				}, 500);
			});
		}
	};
	$('.button').click(function(){
		var buttonId = $(this).attr('id');
		$('#modal-container').removeAttr('class').addClass(buttonId);
		$('body').addClass('modal-active');
	})

	$('.btn').click(function(){
		$('#modal-container').addClass('out');
		$('body').removeClass('modal-active');
	});
})(jQuery)