$(window).on("load", function () {
    setTimeout(function () {
        $(".loader").remove();
    }, 300);
});
$(function () {
    $('.plelgbbanks').owlCarousel({
        loop:true,
        nav:false,
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:false,
        responsive:{
            0:{
                margin:30,
                items:3
            },
            575:{
                margin:20,
                items:4,
            },
            767:{
                margin:30,
                items:4
            },
            991:{
                margin:30,
                items:3
            },
            1024:{
                margin:90,
                items:4
            }
        }
    })
});
