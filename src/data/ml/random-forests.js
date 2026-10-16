// 🤖 ML — Lesson 8: Random Forests & Ensembles

export const mlRandomForestsLesson = {
  id: 'ml-random-forests',
  title: 'Random Forests & Ensembles',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'One tree overfits. A thousand trees, each slightly different, average out to a very good model. This is the core idea of ensemble learning — and the reason forests dominate tabular ML.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine asking one person to estimate the number of candies in a jar. They might be way off. But ask 100 people and average their answers — you usually get very close to the truth. This is the **wisdom of the crowd**.',
    },
    {
      type: 'text',
      content:
        'Random Forests apply this idea to decision trees. Train many different trees, then average their predictions. The result is a model that is far more accurate than any single tree.',
    },
    {
      type: 'note',
      content:
        'This idea is called **ensemble learning** — combining many weak learners into one strong learner. It is one of the most powerful techniques in all of ML, and it is behind almost every winning entry in tabular-data competitions.',
    },

    // ── BAGGING ──────────────────────
    {
      type: 'text',
      content:
        'How do we make the trees different from each other? If they all saw the same data, they would all learn the same tree. The trick is **bootstrap sampling**.',
    },
    {
      type: 'text',
      content:
        'For each tree, we sample N examples **with replacement** from the original dataset. Some examples appear multiple times, some not at all. This "bootstrap sample" gives each tree a slightly different view of the data.',
    },
    {
      type: 'math',
      latex:
        '\\text{tree}_i = \\text{DecisionTree}(\\text{bootstrap}_i(X, y))',
      caption:
        'Each tree trains on a different bootstrap sample of the data.',
    },
    {
      type: 'code',
      content: 'Bootstrap sampling in action:',
      code: `import numpy as np\n\nnp.random.seed(42)\n\n# Original dataset\nX = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])\n\n# Bootstrap sample — same size, WITH replacement\nbootstrap_idx = np.random.choice(len(X), size=len(X), replace=True)\nX_boot = X[bootstrap_idx]\n\nprint("Original:  ", X.flatten())\nprint("Bootstrap: ", X_boot.flatten())\nprint("Unique examples used:", sorted(set(X_boot.flatten())))`,
      output: `Original:   [1 2 3 4 5 6 7 8]\nBootstrap:  [7 7 3 5 8 3 2 1]\nUnique examples used: [1, 2, 3, 5, 7, 8]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice that example 4 and 6 are missing from this bootstrap, and examples 3 and 7 appear twice. Each tree sees a slightly different slice of reality. When we average their predictions, the noise cancels out and the signal remains.',
    },

    // ── RANDOM FEATURE SELECTION ─────
    {
      type: 'text',
      content:
        'Random Forests add a second source of randomness. At each split, instead of considering **all features**, the tree only considers a **random subset**.',
    },
    {
      type: 'math',
      latex:
        '\\text{features considered at each split} = \\sqrt{d}',
      caption:
        'For classification, the default is √d where d is the total number of features.',
    },
    {
      type: 'tip',
      content:
        'This sounds counterintuitive — surely using all features would be better? No. Random feature selection decorrelates the trees. Without it, all trees would pick the same "best" features and end up similar, defeating the point of the ensemble.',
    },

    // ── THE ALGORITHM ────────────────
    {
      type: 'text',
      content:
        'So the full Random Forest algorithm is:',
    },
    {
      type: 'text',
      content:
        '• **1.** Choose the number of trees (typically 100–500).\n• **2.** For each tree, draw a bootstrap sample of the training data.\n• **3.** Grow a decision tree on that sample. At each split, consider only a random subset of features.\n• **4.** Do not prune — let the tree grow deep (overfitting is fine, it will average out).\n• **5.** For prediction, average (regression) or majority-vote (classification) across all trees.',
    },
    {
      type: 'math',
      latex:
        '\\hat{y} = \\frac{1}{T} \\sum_{t=1}^{T} \\text{tree}_t(x)',
      caption:
        'For regression, the forest average. For classification, majority vote across trees.',
    },

    // ── WHY IT WORKS ─────────────────
    {
      type: 'text',
      content:
        'Why does averaging many overfit trees give a non-overfit result?',
    },
    {
      type: 'text',
      content:
        'Each individual tree overfits in a slightly different way. Tree 1 memorises odd noise patterns, tree 2 different noise, tree 3 different noise. When you average them, the noise cancels out — but the true signal, which every tree captured, remains.',
    },
    {
      type: 'graph',
      title: 'Individual trees vs the forest average',
      fns: [
        { fn: (x) => 0.5 * x + 0.15 * Math.sin(5 * x), color: 'slate', label: 'tree 1', strokeWidth: 1.5, dashed: true },
        { fn: (x) => 0.5 * x + 0.15 * Math.cos(5 * x), color: 'slate', label: 'tree 2', strokeWidth: 1.5, dashed: true },
        { fn: (x) => 0.5 * x + 0.1 * Math.sin(9 * x), color: 'slate', label: 'tree 3', strokeWidth: 1.5, dashed: true },
        { fn: (x) => 0.5 * x, color: 'emerald', label: 'forest average', strokeWidth: 3 },
      ],
      domain: [-0.3, 5.3],
      range: [-0.3, 3.2],
      points: [
        { x: 0, y: 0.1, color: 'brand', r: 5 },
        { x: 1, y: 0.6, color: 'brand', r: 5 },
        { x: 2, y: 0.9, color: 'brand', r: 5 },
        { x: 3, y: 1.6, color: 'brand', r: 5 },
        { x: 4, y: 1.9, color: 'brand', r: 5 },
        { x: 5, y: 2.6, color: 'brand', r: 5 },
      ],
      caption:
        'Three noisy trees (grey) each capture the true trend in different ways. Their average (emerald) is smooth and accurate — the noise has cancelled out.',
    },
    {
      type: 'note',
      content:
        'This is a deep mathematical fact: **averaging many uncorrelated high-variance models gives a low-variance model**. The bias stays low, the variance drops. You get the best of both worlds.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Watch the forest smooth out',
      description:
        'The slider controls how many trees are in the forest. With one tree, the fit is jagged. With many, it smooths out to the true signal.',
      sliders: [
        { id: 'n_trees', label: '\\text{trees}', min: 1, max: 50, step: 1, default: 1, decimals: 0 },
      ],
      render: ({ n_trees }) => {
        // Simulate: forest average = true signal + (noise / sqrt(n_trees))
        const noiseScale = 0.6 / Math.sqrt(n_trees);
        const fn = (x) => 0.5 * x + noiseScale * Math.sin(5 * x + n_trees);
        return {
          fns: [
            { fn, color: 'brand', label: `forest (${n_trees} trees)`, strokeWidth: 2.5 },
          ],
          points: [
            { x: 0, y: 0.1, color: 'cyan', r: 5 },
            { x: 1, y: 0.6, color: 'cyan', r: 5 },
            { x: 2, y: 0.9, color: 'cyan', r: 5 },
            { x: 3, y: 1.6, color: 'cyan', r: 5 },
            { x: 4, y: 1.9, color: 'cyan', r: 5 },
            { x: 5, y: 2.6, color: 'cyan', r: 5 },
          ],
          domain: [-0.3, 5.3],
          range: [-0.3, 3.2],
        };
      },
      formula: ({ n_trees }) => {
        const noiseScale = 0.6 / Math.sqrt(n_trees);
        return `\\text{noise amplitude} = \\frac{0.6}{\\sqrt{${n_trees}}} = ${noiseScale.toFixed(3)}`;
      },
      caption:
        'With 1 tree, the fit is noisy. As you increase the number of trees, the noise amplitude drops as 1/√n. With 50 trees, the curve is close to the true signal.',
    },

    // ── OUT-OF-BAG ───────────────────
    {
      type: 'text',
      content:
        'Here is a beautiful side-benefit. Each tree was trained on a bootstrap sample that **missed about 37% of the original data**. Those "left-out" examples are called the **out-of-bag (OOB)** samples.',
    },
    {
      type: 'math',
      latex:
        'P(\\text{not chosen}) = \\left(1 - \\frac{1}{N}\\right)^N \\approx e^{-1} \\approx 0.368',
      caption:
        'About 37% of examples are left out of any given bootstrap sample.',
    },
    {
      type: 'text',
      content:
        'We can use each tree to predict on its own OOB samples — examples it never saw during training. Averaging these OOB predictions gives us a **free validation score** — no separate validation set needed.',
    },
    {
      type: 'tip',
      content:
        'OOB error is a fantastic practical shortcut. It is like having a built-in train/test split for free. If you have a small dataset and cannot afford to hold out 20% for validation, OOB gives you the same information.',
    },

    // ── WHEN TO USE ──────────────────
    {
      type: 'text',
      content:
        'Random Forests are an excellent default for tabular data. But they are not always the best choice:',
    },
    {
      type: 'text',
      content:
        '• **Great for:** tabular data, mixed feature types, moderate-size datasets (1K–1M rows), problems where interpretability matters somewhat but not perfectly.\n• **Not ideal for:** very high-dimensional data (images, raw text), very large datasets (neural nets beat them at scale), or cases where you need the very best accuracy (gradient boosting usually wins).',
    },
    {
      type: 'note',
      content:
        'In practice, the strongest tabular models are either Random Forests or **Gradient Boosted Trees** (XGBoost, LightGBM, CatBoost). Gradient boosting trains trees sequentially, each one fixing the errors of the previous, and usually achieves slightly higher accuracy than Random Forests.',
    },
    {
      type: 'tip',
      content:
        'That is Random Forests. Next: k-Nearest Neighbors — a completely different approach based on the idea of "similar things have similar labels".',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the core idea of an ensemble?',
      options: [
        'Use the largest possible model.',
        'Train faster than a single model.',
        'Combine many diverse models to get a result better than any single one.',
        'Remove features until the model is simple.',
      ],
      correct: 2,
      explanation:
        'Ensembles combine many models — each of which may overfit or underfit differently — so their errors cancel out. The combined model is more accurate and more robust than any individual.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What is a "bootstrap sample"?',
      options: [
        'A sample drawn with replacement from the original dataset.',
        'A sample of the model parameters.',
        'The first N examples of the dataset.',
        'A sample of the test set.',
      ],
      correct: 0,
      explanation:
        'A bootstrap sample has the same size as the original but each example is drawn independently with replacement. Some examples appear twice, some not at all — that is what makes each tree different.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'Why does Random Forest use random subsets of features at each split?',
      options: [
        'Because it is faster.',
        'To decorrelate the trees — if all trees used the same best features, they would be too similar.',
        'To reduce memory usage.',
        'To make the trees simpler.',
      ],
      correct: 1,
      explanation:
        'Random feature selection decorrelates the trees. If every tree always picked the same "best" features, they would all make similar mistakes — and averaging would not help. Random feature selection makes the trees diverse, which is what makes the ensemble work.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Roughly what fraction of the original data is left out of a bootstrap sample?',
      options: [
        'About 1%.',
        'About 5%.',
        'About 37%.',
        'About 63%.',
      ],
      correct: 2,
      explanation:
        'As the sample size grows, the fraction of unused examples approaches 1 − 1/e ≈ 0.632, so about 37% are left out. Those "out-of-bag" examples become a free validation set for each tree.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question: 'What is out-of-bag (OOB) error used for?',
      options: [
        'Estimating model performance without a separate validation set.',
        'Computing gradient descent.',
        'Reducing the number of trees.',
        'Increasing the accuracy of individual trees.',
      ],
      correct: 0,
      explanation:
        'Each tree evaluates itself on the examples it did not see during its own training. Averaging these evaluations gives an honest performance estimate — no separate validation set required.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Why does averaging many overfit trees usually give a good model?',
      options: [
        'Because averaging increases bias.',
        'Because each tree overfits differently, so their errors cancel when averaged.',
        'Because trees are always accurate.',
        'Because the forest has more parameters.',
      ],
      correct: 1,
      explanation:
        'Each tree captures the true pattern but overfits noise in a different way. Averaging keeps the shared signal (the pattern) and cancels the varying noise. This is why ensembles reduce variance without increasing bias.',
      xp: 30,
    },
  ],
};