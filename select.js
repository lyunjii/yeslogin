window.onload = function (){
  if(!is_mobile()){
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

function load_image(input){
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

  edit_image();

  var editBtn = document.querySelector('.editBtn');
  editBtn.style.display = "flex";
  if(!is_mobile()){ editBtn.style.top = "487px"; }

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

  */
}

//var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

var cropper;

function edit_image(){
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

var newCanvas = null;
function get_image(){
  newCanvas = null;
  newCanvas = document.createElement("canvas");
  newCanvas.setAttribute("id", 'newCanvas');

  if(is_mobile()){
    newCanvas = cropper.getCroppedCanvas({
      width: 298,
      height: 359
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

function upload_image(){
  if(newCanvas == null){
    alert("영역을 선택하세요");
    return;
  }

  var msg = document.getElementById("msgBox").value.trim();
  console.log(msg);
  if(msg == null || msg == ""){
    alert("메시지를 입력하세요");
    return;
  }
  console.log(newCanvas);
  //parent.sunny.uploadToGD_base64(newCanvas.toDataURL("image/PNG",1),msg,);


  document.querySelector('.editBtn').style.display = "none";
  document.querySelector('.result').style.display = "none";
  var opt = document.getElementsByClassName('option');
  for(var i = 0; i < opt.length; i++){
    opt[i].style.display = "none";
  }
  document.querySelector('.upPicBox').style.display = "block";
}