// 📈 Calculus — Lesson 7: Second Derivative — Curvature & Concavity

export const calcSecondDerivativeLesson = {
  id: 'calc-second-derivative',
  title: 'Second Derivative — Curvature & Concavity',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'The first derivative tells you the slope. The second derivative tells you how the slope is changing — is the curve bending up or down? This is what separates a valley from a peak.',

  sections: [
    {
      type: 'text',
      content:
        'Two curves can have the same slope at a point yet behave completely differently — one bending upward, the other bending downward. To capture this bending, we take the derivative **again**. The derivative of the derivative is the **second derivative**, written $f\'\'(x)$ or $\\frac{d^2f}{dx^2}$.',
    },
    {
      type: 'math',
      latex: 'f\'\'(x) = \\frac{d}{dx}\\!\\left[f\'(x)\\right]',
      caption:
        'The second derivative is just the derivative of the first derivative. Apply differentiation twice.',
    },
    {
      type: 'note',
      content:
        'Just as the first derivative measures the rate of change of the function, the second derivative measures the rate of change of the **slope**. It is the "acceleration" of the curve.',
    },
    {
      type: 'text',
      content:
        'The second derivative tells you the **concavity** of the curve:\n\n• $f\'\'(x) > 0$ → concave **up** (bends like a smile)\n• $f\'\'(x) < 0$ → concave **down** (bends like a frown)\n• $f\'\'(x) = 0$ → inflection point',
    },
    {
      type: 'graph',
      title: 'Concave up vs concave down',
      fns: [
        { fn: (x) => x * x, color: 'cyan', label: 'f(x) = x² — concave up' },
        { fn: (x) => -x * x + 6, color: 'rose', label: 'g(x) = −x² + 6 — concave down' },
      ],
      domain: [-3, 3],
      range: [-3, 8],
      caption:
        'The cyan parabola opens upward — every tangent lies below it. The rose opens downward — every tangent lies above. The second derivative captures this exactly.',
    },
    {
      type: 'simulation',
      title: 'Slide along a curve and watch curvature',
      description:
        'Move x. The tangent shows the slope; the formula shows f\'(x) and f\'\'(x) at each position.',
      sliders: [
        { id: 'x0', label: 'x', min: -3, max: 3, step: 0.1, default: 1, decimals: 2 },
      ],
      render: ({ x0 }) => {
        const f = (x) => x * x * x - 3 * x;
        return {
          fns: [{ fn: f, color: 'cyan', label: 'f(x) = x³ − 3x' }],
          domain: [-3, 3],
          range: [-6, 6],
          tangent: { at: x0, fn: f, color: 'brand', span: 1.5 },
          points: [{ x: x0, y: f(x0), color: 'brand', r: 6 }],
        };
      },
      formula: ({ x0 }) => {
        const fp = 3 * x0 * x0 - 3;
        const fpp = 6 * x0;
        const conc = fpp > 0 ? '\\text{up}' : (fpp < 0 ? '\\text{down}' : '\\text{inflection}');
        return `f'(x) = ${fp.toFixed(2)},\\;\\; f''(x) = ${fpp.toFixed(2)}\\;\\; (\\text{concave } ${conc})`;
      },
      caption:
        'At x < 0, the curve bends down (f" < 0). At x = 0, inflection. At x > 0, bends up.',
    },
    {
      type: 'text',
      content:
        'The second derivative distinguishes a **peak** from a **valley**. At both, $f\'(x) = 0$. But at a peak, $f\'\' < 0$. At a valley, $f\'\' > 0$.',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} f\'(a) = 0,\\;\\; f\'\'(a) > 0 &\\;\\Rightarrow\\; \\text{local minimum (valley)} \\\\[4pt] f\'(a) = 0,\\;\\; f\'\'(a) < 0 &\\;\\Rightarrow\\; \\text{local maximum (peak)} \\end{aligned}',
      caption:
        'The second derivative test — how you classify critical points.',
    },
    {
      type: 'graph',
      title: 'A peak and a valley',
      fns: [{ fn: (x) => x * x * x / 3 - x, color: 'violet', label: 'f(x) = x³/3 − x' }],
      domain: [-3, 3],
      range: [-3, 3],
      points: [
        { x: 1, y: -0.667, color: 'emerald', r: 7, label: 'valley' },
        { x: -1, y: 0.667, color: 'rose', r: 7, label: 'peak' },
      ],
      caption:
        'At x = 1, f\' = 0 and f\'\' = 2 > 0 — valley. At x = −1, f\' = 0 and f\'\' = −2 < 0 — peak. Same f\', different f".',
    },
    {
      type: 'tip',
      content:
        'Training a model: loss functions have many peaks and valleys. Gradient descent finds where the gradient (first derivative) is zero. Whether that is a good stopping point depends on the second derivative — positive means it is a minimum, the model has converged.',
    },
    {
      type: 'text',
      content:
        'Where the second derivative changes sign, the curve switches concavity — an **inflection point**. The cubic $x^3$ has one at $x = 0$.',
    },
    {
      type: 'graph',
      title: 'An inflection point',
      fns: [{ fn: (x) => x * x * x, color: 'cyan', label: 'f(x) = x³' }],
      domain: [-2, 2],
      range: [-8, 8],
      points: [{ x: 0, y: 0, color: 'brand', r: 7, label: 'inflection' }],
      caption:
        'To the left, the cubic curves down (f" < 0). To the right, up (f" > 0). At x = 0, f" = 0 — the switch point.',
    },
    {
      type: 'note',
      content:
        'In ML, inflection points on the loss curve show moments where training suddenly speeds up or slows down. Watching for them is a standard debugging technique.',
    },
    {
      type: 'tip',
      content:
        'Next: the chain rule in depth. It is the algorithm that makes backprop — and every modern AI — computationally possible.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does the second derivative measure?',
      options: [
        'The value of the function.',
        'The slope of the tangent line.',
        'The rate of change of the slope — how the curve bends.',
        'The area under the curve.',
      ],
      correct: 2,
      explanation:
        'The first derivative measures the slope. The second derivative measures how that slope is changing — which is the curvature of the curve.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'If $f(x) = x^3$, what is $f\'\'(2)$?',
      correct: 12,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: '$f\'(x) = 3x^2$, then $f\'\'(x) = 6x$. Plug in x = 2.',
      explanation:
        '$f\'(x) = 3x^2$, $f\'\'(x) = 6x$. At x = 2: $f\'\'(2) = 12$.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'At a local **minimum** (valley) of a smooth function, which is true?',
      options: [
        '$f\' > 0$ and $f\'\' > 0$',
        '$f\' = 0$ and $f\'\' > 0$',
        '$f\' = 0$ and $f\'\' < 0$',
        '$f\' < 0$ and $f\'\' < 0$',
      ],
      correct: 1,
      explanation:
        'At a minimum, the slope is momentarily zero (flat tangent) and the curve is concave up (bending upward). So $f\' = 0$ and $f\'\' > 0$.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'A function is concave **down** on some interval. What does that mean about the curve there?',
      options: [
        'The curve is a straight line.',
        'The curve bends downward, like a frown.',
        'The slope is negative.',
        'The function is decreasing.',
      ],
      correct: 1,
      explanation:
        'Concave down means the curve bends downward — its second derivative is negative. Note this is independent of whether the function is increasing or decreasing; concavity is about the bend, not the value.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Where does the function $f(x) = x^2 - 4x + 5$ have its minimum, and what is $f\'\'$ there?',
      options: [
        'At x = 2, minimum, $f\'\' = 2$.',
        'At x = 0, minimum, $f\'\' = 2$.',
        'At x = 2, maximum, $f\'\' = -2$.',
        'No minimum exists.',
      ],
      correct: 0,
      explanation:
        '$f\'(x) = 2x - 4 = 0$ gives x = 2. $f\'\'(x) = 2 > 0$, so x = 2 is a minimum. This is the bottom of the parabola.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question: 'What is an inflection point?',
      options: [
        'Where the function equals zero.',
        'Where the first derivative equals zero.',
        'Where the second derivative changes sign — concavity switches.',
        'Where the function has a maximum.',
      ],
      correct: 2,
      explanation:
        'An inflection point is where the curve switches from concave up to concave down (or vice versa). At that exact point, $f\'\' = 0$.',
      xp: 20,
    },
  ],
};