
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


    var date = new Date();
    var m = date.getMonth(),
        d = date.getDate(),
        y = date.getFullYear();
    var defaultyear = y - 23;
    $('#dob').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "-58:+0",
        maxDate: "-21y",
        defaultDate: new Date(defaultyear, m, d)
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

    $.validator.addMethod(
        "PanNo",
        function (value, element) {
            var letters = /^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$/;
            if (value.match(letters)) {
                return true;
            } else {
                return false;
            }
        },
        "* Invalid PAN No"
    );

    // FORM VALIDATION
    $("#other-details-form").validate({
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
            PANcard: {
                required: true,
                PanNo: true,
            },
            dob: {
                required: true,
            },
            gender: {
                required: true,
            },
        },
        messages: {
            PANcard: {
                required: "Please Enter PAN Card Details",
            },
            dob: {
                required: "Please Select Date of Birth",
            },
            gender: {
                required: "Please Select Gender",
            },
        },
        submitHandler: function (form, event) {
            $('.submitBtn').hide();
            $('.spinnerBtn').show();
            $('.popupFormWrapper').css({ display: 'flex' });
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

$('.PopupSubmitBtn').on('click', function (e) {
    e.preventDefault();
    if ($('#popup-Form input[type="checkbox"]:checked').length > 0) {
        $('.errorMsg').hide();
        $('.PopupSubmitBtn').hide();
        $('.PopupSpinnerBtn').show();
    } else {
        $('.errorMsg').show().text('Please select at least one checkbox.');
    }
});

$('#popup-Form input[type="checkbox"]').on('change', function () {
    $('.errorMsg').hide();


    if ($('#popup-Form input[type="checkbox"]:checked').length > 0) {
        $('.errorMsg').hide();
    } else {
        $('.errorMsg').show().text('Please select at least one checkbox.');
    }
});

