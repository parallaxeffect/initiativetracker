function TextView (selector) {
	this.selector = selector;
}

TextView.prototype.addText = function (text) {
	var p = $("<p>").text(text);
	$(this.selector).append(p);
}