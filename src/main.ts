import p5 from 'p5';

const sketch = (s: p5) => {
  s.setup = () => {
    s.createCanvas(400, 400);
  }

  s.draw = () => {
    s.background(0);
    s.circle(10, 10, 10)
  }
}

new p5(sketch);
