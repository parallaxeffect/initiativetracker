

function InitiativeView() {
	this.table = ".list";
	this.addHeader();
}

InitiativeView.prototype.sortList = function() {
	debug("Sort");
	debug(this.table);
	$(this.table).find('tbody tr').sort(sort_li)
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

InitiativeView.prototype.addCharacter = function (character, i) {
	
	var tr = createRow(character, i);	
	$(".list tbody").append(tr);
}




InitiativeView.prototype.addHeader = function() {
	
	debug(this.table);
	
	var tr = $("<tr class='header' />");
	$.each(fieldlist, function(i, field) {
		var th = $("<th>").addClass(field.field)
		                .html(field.name);
		tr.append(th);
	});
	$(this.table).find("thead").append(tr);
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

