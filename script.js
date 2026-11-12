let audio = new Audio("media/hover.wav");
let audio2 = new Audio("media/stayhover.wav");
let audio3 = new Audio("media/flip.wav");
let audio4 = new Audio("media/help.wav");
let music = new Audio("media/music.mp3")
music.addEventListener('timeupdate', function(){
    let buffer = .44
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
    }
});

let helpwin = document.getElementById("helpwin");
let helpopen = false;
let settingswin = document.getElementById("settingswin");
let settingsopen = false;
function help() {
    helpopen = !helpopen;
    if (helpopen && settingsopen) {
        settings();
    }
    if (helpopen) {
        helpwin.style.display = "flex";
    }
    else {
        helpwin.style.display = "none";
    }
    aud = audio4.cloneNode(true)
    aud.volume = .1;
    aud.play();
}
function settings() {
    settingsopen = !settingsopen;
    if (helpopen && settingsopen) {
        help();
    }
    if (settingsopen) {
        settingswin.style.display = "flex";
    }
    else {
        settingswin.style.display = "none";
    }
    aud = audio4.cloneNode(true)
    aud.volume = .1;
    aud.play();
}

let setcloak = document.getElementById('set-cloak');
let favi = document.querySelector("link[rel*='icon']");

favi.href = "favicon2.ico"
document.title = "Google"

setcloak.onchange = (event) => {
    let inputText = event.target.value;
    if (inputText == "none") {
        favi.href = "favicon.ico";
        document.title = "games.plaza"
    }
    else if (inputText == "google") {
        favi.href = "favicon2.ico"
        document.title = "Google"
    }
    else if (inputText == "focus") {
        favi.href = "favicon3.ico"
        document.title = "Portal"
    }
}

let amount = 18;
let currentPage = 0;
let games = [];
window.gameOpen = false;

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

    let grid = document.getElementById("grid");
    
    grid.style.opacity = "0";

    setTimeout(() => {
        let maxPage = Math.ceil(games.length / amount) - 1;
        currentPage += direction;

        if (currentPage < 0) currentPage = 0;
        if (currentPage > maxPage) currentPage = maxPage;
        renderGrid();
        clearTimeout(timer);    

        grid.style.opacity = "1";

        setTimeout(() => {
            isAnimating = false;
            updateArrows();
        }, 250);

    }, 250);
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

let gameframe = document.getElementById("gameframe");
let cover = document.getElementById("cover");

function play(path) {
    window.gameOpen = true;
    music.pause();
    let zip = new Audio("media/zip.wav");
    zip.volume = .5;
    zip.play();
    document.getElementById("enterbut").style.display = "none";
    cover.style.transition = "opacity .5s"
    cover.style.display = "block";
    cover.style.opacity = "0"
    window.requestAnimationFrame(() => {
        cover.style.opacity = "1";
    });
    setTimeout(()=>{
        gameframe.src = path;
        gameframe.style.opacity = "1";
        gameframe.style.display = "block";
    }, 300)
}

window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});

function hotkey(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
    event.preventDefault();
    closegame();
  }
}

document.addEventListener('keydown', hotkey, true);
gameframe.addEventListener('load', () => {
  try {
    gameframe.contentWindow.addEventListener('keydown', hotkey, true);
  } catch (e) {}
});

function closegame() {
    window.gameOpen = false
    gameframe.style.opacity = "0";
    setTimeout(()=>{
        gameframe.src = "";
        gameframe.style.opacity = "1";
        gameframe.style.display = "none";
        window.requestAnimationFrame(() => {
            cover.style.opacity = "0";
            music.play();
            setTimeout(()=>{
                cover.style.display = "none";
            }, 1000)
        });
    }, 100)
}

function theo() {
    music.pause();
    let theoimg = document.createElement("img");
    theoimg.src = "media/theo.png";
    theoimg.style = "position: absolute; width: 100%; height:100%"
    document.body.appendChild(theoimg);
    let coonshi = document.createElement("audio");
    coonshi.src = "media/coonshi.mp3";
    coonshi.loop = true;
    document.body.appendChild(coonshi);
    coonshi.play();
}