$(window).on("load", function () {
    setTimeout(function () {
        $(".loader").remove();
    }, 300);
});

// navbar Menu
$("#hamburger").click(function () {
    $("#mobile_nav").slideToggle("slow");
});
$(document).on("click", function (e) {
    if ($(e.target).closest(".nav-header-bg").length === 0) {
        $("#mobile_nav").hide();
    }
});

if ($(".wishnav").length) {
    var stickyNavTop = $(".wishnav").offset().top;
    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $(".wishnav").addClass("sticky").fadeIn();
            $(".wish-acc-nav").css({
                height: "0",
                display: "none",
                top: "-5000px",
            });
            $(".second").addClass("sticky-second-row").fadeIn();
        } else {
            $(".wishnav").removeClass("sticky").fadeIn();
            $(".wish-acc-nav").css({
                height: "auto",
                display: "block",
                top: "0",
            });
            $(".second").removeClass("sticky-second-row").fadeIn();
        }
    };
    stickyNav();
}

$(window).scroll(function () {
    if ($(".wishnav").length) {
        stickyNav();
    }
});
/*footer link script start*/
$(".fa.fa-plus").click(function () {
    $(".fa-plus").each(function () {
        $(this).removeClass("active-ft-link");
    });
    if (false == $(this).next().is(":visible")) {
        $(".footer-content ul.ft-links").slideUp(300);
        $(this).addClass("active-ft-link");
    } else {
        $(this).removeClass("active-ft-link");
    }
    $(this).next().slideToggle(300);
});
$(".ft-ln-ls .ft-links:eq(0)").show();
/*footer link script end*/
$(document).ready(function () {
    $('link[media="none"]').each(function (a, t) {
        var n = $(".mediaCondition"),
            i = $(this);
        void 0 !== n &&
            !1 !== n &&
            ("true" == n || n) &&
            i.attr("media", "screen");
    });
});
