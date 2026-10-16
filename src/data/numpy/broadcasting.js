// 📘 NumPy — Lesson 6: Broadcasting

export const numpyBroadcastingLesson = {
  id: 'numpy-broadcasting',
  title: 'Broadcasting — Operating on Different Shapes',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Broadcasting lets NumPy operate on arrays of different shapes. It is a virtual stretch — no data is copied. Master the rules and you can write complex math in one line.',
  sections: [
    {
      type: 'text',
      content:
        'Broadcasting is NumPy\'s rule for combining arrays of different shapes. Instead of erroring, NumPy "stretches" the smaller array conceptually to match the larger one.',
    },
    {
      type: 'code',
      content: 'The simplest broadcast — array + scalar:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4])\n\nprint(a + 10)\nprint(a * 2)\nprint(2 ** a)`,
      output: `[11 12 13 14]\n[2 4 6 8]\n[ 2  4  8 16]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'A scalar has shape `()`. NumPy stretches it to the array shape. This is broadcasting at the simplest level.',
    },
    {
      type: 'text',
      content:
        'The **broadcasting rules**: align the two shapes from the RIGHT. For each axis, either the dimensions match, or one of them is 1. Otherwise, error.',
    },
    {
      type: 'code',
      content: 'Shape alignment from the right:',
      code: `import numpy as np\n\n# (3, 4) and (4,) — OK, second aligns to last axis\nm = np.ones((3, 4))\nv = np.array([1, 2, 3, 4])\nprint((m * v).shape)     # (3, 4)\n\n# (3, 4) and (3,) — FAILS (3 vs 4 on last axis)\ntry:\n    np.ones((3, 4)) * np.array([1, 2, 3])\nexcept ValueError as e:\n    print("fail:", e)`,
      output: `(3, 4)\nfail: operands could not be broadcast together with shapes (3,4) (3,)`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Broadcasting works from the RIGHT, not the left. `(3, 4) + (3,)` fails because 4 and 3 are on the same (last) axis. `(3, 4) + (4,)` works because the trailing 4s match.',
    },
    {
      type: 'text',
      content:
        'Broadcasting a row vector across a matrix. The vector gets virtually stretched across every row.',
    },
    {
      type: 'code',
      content: 'Row vector broadcast:',
      code: `import numpy as np\n\nmatrix = np.ones((3, 4))\nrow = np.array([1, 2, 3, 4])   # shape (4,)\n\nprint(matrix * row)`,
      output: `[[1. 2. 3. 4.]\n [1. 2. 3. 4.]\n [1. 2. 3. 4.]]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Broadcasting a column vector. The shape is `(3, 1)` — one value per row, stretched across all columns.',
    },
    {
      type: 'code',
      content: 'Column vector broadcast:',
      code: `import numpy as np\n\nmatrix = np.ones((3, 4))\ncol = np.array([[1], [2], [3]])   # shape (3, 1)\n\nprint(matrix * col)`,
      output: `[[1. 1. 1. 1.]\n [2. 2. 2. 2.]\n [3. 3. 3. 3.]]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The shape `(3, 1)` vs `(3,)` matters. `(3,)` aligns to the last axis; `(3, 1)` aligns to axis 0. This is why you so often write `a[:, np.newaxis]`.',
    },
    {
      type: 'text',
      content:
        'Adding a new axis with `np.newaxis` (or `None`) is the standard trick to control broadcasting direction.',
    },
    {
      type: 'code',
      content: 'np.newaxis — control the direction:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4])\n\nprint(a.shape)                    # (4,)\nprint(a[:, np.newaxis].shape)     # (4, 1) — column\nprint(a[np.newaxis, :].shape)     # (1, 4) — row\n\n# Outer product via broadcasting\nb = np.array([10, 20, 30])\nprint(a[:, np.newaxis] * b[np.newaxis, :])`,
      output: `(4,)\n(4, 1)\n(1, 4)\n[[10 20 30]\n [20 40 60]\n [30 60 90]\n [40 80 120]]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Outer product in one line: `a[:, None] * b[None, :]`. No loops, no `np.outer`. This is a broadcasting pattern you will see constantly.',
    },
    {
      type: 'text',
      content:
        'Standardization (subtract mean, divide by std) per column — the classic data-pre-processing step made trivial with broadcasting + keepdims.',
    },
    {
      type: 'code',
      content: 'Column-wise standardization:',
      code: `import numpy as np\n\nX = np.array([[1.0, 100.0],\n              [2.0, 200.0],\n              [3.0, 300.0]])\n\nmean = X.mean(axis=0, keepdims=True)   # shape (1, 2)\nstd = X.std(axis=0, keepdims=True)     # shape (1, 2)\n\nX_norm = (X - mean) / std\nprint(X_norm)\nprint(X_norm.mean(axis=0))    # ~[0, 0]\nprint(X_norm.std(axis=0))     # ~[1, 1]`,
      output: `[[-1.22474487 -1.22474487]\n [ 0.          0.        ]\n [ 1.22474487  1.22474487]]\n[0. 0.]\n[1. 1.]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Without `keepdims=True`, mean would have shape `(2,)` and `X - mean` would align wrong. keepdims gives `(1, 2)` which broadcasts down every row.',
    },
    {
      type: 'text',
      content:
        'Broadcasting is not limited to 2D. With 3D, 4D, any-D arrays — the same rule applies: align from the right, match or 1.',
    },
    {
      type: 'code',
      content: 'Broadcasting across 3D:',
      code: `import numpy as np\n\n# 2 batches of 3x4 images\nbatch = np.ones((2, 3, 4))\n# per-channel bias, shape (4,) — broadcasts over last axis\nbias = np.array([10, 20, 30, 40])\n\nprint((batch + bias).shape)    # (2, 3, 4)\n\n# per-image weight, shape (2, 1, 1)\nweight = np.array([1, 100]).reshape(2, 1, 1)\nprint((batch * weight).shape)`,
      output: `(2, 3, 4)\n(2, 3, 4)`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'In deep learning, per-batch and per-channel operations are entirely broadcasting. A `(batch, height, width, channels)` tensor plus a `(channels,)` bias vector just works.',
    },
    {
      type: 'warning',
      content:
        'Broadcasting "stretches" virtually, not physically. No memory is allocated for the stretched version — it is computed as if the array were repeated. That is why it is fast.',
    },
    {
      type: 'code',
      content: 'Memory: broadcasting does not allocate:',
      code: `import numpy as np\n\na = np.ones((1000, 1000))\nb = np.array([1, 2, 3])    # will fail (shape mismatch)\n\n# But b of shape (1000,) broadcasts without allocating 1000x1000:\nb2 = np.arange(1000)\nout = a + b2\nprint(out.shape)         # (1000, 1000)`,
      output: `(1000, 1000)`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'When broadcasting fails, the error tells you the two shapes. Read the message carefully — it points to exactly which axis is off.',
    },
    {
      type: 'code',
      content: 'Debugging shape mismatches:',
      code: `import numpy as np\n\na = np.ones((3, 4))\nb = np.ones((3,))\n\n# Fix: add an axis\nb2 = b[:, np.newaxis]   # shape (3, 1)\nprint((a * b2).shape)   # (3, 4)`,
      output: `(3, 4)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Rule of thumb when broadcasting fails: ask yourself "which axis is off?" and add a `np.newaxis` there. Nine times out of ten that is the fix.',
    },
    {
      type: 'tip',
      content:
        'That is broadcasting. Right-align, match or 1, newaxis to control direction. Master this and 90% of NumPy code becomes single-line.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import numpy as np
a = np.array([[1, 2, 3], [4, 5, 6]])
b = np.array([10, 20, 30])
print((a + b).shape)`,
      options: ['(2, 3)', '(3,)', '(2,)', 'Error'],
      correct: 0,
      explanation:
        'b has shape (3,). Aligning from the right, 3 matches the last axis of (2, 3). b broadcasts across both rows, result is (2, 3).',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      question:
        'Which pair of shapes CANNOT broadcast together?',
      options: [
        '(3, 4) and (4,)',
        '(3, 4) and (3, 1)',
        '(3, 4) and (3,)',
        '(3, 4) and ()',
      ],
      correct: 2,
      explanation:
        'Aligning (3, 4) and (3,) from the right: axis -1 is 4 vs 3 — mismatch, and neither is 1. Fails. The others all match or have 1 on each axis.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import numpy as np
a = np.array([1, 2, 3])
b = np.array([10, 20])
try:
    print(a + b)
except ValueError as e:
    print("fail")`,
      options: ['[11 22 3]', '[11 22]', 'fail', '[11 22 30]'],
      correct: 2,
      explanation:
        'Shape (3,) vs (2,). Last axes are 3 and 2 — mismatch, neither is 1. Raises ValueError, so "fail" prints.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank to turn `a = [1, 2, 3]` into a column vector for broadcasting:',
      code: `import numpy as np
a = np.array([1, 2, 3])
col = a[:, ___]
print(col.shape)`,
      options: ['np.newaxis', 'None', 'axis', 'add'],
      correct: 0,
      explanation:
        '`np.newaxis` (or `None`) inserts a new axis. `a[:, np.newaxis]` gives shape (3, 1) — a column vector.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `standardize(X)` that standardizes a 2D matrix column-wise: subtract column mean, divide by column standard deviation. Return the result.',
      starterCode:
        'import numpy as np\n\ndef standardize(X):\n    # your code here\n    pass',
      tests: [
        {
          input: 'round(standardize(np.array([[1.0, 100.0], [2.0, 200.0], [3.0, 300.0]])).mean(), 6)',
          expected: '0.0',
        },
        {
          input: 'round(standardize(np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])).std(), 6)',
          expected: '1.0',
        },
        {
          input: 'standardize(np.array([[1.0, 2.0], [3.0, 4.0]])).shape',
          expected: '(2, 2)',
        },
      ],
      hint: 'Use `X.mean(axis=0, keepdims=True)` and `X.std(axis=0, keepdims=True)`, then `(X - mean) / std`.',
      solution:
        'import numpy as np\n\ndef standardize(X):\n    mean = X.mean(axis=0, keepdims=True)\n    std = X.std(axis=0, keepdims=True)\n    return (X - mean) / std',
      explanation:
        'keepdims=True keeps the reduced axis as size 1, so the shapes broadcast correctly. The result has column-mean 0 and column-std 1.',
      xp: 35,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `a = [1, 2, 3]` and `b = [10, 20]`. Compute their outer product (shape 3×2) using broadcasting, and print the resulting shape.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '(3, 2)',
      hint: 'Use `a[:, np.newaxis] * b[np.newaxis, :]` to align shapes (3, 1) and (1, 2).',
      solution:
        'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([10, 20])\nresult = a[:, np.newaxis] * b[np.newaxis, :]\nprint(result.shape)',
      explanation:
        'Broadcasting (3, 1) with (1, 2) gives (3, 2). Each element is a[i] * b[j]. This is the outer product, done with pure broadcasting.',
      xp: 30,
    },
  ],
};