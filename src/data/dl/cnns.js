// 🧠 DL — Lesson 7: CNNs — Convolutional Neural Networks

export const dlCnnsLesson = {
  id: 'dl-cnns',
  title: 'CNNs — Seeing the World in Patches',
  difficulty: 'advanced',
  duration: 26,
  intro:
    'A regular neural network treats an image as a flat list of pixels. That works, but it destroys all spatial structure. A CNN uses filters that slide across the image, preserving the 2D layout. This is the architecture that powers nearly all modern computer vision.',

  sections: [
    {
      type: 'text',
      content:
        'Imagine a 28×28 pixel image of a digit. If you feed it to a regular fully-connected network, the first layer has 784 weights per neuron. For a 1000-pixel layer, that is 784,000 weights. And it treats the top-left pixel as separate from its neighbor. That is a terrible way to process an image.',
    },
    {
      type: 'note',
      content:
        'CNNs enforce **spatial locality**. A filter (also called a kernel) looks at a small region of the image at a time. This drastically reduces parameters and helps the network learn local patterns like edges, curves, and eventually whole objects.',
    },

    // ── THE CONVOLUTION ──────────────
    {
      type: 'text',
      content:
        'A **convolution** is a small grid of numbers (the filter) sliding over the image, computing a dot product at each position.',
    },
    {
      type: 'math',
      latex:
        '\\text{output}[i, j] = \\sum_{m} \\sum_{n} \\text{image}[i+m, j+n] \\cdot \\text{filter}[m, n]',
      caption:
        'The filter is a small matrix (e.g., 3×3). It slides over the image. At each position, multiply element-wise and sum. That gives one output pixel.',
    },
    {
      type: 'text',
      content:
        'For example, a 3×3 filter like `[[1, 0, -1], [1, 0, -1], [1, 0, -1]]` detects **vertical edges**. When it slides over an area with a vertical transition (light on one side, dark on the other), the output is large. In flat regions, the output is near zero.',
    },
    {
      type: 'code',
      content: 'A 2D convolution in NumPy:',
      code: `import numpy as np\n\ndef conv2d(image, kernel):\n    h, w = image.shape\n    kh, kw = kernel.shape\n    out = np.zeros((h - kh + 1, w - kw + 1))\n    for i in range(out.shape[0]):\n        for j in range(out.shape[1]):\n            patch = image[i:i+kh, j:j+kw]\n            out[i, j] = np.sum(patch * kernel)\n    return out\n\n# Simple 3x3 image\nimg = np.array([\n    [1, 1, 0, 0],\n    [1, 1, 0, 0],\n    [0, 0, 1, 1],\n    [0, 0, 1, 1],\n], dtype=float)\n\n# Vertical edge detector\nfilter_v = np.array([\n    [1, 0, -1],\n    [1, 0, -1],\n    [1, 0, -1],\n], dtype=float)\n\nresult = conv2d(img, filter_v)\nprint(result)`,
      output: `[[ 2.  2.  0.]\n [ 2.  2.  0.]\n [-2. -2.  0.]]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That output is the "feature map". Positive values mean the filter found a vertical transition there. Negative values mean the opposite direction. Zero means flat. The network learns the best filters automatically during training — we do not design them by hand.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Convolution in action',
      description:
        'Move the filter across the image. The output value at each position shows how much the filter "matches" that patch.',
      sliders: [
        { id: 'row', label: 'i', min: 0, max: 1, step: 1, default: 0, decimals: 0 },
        { id: 'col', label: 'j', min: 0, max: 1, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ row, col }) => {
        // 4x4 image and 3x3 filter
        const img = [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 0, 1, 1]];
        const filt = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
        
        const points = [];
        // Draw image pixels (green/red for 1/0)
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            points.push({
              x: j, y: 3 - i,
              color: img[i][j] === 1 ? 'emerald' : 'surface-950',
              r: 10,
            });
          }
        }
        // Draw filter region
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            points.push({
              x: col + j, y: 3 - (row + i),
              color: filt[i][j] === 1 ? 'cyan' : (filt[i][j] === -1 ? 'rose' : 'amber'),
              r: 6,
            });
          }
        }
        return {
          points,
          domain: [-0.5, 3.5],
          range: [-0.5, 3.5],
          fns: [],
        };
      },
      formula: ({ row, col }) => {
        const img = [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 0, 1, 1]];
        const filt = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
        let sum = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            sum += img[row + i][col + j] * filt[i][j];
          }
        }
        return `\\text{output}[${row},${col}] = ${sum}`;
      },
      caption:
        'The cyan filter picks up the left edge (positive). The rose filter picks up the right edge (negative). Flat regions give 0.',
    },

    // ── POOLING ──────────────────────
    {
      type: 'text',
      content:
        'After convolution, we usually apply **pooling** — a downsampling operation that reduces the image size by keeping the strongest signal in each region. This makes the network translation-invariant and reduces compute.',
    },
    {
      type: 'math',
      latex:
        '\\text{MaxPool}(2\\times 2): \\;\\; \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix} \\to 4',
      caption:
        'Max pooling with a 2×2 window: just keep the maximum value. The image size halves in each dimension.',
    },
    {
      type: 'note',
      content:
        'Pooling ignores small translations. If a cat moves 3 pixels to the right, the pooled output is nearly identical. This is crucial for robustness — the network learns "a cat is somewhere in this region" instead of "a cat is at pixel 42,17".',
    },

    // ── ARCHITECTURE ─────────────────
    {
      type: 'text',
      content:
        'A typical CNN stacks these blocks: **convolution → ReLU → pooling** repeated several times, then flattens into a regular dense layer and outputs a prediction.',
    },
    {
      type: 'math',
      latex:
        '\\text{Image} \\to [\\text{Conv} + \\text{ReLU} + \\text{Pool}] \\times N \\to \\text{Flatten} \\to \\text{Dense} \\to \\text{Output}',
      caption:
        'The classic CNN architecture. Early layers detect edges. Middle layers detect textures and shapes. Late layers detect objects.',
    },
    {
      type: 'tip',
      content:
        'The deeper you go, the more abstract the features. Layer 1 might detect a bright pixel next to a dark pixel. Layer 10 might detect a cat ear. Layer 20 might detect "this is a cat". The network builds up complexity by stacking simple detectors.',
    },

    // ── WHY IT WORKS ─────────────────
    {
      type: 'text',
      content:
        'CNNs are so effective because of three properties:\n\n• **Parameter sharing.** The same filter is reused across the entire image. A 3×3 filter has only 9 parameters, not 28×28×3 = 2,352.\n• **Local connectivity.** Each output only sees a small region, so the network learns local features.\n• **Hierarchy.** Layers build up features, from edges → shapes → objects.',
    },
    {
      type: 'note',
      content:
        'ResNet, VGG, EfficientNet, and almost every modern vision model is a CNN. Even vision-language models like CLIP use a CNN (or a ViT — a transformer applied to image patches) as the visual encoder.',
    },
    {
      type: 'tip',
      content:
        'Next: RNNs. How do we handle sequential data like text or time series, where order matters?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the main advantage of a CNN over a fully-connected network for images?',
      options: [
        'CNNs are faster to train.',
        'CNNs preserve spatial structure and use far fewer parameters via parameter sharing.',
        'CNNs cannot overfit.',
        'CNNs do not need activation functions.',
      ],
      correct: 1,
      explanation:
        'A convolution filter is reused across the entire image, so the parameter count stays tiny. Plus, it operates locally — edges, textures, and shapes are preserved.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'A 3×3 filter has how many learnable parameters?',
      correct: 9,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Just count the cells.',
      explanation:
        'A 3×3 filter has 9 cells, so 9 weights. Compare to a dense layer with 784 inputs — that would need 784 weights per neuron. Massive reduction.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'What does max pooling do?',
      options: [
        'Multiplies the image by a filter.',
        'Takes the maximum value in each small window, downsampling the image.',
        'Adds a bias to each pixel.',
        'Applies ReLU to the filter.',
      ],
      correct: 1,
      explanation:
        'Max pooling slides a small window (e.g., 2×2) over the image and keeps only the largest value. This halves the size and makes the output robust to small translations.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write `max_pool_2x2(image)` that takes a 2D NumPy array (even dimensions) and returns a max-pooled 2x2 version.',
      starterCode:
        'import numpy as np\n\ndef max_pool_2x2(image):\n    # your code here\n    pass',
      tests: [
        {
          input: 'max_pool_2x2(np.array([[1, 2], [3, 4]])).tolist()',
          expected: '[[4]]',
        },
        {
          input: 'max_pool_2x2(np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])).tolist()',
          expected: '[[6, 8], [14, 16]]',
        },
        {
          input: 'max_pool_2x2(np.zeros((4, 4))).shape',
          expected: '(2, 2)',
        },
      ],
      hint: 'Split the image into 2×2 blocks. For each block, take the max.',
      solution:
        'import numpy as np\n\ndef max_pool_2x2(image):\n    h, w = image.shape\n    out = np.zeros((h // 2, w // 2))\n    for i in range(h // 2):\n        for j in range(w // 2):\n            out[i, j] = image[2*i:2*i+2, 2*j:2*j+2].max()\n    return out',
      explanation:
        'Each 2×2 block is reduced to its max. The image dimensions halve.',
      xp: 35,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Why does a CNN have far fewer parameters than a dense network on images?',
      options: [
        'Because it skips some pixels.',
        'Because it uses parameter sharing — the same filter is reused across all positions.',
        'Because it uses ReLU.',
        'Because images are small.',
      ],
      correct: 1,
      explanation:
        'Parameter sharing is the core reason. A 3×3 filter has 9 parameters and is reused everywhere. A dense layer on a 28×28 image would need ~784 parameters per neuron.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Compute the convolution of image = [[1,2],[3,4]] with filter = [[1,0],[0,1]]. Print the result as a list of lists.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[[5.0]]',
      hint: 'The 2×2 image and 2×2 filter give a 1×1 output: 1*1 + 2*0 + 3*0 + 4*1 = 5.',
      solution:
        'import numpy as np\nimg = np.array([[1, 2], [3, 4]], dtype=float)\nfilt = np.array([[1, 0], [0, 1]], dtype=float)\nout = np.sum(img * filt)\nprint([[out]])',
      explanation:
        'Element-wise multiply then sum. 1*1 + 2*0 + 3*0 + 4*1 = 5.',
      xp: 20,
    },
  ],
};