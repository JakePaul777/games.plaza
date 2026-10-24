let audio = new Audio("media/hover.wav");
let audio2 = new Audio("media/stayhover.wav");
let music = new Audio("media/music.wav")
music.addEventListener('timeupdate', function(){
  let buffer = .44
  if(this.currentTime > this.duration - buffer){
      this.currentTime = 0
      this.play()
  }
});

let tooltip = document.getElementById("tooltip");

let timer = 0;
let TIMEOUT = 500;

function mouseEnter(e) {
    aud = audio.cloneNode(true)
    aud.volume = .1;
    aud.play();
    timer = setTimeout(() => {
       aud = audio2.cloneNode(true)
       aud.volume = .1;
       aud.play();
       tooltip.style.display = "block";
       tooltip.innerText = e;

    }, TIMEOUT);
}
function mouseLeave() {
    clearTimeout(timer);
    tooltip.style.display = "none";
}


document.addEventListener("mousemove", (e) => {
  x = e.clientX;
  y = e.clientY;
  tooltip.style.top = `${y}px`;
  tooltip.style.left = `${x+10}px`;
});

function play(path) {
    music.pause();
    let zip = new Audio("media/zip.wav");
    zip.volume = .5;
    zip.play();
    document.getElementById("enterbut").style.display = "none";
    document.getElementById("gobackbut").style.display = "none";
    let element = document.getElementById("cover");
    element.style.transition = "opacity .5s"
    element.style.display = "block";
    element.style.opacity = '0'
    window.requestAnimationFrame(() => {
        element.style.opacity = '1';
    });
    setTimeout(()=>{
        window.open(path);
        document.getElementById("gobackbut").style.display = "block";
    }, 300)
}

window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  });