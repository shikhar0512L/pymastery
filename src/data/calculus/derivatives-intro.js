// 📈 Calculus — Lesson 4: Derivatives — The Slope at a Point

export const calcDerivativesIntroLesson = {
  id: 'calc-derivatives-intro',
  title: 'Derivatives — The Slope at a Point',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'The derivative is the answer to one question: if I nudge the input slightly, how does the output change? It is the speedometer of mathematics — and the engine of AI.',

  sections: [
    {
      type: 'text',
      content:
        'You have met the difference quotient. You have seen the limit. Now they combine into the most important object in all of calculus: the **derivative**.',
    },
    {
      type: 'math',
      latex:
        'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
      caption:
        'The derivative of f at x. The slope of the tangent line. The instantaneous rate of change.',
    },
    {
      type: 'text',
      content:
        'Read it carefully. We take two nearby points on the curve — $x$ and $x + h$ — compute the secant slope between them, and let the distance $h$ shrink toward zero. The number this approaches is the derivative.',
    },
    {
      type: 'note',
      content:
        'The derivative is a **function**. Feed it any input x, and it returns the slope of the original curve at that point. So $f$ is one function, $f\'$ (read "f prime") is another function.',
    },

    // ── NOTATION ──────────────────────
    {
      type: 'text',
      content:
        'There are several ways to write the derivative. All mean the same thing:',
    },
    {
      type: 'math',
      latex:
        'f\'(x) \\quad = \\quad \\frac{df}{dx} \\quad = \\quad \\frac{dy}{dx} \\quad = \\quad Df(x)',
      caption:
        'Four notations for one idea. Lagrange (prime), Leibniz (dy/dx), and Euler (D) all appear in textbooks and ML papers.',
    },
    {
      type: 'note',
      content:
        'The Leibniz notation $\\frac{dy}{dx}$ is especially popular in ML. It reads as "the rate of change of y with respect to x". The $d$ in the numerator and denominator signals "infinitesimal change". It is a fraction, and you can often manipulate it like one — that is why it survives in modern textbooks.',
    },

    // ── GEOMETRY ──────────────────────
    {
      type: 'text',
      content:
        'Geometrically, the derivative at a point is the slope of the **tangent line** at that point. A tangent is a straight line that touches the curve and matches its direction.',
    },
    {
      type: 'graph',
      title: 'Tangent lines on a curve',
      fns: [{ fn: (x) => x * x, color: 'cyan', label: 'f(x) = x²' }],
      domain: [-3, 3],
      range: [-1, 10],
      tangent: { at: 1, fn: (x) => x * x, color: 'brand', span: 1.5 },
      points: [{ x: 1, y: 1, color: 'brand', r: 6, label: 'slope = 2' }],
      caption:
        'At x = 1, the derivative is 2 — the slope of the green tangent line. The tangent shows the "direction" of the curve right at that point.',
    },
    {
      type: 'simulation',
      title: 'Move the tangent around',
      description:
        'Slide x to different positions. Watch the tangent line tilt. Notice how the slope is negative on the left, zero at the bottom, and positive on the right.',
      sliders: [
        { id: 'x0', label: 'x', min: -3, max: 3, step: 0.1, default: 1, decimals: 2 },
      ],
      render: ({ x0 }) => ({
        fns: [
          { fn: (x) => x * x - 2, color: 'cyan', label: 'f(x) = x² − 2' },
        ],
        domain: [-4, 4],
        range: [-3, 8],
        tangent: { at: x0, fn: (x) => x * x - 2, color: 'brand', span: 1.5 },
        points: [{ x: x0, y: x0 * x0 - 2, color: 'brand', r: 6 }],
      }),
      formula: ({ x0 }) => `f'(x_0) = 2 x_0 = ${(2 * x0).toFixed(2)}`,
      caption:
        'The rule for the derivative of x² is f\'(x) = 2x. At x = 1, the slope is 2. At x = −2, the slope is −4. At x = 0, the slope is 0 — the curve is momentarily flat at its minimum.',
    },
    {
      type: 'tip',
      content:
        'Notice the pattern: the slope goes from negative to zero to positive as x moves left to right. Whenever the slope is zero, the curve is at a **peak or valley**. Finding those points is what optimisation — and every ML training algorithm — is all about.',
    },

    // ── WHY IT'S A FUNCTION ──────────
    {
      type: 'text',
      content:
        'A crucial idea: the derivative is defined **at every point**. So we can plot it as its own curve. The derivative function tells you the slope of the original curve, everywhere.',
    },
    {
      type: 'graph',
      title: 'f(x) = x² and its derivative f\'(x) = 2x',
      fns: [
        { fn: (x) => x * x, color: 'cyan', label: 'f(x) = x²' },
        { fn: (x) => 2 * x, color: 'rose', label: "f'(x) = 2x" },
      ],
      domain: [-3, 3],
      range: [-6, 10],
      caption:
        'The cyan curve is x². The rose line is its derivative, 2x. Where the parabola has slope 0 (at x = 0), the derivative is 0. Where the parabola rises steeply, the derivative is large.',
    },
    {
      type: 'text',
      content:
        'Look closely at the two curves. The rose line tells you the slope of the cyan curve at every x. That is what the derivative means — slope as a function of position.',
    },

    // ── HOW TO COMPUTE ────────────────
    {
      type: 'text',
      content:
        'In principle, you can compute any derivative from the definition — using the limit of the difference quotient. Let us do one example:',
    },
    {
      type: 'text',
      content:
        'Find the derivative of $f(x) = x^2$.',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} f\'(x) &= \\lim_{h \\to 0} \\frac{(x + h)^2 - x^2}{h} \\\\[4pt] &= \\lim_{h \\to 0} \\frac{x^2 + 2xh + h^2 - x^2}{h} \\\\[4pt] &= \\lim_{h \\to 0} \\frac{2xh + h^2}{h} \\\\[4pt] &= \\lim_{h \\to 0} (2x + h) \\\\[4pt] &= 2x \\end{aligned}',
      caption:
        'Step by step: expand, cancel, factor out h, take the limit. Result: f\'(x) = 2x.',
    },
    {
      type: 'tip',
      content:
        'You will not have to do this limit every time. There are shortcuts — called **derivative rules** — that let you skip the algebra. But knowing the definition matters because it tells you what the rules are computing. That is the next lesson.',
    },

    // ── INTERPRETATIONS ──────────────
    {
      type: 'text',
      content:
        'The derivative wears many hats. In different contexts it has different names, but it is always the same idea:',
    },
    {
      type: 'text',
      content:
        '• **Slope of tangent line** — geometric view.\n• **Instantaneous rate of change** — physical view.\n• **Velocity** — when f is position.\n• **Sensitivity** — "if I nudge x, how much does f change?".\n• **Gradient component** — in multivariable functions.',
    },
    {
      type: 'text',
      content:
        'In ML, you will most often hear it called **the gradient**. When people say "compute the gradient of the loss", they mean "compute the derivative of loss with respect to each parameter".',
    },

    // ── WHY IT'S THE HEART OF AI ─────
    {
      type: 'text',
      content:
        'Why is the derivative the heart of AI?',
    },
    {
      type: 'text',
      content:
        'Because training a model means finding parameters that **minimise loss**. The derivative tells us the slope of the loss curve at our current position. If the slope is positive, the loss increases as we increase the parameter — so we should decrease it. If negative, the opposite.',
    },
    {
      type: 'math',
      latex:
        'w_{\\text{next}} = w - \\alpha \\cdot f\'(w)',
      caption:
        'Gradient descent. The derivative tells us which way is downhill. α (alpha) is the learning rate — how far to step.',
    },
    {
      type: 'text',
      content:
        'A neural network with a million parameters computes a million derivatives per training step. Each of those derivatives tells us how to nudge one specific weight. The whole process of "learning" is nothing more than applying this rule, over and over, until the loss stops shrinking.',
    },
    {
      type: 'note',
      content:
        'The technical name for this is **backpropagation** — the algorithm that computes derivatives of a loss function with respect to every weight in the network. It runs in a single backward pass through the network, using the chain rule (which you will meet in Lesson 6). It is the single most important algorithm in modern AI.',
    },
    {
      type: 'tip',
      content:
        'Next: derivative rules. Doing the limit every time is slow and error-prone. There are beautiful shortcuts — the power rule, the sum rule, the product rule — that let you compute derivatives symbolically in seconds.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the geometric meaning of the derivative $f\'(a)$?',
      options: [
        'The area under the curve up to a.',
        'The slope of the tangent line to the curve at x = a.',
        'The maximum value of the function.',
        'The distance from the origin to the point (a, f(a)).',
      ],
      correct: 1,
      explanation:
        'Geometrically, the derivative at x = a is the slope of the tangent line at that point. It tells you how steep the curve is — and in which direction — right at a.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'If $f(x) = x^2$, what is $f\'(3)$?',
      correct: 6,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'The derivative of $x^2$ is $2x$. Plug in 3.',
      explanation:
        '$f\'(x) = 2x$, so $f\'(3) = 2 \\cdot 3 = 6$.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'If $f\'(x) = 0$ at some point, what does that tell you about the curve there?',
      options: [
        'The function is undefined.',
        'The curve crosses the x-axis.',
        'The curve is momentarily flat — a peak, valley, or plateau.',
        'The function is at its maximum value.',
      ],
      correct: 2,
      explanation:
        'A zero derivative means zero slope — the tangent line is horizontal. The curve could be at a peak, a valley, or a flat plateau. Finding these points is exactly what optimisation is about.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'numeric-answer',
      math: true,
      question:
        'If $f(x) = 3x + 5$ (a straight line), what is $f\'(x)$ for any x?',
      correct: 3,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'The slope of a line is constant — same everywhere.',
      explanation:
        'A straight line has constant slope 3. So $f\'(x) = 3$ everywhere. Derivatives of linear functions are constants.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'In gradient descent, why do we subtract the derivative instead of adding it?',
      options: [
        'Because the derivative is always negative.',
        'Because we want to move in the direction that DECREASES the loss — the opposite of the slope direction.',
        'Because subtraction is faster than addition.',
        'Because the derivative is always positive.',
      ],
      correct: 1,
      explanation:
        'The derivative points in the direction of steepest INCREASE. To reduce the loss, we move opposite — subtract the derivative. That is what makes gradient descent work.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Which is NOT a meaning of the derivative?',
      options: [
        'The slope of the tangent line.',
        'The instantaneous rate of change.',
        'The area under the curve.',
        'The sensitivity of the output to a small change in input.',
      ],
      correct: 2,
      explanation:
        'The area under the curve is computed by integration — the reverse operation of differentiation. The derivative has the other three interpretations and more, but "area" belongs to integrals.',
      xp: 20,
    },
  ],
};