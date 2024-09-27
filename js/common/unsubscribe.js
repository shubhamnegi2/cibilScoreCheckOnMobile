$(document).ready(function () {
    
    // Form Inputs
    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });

    $('select').selectmenu();
    $('select').on('change selectmenuchange', function () {
        $(this).closest('.form-group').removeClass('has-error');
    });
    $(".form-group .ui-selectmenu-button").on("focus", function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-group .ui-selectmenu-button").on("focusout", function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });

    $(".form-control").focusin(function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-control").focusout(function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });

    $.validator.addMethod("MobileAllowed", function(a, b) {
        return this.optional(b) || a.match(/^[6-9]\d+$/) && a.length >= 10
    }, "Please enter a valid mobile number."),

    $("#unsubscribe-form").validate({
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
            mobileNumber: {
                required: true,
                minlength: true,
                MobileAllowed: true
            },
            Ureason: {
                required: true,
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    // OTP Verification Form
    $("#otp-verification-form").validate({
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
            otp: {
                required: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            otp: {
                required: "OTP is required",
                minlength: "Minimum 4 digits",
                maxlength: "Maximum 4 digits"
            }
        },
        submitHandler: function (form) {

            $.ajax({
                type: 'POST',
                url: 'verify-otp',
                data: '_token=' + $('[name=_token]').val() + '&type=verify-otp' + '&otp=' + $('#otp').val(),
                beforeSend: function() {
                
                    $('#otp-verification-form').children('.form-group').children('.help-block').hide();
                },
                success: function(data) {
                    console.log(data);
                    if (data.status == 'success' && data.message == 'ok') {
                     
                        $('#otp-verification-form').children('.form-group').children('.help-block').html('OTP Verified, Redirecting...').addClass('text-success');
                        $('#otp-verification-form').children('.form-group').children('.help-block').show();
                        

                         window.location.href = siteUrl + data.redirectToUrl;
                    } else {
                      
                        tostMessage(data.message);
                    }
                },
                 error: function() {
                 
                    $('#otp-verification-form').children('.form-group').children('.help-block').html('something went wrong');
                    $('#otp-verification-form').children('.form-group').children('.help-block').show();
                 }
            });
            
             
        }
     
    });
});

$('#resend_otp').on('click', function () {
    
    var mobile = $("#resend_otp").data("phone");

    $.ajax({
        type: 'POST',
        url: 'verify-otp',
        data: '_token=' + $('[name=_token]').val() + '&mobile=' + mobile + '&type=send-otp',
        success: function (data) {
            if (data.status == 'success') {
                $('#otp_submit_btn').prop("disabled", false);
                timerShowCounter("otp_counter", "resend_otp");
            } else {
                $('#otp-verification-form').children('.form-group').children('.help-block').html('Error in generating otp!');
                $('#otp-verification-form').children('.form-group').children('.help-block').show();
                $('#otp_submit_btn').prop("disabled", true);
            }
        }
    });
});

function fancyTimeFormat(duration)
{
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function timerShowCounter(timeDiv, button) {
    $("#" + button).hide(1500);
    $("#" + timeDiv).html('');
    var i = 180;
    var timer = new Timer(function() {
        $("#" + timeDiv).show();
        var zeroApend = '';
        if (i.toString().length == 1) {
            zeroApend = "0";
        }
        if(i > 0){
            var buttonstate = $('#otp_submit_btn').is(':disabled');
            if(buttonstate != true){
                $("#" + timeDiv).html("OTP valid till " + zeroApend + "" + fancyTimeFormat(i) + " minutes");
            }

        }else if (i == 0) {
            $("#" + button).show();
            $("#" + timeDiv).hide().html('');
            timer.stop();
        }
        i--;
    }, 1000);
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);
    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}

// OTP Digit Values 
$('.digit-group').find('.digit').each(function () {
    $(this).attr('maxlength', 1);
    var otpTypedVal = '';

    $(this).on('keyup', function (e) {
        if ($(this).val().length < 1) {
            return false;
        }
        if ($('#digit-1').val().length > 0 && $('#digit-2').val().length > 0 && $('#digit-3').val().length > 0 && $('#digit-4').val().length > 0) {
            $('.digit-group .form-group').removeClass('has-error');
        }
        otpTypedVal = $('#digit-1').val() + $('#digit-2').val() + $('#digit-3').val() + $('#digit-4').val();

        $('#otp').val(otpTypedVal);
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find('input#' + $(this).data('previous'));
            if (prev.length) {
                $(prev).select();
            }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
            var next = parent.find('input#' + $(this).data('next'));
            if (next.length) {
                $(next).select();
            }
        }
    });
});

// OTP Forword & Backward
$(".digit").keyup(function() {
    if (this.value.length == this.maxLength) {
        $(this).next(".digit").focus();
    } else {
        $(this).prev(".digit").focus();
    }
});

function numOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

function tostMessage(message) {
    toastr.error(message, '', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "3000",
        "hideDuration": "5000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}

function ucwords(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}
