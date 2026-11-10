// 🎲 Probability — Lesson 6: Distributions (Uniform & Binomial)

export const probDistributionsLesson = {
  id: 'prob-distributions',
  title: 'Probability Distributions',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'A probability distribution is a list or formula that gives the probability of each possible outcome. In this lesson, we will meet two of the most common ones: the Uniform and the Binomial.',

  sections: [
    {
      type: 'text',
      content:
        'Different situations produce different distributions. If you know the distribution, you can compute probabilities instantly without simulating thousands of times.',
    },

    // ── UNIFORM ──────────────────────
    {
      type: 'text',
      content:
        '**1. Uniform Distribution:** Every outcome is equally likely. Example: rolling a fair die. All 6 outcomes have probability 1/6. A coin flip is uniform (0.5 and 0.5).',
    },
    {
      type: 'math',
      latex:
        'P(x) = \\frac{1}{n} \\quad \\text{for all } n \\text{ outcomes}',
      caption: 'Uniform means "flat" probability. No outcome is favored.',
    },
    {
      type: 'code',
      content: 'Simulating uniform data:',
      code: `import numpy as np\nimport matplotlib.pyplot as plt\n\n# 10,000 rolls of a fair die\nrolls = np.random.randint(1, 7, size=10000)\n\n# Each number should appear ~1667 times\nunique, counts = np.unique(rolls, return_counts=True)\nprint(dict(zip(unique, counts)))`,
      output: `{1: 1682, 2: 1659, 3: 1643, 4: 1698, 5: 1657, 6: 1661}`,
      language: 'python',
    },

    // ── BINOMIAL ─────────────────────
    {
      type: 'text',
      content:
        '**2. Binomial Distribution:** The number of "successes" in a fixed number of independent trials, where each trial has the same probability `p` of success.',
    },
    {
      type: 'text',
      content:
        'Examples:\n\n• Flip a coin 10 times. X = number of heads. (n=10, p=0.5)\n• Shoot 20 free throws. X = number of hits. (n=20, p=0.7)\n• Survey 100 people. X = number who say "yes". (n=100, p=0.4)',
    },
    {
      type: 'math',
      latex:
        'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
      caption:
        'The Binomial formula. It counts the number of ways to get k successes.',
    },
    {
      type: 'code',
      content: 'Simulating binomial data:',
      code: `import numpy as np\n\n# Flip a biased coin 10 times (60% heads). Repeat 10,000 times.\nn = 10\np = 0.6\ntrials = 10000\n\nresults = np.random.binomial(n, p, trials)\n\n# What is the average number of heads?\nprint(f"Mean: {results.mean():.2f}")  # Should be n * p = 6\nprint(f"Std dev: {results.std():.2f}")  # Should be sqrt(n*p*(1-p))`,
      output: `Mean: 5.99\nStd dev: 1.55`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Binomial is everywhere in real life. "What is the chance this email is spam?" "What is the chance this user clicks the ad?" "What is the chance 3 out of 5 students pass?" All binomial.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Binomial Distribution',
      description:
        'Change the number of trials (n) and probability of success (p). See how the distribution of successes changes.',
      sliders: [
        { id: 'n', label: 'Trials (n)', min: 1, max: 20, step: 1, default: 10, decimals: 0 },
        { id: 'p', label: 'Probability (p)', min: 0.1, max: 0.9, step: 0.1, default: 0.5, decimals: 1 },
      ],
      render: ({ n, p }) => {
        // Simulate the binomial distribution (PDF) for a few points
        const points = [];
        for (let k = 0; k <= n; k++) {
          // Binomial coefficient: C(n, k)
          let comb = 1;
          for (let i = 0; i < k; i++) comb = comb * (n - i) / (i + 1);
          const prob = comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
          points.push({ x: k, y: prob, color: 'cyan', r: 6, label: k.toString() });
        }
        return {
          points,
          fns: [],
          domain: [-1, n + 1],
          range: [-0.05, 1],
        };
      },
      formula: ({ n, p }) => 
        `\\text{Binomial}(n=${n}, p=${p})`,
      caption:
        'The peak is around n * p. Wider n means wider spread. Extreme p means skewed distribution.',
    },
    {
      type: 'tip',
      content:
        'Next: The Normal Distribution. The most famous bell curve in all of probability and statistics.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Which distribution describes the number of heads in 20 coin flips?',
      options: ['Uniform', 'Binomial', 'Normal', 'Exponential'],
      correct: 1,
      explanation:
        'Binomial: fixed number of independent trials (n=20), each with the same probability of success (p=0.5).',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'In a binomial distribution with n=10 and p=0.3, what is the expected number of successes?',
      options: ['3', '7', '10', '0.3'],
      correct: 0,
      explanation: 'Expected value of binomial = n * p = 10 * 0.3 = 3.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write `binomial_mean(n, p)` that returns the mean of a binomial distribution.',
      starterCode:
        'def binomial_mean(n, p):\n    # your code here\n    pass',
      tests: [
        { input: 'binomial_mean(10, 0.5)', expected: '5.0' },
        { input: 'binomial_mean(20, 0.7)', expected: '14.0' },
      ],
      hint: 'n * p.',
      solution: 'def binomial_mean(n, p):\n    return n * p',
      explanation: 'The mean of a binomial is always n * p.',
      xp: 20,
    },
  ],
};