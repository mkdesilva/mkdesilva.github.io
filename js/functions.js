$(window).scroll(function() {

    var scrollDist = $(this).scrollTop();

    console.log(scrollDist);
    $('.minLogo').css({
        'transform': 'translate(0px, ' + scrollDist / 1.4 + '%)'
    });
    if (scrollDist > 400) {
        $('nav').css('background-color', 'rgba(0, 0, 0, 0.3)');
    } else {
        $('nav').css('background-color', 'rgba(0, 0, 0, 0)');

    }
});
