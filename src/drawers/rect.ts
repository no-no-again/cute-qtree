import p5 from "p5";
import { Rect } from "../geometry";
import { RGB } from "../types";

export class RectDrawer {
    #s: p5;

    constructor(s: p5) {
        this.#s = s;
    }

    draw(r: Rect, color: RGB) {
        this.#s.noFill();
        this.#s.stroke(color);
        this.#s.strokeWeight(1);
        this.#s.rect(r.x, r.y, r.w, r.h);
    }
}
