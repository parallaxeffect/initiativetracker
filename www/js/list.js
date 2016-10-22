function initialize() {
	addHeader();
    addCharacter();
	highlightFirst();
	$(".nextbtn").click(highlightNext);
	$(".addbtn").click(addCharacter);
	$(".list").on("change", ".initiative", sortList);
	$(".list").on("click", ".delete", deleteCharacter);
};

function sortList() {
	$('.list tbody tr').sort(sort_li)
	             .appendTo('.list tbody');
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
		.append("<td><button class='delete' title='Delete this character'>x</button></td>");
		
	$(".list tbody").append(tr);
}

function addHeader() {
	var tr = $("<tr class='header' />")
	    .append("<th class='name'>Character</th>")
		.append("<th class='init'>Init</th>")
		.append("<th class='AC'>AC</th>")
		.append("<th class='DC'>DC</th>")
		.append("<th>Del</th>");
		
	$(".list thead").append(tr);
}

function deleteCharacter(e) {
	$(e.target).parent().parent().remove();
}

function highlightFirst() {
	$(".list tbody").children().first().addClass("highlight");	
}

function highlightNext() {
	var highlight = $(".highlight");
	highlight.removeClass("highlight");

	var next = highlight.next();
	if (next.length > 0) {
		next.addClass("highlight");
	}
	else {
		highlightFirst();
	}
}
