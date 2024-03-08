import './bird.mjs'

let stepX = 10;
let stepY = 10;

const birdPopulationCount = 1;

const birds = [];

const performAnimation = () => {
    birds.forEach( (bird) =>
        bird.move()
    )
    requestAnimationFrame(performAnimation);
};

requestAnimationFrame(performAnimation);

function createPopulation() {
    for (let i = 0; i < birdPopulationCount; i++) {
        const newBird = document.createElement('neuro-bird');
        birds.push(newBird)
        game.append(newBird);
    }
}

createPopulation();
