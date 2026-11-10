// 🧠 DL — Lesson 1: What is a Neural Network?

export const dlWhatIsNnLesson = {
  id: 'dl-what-is-nn',
  title: 'What is a Neural Network?',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'A neural network is not magic. It is just a function that takes numbers in, does a lot of math on them, and gives numbers out. But it can learn almost any pattern. This lesson shows you the simplest version — one neuron.',

  sections: [
    {
      type: 'text',
      content:
        'In the ML module, you learned regression and classification. Those models can only learn **straight lines** (or simple curves). A neural network can learn **anything**. A circle, a squiggle, a photo of a cat — if you can represent it as numbers, a neural network can learn it.',
    },
    {
      type: 'text',
      content:
        'How? By stacking simple building blocks called **neurons**. One neuron is just a tiny function. But when you put thousands of them together in layers, they can approximate any function.',
    },

    // ── THE SINGLE NEURON ────────────
    {
      type: 'text',
      content:
        'Let us start with one neuron. It does exactly what linear regression does, plus one twist.',
    },
    {
      type: 'math',
      latex:
        '\\text{output} = \\text{activation}(w \\cdot x + b)',
      caption:
        'A single neuron. Multiply inputs by weights, add bias, then pass through an activation function.',
    },
    {
      type: 'text',
      content:
        'The $w \\cdot x + b$ part is the same as regression. The new part is the **activation function**. It adds a non-linear "kink" to the output. Without it, no matter how many neurons you stack, the network is still just a linear model.',
    },
    {
      type: 'code',
      content: 'A single neuron in Python:',
      code: `import numpy as np\n\ndef neuron(x, w, b):\n    # Linear part: weighted sum + bias\n    z = np.dot(w, x) + b\n    # Activation: ReLU (rectified linear unit)\n    a = max(0, z)\n    return a\n\n# Example\nx = np.array([1.5, 2.0])\nw = np.array([0.5, -0.3])\nb = 0.1\n\nprint(neuron(x, w, b))`,
      output: `0.25`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Why the ReLU (`max(0, z)`)? Because it is dead simple and works shockingly well. If z > 0, the neuron is "active" and passes the signal forward. If z < 0, it outputs 0 (silent). This simple gate is what modern neural networks are built from.',
    },

    // ── BIOLOGICAL INSPIRATION ───────
    {
      type: 'text',
      content:
        'The name "neural network" comes from biology. Our brains have ~86 billion neurons, connected to each other. When a neuron gets enough signal from its inputs, it "fires" (sends a signal forward). Artificial neurons work the same way.',
    },
    {
      type: 'text',
      content:
        'The dot product $w \\cdot x$ is "how much signal" the neuron receives. The bias $b$ is "how easily it fires" (threshold). The activation function is the "fire or not" decision.',
    },
    {
      type: 'note',
      content:
        'Do not take the biological analogy too literally. Artificial neurons are much simpler than real ones. But the same principle applies: many tiny decision-makers, connected together, can solve complex problems.',
    },

    // ── LAYERS ───────────────────────
    {
      type: 'text',
      content:
        'One neuron is weak. It can only split the world in half (a straight line). To learn curves, we stack neurons in **layers**.',
    },
    {
      type: 'text',
      content:
        '• **Input layer** — the raw features (e.g., pixel values)\n• **Hidden layers** — intermediate representations (the magic)\n• **Output layer** — the final prediction (e.g., "cat" or "dog")',
    },
    {
      type: 'math',
      latex:
        'x \\;\\to\\; [\\text{hidden}_1] \\;\\to\\; [\\text{hidden}_2] \\;\\to\\; \\text{output}',
      caption:
        'Forward flow. Each layer transforms the previous layer\'s output. Stacking makes the model more expressive.',
    },

    // ── INTERACTIVE ──────────────────
    {
      type: 'simulation',
      title: 'One neuron learning a pattern',
      description:
        'A single neuron is trying to separate two classes. Move the slider to change the weight (w). The bias (b) is fixed. Watch the decision boundary shift.',
      sliders: [
        { id: 'w', label: 'w', min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
      ],
      render: ({ w }) => {
        // A single neuron's decision boundary: w*x + b = 0 → x = -b/w
        // Show points in 2D where class 1 is on one side, class 0 on the other.
        return {
          points: [
            { x: 0.5, y: 0.5, color: 'emerald', r: 6 },
            { x: 1.0, y: 1.2, color: 'emerald', r: 6 },
            { x: 1.5, y: 0.8, color: 'emerald', r: 6 },
            { x: -1, y: -1, color: 'rose', r: 6 },
            { x: -1.5, y: -0.5, color: 'rose', r: 6 },
            { x: -0.8, y: -1.5, color: 'rose', r: 6 },
          ],
          fns: [
            {
              // Decision line: y = -x - 0.5 (approximately)
              fn: (x) => -x + (0.5 / (w || 1)),
              color: 'brand',
              label: `Decision boundary (w=${w.toFixed(1)})`,
            },
          ],
          domain: [-3, 3],
          range: [-3, 3],
        };
      },
      formula: ({ w }) => `\\text{Decision: } ${w.toFixed(1)}x + 0.5 > 0`,
      caption:
        'The neuron draws a straight line. Everything on one side is classified as class 1, the other side as class 0. To learn curves, we need layers.',
    },

    // ── THE XOR PROBLEM ──────────────
    {
      type: 'text',
      content:
        'Here is a classic problem that a single neuron cannot solve. The **XOR problem**. It is like the logic gate: output 1 only if the two inputs are different.',
    },
    {
      type: 'graph',
      title: 'XOR is not linearly separable',
      fns: [],
      points: [
        { x: 0, y: 0, color: 'rose', r: 7, label: '0' },
        { x: 1, y: 1, color: 'rose', r: 7, label: '0' },
        { x: 0, y: 1, color: 'emerald', r: 7, label: '1' },
        { x: 1, y: 0, color: 'emerald', r: 7, label: '1' },
      ],
      domain: [-0.5, 1.5],
      range: [-0.5, 1.5],
      caption:
        'Can you draw ONE straight line that separates the red (0) from the green (1)? No. You need at least two lines — i.e., a hidden layer.',
    },
    {
      type: 'code',
      content: 'XOR with a hidden layer (this is a full neural network!):',
      code: `import numpy as np\n\ndef relu(x):\n    return np.maximum(0, x)\n\n# Inputs\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\n\n# Hidden layer (2 neurons)\nW1 = np.array([[1, 1], [1, 1]])  # each neuron fires if any input is 1\nb1 = np.array([0, -1])            # second neuron has a bias\n\n# Output layer (1 neuron)\nW2 = np.array([1, -2])            # XOR logic\nb2 = 0\n\n# Forward pass\nhidden = relu(X @ W1 + b1)\noutput = relu(hidden @ W2 + b2)\n\nprint("Inputs:", X.tolist())\nprint("XOR:   ", output.tolist())`,
      output: `Inputs: [[0, 0], [0, 1], [1, 0], [1, 1]]\nXOR:    [0, 1, 1, 0]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'That is a neural network. Two layers, four neurons, and it solves XOR. It is not learning yet — I gave it the weights by hand. Real neural networks learn the weights via backpropagation (next lessons).',
    },

    // ── WHY IT MATTERS ───────────────
    {
      type: 'text',
      content:
        'Why does this matter? Because **with enough layers, a neural network can approximate ANY function**. This is called the universal approximation theorem. It is why deep learning is so powerful.',
    },
    {
      type: 'text',
      content:
        'Your phone\'s face unlock, ChatGPT, Stable Diffusion, AlphaFold — all built from this one idea: layers of neurons, trained on data.',
    },
    {
      type: 'tip',
      content:
        'Next: activation functions. The magic ingredient that lets a neural network learn curves instead of just lines.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the difference between a single neuron and linear regression?',
      options: [
        'Nothing — they are identical.',
        'A neuron adds an activation function (non-linearity).',
        'A neuron uses more parameters.',
        'Linear regression is faster.',
      ],
      correct: 1,
      explanation:
        'A neuron is $\\text{activation}(w \\cdot x + b)$. Without the activation function, it is just linear regression. The activation lets it learn non-linear patterns.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question: 'If $x = [2, 3]$, $w = [0.5, 0.2]$, $b = -1$, and the activation is ReLU, what is the output?',
      correct: 0.6,
      tolerance: 0.01,
      placeholder: 'e.g. 0.6',
      hint: '$z = 0.5 \\cdot 2 + 0.2 \\cdot 3 - 1$. Then ReLU(z) = max(0, z).',
      explanation:
        '$z = 1 + 0.6 - 1 = 0.6$. ReLU(0.6) = 0.6.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'What does ReLU do?',
      options: [
        'Squares the input.',
        'Returns max(0, input).',
        'Returns min(0, input).',
        'Divides the input by 2.',
      ],
      correct: 1,
      explanation:
        'ReLU (Rectified Linear Unit) returns max(0, z). If z is negative, output is 0. If z is positive, output is z. This is the simplest activation and works surprisingly well.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question: 'Why can a single neuron NOT solve the XOR problem?',
      options: [
        'Because XOR is too complex.',
        'Because a single neuron draws a linear boundary, and XOR is not linearly separable.',
        'Because XOR requires 3 inputs.',
        'Because XOR is not a function.',
      ],
      correct: 1,
      explanation:
        'A single neuron produces $\\text{activation}(wx + b)$, which can only split the space with a straight line. XOR requires a non-linear boundary, so you need at least one hidden layer.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `neuron(x, w, b)` that computes ReLU(w · x + b). Return the result as a float.',
      starterCode:
        'import numpy as np\n\ndef neuron(x, w, b):\n    # your code here\n    pass',
      tests: [
        {
          input: 'neuron(np.array([1, 2]), np.array([1, 1]), 0)',
          expected: '3',
        },
        {
          input: 'neuron(np.array([1, -5]), np.array([1, 1]), 0)',
          expected: '0',
        },
        {
          input: 'neuron(np.array([1, 1]), np.array([0.5, 0.5]), -3)',
          expected: '0',
        },
      ],
      hint: 'Compute z = x · w + b, then return max(0, z).',
      solution:
        'import numpy as np\n\ndef neuron(x, w, b):\n    z = np.dot(w, x) + b\n    return float(max(0, z))',
      explanation:
        'That is the entire neuron. Dot product, bias, then ReLU. Every deep learning layer is built from this exact operation, applied to thousands of inputs at once.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Use a loop to compute the neuron output for x = [[1,1], [2,2], [3,3]] with w = [0.5, 0.5] and b = -2. Print the resulting list.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[0, 0, 1]',
      hint: 'z = 0.5*1 + 0.5*1 - 2 = -1 → ReLU = 0. z = 0.5*2 + 0.5*2 - 2 = 0 → ReLU = 0. z = 0.5*3 + 0.5*3 - 2 = 1 → ReLU = 1.',
      solution: 'import numpy as np\n\nX = [[1,1], [2,2], [3,3]]\nw = [0.5, 0.5]\nb = -2\nresult = []\nfor x in X:\n    z = np.dot(w, x) + b\n    result.append(max(0, z))\nprint(result)',
      explanation:
        'The three z values are -1, 0, 1. ReLU turns -1 to 0, 0 to 0, 1 to 1. The output is [0, 0, 1].',
      xp: 25,
    },
  ],
};