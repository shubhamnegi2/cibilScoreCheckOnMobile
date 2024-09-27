$(document).ready(function () {
        $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });

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
            form.submit();
        }
    });
});

$( "#send_otp" ).on( "click", function() {
    console.log("Send Otp Clicked");
});

$('#otp_submit_btn').on('click', function () {
    $('#otp_counter').hide();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    $.ajax({
        url: siteUrl + "generate-existing-user-otp",
        method: 'POST',
        data: {type: 'existing_user'},
        success: function (result) {           
            if(result.status=="success"){                
                $('#otp_submit_btn').addClass('cu_disabled');
                $('#otp_counter').show();
                if(result.message=='ok'){
                    $('#otpMsg').html("OTP has been send to your registered mobile number.").fadeIn().delay(5000).fadeOut();
                }else{
                    $('#otpMsg').html(result.message).fadeIn().delay(5000).fadeOut();
                }
                 timerShowCounter("otp_counter", "otp_submit_btn");                
            }else{
                console.log("error in generating otp!");
            }

        }
    });
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
        $('#user_otp_post').val(otpTypedVal);
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

function numOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

function timerShowCounter(timeDiv, button) {
    $("#" + button).addClass('cu_disabled');
    $("#" + timeDiv).html('');
    var i = 60;
    var timer = new Timer(function() {
        $("#" + timeDiv).show();
        var zeroApend = '';
        if (i.toString().length == 1) {
            zeroApend = "0";
        }
        if(i > 0){
            var buttonstate = $('#otp_submit_btn').is(':disabled');
            if(buttonstate != true){
                $("#" + timeDiv).html("OTP valid till <strong> " + zeroApend + "" + fancyTimeFormat(i) + " minutes </strong>");
            }

        }else if (i == 0) {
            $("#" + button).removeClass('cu_disabled');
            $("#" + button).show();
            $("#" + timeDiv).hide().html('');
            timer.stop();
        }
        i--;
    }, 1000);
}

function timerShowResendBtn(minute) {
    if(minute == 3){
        var i = 180;
    }else{
        var i = 60;
    }
    var timer = new Timer(function() {
        var zeroApend = '';
        if (i.toString().length == 1) {
            zeroApend = "0";
        }
        if (i==0) {
            if(minute == 3){
                $("#otp_submit_btn").prop("disabled", true);
                $("#otp_counter").hide().html('');
            }
            $('#resend_otp').show();
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

// OTP Forword & Backward
$(".digit").keyup(function() {
    if (this.value.length == this.maxLength) {
        $(this).next(".digit").focus();
    } else {
        $(this).prev(".digit").focus();
    }
});