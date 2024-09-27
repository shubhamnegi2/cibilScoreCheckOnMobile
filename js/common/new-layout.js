$(window).on("load", function () {
    setTimeout(function () {
        $(".loader").remove();
    }, 300);
});
$(document).on("click", function (e) {
    if ($(e.target).closest("#wish-nav").length === 0) {
        $("#mobileNav").hide();
    }
});
$(document).ready(function () {
    $(".hamburgermenu").click(function (e) {
        $('#mobileNav').slideToggle("nav-open");
        e.preventDefault();
    });
    $(".dropdown-hover").click(function (e) {
        $('#mobileNav').find('.dropdown-menu-items').hide();
        $(e.target.nextElementSibling).slideToggle();
    });
    $(window).resize(function () {
        var windowsize = $(window).width();
        if (windowsize > 991) {
            $('#mobileNav').css("display", "none");
        }
    });
    $(".footer-menu-items").click(function (t) {
        var a = $(this).attr("data-id");
        $(".footer-menu-items").removeClass("active");
        $('#footerMenuContent').find('.footer-menu-content').removeClass("active");
        $(this).addClass("active");
        $('#footerMenuContent').find(`[data-key="` + a + `"]`).addClass("active");
    });
    if ($(window).width() > 991) {
        $(window).scroll(function (e) {
            if (e.currentTarget.pageYOffset >= 30) {
                $("#wish-nav").addClass("sticky");
                $("#top-nav").css("display", "none");
                $(".banner-section").css("padding-top", "90px");
                $(".main-section").css("padding-top", "90px");
            } else {
                $("#wish-nav").removeClass("sticky");
                $("#top-nav").css("display", "flex");
                $(".banner-section").css("padding-top", "0px");
                $(".main-section").css("padding-top", "0px");
            }
        });
    }

});
