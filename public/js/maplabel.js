
function MapLabel(opt_options) {
  this.set('fontFamily', 'sans-serif');
  this.set('fontSize', 12);
  this.set('fontColor', '#000000');
  this.set('strokeWeight', 4);
  this.set('strokeColor', '#ffffff');
  this.set('align', 'center');

  this.set('zIndex', 1e3);

  this.setValues(opt_options);
}
MapLabel.prototype = new google.maps.OverlayView;

window['MapLabel'] = MapLabel;


/** @inheritDoc */
MapLabel.prototype.changed = function(prop) {
  switch (prop) {
    case 'fontFamily':
    case 'fontSize':
    case 'fontColor':
    case 'strokeWeight':
    case 'strokeColor':
    case 'align':
    case 'text':
      return this.drawCanvas_();
    case 'maxZoom':
    case 'minZoom':
    case 'position':
      return this.draw();
  }
};

/**
 * Draws the label to the canvas 2d context.
 * @private
 */
MapLabel.prototype.drawCanvas_ = function() {
  var canvas = this.canvas_;
  if (!canvas) return;

  var style = canvas.style;
  style.zIndex = /** @type number */(this.get('zIndex'));

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = this.get('strokeColor');
  ctx.fillStyle = this.get('fontColor');
  ctx.font = this.get('fontSize') + 'px ' + this.get('fontFamily');

  var strokeWeight = Number(this.get('strokeWeight'));

  var text = this.get('text');
  if (text) {
    if (strokeWeight) {
      ctx.lineWidth = strokeWeight;
      ctx.strokeText(text, strokeWeight, strokeWeight);
    }

    ctx.fillText(text, strokeWeight, strokeWeight);

    var textMeasure = ctx.measureText(text);
    var textWidth = textMeasure.width + strokeWeight;
    style.marginLeft = this.getMarginLeft_(textWidth) + 'px';
    // Bring actual text top in line with desired latitude.
    // Cheaper than calculating height of text.
    style.marginTop = '-0.4em';
  }
};

/**
 * @inheritDoc
 */
MapLabel.prototype.onAdd = function() {
  var canvas = this.canvas_ = document.createElement('canvas');
  var style = canvas.style;
  style.position = 'absolute';

  var ctx = canvas.getContext('2d');
  ctx.lineJoin = 'round';
  ctx.textBaseline = 'top';

  this.drawCanvas_();

  var panes = this.getPanes();
  if (panes) {
    panes.mapPane.appendChild(canvas);
  }
};
MapLabel.prototype['onAdd'] = MapLabel.prototype.onAdd;

/**
 * Gets the appropriate margin-left for the canvas.
 * @private
 * @param {number} textWidth  the width of the text, in pixels.
 * @return {number} the margin-left, in pixels.
 */
MapLabel.prototype.getMarginLeft_ = function(textWidth) {
  switch (this.get('align')) {
    case 'left':
      return 0;
    case 'right':
      return -textWidth;
  }
  return textWidth / -2;
};

/**
 * @inheritDoc
 */
MapLabel.prototype.draw = function() {
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  if (!this.canvas_) {
    // onAdd has not been called yet.
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));
  if (!latLng) {
    return;
  }
  var pos = projection.fromLatLngToDivPixel(latLng);

  var style = this.canvas_.style;

  style['top'] = pos.y + 'px';
  style['left'] = pos.x + 'px';

  style['visibility'] = this.getVisible_();
};
MapLabel.prototype['draw'] = MapLabel.prototype.draw;


MapLabel.prototype.getVisible_ = function() {
  var minZoom = /** @type number */(this.get('minZoom'));
  var maxZoom = /** @type number */(this.get('maxZoom'));

  if (minZoom === undefined && maxZoom === undefined) {
    return '';
  }

  var map = this.getMap();
  if (!map) {
    return '';
  }

  var mapZoom = map.getZoom();
  if (mapZoom < minZoom || mapZoom > maxZoom) {
    return 'hidden';
  }
  return '';
};

/**
 * @inheritDoc
 */
       function init() {
        var myLatlng = new google.maps.LatLng(34.04, -118.24);
        var myOptions = {
          zoom: 13,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      var map = new google.maps.Map(document.getElementById('map'), myOptions);
//////////  markers 

  var image = {
    url: './cater.gif',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(100, 100),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

var NewLabels=[

['Test1', 34.03, -118.235],
['Test2', 35.03, -117.235],
['Test3', 36.03, -116.235],
['Test4', 37.03, -115.235],
['Test5', 38.03, -114.235],

];

  for (var i = 0; i < NewLabels.length; i++) {
var title = NewLabels[i][0];
        var title = new MapLabel({
          text: NewLabels[i][0],
          position: new google.maps.LatLng(NewLabels[i][1], NewLabels[i][2]),
          map: map,
          fontSize: 20,
          align: 'right'
        });

        var marker = new google.maps.Marker({animation: google.maps.Animation.DROP, icon: image,});
        marker.bindTo('map', title);
        marker.bindTo('position', title);
        marker.setDraggable(true);
};
///////////
       }
      google.maps.event.addDomListener(window, 'load', init);
      
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-12846745-20']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();


     