import p5, { Vector } from 'p5';
import { Agent } from './agent';
import { Mover } from './mover';
import { CircleDrawer } from './drawers';
import {
    WIDTH,
    HEIGHT,
    NAGENTS,
    AVOID_THRESHOLD,
    BACKGROUND
} from './config';

const sketch = (s: p5) => {
    const agents: Agent[] = [];
    const circleDrawer = new CircleDrawer(s);

    s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT);

        for (let i = 0; i < NAGENTS; i++) {
            const pos = new Vector(
                s.random(AVOID_THRESHOLD, WIDTH - AVOID_THRESHOLD),
                s.random(AVOID_THRESHOLD, HEIGHT - AVOID_THRESHOLD)
            );
            const vel = new Vector(s.random(-0.25, 0.25), s.random(-0.25, 0.25));
            const mover = new Mover(pos, vel);
            const agent = new Agent(mover, circleDrawer);
            agents.push(agent);
        }
    }

    s.draw = () => {
        s.background(BACKGROUND);

        for (const agent of agents) {
            agent.update();
            agent.draw();
        }

        info(s);
    }
}

const info = (s: p5) => {
    s.textSize(10);
    s.text(s.frameRate().toFixed(2), 10, 20);
    s.fill(255);
}

new p5(sketch);
