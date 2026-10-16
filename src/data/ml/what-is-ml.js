// 🤖 ML — Lesson 1: What is Machine Learning?

export const mlWhatIsMlLesson = {
  id: 'ml-what-is-ml',
  title: 'What is Machine Learning?',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Machine learning is not magic. It is a very simple idea: instead of writing rules by hand, we let the computer find the rules from examples. This lesson is where that idea clicks.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine you are writing a program to recognise spam emails. The old-school way: write a long list of rules — "if the subject contains FREE, and the sender is unknown, and the body has more than 5 exclamation marks, mark as spam." You would spend weeks writing rules, and every new spam trick would break them.',
    },
    {
      type: 'text',
      content:
        'The machine learning way: show the computer **thousands of spam emails and thousands of normal emails**. Let it figure out the rules itself. It will find patterns you never thought of — and adapt automatically when spammers change tactics.',
    },
    {
      type: 'note',
      content:
        'This is the whole idea in one line: **instead of programming the rules, we feed examples and let the computer find the rules.** Everything else in ML is detail.',
    },

    // ── TRADITIONAL VS ML ────────────
    {
      type: 'text',
      content:
        'Here is the difference visualised. Both approaches produce a program that takes an input and returns an output. The difference is where the logic comes from.',
    },
    {
      type: 'math',
      latex:
        '\\textbf{Traditional:}\\; \\text{Input} + \\text{Rules (written by human)} \\to \\text{Output}',
      caption:
        'Traditional programming: you write the rules. The computer applies them.',
    },
    {
      type: 'math',
      latex:
        '\\textbf{Machine Learning:}\\; \\text{Input} + \\text{Output (examples)} \\to \\text{Rules (learned)}',
      caption:
        'Machine learning: you provide examples. The computer extracts the rules.',
    },
    {
      type: 'tip',
      content:
        'This is why ML is so powerful. Some problems have rules that are easy to show by example but nearly impossible to write down. "What makes a face?" is such a problem. "What makes a sentence funny?" is another. Even you would struggle to write those rules explicitly — but you can easily point at examples.',
    },

    // ── THREE PARADIGMS ──────────────
    {
      type: 'text',
      content:
        'Machine learning comes in three broad flavours, depending on what kind of examples you have.',
    },
    {
      type: 'text',
      content:
        '**1. Supervised learning** — you have labelled examples. Each input comes with the correct output. The model learns to map input → output. This is by far the most common kind, and what we will focus on.',
    },
    {
      type: 'text',
      content:
        '**2. Unsupervised learning** — you have inputs but no labels. The model finds structure on its own — clusters, patterns, anomalies. Used for grouping customers, detecting fraud, or discovering hidden topics in text.',
    },
    {
      type: 'text',
      content:
        '**3. Reinforcement learning** — the model learns by interacting with an environment and receiving rewards. Used for game-playing AIs, robot control, and recommendation systems. This is how AlphaGo beat the world champion at Go.',
    },
    {
      type: 'graph',
      title: 'Supervised vs Unsupervised — visually',
      fns: [
        { fn: (x) => 0.5 * x + 1, color: 'slate', label: 'supervised — find the line', dashed: true, strokeWidth: 1.5 },
      ],
      points: [
        { x: 0, y: 1, color: 'brand', r: 6 },
        { x: 1, y: 1.5, color: 'brand', r: 6 },
        { x: 2, y: 2.1, color: 'brand', r: 6 },
        { x: 3, y: 2.4, color: 'brand', r: 6 },
        { x: 4, y: 3.1, color: 'brand', r: 6 },
      ],
      domain: [-0.5, 5],
      range: [-0.5, 4],
      caption:
        'Supervised: we know the answer for each point. The model finds the pattern (here, a line) that best explains them.',
    },
    {
      type: 'graph',
      title: 'Unsupervised — cluster discovery',
      fns: [],
      points: [
        { x: 1, y: 1, color: 'brand', r: 6 },
        { x: 1.2, y: 1.3, color: 'brand', r: 6 },
        { x: 0.9, y: 1.2, color: 'brand', r: 6 },
        { x: 4, y: 1, color: 'emerald', r: 6 },
        { x: 4.2, y: 1.2, color: 'emerald', r: 6 },
        { x: 3.9, y: 0.8, color: 'emerald', r: 6 },
        { x: 2.5, y: 3.5, color: 'violet', r: 6 },
        { x: 2.7, y: 3.7, color: 'violet', r: 6 },
        { x: 2.4, y: 3.4, color: 'violet', r: 6 },
      ],
      domain: [-0.5, 5.5],
      range: [-0.5, 5],
      caption:
        'Unsupervised: no labels. The model discovers that the points naturally fall into three groups — clusters it found on its own.',
    },
    {
      type: 'note',
      content:
        'For the rest of this module, we focus on **supervised learning** — the most common in practice and the easiest to understand. Once you understand it, unsupervised and reinforcement are natural extensions.',
    },

    // ── SUPERVISED IN DETAIL ─────────
    {
      type: 'text',
      content:
        'Supervised learning has two ingredients. Every example consists of:',
    },
    {
      type: 'text',
      content:
        '• **Features** — the input. The description of the thing. For a house: size, number of rooms, location, age.\n• **Label** — the output. The answer we want to predict. For a house: its price.',
    },
    {
      type: 'math',
      latex:
        '\\text{example} = (\\underbrace{x_1, x_2, \\ldots, x_n}_{\\text{features}}, \\; \\underbrace{y}_{\\text{label}})',
      caption:
        'Each training example pairs a set of features with a single label.',
    },
    {
      type: 'text',
      content:
        'Here is a tiny example. Five houses, each with one feature (size in square feet) and one label (price in lakhs).',
    },
    {
      type: 'code',
      content: 'A tiny training dataset:',
      code: `import numpy as np\n\n# Size (sq ft), Price (lakhs)\nsizes  = np.array([500, 800, 1000, 1500, 2000])\nprices = np.array([25, 40, 48, 72, 95])\n\nprint("Features:", sizes)\nprint("Labels:  ", prices)`,
      output: `Features: [ 500  800 1000 1500 2000]\nLabels:   [25 40 48 72 95]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Our goal: from this data, learn a rule that maps size → price. Then use it to predict the price of a house we have never seen.',
    },

    // ── VISUALISE ───────────────────
    {
      type: 'graph',
      title: 'The training data',
      fns: [],
      points: [
        { x: 500, y: 25, color: 'brand', r: 7, label: '(500, 25)' },
        { x: 800, y: 40, color: 'brand', r: 7, label: '(800, 40)' },
        { x: 1000, y: 48, color: 'brand', r: 7 },
        { x: 1500, y: 72, color: 'brand', r: 7 },
        { x: 2000, y: 95, color: 'brand', r: 7, label: '(2000, 95)' },
      ],
      domain: [400, 2100],
      range: [15, 105],
      caption:
        'Each dot is one training example. The pattern is obvious: bigger houses cost more. But we want the model to find the exact relationship automatically.',
    },

    // ── THE SIMULATION ───────────────
    {
      type: 'text',
      content:
        'Let us try to find the rule ourselves. We are looking for a line through the points — a straight-line relationship between size and price. The line has two parameters: a slope $m$ and an intercept $c$.',
    },
    {
      type: 'math',
      latex:
        '\\text{price} = m \\cdot \\text{size} + c',
      caption:
        'The model. Two numbers, $m$ and $c$, that we need to figure out.',
    },
    {
      type: 'simulation',
      title: 'Find the best line',
      description:
        'Drag the sliders to change the slope and intercept. The red segments show the error at each point. Our goal is to make those errors as small as possible.',
      sliders: [
        { id: 'm', label: 'm', min: 0.02, max: 0.08, step: 0.002, default: 0.03, decimals: 3 },
        { id: 'c', label: 'c', min: -10, max: 20, step: 0.5, default: 15, decimals: 1 },
      ],
      render: ({ m, c }) => {
        const sizes = [500, 800, 1000, 1500, 2000];
        const prices = [25, 40, 48, 72, 95];
        const residualVectors = [];
        for (let i = 0; i < sizes.length; i++) {
          const predicted = m * sizes[i] + c;
          residualVectors.push({
            x: sizes[i], y: predicted, color: 'rose', from: [sizes[i], prices[i]], strokeWidth: 2,
          });
        }
        return {
          fns: [
            { fn: (x) => m * x + c, color: 'brand', label: `y = ${m.toFixed(3)}x + ${c.toFixed(1)}` },
          ],
          points: sizes.map((s, i) => ({ x: s, y: prices[i], color: 'cyan', r: 6 })),
          vectors: residualVectors,
          domain: [400, 2100],
          range: [15, 105],
        };
      },
      formula: ({ m, c }) => {
        const sizes = [500, 800, 1000, 1500, 2000];
        const prices = [25, 40, 48, 72, 95];
        let sse = 0;
        for (let i = 0; i < sizes.length; i++) {
          const err = prices[i] - (m * sizes[i] + c);
          sse += err * err;
        }
        return `\\text{Total error (SSE)} = ${sse.toFixed(1)}`;
      },
      caption:
        'Move the sliders to reduce the error. Can you find the line that makes it almost zero? That line is the "best fit".',
    },
    {
      type: 'tip',
      content:
        'You just did machine learning by hand. You adjusted two parameters to minimise an error. Real ML does the same thing — but with millions of parameters, and it does the adjustment automatically using calculus (gradient descent, from the Calculus module).',
    },

    // ── TRAINING LOOP ────────────────
    {
      type: 'text',
      content:
        'The pattern you just did manually — try, measure error, adjust — is literally the training loop. Every ML algorithm does some version of this.',
    },
    {
      type: 'text',
      content:
        'The four-step training loop:\n\n• **Step 1:** Make a prediction using current parameters.\n• **Step 2:** Compare the prediction to the true label — measure the error (loss).\n• **Step 3:** Compute the gradient — which way should we move the parameters to reduce error?\n• **Step 4:** Take a small step in that direction. Repeat.',
    },
    {
      type: 'code',
      content: 'Training a linear model from scratch — the whole loop:',
      code: `import numpy as np\n\nsizes  = np.array([500, 800, 1000, 1500, 2000], dtype=float)\nprices = np.array([25, 40, 48, 72, 95], dtype=float)\n\n# Start with random parameters\nm = 0.0\nc = 0.0\nlearning_rate = 1e-7\n\nfor step in range(200):\n    # Step 1: predict\n    predictions = m * sizes + c\n    \n    # Step 2: error\n    errors = predictions - prices\n    \n    # Step 3: gradients\n    m_grad = 2 * np.mean(errors * sizes)\n    c_grad = 2 * np.mean(errors)\n    \n    # Step 4: update\n    m -= learning_rate * m_grad\n    c -= learning_rate * c_grad\n\nprint(f"m = {m:.4f}")\nprint(f"c = {c:.2f}")`,
      output: `m = 0.0467\nc = 1.88`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'This is linear regression from scratch. Note what it uses: NumPy for the math, and gradient descent (from the Calculus module) to find the best parameters. **Everything you learned in the previous modules comes together here.**',
    },
    {
      type: 'graph',
      title: 'The trained model',
      fns: [
        { fn: (x) => 0.0467 * x + 1.88, color: 'emerald', label: 'learned line' },
      ],
      points: [
        { x: 500, y: 25, color: 'brand', r: 6 },
        { x: 800, y: 40, color: 'brand', r: 6 },
        { x: 1000, y: 48, color: 'brand', r: 6 },
        { x: 1500, y: 72, color: 'brand', r: 6 },
        { x: 2000, y: 95, color: 'brand', r: 6 },
      ],
      domain: [400, 2100],
      range: [15, 105],
      caption:
        'After training, the model has found a line that fits the data well. Now we can predict the price of any house — even ones we have never seen.',
    },

    // ── TRAIN / TEST SPLIT ───────────
    {
      type: 'text',
      content:
        'How do we know if our model is actually good? A model that perfectly memorises the training data is useless if it fails on new data. So we **always** hold out some data for testing.',
    },
    {
      type: 'text',
      content:
        'The standard approach: split your data into two parts.\n\n• **Training set (~80%)** — the model learns from these.\n• **Test set (~20%)** — we only use these to check how well the model handles new data.',
    },
    {
      type: 'math',
      latex:
        '\\text{data} = \\underbrace{\\text{train}}_{\\text{80\\%}} \\; + \\; \\underbrace{\\text{test}}_{\\text{20\\%}}',
      caption:
        'The split. The model never sees the test set during training — that is the point.',
    },
    {
      type: 'note',
      content:
        'Why does this matter? Because a model that memorises answers to training examples can score 100% on training data while failing on every real example. The test set tells you whether the model **generalised** — learned the pattern — or just **memorised** the answers.',
    },

    // ── OVERFITTING INTUITION ────────
    {
      type: 'text',
      content:
        'The single most important concept in all of ML: **overfitting**. It happens when a model learns the noise in the training data instead of the underlying pattern.',
    },
    {
      type: 'graph',
      title: 'The overfitting spectrum',
      fns: [
        { fn: (x) => 0.5 * x, color: 'slate', label: 'underfit (too simple)', strokeWidth: 2 },
        { fn: (x) => 0.5 * x + 0.1 * Math.sin(3 * x), color: 'emerald', label: 'good fit', strokeWidth: 2.5 },
        { fn: (x) => 0.5 * x + 0.3 * Math.sin(6 * x) + 0.15 * Math.cos(9 * x), color: 'rose', label: 'overfit (memorises noise)', strokeWidth: 2, dashed: true },
      ],
      points: [
        { x: 0, y: 0.1, color: 'brand', r: 5 },
        { x: 1, y: 0.6, color: 'brand', r: 5 },
        { x: 2, y: 0.9, color: 'brand', r: 5 },
        { x: 3, y: 1.6, color: 'brand', r: 5 },
        { x: 4, y: 1.9, color: 'brand', r: 5 },
        { x: 5, y: 2.6, color: 'brand', r: 5 },
      ],
      domain: [-0.3, 5.3],
      range: [-0.3, 3.2],
      caption:
        'Three models on the same data. Underfit ignores the pattern. Overfit chases every dot, including the noise. Good fit finds the middle ground — it captures the trend without obsessing over every point.',
    },
    {
      type: 'warning',
      content:
        'A very common beginner mistake: making the model as complex as possible so it fits the training data perfectly. This almost always overfits. **Simpler models that generalise well beat complex models that memorise.** Remember this.',
    },
    {
      type: 'tip',
      content:
        'Think of it like studying for an exam. Memorising past papers is overfitting — you will fail on the actual exam. Learning the underlying concepts is generalising — you will do well on questions you have never seen. Same idea.',
    },

    // ── THE WORKFLOW ─────────────────
    {
      type: 'text',
      content:
        'Every supervised ML project follows the same workflow. Once you recognise it, every tutorial and paper will feel familiar.',
    },
    {
      type: 'text',
      content:
        '• **1. Collect data.** Features and labels for many examples.\n• **2. Split.** Training set and test set.\n• **3. Choose a model.** Linear regression? Decision tree? Neural network?\n• **4. Train.** Run the training loop — adjust parameters to minimise loss.\n• **5. Evaluate.** Measure performance on the test set.\n• **6. Iterate.** If not good enough, try a different model or better features.\n• **7. Deploy.** Use the trained model to make real predictions.',
    },
    {
      type: 'note',
      content:
        'Steps 1 and 6 are where most of the real work happens. Data collection, cleaning, feature engineering — this is 80% of a real ML project. Model choice and training are the easy part, once your data is in shape.',
    },

    // ── RECAP ────────────────────────
    {
      type: 'text',
      content:
        'Here is everything you learned, in one breath:',
    },
    {
      type: 'text',
      content:
        '• **Machine learning** = learning rules from examples instead of writing rules by hand.\n• **Supervised learning** = examples with labels. The most common kind.\n• **Features** = the input. **Labels** = the output we want to predict.\n• **Training** = adjusting model parameters to minimise an error.\n• **Test split** = evaluating on data the model never saw.\n• **Overfitting** = memorising the training data instead of learning the pattern.',
    },
    {
      type: 'tip',
      content:
        'You now understand the single idea behind every AI system on Earth. Next lesson: we build linear regression properly — from scratch, with real code, and see the model converge step by step.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'What is the fundamental difference between traditional programming and machine learning?',
      options: [
        'ML programs are written in a different language.',
        'Traditional: humans write the rules. ML: the computer learns the rules from examples.',
        'ML programs are always faster.',
        'Traditional programming cannot handle numbers.',
      ],
      correct: 1,
      explanation:
        'Traditional programming: you write the logic. Machine learning: you provide examples (inputs and correct outputs), and the computer discovers the logic itself. This is the entire idea behind ML.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'You have a dataset of 10,000 emails, each labelled either "spam" or "not spam". What kind of learning is this?',
      options: [
        'Unsupervised — no labels are needed.',
        'Reinforcement — the model learns from rewards.',
        'Supervised — every example has a label.',
        'None of the above.',
      ],
      correct: 2,
      explanation:
        'Each email has a label ("spam" or "not spam"). That is exactly what supervised learning means — labelled examples guiding the model towards the correct mapping.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'In supervised learning, what is the "label" of an example?',
      options: [
        'The name of the file the data came from.',
        'The features of the example.',
        'The correct output we want the model to predict.',
        'The number of columns in the dataset.',
      ],
      correct: 2,
      explanation:
        'The label is the correct answer for that example. In a house price model, the label is the price. In a spam filter, the label is "spam" or "not spam".',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Why do we split data into training and test sets?',
      options: [
        'Because training on all the data would be too slow.',
        'To check whether the model generalises to examples it has never seen.',
        'Because the test set has different features.',
        'To make the dataset smaller.',
      ],
      correct: 1,
      explanation:
        'The test set tells you whether your model has actually learned the pattern or just memorised the training data. This is the only honest way to measure real-world performance.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'A model gets 99% accuracy on the training set but only 60% on the test set. What is happening?',
      options: [
        'The model is underfitting.',
        'The model is overfitting — it memorised the training data but did not learn the pattern.',
        'The test set is wrong.',
        'The model needs more layers.',
      ],
      correct: 1,
      explanation:
        'A big gap between training and test performance is the classic signature of overfitting. The model learned the training data too specifically, and cannot generalise to new examples.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'In the training loop we practised, what does gradient descent actually do?',
      options: [
        'Generates random parameters until something works.',
        'Adjusts the parameters step by step in the direction that reduces the error.',
        'Increases the size of the dataset.',
        'Removes the outliers from the data.',
      ],
      correct: 1,
      explanation:
        'Gradient descent measures the slope of the error with respect to each parameter, and takes a small step in the direction that reduces the error. Repeat many times and the parameters converge to a good solution.',
      xp: 25,
    },
  ],
};