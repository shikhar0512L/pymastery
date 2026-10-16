// 📘 Pandas — Lesson 6: Missing Data — NaN, dropna, fillna

export const pandasMissingLesson = {
  id: 'pandas-missing',
  title: 'Missing Data — NaN, dropna, fillna',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Real data is dirty. Half of data cleaning is deciding what to do with NaN. Pandas gives you a full toolkit — and each choice matters for your model.',
  sections: [
    {
      type: 'text',
      content:
        'Real-world data almost never arrives complete. A user skipped a field. A sensor dropped a reading. A merge did not find a match. Pandas uses `NaN` (Not a Number) to represent missing numeric data and `None`/`NaT` for other types.',
    },
    {
      type: 'code',
      content: 'Introduce missing values:',
      code: `import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'name':   ['Ada', 'Alan', 'Grace', 'Linus', 'Ken'],\n    'age':    [36, np.nan, 45, np.nan, 32],\n    'score':  [92, 88, np.nan, 79, 85],\n})\nprint(df)`,
      output: `    name   age  score\n0    Ada  36.0   92.0\n1   Alan   NaN   88.0\n2  Grace  45.0    NaN\n3  Linus   NaN   79.0\n4    Ken  32.0   85.0`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice `age` becomes `float64` — NaN forces integers to float. Pandas 2.x offers nullable integer types (`Int64`) if you want to keep ints and NaN together.',
    },
    {
      type: 'text',
      content:
        'Detect missing values with `.isna()` and `.notna()`. Count per column with `.isna().sum()`.',
    },
    {
      type: 'code',
      content: 'Detect and count missing:',
      code: `print(df.isna().to_dict('list'))\nprint(df.isna().sum().to_dict())`,
      output: `{'name': [False, False, False, False, False], 'age': [False, True, False, True, False], 'score': [False, False, True, False, False]}\n{'name': 0, 'age': 2, 'score': 1}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`.isna().sum()` is the fastest audit of missing data in a DataFrame. Print it the moment you load a new dataset — before anything else.',
    },
    {
      type: 'text',
      content:
        '`.dropna()` removes rows (or columns) with NaN. Control with `how=`, `thresh=`, and `subset=`.',
    },
    {
      type: 'code',
      content: 'dropna — different behaviors:',
      code: `print(df.dropna().shape)                               # drop any row with any NaN\nprint(df.dropna(how='all').shape)                      # drop only all-NaN rows\nprint(df.dropna(subset=['age']).shape)                 # only check age column\nprint(df.dropna(thresh=2).shape)                       # keep rows with >= 2 non-NaN`,
      output: `(2, 3)\n(5, 3)\n(3, 3)\n(5, 3)`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`.dropna()` returns a NEW DataFrame — you must reassign or use `inplace=True`. And dropping is dangerous: you can silently remove half your data. Always check the count before and after.',
    },
    {
      type: 'text',
      content:
        '`.fillna(value)` replaces NaN with a scalar. `.fillna(dict)` replaces different values per column.',
    },
    {
      type: 'code',
      content: 'fillna with a constant or a dict:',
      code: `print(df.fillna(0)['age'].tolist())\nprint(df.fillna({'age': 30, 'score': 50})['age'].tolist())`,
      output: `[36.0, 0.0, 45.0, 0.0, 32.0]\n[36.0, 30.0, 45.0, 30.0, 32.0]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Better than a fixed constant: fill with the column MEAN or MEDIAN. It preserves the column distribution and does not distort aggregates.',
    },
    {
      type: 'code',
      content: 'Fill with column mean:',
      code: `filled = df.copy()\nfilled['age']   = filled['age'].fillna(filled['age'].mean())\nfilled['score'] = filled['score'].fillna(filled['score'].mean())\nprint(filled.round(2).to_dict('records'))`,
      output: `[{'name': 'Ada', 'age': 36.0, 'score': 92.0}, {'name': 'Alan', 'age': 37.67, 'score': 88.0}, {'name': 'Grace', 'age': 45.0, 'score': 86.0}, {'name': 'Linus', 'age': 37.67, 'score': 79.0}, {'name': 'Ken', 'age': 32.0, 'score': 85.0}]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`.ffill()` (forward fill) copies the last valid value down. `.bfill()` (backward fill) copies the next valid value up. Used heavily in time series.',
    },
    {
      type: 'code',
      content: 'Forward and backward fill:',
      code: `s = pd.Series([1, np.nan, np.nan, 4, np.nan, 6])\nprint(s.ffill().tolist())\nprint(s.bfill().tolist())`,
      output: `[1.0, 1.0, 1.0, 4.0, 4.0, 6.0]\n[1.0, 4.0, 4.0, 4.0, 6.0, 6.0]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Forward fill assumes the last known value is still valid — perfect for sensor data, prices, and states. Backward fill works when you trust the future more than the past, which is rare. Ffill is the standard.',
    },
    {
      type: 'text',
      content:
        '`.interpolate()` estimates missing values by fitting a line between known points. Better than ffill when the underlying data changes smoothly.',
    },
    {
      type: 'code',
      content: 'Linear interpolation:',
      code: `s = pd.Series([1.0, np.nan, np.nan, 4.0, np.nan, 6.0])\nprint(s.interpolate().tolist())`,
      output: `[1.0, 2.0, 3.0, 4.0, 5.0, 6.0]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Interpolation is perfect when the missing values are between known ones on a continuous curve. For categorical or state-like data, use ffill instead.',
    },
    {
      type: 'text',
      content:
        'Aggregations skip NaN by default. `.mean()`, `.sum()`, `.max()` ignore NaN unless you explicitly turn it off.',
    },
    {
      type: 'code',
      content: 'Aggregations skip NaN by default:',
      code: `s = pd.Series([1.0, np.nan, 3.0, np.nan, 5.0])\nprint(s.mean())\nprint(s.sum())\nprint(s.mean(skipna=False))`,
      output: `3.0\n9.0\nnan`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`skipna=True` is the default — that is why `.mean()` gives 3.0 not NaN. Pass `skipna=False` to propagate NaN through the aggregation. For counting, use `.count()` (skips NaN) vs `.size` (does not).',
    },
    {
      type: 'text',
      content:
        'The decision framework: is the missing value informative? If yes, consider filling with a sentinel. If no, drop or fill with mean/median.',
    },
    {
      type: 'code',
      content: 'The workflow — audit → decide → apply:',
      code: `print(df.isna().sum().to_dict())\nclean = df.dropna(subset=['name'])\nclean['age']   = clean['age'].fillna(clean['age'].median())\nclean['score'] = clean['score'].fillna(clean['score'].mean())\nprint(clean.shape)\nprint(clean.isna().sum().to_dict())`,
      output: `{'name': 0, 'age': 2, 'score': 1}\n(5, 3)\n{'name': 0, 'age': 0, 'score': 0}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is missing data. Detect with `isna`, drop with `dropna`, fill with constants/mean/ffill/interpolate. Always audit first — the right choice depends on WHY data is missing.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What does `.isna().sum()` do?',
      options: [
        'Sums the values in each column',
        'Returns a Series with the number of missing values per column',
        'Removes NaN values',
        'Fills NaN with 0',
      ],
      correct: 1,
      explanation:
        '`.isna()` returns a boolean DataFrame; `.sum()` on booleans counts True values (True == 1). The result is a Series: one number per column, showing how many NaNs each column has.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\nimport numpy as np\ns = pd.Series([1.0, np.nan, 3.0])\nprint(s.mean())`,
      options: ['NaN', '2.0', '4.0', 'Error'],
      correct: 1,
      explanation:
        'Aggregations skip NaN by default (`skipna=True`). Mean of (1 + 3) / 2 = 2.0. The NaN is ignored, not propagated.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\nimport numpy as np\ns = pd.Series([1.0, np.nan, np.nan, 4.0])\nprint(s.ffill().tolist())`,
      options: [
        '[1.0, 1.0, 1.0, 4.0]',
        '[1.0, 4.0, 4.0, 4.0]',
        '[1.0, 0.0, 0.0, 4.0]',
        '[1.0, nan, nan, 4.0]',
      ],
      correct: 0,
      explanation:
        '`.ffill()` copies the last valid value forward. Position 1 and 2 get 1.0 (from position 0). Position 3 keeps 4.0.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so we drop rows where the `email` column is NaN:',
      code: `import pandas as pd\ndf = pd.DataFrame({'name': ['A', 'B'], 'email': ['x@y.z', None]})\ncleaned = df.___(subset=['email'])\nprint(cleaned.shape[0])`,
      options: ['dropna', 'drop', 'remove_na', 'clean'],
      correct: 0,
      explanation:
        '`.dropna(subset=[...])` only drops rows where the named columns have NaN. Other columns\' NaNs are ignored.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `fill_mean(df, columns)` that fills NaN in the given columns with the column mean. Return a copy; do not modify the original DataFrame.',
      starterCode:
        'import pandas as pd\nimport numpy as np\n\ndef fill_mean(df, columns):\n    # your code here\n    pass',
      tests: [
        {
          input: `fill_mean(pd.DataFrame({'a': [1.0, np.nan, 3.0]}), ['a'])['a'].tolist()`,
          expected: '[1.0, 2.0, 3.0]',
        },
        {
          input: `fill_mean(pd.DataFrame({'a': [1.0, np.nan], 'b': [np.nan, 4.0]}), ['a', 'b']).isna().sum().sum()`,
          expected: '0',
        },
        {
          input: `fill_mean(pd.DataFrame({'a': [1.0, np.nan, 5.0]}), ['a'])['a'].iloc[1]`,
          expected: '3.0',
        },
      ],
      hint: 'Use `df.copy()`, then loop over columns and assign `out[col] = out[col].fillna(out[col].mean())`.',
      solution: `import pandas as pd\nimport numpy as np\n\ndef fill_mean(df, columns):\n    out = df.copy()\n    for col in columns:\n        out[col] = out[col].fillna(out[col].mean())\n    return out`,
      explanation:
        'Copy first to leave the caller\'s DataFrame untouched. Per-column mean is the standard fill for numeric data — it preserves the column\'s average without distorting the distribution shape too much.',
      xp: 35,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `pd.Series([1.0, np.nan, np.nan, 4.0])`. Interpolate linearly and print the resulting list via `.tolist()`.',
      starterCode: 'import pandas as pd\nimport numpy as np\n# your code here\n',
      expectedOutput: '[1.0, 2.0, 3.0, 4.0]',
      hint: 's.interpolate() fills between 1.0 and 4.0 evenly: 2.0 and 3.0.',
      solution: `import pandas as pd\nimport numpy as np\ns = pd.Series([1.0, np.nan, np.nan, 4.0])\nprint(s.interpolate().tolist())`,
      explanation:
        'Interpolation fits a straight line between the known values. Between 1.0 and 4.0 there are two missing positions, so they fill with 2.0 and 3.0.',
      xp: 25,
    },
  ],
};