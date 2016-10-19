function initialize() {
    $('li')
        .wrapInner("<span class='name' contenteditable='true'>")
		.append("<input class='initiative' type='number'></span>")
	
	$('.initiative').change(sortList);
	
	$("#addbtn").click(addCharacter);
};

function sortList() {
	$('#list li').sort(sort_li)
	             .appendTo('#list');
}

function sort_li(a, b) {
	return initValue(a) < initValue(b) ? 1 : -1;
}

function initValue(a) {
	return parseInt($(a).find("input.initiative").val());
}

function addCharacter() {
	var li = $("<li />")
	    .wrapInner("<span class='name' contenteditable='true'>")
		.append("<input class='initiative' type='number'></span>");
	
	$("#list").append(li);
}