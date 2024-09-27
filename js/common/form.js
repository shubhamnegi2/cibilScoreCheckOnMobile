$(document).ready(function () {
    // Form Inputs
    $('.form-group .ui-selectmenu-button').on('focus',function(){
        $(this).closest('.form-group').addClass('is-focused');
    });
    $('.form-group .ui-selectmenu-button').on('focusout',function(){
        $(this).closest('.form-group').removeClass('is-focused');
    });
    $('.form-group input[type="radio"], .form-group input[type="checkbox"]').on('focus',function(){
        $(this).closest('.form-group').removeClass('is-focused');
    });
    $('.form-group input[type="radio"], .form-group input[type="checkbox"]').on('focusout',function(){
        $(this).closest('.form-group').removeClass('is-focused');
    });
    
    $('.form-group input').on('focus',function(){
        $(this).closest('.form-group').addClass('is-focused');
    });
    $('.form-group input').on('focusout',function(){
        $(this).closest('.form-group').removeClass('is-focused');
    });

    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });
    $('input[type="checkbox"],input[type="radio"]').on('click', function () {
        $(this).removeClass("error ,invalid");
        $(this).closest('.form-group').removeClass('has-error');
    });

    $('select').selectmenu();
    $('select').on('change selectmenuchange', function () {
        $(this).closest('.form-group').removeClass('has-error');
    });
});

// Add Class in Jquery Select
$(".form-group select").selectmenu({
    classes: {
      "ui-selectmenu-text": "form-control"
    }
});

// Character Input Only
function CharsetKeyOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 0 || k == 9);
}

// numeric Input Only
function numOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
}
