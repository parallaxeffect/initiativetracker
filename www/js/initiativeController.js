function newCharacter() {
	
	var character = {};
	var index = characters.push(character) - 1;
	
	view.addCharacter(character, index);
}

function addCharacters(chars) {
	$.each(chars, function(i, character) {
		if (character) {
			var index = characters.push(character)-1;
			
			view.addCharacter(character, index);
		}
	});
}

function copyCharacter(e) {
	var row = $(e.target).closest("tr");
	var index = row.data("index");
	
	var character = $.extend({}, characters[index]);
	var newindex = characters.push(character) - 1;
	
	row.clone().insertAfter(row).data("index", newindex);
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

function selectNotes(e) {
	var row = $(e.target).closest("tr");
	var index = row.data("index");
	
	$(".notesArea textarea").val(characters[index]["notes"]);
	$(".notesName").text(characters[index]["name"]);
	$(".notesArea").show()
	notesCharacter = index;
}

function editNotes() {
	characters[notesCharacter]["notes"] = $(".notesArea textarea").val();	
}


