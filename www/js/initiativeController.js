function newCharacter() {
	
	var character = {};
	var index = characters.push(character) - 1;
	
	initView.addCharacter(character, index);
}

function addCharacters(chars) {
	$.each(chars, function(i, character) {
		if (character) {
			var index = characters.push(character)-1;
			
			initView.addCharacter(character, index);
		}
	});
}

function copyCharacter(e) {
	var row = $(e.target).closest("tr");
	var index = row.data("index");
	
	var character = $.extend({}, characters[index]);
	var newindex = characters.push(character) - 1;
	
	initView.addCharacter(character, newindex);
}

function deleteCharacter(e) {
	var row = $(e.target).closest("tr");
	var index = row.data("index");
	
	delete characters[index];
	
	if (row.hasClass("highlight")) {
		highlightNext();
	}
	row.remove();
}

function clearCharacters() {
	debug("Clear Characters");
}

function changeField(index, field, value) {
	characters[index][field] = value;
	notesView.changeField(index, field, value);
}


