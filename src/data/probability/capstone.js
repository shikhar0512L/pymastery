// 🎲 Probability — Lesson 8: Capstone — A/B Testing Simulation

export const probCapstoneLesson = {
  id: 'prob-capstone',
  title: 'Capstone — A/B Test Simulation',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'You are the product manager of an app. You change the colour of the "Sign Up" button from Blue (Group A) to Red (Group B). You show the app to 1,000 users in each group. Did the red button actually convert better, or is the difference just random luck?',

  sections: [
    {
      type: 'text',
      content:
        'This is called an **A/B Test**. It is the most common use of probability in tech. We will simulate the data and use probability to make a decision.',
    },

    // ── THE SIMULATION ───────────────
    {
      type: 'code',
      content: 'Step 1: Simulate the experiment:',
      code: `import numpy as np\n\nnp.random.seed(42)\n\n# Group A: Blue button. True conversion rate = 10%\n# Group B: Red button. True conversion rate = 12%\n\nn_users = 1000\n\n# Simulate 1000 users. 1 means signed up, 0 means didn't.\ngroup_a = np.random.binomial(1, 0.10, n_users)\ngroup_b = np.random.binomial(1, 0.12, n_users)\n\nprint(f"Group A conversion: {group_a.mean():.2%}")\nprint(f"Group B conversion: {group_b.mean():.2%}")`,
      output: `Group A conversion: 10.30%\nGroup B conversion: 12.20%`,
      language: 'python',
    },

    // ── THE DECISION ─────────────────
    {
      type: 'text',
      content:
        'Group B looks better (12.2% vs 10.3%). But wait — the true rates were 10% and 12%. The observed difference could be due to random chance in the sample. How do we know if the difference is **statistically significant**?',
    },
    {
      type: 'text',
      content:
        'We use a **statistical test** (like a Z-test for proportions). We calculate the probability that we would see a difference this big if both buttons actually had the same conversion rate (the Null Hypothesis).',
    },
    {
      type: 'code',
      content: 'Step 2: Conduct the hypothesis test:',
      code: `from statsmodels.stats.proportion import proportions_ztest\n\n# Counts\nconversions = np.array([group_a.sum(), group_b.sum()])\nnobs = np.array([n_users, n_users])\n\n# Z-test\nstat, p_value = proportions_ztest(conversions, nobs)\n\nprint(f"Z-statistic: {stat:.3f}")\nprint(f"P-value: {p_value:.4f}")\n\nif p_value < 0.05:\n    print("Result is statistically significant. Ship the red button!")\nelse:\n    print("Result is not significant. Maybe just noise.")`,
      output: `Z-statistic: -1.303\nP-value: 0.1926\nResult is not significant. Maybe just noise.`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Wait! Even though the true rates were different (10% vs 12%), the p-value is 0.19, which is greater than 0.05. So we fail to reject the null hypothesis. This means our sample size (1000) was too small to detect a 2% difference. We need more users!',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'The Cost of Small Samples',
      description:
        'Increase the sample size. See how the p-value drops below 0.05 (making it significant).',
      sliders: [
        { id: 'n', label: 'Users per group', min: 100, max: 20000, step: 100, default: 1000, decimals: 0 },
      ],
      render: ({ n }) => {
        // Simulate p-value based on n
        // True rates 0.10 and 0.12
        const p1 = 0.10;
        const p2 = 0.12;
        const pooled_p = (p1 + p2) / 2;
        const se = Math.sqrt(pooled_p * (1 - pooled_p) * (2 / n));
        const z = (p2 - p1) / se;
        
        // Custom JS implementation of erf
        function erf(x) {
          const sign = (x >= 0) ? 1 : -1;
          x = Math.abs(x);
          const a1 = 0.254829592;
          const a2 = -0.284496736;
          const a3 = 1.421413741;
          const a4 = -1.453152027;
          const a5 = 1.061405429;
          const p = 0.3275911;
          const t = 1.0 / (1.0 + p * x);
          const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
          return sign * y;
        }

        const pValue = 2 * (1 - 0.5 * (1 + erf(Math.abs(z) / Math.sqrt(2))));
        
        return {
          points: [
            { x: Math.log10(n), y: pValue, color: pValue < 0.05 ? 'emerald' : 'rose', r: 10, label: `p=${pValue.toFixed(4)}` },
            { x: Math.log10(n), y: 0.05, color: 'amber', r: 8, label: 'Alpha=0.05' },
          ],
          domain: [2, 4.5],
          range: [-0.05, 1],
          fns: [
            { fn: () => 0.05, color: 'amber', label: 'Significance Threshold' },
          ],
        };
      },
      formula: ({ n }) => {
        const p1 = 0.10;
        const p2 = 0.12;
        const pooled_p = (p1 + p2) / 2;
        const se = Math.sqrt(pooled_p * (1 - pooled_p) * (2 / n));
        const z = (p2 - p1) / se;
        
        function erf(x) {
          const sign = (x >= 0) ? 1 : -1;
          x = Math.abs(x);
          const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
          const t = 1.0 / (1.0 + p * x);
          const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
          return sign * y;
        }

        const pValue = 2 * (1 - 0.5 * (1 + erf(Math.abs(z) / Math.sqrt(2))));
        return `\\text{Sample } n=${n} \\to p\\text{-value} = ${pValue.toFixed(4)}`;
      },
      caption:
        'With 100 users, the p-value is high. With 10,000 users, it drops below 0.05, proving the 2% difference is real.',
    },
    {
      type: 'warning',
      content:
        'Do not stop the A/B test early just because it looks significant. This is called "peeking" and it leads to false positives. You must decide the sample size BEFORE the test.',
    },
    {
      type: 'tip',
      content:
        'Congratulations! You have completed the Probability module. You now know how to model uncertainty, calculate expected outcomes, and test hypotheses. This is the exact math used by ML models, financial systems, and tech companies.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does a p-value of 0.03 mean?',
      options: [
        'There is a 3% chance the alternative hypothesis is true.',
        'There is a 3% chance of seeing this result (or more extreme) if the null hypothesis is true.',
        'The effect size is 3%.',
        'The test is 97% accurate.',
      ],
      correct: 1,
      explanation:
        'The p-value is the probability of the data given the null hypothesis, not the probability of the hypothesis itself.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'If p-value < 0.05 and alpha = 0.05, what do we conclude?',
      options: [
        'Reject the null hypothesis. The result is statistically significant.',
        'Accept the null hypothesis.',
        'Run the test again.',
        'There is no difference between the groups.',
      ],
      correct: 0,
      explanation:
        'Since p < alpha, we reject the null hypothesis and conclude the result is statistically significant.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question: 'Write `is_significant(p_value, alpha=0.05)` that returns True if p < alpha.',
      starterCode:
        'def is_significant(p_value, alpha=0.05):\n    # your code here\n    pass',
      tests: [
        { input: 'is_significant(0.02)', expected: 'True' },
        { input: 'is_significant(0.10)', expected: 'False' },
        { input: 'is_significant(0.05)', expected: 'False' },
      ],
      hint: 'p_value < alpha.',
      solution: 'def is_significant(p_value, alpha=0.05):\n    return p_value < alpha',
      explanation: 'By convention, we use strict inequality. p = 0.05 exactly is usually not significant.',
      xp: 25,
    },
  ],
};