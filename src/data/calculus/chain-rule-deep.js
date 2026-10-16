// 📈 Calculus — Lesson 8: Chain Rule in Depth — How Backprop Works

export const calcChainRuleDeepLesson = {
  id: 'calc-chain-rule-deep',
  title: 'Chain Rule in Depth — How Backprop Works',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'The chain rule is the single most important calculus rule for AI. It is what makes training deep networks computationally possible — and what "backpropagation" actually means under the hood.',

  sections: [
    {
      type: 'text',
      content:
        'You met the chain rule in Lesson 5. It said: to differentiate $f(g(x))$, multiply the outer derivative by the inner derivative. Now we go deeper — literally. This is the rule that makes neural networks trainable.',
    },
    {
      type: 'math',
      latex:
        '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      caption:
        'The chain rule. Outer derivative evaluated at the inner, times inner derivative.',
    },
    {
      type: 'note',
      content:
        'The intuition: when you nudge x slightly, it causes a small change in g(x). That change in g(x) then causes a change in f. The two effects multiply. Small × small = combined change.',
    },
    {
      type: 'text',
      content:
        'You can chain this to any depth. If $y = f(g(h(x)))$, then the derivative is:',
    },
    {
      type: 'math',
      latex:
        '\\frac{dy}{dx} = f\'(g(h(x))) \\cdot g\'(h(x)) \\cdot h\'(x)',
      caption:
        'The chain rule applies layer after layer. Multiply all the derivatives along the chain.',
    },
    {
      type: 'simulation',
      title: 'Chain of three functions',
      description:
        'Slide x and watch the value of the composed function sin(x²). The derivative involves both an inner and outer derivative.',
      sliders: [
        { id: 'x0', label: 'x', min: -3, max: 3, step: 0.1, default: 1, decimals: 2 },
      ],
      render: ({ x0 }) => {
        const f = (x) => Math.sin(x * x);
        return {
          fns: [
            { fn: f, color: 'cyan', label: 'y = sin(x²)' },
            { fn: (x) => Math.cos(x * x) * 2 * x, color: 'rose', label: "dy/dx = 2x · cos(x²)" },
          ],
          domain: [-3, 3],
          range: [-3, 3],
          points: [
            { x: x0, y: f(x0), color: 'brand', r: 6 },
            { x: x0, y: Math.cos(x0 * x0) * 2 * x0, color: 'violet', r: 5 },
          ],
        };
      },
      formula: ({ x0 }) => {
        const outer = Math.cos(x0 * x0);
        const inner = 2 * x0;
        return `f'(x) = \\underbrace{${outer.toFixed(2)}}_{\\text{outer}} \\cdot \\underbrace{${inner.toFixed(2)}}_{\\text{inner}} = ${(outer * inner).toFixed(2)}`;
      },
      caption:
        'The derivative is the product of two things: how fast the sine is changing (cos), and how fast x² is changing (2x). Both depend on x.',
    },
    {
      type: 'text',
      content:
        'The chain rule is what makes deep neural networks trainable. Here is why:',
    },
    {
      type: 'text',
      content:
        'A deep network is a **composition** of many functions. Layer 1 feeds into layer 2, which feeds into layer 3, and so on. The output is $f_5(f_4(f_3(f_2(f_1(x)))))$ — five nested functions. To find how the output changes when you tweak a weight in layer 1, you apply the chain rule **four times in a row**.',
    },
    {
      type: 'math',
      latex:
        '\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial a_5} \\cdot \\frac{\\partial a_5}{\\partial a_4} \\cdot \\frac{\\partial a_4}{\\partial a_3} \\cdot \\frac{\\partial a_3}{\\partial a_2} \\cdot \\frac{\\partial a_2}{\\partial w_1}',
      caption:
        'The gradient of the loss with respect to a weight in layer 1 — a chain of partial derivatives going backwards through the network.',
    },
    {
      type: 'tip',
      content:
        'Notice the pattern: the chain is multiplied together. Each "link" is small (usually less than 1), so multiplying many links gives a very small number. This is why deep networks suffer from **vanishing gradients** — the signal from the loss barely reaches the early layers. Understanding this makes you a better ML engineer.',
    },
    {
      type: 'note',
      content:
        'The backward direction matters for efficiency. Instead of computing each weight\'s gradient from scratch, backprop caches intermediate values and reuses them — going once from the loss back to layer 1, computing every weight\'s gradient along the way. This is why it is called **back**propagation: the chain rule applied in reverse.',
    },
    {
      type: 'text',
      content:
        'A concrete example. Take $y = (2x + 1)^3$. This is an outer function $u^3$ with an inner function $u = 2x + 1$.',
    },
    {
      type: 'math',
      latex:
        '\\frac{dy}{dx} = 3(2x + 1)^2 \\cdot 2 = 6(2x + 1)^2',
      caption:
        'Outer derivative: $3u^2$. Inner derivative: $2$. Multiply: $6(2x+1)^2$.',
    },
    {
      type: 'graph',
      title: 'y = (2x + 1)³ and its derivative',
      fns: [
        { fn: (x) => Math.pow(2 * x + 1, 3), color: 'cyan', label: 'y = (2x+1)³' },
        { fn: (x) => 6 * Math.pow(2 * x + 1, 2), color: 'rose', label: "dy/dx = 6(2x+1)²" },
      ],
      domain: [-2, 2],
      range: [-5, 15],
      caption:
        'The chain rule breaks a complicated derivative into simple pieces: differentiate the outside, differentiate the inside, multiply.',
    },
    {
      type: 'text',
      content:
        'In practice, you will never compute backprop by hand. PyTorch, TensorFlow, and JAX do it automatically. But knowing the chain rule tells you **why** backprop is efficient, and **when** it will struggle (very deep networks, very small gradients).',
    },
    {
      type: 'warning',
      content:
        'The chain rule is not optional for deep learning — it is the engine. Without it, computing gradients in a network with a million parameters would take a billion times longer. Every training step you have ever run depends on this single rule, applied millions of times.',
    },
    {
      type: 'tip',
      content:
        'Next: partial derivatives. So far every function had one input. Real ML functions have thousands. Partial derivatives extend calculus to many variables.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'What is the derivative of $y = (3x + 2)^4$?',
      options: [
        '$4(3x + 2)^3$',
        '$12(3x + 2)^3$',
        '$4 \\cdot 3$',
        '$(3x + 2)^3$',
      ],
      correct: 1,
      explanation:
        'Chain rule: outer derivative is $4(3x+2)^3$, inner derivative is 3. Multiply: $12(3x+2)^3$.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'Why is the chain rule essential for training deep neural networks?',
      options: [
        'Because it is faster than addition.',
        'Because it lets you compute gradients through compositions of functions, layer by layer.',
        'Because it works on integers only.',
        'Because it replaces the product rule.',
      ],
      correct: 1,
      explanation:
        'Deep networks are nested functions. Computing the gradient of the loss with respect to each weight requires differentiating through the entire composition. The chain rule is the mechanism — applied backwards through the network.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'If $y = (2x)^3$, what is $dy/dx$ at $x = 1$?',
      correct: 24,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Use the chain rule: outer is $u^3$ → $3u^2$, inner is $2x$ → $2$. Then plug in x = 1.',
      explanation:
        '$dy/dx = 3(2x)^2 \\cdot 2 = 6 \\cdot 4x^2 = 24x^2$. At x = 1, this is 24. (Alternatively: $y = 8x^3$, so $y\' = 24x^2$, same answer.)',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'In backpropagation, gradients are computed:',
      options: [
        'Forward, from input to output.',
        'Backward, from loss to input, using the chain rule.',
        'Randomly, then averaged.',
        'Only for the last layer.',
      ],
      correct: 1,
      explanation:
        'Backprop starts with the loss at the output and works backward through each layer, applying the chain rule at every step. This is why it is called back-propagation.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Deep networks often suffer from "vanishing gradients". What causes this?',
      options: [
        'Too many parameters.',
        'Multiplying many small numbers together along the chain of derivatives shrinks the gradient toward zero.',
        'Not enough training data.',
        'Insufficient memory.',
      ],
      correct: 1,
      explanation:
        'Each layer in the chain contributes a factor (usually < 1) to the gradient. Multiplying 50 such factors makes the gradient exponentially small — so early layers learn very slowly. This is why techniques like ReLU, batch norm, and residual connections exist.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'What is the derivative of $y = e^{2x}$?',
      options: ['$e^{2x}$', '$2e^{2x}$', '$2x e^{2x}$', '$e^{2}$'],
      correct: 1,
      explanation:
        'Chain rule: outer is $e^{u}$ → $e^u$, inner is $2x$ → $2$. Multiply: $2e^{2x}$.',
      xp: 20,
    },
  ],
};