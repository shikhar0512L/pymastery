// 📘 NumPy — Universal Functions (ufuncs)

export const ufuncsLesson = {
  id: 'ufuncs',
  title: 'Universal Functions (ufuncs)',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'A ufunc is a function that operates element-wise on a whole array at once. sqrt, exp, log, sin, cos, clip — the mathematical vocabulary of NumPy.',
  sections: [
    {
      type: 'text',
      content:
        'A ufunc ("universal function") is a NumPy function that applies to a whole array in one call, element by element, in pre-compiled C. Every +, -, *, / you have used is secretly a ufunc under the hood.',
    },
    {
      type: 'code',
      content: 'The arithmetic ufuncs — function forms:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4])\nb = np.array([10, 20, 30, 40])\n\nprint(np.add(a, b))\nprint(np.subtract(b, a))\nprint(np.multiply(a, b))\nprint(np.divide(b, a))\nprint(np.power(a, 2))\nprint(np.mod(b, a))`,
      output: `[11 22 33 44]\n[ 9 18 27 36]\n[ 10  40  90 160]\n[10. 10. 10. 10.]\n[ 1  4  9 16]\n[0 0 0 0]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`np.add(a, b)` and `a + b` are equivalent. NumPy routes the operators through these ufuncs. The function form is useful when you need to pass a ufunc as an argument to something else.',
    },
    {
      type: 'text',
      content:
        'The real power is in the mathematical ufuncs: sqrt, exp, log, abs, sin, cos, tan — anything that applies a formula to each element.',
    },
    {
      type: 'code',
      content: 'Element-wise math — no loops anywhere:',
      code: `import numpy as np\n\na = np.array([1, 4, 9, 16, 25])\nprint(np.sqrt(a))\nprint(np.exp(np.array([0, 1, 2])))\nprint(np.log(a))\nprint(np.abs(np.array([-3.7, -1.2, 0, 2.5])))`,
      output: `[1. 2. 3. 4. 5.]\n[1.         2.71828183 7.3890561 ]\n[0.         1.38629436 2.19722458 2.77258872 3.21887582]\n[3.7 1.2 0.  2.5]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Use `np.sqrt`, NOT `math.sqrt`. The `math` module version expects a single number and will crash on an array. The np version is designed for whole arrays.',
    },
    {
      type: 'text',
      content:
        'Trigonometry works in radians. Combine with `np.pi` for common angles.',
    },
    {
      type: 'code',
      content: 'Trig ufuncs:',
      code: `import numpy as np\n\nangles = np.array([0, np.pi / 2, np.pi])\nprint(np.sin(angles))\nprint(np.cos(angles))\nprint(np.tan(np.array([0, np.pi / 4])))`,
      output: `[0.0000000e+00 1.0000000e+00 1.2246468e-16]\n[ 1.000000e+00  6.123234e-17 -1.000000e+00]\n[0.         0.99999999]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice `np.sin(np.pi)` gives `1.22e-16`, not exactly `0`. This is float imprecision — the true value is 0 but IEEE 754 cannot represent it exactly. Never compare against `0.0` with `==`; use `np.isclose`.',
    },
    {
      type: 'text',
      content:
        'NaN behavior: when a ufunc cannot produce a real result (like sqrt of a negative), it returns nan and issues a warning — but does NOT crash. The rest of the array is processed normally.',
    },
    {
      type: 'code',
      content: 'sqrt of a negative — nan, not a crash:',
      code: `import numpy as np\n\na = np.array([-4, 1, 4, 9, 16])\nprint(np.sqrt(a))\nprint(np.isnan(np.sqrt(a)))`,
      output: `[nan  1.  2.  3.  4.]\n[ True False False False False]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Use `np.isnan(arr)` to find where the nan values are. Use `np.nan_to_num(arr, nan=0)` to replace them. Both are essential when working with real data that has missing values.',
    },
    {
      type: 'text',
      content:
        'Rounding family: round, floor, ceil, trunc. Each behaves slightly differently, and `np.round` uses banker\'s rounding.',
    },
    {
      type: 'code',
      content: 'Rounding — subtle differences:',
      code: `import numpy as np\n\nb = np.array([-3.7, -1.2, 0.5, 1.5, 2.5, 4.8])\nprint(np.round(b))\nprint(np.floor(b))\nprint(np.ceil(b))\nprint(np.trunc(b))`,
      output: `[-4. -1.  0.  2.  2.  5.]\n[-4. -2.  0.  1.  2.  4.]\n[-3. -1.  1.  2.  3.  5.]\n[-3. -1.  0.  1.  2.  4.]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`np.round` uses banker\'s rounding (round-half-to-even): 0.5 → 0, 1.5 → 2, 2.5 → 2. This is different from Python\'s `round()` and can surprise you. If you need traditional round-half-up, add a tiny epsilon or use `np.floor(x + 0.5)`.',
    },
    {
      type: 'text',
      content:
        '`np.clip(arr, low, high)` clamps every element into a range. The vectorized version of "cap the values".',
    },
    {
      type: 'code',
      content: 'np.clip — the clamp operation:',
      code: `import numpy as np\n\nscores = np.array([45, 72, 88, 95, 60])\nprint(np.clip(scores, 50, 90))\n\nraw = np.array([-2.5, 0.3, 1.9, 3.4])\nprint(raw.clip(0, 2))`,
      output: `[50 72 88 90 60]\n[0.  0.3 1.9 2. ]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`np.clip` is the vectorized version of ReLU-like caps. You will write it constantly in data cleaning and ML pre-processing.',
    },
    {
      type: 'text',
      content:
        'Every ufunc accepts special keyword arguments. `where=` restricts the operation to elements matching a mask. `out=` writes the result into an existing array instead of allocating a new one.',
    },
    {
      type: 'code',
      content: 'where= and out= — advanced usage:',
      code: `import numpy as np\n\na = np.array([1, -2, 3, -4, 5])\n\n# Only take sqrt where a is positive\nresult = np.sqrt(a, where=a > 0, out=np.zeros_like(a, dtype=float))\nprint(result)\n\n# Reuse an existing array for output (saves memory)\ndest = np.empty(5)\nnp.multiply(a, 2, out=dest)\nprint(dest)`,
      output: `[1.         0.         1.73205081 0.         2.23606798]\n[  2.  -4.   6.  -8.  10.]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'When using `where=`, you must supply `out=` too — otherwise the untouched positions get whatever was already in memory. This is a common source of confusing bugs.',
    },
    {
      type: 'text',
      content:
        'That is ufuncs. Element-wise math, NaN handling, rounding, clipping, and the advanced where/out arguments. Every numeric operation you will do in NumPy is a ufunc.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is a ufunc in NumPy?',
      options: [
        'A function that only works on 1D arrays',
        'A function that operates element-wise on a whole array at once, in pre-compiled C',
        'A user-defined function',
        'A function that only works on scalars',
      ],
      correct: 1,
      explanation:
        'Ufuncs (universal functions) apply element-wise to entire arrays without Python loops. They are the mechanism behind every NumPy operator and math function.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'import numpy as np\na = np.array([-4, 4, -9, 9])\nprint(np.sqrt(a))',
      options: [
        '[nan 2. nan 3.]',
        '[2. 2. 3. 3.]',
        'Error — sqrt does not allow negative inputs',
        '[0. 2. 0. 3.]',
      ],
      correct: 0,
      explanation:
        'np.sqrt on a negative number returns nan (not a number) with a warning, but does NOT crash. The rest of the array is still processed.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'import numpy as np\nprint(np.round([0.5, 1.5, 2.5, 3.5]))',
      options: ['[0. 2. 2. 4.]', '[1. 2. 3. 4.]', '[0. 1. 2. 3.]', 'Error'],
      correct: 0,
      explanation:
        'np.round uses banker\'s rounding (round-half-to-even). 0.5 → 0, 1.5 → 2, 2.5 → 2, 3.5 → 4. This is different from the round-half-up rule you might expect.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so values below 0 become 0 and above 100 become 100:',
      code: 'import numpy as np\na = np.array([-5, 50, 150])\nprint(np.____(a, 0, 100))',
      options: ['clip', 'cap', 'limit', 'bound'],
      correct: 0,
      explanation:
        '`np.clip(arr, low, high)` clamps every element into the range [low, high]. Below → low, above → high, inside → unchanged.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `sigmoid(x)` that returns 1 / (1 + exp(-x)) applied element-wise. Use NumPy — do not write a loop. Handle negative inputs correctly.',
      starterCode:
        'import numpy as np\n\ndef sigmoid(x):\n    # your code here\n    pass',
      tests: [
        { input: 'round(sigmoid(np.array([0]))[0], 4)', expected: '0.5' },
        { input: 'round(sigmoid(np.array([1]))[0], 4)', expected: '0.7311' },
        { input: 'round(sigmoid(np.array([-1]))[0], 4)', expected: '0.2689' },
        {
          input: 'sigmoid(np.array([0, 1, -1])).shape',
          expected: '(3,)',
        },
      ],
      hint: 'Use `1 / (1 + np.exp(-x))`. NumPy broadcasts the operations across the array.',
      solution:
        'import numpy as np\n\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))',
      explanation:
        'Sigmoid is the workhorse of binary classification and neural networks. Written with ufuncs, it applies to a whole batch in one line — no loops.',
      xp: 35,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `np.array([1, 4, 9, 16, 25])` and print its square root.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[1. 2. 3. 4. 5.]',
      hint: 'Use np.sqrt on the array.',
      solution:
        'import numpy as np\na = np.array([1, 4, 9, 16, 25])\nprint(np.sqrt(a))',
      explanation:
        '`np.sqrt` is a ufunc — one call, applied element-wise. The result is a float array even though the inputs are all perfect squares.',
      xp: 25,
    },
  ],
};