$(document).ready(function () {
    // Form Inputs
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

    $.validator.addMethod("MobileAllowed", function(a, b) {
        return this.optional(b) || a.match(/^[6-9]\d+$/) && a.length >= 10
    }, "Please enter a valid mobile number."),
    $(".Numericonly").on("keypress change", function(a) {
        var b;
        b = document.all ? a.keyCode : a.which,
        -1 !== $.inArray(b, [0, 8, 9, 27, 13, 190]) || b >= 48 && b <= 57 || a.preventDefault()
    }),

    $("#user-login-form").validate({
        ignore: [],
        errorClass: 'invalid',
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest('.form-group').find('.help-block').length < 1) {
                element.closest('.form-group').append('<span class="help-block">');
            }
            element.closest('.form-group').addClass('has-error');
            element.closest('.form-group').find('.help-block').html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
            if ($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox') {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            user_email: {
                required: true,
                email: true
            },
            user_mobile: {
                required: true,
                minlength: true,
                MobileAllowed: true
            }
        },
        messages: {
            user_email: {
                required: "Email id is a required field.",
                email: "Please enter valid email id."
            },
            user_mobile: {
                required: "Mobile number is a required field.",
                minlength: "Please enter valid mobile number."
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});
function numOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
}
