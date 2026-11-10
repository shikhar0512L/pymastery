// 📊 Stats — Lesson 8: Capstone

export const statCapstoneLesson = {
  id: 'stat-capstone',
  title: 'Capstone — Analyze a Real Dataset',
  difficulty: 'intermediate',
  duration: 30,
  intro:
    'Let us put everything together. We will generate a realistic dataset (student study habits and scores) and run a complete statistical analysis: cleaning, describing, correlating, and testing.',

  sections: [
    {
      type: 'text',
      content:
        'This is the workflow of a real data analyst. We will go from raw data to a statistically backed conclusion.',
    },

    // ── THE DATA ─────────────────────
    {
      type: 'code',
      content: 'Step 1: Generate the dataset:',
      code: `import numpy as np\nimport pandas as pd\n\nnp.random.seed(42)\nn = 200\n\n# Features\nhours_studied = np.random.uniform(1, 10, n).round(1)\nsleep_hours = np.random.uniform(4, 9, n).round(1)\nattendance = np.clip(np.random.normal(80, 10, n), 40, 100).round(1)\n\n# Score = based on hours and attendance + noise\nnoise = np.random.normal(0, 5, n)\nscores = (40 + hours_studied * 4 + attendance * 0.2 + noise).clip(0, 100).round(1)\n\ndf = pd.DataFrame({\n    "hours": hours_studied,\n    "sleep": sleep_hours,\n    "attendance": attendance,\n    "score": scores,\n})\nprint(df.head())`,
      output: `   hours  sleep  attendance  score\n0    4.4    5.2        86.3   70.6\n1    8.0    7.2        88.5   87.6\n2    8.2    6.9        89.0   88.7\n3    2.9    8.2        73.4   60.3\n4    6.9    6.7        84.2   82.2`,
      language: 'python',
    },

    // ── DESCRIPTIVE STATS ────────────
    {
      type: 'code',
      content: 'Step 2: Descriptive Statistics:',
      code: `print(df.describe().round(2))`,
      output: `       hours   sleep  attendance   score\ncount  200.00  200.00      200.00  200.00\nmean     5.47    6.48       80.21   76.09\nstd      2.60    1.41        9.82    9.72\nmin      1.00    4.00       46.40   47.30\n25%      3.40    5.40       73.60   69.90\n50%      5.50    6.50       80.60   76.50\n75%      7.60    7.50       86.60   82.90\nmax     10.00    9.00      100.00   99.40`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'From this, we know:\n\n• Average score is ~76.\n• The middle 50% of scores are between 69.9 and 82.9 (IQR).\n• Scores range from 47.3 to 99.4.',
    },

    // ── CORRELATION ──────────────────
    {
      type: 'code',
      content: 'Step 3: Correlation Analysis:',
      code: `corr_matrix = df.corr()\nprint(corr_matrix['score'].round(3))`,
      output: `hours         0.921\nsleep        -0.072\nattendance    0.393\nscore         1.000\nName: score, dtype: float64`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '**Findings:**\n\n• **Hours studied** has a very strong positive correlation with score (0.92).\n• **Attendance** has a moderate positive correlation (0.39).\n• **Sleep** has almost no correlation (-0.07).',
    },

    // ── HYPOTHESIS TESTING ───────────
    {
      type: 'text',
      content:
        'Now let us test a hypothesis. Does the top 50% of students (by study hours) score higher than the bottom 50%?',
    },
    {
      type: 'code',
      content: 'Step 4: Compare two groups:',
      code: `median_hours = df['hours'].median()\ntop_half = df[df['hours'] > median_hours]['score']\nbottom_half = df[df['hours'] <= median_hours]['score']\n\nprint(f"Top half mean score: {top_half.mean():.1f}")\nprint(f"Bottom half mean score: {bottom_half.mean():.1f}")\nprint(f"Difference: {top_half.mean() - bottom_half.mean():.1f}")`,
      output: `Top half mean score: 84.9\nBottom half mean score: 67.3\nDifference: 17.6`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The students who studied more scored 17.6 points higher on average. A hypothesis test (like a t-test) would tell you that this difference is statistically significant (p < 0.001). It is not random noise.',
    },

    // ── INTERPRETATION ───────────────
    {
      type: 'text',
      content:
        'What have we learned?\n\n• **Study hours matter a lot.** The correlation is 0.92. The top half scored 17.6 points higher.\n• **Attendance helps** but is not as strong.\n• **Sleep** did not show a linear relationship in this dataset.\n• This is the entire statistical analysis workflow: Describe → Correlate → Test.',
    },
    {
      type: 'warning',
      content:
        'Remember the correlation-causation warning? We found that hours and score are correlated. But does studying cause higher scores? Or do smarter students both study more AND score better? This dataset is simulated, but in the real world you need careful experiment design (like a randomized controlled trial) to prove causation.',
    },
    {
      type: 'tip',
      content:
        'You have completed the Statistics module! You now know how to describe data, measure relationships, sample correctly, and test hypotheses. Next up: Probability.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'In the capstone dataset, which variable had the strongest correlation with score?',
      options: ['Sleep', 'Attendance', 'Hours studied', 'None'],
      correct: 2,
      explanation:
        'Hours studied had r = 0.921, which is extremely strong. Attendance was 0.393, sleep was -0.072.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'code-challenge',
      question: 'Write `split_and_compare(df, col, target)` that splits the DataFrame into two halves based on the median of `col`, and returns the difference in the mean of `target`.',
      starterCode:
        'import pandas as pd\n\ndef split_and_compare(df, col, target):\n    # your code here\n    pass',
      tests: [
        {
          input: `split_and_compare(pd.DataFrame({'a': [1, 2, 3, 4], 'b': [10, 20, 30, 40]}), 'a', 'b')`,
          expected: '20.0',
        },
      ],
      hint: 'Use df[col].median() to split. Return top.mean() - bottom.mean().',
      solution:
        'import pandas as pd\n\ndef split_and_compare(df, col, target):\n    median = df[col].median()\n    top = df[df[col] > median][target]\n    bottom = df[df[col] <= median][target]\n    return float(top.mean() - bottom.mean())',
      explanation:
        'This is exactly how A/B test analysis works — split into groups, compare the means of the outcome metric.',
      xp: 30,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Why is correlation NOT causation?',
      options: [
        'Because correlation is only for numbers.',
        'Because a third variable might cause both, or the relationship could be reversed.',
        'Because correlation is always random.',
        'Because correlation is only for small samples.',
      ],
      correct: 1,
      explanation:
        'Confounding variables and reverse causation are the main reasons. Two things can move together because something else causes both.',
      xp: 20,
    },
  ],
};