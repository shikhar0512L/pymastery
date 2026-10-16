// 🤖 ML — Lesson 7: Decision Trees

export const mlDecisionTreesLesson = {
  id: 'ml-decision-trees',
  title: 'Decision Trees — Learning by Asking Questions',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'A decision tree is exactly what it sounds like: a sequence of yes/no questions that leads to a prediction. Simple to understand, surprisingly powerful, and the foundation of the best models in tabular ML.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine predicting whether someone will like a movie. You might ask: Is it a comedy? If yes — do they like slapstick? If yes — recommend. If no — recommend a different comedy. If not a comedy — is it an action film? And so on.',
    },
    {
      type: 'text',
      content:
        'That is a decision tree. Each **node** asks a question about a feature. Each **branch** is a possible answer. Each **leaf** gives a prediction.',
    },
    {
      type: 'note',
      content:
        'A decision tree learns which questions to ask, and in what order, **automatically** from data. You do not design the tree — the training algorithm finds the questions that best split the data.',
    },

    // ── VISUALISE ────────────────────
    {
      type: 'text',
      content:
        'Here is a simple tree for predicting whether to play tennis based on weather.',
    },
    {
      type: 'text',
      content:
        '• **Root node:** Is it raining? — If yes: don\'t play. If no, go to next question.\n• **Next node:** Is it too hot? — If yes: don\'t play. If no: play.',
    },
    {
      type: 'graph',
      title: 'Data the tree learns from',
      fns: [],
      points: [
        { x: 20, y: 1, color: 'emerald', r: 8, label: 'play' },
        { x: 25, y: 1, color: 'emerald', r: 8 },
        { x: 30, y: 1, color: 'emerald', r: 8 },
        { x: 35, y: 1, color: 'emerald', r: 8 },
        { x: 40, y: 0, color: 'rose', r: 8, label: 'no play' },
        { x: 45, y: 0, color: 'rose', r: 8 },
        { x: 15, y: 0, color: 'rose', r: 8, label: 'too cold' },
      ],
      domain: [10, 50],
      range: [-0.5, 1.5],
      caption:
        'Temperature vs play decision. The tree learns a boundary: below 35° play, above 35° do not. A simple threshold splits the classes cleanly.',
    },

    // ── HOW THE TREE SPLITS ──────────
    {
      type: 'text',
      content:
        'How does the algorithm decide which question to ask? It picks the split that best separates the classes — the one that creates the **purest** groups.',
    },
    {
      type: 'text',
      content:
        'Two common measures of "purity":',
    },
    {
      type: 'text',
      content:
        '• **Gini impurity** — probability that a randomly chosen sample is misclassified by the current split.\n• **Entropy** — amount of uncertainty (from information theory).',
    },
    {
      type: 'math',
      latex:
        '\\text{Gini}(p) = 1 - \\sum_i p_i^2',
      caption:
        'Gini impurity. Zero when all examples in a node belong to the same class. Maximum when classes are perfectly mixed.',
    },
    {
      type: 'note',
      content:
        'Gini = 0 means a perfectly pure node (all one class). Gini = 0.5 means maximally mixed (50/50). The tree algorithm tries every possible split and picks the one that reduces weighted Gini the most.',
    },
    {
      type: 'simulation',
      title: 'See how a threshold splits the data',
      description:
        'Move the threshold. The tree tries every possible value and picks the one that best separates classes.',
      sliders: [
        { id: 'threshold', label: '\\text{threshold}', min: 15, max: 45, step: 1, default: 35, decimals: 0 },
      ],
      render: ({ threshold }) => {
        const temps = [15, 20, 25, 30, 35, 40, 45];
        const labels = [0, 1, 1, 1, 1, 0, 0];
        const points = temps.map((t, i) => ({
          x: t, y: labels[i], color: labels[i] === 1 ? 'emerald' : 'rose', r: 8,
        }));
        return {
          fns: [],
          points,
          lines: [{ type: 'v', value: threshold, color: 'brand' }],
          domain: [10, 50],
          range: [-0.5, 1.5],
        };
      },
      formula: ({ threshold }) => {
        const temps = [15, 20, 25, 30, 35, 40, 45];
        const labels = [0, 1, 1, 1, 1, 0, 0];
        let leftCorrect = 0, leftTotal = 0;
        let rightCorrect = 0, rightTotal = 0;
        for (let i = 0; i < temps.length; i++) {
          if (temps[i] < threshold) {
            leftTotal++;
            if (labels[i] === 0) leftCorrect++;
          } else {
            rightTotal++;
            if (labels[i] === 1) rightCorrect++;
          }
        }
        return `\\text{accuracy} = ${((leftCorrect + rightCorrect) / temps.length).toFixed(3)}`;
      },
      caption:
        'The best threshold (35) produces two pure groups: cold → no play, warm → play. Any other threshold mixes classes and reduces accuracy.',
    },

    // ── GROWING THE TREE ─────────────
    {
      type: 'text',
      content:
        'The tree grows **recursively**: at each node, find the best split, apply it, then recurse on the two resulting subsets. Stop when a node is pure enough, or too small, or you hit a maximum depth.',
    },
    {
      type: 'code',
      content: 'A simple decision tree for classification:',
      code: `import numpy as np\n\n# Simple data: [height_cm, weight_kg] → sport\n# sport: 0 = gymnastics, 1 = basketball\nX = np.array([\n    [150, 45], [155, 50], [160, 48], [165, 55],  # shorter\n    [185, 80], [190, 85], [195, 90], [200, 95],  # taller\n])\ny = np.array([0, 0, 0, 0, 1, 1, 1, 1])\n\ndef gini(labels):\n    if len(labels) == 0:\n        return 0\n    p1 = np.mean(labels)\n    p0 = 1 - p1\n    return 1 - (p0 ** 2 + p1 ** 2)\n\ndef best_split(X, y):\n    best = None\n    for feature in range(X.shape[1]):\n        for threshold in np.unique(X[:, feature]):\n            left = y[X[:, feature] < threshold]\n            right = y[X[:, feature] >= threshold]\n            n = len(y)\n            weighted = (len(left) * gini(left) + len(right) * gini(right)) / n\n            if best is None or weighted < best['gini']:\n                best = {'feature': feature, 'threshold': threshold, 'gini': weighted}\n    return best\n\nsplit = best_split(X, y)\nprint(f"Best feature: {'height' if split['feature'] == 0 else 'weight'}")\nprint(f"Best threshold: {split['threshold']}")\nprint(f"Gini after split: {split['gini']:.4f}")`,
      output: `Best feature: weight\nBest threshold: 75\nGini after split: 0.0000`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'The tree found that **weight < 75** perfectly separates the two sports. Gini = 0 after the split — both groups are perfectly pure. One question, done.',
    },

    // ── STRENGTHS ────────────────────
    {
      type: 'text',
      content:
        'Decision trees have three big advantages:',
    },
    {
      type: 'text',
      content:
        '• **Interpretable.** You can read the tree like a flowchart and explain any prediction.\n• **Handle mixed data.** Numbers, categories, missing values — trees deal with all of it.\n• **No feature scaling needed.** A split at height < 170 works whether the height is in cm or metres.',
    },
    {
      type: 'note',
      content:
        'This is why trees dominate tabular ML. Neural networks beat trees on images and text, but on structured data (CSV files, databases), trees and their ensembles are usually the strongest baseline.',
    },

    // ── WEAKNESSES ───────────────────
    {
      type: 'text',
      content:
        'But trees have one big problem: **they overfit easily**. Left to grow, a tree can memorise every training example — creating a separate leaf for each one.',
    },
    {
      type: 'graph',
      title: 'Deep trees overfit',
      fns: [
        { fn: (x) => x < 3 ? 0 : x < 5 ? 1 : x < 6 ? 0 : x < 7 ? 1 : x < 7.5 ? 0 : 1, color: 'rose', label: 'deep tree (overfit)', strokeWidth: 2 },
        { fn: (x) => x < 4 ? 0 : 1, color: 'emerald', label: 'shallow tree (good)', strokeWidth: 2.5 },
      ],
      points: [
        { x: 1, y: 0, color: 'brand', r: 6 },
        { x: 2, y: 0, color: 'brand', r: 6 },
        { x: 3.5, y: 0, color: 'brand', r: 6 },
        { x: 4, y: 1, color: 'brand', r: 6 },
        { x: 5, y: 1, color: 'brand', r: 6 },
        { x: 6, y: 1, color: 'brand', r: 6 },
        { x: 7, y: 1, color: 'brand', r: 6 },
      ],
      domain: [0, 8],
      range: [-0.5, 1.5],
      caption:
        'The shallow tree (emerald) splits once, at x = 4. The deep tree (rose) jumps back and forth — it has memorised the exact training points but will fail on new data.',
    },
    {
      type: 'warning',
      content:
        'A fully-grown tree will always get 100% training accuracy. That is not a feature — it is the symptom of overfitting. Always limit the depth, or use an ensemble (next lesson).',
    },

    // ── PREVENTING OVERFITTING ───────
    {
      type: 'text',
      content:
        'Practical fixes for tree overfitting:',
    },
    {
      type: 'text',
      content:
        '• **Max depth** — stop growing at some depth (typically 3–10).\n• **Min samples per leaf** — a leaf must have at least N samples.\n• **Pruning** — grow a full tree, then cut back branches that do not help validation performance.\n• **Ensembles** — combine many shallow trees. This is what Random Forests do (next lesson).',
    },
    {
      type: 'tip',
      content:
        'In practice, we rarely use a single decision tree. Instead, we use **Random Forests** or **Gradient Boosted Trees** — ensembles of many shallow trees. A single tree is mostly useful for interpretability.',
    },
    {
      type: 'tip',
      content:
        'That is decision trees. Next: Random Forests — the ensembles that make trees actually competitive on real problems.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is a decision tree?',
      options: [
        'A neural network with one hidden layer.',
        'A sequence of yes/no questions about features, ending in a prediction.',
        'A type of gradient descent.',
        'A statistical test.',
      ],
      correct: 1,
      explanation:
        'A decision tree is exactly that — a flowchart of questions. Each internal node asks a yes/no question about a feature, each branch is an answer, each leaf gives a prediction.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'If a node has 8 positive and 0 negative samples, what is its Gini impurity?',
      correct: 0,
      tolerance: 0.01,
      placeholder: 'e.g. 0',
      hint: 'Gini = 1 − sum(p_i²). With all samples in one class, p = 1.',
      explanation:
        'Gini = 1 − (1² + 0²) = 1 − 1 = 0. A pure node has Gini 0.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'If a node has 5 positive and 5 negative samples, what is its Gini impurity?',
      correct: 0.5,
      tolerance: 0.01,
      placeholder: 'e.g. 0.5',
      hint: 'Gini = 1 − (0.5² + 0.5²).',
      explanation:
        'Gini = 1 − (0.5² + 0.5²) = 1 − (0.25 + 0.25) = 1 − 0.5 = 0.5. Maximally mixed node.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question: 'Why do decision trees overfit easily?',
      options: [
        'Because they use gradient descent.',
        'Because they can grow arbitrarily deep, memorising every training example.',
        'Because they do not use loss functions.',
        'Because they require too much data.',
      ],
      correct: 1,
      explanation:
        'An unlimited tree can create a separate leaf for each training example, achieving 100% training accuracy while generalising poorly. Limiting depth or using ensembles fixes this.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which is a key advantage of decision trees over neural networks?',
      options: [
        'They always achieve higher accuracy.',
        'They are interpretable — you can explain any prediction by tracing the path through the tree.',
        'They train faster.',
        'They work only on numbers.',
      ],
      correct: 1,
      explanation:
        'Interpretability is huge in domains like medicine, finance, and law, where you must justify each prediction. Trees are essentially flowcharts, making them easy to explain to non-experts.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Which of these is a practical way to reduce tree overfitting?',
      options: [
        'Increase the maximum depth.',
        'Limit the maximum depth, or use many shallow trees in an ensemble.',
        'Remove the gini impurity calculation.',
        'Train with fewer examples.',
      ],
      correct: 1,
      explanation:
        'Limiting depth and using ensembles (random forests, gradient boosting) are the standard fixes. A shallow tree generalises much better than a deep one.',
      xp: 25,
    },
  ],
};