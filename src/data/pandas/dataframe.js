// 📘 Pandas — Lesson 2: DataFrame — The 2D Workhorse

export const pandasDataframeLesson = {
  id: 'pandas-dataframe',
  title: 'DataFrame — The 2D Workhorse',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'A DataFrame is a dict of Series sharing the same index. Rows are observations, columns are features. This is the shape of nearly every dataset you will ever touch.',
  sections: [
    {
      type: 'text',
      content:
        'If a Series is a labeled column, a DataFrame is a labeled table — a collection of Series that share the same row index. It is the pandas type you will use 95% of the time.',
    },
    {
      type: 'code',
      content: 'Create from a dict of lists — the classic way:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':   ['Ada', 'Alan', 'Grace', 'Linus'],\n    'age':    [36, 41, 45, 54],\n    'score':  [92, 88, 95, 79],\n})\nprint(df)`,
      output: `    name  age  score\n0    Ada   36     92\n1   Alan   41     88\n2  Grace   45     95\n3  Linus   54     79`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Each key becomes a column. Each value list becomes a Series. All lists must have the same length — otherwise pandas raises a ValueError.',
    },
    {
      type: 'text',
      content:
        'Create from a list of dicts — each dict is one row. This is what you get from `json.loads` or API responses.',
    },
    {
      type: 'code',
      content: 'Create from a list of dicts:',
      code: `import pandas as pd\n\nrows = [\n    {'name': 'Ada',   'age': 36},\n    {'name': 'Alan',  'age': 41},\n    {'name': 'Grace', 'age': 45},\n]\ndf = pd.DataFrame(rows)\nprint(df)`,
      output: `    name  age\n0    Ada   36\n1   Alan   41\n2  Grace   45`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Dict-of-lists is column-oriented. List-of-dicts is row-oriented. Both work — pick based on the source of your data. API responses → list of dicts. Excel columns → dict of lists.',
    },
    {
      type: 'text',
      content:
        'Inspect any DataFrame with `.shape`, `.columns`, `.dtypes`, `.info()`, `.head()`, `.tail()`, `.describe()`.',
    },
    {
      type: 'code',
      content: 'The inspection toolkit:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace', 'Linus'],\n    'age':   [36, 41, 45, 54],\n    'score': [92.5, 88.0, 95.5, 79.0],\n})\n\nprint(df.shape)\nprint(df.columns.tolist())\nprint(df.dtypes.to_dict())\nprint(df.head(2))`,
      output: `(4, 3)\n['name', 'age', 'score']\n{'name': dtype('O'), 'age': dtype('int64'), 'score': dtype('float64')}\n    name  age  score\n0    Ada   36   92.5\n1   Alan   41   88.0`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`dtype("O")` is "object" — usually a Python string. Pandas 2.x also has a dedicated `string` dtype. If you see `object` in a numeric-looking column, your numbers are actually strings (usually from CSV parsing).',
    },
    {
      type: 'text',
      content:
        'Select a single column → get a Series. Select multiple columns with a list → get a DataFrame. This distinction matters more than anything else in pandas.',
    },
    {
      type: 'code',
      content: 'Column selection:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace'],\n    'age':   [36, 41, 45],\n    'score': [92, 88, 95],\n})\n\nprint(type(df['name']).__name__)\nprint(type(df[['name']]).__name__)\nprint(df[['name', 'score']].shape)`,
      output: `Series\nDataFrame\n(3, 2)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'One column with `df["name"]` → Series. A list of columns `df[["name"]]` → DataFrame. The double brackets are not a typo — they mean "list of columns".',
    },
    {
      type: 'text',
      content:
        'Add a new column by assigning to a name that does not exist. Remove one with `.drop()`. Rename with `.rename()`.',
    },
    {
      type: 'code',
      content: 'Add, drop, rename:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})\n\ndf['c'] = df['a'] + df['b']       # add new column\ndf['d'] = 100                     # broadcast scalar\ndf = df.drop(columns=['b'])       # drop a column\ndf = df.rename(columns={'a': 'alpha'})\nprint(df)`,
      output: `   alpha   c    d\n0      1   5  100\n1      2   7  100\n2      3   9  100`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`.drop()` returns a NEW DataFrame by default. You must reassign (`df = df.drop(...)`) or pass `inplace=True`. Most pandas methods are "return new, do not mutate" by default — this trips up beginners constantly.',
    },
    {
      type: 'text',
      content:
        'Sorting: `.sort_values(by=...)` sorts by one or more columns. Use `ascending=False` for descending.',
    },
    {
      type: 'code',
      content: 'Sorting:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace', 'Linus'],\n    'score': [92, 88, 95, 79],\n})\n\nprint(df.sort_values('score', ascending=False).to_dict('records'))`,
      output: `[{'name': 'Grace', 'score': 95}, {'name': 'Ada', 'score': 92}, {'name': 'Alan', 'score': 88}, {'name': 'Linus', 'score': 79}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Sort by multiple columns: `df.sort_values(["team", "score"], ascending=[True, False])` — one ascending per column. Sorting is stable, so ties keep original order.',
    },
    {
      type: 'text',
      content:
        'The `.info()` method gives a compact structural summary — perfect when a DataFrame is too big to print.',
    },
    {
      type: 'code',
      content: 'Structural summary with .info():',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace'],\n    'age':   [36, 41, 45],\n    'score': [92.5, 88.0, 95.5],\n})\ndf.info()`,
      output: `<class 'pandas.core.frame.DataFrame'>\nRangeIndex: 3 entries, 0 to 2\nData columns (total 3 columns):\n #   Column  Non-Null Count  Dtype  \n---  ------  --------------  -----  \n 0   name    3 non-null      object \n 1   age     3 non-null      int64  \n 2   score   3 non-null      float64\ndtypes: float64(1), int64(1), object(1)\nmemory usage: 196.0+ bytes`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Non-Null Count tells you if there are NaNs. If a column shows "2 non-null" out of 3 rows, one value is missing. This is the fastest way to spot missing data.',
    },
    {
      type: 'code',
      content: 'Round-trip to dict and back:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({'a': [1, 2], 'b': [3, 4]})\n\nrecords = df.to_dict('records')\nprint(records)\n\nback = pd.DataFrame(records)\nprint(back.equals(df))`,
      output: `[{'a': 1, 'b': 3}, {'a': 2, 'b': 4}]\nTrue`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`.to_dict("records")` gives a list of dicts — one per row. `.to_dict()` with no arg gives a dict of dicts (column → {index: value}). Always pass `"records"` when you want row data for an API.',
    },
    {
      type: 'tip',
      content:
        'That is the DataFrame. Creation, inspection, column selection, add/drop/rename, sorting, info. Every pandas workflow begins with these — master them and the rest is filling in the blanks.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is the essential difference between `df["name"]` and `df[["name"]]`?',
      options: [
        'They are identical',
        '`df["name"]` returns a Series; `df[["name"]]` returns a DataFrame',
        '`df[["name"]]` is invalid syntax',
        'The first is faster',
      ],
      correct: 1,
      explanation:
        'Single brackets select one column → Series. Double brackets select a list of columns → DataFrame. This distinction matters when downstream code expects a specific type.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ndf = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})\nprint(df.shape)`,
      options: ['(2, 3)', '(3, 2)', '(6,)', '[1, 2, 3]'],
      correct: 1,
      explanation:
        '`shape` is `(rows, columns)`. Two columns (a, b) and three rows — the tuple is `(3, 2)`.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\ndf = pd.DataFrame({'a': [1, 2, 3]})\ndf['b'] = df['a'] * 10\nprint(df['b'].tolist())`,
      options: ['[1, 2, 3]', '[10, 20, 30]', '[10, 10, 10]', 'Error'],
      correct: 1,
      explanation:
        '`df["a"] * 10` is element-wise (Series × scalar). The result becomes the values of the new column `b`.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so we sort the DataFrame by `score` descending:',
      code: `import pandas as pd\ndf = pd.DataFrame({'name': ['A', 'B', 'C'], 'score': [88, 95, 79]})\nprint(df.___('score', ascending=False)['name'].tolist())`,
      options: ['sort_values', 'order_by', 'sort', 'sorted'],
      correct: 0,
      explanation:
        '`sort_values(by, ascending)` is the method. `sort` is a Python built-in, not a DataFrame method. There is no `order_by` in pandas.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `add_total(df)` that takes a DataFrame with columns "price" and "qty" and returns a NEW DataFrame with an added column "total" equal to price * qty. Do not modify the original.',
      starterCode:
        'import pandas as pd\n\ndef add_total(df):\n    # your code here\n    pass',
      tests: [
        {
          input: `add_total(pd.DataFrame({'price': [10, 20], 'qty': [2, 3]}))['total'].tolist()`,
          expected: '[20, 60]',
        },
        {
          input: `add_total(pd.DataFrame({'price': [1.5], 'qty': [4]}))['total'].tolist()`,
          expected: '[6.0]',
        },
        {
          input: `add_total(pd.DataFrame({'price': [1, 2], 'qty': [3, 4]})).columns.tolist()`,
          expected: "['price', 'qty', 'total']",
        },
      ],
      hint: 'Use `df.copy()` first, then assign the new column. Never mutate the caller\'s DataFrame.',
      solution:
        "import pandas as pd\n\ndef add_total(df):\n    out = df.copy()\n    out['total'] = out['price'] * out['qty']\n    return out",
      explanation:
        '`.copy()` isolates the new DataFrame. Assigning a column to a copy has no effect on the original. This is the standard pandas pattern for pure functions.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question: 'Create a DataFrame with `{"x": [1, 2, 3]}` and print its shape as a tuple.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '(3, 1)',
      hint: 'pd.DataFrame({"x": [1, 2, 3]}).shape',
      solution:
        'import pandas as pd\ndf = pd.DataFrame({"x": [1, 2, 3]})\nprint(df.shape)',
      explanation:
        'One column, three rows → shape `(3, 1)`. Note that `shape` returns a tuple, and Python prints tuples with parentheses and a comma.',
      xp: 20,
    },
  ],
};