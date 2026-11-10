// 📊 Stats — Lesson 4: Percentiles & IQR

export const statPercentilesLesson = {
  id: 'stat-percentiles',
  title: 'Percentiles, Quartiles & Outliers',
  difficulty: 'beginner',
  duration: 20,
  intro:
    'Mean and median give you the center. But what if you want to know where a specific value ranks? "Is my score in the top 10%?" That is what percentiles answer.',

  sections: [
    {
      type: 'text',
      content:
        'A **percentile** tells you what percentage of the data falls below a certain value. If your score is in the 90th percentile, it means you scored better than 90% of the people.',
    },
    {
      type: 'note',
      content:
        'The **median** is exactly the 50th percentile — half the data is below it, half is above it. The **25th percentile** (called Q1) means 25% of values are below it. The **75th percentile** (Q3) means 75% of values are below it.',
    },

    // ── QUARTILES ────────────────────
    {
      type: 'text',
      content:
        'When we split the data into four equal parts, we get **quartiles**:\n\n• **Q1 (25th percentile):** 25% of data is below this.\n• **Q2 (50th percentile):** The median.\n• **Q3 (75th percentile):** 75% of data is below this.',
    },
    {
      type: 'math',
      latex:
        '\\text{IQR} = Q3 - Q1',
      caption:
        'The Interquartile Range (IQR) is the spread of the middle 50% of the data.',
    },
    {
      type: 'code',
      content: 'Percentiles with NumPy:',
      code: `import numpy as np\n\nscores = np.array([55, 60, 65, 70, 75, 80, 85, 90, 95, 100])\n\nprint(f"Q1 (25%): {np.percentile(scores, 25)}")\nprint(f"Median (50%): {np.percentile(scores, 50)}")\nprint(f"Q3 (75%): {np.percentile(scores, 75)}")\nprint(f"90th percentile: {np.percentile(scores, 90)}")\n\nq1 = np.percentile(scores, 25)\nq3 = np.percentile(scores, 75)\nprint(f"IQR: {q3 - q1}")`,
      output: `Q1 (25%): 66.25\nMedian (50%): 77.5\nQ3 (75%): 88.75\n90th percentile: 95.5\nIQR: 22.5`,
      language: 'python',
    },

    // ── OUTLIER DETECTION ────────────
    {
      type: 'text',
      content:
        'IQR is extremely useful for **detecting outliers**. The rule is:\n\n• Any value below `Q1 - 1.5 × IQR` is a low outlier.\n• Any value above `Q3 + 1.5 × IQR` is a high outlier.',
    },
    {
      type: 'math',
      latex:
        '\\text{Outlier if } x < Q1 - 1.5 \\cdot \\text{IQR} \\;\\; \\text{or} \\;\\; x > Q3 + 1.5 \\cdot \\text{IQR}',
      caption:
        'The famous 1.5 IQR rule used in box plots.',
    },
    {
      type: 'code',
      content: 'Detecting outliers:',
      code: `import numpy as np\n\ndata = np.array([10, 12, 14, 15, 16, 18, 20, 22, 100])\n\nq1 = np.percentile(data, 25)\nq3 = np.percentile(data, 75)\niqr = q3 - q1\nlower = q1 - 1.5 * iqr\nupper = q3 + 1.5 * iqr\n\noutliers = data[(data < lower) | (data > upper)]\nprint(f"Outliers: {outliers}")`,
      output: `Outliers: [100]`,
      language: 'python',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Box Plot & Outliers',
      description:
        'This is a box plot. The box shows Q1 to Q3 (the middle 50%). The lines extend to the min/max within 1.5 IQR. Points beyond are outliers.',
      sliders: [
        { id: 'outlier', label: 'Add an extreme outlier (value)', min: 50, max: 200, step: 10, default: 100, decimals: 0 },
      ],
      render: ({ outlier }) => {
        const base = [20, 25, 30, 35, 40, 45, 50];
        const data = [...base, outlier].sort((a,b) => a-b);
        const q1 = data[Math.floor(data.length * 0.25)];
        const q3 = data[Math.floor(data.length * 0.75)];
        const iqr = q3 - q1;
        const upper = q3 + 1.5 * iqr;
        
        return {
          points: data.map((v, i) => ({
            x: v,
            y: i % 2 === 0 ? 0.5 : 0.7, // spread them out a bit
            color: v > upper ? 'rose' : 'cyan',
            r: v > upper ? 8 : 5,
            label: v > upper ? `${v} (Outlier)` : ''
          })),
          fns: [
            { fn: (x) => x === q1 ? 1 : NaN, color: 'emerald', label: 'Q1' },
            { fn: (x) => x === q3 ? 1 : NaN, color: 'emerald', label: 'Q3' },
          ],
          domain: [10, 210],
          range: [0, 1.2],
        };
      },
      formula: ({ outlier }) => {
        const base = [20, 25, 30, 35, 40, 45, 50];
        const data = [...base, outlier].sort((a,b) => a-b);
        const q1 = data[Math.floor(data.length * 0.25)];
        const q3 = data[Math.floor(data.length * 0.75)];
        const upper = q3 + 1.5 * (q3 - q1);
        return `\\text{Upper bound for outliers} = ${upper.toFixed(1)}`;
      },
      caption:
        'Move the slider to increase the outlier. When it exceeds the upper bound, it turns red.',
    },

    {
      type: 'tip',
      content:
        'If your salary is in the 99th percentile, you earn more than 99% of people. Next time you see "top 1%", you now know it is literally the 99th percentile.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does the 75th percentile mean?',
      options: [
        '75% of the data is above this value.',
        '75% of the data is below this value.',
        'The average of the data is 75.',
        'The maximum value is 75.',
      ],
      correct: 1,
      explanation:
        'The 75th percentile is the value below which 75% of the data falls.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'If Q1 = 20 and Q3 = 40, what is the IQR?',
      correct: 20,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'IQR = Q3 - Q1.',
      explanation: 'IQR = 40 - 20 = 20.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write `find_outliers(data)` that returns a list of values outside 1.5 * IQR from Q1/Q3.',
      starterCode:
        'import numpy as np\n\ndef find_outliers(data):\n    # your code here\n    pass',
      tests: [
        { input: 'find_outliers(np.array([1, 2, 3, 4, 100])).tolist()', expected: '[100]' },
        { input: 'find_outliers(np.array([1, 2, 3, 4, 5])).tolist()', expected: '[]' },
      ],
      hint: 'Calculate Q1, Q3, IQR. Then filter data < Q1 - 1.5*IQR or > Q3 + 1.5*IQR.',
      solution:
        'import numpy as np\n\ndef find_outliers(data):\n    q1 = np.percentile(data, 25)\n    q3 = np.percentile(data, 75)\n    iqr = q3 - q1\n    return data[(data < q1 - 1.5 * iqr) | (data > q3 + 1.5 * iqr)]',
      explanation:
        'This is the standard outlier detection method used in box plots.',
      xp: 30,
    },
  ],
};