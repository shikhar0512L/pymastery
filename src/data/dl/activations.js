// 🧠 DL — Lesson 2: Activation Functions

export const dlActivationsLesson = {
  id: 'dl-activations',
  title: 'Activation Functions — Adding Non-Linearity',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Why do neural networks need activation functions? Without them, a 100-layer network is exactly the same as a 1-layer linear regression. Activation functions break that rule and let the network learn curves.',

  sections: [
    {
      type: 'text',
      content:
        'You already know that a single neuron does $\\text{activation}(wx + b)$. But what if we remove the activation? Then a 100-layer network would be: $w_{100}(w_{99}(...(w_1x + b_1))) + b_{100}$. This mathematically collapses into one big linear equation — a single neuron.',
    },
    {
      type: 'note',
      content:
        '**Without activation functions, deep learning is just linear regression with extra steps.** The activation function is what makes "deep" meaningful.',
    },
    {
      type: 'math',
      latex:
        'f(g(x)) \\neq \\text{linear} \\quad \\text{if } f \\text{ or } g \\text{ is non-linear}',
      caption:
        'Even one non-linear activation breaks the chain. That is why every layer needs one.',
    },

    // ── 4 COMMON ACTIVATIONS ─────────
    {
      type: 'text',
      content:
        'There are 4 activation functions you will meet almost everywhere. Each has a different shape and a different purpose.',
    },

    // ── 1. RELU ──────────────────────
    {
      type: 'text',
      content:
        '**1. ReLU (Rectified Linear Unit)** — the modern default. $f(z) = \\max(0, z)$. Simple, fast, and works.',
    },
    {
      type: 'graph',
      title: 'ReLU',
      fns: [
        { fn: (x) => Math.max(0, x), color: 'emerald', label: 'ReLU(z) = max(0, z)' },
      ],
      domain: [-4, 4],
      range: [-1, 4],
      caption:
        'Everything below 0 becomes 0. Everything above 0 passes through. Half of the neurons in a network are "off" for any given input — that is why it is so fast.',
    },
    {
      type: 'tip',
      content:
        'ReLU solves the "vanishing gradient" problem (which we will meet later). It is why modern deep networks can have 100+ layers. Before ReLU (pre-2011), networks rarely went deeper than 3 layers.',
    },

    // ── 2. SIGMOID ───────────────────
    {
      type: 'text',
      content:
        '**2. Sigmoid** — the classic. $f(z) = \\frac{1}{1 + e^{-z}}$. Squashes any input into (0, 1).',
    },
    {
      type: 'graph',
      title: 'Sigmoid',
      fns: [
        { fn: (x) => 1 / (1 + Math.exp(-x)), color: 'cyan', label: 'σ(z)' },
      ],
      domain: [-6, 6],
      range: [-0.2, 1.2],
      caption:
        'The S-shape. At very negative or positive inputs, the curve flattens out. This flattening causes the vanishing gradient problem — gradients become almost zero.',
    },
    {
      type: 'warning',
      content:
        'Do not use sigmoid as the activation for hidden layers in a deep network. It is fine for the final output layer (when you want a probability), but it kills the gradient signal in deep layers.',
    },

    // ── 3. TANH ──────────────────────
    {
      type: 'text',
      content:
        '**3. Tanh** — sigmoid\'s cousin. $f(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$. Same S-shape, but squashes into (-1, 1) instead of (0, 1).',
    },
    {
      type: 'graph',
      title: 'Tanh',
      fns: [
        { fn: (x) => Math.tanh(x), color: 'violet', label: 'tanh(z)' },
      ],
      domain: [-4, 4],
      range: [-1.5, 1.5],
      caption:
        'Zero-centered — the output is symmetric around 0. This makes optimization easier than sigmoid. But it has the same vanishing gradient issue for large inputs.',
    },
    {
      type: 'note',
      content:
        'Tanh is often used for RNNs (recurrent neural networks) and for the hidden state of LSTMs. For feedforward networks, ReLU is usually better.',
    },

    // ── 4. SOFTMAX ───────────────────
    {
      type: 'text',
      content:
        '**4. Softmax** — for the output layer of multi-class classification. Takes a vector of scores, returns a probability distribution.',
    },
    {
      type: 'math',
      latex:
        '\\text{softmax}(z)_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}',
      caption:
        'Exponentiate each score, divide by the sum. The outputs sum to 1 — a real probability distribution.',
    },
    {
      type: 'code',
      content: 'Softmax in NumPy:',
      code: `import numpy as np\n\ndef softmax(z):\n    # Subtract max for numerical stability\n    e = np.exp(z - np.max(z))\n    return e / e.sum()\n\nscores = np.array([2.0, 1.0, 0.1])\nprobs = softmax(scores)\nprint(probs.round(3))   # [0.659 0.242 0.099]\nprint(probs.sum())      # 1.0`,
      output: `[0.659 0.242 0.099]\n1.0`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Why subtract the max? Because $e^{1000}$ overflows to infinity. Subtracting the max keeps the numbers small — the result is mathematically identical but numerically safe.',
    },

    // ── COMPARISON ───────────────────
    {
      type: 'text',
      content:
        'So which one do you use? Here is the decision table:',
    },
    {
      type: 'text',
      content:
        '• **Hidden layers (deep networks)** → ReLU (or Leaky ReLU, GELU).\n• **Binary classification output** → Sigmoid.\n• **Multi-class classification output** → Softmax.\n• **RNNs / LSTMs** → Tanh.\n• **Regression output** → No activation (identity).',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Compare activations on the same input',
      description:
        'Drag the input z. Watch how each activation transforms it. Notice how they behave near 0 and at extreme values.',
      sliders: [
        { id: 'z', label: 'z', min: -5, max: 5, step: 0.1, default: 1, decimals: 1 },
      ],
      render: ({ z }) => ({
        fns: [
          { fn: (x) => Math.max(0, x), color: 'emerald', label: 'ReLU' },
          { fn: (x) => 1 / (1 + Math.exp(-x)), color: 'cyan', label: 'Sigmoid' },
          { fn: (x) => Math.tanh(x), color: 'violet', label: 'Tanh' },
        ],
        points: [
          { x: z, y: Math.max(0, z), color: 'emerald', r: 6 },
          { x: z, y: 1 / (1 + Math.exp(-z)), color: 'cyan', r: 6 },
          { x: z, y: Math.tanh(z), color: 'violet', r: 6 },
        ],
        domain: [-6, 6],
        range: [-1.5, 2],
      }),
      formula: ({ z }) => {
        const relu = Math.max(0, z);
        const sig = 1 / (1 + Math.exp(-z));
        const tanh = Math.tanh(z);
        return `\\text{ReLU} = ${relu.toFixed(2)},\\;\\; \\sigma = ${sig.toFixed(2)},\\;\\; \\tanh = ${tanh.toFixed(2)}`;
      },
      caption:
        'At z = 2, ReLU passes it through (2), sigmoid compresses to 0.88, tanh compresses to 0.96. Sigmoid and tanh "saturate" for large inputs — that is the vanishing gradient.',
    },

    // ── WHY NOTHING WORKS WITHOUT THEM ─
    {
      type: 'text',
      content:
        'Here is the proof. Consider two layers with no activation:',
    },
    {
      type: 'math',
      latex:
        'y = W_2(W_1 x + b_1) + b_2 = (W_2 W_1) x + (W_2 b_1 + b_2)',
      caption:
        'The whole stack collapses to one linear layer. Depth is useless without non-linearity.',
    },
    {
      type: 'note',
      content:
        'This is the single most important idea in the whole module. Neural networks are useful because they are non-linear, and they are non-linear because of the activation function.',
    },
    {
      type: 'tip',
      content:
        'Next: forward propagation. How do we actually push data through many layers, using matrix math?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'What happens if you remove the activation function from every layer in a neural network?',
      options: [
        'The network becomes slower but still deep.',
        'The network collapses into a single linear layer.',
        'The network trains faster.',
        'The network cannot output anything.',
      ],
      correct: 1,
      explanation:
        'Without non-linearity, stacked linear layers are mathematically equivalent to one linear layer. The entire benefit of "depth" disappears.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'What is ReLU(-3.5)?',
      correct: 0,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'ReLU(z) = max(0, z).',
      explanation:
        'ReLU(-3.5) = max(0, -3.5) = 0. Any negative input becomes 0.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question: 'What is the sigmoid of 0? (σ(0))',
      correct: 0.5,
      tolerance: 0.01,
      placeholder: 'e.g. 0.5',
      hint: 'σ(0) = 1 / (1 + e^0).',
      explanation:
        'σ(0) = 1 / (1 + 1) = 0.5. Sigmoid maps 0 to exactly 0.5.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'You are building a network to classify images into 10 categories (0–9). What activation should the OUTPUT layer use?',
      options: [
        'ReLU',
        'Sigmoid',
        'Softmax',
        'Tanh',
      ],
      correct: 2,
      explanation:
        'For multi-class classification, softmax converts scores into a probability distribution over all 10 classes. ReLU does not normalize. Sigmoid is for binary.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `sigmoid(z)` that returns the sigmoid of a single number. Use `math.exp`.',
      starterCode:
        'import math\n\ndef sigmoid(z):\n    # your code here\n    pass',
      tests: [
        { input: 'round(sigmoid(0), 4)', expected: '0.5' },
        { input: 'round(sigmoid(10), 4)', expected: '1.0' },
        { input: 'round(sigmoid(-10), 4)', expected: '0.0' },
      ],
      hint: 'sigmoid(z) = 1 / (1 + exp(-z)).',
      solution:
        'import math\n\ndef sigmoid(z):\n    return 1 / (1 + math.exp(-z))',
      explanation:
        'Sigmoid compresses any real number into (0, 1). Large positive z → 1, large negative z → 0, z = 0 → 0.5.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Compute the ReLU of each number in the list [-2, -1, 0, 1, 2] and print the result.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[0, 0, 0, 1, 2]',
      hint: 'Use np.maximum(0, arr).',
      solution:
        'import numpy as np\narr = np.array([-2, -1, 0, 1, 2])\nprint(np.maximum(0, arr).tolist())',
      explanation:
        'ReLU turns negatives into 0 and leaves positives untouched. NumPy\'s `np.maximum(0, arr)` does this vectorized in one call.',
      xp: 20,
    },
  ],
};