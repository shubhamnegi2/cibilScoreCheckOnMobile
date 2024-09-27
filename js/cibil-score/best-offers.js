$(document).ready(function () {
    $(document).on('click', '.tabBtns button', function () {
        $('.tabBtns button').removeClass('activeTab');
        $(this).addClass('activeTab');
        if ($(this).hasClass('cc')) {
            $('.plWrapper').removeClass('activeOffer').slideUp();
            $('.ccWrapper').slideDown(function () {
                $('.ccWrapper').addClass('activeOffer');
            });
        } else if ($(this).hasClass('pl')) {
            $('.ccWrapper').removeClass('activeOffer').slideUp();
            $('.plWrapper').slideDown(function () {
                $('.plWrapper').addClass('activeOffer');
            });
        }
    })
})