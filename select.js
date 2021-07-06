window.onload = function (){
  if(is_mobile() === false){
    var logo = document.getElementById('logo');
    logo.style.width = "258px";
    logo.style.height = "104px"

    document.querySelector('header').style.paddingBottom = "10px";
    document.querySelector('.version').style.bottom = "10px";

    var info = document.getElementById('info');
    info.style.width = "600px";
    info.style.height = "41px";
    info.style.borderRadius = "21px";

    var btn = document.getElementsByClassName('tabBtn');
    for(var i = 0; i < btn.length; i++){
      btn[i].style.width = "180px";
      btn[i].style.borderRadius = "23px";
    }

    document.querySelector('.typetab').style.width = "600px";

    var picture = document.querySelector('.picture');
    picture.style.width = "600px";
    picture.style.height = "547px";
    picture.style.marginBottom = "68px";

    document.querySelector('.uptxt').style.marginTop = "12px";

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

  //document.querySelector('.upPicBox').style.visibility = "hidden";

  var file = input.files[0];

//  var newImage = document.createElement("img");
//  newImage.setAttribute("class", 'newPic');

  var newImage = document.querySelector('.upPicImg');
  
  newImage.src = URL.createObjectURL(file);

  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newImage.style.objectFit = "contain";
  newImage.style.filter = "none";
  //newImage.style.visibility = "visible";

  document.querySelector('.uptxt').style.display = "none";

  // var container = document.querySelector('.showPic');
  // container.appendChild(newImage);

  // document.querySelector('.showPic').style.visibility = "visible"

}
