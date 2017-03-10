

function InitiativeView() {
	this.table = ".list";
	this.addHeader();
	
	$(".list").on("change", ".initiative", this.sortList.bind(this));
	$(".list").on("click", ".delete", this.buttonClicked.bind(this));
	$(".list").on("click", ".copy", this.buttonClicked.bind(this));
	$(".list").on("click", ".notes", this.buttonClicked.bind(this));
	$(".list").on("blur", ".field", editField);
}

InitiativeView.prototype.buttonClicked = function (e) {
	var row = $(e.target).closest("tr");
	var index = row.data("index");
	var action = $(e.target).data("action");
	
	rowAction(index, action);
}

InitiativeView.prototype.sortList = function() {
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
		return $("<span contenteditable='true'>")
			.addClass("field").addClass(field.field)
			.data("field", field.field)
			.append(value).append("<br>");
	}
	if (field.type == "input") {
		debug ("value:" + value);
		return $("<input type='number'>")
			.addClass(field.field)
			.val(value);
	}
	if (field.type == "button") {
		return $("<button>")
			.attr("title", field.title)
			.addClass(field.field)
			.data("action", field.field)
			.html(field.html);
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
	var row = $(e.target).closest("tr");
	var index = row.data("index");
	var field = $(e.target).data("field");
	var value = $(e.target).text();
	
	changeField(index, field, value);
}

InitiativeView.prototype.addCharacter = function (character, i) {
	
	var tr = createRow(character, i);	
	$(".list tbody").append(tr);
}

InitiativeView.prototype.getRow = function(index){
	return $(".list").find('tr').filter(function (i, r) {
		return $(r).data("index") == index;
	});
}

InitiativeView.prototype.deleteCharacter = function (index) {
	var row = this.getRow(index);
	
	if (row.hasClass("highlight")) {
		highlightNext();
	}
	row.remove();
}

InitiativeView.prototype.addHeader = function() {
	var tr = $("<tr class='header' />");
	$.each(fieldlist, function(i, field) {
		var th = $("<th>").addClass(field.field)
		                .html(field.name);
		tr.append(th);
	});
	$(this.table).find("thead").append(tr);
}

InitiativeView.prototype.changeField = function(index, field, value) {
	var row = this.getRow(index);
	$(row).find('span.'+field).text(value);  // not tested
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

function selectNotes(e) {
	var row = $(e.target).closest("tr");
	var index = row.data("index");
	
	retrieveNotes(index);
}
	

