const audio = new Audio('https://cs.rsu.edu.ru/audio/crazy-birds.mp3')
audio.loop = true;

function play() {
    audio.paused ? audio.play() : audio.pause();
}