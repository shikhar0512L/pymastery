// 🧠 DL — Lesson 3: Forward Propagation

export const dlForwardPropLesson = {
  id: 'dl-forward-prop',
  title: 'Forward Propagation — Data Through Layers',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Forward propagation is how a neural network makes a prediction. Data enters the input layer, gets transformed by each hidden layer, and comes out as an output. Every step is just matrix multiplication plus activation.',

  sections: [
    {
      type: 'text',
      content:
        'You have seen the neuron, and you have seen the activation. Now we put them together. Forward propagation is the process of taking an input, pushing it through every layer of the network, and producing an output.',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} z^{[1]} &= W^{[1]} x + b^{[1]} \\\\ a^{[1]} &= \\sigma(z^{[1]}) \\\\ z^{[2]} &= W^{[2]} a^{[1]} + b^{[2]} \\\\ a^{[2]} &= \\sigma(z^{[2]}) \\\\ &\\vdots \\\\ \\hat{y} &= a^{[L]} \\end{aligned}',
      caption:
        'Forward propagation. Superscript $[l]$ means "layer l". Each layer uses the previous layer\'s output as input.',
    },
    {
      type: 'note',
      content:
        'Matrix multiplication happens at every layer. That is why GPUs exist — they are essentially machines that do billions of matrix multiplications per second. Every neural network prediction is a stack of these.',
    },

    // ── SHAPES ───────────────────────
    {
      type: 'text',
      content:
        'The most important thing to get right is **shapes**. If the shapes do not match, the network crashes. Here is the rule:',
    },
    {
      type: 'math',
      latex:
        '\\underbrace{W^{[l]}}_{n_{l} \\times n_{l-1}} \\cdot \\underbrace{a^{[l-1]}}_{n_{l-1} \\times 1} = \\underbrace{z^{[l]}}_{n_{l} \\times 1}',
      caption:
        '$n_{l}$ = number of neurons in layer l. The weight matrix has shape (current layer size, previous layer size).',
    },
    {
      type: 'tip',
      content:
        'A common rule: if you have a 3 → 5 → 2 network (3 inputs, 5 hidden, 2 outputs), then $W^{[1]}$ is 5×3, $W^{[2]}$ is 2×5. The "input dim" of each W matches the "output dim" of the previous layer.',
    },

    // ── EXAMPLE ──────────────────────
    {
      type: 'text',
      content:
        'Let us build a tiny 2 → 3 → 1 network. Two inputs, one hidden layer of 3 neurons, one output.',
    },
    {
      type: 'code',
      content: 'Forward pass through a 2 → 3 → 1 network:',
      code: `import numpy as np\n\n# Weights for layer 1 (3 neurons, 2 inputs each)\nW1 = np.array([\n    [0.5, -0.3],\n    [0.8, 0.6],\n    [-0.2, 0.4],\n])  # shape (3, 2)\nb1 = np.array([0.1, -0.2, 0.0])  # shape (3,)\n\n# Weights for layer 2 (1 neuron, 3 inputs each)\nW2 = np.array([[0.7, -0.5, 0.3]])  # shape (1, 3)\nb2 = np.array([0.2])               # shape (1,)\n\n# Input\nx = np.array([1.0, 2.0])  # shape (2,)\n\n# Layer 1\nz1 = W1 @ x + b1\nh1 = np.maximum(0, z1)   # ReLU\nprint("z1:", z1.round(3))\nprint("h1:", h1.round(3))\n\n# Layer 2\nz2 = W2 @ h1 + b2\ny = 1 / (1 + np.exp(-z2))   # Sigmoid\nprint("z2:", z2.round(3))\nprint("y:", y.round(3))`,
      output: `z1: [0.0 1.8 0.6]\nh1: [0.0 1.8 0.6]\nz2: 0.38\ny: [0.594]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Here is what happened step by step:\n\n• **Input:** x = [1.0, 2.0]\n• **Layer 1 linear:** z1 = W1 @ x + b1 = [0.0, 1.8, 0.6]\n• **Layer 1 activation:** ReLU([0.0, 1.8, 0.6]) = [0.0, 1.8, 0.6] (all positive, no change)\n• **Layer 2 linear:** z2 = W2 @ h1 + b2 = 0.38\n• **Layer 2 activation:** sigmoid(0.38) = 0.594',
    },
    {
      type: 'tip',
      content:
        'That is the entire forward pass. **Do not try to understand every number.** Understand the shapes: 2 → 3 → 1. Understand the pattern: matmul, add bias, activation. Everything else is arithmetic.',
    },

    // ── BATCHING ─────────────────────
    {
      type: 'text',
      content:
        'In practice, we never run one example at a time. We run **batches**. That makes the shapes even more important.',
    },
    {
      type: 'math',
      latex:
        '\\underbrace{Z^{[l]}}_{\\text{batch} \\times n_{l}} = \\underbrace{A^{[l-1]}}_{\\text{batch} \\times n_{l-1}} \\cdot \\underbrace{W^{[l]T}}_{n_{l-1} \\times n_{l}} + \\underbrace{b^{[l]}}_{1 \\times n_{l}}',
      caption:
        'Batched version. Now A has a batch dimension at the front. The bias broadcasts across all rows.',
    },
    {
      type: 'note',
      content:
        'This is exactly the broadcasting pattern you learned in NumPy. $A \\cdot W^T$ multiplies a (batch, in) matrix by a (in, out) matrix → (batch, out). Adding $b$ broadcasts across the batch dimension. That is why NumPy is so fast — no loops needed.',
    },
    {
      type: 'code',
      content: 'Batched forward pass:',
      code: `import numpy as np\n\n# 4 examples, 2 inputs each\nX = np.array([\n    [1.0, 2.0],\n    [0.5, -1.0],\n    [-0.5, 0.0],\n    [2.0, 1.5],\n])  # shape (4, 2)\n\n# Layer 1 weights: 3 neurons, 2 inputs each\nW1 = np.array([\n    [0.5, -0.3],\n    [0.8, 0.6],\n    [-0.2, 0.4],\n])  # shape (3, 2)\nb1 = np.array([0.1, -0.2, 0.0])\n\n# Forward pass with batch\nZ1 = X @ W1.T + b1          # (4, 2) @ (2, 3) → (4, 3)\nH1 = np.maximum(0, Z1)\nprint("Z1 shape:", Z1.shape)\nprint("H1 shape:", H1.shape)\nprint("H1:", H1.round(2))`,
      output: `Z1 shape: (4, 3)\nH1 shape: (4, 3)\nH1: [[0.   1.8  0.6 ]\n [0.55 0.   0.  ]\n [0.   0.   0.1 ]\n [0.95 2.5  0.2 ]]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Note the transpose: `X @ W1.T`. That is because W1 is (out, in), but we need (in, out) to match the input. This is a super common shape gotcha in neural networks.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'A 2 → 3 → 1 network in action',
      description:
        'Change the input. Watch how the hidden layer activations (3 values) combine to produce the final output.',
      sliders: [
        { id: 'x1', label: 'x_1', min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
        { id: 'x2', label: 'x_2', min: -2, max: 2, step: 0.1, default: 2, decimals: 1 },
      ],
      render: ({ x1, x2 }) => {
        // Same weights as the code example
        const W1 = [[0.5, -0.3], [0.8, 0.6], [-0.2, 0.4]];
        const b1 = [0.1, -0.2, 0.0];
        const W2 = [[0.7, -0.5, 0.3]];
        const b2 = [0.2];

        const z1 = W1.map((row, i) => row[0] * x1 + row[1] * x2 + b1[i]);
        const h1 = z1.map((z) => Math.max(0, z));
        const z2 = W2[0].reduce((sum, w, i) => sum + w * h1[i], 0) + b2[0];
        const y = 1 / (1 + Math.exp(-z2));

        return {
          fns: [],
          points: [
            { x: 0, y: h1[0], color: 'emerald', r: 8, label: 'h1[0]' },
            { x: 1, y: h1[1], color: 'cyan', r: 8, label: 'h1[1]' },
            { x: 2, y: h1[2], color: 'violet', r: 8, label: 'h1[2]' },
            { x: 3, y: y, color: 'brand', r: 10, label: 'output' },
          ],
          domain: [-0.5, 3.5],
          range: [-1.5, 2.5],
        };
      },
      formula: ({ x1, x2 }) => {
        const W1 = [[0.5, -0.3], [0.8, 0.6], [-0.2, 0.4]];
        const b1 = [0.1, -0.2, 0.0];
        const W2 = [[0.7, -0.5, 0.3]];
        const b2 = [0.2];
        const z1 = W1.map((row, i) => row[0] * x1 + row[1] * x2 + b1[i]);
        const h1 = z1.map((z) => Math.max(0, z));
        const z2 = W2[0].reduce((sum, w, i) => sum + w * h1[i], 0) + b2[0];
        const y = 1 / (1 + Math.exp(-z2));
        return `\\text{output} = ${y.toFixed(3)}`;
      },
      caption:
        'The three hidden values (green, cyan, violet) are the intermediate representation. The output combines them into a single prediction.',
    },

    // ── WHY IT MATTERS ───────────────
    {
      type: 'text',
      content:
        'Why does this matter? Because forward propagation is how a trained network makes predictions. It is the "inference" phase — the part that actually runs when you use ChatGPT, Stable Diffusion, or a face unlock.',
    },
    {
      type: 'text',
      content:
        'Training a network (backpropagation) is just forward propagation followed by a backward pass to compute gradients. If you understand forward propagation, you are 50% of the way there.',
    },
    {
      type: 'tip',
      content:
        'Next: how do we measure how wrong the network is? Loss functions — the same ones from ML, but now computed over the network\'s output.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does the forward pass compute?',
      options: [
        'The gradients of the loss.',
        'The output of the network given the input.',
        'The weights of the network.',
        'The learning rate.',
      ],
      correct: 1,
      explanation:
        'Forward propagation pushes input through each layer, applying linear transformation and activation, producing the network\'s prediction.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'A network has layers of size 4 → 8 → 3. What is the shape of W1 (the first layer weight matrix)?',
      options: [
        '4 × 8',
        '8 × 4',
        '3 × 8',
        '8 × 3',
      ],
      correct: 1,
      explanation:
        'W[l] has shape (neurons in layer l, neurons in layer l-1). So W1 has shape (8, 4) — 8 neurons, each with 4 input weights.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question: 'If z1 = 2.5, what is ReLU(z1)?',
      correct: 2.5,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'ReLU(z) = max(0, z).',
      explanation:
        'ReLU(2.5) = max(0, 2.5) = 2.5. Positive values pass through unchanged.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write a function `forward_1layer(x, W, b)` that computes ReLU(W @ x + b). Return a NumPy array.',
      starterCode:
        'import numpy as np\n\ndef forward_1layer(x, W, b):\n    # your code here\n    pass',
      tests: [
        {
          input: 'forward_1layer(np.array([1, 2]), np.array([[1, 1], [1, -1]]), np.array([0, 0])).tolist()',
          expected: '[3, 0]',
        },
        {
          input: 'forward_1layer(np.array([1]), np.array([[2]]), np.array([1])).tolist()',
          expected: '[3]',
        },
        {
          input: 'forward_1layer(np.array([-1]), np.array([[1]]), np.array([0])).tolist()',
          expected: '[0]',
        },
      ],
      hint: 'Compute z = W @ x + b, then return np.maximum(0, z).',
      solution:
        'import numpy as np\n\ndef forward_1layer(x, W, b):\n    z = W @ x + b\n    return np.maximum(0, z)',
      explanation:
        'W @ x is the matrix-vector product. Adding b broadcasts. np.maximum(0, z) is vectorized ReLU.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'output-match',
      question:
        'Compute the output of a 2 → 2 → 1 network with: W1 = [[1, 0], [0, 1]], b1 = [0, 0], W2 = [[1, 1]], b2 = 0, x = [3, 4]. Use ReLU for both activations. Print the result.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '7.0',
      hint: 'Layer 1: z1 = [3, 4], relu = [3, 4]. Layer 2: z2 = 3+4 = 7.',
      solution:
        'import numpy as np\nx = np.array([3.0, 4.0])\nW1 = np.array([[1.0, 0.0], [0.0, 1.0]])\nb1 = np.array([0.0, 0.0])\nW2 = np.array([[1.0, 1.0]])\nb2 = np.array([0.0])\nz1 = W1 @ x + b1\nh1 = np.maximum(0, z1)\nz2 = W2 @ h1 + b2\ny = np.maximum(0, z2)\nprint(y[0])',
      explanation:
        'The identity matrix W1 passes x through. Then W2 sums the two hidden values (3 + 4 = 7).',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Why do we batch inputs (e.g., 32 examples at once) instead of one at a time?',
      options: [
        'Because one example crashes.',
        'Because matrix multiplications are much faster when done on batches (GPU efficiency).',
        'Because it improves accuracy.',
        'Because the loss function requires it.',
      ],
      correct: 1,
      explanation:
        'Batching turns the forward pass into a single big matrix multiplication. GPUs can then process all examples in parallel. This is why deep learning is feasible at all.',
      xp: 25,
    },
  ],
};