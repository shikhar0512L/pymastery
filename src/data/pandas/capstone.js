// 📘 Pandas — Lesson 8: Capstone — Real-World Data Analysis

export const pandasCapstoneLesson = {
  id: 'pandas-capstone',
  title: 'Real-World Data Analysis',
  difficulty: 'intermediate',
  duration: 30,
  intro:
    'One end-to-end project: load, inspect, clean, filter, group, merge, pivot, and report. Everything you learned in one analyst workflow.',
  sections: [
    {
      type: 'text',
      content:
        'This is the workflow of a real data analyst: **load → inspect → clean → explore → answer questions → report**. We will do all six on a small sales dataset.',
    },
    {
      type: 'code',
      content: 'Step 1 — Load the data:',
      code: `import pandas as pd\nimport numpy as np\n\nsales = pd.DataFrame({\n    'order_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n    'customer_id': [101, 102, 101, 103, 102, 104, 101, 103, 105, 102],\n    'product':  ['laptop', 'mouse', 'laptop', 'keyboard', 'mouse', 'monitor', 'mouse', 'laptop', 'keyboard', 'monitor'],\n    'qty':      [1, 2, 1, 1, 3, 2, 1, 1, 2, 1],\n    'price':    [1000.0, 25.0, 1000.0, 80.0, 25.0, 200.0, 25.0, 1000.0, 80.0, 200.0],\n})\nprint(sales)`,
      output: `   order_id  customer_id   product  qty   price\n0         1          101    laptop    1  1000.0\n1         2          102     mouse    2    25.0\n2         3          101    laptop    1  1000.0\n3         4          103  keyboard    1    80.0\n4         5          102     mouse    3    25.0\n5         6          104   monitor    2   200.0\n6         7          101     mouse    1    25.0\n7         8          103    laptop    1  1000.0\n8         9          105  keyboard    2    80.0\n9        10          102   monitor    1   200.0`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Step 2 — **Inspect** the data. `.info()`, `.describe()`, `.head()`, and column-level stats.',
    },
    {
      type: 'code',
      content: 'Step 2 — Inspect:',
      code: `print(sales.shape)\nprint(sales.dtypes.to_dict())\nprint(sales.isna().sum().to_dict())\nprint(sales[['qty', 'price']].describe().round(2).to_dict())`,
      output: `(10, 5)\n{'order_id': dtype('int64'), 'customer_id': dtype('int64'), 'product': dtype('O'), 'qty': dtype('int64'), 'price': dtype('float64')}\n{'order_id': 0, 'customer_id': 0, 'product': 0, 'qty': 0, 'price': 0}\n{'qty': {'count': 10.0, 'mean': 1.5, 'std': 0.71, 'min': 1.0, '25%': 1.0, '50%': 1.5, '75%': 2.0, 'max': 3.0}, 'price': {'count': 10.0, 'mean': 388.0, 'std': 434.11, 'min': 25.0, '25%': 25.0, '50%': 200.0, '75%': 1000.0, 'max': 1000.0}}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Step 3 — **Clean & enrich**: no missing values here, but we can add a `revenue` column = qty × price.',
    },
    {
      type: 'code',
      content: 'Step 3 — Add revenue:',
      code: `sales['revenue'] = sales['qty'] * sales['price']\nprint(sales[['product', 'revenue']].head().to_dict('records'))\nprint(sales['revenue'].sum())`,
      output: `[{'product': 'laptop', 'revenue': 1000.0}, {'product': 'mouse', 'revenue': 50.0}, {'product': 'laptop', 'revenue': 1000.0}, {'product': 'keyboard', 'revenue': 80.0}, {'product': 'mouse', 'revenue': 75.0}]\n4605.0`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Step 4a — **Question 1: Which product earns the most?** Group by product, sum revenue, sort.',
    },
    {
      type: 'code',
      content: 'Step 4a — Revenue per product:',
      code: `by_product = (sales\n    .groupby('product')['revenue']\n    .sum()\n    .sort_values(ascending=False)\n    .reset_index()\n)\nprint(by_product.to_dict('records'))`,
      output: `[{'product': 'laptop', 'revenue': 3000.0}, {'product': 'monitor', 'revenue': 600.0}, {'product': 'mouse', 'revenue': 425.0}, {'product': 'keyboard', 'revenue': 240.0}]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'The chain is: group → sum → sort → reset_index. This is the standard "top by metric" pattern and it appears in every analytics report.',
    },
    {
      type: 'text',
      content:
        'Step 4b — **Question 2: Which customers are the biggest spenders?** Same pattern, different key.',
    },
    {
      type: 'code',
      content: 'Step 4b — Revenue per customer:',
      code: `by_customer = (sales\n    .groupby('customer_id')['revenue']\n    .agg(['sum', 'count'])\n    .sort_values('sum', ascending=False)\n)\nprint(by_customer.to_dict())`,
      output: `{'sum': {101: 2025.0, 103: 1080.0, 102: 350.0, 104: 400.0, 105: 160.0}, 'count': {101: 3, 103: 2, 102: 3, 104: 1, 105: 1}}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`.agg(["sum", "count"])` gives two columns in one pass — total revenue and order count per customer. This is what a "customer LTV + order volume" report looks like.',
    },
    {
      type: 'text',
      content:
        'Step 4c — **Question 3: What does each customer buy most?** Cross-tab customer × product counts.',
    },
    {
      type: 'code',
      content: 'Step 4c — Customer × product frequency:',
      code: `ct = pd.crosstab(sales['customer_id'], sales['product'])\nprint(ct.to_dict())`,
      output: `{'keyboard': {101: 0, 102: 0, 103: 1, 104: 0, 105: 1}, 'laptop': {101: 2, 102: 0, 103: 1, 104: 0, 105: 0}, 'monitor': {101: 0, 102: 1, 103: 0, 104: 1, 105: 0}, 'mouse': {101: 1, 102: 2, 103: 0, 104: 0, 105: 0}}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Step 4d — **Question 4: Filter high-value orders.** Only orders above the median revenue.',
    },
    {
      type: 'code',
      content: 'Step 4d — Filter by revenue threshold:',
      code: `median = sales['revenue'].median()\nhigh = sales[sales['revenue'] > median]\nprint(f"median revenue: {median}")\nprint(high[['order_id', 'product', 'revenue']].to_dict('records'))`,
      output: `median revenue: 140.0\n[{'order_id': 1, 'product': 'laptop', 'revenue': 1000.0}, {'order_id': 3, 'product': 'laptop', 'revenue': 1000.0}, {'order_id': 6, 'product': 'monitor', 'revenue': 400.0}, {'order_id': 8, 'product': 'laptop', 'revenue': 1000.0}, {'order_id': 10, 'product': 'monitor', 'revenue': 200.0}]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Step 4e — **Question 5: Add a "share of total" column.** Use transform to compute each row\'s share.',
    },
    {
      type: 'code',
      content: 'Step 4e — Revenue share per row:',
      code: `sales['share'] = (sales['revenue'] / sales['revenue'].sum() * 100).round(2)\nprint(sales[['order_id', 'revenue', 'share']].to_dict('records'))`,
      output: `[{'order_id': 1, 'revenue': 1000.0, 'share': 21.72}, {'order_id': 2, 'revenue': 50.0, 'share': 1.09}, {'order_id': 3, 'revenue': 1000.0, 'share': 21.72}, {'order_id': 4, 'revenue': 80.0, 'share': 1.74}, {'order_id': 5, 'revenue': 75.0, 'share': 1.63}, {'order_id': 6, 'revenue': 400.0, 'share': 8.69}, {'order_id': 7, 'revenue': 25.0, 'share': 0.54}, {'order_id': 8, 'revenue': 1000.0, 'share': 21.72}, {'order_id': 9, 'revenue': 160.0, 'share': 3.47}, {'order_id': 10, 'revenue': 200.0, 'share': 4.34}]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'The shares here add up to less than 100 because we rounded each to 2 decimals. For real reports, keep the raw values and round only for display — or track the rounding error.',
    },
    {
      type: 'text',
      content:
        'Step 5 — **Merge with a customer table.** Enrich the orders with customer metadata.',
    },
    {
      type: 'code',
      content: 'Step 5 — Merge customer info:',
      code: `customers = pd.DataFrame({\n    'customer_id': [101, 102, 103, 104, 105],\n    'name': ['Ada', 'Alan', 'Grace', 'Linus', 'Ken'],\n    'tier': ['gold', 'silver', 'gold', 'bronze', 'silver'],\n})\nsales2 = sales.merge(customers, on='customer_id', how='left')\nprint(sales2[['order_id', 'name', 'tier', 'revenue']].head().to_dict('records'))`,
      output: `[{'order_id': 1, 'name': 'Ada', 'tier': 'gold', 'revenue': 1000.0}, {'order_id': 2, 'name': 'Alan', 'tier': 'silver', 'revenue': 50.0}, {'order_id': 3, 'name': 'Ada', 'tier': 'gold', 'revenue': 1000.0}, {'order_id': 4, 'name': 'Grace', 'tier': 'gold', 'revenue': 80.0}, {'order_id': 5, 'name': 'Alan', 'tier': 'silver', 'revenue': 75.0}]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Step 6 — **Report by tier.** Now that we have tier info, group by it.',
    },
    {
      type: 'code',
      content: 'Step 6 — Revenue per tier:',
      code: `by_tier = (sales2\n    .groupby('tier')['revenue']\n    .agg(['sum', 'mean', 'count'])\n    .sort_values('sum', ascending=False)\n)\nprint(by_tier.round(2).to_dict())`,
      output: `{'sum': {'gold': 3080.0, 'silver': 575.0, 'bronze': 400.0}, 'mean': {'gold': 616.0, 'silver': 143.75, 'bronze': 400.0}, 'count': {'gold': 5, 'silver': 4, 'bronze': 1}}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Step 7 — **Final report**: a pivot table of tier × product revenue. This is the shape an executive wants to see.',
    },
    {
      type: 'code',
      content: 'Step 7 — Executive report:',
      code: `report = sales2.pivot_table(\n    index='tier',\n    columns='product',\n    values='revenue',\n    aggfunc='sum',\n    fill_value=0,\n)\nprint(report.to_dict())`,
      output: `{'keyboard': {'bronze': 0, 'gold': 80, 'silver': 160}, 'laptop': {'bronze': 0, 'gold': 3000, 'silver': 0}, 'monitor': {'bronze': 400, 'gold': 0, 'silver': 200}, 'mouse': {'bronze': 0, 'gold': 0, 'silver': 425}}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is the full workflow. Load → inspect → enrich → answer questions (groupby) → merge context → report (pivot). Every analyst task is a variation of these seven steps.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is the first thing you should do after loading a new DataFrame?',
      options: [
        'Plot it',
        'Train a model on it',
        'Inspect it — `.shape`, `.info()`, `.isna().sum()`',
        'Drop rows with NaN',
      ],
      correct: 2,
      explanation:
        'Never clean or analyze before you understand the data. Shape, dtypes, and missing-value audit are the three fastest checks. Only then do you decide how to clean.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import pandas as pd\ndf = pd.DataFrame({\n    'p': ['a', 'b', 'a', 'b'],\n    'rev': [10, 20, 30, 40],\n})\nresult = df.groupby('p')['rev'].sum().sort_values(ascending=False)\nprint(result.iloc[0])`,
      options: ['40', '30', '60', '70'],
      correct: 2,
      explanation:
        'Group a: 10 + 30 = 40. Group b: 20 + 40 = 60. Sorted descending: [60, 40]. First element is 60.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import pandas as pd\ndf = pd.DataFrame({'x': [1, 2, 3], 'y': [4, 5, 6]})\ndf['z'] = df['x'] * df['y']\nprint(df['z'].sum())`,
      options: ['9', '32', '15', '21'],
      correct: 1,
      explanation:
        'z = [1×4, 2×5, 3×6] = [4, 10, 18]. Sum = 4 + 10 + 18 = 32.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so we get the total revenue per product, sorted descending:',
      code: `import pandas as pd\ndf = pd.DataFrame({'product': ['a', 'b', 'a', 'b'], 'rev': [10, 20, 30, 40]})\nresult = df.groupby('product')['rev'].sum().___(ascending=False)\nprint(result.to_dict())`,
      options: ['sort_values', 'sort', 'order', 'rank'],
      correct: 0,
      explanation:
        '`.sort_values()` is the Series/DataFrame method. `.sort()` is the deprecated old name. `order` and `rank` are different things.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `top_products(df, n)` that takes a DataFrame with columns `["product", "qty", "price"]`, computes revenue per product (qty × price), and returns the top n products as a DataFrame with columns `["product", "revenue"]`, sorted descending by revenue.',
      starterCode:
        'import pandas as pd\n\ndef top_products(df, n):\n    # your code here\n    pass',
      tests: [
        {
          input: `top_products(pd.DataFrame({'product': ['a', 'b', 'a'], 'qty': [1, 2, 3], 'price': [10, 5, 10]}), 1)['product'].tolist()`,
          expected: "['a']",
        },
        {
          input: `top_products(pd.DataFrame({'product': ['a', 'b', 'a'], 'qty': [1, 2, 3], 'price': [10, 5, 10]}), 2)['revenue'].tolist()`,
          expected: '[40, 10]',
        },
        {
          input: `top_products(pd.DataFrame({'product': ['a', 'b', 'a'], 'qty': [1, 2, 3], 'price': [10, 5, 10]}), 2).columns.tolist()`,
          expected: "['product', 'revenue']",
        },
      ],
      hint: 'Add a revenue column, groupby product and sum, reset_index, sort descending, take head(n).',
      solution: `import pandas as pd\n\ndef top_products(df, n):\n    d = df.copy()\n    d['revenue'] = d['qty'] * d['price']\n    out = d.groupby('product')['revenue'].sum().reset_index()\n    return out.sort_values('revenue', ascending=False).head(n).reset_index(drop=True)`,
      explanation:
        'Enrich (add revenue) → group → reset_index → sort → head. This is the pattern you will write dozens of times in real work.',
      xp: 40,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Create `{"k": ["a", "b", "a", "b"], "v": [1, 2, 3, 4]}`. Group by `k`, sum `v`, and print the sum for group "a".',
      starterCode: 'import pandas as pd\n# your code here\n',
      expectedOutput: '4',
      hint: '`df.groupby("k")["v"].sum()["a"]` — the result Series is indexed by group key.',
      solution: `import pandas as pd\ndf = pd.DataFrame({"k": ["a", "b", "a", "b"], "v": [1, 2, 3, 4]})\nprint(df.groupby("k")["v"].sum()["a"])`,
      explanation:
        'Group a: 1 + 3 = 4. Indexing the resulting Series by the group key `"a"` gives 4. Printing a numpy int64 shows just the number.',
      xp: 25,
    },
  ],
};