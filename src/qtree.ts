import p5, { Vector } from "p5";
import { Rect } from "./geometry";
import { WithPosition } from "./types"

export class QTree<T extends WithPosition>  {
    #cap: number
    #boundary: Rect
    #entries: T[] = [];
    #nw: QTree<T> | null = null;
    #ne: QTree<T> | null = null;
    #sw: QTree<T> | null = null;
    #se: QTree<T> | null = null;

    constructor(cap: number, borders: Rect) {
        this.#cap = cap;
        this.#boundary = borders;
    }

    insert(entry: T): boolean {
        if (!this.#boundary.contains(entry.pos())) {
            return false;
        }

        if (this.#entries.length < this.#cap) {
            this.#entries.push(entry);
            return true;
        }

        if (!this.#nw) {
            this.#subdivide();
        }


        if (this.#nw!.insert(entry)) { return true };
        if (this.#ne!.insert(entry)) { return true };
        if (this.#sw!.insert(entry)) { return true };
        if (this.#se!.insert(entry)) { return true };

        return false;
    }

    queryRange(range: Rect): T[] {
        const found: T[] = [];

        if (!this.#boundary.intersects(range)) {
            return found;
        }

        for (const entry of this.#entries) {
            if (range.contains(entry.pos())) {
                found.push(entry);
            }
        }

        if (!this.#nw) {
            return found
        }

        found.push(...this.#nw!.queryRange(range))
        found.push(...this.#ne!.queryRange(range))
        found.push(...this.#sw!.queryRange(range))
        found.push(...this.#se!.queryRange(range))

        return found
    }

    contains(p: Vector) {
        return this.#boundary.contains(p);
    }

    clear() {
        this.#entries = [];
        this.#nw = null;
        this.#ne = null;
        this.#sw = null;
        this.#se = null;
    }

    debug(s: p5) {
        const { x, y, w, h } = this.#boundary;

        s.noFill();
        s.stroke(255);
        s.strokeWeight(1);
        s.rect(x, y, w, h);

        if (this.#nw) { this.#nw.debug(s); }
        if (this.#ne) { this.#ne.debug(s); }
        if (this.#sw) { this.#sw.debug(s); }
        if (this.#se) { this.#se.debug(s); }
    }

    #subdivide() {
        const { x, y, w, h } = this.#boundary;

        const nwrect = new Rect(x, y, w / 2, h / 2);
        this.#nw = new QTree<T>(this.#cap, nwrect);

        const nerect = new Rect(x + w / 2, y, w / 2, h / 2);
        this.#ne = new QTree<T>(this.#cap, nerect);

        const swrect = new Rect(x, y + h / 2, w / 2, h / 2);
        this.#sw = new QTree<T>(this.#cap, swrect);

        const serect = new Rect(x + w / 2, y + h / 2, w / 2, h / 2);
        this.#se = new QTree<T>(this.#cap, serect);
    }
}
