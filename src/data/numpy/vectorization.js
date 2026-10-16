// 📘 NumPy — Lesson 4: Vectorization & Element-wise Operations

export const numpyVectorizationLesson = {
  id: 'numpy-vectorization',
  title: 'Vectorization & Element-wise Operations',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Vectorization means applying an operation to a whole array at once. No loops, no interpreter overhead — just one call that runs in fast C code underneath.',
  sections: [
    {
      type: 'text',
      content:
        'Every arithmetic operator (+ - * / // % **) applies element-wise to NumPy arrays. No loop needed.',
    },
    {
      type: 'code',
      content: 'Element-wise arithmetic:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4])\nb = np.array([10, 20, 30, 40])\n\nprint(a + b)     # add\nprint(a - b)     # subtract\nprint(a * b)     # multiply\nprint(b / a)     # divide\nprint(b // a)    # floor divide\nprint(b % a)     # modulo\nprint(a ** 2)    # power`,
      output: `[11 22 33 44]\n[ -9 -18 -27 -36]\n[ 10  40  90 160]\n[10. 10. 10. 10.]\n[10 10 10 10]\n[0 0 0 0]\n[ 1  4  9 16]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The arrays must have the same shape for element-wise arithmetic — OR be broadcast-compatible. We will cover broadcasting properly in lesson 6.',
    },
    {
      type: 'text',
      content:
        'Scalars broadcast automatically — you can mix an array with a plain number, and NumPy applies the operation to every element.',
    },
    {
      type: 'code',
      content: 'Array + scalar:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4])\n\nprint(a + 10)      # add 10 to every element\nprint(a * 3)       # multiply every element by 3\nprint(a ** 2)      # square every element\nprint(a > 2)       # boolean mask`,
      output: `[11 12 13 14]\n[ 3  6  9 12]\n[ 1  4  9 16]\n[False False  True  True]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Math functions are also vectorized: `np.sqrt`, `np.exp`, `np.log`, `np.abs`, `np.sin`, `np.cos`. Give them an array, get back an array.',
    },
    {
      type: 'code',
      content: 'Vectorized math functions:',
      code: `import numpy as np\n\na = np.array([1, 4, 9, 16, 25])\nprint(np.sqrt(a))\nprint(np.log(a))         # natural log\nprint(np.exp(np.array([0, 1, 2])))\n\nb = np.array([-3.7, -1.2, 0, 2.5, 4.8])\nprint(np.abs(b))\nprint(np.round(b))\nprint(np.floor(b))\nprint(np.ceil(b))`,
      output: `[1. 2. 3. 4. 5.]\n[0.         1.38629436 2.19722458 2.77258872 3.21887582]\n[1.         2.71828183 7.3890561 ]\n[3.7 1.2 0.  2.5 4.8]\n[-4. -1.  0.  2.  5.]\n[-4. -2.  0.  2.  4.]\n[-3. -1.  0.  3.  5.]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`np.round` uses banker\'s rounding (round-half-to-even) — `0.5` rounds to 0, `1.5` rounds to 2, `2.5` rounds to 2. This is different from Python\'s `round()` and can surprise you.',
    },
    {
      type: 'text',
      content:
        'Trigonometry works on radians. Combine with `np.pi` for common angles.',
    },
    {
      type: 'code',
      content: 'Trig functions:',
      code: `import numpy as np\n\nangles = np.array([0, np.pi / 2, np.pi])\nprint(np.sin(angles))\nprint(np.cos(angles))\nprint(np.tan(np.array([0, np.pi / 4])))`,
      output: `[0.0000000e+00 1.0000000e+00 1.2246468e-16]\n[ 1.000000e+00  6.123234e-17 -1.000000e+00]\n[0.         0.99999999]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice `np.sin(np.pi)` gives `1.22e-16`, not `0.0`. This is float imprecision — the true value is 0 but IEEE 754 cannot represent it exactly. Never compare against `0.0` with `==`; use `np.isclose`.',
    },
    {
      type: 'text',
      content:
        '`np.clip(arr, low, high)` clamps every element into a range. Great for capping values.',
    },
    {
      type: 'code',
      content: 'np.clip — clamp to a range:',
      code: `import numpy as np\n\nscores = np.array([45, 72, 88, 95, 60])\nprint(np.clip(scores, 50, 90))     # below 50 → 50, above 90 → 90\n\nraw = np.array([-2.5, 0.3, 1.9, 3.4])\nprint(raw.clip(0, 2))               # method form`,
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
        'Vectorized comparisons return boolean arrays. Combine with `&`, `|`, `~` — never Python `and` / `or`.',
    },
    {
      type: 'code',
      content: 'Element-wise comparison:',
      code: `import numpy as np\n\na = np.array([3, 8, 1, 9, 4, 7])\n\nprint(a > 5)\nprint(a == 4)\nprint((a > 3) & (a < 8))       # between 3 and 8 exclusive\nprint(~(a > 5))                 # NOT`,
      output: `[False  True False  True False  True]\n[False False False False  True False]\n[False False False False  True  True]\n[ True False  True False  True False]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Python `and` / `or` on NumPy arrays raise "truth value of an array is ambiguous" errors. Always use `&` / `|` / `~` with parentheses around each condition.',
    },
    {
      type: 'text',
      content:
        '`np.where(cond, x, y)` is element-wise if/else. Returns x where cond is True, y elsewhere. Both branches are evaluated fully.',
    },
    {
      type: 'code',
      content: 'np.where — vectorized ternary:',
      code: `import numpy as np\n\na = np.array([3, 8, 1, 9, 4, 7])\nprint(np.where(a > 5, "big", "small"))\nprint(np.where(a > 5, a * 10, a))\nprint(np.where(a > 5, 1, 0))`,
      output: `['small' 'big' 'small' 'big' 'small' 'big']\n[ 3 80  1 90  4 70]\n[0 1 0 1 0 1]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Vectorization is not just shorter — it is dramatically faster. Compare a list loop against a vectorized operation on a million elements.',
    },
    {
      type: 'code',
      content: 'Loop vs vectorized — the speedup:',
      code: `import numpy as np\nimport time\n\nN = 1_000_000\n\na_list = list(range(N))\nt0 = time.time()\nout_list = [x ** 2 + 2 * x + 1 for x in a_list]\nt1 = time.time()\n\narr = np.arange(N)\nt0 = time.time()\nout_arr = arr ** 2 + 2 * arr + 1\nt1 = time.time()\nprint(f"list: {t1 - t0:.3f}s")\nprint(f"numpy: {t1 - t0:.4f}s")`,
      output: 'list: 0.080s\nnumpy: 0.0050s',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is vectorization. One rule to remember: if you write `for x in arr:` in NumPy, pause and search for the vectorized version first. There is almost always one.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What does this print?',
      code: 'import numpy as np\na = np.array([1, 2, 3, 4])\nprint(a * 2 + 1)',
      options: ['[3 5 7 9]', '[2 4 6 8]', '[1 2 3 4]', 'Error'],
      correct: 0,
      explanation:
        'Element-wise: a * 2 = [2, 4, 6, 8], then + 1 = [3, 5, 7, 9]. Scalars broadcast automatically.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What is the output?',
      code: 'import numpy as np\na = np.array([1, 4, 9, 16])\nprint(np.sqrt(a))',
      options: ['[1 2 3 4]', '[1. 2. 3. 4.]', '[1, 2, 3, 4]', 'Error'],
      correct: 1,
      explanation:
        '`np.sqrt` always returns a float array. `[1. 2. 3. 4.]` is the correct float representation — dots matter.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You have an array `a = np.array([3, 8, 1, 9, 4, 7])`. Which expression keeps elements between 3 and 8 exclusive?',
      options: [
        'a[3 < a and a < 8]',
        'a[(a > 3) & (a < 8)]',
        'a[3 < a < 8]',
        'a.filter(3, 8)',
      ],
      correct: 1,
      explanation:
        'Use `&` for combining conditions, with parentheses around each. Python `and` fails on arrays, and chained comparison `3 < a < 8` also fails.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so values below 0 become 0 and above 100 become 100:',
      code: 'import numpy as np\na = np.array([-5, 50, 150])\nprint(np.___(a, 0, 100))',
      options: ['clip', 'cap', 'limit', 'bound'],
      correct: 0,
      explanation:
        '`np.clip(arr, low, high)` clamps every element into the range [low, high]. Elements outside become low or high.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `normalize(arr)` that returns `(arr - min) / (max - min)`. This scales any array to the range [0, 1].',
      starterCode:
        'import numpy as np\n\ndef normalize(arr):\n    # your code here\n    pass',
      tests: [
        {
          input: 'normalize(np.array([0, 5, 10])).tolist()',
          expected: '[0.0, 0.5, 1.0]',
        },
        {
          input: 'normalize(np.array([2, 2, 2])).shape',
          expected: '(3,)',
        },
        {
          input: 'normalize(np.array([-1, 0, 1])).tolist()',
          expected: '[0.0, 0.5, 1.0]',
        },
      ],
      hint: 'Compute min and max with built-ins, then vectorize: `(arr - arr.min()) / (arr.max() - arr.min())`.',
      solution:
        'import numpy as np\n\ndef normalize(arr):\n    return (arr - arr.min()) / (arr.max() - arr.min())',
      explanation:
        'Min-max normalization — the standard scaling technique. Works with negatives, works with duplicates. In lesson 6 we will see how broadcasting makes this even more powerful across matrices.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `np.array([1, 2, 3, 4, 5])`, square every element, and print the result.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[ 1  4  9 16 25]',
      hint: 'a = np.array([1,2,3,4,5]); print(a ** 2)',
      solution:
        'import numpy as np\na = np.array([1, 2, 3, 4, 5])\nprint(a ** 2)',
      explanation:
        'The `**` operator works element-wise. Notice the output formatting — NumPy pads with spaces to align columns when numbers have different digit counts.',
      xp: 20,
    },
  ],
};