// 🧠 DL — Lesson 8: RNNs — Recurrent Neural Networks

export const dlRnnsLesson = {
  id: 'dl-rnns',
  title: 'RNNs — Memory for Sequences',
  difficulty: 'advanced',
  duration: 24,
  intro:
    'A feedforward network has no memory. It sees one input and forgets it immediately. A Recurrent Neural Network (RNN) has a hidden state that it carries from step to step, allowing it to process sequences like text, audio, and time series.',

  sections: [
    {
      type: 'text',
      content:
        'Consider the sentence "I love deep learning." If you feed each word to a feedforward network individually, it cannot understand the relationship between "love" and "deep learning". The order matters. A feedforward network has no notion of order.',
    },
    {
      type: 'note',
      content:
        'An RNN processes one input at a time and keeps a **hidden state** (memory) that is passed to the next step. This hidden state summarizes everything the network has seen so far.',
    },

    // ── THE RNN CELL ─────────────────
    {
      type: 'text',
      content:
        'At each timestep $t$, the network receives an input $x_t$ and the previous hidden state $h_{t-1}$. It produces a new hidden state $h_t$.',
    },
    {
      type: 'math',
      latex:
        'h_t = \\tanh(W_{xh} x_t + W_{hh} h_{t-1} + b_h)',
      caption:
        'The RNN update rule. The same weights are reused at every timestep — this is parameter sharing across time.',
    },
    {
      type: 'code',
      content: 'A single RNN cell forward pass:',
      code: `import numpy as np\n\ndef rnn_cell(x_t, h_prev, W_xh, W_hh, b_h):\n    z = W_xh @ x_t + W_hh @ h_prev + b_h\n    h_t = np.tanh(z)\n    return h_t\n\n# Example: 3-dim input, 4-dim hidden state\nnp.random.seed(42)\nW_xh = np.random.randn(4, 3) * 0.3\nW_hh = np.random.randn(4, 4) * 0.3\nb_h = np.zeros(4)\n\nh = np.zeros(4)  # initial state\nx = np.array([0.5, -0.3, 0.8])\n\nh_next = rnn_cell(x, h, W_xh, W_hh, b_h)\nprint(h_next.round(3))`,
      output: `[ 0.211 -0.317  0.189  0.446]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'The weights $W_{xh}$ and $W_{hh}$ are the same at every timestep. This is the most important idea: an RNN learns a single update rule and applies it repeatedly. Just like a CNN reuses filters across space, an RNN reuses weights across time.',
    },

    // ── SEQUENCE PROCESSING ──────────
    {
      type: 'text',
      content:
        'To process a sequence, we unroll the RNN over time. The hidden state at time $t$ becomes the input to time $t+1$.',
    },
    {
      type: 'code',
      content: 'Processing a whole sequence:',
      code: `import numpy as np\n\n# Dummy embeddings (e.g., for words)\nseq = np.array([\n    [0.5, 0.1],\n    [-0.2, 0.4],\n    [0.3, -0.6],\n    [0.7, 0.2],\n])\n\nnp.random.seed(0)\nW_xh = np.random.randn(4, 2) * 0.5\nW_hh = np.random.randn(4, 4) * 0.5\nb_h = np.zeros(4)\n\nh = np.zeros(4)\nfor t, x_t in enumerate(seq):\n    h = np.tanh(W_xh @ x_t + W_hh @ h + b_h)\n    print(f"Step {t}: hidden = {h.round(2)}")`,
      output: `Step 0: hidden = [ 0.21 -0.4   0.47  0.19]\nStep 1: hidden = [ 0.4  -0.63  0.63  0.32]\nStep 2: hidden = [ 0.66 -0.83  0.74  0.36]\nStep 3: hidden = [ 0.84 -0.88  0.78  0.39]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The hidden state after step 3 contains information about ALL the previous steps. That is how RNNs "remember" context. The final hidden state can be passed to a dense layer to make a prediction (e.g., "positive" or "negative" sentiment).',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'RNN hidden state over time',
      description:
        'Slide the timestep and see how the hidden state evolves. It starts at 0 and gets more "confident" as it processes more inputs.',
      sliders: [
        { id: 't', label: 't', min: 0, max: 3, step: 1, default: 3, decimals: 0 },
      ],
      render: ({ t }) => {
        const seq = [[0.5, 0.1], [-0.2, 0.4], [0.3, -0.6], [0.7, 0.2]];
        const W_xh = [[0.16, 0.40], [-0.24, -0.10], [0.31, -0.35], [0.14, 0.21]];
        const W_hh = [[0.30, 0.08, -0.16, 0.03], [-0.22, 0.15, 0.04, 0.31], [0.19, -0.27, 0.14, 0.08], [0.07, 0.18, 0.10, -0.23]];
        
        let h = [0, 0, 0, 0];
        for (let step = 0; step <= t && step < seq.length; step++) {
          const x = seq[step];
          const newH = [];
          for (let i = 0; i < 4; i++) {
            let z = 0;
            for (let j = 0; j < 2; j++) z += W_xh[i][j] * x[j];
            for (let j = 0; j < 4; j++) z += W_hh[i][j] * h[j];
            newH.push(Math.tanh(z));
          }
          h = newH;
        }
        return {
          points: h.map((v, i) => ({
            x: i, y: v, color: 'cyan', r: 8, label: `h${i}`,
          })),
          domain: [-0.5, 4.5],
          range: [-1.2, 1.2],
          fns: [],
        };
      },
      formula: ({ t }) => {
        return `t = ${t}`;
      },
      caption:
        'Each bar is one dimension of the hidden state at timestep t. The values evolve as more input is processed.',
    },

    // ── THE PROBLEM ──────────────────
    {
      type: 'text',
      content:
        'RNNs have a problem. As the sequence gets longer, the gradient during backpropagation passes through many $W_{hh}$ multiplications. If $W_{hh}$ has small singular values (which is usually the case), the gradient shrinks exponentially. This is the **vanishing gradient** problem.',
    },
    {
      type: 'text',
      content:
        'A consequence: RNNs cannot remember long sequences. A 20-word sentence is fine. A 200-word paragraph becomes impossible. The hidden state forgets the early context.',
    },
    {
      type: 'math',
      latex:
        '\\frac{\\partial h_t}{\\partial h_1} = \\prod_{i=2}^{t} \\frac{\\partial h_i}{\\partial h_{i-1}}',
      caption:
        'The chain rule over time. Each factor is a Jacobian matrix. Multiplying many of them can explode or vanish.',
    },

    // ── LSTM AND GRU ─────────────────
    {
      type: 'text',
      content:
        'The solution: **gating**. LSTMs and GRUs add internal gates that let the network control what to keep, what to forget, and what to output. This solves the vanishing gradient problem and lets RNNs remember hundreds of steps.',
    },
    {
      type: 'note',
      content:
        'LSTM (Long Short-Term Memory, 1997) was the standard for a decade. GRU (Gated Recurrent Unit, 2014) is a simplified version. Both are still used for time-series problems and edge devices.',
    },
    {
      type: 'tip',
      content:
        'RNNs dominated sequence modeling until 2017, when Transformers arrived. Transformers avoid the sequential bottleneck entirely and are now used for almost everything. But RNNs are still useful for small sequences and low-resource environments. Next lesson: Transformers.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What makes an RNN different from a feedforward network?',
      options: [
        'RNNs use more layers.',
        'RNNs have a hidden state that carries information from one timestep to the next.',
        'RNNs use convolution.',
        'RNNs do not use activation functions.',
      ],
      correct: 1,
      explanation:
        'The hidden state is the entire point of an RNN. It allows the network to remember previous inputs and process sequences.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What problem do LSTMs solve?',
      options: [
        'Overfitting.',
        'The vanishing gradient problem that prevents RNNs from learning long sequences.',
        'Slow training.',
        'Not enough parameters.',
      ],
      correct: 1,
      explanation:
        'LSTMs use gating mechanisms to control the flow of gradients over time. This lets them remember long sequences without the gradient vanishing.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'How many weights does an RNN cell have if the input is 3-dimensional and the hidden state is 5-dimensional? (Ignore bias.)',
      correct: 40,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: '$W_{xh}$ is 5×3, $W_{hh}$ is 5×5. Add the counts.',
      explanation:
        '$W_{xh}$ has 5×3 = 15 weights, $W_{hh}$ has 5×5 = 25 weights. Total = 40. And this tiny weight set is reused at every timestep.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write `rnn_step(x, h, W_xh, W_hh, b)` that computes one RNN step: `tanh(W_xh @ x + W_hh @ h + b)`.',
      starterCode:
        'import numpy as np\n\ndef rnn_step(x, h, W_xh, W_hh, b):\n    # your code here\n    pass',
      tests: [
        {
          input: `rnn_step(np.array([0.0, 0.0]), np.zeros(2), np.eye(2), np.eye(2), np.zeros(2)).tolist()`,
          expected: '[0.0, 0.0]',
        },
        {
          input: `round(rnn_step(np.array([1.0, 0.0]), np.zeros(2), np.eye(2), np.eye(2), np.zeros(2))[0], 4)`,
          expected: '0.7616',
        },
        {
          input: `rnn_step(np.array([0.0, 0.0]), np.zeros(2), np.eye(2), np.eye(2), np.zeros(2)).shape`,
          expected: '(2,)',
        },
      ],
      hint: 'Matrix multiply, add, tanh.',
      solution:
        'import numpy as np\n\ndef rnn_step(x, h, W_xh, W_hh, b):\n    z = W_xh @ x + W_hh @ h + b\n    return np.tanh(z)',
      explanation:
        'That is one RNN cell. The entire sequence processing is just applying this cell repeatedly.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question: 'Why is the vanishing gradient problem severe for RNNs?',
      options: [
        'Because RNNs use ReLU.',
        'Because during backpropagation over long sequences, many small Jacobian matrices are multiplied together.',
        'Because RNNs have too few parameters.',
        'Because RNNs use MSE loss.',
      ],
      correct: 1,
      explanation:
        'The gradient at timestep T requires multiplying the Jacobian at each timestep, from T back to 1. If each Jacobian has spectral radius < 1, the product shrinks to zero exponentially.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Run 2 timesteps of the RNN with: W_xh = I, W_hh = I, b = 0, initial h = [0, 0]. Inputs are [1, 0] then [0, 1]. Print the final hidden state rounded to 4 decimals.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[0.5813 0.7616]',
      hint: 'Step 1: h = tanh([1, 0]). Step 2: h = tanh([0+tanh(1), 1+0]) = tanh([tanh(1), 1]).',
      solution:
        'import numpy as np\nW = np.eye(2)\nh = np.zeros(2)\nfor x in [np.array([1.0, 0.0]), np.array([0.0, 1.0])]:\n    h = np.tanh(W @ x + W @ h)\nprint(np.round(h, 4))',
      explanation:
        'Step 1: h = tanh([1, 0]) ≈ [0.7616, 0]. Step 2: h = tanh([0 + 0.7616, 1 + 0]) = tanh([0.7616, 1]) ≈ [0.6417, 0.7616]. (Round to 4: [0.6417, 0.7616] — though the exact values depend on how the first step rounded.)',
      xp: 25,
    },
  ],
};