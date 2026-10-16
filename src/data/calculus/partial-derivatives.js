// 📈 Calculus — Lesson 9: Partial Derivatives — Many Variables at Once

export const calcPartialDerivativesLesson = {
  id: 'calc-partial-derivatives',
  title: 'Partial Derivatives — Many Variables at Once',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Real functions have many inputs. A neural network loss depends on millions of weights at once. Partial derivatives let us ask: how does the output change when I tweak just ONE input, holding all the others still?',

  sections: [
    {
      type: 'text',
      content:
        'Up to now, functions have had one input: $f(x)$. But reality is messier. A model\'s loss depends on every weight in the network — millions of numbers. A house price depends on size, location, age, and more. A function of many variables is written $f(x, y, z, \\ldots)$.',
    },
    {
      type: 'text',
      content:
        'So how do we do calculus when there is more than one input? The answer is beautiful and simple: **take the derivative with respect to one variable at a time, holding the rest constant.** That is a partial derivative.',
    },
    {
      type: 'math',
      latex:
        '\\frac{\\partial f}{\\partial x}',
      caption:
        'The partial derivative of f with respect to x. The curly ∂ ("partial") instead of straight d signals "many variables, only one is changing".',
    },
    {
      type: 'note',
      content:
        'The rule for computing partial derivatives: treat every OTHER variable as if it were a constant. Then just differentiate normally. The partial derivative tells you: if I nudge x slightly, and keep y and z frozen, how much does f change?',
    },
    {
      type: 'text',
      content:
        'Example: $f(x, y) = x^2 + 3xy + y^3$.',
    },
    {
      type: 'text',
      content:
        'For $\\partial f/\\partial x$: treat $y$ as a constant. So $3xy$ becomes $3y \\cdot x$ (a linear term in x), and $y^3$ is a constant (derivative zero). Result: $\\partial f/\\partial x = 2x + 3y$.',
    },
    {
      type: 'text',
      content:
        'For $\\partial f/\\partial y$: treat $x$ as a constant. So $x^2$ is constant (zero), $3xy$ becomes $3x \\cdot y$ (linear in y), $y^3$ differentiates to $3y^2$. Result: $\\partial f/\\partial y = 3x + 3y^2$.',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} f(x, y) &= x^2 + 3xy + y^3 \\\\[4pt] \\frac{\\partial f}{\\partial x} &= 2x + 3y \\\\[4pt] \\frac{\\partial f}{\\partial y} &= 3x + 3y^2 \\end{aligned}',
      caption:
        'Same function, two different partial derivatives. Each one isolates the effect of one variable.',
    },
    {
      type: 'tip',
      content:
        'The mnemonic is simple: whatever variable you are differentiating with respect to, treat everything else as a number. If it does not contain that variable at all, its derivative is zero.',
    },

    // ── GEOMETRIC MEANING ─────────────
    {
      type: 'text',
      content:
        'What does a partial derivative look like geometrically? Imagine a surface in 3D — a hilly landscape. The function $f(x, y)$ gives the height at each point $(x, y)$.',
    },
    {
      type: 'text',
      content:
        'The partial derivative $\\partial f / \\partial x$ tells you the **slope of the surface if you walk in the x-direction** (holding y fixed). It is the slope of a slice through the surface, cut along the x-axis.',
    },
    {
      type: 'simulation',
      title: 'Slices through a surface',
      description:
        'Change y and see the horizontal slice of the surface. The partial derivative with respect to x is the slope of this slice at your current position.',
      sliders: [
        { id: 'y0', label: 'y (fixed)', min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
        { id: 'x0', label: 'x (walk along)', min: -2, max: 2, step: 0.1, default: 0, decimals: 1 },
      ],
      render: ({ y0, x0 }) => {
        const f = (x) => x * x + 3 * x * y0 + y0 * y0 * y0;
        const slope = 2 * x0 + 3 * y0;
        return {
          fns: [
            { fn: f, color: 'cyan', label: `slice at y = ${y0}` },
            {
              fn: (x) => f(x0) + slope * (x - x0),
              color: 'brand',
              label: `tangent, slope = ${slope.toFixed(2)}`,
              dashed: true,
            },
          ],
          domain: [-3, 3],
          range: [-10, 15],
          points: [{ x: x0, y: f(x0), color: 'brand', r: 6 }],
        };
      },
      formula: ({ x0, y0 }) => {
        const slope = 2 * x0 + 3 * y0;
        return `\\frac{\\partial f}{\\partial x} = 2x + 3y = ${slope.toFixed(2)}`;
      },
      caption:
        'By fixing y and varying x, we reduce a 2D problem to a 1D one. The partial derivative is just the ordinary derivative of that slice.',
    },

    // ── HIGHER PARTIALS ───────────────
    {
      type: 'text',
      content:
        'You can take partial derivatives of partial derivatives. There are four second partials for a function of two variables: $\\partial^2 f/\\partial x^2$, $\\partial^2 f/\\partial y^2$, $\\partial^2 f/\\partial x \\partial y$, and $\\partial^2 f/\\partial y \\partial x$.',
    },
    {
      type: 'note',
      content:
        'Nice fact: for most smooth functions, the mixed partials are equal — $\\partial^2 f/\\partial x \\partial y = \\partial^2 f/\\partial y \\partial x$. You can compute them in either order and get the same answer. This is called Clairaut\'s theorem, and it saves a lot of calculation.',
    },
    {
      type: 'text',
      content:
        'For ML, the important thing is not the mixed partials but the **collection of all first partials**. That collection is called the **gradient**, and it is the topic of the next lesson.',
    },
    {
      type: 'note',
      content:
        'A network with a million weights has a million partial derivatives of the loss — one for each weight. Computing all of them might sound impossible, but backprop does it in a single pass. The chain rule applied to a million variables, all at once.',
    },
    {
      type: 'warning',
      content:
        'Remember: partial derivatives are NOT the full picture of how a function changes. They only capture one direction at a time. To know the slope of steepest ascent, you need the gradient — the vector of all partials together. That is the next lesson.',
    },
    {
      type: 'tip',
      content:
        'Next: the gradient — the vector that collects every partial derivative. It points uphill, and its negative points downhill. That is what makes gradient descent work.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'For $f(x, y) = x^2 y + y^2$, what is $\\partial f / \\partial x$?',
      options: ['$x^2 + 2y$', '$2xy$', '$2x + y$', '$x^2$'],
      correct: 1,
      explanation:
        'Hold y constant. Differentiate $x^2 y$ with respect to x: $2xy$. The term $y^2$ is constant (does not contain x), so its derivative is 0.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'For $f(x, y) = x^2 y + y^2$, what is $\\partial f / \\partial y$?',
      options: ['$x^2 + 2y$', '$2xy$', '$2x + 2y$', '$2y$'],
      correct: 0,
      explanation:
        'Hold x constant. Differentiate $x^2 y$ with respect to y: $x^2$. Differentiate $y^2$: $2y$. Result: $x^2 + 2y$.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'For $f(x, y) = 3x^2 + 2xy + y^2$, what is $\\partial f / \\partial x$ at $x = 1, y = 2$?',
      correct: 10,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'First find $\\partial f / \\partial x = 6x + 2y$. Then plug in.',
      explanation:
        '$\\partial f / \\partial x = 6x + 2y$. At (1, 2): $6(1) + 2(2) = 6 + 4 = 10$.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'How do you compute a partial derivative with respect to x?',
      options: [
        'Set x = 0 first.',
        'Treat every other variable as a constant, then differentiate normally with respect to x.',
        'Differentiate with respect to every variable and add.',
        'Divide the function by x.',
      ],
      correct: 1,
      explanation:
        'The rule for partial derivatives: hold all other variables fixed (treat them like constants), and differentiate with respect to the variable you want.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'numeric-answer',
      math: true,
      question:
        'For $f(x, y) = xy^2$, what is $\\partial f / \\partial y$ at $x = 3, y = 2$?',
      correct: 12,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Treat x as a constant. $\\partial f / \\partial y = 2xy$.',
      explanation:
        '$\\partial f / \\partial y = 2xy$. At (3, 2): $2 \\cdot 3 \\cdot 2 = 12$.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'A neural network has a million weights. How many partial derivatives does the loss have?',
      options: [
        'One — the loss is a single number.',
        'Ten — one per layer.',
        'A million — one per weight, forming the gradient.',
        'Zero — the loss is not differentiable.',
      ],
      correct: 2,
      explanation:
        'Each weight contributes one partial derivative of the loss. A million weights mean a million partials — that is the gradient vector. Backprop computes all of them in a single backward pass.',
      xp: 30,
    },
  ],
};