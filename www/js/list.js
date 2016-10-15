function initialize() {
	$("#list li")
		.wrapInner("<span class='name'>")
		.append("<span class='initiative'>0</span>");
		
	$("span.initiative").editable(function(value, settings) {
		return(value);
	}, { type: 'textarea', submit: 'OK', })
};
