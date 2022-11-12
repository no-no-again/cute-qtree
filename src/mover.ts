import { Vector } from "p5";

export class Mover {
    #pos: Vector;
    #vel: Vector;

    constructor(pos: Vector, vel: Vector) {
        this.#pos = pos;
        this.#vel = vel;
    }

    step() {
        this.#pos = Vector.add(this.#pos, this.#vel);
    }

    pos(): Vector {
        return this.#pos;
    }
}
