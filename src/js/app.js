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
		$('.spin-wrapper').removeClass('hidden');
		var data = $(this).serialize();
		$.ajax({
			url: 'form.php',
			type: 'POST',
			data: data,
			success: function (data) {
				let response = $.parseJSON(data);
				console.log(response);
				var successes = 0;
				$('.error-info').each(function (i) {
					if(response[i].errorStatus != 'success'){
						$(`#${response[i].fieldname}`).siblings('.error-info').text(response[i].errorMsg);
					} else if(response[i].errorStatus == 'success') {
						successes++;
						$(`#${response[i].fieldname}`).siblings('.error-info').text("");
					}
					console.log($(`#${response[i].fieldname}`).next(),response[i].errorMsg);
					console.log(successes,response.length);
				});
				if(response.length == successes){
					console.log('reset');
					//document.getElementById("form").reset();
					$("#form input").val("");
					$("#form .error-info").val("");
					$("#success-notify").fadeIn("1000");
					setTimeout(function () {
						$("#success-notify").fadeOut("1000");
						setTimeout(function () {
							$("#modal-close").click();
						}, 1000)
					},3000);


				}
				$('.spin-wrapper').addClass('hidden');

			},
			error: function (xhr, textStatus, errorThrown) {
				console.log(xhr, textStatus, errorThrown);
				alert('error');
			}
		});
		return false;
	});
})(jQuery)