// 📊 Stats — Lesson 2: Mean, Median, Mode

export const statMeanMedianLesson = {
  id: 'stat-mean-median',
  title: 'Mean, Median & Mode',
  difficulty: 'beginner',
  duration: 22,
  intro:
    'You have 10 numbers. How do you summarize them with just ONE number? That is what mean, median, and mode do — each in a different way. Learn when to use which, because choosing wrong can mislead you.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine your class got these scores on a test: 60, 70, 70, 75, 80, 85, 85, 85, 90, 100. How would you describe the "typical" score? There is no single answer — that is why we have three different measures.',
    },

    // ── MEAN ─────────────────────────
    {
      type: 'text',
      content:
        '**1. Mean (Average)** — Add all numbers and divide by how many there are. It is the "balance point" of the data.',
    },
    {
      type: 'math',
      latex:
        '\\text{Mean} = \\bar{x} = \\frac{\\text{sum of all values}}{\\text{number of values}} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}',
      caption:
        'The most common measure of "average". Simple to compute.',
    },
    {
      type: 'code',
      content: 'Calculating mean in NumPy:',
      code: `import numpy as np\n\nscores = np.array([60, 70, 70, 75, 80, 85, 85, 85, 90, 100])\n\nmean = np.mean(scores)\nprint(f"Mean: {mean}")\n# Mean: 80.0\n\n# Manual calculation\nprint(f"Manual: {scores.sum() / len(scores)}")`,
      output: `Mean: 80.0\nManual: 80.0`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'The mean is **very sensitive to outliers**. If one student scored 1000 instead of 100, the mean shoots up to 170. The median would barely change. That is why we often prefer the median when outliers exist.',
    },

    // ── MEDIAN ───────────────────────
    {
      type: 'text',
      content:
        '**2. Median** — Sort the numbers, then pick the middle one. If there are two middle ones (even count), take their average. The median is the "50% mark".',
    },
    {
      type: 'math',
      latex:
        '\\text{Median} = \\text{middle value of the sorted data}',
      caption:
        'Half the data is below the median, half is above. Ignores outliers completely.',
    },
    {
      type: 'code',
      content: 'Calculating median:',
      code: `import numpy as np\n\nscores = np.array([60, 70, 70, 75, 80, 85, 85, 85, 90, 100])\n\nmedian = np.median(scores)\nprint(f"Median: {median}")\n# Sorted: [60, 70, 70, 75, 80, 85, 85, 85, 90, 100]\n# Two middle values: 80, 85 → average = 82.5`,
      output: `Median: 82.5`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Median is much more robust to outliers than the mean. This is why income statistics always quote the median income — a few billionaires would otherwise dominate the mean and make it look like everyone is rich.',
    },

    // ── MODE ─────────────────────────
    {
      type: 'text',
      content:
        '**3. Mode** — The most frequently occurring value. Useful for categorical data like "most common color", "most selected answer".',
    },
    {
      type: 'code',
      content: 'Calculating mode:',
      code: `from collections import Counter\n\nvotes = ["pizza", "burger", "pizza", "pasta", "pizza", "burger"]\ncounts = Counter(votes)\nprint(counts.most_common(1))\n# [('pizza', 3)]`,
      output: `[('pizza', 3)]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'A dataset can have **multiple modes**. If two values occur equally often, it is bimodal. If none repeat, there is no mode. The mean and median are always unique, but the mode is not.',
    },

    // ── WHICH ONE? ───────────────────
    {
      type: 'text',
      content:
        'Here is the guide:\n\n• **Mean** — Best when the data is symmetric and no outliers. Most mathematical formulas use the mean.\n• **Median** — Best when data has outliers. Income, house prices, test scores with one weird student.\n• **Mode** — Best for categories (colors, names, choices). Not for continuous numbers.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Mean vs Median with an Outlier',
      description:
        'Adjust the outlier and see how the mean shifts but the median stays stable.',
      sliders: [
        { id: 'outlier', label: 'Outlier value', min: 50, max: 500, step: 10, default: 100, decimals: 0 },
      ],
      render: ({ outlier }) => {
        const base = [60, 70, 70, 75, 80, 85, 85, 85, 90];
        const values = [...base, outlier];
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const sorted = [...values].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];
        
        return {
          points: [
            { x: 0, y: 0, color: 'rose', r: 8, label: `Outlier: ${outlier}` },
            { x: 1, y: mean / 10, color: 'cyan', r: 10, label: `Mean: ${mean.toFixed(1)}` },
            { x: 2, y: median / 10, color: 'emerald', r: 10, label: `Median: ${median.toFixed(1)}` },
          ],
          domain: [-0.5, 2.5],
          range: [-0.5, 55],
          fns: [],
        };
      },
      formula: ({ outlier }) => {
        const base = [60, 70, 70, 75, 80, 85, 85, 85, 90];
        const values = [...base, outlier];
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const sorted = [...values].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];
        return `\\text{Mean} = ${mean.toFixed(1)},\\;\\; \\text{Median} = ${median.toFixed(1)}`;
      },
      caption:
        'As the outlier grows, the mean keeps climbing. The median barely moves. That is why median is used for "typical" values.',
    },

    // ── REAL EXAMPLE ─────────────────
    {
      type: 'text',
      content:
        'Here is a real example. Imagine 5 employees at a company, and salaries are: 30k, 35k, 40k, 45k, and 10 lakh (CEO).',
    },
    {
      type: 'code',
      content: 'Employee salaries:',
      code: `import numpy as np\n\nsalaries = np.array([30000, 35000, 40000, 45000, 1000000])\nprint(f"Mean: {np.mean(salaries):,.0f}")\nprint(f"Median: {np.median(salaries):,.0f}")\n# Mean: 230,000\n# Median: 40,000`,
      output: `Mean: 230,000\nMedian: 40,000`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The mean is 230,000 — that does not describe a "typical" employee at all. The median (40,000) is much more honest. **This is exactly how companies mislead with "average salary" numbers.** Now you know to ask for the median.',
    },
    {
      type: 'tip',
      content:
        'Next: Variance and Standard Deviation. How do we measure how SPREAD OUT the data is? Because "average 80" does not tell you if everyone got 80 or if half got 100 and half got 60.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question: 'What is the mean of the values [2, 4, 6, 8, 10]?',
      correct: 6,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Sum = 30, count = 5.',
      explanation: '(2 + 4 + 6 + 8 + 10) / 5 = 30 / 5 = 6.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'What is the median of [1, 3, 5, 7, 9, 11]?',
      correct: 6,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Even count (6 values). Average the two middle ones.',
      explanation:
        'Sorted: 1, 3, 5, 7, 9, 11. Middle two are 5 and 7. Average = 6.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'You have house prices: [40L, 50L, 55L, 60L, 5Cr]. Which measure best describes a "typical" house price?',
      options: [
        'Mean',
        'Median',
        'Mode',
        'Range',
      ],
      correct: 1,
      explanation:
        'The 5 Cr house is an outlier. The mean is skewed upward. The median (55L) is much more representative of a typical house.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write `mean_median(arr)` that returns a tuple (mean, median) of a NumPy array.',
      starterCode:
        'import numpy as np\n\ndef mean_median(arr):\n    # your code here\n    pass',
      tests: [
        { input: 'mean_median(np.array([1, 2, 3, 4, 5]))', expected: '(3.0, 3.0)' },
        { input: 'mean_median(np.array([2, 4, 6, 8]))', expected: '(5.0, 5.0)' },
        { input: 'mean_median(np.array([1, 2, 3]))', expected: '(2.0, 2.0)' },
      ],
      hint: 'Use np.mean and np.median. Return as a tuple.',
      solution:
        'import numpy as np\n\ndef mean_median(arr):\n    return (float(np.mean(arr)), float(np.median(arr)))',
      explanation:
        'Both functions return NumPy floats. Casting to float for clean output.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'output-match',
      question:
        'Find the mode of the list ["a", "b", "b", "c", "b", "a"]. Print it.',
      starterCode: 'from collections import Counter\n# your code here\n',
      expectedOutput: 'b',
      hint: 'Use Counter.most_common(1)[0][0].',
      solution:
        'from collections import Counter\nitems = ["a", "b", "b", "c", "b", "a"]\nprint(Counter(items).most_common(1)[0][0])',
      explanation:
        '"b" occurs 3 times, more than any other value.',
      xp: 20,
    },
  ],
};