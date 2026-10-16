// 📐 Linear Algebra — Lesson 2: Vector Operations

export const laVectorOpsLesson = {
  id: 'la-vector-ops',
  title: 'Vector Operations — Add, Subtract, Scale',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Once you can turn things into vectors, the next move is to combine them. Three operations — add, subtract, scale — power every neural network, every recommendation, every embedding.',

  sections: [
    {
      type: 'text',
      content:
        'In Lesson 1 you learned what a vector is: an ordered list of numbers. Now the real magic starts. When you can **combine** vectors, you can answer questions like "what is the total?" or "how much did this change?" or "how do we get from here to there?"',
    },
    {
      type: 'text',
      content:
        'There are exactly three operations you need. Every other vector operation is built from these three. Learn them cold.',
    },

    // ── ADDITION ───────────────────────
    {
      type: 'text',
      content:
        '**1. Vector addition.** To add two vectors, add them component by component — first number to first number, second to second, and so on. The result is a new vector of the same dimension.',
    },
    {
      type: 'math',
      latex:
        '\\begin{bmatrix} a \\\\ b \\end{bmatrix} + \\begin{bmatrix} c \\\\ d \\end{bmatrix} = \\begin{bmatrix} a + c \\\\ b + d \\end{bmatrix}',
      caption:
        'Vector addition — the simplest rule in all of linear algebra. Just add matching positions.',
    },
    {
      type: 'text',
      content:
        'Concrete example: $(3, 4) + (1, 2) = (4, 6)$. That is $3 + 1 = 4$ for the first component, and $4 + 2 = 6$ for the second.',
    },
    {
      type: 'graph',
      title: 'Adding vectors geometrically — tip to tail',
      vectors: [
        { x: 3, y: 4, color: 'blue', label: 'u = (3, 4)' },
        { x: 1, y: 2, color: 'emerald', label: 'v = (1, 2)', from: [3, 4] },
        { x: 4, y: 6, color: 'brand', label: 'u + v = (4, 6)' },
      ],
      domain: [-1, 7],
      range: [-1, 8],
      caption:
        'To add u and v: place the TAIL of v at the HEAD of u. The result u+v goes from the origin to the new head. This "tip-to-tail" picture is the geometric meaning of addition.',
    },
    {
      type: 'tip',
      content:
        'In real life, this is exactly how you combine movements. If you walk $(3, 4)$ steps, then $(1, 2)$ steps, your total displacement is $(4, 6)$. Vector addition is just "do one thing, then do another."',
    },
    {
      type: 'simulation',
      title: 'Interactive — add two vectors',
      description:
        'Change u and v with the sliders. The red arrow shows their sum.',
      sliders: [
        { id: 'ux', label: 'u_x', min: -4, max: 4, step: 1, default: 2, decimals: 0 },
        { id: 'uy', label: 'u_y', min: -4, max: 4, step: 1, default: 3, decimals: 0 },
        { id: 'vx', label: 'v_x', min: -4, max: 4, step: 1, default: 3, decimals: 0 },
        { id: 'vy', label: 'v_y', min: -4, max: 4, step: 1, default: -1, decimals: 0 },
      ],
      render: ({ ux, uy, vx, vy }) => ({
        vectors: [
          { x: ux, y: uy, color: 'blue', label: 'u' },
          { x: ux + vx, y: uy + vy, color: 'emerald', label: 'v', from: [ux, uy] },
          { x: ux + vx, y: uy + vy, color: 'brand', label: 'u + v' },
        ],
        domain: [-8, 8],
        range: [-8, 8],
      }),
      formula: ({ ux, uy, vx, vy }) =>
        `u + v = \\begin{bmatrix} ${ux} \\\\ ${uy} \\end{bmatrix} + \\begin{bmatrix} ${vx} \\\\ ${vy} \\end{bmatrix} = \\begin{bmatrix} ${ux + vx} \\\\ ${uy + vy} \\end{bmatrix}`,
      caption:
        'Watch the emerald arrow (v) slide to start at the tip of the blue arrow (u). The red arrow is the sum.',
    },
    {
      type: 'note',
      content:
        'Order does not matter for addition: $u + v = v + u$. Try swapping the sliders — the red arrow lands in the same place either way. Addition is **commutative**.',
    },

    // ── SUBTRACTION ────────────────────
    {
      type: 'text',
      content:
        '**2. Vector subtraction.** Same idea, but subtract component by component. $u - v$ answers "what do I need to add to v to get u?"',
    },
    {
      type: 'math',
      latex:
        '\\begin{bmatrix} a \\\\ b \\end{bmatrix} - \\begin{bmatrix} c \\\\ d \\end{bmatrix} = \\begin{bmatrix} a - c \\\\ b - d \\end{bmatrix}',
      caption:
        'Vector subtraction — the arrow from v to u.',
    },
    {
      type: 'graph',
      title: 'Subtraction u − v as an arrow',
      vectors: [
        { x: 5, y: 2, color: 'blue', label: 'u = (5, 2)' },
        { x: 2, y: 5, color: 'emerald', label: 'v = (2, 5)' },
        { x: 3, y: -3, color: 'rose', label: 'u − v = (3, −3)', from: [2, 5] },
      ],
      domain: [-1, 7],
      range: [-4, 7],
      caption:
        'The vector u − v is what you add to v to reach u. Geometrically, it points FROM v TO u.',
    },
    {
      type: 'tip',
      content:
        'Vector subtraction is how AI measures **error**. If the model predicts $(5, 2)$ and the truth is $(2, 5)$, the error is $\\text{pred} - \\text{truth} = (3, -3)$. Training is the process of nudging the prediction so this error shrinks toward zero.',
    },

    // ── SCALING ────────────────────────
    {
      type: 'text',
      content:
        '**3. Scalar multiplication.** Multiply a vector by a single number (a scalar). Each component gets multiplied. The direction may flip (if scalar is negative), and the length changes, but the "line" it sits on stays the same.',
    },
    {
      type: 'math',
      latex:
        'k \\cdot \\begin{bmatrix} a \\\\ b \\end{bmatrix} = \\begin{bmatrix} k \\cdot a \\\\ k \\cdot b \\end{bmatrix}',
      caption:
        'Scalar multiplication — one number times every component of the vector.',
    },
    {
      type: 'text',
      content:
        'Example: $2 \\cdot (3, 4) = (6, 8)$. If $k = 0.5$, the vector shrinks: $0.5 \\cdot (3, 4) = (1.5, 2)$. If $k = -1$, the direction flips entirely: $-1 \\cdot (3, 4) = (-3, -4)$.',
    },
    {
      type: 'graph',
      title: 'Scaling a vector',
      vectors: [
        { x: 3, y: 4, color: 'blue', label: 'v = (3, 4)' },
        { x: 6, y: 8, color: 'emerald', label: '2v = (6, 8)' },
        { x: 1.5, y: 2, color: 'violet', label: '0.5v = (1.5, 2)' },
        { x: -3, y: -4, color: 'rose', label: '−v' },
      ],
      domain: [-8, 8],
      range: [-8, 8],
      caption:
        'All four vectors lie on the same line through the origin. Scaling just moves you further along (or backward on) that line.',
    },
    {
      type: 'simulation',
      title: 'Interactive — scale a vector',
      description:
        'Move the slider to change the scalar k. Watch how the vector stretches and flips.',
      sliders: [
        { id: 'k', label: 'k', min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
      ],
      render: ({ k }) => ({
        vectors: [
          { x: 3, y: 4, color: 'slate', label: 'v = (3, 4)', dashed: true },
          { x: 3 * k, y: 4 * k, color: 'brand', label: `kv = (${(3 * k).toFixed(1)}, ${(4 * k).toFixed(1)})` },
        ],
        domain: [-10, 10],
        range: [-10, 10],
      }),
      formula: ({ k }) =>
        `${k.toFixed(1)} \\cdot \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} ${(3 * k).toFixed(1)} \\\\ ${(4 * k).toFixed(1)} \\end{bmatrix}`,
      caption:
        'Try k = 0 — the vector collapses to a single point at the origin. Try k < 0 — the direction flips.',
    },
    {
      type: 'warning',
      content:
        'Notice: when you scale a vector, the **direction** stays the same (or flips to exactly opposite). The line it sits on does not change. Only the length changes. This is what "linear" means.',
    },

    // ── COMBINING ─────────────────────
    {
      type: 'text',
      content:
        'Add scaling and addition together and you get the most powerful idea in all of linear algebra: the **linear combination**.',
    },
    {
      type: 'math',
      latex:
        '\\text{linear combination of } u, v = a \\cdot u + b \\cdot v',
      caption:
        'Take some amount of u, add some amount of v. That is a linear combination. Almost every ML model is exactly this, layered many times over.',
    },
    {
      type: 'text',
      content:
        'The two scalars $a$ and $b$ decide **how much** of each vector to use. Change them, and you trace out every point reachable from u and v.',
    },
    {
      type: 'simulation',
      title: 'Interactive — explore a linear combination',
      description:
        'Change a and b. Watch where the resulting point lands.',
      sliders: [
        { id: 'a', label: 'a', min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
        { id: 'b', label: 'b', min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
      ],
      render: ({ a, b }) => ({
        vectors: [
          { x: 2, y: 0, color: 'blue', label: 'u = (2, 0)' },
          { x: 0, y: 3, color: 'emerald', label: 'v = (0, 3)' },
          { x: 2 * a, y: 3 * b, color: 'brand', label: 'au + bv' },
        ],
        domain: [-6, 6],
        range: [-6, 6],
      }),
      formula: ({ a, b }) =>
        `${a.toFixed(1)} \\cdot u + ${b.toFixed(1)} \\cdot v = \\begin{bmatrix} ${(2 * a).toFixed(1)} \\\\ ${(3 * b).toFixed(1)} \\end{bmatrix}`,
      caption:
        'As a and b range over all real numbers, the point (2a, 3b) covers the entire plane. u and v "span" the whole 2D space.',
    },
    {
      type: 'tip',
      content:
        'This is the single most important idea in all of machine learning. Every neural network layer is literally "multiply the input by some weights, add a bias, apply a function, repeat." Linear combinations, stacked hundreds of times.',
    },

    // ── WHY ───────────────────────────
    {
      type: 'text',
      content:
        'So why do these three operations — add, subtract, scale — matter so much?',
    },
    {
      type: 'text',
      content:
        'Because they are **all you need**. A neural network trained on billions of examples still, underneath, uses only these three. Multiplication of a matrix by a vector is just a stack of additions and scalings. Everything else is built on top.',
    },
    {
      type: 'text',
      content:
        'A word embedding — the vector that represents the word "king" in GPT — is meaningful because of these operations. "king" minus "man" plus "woman" lands you near "queen". That is a **linear combination** doing real work.',
    },
    {
      type: 'graph',
      title: 'The classic word arithmetic picture',
      vectors: [
        { x: 1, y: 1, color: 'blue', label: 'man' },
        { x: 4, y: 4, color: 'blue', label: 'king' },
        { x: 2, y: 0, color: 'rose', label: 'woman' },
        { x: 5, y: 3, color: 'rose', label: 'queen' },
        { x: 3, y: 3, color: 'slate', label: 'king − man', from: [1, 1] },
        { x: 3, y: 3, color: 'emerald', label: 'woman', from: [2, 0] },
      ],
      domain: [-1, 7],
      range: [-1, 6],
      caption:
        'king − man ≈ woman (both are "the same shift"). And king − man + woman ≈ queen. This is real: GPT embeddings actually do this.',
    },
    {
      type: 'note',
      content:
        'The word arithmetic example works because word embeddings are arranged so that "gender" and "royalty" become independent directions in the vector space. The math of add / subtract / scale is what makes this possible.',
    },
    {
      type: 'text',
      content:
        'That is Lesson 2. You now know how to combine vectors in the three fundamental ways. In the next lesson, you will learn to **measure** them — length, distance, and how similar two vectors are.',
    },
    {
      type: 'tip',
      content:
        'If you remember only one thing: **every ML operation is a linear combination.** Add. Scale. Add. That is the entire game.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question:
        'If $u = (2, 7)$ and $v = (4, -3)$, what is the **second component** of $u + v$?',
      correct: 4,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Add matching components: second of u + second of v = $7 + (-3)$.',
      explanation:
        '$u + v = (2 + 4,\\; 7 + (-3)) = (6, 4)$. The second component is $4$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'If $u = (5, 2)$ and $v = (1, 8)$, what is $u - v$?',
      options: [
        '$(6, 10)$',
        '$(4, -6)$',
        '$(−4, 6)$',
        '$(5, 2)$',
      ],
      correct: 1,
      explanation:
        '$u - v = (5 - 1,\\; 2 - 8) = (4, -6)$. Subtract matching components.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'What happens geometrically when you multiply a vector by $-1$?',
      options: [
        'The vector shrinks to half its length.',
        'The vector flips to point in the exact opposite direction.',
        'The vector disappears.',
        'The vector moves to the origin.',
      ],
      correct: 1,
      explanation:
        'Multiplying by $-1$ keeps the length the same but reverses the direction. $(3, 4)$ becomes $(-3, -4)$ — same line, opposite side of the origin.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'numeric-answer',
      math: true,
      question:
        'What is the **first component** of $3 \\cdot (2, 5)$?',
      correct: 6,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Multiply every component by the scalar 3.',
      explanation:
        '$3 \\cdot (2, 5) = (3 \\cdot 2,\\; 3 \\cdot 5) = (6, 15)$. The first component is $6$.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'A model predicts $(10, 4)$ but the true answer is $(7, 9)$. What is the **error vector** (prediction − truth)?',
      options: [
        '$(3, -5)$',
        '$(−3, 5)$',
        '$(17, 13)$',
        '$(70, 36)$',
      ],
      correct: 0,
      explanation:
        'Error = prediction − truth = $(10 - 7,\\; 4 - 9) = (3, -5)$. The model overshot the first number by 3 and undershot the second by 5. During training, the network adjusts so this error shrinks toward $(0, 0)$.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'What is a **linear combination** of two vectors $u$ and $v$?',
      options: [
        'Multiplying the two vectors together, component by component.',
        'Taking the larger of the two components.',
        'Adding them after scaling each by some number: $a \\cdot u + b \\cdot v$.',
        'Subtracting the smaller vector from the larger one.',
      ],
      correct: 2,
      explanation:
        'A linear combination means "take some amount of u, plus some amount of v". The two scalars $a$ and $b$ choose the amounts. Every neural network layer is built from linear combinations.',
      xp: 25,
    },
  ],
};