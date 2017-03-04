

function initializeView() {
	addHeader();
	highlightFirst();
	
}

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

function getContent(field, value) {
	if (field.type == "field") {
		return $("<span contenteditable='true'>").addClass("field").addClass(field.field).data("field", field.field).append(value).append("<br>");
	}
	if (field.type == "input") {
		return $("<input type='number'>").addClass(field.field).val(value);
	}
	if (field.type == "delete") {
		return $("<button title='Delete this character'>").addClass(field.field).html("x");
	}
	if (field.type == "copy") {
		return $("<button title='Copy this character'>").addClass(field.field).html("C");
	}
	if (field.type == "notes") {
		return $("<button title='View Notes'>").addClass(field.field).html("&rarr;");
	}
}

function createRow(character, i) {
	var tr = $("<tr />").data("index", i);
	
	$.each(fieldlist, function(i, field) {
		var td = $("<td>").append(getContent(field, character[field.field]));
		tr.append(td);
	});
	
	return tr;
}

function editField(e) {
	var character = $(e.target).closest("tr");
	var i = character.data("index");
	var field = $(e.target).data("field");
	var value = $(e.target).text();
	characters[i][field] = value;
}

function addCharacter(character, i) {
	
	var tr = createRow(character, i);	
	$(".list tbody").append(tr);
}

function addCharacters(chars) {
	$.each(chars, function(i, character) {
		if (character) {
			var index = characters.push(character)-1;
			addCharacter(character, index);
		}
	});
}

function newCharacter() {
	var character = {};
	var index = characters.push(character) - 1;
	addCharacter(character, index);
}

function copyCharacter(e) {
	var character = $(e.target).closest("tr");
	var index = character.data("index");
	var newchar = $.extend({}, characters[index]);
	var newindex = characters.push(newchar) - 1;
	
	character.clone().insertAfter(character).data("index", newindex);
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
	var character = $(e.target).closest("tr");
	var index = character.data("index");
	delete characters[index];
	if (character.hasClass("highlight")) {
		highlightNext();
	}
	character.remove();
}

function selectNotes(e) {
	var character = $(e.target).closest("tr");
	var index = character.data("index");
	
	$(".notesArea textarea").val(characters[index]["notes"]);
	$(".notesName").text(characters[index]["name"]);
	$(".notesArea").show()
	notesCharacter = index;
}

function editNotes() {
	characters[notesCharacter]["notes"] = $(".notesArea textarea").val();	
}

function highlightCharacter(c) {
	c.addClass("highlight");
}

function highlightFirst() {
	highlightCharacter($(".list tbody").children().first());
}

function highlightNext() {
	var highlight = $(".highlight");
	highlight.removeClass("highlight");

	var next = highlight.next();
	if (next.length > 0) {
		highlightCharacter(next);
	}
	else {
		highlightFirst();
	}
}

