// 📐 Linear Algebra — Lesson 6: Identity, Inverse & Determinant

export const laInverseDeterminantLesson = {
  id: 'la-inverse-determinant',
  title: 'Identity, Inverse & Determinant',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Some matrices undo each other. Some stretch space by a huge amount. The inverse undoes, the determinant measures how much the space changes. Both are essential for solving real problems.',

  sections: [
    {
      type: 'text',
      content:
        'You have met a few special matrices already. This lesson introduces three more, and they are the most important special cases in all of linear algebra.',
    },

    // ── IDENTITY ───────────────────────
    {
      type: 'text',
      content:
        '**1. The identity matrix.** The matrix that does nothing.',
    },
    {
      type: 'math',
      latex:
        'I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}',
      caption:
        'Ones on the diagonal, zeros everywhere else. Multiply any vector or matrix by I and nothing changes.',
    },
    {
      type: 'text',
      content:
        'You already saw that $Iv = v$ and $AI = A$. The identity is the neutral element of multiplication, just like the number 1 for ordinary numbers. In higher dimensions, the identity has 1s along the diagonal and 0s elsewhere — a 3×3 identity, a 4×4 identity, and so on.',
    },
    {
      type: 'note',
      content:
        'Notation: the size of the identity is usually implicit. If A is 3×3, then "I" means the 3×3 identity. This saves a lot of ink and is standard in every textbook.',
    },

    // ── INVERSE ───────────────────────
    {
      type: 'text',
      content:
        '**2. The inverse matrix.** The matrix that undoes another one.',
    },
    {
      type: 'text',
      content:
        'If A transforms a vector, the inverse $A^{-1}$ transforms it back. Multiply A by $A^{-1}$ and you get the identity — the do-nothing transformation.',
    },
    {
      type: 'math',
      latex:
        'A A^{-1} = A^{-1} A = I',
      caption:
        'The defining property of the inverse. It is the matrix analogue of dividing — except you cannot just "divide" matrices, you multiply by the inverse.',
    },
    {
      type: 'text',
      content:
        'The inverse of a 2×2 matrix has a nice closed form:',
    },
    {
      type: 'math',
      latex:
        '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}',
      caption:
        'Swap the diagonal, flip the signs of the off-diagonal, divide by ad − bc.',
    },
    {
      type: 'text',
      content:
        'Notice the quantity $ad - bc$ in the denominator. It appears literally everywhere. It has a name: the **determinant**.',
    },
    {
      type: 'text',
      content:
        'For example, take $A = \\begin{bmatrix} 4 & 7 \\\\ 2 & 6 \\end{bmatrix}$. Then $ad - bc = 4 \\cdot 6 - 7 \\cdot 2 = 24 - 14 = 10$. So $A^{-1} = \\frac{1}{10} \\begin{bmatrix} 6 & -7 \\\\ -2 & 4 \\end{bmatrix} = \\begin{bmatrix} 0.6 & -0.7 \\\\ -0.2 & 0.4 \\end{bmatrix}$.',
    },
    {
      type: 'warning',
      content:
        'If the determinant is **zero**, the matrix has NO inverse. It is called **singular**. This happens when the matrix squashes space down to a lower dimension — like flattening a 2D plane onto a line. Once flattened, you cannot undo it.',
    },

    // ── DETERMINANT ───────────────────
    {
      type: 'text',
      content:
        '**3. The determinant.** A single number that captures how much a matrix scales area (or volume, in higher dimensions).',
    },
    {
      type: 'math',
      latex:
        '\\det \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc',
      caption:
        'The determinant of a 2×2 matrix. For 3×3 and higher, the formula grows, but the meaning stays the same.',
    },
    {
      type: 'text',
      content:
        'The determinant answers: **how much does the transformation stretch or shrink the space?**',
    },
    {
      type: 'text',
      content:
        '• $|\\det| = 1$ — the matrix preserves area (rotation, reflection).\n• $|\\det| = 2$ — space doubles in area.\n• $|\\det| = 0.5$ — space halves in area.\n• $\\det = 0$ — space collapses to a lower dimension. No inverse.\n• $\\det < 0$ — the matrix flips orientation (like a mirror).',
    },
    {
      type: 'graph',
      title: 'The unit square transformed',
      fns: [
        { fn: (x) => x, color: 'slate', label: 'original square', dashed: true, strokeWidth: 1.5 },
      ],
      lines: [],
      vectors: [
        { x: 2, y: 0, color: 'brand', label: 'col 1' },
        { x: 0, y: 2, color: 'emerald', label: 'col 2' },
      ],
      points: [
        { x: 2, y: 2, color: 'brand', r: 4, label: 'det = 4' },
      ],
      domain: [-1, 4],
      range: [-1, 4],
      caption:
        'The matrix [[2, 0], [0, 2]] scales both axes by 2. The unit square (area 1) becomes a 2×2 square (area 4). Determinant = 4.',
    },
    {
      type: 'simulation',
      title: 'Explore the determinant',
      description:
        'Drag the four entries of the matrix. Watch how the determinant changes.',
      sliders: [
        { id: 'a', label: 'a', min: -3, max: 3, step: 0.5, default: 2, decimals: 1 },
        { id: 'b', label: 'b', min: -3, max: 3, step: 0.5, default: 0, decimals: 1 },
        { id: 'c', label: 'c', min: -3, max: 3, step: 0.5, default: 0, decimals: 1 },
        { id: 'd', label: 'd', min: -3, max: 3, step: 0.5, default: 2, decimals: 1 },
      ],
      render: ({ a, b, c, d }) => {
        const cols = [
          { x: a, y: c, color: 'brand', label: 'col 1' },
          { x: b, y: d, color: 'emerald', label: 'col 2' },
        ];
        return {
          vectors: cols,
          domain: [-4, 4],
          range: [-4, 4],
        };
      },
      formula: ({ a, b, c, d }) => {
        const det = a * d - b * c;
        return `\\det = ${a} \\cdot ${d} - ${b} \\cdot ${c} = ${det.toFixed(2)}`;
      },
      caption:
        'The two arrows are the columns of A. The area of the parallelogram they form equals |det(A)|. When det = 0, the arrows line up and the area collapses to zero.',
    },
    {
      type: 'tip',
      content:
        'Determinant has an elegant geometric meaning: it is the **signed area** (in 2D) of the parallelogram formed by the matrix columns. In 3D, it is the volume of the parallelpiped. In higher dimensions, the pattern continues — it measures the "size" of the transformed unit cube.',
    },
    {
      type: 'note',
      content:
        'The determinant is one of the most-used quantities in all of mathematics. It tells you if a matrix is invertible, it appears in the change-of-variables formula in calculus, it shows up in eigenvalues, and it is the foundation of the Jacobian in optimisation.',
    },

    // ── SOLVING ────────────────────────
    {
      type: 'text',
      content:
        'Here is why inverses are so important: they let you **solve equations**.',
    },
    {
      type: 'text',
      content:
        'If you have $Ax = b$ — some matrix times an unknown vector equals a known vector — you can solve for x by multiplying both sides by the inverse.',
    },
    {
      type: 'math',
      latex:
        'Ax = b \\quad \\Rightarrow \\quad x = A^{-1} b',
      caption:
        'The inverse "divides out" A. This is the matrix version of $ax = b \\Rightarrow x = b/a$.',
    },
    {
      type: 'text',
      content:
        'In practice, people almost never compute $A^{-1}$ explicitly. It is slow and numerically unstable. Instead, they use a method called **linear solving**, which we will explore in the next lesson.',
    },
    {
      type: 'warning',
      content:
        'Never solve $Ax = b$ by literally computing $A^{-1}b$ in real code. Use `np.linalg.solve(A, b)` instead — it is faster, more accurate, and handles edge cases gracefully. The inverse is a beautiful mathematical idea, but a poor computational tool.',
    },
    {
      type: 'text',
      content:
        'You now know the three special matrices: identity (do nothing), inverse (undo), and determinant (how much scaling). Combined with matrix multiplication, you have the full toolkit of linear transformations.',
    },
    {
      type: 'tip',
      content:
        'Next: solving systems of equations — how to find x in $Ax = b$, and why this is the same thing as training a machine learning model.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question:
        'What is the determinant of $\\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$?',
      correct: 10,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'det = $ad - bc = 3 \\cdot 4 - 1 \\cdot 2$.',
      explanation:
        '$\\det = 3 \\cdot 4 - 1 \\cdot 2 = 12 - 2 = 10$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'A matrix has determinant 0. What does this mean?',
      options: [
        'It transforms every vector to the zero vector.',
        'It has no inverse — it squashes space into a lower dimension.',
        'It doubles the area of every shape.',
        'It is the identity matrix.',
      ],
      correct: 1,
      explanation:
        'Determinant 0 means the matrix flattens space — 2D to a line, or 3D to a plane. Once flattened, there is no way to unflatten, so the matrix has no inverse. Such matrices are called **singular**.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'What is the determinant of the identity matrix $I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$?',
      correct: 1,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: '$\\det I = 1 \\cdot 1 - 0 \\cdot 0$.',
      explanation:
        '$\\det I = 1$. Which makes sense — the identity does not stretch anything, so the "area scaling" factor is 1.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Given $Ax = b$, why is it better to use `np.linalg.solve(A, b)` instead of computing $A^{-1}b$?',
      options: [
        'It is only better for very small matrices.',
        'It is faster and more numerically stable.',
        'The inverse does not always exist, but solve always works.',
        'They are equivalent, but solve is shorter to type.',
      ],
      correct: 1,
      explanation:
        'Computing the inverse is slower (roughly 3× slower) and introduces more floating-point error. `solve` uses a direct method (LU decomposition) that is both faster and more accurate. This is a standard rule in numerical linear algebra.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'numeric-answer',
      math: true,
      question:
        'What is the determinant of $\\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}$?',
      correct: 0,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'det = $2 \\cdot 2 - 4 \\cdot 1$.',
      explanation:
        '$\\det = 2 \\cdot 2 - 4 \\cdot 1 = 4 - 4 = 0$. This matrix is singular — its two columns are parallel, so it collapses space onto a line. That is why the determinant is zero.',
      xp: 20,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'If $\\det(A) = 3$, what is $\\det(A^{-1})$?',
      options: ['$-3$', '$1/3$', '$3$', '$9$'],
      correct: 1,
      explanation:
        'Since $A A^{-1} = I$, taking determinants gives $\\det(A) \\cdot \\det(A^{-1}) = 1$. So $\\det(A^{-1}) = 1/\\det(A) = 1/3$. If A triples the area, its inverse shrinks it back by a third.',
      xp: 25,
    },
  ],
};