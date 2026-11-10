// 🎲 Probability — Lesson 7: The Normal Distribution

export const probNormalLesson = {
  id: 'prob-normal',
  title: 'The Normal Distribution — The Bell Curve',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'The Normal Distribution (also called the Gaussian or bell curve) is the most important probability distribution in the world. Heights, test scores, measurement errors, and even the pixels in an image all follow this shape.',

  sections: [
    {
      type: 'text',
      content:
        'The Normal Distribution is a continuous, symmetric bell-shaped curve. It is defined by two parameters:\n\n• **Mean (μ):** Where the center is.\n• **Standard Deviation (σ):** How wide the bell is.',
    },
    {
      type: 'math',
      latex:
        'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2} \\left( \\frac{x - \\mu}{\\sigma} \\right)^2}',
      caption:
        'The scary-looking formula. Do not memorize it. Just remember the shape — a symmetric bell centered at μ.',
    },

    // ── THE 68-95-99.7 RULE ──────────
    {
      type: 'text',
      content:
        'The Normal Distribution has a magical property called the **Empirical Rule** (or 68-95-99.7 rule):\n\n• **68%** of data falls within 1 standard deviation of the mean.\n• **95%** within 2 standard deviations.\n• **99.7%** within 3 standard deviations.',
    },
    {
      type: 'math',
      latex:
        'P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 0.68',
      caption:
        'That is the 1-sigma interval.',
    },
    {
      type: 'code',
      content: 'Checking the empirical rule:',
      code: `import numpy as np\n\n# Generate 100,000 samples from a normal distribution\n# Mean 50, std 10\ndata = np.random.normal(loc=50, scale=10, size=100000)\n\n# Check the percentages\nwithin_1_sigma = ((data > 40) & (data < 60)).mean()\nwithin_2_sigma = ((data > 30) & (data < 70)).mean()\nwithin_3_sigma = ((data > 20) & (data < 80)).mean()\n\nprint(f"68% rule: {within_1_sigma:.3f}")\nprint(f"95% rule: {within_2_sigma:.3f}")\nprint(f"99.7% rule: {within_3_sigma:.3f}")`,
      output: `68% rule: 0.683\n95% rule: 0.954\n99.7% rule: 0.997`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'This is why the bell curve is so useful. If you know the mean and standard deviation, you immediately know exactly where 95% of the data lies.',
    },

    // ── Z-SCORES ─────────────────────
    {
      type: 'text',
      content:
        'A **Z-score** tells you how many standard deviations a value is from the mean.',
    },
    {
      type: 'math',
      latex:
        'z = \\frac{x - \\mu}{\\sigma}',
      caption:
        'Z-score formula. A z-score of 2 means the value is 2 standard deviations above the mean.',
    },
    {
      type: 'code',
      content: 'Calculating Z-scores:',
      code: `# If a test has mean 75 and standard deviation 10,\n# what is the z-score for a score of 90?\n\nmu = 75\nsigma = 10\nx = 90\n\nz = (x - mu) / sigma\nprint(f"Z-score: {z}")  # 1.5`,
      output: `Z-score: 1.5`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'A z-score of 1.5 means the score is 1.5 standard deviations above the mean. Since 68% of scores are within ±1 standard deviation, a z-score of 1.5 is better than about 93% of students.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'The Normal Distribution',
      description:
        'Change the mean and standard deviation. See how the bell curve moves and stretches.',
      sliders: [
        { id: 'mu', label: 'Mean (μ)', min: -10, max: 10, step: 1, default: 0, decimals: 0 },
        { id: 'sigma', label: 'Std Dev (σ)', min: 1, max: 5, step: 0.5, default: 1, decimals: 1 },
      ],
      render: ({ mu, sigma }) => {
        // Generate normal curve
        const fn = (x) => {
          return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
        };
        return {
          fns: [
            { fn, color: 'cyan', label: `N(μ=${mu}, σ=${sigma})` },
          ],
          domain: [-15, 15],
          range: [-0.05, 0.8],
        };
      },
      formula: ({ mu, sigma }) =>
        `\\text{Mean} = ${mu},\\;\\; \\text{Std Dev} = ${sigma}`,
      caption:
        'μ shifts the curve left and right. σ makes the curve wider or narrower.',
    },
    {
      type: 'tip',
      content:
        'Next: The Capstone. We will use probability to solve a real-world problem.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'In a normal distribution, what percentage of data falls within 2 standard deviations of the mean?',
      options: ['50%', '68%', '95%', '99.7%'],
      correct: 2,
      explanation: 'The empirical rule states that ~95% of data falls within 2 standard deviations.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'A dataset has mean 100 and standard deviation 15. What is the z-score for a value of 130?',
      correct: 2,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'z = (x - mean) / std = (130 - 100) / 15.',
      explanation: '(130 - 100) / 15 = 30 / 15 = 2. The value is 2 standard deviations above the mean.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question: 'Write `z_score(x, mu, sigma)` that returns the z-score.',
      starterCode:
        'def z_score(x, mu, sigma):\n    # your code here\n    pass',
      tests: [
        { input: 'z_score(130, 100, 15)', expected: '2.0' },
        { input: 'z_score(70, 100, 15)', expected: '-2.0' },
      ],
      hint: '(x - mu) / sigma.',
      solution: 'def z_score(x, mu, sigma):\n    return (x - mu) / sigma',
      explanation: 'A negative z-score means the value is below the mean.',
      xp: 25,
    },
  ],
};