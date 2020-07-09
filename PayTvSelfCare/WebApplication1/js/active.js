
(function ($) {
    'use strict';

    // :: 1.0 Full Screen Banner Code
    //$(window).on('resizeEnd', function () {
    //    $("#fullscreen_banner, .welcome_slides .single_slide, .single_slide .d_table").height($(window).height());
    //});

    //$(window).on('resize', function () {
    //    if (this.resizeTO) clearTimeout(this.resizeTO);
    //    this.resizeTO = setTimeout(function () {
    //        $(this).trigger('resizeEnd');
    //    }, 300);
    //}).trigger("resize");

    // :: 2.0 Welcome Slider Active Code
    if ($.fn.owlCarousel) {
        $(".welcome_slides").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            dots: false,
            autoplay: false,
            autoplayTimeout: 7000,
            smartSpeed: 500,
            autoplayHoverPause: false
        });
    }

    var owl = $('.welcome_slides');
    //owl.owlCarousel();
    owl.on('translate.owl.carousel', function (event) {
        $('.owl-item .single_slide .welcome_text .welcome_title h2').removeClass('animated').hide();
        $('.owl-item .single_slide .welcome_text .welcome_content h3').removeClass('animated').hide();
        $('.owl-item .single_slide .welcome_text .purchase_see_more_button').removeClass('animated').hide();
    })
    owl.on('translated.owl.carousel', function (event) {
        $('.owl-item.active .single_slide .welcome_text .welcome_title h2').addClass('animated custom_slideInUp').show();
        $('.owl-item.active .single_slide .welcome_text .welcome_content h3').addClass('animated custom_slideInUp_2').show();
        $('.owl-item.active .single_slide .welcome_text .purchase_see_more_button').addClass('animated custom_slideInUp_btn_1').show();
    })

    // 3.0 one page nav active code
    $('#main_nav').onePageNav({
        currentClass: 'current_page_item',
        changeHash: false,
        scrollSpeed: 2000,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'linear',
        begin: function () { },
        end: function () { },
        scrollChange: function ($currentListItem) { }
    });

    // :: 4.0 wow active code
    new WOW().init();

    // :: 5.0 Meanmenu Active Code
    $('.navigation_area nav').meanmenu();

    // :: 6.0 sticky active code 
    $("#main_menu").sticky({
        topSpacing: 0
    });

    // :: 7.0 Venobox
    $('.lightbox').venobox({
        numeratio: true,
        infinigall: true
    });

    // :: 8.0 YouTube video active code

    if ($.fn.mb_YTPlayer) {
        $('.player').mb_YTPlayer();
    }

    // :: 9.0 scrollUp active code
    $.scrollUp({
        scrollName: 'scrollUp',
        scrollDistance: 450,
        scrollFrom: 'top',
        scrollSpeed: 500,
        easingType: 'linear',
        animation: 'fade',
        animationSpeed: 200,
        scrollTrigger: false,
        scrollTarget: false,
        scrollText: '<i class="fa fa-angle-double-up"></i>',
        scrollTitle: false,
        scrollImg: false,
        activeOverlay: false,
        zIndex: 2147483647
    });

    // :: 10.0 Preloader active code
    $(window).on('load', function () {
        $('body').css('overflow-y', 'visible');
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

})(jQuery);