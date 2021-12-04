const SPEED = 0.02;

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElem.style.setProperty("--position", value)
    }

    rect() {
        return this.paddleElem.getBoundingClientRect();
    }

    update(delta, ballHeight) {
        // This single line will make the computer unbeatable.
        // this.position = ballHeight;

        this.position += SPEED * delta * (ballHeight - this.position);
    }

    reset() {
        this.position = 50;
    }
}
