// 📈 Calculus — Lesson 1: What is a Function?

export const calcFunctionsLesson = {
  id: 'calc-functions',
  title: 'What is a Function?',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'A function is a machine: you feed it a number, it spits out another. Almost everything in AI is a function — the model itself is one giant function that turns inputs into predictions. This lesson builds the intuition you will use all module.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine a vending machine. You press B4, out comes a chocolate bar. Every button has exactly one snack assigned to it. Press B4 again — same chocolate. That is what a **function** is: a rule that takes an input and gives exactly one output.',
    },
    {
      type: 'text',
      content:
        'Mathematicians write it as $f(x)$. The letter $f$ is the name of the machine, and $x$ is what you feed in. The output is what comes out.',
    },
    {
      type: 'math',
      latex:
        'f(x) = x^2',
      caption:
        'The function "square it". Feed in 3, get 9. Feed in −2, get 4. One input → one output, always.',
    },
    {
      type: 'text',
      content:
        'Let us try it. Feed in 0, 1, 2, 3, 4. Out comes 0, 1, 4, 9, 16. Every input has exactly one output — that is the rule of a function. No input ever produces two answers.',
    },

    // ── NOTATION ───────────────────────
    {
      type: 'text',
      content:
        'A function has three parts: a **name** (like $f$), an **input** (the variable, usually $x$), and a **rule** (the formula that turns input into output).',
    },
    {
      type: 'math',
      latex:
        '\\underbrace{f}_{\\text{name}}\\underbrace{(x)}_{\\text{input}} = \\underbrace{x^2 + 1}_{\\text{rule}}',
      caption:
        'Read it as "eff of eks equals eks squared plus one". The name comes first, input in parentheses, rule on the right.',
    },
    {
      type: 'tip',
      content:
        'A function can have any name — $f$, $g$, $h$, or something descriptive like $\\text{loss}$ or $\\text{price}$. In ML you will meet names like $L(w)$ (loss as a function of weights) and $\\sigma(z)$ (sigmoid as a function of activation). Same idea, different letters.',
    },

    // ── GRAPHS ─────────────────────────
    {
      type: 'text',
      content:
        'A function is best understood by **drawing it**. Put input on the horizontal axis, output on the vertical. Every $(x, f(x))$ pair is one point. Connect the dots and you get a curve.',
    },
    {
      type: 'graph',
      title: 'The graph of f(x) = x²',
      fns: [{ fn: (x) => x * x, color: 'cyan', label: 'f(x) = x²' }],
      domain: [-3, 3],
      range: [-1, 10],
      points: [
        { x: 0, y: 0, color: 'brand', r: 5, label: '(0, 0)' },
        { x: 1, y: 1, color: 'brand', r: 5 },
        { x: 2, y: 4, color: 'brand', r: 5, label: '(2, 4)' },
        { x: 3, y: 9, color: 'brand', r: 5 },
        { x: -1, y: 1, color: 'brand', r: 5 },
        { x: -2, y: 4, color: 'brand', r: 5, label: '(−2, 4)' },
        { x: -3, y: 9, color: 'brand', r: 5 },
      ],
      caption:
        'The parabola. Notice how $(2, 4)$ and $(-2, 4)$ sit at the same height — squaring throws away the sign. Also notice the curve only lives at $y \\geq 0$.',
    },
    {
      type: 'note',
      content:
        'The **graph is the function made visible**. Every property you can describe with symbols has a picture: the highest point, the steepest slope, where it crosses zero. Graphs are how your brain understands a function faster than algebra ever could.',
    },

    // ── LINEAR ─────────────────────────
    {
      type: 'text',
      content:
        'Different rules give different shapes. The simplest is the **linear function** — a straight line. Its rule is $f(x) = mx + b$, where $m$ is the slope and $b$ is where it crosses the y-axis.',
    },
    {
      type: 'graph',
      title: 'A linear function',
      fns: [
        { fn: (x) => 2 * x + 1, color: 'brand', label: 'f(x) = 2x + 1' },
      ],
      domain: [-3, 3],
      range: [-5, 7],
      points: [
        { x: 0, y: 1, color: 'brand', r: 5, label: 'y-intercept (0, 1)' },
        { x: 1, y: 3, color: 'brand', r: 5 },
        { x: 2, y: 5, color: 'brand', r: 5 },
      ],
      caption:
        'A line. The slope is 2, meaning: every step right, you go 2 steps up. The line crosses the y-axis at 1.',
    },
    {
      type: 'text',
      content:
        'Linear functions are the workhorses of ML — regression models, the simplest neural network layers, even the pre-activation of a deep layer. But real problems are rarely linear. That is why we need curves.',
    },

    // ── QUADRATIC ──────────────────────
    {
      type: 'text',
      content:
        'A **quadratic** function — like $f(x) = x^2$ — bends. It drops to a minimum and rises again. That "valley" is exactly what we need for optimisation: gradient descent rolls downhill on a curve just like this.',
    },
    {
      type: 'graph',
      title: 'A quadratic and its valley',
      fns: [
        { fn: (x) => x * x - 4 * x + 5, color: 'violet', label: 'f(x) = x² − 4x + 5' },
      ],
      domain: [-1, 5],
      range: [-1, 8],
      points: [{ x: 2, y: 1, color: 'brand', r: 6, label: 'minimum (2, 1)' }],
      caption:
        'The bottom of the parabola is called the minimum. For this function it is at $x = 2$, $y = 1$. Optimisation is the art of finding these minima.',
    },
    {
      type: 'tip',
      content:
        'This is the shape of a loss function in machine learning. You have a "valley" of good parameter values, and training means walking down into it. Every time you see a parabola, think "the model wants to sit at the bottom."',
    },

    // ── EXPONENTIAL ────────────────────
    {
      type: 'text',
      content:
        'The **exponential** function $f(x) = e^x$ grows faster and faster the higher you go. It shows up everywhere in ML: softmax (turning scores into probabilities), sigmoid (binary decisions), and probability distributions.',
    },
    {
      type: 'graph',
      title: 'The exponential function',
      fns: [
        { fn: (x) => Math.exp(x), color: 'emerald', label: 'f(x) = eˣ' },
      ],
      domain: [-3, 2.5],
      range: [-1, 13],
      points: [
        { x: 0, y: 1, color: 'brand', r: 5, label: '(0, 1)' },
        { x: 1, y: Math.E, color: 'brand', r: 5, label: '(1, e ≈ 2.72)' },
      ],
      caption:
        'Always positive. Grows fast on the right, flattens to zero on the left. Never quite touches zero — it just gets closer and closer.',
    },
    {
      type: 'note',
      content:
        'The number $e \\approx 2.718$ is the "natural base" of growth. It appears whenever a quantity grows in proportion to its own size — populations, compound interest, and the softmax function inside every neural network.',
    },

    // ── INTERACTIVE ────────────────────
    {
      type: 'text',
      content:
        'Now let us play with a function and see how it changes shape as you change its parameters.',
    },
    {
      type: 'simulation',
      title: 'Shape-shifting function',
      description:
        'Drag the sliders to change $a$ and $b$ in $f(x) = ax^2 + bx$. Watch the parabola open, close, shift, and tilt.',
      sliders: [
        { id: 'a', label: 'a', min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
        { id: 'b', label: 'b', min: -4, max: 4, step: 0.5, default: 0, decimals: 1 },
      ],
      render: ({ a, b }) => ({
        fns: [
          {
            fn: (x) => a * x * x + b * x,
            color: 'brand',
            label: `f(x) = ${a}x² + ${b}x`,
          },
        ],
        domain: [-5, 5],
        range: [-8, 8],
      }),
      formula: ({ a, b }) => `f(x) = ${a}x^2 + ${b}x`,
      caption:
        'Try $a = 0$ — the parabola flattens into a line. Try $a < 0$ — the parabola opens downward (a hill instead of a valley). Try $b \\neq 0$ — the valley shifts left or right.',
    },

    // ── DOMAIN & RANGE ─────────────────
    {
      type: 'text',
      content:
        'Two more words worth knowing. The **domain** is the set of all inputs the function accepts. The **range** is the set of all outputs it can produce.',
    },
    {
      type: 'math',
      latex:
        'f(x) = \\sqrt{x} \\quad \\Rightarrow \\quad \\text{domain: } x \\geq 0',
      caption:
        'You cannot take the square root of a negative number (in real numbers). So the domain is restricted to non-negative inputs.',
    },
    {
      type: 'graph',
      title: 'The square root function',
      fns: [{ fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN), color: 'rose', label: 'f(x) = √x' }],
      domain: [-1, 6],
      range: [-1, 3],
      caption:
        'The curve only exists for $x \\geq 0$. Try to evaluate $\\sqrt{-1}$ and you get no real answer — so $-1$ is not in the domain.',
    },
    {
      type: 'text',
      content:
        'Every real-world function has a natural domain. A function that computes "price per item" only makes sense for positive item counts. A function that computes "years until retirement" only makes sense for ages below 100. In ML, the input features often come with natural constraints.',
    },

    // ── FUNCTIONS IN AI ────────────────
    {
      type: 'text',
      content:
        'Here is the big picture: **a machine learning model is a function**. You feed it an input — an image, a sentence, a customer record — and it returns an output, like a predicted class or a score.',
    },
    {
      type: 'math',
      latex:
        '\\text{model}(\\text{input}) = \\text{prediction}',
      caption:
        'Every ML model, no matter how complex, is a function from inputs to outputs.',
    },
    {
      type: 'text',
      content:
        'When you train a model, you are searching through a family of functions — billions of possible $f$ — and picking the one that best fits the data. That search is what gradient descent does, and it relies on the idea of "how does the output change when I nudge the input". Which is exactly what the next lesson is about.',
    },
    {
      type: 'note',
      content:
        'The takeaway: a function is a rule, a graph is its picture, and a machine learning model is a function we are trying to find. Everything in the rest of this module is about how to nudge the input and watch the output move — the study of **change**.',
    },
    {
      type: 'tip',
      content:
        'Next: Rate of Change. How fast does $f(x)$ change when $x$ moves? This is the question that opens the door to derivatives, and to how AI actually learns.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question: 'If $f(x) = x^2 + 3$, what is $f(4)$?',
      correct: 19,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Replace every $x$ with 4: $4^2 + 3$.',
      explanation:
        '$f(4) = 4^2 + 3 = 16 + 3 = 19$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'Why is the graph of $f(x) = x^2$ always at or above the x-axis?',
      options: [
        'Because x is always positive.',
        'Because squaring any real number gives a non-negative result.',
        'Because the coefficient is 1.',
        'Because the graph is symmetric.',
      ],
      correct: 1,
      explanation:
        'Squaring any real number — positive or negative — gives a non-negative result. So $x^2 \\geq 0$ everywhere. That is why the parabola opens upward from the origin and never dips below the x-axis.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'If $f(x) = 3x - 2$, what is $f(-3)$?',
      correct: -11,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Plug in −3 for x: $3 \\cdot (-3) - 2$.',
      explanation:
        '$f(-3) = 3(-3) - 2 = -9 - 2 = -11$.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'A quadratic function $f(x) = x^2 - 4x + 5$ has its minimum at $x = 2$. What is $f(2)$?',
      options: ['$0$', '$1$', '$2$', '$5$'],
      correct: 1,
      explanation:
        '$f(2) = 4 - 8 + 5 = 1$. That is the lowest point of the parabola — the "valley". In ML, this is where a loss function would want to sit.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which graph would best describe "the number of active users grows faster every month"?',
      options: [
        'A straight line going up.',
        'A parabola opening downward.',
        'An exponential curve rising faster and faster.',
        'A flat horizontal line.',
      ],
      correct: 2,
      explanation:
        'The exponential function $e^x$ grows at a rate proportional to its current value — exactly what "grows faster every month" means. Linear growth adds the same amount each time; exponential growth multiplies.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'In machine learning, what does it mean to say that "a model is a function"?',
      options: [
        'It is written in a functional programming language.',
        'It takes an input and returns an output according to some rule, and training means choosing the best rule.',
        'It cannot be trained.',
        'It must be a linear function.',
      ],
      correct: 1,
      explanation:
        'Every ML model is a function from inputs to outputs. Training means searching through a family of possible functions and picking the one that best matches the data. This is the deepest reason calculus matters for AI.',
      xp: 25,
    },
  ],
};