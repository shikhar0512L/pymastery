// 📘 NumPy — Lesson 3: Reshaping, Transposing & Memory Layout

export const numpyReshapingLesson = {
  id: 'numpy-reshaping',
  title: 'Reshaping, Transposing & Memory Layout',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Reshaping changes how NumPy "sees" the same block of memory. Understanding views vs copies, C-order vs F-order, and shape manipulation is what makes image and tensor work possible.',
  sections: [
    {
      type: 'text',
      content:
        '`reshape` changes the shape without changing the data. As long as the total number of elements matches, any shape is valid.',
    },
    {
      type: 'code',
      content: 'Basic reshape:',
      code: `import numpy as np\n\na = np.arange(12)\nprint(a.reshape(3, 4))\nprint(a.reshape(2, 6))\nprint(a.reshape(3, -1))     # -1 = infer this dimension\nprint(a.reshape(2, 2, 3))   # 3D`,
      output: `[[ 0  1  2  3]\n [ 4  5  6  7]\n [ 8  9 10 11]]\n[[ 0  1  2  3  4  5]\n [ 6  7  8  9 10 11]]\n[[ 0  1  2  3]\n [ 4  5  6  7]\n [ 8  9 10 11]]\n[[[ 0  1  2]\n  [ 3  4  5]]\n\n [[ 6  7  8]\n  [ 9 10 11]]]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`-1` in reshape means "figure out this dimension for me". `a.reshape(3, -1)` is cleaner than `a.reshape(3, 4)` because it does not hardcode the second dimension.',
    },
    {
      type: 'warning',
      content:
        'Reshape only works when the total size matches. `np.arange(12).reshape(5, 3)` raises ValueError because 5×3=15 ≠ 12.',
    },
    {
      type: 'text',
      content:
        'Flatten a multi-dim array back to 1D. Two ways: `flatten()` returns a **copy**, `ravel()` returns a **view** when possible.',
    },
    {
      type: 'code',
      content: 'flatten vs ravel:',
      code: `import numpy as np\n\na = np.arange(6).reshape(2, 3)\n\nflat = a.flatten()\nflat[0] = 99\nprint(a)     # unchanged — flatten returned a copy\n\nrav = a.ravel()\nrav[0] = 99\nprint(a)     # modified! ravel returned a view`,
      output: `[[0 1 2]\n [3 4 5]]\n[[99  1  2]\n [ 3  4  5]]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Use `ravel()` when you want a fast 1D view and will not mutate the original. Use `flatten()` when you need a truly independent copy. `.reshape(-1)` is equivalent to ravel.',
    },
    {
      type: 'text',
      content:
        'Transpose flips rows and columns. `.T` is a view — no data is copied, just the strides are reinterpreted.',
    },
    {
      type: 'code',
      content: 'Transpose:',
      code: `import numpy as np\n\na = np.array([[1, 2, 3], [4, 5, 6]])\nprint(a.T)\nprint(a.T.shape)\n\n# For 3D, .T reverses ALL axes\nb = np.arange(24).reshape(2, 3, 4)\nprint(b.T.shape)    # (4, 3, 2)`,
      output: `[[1 4]\n [2 5]\n [3 6]]\n(3, 2)\n(4, 3, 2)`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`.T` for 3D+ reverses the order of ALL axes. That is rarely what you want. For swapping specific axes, use `np.swapaxes` or `np.transpose` with an explicit axes order.',
    },
    {
      type: 'code',
      content: 'Swap specific axes:',
      code: `import numpy as np\n\nb = np.arange(24).reshape(2, 3, 4)\nprint(b.swapaxes(0, 1).shape)            # swap first two → (3, 2, 4)\nprint(np.transpose(b, (1, 2, 0)).shape)  # full control → (3, 4, 2)`,
      output: `(3, 2, 4)\n(3, 4, 2)`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Stacking: `np.vstack` piles arrays vertically, `np.hstack` side by side, `np.concatenate` along any axis.',
    },
    {
      type: 'code',
      content: 'Stacking arrays:',
      code: `import numpy as np\n\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\n\nprint(np.vstack([a, b]))            # 2x3\nprint(np.hstack([a, b]))            # 1D of 6\n\nm1 = np.array([[1, 2], [3, 4]])\nm2 = np.array([[5, 6], [7, 8]])\nprint(np.concatenate([m1, m2], axis=0))\nprint(np.concatenate([m1, m2], axis=1))`,
      output: `[[1 2 3]\n [4 5 6]]\n[1 2 3 4 5 6]\n[[1 2]\n [3 4]\n [5 6]\n [7 8]]\n[[1 2 5 6]\n [3 4 7 8]]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`vstack` = concatenate along axis 0. `hstack` = concatenate along axis 1 (for 2D) or axis 0 (for 1D). `np.concatenate` is the general one.',
    },
    {
      type: 'text',
      content:
        'Insert a new axis with `np.newaxis` or `None`. This is how you turn a 1D array into a column or row vector for broadcasting.',
    },
    {
      type: 'code',
      content: 'Add axes with newaxis:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4])\nprint(a.shape)              # (4,)\nprint(a[:, np.newaxis].shape)   # (4, 1) — column vector\nprint(a[np.newaxis, :].shape)   # (1, 4) — row vector`,
      output: `(4,)\n(4, 1)\n(1, 4)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`a[:, None]` and `a[:, np.newaxis]` are identical — `None` is just shorter. This is the number one tool for making broadcasting work.',
    },
    {
      type: 'text',
      content:
        'Memory layout matters. NumPy uses **C-order** (row-major) by default — elements of the last axis are adjacent in memory. **F-order** (column-major) is used in some scientific code and by MATLAB.',
    },
    {
      type: 'code',
      content: 'C-order vs F-order:',
      code: `import numpy as np\n\nc = np.array([[1, 2, 3], [4, 5, 6]], order="C")\nf = np.array([[1, 2, 3], [4, 5, 6]], order="F")\n\nprint(c.ravel())       # row-major flatten\nprint(f.ravel())       # column-major flatten\nprint(c.flags["C_CONTIGUOUS"])\nprint(f.flags["F_CONTIGUOUS"])`,
      output: `[1 2 3 4 5 6]\n[1 4 2 5 3 6]\nTrue\nTrue`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Reshaping a non-contiguous array may need to copy. `a.T.reshape(-1)` can silently allocate. Use `a.ravel(order="K")` (keep layout) or `.copy()` when memory matters.',
    },
    {
      type: 'text',
      content:
        '`.shape` and `.reshape()` are how you traverse from vectors to matrices to tensors. Image data is `(height, width, channels)`. Batches are `(batch, height, width, channels)`. Now you can construct and reshape them all.',
    },
    {
      type: 'tip',
      content:
        'That is reshaping. Views vs copies, transpose, stacking, newaxis, memory order. Everything you will do with image data, time series and neural-net tensors is built from these.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What does this print?',
      code: 'import numpy as np\na = np.arange(12)\nprint(a.reshape(3, -1).shape)',
      options: ['(3, 4)', '(4, 3)', '(12,)', 'Error'],
      correct: 0,
      explanation:
        '`-1` lets NumPy infer the missing dimension. Since 12 / 3 = 4, the shape becomes (3, 4).',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: 'import numpy as np\na = np.arange(6).reshape(2, 3)\nb = a.ravel()\nb[0] = 99\nprint(a[0, 0])',
      options: ['0', '99', 'Error', 'None'],
      correct: 1,
      explanation:
        '`ravel()` returns a view when possible. Modifying b modifies the same memory as a, so a[0,0] becomes 99.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'What is the difference between `flatten()` and `ravel()`?',
      options: [
        'They are identical',
        '`flatten()` returns a copy; `ravel()` returns a view when possible',
        '`flatten()` only works on 2D arrays',
        '`ravel()` sorts the data',
      ],
      correct: 1,
      explanation:
        '`flatten()` always copies. `ravel()` returns a view if the memory allows, which is faster but means modifying it modifies the original.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so a 1D array becomes a column vector (4, 1):',
      code: 'import numpy as np\na = np.array([1, 2, 3, 4])\nprint(a[:, ___].shape)',
      options: ['np.newaxis', 'new', 'axis', 'add'],
      correct: 0,
      explanation:
        '`np.newaxis` (or `None`) inserts a new axis. `a[:, np.newaxis]` inserts one at position 1, giving shape (4, 1).',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `row_vector(a)` that takes a 1D NumPy array and returns it as a 1×N row vector (2D). Example: shape (4,) → (1, 4).',
      starterCode:
        'import numpy as np\n\ndef row_vector(a):\n    # your code here\n    pass',
      tests: [
        { input: 'row_vector(np.array([1, 2, 3, 4])).shape', expected: '(1, 4)' },
        { input: 'row_vector(np.array([5])).shape', expected: '(1, 1)' },
        { input: 'row_vector(np.array([1, 2, 3])).tolist()', expected: '[[1, 2, 3]]' },
      ],
      hint: 'Add a new axis at position 0: `a[np.newaxis, :]` or `a.reshape(1, -1)`.',
      solution:
        'import numpy as np\n\ndef row_vector(a):\n    return a[np.newaxis, :]',
      explanation:
        'Inserting an axis at position 0 turns (N,) into (1, N). Both `a[np.newaxis, :]` and `a.reshape(1, -1)` work — newaxis returns a view, reshape is a general tool.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create a 3x4 array of zeros, transpose it (making it 4x3), and print its shape.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '(4, 3)',
      hint: 'a = np.zeros((3, 4)); b = a.T; print(b.shape)',
      solution:
        'import numpy as np\na = np.zeros((3, 4))\nb = a.T\nprint(b.shape)',
      explanation:
        '`.T` swaps the axes. A 3×4 becomes 4×3. The transpose is a view — no data was copied.',
      xp: 25,
    },
  ],
};