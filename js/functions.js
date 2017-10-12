$(function() {
    /* Animate to new position */
    $("nav ul li").click(function(e) {
        e.preventDefault();
        var childID = $(this).children("a").attr("href");
        var newPosition = $(childID).offset().top - 62;
        $("html body").animate({
            scrollTop: newPosition
        }, 600)
        $("nav ul").removeClass("showing");
    });

    /* Show menu for mobile devices */
    $('.handle').on('click', function() {
        var currentHeight = $('nav ul').height();
        $('nav ul').toggleClass('showing');

        if (currentHeight == 0) {
            $('#navBar').addClass("transparentBG");

        } else {
            if ($(window).scrollTop() < 100) {
                $('#navBar').removeClass("transparentBG");
            }
        }
    });

    /* Make nav bar have a background + animate minLogo */
    $(window).scroll(function() {

        var scrollDist = $(this).scrollTop();

        $('.minLogo').css({
            'transform': 'translate(0px, ' + scrollDist / 1.5 + '%)'
        });

        if (scrollDist > 100) {
            // Adds background
            $('#navBar').addClass("transparentBG");
        } else {
            // Removes background
            $('#navBar').removeClass("transparentBG");
        }
    });
});
