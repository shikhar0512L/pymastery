// 📈 Calculus — Lesson 12: Optimisation — Minima, Maxima & Saddle Points

export const calcOptimizationLesson = {
  id: 'calc-optimization',
  title: 'Optimisation — Minima, Maxima & Saddle Points',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'The whole goal of training is to find a good minimum. But loss surfaces are weird — full of valleys, peaks, and strange points that look like minima but are not. This lesson maps the terrain.',

  sections: [
    {
      type: 'text',
      content:
        'You know how gradient descent works. But real loss surfaces are not simple bowls. They have curves, bumps, flat regions, and strange shapes that fool the optimiser. This lesson teaches you to read the landscape.',
    },

    // ── TYPES OF CRITICAL POINTS ─────
    {
      type: 'text',
      content:
        'Where the gradient is zero, we call it a **critical point**. But critical points come in three flavours:',
    },
    {
      type: 'text',
      content:
        '• **Local minimum** — a valley. Loss is lower than every nearby point. This is where you want to end up.\n• **Local maximum** — a peak. Loss is higher than every nearby point. Bad news if you are minimising.\n• **Saddle point** — flat in some directions but not others. Looks like a pass between two mountains. Deceptively easy to stop at.',
    },
    {
      type: 'graph',
      title: 'A function with peak, valley, and flat region',
      fns: [{ fn: (x) => x * x * x - 3 * x, color: 'cyan', label: 'f(x) = x³ − 3x' }],
      domain: [-3, 3],
      range: [-5, 5],
      points: [
        { x: -1, y: 2, color: 'rose', r: 7, label: 'local max' },
        { x: 1, y: -2, color: 'emerald', r: 7, label: 'local min' },
      ],
      caption:
        'One peak, one valley, both critical points. The gradient is zero at both — but one is a good place to stop, and the other is not.',
    },

    // ── HOW TO CLASSIFY ──────────────
    {
      type: 'text',
      content:
        'How do you know which critical point you are at? The second derivative test (from Lesson 7):',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} f\'(x) = 0 \\text{ and } f\'\'(x) > 0 &\\;\\Rightarrow\\; \\text{local minimum} \\\\[4pt] f\'(x) = 0 \\text{ and } f\'\'(x) < 0 &\\;\\Rightarrow\\; \\text{local maximum} \\\\[4pt] f\'(x) = 0 \\text{ and } f\'\'(x) = 0 &\\;\\Rightarrow\\; \\text{inconclusive — could be saddle or inflection} \\end{aligned}',
      caption:
        'For 1D functions, the second derivative classifies the critical point.',
    },
    {
      type: 'note',
      content:
        'For high-dimensional functions, the second derivative is a matrix (the Hessian) — its eigenvalues determine the type of critical point. All eigenvalues positive → minimum. All negative → maximum. Mixed signs → saddle point.',
    },

    // ── SADDLE POINTS ────────────────
    {
      type: 'text',
      content:
        'Saddle points are the sneaky ones. In one direction the surface curves up; in another, down. From a distance, it looks like a minimum if you are only looking at part of the space. Gradient descent can slow to a crawl on a saddle point — the gradient is nearly zero, but you are not at a good spot.',
    },
    {
      type: 'simulation',
      title: 'The landscape of a saddle point',
      description:
        'A saddle surface f(x, y) = x² − y². Along one axis it curves up; along the other, down. The origin is neither minimum nor maximum — it is a saddle.',
      sliders: [
        { id: 'x', label: 'x', min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
        { id: 'y', label: 'y', min: -2, max: 2, step: 0.1, default: 0, decimals: 1 },
      ],
      render: ({ x, y }) => {
        const gx = 2 * x;
        const gy = -2 * y;
        return {
          vectors: [
            { x: gx * 0.3, y: gy * 0.3, color: 'rose', label: '∇f', from: [x, y] },
          ],
          points: [{ x, y, color: 'brand', r: 6 }],
          domain: [-3, 3],
          range: [-3, 3],
        };
      },
      formula: ({ x, y }) =>
        `\\nabla f = \\begin{bmatrix} ${(2 * x).toFixed(2)} \\\\ ${(-2 * y).toFixed(2)} \\end{bmatrix},\\;\\; f = ${(x * x - y * y).toFixed(2)}`,
      caption:
        'At the origin (0, 0), the gradient is zero. But look at the shape: moving in x increases f, moving in y decreases it. This is a saddle, not a valley.',
    },
    {
      type: 'tip',
      content:
        'Saddle points are a huge issue in deep learning. A network with a million parameters has an exponentially large number of saddles compared to minima. Training often slows at a saddle before escaping it. This is one reason SGD (with noise) is preferred over exact gradient descent — the noise helps escape.',
    },

    // ── LOCAL VS GLOBAL ──────────────
    {
      type: 'text',
      content:
        'A function can have many valleys. The lowest of them all is the **global minimum**. The rest are **local minima** — good, but not the best. Gradient descent will stop at whichever one it reaches first, and that might not be the global minimum.',
    },
    {
      type: 'graph',
      title: 'Local vs global minimum',
      fns: [
        { fn: (x) => Math.sin(x) + x * x / 10, color: 'cyan', label: 'f(x)' },
      ],
      domain: [-5, 5],
      range: [-2, 4],
      points: [
        { x: -1.5, y: 0.7, color: 'rose', r: 6, label: 'local min' },
        { x: 3.5, y: -0.1, color: 'emerald', r: 6, label: 'another local min' },
      ],
      caption:
        'Two valleys, different depths. Gradient descent starting near the left one will stop at the left one — even though the right one is lower. This is the classic "local minimum trap".',
    },
    {
      type: 'note',
      content:
        'In modern deep learning, local minima are actually less of a problem than they were once thought to be. Because networks have huge numbers of parameters, most "local minima" are close in loss value to the global one — the surface has lots of flat, high-quality regions. The real challenges are saddle points and plateaus.',
    },

    // ── PLATEAUS ─────────────────────
    {
      type: 'text',
      content:
        'A **plateau** is a large flat region where the gradient is near zero — but the point is not a minimum. Training stalls because the steps are tiny. This happens with certain activation functions (like sigmoid in its tails) and can make learning crawl.',
    },
    {
      type: 'tip',
      content:
        'This is why ReLU activations replaced sigmoid in deep networks. ReLU has a constant gradient of 1 for positive inputs — no vanishing. Sigmoid has a gradient near zero for large positive or negative inputs — leading to vanishing gradients. The choice of activation function is, mathematically, about avoiding plateaus.',
    },

    // ── ESCAPING TRAPS ───────────────
    {
      type: 'text',
      content:
        'Practical techniques to escape saddle points and bad local minima:',
    },
    {
      type: 'text',
      content:
        '• **Random restarts** — train from several initialisations, keep the best.\n• **Momentum** — builds velocity to push through flat regions.\n• **Stochastic updates** — the noise from mini-batches shakes you out of shallow traps.\n• **Adaptive learning rates (Adam)** — accelerates through flat regions.\n• **Careful initialisation** — start in a good region so the optimiser does not get stuck early.',
    },
    {
      type: 'note',
      content:
        'Real ML pipelines combine all of these. Modern training is not just "gradient descent" — it is a carefully engineered process that combines SGD, momentum, adaptive rates, warm-up schedules, and dropout. All of it exists to make optimisation well-behaved on a nasty loss surface.',
    },

    // ── GRADIENT DESCENT IN ML ──────
    {
      type: 'text',
      content:
        'Putting it all together: training a model is optimisation. You have a loss function $L(w)$ — a very high-dimensional surface. You want to find weights $w$ that minimise $L$. Gradient descent (in its modern, adaptive form) walks down the surface, hoping to end up at a good spot.',
    },
    {
      type: 'math',
      latex:
        'w^* = \\arg\\min_w L(w)',
      caption:
        'The formal statement of training. Find the weights that minimise the loss.',
    },
    {
      type: 'text',
      content:
        'Every paper you have ever read that mentions training a model is solving this — approximately. Exact solutions are almost never possible. The optimiser finds a "good enough" point, and the model works well in practice.',
    },

    // ── THE FULL PICTURE ────────────
    {
      type: 'text',
      content:
        'Looking back at the whole Calculus module:',
    },
    {
      type: 'text',
      content:
        '• **Functions** turn inputs into outputs. Every model is one.\n• **Rates** measure how outputs change with inputs.\n• **Limits** make "instantaneous rate" precise.\n• **Derivatives** give us the slope at any point.\n• **Rules** let us compute derivatives quickly.\n• **Second derivatives** tell us about curvature.\n• **Chain rule** computes gradients through layers — this is backprop.\n• **Partial derivatives** handle many variables.\n• **The gradient** points uphill.\n• **Gradient descent** walks downhill.\n• **Optimisation** is the art of finding good minima on weird surfaces.',
    },
    {
      type: 'note',
      content:
        'You now know the mathematical foundation of every machine learning system on Earth. When you read a paper about GPT, a tutorial on fine-tuning, or a blog post about a new optimiser, the underlying ideas are exactly what you have learned here. The next step is to see it in code — which is what the ML module is for.',
    },
    {
      type: 'tip',
      content:
        'That completes the Calculus module. You have the maths. You have the visuals. You have the intuition. Time to build.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is a critical point?',
      options: [
        'Where the function equals zero.',
        'Where the gradient equals zero.',
        'Where the function is largest.',
        'Where the function is undefined.',
      ],
      correct: 1,
      explanation:
        'A critical point is where the gradient (or derivative) is zero. At these points the function is momentarily flat — could be a peak, a valley, a saddle, or a plateau.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'A function has $f\'(a) = 0$ and $f\'\'(a) = 0$. What can you say about point a?',
      options: [
        'It is definitely a local minimum.',
        'It is definitely a local maximum.',
        'It is a saddle point.',
        'Inconclusive — could be a saddle point or inflection, needs more analysis.',
      ],
      correct: 3,
      explanation:
        'When both f\' and f\'\' are zero, the second derivative test is inconclusive. You need to look at higher derivatives or the actual behaviour of the function around that point.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'What is a saddle point?',
      options: [
        'A local minimum.',
        'A local maximum.',
        'A critical point that is a minimum in some directions and a maximum in others.',
        'A point where the function is undefined.',
      ],
      correct: 2,
      explanation:
        'A saddle point is flat in some directions and curved in others. It looks like a mountain pass. Gradient descent can stall there, thinking it has reached a minimum.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Why are local minima less of a problem in deep learning than in low-dimensional optimisation?',
      options: [
        'Because deep networks do not have local minima.',
        'Because with millions of parameters, most local minima are almost as good as the global one.',
        'Because gradient descent always finds the global minimum.',
        'Because the loss function is always convex.',
      ],
      correct: 1,
      explanation:
        'In high-dimensional spaces, local minima tend to have loss values very close to the global minimum. The real obstacles are saddle points and plateaus, not poor local minima.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which of these techniques helps escape saddle points?',
      options: [
        'Reducing the model size.',
        'Stochastic gradient descent (noise from mini-batches).',
        'Using fewer epochs.',
        'Decreasing the batch size to 1 and never changing it.',
      ],
      correct: 1,
      explanation:
        'The noise in SGD (from computing gradients on small random batches) jitters the parameters, helping escape saddles. Momentum and adaptive optimisers also help.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Why did ReLU replace sigmoid as the default activation in deep networks?',
      options: [
        'Because ReLU is easier to type.',
        'Because ReLU has a constant gradient for positive inputs, avoiding the vanishing gradient problem.',
        'Because ReLU makes the network smaller.',
        'Because sigmoid does not work at all.',
      ],
      correct: 1,
      explanation:
        'Sigmoid\'s gradient is near zero for large positive or negative inputs — leading to vanishing gradients in deep networks. ReLU has a gradient of 1 for positive inputs, letting gradients flow. This was one of the key tricks that made deep networks trainable.',
      xp: 30,
    },
  ],
};