// 📘 NumPy — Tensors (N-dimensional arrays)

export const tensorsLesson = {
  id: 'tensors',
  title: 'Tensors — From Scalars to 5D Arrays',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'A tensor is just NumPy\'s word for an array with 3 or more dimensions. But seeing them laid out 0D → 5D makes deep-learning shapes finally click.',
  sections: [
    {
      type: 'text',
      content:
        'The word "tensor" sounds intimidating the first time you see it in a PyTorch tutorial. It is not. A tensor is an N-dimensional array — exactly what you have been using. The only new thing is the vocabulary for describing how many dimensions it has.',
    },
    {
      type: 'text',
      content:
        'The progression: scalar → vector → matrix → tensor. Each step adds one dimension.',
    },
    {
      type: 'code',
      content: '0D — scalar: a single number',
      code: `import numpy as np\n\ns = np.array(7)\nprint(s)\nprint(s.ndim)\nprint(s.shape)`,
      output: `7\n0\n()`,
      language: 'python',
    },
    {
      type: 'code',
      content: '1D — vector: a list of numbers',
      code: `v = np.array([5, 3, 8, 1])\nprint(v)\nprint(v.ndim)\nprint(v.shape)`,
      output: `[5 3 8 1]\n1\n(4,)`,
      language: 'python',
    },
    {
      type: 'code',
      content: '2D — matrix: a grid of numbers',
      code: `m = np.array([[1, 2, 3],\n              [4, 5, 6]])\nprint(m)\nprint(m.ndim)\nprint(m.shape)`,
      output: `[[1 2 3]\n [4 5 6]]\n2\n(2, 3)`,
      language: 'python',
    },
    {
      type: 'code',
      content: '3D — tensor: a stack of matrices',
      code: `t = np.arange(24).reshape(2, 3, 4)\nprint(t.shape)\nprint(t.ndim)\nprint(t[0].shape)      # first "layer"\nprint(t[0, 0].shape)   # first row of first layer`,
      output: `(2, 3, 4)\n3\n(3, 4)\n(4,)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Beyond 2D, "matrix" is no longer the right word. Everything 3D+ is a tensor. But indexing, slicing, broadcasting, aggregations all work exactly as before — one more axis, one more index.',
    },
    {
      type: 'text',
      content:
        'The most important real-world tensor is a color image. It is a 3D array: (height, width, channels). Channels are usually 3 — Red, Green, Blue.',
    },
    {
      type: 'code',
      content: 'One color image as a 3D array:',
      code: `import numpy as np\n\n# 224 rows, 224 columns, 3 channels (RGB)\nimage = np.zeros((224, 224, 3), dtype=np.uint8)\n\nprint(image.shape)\nprint(image.ndim)\n\n# Set pixel (100, 50) to red\nimage[100, 50] = [255, 0, 0]\nprint(image[100, 50])`,
      output: `(224, 224, 3)\n3\n[255   0   0]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Machine learning rarely processes one image at a time. It processes a BATCH. Add one more axis at the front, and now the array is 4D: (batch, height, width, channels).',
    },
    {
      type: 'code',
      content: 'A batch of images — 4D tensor:',
      code: `import numpy as np\n\nbatch_size = 32\nbatch = np.zeros((batch_size, 224, 224, 3), dtype=np.uint8)\n\nprint(batch.shape)\nprint(batch.ndim)\nprint(batch[0].shape)      # first image\nprint(batch[0, 100, 50])   # pixel of first image`,
      output: `(32, 224, 224, 3)\n4\n(224, 224, 3)\n[0 0 0]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Reading shapes: (32, 224, 224, 3) means "32 images, each 224×224, each with 3 color channels." Get into this habit and every deep-learning tutorial becomes readable.',
    },
    {
      type: 'text',
      content:
        'Video adds one more axis — time. A video clip is 5D: (frames, batch, height, width, channels).',
    },
    {
      type: 'code',
      content: 'A video clip — 5D tensor:',
      code: `import numpy as np\n\n# 16 frames, 4 videos, each frame 224x224x3\nvideo = np.zeros((16, 4, 224, 224, 3), dtype=np.uint8)\n\nprint(video.shape)\nprint(video.ndim)\nprint(video[0].shape)      # first frame of the batch`,
      output: `(16, 4, 224, 224, 3)\n5\n(4, 224, 224, 3)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'PyTorch and TensorFlow "tensors" are the exact same idea — an N-D array — plus two extras: GPU acceleration and automatic differentiation (autograd). The shapes, indexing, and broadcasting rules you learned in NumPy apply directly.',
    },
    {
      type: 'code',
      content: 'NumPy vs PyTorch — the concept is identical:',
      code: `import numpy as np\n\n# This NumPy code...\narr = np.random.randn(3, 4)\nresult_np = arr @ arr.T\n\n# ...translates almost one-to-one to PyTorch:\n# import torch\n# t = torch.randn(3, 4)\n# result_torch = t @ t.T   # same shape, same math`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'The mental model: think of dimensions as nested lists. A 3D tensor is a list of 2D matrices. A 4D tensor is a list of 3D tensors. Once you can picture that nesting, any shape becomes intuitive.',
    },
    {
      type: 'code',
      content: 'Indexing a 4D tensor — each step reveals one layer:',
      code: `import numpy as np\n\nt = np.arange(2 * 3 * 4 * 5).reshape(2, 3, 4, 5)\n\nprint(t.shape)         # 4D\nt0 = t[0]              # 3D\nprint(t0.shape)\nt00 = t[0, 0]          # 2D\nprint(t00.shape)\nt000 = t[0, 0, 0]      # 1D\nprint(t000.shape)\nt0000 = t[0, 0, 0, 0]  # scalar\nprint(t0000)`,
      output: `(2, 3, 4, 5)\n(3, 4, 5)\n(4, 5)\n(5,)\n0`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is tensors. Scalars, vectors, matrices, and N-D arrays — all the same thing, just different dimension counts. Nothing magical, just vocabulary.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is a tensor in the context of NumPy?',
      options: [
        'A completely different data structure from a NumPy array',
        'An array with 3 or more dimensions',
        'A special type of matrix that can only hold numbers between -1 and 1',
        'A data structure only PyTorch supports',
      ],
      correct: 1,
      explanation:
        'In NumPy, "tensor" is just the vocabulary word for an array with 3+ dimensions. The underlying type is still ndarray, with the same indexing, slicing, and broadcasting rules.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'import numpy as np\nt = np.zeros((2, 3, 4))\nprint(t.ndim)\nprint(t.shape)',
      options: [
        '3 then (2, 3, 4)',
        '2 then (3, 4)',
        '24 then (2, 3, 4)',
        'Error',
      ],
      correct: 0,
      explanation:
        'ndim is the number of dimensions — 3 for a (2, 3, 4) array. shape is always the tuple of axis lengths.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'A batch of 16 color images, each 224×224 RGB — what is the shape of the batch array?',
      options: [
        '(16, 224)',
        '(16, 224, 224)',
        '(16, 224, 224, 3)',
        '(224, 224, 3)',
      ],
      correct: 2,
      explanation:
        'One image is (height, width, channels) = (224, 224, 3). A batch prepends the batch axis: (batch, height, width, channels) = (16, 224, 224, 3).',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so this returns 4 (the number of dimensions):',
      code: 'import numpy as np\nt = np.zeros((2, 3, 4, 5))\nprint(t.___)',
      options: ['ndim', 'dims', 'shape', 'axes'],
      correct: 0,
      explanation:
        '`.ndim` returns the number of dimensions. `.shape` returns the tuple of axis lengths, which would be (2, 3, 4, 5).',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `dimensionality(arr)` that returns the number of dimensions of any NumPy array.',
      starterCode:
        'import numpy as np\n\ndef dimensionality(arr):\n    # your code here\n    pass',
      tests: [
        { input: 'dimensionality(np.array(5))', expected: '0' },
        { input: 'dimensionality(np.array([1, 2, 3]))', expected: '1' },
        { input: 'dimensionality(np.zeros((3, 4)))', expected: '2' },
        { input: 'dimensionality(np.zeros((2, 3, 4)))', expected: '3' },
        { input: 'dimensionality(np.zeros((2, 3, 4, 5)))', expected: '4' },
      ],
      hint: 'Just return `arr.ndim`.',
      solution:
        'import numpy as np\n\ndef dimensionality(arr):\n    return arr.ndim',
      explanation:
        '`ndim` is one of the most-used attributes in NumPy. It tells you whether you are dealing with a scalar, vector, matrix, or higher-order tensor.',
      xp: 25,
    },
  ],
};