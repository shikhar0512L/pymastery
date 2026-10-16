// 📐 Linear Algebra — Lesson 5: Matrix Multiplication

export const laMatrixMultiplicationLesson = {
  id: 'la-matrix-multiplication',
  title: 'Matrix Multiplication — Combining Transformations',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Matrix × vector transforms a vector. Matrix × matrix combines two transformations into one. This is the operation that runs billions of times per second inside every AI model.',

  sections: [
    {
      type: 'text',
      content:
        'In Lesson 4, you learned that a matrix transforms a vector. But what happens when you want to apply **two** transformations in a row — first rotate, then scale? You could apply them one after the other. Or you could combine them into a single matrix that does both. That is matrix multiplication.',
    },
    {
      type: 'text',
      content:
        'Think of it as function composition. If $f$ and $g$ are functions, then $f(g(x))$ means "first apply g, then f". Matrix multiplication is exactly the same idea: $AB$ means "first apply B, then apply A".',
    },
    {
      type: 'note',
      content:
        'Order matters! $AB \\neq BA$ in general. Rotating then scaling is not the same as scaling then rotating. This is the single biggest difference from ordinary numbers, and it catches everyone the first time.',
    },

    // ── THE RULE ───────────────────────
    {
      type: 'text',
      content:
        'Here is the rule for multiplying two 2×2 matrices:',
    },
    {
      type: 'math',
      latex:
        '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix} = \\begin{bmatrix} ae + bg & af + bh \\\\ ce + dg & cf + dh \\end{bmatrix}',
      caption:
        'Each entry of the result is a dot product: row of A, column of B.',
    },
    {
      type: 'text',
      content:
        'Concrete example: $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$. Let us compute each entry:',
    },
    {
      type: 'text',
      content:
        '• Top-left: $1 \\cdot 5 + 2 \\cdot 7 = 5 + 14 = 19$\n• Top-right: $1 \\cdot 6 + 2 \\cdot 8 = 6 + 16 = 22$\n• Bottom-left: $3 \\cdot 5 + 4 \\cdot 7 = 15 + 28 = 43$\n• Bottom-right: $3 \\cdot 6 + 4 \\cdot 8 = 18 + 32 = 50$',
    },
    {
      type: 'math',
      latex:
        '\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}',
      caption:
        'Each entry comes from combining one row of A with one column of B.',
    },
    {
      type: 'tip',
      content:
        'Memory trick: think of the **left matrix rows** and the **right matrix columns**. For each output cell, take the row from the left and the column from the right, and compute a dot product between them.',
    },

    // ── SHAPE RULE ─────────────────────
    {
      type: 'text',
      content:
        'The shape rule is the most useful thing to remember. If $A$ has shape $m \\times n$ and $B$ has shape $n \\times p$, then $AB$ has shape $m \\times p$.',
    },
    {
      type: 'math',
      latex:
        '(m \\times n) \\cdot (n \\times p) = (m \\times p)',
      caption:
        'The inner dimensions must match (both n), and they "cancel" to give the outer dimensions.',
    },
    {
      type: 'text',
      content:
        'If the inner dimensions do **not** match, the multiplication is not defined. This is why you cannot multiply a 2×3 matrix by another 2×3 matrix — the inner dimensions 3 and 2 do not match.',
    },
    {
      type: 'warning',
      content:
        'This is the single most common source of bugs in ML code. Whenever you see a shape mismatch error, come back to this rule: inner dimensions must match. Not equal to each other — they must be compatible as shown.',
    },
    {
      type: 'text',
      content:
        'Note an interesting consequence: $AB$ might be defined but $BA$ might not be. If A is 2×3 and B is 3×4, then $AB$ is 2×4 (fine), but $BA$ is 3×4 × 2×3 — inner dimensions 4 and 2 do not match, so it is undefined.',
    },

    // ── GEOMETRIC MEANING ─────────────
    {
      type: 'text',
      content:
        'Geometrically, matrix multiplication **composes two transformations**. If A rotates and B scales, then AB does both in one shot.',
    },
    {
      type: 'simulation',
      title: 'Compose two transformations',
      description:
        'Drag the rotation angle to see how the combined matrix behaves. The blue vector is the input; the green is the result after both transformations.',
      sliders: [
        { id: 'angle', label: '\\theta', min: 0, max: 360, step: 5, default: 45, decimals: 0 },
      ],
      render: ({ angle }) => {
        const rad = (angle * Math.PI) / 180;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        // Rotation matrix
        const R = [[c, -s], [s, c]];
        // Fixed scale matrix
        const S = [[1.5, 0], [0, 0.5]];
        // Compose: rotate first (R), then scale (S) → S·R
        const M = [
          [S[0][0] * R[0][0] + S[0][1] * R[1][0], S[0][0] * R[0][1] + S[0][1] * R[1][1]],
          [S[1][0] * R[0][0] + S[1][1] * R[1][0], S[1][0] * R[0][1] + S[1][1] * R[1][1]],
        ];
        const vx = 2, vy = 0;
        const rx = M[0][0] * vx + M[0][1] * vy;
        const ry = M[1][0] * vx + M[1][1] * vy;
        return {
          vectors: [
            { x: vx, y: vy, color: 'blue', label: 'input v' },
            { x: c * vx - s * vy, y: s * vx + c * vy, color: 'violet', label: 'Rv' },
            { x: rx, y: ry, color: 'emerald', label: '(SR)v' },
          ],
          domain: [-4, 4],
          range: [-4, 4],
        };
      },
      formula: ({ angle }) => {
        const rad = (angle * Math.PI) / 180;
        const c = Math.cos(rad).toFixed(2);
        const s = Math.sin(rad).toFixed(2);
        return `SR = \\begin{bmatrix} 1.5 & 0 \\\\ 0 & 0.5 \\end{bmatrix} \\begin{bmatrix} ${c} & -${s} \\\\ ${s} & ${c} \\end{bmatrix}`;
      },
      caption:
        'The violet arrow shows rotation only. The green arrow shows rotation followed by scaling — the combined transformation SR.',
    },
    {
      type: 'note',
      content:
        'Notice that we apply B **first** and A **second** to get AB. It feels backward at first, but it matches how functions compose: $f(g(x))$ means g goes first. Once you internalize it, the convention is natural.',
    },

    // ── IDENTITY UNDER MULTIPLICATION ──
    {
      type: 'text',
      content:
        'A useful sanity check: the identity matrix behaves like 1 in ordinary multiplication. So $AI = IA = A$ for any matrix A of compatible shape.',
    },
    {
      type: 'math',
      latex:
        'A I = I A = A',
      caption:
        'The identity matrix is the "neutral element" of matrix multiplication.',
    },
    {
      type: 'text',
      content:
        'Try it: $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$. Nothing changes. That is the point.',
    },

    // ── WHY IT MATTERS ────────────────
    {
      type: 'text',
      content:
        'So why is matrix multiplication the heartbeat of AI?',
    },
    {
      type: 'text',
      content:
        'Because neural networks are **stacks of matrices**. Feed a batch of inputs through a layer, and internally it is a single matrix multiplication: $\\text{batch} \\cdot W$. Stack 100 layers, and you get 100 matrix multiplications in a row.',
    },
    {
      type: 'text',
      content:
        'The batch itself is a matrix — each row is one example. So multiplying a batch by a weight matrix processes every example at once. This is why GPUs exist: they are built to do billions of matrix multiplications per second.',
    },
    {
      type: 'math',
      latex:
        '\\underbrace{X}_{\\text{batch} \\times \\text{features}} \\underbrace{W}_{\\text{features} \\times \\text{outputs}} = \\underbrace{XW}_{\\text{batch} \\times \\text{outputs}}',
      caption:
        'One neural network layer. X is the batch, W is the weights. Every modern AI system is a deep chain of these.',
    },
    {
      type: 'tip',
      content:
        'GPT-4 has roughly a trillion weights. Every single one of them gets multiplied with a real number (from your prompt) every time you chat with it. That is why the answer takes a few seconds — matrix multiplication at that scale is a genuine engineering achievement.',
    },
    {
      type: 'text',
      content:
        'You now know the fundamental operation of all of modern AI. From here, everything else is a variation or a special case.',
    },
    {
      type: 'tip',
      content:
        'Next: special matrices that matter — the identity (do nothing), the inverse (undo), and the determinant (how much area changes).',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question:
        'Compute the **top-left** entry of $\\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$.',
      correct: 17,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Top-left = (row 1 of A) · (column 1 of B) = $2 \\cdot 5 + 1 \\cdot 7$.',
      explanation:
        'Top-left = $2 \\cdot 5 + 1 \\cdot 7 = 10 + 7 = 17$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'If A is $3 \\times 5$ and B is $5 \\times 4$, what is the shape of $AB$?',
      options: ['$3 \\times 5$', '$5 \\times 5$', '$3 \\times 4$', 'Not defined'],
      correct: 2,
      explanation:
        'Inner dimensions are 5 and 5 — they match. Result is $3 \\times 4$ (from the outer dimensions).',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'If A is $2 \\times 3$ and B is $4 \\times 5$, is $AB$ defined?',
      options: [
        'Yes, result is $2 \\times 5$.',
        'Yes, result is $4 \\times 3$.',
        'No — inner dimensions 3 and 4 do not match.',
        'No — outer dimensions 2 and 5 do not match.',
      ],
      correct: 2,
      explanation:
        'For $AB$ to be defined, A\'s columns must equal B\'s rows. Here A has 3 columns, B has 4 rows — mismatch. So $AB$ is undefined.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'numeric-answer',
      math: true,
      question:
        'Compute the **bottom-right** entry of $\\begin{bmatrix} 1 & 0 \\\\ 2 & 3 \\end{bmatrix} \\begin{bmatrix} 4 & 1 \\\\ 5 & 6 \\end{bmatrix}$.',
      correct: 20,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Bottom-right = (row 2 of A) · (column 2 of B) = $2 \\cdot 1 + 3 \\cdot 6$.',
      explanation:
        'Bottom-right = $2 \\cdot 1 + 3 \\cdot 6 = 2 + 18 = 20$.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'A neural network layer is $\\text{output} = XW$. The batch X is $32 \\times 100$ (32 examples, 100 features). W is $100 \\times 50$ (100 inputs, 50 outputs). What is the shape of the output?',
      options: ['$32 \\times 100$', '$100 \\times 50$', '$32 \\times 50$', 'Undefined'],
      correct: 2,
      explanation:
        'The batch keeps its row count (32 examples stay 32). The feature dimension transforms from 100 to 50. So the output is $32 \\times 50$ — 32 examples, each with 50 new features.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question: 'Is $AB = BA$ always true for matrices?',
      options: [
        'Yes, matrix multiplication is commutative.',
        'No — order matters, and sometimes $BA$ is not even defined when $AB$ is.',
        'Only when both matrices are $2 \\times 2$.',
        'Only when both are the identity matrix.',
      ],
      correct: 1,
      explanation:
        'Matrix multiplication is **not** commutative. When A is 2×3 and B is 3×2, $AB$ is 2×2 but $BA$ is 3×3 — different shapes. And even when both are square, $AB$ and $BA$ can give completely different results.',
      xp: 25,
    },
  ],
};