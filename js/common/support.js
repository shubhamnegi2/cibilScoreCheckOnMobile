function ajaxCall(url, data, actionFunction, method) {
	var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	requestNewUrl = url;
	$.ajax({
		url: url,
		data: data,
		headers: {
			'X-CSRFToken': csrftoken
		},
		method: method,
		dataType: "json",
		complete: function() {},
		success: function(output) {
			actionFunction(output);
		},
		error: function(output) {
			console.log("errrorrr");
		}
	});
}