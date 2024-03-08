let tmp = document.createElement('template');
tmp.innerHTML = `
    <style>
        :host {
            position: absolute;
            display: block;
        }
        img {
            display: block;
            width: 40px;
            height: 40px;
        }
    </style>
    <img id="bird-image" part="bird-image" class="bird" src="images/angry-birds.png" />
`;

document.body.append(tmp);

function MyRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

customElements.define("neuro-bird", class CrazyBird extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(document.importNode(tmp.content, true));
        // this.shadowRoot.adoptedStyleSheets = [styles];
        this.shadowRoot.querySelector('#bird-image').onload = () => this.isReady = true;
        this.speedX = MyRandom(2, 10);
        this.speedY = MyRandom(2, 10);
    }

    isReady = false;

    connectedCallback() {
        this.style.transform = `translate3d(${Math.random()*200}px, ${Math.random()*200}px, 0)`;
        this.style.top = Math.random()*100+'px';
        this.style.left = Math.random()*300+'px';
        this.style.left = 100+'px';
    }

    move() {
        if (!this.isReady)
            return;

        const rect = this.getBoundingClientRect();
        let x = rect.x + this.speedX;
        if ((x + rect.width > this.parentNode.offsetLeft + this.parentNode.offsetWidth && this.speedX > 0) ||
            (x < this.parentNode.offsetLeft && this.speedX < 0) ) {
                this.speedX = -this.speedX;
        }

        let  y = rect.y + this.speedY;
        if ( (y + rect.height > this.parentNode.offsetHeight && this.speedY > 0) ||
            (y < this.parentNode.offsetTop && this.speedY < 0) ) {
                this.speedY = -this.speedY;
        }

        this.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        this.style.transform += (this.speedX < 0) ? ' scaleX(-1)' : "";
    }
})