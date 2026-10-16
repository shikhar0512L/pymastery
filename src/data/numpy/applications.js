// 📘 NumPy — Real-World Applications

export const applicationsLesson = {
  id: 'applications',
  title: 'Real-World Applications',
  difficulty: 'intermediate',
  duration: 18,
  intro:
    'Where NumPy actually shows up on the job. Eleven industries, one shared toolkit: arrays, indexing, aggregation, broadcasting.',
  sections: [
    {
      type: 'text',
      content:
        'Everything you have learned so far — creating arrays, indexing, aggregations, broadcasting, ufuncs — shows up in every one of the fields below. The data means something different each time, but the operations are identical.',
    },
    {
      type: 'text',
      content:
        'Machine Learning: training data, features, weights — all NumPy arrays underneath. Even when you use scikit-learn, X and y are arrays.',
    },
    {
      type: 'code',
      content: 'The shape of every ML problem:',
      code: `import numpy as np\n\n# X — feature matrix: (samples, features)\nX = np.random.randn(100, 5)     # 100 samples, 5 features each\n\n# y — labels: (samples,)\ny = np.random.randint(0, 2, 100)  # binary labels\n\nprint(X.shape)\nprint(y.shape)\nprint(X.mean(axis=0).round(2))    # mean per feature`,
      output: `(100, 5)\n(100,)\n[-0.07  0.06 -0.08  0.02  0.07]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Deep Learning: every neural network layer is matrix multiplication. A forward pass is `output = relu(input @ W + b)` — three NumPy operations you already know.',
    },
    {
      type: 'code',
      content: 'One dense layer in NumPy:',
      code: `import numpy as np\n\nbatch = np.random.randn(32, 128)     # 32 samples, 128 features\nW = np.random.randn(128, 64) * 0.1   # weights: 128 -> 64\nb = np.zeros(64)                     # bias\n\n# Forward pass — matmul, broadcasting, ufunc\nout = np.maximum(batch @ W + b, 0)   # ReLU\nprint(out.shape)`,
      output: `(32, 64)`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Computer Vision: an image IS an array. A color photo is a (height, width, 3) uint8 tensor. Every filter, blur, edge-detection is an operation on that array.',
    },
    {
      type: 'code',
      content: 'Grayscale an RGB image with ufuncs:',
      code: `import numpy as np\n\n# (H, W, 3) color image\nimg = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)\n\n# Standard luminance weights for RGB -> gray\ngray = 0.299 * img[:, :, 0] + 0.587 * img[:, :, 1] + 0.114 * img[:, :, 2]\nprint(gray.shape)\nprint(gray.dtype)`,
      output: `(100, 100)\nfloat64`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Natural Language Processing: text is converted into arrays of numbers ("embeddings") before any model can touch it. Each word becomes a vector of, say, 300 floats.',
    },
    {
      type: 'code',
      content: 'A sentence as an array of embeddings:',
      code: `import numpy as np\n\n# 5 words, each represented by a 300-dim vector\nsentence = np.random.randn(5, 300)\n\n# Cosine similarity between word 0 and word 1\ndef cosine(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\nprint(round(cosine(sentence[0], sentence[1]), 3))`,
      output: `0.053`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Finance: years of price data as arrays. Aggregations, rolling windows, returns, volatility — all NumPy.',
    },
    {
      type: 'code',
      content: 'Daily returns and volatility:',
      code: `import numpy as np\n\nprices = np.array([100, 102, 99, 105, 108, 107, 110])\nreturns = np.diff(prices) / prices[:-1]\nvolatility = returns.std()\n\nprint(returns.round(4))\nprint(f"volatility: {volatility:.4f}")`,
      output: `[ 0.02   -0.0294  0.0606  0.0286 -0.0093  0.028]\nvolatility: 0.0332`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Medical AI: MRI and CT scans are 3D tensors — a stack of 2D slices. Detecting tumors is finding anomalous regions in a large array.',
    },
    {
      type: 'text',
      content:
        'Robotics: sensor readings arrive as arrays continuously. Decisions come from doing math on those arrays in real time — low-latency operations on small batches.',
    },
    {
      type: 'text',
      content:
        'Scientific Computing: physics simulations update huge arrays generation after generation. Weather, climate, fluid dynamics — all array operations.',
    },
    {
      type: 'text',
      content:
        'Weather Prediction: forecasting models crunch grids of temperature, pressure, and humidity across the globe — often 3D or 4D arrays.',
    },
    {
      type: 'text',
      content:
        'Space Research: telescope images and satellite data are enormous multi-dimensional arrays. Astronomers have been using NumPy for two decades.',
    },
    {
      type: 'text',
      content:
        'Game Development: physics engines, collision detection, and rendering all lean on fast array math. Some engines even embed a NumPy-like layer for scripting.',
    },
    {
      type: 'note',
      content:
        'Notice the pattern: none of these fields needed a new skill from you. Shape, indexing, aggregation, and broadcasting — the same four ideas, applied to data that means something different each time.',
    },
    {
      type: 'tip',
      content:
        'That is the applications tour. NumPy is not an academic tool — it is the foundation of production ML, computer vision, scientific computing, and data pipelines everywhere. The next time you use PyTorch or scikit-learn, remember: under the hood, it is arrays all the way down.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question:
        'A "forward pass" through one dense neural network layer looks like `relu(X @ W + b)`. Which NumPy concepts are involved?',
      options: [
        'Only matmul',
        'Matmul, broadcasting, and a ufunc',
        'Only indexing',
        'Only aggregation',
      ],
      correct: 1,
      explanation:
        '`X @ W` is matmul. `+ b` is broadcasting (b has shape (out_features,), broadcasts over the batch). `relu` is `np.maximum(..., 0)` — a ufunc. Every deep learning layer is these three operations.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'A single color image is typically shaped as:',
      options: [
        '(3, height, width)',
        '(height, width, 3)',
        '(height, 3, width)',
        '(3, 3, height * width)',
      ],
      correct: 1,
      explanation:
        'The standard image format is (height, width, channels). Channels = 3 for RGB, 4 for RGBA, 1 for grayscale. This is the convention followed by PIL, OpenCV (in some modes), and PyTorch\'s torchvision after transposition.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-fill',
      question:
        'Fill the blank so we compute the daily returns from a price array:',
      code: 'import numpy as np\nprices = np.array([100, 102, 99, 105])\nreturns = np.___(prices) / prices[:-1]',
      options: ['diff', 'gradient', 'shift', 'delta'],
      correct: 0,
      explanation:
        '`np.diff(arr)` computes the difference between consecutive elements. Dividing by `prices[:-1]` gives percentage returns. This is a fundamental finance computation.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write `rgb_to_gray(img)` that converts a (H, W, 3) RGB image array to a (H, W) grayscale array using the standard luminance formula: 0.299*R + 0.587*G + 0.114*B.',
      starterCode:
        'import numpy as np\n\ndef rgb_to_gray(img):\n    # your code here\n    pass',
      tests: [
        {
          input: 'rgb_to_gray(np.zeros((10, 10, 3))).shape',
          expected: '(10, 10)',
        },
        {
          input: 'rgb_to_gray(np.ones((5, 5, 3)) * 255)[0, 0]',
          expected: '255.0',
        },
{
  input:
    'round(float(rgb_to_gray(np.array([[[255, 0, 0]]]))[0, 0]), 3)',
  expected: '76.245',
},
      ],
      hint: 'Slice the three channels: img[:, :, 0], img[:, :, 1], img[:, :, 2]. Combine with the weights. Broadcasting handles the rest.',
      solution:
        'import numpy as np\n\ndef rgb_to_gray(img):\n    r = img[:, :, 0]\n    g = img[:, :, 1]\n    b = img[:, :, 2]\n    return 0.299 * r + 0.587 * g + 0.114 * b',
      explanation:
        'Slicing the channel axis gives three (H, W) arrays. Multiplying by weights and summing combines them into a single (H, W) grayscale image. This is exactly how real libraries convert RGB to gray.',
      xp: 35,
    },
  ],
};