// 📘 Pandas — Lesson 5: Modifying Data & New Columns

export const pandasTransformLesson = {
  id: 'pandas-transform',
  title: 'Modifying Data & New Columns',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Analysis is not just reading columns — it is building new ones. This is feature engineering: the skill that turns raw data into signals a model can actually learn from.',
  sections: [
    {
      type: 'text',
      content:
        'Three levels of column creation, in order of preference: **direct math** (fastest, vectorized), **`map()`** (dictionary substitution), **`apply()`** (custom logic with branching). Reach for the simplest one that fits.',
    },
    {
      type: 'code',
      content: 'Direct math — always try this first:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':    ['Ada', 'Alan', 'Grace', 'Linus'],\n    'salary':  [40000, 65000, 50000, 80000],\n    'bonus_pct': [0.1, 0.15, 0.12, 0.2],\n})\n\ndf['annual']    = df['salary'] * 12\ndf['bonus']     = df['salary'] * df['bonus_pct']\ndf['total']     = df['salary'] + df['bonus']\nprint(df[['name', 'salary', 'annual', 'bonus', 'total']].to_dict('records'))`,
      output: `[{'name': 'Ada', 'salary': 40000, 'annual': 480000, 'bonus': 4000.0, 'total': 44000.0}, {'name': 'Alan', 'salary': 65000, 'annual': 780000, 'bonus': 9750.0, 'total': 74750.0}, {'name': 'Grace', 'salary': 50000, 'annual': 600000, 'bonus': 6000.0, 'total': 56000.0}, {'name': 'Linus', 'salary': 80000, 'annual': 960000, 'bonus': 16000.0, 'total': 96000.0}]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Assigning to a new column name creates it. Assigning to an existing name overwrites it. Both operations are vectorized — no loop, no `apply()`, just one line per column.',
    },
    {
      type: 'tip',
      content:
        'If a transformation can be expressed as arithmetic on whole columns, it **always should be**. Direct math is 10-100× faster than `apply()` and never has edge-case bugs.',
    },
    {
      type: 'text',
      content:
        'When values need to be **replaced by a lookup**, use `.map(dict)`. It swaps every value using the dictionary — no function needed.',
    },
    {
      type: 'code',
      content: 'map() with a dictionary:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':       ['Ada', 'Alan', 'Grace', 'Linus'],\n    'department': ['Engineering', 'Marketing', 'Engineering', 'HR'],\n})\n\ndept_codes = {'Engineering': 'ENG', 'Marketing': 'MKT', 'HR': 'HR', 'Finance': 'FIN'}\ndf['code'] = df['department'].map(dept_codes)\nprint(df.to_dict('records'))`,
      output: `[{'name': 'Ada', 'department': 'Engineering', 'code': 'ENG'}, {'name': 'Alan', 'department': 'Marketing', 'code': 'MKT'}, {'name': 'Grace', 'department': 'Engineering', 'code': 'ENG'}, {'name': 'Linus', 'department': 'HR', 'code': 'HR'}]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'If a value is NOT in the dictionary, `map()` returns `NaN` for that cell — silently. Always check with `.isna().sum()` after a map, or verify your dictionary covers every unique value: `set(df["col"].unique()) - set(mapping.keys())`.',
    },
    {
      type: 'text',
      content:
        'When the logic has **branching** (if/elif/else), use `.apply()`. Pass a named function for anything longer than one line.',
    },
    {
      type: 'code',
      content: 'apply() with a named function:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':  ['Ada', 'Alan', 'Grace', 'Linus', 'Ken'],\n    'score': [92, 88, 95, 79, 85],\n})\n\ndef grade(score):\n    if score >= 90:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    else:\n        return 'C'\n\ndf['grade'] = df['score'].apply(grade)\nprint(df.to_dict('records'))`,
      output: `[{'name': 'Ada', 'score': 92, 'grade': 'A'}, {'name': 'Alan', 'score': 88, 'grade': 'B'}, {'name': 'Grace', 'score': 95, 'grade': 'A'}, {'name': 'Linus', 'score': 79, 'grade': 'C'}, {'name': 'Ken', 'score': 85, 'grade': 'B'}]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`apply()` runs your function once per row — under the hood it is a Python loop. That makes it flexible but slower than direct math. Use it when you genuinely need branching, not for arithmetic.',
    },
    {
      type: 'text',
      content:
        'For short, throwaway logic, use a **lambda** — a one-line anonymous function. Same result, no `def` block.',
    },
    {
      type: 'code',
      content: 'apply() with a lambda:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({'name': ['Ada', 'Alan', 'Grace', 'Linus'], 'salary': [40000, 65000, 50000, 80000]})\n\ndf['level'] = df['salary'].apply(lambda s: 'Senior' if s >= 60000 else 'Junior')\nprint(df.to_dict('records'))`,
      output: `[{'name': 'Ada', 'salary': 40000, 'level': 'Junior'}, {'name': 'Alan', 'salary': 65000, 'level': 'Senior'}, {'name': 'Grace', 'salary': 50000, 'level': 'Junior'}, {'name': 'Linus', 'salary': 80000, 'level': 'Senior'}]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'A lambda is a single EXPRESSION — the if/else has to be the inline ternary form `"A" if cond else "B"`. A statement-form `lambda x: if x > 5: ...` is a SyntaxError. If you need multiple branches, use a named `def` instead.',
    },
    {
      type: 'text',
      content:
        'You can also apply the same logic across **every column at once** by using `apply()` on the DataFrame itself (axis=0 = columns, axis=1 = rows). Usually you do not want this — but it is useful for broadcasting transformations across many fields.',
    },
    {
      type: 'code',
      content: 'apply() across a whole DataFrame:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})\n\n# Sum each column (axis=0 default)\nprint(df.apply(sum).to_dict())\n\n# Sum each row\nprint(df.apply(sum, axis=1).tolist())`,
      output: `{'a': 6, 'b': 15}\n[5, 7, 9]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Row-wise apply (`axis=1`) is the slowest form. It constructs a Series for every row before calling your function. Prefer vectorized column operations when possible — you almost never need `axis=1` in modern pandas.',
    },
    {
      type: 'text',
      content:
        'Real feature engineering: build meaningful derived features from existing columns. This is exactly what ML pipelines do — the model never sees raw data, only engineered features.',
    },
    {
      type: 'code',
      content: 'Real feature engineering:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    'name':       ['Ada', 'Alan', 'Grace', 'Linus'],\n    'salary':     [40000, 65000, 50000, 80000],\n    'experience': [2, 8, 4, 12],\n    'score':      [85, 92, 88, 95],\n})\n\n# Binary flags\ndf['senior']        = (df['experience'] >= 5).astype(int)\ndf['high_earner']   = (df['salary'] > 60000).astype(int)\n\n# Bucketed categories\ndf['exp_level']     = pd.cut(df['experience'], bins=[0, 2, 5, 100], labels=['Junior', 'Mid', 'Senior'])\n\n# Composite metric\ndf['score_per_year'] = (df['score'] / df['experience'].clip(lower=1)).round(2)\n\nprint(df.to_dict('records'))`,
      output: `[{'name': 'Ada', 'salary': 40000, 'experience': 2, 'score': 85, 'senior': 0, 'high_earner': 0, 'exp_level': 'Mid', 'score_per_year': 42.5}, {'name': 'Alan', 'salary': 65000, 'experience': 8, 'score': 92, 'senior': 1, 'high_earner': 1, 'exp_level': 'Senior', 'score_per_year': 11.5}, {'name': 'Grace', 'salary': 50000, 'experience': 4, 'score': 88, 'senior': 0, 'high_earner': 0, 'exp_level': 'Mid', 'score_per_year': 22.0}, {'name': 'Linus', 'salary': 80000, 'experience': 12, 'score': 95, 'senior': 1, 'high_earner': 1, 'exp_level': 'Senior', 'score_per_year': 7.92}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Three patterns of feature engineering: **flags** (True/False as 0/1), **buckets** (`pd.cut` — continuous → categorical), **ratios** (combine columns). Every ML pipeline you will ever build uses these three.',
    },
    {
      type: 'text',
      content:
        'When to use which? The decision table:',
    },
    {
      type: 'code',
      content: 'Decision table:',
      code: `# Direct math → arithmetic on columns\n#   df["total"] = df["price"] * df["qty"]\n\n# map() → value-to-value substitution\n#   df["code"] = df["dept"].map({"A": "X", "B": "Y"})\n\n# apply(lambda) → short branching\n#   df["level"] = df["score"].apply(lambda s: "Hi" if s > 5 else "Lo")\n\n# apply(def) → long branching, multiple statements\n#   df["grade"] = df["score"].apply(compute_grade)`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'A custom function that forgets `return` produces a column full of `None` — silently, no error. If a new column is all `None` or all `NaN`, check that every code path in your function returns a value.',
    },
    {
      type: 'code',
      content: 'Adding a column with assign() — method-chaining friendly:',
      code: `import pandas as pd\n\ndf = pd.DataFrame({'price': [10, 20, 30], 'qty': [2, 3, 4]})\n\nout = (df\n    .assign(total=lambda d: d['price'] * d['qty'])\n    .assign(total_with_tax=lambda d: (d['total'] * 1.18).round(2))\n)\nprint(out.to_dict('records'))`,
      output: `[{'price': 10, 'qty': 2, 'total': 20, 'total_with_tax': 23.6}, {'price': 20, 'qty': 3, 'total': 60, 'total_with_tax': 70.8}, {'price': 30, 'qty': 4, 'total': 120, 'total_with_tax': 141.6}]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`.assign()` returns a NEW DataFrame each time — perfect for chaining. The lambda receives the accumulated DataFrame, so you can build on earlier columns. Use it when you want to write pipelines instead of mutating in place.',
    },
    {
      type: 'tip',
      content:
        'That is column creation. Direct math first, `map()` for lookups, `apply()` only when you need branching, `.assign()` for chains. Master this and you can reshape any dataset into model-ready features.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Which is the fastest way to create a new column `df["total"] = price × qty`?',
      options: [
        'df.apply(lambda r: r["price"] * r["qty"], axis=1)',
        'df["total"] = df["price"] * df["qty"]',
        'A for-loop over rows',
        'df.agg({"total": "prod"})',
      ],
      correct: 1,
      explanation:
        'Direct vectorized math is always fastest. `apply(axis=1)` builds a Series per row and is 10-100× slower. Loops are slower still.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ndf = pd.DataFrame({'d': ['A', 'B', 'C']})\ncodes = {'A': 'X', 'B': 'Y'}\nprint(df['d'].map(codes).tolist())`,
      options: [
        "['X', 'Y', 'C']",
        "['X', 'Y', nan]",
        "['X', 'Y']",
        'Error',
      ],
      correct: 1,
      explanation:
        '`map()` returns NaN for values not present in the dictionary. "C" has no mapping, so it becomes NaN. This is silent — always verify your mapping covers all unique values.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\ndf = pd.DataFrame({'s': [3, 7, 5, 9]})\ndf['level'] = df['s'].apply(lambda x: 'high' if x >= 5 else 'low')\nprint(df['level'].tolist())`,
      options: [
        "['low', 'high', 'high', 'high']",
        "['high', 'low', 'high', 'high']",
        "['low', 'low', 'high', 'high']",
        'Error',
      ],
      correct: 0,
      explanation:
        '3 < 5 → low. 7 ≥ 5 → high. 5 ≥ 5 → high. 9 ≥ 5 → high. Result: [low, high, high, high].',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so we replace department names with short codes using a lookup dictionary:',
      code: `import pandas as pd\ndf = pd.DataFrame({'dept': ['Eng', 'Mkt', 'Eng']})\nlookup = {'Eng': 'E', 'Mkt': 'M', 'Fin': 'F'}\ndf['code'] = df['dept'].___(lookup)\nprint(df['code'].tolist())`,
      options: ['map', 'apply', 'transform', 'replace_map'],
      correct: 0,
      explanation:
        '`.map(dict)` is built exactly for value-to-value substitution. `apply` would work too but requires a function, not a dict.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `add_bonus(df)` that takes a DataFrame with columns "salary" and "rating" and returns a NEW DataFrame with an added column "bonus":\n- rating >= 4: bonus = salary * 0.20\n- rating >= 3: bonus = salary * 0.10\n- else: bonus = 0\nDo not modify the original DataFrame.',
      starterCode:
        'import pandas as pd\n\ndef add_bonus(df):\n    # your code here\n    pass',
      tests: [
        {
          input: `add_bonus(pd.DataFrame({'salary': [1000, 1000, 1000], 'rating': [5, 3, 2]}))['bonus'].tolist()`,
          expected: '[200.0, 100.0, 0]',
        },
        {
          input: `add_bonus(pd.DataFrame({'salary': [500], 'rating': [4]}))['bonus'].tolist()`,
          expected: '[100.0]',
        },
        {
          input: `add_bonus(pd.DataFrame({'salary': [100], 'rating': [1]})).columns.tolist()`,
          expected: "['salary', 'rating', 'bonus']",
        },
      ],
      hint: 'Copy the DataFrame first. Use `apply` with a function, or vectorize it with `pd.cut` / nested `np.where`.',
      solution: `import pandas as pd\n\ndef add_bonus(df):\n    out = df.copy()\n    def calc(row):\n        if row['rating'] >= 4:\n            return row['salary'] * 0.20\n        elif row['rating'] >= 3:\n            return row['salary'] * 0.10\n        return 0\n    out['bonus'] = out.apply(calc, axis=1)\n    return out`,
      explanation:
        'Two valid approaches: `apply(axis=1)` for the branching, or a fully vectorized version using `np.where` nesting. The apply version is more readable here; the vectorized version would be faster on large data.',
      xp: 40,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `{"x": [1, 2, 3]}`. Add a new column `"double"` = x × 2. Print the "double" column as a list.',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '[2, 4, 6]',
      hint: 'df["double"] = df["x"] * 2, then df["double"].tolist().',
      solution: `import pandas as pd\ndf = pd.DataFrame({"x": [1, 2, 3]})\ndf["double"] = df["x"] * 2\nprint(df["double"].tolist())`,
      explanation:
        'Direct vectorized math — the simplest and fastest way to add a derived column.',
      xp: 20,
    },
  ],
};