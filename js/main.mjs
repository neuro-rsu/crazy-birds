import './bird.mjs'

const birdCount = 200;

const birds = [];

const performAnimation = () => {
    birds.forEach( (bird) =>
        bird.move()
    )
   requestAnimationFrame(performAnimation);
};

requestAnimationFrame(performAnimation);

function createBirds() {
    for (let i = 0; i < birdCount; i++) {
        const newBird = document.createElement('neuro-bird');
        birds.push(newBird)
        space.append(newBird);
    }
}

createBirds();