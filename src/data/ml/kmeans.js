// 🤖 ML — Lesson 10: k-Means Clustering

export const mlKmeansLesson = {
  id: 'ml-kmeans',
  title: 'Clustering — Finding Groups Without Labels',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Up to now, every algorithm needed labels. Unsupervised learning works without them — the model finds structure on its own. k-Means is the classic algorithm for discovering groups.',

  sections: [
    {
      type: 'text',
      content:
        'All lessons so far have been **supervised** — we had labels telling the model the right answer. But labels are expensive. What if you have a million customer records and no idea how to segment them?',
    },
    {
      type: 'text',
      content:
        'This is where **unsupervised learning** comes in. Instead of being told the answers, the algorithm discovers structure in the data on its own.',
    },
    {
      type: 'note',
      content:
        'Clustering is the most common unsupervised task: given unlabeled data, group similar examples together. Used for customer segmentation, document grouping, image compression, anomaly detection, and much more.',
    },

    // ── THE ALGORITHM ────────────────
    {
      type: 'text',
      content:
        'k-Means is simple. You choose the number of clusters $k$. The algorithm alternates between two steps until the clusters stop changing.',
    },
    {
      type: 'text',
      content:
        '• **1. Initialize.** Pick $k$ random points as the initial "centroids" (cluster centers).\n• **2. Assign.** Each data point joins the nearest centroid.\n• **3. Update.** Recompute each centroid as the mean of the points assigned to it.\n• **4. Repeat.** Steps 2 and 3 until clusters stop changing.',
    },
    {
      type: 'math',
      latex:
        'c_i = \\frac{1}{|S_i|} \\sum_{x \\in S_i} x',
      caption:
        'Each centroid is updated to the mean of the points assigned to its cluster.',
    },

    // ── VISUAL ───────────────────────
    {
      type: 'simulation',
      title: 'Watch k-Means converge',
      description:
        'Move the slider to advance through iterations. Watch the centroids move and the clusters stabilize.',
      sliders: [
        { id: 'iterations', label: '\\text{iteration}', min: 0, max: 6, step: 1, default: 1, decimals: 0 },
      ],
      render: ({ iterations }) => {
        // Fixed data points
        const dataPts = [
          { x: 1, y: 1 }, { x: 1.2, y: 1.3 }, { x: 0.8, y: 1.1 }, { x: 1.5, y: 1.5 },
          { x: 4, y: 1 }, { x: 4.2, y: 1.2 }, { x: 3.8, y: 0.8 }, { x: 4.1, y: 1.4 },
          { x: 2.5, y: 3.5 }, { x: 2.7, y: 3.7 }, { x: 2.4, y: 3.4 }, { x: 2.6, y: 3.8 },
        ];
        // Simulate k-means with 3 clusters
        let centroids = [{ x: 0.5, y: 2 }, { x: 3.5, y: 2 }, { x: 2.5, y: 4.5 }];
        for (let iter = 0; iter < iterations; iter++) {
          const clusters = [[], [], []];
          for (const p of dataPts) {
            let best = 0, bestD = Infinity;
            centroids.forEach((c, i) => {
              const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
              if (d < bestD) { bestD = d; best = i; }
            });
            clusters[best].push(p);
          }
          centroids = clusters.map((cl, i) => {
            if (!cl.length) return centroids[i];
            return {
              x: cl.reduce((a, p) => a + p.x, 0) / cl.length,
              y: cl.reduce((a, p) => a + p.y, 0) / cl.length,
            };
          });
        }
        // Assign points to colors
        const colored = dataPts.map((p) => {
          let best = 0, bestD = Infinity;
          centroids.forEach((c, i) => {
            const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
            if (d < bestD) { bestD = d; best = i; }
          });
          return { x: p.x, y: p.y, color: ['brand', 'emerald', 'violet'][best], r: 6 };
        });
        return {
          points: [
            ...colored,
            ...centroids.map((c, i) => ({ x: c.x, y: c.y, color: ['rose', 'cyan', 'amber'][i], r: 10 })),
          ],
          domain: [-0.5, 5.5],
          range: [-0.5, 5],
        };
      },
      formula: ({ iterations }) => `\\text{iterations completed: } ${iterations}`,
      caption:
        'The large colored dots are centroids. At iteration 0 they start in random positions; each iteration they snap to the mean of their assigned points. By iteration 3 or 4 they stabilise.',
    },

    // ── CHOOSING K ───────────────────
    {
      type: 'text',
      content:
        'One big question: how do you know how many clusters there are? You have to choose $k$.',
    },
    {
      type: 'text',
      content:
        'The most common technique is the **elbow method**. Run k-Means for a range of $k$ values (say 1 to 10), and plot the total distance from points to their centroids. As $k$ increases, this distance always decreases — but the rate of improvement drops sharply at the "right" $k$.',
    },
    {
      type: 'graph',
      title: 'The elbow plot',
      fns: [
        { fn: (k) => 100 / k + 5, color: 'cyan', label: 'total distance to centroids', strokeWidth: 2.5 },
      ],
      points: [
        { x: 3, y: 100 / 3 + 5, color: 'brand', r: 8, label: 'elbow (k=3)' },
      ],
      domain: [0.5, 10.5],
      range: [0, 100],
      caption:
        'Total within-cluster distance vs k. It always decreases, but the rate slows dramatically after k = 3. That is the "elbow" — a good default choice for k.',
    },
    {
      type: 'note',
      content:
        'The elbow method is heuristic — it does not always give a clear answer. Other options: silhouette score (measures cluster separation), or domain knowledge (e.g., you know you have 4 customer tiers).',
    },

    // ── CODE EXAMPLE ─────────────────
    {
      type: 'code',
      content: 'k-Means from scratch:',
      code: `import numpy as np\n\nnp.random.seed(42)\n\n# Random 2D data\nX = np.vstack([\n    np.random.randn(50, 2) + [0, 0],\n    np.random.randn(50, 2) + [5, 5],\n    np.random.randn(50, 2) + [0, 5],\n])\n\nk = 3\nn_iter = 20\n\n# 1. Initialize centroids randomly from the data\nidx = np.random.choice(len(X), k, replace=False)\ncentroids = X[idx].copy()\n\nfor it in range(n_iter):\n    # 2. Assign each point to nearest centroid\n    distances = np.linalg.norm(X[:, None, :] - centroids[None, :, :], axis=2)\n    labels = distances.argmin(axis=1)\n    \n    # 3. Update centroids to mean of assigned points\n    for i in range(k):\n        if (labels == i).any():\n            centroids[i] = X[labels == i].mean(axis=0)\n\nprint("Final centroids:")\nprint(centroids.round(2))\nprint("Cluster sizes:", [np.sum(labels == i) for i in range(k)])`,
      output: `Final centroids:\n[[-0.06 -0.11]\n [ 0.03  5.06]\n [ 5.01  4.98]]\nCluster sizes: [50, 50, 50]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'The algorithm recovered the three true clusters exactly — the centroids landed on (0, 0), (0, 5), and (5, 5), the three places we generated data from. Nobody told the algorithm this; it discovered the structure on its own.',
    },

    // ── LIMITATIONS ──────────────────
    {
      type: 'text',
      content:
        'k-Means is fast and intuitive, but it has limits:',
    },
    {
      type: 'text',
      content:
        '• **You must choose k upfront.** No automatic detection.\n• **Assumes spherical clusters.** Fails on elongated or crescent-shaped clusters.\n• **Sensitive to initialization.** Different random starting points → different results.\n• **Sensitive to outliers.** Centroids get pulled toward extremes.\n• **Sensitive to feature scales.** Same scaling issue as k-NN.',
    },
    {
      type: 'warning',
      content:
        'Because k-Means is sensitive to initialization, the standard trick is to run it multiple times with different random starting centroids and pick the best result. The `k-means++` initialization is even better — it spreads initial centroids out instead of picking them randomly.',
    },

    // ── APPLICATIONS ─────────────────
    {
      type: 'text',
      content:
        'Real-world applications of clustering:',
    },
    {
      type: 'text',
      content:
        '• **Customer segmentation** — group users by behaviour for targeted marketing.\n• **Image compression** — reduce an image to a few cluster colours (colour quantisation).\n• **Document grouping** — cluster similar news articles, emails, or search results.\n• **Anomaly detection** — points far from any cluster are anomalies.\n• **Feature engineering** — use cluster labels as extra features for a supervised model.',
    },
    {
      type: 'note',
      content:
        'Clustering is often a preprocessing step. You cluster first to discover structure, then train a supervised model on top — using the cluster assignments as additional features. This is powerful when you have domain knowledge that "these types of things behave differently".',
    },

    // ── COMPARISON ───────────────────
    {
      type: 'text',
      content:
        'Quick comparison of the three big unsupervised techniques you will meet:',
    },
    {
      type: 'text',
      content:
        '• **k-Means** — partitions data into k spherical clusters.\n• **DBSCAN** — finds clusters of any shape, and marks outliers as noise.\n• **Hierarchical clustering** — builds a tree of nested clusters, giving you many levels at once.',
    },
    {
      type: 'tip',
      content:
        'That is unsupervised learning in one lesson. Next: feature engineering — the practical art that often matters more than which algorithm you choose.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is clustering?',
      options: [
        'Predicting a label from features.',
        'Grouping similar data points together without labels.',
        'Training with gradient descent.',
        'Removing outliers from data.',
      ],
      correct: 1,
      explanation:
        'Clustering is unsupervised — no labels are used. The algorithm discovers groups ("clusters") of similar points on its own.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'In k-Means, what is a "centroid"?',
      options: [
        'A random data point.',
        'The mean position of all points assigned to a cluster.',
        'The label of a cluster.',
        'The maximum value in a cluster.',
      ],
      correct: 1,
      explanation:
        'A centroid is the center of a cluster — computed as the mean of all points assigned to it. Each iteration, centroids move to reflect the current cluster assignments.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'What are the two main steps of k-Means?',
      options: [
        'Forward pass and backward pass.',
        'Assign points to nearest centroid, then move each centroid to the mean of its points.',
        'Add points and remove points.',
        'Compute gradients and update weights.',
      ],
      correct: 1,
      explanation:
        'k-Means alternates between (1) assigning every point to its nearest centroid, and (2) updating each centroid to the mean of its assigned points. Repeat until convergence.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'What does the "elbow method" help with?',
      options: [
        'Choosing the right number of clusters k.',
        'Speeding up the algorithm.',
        'Handling outliers.',
        'Normalizing features.',
      ],
      correct: 0,
      explanation:
        'The elbow method plots total within-cluster distance vs. k. The "elbow" — where the improvement suddenly slows — suggests a good value for k.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which type of cluster shape does k-Means handle poorly?',
      options: [
        'Spherical clusters.',
        'Well-separated clusters.',
        'Elongated or crescent-shaped clusters.',
        'Clusters of equal size.',
      ],
      correct: 2,
      explanation:
        'k-Means assumes clusters are roughly spherical (because it uses distance to a centroid). For non-spherical shapes, algorithms like DBSCAN work better.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Why is k-Means sensitive to initialization?',
      options: [
        'Because the algorithm always finds the global optimum.',
        'Because different starting centroids can lead to different final clusters.',
        'Because random seeds affect the feature values.',
        'Because the algorithm uses gradient descent.',
      ],
      correct: 1,
      explanation:
        'k-Means is not guaranteed to find the global optimum. Different initial centroids can lead to different local optima. Running with multiple restarts (or using k-means++ initialization) mitigates this.',
      xp: 30,
    },
  ],
};