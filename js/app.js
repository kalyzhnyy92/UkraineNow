jQuery(($) => {

	//Responsive hamburger menu
	$(document).ready(function() {
		function burgerMenu(selector) {
			let menu = $(selector);
			let button = menu.find('.mobile-menu__button', '.mobile-menu__lines');
			let links = menu.find('.mobile-menu__link');
			let overlay = menu.find('.mobile-menu__overlay');

			button.on('click', (e) => {
				e.preventDefault();
				toggleMenu();
			});

			links.on('click', () => toggleMenu());
			overlay.on('click', () => toggleMenu());

			function toggleMenu(){
				menu.toggleClass('mobile-menu__active');

				if (menu.hasClass('mobile-menu__active')) {
					$('body').css('overlow', 'hidden');
				} else {
					$('body').css('overlow', 'visible');
				}
			}
		}

		burgerMenu('.mobile-menu');
	});



	// Слайдер slick news-slider
	$(document).ready(function() {

		function renderSlider(count, sliderbtn){

			var $prev = (sliderbtn.is(':first-child')) ? count.children().last() : sliderbtn.prev();

			var small = $prev.attr('src').split('/large/').join('/small/');
			$('.js-prev').html('<div class="news-slider__picture"><img class="news-slider__pic" src="'+small+'" alt="slider"></div><div class="news-slider__icon-prev"><svg class="news-slider__icon" width="30" height="21" viewBox="0 0 30 21"><use xlink:href="img/svg/news-slick-angle-left.svg#news-left"></use></svg></div>');

			var $next = sliderbtn.next();

			var small = $next.attr('src').split('/large/').join('/small/');
			$('.js-next').html('<div class="news-slider__picture"><img class="news-slider__pic" src="'+small+'" alt="slider"></div><div class="news-slider__icon-next"><svg class="news-slider__icon" width="30" height="21" viewBox="0 0 30 21"><use xlink:href="img/svg/news-slick-angle-right.svg#news-right"></use></svg></div>');

			var current = count.triggerHandler( 'currentPosition' );
			$('.js-count').text( (current+1) + ' / ' + count.find('img').length );

			var line = $('.js-line').width() / count.find('img').length / $('.js-line').width() * 100;
			$('.js-line .news-slider__span').css({'width': line+'%', 'right': (100-(line*(current+1)))+'%'});
		}

		$('.js-slider').carouFredSel({
			responsive: true,
			auto: {
				play: true,
				timeoutDuration: 1500
			},
			swipe: {
				onTouch: true
			},
			scroll: {
				items: 1,
				fx: "crossfade",
				duration: 500,
				pauseOnHover: true,
				onBefore: function( data ) {
					renderSlider( $(this), data.items.visible );
				}
			},
			prev: $('.js-prev'),
			next: $('.js-next'),
			onCreate: function( data ) {
				renderSlider( $(this), data.items );
			}
		});

	});


	// Слайдер slick similar
	$(document).ready(function(){
		$('.similar__slider').slick({

			arrows:true, // показать стрелки
			dots:false, // не показывать точки
			slidesToShow:4, // показывать по 4 слайда
			autoplay:true, // автоматическое проигрывание слайдов
			// speed:1000,
			// autoplaySpeed:800,
			// variableWidth:true,
			appendArrows: $('.similar__button'),
			prevArrow: "<button class='similar__slider-prev'><svg class='similar__icon' width='10' height='16' viewBox='0 0 10 16'><use xlink:href='img/svg/slick-angle-left.svg#slick-left'></use></svg></button>",
			nextArrow: "<button class='similar__slider-next'><svg class='similar__icon' width='10' height='16' viewBox='0 0 10 16'><use xlink:href='img/svg/slick-angle-right.svg#slick-right'></use></svg></button>",
			responsive:[
				{
					breakpoint: 1750,
					settings: {
						slidesToShow:3
					}
				},
				{
					breakpoint: 1320,
					settings: {
						slidesToShow:2
					}
				},
				{
					breakpoint: 890,
					settings: {
						slidesToShow:1
					}
				}
			]
		});
	});

	// Magnific Popup
	$(document).ready(function() {
		$('.photo__grid').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>Зустріч з виборцями у місті Херсон</small>';
				}
			}
		});
	});

	// Masonry создание адаптивных плиток
	$(document).ready(function() {
		var $container = $(".photo__grid");
		$container.imagesLoaded(function () {
			$container.masonry({
				columnWidth: ".photo__item",
				itemSelector: ".photo__item"
			});
		});
	});

});


	// При нажатии на кнопку - появляется меню, при последующем нажатии - закрывается.
	const btnMenu = document.querySelector('.btn');
	const menu = document.querySelector('.header__menu');
	const toggleMenu = function() {
	    menu.classList.toggle('open');
	};

	btnMenu.addEventListener('click', function(e) {
	    e.stopPropagation();
	    toggleMenu();
	});

	document.addEventListener('click', function(e) {
	    const target = e.target;
	    const its_menu = target == menu || menu.contains(target);
	    const its_btnMenu = target == btnMenu;
	    const menu_is_active = menu.classList.contains('open');
	    
	    if (!its_menu && !its_btnMenu && menu_is_active) {
	        toggleMenu();
	    }
	});