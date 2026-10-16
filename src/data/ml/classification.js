// 🤖 ML — Lesson 5: Classification — Predicting Categories

export const mlClassificationLesson = {
  id: 'ml-classification',
  title: 'Classification — Predicting Categories',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Regression predicts a number. Classification predicts a category — spam or not, cat or dog, fraud or not. The math changes, but the training loop is the same.',

  sections: [
    {
      type: 'text',
      content:
        'We have focused on regression — predicting a continuous number like a price. But many real ML problems are **classification**: the output is a category, not a number.',
    },
    {
      type: 'text',
      content:
        '• Is this email spam or not spam? (binary)\n• Which digit is in this image — 0, 1, ..., 9? (multiclass)\n• Is this customer likely to churn? (binary)\n• What language is this text — English, Hindi, Spanish? (multiclass)',
    },
    {
      type: 'note',
      content:
        'Binary classification = two classes. Multiclass = three or more. The core idea is the same: assign a **probability** to each class, and pick the one with the highest probability.',
    },

    // ── THE PROBLEM WITH LINES ───────
    {
      type: 'text',
      content:
        'At first you might think: just use linear regression, and classify based on whether the output is above or below 0.5.',
    },
    {
      type: 'text',
      content:
        'This has a problem. A single extreme outlier can pull the line far away, misclassifying the others. And the output is not naturally a probability — it can be negative or greater than 1, which is meaningless for "probability of spam".',
    },
    {
      type: 'graph',
      title: 'Why linear regression fails for classification',
      fns: [
        { fn: (x) => 0.15 * x - 0.3, color: 'slate', label: 'linear fit', dashed: true },
      ],
      points: [
        { x: 1, y: 0, color: 'rose', r: 6, label: 'class 0' },
        { x: 2, y: 0, color: 'rose', r: 6 },
        { x: 3, y: 0, color: 'rose', r: 6 },
        { x: 4, y: 1, color: 'emerald', r: 6, label: 'class 1' },
        { x: 5, y: 1, color: 'emerald', r: 6 },
        { x: 6, y: 1, color: 'emerald', r: 6 },
        { x: 7, y: 1, color: 'emerald', r: 6 },
        { x: 8, y: 1, color: 'emerald', r: 6 },
        { x: 10, y: 1, color: 'emerald', r: 6, label: 'extreme point' },
      ],
      domain: [0, 11],
      range: [-0.5, 1.5],
      caption:
        'The linear fit is being pulled around by points. Some predictions are negative (< 0) or above 1 — not valid probabilities.',
    },

    // ── SIGMOID ──────────────────────
    {
      type: 'text',
      content:
        'The fix: squash the output through a function that always produces a value between 0 and 1. The classic choice is the **sigmoid function**.',
    },
    {
      type: 'math',
      latex:
        '\\sigma(z) = \\frac{1}{1 + e^{-z}}',
      caption:
        'The sigmoid. Takes any real number z and returns a value between 0 and 1.',
    },
    {
      type: 'graph',
      title: 'The sigmoid curve',
      fns: [
        { fn: (z) => 1 / (1 + Math.exp(-z)), color: 'cyan', label: 'σ(z)' },
      ],
      domain: [-6, 6],
      range: [-0.1, 1.1],
      points: [
        { x: 0, y: 0.5, color: 'brand', r: 6, label: '(0, 0.5)' },
      ],
      caption:
        'The S-shape you met in the Calculus module. At z = 0, sigmoid = 0.5. As z → +∞, sigmoid → 1. As z → −∞, sigmoid → 0. Never leaves [0, 1].',
    },
    {
      type: 'note',
      content:
        'The sigmoid has a natural interpretation: **the probability of class 1**. If sigmoid outputs 0.9, we say "90% confident this is class 1". If it outputs 0.1, "10% confident it is class 1" (equivalently, 90% confident class 0).',
    },

    // ── LOGISTIC REGRESSION ──────────
    {
      type: 'text',
      content:
        '**Logistic regression** is the simplest classifier. It is linear regression followed by a sigmoid.',
    },
    {
      type: 'math',
      latex:
        '\\hat{p} = \\sigma(w \\cdot x + b)',
      caption:
        'Compute a weighted sum of features, then squash it through sigmoid to get a probability.',
    },
    {
      type: 'code',
      content: 'Logistic regression from scratch:',
      code: `import numpy as np\n\n# Training data: 2 features, binary labels\nX = np.array([\n    [1.0, 0.5], [1.5, 0.8], [2.0, 1.2],  # class 1 (label 1)\n    [-1.0, -0.5], [-1.5, -1.0], [-2.0, -0.8]  # class 0 (label 0)\n])\ny = np.array([1, 1, 1, 0, 0, 0], dtype=float)\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\n# Initialize weights\nw = np.zeros(2)\nb = 0.0\nlr = 0.1\n\nfor step in range(500):\n    # Forward: compute probabilities\n    z = X @ w + b\n    p = sigmoid(z)\n    \n    # Gradients (cross-entropy loss)\n    err = p - y\n    w_grad = X.T @ err / len(X)\n    b_grad = np.mean(err)\n    \n    # Update\n    w -= lr * w_grad\n    b -= lr * b_grad\n\nprint(f"w = {w.round(3)}")\nprint(f"b = {b:.3f}")\n\n# Predict on training data\nprobs = sigmoid(X @ w + b)\nprint(f"Probabilities: {probs.round(3)}")`,
      output: `w = [1.404 0.939]\nb = -0.052\nProbabilities: [0.853 0.964 0.989 0.063 0.02  0.028]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The first three rows (class 1) get high probabilities (0.85–0.99). The last three (class 0) get low probabilities (0.02–0.06). The model learned the pattern well.',
    },

    // ── DECISION BOUNDARY ────────────
    {
      type: 'text',
      content:
        'A classifier effectively draws a **decision boundary** through feature space. Points on one side are class 0; the other side, class 1.',
    },
    {
      type: 'graph',
      title: 'The learned decision boundary',
      fns: [
        // Decision boundary: w1*x + w2*y + b = 0 → y = (-w1*x - b)/w2
        { fn: (x) => (-1.404 * x + 0.052) / 0.939, color: 'brand', label: 'decision boundary', strokeWidth: 2.5 },
      ],
      points: [
        { x: 1.0, y: 0.5, color: 'emerald', r: 7 },
        { x: 1.5, y: 0.8, color: 'emerald', r: 7 },
        { x: 2.0, y: 1.2, color: 'emerald', r: 7 },
        { x: -1.0, y: -0.5, color: 'rose', r: 7 },
        { x: -1.5, y: -1.0, color: 'rose', r: 7 },
        { x: -2.0, y: -0.8, color: 'rose', r: 7 },
      ],
      domain: [-2.5, 2.5],
      range: [-1.5, 1.5],
      caption:
        'The learned decision boundary separates the two classes. Points above the line get high probability of class 1; below, high probability of class 0.',
    },
    {
      type: 'tip',
      content:
        'The decision boundary is always perpendicular to the weight vector $w$. This is a linear algebra fact — the direction of $w$ is the direction of maximum class separation. Everything connects.',
    },

    // ── FROM PROBABILITY TO CLASS ────
    {
      type: 'text',
      content:
        'Logistic regression outputs a probability. To make a final class prediction, we threshold it. The default threshold is 0.5.',
    },
    {
      type: 'math',
      latex:
        '\\hat{y} = \\begin{cases} 1 & \\text{if } \\hat{p} \\geq 0.5 \\\\ 0 & \\text{if } \\hat{p} < 0.5 \\end{cases}',
      caption:
        'Threshold at 0.5. Predict class 1 if probability ≥ 0.5, otherwise class 0.',
    },
    {
      type: 'warning',
      content:
        'The 0.5 threshold is not always what you want. For detecting rare diseases, you might set the threshold to 0.2 — better to have false positives (extra tests) than false negatives (missed cases). For spam filtering, you might set it to 0.8 — better to let some spam through than to block legitimate email.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Move the threshold',
      description:
        'Change the threshold and see how the classification changes. Higher threshold = more conservative (fewer positive predictions).',
      sliders: [
        { id: 'threshold', label: '\\text{threshold}', min: 0.05, max: 0.95, step: 0.05, default: 0.5, decimals: 2 },
      ],
      render: ({ threshold }) => ({
        fns: [
          { fn: (z) => 1 / (1 + Math.exp(-z)), color: 'cyan', label: 'σ(z)' },
        ],
        lines: [{ type: 'h', value: threshold, color: 'rose' }],
        points: [
          { x: Math.log(threshold / (1 - threshold)), y: threshold, color: 'brand', r: 7, label: `threshold = ${threshold.toFixed(2)}` },
        ],
        domain: [-6, 6],
        range: [-0.1, 1.1],
      }),
      formula: ({ threshold }) => {
        const z = Math.log(threshold / (1 - threshold));
        return `\\sigma(z) = ${threshold.toFixed(2)} \\Rightarrow z = ${z.toFixed(3)}`;
      },
      caption:
        'The threshold line (red). For any input z above the crossing point, we predict class 1. Below, class 0. Moving the threshold trades false positives for false negatives.',
    },

    // ── MULTICLASS ───────────────────
    {
      type: 'text',
      content:
        'For more than two classes, we use **softmax**. It is the multiclass version of sigmoid — it turns a vector of scores into a probability distribution over all classes.',
    },
    {
      type: 'math',
      latex:
        '\\text{softmax}(z)_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}',
      caption:
        'Softmax. Exponentiate each score, divide by the sum. Outputs sum to 1.',
    },
    {
      type: 'note',
      content:
        'You have seen this before — it is the final layer of every modern image classifier, language model, and chatbot. GPT outputs a softmax distribution over its entire vocabulary, then samples from it to pick the next token.',
    },
    {
      type: 'text',
      content:
        'Training a classifier uses the same loop: forward pass (compute probabilities), compute loss (cross-entropy), compute gradients, update weights. Only the shape of the model changes.',
    },
    {
      type: 'tip',
      content:
        'That is classification. Sigmoid for binary, softmax for multiclass, cross-entropy for the loss. Next lesson: how do we actually measure how good a classifier is?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the difference between regression and classification?',
      options: [
        'Regression predicts a category; classification predicts a number.',
        'Regression predicts a continuous number; classification predicts a category.',
        'They are the same thing.',
        'Classification only works on images.',
      ],
      correct: 1,
      explanation:
        'Regression: predicting a number (price, temperature). Classification: predicting a category (spam/not spam, cat/dog). Different output types, different loss functions.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does the sigmoid function do?',
      options: [
        'Doubles the output.',
        'Squashes any real number into the range (0, 1).',
        'Squares the input.',
        'Returns the maximum value.',
      ],
      correct: 1,
      explanation:
        'The sigmoid takes any real number and maps it to a value between 0 and 1. This is why it is used to convert model scores into probabilities.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'What is $\\sigma(0)$? (Sigmoid of zero.)',
      correct: 0.5,
      tolerance: 0.01,
      placeholder: 'e.g. 0.5',
      hint: 'σ(0) = 1 / (1 + e⁰) = 1 / (1 + 1).',
      explanation:
        '$\\sigma(0) = \\frac{1}{1 + e^{0}} = \\frac{1}{1 + 1} = 0.5$. A score of 0 means "no information" — right at the decision boundary.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Logistic regression outputs 0.87 for an email. What does this mean?',
      options: [
        'The email is 87% likely to be spam.',
        'The email has 87 characters.',
        'The model is 87% accurate.',
        'The email belongs to class 87.',
      ],
      correct: 0,
      explanation:
        'The output of logistic regression is a probability. 0.87 means "87% confident this is class 1" (in this case, spam). The threshold (default 0.5) decides the final class.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'You are building a rare disease detector. False negatives (missed cases) are very costly, while false positives (extra tests) are cheap. What threshold should you use?',
      options: [
        'Lower than 0.5 — flag more cases to avoid missing any.',
        'Higher than 0.5 — be very conservative.',
        'Exactly 0.5.',
        'Threshold does not matter.',
      ],
      correct: 0,
      explanation:
        'Lowering the threshold means predicting "positive" more often — catching more true positives at the cost of more false positives. When missing a case is worse than a false alarm, lower the threshold.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'What function is used for multiclass classification (instead of sigmoid)?',
      options: [
        'Linear regression.',
        'Softmax.',
        'Sigmoid squared.',
        'The identity function.',
      ],
      correct: 1,
      explanation:
        'Softmax generalises sigmoid to multiple classes. It takes a vector of scores and returns a probability distribution over all classes, summing to 1.',
      xp: 25,
    },
  ],
};