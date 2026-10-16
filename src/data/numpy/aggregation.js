// 📘 NumPy — Lesson 5: Aggregation & Axis-wise Operations

export const numpyAggregationLesson = {
  id: 'numpy-aggregation',
  title: 'Aggregation & Axis-wise Operations',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Reduce an array to a single number, or one row/column of numbers. This is where the axis parameter becomes the most important idea in NumPy.',
  sections: [
    {
      type: 'text',
      content:
        'Aggregation functions collapse an array into a summary: sum, mean, std, var, min, max, median, prod. No loop needed.',
    },
    {
      type: 'code',
      content: 'Global aggregations:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4, 5, 6])\n\nprint(a.sum())\nprint(a.mean())\nprint(a.std())\nprint(a.var())\nprint(a.min())\nprint(a.max())\nprint(a.prod())\nprint(np.median(a))`,
      output: `21\n3.5\n1.707825127659933\n2.9166666666666665\n1\n6\n720\n3.5`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`a.mean()` is the same as `np.mean(a)`. Methods are available for the common ones; `median`, `percentile`, `quantile` are module-level functions only.',
    },
    {
      type: 'text',
      content:
        '`argmin` and `argmax` return the INDEX of the smallest/largest element, not the value.',
    },
    {
      type: 'code',
      content: 'argmin / argmax — positional:',
      code: `import numpy as np\n\na = np.array([3, 1, 4, 1, 5, 9, 2])\nprint(a.argmin())\nprint(a.argmax())\nprint(a[a.argmax()])    # the value at the max index`,
      output: `1\n5\n9`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'On ties, `argmax` returns the FIRST index — not the last. Same for `argmin`. If order matters, use `np.argsort` instead.',
    },
    {
      type: 'text',
      content:
        '`any` and `all` reduce a boolean array to a single True/False. Very useful with masks.',
    },
    {
      type: 'code',
      content: 'any / all:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4, 5])\nprint(np.any(a > 4))\nprint(np.all(a > 0))\nprint(np.all(a > 2))\n\nmask = a > 3\nprint(np.any(mask))\nprint(np.sum(mask))    # True counts as 1`,
      output: `True\nTrue\nFalse\nTrue\n2`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`np.sum(mask)` returns the COUNT of True values. This is the fastest way to count how many elements match a condition.',
    },
    {
      type: 'text',
      content:
        'Now the important part — **the axis parameter**. For a 2D array, `axis=0` collapses rows (result per column), `axis=1` collapses columns (result per row).',
    },
    {
      type: 'code',
      content: 'Axis in 2D — the mental model:',
      code: `import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\n# axis=0 → collapse rows → result has one entry per COLUMN\nprint(a.sum(axis=0))    # [1+4, 2+5, 3+6]\n\n# axis=1 → collapse columns → result has one entry per ROW\nprint(a.sum(axis=1))    # [1+2+3, 4+5+6]\n\n# No axis → collapse everything\nprint(a.sum())          # sum of all`,
      output: `[5 7 9]\n[ 6 15]\n21`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Mnemonic: "axis=0 collapses axis 0 (rows); the surviving shape is per-column." Or think: "axis=0 means go DOWN each column and aggregate."',
    },
    {
      type: 'code',
      content: 'Axis with mean and std:',
      code: `import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\nprint(a.mean(axis=0))   # mean of each column\nprint(a.mean(axis=1))   # mean of each row\nprint(a.std(axis=0))\nprint(a.max(axis=1))`,
      output: `[2.5 3.5 4.5]\n[2. 5.]\n[1.5 1.5 1.5]\n[3 6]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`argmax(axis=1)` returns the index of the max within each row. This is the classic "pick the winning class" operation in ML.',
    },
    {
      type: 'code',
      content: 'argmax over an axis:',
      code: `import numpy as np\n\n# 3 samples, 4 classes → predicted class per sample\nprobs = np.array([[0.1, 0.2, 0.6, 0.1],\n                  [0.7, 0.1, 0.1, 0.1],\n                  [0.2, 0.3, 0.3, 0.2]])\n\nprint(probs.argmax(axis=1))   # one index per row`,
      output: `[2 0 1]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`probs.argmax(axis=1)` is how you turn a matrix of probabilities into predicted labels. It appears in almost every classification pipeline.',
    },
    {
      type: 'text',
      content:
        '`keepdims=True` preserves the reduced axis as size 1. Useful for broadcasting the result back.',
    },
    {
      type: 'code',
      content: 'keepdims — for broadcasting back:',
      code: `import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\nprint(a.sum(axis=1).shape)             # (2,)\nprint(a.sum(axis=1, keepdims=True).shape)  # (2, 1)\n\n# Now we can subtract the row-sum from each row\nrow_sums = a.sum(axis=1, keepdims=True)\nprint(a - row_sums)`,
      output: `(2,)\n(2, 1)\n[[-5 -4 -3]\n [-4 -3 -2]]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`keepdims=True` is why it exists: without it, you cannot broadcast the aggregate back to the original shape. With it, `a - a.mean(axis=1, keepdims=True)` centers each row in one line.',
    },
    {
      type: 'text',
      content:
        'Cumulative operations: `cumsum`, `cumprod`. They return an array of the same shape — running totals.',
    },
    {
      type: 'code',
      content: 'cumsum / cumprod:',
      code: `import numpy as np\n\na = np.array([1, 2, 3, 4, 5])\nprint(a.cumsum())      # [1, 1+2, 1+2+3, ...]\nprint(a.cumprod())     # [1, 1*2, 1*2*3, ...]\n\nb = np.array([[1, 2, 3], [4, 5, 6]])\nprint(b.cumsum(axis=1))    # running total per row`,
      output: `[ 1  3  6 10 15]\n[  1   2   6  24 120]\n[[ 1  3  6]\n [ 4  9 15]]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Percentiles and quantiles answer "what value splits the data at X%?". Used heavily in data analysis and outlier detection.',
    },
    {
      type: 'code',
      content: 'Percentiles:',
      code: `import numpy as np\n\na = np.arange(1, 101)   # 1 to 100\n\nprint(np.percentile(a, 25))    # first quartile\nprint(np.percentile(a, 50))    # median\nprint(np.percentile(a, 75))    # third quartile\nprint(np.percentile(a, [25, 50, 75]))   # all at once\n\nprint(np.quantile(a, [0.25, 0.5, 0.75]))`,
      output: `25.75\n50.5\n75.25\n[25.75 50.5  75.25]\n[25.75 50.5  75.25]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`percentile(a, p)` uses 0-100. `quantile(a, q)` uses 0-1. They are the same thing — `percentile(a, 50) == quantile(a, 0.5)`.',
    },
    {
      type: 'text',
      content:
        'NaN-aware variants: `np.nanmean`, `np.nansum`, `np.nanmax` ignore NaN values. Very common in real datasets.',
    },
    {
      type: 'code',
      content: 'NaN-aware aggregations:',
      code: `import numpy as np\n\na = np.array([1.0, np.nan, 3.0, np.nan, 5.0])\nprint(a.mean())          # NaN propagates\nprint(np.nanmean(a))     # ignores NaN\nprint(np.nansum(a))\nprint(np.nanmax(a))\n\nprint(np.isnan(a))       # mask of NaNs`,
      output: `nan\n3.0\n9.0\n5.0\n[False  True False  True False]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'A single `NaN` in an array makes `mean`, `std`, `min`, `max` return NaN for the whole array. Always use `np.nan*` variants when your data might have missing values.',
    },
    {
      type: 'tip',
      content:
        'That is aggregation. Axis, keepdims, cumsum, percentile, NaN-aware — this is the full vocabulary. Every DataFrame operation you will use in Pandas has a NumPy equivalent underneath.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What does this print?',
      code: 'import numpy as np\na = np.array([[1, 2], [3, 4]])\nprint(a.sum(axis=0))',
      options: ['[3 7]', '[4 6]', '10', 'Error'],
      correct: 1,
      explanation:
        '`axis=0` collapses rows: 1+3 = 4, 2+4 = 6. Result is [4, 6] — one entry per column.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What is the output?',
      code: 'import numpy as np\na = np.array([3, 1, 4, 1, 5, 9, 2])\nprint(a.argmax())',
      options: ['9', '5', '6', '2'],
      correct: 1,
      explanation:
        '`argmax` returns the INDEX of the maximum, not the value. The max value is 9 at index 5.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'For a 2D array, what does `axis=1` mean in `a.sum(axis=1)`?',
      options: [
        'Collapse columns — one sum per row',
        'Collapse rows — one sum per column',
        'Sum all elements',
        'Sum only the diagonal',
      ],
      correct: 0,
      explanation:
        '`axis=1` collapses the column dimension, giving one result per row. `axis=0` collapses rows, giving one result per column.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so each row is centered (mean subtracted):',
      code: `import numpy as np
a = np.array([[1, 2, 3], [4, 5, 6]])
centered = a - a.mean(axis=1, ___)`,
      options: ['keepdims=True', 'axis=1', 'reshape=True', 'keep=True'],
      correct: 0,
      explanation:
        '`keepdims=True` keeps the reduced axis as size 1, allowing broadcasting back to the original shape. Without it, shapes mismatch.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `row_means(matrix)` that returns a 1D array containing the mean of each row. Assume matrix is 2D.',
      starterCode:
        'import numpy as np\n\ndef row_means(matrix):\n    # your code here\n    pass',
      tests: [
        {
          input: 'row_means(np.array([[1, 2, 3], [4, 5, 6]])).tolist()',
          expected: '[2.0, 5.0]',
        },
        {
          input: 'row_means(np.array([[10, 20], [30, 40]])).tolist()',
          expected: '[15.0, 35.0]',
        },
        {
          input: 'row_means(np.array([[1, 2, 3, 4]])).shape',
          expected: '(1,)',
        },
      ],
      hint: 'Use `.mean(axis=1)` — axis=1 means "collapse columns, one result per row".',
      solution:
        'import numpy as np\n\ndef row_means(matrix):\n    return matrix.mean(axis=1)',
      explanation:
        'Same pattern as the demo. axis=1 collapses the column dimension, producing one mean per row.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `np.array([1, np.nan, 3, np.nan, 5])` and print the mean ignoring NaN values. Should print 3.0.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '3.0',
      hint: 'Use `np.nanmean(a)`, not `a.mean()`.',
      solution:
        'import numpy as np\na = np.array([1, np.nan, 3, np.nan, 5])\nprint(np.nanmean(a))',
      explanation:
        'A single NaN makes `mean()` return NaN. `np.nanmean` skips NaN values: (1 + 3 + 5) / 3 = 3.0.',
      xp: 25,
    },
  ],
};