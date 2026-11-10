// 📊 Stats — Lesson 3: Variance & Standard Deviation

export const statVarianceLesson = {
  id: 'stat-variance',
  title: 'Variance & Standard Deviation',
  difficulty: 'beginner',
  duration: 22,
  intro:
    'Two classes both scored a mean of 80. But in one class, everyone got between 78 and 82. In the other, half got 100 and half got 60. Same mean, completely different data. This is why we need variance.',

  sections: [
    {
      type: 'text',
      content:
        'Mean tells you where the data is centered. But it does not tell you how spread out it is. Two datasets can have the same mean but look wildly different. We need a number to measure "spread".',
    },
    {
      type: 'note',
      content:
        'Variance and standard deviation are the two standard measures of spread. Standard deviation is just the square root of variance. Why have both? Variance has nice math properties, but standard deviation has nice real-world meaning (same units as data).',
    },

    // ── THE PROBLEM ──────────────────
    {
      type: 'text',
      content:
        'You cannot just take "the average of how far each value is from the mean". Why? Because some are above the mean (positive distance) and some below (negative distance). They cancel out. Always giving you zero.',
    },
    {
      type: 'math',
      latex:
        '\\frac{1}{n} \\sum (x_i - \\bar{x}) = 0',
      caption:
        'Positive and negative deviations always cancel. Useless.',
    },
    {
      type: 'text',
      content:
        'The fix: **square each deviation first**. Negative numbers become positive. Then average the squares. That is variance.',
    },

    // ── VARIANCE ─────────────────────
    {
      type: 'math',
      latex:
        '\\sigma^2 = \\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\bar{x})^2',
      caption:
        'Variance = average of squared deviations from the mean.',
    },
    {
      type: 'code',
      content: 'Calculating variance manually:',
      code: `import numpy as np\n\nvalues = np.array([2, 4, 4, 4, 5, 5, 7, 9])\nmean = values.mean()\n\n# Manual: average of squared deviations\nsq_diff = (values - mean) ** 2\nvariance = sq_diff.mean()\nprint(f"Manual variance: {variance}")\n\n# Using NumPy\nprint(f"NumPy variance: {values.var()}")`,
      output: `Manual variance: 4.0\nNumPy variance: 4.0`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'There is a subtle gotcha. NumPy uses the **population** variance by default (divide by n). Many textbooks teach **sample** variance (divide by n-1). For large datasets the difference is tiny. For small datasets it matters. We will use population variance for simplicity.',
    },

    // ── STANDARD DEVIATION ───────────
    {
      type: 'text',
      content:
        'Variance is in **squared units**. If your data is in rupees, variance is in "rupees squared" — not meaningful. So we take the square root of variance. This is standard deviation.',
    },
    {
      type: 'math',
      latex:
        '\\sigma = \\sqrt{\\sigma^2} = \\sqrt{\\frac{1}{n} \\sum (x_i - \\bar{x})^2}',
      caption:
        'Standard deviation: same units as the data. Easy to interpret.',
    },
    {
      type: 'code',
      content: 'Standard deviation:',
      code: `import numpy as np\n\nvalues = np.array([2, 4, 4, 4, 5, 5, 7, 9])\n\nprint(f"Variance: {values.var():.2f}")\nprint(f"Standard deviation: {values.std():.2f}")`,
      output: `Variance: 4.00\nStandard deviation: 2.00`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'A rough rule of thumb: for normally distributed data, about **68% of values fall within 1 standard deviation** of the mean, **95% within 2**, and **99.7% within 3**. This is called the "empirical rule" and it appears everywhere.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Same Mean, Different Spread',
      description:
        'Both distributions have the same mean (50). But one is tight and one is spread out. Watch how standard deviation changes.',
      sliders: [
        { id: 'spread', label: 'Spread (standard deviation)', min: 1, max: 20, step: 1, default: 5, decimals: 0 },
      ],
      render: ({ spread }) => {
        // Generate 100 points centered at 50 with given spread
        const pts = [];
        for (let i = 0; i < 100; i++) {
          const x = 50 + (Math.random() - 0.5) * spread * 6;
          pts.push({ x, y: Math.random(), color: 'cyan', r: 3 });
        }
        return {
          points: pts,
          fns: [
            { fn: () => 0.5, color: 'rose', label: `Mean = 50` },
          ],
          domain: [-10, 110],
          range: [-0.2, 1.2],
        };
      },
      formula: ({ spread }) =>
        `\\text{Standard Deviation} = ${spread}`,
      caption:
        'Tight cluster = small standard deviation. Spread out = large standard deviation. Both centers are at 50.',
    },

    // ── WHY IT MATTERS ───────────────
    {
      type: 'text',
      content:
        'Why do we care about spread?\n\n• **Risk analysis:** Two stocks both returned 10% on average. But one is stable, one swings wildly. Standard deviation tells you which.\n• **Quality control:** A factory produces bolts with mean length 5cm. Small std = all bolts are similar. Large std = some are way too long or short.\n• **ML:** Every model has an error. Standard deviation of errors tells you how reliable the model is.',
    },
    {
      type: 'tip',
      content:
        'Next: Probability basics. Before we can talk about distributions, we need to understand what probability even means.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question: 'What is the variance of [2, 4, 6, 8, 10]?',
      correct: 8,
      tolerance: 0.01,
      placeholder: 'e.g. 8',
      hint: 'Mean = 6. Deviations = [-4, -2, 0, 2, 4]. Square = [16, 4, 0, 4, 16]. Average = 40/5 = 8.',
      explanation:
        'Mean = 6. Squared deviations: [16, 4, 0, 4, 16]. Sum = 40. Average = 8.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'What is the standard deviation of the same dataset?',
      correct: 2.83,
      tolerance: 0.01,
      placeholder: 'e.g. 2.83',
      hint: 'Standard deviation = sqrt(variance) = sqrt(8).',
      explanation:
        'Standard deviation = √8 ≈ 2.83. It is in the same units as the original data.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Two datasets both have mean 50. Dataset A has std 5, Dataset B has std 20. Which is more spread out?',
      options: [
        'Dataset A',
        'Dataset B',
        'Both are equally spread',
        'Cannot tell',
      ],
      correct: 1,
      explanation:
        'Higher standard deviation = more spread. Dataset B has 4x the spread.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write `spread(arr)` that returns a tuple (variance, std) of a NumPy array.',
      starterCode:
        'import numpy as np\n\ndef spread(arr):\n    # your code here\n    pass',
      tests: [
        { input: 'spread(np.array([1, 1, 1, 1]))', expected: '(0.0, 0.0)' },
        { input: 'spread(np.array([1, 3]))', expected: '(1.0, 1.0)' },
      ],
      hint: 'Use arr.var() and arr.std().',
      solution:
        'import numpy as np\n\ndef spread(arr):\n    return (float(arr.var()), float(arr.std()))',
      explanation:
        'NumPy has `.var()` and `.std()` built in. All data the same → zero spread.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question: 'Why do we square the deviations before averaging?',
      options: [
        'To make numbers bigger',
        'Because positive and negative deviations would cancel out otherwise',
        'Because squares are prettier',
        'Because it is faster',
      ],
      correct: 1,
      explanation:
        'Without squaring, positive and negative deviations cancel each other, and the average is always zero. Squaring makes them all positive.',
      xp: 20,
    },
  ],
};