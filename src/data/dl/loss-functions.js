// 🧠 DL — Lesson 4: Loss Functions

export const dlLossFunctionsLesson = {
  id: 'dl-loss-functions',
  title: 'Loss Functions — Measuring Wrongness',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'A neural network is just a function. To make it learn, we need a way to measure how wrong its predictions are. That number is the loss. Small loss = good network. Large loss = bad network.',

  sections: [
    {
      type: 'text',
      content:
        'You have seen loss functions in the ML module. But in neural networks, they play an even more critical role. The loss is the single number that the entire network tries to minimize. Every weight update is designed to push this number down.',
    },
    {
      type: 'note',
      content:
        'The loss function is your definition of "success". If you pick the wrong loss, the network will optimize for the wrong thing. For example, optimizing MSE on a classification problem might work, but Cross-Entropy works much better.',
    },

    // ── MSE (Regression) ─────────────
    {
      type: 'text',
      content:
        '**For Regression (Predicting a number):** We use Mean Squared Error (MSE). It measures the average squared difference between the network\'s output ($\\hat{y}$) and the true value ($y$).',
    },
    {
      type: 'math',
      latex:
        'L_{MSE} = \\frac{1}{n} \\sum_{i=1}^{n} (\\hat{y}_i - y_i)^2',
      caption:
        'Squaring the error heavily penalizes large mistakes. If the network predicts 10, but the answer is 0, the loss is 100.',
    },
    {
      type: 'code',
      content: 'MSE in NumPy:',
      code: `import numpy as np\n\ndef mse_loss(y_pred, y_true):\n    return np.mean((y_pred - y_true) ** 2)\n\ny_pred = np.array([0.5, 2.0, -1.0])\ny_true = np.array([0.0, 2.0, 1.0])\n\nprint(mse_loss(y_pred, y_true))`,
      output: `0.4166666666666667`,
      language: 'python',
    },

    // ── BINARY CROSS-ENTROPY ────────
    {
      type: 'text',
      content:
        '**For Binary Classification (Yes/No, Cat/Dog):** We use Binary Cross-Entropy (BCE). The network outputs a probability ($\\hat{y}$ between 0 and 1). BCE measures how surprised the network is by the true answer.',
    },
    {
      type: 'math',
      latex:
        'L_{BCE} = - \\frac{1}{n} \\sum_{i=1}^{n} \\left[ y_i \\log(\\hat{y}_i) + (1 - y_i) \\log(1 - \\hat{y}_i) \\right]',
      caption:
        'If the true answer is 1 ($y=1$), the second term disappears. The loss is just $-\\log(\\hat{y})$.',
    },
    {
      type: 'graph',
      title: 'Binary Cross-Entropy for a True Label of 1',
      fns: [
        { fn: (x) => x > 0.001 ? -Math.log(x) : -Math.log(0.001), color: 'rose', label: 'Loss when true label is 1' },
      ],
      domain: [0, 1],
      range: [-0.5, 5],
      caption:
        'If the network predicts 0.99 (very confident it is 1), loss is near 0. If it predicts 0.01 (very confident it is 0), loss explodes to infinity.',
    },
    {
      type: 'warning',
      content:
        'NEVER use MSE for probabilities. If a network outputs a probability of 0.01 when the true answer is 1, MSE gives a loss of 0.98. BCE gives a loss of ~4.6. BCE punishes confident wrong answers much harder, which forces the network to be humble.',
    },

    // ── MULTI-CLASS CROSS-ENTROPY ────
    {
      type: 'text',
      content:
        '**For Multi-Class Classification (Digits 0-9, Animals):** We use Categorical Cross-Entropy. The network outputs a probability distribution (softmax). The loss measures how much probability was given to the correct class.',
    },
    {
      type: 'math',
      latex:
        'L_{CCE} = - \\log(\\hat{y}_{true})',
      caption:
        'If the true class is 3, and the network predicts 0.9 for class 3, loss is $-\\log(0.9) \\approx 0.1$. If it predicts 0.01 for class 3, loss is $-\\log(0.01) \\approx 4.6$.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'MSE vs Cross-Entropy',
      description:
        'Move the slider to change the predicted probability (true label is 1). Watch how each loss reacts.',
      sliders: [
        { id: 'pred', label: '\\hat{y}', min: 0.01, max: 0.99, step: 0.01, default: 0.5, decimals: 2 },
      ],
      render: ({ pred }) => ({
        fns: [
          { fn: (x) => x > 0.01 ? -Math.log(x) : 5, color: 'rose', label: 'Cross-Entropy' },
          { fn: (x) => (1 - x) ** 2, color: 'cyan', label: 'MSE' },
        ],
        points: [
          { x: pred, y: pred > 0.01 ? -Math.log(pred) : 5, color: 'rose', r: 6 },
          { x: pred, y: (1 - pred) ** 2, color: 'cyan', r: 6 },
        ],
        domain: [0, 1.05],
        range: [-0.5, 5],
      }),
      formula: ({ pred }) => {
        const ce = pred > 0.01 ? -Math.log(pred) : '\\infty';
        const mse = (1 - pred) ** 2;
        return `\\text{CE} = ${typeof ce === 'number' ? ce.toFixed(2) : ce},\\;\\; \\text{MSE} = ${mse.toFixed(2)}`;
      },
      caption:
        'At pred = 0.5, both losses are moderate. But at pred = 0.01, BCE is much higher than MSE. That is why BCE is better for probabilities.',
    },
    {
      type: 'tip',
      content:
        'In PyTorch, you will see `nn.BCELoss()` (Binary Cross-Entropy), `nn.CrossEntropyLoss()` (Multi-class, with built-in softmax), and `nn.MSELoss()`. Now you know exactly what they are computing.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Which loss function should you use for a binary classification problem?',
      options: ['Mean Squared Error (MSE)', 'Binary Cross-Entropy (BCE)', 'Categorical Cross-Entropy', 'Mean Absolute Error (MAE)'],
      correct: 1,
      explanation:
        'For binary classification (yes/no), BCE is the standard. It penalizes confident wrong probabilities much more aggressively than MSE.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'What is the MSE loss for prediction 3.0 and true value 1.0? (Just a single example)',
      correct: 4,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'MSE = (pred - true)^2.',
      explanation: '(3.0 - 1.0)^2 = 2^2 = 4.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Why is MSE a bad choice for classification tasks?',
      options: [
        'It is too slow to compute.',
        'It does not penalize confident wrong predictions enough.',
        'It can only handle positive numbers.',
        'It requires a softmax layer.',
      ],
      correct: 1,
      explanation:
        'MSE is quadratic. If a network is confidently wrong (predicts 0.01 for true class 1), MSE is only ~0.98. BCE explodes to ~4.6. BCE forces the network to be humble.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write a function `binary_cross_entropy(y_true, y_pred)` that computes the BCE loss for a single example. Return a float.',
      starterCode:
        'import math\n\ndef binary_cross_entropy(y_true, y_pred):\n    # your code here\n    pass',
      tests: [
        { input: 'round(binary_cross_entropy(1, 0.5), 4)', expected: '0.6931' },
        { input: 'round(binary_cross_entropy(1, 0.99), 4)', expected: '0.0101' },
        { input: 'round(binary_cross_entropy(0, 0.1), 4)', expected: '0.1054' },
      ],
      hint: 'Formula: -[y*log(p) + (1-y)*log(1-p)].',
      solution:
        'import math\n\ndef binary_cross_entropy(y_true, y_pred):\n    return -(y_true * math.log(y_pred) + (1 - y_true) * math.log(1 - y_pred))',
      explanation:
        'When y_true = 1, the second term is 0. When y_true = 0, the first term is 0. This formula handles both cases elegantly.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'output-match',
      question:
        'Compute the MSE for an entire array of predictions [2, 3, 4] against true values [1, 2, 3]. Print the result.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '1.0',
      hint: 'Compute the mean of the squared differences.',
      solution:
        'import numpy as np\ny_pred = np.array([2, 3, 4])\ny_true = np.array([1, 2, 3])\nprint(np.mean((y_pred - y_true) ** 2))',
      explanation:
        'Differences are [1, 1, 1]. Squared: [1, 1, 1]. Mean: 1.0.',
      xp: 20,
    },
  ],
};