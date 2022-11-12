import p5, { Vector } from "p5";
import { RGB } from "../types";

export class CircleDrawer {
    #s: p5;

    constructor(s: p5) {
        this.#s = s;
    }

    draw(pos: Vector, d: number, color: RGB) {
        this.#s.noStroke();
        this.#s.fill(color);
        this.#s.circle(pos.x, pos.y, d)
    }
}
