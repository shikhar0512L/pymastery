// 📘 Pandas — Lesson 3: Indexing, Filtering & loc/iloc

export const pandasIndexingLesson = {
  id: 'pandas-indexing',
  title: 'Indexing, Filtering & loc/iloc',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Pandas has four ways to grab data: [], .loc, .iloc, and .query. Knowing which to use — and when — is 90% of day-to-day pandas.',
  sections: [
    {
      type: 'text',
      content:
        'The four access patterns: **`[]`** for a single column, **`.loc`** for label-based, **`.iloc`** for position-based, **`.query`** for SQL-like expressions. Memorise which is which — mixing them is the #1 source of bugs.',
    },
    {
      type: 'code',
      content: 'Setup — a small dataset:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace', 'Linus', 'Ken'],\n    'age':   [36, 41, 45, 54, 32],\n    'score': [92, 88, 95, 79, 85],\n})\nprint(df)`,
      output: `    name  age  score\n0    Ada   36     92\n1   Alan   41     88\n2  Grace   45     95\n3  Linus   54     79\n4    Ken   32     85`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`.iloc[row, col]` uses integer positions. Same as NumPy. Half-open slices like NumPy, not inclusive like `.loc`.',
    },
    {
      type: 'code',
      content: 'iloc — integer positions:',
      code: `print(df.iloc[0].to_dict())\nprint(df.iloc[0, 0])\nprint(df.iloc[1:3, [0, 2]])`,
      output: `{'name': 'Ada', 'age': 36, 'score': 92}\nAda\n    name  score\n1   Alan     88\n2  Grace     95`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`.iloc[1:3]` returns rows 1 and 2 — start INCLUSIVE, end EXCLUSIVE, exactly like Python slices. This differs from `.loc`, which we will see next.',
    },
    {
      type: 'text',
      content:
        '`.loc[row_label, col_label]` uses labels. If your index is the default 0..n, labels and positions coincide — but they are conceptually different. Slices with `.loc` are INCLUSIVE on both ends.',
    },
    {
      type: 'code',
      content: 'loc — label-based:',
      code: `print(df.loc[0, 'name'])\nprint(df.loc[0:2, ['name', 'score']])`,
      output: `Ada\n    name  score\n0    Ada     92\n1   Alan     88\n2  Grace     95`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`df.loc[0:2]` returns rows 0, 1, AND 2 — inclusive. `df.iloc[0:2]` returns rows 0 and 1 — exclusive. This asymmetry is intentional but infamous among pandas users.',
    },
    {
      type: 'text',
      content:
        'Boolean masks work exactly like NumPy. Build a boolean Series and index with it. `df[df["score"] > 85]` is the single most-used idiom in pandas.',
    },
    {
      type: 'code',
      content: 'Boolean filtering:',
      code: `print(df[df['score'] > 85][['name', 'score']].to_dict('records'))\nprint(df[(df['age'] > 35) & (df['score'] > 85)].shape)`,
      output: `[{'name': 'Ada', 'score': 92}, {'name': 'Alan', 'score': 88}, {'name': 'Grace', 'score': 95}]\n(3, 3)`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Use `&` (and), `|` (or), `~` (not) with PARENTHESES around each condition — same as NumPy. Python `and`/`or` fail on Series because truthiness is ambiguous.',
    },
    {
      type: 'text',
      content:
        '`.isin([...])` filters by membership. `.between(a, b)` filters by range (inclusive by default). Both return boolean Series.',
    },
    {
      type: 'code',
      content: 'isin and between:',
      code: `print(df[df['name'].isin(['Ada', 'Grace'])]['name'].tolist())\nprint(df[df['score'].between(85, 90)]['name'].tolist())`,
      output: `['Ada', 'Grace']\n['Alan', 'Ken']`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`.between(85, 90)` is inclusive on both ends. `.between(85, 90, inclusive="neither")` excludes both. `.between(85, 90, inclusive="left")` includes only 85.',
    },
    {
      type: 'text',
      content:
        '`.query()` is SQL-like filtering. It is more readable for complex conditions because you write strings instead of chained `&` clauses.',
    },
    {
      type: 'code',
      content: 'query — SQL-style conditions:',
      code: `print(df.query('score > 85').shape)\nprint(df.query('age > 35 and score > 85')['name'].tolist())\nprint(df.query('name in ["Ada", "Grace"]')['score'].tolist())`,
      output: `(3, 3)\n['Ada', 'Alan', 'Grace']\n[92, 95]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Inside `.query()`, you write Python-like syntax as a string. `and`/`or` work as expected (unlike with `&`/`|` on Series). Column names with spaces need backticks: `` `first name` > "A" ``.',
    },
    {
      type: 'text',
      content:
        'Set values with `.loc` — safe, aligned assignment. This is the correct way to modify specific cells.',
    },
    {
      type: 'code',
      content: 'Setting values with loc:',
      code: `df2 = df.copy()\ndf2.loc[df2['score'] < 80, 'score'] = 80\nprint(df2['score'].tolist())`,
      output: `[92, 88, 95, 80, 85]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Do NOT write `df["score"][df["score"] < 80] = 80` — this is **chained assignment** and may not modify the original DataFrame (SettingWithCopyWarning). Always use `.loc[row_mask, column_name] = value`.',
    },
    {
      type: 'text',
      content:
        'Putting it all together: the difference between `[]`, `.loc`, `.iloc`, and `.query` in one table-like example.',
    },
    {
      type: 'code',
      content: 'All four access patterns side by side:',
      code: `# Grab one column\nprint(df['name'].iloc[0])                   # Series then position\nprint(df.loc[0, 'name'])                    # label-loc\nprint(df.iloc[0, 0])                        # position\nprint(df.query('name == "Ada"')['age'].iloc[0])  # query then col`,
      output: `Ada\nAda\nAda\n36`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is indexing. `[]` for columns, `.loc` for labels, `.iloc` for positions, boolean masks and `.query` for filters. Get these four muscle-memorised — they are 80% of your pandas typing.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is the difference between `.loc[0:2]` and `.iloc[0:2]`?',
      options: [
        'They are identical',
        '`.loc` is inclusive on both ends; `.iloc` excludes the end like Python slices',
        '`.loc` excludes the end; `.iloc` is inclusive',
        '`.loc` works only with strings',
      ],
      correct: 1,
      explanation:
        '`.loc` slices by LABEL and is inclusive on both ends. `.iloc` slices by POSITION and follows Python\'s half-open convention. This is the #1 gotcha in pandas.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ndf = pd.DataFrame({'a': [10, 20, 30, 40], 'b': [1, 2, 3, 4]})\nprint(df[df['a'] > 20]['a'].tolist())`,
      options: ['[10, 20]', '[30, 40]', '[20, 30, 40]', 'Error'],
      correct: 1,
      explanation:
        '`df["a"] > 20` gives `[False, False, True, True]`. Filtering by that mask keeps the last two rows: 30 and 40.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\ndf = pd.DataFrame({'name': ['A', 'B', 'C'], 'score': [80, 90, 95]})\nprint(df.query('score > 85')['name'].tolist())`,
      options: ["['A']", "['B', 'C']", "['C']", 'Error'],
      correct: 1,
      explanation:
        '`.query("score > 85")` filters rows where score is strictly greater than 85. That is B (90) and C (95).',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so we filter rows where `age` is between 30 and 50 inclusive:',
      code: `import pandas as pd\ndf = pd.DataFrame({'age': [25, 35, 45, 55]})\nprint(df[df['age'].___(30, 50)]['age'].tolist())`,
      options: ['between', 'isin', 'range', 'in_range'],
      correct: 0,
      explanation:
        '`.between(a, b)` returns a boolean Series, True where the value falls in [a, b] inclusive on both ends by default.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `filter_high(df, threshold)` that returns a DataFrame with only rows where the "score" column is strictly greater than `threshold`.',
      starterCode:
        'import pandas as pd\n\ndef filter_high(df, threshold):\n    # your code here\n    pass',
      tests: [
        {
          input: `filter_high(pd.DataFrame({'score': [80, 90, 95]}), 85)['score'].tolist()`,
          expected: '[90, 95]',
        },
        {
          input: `filter_high(pd.DataFrame({'score': [80, 90, 95]}), 100).shape`,
          expected: '(0, 1)',
        },
        {
          input: `filter_high(pd.DataFrame({'score': [10, 20], 'name': ['A', 'B']}), 15).shape`,
          expected: '(1, 2)',
        },
      ],
      hint: 'Use `df[df["score"] > threshold]`.',
      solution:
        'import pandas as pd\n\ndef filter_high(df, threshold):\n    return df[df["score"] > threshold]',
      explanation:
        'Boolean mask filtering. `.query()` would also work — `df.query("score > @threshold")` — but the mask form is more explicit here.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create a DataFrame `{"x": [1, 2, 3, 4, 5]}`. Use `.loc` to set `x` to 0 where `x` is even, then print the `x` column as a list.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '[1, 0, 3, 0, 5]',
      hint: '`df.loc[df["x"] % 2 == 0, "x"] = 0` then `print(df["x"].tolist())`.',
      solution:
        'import pandas as pd\ndf = pd.DataFrame({"x": [1, 2, 3, 4, 5]})\ndf.loc[df["x"] % 2 == 0, "x"] = 0\nprint(df["x"].tolist())',
      explanation:
        '`.loc[mask, column] = value` is the safe, correct way to assign conditionally. Never use chained assignment (`df["x"][mask] = 0`).',
      xp: 25,
    },
  ],
};