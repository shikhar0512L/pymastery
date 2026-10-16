// 🤖 ML — Lesson 11: Feature Engineering & Scaling

export const mlFeatureEngineeringLesson = {
  id: 'ml-feature-engineering',
  title: 'Feature Engineering — Where Real ML Happens',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'The algorithm matters less than the data you feed it. Feature engineering is the art of turning raw inputs into signals a model can learn from. In practice, this is where the real ML work happens.',

  sections: [
    {
      type: 'text',
      content:
        'Ask any experienced ML engineer: what took the most time on your last project? Almost always the same answer — **preparing the data**. Cleaning it, transforming it, and creating useful features.',
    },
    {
      type: 'note',
      content:
        'Feature engineering is the process of taking raw data and creating features that make the learning problem easier. A great feature is worth more than a fancy model. A bad feature will break even the best model.',
    },

    // ── WHY IT MATTERS ───────────────
    {
      type: 'text',
      content:
        'Here is the truth about ML: the algorithm is the easy part. There are only a dozen or so standard algorithms. But every dataset is different — and the feature transformations you apply are what determine whether your model works.',
    },
    {
      type: 'text',
      content:
        'A famous observation from Kaggle competitions: experienced competitors usually win by better feature engineering, not by using a fancier model.',
    },

    // ── THE STANDARD PIPELINE ────────
    {
      type: 'text',
      content:
        'Most ML projects follow the same feature engineering pipeline:',
    },
    {
      type: 'text',
      content:
        '• **1. Clean** — handle missing values, remove duplicates, fix inconsistencies.\n• **2. Encode** — turn categories into numbers the model can use.\n• **3. Scale** — put numeric features on comparable scales.\n• **4. Create** — combine existing features into new ones.\n• **5. Select** — drop features that add noise rather than signal.',
    },
    {
      type: 'code',
      content: 'A typical feature engineering pipeline:',
      code: `import pandas as pd\nimport numpy as np\n\n# Raw data\ndf = pd.DataFrame({\n    'age': [25, np.nan, 45, 32, 67],\n    'city': ['Delhi', 'Mumbai', 'Delhi', 'Pune', 'Mumbai'],\n    'salary_lakhs': [4.5, 12.0, 25.0, 8.5, 45.0],\n    'experience': [2, 8, 20, 5, 35],\n})\n\n# 1. Clean: fill missing age with median\ndf['age'] = df['age'].fillna(df['age'].median())\n\n# 2. Encode: one-hot encode city\ndf = pd.concat([\n    df,\n    pd.get_dummies(df['city'], prefix='city').astype(int),\n], axis=1).drop(columns=['city'])\n\n# 3. Scale: standardize numeric features\nfor col in ['age', 'salary_lakhs', 'experience']:\n    df[col + '_std'] = (df[col] - df[col].mean()) / df[col].std()\n\n# 4. Create: salary per year of experience\ndf['salary_per_year'] = df['salary_lakhs'] / df['experience']\n\nprint(df.round(2))`,
      output: `    age  salary_lakhs  experience  city_Delhi  city_Mumbai  city_Pune  age_std  salary_lakhs_std  experience_std  salary_per_year\n0  25.0           4.5           2           1            0          0    -0.87             -0.69           -0.59              2.25\n1  32.0          12.0           8           0            1          0    -0.35             -0.29           -0.39              1.50\n2  45.0          25.0          20           1            0          0     0.72              0.35            0.11              1.25\n3  32.0           8.5           5           0            0          1    -0.35             -0.46           -0.49              1.70\n4  67.0          45.0          35           0            1          0     2.05              1.08            1.36              1.29`,
      language: 'python',
    },

    // ── ENCODING CATEGORICALS ────────
    {
      type: 'text',
      content:
        'Models need numbers, not strings. So categories like "Delhi", "Mumbai", "Pune" must be converted. There are two standard approaches.',
    },
    {
      type: 'text',
      content:
        '**One-hot encoding.** For each category, create a new binary column. "Delhi" becomes [1, 0, 0], "Mumbai" becomes [0, 1, 0]. Simple, no false ordering.',
    },
    {
      type: 'text',
      content:
        '**Label encoding.** Assign each category an integer. "Delhi" = 0, "Mumbai" = 1, "Pune" = 2. Works only when there is a natural order (e.g., "small" < "medium" < "large"). For cities, it falsely implies Delhi < Mumbai, which is meaningless.',
    },
    {
      type: 'math',
      latex:
        '\\text{city: Delhi, Mumbai, Pune} \\to \\begin{bmatrix} \\text{Delhi} & \\text{Mumbai} & \\text{Pune} \\\\ 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}',
      caption:
        'One-hot encoding. Each city becomes a binary vector with exactly one 1.',
    },
    {
      type: 'warning',
      content:
        'Never use label encoding for unordered categories. It creates a fake numerical relationship the model will exploit. For nominal categories (no order), always use one-hot encoding.',
    },
    {
      type: 'tip',
      content:
        'One-hot encoding can blow up your feature count if a category has many values (like 1000 cities). In that case, consider grouping rare categories into an "Other" category, or use learned embeddings.',
    },

    // ── SCALING ──────────────────────
    {
      type: 'text',
      content:
        'Different features have very different ranges. Age is 0–100. Salary is 0–10,000,000. Without scaling, the bigger feature dominates any distance-based model.',
    },
    {
      type: 'text',
      content:
        'Two standard scalings:',
    },
    {
      type: 'math',
      latex:
        '\\begin{aligned} \\text{Standardization:} &\\quad x\' = \\frac{x - \\mu}{\\sigma} \\\\[4pt] \\text{Min-Max:} &\\quad x\' = \\frac{x - \\min}{\\max - \\min} \\end{aligned}',
      caption:
        'Standardisation centers to mean 0, std 1. Min-max scales to [0, 1].',
    },
    {
      type: 'graph',
      title: 'Raw vs standardised features',
      fns: [
        { fn: (x) => x, color: 'cyan', label: 'raw feature' },
        { fn: (x) => (x - 5) / 2, color: 'rose', label: 'standardized' },
      ],
      domain: [0, 10],
      range: [-3, 11],
      caption:
        'Standardisation shifts the mean to 0 and rescales the spread to be 1. The distribution shape stays the same — only the axis changes.',
    },
    {
      type: 'note',
      content:
        'Which scaling to use? **Standardisation** is more common and robust. **Min-max** is useful when you specifically need bounded values (e.g., for image pixels or neural network inputs).',
    },
    {
      type: 'warning',
      content:
        'Always fit the scaler on the TRAINING set only, then apply the same transformation to the test set. If you scale using statistics from the whole dataset, you leak information from the test set — a form of cheating that inflates your apparent accuracy.',
    },

    // ── CREATING FEATURES ────────────
    {
      type: 'text',
      content:
        'The most creative part of feature engineering is **creating new features** from existing ones. This is where domain knowledge helps.',
    },
    {
      type: 'text',
      content:
        'Common patterns:',
    },
    {
      type: 'text',
      content:
        '• **Ratios.** salary / experience = salary per year.\n• **Differences.** end_date − start_date = duration.\n• **Products.** price × quantity = total.\n• **Binning.** age → age_group (0-18, 19-30, 31-50, 51+).\n• **Time features.** timestamp → hour, day-of-week, month, is_weekend.\n• **Aggregations.** user\'s total purchase count, average rating, days since last login.',
    },
    {
      type: 'code',
      content: 'Real feature engineering examples:',
      code: `import pandas as pd\n\n# Time-based features\ndf['purchase_time'] = pd.to_datetime(df['purchase_time'])\ndf['hour'] = df['purchase_time'].dt.hour\ndf['day_of_week'] = df['purchase_time'].dt.dayofweek\ndf['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)\n\n# Ratio features\ndf['price_per_sqft'] = df['price'] / df['area_sqft']\ndf['debt_to_income'] = df['monthly_debt'] / df['monthly_income']\n\n# Binned features\ndf['age_group'] = pd.cut(df['age'], bins=[0, 18, 30, 50, 100],\n                        labels=['child', 'young', 'middle', 'senior'])`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'A useful trick: **let the model decide.** If you are unsure whether a feature helps, include it. Use feature importance (from a Random Forest, or correlation with target) to prune later. Better to start with too many and cut back than to miss a useful signal.',
    },

    // ── FEATURE SELECTION ────────────
    {
      type: 'text',
      content:
        'Once you have created many features, you have a new problem: too many features. This leads to overfitting and slow training. So you prune.',
    },
    {
      type: 'text',
      content:
        'Three common strategies:',
    },
    {
      type: 'text',
      content:
        '• **Filter methods** — remove features with low correlation to the target. Fast, simple.\n• **Wrapper methods** — try training with different subsets, keep the best.\n• **Embedded methods** — models like Random Forest rank features by importance; L1 regularisation drives unimportant weights to zero.',
    },
    {
      type: 'code',
      content: 'Feature importance from a Random Forest:',
      code: `# After training a Random Forest:\nimportances = model.feature_importances_\nfeature_names = df.drop(columns='target').columns\n\nimportance_df = pd.DataFrame({\n    'feature': feature_names,\n    'importance': importances,\n}).sort_values('importance', ascending=False)\n\nprint(importance_df.head(10))`,
      language: 'python',
    },

    // ── PIPELINES ────────────────────
    {
      type: 'text',
      content:
        'In real projects, all these steps are chained into a **pipeline** — a single object that takes raw data and outputs predictions. Pipelines ensure that the same transformations are applied to training and test data, avoiding leakage.',
    },
    {
      type: 'note',
      content:
        'The `sklearn.pipeline.Pipeline` class is the standard tool for this. It chains transformations and a final estimator, and it works seamlessly with cross-validation. Learn it early — it will save you from data leakage bugs.',
    },

    // ── THE LESSON ──────────────────
    {
      type: 'text',
      content:
        'The most important lesson from this chapter: **the features matter more than the model**. A simple model on well-engineered features beats a fancy model on raw data almost every time.',
    },
    {
      type: 'text',
      content:
        'So when your model is not performing well, do not immediately reach for a fancier algorithm. Instead, ask: can I create a better feature? Can I fix a scaling issue? Can I encode a category more sensibly?',
    },
    {
      type: 'tip',
      content:
        'That is feature engineering. Next: the capstone — putting everything together on a real ML project, from raw data to deployed model.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Why do we need to encode categorical features?',
      options: [
        'Because ML models prefer strings over numbers.',
        'Because ML models work with numbers, not strings.',
        'Because one-hot encoding is faster.',
        'Because labels are always numeric.',
      ],
      correct: 1,
      explanation:
        'ML models do math on numbers. Category names like "Delhi" must be converted to numeric representations before the model can use them.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'When should you use label encoding instead of one-hot encoding?',
      options: [
        'Always — label encoding is faster.',
        'When the categories have a natural order (e.g., "small" < "medium" < "large").',
        'Never — label encoding is always wrong.',
        'When there are many categories.',
      ],
      correct: 1,
      explanation:
        'Label encoding implies an ordering. It is appropriate only when the categories have a natural order (ordinal data). For nominal categories (like cities), one-hot encoding is safer.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'What does standardisation do to a feature?',
      options: [
        'Changes its distribution to a bell curve.',
        'Shifts its mean to 0 and scales its spread to std 1.',
        'Removes outliers.',
        'Bins it into quartiles.',
      ],
      correct: 1,
      explanation:
        'Standardisation subtracts the mean and divides by the standard deviation. The shape of the distribution does not change; only the axis shifts and rescales.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Why should the scaler be fit on the training set only?',
      options: [
        'Because it is faster.',
        'To prevent data leakage from the test set into training.',
        'Because the test set has different columns.',
        'Because scalers cannot handle test data.',
      ],
      correct: 1,
      explanation:
        'If you use statistics from the whole dataset (including test data), you are leaking information about the test set into the training process. This inflates your apparent accuracy and gives a dishonest performance estimate.',
      xp: 30,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which of these is a good example of a useful engineered feature?',
      options: [
        'Copying the raw features unchanged.',
        'A ratio like debt-to-income, which combines two features into a meaningful signal.',
        'Adding random noise to the data.',
        'Duplicating every column.',
      ],
      correct: 1,
      explanation:
        'Ratios are a classic feature engineering technique. Debt-to-income combines two raw features into a single number that captures a meaningful relationship the model would otherwise have to learn.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Which is the single most important lesson about feature engineering?',
      options: [
        'Feature engineering does not matter.',
        'The features matter more than the algorithm — good features beat fancy models.',
        'You should always use deep learning.',
        'Never create new features.',
      ],
      correct: 1,
      explanation:
        'In practice, feature engineering usually matters more than the choice of algorithm. A simple model on well-engineered features almost always beats a complex model on raw data.',
      xp: 30,
    },
  ],
};