// 📈 Calculus — Lesson 5: Derivative Rules — The Shortcuts

export const calcDerivativeRulesLesson = {
  id: 'calc-derivative-rules',
  title: 'Derivative Rules — The Shortcuts',
  difficulty: 'intermediate',
  duration: 28,
  intro:
    'Doing the limit every time is brutal. Fortunately, calculus has a small set of rules that let you differentiate almost anything in seconds. This is the toolbox every ML engineer uses.',

  sections: [
    {
      type: 'text',
      content:
        'In the previous lesson you computed the derivative of $x^2$ from the definition — expand, cancel, factor, take limit. It worked, but imagine doing that for $x^{10}$ or $\\sin(x)$. There must be a better way.',
    },
    {
      type: 'text',
      content:
        'There is. A handful of **rules**, each proven once from the definition, that let you differentiate without limits. Learn these and you can compute derivatives of almost any function you will meet in ML.',
    },

    // ── RULE 1: CONSTANT ─────────────
    {
      type: 'text',
      content:
        '**Rule 1: The constant rule.** The derivative of a constant is zero.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[c] = 0',
      caption:
        'A constant does not change. Its rate of change is zero.',
    },
    {
      type: 'text',
      content:
        'Makes sense — if $f(x) = 5$, then no matter how x changes, f always equals 5. Slope is zero everywhere.',
    },

    // ── RULE 2: POWER ────────────────
    {
      type: 'text',
      content:
        '**Rule 2: The power rule.** The workhorse of all differentiation.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[x^n] = n \\cdot x^{n-1}',
      caption:
        'Bring the exponent down, then subtract one from it. That is the whole rule.',
    },
    {
      type: 'text',
      content:
        'Examples: the derivative of $x^2$ is $2x$ (as we already found). The derivative of $x^3$ is $3x^2$. The derivative of $x^{10}$ is $10x^9$. Even $\\sqrt{x} = x^{1/2}$ has derivative $\\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$.',
    },
    {
      type: 'graph',
      title: 'x³ and its derivative 3x²',
      fns: [
        { fn: (x) => x * x * x, color: 'cyan', label: 'f(x) = x³' },
        { fn: (x) => 3 * x * x, color: 'rose', label: "f'(x) = 3x²" },
      ],
      domain: [-2.5, 2.5],
      range: [-8, 12],
      caption:
        'The rose curve shows the slope of the cyan curve. Both are upward-facing curves, but the derivative is flatter near 0 — the cubic flattens out there too.',
    },
    {
      type: 'tip',
      content:
        'The power rule works for ANY real exponent — positive, negative, fractions. $x^{-2}$ differentiates to $-2x^{-3}$. $x^{1/3}$ differentiates to $\\frac{1}{3}x^{-2/3}$. One rule, infinite reach.',
    },

    // ── RULE 3: SUM ──────────────────
    {
      type: 'text',
      content:
        '**Rule 3: The sum rule.** The derivative of a sum is the sum of derivatives.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[f(x) + g(x)] = f\'(x) + g\'(x)',
      caption:
        'Differentiate each term separately, then add. The sum rule makes long polynomials easy.',
    },
    {
      type: 'text',
      content:
        'So the derivative of $x^3 + 5x^2 - 3x + 7$ is $3x^2 + 10x - 3 + 0 = 3x^2 + 10x - 3$. We just apply the power rule to each term.',
    },
    {
      type: 'simulation',
      title: 'Polynomial and its derivative',
      description:
        'Change the coefficients and see how the derivative curve changes. Notice that the derivative is a lower-degree polynomial.',
      sliders: [
        { id: 'a', label: 'a', min: -2, max: 2, step: 0.5, default: 1, decimals: 1 },
        { id: 'b', label: 'b', min: -3, max: 3, step: 0.5, default: -2, decimals: 1 },
        { id: 'c', label: 'c', min: -3, max: 3, step: 0.5, default: 1, decimals: 1 },
      ],
      render: ({ a, b, c }) => ({
        fns: [
          { fn: (x) => a * x * x + b * x + c, color: 'cyan', label: `f(x) = ${a}x² + ${b}x + ${c}` },
          { fn: (x) => 2 * a * x + b, color: 'rose', label: `f'(x) = ${2 * a}x + ${b}` },
        ],
        domain: [-4, 4],
        range: [-8, 8],
      }),
      formula: ({ a, b }) => `f'(x) = ${2 * a}x + ${b}`,
      caption:
        'The derivative of a quadratic is always a line. Where the parabola has zero slope, the line crosses zero. That is the link between the two curves.',
    },

    // ── RULE 4: PRODUCT ──────────────
    {
      type: 'text',
      content:
        '**Rule 4: The product rule.** For two functions multiplied together, it is not just the product of derivatives. It has a special formula.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[f \\cdot g] = f\' \\cdot g + f \\cdot g\'',
      caption:
        'Derivative of the first times the second, plus the first times derivative of the second.',
    },
    {
      type: 'text',
      content:
        'Why does this formula look like that? The intuition: when you perturb x, both f and g change. The total change is the sum of two effects — the change in f (holding g fixed) plus the change in g (holding f fixed). Each effect is one term of the rule.',
    },
    {
      type: 'tip',
      content:
        'The product rule appears constantly in ML. The loss is often a product of a probability and a likelihood. Neural network layers multiply matrices and apply functions. Every time two things are multiplied together, the product rule shows up in the gradient.',
    },

    // ── RULE 5: CHAIN ────────────────
    {
      type: 'text',
      content:
        '**Rule 5: The chain rule.** The single most important rule for deep learning.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      caption:
        'Derivative of the outer function (evaluated at the inner) times derivative of the inner function.',
    },
    {
      type: 'text',
      content:
        'In words: **outer derivative × inner derivative**. If a small change in x causes a small change in g, which causes a small change in f, the two changes multiply.',
    },
    {
      type: 'text',
      content:
        'Example: differentiate $\\sin(x^2)$. The outer function is $\\sin$, whose derivative is $\\cos$. The inner function is $x^2$, whose derivative is $2x$. So the derivative is $\\cos(x^2) \\cdot 2x$.',
    },
    {
      type: 'graph',
      title: 'Chain rule in action: sin(x²)',
      fns: [
        { fn: (x) => Math.sin(x * x), color: 'cyan', label: 'f(x) = sin(x²)' },
        { fn: (x) => Math.cos(x * x) * 2 * x, color: 'rose', label: "f'(x) = 2x · cos(x²)" },
      ],
      domain: [-3, 3],
      range: [-3, 3],
      caption:
        'The original function oscillates faster as x grows — because the inner x² moves faster. The derivative captures this by including the 2x factor.',
    },
    {
      type: 'note',
      content:
        'The chain rule is literally the algorithm behind backpropagation. Every layer in a neural network is a composition of functions. To compute the gradient of the loss with respect to the earliest weights, you apply the chain rule repeatedly — multiplying derivatives layer by layer, back through the network. That is exactly what "backprop" means.',
    },

    // ── RULE 6: QUOTIENT (light) ─────
    {
      type: 'text',
      content:
        '**Rule 6: The quotient rule.** For dividing one function by another.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}\\!\\left[\\frac{f}{g}\\right] = \\frac{f\' \\cdot g - f \\cdot g\'}{g^2}',
      caption:
        'Low d-high minus high d-low, all over low squared. Or just remember: numerator times denominator derivative, subtracted, divided by denominator squared.',
    },
    {
      type: 'text',
      content:
        'You will use this occasionally — mostly when dividing by a polynomial. The chain rule is what dominates ML, so this one is more of a "good to know".',
    },

    // ── SUMMARY TABLE ─────────────────
    {
      type: 'text',
      content:
        'Here is the full toolbox. Learn these six and you can differentiate almost anything:',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} &(c)\' = 0 \\\\ &(x^n)\' = n x^{n-1} \\\\ &(f + g)\' = f\' + g\' \\\\ &(f \\cdot g)\' = f\' g + f g\' \\\\ &(f(g(x)))\' = f\'(g(x)) \\cdot g\'(x) \\\\ &\\left(\\tfrac{f}{g}\\right)\' = \\frac{f\' g - f g\'}{g^2} \\end{aligned}',
      caption:
        'The six core derivative rules. With these and a small table of common derivatives (next lesson), you can differentiate almost any function.',
    },
    {
      type: 'tip',
      content:
        'That is Lesson 5. You now have the machinery to compute derivatives by hand. Next: a small table of the most common derivatives — the ones you will see every day in ML papers.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the derivative of $x^5$?',
      options: ['$5x^4$', '$5x^5$', '$x^4$', '$4x^5$'],
      correct: 0,
      explanation:
        'Power rule: $\\frac{d}{dx}[x^5] = 5x^{5-1} = 5x^4$. Bring down the exponent, subtract one.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'If $f(x) = 7x^3 + 2x$, what is $f\'(2)$?',
      correct: 86,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'First find $f\'(x)$ using the sum and power rules, then plug in x = 2.',
      explanation:
        '$f\'(x) = 21x^2 + 2$. At $x = 2$: $21 \\cdot 4 + 2 = 84 + 2 = 86$.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'What is the derivative of the constant function $f(x) = 42$?',
      options: ['$42$', '$42x$', '$0$', '$1$'],
      correct: 2,
      explanation:
        'The derivative of any constant is zero. A constant does not change, so its rate of change is zero everywhere.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'What is the derivative of $\\sin(x^2)$?',
      options: [
        '$\\cos(x^2)$',
        '$2x \\cos(x^2)$',
        '$-\\cos(x^2)$',
        '$\\sin(2x)$',
      ],
      correct: 1,
      explanation:
        'Chain rule. Outer derivative: $\\cos(x^2)$. Inner derivative: $2x$. Multiply: $2x \\cos(x^2)$.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Why is the chain rule so important for neural networks?',
      options: [
        'Because it makes multiplication faster.',
        'Because neural networks are compositions of functions — the chain rule lets you compute gradients through every layer.',
        'Because it works only for small numbers.',
        'Because it replaces the power rule.',
      ],
      correct: 1,
      explanation:
        'Each neural network layer is a function. A deep network is a composition — function applied to function applied to function. The chain rule is what makes it possible to compute the gradient of the loss with respect to weights in the earliest layers. This is backpropagation.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'numeric-answer',
      math: true,
      question:
        'If $f(x) = x^2 \\cdot x^3$, what is $f\'(1)$? (Hint: simplify first — $x^2 \\cdot x^3 = x^5$.)',
      correct: 5,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Use the power rule on the simplified $x^5$.',
      explanation:
        '$f(x) = x^5$, so $f\'(x) = 5x^4$. At $x = 1$: $5 \\cdot 1 = 5$. (You could also use the product rule and get the same answer — worth trying.)',
      xp: 25,
    },
  ],
};