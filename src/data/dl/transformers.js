// 🧠 DL — Lesson 9: Transformers — Attention is All You Need

export const dlTransformersLesson = {
  id: 'dl-transformers',
  title: 'Transformers — The Architecture of ChatGPT',
  difficulty: 'advanced',
  duration: 30,
  intro:
    'The Transformer is the most important neural network architecture of the last decade. GPT, Claude, Gemini, BERT, Llama — all Transformers. It is also the simplest: it is just a bunch of attention blocks stacked on top of each other.',

  sections: [
    {
      type: 'text',
      content:
        'RNNs process sequences one word at a time. That makes them slow to train — you cannot parallelize across the sequence. The Transformer (Google, 2017) processes all words at once, using a mechanism called **self-attention** to let each word look at every other word.',
    },
    {
      type: 'note',
      content:
        'The Transformer is so powerful because it is fully parallelizable. That means it can be trained on massive GPUs, which is why modern language models can have billions of parameters. This is the architectural breakthrough that enabled the LLM era.',
    },

    // ── THE CORE IDEA ────────────────
    {
      type: 'text',
      content:
        'The core idea: for each word in a sentence, ask "which other words should I pay attention to?". Then build a weighted combination of those words, weighted by how relevant they are.',
    },
    {
      type: 'text',
      content:
        'For example, in "The animal didn\'t cross the street because it was too tired", the word "it" should strongly attend to "animal" (not "street"). Self-attention lets the model learn this automatically.',
    },

    // ── Q, K, V ──────────────────────
    {
      type: 'text',
      content:
        'Every word gets three vectors:\n\n• **Query (Q)** — "What am I looking for?"\n• **Key (K)** — "What do I contain?"\n• **Value (V)** — "What information do I provide?"',
    },
    {
      type: 'math',
      latex:
        'Q = X W_Q, \\quad K = X W_K, \\quad V = X W_V',
      caption:
        'X is the matrix of word embeddings. $W_Q$, $W_K$, $W_V$ are learned projection matrices.',
    },
    {
      type: 'text',
      content:
        'The attention score between word $i$ and word $j$ is the dot product of $Q_i$ and $K_j$. A high score means "word i should pay attention to word j". We then apply softmax to get weights, and use them to combine the values.',
    },
    {
      type: 'math',
      latex:
        '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V',
      caption:
        'The Transformer attention formula. The $\\sqrt{d_k}$ is a scaling factor to keep the dot products from getting too large.',
    },

    // ── CODE EXAMPLE ─────────────────
    {
      type: 'code',
      content: 'Self-attention in NumPy:',
      code: `import numpy as np\n\ndef softmax(x):\n    e = np.exp(x - x.max(axis=-1, keepdims=True))\n    return e / e.sum(axis=-1, keepdims=True)\n\ndef attention(Q, K, V):\n    d_k = Q.shape[-1]\n    scores = Q @ K.T / np.sqrt(d_k)\n    weights = softmax(scores)\n    return weights @ V\n\n# Toy example: 3 words, 4-dim embeddings\nnp.random.seed(42)\nX = np.random.randn(3, 4)\n\n# Learned projections (in real Transformers, these are learned)\nW_Q = np.random.randn(4, 2)\nW_K = np.random.randn(4, 2)\nW_V = np.random.randn(4, 2)\n\nQ = X @ W_Q\nK = X @ W_K\nV = X @ W_V\n\nout = attention(Q, K, V)\nprint(out.round(3))`,
      output: `[[ 0.18  -0.244]\n [ 0.179 -0.243]\n [ 0.178 -0.243]]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The output has the same shape as the input (3 words, but now 2-dimensional vectors). The whole point is: after attention, each word\'s vector contains information from the other words it attends to. "it" now contains a bit of "animal", "street", "tired", weighted by attention.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Self-attention weights',
      description:
        'Each row is a word. Each column is what that word attends to. Bright cells = strong attention.',
      sliders: [
        { id: 'row', label: 'Word index', min: 0, max: 2, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ row }) => {
        // Simulate a 3x3 attention matrix (softmax of random Q K^T)
        const scores = [
          [2.1, 0.5, -0.3],
          [0.4, 1.8, 0.2],
          [-0.5, 0.7, 2.4],
        ];
        const rowScores = scores[row];
        const maxScore = Math.max(...rowScores);
        const expScores = rowScores.map(s => Math.exp(s - maxScore));
        const sumExp = expScores.reduce((a, b) => a + b, 0);
        const weights = expScores.map(e => e / sumExp);
        
        return {
          points: weights.map((w, j) => ({
            x: j, y: w, color: w > 0.5 ? 'brand' : (w > 0.2 ? 'amber' : 'surface-700'), r: 10, label: `w=${w.toFixed(2)}`,
          })),
          domain: [-0.5, 2.5],
          range: [-0.1, 1.1],
          fns: [],
        };
      },
      formula: ({ row }) => {
        const scores = [[2.1, 0.5, -0.3], [0.4, 1.8, 0.2], [-0.5, 0.7, 2.4]];
        const maxScore = Math.max(...scores[row]);
        const expScores = scores[row].map(s => Math.exp(s - maxScore));
        const sumExp = expScores.reduce((a, b) => a + b, 0);
        const weights = expScores.map(e => e / sumExp);
        return `\\text{word ${row} attends: } [${weights.map(w => w.toFixed(2)).join(', ')}]`;
      },
      caption:
        'Each row of the attention matrix represents how one word distributes its attention over all words.',
    },

    // ── MULTI-HEAD ATTENTION ─────────
    {
      type: 'text',
      content:
        'In practice, we do not use one attention head — we use many. This is called **multi-head attention**. Each head learns to attend to different things (syntax, semantics, coreference, etc.). The results are concatenated.',
    },
    {
      type: 'math',
      latex:
        '\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) W_O',
      caption:
        '8 or 16 heads are typical. GPT-3 uses 96 heads. Each is a smaller attention operation, but together they cover many "perspectives".',
    },

    // ── ARCHITECTURE ─────────────────
    {
      type: 'text',
      content:
        'A Transformer block contains:\n\n• **Multi-head self-attention** — the mixing step\n• **Feedforward layer** — a dense network applied to each position\n• **LayerNorm and residuals** — for training stability\n\nA large language model (GPT, Claude, Llama) is just dozens of these blocks stacked. GPT-4 has ~100 blocks with ~100 layers each.',
    },
    {
      type: 'note',
      content:
        'The same block structure works for text, images, audio, protein sequences — everything becomes a sequence of tokens, and the Transformer applies. This is the "transformer revolution": one architecture, many problems.',
    },

    // ── WHY IT MATTERS ───────────────
    {
      type: 'text',
      content:
        'Transformers are now the dominant architecture across all of AI:\n\n• **GPT, Claude, Llama** — language (self-attention on tokens)\n• **ViT** — vision (self-attention on image patches)\n• **Whisper** — speech (self-attention on audio frames)\n• **AlphaFold 2** — protein folding (self-attention on amino acids)',
    },
    {
      type: 'tip',
      content:
        'You now understand the entire stack of modern AI! From a single neuron to backprop to Transformers. The next step is to actually fine-tune or build with these models. But for building from scratch, you have all the fundamentals.',
    },
    {
      type: 'note',
      content:
        'If you understand this lesson, you can read any LLM paper and follow the main ideas. The language model math — attention, softmax, layer norm — is exactly what you just learned. The only difference is scale (billions of parameters, trillions of tokens).',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the main advantage of Transformers over RNNs?',
      options: [
        'Transformers use less memory.',
        'Transformers are fully parallelizable, allowing huge training on GPUs.',
        'Transformers use no attention.',
        'Transformers do not need data.',
      ],
      correct: 1,
      explanation:
        'RNNs process sequentially and are hard to parallelize. Transformers process all tokens at once via self-attention. This allowed training much larger models on GPUs, which is why LLMs became possible.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'In self-attention, what are Q, K, V?',
      options: [
        'Query, Key, Value — three linear projections of each token.',
        'Quantitative, Kinetic, Velocity.',
        'Question, Knowledge, Verification.',
        'The three layers of a Transformer.',
      ],
      correct: 0,
      explanation:
        'Q, K, V stand for Query, Key, Value. They are learned linear projections of the token embeddings. Attention is computed as softmax(QK^T / √d) V.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'How many heads does multi-head attention typically use in a large model? (Give a common number like 8, 16, 32, or 96.)',
      correct: 8,
      tolerance: 88,
      placeholder: 'Any common number: 8, 16, 32, 96...',
      hint: 'Any typical value from papers is acceptable. Try 8.',
      explanation:
        '8 is the most common. GPT-3 uses 96 heads, BERT-base uses 12. Any of these is a correct answer — the point is that multi-head attention uses many parallel heads.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write `attention(Q, K, V)` that returns softmax(Q K^T / √d) V. Assume Q, K, V are 2D NumPy arrays.',
      starterCode:
        'import numpy as np\n\ndef attention(Q, K, V):\n    # your code here\n    pass',
      tests: [
        {
          input: `attention(np.eye(2), np.eye(2), np.eye(2)).shape`,
          expected: '(2, 2)',
        },
        {
          input: `round(float(attention(np.eye(2), np.eye(2), np.eye(2))[0, 0]), 4)`,
          expected: '0.6604',
        },
      ],
      hint: 'softmax over the last axis. Scale by sqrt(d_k) where d_k is Q.shape[-1].',
      solution:
        'import numpy as np\n\ndef attention(Q, K, V):\n    d_k = Q.shape[-1]\n    scores = Q @ K.T / np.sqrt(d_k)\n    e = np.exp(scores - scores.max(axis=-1, keepdims=True))\n    weights = e / e.sum(axis=-1, keepdims=True)\n    return weights @ V',
      explanation:
        'This is the exact attention formula from the paper. It is the single most important operation in all of modern AI.',
      xp: 40,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'What is the purpose of the $\\sqrt{d_k}$ scaling in the attention formula?',
      options: [
        'To make the computation slower.',
        'To prevent the dot products from getting too large, which would saturate the softmax.',
        'To reduce the number of parameters.',
        'To add randomness.',
      ],
      correct: 1,
      explanation:
        'Without scaling, dot products between high-dimensional vectors can be very large. Softmax would then saturate (nearly one-hot), and gradients would vanish. Dividing by √d_k keeps the scores well-behaved.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Compute the attention weights for Q = K = [[1, 0], [0, 1]] (no V needed). Print the first row of the weight matrix to 4 decimals as a list.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[0.6604, 0.3396]',
      hint: 'Q @ K.T = [[1, 0], [0, 1]]. Divide by √2. Softmax each row.',
      solution:
        'import numpy as np\nQ = np.eye(2)\nK = np.eye(2)\nscores = Q @ K.T / np.sqrt(2)\ne = np.exp(scores - scores.max(axis=-1, keepdims=True))\nW = e / e.sum(axis=-1, keepdims=True)\nprint(W[0].round(4).tolist())',
      explanation:
        'Q @ K.T = I (identity). Divide by √2. Exp and softmax. The first row is [0.6604, 0.3396].',
      xp: 30,
    },
  ],
};