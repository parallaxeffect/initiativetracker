function newCharacter() {
	var character = {};
	var index = characters.push(character) - 1;
	addCharacter(character, index);
}

function addCharacters(chars) {
	$.each(chars, function(i, character) {
		if (character) {
			var index = characters.push(character)-1;
			addCharacter(character, index);
		}
	});
}

function copyCharacter(e) {
	var character = $(e.target).closest("tr");
	var index = character.data("index");
	var newchar = $.extend({}, characters[index]);
	var newindex = characters.push(newchar) - 1;
	
	character.clone().insertAfter(character).data("index", newindex);
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

function clearCharacters() {
	debug("Clear Characters");
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


