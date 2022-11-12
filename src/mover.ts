import { Vector } from "p5";

export class Mover {
    #pos: Vector;
    #vel: Vector;
    #acc: Vector;

    constructor(pos: Vector, vel: Vector) {
        this.#pos = pos;
        this.#vel = vel;
        this.#acc = new Vector(1, 1);
    }

    step() {
        this.#vel = Vector.add(this.#vel, this.#acc);
        this.#pos = Vector.add(this.#pos, this.#vel);
        this.#acc = this.#acc.mult(0);
    }

    pos(): Vector {
        return this.#pos;
    }

    vel(): Vector {
        return this.#pos;
    }

    applyForce(fv: Vector) {
        this.#acc.add(fv);
    }
}
