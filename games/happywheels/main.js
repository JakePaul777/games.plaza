var swfobject = {};

swfobject.embedSWF = function(url, cont, width, height){
    var ruffle = window.RufflePlayer.newest(),
        player = document.getElementById(cont).appendChild(ruffle.createPlayer());

    player.style.width = '100%';
    player.style.height = '100%';

    player.load({ url: url, letterbox: "on"});
}