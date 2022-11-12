import { Vector } from 'p5';
import { Mover } from './mover';
import { CircleDrawer } from './drawers';
import { AGENT_COLOR, AGENT_DIAMETER, AGENT_HIGHLIGHT_COLOR, AVOID_THRESHOLD, HEIGHT, WIDTH } from './config';
import { WithPosition } from './types';

export class Agent implements WithPosition {
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
        this.#circleDrawer.draw(this.#mover.pos(), AGENT_DIAMETER, AGENT_COLOR);
    }

    pos(): Vector {
        return this.#mover.pos()
    }

    highlight() {
        this.#circleDrawer.draw(this.#mover.pos(), AGENT_DIAMETER, AGENT_HIGHLIGHT_COLOR);
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
