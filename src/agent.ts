import { Vector } from 'p5';
import { Mover } from './mover';
import { CircleDrawer } from './drawers';
import { AVOID_THRESHOLD, HEIGHT, WIDTH } from './config';

export class Agent {
    #mover: Mover;
    #circleDrawer: CircleDrawer;

    constructor(mover: Mover, circleDrawer: CircleDrawer) {
        this.#mover = mover;
        this.#circleDrawer = circleDrawer;
    }

    update() {
        this.#avoidBorders();
        this.#mover.step();
    }

    draw() {
        this.#circleDrawer.draw(this.#mover.pos(), 10);
    }

    #avoidBorders() {
        const { x, y } = this.#mover.pos();

        if (x <= AVOID_THRESHOLD) {
            this.#mover.applyForce(new Vector(1, 0))
        }
        if (x >= WIDTH - AVOID_THRESHOLD) {
            this.#mover.applyForce(new Vector(-1, 0))
        }
        if (y <= AVOID_THRESHOLD) {
            this.#mover.applyForce(new Vector(0, 1))
        }
        if (y >= HEIGHT - AVOID_THRESHOLD) {
            this.#mover.applyForce(new Vector(0, -1))
        }
    }
}
