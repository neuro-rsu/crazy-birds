const audio = new Audio('audio/crazy-birds.mp3')
audio.loop = true;

function play() {
    audio.paused ? audio.play() : audio.pause();
}