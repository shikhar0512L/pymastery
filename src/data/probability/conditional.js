// 🎲 Probability — Lesson 3: Conditional Probability

export const probConditionalLesson = {
  id: 'prob-conditional',
  title: 'Conditional Probability — When Things Depend',
  difficulty: 'beginner',
  duration: 22,
  intro:
    'Sometimes, knowing one thing happened changes the probability of another thing happening. If you drew a red card, what is the chance it is a heart? This is conditional probability.',

  sections: [
    {
      type: 'text',
      content:
        'The notation for conditional probability is **P(A | B)**, read as "Probability of A given B". It means: we already know B happened, what is the chance of A now?',
    },
    {
      type: 'math',
      latex:
        'P(A | B) = \\frac{P(A \\text{ and } B)}{P(B)}',
      caption:
        'The conditional probability formula. We restrict our sample space to only event B.',
    },
    {
      type: 'text',
      content:
        'Example: A standard deck has 52 cards. 26 are red. 13 are hearts (all hearts are red).\nWhat is P(Heart | Red card)?\n\n• We know the card is red. So the sample space is now 26 cards.\n• 13 of those are hearts.\n• So P = 13/26 = 0.5.',
    },
    {
      type: 'code',
      content: 'Conditional Probability in code:',
      code: `# P(Heart | Red) = P(Heart AND Red) / P(Red)\n# P(Heart AND Red) = P(Heart) = 13/52 = 0.25 (since all hearts are red)\n# P(Red) = 26/52 = 0.5\n\np_heart_and_red = 13/52\np_red = 26/52\n\np_heart_given_red = p_heart_and_red / p_red\nprint(f"P(Heart | Red) = {p_heart_given_red:.3f}")  # 0.5`,
      output: `P(Heart | Red) = 0.500`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice that P(Heart) = 0.25, but P(Heart | Red) = 0.5. Knowing the card is red **doubled** our probability that it is a heart. That is how information changes probability.',
    },

    // ── INDEPENDENCE ─────────────────
    {
      type: 'text',
      content:
        'If A and B are **independent**, then knowing B gives no information about A. So:\n$P(A | B) = P(A)$.\n\nExample: Rolling a die, then flipping a coin. P(die=6 | coin=heads) = P(die=6) = 1/6. The coin flip gives zero info about the die.',
    },
    {
      type: 'warning',
      content:
        'In the real world, most events are NOT independent. Disease symptoms depend on the disease. Sales depend on price. Rain depends on clouds. This is why conditional probability is the most used concept in real-world stats.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Card deck simulation',
      description:
        'Draw a card. See how the probability changes based on what we know.',
      sliders: [
        { id: 'known', label: 'What do we know? (0=Nothing, 1=Card is Red)', min: 0, max: 1, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ known }) => {
        const p = known === 0 ? 0.25 : 0.5;
        return {
          points: [
            { x: 0, y: 0.25, color: 'cyan', r: 10, label: 'P(Heart)' },
            { x: 1, y: p, color: 'brand', r: 10, label: `P(Heart | ${known === 0 ? '?' : 'Red'})` },
          ],
          domain: [-0.5, 1.5],
          range: [0, 1],
          fns: [],
        };
      },
      formula: ({ known }) => 
        known === 0 
          ? `\\text{Without information: } P = 0.25`
          : `\\text{Knowing it's red: } P = 0.5`,
      caption:
        'More information = different probability. This is the essence of conditional probability.',
    },
    {
      type: 'tip',
      content:
        'Next: Bayes Theorem. What if we want to reverse the condition? We know the test is positive. What is the chance we actually have the disease? This is where things get mind-bending.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does P(A | B) mean?',
      options: [
        'Probability of A happening before B.',
        'Probability of A given that B has happened.',
        'Probability of A and B happening together.',
        'Probability of B given that A has happened.',
      ],
      correct: 1,
      explanation: 'The vertical bar "|" means "given". So P(A|B) = probability of A, given B is true.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'P(A and B) = 0.1. P(B) = 0.4. What is P(A | B)?',
      correct: 0.25,
      tolerance: 0.01,
      placeholder: 'e.g. 0.25',
      hint: 'Divide P(A and B) by P(B).',
      explanation: '0.1 / 0.4 = 0.25.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'If two events A and B are independent, what is P(A | B)?',
      options: ['P(B)', 'P(A)', 'P(A) * P(B)', '0'],
      correct: 1,
      explanation: 'For independent events, knowing B does not change the probability of A. So P(A | B) = P(A).',
      xp: 20,
    },
  ],
};