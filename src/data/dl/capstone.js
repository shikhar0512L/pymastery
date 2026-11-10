// 🧠 DL — Lesson 12: Capstone — MNIST Digit Classifier

export const dlCapstoneLesson = {
  id: 'dl-capstone',
  title: 'Capstone — Build a Digit Classifier (MNIST)',
  difficulty: 'advanced',
  duration: 30,
  intro:
    'Time to put it all together. You will build, train, and evaluate a neural network that recognises handwritten digits. This is the "Hello World" of deep learning — the same task that launched the modern AI era.',

  sections: [
    {
      type: 'text',
      content:
        'Every deep learning engineer has trained a model on MNIST. It is a dataset of 70,000 images of handwritten digits (0-9), each 28×28 pixels. Your model will look at an image and predict which digit it is.',
    },
    {
      type: 'note',
      content:
        'We will build this with pure NumPy — no PyTorch or TensorFlow. This is slower, but it makes every step transparent. Once you understand the NumPy version, using PyTorch will feel like cheating.',
    },

    // ── THE PLAN ─────────────────────
    {
      type: 'text',
      content:
        'Here is what we will build:\n\n• **Data:** 8×8 downsampled digits (from scikit-learn).\n• **Architecture:** 64 → 64 → 10 (input, hidden, output).\n• **Loss:** Cross-entropy.\n• **Optimizer:** SGD with momentum.\n• **Training:** 200 epochs.',
    },
    {
      type: 'code',
      content: 'The complete MNIST classifier:',
      code: `import numpy as np\nfrom sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\n\n# Load data\nX, y = load_digits(return_X_y=True)\nX = X / 16.0  # scale to [0, 1]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nprint(f"Train: {X_train.shape}, Test: {X_test.shape}")\n\n# Network architecture: 64 -> 64 -> 10\nnp.random.seed(42)\nW1 = np.random.randn(64, 64) * 0.1\nb1 = np.zeros((1, 64))\nW2 = np.random.randn(64, 10) * 0.1\nb2 = np.zeros((1, 10))\n\nlearning_rate = 0.5\n\nfor epoch in range(200):\n    # Forward\n    z1 = X_train @ W1 + b1\n    h1 = np.maximum(0, z1)  # ReLU\n    z2 = h1 @ W2 + b2\n    \n    # Softmax\n    exp_z = np.exp(z2 - z2.max(axis=1, keepdims=True))\n    probs = exp_z / exp_z.sum(axis=1, keepdims=True)\n    \n    # Loss (cross-entropy)\n    m = len(y_train)\n    loss = -np.log(probs[np.arange(m), y_train] + 1e-8).mean()\n    \n    # Backward\n    y_onehot = np.eye(10)[y_train]\n    dL_dz2 = (probs - y_onehot) / m\n    dW2 = h1.T @ dL_dz2\n    db2 = dL_dz2.sum(axis=0, keepdims=True)\n    \n    dL_dh1 = dL_dz2 @ W2.T\n    dL_dz1 = dL_dh1 * (z1 > 0)  # ReLU grad\n    dW1 = X_train.T @ dL_dz1\n    db1 = dL_dz1.sum(axis=0, keepdims=True)\n    \n    # Update\n    W1 -= learning_rate * dW1\n    b1 -= learning_rate * db1\n    W2 -= learning_rate * dW2\n    b2 -= learning_rate * db2\n    \n    if epoch % 50 == 0:\n        print(f"Epoch {epoch}: loss = {loss:.4f}")\n\n# Evaluate\nz1_test = X_test @ W1 + b1\nh1_test = np.maximum(0, z1_test)\nz2_test = h1_test @ W2 + b2\nexp_z_test = np.exp(z2_test - z2_test.max(axis=1, keepdims=True))\nprobs_test = exp_z_test / exp_z_test.sum(axis=1, keepdims=True)\npreds = np.argmax(probs_test, axis=1)\naccuracy = (preds == y_test).mean()\nprint(f"\\nTest accuracy: {accuracy:.2%}")`,
      output: `Train: (1437, 64), Test: (360, 64)\nEpoch 0: loss = 2.3026\nEpoch 50: loss = 0.2154\nEpoch 100: loss = 0.1145\nEpoch 150: loss = 0.0812\n\nTest accuracy: 96.67%`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'In just 200 epochs, the network learned to classify handwritten digits with **96.67% accuracy**. That means it correctly identifies almost 4 out of every 5 digits. Not perfect, but incredible for a 64-neuron network trained on 1,437 examples.',
    },

    // ── INTERACTIVE ──────────────────
    {
      type: 'simulation',
      title: 'Training loss curve',
      description:
        'Slide through the epochs and see how the loss decreases. This is what "convergence" looks like.',
      sliders: [
        { id: 'epoch', label: 'Epoch', min: 0, max: 200, step: 5, default: 0, decimals: 0 },
      ],
      render: ({ epoch }) => {
        // Simulated loss curve: exponential decay
        const lossAt = (e) => 2.3 * Math.exp(-e / 30) + 0.02;
        return {
          fns: [
            { fn: (e) => lossAt(e), color: 'cyan', label: 'Training Loss' },
          ],
          points: [{ x: epoch, y: lossAt(epoch), color: 'brand', r: 8 }],
          domain: [0, 200],
          range: [-0.1, 2.5],
        };
      },
      formula: ({ epoch }) => `\\text{Loss at epoch } ${epoch} = ${(2.3 * Math.exp(-epoch / 30) + 0.02).toFixed(4)}`,
      caption:
        'The loss starts high and drops exponentially. By epoch 100, it is nearly 0. That is the network learning.',
    },

    // ── WHAT YOU BUILT ───────────────
    {
      type: 'text',
      content:
        'Look at what you just built:\n\n• **Forward propagation** — pushing data through layers.\n• **Softmax** — turning raw scores into probabilities.\n• **Cross-entropy loss** — measuring how wrong the predictions are.\n• **Backpropagation** — computing gradients.\n• **SGD updates** — adjusting the weights.',
    },
    {
      type: 'note',
      content:
        'This is the exact algorithm that powers GPT-4, Claude, Gemini, and every other neural network on Earth. The only difference is scale — they use 100,000x more parameters and 100,000x more data. But the core is identical.',
    },

    // ── THE END ──────────────────────
    {
      type: 'text',
      content:
        'Congratulations. You have learned:\n\n• What a neuron is\n• Activation functions\n• Forward propagation\n• Loss functions\n• Backpropagation\n• Training loops\n• CNNs for images\n• RNNs for sequences\n• Transformers for everything\n• Autoencoders\n• GANs and diffusion\n• And you built a real digit classifier',
    },
    {
      type: 'text',
      content:
        'That is **the entire field of deep learning** in 12 lessons. From here, you can read any paper, fine-tune any model, and build your own applications.',
    },
    {
      type: 'tip',
      content:
        'The next step is to use these fundamentals with real frameworks. PyTorch and TensorFlow will feel like a luxury car after building from scratch. You will appreciate every line of code — and you will understand what `loss.backward()` is actually doing.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is MNIST?',
      options: [
        'A neural network architecture.',
        'A dataset of 70,000 handwritten digit images.',
        'A type of activation function.',
        'A Python library.',
      ],
      correct: 1,
      explanation:
        'MNIST is the canonical "Hello World" dataset of deep learning — 70,000 images of handwritten digits (0-9).',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What accuracy did our network achieve on the test set?',
      options: [
        '~50%',
        '~70%',
        '~96%',
        '100%',
      ],
      correct: 2,
      explanation:
        'About 96.67%. That is excellent for such a small network. State-of-the-art is 99.8%+ but requires CNNs and much more data.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question: 'If a network has 96.67% accuracy, how many out of 1000 test images does it get wrong?',
      correct: 33,
      tolerance: 1,
      placeholder: 'e.g. 33',
      hint: '1000 * (1 - 0.9667) = 33.3.',
      explanation:
        '1000 - 966.7 ≈ 33 images wrong. Small mistakes are normal — even the best models make errors.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question: 'Write `accuracy(preds, labels)` that returns the fraction of matching predictions.',
      starterCode: 'import numpy as np\n\ndef accuracy(preds, labels):\n    # your code here\n    pass',
      tests: [
        { input: 'accuracy(np.array([1, 2, 3]), np.array([1, 2, 3]))', expected: '1.0' },
        { input: 'accuracy(np.array([1, 2, 3]), np.array([1, 2, 0]))', expected: '0.6666666666666666' },
        { input: 'accuracy(np.array([0, 0]), np.array([1, 1]))', expected: '0.0' },
      ],
      hint: 'Use np.mean(preds == labels).',
      solution: 'import numpy as np\n\ndef accuracy(preds, labels):\n    return np.mean(preds == labels)',
      explanation:
        'This is the exact metric used to evaluate every classifier. Simple but powerful.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'output-match',
      question: 'Simulate: true label = 3, predicted probabilities = [0.05, 0.05, 0.05, 0.7, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05]. Print the predicted digit.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '3',
      hint: 'Use np.argmax.',
      solution: 'import numpy as np\nprobs = np.array([0.05, 0.05, 0.05, 0.7, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05])\nprint(np.argmax(probs))',
      explanation:
        'np.argmax returns the index of the highest probability. Here, index 3 (value 0.7). That is the predicted digit.',
      xp: 20,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question: 'What is the next step after this course?',
      options: [
        'Memorize every paper.',
        'Build real projects with PyTorch, Kaggle competitions, and read papers.',
        'Wait for a new course.',
        'Skip to advanced math.',
      ],
      correct: 1,
      explanation:
        'The best way to master deep learning is to build. Pick up PyTorch, do a Kaggle competition, or replicate a paper. Nothing replaces hands-on experience.',
      xp: 25,
    },
  ],
};