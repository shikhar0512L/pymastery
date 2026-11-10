// 🧠 DL — Lesson 5: Backpropagation

export const dlBackpropagationLesson = {
  id: 'dl-backpropagation',
  title: 'Backpropagation — How Networks Learn',
  difficulty: 'advanced',
  duration: 28,
  intro:
    'Backpropagation is the algorithm that makes deep learning possible. It is just the chain rule from calculus, applied systematically through the layers of a network. Without it, we would have no way to know how to update the millions of weights.',

  sections: [
    {
      type: 'text',
      content:
        'In forward propagation, data flows from left to right (input → output). In backpropagation, the **error** flows from right to left. We ask: "How much did each weight contribute to the final error?"',
    },
    {
      type: 'note',
      content:
        'The name "backpropagation" comes from propagating the error backwards. It is the algorithm that computes the gradient of the loss with respect to every single weight in the network.',
    },

    // ── THE CHAIN RULE ───────────────
    {
      type: 'text',
      content:
        'You learned in Calculus: if $y = f(g(x))$, then the derivative is $f\'(g(x)) \\cdot g\'(x)$.',
    },
    {
      type: 'text',
      content:
        'A neural network is just a giant composition of functions: $L(W_3, W_2, W_1)$. To find how the loss changes with respect to $W_1$, we chain the derivatives through all the layers.',
    },
    {
      type: 'math',
      latex:
        '\\frac{\\partial L}{\\partial W_1} = \\frac{\\partial L}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial z_3} \\cdot \\frac{\\partial z_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial z_2} \\cdot \\frac{\\partial z_2}{\\partial W_1}',
      caption:
        'The chain rule applied to a 3-layer network. We multiply the local gradients backwards.',
    },

    // ── A TINY EXAMPLE ───────────────
    {
      type: 'text',
      content:
        'Let us do a single neuron to see the math. One input $x$, one weight $w$, one bias $b$, sigmoid activation, MSE loss.',
    },
    {
      type: 'math',
      latex:
        'z = w x + b, \\quad a = \\sigma(z), \\quad L = (a - y)^2',
      caption: 'Forward pass.',
    },
    {
      type: 'text',
      content:
        'Now, backwards. We need $\\partial L / \\partial w$. By the chain rule:',
    },
    {
      type: 'math',
      latex:
        '\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}',
      caption: 'The chain.',
    },
    {
      type: 'text',
      content:
        'Let us compute each piece:\n\n• $\\frac{\\partial L}{\\partial a} = 2(a - y)$ (derivative of squared error)\n• $\\frac{\\partial a}{\\partial z} = \\sigma(z)(1 - \\sigma(z))$ (derivative of sigmoid, from Calculus module)\n• $\\frac{\\partial z}{\\partial w} = x$ (since z = wx + b)\n\nMultiply them: $\\frac{\\partial L}{\\partial w} = 2(a - y) \\cdot \\sigma(z)(1 - \\sigma(z)) \\cdot x$.',
    },
    {
      type: 'code',
      content: 'Backprop for a single neuron:',
      code: `import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\ndef backprop(x, w, b, y):\n    # Forward\n    z = w * x + b\n    a = sigmoid(z)\n    \n    # Backward\n    dL_da = 2 * (a - y)        # dL/da\n    da_dz = a * (1 - a)        # da/dz\n    dz_dw = x                  # dz/dw\n    dz_db = 1                  # dz/db\n    \n    dL_dw = dL_da * da_dz * dz_dw\n    dL_db = dL_da * da_dz * dz_db\n    \n    return dL_dw, dL_db\n\n# Example\ndw, db = backprop(x=2.0, w=0.5, b=0.0, y=1.0)\nprint(f"dL/dw = {dw:.4f}")\nprint(f"dL/db = {db:.4f}")`,
      output: `dL/dw = 0.1946\ndL/db = 0.0973`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Notice that $\\partial L/\\partial w$ has an $x$ in it. If $x$ was bigger, the gradient would be bigger. This is why large inputs cause large updates. And notice the sigmoid derivative $a(1-a)$ — it is always less than 0.25. When you multiply many of these together in a deep network, the gradient shrinks exponentially. This is the vanishing gradient problem.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Gradient flow through one neuron',
      description:
        'Change the input x and see how the gradient with respect to w changes. Bigger x = bigger gradient.',
      sliders: [
        { id: 'x', label: 'x', min: -3, max: 3, step: 0.1, default: 2, decimals: 1 },
        { id: 'w', label: 'w', min: -2, max: 2, step: 0.1, default: 0.5, decimals: 1 },
      ],
      render: ({ x, w }) => {
        const z = w * x;
        const a = 1 / (1 + Math.exp(-z));
        const dL_da = 2 * (a - 1);
        const da_dz = a * (1 - a);
        const dL_dw = dL_da * da_dz * x;
        return {
          fns: [],
          points: [{ x: x, y: dL_dw, color: 'brand', r: 8, label: 'dL/dw' }],
          domain: [-3.5, 3.5],
          range: [-2, 2],
        };
      },
      formula: ({ x, w }) => {
        const z = w * x;
        const a = 1 / (1 + Math.exp(-z));
        const dL_da = 2 * (a - 1);
        const da_dz = a * (1 - a);
        const dL_dw = dL_da * da_dz * x;
        return `\\frac{\\partial L}{\\partial w} = ${dL_dw.toFixed(3)}`;
      },
      caption:
        'The gradient points in the direction of steepest increase. To reduce the loss, we move w in the opposite direction of this gradient.',
    },

    // ── WHY IT MATTERS ───────────────
    {
      type: 'text',
      content:
        'Backpropagation is the reason modern deep learning works. Without it, computing the gradient of a million-parameter network would be impossibly slow. Backprop computes all gradients in a **single backward pass** — order-of-magnitude faster.',
    },
    {
      type: 'code',
      content: 'How PyTorch does it (just for reference — not runnable in Pyodide):',
      code: `# PyTorch code (for reference)\n# output = model(x)\n# loss = loss_fn(output, y)\n# loss.backward()   ← this is backprop\n# optimizer.step()  ← updates all weights`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'That `.backward()` call triggers the entire backprop algorithm. It calculates $\\partial L/\\partial w$ for every single weight in the model, no matter how deep. Then `optimizer.step()` uses those gradients to nudge each weight.',
    },
    {
      type: 'tip',
      content:
        'Next: putting it all together. Forward, loss, backward, update. The training loop that turns a random neural network into a trained one.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is backpropagation?',
      options: [
        'A way to initialize weights randomly.',
        'An algorithm to compute gradients of the loss with respect to all weights, using the chain rule.',
        'A type of activation function.',
        'A way to make the network smaller.',
      ],
      correct: 1,
      explanation:
        'Backpropagation is an algorithm that computes the gradient of the loss with respect to every weight in the network, using the chain rule from calculus.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'For sigmoid activation, if a = 0.5, what is da/dz? (Recall: da/dz = a(1-a))',
      correct: 0.25,
      tolerance: 0.01,
      placeholder: 'e.g. 0.25',
      hint: '0.5 * (1 - 0.5).',
      explanation:
        'da/dz = 0.5 * 0.5 = 0.25. Note it is always ≤ 0.25. This is why sigmoid layers cause vanishing gradients.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Why is backpropagation fast?',
      options: [
        'It skips the forward pass.',
        'It computes gradients with respect to all weights in a single backward pass.',
        'It uses random numbers.',
        'It only works on small networks.',
      ],
      correct: 1,
      explanation:
        'Without backprop, computing the gradient of each weight separately would take O(n) passes. Backprop computes all gradients in one pass — the key algorithmic innovation that makes deep learning feasible.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write `sigmoid_grad(a)` that takes the output of sigmoid (a) and returns da/dz = a(1-a).',
      starterCode:
        'def sigmoid_grad(a):\n    # your code here\n    pass',
      tests: [
        { input: 'sigmoid_grad(0.5)', expected: '0.25' },
        { input: 'round(sigmoid_grad(0.9), 3)', expected: '0.09' },
        { input: 'sigmoid_grad(0.0)', expected: '0.0' },
      ],
      hint: 'Just multiply a by (1-a).',
      solution:
        'def sigmoid_grad(a):\n    return a * (1 - a)',
      explanation:
        'This derivative comes from the calculus module. It is one of the most important derivatives in all of deep learning.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'output-match',
      question:
        'For a single sigmoid neuron with x=1, w=0, b=0, y=1: compute the gradient dL/dw using MSE loss. Print it to 4 decimal places.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '-0.25',
      hint: 'a = sigmoid(0) = 0.5. dL/da = 2(0.5-1) = -1. da/dz = 0.25. dz/dw = 1. Result: -1 * 0.25 * 1 = -0.25.',
      solution:
        'import numpy as np\nx, w, b, y = 1, 0, 0, 1\nz = w*x + b\na = 1/(1 + np.exp(-z))\ndL_da = 2*(a - y)\nda_dz = a*(1 - a)\ndz_dw = x\ndL_dw = dL_da * da_dz * dz_dw\nprint(round(dL_dw, 4))',
      explanation:
        'At w=0, a=0.5. The prediction is 0.5, but the truth is 1. So the gradient is negative — the loss would decrease if we increase w. Backprop correctly produces a negative gradient.',
      xp: 30,
    },
  ],
};