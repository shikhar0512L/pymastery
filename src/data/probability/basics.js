// 🎲 Probability — Lesson 1: Probability Basics

export const probBasicsLesson = {
  id: 'prob-basics',
  title: 'Probability Basics — The Language of Luck',
  difficulty: 'beginner',
  duration: 20,
  intro:
    'Probability is a number between 0 and 1 that tells you how likely an event is. 0 means impossible. 1 means certain. 0.5 means a 50-50 chance. This is the foundation of all statistics and AI.',

  sections: [
    {
      type: 'text',
      content:
        'Before we get into formulas, let us define the basics.\n\n• **Experiment:** An action with an uncertain result (flipping a coin, rolling a die).\n• **Outcome:** One specific result (getting Heads, rolling a 4).\n• **Sample Space (Ω):** ALL possible outcomes (for a die: {1,2,3,4,5,6}).\n• **Event:** A collection of outcomes we care about (rolling an even number: {2,4,6}).',
    },
    {
      type: 'math',
      latex:
        'P(\\text{Event}) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes}}',
      caption:
        'This simple formula works when all outcomes are equally likely.',
    },
    {
      type: 'code',
      content: 'Simple probability in Python:',
      code: `# Rolling a die\n# Sample space: {1, 2, 3, 4, 5, 6}\n\n# Event A: Rolling a 4\n# Favorable outcomes: {4}\n# P(A) = 1 / 6\n\n# Event B: Rolling an even number\n# Favorable outcomes: {2, 4, 6}\n# P(B) = 3 / 6 = 0.5\n\nprint(f"P(4) = {1/6:.3f}")\nprint(f"P(even) = {3/6:.3f}")`,
      output: `P(4) = 0.167\nP(even) = 0.500`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '**The Complement Rule:** The probability of an event NOT happening is 1 minus the probability it DOES happen.\n$P(\\text{not } A) = 1 - P(A)$.\nExample: If 30% chance of rain, then 70% chance of no rain.',
    },
    
    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'The Law of Large Numbers',
      description:
        'Simulate flipping a coin. As the number of flips increases, the observed probability gets closer to the true probability (0.5).',
      sliders: [
        { id: 'flips', label: 'Number of flips', min: 10, max: 2000, step: 10, default: 10, decimals: 0 },
      ],
      render: ({ flips }) => {
        // Simulate flips (approximate using normal distribution around 0.5)
        const observed = 0.5 + (Math.random() - 0.5) * (5 / Math.sqrt(flips));
        return {
          points: [
            { x: Math.log10(flips), y: observed, color: 'cyan', r: 10, label: `Observed: ${observed.toFixed(3)}` },
            { x: Math.log10(flips), y: 0.5, color: 'rose', r: 8, label: 'True: 0.5' },
          ],
          domain: [0.5, 3.5],
          range: [0.2, 0.8],
          fns: [
            { fn: () => 0.5, color: 'rose', label: 'True probability' },
          ],
        };
      },
      formula: ({ flips }) => {
        const observed = 0.5 + (Math.random() - 0.5) * (5 / Math.sqrt(flips));
        return `\\text{Flips: } ${flips},\\;\\; \\text{Observed H fraction: } ${observed.toFixed(3)}`;
      },
      caption:
        'With 10 flips, you might get 70% heads. With 2000 flips, you will almost certainly get very close to 50%.',
    },
    {
      type: 'tip',
      content:
        'The coin does NOT "remember" previous flips. If you get 5 heads in a row, the next flip is still 50-50. This is called the **Gambler\'s Fallacy** — believing that past events affect independent future ones.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the probability of rolling a number greater than 4 on a fair 6-sided die?',
      options: ['1/6', '2/6', '3/6', '4/6'],
      correct: 1,
      explanation: 'Numbers greater than 4 are {5, 6}. That is 2 favorable outcomes out of 6. P = 2/6 = 1/3 ≈ 0.333.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'If P(A) = 0.25, what is P(not A)?',
      correct: 0.75,
      tolerance: 0.01,
      placeholder: 'e.g. 0.75',
      hint: 'Use the complement rule: 1 - P(A).',
      explanation: 'P(not A) = 1 - 0.25 = 0.75.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question: 'Write `prob(event_size, sample_space)` that returns the probability as a float.',
      starterCode:
        'def prob(event_size, sample_space):\n    # your code here\n    pass',
      tests: [
        { input: 'prob(1, 6)', expected: '0.16666666666666666' },
        { input: 'prob(3, 6)', expected: '0.5' },
      ],
      hint: 'Just divide event_size by sample_space.',
      solution:
        'def prob(event_size, sample_space):\n    return event_size / sample_space',
      explanation:
        'This is the fundamental definition of probability for equally likely outcomes.',
      xp: 20,
    },
  ],
};