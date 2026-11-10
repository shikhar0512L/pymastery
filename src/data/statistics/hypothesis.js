// 📊 Stats — Lesson 7: Hypothesis Testing & P-Values

export const statHypothesisLesson = {
  id: 'stat-hypothesis',
  title: 'Hypothesis Testing & P-Values',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'You change a button color on your website. Sales go up by 2%. Is this because the new button is better, or did you just get lucky? Hypothesis testing gives you a way to decide.',

  sections: [
    {
      type: 'text',
      content:
        'Hypothesis testing is a formal way to test a claim. It is the backbone of scientific research, A/B testing in tech, and clinical drug trials.',
    },

    // ── THE NULL HYPOTHESIS ──────────
    {
      type: 'text',
      content:
        'We start with the boring assumption: the **Null Hypothesis (H₀)**. It says "there is no effect" or "nothing changed".',
    },
    {
      type: 'text',
      content:
        'Example: H₀ = "The new button does NOT change sales."\nThe **Alternative Hypothesis (H₁)** is what we want to prove: "The new button DOES change sales."',
    },
    {
      type: 'note',
      content:
        'We assume H₀ is true until the data strongly proves otherwise. Think of it as a "presumption of innocence" in court.',
    },

    // ── P-VALUE ──────────────────────
    {
      type: 'text',
      content:
        'We collect data and compute a **p-value**. The p-value is the probability of seeing a result this extreme IF the null hypothesis were true.',
    },
    {
      type: 'math',
      latex:
        '\\text{If } p < 0.05, \\text{ reject } H_0',
      caption:
        'The most common threshold is 0.05 (5%). This means we are willing to be wrong 5% of the time.',
    },
    {
      type: 'code',
      content: 'A/B Test Simulation:',
      code: `import numpy as np\n\n# Simulate two groups: old button vs new button\nnp.random.seed(42)\nold_group = np.random.binomial(1, 0.10, 1000)  # 10% conversion\nnew_group = np.random.binomial(1, 0.12, 1000)  # 12% conversion\n\nconv_old = old_group.mean()\nconv_new = new_group.mean()\nprint(f"Old: {conv_old:.2%}")\nprint(f"New: {conv_new:.2%}")\nprint(f"Difference: {(conv_new - conv_old):.2%}")\n\n# Is this difference real or random noise?\n# (In real code, you would run a t-test or chi-square test here)`,
      output: `Old: 10.30%\nNew: 12.20%\nDifference: 1.90%`,
      language: 'python',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Is it real or random?',
      description:
        'The red line is the null hypothesis (no effect). The blue dots are sample results. If the result is extreme enough, we reject the null.',
      sliders: [
        { id: 'z', label: 'Observed Result (z-score)', min: -4, max: 4, step: 0.1, default: 0, decimals: 1 },
      ],
      render: ({ z }) => {
        // Normal curve
        const curve = (x) => Math.exp(-x*x/2) / Math.sqrt(2*Math.PI);
        const isSignificant = Math.abs(z) > 1.96; // 95% confidence
        
        return {
          fns: [
            { fn: curve, color: 'cyan', label: 'Null Distribution' },
          ],
          points: [
            { x: z, y: curve(z), color: isSignificant ? 'rose' : 'amber', r: 10, label: 'Observed' },
            { x: -1.96, y: 0, color: 'surface-700', r: 5 },
            { x: 1.96, y: 0, color: 'surface-700', r: 5 },
          ],
          domain: [-4, 4],
          range: [-0.1, 0.5],
        };
      },
      formula: ({ z }) => {
        const isSig = Math.abs(z) > 1.96;
        return isSig 
          ? `\\text{z} = ${z.toFixed(1)},\\;\\; p < 0.05 \\;\\; (\\text{Significant!})`
          : `\\text{z} = ${z.toFixed(1)},\\;\\; p > 0.05 \\;\\; (\\text{Not significant})`;
      },
      caption:
        'If the observed result falls in the tails (beyond ±1.96 for 95% confidence), we say it is statistically significant.',
    },

    {
      type: 'warning',
      content:
        'P-hacking: Running many tests and only reporting the ones that show p < 0.05. If you test 20 things, one will randomly show p < 0.05. This is a major problem in science.',
    },
    {
      type: 'tip',
      content:
        'Next: The Capstone. We will tie everything together and analyze a real dataset using all the tools you have learned.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does a p-value of 0.03 mean?',
      options: [
        'There is a 3% chance the null hypothesis is true.',
        'There is a 3% chance of seeing this result if the null hypothesis were true.',
        'The effect size is 3%.',
        'The test is 97% accurate.',
      ],
      correct: 1,
      explanation:
        'p-value is the probability of the data, NOT the hypothesis. Specifically, the probability of seeing a result this extreme assuming H0 is true.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'If p = 0.02 and the significance level is 0.05, what do we do?',
      options: [
        'Accept H₀.',
        'Reject H₀.',
        'Run the test again.',
        'Nothing.',
      ],
      correct: 1,
      explanation:
        '0.02 < 0.05, so we reject the null hypothesis. The result is statistically significant.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question: 'Write `is_significant(p_value, alpha)` that returns True if p < alpha, else False.',
      starterCode:
        'def is_significant(p_value, alpha=0.05):\n    # your code here\n    pass',
      tests: [
        { input: 'is_significant(0.03)', expected: 'True' },
        { input: 'is_significant(0.10)', expected: 'False' },
        { input: 'is_significant(0.05)', expected: 'False' },
      ],
      hint: 'Just compare p_value < alpha. Equal is not significant by convention.',
      solution:
        'def is_significant(p_value, alpha=0.05):\n    return p_value < alpha',
      explanation:
        'Convention is strict inequality. p = 0.05 exactly is usually not considered significant.',
      xp: 20,
    },
  ],
};