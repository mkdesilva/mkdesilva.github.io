$(window).scroll(function() {

    var scrollDist = $(this).scrollTop();
    $('.minLogo').css({
        'transform': 'translate(0px, ' + scrollDist / 2 + '%)'
    });

    $('.back-bird').css({
        'transform': 'translate(0px, ' + scrollDist / 4 + '%)'
    });

    $('.fore-bird').css({
        'transform': 'translate(0px, -' + scrollDist / 50 + '%)'
    });

    if (scrollDist > 569 || scrollDist < 0) {
        $('nav a').css('color', 'black');
        $('nav a:hover').css('color', 'purple');
    } else {
        $('nav a').css('color', 'white');

    }
});
