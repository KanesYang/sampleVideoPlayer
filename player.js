var video = document.getElementById('video');
var playButton = document.getElementById('play-button');
var pbar = document.getElementById('pbar');
var pbarContainer = document.getElementById('pbar-container');
var timeField = document.getElementById('time-field');
var soundButton = document.getElementById('sound-button');
var sbarContainer = document.getElementById('sbar-container');
var sbar = document.getElementById('sbar');
var fullscreenButton = document.getElementById('fullscreen-button');
var screenButton = document.getElementById('screen-button');
var pauseScreen = document.getElementById('screen');

var update;

window.addEventListener('load', function () {

    video.load();
    video.addEventListener('canplay', function () {

        playButton.addEventListener('click', playOrPause, false);

        pbarContainer.addEventListener('click', skip, false);

        soundButton.addEventListener('click', muteOrUnmute, false);

        sbarContainer.addEventListener('click', changeVolume, false);
        
        fullscreenButton.addEventListener('click', fullscreen, false);
        
        screenButton.addEventListener('click', playOrPause, false);

        updatePlayer();

    }, false);

}, false)


function playOrPause() {
    if (video.paused) {
        video.play();
        playButton.src = 'src/pause.png';
        //when click , trigger this time event
        update = setInterval(updatePlayer, 30);
        
        pauseScreen.style.display = 'none';
        screenButton.src = 'src/play.png';
    } else {
        video.pause();
        playButton.src = 'src/play.png';
        window.clearInterval(update);
        
        pauseScreen.style.display = 'block';
        screenButton.src = 'src/play.png';
    }
}

function updatePlayer() {
    var percentage = (video.currentTime / video.duration) * 100;
    //update the time
    timeField.innerHTML = getFormattedTime();

    pbar.style.width = percentage + "%";

    if (video.ended) {
        console.log('End');
        window.clearInterval(update);
        playButton.src = 'src/replay.png';
        screenButton.src = 'src/replay.png';
    } else if (video.paused) {
        screenButton.src = 'src/play.png';
        playButton.src = 'src/play.png';
    }
}

function skip(e) {
    var mouseX = e.pageX - pbar.offsetLeft;

    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');

    width = parseFloat(width);

    video.currentTime = (mouseX / width) * video.duration;

}

function getFormattedTime() {
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds / 60);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes > 0) {
        seconds -= minutes * 60;
    }

    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds / 60);

    if (totalMinutes > 0) {
        totalSeconds -= totalMinutes * 60;
    }

    if (totalSeconds < 10) {
        totalSeconds = '0' + totalSeconds;
    }

    if (totalMinutes < 10) {
        totalMinutes = '0' + totalMinutes;
    }


    return minutes + ':' + seconds + '/' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
    if (!video.muted) {
        video.muted = true;
        soundButton.src = 'src/mute.png';
        sbar.style.display = 'none';
    } else {
        video.muted = false;
        soundButton.src = 'src/sound.png';
        sbar.style.display = 'block';
    }
}

function changeVolume(e) {
    var mouseX = e.pageX - sbarContainer.offsetLeft;

    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');

    width = parseFloat(width);

    video.volume = (mouseX / width);
    sbar.style.width = (mouseX / width) * 100 + '%';
    video.muted = false;
    soundButton.src = 'src/sound.png';
    sbar.style.display = 'block';
}

function fullscreen() {
    if(video.requestFullscreen) {
        video.requestFullscreen();
    } else if(video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    } else if(video.webkitRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if(video.msRequestFullScreen) {
        video.msRequestFullScreen();
    }
}