import { Vector } from "p5";
import { WithPosition } from "./types";

export class Mover implements WithPosition {
    #pos: Vector;
    #vel: Vector;

    constructor(pos: Vector, vel: Vector) {
        this.#pos = pos;
        this.#vel = vel;
    }

    step() {
        this.#pos = Vector.add(this.#pos, this.#vel);
    }

    set pos(p: Vector) {
        this.#pos = p;
    }

    get pos(): Vector {
        return this.#pos;
    }

    get vel(): Vector {
        return this.#vel;
    }

    set vel(v: Vector) {
        this.#vel = v;
    }
}
