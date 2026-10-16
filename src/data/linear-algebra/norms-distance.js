// 📐 Linear Algebra — Lesson 3: Norms, Distance & Similarity

export const laNormsDistanceLesson = {
  id: 'la-norms-distance',
  title: 'Norms, Distance & Similarity',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Once vectors describe things, the next question is: how big is this vector, and how close are two vectors? The answers power recommendations, search, and every "find similar items" system.',

  sections: [
    {
      type: 'text',
      content:
        'A vector is an arrow. Arrows have a **length**. They also have **directions**, which lets us ask: are two arrows pointing the same way? These two ideas — length and direction — are what you learn in this lesson.',
    },
    {
      type: 'text',
      content:
        'The length of a vector is called its **norm**. It answers: "how far is this point from the origin?" Or, in arrow terms, "how long is this arrow?"',
    },
    {
      type: 'text',
      content:
        'The most common norm is the **L2 norm** (also called the Euclidean norm). It is just the Pythagorean theorem: square each component, add them up, take the square root.',
    },
    {
      type: 'math',
      latex:
        '\\|\\vec{v}\\|_2 = \\sqrt{x^2 + y^2}',
      caption:
        'L2 norm for a 2D vector. For 3D, add z². For nD, add every component squared.',
    },
    {
      type: 'text',
      content:
        'Concrete example: the vector $(3, 4)$ has length $\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. This is exactly the hypotenuse of the 3-4-5 right triangle.',
    },
    {
      type: 'graph',
      title: 'Length of the vector (3, 4)',
      vectors: [
        { x: 3, y: 4, color: 'blue', label: 'v = (3, 4)' },
      ],
      lines: [
        { type: 'h', value: 4, color: 'slate' },
        { type: 'v', value: 3, color: 'slate' },
      ],
      points: [
        { x: 3, y: 0, color: 'slate', r: 3 },
        { x: 0, y: 4, color: 'slate', r: 3 },
      ],
      domain: [-1, 5],
      range: [-1, 5],
      caption:
        'The vector v is the hypotenuse of a right triangle with legs 3 and 4. By Pythagoras, its length is 5.',
    },
    {
      type: 'note',
      content:
        'The norm is always a single non-negative number. Zero only when the vector is all zeros. Because it involves a square root, the norm of a vector with real components is always a real number.',
    },
    {
      type: 'text',
      content:
        'There is another common way to measure length: the **L1 norm**, also called the Manhattan norm. Instead of squaring, you just add the absolute values.',
    },
    {
      type: 'math',
      latex:
        '\\|\\vec{v}\\|_1 = |x| + |y|',
      caption:
        'L1 norm — how far you would travel if you could only move horizontally and vertically, like on a city grid.',
    },
    {
      type: 'text',
      content:
        'The L1 norm of $(3, 4)$ is $|3| + |4| = 7$. The L2 norm was 5. Same vector, two different notions of "length".',
    },
    {
      type: 'text',
      content:
        'Why two? Because different problems care about different things. L2 gives you the straight-line distance — the shortest path. L1 gives you the total movement — the path on a grid, where every turn costs you.',
    },
    {
      type: 'tip',
      content:
        'In machine learning, **L1 norms promote sparsity** — they push small numbers to exactly zero. **L2 norms promote smoothness** — they shrink numbers smoothly without hitting zero. This is why L1 regularisation gives sparse models and L2 gives smooth ones.',
    },

    // ── UNIT VECTORS ───────────────────
    {
      type: 'text',
      content:
        'If you take any vector and divide it by its own length, you get a **unit vector** — a vector of length exactly 1. It points in the same direction as the original, but has no "size" anymore.',
    },
    {
      type: 'math',
      latex:
        '\\hat{v} = \\frac{\\vec{v}}{\\|\\vec{v}\\|}',
      caption:
        'The hat symbol (â) means "unit vector in the same direction as a".',
    },
    {
      type: 'text',
      content:
        'For example, $(3, 4)$ has length 5, so its unit vector is $(3/5, 4/5) = (0.6, 0.8)$. Check: $\\sqrt{0.6^2 + 0.8^2} = \\sqrt{0.36 + 0.64} = 1$.',
    },
    {
      type: 'graph',
      title: 'A vector and its unit vector',
      vectors: [
        { x: 3, y: 4, color: 'slate', label: 'v = (3, 4)' },
        { x: 0.6, y: 0.8, color: 'brand', label: 'v̂ = (0.6, 0.8)' },
      ],
      domain: [-1, 5],
      range: [-1, 5],
      caption:
        'The unit vector points in the same direction but stops right at the edge of the unit circle. Length = 1, always.',
    },
    {
      type: 'text',
      content:
        'Unit vectors strip away "how much" and keep only "which way". This makes them perfect for comparing directions — which is exactly what "similarity" means.',
    },
    {
      type: 'simulation',
      title: 'Normalize a vector',
      description:
        'Change the components of v. Watch the unit vector automatically shrink to length 1.',
      sliders: [
        { id: 'x', label: 'x', min: -5, max: 5, step: 0.5, default: 3, decimals: 1 },
        { id: 'y', label: 'y', min: -5, max: 5, step: 0.5, default: 4, decimals: 1 },
      ],
      render: ({ x, y }) => {
        const len = Math.sqrt(x * x + y * y);
        const ux = len === 0 ? 0 : x / len;
        const uy = len === 0 ? 0 : y / len;
        return {
          vectors: [
            { x, y, color: 'slate', label: `v = (${x}, ${y})` },
            { x: ux, y: uy, color: 'brand', label: `v̂ = (${ux.toFixed(2)}, ${uy.toFixed(2)})` },
          ],
          domain: [-6, 6],
          range: [-6, 6],
        };
      },
      formula: ({ x, y }) => {
        const len = Math.sqrt(x * x + y * y);
        const ux = len === 0 ? 0 : x / len;
        const uy = len === 0 ? 0 : y / len;
        return `\\|v\\| = ${len.toFixed(2)}\\quad \\hat{v} = \\begin{bmatrix} ${ux.toFixed(2)} \\\\ ${uy.toFixed(2)} \\end{bmatrix}`;
      },
      caption:
        'Notice: no matter how you change v, the brand-colored arrow always has length 1. That is what "normalization" does.',
    },

    // ── DISTANCE ───────────────────────
    {
      type: 'text',
      content:
        'Now the big payoff. Once you can measure the length of a vector, you can measure the **distance between two vectors** — by subtracting them first.',
    },
    {
      type: 'math',
      latex:
        'd(u, v) = \\|u - v\\|_2',
      caption:
        'The distance between u and v is the length of their difference. Simple and powerful.',
    },
    {
      type: 'text',
      content:
        'Say $u = (2, 5)$ and $v = (5, 2)$. Then $u - v = (-3, 3)$, and the distance is $\\sqrt{(-3)^2 + 3^2} = \\sqrt{18} \\approx 4.24$.',
    },
    {
      type: 'graph',
      title: 'Distance between two points',
      vectors: [
        { x: 2, y: 5, color: 'blue', label: 'u' },
        { x: 5, y: 2, color: 'emerald', label: 'v' },
      ],
      points: [
        { x: 2, y: 5, color: 'blue', r: 5 },
        { x: 5, y: 2, color: 'emerald', r: 5 },
      ],
      lines: [
        { type: 'v', value: 2, color: 'slate' },
        { type: 'h', value: 5, color: 'slate' },
      ],
      domain: [-1, 7],
      range: [-1, 7],
      caption:
        'The straight-line distance between u and v. Measure with a ruler on the graph — you should get ≈ 4.24.',
    },
    {
      type: 'note',
      content:
        'Distance uses L2 by default in ML, but L1 distance (Manhattan) is also common. The idea is the same — subtract, then take the norm.',
    },
    {
      type: 'tip',
      content:
        'This is the entire logic behind **"find similar items"**. A search engine, a recommendation system, an image-matching algorithm — they all work the same way: turn the thing into a vector, then find the nearest vectors.',
    },

    // ── COSINE SIMILARITY (intro) ──────
    {
      type: 'text',
      content:
        'Distance tells you how far apart two vectors are. But sometimes you only care about **direction**, not magnitude. For that, we use **cosine similarity**.',
    },
    {
      type: 'text',
      content:
        'Cosine similarity is the cosine of the angle between two vectors. It ranges from $-1$ (opposite directions) through $0$ (perpendicular) to $+1$ (identical direction).',
    },
    {
      type: 'math',
      latex:
        '\\cos(\\theta) = \\frac{u \\cdot v}{\\|u\\| \\, \\|v\\|}',
      caption:
        'The cosine similarity — the dot product of u and v, divided by the product of their lengths. You will meet the dot product properly in Lesson 4.',
    },
    {
      type: 'text',
      content:
        'Ignore the numerator for now — you will see it soon. The key idea: cosine similarity ignores length and only cares about angle. So $(3, 4)$ and $(6, 8)$ have cosine similarity 1 — same direction, different lengths.',
    },
    {
      type: 'graph',
      title: 'Same direction, different lengths',
      vectors: [
        { x: 1, y: 1, color: 'blue', label: 'u' },
        { x: 3, y: 3, color: 'emerald', label: 'v = 3u' },
        { x: -1, y: -1, color: 'rose', label: 'w = −u' },
      ],
      domain: [-4, 4],
      range: [-4, 4],
      caption:
        'u and v point in the same direction — cosine similarity = 1. u and w point in exact opposite directions — cosine similarity = −1.',
    },
    {
      type: 'note',
      content:
        'Cosine similarity is the default for comparing **text** and **embeddings**. It does not care whether a document is long or short — only whether it is about the same topic. This is how almost every search engine and chatbot works under the hood.',
    },
    {
      type: 'text',
      content:
        'You now know three ways to compare vectors: **L1 distance** (grid path), **L2 distance** (straight line), and **cosine similarity** (angle only). Together they cover nearly every "find similar" task you will ever meet.',
    },
    {
      type: 'tip',
      content:
        'Next lesson: matrices. Grids of numbers that transform vectors — the language in which every neural network is written.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question: 'What is the L2 norm of the vector $\\vec{v} = (6, 8)$?',
      correct: 10,
      tolerance: 0.01,
      placeholder: 'Enter a number',
      hint: 'Use Pythagoras: $\\sqrt{6^2 + 8^2}$.',
      explanation:
        '$\\|v\\| = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'What is the L1 norm of $\\vec{v} = (-3, 4, -1)$?',
      correct: 8,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'L1 norm = sum of absolute values. $|-3| + |4| + |-1|$.',
      explanation:
        '$\\|v\\|_1 = |-3| + |4| + |-1| = 3 + 4 + 1 = 8$.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Which of these is a **unit vector**?',
      options: [
        '$(1, 1)$',
        '$(3, 4)$',
        '$(0.6, 0.8)$',
        '$(10, 0)$',
      ],
      correct: 2,
      explanation:
        '$\\|(0.6, 0.8)\\| = \\sqrt{0.36 + 0.64} = \\sqrt{1} = 1$. That is the only one with length exactly 1.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'numeric-answer',
      math: true,
      question:
        'What is the distance between $u = (1, 2)$ and $v = (4, 6)$? Give your answer to 1 decimal place.',
      correct: 5,
      tolerance: 0.1,
      placeholder: 'e.g. 3.5',
      hint: 'First compute $u - v$, then take the L2 norm.',
      explanation:
        '$u - v = (1 - 4,\\; 2 - 6) = (-3, -4)$. Distance = $\\sqrt{(-3)^2 + (-4)^2} = 5$.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'What is the **cosine similarity** between $(2, 0)$ and $(5, 0)$?',
      options: [
        '$0$',
        '$0.5$',
        '$1$',
        '$2.5$',
      ],
      correct: 2,
      explanation:
        'They point in exactly the same direction (the positive x-axis), just with different lengths. Cosine similarity ignores length, so the answer is $1$.',
      xp: 20,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'You want to compare two documents of very different lengths. Which is the best similarity measure?',
      options: [
        'L2 distance — it is the most common.',
        'L1 distance — it ignores length differences.',
        'Cosine similarity — it only cares about direction, not magnitude.',
        'Just compare the first component of each.',
      ],
      correct: 2,
      explanation:
        'Long documents produce large vectors simply because they have more words — L1 and L2 will show them as "far apart" even if they are about the same topic. Cosine similarity cancels out the length difference and only measures whether they point in the same direction.',
      xp: 25,
    },
  ],
};