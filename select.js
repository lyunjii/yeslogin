window.onload = function (){
  if(is_mobile() === false){
    var logo = document.querySelector('.logo');
    logo.style.width = "258px";
    logo.style.height = "104px"

    document.querySelector('header').style.paddingBottom = "27px";
    document.querySelector('.version').style.bottom = "27px";

    var info = document.querySelector('.info');
    info.style.width = "600px";
    info.style.flexDirection = "row-reverse";
    info.style.justifyContent = "space-between";
    info.style.paddingBottom = "20px";

    var user = document.getElementsByClassName('user');
    for(var i = 0; i < user.length; i++){
      user[i].style.width = "296px";
    }

    var btn = document.getElementsByClassName('tabBtn');
    for(var i = 0; i < btn.length; i++){
      btn[i].style.width = "300px";
    }

    document.querySelector('.typeTab').style.width = "600px";

    var picture = document.querySelector('.picture');
    picture.style.width = "600px";
    picture.style.height = "547px";

    document.querySelector('.upTxt').style.marginTop = "12px";

    var msgBox = document.querySelector('.msgBox');
    msgBox.style.width = "600px";
    msgBox.style.height = "45px";
    msgBox.style.fontSize = "16px";
    msgBox.style.marginBottom = "20px"

    var sendBtn = document.querySelector('.sendBtn');
    sendBtn.style.width = "600px";
    sendBtn.style.height = "45px";
    sendBtn.style.borderRadius = "23px";

    var sendIcon = document.querySelector('.sendIcon');
    sendIcon.style.width = "19.71px";
    sendIcon.style.height = "20px";
    sendIcon.style.marginRight = "10.88px";

    var cropPointer = document.querySelector('.point-se');
    cropPointer.style.width = "22px";
    cropPointer.style.height = "22px";
    

  }
}

function is_mobile()
{
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  
  if (typeof window.orientation !== 'undefined') 
  {
    return true;
  }
  
  var iOSios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if(iOSios)
    return true;

  return false;    

}

function loadPic(input){
  // use another div & img tag
  document.querySelector('.upPicBox').style.display = "none";

  var file = input.files[0];

  var newImage = document.createElement("img");
  newImage.setAttribute("id", 'newPic');

  newImage.src = URL.createObjectURL(file);

  var container = document.querySelector('.showPic');
  container.appendChild(newImage);

  container.style.display = "block";
  document.querySelector('.picture').style.marginBottom = "0px";
  var opt = document.getElementsByClassName('option');
    for(var i = 0; i < opt.length; i++){
      opt[i].style.display = "block";
    }

  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newImage.style.objectFit = "contain";
  //newImage.style.objectFit = "cover";
  //container.style.overflow = "hidden";
  newImage.style.filter = "none";
  newImage.style.maxWidth = "100%";

  editImg();

  var editBtn = document.querySelector('.editBtn');
  editBtn.style.display = "flex";
  if(is_mobile() === false){ editBtn.style.top = "487px"; }

  /*
  // change url of img
  var file = input.files[0];

  var newImage = document.querySelector('.upPicImg');
  
  newImage.src = URL.createObjectURL(file);

  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newImage.style.objectFit = "contain";
  newImage.style.filter = "none";

  document.querySelector('.upTxt').style.display = "none";

import Cropper from 'cropperjs';
const image = document.querySelector('.newPic');
const cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  },
});

  */
}

//var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

var cropper;

function editImg(){
  const image = document.getElementById('newPic');
  cropper = new Cropper(image, {
    viewMode: 2,
    dragMode: 'none',
    aspectRatio: 16 / 9,
    center: false,
    highlight: false,
    background: false,
    autoCropArea: 1,
    crop(event) {},
  });
}

function rotateLeft(){
  cropper.rotate(-90);
}

function rotateRight(){
  cropper.rotate(90);
}

function getImage(){
  var newCanvas = document.createElement("canvas");
  newCanvas.setAttribute("id", 'newCanvas');

  if(is_mobile() === true){
    newCanvas = cropper.getCroppedCanvas({
      width: 204,
      height: 365
    });
  }
  else{
    newCanvas = cropper.getCroppedCanvas({
    width: 594,
    height: 541
  });
  }

  var container = document.querySelector('.result');
  container.appendChild(newCanvas);
  
  container.style.display = "flex";
  container.style.alignItems = "center";
  document.querySelector('.showPic').style.display = "none";


}

/**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
/*
getCroppedCanvas: function getCroppedCanvas() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!this.ready || !window.HTMLCanvasElement) {
    return null;
  }

  var canvasData = this.canvasData;
  var source = getSourceCanvas(this.image, this.imageData, canvasData, options); // Returns the source canvas if it is not cropped.

  if (!this.cropped) {
    return source;
  }

  var _this$getData = this.getData(),
      initialX = _this$getData.x,
      initialY = _this$getData.y,
      initialWidth = _this$getData.width,
      initialHeight = _this$getData.height;

  var ratio = source.width / Math.floor(canvasData.naturalWidth);

  if (ratio !== 1) {
    initialX *= ratio;
    initialY *= ratio;
    initialWidth *= ratio;
    initialHeight *= ratio;
  }

  var aspectRatio = initialWidth / initialHeight;
  var maxSizes = getAdjustedSizes({
    aspectRatio: aspectRatio,
    width: options.maxWidth || Infinity,
    height: options.maxHeight || Infinity
  });
  var minSizes = getAdjustedSizes({
    aspectRatio: aspectRatio,
    width: options.minWidth || 0,
    height: options.minHeight || 0
  }, 'cover');

  var _getAdjustedSizes = getAdjustedSizes({
    aspectRatio: aspectRatio,
    width: options.width || (ratio !== 1 ? source.width : initialWidth),
    height: options.height || (ratio !== 1 ? source.height : initialHeight)
  }),
      width = _getAdjustedSizes.width,
      height = _getAdjustedSizes.height;

  width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
  height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = normalizeDecimalNumber(width);
  canvas.height = normalizeDecimalNumber(height);
  context.fillStyle = options.fillColor || 'transparent';
  context.fillRect(0, 0, width, height);
  var _options$imageSmoothi = options.imageSmoothingEnabled,
      imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
      imageSmoothingQuality = options.imageSmoothingQuality;
  context.imageSmoothingEnabled = imageSmoothingEnabled;

  if (imageSmoothingQuality) {
    context.imageSmoothingQuality = imageSmoothingQuality;
  } // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage


  var sourceWidth = source.width;
  var sourceHeight = source.height; // Source canvas parameters

  var srcX = initialX;
  var srcY = initialY;
  var srcWidth;
  var srcHeight; // Destination canvas parameters

  var dstX;
  var dstY;
  var dstWidth;
  var dstHeight;

  if (srcX <= -initialWidth || srcX > sourceWidth) {
    srcX = 0;
    srcWidth = 0;
    dstX = 0;
    dstWidth = 0;
  } else if (srcX <= 0) {
    dstX = -srcX;
    srcX = 0;
    srcWidth = Math.min(sourceWidth, initialWidth + srcX);
    dstWidth = srcWidth;
  } else if (srcX <= sourceWidth) {
    dstX = 0;
    srcWidth = Math.min(initialWidth, sourceWidth - srcX);
    dstWidth = srcWidth;
  }

  if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
    srcY = 0;
    srcHeight = 0;
    dstY = 0;
    dstHeight = 0;
  } else if (srcY <= 0) {
    dstY = -srcY;
    srcY = 0;
    srcHeight = Math.min(sourceHeight, initialHeight + srcY);
    dstHeight = srcHeight;
  } else if (srcY <= sourceHeight) {
    dstY = 0;
    srcHeight = Math.min(initialHeight, sourceHeight - srcY);
    dstHeight = srcHeight;
  }

  var params = [srcX, srcY, srcWidth, srcHeight]; // Avoid "IndexSizeError"

  if (dstWidth > 0 && dstHeight > 0) {
    var scale = width / initialWidth;
    params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
  } // All the numerical parameters should be integer for `drawImage`
  // https://github.com/fengyuanchen/cropper/issues/476


  context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
    return Math.floor(normalizeDecimalNumber(param));
  }))));
  return canvas;
}
*/