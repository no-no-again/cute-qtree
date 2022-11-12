import p5, { Vector } from 'p5';
import { Agent } from './agent';
import { CircleDrawer, RectDrawer } from './drawers';
import { QTree } from './qtree';
import { Rect } from './geometry';
import { Mover } from './mover';
import {
    DEBUG,
    WIDTH,
    HEIGHT,
    BACKGROUND,
    N_AGENTS,
    AVOID_THRESHOLD,
    QTREE_CAP,
    QTREE_VISIBLE,
    AGENT_SPEED,
    AGENT_RADIUS,
    AGENT_NEAR_RANGE_COLOR,
    AGENT_NEAR_RANGE_VISIBLE,
    QUERY_RANGE_COLOR,
    QUERY_RANGE_WIDTH,
    QUERY_RANGE_HEIGHT,
    QUERY_RANGE_VISIBLE,
} from './config';
import { WHITE } from './colors';

const debugInfo = document.querySelector('.debug-info')!;

const sketch = (s: p5) => {
    const agents: Agent[] = [];
    const qtree = new QTree<Agent>(QTREE_CAP, new Rect(0, 0, WIDTH, HEIGHT));

    const circleDrawer = new CircleDrawer(s);
    const rectDrawer = new RectDrawer(s);

    s.setup = () => {
        s.noCursor();
        s.createCanvas(WIDTH, HEIGHT);

        for (let i = 0; i < N_AGENTS; i++) {
            const pos = new Vector(
                s.random(AVOID_THRESHOLD + AGENT_RADIUS, WIDTH - AVOID_THRESHOLD - AGENT_RADIUS),
                s.random(AVOID_THRESHOLD + AGENT_RADIUS, HEIGHT - AVOID_THRESHOLD - AGENT_RADIUS)
            );
            const vel = new Vector(
                s.random(-AGENT_SPEED, AGENT_SPEED),
                s.random(-AGENT_SPEED, AGENT_SPEED)
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
        const queryRect = new Rect(
            s.mouseX - QUERY_RANGE_WIDTH / 2,
            s.mouseY - QUERY_RANGE_HEIGHT / 2,
            QUERY_RANGE_WIDTH,
            QUERY_RANGE_HEIGHT
        );

        for (const agent of agents) {
            agent.update();
            agent.checkBoundaryCollision();
            qtree.insert(agent);
        }

        const found = qtree.queryRange(queryRect)

        // draw phase
        if (DEBUG) {
            if (QTREE_VISIBLE) {
                qtree.debug(s);
            }
            const lines = [
                `fps\t${s.frameRate().toFixed(2)}`,
                `range\t${found.length.toString()}`,
            ]

            debugInfo.textContent = lines.join('\n');
        }

        for (const agent of agents) {
            agent.draw();
        }

        if (QUERY_RANGE_VISIBLE) {
        for (const foundAgent of found) {
            foundAgent.highlight();
        }

            rectDrawer.draw(queryRect, QUERY_RANGE_COLOR)
        }
    }
}

new p5(sketch);
