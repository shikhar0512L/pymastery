// 📈 Calculus — Lesson 2: Rate of Change

export const calcRateOfChangeLesson = {
  id: 'calc-rate-of-change',
  title: 'Rate of Change — How Fast Things Move',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'How fast is this changing? It is the most useful question in all of science. Speed, growth, temperature, loss — they are all rates. This lesson builds the intuition that leads directly to derivatives.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine driving from Delhi to Jaipur. You cover 280 km in 4 hours. Someone asks: "how fast were you going?" You say 70 km/h. But you did not actually drive at a constant 70 — you sped up, slowed down, stopped for tea. That 70 is an **average**.',
    },
    {
      type: 'text',
      content:
        'The **average rate of change** is the total change in output divided by the total change in input. It is the slope of the straight line connecting the start and end points.',
    },
    {
      type: 'math',
      latex:
        '\\text{average rate} = \\frac{\\Delta y}{\\Delta x} = \\frac{f(b) - f(a)}{b - a}',
      caption:
        'The Greek letter Δ means "change in". So Δy is how much the output changed, and Δx is how much the input changed.',
    },
    {
      type: 'text',
      content:
        'For the drive: $\\Delta y = 280$ km, $\\Delta x = 4$ hours, so average rate is 70 km/h. Simple. But what if you wanted to know your speed at exactly 2:15 PM? That is the **instantaneous rate** — the speedometer reading at that instant. Getting that requires calculus.',
    },
    {
      type: 'note',
      content:
        'Average rate is easy — just two points. Instantaneous rate is the whole point of derivatives. It is the answer to "how fast RIGHT NOW", not "how fast on average".',
    },

    // ── SECANT LINE ─────────────────────
    {
      type: 'text',
      content:
        'To understand rates, we need lines. Take a curve $f(x)$ and pick two points on it. The straight line through them is called the **secant line**. Its slope is the average rate of change.',
    },
    {
      type: 'graph',
      title: 'A curve and its secant line',
      fns: [
        { fn: (x) => x * x, color: 'cyan', label: 'f(x) = x²' },
        {
          fn: (x) => 2 + 3 * (x - 1),
          color: 'brand',
          label: 'secant line',
          dashed: true,
          strokeWidth: 2,
        },
      ],
      points: [
        { x: 1, y: 1, color: 'brand', r: 6, label: '(1, 1)' },
        { x: 2, y: 4, color: 'brand', r: 6, label: '(2, 4)' },
      ],
      domain: [-0.5, 3],
      range: [-0.5, 6],
      caption:
        'The secant line through (1, 1) and (2, 4). Its slope is $(4-1)/(2-1) = 3$. That is the average rate of change over that interval.',
    },
    {
      type: 'text',
      content:
        'But the curve is not a straight line. The secant only gives an average. To capture what happens at a single instant, we do something clever: **move the two points closer together**.',
    },
    {
      type: 'simulation',
      title: 'Shrink the interval',
      description:
        'Move the slider to bring point 2 closer to point 1. Watch the secant line become more and more like a tangent — a line that touches the curve at exactly one point.',
      sliders: [
        { id: 'h', label: 'h', min: 0.1, max: 2, step: 0.05, default: 1.5, decimals: 2 },
      ],
      render: ({ h }) => {
        const f = (x) => x * x;
        const x1 = 1;
        const x2 = 1 + h;
        const y1 = f(x1);
        const y2 = f(x2);
        const m = (y2 - y1) / (x2 - x1);
        return {
          fns: [
            { fn: f, color: 'cyan', label: 'f(x) = x²' },
            {
              fn: (x) => y1 + m * (x - x1),
              color: 'brand',
              label: 'secant',
              dashed: true,
              strokeWidth: 2,
            },
          ],
          points: [
            { x: x1, y: y1, color: 'brand', r: 6 },
            { x: x2, y: y2, color: 'brand', r: 6 },
          ],
          domain: [-0.5, 4],
          range: [-0.5, 10],
        };
      },
      formula: ({ h }) => {
        const x1 = 1;
        const x2 = 1 + h;
        const y1 = x1 * x1;
        const y2 = x2 * x2;
        const m = (y2 - y1) / (x2 - x1);
        return `\\text{slope} = \\frac{f(1+h)-f(1)}{h} = ${m.toFixed(3)}`;
      },
      caption:
        'As h → 0, the secant slope approaches 2 — which is exactly the slope of the tangent at x = 1. This is the limit we will formalise in the next lesson.',
    },
    {
      type: 'tip',
      content:
        'Notice something beautiful: as the interval shrinks, the average rate **approaches a specific number**. It does not blow up or jump around — it settles. That number is what we call the **instantaneous rate of change**. That is the derivative.',
    },

    // ── h NOTATION ─────────────────────
    {
      type: 'text',
      content:
        'Mathematicians use the letter $h$ for the tiny distance between the two points. So the two inputs are $x$ and $x + h$. The secant slope becomes:',
    },
    {
      type: 'math',
      latex:
        '\\text{slope of secant} = \\frac{f(x + h) - f(x)}{h}',
      caption:
        'The difference quotient. Every derivative in history is computed from this single formula.',
    },
    {
      type: 'text',
      content:
        'This expression has a name: the **difference quotient**. It is the slope of a secant line, and it becomes the derivative when we let $h$ shrink to zero.',
    },
    {
      type: 'note',
      content:
        'Notice the form: "change in output" divided by "change in input". Top is $f(x+h) - f(x)$, the output change. Bottom is $h$, the input change. That ratio is always what "rate" means — whether it is speed, growth rate, or interest rate.',
    },

    // ── REAL EXAMPLES ──────────────────
    {
      type: 'text',
      content:
        'Rates are everywhere. Here are the ones you will meet in ML and data science:',
    },
    {
      type: 'text',
      content:
        '• **Speed** — rate of change of position. Kilometres per hour.\n• **Growth rate** — rate of change of population. People per year.\n• **Velocity of a stock** — rate of change of price. Rupees per day.\n• **Learning rate** — how fast a model improves per step.\n• **Loss rate** — how much error decreases as we tweak the weights.',
    },
    {
      type: 'graph',
      title: 'Loss during training — decreasing over time',
      fns: [
        { fn: (x) => 5 / (1 + x) + 1, color: 'rose', label: 'training loss' },
      ],
      domain: [0, 10],
      range: [0, 7],
      caption:
        'The loss starts high and drops fast, then slows down. The rate of change is steep at the start, gentle later. That is exactly what "converging" means in ML.',
    },
    {
      type: 'tip',
      content:
        'The rate of change of the loss is what gradient descent actually uses. If loss is dropping fast, you take big steps. If loss barely moves, you take small steps — or stop. The derivative tells the optimiser exactly how fast to move.',
    },

    // ── WHY THIS MATTERS ───────────────
    {
      type: 'text',
      content:
        'Why does all of this matter for AI?',
    },
    {
      type: 'text',
      content:
        'Because **training a model is nothing but moving parameters in the direction that reduces loss**. That direction is decided entirely by the rate of change of the loss with respect to each parameter. Without rates, there is no learning.',
    },
    {
      type: 'math',
      latex:
        'w_{\\text{new}} = w_{\\text{old}} - \\eta \\cdot \\frac{dL}{dw}',
      caption:
        'The gradient descent update. The rate of change dL/dw tells us which way is downhill, and how steeply. η (eta) is the learning rate — how big a step we take.',
    },
    {
      type: 'note',
      content:
        'You now have the intuition. Every neural network you have ever used computes thousands of these rates per second — one for every weight in the model. The chain rule (later in this module) is what makes it all computationally feasible.',
    },
    {
      type: 'tip',
      content:
        'Next: limits. What does it really mean when we say "as h approaches 0"? This is the foundation on which all of calculus — and therefore all of modern AI — is built.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question:
        'A car travels 180 km in 3 hours. What is its average speed (in km/h)?',
      correct: 60,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Average rate = total change in output ÷ total change in input.',
      explanation:
        'Average speed = $180 / 3 = 60$ km/h. This is the average — the actual speed at any given moment might have been higher or lower.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'What does the **slope of the secant line** represent?',
      options: [
        'The instantaneous rate of change at one point.',
        'The average rate of change over an interval.',
        'The area under the curve.',
        'The value of the function at a point.',
      ],
      correct: 1,
      explanation:
        'A secant line connects two points on the curve. Its slope is the average rate of change between those two points — total change divided by total input change.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'For $f(x) = x^2$, what is the average rate of change between $x = 1$ and $x = 3$?',
      correct: 4,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Use $\\frac{f(3) - f(1)}{3 - 1}$.',
      explanation:
        '$f(3) = 9$, $f(1) = 1$. Average rate = $(9-1)/(3-1) = 8/2 = 4$.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'In the difference quotient $\\frac{f(x+h) - f(x)}{h}$, what does the letter $h$ represent?',
      options: [
        'The height of the curve.',
        'The small change in the input x.',
        'The slope of the tangent.',
        'The y-intercept.',
      ],
      correct: 1,
      explanation:
        '$h$ is the distance between the two x-values. As $h \\to 0$, the secant slope becomes the tangent slope — the derivative.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which is the best interpretation of the derivative in a machine learning context?',
      options: [
        'The total value of the loss function.',
        'The average loss across all examples.',
        'How fast the loss changes when you tweak a parameter.',
        'The number of parameters in the model.',
      ],
      correct: 2,
      explanation:
        'The derivative tells you the rate of change of the loss with respect to a parameter. It tells the optimiser which way is downhill and how steeply — which is exactly what gradient descent needs.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'numeric-answer',
      math: true,
      question:
        'For $f(x) = 2x + 1$, what is the average rate of change between any two points (in other words, the slope of the line)?',
      correct: 2,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'It is a straight line — the average rate of change is the same everywhere.',
      explanation:
        'The line has slope 2 everywhere. Pick any two points and compute: $\\frac{(2b+1) - (2a+1)}{b - a} = \\frac{2(b-a)}{b-a} = 2$.',
      xp: 15,
    },
  ],
};