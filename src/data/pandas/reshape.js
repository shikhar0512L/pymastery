// 📘 Pandas — Lesson 7: Pivot, Melt & Crosstab

export const pandasReshapeLesson = {
  id: 'pandas-reshape',
  title: 'Pivot, Melt & Crosstab',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Data comes in two shapes: long (one row per observation) and wide (one row per entity, one column per metric). Pivot and melt convert between them. Crosstab is Excel-style aggregation.',
  sections: [
    {
      type: 'text',
      content:
        '**Long format** has one row per measurement: `date, metric, value`. **Wide format** has one row per entity and one column per metric. Both are useful — the tools you use (charts, ML models) prefer different ones.',
    },
    {
      type: 'code',
      content: 'Long-format data:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'date':   ['2024-01', '2024-01', '2024-02', '2024-02', '2024-03', '2024-03'],\n    'metric': ['sales', 'costs', 'sales', 'costs', 'sales', 'costs'],\n    'value':  [100, 40, 120, 50, 140, 55],\n})\nprint(df)`,
      output: `      date metric  value\n0  2024-01  sales    100\n1  2024-01  costs     40\n2  2024-02  sales    120\n3  2024-02  costs     50\n4  2024-03  sales    140\n5  2024-03  costs     55`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`.pivot()` reshapes long → wide. Pass `index=`, `columns=`, `values=`. Each unique combination of index+column must be unique or pivot raises an error.',
    },
    {
      type: 'code',
      content: 'pivot — long to wide:',
      code: `wide = df.pivot(index='date', columns='metric', values='value')\nprint(wide)`,
      output: `metric    costs  sales\n date                  \n2024-01      40    100\n2024-02      50    120\n2024-03      55    140`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice that each date becomes a row and each metric becomes a column. The values land in the intersection. If two rows share the same (index, column) pair, pivot raises a ValueError — use `pivot_table` instead.',
    },
    {
      type: 'text',
      content:
        '`.pivot_table()` is the aggregating version. Pass `aggfunc=` to decide how duplicates collapse.',
    },
    {
      type: 'code',
      content: 'pivot_table with aggregation:',
      code: `df2 = pd.DataFrame({\n    'team':   ['A', 'A', 'B', 'B', 'A', 'B'],\n    'region': ['N', 'S', 'N', 'S', 'N', 'S'],\n    'sales':  [10, 20, 30, 40, 15, 25],\n})\npt = df2.pivot_table(index='team', columns='region', values='sales', aggfunc='sum')\nprint(pt)`,
      output: `region   N   S\nteam          \nA       25  20\nB       30  65`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`pivot_table` defaults to `aggfunc="mean"`. If you want sums (or anything else), always pass `aggfunc=` explicitly. Otherwise you will silently get averages.',
    },
    {
      type: 'text',
      content:
        'The reverse: `.melt()` goes wide → long. `id_vars=` are the columns to keep, `var_name=` names the new "variable" column, `value_name=` names the value column.',
    },
    {
      type: 'code',
      content: 'melt — wide to long:',
      code: `wide2 = pd.DataFrame({\n    'date':  ['2024-01', '2024-02'],\n    'sales': [100, 120],\n    'costs': [40, 50],\n})\nlong = wide2.melt(id_vars='date', var_name='metric', value_name='value')\nprint(long.to_dict('records'))`,
      output: `[{'date': '2024-01', 'metric': 'sales', 'value': 100}, {'date': '2024-01', 'metric': 'costs', 'value': 40}, {'date': '2024-02', 'metric': 'sales', 'value': 120}, {'date': '2024-02', 'metric': 'costs', 'value': 50}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Pivot and melt are inverses. `long.pivot(...).melt(...)` gives you back the original shape (assuming no dupes and matching column names). Learn both — you will flip between them constantly.',
    },
    {
      type: 'text',
      content:
        '`.crosstab()` builds a frequency or aggregation table directly from raw columns. It is the pandas version of Excel\'s PivotTable — with counts or any aggregation.',
    },
    {
      type: 'code',
      content: 'crosstab — counts and values:',
      code: `df3 = pd.DataFrame({\n    'gender': ['M', 'F', 'M', 'F', 'M', 'F', 'M'],\n    'city':   ['NY', 'NY', 'LA', 'LA', 'NY', 'LA', 'NY'],\n})\nprint(pd.crosstab(df3['gender'], df3['city']).to_dict())\n\nvalues = pd.DataFrame({\n    'gender': ['M', 'F', 'M', 'F'],\n    'city':   ['NY', 'NY', 'LA', 'LA'],\n    'spend':  [100, 80, 120, 90],\n})\nprint(pd.crosstab(values['gender'], values['city'], values=values['spend'], aggfunc='sum').to_dict())`,
      output: `{'LA': {'F': 1, 'M': 2}, 'NY': {'F': 2, 'M': 3}}\n{'LA': {'F': 90, 'M': 120}, 'NY': {'F': 80, 'M': 100}}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Without `values=` and `aggfunc=`, crosstab gives counts. With them, it gives any aggregation per cell. Crosstab is essentially `groupby([row, col]).agg()` with a nice visual output.',
    },
    {
      type: 'text',
      content:
        'Combine pivot with groupby to build report-style tables. This is the shape of every analyst\'s weekly report.',
    },
    {
      type: 'code',
      content: 'Monthly report table:',
      code: `sales = pd.DataFrame({\n    'month':   ['Jan', 'Jan', 'Feb', 'Feb', 'Mar', 'Mar'],\n    'product': ['A', 'B', 'A', 'B', 'A', 'B'],\n    'revenue': [100, 80, 120, 90, 140, 100],\n})\nreport = sales.pivot_table(index='month', columns='product', values='revenue', aggfunc='sum', fill_value=0)\nprint(report.to_dict())`,
      output: `{'A': {'Jan': 100, 'Feb': 120, 'Mar': 140}, 'B': {'Jan': 80, 'Feb': 90, 'Mar': 100}}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`fill_value=0` replaces missing combinations with 0. Without it, months/products with no sales would show NaN — usually you want 0 in a report.',
    },
    {
      type: 'text',
      content:
        '`.stack()` and `.unstack()` convert between column labels and row index. `stack` moves columns into rows; `unstack` does the opposite.',
    },
    {
      type: 'code',
      content: 'stack and unstack:',
      code: `df4 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]}, index=['r1', 'r2'])\nstacked = df4.stack()\nprint(stacked.to_dict())\nprint(stacked.unstack().to_dict())`,
      output: `{('r1', 'A'): 1, ('r1', 'B'): 3, ('r2', 'A'): 2, ('r2', 'B'): 4}\n{'A': {'r1': 1, 'r2': 2}, 'B': {'r1': 3, 'r2': 4}}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`stack()` gives a MultiIndex (row, column) Series. `unstack()` is its inverse. Combined with pivot and melt, they form a complete set of reshaping tools.',
    },
    {
      type: 'tip',
      content:
        'That is reshaping. Pivot long→wide, melt wide→long, crosstab for frequency tables, stack/unstack for index manipulation. Every analyst report you will ever make is one of these.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is the difference between `pivot` and `pivot_table`?',
      options: [
        'They are identical',
        '`pivot_table` aggregates duplicates; `pivot` errors on duplicates',
        '`pivot` only works with strings',
        '`pivot_table` is slower',
      ],
      correct: 1,
      explanation:
        '`pivot` requires each (index, column) pair to be unique — otherwise raises ValueError. `pivot_table` handles duplicates by applying `aggfunc` (default "mean").',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ndf = pd.DataFrame({\n    'date': ['d1', 'd1', 'd2', 'd2'],\n    'metric': ['a', 'b', 'a', 'b'],\n    'value': [1, 2, 3, 4],\n})\nwide = df.pivot(index='date', columns='metric', values='value')\nprint(wide.shape)`,
      options: ['(2, 2)', '(4, 3)', '(4, 1)', '(2, 3)'],
      correct: 0,
      explanation:
        'Two dates × two metrics → (2, 2). Long format had 4 rows; wide has 2 rows (one per date) and 2 columns (one per metric).',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\ndf = pd.DataFrame({'date': ['d1', 'd2'], 'x': [10, 20], 'y': [30, 40]})\nlong = df.melt(id_vars='date', var_name='metric', value_name='value')\nprint(long.shape)`,
      options: ['(2, 3)', '(4, 3)', '(2, 2)', '(4, 2)'],
      correct: 1,
      explanation:
        'Two rows × two value columns → 4 rows in long format. Each (date, metric) pair is one row. Columns are date, metric, value = 3.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so we build a table of mean score per (class, subject):',
      code: `import pandas as pd\ndf = pd.DataFrame({\n    'class': ['A', 'A', 'B', 'B'],\n    'subject': ['math', 'sci', 'math', 'sci'],\n    'score': [80, 90, 85, 95],\n})\npt = df.___(index='class', columns='subject', values='score', aggfunc='mean')\nprint(pt.shape)`,
      options: ['pivot_table', 'pivot', 'crosstab', 'groupby'],
      correct: 0,
      explanation:
        '`pivot_table` aggregates. Here each (class, subject) is unique so `pivot` would also work, but `pivot_table` is the safer general choice.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `to_wide(df)` that pivots a long-format DataFrame with columns `["date", "metric", "value"]` into wide format (index=date, columns=metric, values=value).',
      starterCode:
        'import pandas as pd\n\ndef to_wide(df):\n    # your code here\n    pass',
      tests: [
        {
          input: `to_wide(pd.DataFrame({'date': ['d1', 'd1', 'd2', 'd2'], 'metric': ['a', 'b', 'a', 'b'], 'value': [1, 2, 3, 4]})).shape`,
          expected: '(2, 2)',
        },
        {
          input: `to_wide(pd.DataFrame({'date': ['d1', 'd1'], 'metric': ['x', 'y'], 'value': [10, 20]})).columns.tolist()`,
          expected: "['x', 'y']",
        },
        {
          input: `to_wide(pd.DataFrame({'date': ['d1', 'd1'], 'metric': ['x', 'y'], 'value': [10, 20]})).iloc[0].tolist()`,
          expected: '[10, 20]',
        },
      ],
      hint: 'Just call `df.pivot(index="date", columns="metric", values="value")`.',
      solution: `import pandas as pd\n\ndef to_wide(df):\n    return df.pivot(index='date', columns='metric', values='value')`,
      explanation:
        'Direct pivot. The result index is `date`, columns are the unique metrics, values are the corresponding values.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `{"g": ["A", "A", "B"], "cat": ["x", "y", "x"]}` and use `pd.crosstab` to count rows per (g, cat). Print the shape.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '(2, 2)',
      hint: '`pd.crosstab(df["g"], df["cat"]).shape` — 2 unique g values × 2 unique cat values.',
      solution: `import pandas as pd\ndf = pd.DataFrame({"g": ["A", "A", "B"], "cat": ["x", "y", "x"]})\nprint(pd.crosstab(df["g"], df["cat"]).shape)`,
      explanation:
        'Crosstab counts rows for each combination. 2 unique g values and 2 unique cat values → a 2×2 table. Missing combinations would be 0.',
      xp: 25,
    },
  ],
};