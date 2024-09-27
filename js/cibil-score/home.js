
$(document).ready(function () {
    $('select').selectmenu();
    $('select').on('change selectmenuchange', function () {
        $(this).closest('.form-group').removeClass('has-error');
    });


    $('.ui-selectmenu-text').removeClass('form-control');
    $('body').on('change input submit click', function () {
        setTimeout(() => {
            $(document).find('.ui-selectmenu-text').removeClass('form-control');
        }, 0);
    });

    // FIELD ERROR HANDLER
    $(".form-control")
        .not(".fakeinput")
        .on("keyup blur", function (e) {
            $(this).closest(".form-group").removeClass("has-error");
            $(this).removeClass("invalid");
        });
    // CHECKBOX HANDLER
    $('input[type="checkbox"],input[type="radio"]').on("click", function () {
        $(this).removeClass("invalid");
        $(this).closest(".form-group").removeClass("has-error");
        $(this).closest(".radio-fields").removeClass("invalid");
    });

    // CUSTOM VALIDATIONS
    $.validator.addMethod(
        "mobileNumber",
        function (value, element) {
            return (
                this.optional(element) ||
                (value.match(/^[6-9]\d+$/) && value.length >= 10)
            );
        },
        "Invalid mobile number!"
    );
    $.validator.addMethod(
        "email_id",
        function (value, element) {
            return (
                this.optional(element) ||
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                )
            );
        },
        "Enter valid email address"
    );

    $.validator.addMethod("full_Name", function (value, element) {
        return value.trim().split(' ').length >= 2;
    }, "Please enter valid full name!");


    $.validator.addMethod("currect_name", function (value, element) {
        value = $.trim(value);
        value = value.replace(/\s\s+/g, ' '); //replace two spaces with one space
        return this.optional(element) || /^[a-zA-Z][a-zA-Z\s]*$/.test(value);
    }, 'Please enter a valid  name!');

    $.validator.addMethod("onlyCharacters", function (value, element) {
        value = $.trim(value); // Trim the value
        return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    }, "Please enter valid city name.");


    // FORM VALIDATION
    $("#cibil-score-form").validate({
        ignore: [],
        errorClass: "invalid",
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest(".form-group").find(".help-block").length < 1) {
                element.closest(".form-group").append('<span class="help-block">');
            }
            element.closest(".form-group").addClass("has-error");
            element.closest(".form-group").find(".help-block").html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element)
                .addClass(errorClass)
                .parent()
                .prev()
                .children("select")
                .addClass(errorClass);
            if (
                $(element).attr("type") == "radio" ||
                $(element).attr("type") == "checkbox"
            ) {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            fullName: {
                required: true,
                full_Name: true,
                currect_name: true,
            },
            mobile: {
                required: true,
                mobileNumber: true,
                number: true
            },
            email: {
                required: true,
                email_id: true,
            },
            terms_condition: {
                required: true,
            },
        },
        messages: {

            fullName: {
                required: "Please Enter Full Name",
            },
            mobile: {
                required: "Please Enter Mobile Number",
            },
            email: {
                required: "please Enter Email Id",
            },
            terms_condition: {
                required: "please accpet terms and condition",
            },
        },
        submitHandler: function (form, event) {
            $('.submitBtn').hide();
            $('.spinnerBtn').show();
            $('.otpPopup').css({ display: 'flex' });
            event.preventDefault();

        }
    });
});


// CHARSET ONLY
function CharsetKeyOnly(evt) {
    var k;
    document.all ? (k = evt.keyCode) : (k = evt.which);
    return (
        (k > 64 && k < 91) ||
        (k > 96 && k < 123) ||
        k == 8 ||
        k == 32 ||
        k == 0 ||
        k == 9
    );
}

// NUMBER FORMAT
function numOnly(evt) {
    var k;
    document.all ? (k = evt.keyCode) : (k = evt.which);
    return k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57);
}



// =================== otp js =============

$('#otp-verification-form input').on('input keypress', function () {
    var value = $(this).val();
    // $(this).closest('.form-group ').removeClass('has-error');
    // If the input is not a digit or more than 1 character, clear the input
    if (!/^\d$/.test(value)) {
        $(this).val('');
    }
});
$(document).ready(function () {

    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });
    $('.resend-btn').click(function (e) {
        e.preventDefault();
    })

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
        submitHandler: function (form, event) {
            event.preventDefault();
            $('.otpSubmitBtn').hide();
            $('.otpSpinnerBtn').show();
        }
    });
});
// Resend OTP
$('#resend_otp').on('click', function () {
    var mobileNo = $('#mobile').val();
    $('#otp_submit_btn').prop('disabled', true);
    timerShowCounter('otp_counter', 'resend_otp', '60');
});


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



$(".digit").keyup(function () {
    if (this.value.length == this.maxLength) {
        $(this)
            .next(".digit")
            .focus();
    } else {
        $(this)
            .prev(".digit")
            .focus();
        var textVal = $('#otp').val();
        var b = textVal.slice(0, -1)
        $("#otp").val(b);
    }
});

$('.editMobileNumber').click(function () {
    $('.otpPopup').hide();
    $('.submitBtn').show();
    $('.spinnerBtn').hide();
    $('#mobile').focus();
})
// otp js end 


function timerShowCounter(timeDiv, button, time) {
    $("#" + button).hide(1500);
    $("#" + timeDiv).html('');
    var i = time;
    var timer = new Timer(function () {
        $("#" + timeDiv).show();
        var zeroApend = '';
        if (i.toString().length == 1) {
            zeroApend = "0";
        }
        if (i > 0) {
            var buttonstate = $('#otp_submit_btn').is(':disabled');
            if (buttonstate != true) {
                $("#" + timeDiv).html("OTP valid till " + zeroApend + "" + fancyTimeFormat(i) + " minutes");
            }

        } else if (i == 0) {
            $("#" + button).show();
            $("#" + timeDiv).hide().html('');
            timer.stop();
        }
        i--;
    }, 1000);
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);
    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }
    this.reset = function (newT) {
        t = newT;
        return this.stop().start();
    }
}

function fancyTimeFormat(duration) {
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

function tostMessage(message) {
    toastr.error(message, '', {
        'closeButton': true,
        'debug': false,
        'newestOnTop': true,
        'progressBar': true,
        'positionClass': 'toast-top-center',
        'preventDuplicates': false,
        'onclick': null,
        'showDuration': '3000',
        'hideDuration': '5000',
        'timeOut': '5000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut'
    });
}

function OnlyCharSpace(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[a-zA-Z ]+$/i);
    return pattern.test(value);
}
function OnlyNumeric(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[0-9]*$/i);
    return pattern.test(value);
}
