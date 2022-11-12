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
        this.#mover.step();
        this.#avoidBoundary();
    }

    draw() {
        this.#circleDrawer.draw(this.#mover.pos, AGENT_DIAMETER, AGENT_COLOR);
    }

    get pos(): Vector {
        return this.#mover.pos
    }

    highlight() {
        this.#circleDrawer.draw(this.#mover.pos, AGENT_DIAMETER, AGENT_HIGHLIGHT_COLOR);
    }

    #avoidBoundary() {
        const { x, y } = this.#mover.pos;
        const { x: vx, y: vy } = this.#mover.vel;

        if (x <= AVOID_THRESHOLD) {
            this.#mover.pos = new Vector(AVOID_THRESHOLD, y);
            this.#mover.vel = new Vector(vx * -1, vy);
        }
        if (x >= WIDTH - AVOID_THRESHOLD) {
            this.#mover.pos = new Vector(WIDTH - AVOID_THRESHOLD, y);
            this.#mover.vel = new Vector(vx * -1, vy);
        }
        if (y <= AVOID_THRESHOLD) {
            this.#mover.pos = new Vector(x, AVOID_THRESHOLD);
            this.#mover.vel = new Vector(vx, vy * -1);
        }
        if (y >= HEIGHT - AVOID_THRESHOLD) {
            this.#mover.pos = new Vector(x, HEIGHT - AVOID_THRESHOLD);
            this.#mover.vel = new Vector(vx, vy * -1);
        }
    }
}
