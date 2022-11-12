import p5, { Vector } from 'p5';
import { Agent } from './agent';
import { Mover } from './mover';
import { CircleDrawer } from './drawers';
import { BACKGROUND, HEIGHT, NAGENTS, WIDTH } from './config';

const sketch = (s: p5) => {
    const agents: Agent[] = [];
    const circleDrawer = new CircleDrawer(s);

    s.setup = () => {
        s.createCanvas(WIDTH, HEIGHT);

        for (let i = 0; i < NAGENTS; i++) {
            const pos = new Vector(s.random(20, 380), s.random(20, 380));
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
    }
}

new p5(sketch);
