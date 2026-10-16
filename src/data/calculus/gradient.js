// 📈 Calculus — Lesson 10: The Gradient — Vector of Steepest Ascent

export const calcGradientLesson = {
  id: 'calc-gradient',
  title: 'The Gradient — Direction of Steepest Ascent',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'A single derivative is one number. The gradient is a whole vector of them — and it points in the direction of steepest increase. Negate it, and you have the direction to move to reduce loss.',

  sections: [
    {
      type: 'text',
      content:
        'You have partial derivatives. Each one tells you how f changes when you nudge ONE variable. But real functions have many inputs. What if you want to know the direction that increases f the most? That direction is the **gradient**.',
    },
    {
      type: 'math',
      latex:
        '\\nabla f = \\begin{bmatrix} \\dfrac{\\partial f}{\\partial x} \\\\[8pt] \\dfrac{\\partial f}{\\partial y} \\end{bmatrix}',
      caption:
        'The gradient. The upside-down triangle ∇ ("nabla") means "collect every partial derivative into a vector".',
    },
    {
      type: 'note',
      content:
        'The gradient of a scalar function is a **vector** — one component per input variable. It has a direction and a length. Not just a number, but a full geometric object.',
    },

    // ── EXAMPLE ───────────────────────
    {
      type: 'text',
      content:
        'Take $f(x, y) = x^2 + 3xy + y^3$. We already computed the partials:',
    },
    {
      type: 'math',
      latex:
        '\\nabla f = \\begin{bmatrix} 2x + 3y \\\\ 3x + 3y^2 \\end{bmatrix}',
      caption:
        'Stack the partials together. At each point (x, y), the gradient gives you a 2D vector.',
    },
    {
      type: 'text',
      content:
        'At the point $(1, 2)$: $\\nabla f = \\begin{bmatrix} 2 \\cdot 1 + 3 \\cdot 2 \\\\ 3 \\cdot 1 + 3 \\cdot 4 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 15 \\end{bmatrix}$. So the gradient at (1, 2) is the vector (8, 15).',
    },

    // ── GEOMETRIC MEANING ─────────────
    {
      type: 'text',
      content:
        'What does the gradient MEAN geometrically? Two key facts:',
    },
    {
      type: 'text',
      content:
        '• It points in the direction of **steepest ascent** — the direction that increases f fastest.\n• Its **magnitude** is the slope in that direction — how steep the increase is.',
    },
    {
      type: 'note',
      content:
        'So the gradient is a compass. It always points uphill. If you wanted to climb a mountain as fast as possible, follow the gradient. If you want to descend (as in ML training), walk in the OPPOSITE direction — the negative gradient.',
    },
    {
      type: 'simulation',
      title: 'The gradient points uphill',
      description:
        'Move the point around. The red arrow shows the gradient at that location. Notice it always points to higher ground.',
      sliders: [
        { id: 'x', label: 'x', min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
        { id: 'y', label: 'y', min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
      ],
      render: ({ x, y }) => {
        // f(x,y) = x² + y² — simple bowl
        const gx = 2 * x;
        const gy = 2 * y;
        const scale = 0.4;
        return {
          vectors: [
            { x: gx * scale, y: gy * scale, color: 'rose', label: '∇f', from: [x, y] },
          ],
          points: [{ x, y, color: 'brand', r: 6, label: 'current point' }],
          domain: [-4, 4],
          range: [-4, 4],
        };
      },
      formula: ({ x, y }) =>
        `\\nabla f = \\begin{bmatrix} ${(2 * x).toFixed(2)} \\\\ ${(2 * y).toFixed(2)} \\end{bmatrix}`,
      caption:
        'For the bowl f(x, y) = x² + y², the gradient always points away from the center — toward higher ground. At (0, 0), the gradient is zero. That is the minimum.',
    },

    // ── WHY IT MATTERS FOR ML ────────
    {
      type: 'text',
      content:
        'Why does the gradient matter so much for AI?',
    },
    {
      type: 'text',
      content:
        'Because training a model is a **minimisation problem**. You have a loss function $L(w_1, w_2, \\ldots, w_n)$ — millions of weights, one scalar loss. You want to find the weights that make the loss as small as possible.',
    },
    {
      type: 'text',
      content:
        'The gradient $\\nabla L$ tells you the direction that makes the loss **worse** (larger). So you move in the **opposite** direction — the negative gradient — to make the loss smaller.',
    },
    {
      type: 'math',
      latex:
        'w_{\\text{new}} = w_{\\text{old}} - \\alpha \\, \\nabla L(w_{\\text{old}})',
      caption:
        'Gradient descent. Step in the negative gradient direction. Repeat.',
    },
    {
      type: 'tip',
      content:
        'Every single training step you have ever taken — every model you have ever trained — has relied on the gradient computed at every weight. Backprop is the algorithm that computes it. The whole field of deep learning is, mathematically, "compute the gradient, then step downhill."',
    },
    {
      type: 'note',
      content:
        'The magnitude of the gradient tells you how steep the loss is in that direction. Large gradient → steep slope → big adjustments needed. Small gradient → nearly flat → you are probably close to a minimum.',
    },
    {
      type: 'warning',
      content:
        'The gradient only describes the LOCAL behaviour. It is a linear approximation of how the function changes nearby. If you take too large a step in the gradient direction, you may overshoot the minimum entirely — because the true function curves away from the linear approximation. This is why choosing a good learning rate matters so much.',
    },
    {
      type: 'text',
      content:
        'Two more terms worth knowing:',
    },
    {
      type: 'text',
      content:
        '• **The Jacobian** — for functions with vector outputs (not just scalars), the gradient becomes a matrix called the Jacobian. Each row is the gradient of one output.\n• **The Hessian** — the matrix of second partial derivatives. It describes the curvature of the surface around a point and shows up in second-order optimisation methods.',
    },
    {
      type: 'note',
      content:
        'For most ML, you only need the gradient. Jacobians matter for vector-valued models, Hessians for advanced optimisation. But the intuition — "the gradient points uphill, go the other way" — is universal.',
    },
    {
      type: 'tip',
      content:
        'Next: gradient descent in full. How do we use the gradient to actually train a model? And why does it work so well?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does the gradient of a scalar function represent?',
      options: [
        'A single number — the maximum value of the function.',
        'A vector pointing in the direction of steepest ascent.',
        'The area under the curve.',
        'The average value of the function.',
      ],
      correct: 1,
      explanation:
        'The gradient is a vector. It points in the direction of steepest increase, and its magnitude tells you how steep that increase is.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'For $f(x, y) = x^2 + y^2$, what is the gradient?',
      options: [
        '$\\begin{bmatrix} 2x \\\\ 2y \\end{bmatrix}$',
        '$\\begin{bmatrix} x \\\\ y \\end{bmatrix}$',
        '$\\begin{bmatrix} 2 \\\\ 2 \\end{bmatrix}$',
        '$\\begin{bmatrix} x^2 \\\\ y^2 \\end{bmatrix}$',
      ],
      correct: 0,
      explanation:
        '$\\partial f / \\partial x = 2x$ and $\\partial f / \\partial y = 2y$. So the gradient is $[2x, 2y]$.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'For $f(x, y) = x^2 + y^2$, what is the first component of the gradient at $(3, 4)$?',
      correct: 6,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'First component is $\\partial f / \\partial x = 2x$. Plug in x = 3.',
      explanation:
        'First component of ∇f is $2x = 2 \\cdot 3 = 6$.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'In gradient descent, why do we step in the NEGATIVE gradient direction?',
      options: [
        'Because the gradient is always negative.',
        'Because the gradient points uphill, and we want to go downhill (reduce the loss).',
        'Because negative numbers are smaller.',
        'Because the gradient is undefined otherwise.',
      ],
      correct: 1,
      explanation:
        'The gradient points toward larger values. To reduce the loss, we move opposite — the negative gradient direction. That is the whole idea of gradient descent.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'What does the MAGNITUDE of the gradient tell you?',
      options: [
        'The value of the function.',
        'How steep the function is in the steepest direction.',
        'How many variables the function has.',
        'The distance to the nearest minimum.',
      ],
      correct: 1,
      explanation:
        'A large gradient magnitude means a steep slope — the function changes quickly. A small magnitude means a nearly flat region — you are probably close to a minimum.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Why is the gradient central to machine learning?',
      options: [
        'Because it is required by NumPy.',
        'Because training a model means minimising a loss, and the gradient tells you the direction to move to reduce it.',
        'Because gradients are always small.',
        'Because gradients are easy to compute by hand.',
      ],
      correct: 1,
      explanation:
        'Every training step of every ML model uses the gradient. It is the signal that says "move this way to reduce the loss". Backprop computes it for millions of parameters at once.',
      xp: 25,
    },
  ],
};