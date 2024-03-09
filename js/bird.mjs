let tmp = document.createElement('template');
tmp.innerHTML = `
    <style>
        :host {
            position: absolute;
            display: block;
            width: 20px;
            height: 20px;
            overflow: hidden;
            z-index: 1;
        }
    </style>
    <img src="images/angry-birds2.png" alt=""/>
`;

const sheet = new CSSStyleSheet();

sheet.replaceSync('img {display: block;width: 20px;  height: 20px;}');

document.body.append(tmp);

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

customElements.define("neuro-bird", class CrazyBird extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(document.importNode(tmp.content, true));
        this.shadowRoot.adoptedStyleSheets = [sheet];
        this.shadowRoot.querySelector('img').onload = () => this.isReady = true;
        this.speedX = randomInt(2, 10);
        this.speedY = randomInt(2, 10);
    }

    isReady = false;

    connectedCallback() {
        this.style.transform = `translate3d(${Math.random()*100}px, ${Math.random()*100}px, 0)`;
    }

    move() {
        if (!this.isReady) {
            return;
        }

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
        if (this.speedX < 0) {
            this.style.transform += ' scaleX(-1)';
        }
    }
})