// 📈 Calculus — Lesson 3: Limits — Approaching Without Touching

export const calcLimitsLesson = {
  id: 'calc-limits',
  title: 'Limits — Approaching Without Touching',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'A limit asks: "what value is this approaching, even if it never quite arrives?" It is the idea that lets us sneak up on the instantaneous rate of change. Simple in intuition, powerful in execution.',

  sections: [
    {
      type: 'text',
      content:
        'You are walking toward a wall. First you cover half the distance. Then half of the remaining. Then half again. Each step brings you closer, but you never actually touch the wall. Still, it is obvious what you are "approaching": the wall.',
    },
    {
      type: 'text',
      content:
        'That is the intuition of a **limit**. You do not need to arrive. You just need to see where the journey is heading.',
    },

    // ── NOTATION ──────────────────────
    {
      type: 'text',
      content:
        'We write limits like this:',
    },
    {
      type: 'math',
      latex:
        '\\lim_{x \\to a} f(x) = L',
      caption:
        'Read it as "the limit of f of x as x approaches a is L".',
    },
    {
      type: 'text',
      content:
        'The arrow $\\to$ means "approaches". The limit tells you what value $f(x)$ settles near as $x$ gets arbitrarily close to $a$ — without necessarily ever reaching $a$.',
    },
    {
      type: 'note',
      content:
        'Notice the subtle but important point: a limit does not care what $f(a)$ actually equals. It cares only about what happens NEAR $a$. You can even take the limit of a function at a point where the function is undefined.',
    },

    // ── SIMPLE EXAMPLE ─────────────────
    {
      type: 'text',
      content:
        'Say $f(x) = x^2$. What is $\\lim_{x \\to 2} f(x)$? Obviously 4, because $f(2) = 4$. For simple, well-behaved functions, the limit is just the value.',
    },
    {
      type: 'graph',
      title: 'Approaching x = 2 on the parabola',
      fns: [{ fn: (x) => x * x, color: 'cyan', label: 'f(x) = x²' }],
      domain: [-0.5, 4],
      range: [-1, 10],
      points: [{ x: 2, y: 4, color: 'brand', r: 7, label: 'limit = 4' }],
      lines: [{ type: 'v', value: 2, color: 'brand' }],
      caption:
        'As x gets closer to 2 from either side, f(x) gets closer to 4. That is what "limit" means.',
    },
    {
      type: 'text',
      content:
        'Where limits get interesting is when the function is **not** well-behaved at the target point — like having a hole there. And that is exactly the situation for derivatives.',
    },

    // ── DIFFERENCE QUOTIENT LIMIT ─────
    {
      type: 'text',
      content:
        'Remember the difference quotient from last lesson? The slope of a secant line:',
    },
    {
      type: 'math',
      latex:
        '\\frac{f(x + h) - f(x)}{h}',
      caption:
        'Secant slope. Depends on h — the interval width.',
    },
    {
      type: 'text',
      content:
        'If we plug in $h = 0$ directly, we get $\\frac{0}{0}$ — undefined. Something looks broken. But the limit tells us what value the ratio approaches as h shrinks toward 0, even though it is never computed at h = 0 itself.',
    },
    {
      type: 'math',
      latex:
        'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
      caption:
        'The definition of the derivative. The whole subject of calculus is built on this single line.',
    },
    {
      type: 'tip',
      content:
        'The magic of limits is that $\\frac{0}{0}$ can settle into a definite number. When both top and bottom shrink toward zero at comparable speeds, their ratio approaches a finite value. This is exactly what makes derivatives possible.',
    },

    // ── INTERACTIVE ───────────────────
    {
      type: 'simulation',
      title: 'Watch the limit in action',
      description:
        'Shrink h and watch the slope value converge. The red horizontal line shows the limit — the value it approaches.',
      sliders: [
        { id: 'h', label: 'h', min: 0.05, max: 1.5, step: 0.05, default: 1, decimals: 2 },
      ],
      render: ({ h }) => {
        const f = (x) => x * x;
        const x1 = 1;
        const x2 = 1 + h;
        const y1 = f(x1);
        const y2 = f(x2);
        const m = (y2 - y1) / h;
        return {
          fns: [
            { fn: f, color: 'cyan', label: 'f(x) = x²' },
            {
              fn: (x) => y1 + m * (x - x1),
              color: 'brand',
              label: `secant, slope ≈ ${m.toFixed(2)}`,
              dashed: true,
              strokeWidth: 2,
            },
            {
              fn: (x) => y1 + 2 * (x - x1),
              color: 'rose',
              label: 'tangent (slope = 2)',
              strokeWidth: 1.5,
            },
          ],
          points: [
            { x: x1, y: y1, color: 'brand', r: 6 },
            { x: x2, y: y2, color: 'brand', r: 6 },
          ],
          domain: [-0.5, 3],
          range: [-0.5, 6],
        };
      },
      formula: ({ h }) => {
        const f = (x) => x * x;
        const m = (f(1 + h) - f(1)) / h;
        return `\\lim_{h \\to 0} \\frac{f(1+h)-f(1)}{h} \\approx ${m.toFixed(3)} \\; \\to \\; 2`;
      },
      caption:
        'As h approaches 0, the secant slope approaches 2 — exactly the slope of the tangent line. That is the derivative of x² at x = 1.',
    },
    {
      type: 'note',
      content:
        'Look at the label on the secant: as h shrinks, the number converges. At h = 0.5, slope ≈ 2.5. At h = 0.1, slope ≈ 2.1. At h = 0.01, slope ≈ 2.01. The limit is 2 — and now you know exactly what "limit" means.',
    },

    // ── ONE-SIDED LIMITS ──────────────
    {
      type: 'text',
      content:
        'Sometimes the limit from the left and the limit from the right do not agree. When that happens, the limit does not exist.',
    },
    {
      type: 'graph',
      title: 'A jump discontinuity',
      fns: [
        { fn: (x) => (x < 1 ? x + 1 : x + 3), color: 'violet', label: 'f(x)' },
      ],
      domain: [-0.5, 3],
      range: [-0.5, 7],
      points: [
        { x: 1, y: 2, color: 'violet', r: 4, label: 'left: 2' },
        { x: 1, y: 4, color: 'violet', r: 4, label: 'right: 4' },
      ],
      lines: [{ type: 'v', value: 1, color: 'rose' }],
      caption:
        'As x approaches 1 from the left, f(x) approaches 2. From the right, it approaches 4. The two do not match, so the limit at x = 1 does not exist.',
    },
    {
      type: 'warning',
      content:
        'If the left limit and right limit disagree, the limit at that point does not exist. This matters for derivatives: a function has a derivative at a point only if its limit is well-defined there. Sharp corners — like the absolute value at 0 — have no derivative because the slopes disagree on the two sides.',
    },

    // ── WHY IT MATTERS ─────────────────
    {
      type: 'text',
      content:
        'Why do limits matter for AI?',
    },
    {
      type: 'text',
      content:
        'Because **every derivative, gradient, and training step in ML is defined as a limit**. Without limits, we could only compute average rates over finite intervals. With limits, we can compute the exact slope at a point — the instantaneous rate.',
    },
    {
      type: 'text',
      content:
        'When a neural network is being trained, it asks "how does the loss change when I nudge this weight by a tiny amount?" That tiny amount is $h$. The answer is a limit. Every backprop step you have ever run uses this.',
    },
    {
      type: 'tip',
      content:
        'Next: derivatives. Now that we understand limits, we can define the derivative properly and start computing them. This is where calculus starts to feel like real mathematics.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question:
        'If $f(x) = x^2$, what is $\\lim_{x \\to 3} f(x)$?',
      correct: 9,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'For a continuous function, the limit equals the value.',
      explanation:
        'Since $x^2$ is continuous everywhere, the limit at $x = 3$ is just $f(3) = 9$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does the notation $\\lim_{x \\to a} f(x) = L$ mean?',
      options: [
        'f(a) is always equal to L.',
        'As x gets closer to a, f(x) gets closer to L — regardless of f(a).',
        'The function f is undefined at a.',
        'L is the maximum value of f.',
      ],
      correct: 1,
      explanation:
        'The limit describes what f(x) approaches as x approaches a. It does not care what f(a) actually equals — or even whether f is defined at a.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'For $f(x) = x^2$, what is $\\lim_{h \\to 0} \\frac{f(2+h) - f(2)}{h}$?',
      correct: 4,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Compute $\\frac{(2+h)^2 - 4}{h}$ and simplify. What does it approach?',
      explanation:
        '$\\frac{(2+h)^2 - 4}{h} = \\frac{4 + 4h + h^2 - 4}{h} = \\frac{4h + h^2}{h} = 4 + h$. As $h \\to 0$, this approaches 4. That is the derivative of x² at x = 2.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'A function has a "jump" at x = 2 — approaching 3 from the left and 7 from the right. What is the limit at x = 2?',
      options: [
        '3',
        '7',
        '5 — the average of 3 and 7',
        'The limit does not exist.',
      ],
      correct: 3,
      explanation:
        'For a limit to exist, the left limit and right limit must agree. Here they are 3 and 7 — different. So the limit does not exist at x = 2.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Why does the difference quotient $\\frac{f(x+h)-f(x)}{h}$ need a limit?',
      options: [
        'Because it always equals zero.',
        'Because plugging in $h = 0$ directly gives $0/0$, which is undefined.',
        'Because h is always negative.',
        'Because the formula only works for straight lines.',
      ],
      correct: 1,
      explanation:
        'Plugging $h = 0$ gives $\\frac{0}{0}$, an indeterminate form. The limit lets us find what the ratio approaches as h gets arbitrarily small — without ever actually dividing by zero.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'numeric-answer',
      math: true,
      question:
        'What is $\\lim_{x \\to 0} \\frac{x^2 + 3x}{x}$? (Hint: simplify first.)',
      correct: 3,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Factor out x from the numerator: $\\frac{x(x + 3)}{x} = x + 3$.',
      explanation:
        '$\\frac{x^2 + 3x}{x} = x + 3$ (for $x \\neq 0$). As $x \\to 0$, $x + 3 \\to 3$. The limit is 3.',
      xp: 25,
    },
  ],
};