

var time = document.querySelector(".time_text");
var params = new URLSearchParams(window.location.search);

document.addEventListener('click', () => {
  document.querySelector("body").requestFullscreen();
})

var firstname = params.get("firstname");
var surname = params.get("surname");
var image = params.get("image");
var pesel = params.get("pesel")
var urodzin = params.get("urodzin")



function hideAddressBar(){
  if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
    document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
  setTimeout(window.scrollTo(1,1),0);
}
window.addEventListener("load",function(){hideAddressBar();});
window.addEventListener("orientationchange",function(){hideAddressBar();});

let webManifest = {
  "name": "",
  "short_name": "",
  "theme_color": "#f5f6fb",
  "background_color": "#f5f6fb",
  "display": "standalone"
};

window.addEventListener(
    "touchmove",
    function (event) {
      if (event.scale !== 1) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    { passive: false }
  );

let manifestElem = document.createElement('link');
manifestElem.setAttribute('rel', 'manifest');
manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
document.head.prepend(manifestElem);

const surnameElem = document.querySelector(".surname");
const firstnameElem = document.querySelector(".firstname");
const peselElem = document.querySelector(".pesel");
const urodzinElem = document.querySelector('.urodzin');
const imageElem = document.querySelector(".id_own_image");


if (firstnameElem) {
    firstnameElem.innerHTML = firstname ? firstname.toUpperCase() : "TEST";
}

if (surnameElem) {
    surnameElem.innerHTML = surname ? surname.toUpperCase() : "TEST";
}

if (peselElem) {
    peselElem.innerHTML = pesel || "06261114915";
}

if (urodzinElem) {
    urodzinElem.innerHTML = urodzin || "14.09.2006";
}

if (imageElem) {
    imageElem.style.backgroundImage = image ? "url('" + image + "')" : "none";
}


var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
var date = new Date();
document.querySelector(".bottom_update_value").innerHTML = date.toLocaleDateString("pl-PL", options);

setClock();
function setClock(){
    date = new Date();
    time.innerHTML = "Czas: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.toLocaleDateString("pl-PL", options);    
    delay(1000).then(() => {
        setClock();
    })
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}