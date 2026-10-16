// 📈 Calculus — Lesson 6: Common Derivatives — The Reference Table

export const calcCommonDerivativesLesson = {
  id: 'calc-common-derivatives',
  title: 'Common Derivatives — The Reference Table',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Six rules plus a small table — that is all you need. This lesson fills in the table with the derivatives that appear constantly in machine learning: exponentials, logarithms, sines, cosines.',

  sections: [
    {
      type: 'text',
      content:
        'The derivative rules (power, sum, product, chain) let you differentiate combinations. But you still need to know the derivatives of the basic building blocks. That is what this lesson is — a **reference table** you will come back to again and again.',
    },

    // ── POLYNOMIALS ─────────────────
    {
      type: 'text',
      content:
        'You already know the **power rule**: $\\frac{d}{dx}[x^n] = n x^{n-1}$. This covers all polynomials.',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} x^1 &\\to 1 \\\\ x^2 &\\to 2x \\\\ x^3 &\\to 3x^2 \\\\ x^{10} &\\to 10 x^9 \\\\ \\sqrt{x} &\\to \\tfrac{1}{2\\sqrt{x}} \\\\ \\tfrac{1}{x} &\\to -\\tfrac{1}{x^2} \\end{aligned}',
      caption:
        'Every polynomial and power function is covered by the same rule.',
    },

    // ── EXPONENTIAL ─────────────────
    {
      type: 'text',
      content:
        'The **exponential function** $e^x$ is special. It is its own derivative.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[e^x] = e^x',
      caption:
        'The exponential function is the only function (up to a constant) whose derivative equals itself.',
    },
    {
      type: 'graph',
      title: 'eˣ and its derivative — the same curve',
      fns: [
        { fn: (x) => Math.exp(x), color: 'cyan', label: 'f(x) = eˣ' },
        { fn: (x) => Math.exp(x), color: 'rose', label: "f'(x) = eˣ", dashed: true },
      ],
      domain: [-3, 2.5],
      range: [-1, 13],
      caption:
        'The cyan and rose curves are literally the same. The exponential is the derivative of itself — a mathematical curiosity with enormous practical importance.',
    },
    {
      type: 'tip',
      content:
        'Why is this so useful? Because if you are trying to find a function whose derivative behaves a certain way, eˣ is often the answer. This is why the exponential appears in: softmax, sigmoid, Poisson distributions, compound interest, and the solutions to almost every differential equation.',
    },

    // ── LOGARITHM ──────────────────
    {
      type: 'text',
      content:
        'The **natural logarithm** $\\ln(x)$ has a beautifully simple derivative.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}',
      caption:
        'The derivative of ln(x) is 1/x. Steep near zero, flat for large x.',
    },
    {
      type: 'graph',
      title: 'ln(x) and its derivative',
      fns: [
        { fn: (x) => (x > 0 ? Math.log(x) : NaN), color: 'violet', label: 'f(x) = ln(x)' },
        { fn: (x) => (x > 0 ? 1 / x : NaN), color: 'rose', label: "f'(x) = 1/x" },
      ],
      domain: [0.1, 6],
      range: [-2, 3],
      caption:
        'As x grows, ln(x) flattens out — and its derivative 1/x shrinks toward zero. Slow and steady growth.',
    },
    {
      type: 'note',
      content:
        'Logarithms convert multiplication to addition — that is why they show up in loss functions (log-likelihood) and information theory (entropy). Their simple derivative $1/x$ is what makes backprop through log-based losses so clean.',
    },

    // ── TRIG ───────────────────────
    {
      type: 'text',
      content:
        'The trig functions have a beautiful symmetric pattern.',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} \\frac{d}{dx}[\\sin(x)] &= \\cos(x) \\\\ \\frac{d}{dx}[\\cos(x)] &= -\\sin(x) \\end{aligned}',
      caption:
        'Sine goes to cosine; cosine goes to negative sine. A cycle that repeats every four derivatives.',
    },
    {
      type: 'graph',
      title: 'sin(x) and cos(x) — the wave pair',
      fns: [
        { fn: (x) => Math.sin(x), color: 'cyan', label: 'sin(x)' },
        { fn: (x) => Math.cos(x), color: 'rose', label: 'cos(x) = derivative of sin' },
      ],
      domain: [-2 * Math.PI, 2 * Math.PI],
      range: [-1.5, 1.5],
      caption:
        'The derivative of sine is cosine — the same wave, shifted a quarter cycle left. And the derivative of cosine is negative sine.',
    },
    {
      type: 'tip',
      content:
        'Trig derivatives matter for signal processing, time series, and anything involving periodic behaviour. They also appear in positional encodings for transformers — where sin and cos encode the position of each token in a sequence.',
    },

    // ── FULL TABLE ──────────────────
    {
      type: 'text',
      content:
        'Here is the full reference table. Memorise the pattern, not the symbols:',
    },
    {
      type: 'math',
      latex:
        '\\begin{array}{c|c} f(x) & f\'(x) \\\\ \\hline x^n & n x^{n-1} \\\\ e^x & e^x \\\\ e^{kx} & k e^{kx} \\\\ \\ln(x) & \\tfrac{1}{x} \\\\ \\sin(x) & \\cos(x) \\\\ \\cos(x) & -\\sin(x) \\\\ \\tan(x) & \\sec^2(x) \\end{array}',
      caption:
        'The reference table. Most of what you need in practice is here, plus the rules from the previous lesson.',
    },

    // ── COMPOSITES ─────────────────
    {
      type: 'text',
      content:
        'With the chain rule, this table extends to compositions. Some important composites you will meet in ML:',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} \\frac{d}{dx}[e^{kx}] &= k e^{kx} \\\\ \\frac{d}{dx}[\\ln(kx)] &= \\frac{1}{x} \\\\ \\frac{d}{dx}[\\sin(kx)] &= k\\cos(kx) \\end{aligned}',
      caption:
        'The constant k pulls out front. This is the chain rule doing its job on the inner linear function.',
    },

    // ── SIGMOID & SOFTMAX ────────────
    {
      type: 'text',
      content:
        'Two ML-specific derivatives that are worth knowing explicitly:',
    },
    {
      type: 'math',
      latex:
        '\\sigma(x) = \\frac{1}{1 + e^{-x}} \\quad \\Rightarrow \\quad \\sigma\'(x) = \\sigma(x)(1 - \\sigma(x))',
      caption:
        'The sigmoid. Its derivative is expressible in terms of itself — a mathematical gift that makes backprop elegant.',
    },
    {
      type: 'graph',
      title: 'Sigmoid and its derivative',
      fns: [
        {
          fn: (x) => 1 / (1 + Math.exp(-x)),
          color: 'cyan',
          label: 'σ(x) = 1/(1+e⁻ˣ)',
        },
        {
          fn: (x) => {
            const s = 1 / (1 + Math.exp(-x));
            return s * (1 - s);
          },
          color: 'rose',
          label: "σ'(x) = σ(x)(1 − σ(x))",
        },
      ],
      domain: [-6, 6],
      range: [-0.2, 1.2],
      caption:
        'Sigmoid is the classic "S" shape. Its derivative is a bell shape — largest in the middle, tiny at the extremes. This is why sigmoid networks have a "vanishing gradient" problem for very large or very small inputs.',
    },
    {
      type: 'note',
      content:
        'Sigmoid was the default activation in early neural networks. It is still used as the final layer of binary classifiers. The fact that its derivative is expressible in terms of σ(x) itself is why backprop through a sigmoid is so cheap.',
    },
    {
      type: 'tip',
      content:
        'Softmax (for multi-class classification) is a generalisation. Its derivative is more complex — it involves the whole vector of outputs — but it follows the same principle: express the derivative in terms of the output itself, so backprop can reuse the forward pass.',
    },

    // ── WORKING EXAMPLE ─────────────
    {
      type: 'text',
      content:
        'Let us put everything together on one example. Compute the derivative of $f(x) = e^{2x} \\cdot \\sin(x)$.',
    },
    {
      type: 'text',
      content:
        'This is a product of two functions: $u = e^{2x}$ and $v = \\sin(x)$. Use the product rule:',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} u &= e^{2x} &\\Rightarrow\\quad u\' &= 2e^{2x} \\\\ v &= \\sin(x) &\\Rightarrow\\quad v\' &= \\cos(x) \\end{aligned}',
      caption:
        'First find each factor and its derivative. Note the chain rule: $e^{2x}$ differentiates to $2e^{2x}$.',
    },
    {
      type: 'math',
      latex:
        'f\'(x) = u\'v + uv\' = 2e^{2x}\\sin(x) + e^{2x}\\cos(x)',
      caption:
        'Result: the product rule applied to the two parts. This is the kind of computation backpropagation does millions of times per second.',
    },
    {
      type: 'note',
      content:
        'In practice, you will rarely compute these by hand. NumPy, PyTorch, and TensorFlow do it automatically. But knowing the rules gives you the mental model — you can look at a loss function and estimate how the gradient will behave, which is critical for debugging training.',
    },

    // ── WHY THE TABLE MATTERS ────────
    {
      type: 'text',
      content:
        'Why does this table matter for AI?',
    },
    {
      type: 'text',
      content:
        'Because every activation function, every loss function, and every layer in a neural network uses one of these derivatives during training. Sigmoid, softmax, cross-entropy loss, tanh, ReLU — all of them sit on this small table of building blocks.',
    },
    {
      type: 'text',
      content:
        'If you ever see a training curve that plateaus or diverges, it is usually because one of these derivatives is too small (vanishing gradient) or too large (exploding gradient). Knowing the shapes of these functions — and their derivatives — is how you diagnose the problem.',
    },
    {
      type: 'tip',
      content:
        'That is Phase D of calculus. You now know what a derivative is, how to compute them, and where they show up in ML. Next phase: gradients — derivatives in many dimensions at once — and how they drive gradient descent.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the derivative of $e^x$?',
      options: ['$x e^{x-1}$', '$e^x$', '$\\ln(x)$', '$1/e^x$'],
      correct: 1,
      explanation:
        'The exponential function is its own derivative. $\\frac{d}{dx}[e^x] = e^x$. This is what makes it so special.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What is the derivative of $\\ln(x)$?',
      options: ['$\\ln(x)$', '$e^x$', '$\\frac{1}{x}$', '$x$'],
      correct: 2,
      explanation:
        '$\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}$. The natural log and 1/x are a classic derivative pair.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'What is the derivative of $\\cos(x)$?',
      options: ['$\\sin(x)$', '$-\\sin(x)$', '$\\cos(x)$', '$-\\cos(x)$'],
      correct: 1,
      explanation:
        'The derivative of cosine is negative sine. Sine and cosine cycle: sin → cos → −sin → −cos → sin.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'What is the derivative of $e^{3x}$?',
      options: ['$e^{3x}$', '$3e^{3x}$', '$e^{3}$', '$3x e^{3x}$'],
      correct: 1,
      explanation:
        'Chain rule: outer derivative is $e^{3x}$, inner derivative is 3. Multiply: $3e^{3x}$.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'What is the derivative of the sigmoid function $\\sigma(x) = \\frac{1}{1+e^{-x}}$?',
      options: [
        '$\\sigma(x)$',
        '$1 - \\sigma(x)$',
        '$\\sigma(x)(1 - \\sigma(x))$',
        '$-\\sigma(x)$',
      ],
      correct: 2,
      explanation:
        'The sigmoid derivative is $\\sigma\'(x) = \\sigma(x)(1 - \\sigma(x))$. It is expressed in terms of the sigmoid itself — which is why backprop through a sigmoid is cheap.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'If $f(x) = x^3 + e^x$, what is $f\'(x)$?',
      options: [
        '$3x^2 + e^x$',
        '$3x^2 \\cdot e^x$',
        '$x^2 + e^x$',
        '$3x^2 - e^x$',
      ],
      correct: 0,
      explanation:
        'Sum rule: differentiate each term separately. $\\frac{d}{dx}[x^3] = 3x^2$, $\\frac{d}{dx}[e^x] = e^x$. Result: $3x^2 + e^x$.',
      xp: 20,
    },
  ],
};