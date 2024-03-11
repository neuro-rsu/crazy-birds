const audio = new Audio('https://storage.cloud.google.com/crazy-birds/crazy-birds.mp3')
audio.loop = true;

function play() {
    audio.paused ? audio.play() : audio.pause();
}