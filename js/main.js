$(document).ready(function () {
    // animation aos 
    AOS.init({
        disable: 'phone',
        duration: 1000,
    });

  $('.header.header .menu').on('click', function () {
        $('body').toggleClass('hidden');
        $('body').toggleClass('blur');
        $('.header.header').toggleClass('open');

    })



    $("menuwrapper a").on("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 50
        }, 777);
        e.preventDefault();
        return false;
    });


})