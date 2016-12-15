$(document).ready(function() {
    setBindings();
});

function setBindings() {
    $(".nav li a").click(function(e) {
        e.preventDefault();
        var sectionID = e.currentTarget.id + "Section";
        var newPosition = $("#" + sectionID).offset().top - 50;
        $("html body").animate({
            scrollTop: newPosition
        }, 600)
    });
}

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
