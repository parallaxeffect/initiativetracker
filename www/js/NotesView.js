
function NotesView() {
	$(".notesArea textarea").on("input", this.editNotes.bind(this));
}

function retrieveNotes(index) {
	$(".notesArea textarea").val(characters[index]["notes"]);
	$(".notesName").text(characters[index]["name"]);
	$(".notesArea").show()
	notesCharacter = index;
}

NotesView.prototype.editNotes = function () {
	var value =  $(".notesArea textarea").val();
	changeField(notesCharacter, "notes", value);
}

NotesView.prototype.changeField = function (index, field, value) {
	if (index != notesCharacter) return;
	if (field == "name") {
		$(".notesName").text(characters[index]["name"]);
	}
	else if (field == "notes") {
		$(".notesArea textarea").val(characters[index]["notes"]);
	}
}