$(document).ready(function() {
	if ($('.City').length > 0) {
		cityArr = [];
		var url = siteUrl + '/get-city-list';
		data = {};
		method = 'POST';
		ajaxCall(url, data, getCityFunc, method);
		function getCityFunc(output) {
			cityArr = output;
			cityArr.push('Other');
			$(".City").autocomplete({
				source: cityArr,
				otherFlag: 'Yes',
				minLength: 2,
				select: function(event, ui) {
					if (ui.item.label == "Other") {
						$('.other-city-col').css('display','block');
					} else {
						$('.other-city-col').attr('display','none');
					}
				},
				open: function(event, ui) {
					$('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
				}
			});
		}
	}
});