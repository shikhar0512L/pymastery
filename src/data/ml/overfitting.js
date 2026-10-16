// 🤖 ML — Lesson 4: Train/Test Split & Overfitting

export const mlOverfittingLesson = {
  id: 'ml-overfitting',
  title: 'Overfitting — The Enemy of Generalisation',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'The most important practical concept in all of ML. A model that fits the training data perfectly may be the worst possible model for real data. This lesson shows you exactly why — and how to avoid it.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine a student who memorises every past exam question and answer. They ace every practice test. Then the real exam comes, with new questions. They fail.',
    },
    {
      type: 'text',
      content:
        'This is **overfitting**. A model that memorises the training data — including its noise and quirks — fails on any data it has not seen before. It learned the wrong lesson.',
    },
    {
      type: 'note',
      content:
        'The goal of ML is not to fit the training data. It is to **generalise** — to make good predictions on data you have never seen. Those are different things, and confusing them is the single biggest beginner mistake.',
    },

    // ── THE PICTURE ──────────────────
    {
      type: 'text',
      content:
        'Here are three models on the same data. The dots are the training examples. Each curve shows a model trying to fit them.',
    },
    {
      type: 'graph',
      title: 'Underfit, good fit, overfit',
      fns: [
        { fn: (x) => 0.5 * x + 0.2, color: 'slate', label: 'underfit', strokeWidth: 2 },
        { fn: (x) => 0.5 * x + 0.15 * Math.sin(2 * x), color: 'emerald', label: 'good fit', strokeWidth: 2.5 },
        { fn: (x) => 0.5 * x + 0.35 * Math.sin(5 * x) + 0.15 * Math.cos(9 * x), color: 'rose', label: 'overfit', strokeWidth: 2, dashed: true },
      ],
      points: [
        { x: 0, y: 0.1, color: 'brand', r: 5 },
        { x: 1, y: 0.7, color: 'brand', r: 5 },
        { x: 2, y: 1.0, color: 'brand', r: 5 },
        { x: 3, y: 1.6, color: 'brand', r: 5 },
        { x: 4, y: 1.9, color: 'brand', r: 5 },
        { x: 5, y: 2.6, color: 'brand', r: 5 },
      ],
      domain: [-0.3, 5.3],
      range: [-0.3, 3.2],
      caption:
        'Slate line: too simple (underfitting). Emerald curve: captures the trend. Rose curve: chases every dot, including noise.',
    },
    {
      type: 'text',
      content:
        'The underfit model is too simple — it does not capture the pattern. The overfit model is too flexible — it fits the noise. The good fit finds the middle ground.',
    },

    // ── THE U-SHAPED CURVE ───────────
    {
      type: 'text',
      content:
        'Here is the key picture. As model complexity increases, training error goes down and down — eventually to zero. But test error first goes down, then starts going up. The sweet spot is at the bottom of the test-error curve.',
    },
    {
      type: 'graph',
      title: 'Training loss vs test loss',
      fns: [
        { fn: (c) => 3 / (1 + c) + 0.3, color: 'cyan', label: 'training loss', strokeWidth: 2.5 },
        { fn: (c) => 0.6 * (c - 3) * (c - 3) / 8 + 0.6, color: 'rose', label: 'test loss', strokeWidth: 2.5 },
      ],
      points: [
        { x: 3, y: 1.2, color: 'emerald', r: 8, label: 'sweet spot' },
      ],
      domain: [0, 8],
      range: [-0.1, 4],
      caption:
        'Training loss always decreases with complexity. Test loss makes a U-shape — it goes down, then up. The bottom of the U is the right complexity.',
    },
    {
      type: 'note',
      content:
        'This U-shaped curve is everywhere in ML. Too simple → underfit. Too complex → overfit. You have to find the middle. There is no shortcut — you find it by measuring test performance at different complexities.',
    },

    // ── SPLITTING DATA ───────────────
    {
      type: 'text',
      content:
        'How do we measure test performance? By holding out some data the model never sees during training.',
    },
    {
      type: 'code',
      content: 'Simple train/test split with numpy:',
      code: `import numpy as np\n\n# 100 examples\nX = np.random.randn(100, 3)\ny = X[:, 0] * 2 + X[:, 1] * -1 + np.random.randn(100) * 0.1\n\n# Shuffle indices\nidx = np.random.permutation(100)\n\n# 80/20 split\ntrain_idx = idx[:80]\ntest_idx  = idx[80:]\n\nX_train, y_train = X[train_idx], y[train_idx]\nX_test,  y_test  = X[test_idx],  y[test_idx]\n\nprint(f"Train: {X_train.shape[0]} examples")\nprint(f"Test:  {X_test.shape[0]} examples")`,
      output: `Train: 80 examples\nTest:  20 examples`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'NEVER touch the test set during training. Do not look at it, do not tune on it, do not peek. If you use it to make decisions, it stops being a test set and starts being part of the training process. You will then have no honest way to measure your model.',
    },

    // ── THREE-WAY SPLIT ──────────────
    {
      type: 'text',
      content:
        'In practice, you often split into **three** sets, not two.',
    },
    {
      type: 'text',
      content:
        '• **Training set (~70%)** — the model learns from these.\n• **Validation set (~15%)** — used to tune hyperparameters, compare models, and early-stop training.\n• **Test set (~15%)** — used ONCE at the very end, to get an honest final score.',
    },
    {
      type: 'math',
      latex:
        '\\text{data} = \\underbrace{\\text{train}}_{70\\%} + \\underbrace{\\text{val}}_{15\\%} + \\underbrace{\\text{test}}_{15\\%}',
      caption:
        'Three-way split. Validation is used for decisions; test is used only for the final report.',
    },
    {
      type: 'tip',
      content:
        'Think of the three sets as: practice problems (train), mock exams (val), and the real final exam (test). You practice on the first, tune yourself on the second, and only sit the third once.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Watch overfitting happen',
      description:
        'The slider controls model complexity. At low complexity, underfit. At high complexity, overfit. Watch the training error and test error diverge.',
      sliders: [
        { id: 'complexity', label: '\\text{complexity}', min: 0, max: 10, step: 0.1, default: 3, decimals: 1 },
      ],
      render: ({ complexity }) => {
        // 8 training points + noise
        const trainX = [0, 1, 2, 3, 4, 5, 6, 7];
        const trainY = [0.1, 1.1, 1.8, 3.2, 3.8, 5.1, 5.9, 7.2];
        // High-complexity model: interpolating polynomial with strong oscillations
        const fn = (x) => {
          const c = complexity;
          const base = 0.9 * x + 0.1;
          const wiggle = (c / 10) * 0.8 * Math.sin(c * x * 0.5);
          return base + wiggle;
        };
        return {
          fns: [{ fn, color: 'brand', label: `model (complexity = ${complexity.toFixed(1)})` }],
          points: trainX.map((x, i) => ({ x, y: trainY[i], color: 'cyan', r: 5 })),
          domain: [-0.5, 7.5],
          range: [-1, 9],
        };
      },
      formula: ({ complexity }) => {
        const trainX = [0, 1, 2, 3, 4, 5, 6, 7];
        const trainY = [0.1, 1.1, 1.8, 3.2, 3.8, 5.1, 5.9, 7.2];
        let trainMSE = 0;
        for (let i = 0; i < trainX.length; i++) {
          const c = complexity;
          const pred = 0.9 * trainX[i] + 0.1 + (c / 10) * 0.8 * Math.sin(c * trainX[i] * 0.5);
          trainMSE += (pred - trainY[i]) ** 2;
        }
        trainMSE /= trainX.length;
        return `\\text{train MSE} = ${trainMSE.toFixed(3)}`;
      },
      caption:
        'At low complexity, the model is smooth but misses the pattern. At high complexity, it curves wildly to chase every point — a classic sign of overfitting.',
    },

    // ── HOW TO REDUCE OVERFITTING ────
    {
      type: 'text',
      content:
        'Overfitting is fixable. Here are the four main strategies, roughly in order of impact:',
    },
    {
      type: 'text',
      content:
        '**1. More data.** The single best fix. More examples means it is harder to memorise all of them. If you can get more data, do it.',
    },
    {
      type: 'text',
      content:
        '**2. Simpler model.** Reduce the number of parameters, layers, or features. A simpler model has less capacity to memorise.',
    },
    {
      type: 'text',
      content:
        '**3. Regularisation.** Add a penalty for large weights to the loss function. This discourages the model from becoming too confident or too flexible.',
    },
    {
      type: 'text',
      content:
        '**4. Early stopping.** Monitor validation error during training. Stop when it starts going up, even if training error keeps going down.',
    },
    {
      type: 'note',
      content:
        'Regularisation comes in two common forms: **L2 (ridge)** adds $\\lambda \\sum w_i^2$ to the loss, penalising large weights. **L1 (lasso)** adds $\\lambda \\sum |w_i|$, which can drive weights all the way to zero — a form of feature selection.',
    },
    {
      type: 'tip',
      content:
        'Overfitting is not a bug — it is a symptom of the model having more capacity than the data can support. The cure is either less capacity or more data. Or both.',
    },
    {
      type: 'tip',
      content:
        'That is overfitting. The single most important thing to understand in ML. Next: classification — when the output is a category, not a number.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is overfitting?',
      options: [
        'When the model trains too slowly.',
        'When the model fits training data well but generalises poorly to new data.',
        'When the model has too few parameters.',
        'When the training set is too large.',
      ],
      correct: 1,
      explanation:
        'Overfitting means the model memorised the training data (including its noise) instead of learning the underlying pattern. It does great on training data, poorly on new data.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'A model gets 99% accuracy on training data and 55% on test data. What is the diagnosis?',
      options: [
        'Underfitting — the model is too simple.',
        'Overfitting — the model memorised the training set.',
        'Perfectly trained.',
        'The test set is corrupt.',
      ],
      correct: 1,
      explanation:
        'A huge gap between training and test performance is the signature of overfitting. The model learned the training data specifics rather than generalisable patterns.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Which is the single most effective way to reduce overfitting?',
      options: [
        'Train for more epochs.',
        'Add more layers to the model.',
        'Get more training data.',
        'Increase the learning rate.',
      ],
      correct: 2,
      explanation:
        'More data is the best fix. It is harder for a model to memorise a large, varied dataset than a small one. Other fixes (regularisation, simpler models) help, but more data is the strongest.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'What is the difference between the validation set and the test set?',
      options: [
        'They are the same thing.',
        'Validation is used to tune the model; test is used only for the final honest evaluation.',
        'Validation is larger; test is smaller.',
        'Test is used during training; validation is not.',
      ],
      correct: 1,
      explanation:
        'The validation set guides decisions during development (choosing models, tuning hyperparameters). The test set is used once at the very end — an honest check of how the model will perform in the real world.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'What does L2 regularisation do?',
      options: [
        'Adds a penalty for large weights to the loss function.',
        'Removes half the training data.',
        'Increases the learning rate.',
        'Doubles the number of features.',
      ],
      correct: 0,
      explanation:
        'L2 regularisation adds $\\lambda \\sum w_i^2$ to the loss, discouraging large weights. This keeps the model simpler and reduces overfitting, at the cost of a slightly less tight fit to the training data.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'A model has 100% training accuracy but 40% test accuracy. What should you try FIRST?',
      options: [
        'Train for more epochs.',
        'Simplify the model — reduce capacity — since it is clearly overfitting.',
        'Add more features.',
        'Increase the learning rate.',
      ],
      correct: 1,
      explanation:
        'Classic overfitting. The immediate fix is to reduce model capacity — fewer parameters, simpler architecture, or strong regularisation. Adding more training data also works if available.',
      xp: 30,
    },
  ],
};