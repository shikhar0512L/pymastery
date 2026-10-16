// 📘 Pandas — Lesson 1: Series — The 1D Foundation

export const pandasSeriesLesson = {
  id: 'pandas-series',
  title: 'Series — The 1D Foundation',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'A pandas Series is a NumPy array with labeled indices. That single addition — labels on top of values — is what turns "just numbers" into something that behaves like a database column.',
  sections: [
    {
      type: 'text',
      content:
        'Pandas is built on top of NumPy. The two core types are **Series** (1D, labeled) and **DataFrame** (2D, labeled rows and columns). Almost every data science job starts with loading data into one of these.',
    },
    {
      type: 'code',
      content: 'Create a Series from a list:',
      code: `import pandas as pd\n\ns = pd.Series([10, 20, 30, 40])\nprint(s)\nprint(s.tolist())`,
      output: `0    10\n1    20\n2    30\n3    40\ndtype: int64\n[10, 20, 30, 40]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'On the left of `print(s)` you see `0 1 2 3` — those are not values, they are the **index**. Pandas auto-creates a default integer index starting at 0. The `dtype: int64` on the last line is the type of the values.',
    },
    {
      type: 'text',
      content:
        'The index is the killer feature. Give it custom labels and the Series becomes self-describing.',
    },
    {
      type: 'code',
      content: 'Custom index:',
      code: `import pandas as pd\n\ns = pd.Series([95, 87, 72], index=['math', 'physics', 'chem'])\nprint(s)\nprint(s['physics'])\nprint(s[['math', 'chem']].tolist())`,
      output: `math       95\nphysics    87\nchem       72\ndtype: int64\n87\n[95, 72]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Index labels can be strings, dates, tuples — any hashable value. With `s["math"]` you access by label, not position. This is what makes pandas feel like a dict and an array at the same time.',
    },
    {
      type: 'code',
      content: 'From a dict — keys become the index:',
      code: `import pandas as pd\n\ns = pd.Series({'a': 1, 'b': 2, 'c': 3})\nprint(s.index.tolist())\nprint(s.values)`,
      output: `['a', 'b', 'c']\n[1 2 3]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Once you have a Series, arithmetic works element-wise — exactly like NumPy. Loops are almost never the answer.',
    },
    {
      type: 'code',
      content: 'Vectorized operations:',
      code: `import pandas as pd\n\ns = pd.Series([1, 2, 3, 4, 5])\n\nprint((s * 2).tolist())\nprint((s + 100).tolist())\nprint((s ** 2).tolist())\nprint((s > 2).tolist())`,
      output: `[2, 4, 6, 8, 10]\n[101, 102, 103, 104, 105]\n[1, 4, 9, 16, 25]\n[False, False, True, True, True]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Series arithmetic **aligns on the index**, not on position. If two Series have different index labels, pandas matches them by label and inserts NaN where a label is missing. This is different from NumPy — and it is the most common surprise for NumPy users.',
    },
    {
      type: 'code',
      content: 'Alignment in action:',
      code: `import pandas as pd\n\na = pd.Series([1, 2, 3], index=['x', 'y', 'z'])\nb = pd.Series([10, 20], index=['x', 'y'])\n\nprint((a + b).tolist())`,
      output: `[11.0, 22.0, nan]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`a` has labels x, y, z. `b` has only x and y. Result: x matches x (11), y matches y (22), z has no match in b so it becomes NaN. Pandas picks the **union** of indices and fills with NaN where missing.',
    },
    {
      type: 'text',
      content:
        'Essential inspection methods: `.head()`, `.tail()`, `.describe()`, `.value_counts()`, `.sort_values()`. Learn these first — they answer 80% of your questions about a column.',
    },
    {
      type: 'code',
      content: 'The essential methods:',
      code: `import pandas as pd\n\ns = pd.Series([10, 20, 20, 30, 30, 30, 40])\n\nprint(s.head(3).tolist())\nprint(s.value_counts().to_dict())\nprint(round(s.mean(), 2))\nprint(round(s.std(), 2))`,
      output: `[10, 20, 20]\n{30: 3, 20: 2, 10: 1, 40: 1}\n25.71\n9.76`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`value_counts()` returns a Series with counts sorted descending. `describe()` returns a Series with count, mean, std, quartiles — a Series of a Series, that is pandas all the way down.',
    },
    {
      type: 'text',
      content:
        'Text data: use the `.str` accessor. It exposes vectorized string methods — `upper`, `contains`, `replace`, `split`, and more. No loop required.',
    },
    {
      type: 'code',
      content: 'String methods with .str:',
      code: `import pandas as pd\n\nnames = pd.Series(['ada', 'alan', 'grace', 'linus'])\n\nprint(names.str.upper().tolist())\nprint(names.str.contains('a').tolist())\nprint(names.str.len().tolist())`,
      output: `['ADA', 'ALAN', 'GRACE', 'LINUS']\n[True, True, True, False]\n[3, 4, 5, 5]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`.str.` only works on object/string dtype. If a column has mixed types it will fail. Use `.astype(str)` to be safe.',
    },
    {
      type: 'text',
      content:
        'Missing data is a first-class citizen in pandas. Use `isna`/`notna` to detect, `dropna` to remove, `fillna` to replace.',
    },
    {
      type: 'code',
      content: 'Handling missing data:',
      code: `import pandas as pd\nimport numpy as np\n\ns = pd.Series([1.0, np.nan, 3.0, np.nan, 5.0])\n\nprint(s.isna().tolist())\nprint(s.dropna().tolist())\nprint(s.fillna(0).tolist())\nprint(s.mean())`,
      output: `[False, True, False, True, False]\n[1.0, 3.0, 5.0]\n[1.0, 0.0, 3.0, 0.0, 5.0]\n3.0`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`mean()` skips NaN by default — that is why it returns 3.0 (mean of 1, 3, 5), not NaN. Pandas is friendly to missing data out of the box; NumPy is not.',
    },
    {
      type: 'tip',
      content:
        'That is the Series — array + index, vectorized math, alignment, essential methods, string access, missing data. Every DataFrame column is a Series, so this is the foundation for everything else in pandas.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What makes a pandas Series different from a NumPy array?',
      options: [
        'Series can hold values of any type',
        'Series has labeled indices on top of the values',
        'Series is faster',
        'Series can only hold floats',
      ],
      correct: 1,
      explanation:
        'A Series is essentially a NumPy array plus an index. The index lets you access values by label, align data across Series, and treat data as self-describing.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ns = pd.Series([10, 20, 30], index=['a', 'b', 'c'])\nprint(s['b'])`,
      options: ['20', '1', 'b', 'Error'],
      correct: 0,
      explanation:
        'With a custom index, `s["b"]` looks up by LABEL, not position. The label `b` holds the value 20. To access by position, use `s.iloc[1]`.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\na = pd.Series([1, 2, 3], index=['x', 'y', 'z'])\nb = pd.Series([10, 20], index=['x', 'y'])\nprint((a + b).tolist())`,
      options: [
        '[11.0, 22.0, nan]',
        '[11, 22, 3]',
        '[11, 22, 33]',
        'Error',
      ],
      correct: 0,
      explanation:
        'Pandas aligns on the index. x matches x (11), y matches y (22). z exists only in a, so it becomes NaN. Result uses the union of indices.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so we count how many times each unique value appears:',
      code: `import pandas as pd\ns = pd.Series([1, 1, 2, 3, 3, 3])\nprint(s.___().to_dict())`,
      options: ['value_counts', 'counts', 'unique', 'freq'],
      correct: 0,
      explanation:
        '`value_counts()` returns a Series of counts, sorted descending. `.to_dict()` converts it to a plain Python dict.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `top_n(series, n)` that returns the n largest values from a Series, sorted descending.',
      starterCode:
        'import pandas as pd\n\ndef top_n(series, n):\n    # your code here\n    pass',
      tests: [
        {
          input: 'top_n(pd.Series([3, 1, 4, 1, 5, 9, 2, 6]), 3).tolist()',
          expected: '[9, 6, 5]',
        },
        {
          input: 'top_n(pd.Series([10, 20, 30]), 1).tolist()',
          expected: '[30]',
        },
        {
          input: 'top_n(pd.Series([1, 2, 3]), 3).shape',
          expected: '(3,)',
        },
      ],
      hint: 'Use `.nlargest(n)`.',
      solution:
        'import pandas as pd\n\ndef top_n(series, n):\n    return series.nlargest(n)',
      explanation:
        '`.nlargest(n)` returns a Series of the n biggest values, sorted descending. It uses a heap internally, faster than full sort.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question: 'Create a Series `[10, 20, 30, 40]` and print its mean.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '25.0',
      hint: 'pd.Series([10, 20, 30, 40]).mean()',
      solution:
        'import pandas as pd\ns = pd.Series([10, 20, 30, 40])\nprint(s.mean())',
      explanation:
        '`.mean()` returns a scalar. Pandas prints scalars the same way Python does.',
      xp: 20,
    },
  ],
};