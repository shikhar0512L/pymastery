// 📊 Stats — Lesson 5: Correlation

export const statCorrelationLesson = {
  id: 'stat-correlation',
  title: 'Correlation & Causation',
  difficulty: 'beginner',
  duration: 22,
  intro:
    'Do taller people weigh more? Do more study hours lead to higher scores? Correlation measures how strongly two variables move together. But it does NOT always mean one causes the other.',

  sections: [
    {
      type: 'text',
      content:
        'A **correlation** is a number between -1 and +1 that tells you the relationship between two variables.\n\n• **+1:** Perfect positive. As X increases, Y increases.\n• **0:** No relationship. They are random.\n• **-1:** Perfect negative. As X increases, Y decreases.',
    },
    {
      type: 'math',
      latex:
        'r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2} \\sqrt{\\sum (y_i - \\bar{y})^2}}',
      caption:
        'The Pearson correlation coefficient (r). It normalizes the covariance by the standard deviations.',
    },
    {
      type: 'code',
      content: 'Correlation with NumPy:',
      code: `import numpy as np\n\n# Study hours vs Exam scores\nhours = np.array([1, 2, 3, 4, 5, 6, 7])\nscores = np.array([45, 50, 55, 65, 70, 85, 90])\n\ncorrelation_matrix = np.corrcoef(hours, scores)\nprint(f"Correlation matrix:\\n{correlation_matrix.round(3)}")\nprint(f"r = {correlation_matrix[0, 1]:.3f}")`,
      output: `Correlation matrix:\n[[1.    0.983]\n [0.983 1.   ]]\nr = 0.983`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`np.corrcoef` returns a matrix. The diagonal is always 1 (a variable is perfectly correlated with itself). The off-diagonal `[0, 1]` or `[1, 0]` is the actual correlation between X and Y. Here, 0.983 means very strong positive relationship.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Correlation Visualizer',
      description:
        'Slide to change the correlation. Watch how the points move from a perfect line to random noise.',
      sliders: [
        { id: 'r', label: 'Correlation (r)', min: -1, max: 1, step: 0.1, default: 0.9, decimals: 1 },
      ],
      render: ({ r }) => {
        // Generate points with correlation r
        const pts = [];
        for (let i = 0; i < 50; i++) {
          const x = (Math.random() - 0.5) * 10;
          // y = r * x + noise
          const noise = (Math.random() - 0.5) * 10 * Math.sqrt(1 - r * r);
          const y = r * x + noise;
          pts.push({ x, y, color: 'cyan', r: 4 });
        }
        return {
          points: pts,
          fns: [],
          domain: [-6, 6],
          range: [-6, 6],
        };
      },
      formula: ({ r }) => `\\text{Correlation } r = ${r.toFixed(1)}`,
      caption:
        'At r=1, perfect line. At r=0, random cloud. At r=-1, perfect downward line.',
    },

    // ── CAUSATION ────────────────────
    {
      type: 'text',
      content:
        'Here is the most important warning in all of statistics: **Correlation does not imply causation.**',
    },
    {
      type: 'text',
      content:
        'Classic example: Ice cream sales and drowning deaths are highly correlated. Does ice cream cause drowning? No. Both are caused by a third factor: **summer heat**. This is called a **confounding variable**.',
    },
    {
      type: 'warning',
      content:
        'Just because A and B move together, it does not mean A causes B. It could be:\n\n• B causes A (reverse causation)\n• C causes both (confounding)\n• It is a pure coincidence (spurious correlation)',
    },
    {
      type: 'tip',
      content:
        'Next: Sampling and the Central Limit Theorem. How do we trust results from just a small sample of data?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'If two variables have a correlation of -0.9, what does that mean?',
      options: [
        'No relationship.',
        'Strong positive relationship.',
        'Strong negative relationship (as one increases, the other decreases).',
        'The variables are identical.',
      ],
      correct: 2,
      explanation:
        'A correlation close to -1 means a very strong negative relationship. The sign tells you the direction, the magnitude tells you the strength.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'Ice cream sales and shark attacks are highly correlated. What is the most likely reason?',
      options: [
        'Ice cream attracts sharks.',
        'Sharks like ice cream.',
        'Both are caused by a third factor (summer weather).',
        'It is a random coincidence.',
      ],
      correct: 2,
      explanation:
        'Summer weather increases both ice cream sales (people buy more) and shark attacks (more people swim in the ocean). Temperature is the confounding variable.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question: 'Write `correlation(x, y)` that returns the Pearson correlation coefficient using NumPy.',
      starterCode:
        'import numpy as np\n\ndef correlation(x, y):\n    # your code here\n    pass',
      tests: [
        { input: 'round(correlation(np.array([1, 2, 3]), np.array([2, 4, 6])), 2)', expected: '1.0' },
        { input: 'round(correlation(np.array([1, 2, 3]), np.array([6, 4, 2])), 2)', expected: '-1.0' },
      ],
      hint: 'Use np.corrcoef and return the [0, 1] element.',
      solution:
        'import numpy as np\n\ndef correlation(x, y):\n    return np.corrcoef(x, y)[0, 1]',
      explanation:
        'If Y is exactly 2X, r=1. If Y is exactly -2X + 8, r=-1.',
      xp: 25,
    },
  ],
};