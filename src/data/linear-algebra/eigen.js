// 📐 Linear Algebra — Lesson 9: Eigenvalues & Eigenvectors

export const laEigenLesson = {
  id: 'la-eigen',
  title: 'Eigenvalues & Eigenvectors — The Special Directions',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Most vectors change direction when a matrix is applied. A few do not — they only stretch. Those special vectors are eigenvectors, and they reveal what a matrix really does.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine you apply a matrix to a cloud of points. Most points move to new locations, and the arrows from origin to point change direction. But a few special points move **along their original direction** — they just slide farther out or closer in.',
    },
    {
      type: 'text',
      content:
        'Those special directions are called **eigenvectors**. The amount they stretch or shrink is the **eigenvalue**.',
    },

    // ── DEFINITION ─────────────────────
    {
      type: 'math',
      latex:
        'A \\vec{v} = \\lambda \\vec{v}',
      caption:
        'The eigenvector equation. Applying A to v produces the same result as multiplying v by a single number λ.',
    },
    {
      type: 'text',
      content:
        'Read it carefully: $A\\vec{v}$ (a matrix times a vector) equals $\\lambda \\vec{v}$ (a scalar times the same vector). The matrix does not turn the vector — it only stretches it. The stretch factor is λ, the eigenvalue.',
    },
    {
      type: 'note',
      content:
        'Not every matrix has eigenvectors. And when it does, they usually come in pairs (one vector, one eigenvalue). But if you find them, they tell you everything about what the matrix does — its "soul", mathematically speaking.',
    },

    // ── GEOMETRIC PICTURE ─────────────
    {
      type: 'text',
      content:
        'The best way to understand eigenvectors is to see them. When you apply a matrix to a whole grid of vectors, most arrows swivel. The eigenvector directions do not swivel — they only change length.',
    },
    {
      type: 'simulation',
      title: 'Discover eigenvectors',
      description:
        'Rotate the input vector. Watch when Av stays parallel to v — that is when v is an eigenvector.',
      sliders: [
        { id: 'angle', label: '\\theta', min: 0, max: 360, step: 5, default: 0, decimals: 0 },
      ],
      render: ({ angle }) => {
        const rad = (angle * Math.PI) / 180;
        const vx = Math.cos(rad);
        const vy = Math.sin(rad);
        // Matrix A = [[2, 1], [1, 2]] — symmetric, eigenvectors are (1,1) and (1,-1)
        const A = [[2, 1], [1, 2]];
        const rx = A[0][0] * vx + A[0][1] * vy;
        const ry = A[1][0] * vx + A[1][1] * vy;
        return {
          vectors: [
            { x: vx, y: vy, color: 'slate', label: 'v' },
            { x: rx, y: ry, color: 'brand', label: 'Av' },
          ],
          domain: [-3, 3],
          range: [-3, 3],
        };
      },
      formula: ({ angle }) => {
        const rad = (angle * Math.PI) / 180;
        const vx = Math.cos(rad);
        const vy = Math.sin(rad);
        const A = [[2, 1], [1, 2]];
        const rx = A[0][0] * vx + A[0][1] * vy;
        const ry = A[1][0] * vx + A[1][1] * vy;
        // Cross product magnitude — zero when parallel
        const cross = vx * ry - vy * rx;
        const parallel = Math.abs(cross) < 0.15;
        return `v \\cdot Av_{\\perp} = ${cross.toFixed(3)}${parallel ? ' \\;\\; \\checkmark \\text{ parallel}' : ''}`;
      },
      caption:
        'Try angles 45° and 135°. At those points, Av stays parallel to v — you have found the eigenvectors of this matrix.',
    },
    {
      type: 'tip',
      content:
        'The symmetric matrix [[2, 1], [1, 2]] has two eigenvectors: (1, 1) and (1, -1), with eigenvalues 3 and 1. The eigenvector (1, 1) stretches by 3; the eigenvector (1, -1) stretches by only 1.',
    },

    // ── HOW TO FIND ────────────────────
    {
      type: 'text',
      content:
        'How do you actually find the eigenvalues? Rearrange the equation:',
    },
    {
      type: 'math',
      latex:
        'A \\vec{v} = \\lambda \\vec{v} \\;\\Rightarrow\\; (A - \\lambda I) \\vec{v} = 0',
      caption:
        'Bring everything to one side. The identity matrix appears because λ must be turned into a matrix to subtract.',
    },
    {
      type: 'text',
      content:
        'For this equation to have a nonzero solution $\\vec{v}$, the matrix $A - \\lambda I$ must be **singular** — its determinant must be zero.',
    },
    {
      type: 'math',
      latex:
        '\\det(A - \\lambda I) = 0',
      caption:
        'The characteristic equation. Solving this for λ gives all the eigenvalues.',
    },
    {
      type: 'text',
      content:
        'For a 2×2 matrix, this is a quadratic equation in λ. For an n×n matrix, it is a polynomial of degree n — which is why exact symbolic solutions are only practical for small matrices. Large matrices use iterative algorithms.',
    },
    {
      type: 'note',
      content:
        'You do not need to solve the characteristic equation by hand in this course. What matters is understanding what eigenvalues and eigenvectors **mean** — and seeing them in action in ML. NumPy gives you `np.linalg.eig(A)` for any matrix.',
    },

    // ── WHY IT MATTERS ────────────────
    {
      type: 'text',
      content:
        'So why do eigenvalues and eigenvectors matter so much in ML? Three reasons:',
    },
    {
      type: 'text',
      content:
        '**1. PCA.** Principal Component Analysis — the classic dimensionality-reduction technique — finds the eigenvectors of the **covariance matrix** of your data. Those eigenvectors are the "principal directions" along which data varies most. Eigenvalues tell you how much variance each direction captures.',
    },
    {
      type: 'text',
      content:
        '**2. Stability.** In optimisation and control theory, eigenvalues determine whether a system is stable, explosive, or oscillating. The rate of convergence of gradient descent depends on them.',
    },
    {
      type: 'text',
      content:
        '**3. Spectral decomposition.** Any symmetric matrix can be rewritten as a weighted sum of outer products of its eigenvectors. This is the "spectral theorem", and it underlies recommender systems, graph algorithms, and quantum mechanics.',
    },
    {
      type: 'simulation',
      title: 'Principal directions of a data cloud',
      description:
        'Rotate the data cloud. Notice that the two principal directions always point along the axes of the cloud — that is what eigenvectors of the covariance matrix give you.',
      sliders: [
        { id: 'stretch', label: 'stretch', min: 0.5, max: 4, step: 0.1, default: 2.5, decimals: 1 },
      ],
      render: ({ stretch }) => {
        // Two eigenvectors: (1,1)/√2 and (1,-1)/√2, with eigenvalues stretch² and 1
        const s = stretch;
        // Generate some points in the ellipse
        const points = [];
        for (let i = 0; i < 40; i++) {
          const t = (i / 40) * Math.PI * 2;
          // Circle radius 1 with some sampling jitter
          const r = 0.7 + 0.3 * Math.sin(t * 3);
          const cx = Math.cos(t) * r;
          const cy = Math.sin(t) * r;
          // Rotate by 45° then stretch x by s
          const rx = (cx - cy) / Math.sqrt(2);
          const ry = (cx + cy) / Math.sqrt(2);
          points.push({ x: rx * s, y: ry, color: 'cyan', r: 3 });
        }
        // Eigenvectors of the covariance ellipse
        const inv2 = 1 / Math.sqrt(2);
        return {
          vectors: [
            { x: inv2 * s * 1.5, y: inv2 * 1.5, color: 'brand', label: 'PC1' },
            { x: -inv2 * 1.5, y: inv2 * 1.5, color: 'violet', label: 'PC2' },
          ],
          points,
          domain: [-6, 6],
          range: [-6, 6],
        };
      },
      formula: ({ stretch }) => {
        const l1 = stretch * stretch;
        const l2 = 1;
        return `\\lambda_1 = ${l1.toFixed(2)},\\;\\; \\lambda_2 = ${l2.toFixed(2)}`;
      },
      caption:
        'The two red/violet arrows are the eigenvectors of the covariance matrix (the "principal components"). The eigenvalues (λ₁, λ₂) tell you how much variance each direction explains.',
    },
    {
      type: 'tip',
      content:
        'This is the picture behind PCA: find the directions where the data is most spread out, keep the top-k of them, drop the rest. That is how you go from 100-dimensional data to 10 dimensions without losing the important structure.',
    },

    // ── NUMERICAL NOTE ────────────────
    {
      type: 'text',
      content:
        'A few practical facts about eigenvalues in real ML code:',
    },
    {
      type: 'text',
      content:
        '• **Symmetric matrices** (like covariance matrices) always have real eigenvalues and orthogonal eigenvectors. This is a theorem — and it is why PCA works so cleanly.\n• **Non-symmetric matrices** can have complex eigenvalues. This matters for some physics applications but rarely for ML.\n• **Very large matrices** use iterative algorithms (like Lanczos) to compute just the top few eigenvalues, not all of them.',
    },
    {
      type: 'note',
      content:
        'In NumPy: `np.linalg.eig(A)` for general matrices, `np.linalg.eigh(A)` for symmetric/Hermitian matrices (faster and guaranteed real). For PCA specifically, use `np.linalg.svd` on the centered data — it is more numerically stable than eigendecomposition of the covariance matrix.',
    },
    {
      type: 'warning',
      content:
        'Eigenvalues are sensitive to floating-point error for poorly conditioned matrices. If you see complex eigenvalues where you expected real ones, it is usually numerical noise, not a real feature of the problem.',
    },
    {
      type: 'tip',
      content:
        'That is Lesson 9. Eigenvalues and eigenvectors reveal the "hidden structure" of a matrix — the directions along which it does nothing but stretch. They are the foundation of PCA, spectral clustering, PageRank, and much more.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'What makes a vector $\\vec{v}$ an **eigenvector** of a matrix A?',
      options: [
        'A times v equals the zero vector.',
        'A times v equals v itself.',
        'A times v is a scalar multiple of v — same direction, different length.',
        'A times v is always perpendicular to v.',
      ],
      correct: 2,
      explanation:
        'Eigenvectors are the special directions where A only stretches (never rotates). Mathematically, $A\\vec{v} = \\lambda\\vec{v}$ for some scalar λ.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'If $A\\vec{v} = 5\\vec{v}$, what is the eigenvalue associated with $\\vec{v}$?',
      correct: 5,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'The eigenvalue is the scalar that appears in $A\\vec{v} = \\lambda\\vec{v}$.',
      explanation:
        'Comparing $A\\vec{v} = 5\\vec{v}$ to the standard form $A\\vec{v} = \\lambda\\vec{v}$, we see $\\lambda = 5$. The eigenvalue tells you the vector stretches by a factor of 5.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'In PCA (Principal Component Analysis), what are the eigenvectors of the covariance matrix?',
      options: [
        'The mean of the dataset.',
        'The principal directions — the directions along which the data varies most.',
        'The noise in the dataset.',
        'The labels of the training data.',
      ],
      correct: 1,
      explanation:
        'PCA finds the directions of maximum variance. Those directions are exactly the eigenvectors of the covariance matrix. The corresponding eigenvalues tell you how much variance each direction captures.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Which type of matrix is guaranteed to have **real** eigenvalues and **orthogonal** eigenvectors?',
      options: [
        'Any square matrix.',
        'Symmetric matrices.',
        'Identity matrix only.',
        'Matrices with determinant 1.',
      ],
      correct: 1,
      explanation:
        'Symmetric matrices (A = Aᵀ) always have real eigenvalues and orthogonal eigenvectors. This is the spectral theorem, and it is why covariance matrices (which are always symmetric) behave so nicely in PCA.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Why is `np.linalg.eigh` preferred over `np.linalg.eig` for symmetric matrices?',
      options: [
        'eigh computes the eigenvalues in a different order.',
        'eigh is faster and guarantees real eigenvalues for symmetric input.',
        'eig does not exist in NumPy.',
        'eigh works on rectangular matrices.',
      ],
      correct: 1,
      explanation:
        'eigh exploits the symmetry of the input: it is faster and guaranteed to return real eigenvalues. Use eigh when you know the matrix is symmetric (as with covariance matrices). Use eig for general square matrices.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'numeric-answer',
      math: true,
      question:
        'The matrix $\\begin{bmatrix} 3 & 0 \\\\ 0 & 5 \\end{bmatrix}$ has eigenvectors along the x-axis and y-axis. What is the eigenvalue along the y-axis?',
      correct: 5,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'What does this matrix do to the vector $(0, 1)$?',
      explanation:
        'The matrix scales the x-component by 3 and the y-component by 5. The eigenvector $(0, 1)$ becomes $(0, 5)$ — so its eigenvalue is 5. Diagonal matrices are the easiest case: the eigenvalues are the diagonal entries.',
      xp: 20,
    },
  ],
};