var BAR_ID = 'PROGRESS_BAR_ID';
var BAR_HEIGHT = 10; // px
var presentation = SlidesApp.getActivePresentation();

function onInstall(e) {
  onOpen();
}

function onOpen(e) {
  SlidesApp.getUi().createAddonMenu()
      .addItem('Show progress bar', 'createBars')
      .addItem('Hide progress bar', 'deleteBars')
      .addToUi();
}

function createBars() {
  deleteBars(); // Delete any existing progress bars
  var slides = presentation.getSlides();
  for (var i = 0; i < slides.length; ++i) {
    var ratioComplete = (i / (slides.length - 1));
    var x = 0;
    var y = presentation.getPageHeight() - BAR_HEIGHT - 10; //the plus raises it slightly to make it look prettier
    var barWidth = presentation.getPageWidth() * ratioComplete;
    var grayBarWidth =  presentation.getPageWidth()-barWidth //ali

    if (barWidth > 0) {
      var bar = slides[i].insertShape(SlidesApp.ShapeType.RECTANGLE, x, y,
                                      barWidth, BAR_HEIGHT);
      bar.getBorder().setTransparent();
      bar.getFill().setSolidFill('#ff0000') // red
      bar.setLinkUrl(BAR_ID);
    }
    if (grayBarWidth>0) {
            var otherBar = slides[i].insertShape(SlidesApp.ShapeType.RECTANGLE, barWidth, y,
                                      grayBarWidth, BAR_HEIGHT);
      otherBar.getBorder().setTransparent();
      otherBar.getFill().setSolidFill('#dadada') //grey
      otherBar.setLinkUrl(BAR_ID);
    }
          {
      var circle = slides[i].insertShape(SlidesApp.ShapeType.ELLIPSE, barWidth-10, y-5,
                                      20, 20);
      circle.getBorder().setTransparent();
      circle.getFill().setSolidFill('#ff0000') //red
      circle.setLinkUrl(BAR_ID);
    }
  }
}

function deleteBars() {
  var slides = presentation.getSlides();
  for (var i = 0; i < slides.length; ++i) {
    var elements = slides[i].getPageElements();
    for (var j = 0; j < elements.length; ++j) {
      var el = elements[j];
      if (el.getPageElementType() === SlidesApp.PageElementType.SHAPE &&
          el.asShape().getLink() &&
          el.asShape().getLink().getUrl() === BAR_ID) {
        el.remove();
      }
    }
  }
}
// [END apps_script_slides_progress]
