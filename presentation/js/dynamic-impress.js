var preso = {};
var allSlideElements = null;

function getPresentation() {
	$.getJSON('/gather.json', function(p) {
		preso = p;
		initPresentation(p);
	});
}

function initPresentation(p) {
	document.title = p.title;
	console.log('Init presentation with ' + p.slides.length + ' slides');
	createSlidesList();
}

var slideTemplate = '<div class="step">' +
	'<div class="notes" />' +
	'</div>';

function createSlidesList() {
	// Create elements for notes divs
	allSlideElements = [];
	for (i = 0; i < preso.slides.length; i++) {
		var slide = preso.slides[i];
		var slideElem = $(slideTemplate);
		slideElem.attr('class') = slide.class;
		if (slide.id) {
			slideElem.attr('id') = slide.id;
		}
		slideElem.prepend(slide.content);
		for (var prop in slide.data) {
			slideElem.attr('data-' + prop) = slide.data[prop];
		}
		if (slide.notes) slideElem('#notes').html(slide.notes);
		// if (slide.img) {
		// 	var slideImg = slideElem.find('.slideImage');
		// 	$(slideImg).attr('src', slide.img);
		// }
	}
	allSlideElements.push(slideElem);
}


function appendSlidesList() {
	$allSlidesContent.append.apply($allSlidesContent, allSlideElements);
}