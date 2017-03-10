
var fieldlist = [
    {field: "name", name: "Character", type: "field"}, 
	{field: "initiative", name: "Init", type: "input"},
	{field: "HP", name: "HP", type: "field"},
	{field: "AC", name: "AC", type: "field"},
	{field: "DC", name: "DC", type: "field"},
	{field: "copy", name: "Cpy", type: "button", title: "Copy this character", html: "C"},
	{field: "delete", name: "Del", type: "button", title: "Delete this character", html: "x"}, 
	{field: "notes", name: "Notes", type: "button", title: "View notes", html: "&rarr;"}
];

function initialize() {
	characters = [];
	
	initView = new InitiativeView();
	notesView = new NotesView();
	newCharacter();
	highlightFirst();	

	$(".nextbtn").click(highlightNext);
	$(".addbtn").click(newCharacter);
	$("#file").change(loadFile);
	
	$(".savebtn").click(save);
};

function save() {
	var chars = characters.filter(function (c) {
		return c;
	});
	var blob = new Blob([JSON.stringify(chars)], {type: "application/json"});
	
	window.saveAs(blob, "my_outfile.json");
}

function isCharactersEmpty(chars) {
	return !chars.some(function (c) { 
		return !$.isEmptyObject(c);
	});
}

function loadFile(e) {
	var files = e.target.files;
	var reader = new FileReader();
	
	if (isCharactersEmpty(characters)) {
		clearCharacters()
	}
	
	reader.addEventListener("load", function (e) {
		addCharacters(JSON.parse(e.target.result));
	});
	reader.readAsText(files[0]);
}

function debug(text) {
	$(".output").append(text).append("<br>");
}
