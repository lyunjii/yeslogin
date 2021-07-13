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
      btn[i].style.width = "200px";
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

   // var cropPointer = document.querySelector('.cropper-point.point-se');
    //cropPointer.style.width = "22px";
    //cropPointer.style.height = "22px";
    
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








//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//여기 값 바뀌어있음 고쳐서 푸시!!!!!!!!!!!!!
  return true;    










}

var picture = document.querySelector('.picture');
var upPicBox = document.querySelector('.upPicBox');
var showPic = document.querySelector('.showPic');
var result = document.querySelector('.result');
var editBtn = document.querySelector('.editBtn');
var toggle = document.querySelector('.toggle');
var msgBox = document.querySelector('.msgBox');

function load_image(input){
  upPicBox.style.display = "none";

  var newImage = document.createElement("img");
  newImage.setAttribute("id", 'newPic');

  var file = input.files[0];
  newImage.src = URL.createObjectURL(file);

  showPic.appendChild(newImage);

  showPic.style.display = "block";
  picture.style.marginBottom = "0px";
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
  //newImage.style.maxWidth = "100%";

  edit_image();

  editBtn.style.display = "flex";
  toggle.style.display = "flex";
  if(!is_mobile()){ editBtn.style.top = "487px"; }

}

//var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

var cropper;

function edit_image(){
  const image = document.getElementById('newPic');
  cropper = new Cropper(image, {
    //이미지 창 크기보다 작게 축소 가능
    viewMode: 0,
    //cropper 바깥에서 마우스로 사진 이동
    dragMode: 'move',
    //cropper 비율
    aspectRatio: 16 / 9,
    //중앙 표시, 그리드부분 밝게, 배경 체크무늬 없게
    center: false,
    highlight: false,
    background: false,
    //초기 cropper 크기
    autoCropArea: 1,
    crop(event) {},
  });
}

var commands = [];  //버튼 명령을 저장하는 배열
var newCanvas = null; //자른 이미지 놓을 canvas
var btnDisable = false; //크롭 확인 버튼 비활성화

//토글버튼 이미지로 수정해야함
function toggle_cropper(toggleBtn){
  toggle.classList.toggle('active');
  if(toggleBtn.id === 'enable'){
    cropper.clear();
    btnDisable = true;
    toggleBtn.id = 'disable';
  }
  else{
    cropper.crop();
    btnDisable = false;
    toggleBtn.id = 'enable';
  }
}

function rotateLeft(){
  cropper.rotate(-90);
  commands.push("rotate_L");
}

function rotateRight(){
  cropper.rotate(90);
  commands.push("rotate_R");
}

function get_image(){
  if(btnDisable){return;}
  else{
    newCanvas = null;
    newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", 'newCanvas');

    if(is_mobile()){
      newCanvas = cropper.getCroppedCanvas({
        width: 297,
        height: 359
      });
    }
    else{
      newCanvas = cropper.getCroppedCanvas({
      width: 594,
      height: 541
    });
    }

    result.appendChild(newCanvas);
    
    result.style.display = "flex";
    result.style.alignItems = "center";
    toggle.style.display = "none";
    showPic.style.display = "none";

    btnDisable = true;
    commands.push("done");
  }
}

function undo(){
  var lastCommand = commands.pop();
  if(!lastCommand) return;
  switch(lastCommand){
    case "rotate_L":
      cropper.rotate(90);
      break;
    case "rotate_R":
      cropper.rotate(-90);
      break;
    case "done":
      showPic.style.display = "block";
      toggle.style.display = "flex";
      result.style.display = "none";
      while (result.firstChild) {
        result.removeChild(result.firstChild);
      }
      newCanvas = null;
      btnDisable = false;
      break;
  }
}

function cancelUpload(){
  cropper.destroy();
  while (showPic.firstChild) {
    showPic.removeChild(showPic.firstChild);
  }
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }  
  //편집 버튼, 이미지창, 메시지칸, 확인버튼 안보이도록
  editBtn.style.display = "none";
  toggle.style.display = "none";
  showPic.style.display = "none";
  result.style.display = "none";
  var opt = document.getElementsByClassName('option');
  for(var i = 0; i < opt.length; i++){
    opt[i].style.display = "none";
  }
  newCanvas = null;
  msgBox.value='';
  btnDisable = false;
  commands = [];
  //업로드 박스 다시 보이도록
  upPicBox.style.display = "block";
  picture.style.marginBottom = "30px";

}

function upload_image(){
  //영역을 선택하지 않았을 때
  if(newCanvas == null){
    alert("영역을 선택하세요");
    return;
  }
  //메시지를 입력하지 않았을 때
  var msg = msgBox.value.trim();
  console.log(msg);
  if(msg == null || msg == ""){
    alert("메시지를 입력하세요");
    return;
  }

  console.log(newCanvas);
  //parent.sunny.uploadToGD_base64(newCanvas.toDataURL("image/PNG",1),msg,);

  //편집 버튼, 이미지창, 메시지칸, 확인버튼 안보이도록
  editBtn.style.display = "none";
  result.style.display = "none";
  var opt = document.getElementsByClassName('option');
  for(var i = 0; i < opt.length; i++){
    opt[i].style.display = "none";
  }
  //업로드 박스 다시 보이도록
  upPicBox.style.display = "block";
  picture.style.marginBottom = "30px";

  //이전 이미지 지우고 메시지, 명령배열 초기화
  while (showPic.firstChild) {
    showPic.removeChild(showPic.firstChild);
  }
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }  
  newCanvas = null;
  msgBox.value='';
  btnDisable = false;
  commands = [];
}