import p5, { Vector } from "p5";

export class CircleDrawer {
    #s: p5;

    constructor(s: p5) {
        this.#s = s;
    }

    draw(pos: Vector, d: number) {
        this.#s.circle(pos.x, pos.y, d)
    }
}
