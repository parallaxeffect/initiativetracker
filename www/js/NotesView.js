
function NotesView() {
	$(".notesArea textarea").on("input", editNotes);
}

function retrieveNotes(index) {
	$(".notesArea textarea").val(characters[index]["notes"]);
	$(".notesName").text(characters[index]["name"]);
	$(".notesArea").show()
	notesCharacter = index;
}

function editNotes() {
	var value =  $(".notesArea textarea").val();
	changeField(notesCharacter, "notes", value);
}

NotesView.prototype.changeField = function(index, field, value) {
	if (index != notesCharacter) return;
	if (field == "name") {
		$(".notesName").text(characters[index]["name"]);
	}
	else if (field == "notes") {
		$(".notesArea textarea").val(characters[index]["notes"]);
	}
}