import Ball from "./ball.js";

const ball = new Ball(document.getElementById("ball"));

let lastTime;
function update(time) {

    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta);
    }

    lastTime = time;
    // It updates the screen every time an object is moved.
    window.requestAnimationFrame(update);
}

// This will create an infinite loop
window.requestAnimationFrame(update);
