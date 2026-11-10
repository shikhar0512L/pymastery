// 🧠 DL — Lesson 10: Autoencoders

export const dlAutoencodersLesson = {
  id: 'dl-autoencoders',
  title: 'Autoencoders — AI Compression & Anomaly Detection',
  difficulty: 'advanced',
  duration: 24,
  intro:
    'What if a neural network could compress an image into a tiny code, and then perfectly reconstruct the image from that code? That is an autoencoder. It is used for dimensionality reduction, denoising, and detecting fraud or defects.',

  sections: [
    {
      type: 'text',
      content:
        'An autoencoder is a network trained to output its own input. It sounds trivial — \(f(x) = x\) — but the magic is in the middle. The network has a **bottleneck** (a layer much smaller than the input), forcing it to learn a compressed representation.',
    },
    {
      type: 'note',
      content:
        'Think of it like this: you have a 100-page book. You must compress it into a 1-page summary, and then expand it back to the full 100 pages. To do this, the summary must capture only the most essential patterns.',
    },

    // ── ARCHITECTURE ─────────────────
    {
      type: 'text',
      content:
        'The autoencoder has two parts:\n\n• **Encoder** — compresses the input into a small "latent vector" (the code).\n• **Decoder** — reconstructs the original input from the latent vector.',
    },
    {
      type: 'math',
      latex:
        'x \\xrightarrow{\\text{Encoder}} z \\xrightarrow{\\text{Decoder}} \\hat{x}',
      caption:
        'The input passes through a bottleneck (z) and then back to the original shape.',
    },
    {
      type: 'code',
      content: 'A simple autoencoder architecture:',
      code: `import numpy as np\n\ndef relu(x):\n    return np.maximum(0, x)\n\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\n# Encoder: 8 -> 4 -> 2 (bottleneck)\ndef encode(x, W1, b1, W2, b2):\n    h = relu(W1 @ x + b1)\n    z = W2 @ h + b2\n    return z\n\n# Decoder: 2 -> 4 -> 8 (reconstruction)\ndef decode(z, W3, b3, W4, b4):\n    h = relu(W3 @ z + b3)\n    x_reconstructed = sigmoid(W4 @ h + b4)\n    return x_reconstructed\n\n# Example\nx = np.array([0.1, 0.9, 0.2, 0.8, 0.3, 0.7, 0.4, 0.6])\n# ... (weights would be learned via training)\nprint("Input:       ", x)\n# print("Reconstructed:", decode(encode(x, ...)))`,
      output: `Input:       [0.1 0.9 0.2 0.8 0.3 0.7 0.4 0.6]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Notice the bottleneck is 2-dimensional, but the input is 8-dimensional. The autoencoder learns to represent any 8-dimensional vector using just 2 numbers. This is equivalent to PCA (Principal Component Analysis) but non-linear, so it captures more complex patterns.',
    },

    // ── ANOMALY DETECTION ────────────
    {
      type: 'text',
      content:
        'Here is where autoencoders become really useful: **Anomaly Detection**.',
    },
    {
      type: 'text',
      content:
        'You train the autoencoder only on normal data (e.g., 10,000 healthy X-rays). When you feed it an anomaly (e.g., a cancer X-ray), it cannot reconstruct it well. The **reconstruction error** is much higher than usual.',
    },
    {
      type: 'math',
      latex:
        '\\text{Score}(x) = \\| x - \\text{Decoder}(\\text{Encoder}(x)) \\|^2',
      caption:
        'If the score is above a threshold, flag it as an anomaly.',
    },
    {
      type: 'simulation',
      title: 'Anomaly detection in action',
      description:
        'The network has been trained on normal data. Slide the input towards an "anomaly" and watch the reconstruction error spike.',
      sliders: [
        { id: 'anomaly', label: 'How abnormal?', min: 0, max: 5, step: 0.1, default: 0.2, decimals: 1 },
      ],
      render: ({ anomaly }) => {
        // Simulate reconstruction error: low when anomaly=0, spikes as anomaly grows
        const error = Math.pow(anomaly, 2) * 2 + 0.05;
        return {
          fns: [
            { fn: (t) => Math.pow(t, 2) * 2 + 0.05, color: 'rose', label: 'Reconstruction Error' },
          ],
          points: [{ x: anomaly, y: error, color: 'brand', r: 8, label: 'Current' }],
          domain: [0, 5],
          range: [-0.5, 50],
        };
      },
      formula: ({ anomaly }) => {
        const error = Math.pow(anomaly, 2) * 2 + 0.05;
        return `\\text{Reconstruction Error} = ${error.toFixed(2)}`;
      },
      caption:
        'Threshold: 5.0. If error > 5.0, flag as anomaly. At anomaly = 2, error is 8.05 → flagged.',
    },
    {
      type: 'note',
      content:
        'This is how fraud detection works at credit card companies. The autoencoder learns "normal" spending patterns. A sudden ₹5 lakh transaction at 3 AM from a new IP is an anomaly — the error is huge.',
    },
    {
      type: 'tip',
      content:
        'Autoencoders are unsupervised learning. You do not need labeled data to train them. You just need a large amount of "normal" data. This is incredibly valuable in the real world, where labeled anomalies are rare.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the main characteristic of an autoencoder?',
      options: [
        'It has a bottleneck layer that forces compression.',
        'It uses recurrent layers.',
        'It requires labeled data.',
        'It only works on images.',
      ],
      correct: 0,
      explanation:
        'The bottleneck layer is the entire point. It forces the network to learn a compressed representation of the input.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'How does an autoencoder detect anomalies?',
      options: [
        'It uses a classifier to label anomalies.',
        'It reconstructs the input; anomalies have high reconstruction error.',
        'It uses random sampling.',
        'It finds the maximum weight.',
      ],
      correct: 1,
      explanation:
        'The network is trained only on normal data. An anomalous input cannot be reconstructed well, so the reconstruction error is high.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question: 'If the reconstruction error threshold is 5.0, and an input gives an error of 6.2, is it flagged as an anomaly? (1 for yes, 0 for no)',
      correct: 1,
      tolerance: 0,
      placeholder: 'Enter 1 or 0',
      hint: '6.2 > 5.0.',
      explanation:
        '6.2 is greater than the threshold 5.0, so the input is flagged as an anomaly.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question: 'Write `reconstruction_error(x, x_hat)` that computes the MSE between input `x` and reconstruction `x_hat`.',
      starterCode: 'import numpy as np\n\ndef reconstruction_error(x, x_hat):\n    # your code here\n    pass',
      tests: [
        { input: 'reconstruction_error(np.array([1, 2]), np.array([1, 2]))', expected: '0.0' },
        { input: 'reconstruction_error(np.array([0, 0]), np.array([1, 1]))', expected: '1.0' },
      ],
      hint: 'MSE = mean((x - x_hat)^2).',
      solution: 'import numpy as np\n\ndef reconstruction_error(x, x_hat):\n    return np.mean((x - x_hat) ** 2)',
      explanation: 'The MSE is exactly what autoencoders minimize during training.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'output-match',
      question: 'A 6D input goes through an encoder with layers 6→3→2. Print the shape of the latent vector z.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '(2,)',
      hint: 'The latent shape is the last encoder layer.',
      solution: 'import numpy as np\nz = np.zeros(2)\nprint(z.shape)',
      explanation:
        'The encoder ends at layer size 2, so the latent code is a 2D vector.',
      xp: 20,
    },
  ],
};