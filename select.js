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

    var orangebox = document.getElementsByClassName('orangebox');
    for(var i = 0; i < orangebox.length; i++){
      orangebox[i].style.width = "600px";
      orangebox[i].style.height = "547px";
    }

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

    //var cropPointer = document.querySelector('.cropper-point.point-se');
    //cropPointer.style.width = "22px";
    //cropPointer.style.height = "22px";
    
  }
}

function is_mobile()
{
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  
  if (typeof window.orientation !== 'undefined') {
    return true;
  }
  
  var iOSios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if(iOSios)
    return true;

  return false;    
}

var picture = document.querySelector('.picture');
var upPicBox = document.querySelector('.upPicBox');
var showPic = document.querySelector('.showPic');
var result = document.querySelector('.result');
var editBtn = document.querySelector('.editBtn');
var toggleBtn = document.querySelector('#toggleBtn')
var msgBox = document.querySelector('.msgBox');
var original_image_file = null;
var imageWidth = imageHeight = 0;

function load_image(input){
/*
  if(parent.sunny == null  || !parent.sunny.is_ready_for_everything())
  {
    alert("not ready yet");
    return;
  }
  
  if(!parent.sunny.is_coordinator_collecting())
  {
    alert("coordinator is not collecting image or video");
    return;

  }
*/
  if(!input.files[0]) return;
  else{
    upPicBox.style.display = "none";

    var newImage = document.createElement("img");
    newImage.setAttribute("id", 'newPic');

    var file = input.files[0];
    original_image_file = file;
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
    if(!is_mobile()){ editBtn.style.top = "502px"; }
  }
}

var cropper;

function edit_image(){
  const image = document.getElementById('newPic');
  cropper = new Cropper(image, {
    viewMode: 1,
    dragMode: 'move', //cropper 바깥에서 마우스로 사진 이동
    aspectRatio: 16 / 9, //cropper 비율
    //(중앙 표시, 그리드부분 밝게, 배경 체크무늬) 없게
    center: false,
    highlight: false,
    background: false,
    autoCropArea: 1, //초기 cropper 크기
    crop(event) {},
  });
}

var commands = [];  //버튼 명령을 저장하는 배열
var rotateCount = 0;
var newCanvas = null; //자른 이미지 놓을 canvas
var btnDisable = false; //크롭 확인 버튼 비활성화

function toggle_cropper(){
  if(toggleBtn.getAttribute('value') === 'on'){
    toggle_set();
  }
  else{
    toggle_reset();
  }
}
function toggle_reset(){
  cropper.crop();
  btnDisable = false;
  toggleBtn.setAttribute('value', 'on');
  toggleBtn.setAttribute('src', 'img/toggle_grid_on@3x.png');
}
function toggle_set(){
  cropper.clear();
  btnDisable = true;
  toggleBtn.setAttribute('value', 'off');
  toggleBtn.setAttribute('src', 'img/toggle_grid_off@3x.png');
}

function rotateLeft(){
  cropper.rotate(-90);
  commands.push("rotate_L");
  rotateCount--;
}

function rotateRight(){
  cropper.rotate(90);
  commands.push("rotate_R");
  rotateCount++;
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
      rotateCount++;
      break;
    case "rotate_R":
      cropper.rotate(-90);
      rotateCount--;
      break;
    case "done":
      showPic.style.display = "block";
      result.style.display = "none";
      while (result.firstChild) {
        result.removeChild(result.firstChild);
      }
      newCanvas = null;
      btnDisable = false;
      break;
  }
}

function rotateOriginal(){
  var originalCanvas = document.createElement("canvas");
  var originalContext = originalCanvas.getContext('2d');
  var originalImage = new Image();
  
  originalImage.src = URL.createObjectURL(original_image_file);
  originalImage.width = imageWidth;
  originalImage.height = imageHeight;
  
  var rotate = rotateCount % 4;
  if (rotate < 0) rotate += 4;

  if(rotate == 0 || rotate == 2){
    originalCanvas.width = originalImage.width;
    originalCanvas.height = originalImage.height;
    if(rotate == 2){
      originalContext.rotate((Math.PI / 180) * 180);
    }
    originalContext.drawImage(originalImage, 0, 0);
  }
  else{
    originalCanvas.width = originalImage.height;
    originalCanvas.height = originalImage.width;
    originalContext.translate(originalCanvas.width/2, originalCanvas.height/2);
    
    if(rotate == 1){
      originalContext.rotate((Math.PI / 180) * 90);
    }
    else{
      originalContext.rotate((Math.PI / 180) * 270);
    }
    originalContext.drawImage(originalImage, -(originalImage.width/2), -(originalImage.height/2));
  }
  return originalCanvas;
}

function reset_image_box(){
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
  //이전 이미지 지우고 메시지, 명령배열 등 초기화
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
  rotateCount = 0;
  toggle_reset();
}

function cancelUpload(){
  cropper.destroy();
  showPic.style.display = "none";
  reset_image_box();
}

function upload_image(){
    
  var msg = msgBox.value.trim();
  console.log(msg);
  if(msg == null || msg == ""){
    alert("메시지를 입력하세요");
    return;
  }

  try{
    if(toggleBtn.getAttribute('value') == 'on')
    {
        //영역을 선택하지 않았을 때
        if(newCanvas == null){
          alert("영역을 선택하세요");
          return;
        }

        
        var thumbnailCanvas = document.getElementById("thumbnail");
        var tbumbnailContext = thumbnailCanvas.getContext("2d");
  
        thumbnailCanvas.width = "343";
        thumbnailCanvas.height = "191";
        tbumbnailContext.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
  
        
        tbumbnailContext.drawImage(newCanvas, 0, 0, 343, 191);
        var thumbnailData = thumbnailCanvas.toDataURL("image/jpeg",0.7);

        var canvas = document.getElementById("Canvas2");
        var canvasContext = canvas.getContext("2d");
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(newCanvas, 0, 0, canvas.width, canvas.height);

      //parent.sunny.uploadToGD_base64(newCanvas.toDataURL("image/PNG",1),msg,thumbnailData);
      parent.sunny.uploadToGD_base64(thumbnailData,msg,canvas.toDataURL("image/PNG",1),"image");
    }
      
    else
    {

      //parent. document.getElementById("sunny_spinner").classList.remove("d-none");
      {
        
        parent.sunny.send_orginal_image_v2("audience_photo",original_image_file,"Canvas1","Canvas2",msg,function(org_canvas){

          var thumbnailCanvas = document.getElementById("thumbnail");
          var tbumbnailContext = thumbnailCanvas.getContext("2d");
    
          thumbnailCanvas.width = "343";
          thumbnailCanvas.height = "191";
          tbumbnailContext.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
          
          
          tbumbnailContext.drawImage(org_canvas, 0, 0, 343, 191);
          var thumbnailData = thumbnailCanvas.toDataURL("image/jpeg",0.7);
          //console.log(thumbnailData);

          
          parent.sunny.uploadToGD_base64(thumbnailData,msg,org_canvas.toDataURL("image/PNG",1),"image");
        });
      
      }
      
      

    }
  }
  catch(err)
  {

    console.log(err.message);
  }

  reset_image_box();
}