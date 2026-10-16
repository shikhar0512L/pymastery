// 📐 Linear Algebra — Lesson 10: Capstone — Linear Algebra in ML

export const laCapstoneLesson = {
  id: 'la-capstone',
  title: 'Capstone — Linear Algebra in Real ML',
  difficulty: 'intermediate',
  duration: 28,
  intro:
    'You have learned the pieces. Now see them assembled — five case studies showing exactly how every ML system you have ever used is built from vectors, matrices, and the operations you now understand.',

  sections: [
    {
      type: 'text',
      content:
        'This lesson has no new theory. Everything you need you already know. What we do now is show you the **whole picture**: every AI technique you have heard of, translated into the linear algebra you just learned.',
    },
    {
      type: 'note',
      content:
        'Read this lesson slowly. Revisit it whenever you meet a new ML technique. The pattern will keep showing up: data becomes vectors, weights become matrices, learning is solving a linear system (or its nonlinear cousin).',
    },

    // ── CASE 1: LINEAR REGRESSION ────
    {
      type: 'text',
      content:
        '**Case Study 1: Linear regression.** The simplest real ML model.',
    },
    {
      type: 'text',
      content:
        'You have data: features X (a matrix — one row per example, one column per feature) and targets y (a vector). You want to find weights w such that $Xw \\approx y$.',
    },
    {
      type: 'math',
      latex:
        '\\underbrace{X}_{n \\times d} \\underbrace{w}_{d \\times 1} \\approx \\underbrace{y}_{n \\times 1}',
      caption:
        'Linear regression as a linear system. Usually overdetermined (n > d), so we cannot solve exactly.',
    },
    {
      type: 'text',
      content:
        'Since n > d, the system has no exact solution. So we find the **least-squares** solution — the w that minimises $\\|Xw - y\\|^2$. Geometrically, this is projecting y onto the column space of X.',
    },
    {
      type: 'math',
      latex:
        'w = (X^T X)^{-1} X^T y',
      caption:
        'The normal equations — the closed-form solution to linear regression. Every linear regression you have ever run reduces to this one line.',
    },
    {
      type: 'tip',
      content:
        'In practice, NumPy does not compute $(X^T X)^{-1}$ explicitly. It uses `np.linalg.lstsq(X, y)` — which solves the same problem without ever forming the inverse. This is the "numerically stable" approach you met in Lesson 6.',
    },

    // ── CASE 2: NEURAL NETWORKS ──────
    {
      type: 'text',
      content:
        '**Case Study 2: Neural network forward pass.** Every layer, one matrix multiplication.',
    },
    {
      type: 'text',
      content:
        'Take a batch of examples — a matrix X of shape (batch, features). Multiply by a weight matrix W of shape (features, hidden). Add a bias vector b. Apply a nonlinear activation.',
    },
    {
      type: 'math',
      latex:
        'H = \\sigma(X W + b)',
      caption:
        'One hidden layer. Every operation is one you have seen: matrix multiply, broadcast add, elementwise function.',
    },
    {
      type: 'text',
      content:
        'Stacking layers is just doing this repeatedly:',
    },
    {
      type: 'math',
      latex:
        '\\hat{y} = \\sigma_3(\\sigma_2(\\sigma_1(X W_1 + b_1) W_2 + b_2) W_3 + b_3)',
      caption:
        'Three layers, four matrix multiplications. That is a deep network.',
    },
    {
      type: 'note',
      content:
        'When you hear "GPT-4 has 1.7 trillion parameters", that means the matrices $W_1, W_2, \\ldots, W_n$ collectively contain 1.7 trillion numbers. Every time you chat, the model multiplies your input by these matrices. That is literally all it does.',
    },

    // ── CASE 3: EMBEDDINGS ────────────
    {
      type: 'text',
      content:
        '**Case Study 3: Word embeddings.** Turning words into vectors.',
    },
    {
      type: 'text',
      content:
        'Every word in a language gets a vector — usually 100 to 1000 dimensions. The vectors are learned so that similar words have similar vectors.',
    },
    {
      type: 'text',
      content:
        'Remember the "king − man + woman = queen" example from Lesson 2? That works because similar relationships get encoded as similar **vector differences**.',
    },
    {
      type: 'math',
      latex:
        '\\vec{\\text{king}} - \\vec{\\text{man}} \\approx \\vec{\\text{queen}} - \\vec{\\text{woman}}',
      caption:
        'Vector arithmetic on word embeddings. Real, measured, and used in every NLP model.',
    },
    {
      type: 'text',
      content:
        'When you search for something, or ask ChatGPT a question, the model is comparing your query embedding with document embeddings — using dot product or cosine similarity. The math is exactly what you learned in Lesson 8.',
    },

    // ── CASE 4: PCA ───────────────────
    {
      type: 'text',
      content:
        '**Case Study 4: PCA — dimensionality reduction.**',
    },
    {
      type: 'text',
      content:
        'You have data with 100 features. Many of them are redundant. PCA finds the 10 directions that capture the most variance, and projects your data onto them.',
    },
    {
      type: 'text',
      content:
        'The "directions of most variance" are the **eigenvectors of the covariance matrix** — exactly what you saw in Lesson 9.',
    },
    {
      type: 'math',
      latex:
        'C = \\frac{1}{n} X^T X, \\quad C v_i = \\lambda_i v_i',
      caption:
        'C is the covariance matrix of the data. Its eigenvectors $v_i$ are the principal directions; eigenvalues $\\lambda_i$ measure how much variance each direction captures.',
    },
    {
      type: 'text',
      content:
        'Sort eigenvalues from largest to smallest, keep the top k eigenvectors, project the data onto them. You go from 100 features to k, usually losing very little information.',
    },
    {
      type: 'tip',
      content:
        'PCA is a compression algorithm. It compresses your data by finding the axes along which it "spreads out" most, and dropping the rest. It is used to visualise high-dimensional data, speed up training, and remove redundancy before modelling.',
    },

    // ── CASE 5: ATTENTION ─────────────
    {
      type: 'text',
      content:
        '**Case Study 5: Transformer attention.** The mechanism inside GPT, Claude, Gemini.',
    },
    {
      type: 'text',
      content:
        'Every word is embedded as a vector. For each word, the model asks: which other words in the sentence are relevant to me? It does this by computing the **dot product** between every pair of word vectors.',
    },
    {
      type: 'math',
      latex:
        'A = \\text{softmax}\\!\\left(\\frac{Q K^T}{\\sqrt{d}}\\right) V',
      caption:
        'Attention. Q, K, V are matrices derived from the input embeddings. QK^T is a matrix of dot products between every pair of positions.',
    },
    {
      type: 'text',
      content:
        'The result A is a weighted average of value vectors V, where the weights come from dot-product similarities. This is the entire operation, repeated layer after layer, token after token.',
    },
    {
      type: 'note',
      content:
        'Notice: attention uses **nothing** that you have not already learned. Matrix multiplication (Lesson 5), dot products (Lesson 8), a softmax function (calculus, next module). That is the entire mechanism. Everything else in a transformer is a variation.',
    },

    // ── THE UNIFYING PICTURE ──────────
    {
      type: 'text',
      content:
        'Step back and look at the whole landscape. Here is what you now know:',
    },
    {
      type: 'text',
      content:
        '• **Data** is a matrix — rows are examples, columns are features.\n• **Models** are matrices — weights that transform inputs into outputs.\n• **Predictions** are matrix multiplications — X times W plus bias.\n• **Similarity** is a dot product — how aligned two vectors are.\n• **Compression** is eigen-decomposition — keep the important directions, drop the rest.\n• **Learning** is optimisation — find the weights that make the predictions closest to reality.',
    },
    {
      type: 'text',
      content:
        'That is linear algebra. Not abstract. Not useless. The actual, running, day-to-day substrate of every AI system on Earth.',
    },
    {
      type: 'tip',
      content:
        'You have finished the Linear Algebra module. You now know enough to read a machine learning paper and follow the main ideas. Next up: Calculus — where we finally answer the question "how does the model actually **learn**?"',
    },

    // ── FINAL EXERCISES ───────────────
    {
      type: 'text',
      content:
        'Below is a small set of capstone challenges that combine lessons. Work through them slowly. If you can solve them, you have genuinely mastered the material.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'In linear regression, why do we use least squares instead of solving $Xw = y$ exactly?',
      options: [
        'Because computers cannot solve exact systems.',
        'Because the system is usually over-determined (more equations than unknowns), so no exact solution exists.',
        'Because least squares is faster.',
        'Because exact solutions are always wrong.',
      ],
      correct: 1,
      explanation:
        'In real data, you have far more examples than features (n ≫ d). The system $Xw = y$ cannot be satisfied exactly. Least squares finds the w that comes closest — the one minimising the sum of squared errors.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'Why does "king − man + woman ≈ queen" work in word embeddings?',
      options: [
        'Because the model was trained on that specific example.',
        'Because similar semantic relationships correspond to similar vector differences.',
        'Because embedding vectors are randomly assigned.',
        'Because king and queen have the same length.',
      ],
      correct: 1,
      explanation:
        'Word embeddings are learned so that semantic relationships are encoded as consistent vector differences. The "gender" direction is roughly the same vector for every pair of gendered words. This is why vector arithmetic on embeddings works.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'You have 100 features in your dataset. You apply PCA and keep the top 5 components. What kind of operation is this?',
      options: [
        'Data augmentation.',
        'Dimensionality reduction — compression along the principal directions.',
        'Classification.',
        'Standardisation.',
      ],
      correct: 1,
      explanation:
        'PCA is dimensionality reduction. By keeping only the top-k eigenvectors (the directions of highest variance), you compress the data while retaining as much information as possible. This is a preprocessing step in many ML pipelines.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'A transformer layer computes $\\text{softmax}(QK^T / \\sqrt{d}) V$. Which linear algebra operation does the $QK^T$ term perform?',
      options: [
        'Matrix addition.',
        'Matrix transpose only.',
        'A grid of dot products between every pair of query and key vectors.',
        'Eigenvalue decomposition.',
      ],
      correct: 2,
      explanation:
        'QK^T is a matrix where each entry is the dot product of one query vector and one key vector. This is the "similarity score" for every pair of positions in the sequence. Softmax then turns these into attention weights.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'A machine learning model has 1000 training examples and 5 features. Written as $Xw = y$, what are the shapes?',
      options: [
        'X is $5 \\times 1000$, w is $5 \\times 1$, y is $5 \\times 1$.',
        'X is $1000 \\times 5$, w is $5 \\times 1$, y is $1000 \\times 1$.',
        'X is $1000 \\times 1000$, w is $1000 \\times 1$, y is $5 \\times 1$.',
        'X is $1000 \\times 5$, w is $1000 \\times 1$, y is $5 \\times 1$.',
      ],
      correct: 1,
      explanation:
        'By convention, X has one row per example and one column per feature. So X is 1000 × 5. The weight vector has one entry per feature (5 × 1). The output vector has one entry per example (1000 × 1). The product $Xw$ has shape 1000 × 1 — matching y.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Looking at all five case studies, what is the single most-used linear algebra operation in modern AI?',
      options: [
        'Matrix inversion.',
        'Eigenvalue decomposition.',
        'Matrix multiplication (and its special case, the dot product).',
        'Determinant computation.',
      ],
      correct: 2,
      explanation:
        'Matrix multiplication — and specifically the dot product — appears in every case: regression, neural networks, embeddings, PCA, attention. It is the atomic unit of AI computation. GPUs are literally designed to do billions of them per second.',
      xp: 30,
    },
  ],
};