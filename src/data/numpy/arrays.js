// 📘 NumPy — Lesson 1: Arrays, dtypes & creation

export const numpyArraysLesson = {
  id: 'numpy-arrays',
  title: 'NumPy Arrays — Why & How',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'A NumPy array is a contiguous block of same-typed values. That single design choice is why it is 50-100x faster than a Python list for numeric work.',
  sections: [
    {
      type: 'text',
      content:
        'NumPy (Numerical Python) is the foundation of every data-science library in Python. Pandas, scikit-learn, TensorFlow, PyTorch — all built on it. Its core type is `ndarray` — an N-dimensional array.',
    },
    {
      type: 'text',
      content:
        'A Python list is a scattered collection of pointers, each pointing to an object with its own type tag. A NumPy array is a single contiguous block of memory, all elements the same type. That difference is everything.',
    },
    {
      type: 'code',
      content: 'Why NumPy is fast — a demo:',
      code: `import numpy as np\nimport time\n\nN = 1_000_000\n\n# List version\nlst = list(range(N))\nt0 = time.time()\nlist_result = [x * 2 for x in lst]\nt1 = time.time()\nprint(f"list: {t1 - t0:.3f}s")\n\n# NumPy version\narr = np.arange(N)\nt0 = time.time()\narr_result = arr * 2\nt1 = time.time()\nprint(f"numpy: {t1 - t0:.4f}s")`,
      output: 'list: 0.048s\nnumpy: 0.0031s',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'That "do it to the whole array at once" style is called **vectorization**. NumPy hands the loop to pre-compiled C code — no Python interpreter overhead per element.',
    },
    {
      type: 'warning',
      content:
        'Switching to NumPy but still writing `for x in arr: result.append(...)` defeats the point. If you find yourself looping over a NumPy array element-by-element, there is almost always a vectorized version.',
    },
    {
      type: 'text',
      content:
        'Create an array with `np.array()` from a Python list. For a flat list you get a 1D array; for a list of lists you get a 2D array.',
    },
    {
      type: 'code',
      content: 'Your first arrays:',
      code: `import numpy as np\n\na1 = np.array([1, 2, 3, 4, 5])\na2 = np.array([[1, 2, 3], [4, 5, 6]])\n\nprint(a1)\nprint(a1.shape)\nprint(a2)\nprint(a2.shape)`,
      output: `[1 2 3 4 5]\n(5,)\n[[1 2 3]\n [4 5 6]]\n(2, 3)`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'NumPy arrays are **homogeneous** — every element has one type. Mix types and NumPy coerces them using this priority: `bool → int → float → complex → str → object`.',
    },
    {
      type: 'code',
      content: 'Automatic type coercion:',
      code: `import numpy as np\n\nprint(np.array([1, 2, 3]))              # all ints\nprint(np.array([1, 2, 3.5]))            # ints promote to float\nprint(np.array([1, "hello", True]))     # everything becomes string\nprint(np.array([True, False, True]))    # bools`,
      output: `[1 2 3]\n[1.  2.  3.5]\n['1' 'hello' 'True']\n[ True False  True]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'NumPy does NOT error on mixed types — it silently converts. `np.array([1, "hello"])` gives you `array([\'1\', \'hello\'])`, not an error. If you expected numbers, you just lost them.',
    },
    {
      type: 'text',
      content:
        'Common generators: `np.zeros`, `np.ones`, `np.full`, `np.eye`. The shape is a **single tuple** argument.',
    },
    {
      type: 'code',
      content: 'The generator family:',
      code: `import numpy as np\n\nprint(np.zeros((2, 3)))            # all zeros\nprint(np.ones((2, 3)))             # all ones\nprint(np.full((2, 3), 7))          # all sevens\nprint(np.eye(3))                   # 3x3 identity\nprint(np.identity(3))              # same idea, always square\nprint(np.diag([1, 2, 3]))          # diagonal matrix`,
      output: `[[0. 0. 0.]\n [0. 0. 0.]]\n[[1. 1. 1.]\n [1. 1. 1.]]\n[[7 7 7]\n [7 7 7]]\n[[1. 0. 0.]\n [0. 1. 0.]\n [0. 0. 1.]]\n[[1. 0. 0.]\n [0. 1. 0.]\n [0. 0. 1.]]\n[[1 0 0]\n [0 2 0]\n [0 0 3]]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`np.zeros(3, 3)` is a bug — the shape is ONE tuple. Write `np.zeros((3, 3))` with the extra parentheses. The first version silently does something else.',
    },
    {
      type: 'note',
      content:
        '`np.empty` gives uninitialized memory — whatever was in RAM before. Faster than `zeros` if you plan to overwrite everything immediately. Never assume empty arrays are zero.',
    },
    {
      type: 'code',
      content: 'Uninitialized vs zeroed:',
      code: `import numpy as np\nprint(np.zeros((2, 2)))\nprint(np.empty((2, 2)))   # could be anything`,
      output: `[[0. 0.]\n [0. 0.]]\n[[3.5e-323 3.5e-323]\n [3.5e-323 3.5e-323]]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Sequences: `np.arange` is like Python range but returns an array. `np.linspace` gives evenly-spaced points including both ends. `np.logspace` spaces on a log scale.',
    },
    {
      type: 'code',
      content: 'Sequence generators:',
      code: `import numpy as np\n\nprint(np.arange(0, 10, 2))         # step by 2\nprint(np.linspace(0, 1, 5))        # 5 points, 0 to 1 inclusive\nprint(np.linspace(0, 1, 5, endpoint=False))  # exclude final endpoint\nprint(np.logspace(0, 2, 3))        # 10^0, 10^1, 10^2`,
      output: `[0 2 4 6 8]\n[0.   0.25 0.5  0.75 1.  ]\n[0.  0.2 0.4 0.6 0.8]\n[  1.  10. 100.]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Rule of thumb: use `arange` when you know the step size, `linspace` when you know the number of points. `linspace` is safer for floats — `arange` accumulates floating-point error.',
    },
    {
      type: 'text',
      content:
        'Every array has attributes you will use constantly: `.shape`, `.ndim`, `.size`, `.dtype`, `.itemsize`, `.nbytes`, `.T`.',
    },
    {
      type: 'code',
      content: 'Array attributes:',
      code: `import numpy as np\n\na = np.random.randint(0, 10, size=(6, 6))\n\nprint(a.shape)      # (rows, cols)\nprint(a.ndim)       # number of dimensions\nprint(a.size)       # total elements\nprint(a.dtype)      # element type\nprint(a.itemsize)   # bytes per element\nprint(a.nbytes)     # size * itemsize\nprint(a.T.shape)    # transposed shape`,
      output: `(6, 6)\n2\n36\nint64\n8\n288\n(6, 6)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`.shape` is always a tuple. `.size` equals `np.prod(shape)`. `.nbytes = size × itemsize`. These three are the fastest way to reason about memory.',
    },
    {
      type: 'text',
      content:
        'Force a specific dtype with `dtype=`. Useful for memory control and cross-language compatibility.',
    },
    {
      type: 'code',
      content: 'Explicit dtype control:',
      code: `import numpy as np\n\nprint(np.array([1, 2, 3], dtype=np.float32))\nprint(np.array([1, 2, 3], dtype=np.int16))\nprint(np.array([1, 0, 1], dtype=np.bool_))\n\n# Convert later\nints = np.array([1.9, 2.5, 3.1])\nprint(ints.astype(np.int32))    # truncates, does not round`,
      output: `[1. 2. 3.]\n[1 2 3]\n[ True False  True]\n[1 2 3]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`astype(int)` truncates toward zero — `2.9` becomes 2, not 3. To round, use `np.round(arr).astype(int)` separately.',
    },
    {
      type: 'tip',
      content:
        'That is the base. Arrays, dtypes, shapes, generators, attributes. Now you can create any array you need — next lessons cover how to slice, reshape and compute.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Why is a NumPy array dramatically faster than a Python list for numeric work?',
      options: [
        'It stores fewer elements',
        'It uses a contiguous block of same-typed memory, so operations run in pre-compiled C code',
        'It skips the interpreter entirely',
        'It compresses the data',
      ],
      correct: 1,
      explanation:
        'Contiguous memory + homogeneous types let NumPy hand whole operations to optimized C loops. No per-element Python object overhead, no type checking inside the loop.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What is the output?',
      code: 'import numpy as np\nprint(np.array([1, "hello", True]))',
      options: [
        "array([1, 'hello', True])",
        "array(['1', 'hello', 'True'])",
        "Error",
        "array([1, 'hello', 1])",
      ],
      correct: 1,
      explanation:
        'NumPy coerces to the highest type that can hold all values. Since "hello" cannot be a number, everything becomes a string. Silent conversion, no error.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-fill',
      question: 'Fill the blank so we build a 4x4 array of fives:',
      code: 'import numpy as np\na = np.___((4, 4), 5)\nprint(a[0, 0])',
      options: ['full', 'zeros', 'ones', 'fill'],
      correct: 0,
      explanation:
        '`np.full(shape, value)` fills an array with any value. `np.zeros` and `np.ones` are just shorthand for 0 and 1.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write a function `make_eye(n)` that returns an n×n identity matrix (1s on the diagonal, 0s elsewhere). Use NumPy.',
      starterCode:
        'import numpy as np\n\ndef make_eye(n):\n    # your code here\n    pass',
      tests: [
        { input: 'make_eye(3).tolist()', expected: '[[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]' },
        { input: 'make_eye(1).tolist()', expected: '[[1.0]]' },
        { input: 'make_eye(2).shape', expected: '(2, 2)' },
      ],
      hint: 'Use `np.eye(n)` — NumPy ships an identity-matrix generator.',
      solution: 'import numpy as np\n\ndef make_eye(n):\n    return np.eye(n)',
      explanation:
        '`np.eye(n)` builds the n×n identity. `np.identity(n)` is the same idea but always square and only takes one arg.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'output-match',
      question:
        'Create a NumPy array `np.arange(0, 10, 2)` and print it. Then print its `.shape`.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[0 2 4 6 8]\n(5,)',
      hint: 'a = np.arange(0, 10, 2); print(a); print(a.shape)',
      solution: 'import numpy as np\na = np.arange(0, 10, 2)\nprint(a)\nprint(a.shape)',
      explanation:
        '`arange(0, 10, 2)` gives `[0, 2, 4, 6, 8]` — 5 elements. Shape is a 1-tuple, printed as `(5,)`.',
      xp: 25,
    },
  ],
};