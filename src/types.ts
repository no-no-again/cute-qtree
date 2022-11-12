import { Vector } from "p5";

export interface WithPosition {
    pos(): Vector;
}

export type RGB = [r: number, g: number, b: number];
