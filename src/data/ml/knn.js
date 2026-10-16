// 🤖 ML — Lesson 9: k-Nearest Neighbors

export const mlKnnLesson = {
  id: 'ml-knn',
  title: 'k-Nearest Neighbors — Learning by Comparison',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'The simplest ML algorithm you can imagine: to classify a new point, find the k closest training points, and take a vote. No training, no gradients, no parameters. And it works surprisingly well.',

  sections: [
    {
      type: 'text',
      content:
        'Some ML models "learn" parameters. k-Nearest Neighbors (k-NN) does not learn anything. It just stores the training data — and at prediction time, finds the nearest neighbours and lets them vote.',
    },
    {
      type: 'note',
      content:
        'This is called a **lazy learner** — there is no training phase. All the work happens at prediction time. This is the opposite of most ML models, which do all the work upfront.',
    },

    // ── THE ALGORITHM ────────────────
    {
      type: 'text',
      content:
        'The algorithm is simple. To predict the label of a new point:',
    },
    {
      type: 'text',
      content:
        '• **1.** Compute the distance from the new point to every training example.\n• **2.** Find the $k$ nearest neighbors.\n• **3.** For classification — let them vote. For regression — take their average.',
    },
    {
      type: 'math',
      latex:
        'd(x, x_i) = \\sqrt{\\sum_j (x_j - x_{ij})^2}',
      caption:
        'Euclidean distance — straight from the Linear Algebra module. Nothing new here.',
    },
    {
      type: 'graph',
      title: 'The k-NN idea',
      fns: [
        { fn: (x) => 2 + 0.4 * Math.sin(x), color: 'slate', label: 'decision boundary', dashed: true, strokeWidth: 2 },
      ],
      points: [
        { x: 0, y: 1, color: 'rose', r: 6 },
        { x: 1, y: 0.5, color: 'rose', r: 6 },
        { x: 0.5, y: 1.5, color: 'rose', r: 6 },
        { x: 4, y: 3, color: 'emerald', r: 6 },
        { x: 3.5, y: 2.5, color: 'emerald', r: 6 },
        { x: 4.5, y: 3.5, color: 'emerald', r: 6 },
        { x: 2, y: 1.7, color: 'brand', r: 9, label: 'new point' },
      ],
      domain: [-0.5, 5.5],
      range: [-0.5, 4.5],
      caption:
        'The red points are class 0; the emerald are class 1. To classify the new point (brand), find its k nearest neighbours. If k = 3, all three are red → predict class 0.',
    },
    {
      type: 'tip',
      content:
        'Notice how k-NN makes no assumptions about the shape of the boundary. It can learn arbitrarily curved, complex boundaries. This is both its strength (flexible) and its weakness (can overfit).',
    },

    // ── CHOOSING K ───────────────────
    {
      type: 'text',
      content:
        'The value of $k$ is the single hyperparameter you need to tune.',
    },
    {
      type: 'text',
      content:
        '• **k = 1** — every point votes alone. Extremely sensitive to noise. Overfits.\n• **k = large** — the vote is dominated by the majority class. Underfits.\n• **k = odd number** — avoids ties in binary classification.',
    },
    {
      type: 'simulation',
      title: 'The effect of k',
      description:
        'Move the slider to change k. See how the predicted class of the new point changes.',
      sliders: [
        { id: 'k', label: 'k', min: 1, max: 9, step: 2, default: 3, decimals: 0 },
      ],
      render: ({ k }) => {
        // New point at (2, 1.7). Neighbors:
        const neighbors = [
          { x: 0, y: 1, label: 0 },
          { x: 1, y: 0.5, label: 0 },
          { x: 0.5, y: 1.5, label: 0 },
          { x: 4, y: 3, label: 1 },
          { x: 3.5, y: 2.5, label: 1 },
          { x: 4.5, y: 3.5, label: 1 },
          { x: 2.5, y: 2.2, label: 0 },
          { x: 3, y: 2.0, label: 1 },
          { x: 1.8, y: 1.9, label: 0 },
        ];
        const newPt = { x: 2, y: 1.7 };
        // Sort by distance
        const sorted = [...neighbors]
          .map((n) => ({ ...n, d: Math.hypot(n.x - newPt.x, n.y - newPt.y) }))
          .sort((a, b) => a.d - b.d);
        const topK = sorted.slice(0, k);
        const votes = topK.reduce((acc, n) => acc + n.label, 0);
        return {
          points: [
            ...neighbors.map((n) => ({ x: n.x, y: n.y, color: n.label === 1 ? 'emerald' : 'rose', r: 6 })),
            { x: newPt.x, y: newPt.y, color: 'brand', r: 9 },
            ...topK.map((n) => ({ x: n.x, y: n.y, color: 'amber', r: 4 })),
          ],
          domain: [-0.5, 5.5],
          range: [-0.5, 4.5],
        };
      },
      formula: ({ k }) => {
        const neighbors = [
          { x: 0, y: 1, label: 0 }, { x: 1, y: 0.5, label: 0 },
          { x: 0.5, y: 1.5, label: 0 }, { x: 4, y: 3, label: 1 },
          { x: 3.5, y: 2.5, label: 1 }, { x: 4.5, y: 3.5, label: 1 },
          { x: 2.5, y: 2.2, label: 0 }, { x: 3, y: 2.0, label: 1 },
          { x: 1.8, y: 1.9, label: 0 },
        ];
        const newPt = { x: 2, y: 1.7 };
        const sorted = [...neighbors]
          .map((n) => ({ ...n, d: Math.hypot(n.x - newPt.x, n.y - newPt.y) }))
          .sort((a, b) => a.d - b.d);
        const topK = sorted.slice(0, k);
        const votes0 = topK.filter((n) => n.label === 0).length;
        const votes1 = topK.filter((n) => n.label === 1).length;
        return `\\text{votes: class 0} = ${votes0},\\;\\; \\text{class 1} = ${votes1} \\Rightarrow \\text{predict class } ${votes1 > votes0 ? 1 : 0}`;
      },
      caption:
        'The amber-highlighted points are the k nearest neighbours. As k grows, the vote shifts. Finding the right k is a tradeoff between noise-resistance and detail.',
    },

    // ── DISTANCE METRICS ─────────────
    {
      type: 'text',
      content:
        'k-NN depends entirely on **distance**. Different distance metrics give different neighbours — and therefore different predictions.',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} \\text{Euclidean (L2):} &\\quad \\sqrt{\\sum (x_j - y_j)^2} \\\\[4pt] \\text{Manhattan (L1):} &\\quad \\sum |x_j - y_j| \\\\[4pt] \\text{Cosine:} &\\quad 1 - \\frac{x \\cdot y}{\\|x\\| \\, \\|y\\|} \\end{aligned}',
      caption:
        'Three distance metrics. Euclidean for spatial data, Manhattan for high-dimensional grid-like data, cosine for text and embeddings.',
    },
    {
      type: 'note',
      content:
        'The choice of metric matters. Euclidean distance treats all dimensions equally. Cosine similarity ignores length and only cares about direction — which is why it dominates in text and embeddings.',
    },

    // ── CODE EXAMPLE ─────────────────
    {
      type: 'code',
      content: 'k-NN from scratch — the whole algorithm:',
      code: `import numpy as np\n\n# Training data\nX_train = np.array([\n    [1, 1], [1.5, 1.2], [0.8, 0.9],   # class 0\n    [4, 4], [4.5, 4.2], [3.8, 4.1],   # class 1\n])\ny_train = np.array([0, 0, 0, 1, 1, 1])\n\ndef predict_knn(X_train, y_train, x_new, k):\n    # Compute distances to all training points\n    distances = np.linalg.norm(X_train - x_new, axis=1)\n    \n    # Find k nearest indices\n    k_nearest = np.argsort(distances)[:k]\n    \n    # Majority vote\n    labels = y_train[k_nearest]\n    return int(np.round(np.mean(labels)))\n\n# Test\nx_new = np.array([1.2, 1.1])\nprint("Prediction (k=3):", predict_knn(X_train, y_train, x_new, 3))\n\nx_new2 = np.array([3.9, 4.0])\nprint("Prediction (k=3):", predict_knn(X_train, y_train, x_new2, 3))`,
      output: `Prediction (k=3): 0\nPrediction (k=3): 1`,
      language: 'python',
    },

    // ── STRENGTHS AND WEAKNESSES ─────
    {
      type: 'text',
      content:
        'k-NN has some real strengths:',
    },
    {
      type: 'text',
      content:
        '• **No training time.** Just store the data.\n• **Naturally multi-class.** No changes needed for 3, 5, or 100 classes.\n• **Handles complex boundaries.** Can fit any shape.\n• **Interpretable.** "These 3 similar examples voted for the answer."',
    },
    {
      type: 'text',
      content:
        'But it has serious weaknesses:',
    },
    {
      type: 'text',
      content:
        '• **Slow at prediction.** Must compare to every training point.\n• **Memory-hungry.** Stores the whole dataset.\n• **Curse of dimensionality.** In high dimensions, "nearest" neighbours become meaningless — every point is roughly equidistant.\n• **Sensitive to feature scales.** A feature in the thousands dominates one in the single digits.',
    },
    {
      type: 'warning',
      content:
        'The curse of dimensionality kills k-NN on high-dimensional data. In 100 dimensions, the distance between the closest and furthest point differs by only a few percent. "Nearest" loses meaning. This is why k-NN shines on low-dimensional tabular data (say, 2–20 features) but fails on raw images or text.',
    },

    // ── SCALING MATTERS ──────────────
    {
      type: 'text',
      content:
        'Because k-NN is entirely about distance, feature scaling is critical. If one feature ranges from 0 to 1 and another from 0 to 10000, the second feature dominates the distance calculation.',
    },
    {
      type: 'code',
      content: 'Standardising features before k-NN:',
      code: `import numpy as np\n\n# Two features with very different scales\nX = np.array([[1, 1000], [2, 2000], [3, 3000], [4, 4000]])\n\n# Standardise: subtract mean, divide by std\nX_mean = X.mean(axis=0)\nX_std  = X.std(axis=0)\nX_scaled = (X - X_mean) / X_std\n\nprint("Original:\", X[0])\nprint("Scaled:  ", X_scaled[0].round(3))`,
      output: `Original: [   1 1000]\nScaled:   [-1.342 -1.342]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'After scaling, both features contribute equally to the distance. This is essential for k-NN — and important for many other distance-based algorithms (k-means, PCA, SVM).',
    },

    // ── WHEN TO USE ──────────────────
    {
      type: 'text',
      content:
        'k-NN is best for:',
    },
    {
      type: 'text',
      content:
        '• **Small datasets** (thousands, not millions of rows).\n• **Low dimensionality** (up to ~20 features).\n• **Well-scaled features.**\n• **Baseline comparisons.** A quick check on whether a complex model is really adding value.',
    },
    {
      type: 'tip',
      content:
        'That is k-NN. Simple, elegant, and a great baseline. Next: k-Means clustering — unsupervised learning, where we let the algorithm discover groups on its own.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'How does k-NN classify a new point?',
      options: [
        'By solving a system of equations.',
        'By finding the k nearest training points and taking a majority vote.',
        'By computing the gradient of a loss function.',
        'By fitting a line through the data.',
      ],
      correct: 1,
      explanation:
        'k-NN has no parameters to learn. It just stores the training data and, at prediction time, finds the k closest examples and lets them vote on the label.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'What happens if you set k = 1 in k-NN?',
      options: [
        'The model is very accurate.',
        'The model is extremely sensitive to noise — a single outlier flips the prediction.',
        'The model does not work.',
        'The model becomes linear.',
      ],
      correct: 1,
      explanation:
        'k = 1 means each prediction depends on a single nearest neighbor. One noisy example can flip an entire region of the decision boundary. Increasing k smooths this out.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'Why is feature scaling especially important for k-NN?',
      options: [
        'Because k-NN uses gradient descent.',
        'Because features with larger scales dominate the distance calculation.',
        'Because k-NN cannot handle negative numbers.',
        'Because scaling reduces overfitting.',
      ],
      correct: 1,
      explanation:
        'Distance is computed across all features. A feature with a range of 10000 contributes 10000× more than one with a range of 1. Standardising features makes all features contribute equally.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question: 'What is the "curse of dimensionality" for k-NN?',
      options: [
        'k-NN becomes too slow in high dimensions.',
        'In high dimensions, all points become roughly equidistant, so "nearest" loses meaning.',
        'k-NN cannot handle more than 10 features.',
        'The algorithm stops working above 1000 rows.',
      ],
      correct: 1,
      explanation:
        'As dimensions grow, distances between points concentrate — the closest and furthest point differ by only a few percent. "Nearest neighbor" becomes meaningless, and k-NN fails to find useful patterns.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'What is the training phase of k-NN?',
      options: [
        'Gradient descent for 1000 epochs.',
        'There is no training phase — k-NN just stores the data.',
        'Computing the principal components.',
        'Fitting a polynomial.',
      ],
      correct: 1,
      explanation:
        'k-NN is a "lazy learner" — no parameters are learned. All the work happens at prediction time, when it searches through the stored training data.',
      xp: 20,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Which distance metric would you use for text embeddings?',
      options: [
        'Euclidean distance.',
        'Manhattan distance.',
        'Cosine similarity.',
        'Hamming distance.',
      ],
      correct: 2,
      explanation:
        'For text and embeddings, we usually care about direction (topic similarity) rather than magnitude (how long the text is). Cosine similarity ignores magnitude and only measures directional alignment — perfect for embeddings.',
      xp: 25,
    },
  ],
};