// 🎲 Probability — Lesson 5: Random Variables & Expected Value

export const probRandomVariablesLesson = {
  id: 'prob-random-vars',
  title: 'Random Variables & Expected Value',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'A random variable is a number that depends on the outcome of a random event. The Expected Value is the long-term average you would get if you repeated the event thousands of times. This is how casinos, insurance companies, and lotteries actually make money.',

  sections: [
    {
      type: 'text',
      content:
        'A **random variable** (usually written as X) is just a way to assign a number to an outcome.\n\n• Roll a die: X = the number you roll (1 to 6).\n• Flip a coin: X = 1 if heads, 0 if tails.\n• Play a game: X = your profit or loss.',
    },
    {
      type: 'note',
      content:
        'Expected Value (E[X]) is NOT the value you expect to see on a single try. It is the **average over many, many tries**. If a game has an expected value of -₹5, you might win on your first try, but if you play 1000 times, you will lose roughly ₹5000.',
    },

    // ── THE FORMULA ──────────────────
    {
      type: 'math',
      latex:
        'E[X] = \\sum (x_i \\cdot P(x_i))',
      caption:
        'Expected Value = (Outcome 1 × Probability 1) + (Outcome 2 × Probability 2) + ...',
    },
    {
      type: 'code',
      content: 'Expected value of a die roll:',
      code: `# Fair 6-sided die. Each outcome has probability 1/6.\n# Outcomes: 1, 2, 3, 4, 5, 6\n\noutcomes = [1, 2, 3, 4, 5, 6]\nprobabilities = [1/6] * 6\n\nexpected_value = sum(x * p for x, p in zip(outcomes, probabilities))\nprint(f"Expected value: {expected_value}")`,
      output: `Expected value: 3.5`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Notice the expected value is 3.5. You will never roll a 3.5. But if you roll the die 10,000 times, the average will be extremely close to 3.5.',
    },

    // ── CASINO EXAMPLE ───────────────
    {
      type: 'text',
      content:
        'Let us build a casino game.\n\n• You pay ₹10 to play.\n• Roll a die.\n• If you roll a 6, you win ₹30. Otherwise you win ₹0.',
    },
    {
      type: 'code',
      content: 'Is this game profitable for you?',
      code: `# Outcomes:\n# Roll 6: profit = 30 - 10 = +20 (prob 1/6)\n# Roll 1-5: profit = 0 - 10 = -10 (prob 5/6)\n\nprofits = [20, -10]\nprobs = [1/6, 5/6]\n\nev = sum(x * p for x, p in zip(profits, probs))\nprint(f"Expected profit per game: ₹{ev:.2f}")`,
      output: `Expected profit per game: ₹-5.00`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'The expected value is -₹5. This means the casino makes ₹5 from you on average every time you play. No matter how lucky you get in the short term, the law of large numbers guarantees the casino wins in the long run.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Law of Large Numbers',
      description:
        'Simulate playing the casino game. Watch how your average profit converges to the expected value (-₹5) as you play more games.',
      sliders: [
        { id: 'games', label: 'Number of games', min: 10, max: 10000, step: 50, default: 10, decimals: 0 },
      ],
      render: ({ games }) => {
        // Simulate expected average (converges to -5)
        const noise = 50 / Math.sqrt(games);
        const observedAvg = -5 + (Math.random() - 0.5) * noise;
        
        return {
          points: [
            { x: Math.log10(games), y: observedAvg, color: 'cyan', r: 10, label: `Observed: ₹${observedAvg.toFixed(2)}` },
            { x: Math.log10(games), y: -5, color: 'rose', r: 8, label: 'Expected: ₹-5' },
          ],
          domain: [0.5, 4.5],
          range: [-20, 10],
          fns: [
            { fn: () => -5, color: 'rose', label: 'Expected Value' },
          ],
        };
      },
      formula: ({ games }) => {
        const noise = 50 / Math.sqrt(games);
        const observed = -5 + (Math.random() - 0.5) * noise;
        return `\\text{Games: } ${games} \\to \\text{Avg profit: } ₹${observed.toFixed(2)}`;
      },
      caption:
        'With 10 games, you might be up. With 10,000 games, the average will be exactly -₹5.',
    },
    {
      type: 'tip',
      content:
        'Next: Probability Distributions. How do we describe the probabilities of all possible outcomes in a single picture?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question: 'What is the expected value of a fair 4-sided die (values 1, 2, 3, 4)?',
      correct: 2.5,
      tolerance: 0.01,
      placeholder: 'e.g. 2.5',
      hint: 'Sum of values divided by 4.',
      explanation: '(1 + 2 + 3 + 4) / 4 = 10 / 4 = 2.5.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'If a lottery ticket costs ₹100 and the expected value of the payout is ₹40, what is the expected profit?',
      options: ['+₹60', '₹40', '-₹60', '-₹40'],
      correct: 2,
      explanation: 'Expected profit = Expected payout - Cost = ₹40 - ₹100 = -₹60.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question: 'Write `expected_value(outcomes, probs)` that computes the sum of (outcome * probability).',
      starterCode:
        'def expected_value(outcomes, probs):\n    # your code here\n    pass',
      tests: [
        { input: 'expected_value([1, 2, 3], [0.2, 0.5, 0.3])', expected: '2.1' },
        { input: 'expected_value([10, 20], [0.5, 0.5])', expected: '15.0' },
      ],
      hint: 'Use a loop or zip.',
      solution:
        'def expected_value(outcomes, probs):\n    return sum(x * p for x, p in zip(outcomes, probs))',
      explanation:
        'This is the exact formula for expected value.',
      xp: 25,
    },
  ],
};