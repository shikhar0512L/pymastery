// 📘 Pandas — Lesson 4: GroupBy — Split-Apply-Combine

export const pandasGroupbyLesson = {
  id: 'pandas-groupby',
  title: 'GroupBy — Split-Apply-Combine',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'GroupBy is the single most powerful operation in pandas. Split the data by a key, apply an aggregation, combine the results. Every "average sales per region" question is one groupby.',
  sections: [
    {
      type: 'text',
      content:
        'The split-apply-combine pattern: **split** rows into groups by a key, **apply** an aggregation to each group, **combine** the results into a new DataFrame. That is what `.groupby()` does.',
    },
    {
      type: 'code',
      content: 'A sample dataset — sales by team:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'team':  ['A', 'B', 'A', 'B', 'A', 'B', 'A'],\n    'sales': [100, 200, 150, 180, 120, 220, 130],\n})\nprint(df)`,
      output: `  team  sales\n0    A    100\n1    B    200\n2    A    150\n3    B    180\n4    A    120\n5    B    220\n6    A    130`,
      language: 'python',
    },
    {
      type: 'code',
      content: 'Split into groups — inspect them:',
      code: `groups = df.groupby('team')\nprint(type(groups).__name__)\n\nfor name, sub in groups:\n    print(name, sub['sales'].tolist())`,
      output: `DataFrameGroupBy\nA [100, 150, 120, 130]\nB [200, 180, 220]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'A GroupBy object is lazy — it does not compute anything until you ask. Iterating, calling `.sum()`, `.mean()`, etc. triggers the compute. This is why `df.groupby("x")` alone returns a GroupBy object, not a DataFrame.',
    },
    {
      type: 'text',
      content:
        'The shortcut: after `.groupby("col")`, call an aggregation method. The result is a DataFrame indexed by the group key.',
    },
    {
      type: 'code',
      content: 'Sum, mean, count, max by team:',
      code: `print(df.groupby('team')['sales'].sum().to_dict())\nprint(df.groupby('team')['sales'].mean().round(2).to_dict())\nprint(df.groupby('team')['sales'].count().to_dict())\nprint(df.groupby('team')['sales'].max().to_dict())`,
      output: `{'A': 500, 'B': 600}\n{'A': 125.0, 'B': 200.0}\n{'A': 4, 'B': 3}\n{'A': 150, 'B': 220}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`.groupby("team")["sales"]` narrows the operation to just the `sales` column. Without the column selector, `.sum()` aggregates every numeric column — great when you want the full summary in one call.',
    },
    {
      type: 'text',
      content:
        '`.agg()` lets you compute multiple aggregations at once — either on one column or across several. This is where groupby gets really useful.',
    },
    {
      type: 'code',
      content: 'Multiple aggregations with .agg():',
      code: `result = df.groupby('team')['sales'].agg(['sum', 'mean', 'max', 'count'])\nprint(result.to_dict())`,
      output: `{'sum': {'A': 500, 'B': 600}, 'mean': {'A': 125.0, 'B': 200.0}, 'max': {'A': 150, 'B': 220}, 'count': {'A': 4, 'B': 3}}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Different columns → different aggregations: pass a dict. This is the classic "sales: sum, price: mean" pattern.',
    },
    {
      type: 'code',
      content: 'Per-column aggregations with dict:',
      code: `df2 = pd.DataFrame({\n    'team':  ['A', 'B', 'A', 'B'],\n    'sales': [100, 200, 150, 180],\n    'price': [10, 12, 11, 13],\n})\nresult = df2.groupby('team').agg({'sales': 'sum', 'price': 'mean'})\nprint(result.round(2).to_dict())`,
      output: `{'sales': {'A': 250, 'B': 380}, 'price': {'A': 10.5, 'B': 12.5}}`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'When you pass a dict to `.agg()`, the returned DataFrame keeps the original column names as top-level columns. When you pass a list (`["sum", "mean"]`) to a Series-GroupBy, columns become the aggregation names. Watch out for the schema.',
    },
    {
      type: 'text',
      content:
        '`.transform()` returns a result with the SAME shape as the original. Perfect for adding a group-level aggregate back as a new column.',
    },
    {
      type: 'code',
      content: 'transform — group-mean broadcast back:',
      code: `df['team_mean'] = df.groupby('team')['sales'].transform('mean')\ndf['vs_mean']   = df['sales'] - df['team_mean']\nprint(df[['team', 'sales', 'team_mean', 'vs_mean']].to_dict('records'))`,
      output: `[{'team': 'A', 'sales': 100, 'team_mean': 125.0, 'vs_mean': -25.0}, {'team': 'B', 'sales': 200, 'team_mean': 200.0, 'vs_mean': 0.0}, {'team': 'A', 'sales': 150, 'team_mean': 125.0, 'vs_mean': 25.0}, {'team': 'B', 'sales': 180, 'team_mean': 200.0, 'vs_mean': -20.0}, {'team': 'A', 'sales': 120, 'team_mean': 125.0, 'vs_mean': -5.0}, {'team': 'B', 'sales': 220, 'team_mean': 200.0, 'vs_mean': 20.0}, {'team': 'A', 'sales': 130, 'team_mean': 125.0, 'vs_mean': 5.0}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'This is a powerful pattern: `groupby().transform("mean")` gives every row its group\'s mean. Subtract to see how each row compares to its group. You will use this in almost every analytics task.',
    },
    {
      type: 'text',
      content:
        'Group by MULTIPLE columns — pass a list. The result index becomes a MultiIndex, one level per grouping key.',
    },
    {
      type: 'code',
      content: 'Grouping by multiple columns:',
      code: `df3 = pd.DataFrame({\n    'team':   ['A', 'A', 'B', 'B', 'A', 'B'],\n    'region': ['N', 'S', 'N', 'S', 'N', 'S'],\n    'sales':  [100, 200, 150, 250, 120, 180],\n})\nresult = df3.groupby(['team', 'region'])['sales'].sum()\nprint(result.to_dict())`,
      output: `{('A', 'N'): 220, ('A', 'S'): 200, ('B', 'N'): 150, ('B', 'S'): 430}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The result is indexed by BOTH keys (a MultiIndex). `.to_dict()` gives tuple keys. To flatten to columns, use `.reset_index()`.',
    },
    {
      type: 'code',
      content: 'reset_index — flatten MultiIndex to columns:',
      code: `result_df = df3.groupby(['team', 'region'])['sales'].sum().reset_index()\nprint(result_df.to_dict('records'))`,
      output: `[{'team': 'A', 'region': 'N', 'sales': 220}, {'team': 'A', 'region': 'S', 'sales': 200}, {'team': 'B', 'region': 'N', 'sales': 150}, {'team': 'B', 'region': 'S', 'sales': 430}]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`.reset_index()` is your best friend after a groupby. It converts the group keys from index back into regular columns, giving you a flat DataFrame ready for plotting or export.',
    },
    {
      type: 'text',
      content:
        '`.value_counts()` is a groupby under the hood. If you only care about counting unique values, it is the shortcut.',
    },
    {
      type: 'code',
      content: 'value_counts vs groupby count:',
      code: `s = pd.Series(['a', 'b', 'a', 'c', 'a', 'b'])\nprint(s.value_counts().to_dict())`,
      output: `{'a': 3, 'b': 2, 'c': 1}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is groupby. Split-apply-combine, `.agg()` for multiple stats, `.transform()` to broadcast back, multi-column grouping, `.reset_index()`. Every "per category" question is one groupby away.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What does `.groupby("team")["sales"].sum()` return?',
      options: [
        'A single number (the total sum)',
        'A Series indexed by team, with sum of sales per team',
        'A DataFrame with one row per sale',
        'A GroupBy object',
      ],
      correct: 1,
      explanation:
        'Grouping then aggregating gives a Series whose index is the group key and whose values are the aggregates. Adding `.reset_index()` would give a DataFrame instead.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ndf = pd.DataFrame({'g': ['x', 'y', 'x', 'y'], 'v': [1, 2, 3, 4]})\nprint(df.groupby('g')['v'].sum().to_dict())`,
      options: [
        "{'x': 4, 'y': 6}",
        "{'x': 1, 'y': 2}",
        '[1, 2, 3, 4]',
        "{'x': 3, 'y': 4}",
      ],
      correct: 0,
      explanation:
        'Group x has values 1 and 3 → sum 4. Group y has 2 and 4 → sum 6. Result is a Series indexed by group.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the shape of the result?',
      code: `import pandas as pd\ndf = pd.DataFrame({'g': ['a', 'b', 'a'], 'v': [10, 20, 30]})\nresult = df.groupby('g').transform('mean')\nprint(result.shape)`,
      options: ['(2, 1)', '(3, 1)', '(1, 2)', '(3, 2)'],
      correct: 1,
      explanation:
        '`.transform("mean")` returns a result with the SAME number of rows as the original. Each row gets its group mean — 3 rows here, so shape `(3, 1)`.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so we compute sum, mean, and max of `sales` per team in one call:',
      code: `import pandas as pd\ndf = pd.DataFrame({'team': ['A', 'B', 'A'], 'sales': [10, 20, 30]})\nprint(df.groupby('team')['sales'].___(['sum', 'mean', 'max']).to_dict())`,
      options: ['agg', 'apply', 'combine', 'reduce'],
      correct: 0,
      explanation:
        '`.agg(list_of_funcs)` applies each aggregation and returns a DataFrame with one column per aggregation.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `group_mean(df, group_col, value_col)` that returns a DataFrame with two columns: the group and the mean of `value_col` for that group. The result column should be named `"mean"`.',
      starterCode:
        'import pandas as pd\n\ndef group_mean(df, group_col, value_col):\n    # your code here\n    pass',
      tests: [
        {
          input: `group_mean(pd.DataFrame({'t': ['A', 'B', 'A'], 'v': [10, 20, 30]}), 't', 'v').sort_values('t')['mean'].tolist()`,
          expected: '[20.0, 20.0]',
        },
        {
          input: `group_mean(pd.DataFrame({'t': ['A', 'A'], 'v': [1, 3]}), 't', 'v')['mean'].tolist()`,
          expected: '[2.0]',
        },
        {
          input: `group_mean(pd.DataFrame({'t': ['A', 'B'], 'v': [5, 15]}), 't', 'v').columns.tolist()`,
          expected: "['t', 'mean']",
        },
      ],
      hint: 'Use `df.groupby(group_col)[value_col].mean().reset_index(name="mean")` or `.rename(columns={value_col: "mean"})`.',
      solution: `import pandas as pd\n\ndef group_mean(df, group_col, value_col):\n    return df.groupby(group_col)[value_col].mean().reset_index(name='mean')`,
      explanation:
        'GroupBy then mean gives a Series. `.reset_index(name="mean")` turns the group key back into a column and names the value column. The result is a clean 2-column DataFrame.',
      xp: 35,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `{"g": ["x", "y", "x", "y"], "v": [1, 2, 3, 4]}` and print the max of `v` grouped by `g`, sorted by group name.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: 'x    3\ny    4\ndtype: int64',
      hint: '`df.groupby("g")["v"].max()` gives a Series. Printing it shows the group as the index.',
      solution:
        'import pandas as pd\ndf = pd.DataFrame({"g": ["x", "y", "x", "y"], "v": [1, 2, 3, 4]})\nprint(df.groupby("g")["v"].max())',
      explanation:
        'The default `print` of a Series shows the index on the left. Max of group x is 3, group y is 4. Ordering follows sorted group key.',
      xp: 25,
    },
  ],
};