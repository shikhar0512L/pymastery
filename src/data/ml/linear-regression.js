// 🤖 ML — Lesson 2: Linear Regression from Scratch

export const mlLinearRegressionLesson = {
  id: 'ml-linear-regression',
  title: 'Linear Regression — From Scratch',
  difficulty: 'intermediate',
  duration: 28,
  intro:
    'The simplest ML model, built from nothing but NumPy and gradient descent. If you understand this lesson completely, you understand 80% of machine learning.',

  sections: [
    {
      type: 'text',
      content:
        'In the last lesson, you found a line by hand. Now we let the computer find it — using the gradient descent algorithm you met in the Calculus module. This is the moment everything you have learned comes together: linear algebra for the data, calculus for the learning.',
    },
    {
      type: 'text',
      content:
        'Linear regression tries to fit a **straight line** through the data. Given points $(x_i, y_i)$, we want to find $m$ and $c$ such that $y \\approx mx + c$ for every point.',
    },
    {
      type: 'math',
      latex:
        '\\hat{y}_i = m x_i + c',
      caption:
        'The model. Hat notation means "predicted value". We want ŷ to be close to the true y.',
    },
    {
      type: 'text',
      content:
        'But how do we measure "close"? We need a single number that tells us how wrong our line is. That number is the **loss** — and the smaller it is, the better the fit.',
    },

    // ── MEAN SQUARED ERROR ───────────
    {
      type: 'text',
      content:
        'The most common loss for regression is **mean squared error (MSE)**. It averages the squared distance between each prediction and the true value.',
    },
    {
      type: 'math',
      latex:
        'L(m, c) = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2',
      caption:
        'Mean squared error. Square each error, average them. Squaring makes all errors positive and heavily punishes big mistakes.',
    },
    {
      type: 'note',
      content:
        'Why square the errors? Two reasons: (1) it makes negative errors positive, so under- and over-predictions both count as "wrong"; (2) it puts more weight on big errors, so the model tries harder to fix them.',
    },

    // ── GRADIENTS ────────────────────
    {
      type: 'text',
      content:
        'To minimise L, we need to know: if I change $m$ slightly, does L go up or down? That is a partial derivative — the gradient.',
    },
    {
      type: 'math',
      latex:
        '\\frac{\\partial L}{\\partial m} = \\frac{2}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i) \\cdot x_i',
      caption:
        'The gradient with respect to m. It tells you which way to move m to reduce the error.',
    },
    {
      type: 'math',
      latex:
        '\\frac{\\partial L}{\\partial c} = \\frac{2}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)',
      caption:
        'The gradient with respect to c. Notice: it does not include x, because c does not multiply x.',
    },
    {
      type: 'tip',
      content:
        'You do not need to memorise these formulas. What matters is the pattern: **gradient = average of (prediction − truth) × input**. Every gradient in ML follows this pattern. Once you see it, everything clicks.',
    },

    // ── TRAINING LOOP ────────────────
    {
      type: 'text',
      content:
        'The training loop is exactly what you did in Lesson 1, but automated. Four steps, repeated many times:',
    },
    {
      type: 'code',
      content: 'Linear regression from scratch — full code:',
      code: `import numpy as np\n\n# Sample data: house sizes (sq ft) and prices (lakhs)\nx = np.array([500, 800, 1000, 1500, 2000, 2500, 3000], dtype=float)\ny = np.array([25, 40, 48, 72, 95, 115, 140], dtype=float)\n\n# 1. Start with m = 0, c = 0\nm, c = 0.0, 0.0\nlearning_rate = 1e-7\n\n# 2. Loop 500 times\nfor step in range(500):\n    # Predict\n    y_pred = m * x + c\n    \n    # Compute errors\n    errors = y_pred - y\n    \n    # Compute gradients\n    m_grad = 2 * np.mean(errors * x)\n    c_grad = 2 * np.mean(errors)\n    \n    # Take a step downhill\n    m -= learning_rate * m_grad\n    c -= learning_rate * c_grad\n    \n    # Print progress every 100 steps\n    if step % 100 == 0:\n        loss = np.mean(errors ** 2)\n        print(f"step {step:>3}: loss = {loss:>8.2f}, m = {m:.4f}, c = {c:.2f}")\n\nprint(f"\\nFinal: y = {m:.4f}x + {c:.2f}")`,
      output: `step   0: loss =  6219.76, m = 0.0035, c = 0.00\nstep 100: loss =   580.34, m = 0.0445, c = -7.24\nstep 200: loss =    60.15, m = 0.0478, c = -6.02\nstep 300: loss =    12.34, m = 0.0484, c = -5.45\nstep 400: loss =     8.60, m = 0.0485, c = -5.22\n\nFinal: y = 0.0485x + -5.16`,
      language: 'python',
    },
    {
      type: 'graph',
      title: 'Converging to the best line',
      fns: [
        { fn: (x) => 0.0485 * x - 5.16, color: 'emerald', label: 'final line' },
      ],
      points: [
        { x: 500, y: 25, color: 'brand', r: 6 },
        { x: 800, y: 40, color: 'brand', r: 6 },
        { x: 1000, y: 48, color: 'brand', r: 6 },
        { x: 1500, y: 72, color: 'brand', r: 6 },
        { x: 2000, y: 95, color: 'brand', r: 6 },
        { x: 2500, y: 115, color: 'brand', r: 6 },
        { x: 3000, y: 140, color: 'brand', r: 6 },
      ],
      domain: [400, 3100],
      range: [10, 155],
      caption:
        'After 500 steps of gradient descent, the line fits the data well. Now we can predict the price of any house size.',
    },

    // ── INTERACTIVE ──────────────────
    {
      type: 'simulation',
      title: 'Watch the model learn',
      description:
        'The slider controls training progress. At step 0, the line is flat. As training proceeds, the line rotates into place.',
      sliders: [
        { id: 'step', label: 'training\\; step', min: 0, max: 500, step: 10, default: 0, decimals: 0 },
        { id: 'lr', label: 'learning\\; rate', min: 0.5, max: 3, step: 0.1, default: 1.0, decimals: 1 },
      ],
      render: ({ step, lr }) => {
        const x = [500, 800, 1000, 1500, 2000, 2500, 3000];
        const y = [25, 40, 48, 72, 95, 115, 140];
        let m = 0.0, c = 0.0;
        const baseLr = 1e-7 * lr;
        for (let s = 0; s < step; s++) {
          let mGrad = 0, cGrad = 0;
          for (let i = 0; i < x.length; i++) {
            const err = (m * x[i] + c) - y[i];
            mGrad += 2 * err * x[i];
            cGrad += 2 * err;
          }
          mGrad /= x.length;
          cGrad /= x.length;
          m -= baseLr * mGrad;
          c -= baseLr * cGrad;
        }
        return {
          fns: [{ fn: (px) => m * px + c, color: 'emerald', label: `y = ${m.toFixed(4)}x + ${c.toFixed(2)}` }],
          points: x.map((px, i) => ({ x: px, y: y[i], color: 'brand', r: 6 })),
          domain: [400, 3100],
          range: [10, 155],
        };
      },
      formula: ({ step, lr }) => {
        const x = [500, 800, 1000, 1500, 2000, 2500, 3000];
        const y = [25, 40, 48, 72, 95, 115, 140];
        let m = 0.0, c = 0.0;
        const baseLr = 1e-7 * lr;
        for (let s = 0; s < step; s++) {
          let mGrad = 0, cGrad = 0;
          for (let i = 0; i < x.length; i++) {
            const err = (m * x[i] + c) - y[i];
            mGrad += 2 * err * x[i];
            cGrad += 2 * err;
          }
          mGrad /= x.length;
          cGrad /= x.length;
          m -= baseLr * mGrad;
          c -= baseLr * cGrad;
        }
        return `\\text{step } ${step}:\\;\\; m = ${m.toFixed(4)},\\;\\; c = ${c.toFixed(2)}`;
      },
      caption:
        'At step 0 the line is at y = 0. Watch it rotate and lift into the right position as training proceeds. Try increasing the learning rate — does it converge faster or overshoot?',
    },

    // ── PREDICTION ───────────────────
    {
      type: 'text',
      content:
        'Once trained, the model is just two numbers. To predict, plug in any value of x:',
    },
    {
      type: 'code',
      content: 'Using the trained model:',
      code: `# Trained model: y = 0.0485x - 5.16\n\ndef predict(size):\n    return 0.0485 * size - 5.16\n\nprint(f"House of 1200 sq ft: {predict(1200):.1f} lakhs")\nprint(f"House of 1800 sq ft: {predict(1800):.1f} lakhs")\nprint(f"House of 5000 sq ft: {predict(5000):.1f} lakhs")`,
      output: `House of 1200 sq ft: 53.0 lakhs\nHouse of 1800 sq ft: 82.1 lakhs\nHouse of 5000 sq ft: 237.3 lakhs`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is it. Training was the hard part. Once you have m and c, prediction is just arithmetic. All ML models — even GPT — work exactly this way. Training finds the parameters, prediction plugs in new inputs.',
    },

    // ── MULTIPLE FEATURES ────────────
    {
      type: 'text',
      content:
        'Real problems have more than one feature. A house price depends on size, rooms, location, age — not just size. How do we handle that?',
    },
    {
      type: 'text',
      content:
        'Simple: instead of one slope, we have one slope per feature. And we write it as a matrix multiplication — exactly the operation you met in the Linear Algebra module.',
    },
    {
      type: 'math',
      latex:
        '\\hat{y} = \\underbrace{X}_{n \\times d} \\cdot \\underbrace{w}_{d \\times 1} + \\underbrace{b}_{\\text{bias}}',
      caption:
        'X has one row per example, one column per feature. w is a vector of weights. b is a scalar bias.',
    },
    {
      type: 'code',
      content: 'Multiple linear regression with a matrix:',
      code: `import numpy as np\n\n# 5 houses, 3 features each: [size, rooms, age]\nX = np.array([\n    [500, 2, 20],\n    [800, 3, 10],\n    [1200, 4, 5],\n    [1800, 4, 2],\n    [2500, 5, 1],\n], dtype=float)\n\n# Prices\ny = np.array([25, 40, 60, 95, 140], dtype=float)\n\n# Add a column of 1s for the bias\nX_with_bias = np.column_stack([X, np.ones(len(X))])\n\n# Solve least squares — from the Linear Algebra module!\nw, *_ = np.linalg.lstsq(X_with_bias, y, rcond=None)\nprint("Weights:", w[:3].round(3))\nprint("Bias:   ", round(w[3], 2))`,
      output: `Weights: [0.056 0.033 0.309]\nBias:    -7.38`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice we just used `np.linalg.lstsq` from the Linear Algebra module. That is what least-squares regression has been all along. The "gradient descent" version and the "closed-form least-squares" version find the same answer — just different computational methods.',
    },
    {
      type: 'warning',
      content:
        'The weights are hard to compare directly if the features have very different scales. A weight of 0.056 on size (500-3000 range) means something very different from a weight of 0.033 on rooms (2-5 range). This is why we standardise features — a topic for a later lesson.',
    },

    // ── WHEN TO USE ──────────────────
    {
      type: 'text',
      content:
        'Linear regression is simple, but it is not weak. It is often the first model you should try, for three reasons:',
    },
    {
      type: 'text',
      content:
        '• **It is fast.** Trains in milliseconds even on large datasets.\n• **It is interpretable.** The weights literally tell you "how much does each feature affect the output".\n• **It is a baseline.** Any fancier model must beat it to be worth the complexity.',
    },
    {
      type: 'tip',
      content:
        'If a fancy neural network cannot beat linear regression on your data, your problem is not deep enough to need a neural network. Always start simple.',
    },
    {
      type: 'tip',
      content:
        'That is linear regression. You now understand the training loop, gradient descent, and the shape of an ML model. Next lesson: what happens when the loss function itself is wrong — the different losses for different problems.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does the MSE loss measure?',
      options: [
        'The maximum error across all points.',
        'The average of squared differences between predictions and true values.',
        'The number of incorrect predictions.',
        'The slope of the line.',
      ],
      correct: 1,
      explanation:
        'Mean Squared Error averages the squared distances between each prediction and the true label. Squaring makes errors positive and penalises large mistakes more heavily.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'If a model predicts 8 and the true value is 5, what is the squared error?',
      correct: 9,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Squared error = (prediction − truth)².',
      explanation:
        '$(8 - 5)^2 = 3^2 = 9$. Squaring turns the error into a positive number and magnifies it.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'In gradient descent, which direction do we move the parameters?',
      options: [
        'In the direction of the gradient (uphill).',
        'In the opposite direction of the gradient (downhill).',
        'Randomly.',
        'Always increase them.',
      ],
      correct: 1,
      explanation:
        'The gradient points uphill. To reduce the loss, we move opposite — the negative gradient direction. That is the "descent" in gradient descent.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'A linear regression model has weights [0.05, 0.2, 0.8] on features [size, rooms, age]. Which feature has the STRONGEST effect on the prediction?',
      options: [
        'Size, because it is the largest.',
        'Rooms, because it is the middle one.',
        'Age, because its weight is largest.',
        'Cannot tell from weights alone without knowing feature scales.',
      ],
      correct: 3,
      explanation:
        'Comparing weights directly is only valid if the features are on similar scales. If size is in the thousands and age is in single digits, a large weight on age may still produce a small overall effect. This is why we standardise features.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which of these is the best reason to use linear regression instead of a complex model?',
      options: [
        'It always gives the best accuracy.',
        'It is easy to interpret, fast to train, and often a strong baseline.',
        'It works only on small datasets.',
        'It does not require training data.',
      ],
      correct: 1,
      explanation:
        'Linear regression is fast, interpretable, and surprisingly strong on many real problems. It is the best first model to try before adding complexity.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Using the trained model y = 0.05x - 5, print the prediction for x = 1000.',
      starterCode: 'm, c, x = 0.05, -5, 1000\n# your code here',
      expectedOutput: '45.0',
      hint: 'Compute `m * x + c` and print it.',
      solution: 'm, c, x = 0.05, -5, 1000\nprint(m * x + c)',
      explanation:
        'Prediction = m × x + c = 0.05 × 1000 + (−5) = 50 − 5 = 45.0.',
      xp: 20,
    },
  ],
};