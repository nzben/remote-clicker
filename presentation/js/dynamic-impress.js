var preso = {};
var allSlideElements = null;

function prepPresentation(source, callback) {
	console.log('Fetching json from ' + source)	;
	$.getJSON(source, function(p) {
		console.log('Got json');
		preso = p;
		initPresentation(p);
		impress().init();
	});
}

function initPresentation(p) {
	document.title = p.title;
	console.log('Init presentation with ' + p.slides.length + ' slides');
	createSlidesList();
	appendSlidesList();
}

var slideTemplate = '<div class="step">' +
	'<img class="slideImage"/>' +
	'<div class="notes" />' +
	'</div>';

function createSlidesList() {
	// Create elements for notes divs
	allSlideElements = [];
	for (i = 0; i < preso.slides.length; i++) {
		var slide = preso.slides[i];
		var $slideElem = $(slideTemplate);
		$slideElem.attr('class', slide.class);
		if (slide.id) {
			$slideElem.attr('id', slide.id);
		}
		$slideElem.prepend(slide.content);
		for (var prop in slide.data) {
			$slideElem.attr('data-' + prop, slide.data[prop]);
		}
		if (slide.notes) $slideElem.find('.notes').html(slide.notes);
		if (slide.img) {
			var slideImg = $slideElem.find('.slideImage');
			$(slideImg).attr('src', slide.img);
		}

		// add to array
		allSlideElements.push($slideElem);
	}
	
}


function appendSlidesList() {
	var $slideContainer = $("#impress");
	$slideContainer.append.apply($slideContainer, allSlideElements);
}