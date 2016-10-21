function initialize() {
	addHeader();
    addCharacter();
	$("#addbtn").click(addCharacter);
	$("#list").on("change", ".initiative", sortList);
	$("#list").on("click", ".delete", deleteCharacter);
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
	    .append("<td><span class='name field' contenteditable='true'><br></span></td>")
		// br fixes firefox display issue
		.append("<td><input class='initiative' type='number'></td>")
		.append("<td><span class='AC field' contenteditable='true'><br></span></td>")
		.append("<td><span class='DC field' contenteditable='true'><br></span></td>")
		.append("<td><button class='delete'>x</button></td>");
		
	$("#list").append(tr);
}

function addHeader() {
	var tr = $("<tr class='header' />")
	    .append("<th class='name'>Character</th>")
		.append("<th class='init'>Init</th>")
		.append("<th class='AC'>AC</th>")
		.append("<th class='DC'>DC</th>")
		.append("<th>Del</th>");
		
	$("#list").append(tr);
}

function deleteCharacter(e) {
	$(e.target).parent().parent().remove();
}
