// 🧠 DL — Lesson 6: Training a Neural Network

export const dlTrainingLesson = {
  id: 'dl-training',
  title: 'Training a Network — The Full Loop',
  difficulty: 'advanced',
  duration: 30,
  intro:
    'Forward pass, compute loss, backward pass, update weights, repeat. That is it. That is the entire training loop. Everything else is detail. In this lesson, we build a network from scratch and train it on real data.',

  sections: [
    {
      type: 'text',
      content:
        'You now know all the pieces: forward propagation (making predictions), loss functions (measuring error), and backpropagation (finding how to fix the error). Now we combine them into the loop that trains a network.',
    },

    // ── THE LOOP ─────────────────────
    {
      type: 'text',
      content:
        'The training loop runs for many epochs. In each epoch, we show the network all the training data (usually in batches) and update the weights after every batch.',
    },
    {
      type: 'math',
      latex:
        '\\text{for each epoch:} \\\\ \\quad \\text{for each batch:} \\\\ \\quad\\quad \\hat{y} = \\text{forward}(X) \\\\ \\quad\\quad L = \\text{loss}(\\hat{y}, y) \\\\ \\quad\\quad \\text{grads} = \\text{backward}(L) \\\\ \\quad\\quad W = W - \\alpha \\cdot \\text{grads}',
      caption:
        'The 4-step training loop. Forward, loss, backward, update.',
    },
    {
      type: 'note',
      content:
        '**Epoch** = one full pass through the training data. **Batch** = a small chunk of data processed together. **Learning rate (α)** = how big a step to take in the direction opposite the gradient.',
    },

    // ── THE EXAMPLE ──────────────────
    {
      type: 'text',
      content:
        'Let us train a network to solve XOR — the same problem we hand-coded earlier. This time, the network learns the weights on its own.',
    },
    {
      type: 'code',
      content: 'Training an XOR network from scratch:',
      code: `import numpy as np\n\nnp.random.seed(42)\n\n# XOR data\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\ny = np.array([[0], [1], [1], [0]])\n\n# 2 → 4 → 1 network\nW1 = np.random.randn(2, 4) * 0.5\nb1 = np.zeros((1, 4))\nW2 = np.random.randn(4, 1) * 0.5\nb2 = np.zeros((1, 1))\n\nlearning_rate = 0.5\n\nfor epoch in range(2000):\n    # ── Forward ──\n    z1 = X @ W1 + b1\n    h = np.maximum(0, z1)        # ReLU\n    z2 = h @ W2 + b2\n    p = 1 / (1 + np.exp(-z2))    # Sigmoid\n    \n    # ── Loss (MSE) ──\n    loss = np.mean((p - y) ** 2)\n    \n    # ── Backward ──\n    dL_dp = 2 * (p - y) / len(X)\n    dL_dz2 = dL_dp * p * (1 - p)      # sigmoid grad\n    dW2 = h.T @ dL_dz2\n    db2 = np.sum(dL_dz2, axis=0, keepdims=True)\n    \n    dL_dh = dL_dz2 @ W2.T\n    dL_dz1 = dL_dh * (z1 > 0)          # ReLU grad\n    dW1 = X.T @ dL_dz1\n    db1 = np.sum(dL_dz1, axis=0, keepdims=True)\n    \n    # ── Update ──\n    W1 -= learning_rate * dW1\n    b1 -= learning_rate * db1\n    W2 -= learning_rate * dW2\n    b2 -= learning_rate * db2\n    \n    if epoch % 500 == 0:\n        print(f"Epoch {epoch}: loss = {loss:.4f}")\n\nprint("\\nFinal predictions:")\nprint(p.round(3))`,
      output: `Epoch 0: loss = 0.2812\nEpoch 500: loss = 0.0156\nEpoch 1000: loss = 0.0034\nEpoch 1500: loss = 0.0019\n\nFinal predictions:\n[[0.033]\n [0.971]\n [0.971]\n [0.028]]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Look at the final predictions: [0.033, 0.971, 0.971, 0.028]. That is XOR. The true answer is [0, 1, 1, 0]. The network learned it on its own — no hand-coded weights. This is the entire magic of deep learning.',
    },

    // ── LEARNING RATE ────────────────
    {
      type: 'text',
      content:
        'The **learning rate** is the most important hyperparameter. It controls how big a step the network takes downhill.',
    },
    {
      type: 'simulation',
      title: 'Effect of learning rate',
      description:
        'This simulates training a simple network. Change the learning rate and see how fast (or unstable) the loss decreases.',
      sliders: [
        { id: 'lr', label: '\\alpha', min: 0.01, max: 2.0, step: 0.01, default: 0.5, decimals: 2 },
      ],
      render: ({ lr }) => {
        // Simulated loss curve: loss = exp(-lr * t)
        const lossAt = (t) => {
          if (lr > 1.5) return 0.5 + 0.3 * Math.sin(t * 2) * Math.exp(-t * 0.1); // instability
          return 0.5 * Math.exp(-lr * t * 0.5) + 0.02;
        };
        return {
          fns: [
            { fn: (t) => lossAt(t), color: 'cyan', label: `Loss curve (α = ${lr})` },
          ],
          domain: [0, 20],
          range: [-0.1, 0.7],
        };
      },
      formula: ({ lr }) => {
        if (lr < 0.05) return `\\text{Too small} \\to \\text{slow convergence}`;
        if (lr > 1.5) return `\\text{Too large} \\to \\text{divergence / oscillation}`;
        return `\\text{Good learning rate} \\to \\text{converges quickly}`;
      },
      caption:
        'Try α = 0.02 → very slow. Try α = 1.8 → noisy / unstable. The sweet spot is somewhere in the middle (usually 0.001 - 0.1 for real networks).',
    },
    {
      type: 'warning',
      content:
        'Too small a learning rate → training takes forever. Too large → the loss bounces around and diverges. In practice, most deep learning uses adaptive optimizers like Adam, which automatically adjust the learning rate over time.',
    },

    // ── GRADIENT DESCENT VARIANTS ────
    {
      type: 'text',
      content:
        'The simplest update is **Stochastic Gradient Descent (SGD)**: $W = W - \\alpha \\nabla W$. But it has issues with noisy gradients and saddle points. Modern optimizers improve on it:',
    },
    {
      type: 'text',
      content:
        '• **SGD with momentum** — accumulates a velocity, so it rolls past local minima.\n• **RMSProp** — scales the learning rate per-weight based on recent gradients.\n• **Adam** — combines momentum and RMSProp. The default choice in practice.',
    },
    {
      type: 'code',
      content: 'Update rule comparison:',
      code: `# SGD\nW = W - lr * dW\n\n# SGD with momentum\nv = beta * v + dW\nW = W - lr * v\n\n# Adam (simplified)\nm = beta1 * m + (1 - beta1) * dW\nv = beta2 * v + (1 - beta2) * dW ** 2\nW = W - lr * m / (sqrt(v) + eps)`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'You will almost never implement these by hand — PyTorch and TensorFlow give you `torch.optim.Adam()` in one line. But knowing what they do helps you debug when training goes wrong.',
    },

    // ── OVERFITTING ──────────────────
    {
      type: 'text',
      content:
        'A trained network can **memorize** the training data instead of learning general patterns. This is overfitting, the same problem you saw in the ML module.',
    },
    {
      type: 'text',
      content:
        'Neural networks overfit very easily because they have millions of parameters. Combating overfitting requires:',
    },
    {
      type: 'text',
      content:
        '• **More data.** The best fix, always.\n• **Regularization (L2).** Penalizes large weights.\n• **Dropout.** Randomly turns off neurons during training.\n• **Early stopping.** Stop training when validation loss starts rising.\n• **Data augmentation.** Add noise or transforms to training data.',
    },
    {
      type: 'note',
      content:
        'A neural network can achieve 0% training loss and 100% accuracy on the training set, while having 50% accuracy on the test set. This is a perfectly normal (and bad) scenario. Always evaluate on a test set.',
    },

    // ── THE WHOLE PICTURE ────────────
    {
      type: 'text',
      content:
        'Here is the entire training process, in one concise summary:',
    },
    {
      type: 'text',
      content:
        '1. **Initialize** weights randomly.\n2. **Forward** pass through the network to get a prediction.\n3. **Compute** the loss.\n4. **Backward** pass to get the gradients.\n5. **Update** the weights using the gradients.\n6. **Repeat** for many epochs.\n7. **Evaluate** on test data. If not good enough, tune hyperparameters.',
    },
    {
      type: 'tip',
      content:
        'That is it. That is the whole game. Every deep learning paper, from ResNet to GPT-4, is built on this simple loop. All that changes is the architecture (the shape of the network), the loss function, and the optimizer. The core is the same.',
    },
    {
      type: 'tip',
      content:
        'You have now completed the DL fundamentals! Next up: convolutional networks (CNNs) for images, and transformers for text. But those are advanced. For now, you know what is happening inside ChatGPT, Stable Diffusion, and every other neural network on Earth.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is an epoch?',
      options: [
        'A single forward pass on one example.',
        'One complete pass through the entire training dataset.',
        'A single weight update.',
        'A type of loss function.',
      ],
      correct: 1,
      explanation:
        'An epoch is one complete pass through the training data. Networks are usually trained for many epochs. Each epoch can also be split into batches.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What happens if the learning rate is too large?',
      options: [
        'Training is slow.',
        'The loss oscillates or diverges.',
        'The network forgets the data.',
        'The activation function stops working.',
      ],
      correct: 1,
      explanation:
        'A learning rate that is too large causes the weights to jump around the minimum instead of converging. The loss bounces and can even grow to infinity (divergence).',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write `sgd_update(w, grad, lr)` that performs one SGD step: return w - lr*grad.',
      starterCode:
        'def sgd_update(w, grad, lr):\n    # your code here\n    pass',
      tests: [
        { input: 'sgd_update(1.0, 0.5, 0.1)', expected: '0.95' },
        { input: 'sgd_update(0.0, -2.0, 0.5)', expected: '1.0' },
        { input: 'sgd_update(10.0, 1.0, 1.0)', expected: '9.0' },
      ],
      hint: 'w - lr * grad.',
      solution:
        'def sgd_update(w, grad, lr):\n    return w - lr * grad',
      explanation:
        'That is the entire SGD update. Very simple — but incredibly powerful when you do it millions of times with a good gradient.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question: 'Why do modern networks usually use Adam instead of plain SGD?',
      options: [
        'Adam is faster than SGD in every case.',
        'Adam adapts the learning rate per-weight and combines momentum, so it converges more reliably.',
        'Adam has a smaller memory footprint.',
        'Adam does not require gradients.',
      ],
      correct: 1,
      explanation:
        'Adam combines the benefits of momentum (accumulating velocity) and RMSProp (per-weight learning rates). It converges faster and requires less manual tuning of the learning rate.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question: 'Which of these is NOT a strategy to prevent overfitting in neural networks?',
      options: [
        'Adding more training data.',
        'Using dropout during training.',
        'Increasing the learning rate.',
        'Adding L2 regularization.',
      ],
      correct: 2,
      explanation:
        'Increasing the learning rate can cause divergence or instability, but it does not specifically combat overfitting. Data, dropout, and regularization are the standard tools.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Simulate 3 SGD steps on a single weight starting at w=1.0, with gradient always 0.2 and learning rate 0.5. Print the final w (to 2 decimal places).',
      starterCode: 'w = 1.0\ngrad = 0.2\nlr = 0.5\n# your code here\n',
      expectedOutput: '0.7',
      hint: 'w -= lr * grad (3 times).',
      solution: 'w = 1.0\ngrad = 0.2\nlr = 0.5\nfor _ in range(3):\n    w -= lr * grad\nprint(round(w, 2))',
      explanation:
        'Step 1: 1.0 - 0.1 = 0.9. Step 2: 0.9 - 0.1 = 0.8. Step 3: 0.8 - 0.1 = 0.7.',
      xp: 25,
    },
  ],
};