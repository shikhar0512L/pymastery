// 📘 Pandas — Lesson 6: Sorting & Ranking

export const pandasSortRankLesson = {
  id: 'pandas-sort-rank',
  title: 'Sorting & Ranking',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'After analyzing data you almost always want the extremes: top performers, worst sellers, biggest customers. Sorting and ranking surface those records instantly.',
  sections: [
    {
      type: 'text',
      content:
        'Sorting reorders the rows. Ranking adds a numeric rank to each. Both are foundational for reporting, leaderboards, and feature engineering (rank is a classic ML feature).',
    },
    {
      type: 'code',
      content: 'sort_values — basic ascending and descending:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace', 'Linus', 'Ken'],\n    'score': [92, 88, 95, 79, 85],\n})\n\nprint(df.sort_values('score')['name'].tolist())\nprint(df.sort_values('score', ascending=False)['name'].tolist())`,
      output: `['Linus', 'Ken', 'Alan', 'Ada', 'Grace']\n['Grace', 'Ada', 'Alan', 'Ken', 'Linus']`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`sort_values()` returns a NEW DataFrame. The original is untouched unless you reassign or pass `inplace=True`. Same rule as `dropna()`, `rename()`, `fillna()`. Never assume mutation.',
    },
    {
      type: 'text',
      content:
        'Multi-column sort — pass a list of columns and a matching list of ascending flags. The first column is primary; later columns break ties.',
    },
    {
      type: 'code',
      content: 'Multi-column sorting:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'team':  ['A', 'B', 'A', 'B', 'A'],\n    'score': [88, 92, 95, 85, 90],\n})\n\nsorted_df = df.sort_values(['team', 'score'], ascending=[True, False])\nprint(sorted_df.to_dict('records'))`,
      output: `[{'team': 'A', 'score': 95}, {'team': 'A', 'score': 90}, {'team': 'A', 'score': 88}, {'team': 'B', 'score': 92}, {'team': 'B', 'score': 85}]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Team A first (alphabetical), then within team A, score high to low. `ascending=[True, False]` means "team ascending, score descending". One boolean per column, in order.',
    },
    {
      type: 'text',
      content:
        '`.nlargest()` and `.nsmallest()` are the fast path to "top N" or "bottom N". They do not sort the whole column — they use a heap and only find what they need.',
    },
    {
      type: 'code',
      content: 'Top and bottom records:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace', 'Linus', 'Ken'],\n    'score': [92, 88, 95, 79, 85],\n})\n\nprint(df.nlargest(2, 'score')[['name', 'score']].to_dict('records'))\nprint(df.nsmallest(2, 'score')[['name', 'score']].to_dict('records'))`,
      output: `[{'name': 'Grace', 'score': 95}, {'name': 'Ada', 'score': 92}]\n[{'name': 'Linus', 'score': 79}, {'name': 'Ken', 'score': 85}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'For large DataFrames, `.nlargest(10, col)` is dramatically faster than `.sort_values(col).head(10)`. It never allocates a fully sorted copy — it just tracks the top 10. Use it whenever you only need the extremes.',
    },
    {
      type: 'text',
      content:
        '`.rank()` assigns a numeric rank to each value. Ranks are a classic feature in ML models — sometimes a rank position is more informative than the raw value.',
    },
    {
      type: 'code',
      content: 'Basic ranking:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace', 'Linus', 'Ken'],\n    'score': [92, 88, 95, 79, 85],\n})\n\ndf['rank_high'] = df['score'].rank(ascending=False)\ndf['rank_low']  = df['score'].rank()\nprint(df[['name', 'score', 'rank_high', 'rank_low']].to_dict('records'))`,
      output: `[{'name': 'Ada', 'score': 92, 'rank_high': 2.0, 'rank_low': 4.0}, {'name': 'Alan', 'score': 88, 'rank_high': 3.0, 'rank_low': 3.0}, {'name': 'Grace', 'score': 95, 'rank_high': 1.0, 'rank_low': 5.0}, {'name': 'Linus', 'score': 79, 'rank_high': 5.0, 'rank_low': 1.0}, {'name': 'Ken', 'score': 85, 'rank_high': 4.0, 'rank_low': 2.0}]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`.rank()` returns FLOAT values, even when the ranks are all integers. That is because ties produce fractional ranks. Cast with `.astype(int)` if you need integer output and have no ties.',
    },
    {
      type: 'text',
      content:
        'Ties are handled by the `method=` parameter. The four common modes change the answer meaningfully.',
    },
    {
      type: 'code',
      content: 'Rank methods for ties:',
      code: `import pandas as pd\n\ns = pd.Series([10, 20, 20, 30, 40])\nprint('average:', s.rank(ascending=False, method='average').tolist())\nprint('min:    ', s.rank(ascending=False, method='min').tolist())\nprint('max:    ', s.rank(ascending=False, method='max').tolist())\nprint('dense:  ', s.rank(ascending=False, method='dense').tolist())\nprint('first:  ', s.rank(ascending=False, method='first').tolist())`,
      output: `average: [5.0, 2.5, 2.5, 4.0, 1.0]\nmin:     [5.0, 2.0, 2.0, 4.0, 1.0]\nmax:     [5.0, 3.0, 3.0, 4.0, 1.0]\ndense:   [4.0, 2.0, 2.0, 3.0, 1.0]\nfirst:   [5.0, 2.0, 3.0, 4.0, 1.0]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The two tied 20s: **average** gives both 2.5 (sharing rank 2 and 3), **min** gives both 2, **max** gives both 3, **dense** gives both 2 and no gaps (next rank is 3), **first** gives 2 and 3 in original order. Default is "average".',
    },
    {
      type: 'text',
      content:
        'Rank inside a group — combine `groupby` with `rank`. This is the "rank within department" pattern, extremely common in HR and sales analytics.',
    },
    {
      type: 'code',
      content: 'Rank within groups:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'team':  ['A', 'A', 'B', 'B', 'A'],\n    'score': [88, 95, 92, 85, 90],\n})\n\ndf['rank_in_team'] = df.groupby('team')['score'].rank(ascending=False)\nprint(df.to_dict('records'))`,
      output: `[{'team': 'A', 'score': 88, 'rank_in_team': 3.0}, {'team': 'A', 'score': 95, 'rank_in_team': 1.0}, {'team': 'B', 'score': 92, 'rank_in_team': 1.0}, {'team': 'B', 'score': 85, 'rank_in_team': 2.0}, {'team': 'A', 'score': 90, 'rank_in_team': 2.0}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'This is how you build a leaderboard per category. Group by the category, rank the metric, and each row knows its position within its group. Combine with `.query("rank_in_team == 1")` to get only the top of each group.',
    },
    {
      type: 'text',
      content:
        'Sorting also works on text and dates. Case sensitivity matters, and by default pandas treats uppercase before lowercase.',
    },
    {
      type: 'code',
      content: 'Sorting text and dates:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name': ['banana', 'Apple', 'cherry', 'Banana'],\n    'date': ['2024-03-01', '2024-01-15', '2024-02-20', '2024-01-01'],\n})\ndf['date'] = pd.to_datetime(df['date'])\n\nprint('sort by name (default): ', df.sort_values('name')['name'].tolist())\nprint('sort by name (case-fold):', df.assign(name_lower=df['name'].str.lower()).sort_values('name_lower')['name'].tolist())\nprint('sort by date:            ', df.sort_values('date')['date'].dt.strftime('%Y-%m-%d').tolist())`,
      output: `sort by name (default):  ['Apple', 'Banana', 'banana', 'cherry']\nsort by name (case-fold): ['Apple', 'banana', 'Banana', 'cherry']\nsort by date:             ['2024-01-01', '2024-01-15', '2024-02-20', '2024-03-01']`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Default text sort is case-sensitive — uppercase letters come before lowercase in ASCII order. So "Banana" < "banana". If you want a natural alphabetical order, sort on a lowercased copy.',
    },
    {
      type: 'text',
      content:
        'Sorting is stable — ties keep their original relative order. This lets you chain sorts to build a compound ordering without a multi-column call.',
    },
    {
      type: 'code',
      content: 'Stable sort → chained ordering:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'team':  ['A', 'B', 'A', 'B', 'A'],\n    'score': [88, 92, 88, 92, 90],\n})\n\n# Sort by score asc, then by team asc\nresult = df.sort_values('score').sort_values('team')\nprint(result.to_dict('records'))`,
      output: `[{'team': 'A', 'score': 88}, {'team': 'A', 'score': 88}, {'team': 'A', 'score': 90}, {'team': 'B', 'score': 92}, {'team': 'B', 'score': 92}]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Chained sorts work because pandas sort is stable. The second sort (by team) does not scramble the score order within each team. Modern pandas prefers `sort_values(["team", "score"])` — same result, one call.',
    },
    {
      type: 'tip',
      content:
        'That is sorting and ranking. `sort_values` for full ordering, `nlargest`/`nsmallest` for extremes, `rank` for positions (with tie handling), `groupby().rank()` for leaderboards. Every report you will ever build uses these.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question:
        'You want the top 10 highest-paid employees from a 1M-row DataFrame. Which is fastest?',
      options: [
        'df.sort_values("salary", ascending=False).head(10)',
        'df.nlargest(10, "salary")',
        'df[df["salary"] > df["salary"].mean()].head(10)',
        'df.apply(lambda r: r["salary"] > 50000, axis=1).head(10)',
      ],
      correct: 1,
      explanation:
        '`.nlargest(n, col)` uses a heap — O(n log k) where k is the count — instead of fully sorting all 1M rows. Much faster on large DataFrames.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ndf = pd.DataFrame({'x': [3, 1, 4, 1, 5, 9, 2]})\nprint(df.sort_values('x', ascending=False)['x'].head(3).tolist())`,
      options: ['[9, 5, 4]', '[9, 5, 4, 3]', '[1, 1, 2]', '[5, 4, 3]'],
      correct: 0,
      explanation:
        'Sort descending: [9, 5, 4, 3, 2, 1, 1]. Take first 3: [9, 5, 4].',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\ns = pd.Series([10, 20, 20, 30])\nprint(s.rank(ascending=False, method='min').tolist())`,
      options: ['[4.0, 2.5, 2.5, 1.0]', '[4.0, 2.0, 2.0, 1.0]', '[4.0, 3.0, 3.0, 1.0]', '[1.0, 2.0, 3.0, 4.0]'],
      correct: 1,
      explanation:
        'Descending order: [30, 20, 20, 10]. The two 20s would occupy ranks 2 and 3; `method="min"` gives both rank 2. Result: [4.0, 2.0, 2.0, 1.0].',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so each employee is ranked within their own team (highest score = rank 1):',
      code: `import pandas as pd\ndf = pd.DataFrame({'team': ['A', 'A', 'B'], 'score': [80, 90, 85]})\ndf['rank_in_team'] = df.___('team')['score'].rank(ascending=False)\nprint(df['rank_in_team'].tolist())`,
      options: ['groupby', 'sort_values', 'apply', 'split'],
      correct: 0,
      explanation:
        '`groupby("team")["score"].rank()` ranks each team separately. Without the groupby, ranks would be global across all rows.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `top_n(df, column, n)` that returns the top n rows of `df` sorted descending by `column`. Return a DataFrame with the original columns, index reset.',
      starterCode:
        'import pandas as pd\n\ndef top_n(df, column, n):\n    # your code here\n    pass',
      tests: [
        {
          input: `top_n(pd.DataFrame({'name': ['A', 'B', 'C'], 's': [10, 30, 20]}), 's', 2)['name'].tolist()`,
          expected: "['B', 'C']",
        },
        {
          input: `top_n(pd.DataFrame({'name': ['A', 'B', 'C'], 's': [10, 30, 20]}), 's', 5).shape`,
          expected: '(3, 2)',
        },
        {
          input: `top_n(pd.DataFrame({'name': ['A', 'B', 'C'], 's': [10, 30, 20]}), 's', 1).iloc[0]['s']`,
          expected: '30',
        },
      ],
      hint: 'Use `.nlargest(n, column)` and `.reset_index(drop=True)`.',
      solution: `import pandas as pd\n\ndef top_n(df, column, n):\n    return df.nlargest(n, column).reset_index(drop=True)`,
      explanation:
        '`.nlargest()` returns the top n rows efficiently; `.reset_index(drop=True)` renumbers 0..n-1 so downstream code can index cleanly.',
      xp: 35,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `{"x": [3, 1, 2]}`. Sort ascending by `x` and print the `x` column as a list.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '[1, 2, 3]',
      hint: '`df.sort_values("x")["x"].tolist()`',
      solution: `import pandas as pd\ndf = pd.DataFrame({"x": [3, 1, 2]})\nprint(df.sort_values("x")["x"].tolist())`,
      explanation:
        'Default `ascending=True`. Sorted values in ascending order.',
      xp: 20,
    },
  ],
};