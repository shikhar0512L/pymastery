// 📐 Linear Algebra — Lesson 4: Matrices — Grids of Numbers

export const laMatricesIntroLesson = {
  id: 'la-matrices-intro',
  title: 'Matrices — Grids of Numbers',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'A matrix is a stack of vectors. It transforms things — rotates, scales, projects. Every neural network layer is a matrix waiting to happen.',

  sections: [
    {
      type: 'text',
      content:
        'If a vector is a single row of numbers, a **matrix** is a whole table of them — rows and columns, like a spreadsheet, but with precise mathematical meaning.',
    },
    {
      type: 'math',
      latex:
        'A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
      caption:
        'A 2×2 matrix — two rows, two columns, four numbers. The most common starting example.',
    },
    {
      type: 'text',
      content:
        'We describe a matrix by its **shape**: rows × columns. So a 2×2 matrix has 2 rows and 2 columns. A 3×5 matrix has 3 rows and 5 columns. The shape tells you everything about the structure.',
    },
    {
      type: 'text',
      content:
        'Real-life matrices are everywhere:',
    },
    {
      type: 'text',
      content:
        '• A grayscale image — a matrix of pixel brightness values\n• A spreadsheet — rows are people, columns are attributes\n• A dataset in ML — each row is one example, each column is a feature\n• A neural network layer — a matrix of learned weights',
    },
    {
      type: 'note',
      content:
        'Any dataset you have ever worked with is just a big matrix. 10,000 customers with 20 attributes each? That is a $10000 \\times 20$ matrix. The entire field of ML is essentially matrix operations.',
    },

    // ── MATRIX AS VECTORS ─────────────
    {
      type: 'text',
      content:
        'Here is the key mental model: a matrix is just a **collection of vectors**. You can read it by rows or by columns — both interpretations are useful.',
    },
    {
      type: 'math',
      latex:
        'A = \\begin{bmatrix} \\text{— } r_1 \\text{ —} \\\\ \\text{— } r_2 \\text{ —} \\end{bmatrix} = \\begin{bmatrix} | & | \\\\ c_1 & c_2 \\\\ | & | \\end{bmatrix}',
      caption:
        'Same matrix, two views. As a list of row vectors, or as a list of column vectors.',
    },
    {
      type: 'tip',
      content:
        'When you think of a dataset, you usually think row-first: "each row is one person." When you think of a linear transformation, you usually think column-first: "each column is a direction." Both are correct. Choose whichever is more useful for the problem in front of you.',
    },

    // ── MATRIX-VECTOR PRODUCT ─────────
    {
      type: 'text',
      content:
        'The most important thing you can do with a matrix is **multiply it by a vector**. This is the operation that makes linear algebra do real work.',
    },
    {
      type: 'text',
      content:
        'The rule: each **row** of the matrix takes the **dot product** with the vector, and produces one number in the result.',
    },
    {
      type: 'math',
      latex:
        '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax + by \\\\ cx + dy \\end{bmatrix}',
      caption:
        'Matrix × vector. Each output component is a combination of the input components — a weighted sum.',
    },
    {
      type: 'text',
      content:
        'Concrete example: $\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 4 + 0 \\cdot 5 \\\\ 0 \\cdot 4 + 3 \\cdot 5 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 15 \\end{bmatrix}$.',
    },
    {
      type: 'note',
      content:
        'The shape check: a $2 \\times 2$ matrix times a length-2 vector gives a length-2 vector. In general, an $m \\times n$ matrix takes an $n$-dimensional vector to an $m$-dimensional vector. If the middle dimensions do not match, the multiplication is not defined.',
    },

    // ── GEOMETRIC MEANING ─────────────
    {
      type: 'text',
      content:
        'Geometrically, a matrix **transforms** a vector. The same matrix applied to every point in space describes a shape distortion — stretch, rotate, squash, or a combination of all three.',
    },
    {
      type: 'graph',
      title: 'A scaling matrix stretches space',
      vectors: [
        { x: 2, y: 1, color: 'slate', label: 'v = (2, 1)' },
        { x: 4, y: 3, color: 'brand', label: 'Av = (4, 3)' },
      ],
      domain: [-1, 6],
      range: [-1, 5],
      caption:
        'The matrix A = [[2, 0], [0, 3]] stretches x by 2 and y by 3. The input vector (2, 1) becomes (4, 3).',
    },
    {
      type: 'text',
      content:
        'A matrix does not just transform one vector. It transforms every vector in the space at once. The **whole grid** gets stretched, squashed, or rotated.',
    },
    {
      type: 'simulation',
      title: 'Apply a matrix to a vector',
      description:
        'Change the entries of the matrix A. Watch how the vector v is transformed into Av.',
      sliders: [
        { id: 'a', label: 'a_{11}', min: -2, max: 2, step: 0.5, default: 1, decimals: 1 },
        { id: 'b', label: 'a_{12}', min: -2, max: 2, step: 0.5, default: 0, decimals: 1 },
        { id: 'c', label: 'a_{21}', min: -2, max: 2, step: 0.5, default: 0, decimals: 1 },
        { id: 'd', label: 'a_{22}', min: -2, max: 2, step: 0.5, default: 1, decimals: 1 },
      ],
      render: ({ a, b, c, d }) => {
        const vx = 2;
        const vy = 1;
        const rx = a * vx + b * vy;
        const ry = c * vx + d * vy;
        return {
          vectors: [
            { x: vx, y: vy, color: 'slate', label: 'v' },
            { x: rx, y: ry, color: 'brand', label: 'Av' },
          ],
          domain: [-6, 6],
          range: [-6, 6],
          points: [
            { x: vx, y: vy, color: 'slate', r: 4 },
            { x: rx, y: ry, color: 'brand', r: 5 },
          ],
        };
      },
      formula: ({ a, b, c, d }) => {
        const vx = 2;
        const vy = 1;
        const rx = a * vx + b * vy;
        const ry = c * vx + d * vy;
        return `A v = \\begin{bmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} ${rx} \\\\ ${ry} \\end{bmatrix}`;
      },
      caption:
        'Try setting the matrix to [[1, 0], [0, 1]] — you get back the original vector. Try [[0, -1], [1, 0]] — the vector rotates 90°.',
    },

    // ── IDENTITY & ROTATION ───────────
    {
      type: 'text',
      content:
        'Two special matrices you will meet again and again:',
    },
    {
      type: 'text',
      content:
        '**The identity matrix.** It does nothing — just returns the input vector unchanged. It is the matrix equivalent of multiplying by 1.',
    },
    {
      type: 'math',
      latex:
        'I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}',
      caption:
        'The identity matrix. $Iv = v$ for any vector v.',
    },
    {
      type: 'text',
      content:
        '**The rotation matrix.** It rotates every vector by an angle $\\theta$.',
    },
    {
      type: 'math',
      latex:
        'R(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}',
      caption:
        'The 2D rotation matrix. Plug in $\\theta = 90°$ and every vector rotates a quarter turn.',
    },
    {
      type: 'graph',
      title: 'Rotation by 90°',
      vectors: [
        { x: 2, y: 1, color: 'slate', label: 'v = (2, 1)' },
        { x: -1, y: 2, color: 'brand', label: 'Rv = (−1, 2)' },
      ],
      domain: [-3, 3],
      range: [-3, 3],
      caption:
        'The rotation matrix with θ = 90° turns (2, 1) into (−1, 2). The length is unchanged — only the direction rotates.',
    },
    {
      type: 'warning',
      content:
        'Matrix multiplication is **not commutative**: $AB \\neq BA$ in general. Rotation followed by scaling is different from scaling followed by rotation. Order matters. This is different from multiplying ordinary numbers.',
    },

    // ── WHY ───────────────────────────
    {
      type: 'text',
      content:
        'So why do matrices matter so much for AI?',
    },
    {
      type: 'text',
      content:
        'Because a neural network layer is **literally a matrix multiplication**. When data passes through a layer, it gets multiplied by a matrix of weights, then a small vector (the bias) is added, then a nonlinearity is applied. That is it. Every layer. Every network. Same operation.',
    },
    {
      type: 'math',
      latex:
        '\\text{output} = \\text{activation}(W \\cdot \\text{input} + b)',
      caption:
        'One neural network layer. W is a matrix, input and b are vectors. This is the whole forward pass.',
    },
    {
      type: 'note',
      content:
        'When ChatGPT processes a sentence, it pushes vectors through dozens of matrix multiplications per token. When Stable Diffusion generates an image, it does the same. When AlphaFold predicts a protein, same. Matrix multiplications are the entire computational substrate of modern AI.',
    },
    {
      type: 'tip',
      content:
        'That is Lesson 4. You now know what a matrix is, how it transforms a vector, and why it matters. Next lesson: the big one — matrix multiplication, and how two matrices combine.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the shape of the matrix $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$?',
      options: ['$3 \\times 2$', '$2 \\times 3$', '$6 \\times 1$', '$2 \\times 2$'],
      correct: 1,
      explanation:
        'Shape is always rows × columns. There are 2 rows and 3 columns, so it is $2 \\times 3$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'Compute the first component of $\\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix}$.',
      correct: 17,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'First output component = $3 \\cdot 4 + 1 \\cdot 5$.',
      explanation:
        'First component = $(3)(4) + (1)(5) = 12 + 5 = 17$. The second would be $(0)(4) + (2)(5) = 10$.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'What happens when you multiply any vector by the identity matrix $I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$?',
      options: [
        'The vector flips direction.',
        'The vector doubles in length.',
        'The vector is unchanged.',
        'The vector becomes the zero vector.',
      ],
      correct: 2,
      explanation:
        'The identity matrix is the matrix version of "multiply by 1". $Iv = v$ for every vector v. This makes it the starting point for thinking about what other matrices do.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'numeric-answer',
      math: true,
      question:
        'A $3 \\times 4$ matrix multiplies a vector of length 4. What is the length of the result?',
      correct: 3,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: '$m \\times n$ matrix times $n$-vector gives $m$-vector. Here $m = 3$, $n = 4$.',
      explanation:
        'An $m \\times n$ matrix takes an $n$-dimensional vector to an $m$-dimensional vector. Here, $3 \\times 4$ takes a length-4 vector to a length-3 vector.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'A neural network layer computes $\\text{activation}(W \\cdot x + b)$. What does the matrix $W$ do?',
      options: [
        'It stores the input data.',
        'It represents the learned weights that transform the input.',
        'It counts the number of layers.',
        'It normalizes the output.',
      ],
      correct: 1,
      explanation:
        '$W$ is the matrix of weights — the numbers the network learns during training. Multiplying $W$ by the input $x$ is what a layer does. Every modern AI system is a stack of these.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'If $A$ and $B$ are both matrices, is $AB$ always equal to $BA$?',
      options: [
        'Yes, matrix multiplication is commutative.',
        'No — the order of multiplication matters.',
        'Only for $2 \\times 2$ matrices.',
        'Only if both matrices are square.',
      ],
      correct: 1,
      explanation:
        'Matrix multiplication is **not commutative**. Rotating then scaling is different from scaling then rotating. This is one of the biggest differences from ordinary multiplication.',
      xp: 20,
    },
  ],
};