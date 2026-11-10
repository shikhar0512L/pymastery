// 🎲 Probability — Lesson 2: Rules of Probability

export const probRulesLesson = {
  id: 'prob-rules',
  title: 'Rules of Probability — AND / OR',
  difficulty: 'beginner',
  duration: 22,
  intro:
    'What is the chance of rolling a 4 OR a 6? What is the chance of flipping heads AND rolling a 5? When you combine events, you need the addition rule or the multiplication rule.',

  sections: [
    {
      type: 'text',
      content:
        'We have two main rules for combining probabilities:\n\n1. **OR** (Union): What is the chance of A or B happening?\n2. **AND** (Intersection): What is the chance of A and B both happening?',
    },

    // ── THE ADDITION RULE (OR) ───────
    {
      type: 'text',
      content:
        'If you want the probability of A **OR** B, you add their probabilities... but only if they are mutually exclusive (cannot happen at the same time).',
    },
    {
      type: 'math',
      latex:
        'P(A \\text{ or } B) = P(A) + P(B)',
      caption:
        'For mutually exclusive events (e.g., rolling a 4 or a 6 on one die).',
    },
    {
      type: 'text',
      content:
        'If they can overlap, you must subtract the overlap:\n$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
    },
    {
      type: 'code',
      content: 'Addition Rule example:',
      code: `# Roll a die. Event A: Roll an even number {2,4,6}. Event B: Roll a number > 3 {4,5,6}.\n# What is P(A or B)?\n\n# P(A) = 3/6, P(B) = 3/6\n# Overlap (both even and > 3): {4, 6}, so P(A and B) = 2/6\n\nP_A = 3/6\nP_B = 3/6\nP_A_and_B = 2/6\n\nP_A_or_B = P_A + P_B - P_A_and_B\nprint(f"P(A or B) = {P_A_or_B:.3f}")  # 4/6 = 0.667`,
      output: `P(A or B) = 0.667`,
      language: 'python',
    },

    // ── THE MULTIPLICATION RULE (AND) 
    {
      type: 'text',
      content:
        'If you want the probability of A **AND** B, you multiply. But ONLY if the events are **independent** (one does not affect the other).',
    },
    {
      type: 'math',
      latex:
        'P(A \\text{ and } B) = P(A) \\times P(B)',
      caption:
        'For independent events (e.g., flipping a coin and rolling a die).',
    },
    {
      type: 'code',
      content: 'Multiplication Rule example:',
      code: `# Flip a coin AND roll a die. What is P(heads and 6)?\n\nP_heads = 1/2\nP_six = 1/6\n\nP_both = P_heads * P_six\nprint(f"P(heads and 6) = {P_both:.3f}")  # 1/12 = 0.083`,
      output: `P(heads and 6) = 0.083`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Do NOT use the multiplication rule for dependent events. Example: Drawing 2 cards from a deck. If you draw an Ace first, the deck has changed, so the probability of a second Ace is different. That is where **Conditional Probability** (next lesson) comes in.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Visualizing OR vs AND',
      description:
        'Compare the probability of A OR B vs A AND B.',
      sliders: [
        { id: 'pA', label: 'P(A)', min: 0.1, max: 0.9, step: 0.1, default: 0.5, decimals: 1 },
        { id: 'pB', label: 'P(B)', min: 0.1, max: 0.9, step: 0.1, default: 0.5, decimals: 1 },
      ],
      render: ({ pA, pB }) => {
        const pOr = Math.min(1, pA + pB); // assuming mutually exclusive for simple visual
        const pAnd = pA * pB; // assuming independent
        return {
          points: [
            { x: 0, y: pA, color: 'cyan', r: 10, label: `P(A)=${pA}` },
            { x: 1, y: pB, color: 'cyan', r: 10, label: `P(B)=${pB}` },
            { x: 2, y: pOr, color: 'emerald', r: 10, label: `P(A or B)=${pOr.toFixed(2)}` },
            { x: 3, y: pAnd, color: 'rose', r: 10, label: `P(A and B)=${pAnd.toFixed(2)}` },
          ],
          domain: [-0.5, 3.5],
          range: [0, 1.1],
          fns: [],
        };
      },
      formula: ({ pA, pB }) => 
        `\\text{OR} = ${Math.min(1, pA+pB).toFixed(2)},\\;\\; \\text{AND} = ${(pA*pB).toFixed(2)}`,
      caption:
        'OR is always bigger than AND. AND shrinks the probability because both things must happen.',
    },
    {
      type: 'tip',
      content:
        'Next: Conditional Probability. What happens when event A CHANGES the probability of event B?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Roll a die. What is P(rolling a 1 or a 2)?',
      options: ['1/6', '2/6', '3/6', '12/36'],
      correct: 1,
      explanation: 'These are mutually exclusive. 1/6 + 1/6 = 2/6 = 1/3.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'Flip two independent coins. What is P(both heads)?',
      correct: 0.25,
      tolerance: 0.01,
      placeholder: 'e.g. 0.25',
      hint: 'Multiply P(heads) * P(heads).',
      explanation: '1/2 * 1/2 = 1/4 = 0.25.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question: 'Write `and_prob(pA, pB)` returning the probability of both independent events happening.',
      starterCode: 'def and_prob(pA, pB):\n    pass',
      tests: [
        { input: 'and_prob(0.5, 0.5)', expected: '0.25' },
        { input: 'and_prob(0.2, 0.3)', expected: '0.06' },
      ],
      hint: 'Multiply them.',
      solution: 'def and_prob(pA, pB):\n    return pA * pB',
      explanation: 'For independent events, P(A and B) = P(A) * P(B).',
      xp: 20,
    },
  ],
};