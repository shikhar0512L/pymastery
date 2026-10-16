// 📐 Linear Algebra — Lesson 7: Linear Systems (Ax = b)

export const laLinearSystemsLesson = {
  id: 'la-linear-systems',
  title: 'Linear Systems — Solving Ax = b',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'A system of linear equations is a puzzle: multiple unknowns, multiple constraints. Matrix form Ax = b turns the puzzle into a single multiplication. This is where linear algebra starts to earn its keep.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine you are buying fruit. Apples cost $2, bananas cost $3. You buy 4 items for a total of $11. How many of each did you buy?',
    },
    {
      type: 'text',
      content:
        'Two equations, two unknowns. This is a **system of linear equations**:',
    },
    {
      type: 'math',
      latex:
        '\\begin{cases} a + b = 4 \\\\ 2a + 3b = 11 \\end{cases}',
      caption:
        'Two equations. a = apples, b = bananas. Solve for a and b.',
    },
    {
      type: 'text',
      content:
        'You could solve it by hand (substitute, or eliminate). You would find $a = 1$, $b = 3$. But if there are 100 unknowns and 100 equations, hand-solving is hopeless. Matrix notation makes it systematic.',
    },

    // ── MATRIX FORM ────────────────────
    {
      type: 'text',
      content:
        'Here is the key insight: any linear system can be written as a single matrix equation $Ax = b$.',
    },
    {
      type: 'math',
      latex:
        '\\underbrace{\\begin{bmatrix} 1 & 1 \\\\ 2 & 3 \\end{bmatrix}}_{A} \\underbrace{\\begin{bmatrix} a \\\\ b \\end{bmatrix}}_{x} = \\underbrace{\\begin{bmatrix} 4 \\\\ 11 \\end{bmatrix}}_{b}',
      caption:
        'The coefficient matrix A, the unknown vector x, the constant vector b.',
    },
    {
      type: 'text',
      content:
        'Read it as: "the matrix A transforms the unknown vector x into the known vector b". The system becomes a matrix question: **what input produces this output?**',
    },
    {
      type: 'tip',
      content:
        'This mental shift is enormous. Instead of "solving equations", you are now thinking "what does the inverse of A do to b". Every method for solving systems — substitution, elimination, Gaussian, LU — is a different way of computing $A^{-1}b$ without forming the inverse.',
    },

    // ── GEOMETRIC PICTURE ─────────────
    {
      type: 'text',
      content:
        'Each equation defines a line in the plane. The solution to the system is where the two lines meet.',
    },
    {
      type: 'graph',
      title: 'Two lines meeting at a point',
      fns: [
        { fn: (x) => 4 - x, color: 'blue', label: 'a + b = 4' },
        { fn: (x) => (11 - 2 * x) / 3, color: 'emerald', label: '2a + 3b = 11' },
      ],
      points: [
        { x: 1, y: 3, color: 'brand', r: 6, label: '(1, 3)' },
      ],
      domain: [-1, 6],
      range: [-1, 6],
      caption:
        'The two lines meet at exactly one point — (1, 3). That is the unique solution to the system.',
    },
    {
      type: 'text',
      content:
        'Interesting: not every system has exactly one solution. There are three cases.',
    },
    {
      type: 'text',
      content:
        '• **Unique solution.** The lines meet at exactly one point. $\\det(A) \\neq 0$.\n• **No solution.** The lines are parallel. No point satisfies both equations. $\\det(A) = 0$ and b is off the line.\n• **Infinitely many solutions.** The lines coincide. Every point on the line is a solution. $\\det(A) = 0$ and b lies on the line.',
    },
    {
      type: 'warning',
      content:
        'Note the crucial role of the determinant. $\\det(A) \\neq 0$ means A is invertible, so the system has a unique solution. $\\det(A) = 0$ means A is singular — the system either has no solution or infinitely many. In ML, this is exactly what "the model cannot be solved uniquely" means.',
    },

    // ── HIGHER DIMENSIONS ─────────────
    {
      type: 'text',
      content:
        'In 3D, each equation defines a plane. The solution is the point (or line, or plane) where all three planes meet.',
    },
    {
      type: 'text',
      content:
        'Same rules apply: unique solution when the planes meet at exactly one point; no solution when they are "parallel" in some way; infinite solutions when they are stacked on top of each other.',
    },
    {
      type: 'note',
      content:
        'In machine learning, systems usually have **many more equations than unknowns**. You have 1000 data points but only 3 parameters to fit. That system almost never has an exact solution. Instead, you find the closest solution — the one that minimises the total error. This is called **least squares**, and it is the mathematical heart of linear regression.',
    },

    // ── LEAST SQUARES INTUITION ───────
    {
      type: 'text',
      content:
        'Here is the intuition. Suppose you are fitting a line to 5 points. Two unknowns (slope and intercept), 5 equations. The line cannot pass through all 5 points exactly. So which line is "best"?',
    },
    {
      type: 'text',
      content:
        'The best line minimises the sum of squared distances from each point to the line. That is the **least squares** solution.',
    },
    {
      type: 'simulation',
      title: 'Least squares fit',
      description:
        'Move the sliders to change the line. The goal is to minimise the total squared error (the sum of the areas of the red squares).',
      sliders: [
        { id: 'm', label: 'm', min: 0, max: 3, step: 0.1, default: 1, decimals: 1 },
        { id: 'c', label: 'c', min: -2, max: 3, step: 0.1, default: 0, decimals: 1 },
      ],
      render: ({ m, c }) => {
        // 5 sample points with a bit of noise
        const points = [
          { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2.5 }, { x: 3, y: 3.5 }, { x: 4, y: 4 },
        ];
        const residualVectors = [];
        for (const p of points) {
          const predicted = m * p.x + c;
          residualVectors.push({
            x: p.x, y: predicted, color: 'rose', from: [p.x, p.y], strokeWidth: 1.5,
          });
        }
        return {
          fns: [{ fn: (x) => m * x + c, color: 'brand', label: `y = ${m}x + ${c}` }],
          points: points.map((p) => ({ x: p.x, y: p.y, color: 'cyan', r: 5 })),
          vectors: residualVectors,
          domain: [-1, 5],
          range: [-1, 5],
        };
      },
      formula: ({ m, c }) => {
        const points = [
          { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2.5 }, { x: 3, y: 3.5 }, { x: 4, y: 4 },
        ];
        let sse = 0;
        for (const p of points) {
          const r = p.y - (m * p.x + c);
          sse += r * r;
        }
        return `\\text{SSE} = ${sse.toFixed(2)}`;
      },
      caption:
        'The red arrows show the error at each point. Move the sliders to make those errors smaller. The best (m, c) minimises the sum of squared errors.',
    },
    {
      type: 'tip',
      content:
        'This is exactly what linear regression does — it finds the slope and intercept that minimise SSE. And guess what: the answer is one line of NumPy: `np.linalg.lstsq(X, y)`. You met it back in the NumPy module. Now you know why it works.',
    },

    // ── GAUSSIAN INTUITION ────────────
    {
      type: 'text',
      content:
        'In practice, computers solve $Ax = b$ using **Gaussian elimination** — systematically subtracting equations from each other to isolate one variable at a time. It is the same idea as hand-solving, just automated and generalised.',
    },
    {
      type: 'text',
      content:
        'You do not need to memorise the algorithm. What you need to know is: any linear system can be solved (or proven unsolvable) efficiently. That is one of the great results of linear algebra.',
    },
    {
      type: 'note',
      content:
        'NumPy exposes two functions for solving systems: `np.linalg.solve(A, b)` for square invertible systems (exact solution), and `np.linalg.lstsq(A, b)` for over-determined systems (least-squares solution). Rule of thumb: if A is square and invertible, use solve; otherwise use lstsq.',
    },

    // ── WHY ───────────────────────────
    {
      type: 'text',
      content:
        'So why is this important for AI?',
    },
    {
      type: 'text',
      content:
        'Because **training a machine learning model is a linear system** (in disguise). You have data (equations) and unknown parameters (the vector x). You want to find the parameters that best explain the data. That is a system $Ax = b$ — usually with more equations than unknowns, solved by least squares.',
    },
    {
      type: 'text',
      content:
        'For linear models (linear regression, logistic regression without the sigmoid, etc.), the solution really is a single matrix operation. For neural networks, the equations become nonlinear, but the underlying idea is the same: find x such that Ax ≈ b.',
    },
    {
      type: 'tip',
      content:
        'That is Lesson 7. You can now look at a machine learning paper and read the math: an over-determined system solved by least squares. Next: eigenvectors and eigenvalues — the geometry of matrices that do not rotate.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'Write the system $\\begin{cases} 3x + 2y = 5 \\\\ x - y = 1 \\end{cases}$ in matrix form $Ax = b$. What is A?',
      options: [
        '$\\begin{bmatrix} 3 & 2 \\\\ 1 & -1 \\end{bmatrix}$',
        '$\\begin{bmatrix} 5 & 1 \\\\ 1 & 1 \\end{bmatrix}$',
        '$\\begin{bmatrix} 3 & 1 \\\\ 2 & -1 \\end{bmatrix}$',
        '$\\begin{bmatrix} 1 & 1 \\\\ 3 & 2 \\end{bmatrix}$',
      ],
      correct: 0,
      explanation:
        'The coefficient matrix A collects the numbers multiplying x and y in each equation. First row comes from equation 1 (3, 2); second row from equation 2 (1, -1).',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'A linear system $Ax = b$ has $\\det(A) = 0$. Which of these is possible?',
      options: [
        'Exactly one solution.',
        'No solution, OR infinitely many solutions — but never exactly one.',
        'Always infinitely many solutions.',
        'The system is guaranteed unsolvable.',
      ],
      correct: 1,
      explanation:
        'When det(A) = 0, A is singular and not invertible. The system either has no solution (parallel lines) or infinitely many (coincident lines) — never exactly one. Which case depends on where b lies relative to the column space of A.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'For the system $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$, what is x?',
      correct: 3,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Add the two equations: $2x = 6$.',
      explanation:
        'Adding the two equations gives $2x = 6$, so $x = 3$. Then $y = 2$. Check: $3 + 2 = 5$ ✓ and $3 - 2 = 1$ ✓.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'A machine learning model has 1000 data points but only 3 parameters. What does this mean for the system $Ax = b$?',
      options: [
        'It has a unique exact solution.',
        'It probably has no exact solution, so we find the least-squares solution instead.',
        'It has infinitely many solutions.',
        'The system is undefined.',
      ],
      correct: 1,
      explanation:
        'More equations than unknowns (1000 > 3) means the system is over-determined. There is almost never an exact solution — the data has noise. Instead, we find the parameter vector x that minimises the sum of squared errors. This is exactly what `np.linalg.lstsq` does.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question: 'Which NumPy function solves a square, invertible linear system $Ax = b$?',
      options: [
        '`np.linalg.inv(A) @ b`',
        '`np.linalg.solve(A, b)`',
        '`np.linalg.lstsq(A, b)`',
        'Both A and B give the same result, but B is preferred.',
      ],
      correct: 3,
      explanation:
        'Both `inv(A) @ b` and `solve(A, b)` give the mathematically correct answer, but `solve` is faster and more numerically stable. It never computes the inverse explicitly. Always prefer `solve` for square invertible systems.',
      xp: 20,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'You fit a line to 5 data points. Two parameters (slope, intercept) and 5 equations. What does least squares do?',
      options: [
        'It finds the line that passes exactly through all 5 points.',
        'It finds the line that minimises the sum of squared vertical distances to the points.',
        'It finds the line that minimises the number of points it passes through.',
        'It picks two random points and draws a line through them.',
      ],
      correct: 1,
      explanation:
        'The line almost never passes through all points exactly, because of noise. Instead, least squares finds the line that comes closest in aggregate — the one that minimises the sum of squared errors. This is what "fitting" means.',
      xp: 25,
    },
  ],
};