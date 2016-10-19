function initialize() {
    addCharacter();
	$("#addbtn").click(addCharacter);
	$("#list").on("change", ".initiative", sortList);
};

function sortList() {
	$('#list tr').sort(sort_li)
	             .appendTo('#list');
}

function sort_li(a, b) {
	return initValue(a) < initValue(b) ? 1 : -1;
}

function initValue(a) {
	return parseInt($(a).find("input.initiative").val());
}

function addCharacter() {
	var tr = $("<tr />")
	    .append("<span class='name' contenteditable='true'>")
		.append("<input class='initiative' type='number'>");
		
	$("#list").append(tr);
}