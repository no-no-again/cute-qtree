import p5, { Vector } from 'p5';
import { Agent } from './agent';
import { CircleDrawer, RectDrawer } from './drawers';
import { QTree } from './qtree';
import { Rect } from './geometry';
import { Mover } from './mover';
import {
    WIDTH,
    HEIGHT,
    NAGENTS,
    AVOID_THRESHOLD,
    BACKGROUND,
    QTREE_CAP,
    DEBUG,
    AGENT_RADIUS,
    QUERY_RANGE_COLOR
} from './config';

const debugInfo = document.querySelector('.debug-info')!;

const sketch = (s: p5) => {
    const agents: Agent[] = [];
    const qtree = new QTree<Agent>(QTREE_CAP, new Rect(0, 0, WIDTH, HEIGHT));

    const circleDrawer = new CircleDrawer(s);
    const rectDrawer = new RectDrawer(s);

    s.setup = () => {
        s.noCursor();
        s.createCanvas(WIDTH, HEIGHT);

        for (let i = 0; i < NAGENTS; i++) {
            const pos = new Vector(
                s.random(AVOID_THRESHOLD, WIDTH - AVOID_THRESHOLD),
                s.random(AVOID_THRESHOLD, HEIGHT - AVOID_THRESHOLD)
            );
            const vel = new Vector(
                s.random(-1, 1),
                s.random(-1, 1)
            );

            const mover = new Mover(pos, vel);
            const agent = new Agent(AGENT_RADIUS, mover, circleDrawer);

            agents.push(agent);
            qtree.insert(agent);
        }
    }

    s.draw = () => {
        s.background(BACKGROUND);

        // update phase
        qtree.clear();
        const queryRect = new Rect(s.mouseX - 150, s.mouseY - 75, 300, 150);

        for (const agent of agents) {
            agent.update();
            qtree.insert(agent);
        }

        const found = qtree.queryRange(queryRect)

        // draw phase
        if (DEBUG) {
            // qtree.debug(s);
            const lines = [
                `fps\t${s.frameRate().toFixed(2)}`,
                `range\t${found.length.toString()}`,
            ]

            debugInfo.textContent = lines.join('\n');
        }

        for (const agent of agents) {
            agent.draw();
        }

        for (const foundAgent of found) {
            foundAgent.highlight();
        }

        rectDrawer.draw(queryRect, QUERY_RANGE_COLOR)
    }
}

new p5(sketch);
