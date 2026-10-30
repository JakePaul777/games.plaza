let audio = new Audio("media/hover.wav");
let audio2 = new Audio("media/stayhover.wav");
let audio3 = new Audio("media/flip.wav");
let music = new Audio("media/music.wav")
music.addEventListener('timeupdate', function(){
    let buffer = .44
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
    }
});

let amount = 18;
let currentPage = 0;
let games = [];

async function loadGames() {
    let response = await fetch('games.json');
    games = await response.json();
    renderGrid();
}

function renderGrid() {
    let gameholder = document.getElementById("grid");
    gameholder.innerHTML = "";

    let start = currentPage * amount;
    let end = start + amount;
    let currentGames = games.slice(start, end);

    for (let i = 0; i < amount; i++) {
        let game = document.createElement("button");
        game.id = "b" + (i + 1);
        gameholder.appendChild(game);

        let gameData = currentGames[i];
        if (gameData != null) {
            game.className = "game-btn bwg";
            game.style.backgroundImage = "url(media/games/" + gameData.idname + ".png)";

            game.addEventListener("mouseenter", function() {
                mouseEnter(gameData.name, true);
            });
            game.addEventListener("mouseleave", function() {
                mouseLeave();
            });
            game.onclick = function() {
                play("/games/" + gameData.idname);
            };
        } else {
            game.className = "game-btn";
            game.style.backgroundImage = "url(media/missing.gif)";
            game.style.cursor = "default";
            game.onclick = null;
        }
    }

    updateArrows();
}

function changePage(direction) {
    aud = audio3.cloneNode(true)
    aud.volume = .1;
    aud.play();

    let maxPage = Math.ceil(games.length / amount) - 1;
    currentPage += direction;

    if (currentPage < 0) currentPage = 0;
    if (currentPage > maxPage) currentPage = maxPage;

    renderGrid();
}

function updateArrows() {
    let maxPage = Math.ceil(games.length / amount) - 1;
    let prevBtn = document.getElementById("prev-btn");
    let nextBtn = document.getElementById("next-btn");

    if (currentPage > 0) {
        prevBtn.style.visibility = "visible";
    } else {
        prevBtn.style.visibility = "hidden";
    }

    if (currentPage < maxPage) {
        nextBtn.style.visibility = "visible";
    } else {
        nextBtn.style.visibility = "hidden";
    }
}

loadGames();

let tooltip = document.getElementById("tooltip");

let timer = 0;
let TIMEOUT = 500;

function mouseEnter(e, sound) {
    if (sound) {
        aud = audio.cloneNode(true)
        aud.volume = .1;
        aud.play();
    }
    timer = setTimeout(() => {
        if (sound) {
            aud = audio2.cloneNode(true)
            aud.volume = .1;
            aud.play();
        }
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