// 📈 Calculus — Lesson 11: Gradient Descent — How AI Actually Learns

export const calcGradientDescentLesson = {
  id: 'calc-gradient-descent',
  title: 'Gradient Descent — How AI Actually Learns',
  difficulty: 'intermediate',
  duration: 28,
  intro:
    'One simple algorithm — follow the negative gradient, step by step, downhill. Everything from linear regression to GPT is trained this way. This is the moment the maths becomes the learning.',

  sections: [
    {
      type: 'text',
      content:
        'You have every ingredient. You know what the gradient is (Lesson 10), how the chain rule computes it efficiently (Lesson 8), and what a minimum looks like (Lesson 7). Now we assemble them into the algorithm that trains every model in the world.',
    },

    // ── THE IDEA ──────────────────────
    {
      type: 'text',
      content:
        'Imagine you are on a foggy mountain, trying to reach the lowest valley. You cannot see far. But you can feel the slope under your feet. So you take a small step in the downhill direction. Then feel again. Step again. Keep going until the ground levels out.',
    },
    {
      type: 'text',
      content:
        'That is **gradient descent**. The "gradient" is the slope. "Descent" is going down. It is that simple.',
    },
    {
      type: 'math',
      latex:
        'w_{t+1} = w_t - \\alpha \\, \\nabla L(w_t)',
      caption:
        'The gradient descent update rule. Step in the negative gradient direction, scaled by the learning rate α.',
    },
    {
      type: 'text',
      content:
        'Read each piece:\n\n• $w_t$ — the current weights\n• $\\nabla L(w_t)$ — the gradient of the loss at those weights\n• $\\alpha$ — the **learning rate**, a small positive number\n• $w_{t+1}$ — the new, slightly better weights',
    },
    {
      type: 'note',
      content:
        'The learning rate α controls how big a step you take. Too small → slow training. Too large → you might jump right over the valley and end up worse. Finding a good α is one of the most important practical decisions in ML.',
    },

    // ── VISUAL ────────────────────────
    {
      type: 'graph',
      title: 'Rolling down a loss curve',
      fns: [
        { fn: (x) => x * x - 4 * x + 5, color: 'cyan', label: 'loss L(w)' },
      ],
      domain: [-1, 5],
      range: [-1, 8],
      points: [{ x: 2, y: 1, color: 'emerald', r: 7, label: 'minimum' }],
      caption:
        'The loss curve. Gradient descent starts somewhere on the curve and takes small steps in the downhill direction until it reaches the bottom.',
    },
    {
      type: 'simulation',
      title: 'Watch gradient descent in action',
      description:
        'Set a starting position and a learning rate. Watch the point walk downhill.',
      sliders: [
        { id: 'start', label: 'start x', min: -1, max: 5, step: 0.1, default: 4.5, decimals: 1 },
        { id: 'lr', label: '\\alpha', min: 0.05, max: 0.9, step: 0.05, default: 0.3, decimals: 2 },
      ],
      render: ({ start, lr }) => {
        const f = (x) => x * x - 4 * x + 5;
        const grad = (x) => 2 * x - 4;
        // Simulate 5 steps
        const pts = [];
        let x = start;
        for (let i = 0; i < 6; i++) {
          pts.push({ x, y: f(x), color: i === 0 ? 'brand' : 'violet', r: i === 0 ? 7 : 5 });
          x = x - lr * grad(x);
        }
        return {
          fns: [{ fn: f, color: 'cyan', label: 'L(w) = w² − 4w + 5' }],
          points: pts,
          domain: [-1, 5.5],
          range: [-1, 10],
        };
      },
      formula: ({ start, lr }) => {
        const f = (x) => x * x - 4 * x + 5;
        const grad = (x) => 2 * x - 4;
        let x = start;
        const history = [x.toFixed(2)];
        for (let i = 0; i < 5; i++) {
          x = x - lr * grad(x);
          history.push(x.toFixed(2));
        }
        return `w: ${history.join(' \\to ')}`;
      },
      caption:
        'Each step moves the point closer to the minimum at x = 2. With a good learning rate, it converges in a handful of steps.',
    },
    {
      type: 'tip',
      content:
        'Try setting the learning rate too high (0.8 or more) — the point might overshoot and oscillate. Try it very low (0.05) — the point barely moves. This is exactly the tuning problem every ML engineer faces.',
    },

    // ── DIFFERENT LEARNING RATES ─────
    {
      type: 'text',
      content:
        'The learning rate is a huge deal. Here is what different values do:',
    },
    {
      type: 'text',
      content:
        '• **Too small** — training is slow, may never finish.\n• **Just right** — smooth, fast convergence.\n• **Too large** — overshoots the minimum, may oscillate or diverge.\n• **Far too large** — completely unstable, loss blows up.',
    },
    {
      type: 'graph',
      title: 'Same curve, three learning rates',
      fns: [
        { fn: (x) => x * x, color: 'cyan', label: 'L(w) = w²' },
      ],
      domain: [-3, 3],
      range: [-1, 9],
      points: [
        { x: -2.5, y: 6.25, color: 'rose', r: 6, label: 'slow' },
        { x: -2.5, y: 6.25, color: 'amber', r: 6, label: 'good' },
        { x: -2.5, y: 6.25, color: 'emerald', r: 6, label: 'converged' },
      ],
      caption:
        'Same starting point, different learning rates. The gap between "too slow" and "unstable" is narrower than you might think. This is why practitioners often use adaptive schedules.',
    },

    // ── BATCH VS STOCHASTIC ──────────
    {
      type: 'text',
      content:
        'In practice, computing the gradient over the entire dataset (called **batch gradient descent**) is too slow. So we use a smarter variant.',
    },
    {
      type: 'text',
      content:
        '**Stochastic gradient descent (SGD)**: compute the gradient using just ONE example at a time, and step immediately. Noisy but fast. It hops around the minimum but generally converges.',
    },
    {
      type: 'text',
      content:
        '**Mini-batch gradient descent**: the workhorse. Split the data into small batches (32, 64, 128 examples), compute the gradient on each batch, and step. Balance of speed and stability. This is what `batch_size` means in every ML framework.',
    },
    {
      type: 'math',
      latex:
        'w_{t+1} = w_t - \\alpha \\, \\nabla L_{\\text{batch}}(w_t)',
      caption:
        'Mini-batch gradient descent. The gradient is computed on a small batch, not the whole dataset.',
    },
    {
      type: 'note',
      content:
        'The randomness in SGD actually helps. Because it hops around, it can escape shallow local minima and saddle points. This is why SGD often generalises better than exact gradient descent, even though the math looks "noisier".',
    },

    // ── MOMENTUM & ADAM ──────────────
    {
      type: 'text',
      content:
        'Plain gradient descent has a problem: it can zigzag if the loss surface is narrow in one direction and long in another. Two famous improvements:',
    },
    {
      type: 'text',
      content:
        '• **Momentum** — keep a running "velocity" that accumulates past gradients. Like a ball rolling downhill, it builds speed and smooths out the zigzag.\n• **Adam / RMSProp** — adapt the learning rate per parameter, based on recent gradient magnitudes. Weights with consistently large gradients get smaller steps; weights with small gradients get larger steps.',
    },
    {
      type: 'tip',
      content:
        'Adam is the default optimiser for most modern deep learning. If you do not know which to use, use Adam. It requires less tuning and usually converges faster than plain SGD. Every deep learning framework ships it: `torch.optim.Adam`, `tf.keras.optimizers.Adam`.',
    },

    // ── WHY THIS IS LEARNING ────────
    {
      type: 'text',
      content:
        'So why is this "learning"?',
    },
    {
      type: 'text',
      content:
        'Because the weights $w$ are the model\'s **knowledge**. Changing them changes what the model predicts. Gradient descent adjusts the weights to reduce the loss — which means the model predicts better. Slowly, over thousands or millions of steps, the network "learns" patterns in the data.',
    },
    {
      type: 'text',
      content:
        'When people say "GPT was trained on a trillion tokens", they mean gradient descent was run — with a very sophisticated variant — on a very large dataset, adjusting hundreds of billions of weights over many iterations.',
    },
    {
      type: 'note',
      content:
        'You now know the entire training loop of every modern AI system: forward pass (compute the output), compute loss, backward pass (compute the gradient via the chain rule), step in the negative gradient direction. Repeat. That is it. Everything else is engineering detail.',
    },
    {
      type: 'tip',
      content:
        'Next: optimisation — the broader field this algorithm lives in. What are the failure modes? When does gradient descent get stuck? What is a saddle point?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the gradient descent update rule?',
      options: [
        '$w \\leftarrow w + \\alpha \\nabla L$',
        '$w \\leftarrow w - \\alpha \\nabla L$',
        '$w \\leftarrow \\alpha \\nabla L$',
        '$w \\leftarrow \\nabla L / \\alpha$',
      ],
      correct: 1,
      explanation:
        'Step in the negative gradient direction — opposite to where the gradient points, since the gradient points uphill. Scaled by the learning rate α.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What happens if the learning rate is too large?',
      options: [
        'Training is too slow.',
        'The model converges instantly.',
        'Steps overshoot the minimum, causing oscillation or divergence.',
        'Nothing changes.',
      ],
      correct: 2,
      explanation:
        'A too-large learning rate causes big steps that overshoot the minimum. The loss may oscillate up and down, or even diverge. This is one of the most common ML training bugs.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'Why do we use mini-batch gradient descent instead of computing the gradient on the entire dataset?',
      options: [
        'Because the gradient on the whole dataset is mathematically wrong.',
        'Because computing on the full dataset is slow, and mini-batches give a good approximate gradient much faster.',
        'Because mini-batches are always more accurate.',
        'Because the full gradient always equals zero.',
      ],
      correct: 1,
      explanation:
        'Computing the full gradient requires a forward pass over every example — very slow. Mini-batches (32–128 examples) give a good estimate of the gradient and let us update parameters many more times per epoch. This is standard practice.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'What is the role of "momentum" in optimisers?',
      options: [
        'It increases the learning rate.',
        'It accumulates past gradients to smooth out oscillations and speed up convergence.',
        'It reduces the number of parameters.',
        'It replaces the loss function.',
      ],
      correct: 1,
      explanation:
        'Momentum keeps a running average of past gradients. This smooths out zigzagging in narrow valleys and helps the optimiser build speed in consistent directions. It is one of the earliest and still most-used optimisation tricks.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'In one sentence, what is gradient descent doing?',
      options: [
        'Multiplying matrices to compute outputs.',
        'Repeatedly adjusting the parameters in the direction that reduces the loss.',
        'Counting the number of parameters.',
        'Randomly changing weights until the loss is zero.',
      ],
      correct: 1,
      explanation:
        'Gradient descent is an iterative optimisation: measure the loss, compute the gradient, step in the negative gradient direction, repeat. Each step makes the model slightly better on the training data.',
      xp: 20,
    },
    {
      id: 'q6',
      type: 'numeric-answer',
      math: true,
      question:
        'Loss is $L(w) = w^2$. Current weight is $w = 4$, learning rate $\\alpha = 0.1$. What is the new weight after one gradient descent step?',
      correct: 3.2,
      tolerance: 0.01,
      placeholder: 'e.g. 2.5',
      hint: '$\\nabla L = 2w$. Update: $w \\leftarrow w - \\alpha \\cdot 2w$.',
      explanation:
        '$\\nabla L(4) = 2 \\cdot 4 = 8$. Update: $w = 4 - 0.1 \\cdot 8 = 4 - 0.8 = 3.2$. The weight moved from 4 toward the minimum at 0.',
      xp: 30,
    },
  ],
};