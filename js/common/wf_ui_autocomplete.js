/* This is used to get bank list on PL,HL,CL*/
$(document).ready(function () {

    loadPageResourse();
    $(".city-other-flag").keypress(function (event) {
        var city = $('#City').val();
        var x = event.which || event.keyCode
        if ((city.trim() == '' || city.trim() == null) && x == 32) {
            return false;
        }
    });

    $(".other-city").keypress(function (event) {
        var otherCity = $(this).val();
        var x = event.which || event.keyCode
        if ((otherCity.trim() == '' || otherCity.trim() == null) && x == 32) {
            return false;
        }
    });

    $(".bank-other-flag").keypress(function (event) {
        var bank = $('#PrimaryBankAcc').val();
        var x = event.which || event.keyCode
        if ((bank.trim() == '' || bank.trim() == null) && x == 32) {
            return false;
        }
    });

    $(".other-bank").keypress(function (event) {
        var otherBank = $(this).val();
        var x = event.which || event.keyCode
        if ((otherBank.trim() == '' || otherBank.trim() == null) && x == 32) {
            return false;
        }
    });
});

function loadPageResourse() {
    var cityArr = [];
    var bankArr = [];
    var currentUrl = window.location.pathname.substr(1);
    var bankUrlArrPL = ['personal-loan','personal-loan-continue','personal-loan-get-quote', 'personal-loan-user-continue','personal-loan-eligibility-continue','campaign-fullerton-personal-loan'];
    if((bankUrlArrPL.indexOf(currentUrl))>=0){
        var bankListUrl = 'personal-loan-get-primary-bank';
        banklist()
    }else{
        var bankListUrl = 'personal-loan-get-bank-list';
        banklist()
    }

    function banklist() {        
      if ($('.Bank').length > 0) {       
           bankArr = [];
           $.ajax({
                 type: 'POST',
                 url: siteUrl + bankListUrl,
                 data: {},
                 headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                   },
                 success:function(data){                    
                    bankArr = data;
                    bankArr.push('Other');
                    $(".Bank").autocomplete({
                        source: bankArr,
                        minLength: 2,
                        otherFlag: 'Yes',
                        select: function (event, ui) {
                        if(ui.item.label === "Other"){
                            $('.other-bank-col').attr('style','display:block');
                        }else{
                            $('.other-bank-col').attr('style','display:none');
                        }
                        },
                        open: function(event, ui) {
                            /*this is added to resolve iphone double tap issue*/
                            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                        }
                    });
                 }
           });
         
         if($('#PrimaryBankAcc').val() === "Other"){
         $('.other-bank-col').attr('style','display:block');
      }else{
         $('.other-bank-col').attr('style','display:none');
      }
      }
    }

    if ($('.City').length > 0) {
        cityArr = [];
        $.ajax({
              type: 'POST',
              url: siteUrl + 'personal-loan-get-city-list',
              data: {},
              headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               },
              success: function(data){                
                cityArr = data;
                cityArr.push('Other');
                $(".City").autocomplete({
                    source: cityArr,
                    otherFlag: 'Yes',
                    minLength: 2,
                    select: function (event, ui) {
                       if(ui.item.label == "Other"){
                           $('.other-city-col').attr('style','display:block');
                       }else{
                           $('.other-city-col').attr('style','display:none');
                       }
                    },
                    open: function(event, ui) {
                        /*this is added to resolve iphone double tap issue*/
                        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                    }
                });
              }
        });        
    }

    /* This is used to get icici bank company list on PL*/
    if ($('.CompanyNameICICI').length > 0) {
        $.post(siteUrl + 'personal-loan-get-company-list-icici', {}, function (data) {
            $(".CompanyNameICICI").autocomplete({
              source: data,
              minLength: 2,
              open: function(event, ui) {
                  /*this is added to resolve iphone double tap issue*/
                  $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
              }
            });
        });
    }
    
    /* In SBI Model Designation */
    if ($('.Designation').length > 0) {
        $.post(siteUrl + 'credit-card-api/get-designation-list', {}, function (data) {
            designationArr = data;
            designationArr.push('Other');
            $(".Designation").autocomplete({
                source: designationArr,
                otherFlag: 'Yes',
                minLength: 2,
                select: function (event, ui) {
                   if(ui.item.label == "Other"){
                       $('.other-city-col').attr('style','display:block');
                   }else{
                       $('.other-city-col').attr('style','display:none');
                   }
                },
                open: function(event, ui) {
                    /*this is added to resolve iphone double tap issue*/
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            });

        });
    }

    /*removed as suggested by veerendra*/
    /*$('.button-other-city').on('click', function () {

        var City = $('#City').val();
        var isExist = cityArr.indexOf(City);
        if (City != "" && isExist == -1) {
            $('#City').removeClass('valid');
            $('#City').addClass('error');
            $('#cityVal').html('Please select a City.');
            $('#City').focus();
            return false

        }

    });

    $(".city-other-flag").change(function () {
        var city = $('#City').val();
        var isExist = cityArr.indexOf(city);
        if (isExist == -1) {
            $('#City').removeClass('valid');
            $('#City').addClass('error');
            $('#cityVal').html('Please select a City.');
        } else {
            $('#City').removeClass('error')
            $('#City').addClass('valid');
            $('#cityVal').html('');
            error = false;
        }
        if (city.trim() == 'Other') {
            $('.other-city-col').attr('style', 'display:block');
        } else {
            $('.other-city-col').attr('style', 'display:none');
        }

    });*/
}

$(document).on('keyup', '.CompanyNameCreditCard', function (event) {
    var thisInput = $(this);
    thisInput.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: siteUrl + 'credit-cards-get-company-list',
                dataType: "json",
                type: "POST",
                data: {
                    data: request.term,
                },
				beforeSend: function(){
					thisInput.closest('.form-group').append('<span class="loading"></span>');					
				},
                success: function (data) {
					thisInput.closest('.form-group').find('.loading').remove();
                    response($.map(data, function (item) {
                        var code = item.split("|");
                        return {
                            label: code[0],
                            value: code[0],
                            data: item
                        }
                    }));
                }
            });
        },
        minLength: 2,
        open: function(event, ui) {
            /*this is added to resolve iphone double tap issue*/
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    });
});



$(document).on('keyup', '.CompanyName', function (event) {
    $(this).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: siteUrl + 'personal-loan-get-company-list',
                dataType: "json",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                   },
                type: "POST",
                data: {
                    startsWith: request.term,
                },
                success: function (data) {
                    // console.log(data);
                    response($.map(data, function (item) {
                        var code = item.split("|");
                        return {
                            label: code[0],
                            value: code[0],
                            data: item
                        }
                    }));
                }
            });
        },
        minLength: 2,
        open: function(event, ui) {
            /*this is added to resolve iphone double tap issue*/
            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
        }
    });
});