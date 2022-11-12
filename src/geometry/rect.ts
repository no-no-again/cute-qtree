import { Vector } from "p5";

export class Rect {
    #x: number;
    #y: number;
    #w: number;
    #h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
        this.#h = h;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get w() {
        return this.#w;
    }

    get h() {
        return this.#h;
    }

    contains(p: Vector): boolean {
        return (p.x >= this.x && p.x <= this.x + this.w)
            && (p.y >= this.y && p.y <= this.y + this.h);
    }

    intersects(r: Rect): boolean {
        return (r.x < this.x + this.w)
            && (r.x + r.w > this.x)
            && (r.y < this.y + this.h)
            && (r.y + r.h > this.y)
    }
}
