import { Vector } from 'p5';
import { Mover } from './mover';
import { CircleDrawer } from './drawers';
import { WithPosition } from './types';
import {
    AGENT_COLOR,
    AGENT_HIGHLIGHT_COLOR,
    AVOID_THRESHOLD,
    HEIGHT,
    WIDTH
} from './config';

export class Agent implements WithPosition {
    #r: number;
    #mover: Mover;
    #circleDrawer: CircleDrawer;

    constructor(r: number, mover: Mover, circleDrawer: CircleDrawer) {
        this.#r = r;
        this.#mover = mover;
        this.#circleDrawer = circleDrawer;
    }

    get pos(): Vector {
        return this.#mover.pos
    }

    update() {
        this.#mover.step();
        this.#avoidBoundary();
    }

    draw() {
        this.#circleDrawer.draw(this.#mover.pos, this.#r, AGENT_COLOR);
    }

    highlight() {
        this.#circleDrawer.draw(this.#mover.pos, this.#r, AGENT_HIGHLIGHT_COLOR);
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
