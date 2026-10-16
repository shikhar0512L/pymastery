// 📘 NumPy — Lesson 8: Linear Algebra (final)

export const numpyLinAlgLesson = {
  id: 'numpy-linalg',
  title: 'Linear Algebra — Matrix Math',
  difficulty: 'intermediate',
  duration: 28,
  intro:
    'Linear algebra is the language of ML. Matrix multiply, inverse, solving systems, eigenvalues — all of it lives in np.linalg. This is the last piece before real ML.',
  sections: [
    {
      type: 'text',
      content:
        'Linear algebra in NumPy lives in two places: operators for the basics (`@`, `np.dot`, `np.matmul`) and the `np.linalg` module for everything advanced.',
    },
    {
      type: 'text',
      content:
        '`@` (the `matmul` operator) is the modern way to multiply matrices. For 2D arrays it is matrix multiplication. For 1D arrays it is the dot product.',
    },
    {
      type: 'code',
      content: 'Matrix multiplication with @:',
      code: `import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\n\nprint(A @ B)\nprint(np.matmul(A, B))     # same thing`,
      output: `[[19 22]\n [43 50]]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Matrix multiply is NOT element-wise. `A * B` multiplies element-by-element; `A @ B` does the row-times-column dot product. They are completely different operations.',
    },
    {
      type: 'code',
      content: 'Element-wise vs matrix multiplication:',
      code: `import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\n\nprint("A * B (element-wise):")\nprint(A * B)\n\nprint("A @ B (matrix):")\nprint(A @ B)`,
      output: `A * B (element-wise):\n[[ 5 12]\n [21 32]]\nA @ B (matrix):\n[[19 22]\n [43 50]]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'The classic bug: writing `A * B` when you meant `A @ B`. Always ask yourself: element-wise or linear-algebra? Shape mismatches will not save you — both work for square matrices, just wrong result.',
    },
    {
      type: 'text',
      content:
        'For 1D arrays, `@` reduces to the dot product — a single number. `np.dot(a, b)` does the same.',
    },
    {
      type: 'code',
      content: 'Dot product of two vectors:',
      code: `import numpy as np\n\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\n\nprint(a @ b)          # 1*4 + 2*5 + 3*6 = 32\nprint(np.dot(a, b))   # same\nprint((a * b).sum())  # manually`,
      output: `32\n32\n32`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Dot product is the "similarity score" of two vectors. It shows up everywhere: attention in transformers, cosine similarity, projections.',
    },
    {
      type: 'text',
      content:
        'Batch matmul: for 3D+ arrays, `@` treats the last two dimensions as a matrix and iterates over the rest.',
    },
    {
      type: 'code',
      content: 'Batch matrix multiply:',
      code: `import numpy as np\n\n# 5 matrices of shape (3, 4)\nA = np.random.rand(5, 3, 4)\n# 5 matrices of shape (4, 2)\nB = np.random.rand(5, 4, 2)\n\nC = A @ B\nprint(C.shape)   # (5, 3, 2)`,
      output: `(5, 3, 2)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Batched matmul is the core of every neural network layer. A batch of inputs times a weight matrix — one call, no loops.',
    },
    {
      type: 'text',
      content:
        '`np.linalg` — the advanced module. Identity, inverse, determinant, rank, trace.',
    },
    {
      type: 'code',
      content: 'Common np.linalg functions:',
      code: `import numpy as np\n\nA = np.array([[4.0, 7.0], [2.0, 6.0]])\n\nprint("det:", np.linalg.det(A))\nprint("rank:", np.linalg.matrix_rank(A))\nprint("trace:", np.trace(A))\nprint("inverse:")\nprint(np.linalg.inv(A))\n\n# Verify: A @ A_inv = identity\nprint(np.round(A @ np.linalg.inv(A), 6))`,
      output: `det: 10.0\nrank: 2\ntrace: 10.0\ninverse:\n[[ 0.6 -0.7]\n [-0.2  0.4]]\n[[ 1. -0.]\n [-0.  1.]]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`np.linalg.inv` raises `LinAlgError` if the matrix is singular (determinant 0). Always check `det` first, or use `np.linalg.pinv` (pseudo-inverse) for a safe fallback.',
    },
    {
      type: 'text',
      content:
        'Solving linear systems: instead of computing `inv(A) @ b`, use `np.linalg.solve(A, b)` — faster and numerically more stable.',
    },
    {
      type: 'code',
      content: 'Solving Ax = b:',
      code: `import numpy as np\n\n# 2x + 3y = 8\n# 4x + 5y = 14\nA = np.array([[2, 3], [4, 5]])\nb = np.array([8, 14])\n\nx = np.linalg.solve(A, b)\nprint(x)               # [x, y]\nprint(A @ x)           # verify: should equal b`,
      output: `[1. 2.]\n[ 8. 14.]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Rule of thumb: use `solve` — not `inv`. `inv` is 3x slower and less numerically stable. Inverse is only for cases where you genuinely need the matrix itself.',
    },
    {
      type: 'text',
      content:
        'Eigenvalues and eigenvectors: `np.linalg.eig` returns both. Used for PCA, stability analysis, and understanding linear transforms.',
    },
    {
      type: 'code',
      content: 'Eigen decomposition:',
      code: `import numpy as np\n\nA = np.array([[4, 1], [2, 3]])\n\neigvals, eigvecs = np.linalg.eig(A)\nprint("eigenvalues:", eigvals)\nprint("eigenvectors:")\nprint(eigvecs)\n\n# A @ v = λ * v for the first eigenpair\nv = eigvecs[:, 0]\nlam = eigvals[0]\nprint("A @ v:", (A @ v).round(6))\nprint("λ * v:", (lam * v).round(6))`,
      output: `eigenvalues: [5. 2.]\neigenvectors:\n[[ 0.70710678 -0.4472136 ]\n [ 0.70710678  0.89442719]]\nA @ v: [3.53553391 3.53553391]\nλ * v: [3.53553391 3.53553391]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Eigenvalues can be complex even for real matrices. `np.linalg.eigvals` gives just the values. For symmetric matrices, `np.linalg.eigh` is faster and guaranteed real.',
    },
    {
      type: 'text',
      content:
        'Norms measure the "size" of a vector or matrix. `np.linalg.norm` covers L1, L2, Frobenius and more.',
    },
    {
      type: 'code',
      content: 'Vector and matrix norms:',
      code: `import numpy as np\n\na = np.array([3, 4])\nprint("L2:", np.linalg.norm(a))              # sqrt(9+16) = 5\nprint("L1:", np.linalg.norm(a, ord=1))       # 3 + 4 = 7\n\nA = np.array([[1, 2], [3, 4]])\nprint("Frobenius:", np.linalg.norm(A))       # sqrt(1+4+9+16)`,
      output: `L2: 5.0\nL1: 7.0\nFrobenius: 5.477225575051661`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Norms are used as loss functions (L2 loss), regularization (L1/L2 penalties), and distance metrics. You will see `np.linalg.norm(a - b)` as "distance between a and b" constantly.',
    },
    {
      type: 'text',
      content:
        '**Capstone: Linear regression from scratch.** Fit a line `y = mx + c` to noisy data using `np.linalg.lstsq` — least squares. This is the simplest ML algorithm and it uses everything you learned.',
    },
    {
      type: 'code',
      content: 'Linear regression with lstsq:',
      code: `import numpy as np\nnp.random.seed(42)\n\n# True relationship: y = 3x + 5 + noise\nx = np.linspace(0, 10, 50)\ny = 3 * x + 5 + np.random.normal(0, 2, 50)\n\n# Build design matrix [x, 1]\nX = np.column_stack([x, np.ones_like(x)])\n\n# Solve least squares\ncoeffs, residuals, rank, sv = np.linalg.lstsq(X, y, rcond=None)\nm, c = coeffs\nprint(f"slope: {m:.3f}")     # close to 3\nprint(f"intercept: {c:.3f}")  # close to 5`,
      output: `slope: 3.023\nintercept: 4.826`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`lstsq` minimizes sum of squared residuals. It is the numerically stable way to solve an overdetermined system (more equations than unknowns) — exactly what regression is.',
    },
    {
      type: 'code',
      content: 'Extend to multiple features:',
      code: `import numpy as np\nnp.random.seed(0)\n\n# y = 2*x1 + 3*x2 + 1\nn = 100\nX = np.random.rand(n, 2)\ny = 2 * X[:, 0] + 3 * X[:, 1] + 1 + np.random.normal(0, 0.1, n)\n\n# Add intercept column\nX_aug = np.column_stack([X, np.ones(n)])\n\ncoeffs, *_ = np.linalg.lstsq(X_aug, y, rcond=None)\nprint(coeffs.round(3))   # ~[2, 3, 1]`,
      output: `[2.004 3.005 0.995]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is linear algebra. Matrix multiply, inv, solve, eig, norm, lstsq. Every ML algorithm you will meet — linear regression, logistic regression, PCA, neural networks — is built from these primitives.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What does this print?',
      code: 'import numpy as np\nA = np.array([[1, 2], [3, 4]])\nprint(A @ A)',
      options: [
        '[[1 4] [9 16]]',
        '[[7 10] [15 22]]',
        '[[2 4] [6 8]]',
        'Error',
      ],
      correct: 1,
      explanation:
        'Matrix multiply. Row 0 of A times col 0 of A = 1*1 + 2*3 = 7. Row 0 * col 1 = 1*2 + 2*4 = 10. Similarly for row 1: 3*1 + 4*3 = 15, 3*2 + 4*4 = 22.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What is the output?',
      code: 'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(a @ b)',
      options: ['[4 10 18]', '32', '15', 'Error'],
      correct: 1,
      explanation:
        'For 1D arrays, @ is the dot product: 1*4 + 2*5 + 3*6 = 32. Single number.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You want to solve the system `Ax = b`. Which is the recommended approach?',
      options: [
        'x = np.linalg.inv(A) @ b',
        'x = np.linalg.solve(A, b)',
        'x = b / A',
        'x = A @ b',
      ],
      correct: 1,
      explanation:
        '`np.linalg.solve` is faster (no explicit inverse) and more numerically stable. Only use `inv` when you genuinely need the matrix A⁻¹ itself.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so we get the eigenvalues of a square matrix A:',
      code: 'import numpy as np\nA = np.array([[4, 1], [2, 3]])\nvals, vecs = np.linalg.___(A)',
      options: ['eig', 'eigen', 'eigvals', 'svd'],
      correct: 0,
      explanation:
        '`np.linalg.eig(A)` returns both eigenvalues and eigenvectors. `eigvals` would give only the values. `svd` is a different decomposition.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `linear_regression(x, y)` that fits `y = m*x + c` to the data using `np.linalg.lstsq`. Return a tuple `(m, c)`.',
      starterCode:
        'import numpy as np\n\ndef linear_regression(x, y):\n    # your code here\n    pass',
      tests: [
        {
          input:
            'import numpy as np\nx = np.array([1.0, 2.0, 3.0, 4.0])\ny = 2*x + 1\nm, c = linear_regression(x, y)\nround(float(m), 4)',
          expected: '2.0',
        },
        {
          input:
            'import numpy as np\nx = np.array([1.0, 2.0, 3.0, 4.0])\ny = 2*x + 1\nm, c = linear_regression(x, y)\nround(float(c), 4)',
          expected: '1.0',
        },
        {
          input:
            'import numpy as np\nx = np.array([0.0, 1.0, 2.0])\ny = 5*x - 3\nm, c = linear_regression(x, y)\nround(float(m), 4)',
          expected: '5.0',
        },
      ],
      hint: 'Build design matrix `X = np.column_stack([x, np.ones_like(x)])`. Call `np.linalg.lstsq(X, y, rcond=None)`. Return `(coeffs[0], coeffs[1])`.',
      solution:
        'import numpy as np\n\ndef linear_regression(x, y):\n    X = np.column_stack([x, np.ones_like(x)])\n    coeffs, *_ = np.linalg.lstsq(X, y, rcond=None)\n    return coeffs[0], coeffs[1]',
      explanation:
        'Least squares finds the (m, c) that minimizes squared error. With noise-free data, it recovers the exact coefficients. This is the simplest form of supervised learning.',
      xp: 40,
    },
    {
      id: 'q6',
      type: 'code-challenge',
      question:
        'Write `matrix_power(A, n)` that returns A raised to the power n using matrix multiplication (not element-wise). Use `np.linalg.matrix_power` or a loop.',
      starterCode:
        'import numpy as np\n\ndef matrix_power(A, n):\n    # your code here\n    pass',
      tests: [
        {
          input: 'matrix_power(np.array([[1, 1], [0, 1]]), 3).tolist()',
          expected: '[[1, 3], [0, 1]]',
        },
        {
          input: 'matrix_power(np.array([[2, 0], [0, 3]]), 2).tolist()',
          expected: '[[4, 0], [0, 9]]',
        },
        {
          input: 'matrix_power(np.eye(3, dtype=int), 5).tolist()',
          expected: '[[1, 0, 0], [0, 1, 0], [0, 0, 1]]',
        },
      ],
      hint: '`np.linalg.matrix_power(A, n)` does exactly this — fast exponentiation via repeated squaring.',
      solution:
        'import numpy as np\n\ndef matrix_power(A, n):\n    return np.linalg.matrix_power(A, n)',
      explanation:
        'Matrix power uses repeated squaring internally — O(log n) matrix multiplies instead of O(n). For the identity matrix, any power is the identity.',
      xp: 35,
    },
    {
      id: 'q7',
      type: 'output-match',
      question:
        'Compute the dot product of [1, 2, 3] and [4, 5, 6] and print the result. Use `@` or `np.dot`.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '32',
      hint: 'np.array([1,2,3]) @ np.array([4,5,6]) → 1*4 + 2*5 + 3*6 = 32.',
      solution:
        'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(a @ b)',
      explanation:
        'The dot product is the fundamental linear-algebra operation. Single number output for two 1D vectors of the same length.',
      xp: 25,
    },
  ],
};