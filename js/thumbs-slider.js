$(function(){
var slider = {
	selector: $('.thumbs-slider'),
	animationTime: 1000,
	maxSlides: 1,
	currentPos: 0,
	visibleSlides: 1,

	slides: function(){
			return $('.thumbs-slider-item').length;
		},
	containerWidth: function(){
			return this.selector.width();
		},
	slideWidth: function(){
			return this.containerWidth();
		}
};

var list = $('.thumbs-slider-list');
var listItem = $('.thumbs-slider-item');
var currentMargin = 0;
var firstLoad = true;

function updateSlider(){
	list.css('width', slider.slideWidth() * (slider.slides() + slider.maxSlides));
	listItem.css('width', slider.slideWidth());
	if(slider.currentPos > slider.maxSlides){
		currentMargin = (slider.currentPos - slider.maxSlides) * slider.slideWidth() * -1;
	} else {
		currentMargin = slider.currentPos * slider.slideWidth() * -1;
	}
	list.css('margin-left', currentMargin);
	if(firstLoad){
		for (i = 0; i < slider.maxSlides; i++){
			listItem.eq(i).clone().appendTo(list);
		}
		list = $('.thumbs-slider-list');
		listItem = $('.thumbs-slider-item');
		firstLoad = false;
	}
}

$(window).on('load resize', updateSlider);

//mouse click event
$('.thumbs-slider-nav-left').on('click', function(){
	prevSlide();
});

$('.thumbs-slider-nav-right').on('click', function(){
	nextSlide();
});

//keypress event
//$(document).on('keydown', function(e) {
//    if (e.keyCode === 37){
//		prevSlide();
//	} else if (e.keyCode === 39){
//		nextSlide();
//	}
//});

//NEXT Slide
function nextSlide(){
   if(slider.currentPos === slider.slides() - slider.maxSlides){
        currentMargin = 0;
        list.css('margin-left', currentMargin);
        slider.currentPos = 1;
   } else {
        slider.currentPos++;
   }
   currentMargin -= slider.slideWidth();
   list.stop(true, false).animate({"margin-left": currentMargin}, slider.animationTime);
}

//PREV Slide
function prevSlide(){
   if(slider.currentPos === 0){
        currentMargin = (slider.slides() - slider.maxSlides) * slider.slideWidth() * -1;
        list.css('margin-left', currentMargin);
        slider.currentPos = slider.slides() - slider.maxSlides - 1;
   } else {
        slider.currentPos--;
   }
   currentMargin += slider.slideWidth();
   list.stop(true, false).animate({"margin-left": currentMargin}, slider.animationTime);
}

});
//
//$('#myTabs a').click(function (e) {
//	e.preventDefault()
//	$(this).tab('show')
//});