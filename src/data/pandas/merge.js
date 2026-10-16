// 📘 Pandas — Lesson 5: Merge, Join & Concat

export const pandasMergeLesson = {
  id: 'pandas-merge',
  title: 'Merge, Join & Concat',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Real data lives in many tables. Merge brings them together by a shared key, concat stacks them. This is the relational algebra of pandas — and it is what SQL JOINs look like in Python.',
  sections: [
    {
      type: 'text',
      content:
        'Two core operations: **merge** combines tables side-by-side on a key (SQL JOIN), **concat** stacks tables on top or beside each other. Every dataframe combine is one of these two.',
    },
    {
      type: 'code',
      content: 'Two related tables:',
      code: `import pandas as pd\n\nusers = pd.DataFrame({\n    'user_id': [1, 2, 3, 4],\n    'name':    ['Ada', 'Alan', 'Grace', 'Linus'],\n})\norders = pd.DataFrame({\n    'user_id': [1, 1, 2, 4, 4, 4],\n    'amount':  [100, 50, 200, 30, 45, 25],\n})\nprint(users)\nprint(orders)`,
      output: `   user_id   name\n0        1    Ada\n1        2   Alan\n2        3  Grace\n3        4  Linus\n   user_id  amount\n0        1     100\n1        1      50\n2        2     200\n3        4      30\n4        4      45\n5        4      25`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'The default merge is an **inner join** — only keys present in BOTH tables are kept. If a user has no orders, they disappear from the result.',
    },
    {
      type: 'code',
      content: 'Inner join — only matching keys:',
      code: `merged = users.merge(orders, on='user_id')\nprint(merged.to_dict('records'))\nprint(merged.shape)`,
      output: `[{'user_id': 1, 'name': 'Ada', 'amount': 100}, {'user_id': 1, 'name': 'Ada', 'amount': 50}, {'user_id': 2, 'name': 'Alan', 'amount': 200}, {'user_id': 4, 'name': 'Linus', 'amount': 30}, {'user_id': 4, 'name': 'Linus', 'amount': 45}, {'user_id': 4, 'name': 'Linus', 'amount': 25}]\n(6, 3)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'User 3 (Grace) has no orders — she is dropped. The result has one row per (user, order) pair — users with more orders appear more times. This is a "one-to-many" merge.',
    },
    {
      type: 'text',
      content:
        'The four join types: **inner** (default), **left**, **right**, **outer**. Left keeps every row from the left table, filling with NaN where the right table has no match.',
    },
    {
      type: 'code',
      content: 'Left, right, outer joins:',
      code: `left  = users.merge(orders, on='user_id', how='left')\nright = users.merge(orders, on='user_id', how='right')\nouter = users.merge(orders, on='user_id', how='outer')\n\nprint('left rows:', left.shape[0])\nprint('right rows:', right.shape[0])\nprint('outer rows:', outer.shape[0])`,
      output: `left rows: 7\nright rows: 6\nouter rows: 7`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Left join keeps Grace (with NaN amount). Right join keeps every order even if user data was missing. Outer keeps everything from both sides. Rows multiply when the key appears multiple times — always check row counts.',
    },
    {
      type: 'text',
      content:
        'Different key names in each table? Use `left_on=` and `right_on=`.',
    },
    {
      type: 'code',
      content: 'Different key names:',
      code: `users2 = pd.DataFrame({\n    'id':   [1, 2, 3],\n    'name': ['Ada', 'Alan', 'Grace'],\n})\norders2 = pd.DataFrame({\n    'user_id': [1, 2, 2],\n    'amount':  [100, 200, 50],\n})\nmerged2 = users2.merge(orders2, left_on='id', right_on='user_id')\nprint(merged2.columns.tolist())`,
      output: `['id', 'name', 'user_id', 'amount']`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Both key columns are kept when names differ. To drop the redundant one: `merged2.drop(columns="user_id")`. Or merge with `left_on="id", right_on="user_id"` and then `drop`.',
    },
    {
      type: 'text',
      content:
        'If BOTH tables have a column that is not the join key, pandas adds `_x` and `_y` suffixes. Control this with `suffixes=`.',
    },
    {
      type: 'code',
      content: 'Overlapping column names → suffixes:',
      code: `a = pd.DataFrame({'k': [1, 2], 'val': ['a1', 'a2']})\nb = pd.DataFrame({'k': [1, 2], 'val': ['b1', 'b2']})\nmerged = a.merge(b, on='k')\nprint(merged.columns.tolist())\n\nmerged2 = a.merge(b, on='k', suffixes=('_left', '_right'))\nprint(merged2.columns.tolist())`,
      output: `['k', 'val_x', 'val_y']\n['k', 'val_left', 'val_right']`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`suffixes=("_left", "_right")` is easier to read than the default `_x`/`_y`, especially with many overlapping columns. Set it whenever you merge real tables.',
    },
    {
      type: 'text',
      content:
        '`pd.concat()` stacks multiple DataFrames. `axis=0` (default) piles rows; `axis=1` glues columns side by side.',
    },
    {
      type: 'code',
      content: 'concat — rows vs columns:',
      code: `df1 = pd.DataFrame({'a': [1, 2], 'b': [3, 4]})\ndf2 = pd.DataFrame({'a': [5, 6], 'b': [7, 8]})\n\nrows = pd.concat([df1, df2], axis=0, ignore_index=True)\ncols = pd.concat([df1, df2], axis=1)\n\nprint(rows.to_dict('records'))\nprint(cols.columns.tolist())`,
      output: `[{'a': 1, 'b': 3}, {'a': 2, 'b': 4}, {'a': 5, 'b': 7}, {'a': 6, 'b': 8}]\n['a', 'b', 'a', 'b']`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Stacking rows without `ignore_index=True` keeps the original indices — you get duplicate 0, 1, 0, 1. Almost always pass `ignore_index=True` when concatenating rows.',
    },
    {
      type: 'text',
      content:
        'Concat aligns columns by NAME, not position. If one table has an extra column, the other gets NaN in that column.',
    },
    {
      type: 'code',
      content: 'Concat with mismatched columns:',
      code: `a = pd.DataFrame({'x': [1, 2], 'y': [3, 4]})\nb = pd.DataFrame({'x': [5, 6], 'z': [7, 8]})\nout = pd.concat([a, b], ignore_index=True)\nprint(out.to_dict('records'))`,
      output: `[{'x': 1, 'y': 3.0, 'z': nan}, {'x': 2, 'y': 4.0, 'z': nan}, {'x': 5, 'y': nan, 'z': 7.0}, {'x': 6, 'y': nan, 'z': 8.0}]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Column alignment is by name. Missing columns become NaN. Use `.fillna(0)` or `.dropna()` afterward if you want clean output — depends on your use case.',
    },
    {
      type: 'text',
      content:
        'Combine merges with groupby to answer business questions: "total amount spent per user, including users who spent nothing".',
    },
    {
      type: 'code',
      content: 'Merge + groupby — the classic pattern:',
      code: `totals = (orders\n    .groupby('user_id')['amount']\n    .sum()\n    .reset_index()\n)\nresult = users.merge(totals, on='user_id', how='left').fillna({'amount': 0})\nprint(result.to_dict('records'))`,
      output: `[{'user_id': 1, 'name': 'Ada', 'amount': 150}, {'user_id': 2, 'name': 'Alan', 'amount': 200}, {'user_id': 3, 'name': 'Grace', 'amount': 0.0}, {'user_id': 4, 'name': 'Linus', 'amount': 100}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'This is the workhorse pattern of analytics: group one table, merge onto another, fill missing with 0. Every "per user" dashboard query uses this shape.',
    },
    {
      type: 'tip',
      content:
        'That is merge and concat. Inner, left, right, outer joins; suffixes; side-by-side and stacked concat; and the groupby-merge pattern. This is the SQL you will write in pandas for the rest of your life.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is the difference between `merge` and `concat`?',
      options: [
        'They are the same',
        '`merge` joins on a key (side-by-side); `concat` stacks tables (rows or columns)',
        '`concat` only works with numbers',
        '`merge` is faster',
      ],
      correct: 1,
      explanation:
        'Merge is SQL-style join on a shared key. Concat stacks multiple DataFrames along an axis — usually rows. Both combine tables but with very different semantics.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What is the number of rows in the result?',
      code: `import pandas as pd\nleft = pd.DataFrame({'id': [1, 2, 3], 'a': ['x', 'y', 'z']})\nright = pd.DataFrame({'id': [2, 3, 4], 'b': [10, 20, 30]})\nprint(left.merge(right, on='id').shape[0])`,
      options: ['1', '2', '3', '6'],
      correct: 1,
      explanation:
        'Default inner join keeps only ids present in BOTH tables: 2 and 3. That is 2 rows. id 1 is only in left, id 4 only in right.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\na = pd.DataFrame({'x': [1, 2]})\nb = pd.DataFrame({'x': [3, 4]})\nprint(pd.concat([a, b], ignore_index=True)['x'].tolist())`,
      options: ['[1, 2, 3, 4]', '[1, 3, 2, 4]', '[1, 2]', 'Error'],
      correct: 0,
      explanation:
        '`concat` with `axis=0` stacks rows. `ignore_index=True` renumbers the index 0..3. The x column becomes [1, 2, 3, 4].',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so we keep every user, even those without orders (filling missing with NaN):',
      code: `import pandas as pd\nusers = pd.DataFrame({'id': [1, 2, 3], 'name': ['A', 'B', 'C']})\norders = pd.DataFrame({'id': [1, 1], 'amt': [10, 20]})\nresult = users.merge(orders, on='id', how='___')\nprint(result.shape[0])`,
      options: ['left', 'right', 'inner', 'outer'],
      correct: 0,
      explanation:
        'A **left** join keeps every row from the left table (users). Users without orders get NaN in the `amt` column — row count stays the same or grows if there are multiple orders.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `attach_avg(df, lookup, key, value_col)` that adds a new column `"group_avg"` to `df` by looking up the mean of `value_col` per group in `lookup` (grouped by `key`). Assume `lookup` has columns `key` and `value_col`.',
      starterCode:
        'import pandas as pd\n\ndef attach_avg(df, lookup, key, value_col):\n    # your code here\n    pass',
      tests: [
        {
          input: `attach_avg(pd.DataFrame({'k': ['A', 'B']}), pd.DataFrame({'k': ['A', 'A', 'B'], 'v': [10, 20, 30]}), 'k', 'v')['group_avg'].tolist()`,
          expected: '[15.0, 30.0]',
        },
        {
          input: `attach_avg(pd.DataFrame({'k': ['A']}), pd.DataFrame({'k': ['A', 'A'], 'v': [1, 3]}), 'k', 'v')['group_avg'].tolist()`,
          expected: '[2.0]',
        },
        {
          input: `attach_avg(pd.DataFrame({'k': ['A']}), pd.DataFrame({'k': ['A', 'A'], 'v': [1, 3]}), 'k', 'v').columns.tolist()`,
          expected: "['k', 'group_avg']",
        },
      ],
      hint: 'Group lookup by key, take mean of value_col, reset_index with name="group_avg", then merge onto df with how="left".',
      solution: `import pandas as pd\n\ndef attach_avg(df, lookup, key, value_col):\n    agg = lookup.groupby(key)[value_col].mean().reset_index(name='group_avg')\n    return df.merge(agg, on=key, how='left')`,
      explanation:
        'Classic groupby → merge pattern. Group the lookup table, extract the mean per key, then merge onto the target. Left join keeps all original rows.',
      xp: 35,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Stack `pd.DataFrame({"x": [1, 2]})` and `pd.DataFrame({"x": [3, 4]})` with `ignore_index=True` and print the `x` values.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '0    1\n1    2\n2    3\n3    4\nName: x, dtype: int64',
      hint: '`pd.concat([a, b], ignore_index=True)["x"]` gives a Series. Printing shows index on the left.',
      solution: `import pandas as pd\na = pd.DataFrame({"x": [1, 2]})\nb = pd.DataFrame({"x": [3, 4]})\nprint(pd.concat([a, b], ignore_index=True)["x"])`,
      explanation:
        '`concat` stacks the rows. `ignore_index=True` renumbers 0..3. The result of selecting a single column is a Series — printing shows the index and name/dtype header.',
      xp: 25,
    },
  ],
};