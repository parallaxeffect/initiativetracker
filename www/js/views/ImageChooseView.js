
function ImageChooseView(selector) {
	this.selector = selector;
	var img = $("<img />").addClass("preview");
	var input = $("<input />")
	$(selector).append(img).append(input);
	
	url = localStorage.getItem("image");
	$(this.selector).find("input").val(url);
	
	$(selector).on("input", "input", this.updatePreview.bind(this));
}

ImageChooseView.prototype.updatePreview = function () {
	url = $(this.selector).find("input").val();
	$(this.selector).find(".preview").attr("src", url);
	localStorage.setItem('image', url);
}