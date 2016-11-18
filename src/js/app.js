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
	//modal
	$(document).on('click', '#modap-open', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('#modal-container').fadeIn('1000');
	});
	$(document).on('click', '.modal__background, #modal-close', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('#modal-container').fadeOut('1000');
	});
	//form
	$(document).on('click', '#submit', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('#form').submit();
	});

	$(document).on('submit', '#form', function(event) {
		event.preventDefault();
		/* Act on the event */
		var data = $(this).serialize();
		$.ajax({
			url: 'form.php',
			type: 'POST',
			data: data,
			success: function (data, textStatus, xhr) {
				console.log(data);
				alert('success')
			},
			error: function (xhr, textStatus, errorThrown) {
				console.log(xhr);
				alert('error');
			}
		});
	});
})(jQuery)