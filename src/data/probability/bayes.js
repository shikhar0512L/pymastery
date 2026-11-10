// 🎲 Probability — Lesson 4: Bayes Theorem

export const probBayesLesson = {
  id: 'prob-bayes',
  title: 'Bayes Theorem — The Brain Teaser',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'A rare disease affects 1 in 10,000 people. A test is 99% accurate. You test positive. Do you have the disease? Most doctors get this wrong. Bayes theorem gives the surprising answer.',

  sections: [
    {
      type: 'text',
      content:
        'Bayes theorem is a way to **flip a conditional probability**. If we know P(Test | Disease), can we find P(Disease | Test)?',
    },
    {
      type: 'math',
      latex:
        'P(A | B) = \\frac{P(B | A) \\cdot P(A)}{P(B)}',
      caption:
        'Bayes Theorem. It connects the probability of A given B to the probability of B given A.',
    },

    // ── THE MEDICAL TEST EXAMPLE ─────
    {
      type: 'text',
      content:
        'Let us break the medical test down.\n\n• **P(Disease)** = 1/10,000 = 0.0001 (1 in 10,000 people have it).\n• **P(Test | Disease)** = 0.99 (test correctly detects 99% of cases).\n• **P(Test | No Disease)** = 0.01 (test falsely positive for 1% of healthy people).\n\nWe want **P(Disease | Test)** = ?',
    },
    {
      type: 'code',
      content: 'Calculating it:',
      code: `P_disease = 1 / 10000\nP_test_given_disease = 0.99\nP_test_given_no_disease = 0.01\nP_no_disease = 1 - P_disease\n\n# P(Test) = P(Test | Disease)*P(Disease) + P(Test | No Disease)*P(No Disease)\nP_test = P_test_given_disease * P_disease + P_test_given_no_disease * P_no_disease\n\n# Bayes\nP_disease_given_test = (P_test_given_disease * P_disease) / P_test\nprint(f"P(Disease | Positive Test) = {P_disease_given_test:.4f}")`,
      output: `P(Disease | Positive Test) = 0.0098`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The result is **0.98%**. Even with a 99% accurate test, a positive result only gives you a 0.98% chance of actually having the disease! Why? Because the disease is so rare that the vast majority of positive results are **false positives** from healthy people.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'The Base Rate Fallacy',
      description:
        'Change the base rate (how common the disease is) and see how the probability of having it changes after a positive test.',
      sliders: [
        { id: 'baseRate', label: 'Prevalence (Base Rate)', min: 0.0001, max: 0.5, step: 0.01, default: 0.0001, decimals: 4 },
      ],
      render: ({ baseRate }) => {
        const pDisease = baseRate;
        const pTestGivenDisease = 0.99;
        const pTestGivenNoDisease = 0.01;
        const pTest = pTestGivenDisease * pDisease + pTestGivenNoDisease * (1 - pDisease);
        const pPosterior = (pTestGivenDisease * pDisease) / pTest;

        return {
          points: [
            { x: 0, y: pDisease, color: 'rose', r: 10, label: `Base: ${(pDisease*100).toFixed(2)}%` },
            { x: 1, y: pPosterior, color: 'brand', r: 10, label: `After: ${(pPosterior*100).toFixed(1)}%` },
          ],
          domain: [-0.5, 1.5],
          range: [0, 1],
          fns: [],
        };
      },
      formula: ({ baseRate }) => {
        const pDisease = baseRate;
        const pTest = 0.99 * pDisease + 0.01 * (1 - pDisease);
        const post = (0.99 * pDisease) / pTest;
        return `\\text{Base Rate} = ${(baseRate*100).toFixed(2)}\\% \\to P(\\text{Disease}|+) = ${(post*100).toFixed(2)}\\%`;
      },
      caption:
        'When the disease is very rare (0.01%), even a positive test is 99% likely to be a false positive. When the base rate is high (50%), a positive test is almost certain to be correct. This is why context matters.',
    },
    {
      type: 'warning',
      content:
        '**The Base Rate Fallacy:** Ignoring the base rate (how common something is) leads to wildly wrong conclusions. Most people (including doctors) intuitively think P(Disease|Positive Test) should be 99%. Bayes theorem proves it is less than 1%.',
    },
    {
      type: 'tip',
      content:
        'Next: Random Variables and Expected Value. How do we calculate the expected payout of a casino game?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does Bayes theorem let you do?',
      options: [
        'Calculate means.',
        'Reverse a conditional probability (turn P(B|A) into P(A|B)).',
        'Prove causation.',
        'Calculate variance.',
      ],
      correct: 1,
      explanation: 'Bayes theorem is the mathematical tool for reversing conditionals.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'P(A) = 0.1, P(B|A) = 0.8, P(B) = 0.2. What is P(A|B)?',
      correct: 0.4,
      tolerance: 0.01,
      placeholder: 'e.g. 0.4',
      hint: 'Apply the formula: (P(B|A) * P(A)) / P(B).',
      explanation: '(0.8 * 0.1) / 0.2 = 0.08 / 0.2 = 0.4.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Why does a rare disease cause so many false positives even with an accurate test?',
      options: [
        'The test is broken.',
        'Because the number of healthy people is so huge that even a 1% error rate creates more false positives than true positives.',
        'Doctors make mistakes.',
        'Because probability is random.',
      ],
      correct: 1,
      explanation: 'If 1 in 10,000 has the disease, then 9,999 do not. 1% of 9,999 is about 100 people. 99% of 1 is 1 person. So 100 false positives vs 1 true positive.',
      xp: 30,
    },
  ],
};