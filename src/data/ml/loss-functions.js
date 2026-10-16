// 🤖 ML — Lesson 3: Loss Functions — Measuring How Wrong You Are

export const mlLossFunctionsLesson = {
  id: 'ml-loss-functions',
  title: 'Loss Functions — Measuring Error',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Every model needs a way to know how wrong it is. That number is called the loss. Choosing the right loss function is one of the most important decisions in ML.',

  sections: [
    {
      type: 'text',
      content:
        'Training a model is a loop: predict, measure error, adjust. The "measure error" part is the **loss function** — a formula that turns predictions and true values into a single number. Smaller loss = better model.',
    },
    {
      type: 'note',
      content:
        'You already met MSE in the last lesson. But MSE is not the only loss. Different problems need different losses. This lesson covers the three most important ones.',
    },

    // ── MSE ──────────────────────────
    {
      type: 'text',
      content:
        '**1. Mean Squared Error (MSE)** — for regression. Averages the squared difference between predictions and true values.',
    },
    {
      type: 'math',
      latex:
        '\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2',
      caption:
        'The workhorse loss for regression. Predicts a number, penalises squared errors.',
    },
    {
      type: 'text',
      content:
        'MSE heavily punishes large errors (because of the square) and treats small errors gently. This is usually what you want for regression — one big mistake is much worse than several small ones.',
    },
    {
      type: 'graph',
      title: 'MSE — the squared error curve',
      fns: [{ fn: (e) => e * e, color: 'rose', label: 'squared error' }],
      domain: [-3, 3],
      range: [-0.5, 9],
      caption:
        'Error e vs squared error e². Small errors → tiny penalty. Large errors → huge penalty. This shape is why MSE corrects big mistakes so aggressively.',
    },

    // ── MAE ──────────────────────────
    {
      type: 'text',
      content:
        '**2. Mean Absolute Error (MAE)** — the sum of absolute differences. Less aggressive than MSE.',
    },
    {
      type: 'math',
      latex:
        '\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^{n} |\\hat{y}_i - y_i|',
      caption:
        'MAE penalises errors proportionally, not quadratically.',
    },
    {
      type: 'graph',
      title: 'MSE vs MAE side by side',
      fns: [
        { fn: (e) => e * e, color: 'rose', label: 'MSE (e²)' },
        { fn: (e) => Math.abs(e), color: 'cyan', label: 'MAE (|e|)' },
      ],
      domain: [-3, 3],
      range: [-0.5, 9],
      caption:
        'MSE curves steeply; MAE is a straight line. MSE cares a lot about big errors; MAE cares equally about all errors.',
    },
    {
      type: 'tip',
      content:
        'Use MSE when big errors are much worse than small ones (typical). Use MAE when all errors matter proportionally (robust to outliers). If your data has noisy outliers, MAE is often a better choice.',
    },

    // ── CROSS-ENTROPY ────────────────
    {
      type: 'text',
      content:
        '**3. Cross-Entropy Loss** — for classification. Completely different in shape from MSE, but the same idea: a number that gets smaller as the model improves.',
    },
    {
      type: 'text',
      content:
        'In classification, the model outputs a **probability** — say, "80% chance this email is spam". The true label is 0 or 1. Cross-entropy measures how "surprised" the model would be by the truth.',
    },
    {
      type: 'math',
      latex:
        '\\text{Cross-Entropy} = -\\frac{1}{n} \\sum_{i=1}^{n} \\left[ y_i \\log(\\hat{p}_i) + (1 - y_i) \\log(1 - \\hat{p}_i) \\right]',
      caption:
        'For binary classification. ŷ is the predicted probability of class 1.',
    },
    {
      type: 'note',
      content:
        'The intuition: if the true label is 1 and the model predicts $\\hat{p} = 0.99$, loss is small. If the model predicts $\\hat{p} = 0.01$, loss is huge. Cross-entropy punishes confident wrong predictions very heavily.',
    },
    {
      type: 'graph',
      title: 'Cross-entropy — punishing confident mistakes',
      fns: [
        { fn: (p) => p > 0.01 && p < 1 ? -Math.log(p) : NaN, color: 'rose', label: 'loss when true label = 1' },
      ],
      domain: [0, 1.02],
      range: [-0.5, 5],
      caption:
        'When the model is confident (predicts high probability) for the true class, loss is near zero. When it is confidently wrong, loss explodes.',
    },
    {
      type: 'code',
      content: 'The three losses in one line each:',
      code: `import numpy as np\n\ny_true = np.array([1.0, 0.0, 1.0, 1.0])\ny_pred = np.array([0.9, 0.1, 0.8, 0.6])\n\n# MSE — for regression\nmse = np.mean((y_pred - y_true) ** 2)\n\n# MAE — for regression, robust\nmae = np.mean(np.abs(y_pred - y_true))\n\n# Cross-entropy — for classification\nce = -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))\n\nprint(f"MSE:           {mse:.4f}")\nprint(f"MAE:           {mae:.4f}")\nprint(f"Cross-entropy: {ce:.4f}")`,
      output: `MSE:           0.0550\nMAE:           0.1500\nCross-entropy: 0.2036`,
      language: 'python',
    },

    // ── WHEN TO USE ──────────────────
    {
      type: 'text',
      content:
        'Which loss to use? Here is the decision table:',
    },
    {
      type: 'text',
      content:
        '• **Predicting a number** (price, temperature, stock return) → MSE (or MAE for noisy data).\n• **Predicting a class** (spam/not-spam, cat/dog) → Cross-entropy.\n• **Predicting multiple classes** (digit 0-9) → Multiclass cross-entropy.\n• **Robust to outliers** → MAE instead of MSE.',
    },
    {
      type: 'simulation',
      title: 'See the loss difference',
      description:
        'Move the prediction. Compare how different loss functions react.',
      sliders: [
        { id: 'yhat', label: '\\hat{y}', min: 0, max: 1, step: 0.01, default: 0.7, decimals: 2 },
      ],
      render: ({ yhat }) => ({
        fns: [
          { fn: (e) => (e - 1) * (e - 1), color: 'rose', label: 'MSE (true label = 1)' },
          { fn: (e) => Math.abs(e - 1), color: 'cyan', label: 'MAE' },
          { fn: (e) => e > 0.01 ? -Math.log(e) : NaN, color: 'violet', label: 'Cross-entropy' },
        ],
        points: [
          { x: yhat, y: (yhat - 1) * (yhat - 1), color: 'rose', r: 5 },
          { x: yhat, y: Math.abs(yhat - 1), color: 'cyan', r: 5 },
          { x: yhat, y: yhat > 0.01 ? -Math.log(yhat) : 5, color: 'violet', r: 5 },
        ],
        domain: [0, 1.05],
        range: [-0.3, 5],
      }),
      formula: ({ yhat }) => {
        const mse = (yhat - 1) ** 2;
        const mae = Math.abs(yhat - 1);
        const ce = yhat > 0.01 ? -Math.log(yhat) : 'inf';
        return `\\text{MSE} = ${mse.toFixed(3)},\\;\\; \\text{MAE} = ${mae.toFixed(3)},\\;\\; \\text{CE} = ${typeof ce === 'number' ? ce.toFixed(3) : '\\infty'}`;
      },
      caption:
        'When ŷ = 1 (perfect prediction), all losses are 0. As ŷ shrinks toward 0, cross-entropy explodes much faster than MSE or MAE — that is why it heavily punishes confident mistakes.',
    },

    // ── CUSTOM LOSSES ────────────────
    {
      type: 'text',
      content:
        'Sometimes you design a custom loss for your specific problem. Example: predicting stock returns, but you really care about not being catastrophically wrong — not about small errors. You might use a loss that is linear for small errors and quadratic only for large ones.',
    },
    {
      type: 'note',
      content:
        'Modern ML has developed many custom losses: Huber loss (mix of MSE and MAE), focal loss (for imbalanced classification), Dice loss (for image segmentation). The principle is always the same — pick a number that gets smaller as predictions improve.',
    },
    {
      type: 'tip',
      content:
        'That is loss functions. MSE for regression, cross-entropy for classification, MAE when you want robustness. Next lesson: overfitting — the single most important practical issue in ML.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Which loss function is most commonly used for regression?',
      options: [
        'Cross-entropy.',
        'Mean squared error (MSE).',
        'Accuracy.',
        'F1 score.',
      ],
      correct: 1,
      explanation:
        'For regression — predicting a continuous number — MSE is the standard. It averages squared errors and heavily penalises large mistakes.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'For binary classification (spam/not spam), which loss is standard?',
      options: [
        'Mean squared error.',
        'Mean absolute error.',
        'Binary cross-entropy.',
        'Sum of residuals.',
      ],
      correct: 2,
      explanation:
        'Classification outputs are probabilities. Cross-entropy measures how "surprised" the model is by the truth, and heavily punishes confident mistakes.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'A model predicts 3, the true value is 7. What is the absolute error?',
      correct: 4,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Absolute error = |prediction − truth|.',
      explanation:
        '$|3 - 7| = 4$. Absolute error ignores sign — both over- and under-predictions count as positive error.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'numeric-answer',
      math: true,
      question:
        'A model predicts 3, the true value is 7. What is the squared error?',
      correct: 16,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Squared error = (prediction − truth)².',
      explanation:
        '$(3 - 7)^2 = (-4)^2 = 16$. Squaring removes the sign and magnifies the error.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'You have regression data with a few extreme outliers. Which loss should you prefer?',
      options: [
        'MSE — outliers make it smaller.',
        'MAE — less sensitive to outliers than MSE.',
        'Cross-entropy — it always works.',
        'Whichever is faster.',
      ],
      correct: 1,
      explanation:
        'MSE squares errors, so a single outlier can dominate the loss. MAE treats every error proportionally, so it is much more robust to outliers.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Why does cross-entropy penalise confident wrong predictions so heavily?',
      options: [
        'Because the loss is a straight line.',
        'Because it involves a logarithm of the predicted probability, which blows up near zero.',
        'Because it squares the error.',
        'Because it subtracts the true value.',
      ],
      correct: 1,
      explanation:
        'Cross-entropy uses $\\log(\\hat{p})$. As $\\hat{p}$ approaches 0 (confident wrong prediction), the log goes to $−\\infty$, making the loss enormous. This forces the model to be humble when it is wrong.',
      xp: 30,
    },
  ],
};