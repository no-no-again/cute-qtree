import { Mover } from './mover';
import { CircleDrawer } from './drawers';

export class Agent {
    #mover: Mover;
    #circleDrawer: CircleDrawer;

    constructor(mover: Mover, circleDrawer: CircleDrawer) {
        this.#mover = mover;
        this.#circleDrawer = circleDrawer;
    }

    update() {
        this.#mover.step();
    }

    draw() {
        this.#circleDrawer.draw(this.#mover.pos(), 10);
    }
}
