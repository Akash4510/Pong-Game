const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    reset() {
        this.x = 50;  // Setting the initial value of x to be at center
        this.y = 50;  // Setting the initial value of y to be at center

        this.direction = { x: 0, y: 0 }  // Setting up a direction for the ball to move
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            // Getting a random direction for the ball to move
            const heading = randomNumberBetween(0, 2 * Math.PI);
            // Setting the heading of the ball to move in that direction
            this.direction = {
                x: Math.cos(heading), y: Math.sin(heading)
            }
        }
        // Setting up the velocity to start at initail velocity
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects) {
        // Incrementing the x and y position of the ball 
        // Multiplying the value with the delta so that the ball will appear to move in the same speed even in the frame drops
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;

        // Increasing the velocity with time
        this.velocity += VELOCITY_INCREASE * delta;

        // Reversing the y direction of the ball if it hits the top side or the bottom side of the screen. 
        const rect = this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }

        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
    return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top;
}
