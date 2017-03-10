function newCharacter() {
	addCharacter({});
}

function addCharacter(character) {
	var index = characters.push(character) - 1;
	initView.addCharacter(character, index);
}

function addCharacters(chars) {
	$.each(chars, function(i, character) {
		if (character) {
			addCharacter(character);
		}
	});
}

function rowAction(index, action) {
	if (action == "copy") {
		copyCharacter(index);
	}
	if (action == "delete") {
		deleteCharacter(index);
	}
	if (action == "notes") {
		retrieveNotes(index);
	}
}

function copyCharacter(index) {
	var character = $.extend({}, characters[index]);
	addCharacter(character);
}

function deleteCharacter(index) {
	delete characters[index];
	initView.deleteCharacter(index);	
}

function clearCharacters() {
	$.each(characters, function(index, character){
		deleteCharacter(index);
	});
}

function changeField(index, field, value) {
	characters[index][field] = value;
	notesView.changeField(index, field, value);
}


