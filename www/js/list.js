
var fieldlist = [
    {field: "name", name: "Character", type: "field"}, 
	{field: "initiative", name: "Init", type: "input"},
	{field: "HP", name: "HP", type: "field"},
	{field: "AC", name: "AC", type: "field"},
	{field: "DC", name: "DC", type: "field"},
	{field: "copy", name: "Cpy", type: "copy"},
	{field: "delete", name: "Del", type: "delete"}	
];

function initialize() {
	addHeader();
    addCharacter();
	highlightFirst();
	$(".nextbtn").click(highlightNext);
	$(".addbtn").click(addCharacter);
	$(".list").on("change", ".initiative", sortList);
	$(".list").on("click", ".delete", deleteCharacter);
	$(".list").on("click", ".copy", copyCharacter);
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

function getContent(field) {
	if (field.type == "field") {
		return $("<span contenteditable='true'>").addClass("field").addClass(field.field).html("<br>");
	}
	if (field.type == "input") {
		return $("<input type='number'>").addClass(field.field);
	}
	if (field.type == "delete") {
		return $("<button title='Delete this character'>").addClass(field.field).html("x");
	}
	if (field.type == "copy") {
		return $("<button title='Copy this character'>").addClass(field.field).html("C");
	}
}

function addCharacter() {
	var tr = $("<tr />");
	
	$.each(fieldlist, function(i, field) {
		var td = $("<td>").append(getContent(field));
		tr.append(td);
	});
		
	$(".list tbody").append(tr);
}

function copyCharacter(e) {
	var character = $(e.target).closest("tr");
	character.clone().insertAfter(character);
}

function addHeader() {
	var tr = $("<tr class='header' />");
	$.each(fieldlist, function(i, field) {
		var th = $("<th>").addClass(field.field)
		                .html(field.name);
		tr.append(th);
	});
	
	$(".list thead").append(tr);
}

function deleteCharacter(e) {
	$(e.target).closest("tr").remove();
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
