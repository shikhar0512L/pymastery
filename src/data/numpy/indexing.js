// 📘 NumPy — Lesson 2: Indexing, Slicing & Boolean Masks

export const numpyIndexingLesson = {
  id: 'numpy-indexing',
  title: 'Indexing, Slicing & Boolean Masks',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'NumPy indexing looks like list indexing — until it does not. Comma-style indexing, boolean masks and fancy indexing are what make NumPy feel like a data tool, not a bigger list.',
  sections: [
    {
      type: 'text',
      content:
        'For 1D arrays, indexing and slicing are identical to Python lists: positive/negative indices, `[start:stop:step]`, everything.',
    },
    {
      type: 'code',
      content: '1D indexing — familiar ground:',
      code: `import numpy as np\n\na = np.array([10, 20, 30, 40, 50])\nprint(a[0])       # first\nprint(a[-1])      # last\nprint(a[1:4])     # slice\nprint(a[::2])     # step\nprint(a[::-1])    # reverse`,
      output: `10\n50\n[20 30 40]\n[10 30 50]\n[50 40 30 20 10]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'For 2D arrays, the killer feature: comma-style indexing. `a[row, col]`. Cleaner than `a[row][col]` and much faster.',
    },
    {
      type: 'code',
      content: '2D indexing — comma syntax:',
      code: `import numpy as np\n\na = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(a[0, 0])       # top-left\nprint(a[1, 2])       # row 1, col 2\nprint(a[-1, -1])     # bottom-right\nprint(a[0])          # full first row\nprint(a[:, 1])       # full column 1`,
      output: `1\n6\n9\n[1 2 3]\n[2 5 8]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`a[:, 1]` means "all rows, column 1". `a[1, :]` means "row 1, all columns". The colon is "everything along this axis".',
    },
    {
      type: 'text',
      content:
        'Slices on multiple axes at once. `a[1:3, 2:]` means rows 1 to 2 (exclusive), columns 2 to end.',
    },
    {
      type: 'code',
      content: 'Multi-axis slicing:',
      code: `import numpy as np\n\na = np.arange(1, 26).reshape(5, 5)\n# a = [[ 1  2  3  4  5]\n#      [ 6  7  8  9 10]\n#      [11 12 13 14 15]\n#      [16 17 18 19 20]\n#      [21 22 23 24 25]]\n\nprint(a[1:3, 2:])     # rows 1-2, cols 2-end\nprint(a[::2, ::2])    # every other row, every other col\nprint(a[-2:, :3])     # last 2 rows, first 3 cols`,
      output: `[[ 8  9 10]\n [13 14 15]]\n[[ 1  3  5]\n [11 13 15]\n [21 23 25]]\n[[16 17 18]\n [21 22 23]]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'NumPy slices return **views**, not copies. Modifying a slice modifies the original. This saves memory but causes real bugs if you forget.',
    },
    {
      type: 'code',
      content: 'Views vs copies — the biggest gotcha:',
      code: `import numpy as np\n\na = np.arange(10)\n\n# Slice returns a VIEW\nb = a[2:5]\nb[0] = 999\nprint(a)      # a is modified!\n\n# Copy explicitly\nc = a[2:5].copy()\nc[0] = 0\nprint(a)      # a unchanged`,
      output: `[  0   1 999   3   4   5   6   7   8   9]\n[  0   1 999   3   4   5   6   7   8   9]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Rule: slicing returns a view; fancy indexing and boolean indexing return copies. `.copy()` forces a copy whenever you need one.',
    },
    {
      type: 'text',
      content:
        'Boolean masks: apply a condition to an array, get back a boolean array. Use it to filter.',
    },
    {
      type: 'code',
      content: 'Boolean masking:',
      code: `import numpy as np\n\na = np.array([3, 8, 1, 9, 4, 7, 2])\n\nmask = a > 5\nprint(mask)\nprint(a[mask])        # only the elements where mask is True\nprint(a[a > 5])       # same, inline\nprint(a[a % 2 == 0])  # only evens`,
      output: `[False  True False  True False  True False]\n[8 9 7]\n[8 9 7]\n[8 4 2]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Boolean masks are how you filter data in NumPy and Pandas. `arr[arr > x]` is the single most-used idiom in data work.',
    },
    {
      type: 'text',
      content:
        'Combine conditions with `&` (and), `|` (or), `~` (not). Use parentheses around each condition.',
    },
    {
      type: 'code',
      content: 'Combining boolean masks:',
      code: `import numpy as np\n\na = np.array([3, 8, 1, 9, 4, 7, 2])\n\nprint(a[(a > 3) & (a < 8)])   # between 3 and 8 exclusive\nprint(a[(a < 2) | (a > 7)])   # less than 2 or greater than 7\nprint(a[~(a > 5)])            # NOT greater than 5`,
      output: `[4 7]\n[1 9 8 2]\n[3 1 4 2]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Do NOT use Python `and` / `or` on NumPy arrays — they raise an error or produce wrong results. Always use `&` / `|` / `~` with parentheses.',
    },
    {
      type: 'text',
      content:
        'Fancy indexing: pass an array of indices to pick specific elements in any order. Returns a copy, always.',
    },
    {
      type: 'code',
      content: 'Fancy indexing:',
      code: `import numpy as np\n\na = np.array([10, 20, 30, 40, 50])\n\nprint(a[[0, 2, 4]])         # pick indices 0, 2, 4\nprint(a[[4, 3, 2, 1, 0]])   # reverse via fancy indexing\n\n# 2D\nb = np.arange(9).reshape(3, 3)\nprint(b[[0, 2], :])         # rows 0 and 2`,
      output: `[10 30 50]\n[50 40 30 20 10]\n[[0 1 2]\n [6 7 8]]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Fancy indexing always copies. That is why `a[[0, 2]]` is safe to modify without affecting `a`.',
    },
    {
      type: 'text',
      content:
        'Set values with a mask. This is how you "replace every element matching X" in one line.',
    },
    {
      type: 'code',
      content: 'Mask assignment:',
      code: `import numpy as np\n\na = np.array([3, 8, 1, 9, 4, 7, 2])\na[a > 5] = 0\nprint(a)\n\n# Conditional transform\na = np.array([3, 8, 1, 9, 4])\na[a % 2 == 0] = a[a % 2 == 0] * 10\nprint(a)`,
      output: `[3 0 1 0 4 0 2]\n[ 3 80  1 90 40]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`arr[arr < 0] = 0` — the classic "clamp negatives to zero". You will write this in dozens of ML projects.',
    },
    {
      type: 'text',
      content:
        '`np.where(condition, x, y)` — element-wise if/else. Returns `x` where condition is True, `y` otherwise.',
    },
    {
      type: 'code',
      content: 'np.where — vectorized if-else:',
      code: `import numpy as np\n\na = np.array([3, 8, 1, 9, 4, 7])\n\nprint(np.where(a > 5, "big", "small"))\nprint(np.where(a > 5, a, 0))                 # keep or zero\nprint(np.where(a > 5, a * 10, a))            # scale bigs`,
      output: `['small' 'big' 'small' 'big' 'small' 'big']\n[0 8 0 9 0 7]\n[ 3 80  1 90  4 70]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Both branches of `np.where` are evaluated fully — even the ones you do not want. If a branch divides by zero, use `np.divide` with a `where=` argument or mask first.',
    },
    {
      type: 'tip',
      content:
        'That is indexing. Comma-syntax, boolean masks, fancy indexing, where — this is the full toolkit. It is the same slicing you know, extended to N dimensions and filters.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What does this print?',
      code: 'import numpy as np\na = np.arange(6)\na[2:4] = 99\nprint(a)',
      options: [
        '[0 1 99 99 4 5]',
        '[0 1 2 3 4 5]',
        '[0 1 99 3 4 5]',
        'Error',
      ],
      correct: 0,
      explanation:
        'Slices of NumPy arrays are views. Assigning to a[2:4] modifies the original array in place. Two elements become 99.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What is the output?',
      code: 'import numpy as np\na = np.array([3, 8, 1, 9, 4, 7, 2])\nprint(a[(a > 3) & (a < 8)])',
      options: ['[8, 9]', '[4, 7]', '[3, 1, 4, 2]', '[8, 4, 7]'],
      correct: 1,
      explanation:
        'Two masks combined with `&`: keep elements > 3 AND < 8. Only 4 and 7 qualify. Note parentheses are required around each condition.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You slice an array `b = a[2:5]` and then modify b. What happens to a?',
      options: [
        'Nothing — slices are always copies',
        'Only the sliced region of a changes, because b is a view',
        'The entire array a is replaced',
        'It raises an error',
      ],
      correct: 1,
      explanation:
        'Basic slicing returns a view. Modifying b modifies the same underlying memory, so a reflects the change. Use `.copy()` if you want isolation.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so we pick every other element (indices 0, 2, 4):',
      code: 'import numpy as np\na = np.array([10, 20, 30, 40, 50, 60])\nprint(a[___])',
      options: ['::2', '0:4:2', '1::2', '2:6'],
      correct: 0,
      explanation:
        '`a[::2]` means "start at 0, go to end, step by 2" — that is indices 0, 2, 4. `1::2` would give 1, 3, 5.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `clamp(arr, low, high)` that returns a copy of arr with values below low set to low, and values above high set to high. Do not modify the original.',
      starterCode:
        'import numpy as np\n\ndef clamp(arr, low, high):\n    # your code here\n    pass',
      tests: [
        { input: 'clamp(np.array([1, 5, 10, 15, 20]), 5, 15).tolist()', expected: '[5, 5, 10, 15, 15]' },
        { input: 'clamp(np.array([-3, 0, 3]), 0, 10).tolist()', expected: '[0, 0, 3]' },
        { input: 'clamp(np.array([1, 2, 3]), 0, 10).tolist()', expected: '[1, 2, 3]' },
      ],
      hint: 'Use `arr.clip(low, high)` — NumPy ships this exact operation. It returns a new array.',
      solution:
        'import numpy as np\n\ndef clamp(arr, low, high):\n    return arr.clip(low, high)',
      explanation:
        '`arr.clip(low, high)` is the vectorized version of "clamp every value". There is also a standalone `np.clip(arr, low, high)`.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create an array [1, 2, 3, 4, 5, 6]. Use a boolean mask to set all even values to 0. Print the result.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[1 0 3 0 5 0]',
      hint: 'a[a % 2 == 0] = 0, then print(a).',
      solution:
        'import numpy as np\na = np.array([1, 2, 3, 4, 5, 6])\na[a % 2 == 0] = 0\nprint(a)',
      explanation:
        'Boolean mask assignment modifies in place. It is one of the most-used NumPy idioms.',
      xp: 25,
    },
  ],
};