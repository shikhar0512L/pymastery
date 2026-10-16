// 🤖 ML — Lesson 12: Capstone — Full ML Pipeline

export const mlCapstoneLesson = {
  id: 'ml-capstone',
  title: 'Capstone — Full ML Pipeline',
  difficulty: 'intermediate',
  duration: 30,
  intro:
    'You have learned every piece of supervised and unsupervised learning. Now we put them together — one real project, start to finish, exactly how a professional ML engineer would do it.',

  sections: [
    {
      type: 'text',
      content:
        'This lesson has no new theory. Everything you need you already know. What we do now is walk through the **whole workflow** of a real ML project, from raw data to a working model.',
    },
    {
      type: 'note',
      content:
        'Real ML projects follow a consistent pattern. Master this pattern and you can approach any dataset with confidence.',
    },

    // ── THE PROJECT ──────────────────
    {
      type: 'text',
      content:
        '**The problem.** You run an online store. You want to predict which customers will spend more than ₹5,000 in the next month, so you can target them with promotions.',
    },
    {
      type: 'text',
      content:
        'You have a dataset with customer records: age, city, total past purchases, average order value, days since last purchase, and a label (did they spend >5000 last month?).',
    },
    {
      type: 'text',
      content:
        'The workflow has seven steps: (1) Load, (2) Split, (3) Engineer features, (4) Choose a model, (5) Train, (6) Evaluate, (7) Interpret.',
    },

    // ── STEP 1: LOAD ─────────────────
    {
      type: 'text',
      content:
        '**Step 1 — Load the data.** Always inspect before analyzing. Check for missing values, shape, dtypes, and a first look at the distributions.',
    },
    {
      type: 'code',
      content: 'Step 1 — Load and inspect:',
      code: `import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\n\n# Simulate a small customer dataset\nn = 200\ndf = pd.DataFrame({\n    'age':           np.random.randint(18, 70, n),\n    'city':          np.random.choice(['Delhi', 'Mumbai', 'Pune'], n),\n    'purchases':     np.random.randint(0, 50, n),\n    'avg_order':     np.random.uniform(200, 3000, n).round(2),\n    'days_since':    np.random.randint(1, 365, n),\n    'high_spender':  np.random.randint(0, 2, n),\n})\n\nprint(df.head())\nprint("\\nShape:", df.shape)\nprint("\\nMissing:\\n", df.isnull().sum().to_dict())\nprint("\\nTarget balance:\\n", df['high_spender'].value_counts().to_dict())`,
      output: `   age    city  purchases  avg_order  days_since  high_spender\n0   50   Delhi         14    2701.38         105             0\n1   53  Mumbai         24     875.14         141             1\n2   46    Pune         30    1101.64         253             1\n3   41    Pune         10    2250.87          41             0\n4   29   Delhi         38    1942.62         259             0\n\nShape: (200, 6)\nMissing: {'age': 0, 'city': 0, 'purchases': 0, 'avg_order': 0, 'days_since': 0, 'high_spender': 0}\nTarget balance: {1: 105, 0: 95}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Always inspect before analyzing. Shape, missing values, and target balance tell you in 10 seconds whether you have a problem with your data. The target is roughly balanced here (105 vs 95), so accuracy will be a reasonable metric.',
    },

    // ── STEP 2: SPLIT ────────────────
    {
      type: 'text',
      content:
        '**Step 2 — Train/test split.** Before ANY feature engineering, split the data. This prevents leakage — any statistics we compute (means, medians, encodings) must come only from the training set.',
    },
    {
      type: 'code',
      content: 'Step 2 — Split BEFORE engineering:',
      code: `from sklearn.model_selection import train_test_split\n\nX = df.drop(columns=['high_spender'])\ny = df['high_spender']\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\nprint(f"Train: {len(X_train)} examples")\nprint(f"Test:  {len(X_test)} examples")\nprint(f"Train label balance: {y_train.mean():.2f}")\nprint(f"Test label balance:  {y_test.mean():.2f}")`,
      output: `Train: 160 examples\nTest:  40 examples\nTrain label balance: 0.53\nTest label balance:  0.53`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Notice `stratify=y` — this keeps the class balance the same in train and test. Without it, a small dataset might end up with very different class distributions, making evaluation unreliable.',
    },

    // ── STEP 3: FEATURES ─────────────
    {
      type: 'text',
      content:
        '**Step 3 — Feature engineering.** Encode categorical features, scale numeric ones, and create any useful ratios. All transformations are FIT on the training set and APPLIED to the test set.',
    },
    {
      type: 'code',
      content: 'Step 3 — Feature engineering with a pipeline:',
      code: `from sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\n\nnum_features = ['age', 'purchases', 'avg_order', 'days_since']\ncat_features = ['city']\n\npreprocessor = ColumnTransformer([\n    ('num', StandardScaler(), num_features),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_features),\n])\n\n# Fit on train, apply to train and test\nX_train_prep = preprocessor.fit_transform(X_train)\nX_test_prep  = preprocessor.transform(X_test)\n\nprint("After engineering:")\nprint("  Train shape:", X_train_prep.shape)\nprint("  Test shape: ", X_test_prep.shape)`,
      output: `After engineering:\n  Train shape: (160, 7)\n  Test shape:  (40, 7)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The original 5 features became 7: 4 numeric (scaled) + 3 one-hot cities. `ColumnTransformer` handles this cleanly. Notice that `fit_transform` is used on train but only `transform` on test — that is how you prevent leakage.',
    },

    // ── STEP 4: CHOOSE MODEL ─────────
    {
      type: 'text',
      content:
        '**Step 4 — Choose a model.** Try a simple baseline first. For binary classification on tabular data, logistic regression is a great starting point.',
    },
    {
      type: 'code',
      content: 'Step 4 — Train logistic regression:',
      code: `from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train_prep, y_train)\n\nprint("Model trained.")\nprint("Coefficients:", model.coef_.round(3))\nprint("Intercept:   ", round(model.intercept_[0], 3))`,
      output: `Model trained.\nCoefficients: [[-0.151 -0.144  0.156 -0.042 -0.058 -0.088 0.055]]\nIntercept:    -0.073`,
      language: 'python',
    },

    // ── STEP 5: EVALUATE ─────────────
    {
      type: 'text',
      content:
        '**Step 5 — Evaluate on the test set.** Compute accuracy, precision, recall, and F1. Look at the confusion matrix. This is the honest check.',
    },
    {
      type: 'code',
      content: 'Step 5 — Full evaluation:',
      code: `from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix\n\ny_pred = model.predict(X_test_prep)\n\nacc  = accuracy_score(y_test, y_pred)\nprec = precision_score(y_test, y_pred)\nrec  = recall_score(y_test, y_pred)\nf1   = f1_score(y_test, y_pred)\ncm   = confusion_matrix(y_test, y_pred)\n\nprint(f"Accuracy:  {acc:.3f}")\nprint(f"Precision: {prec:.3f}")\nprint(f"Recall:    {rec:.3f}")\nprint(f"F1:        {f1:.3f}")\nprint("\\nConfusion matrix:")\nprint(cm)`,
      output: `Accuracy:  0.525\nPrecision: 0.545\nRecall:    0.571\nF1:        0.558\n\nConfusion matrix:\n[[ 9 10]\n [ 9 12]]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Accuracy is 52.5% — barely better than a coin flip. This is honest: the data was randomly generated with no real signal, so the model cannot learn anything useful. **This is what good ML looks like** — an honest evaluation that tells you the model is not good enough.',
    },
    {
      type: 'tip',
      content:
        'In a real project, this is where you would go back to step 3 and create better features, or try a more complex model like Random Forest. But you would also sanity-check the data — maybe the problem is not learnable from these features at all.',
    },

    // ── STEP 6: INTERPRET ────────────
    {
      type: 'text',
      content:
        '**Step 6 — Interpret the model.** What did the model learn? For logistic regression, the coefficients tell you the effect of each feature.',
    },
    {
      type: 'code',
      content: 'Step 6 — Interpret coefficients:',
      code: `feature_names = (\n    num_features +\n    list(preprocessor.named_transformers_['cat']\n         .get_feature_names_out(cat_features))\n)\n\nfor name, coef in zip(feature_names, model.coef_[0]):\n    direction = "increases" if coef > 0 else "decreases"\n    print(f"{name:20s} {coef:+.3f}  ({direction} chance of high spend)")`,
      output: `age                  -0.151  (decreases chance of high spend)\npurchases            -0.144  (decreases chance of high spend)\navg_order            +0.156  (increases chance of high spend)\ndays_since           -0.042  (decreases chance of high spend)\ncity_Delhi           -0.058  (decreases chance of high spend)\ncity_Mumbai          -0.088  (decreases chance of high spend)\ncity_Pune            +0.055  (increases chance of high spend)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Because the data is random, the coefficients are all close to zero — no strong signals. In a real dataset, you would see weights like +0.8 for "avg_order" if bigger spenders really do have higher average order value.',
    },

    // ── STEP 7: TRIANGULATE ──────────
    {
      type: 'text',
      content:
        '**Step 7 — Try a second model.** Never trust a single result. Compare against a Random Forest, which can find nonlinear patterns.',
    },
    {
      type: 'code',
      content: 'Step 7 — Random Forest comparison:',
      code: `from sklearn.ensemble import RandomForestClassifier\n\nrf = RandomForestClassifier(n_estimators=100, random_state=42)\nrf.fit(X_train_prep, y_train)\ny_pred_rf = rf.predict(X_test_prep)\n\nprint(f"Random Forest accuracy: {accuracy_score(y_test, y_pred_rf):.3f}")\nprint(f"Random Forest F1:       {f1_score(y_test, y_pred_rf):.3f}")\n\nprint("\\nFeature importances:")\nfor name, imp in sorted(zip(feature_names, rf.feature_importances_), key=lambda x: -x[1])[:5]:\n    print(f"  {name:20s} {imp:.3f}")`,
      output: `Random Forest accuracy: 0.475\nRandom Forest F1:       0.512\n\nFeature importances:\n  avg_order            0.291\n  age                  0.186\n  days_since           0.180\n  purchases            0.176\n  city_Pune            0.057`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Both models perform similarly (~50% accuracy) — confirming that the data has no real signal. On a real project, one model might clearly beat the other, and you would pick the winner. Here, they are both essentially guessing.',
    },

    // ── THE COMPLETE WORKFLOW ────────
    {
      type: 'text',
      content:
        'Here is the entire project in one code block. This is the pattern you will use for every supervised ML task from now on.',
    },
    {
      type: 'code',
      content: 'The complete ML pipeline:',
      code: `import numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score, f1_score\n\n# ─── 1. LOAD ─────────────────────────\nnp.random.seed(42)\nn = 200\ndf = pd.DataFrame({\n    'age':          np.random.randint(18, 70, n),\n    'city':         np.random.choice(['Delhi', 'Mumbai', 'Pune'], n),\n    'purchases':    np.random.randint(0, 50, n),\n    'avg_order':    np.random.uniform(200, 3000, n),\n    'days_since':   np.random.randint(1, 365, n),\n    'high_spender': np.random.randint(0, 2, n),\n})\n\n# ─── 2. SPLIT ────────────────────────\nX = df.drop(columns='high_spender')\ny = df['high_spender']\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\n# ─── 3. FEATURES ─────────────────────\nnum_cols = ['age', 'purchases', 'avg_order', 'days_since']\ncat_cols = ['city']\npreprocessor = ColumnTransformer([\n    ('num', StandardScaler(), num_cols),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols),\n])\n\n# ─── 4. MODEL ────────────────────────\nmodel = Pipeline([\n    ('prep', preprocessor),\n    ('clf', LogisticRegression(max_iter=1000)),\n])\n\n# ─── 5. TRAIN ────────────────────────\nmodel.fit(X_train, y_train)\n\n# ─── 6. EVALUATE ─────────────────────\ny_pred = model.predict(X_test)\nprint(f"Accuracy: {accuracy_score(y_test, y_pred):.3f}")\nprint(f"F1:       {f1_score(y_test, y_pred):.3f}")`,
      output: `Accuracy: 0.525\nF1:       0.558`,
      language: 'python',
    },

    // ── THE PATTERN ──────────────────
    {
      type: 'text',
      content:
        'Every ML project you will ever do follows this pattern. The details change, but the seven steps are always the same:',
    },
    {
      type: 'text',
      content:
        '• **1. Load** — inspect the data first. Missing values, shape, balance.\n• **2. Split** — train/test BEFORE any engineering.\n• **3. Engineer** — encode categoricals, scale numerics, create ratios. Fit on train only.\n• **4. Choose** — start simple (logistic regression, linear regression). Add complexity only if needed.\n• **5. Train** — fit the model. Watch for overfitting.\n• **6. Evaluate** — accuracy, precision, recall, F1, confusion matrix. Honest test-set numbers.\n• **7. Interpret** — which features matter? Does the model make sense?',
    },
    {
      type: 'note',
      content:
        'In real projects, you will loop through steps 3–6 many times. Try a new feature, retrain, evaluate. Try a different model, retrain, evaluate. The fastest improvement usually comes from step 3 — better features. The slowest, least valuable change is usually a fancier model.',
    },

    // ── WHAT YOU LEARNED ─────────────
    {
      type: 'text',
      content:
        'Look back at everything you have learned across this module:',
    },
    {
      type: 'text',
      content:
        '• **Supervised vs unsupervised** — labels or no labels.\n• **Regression** — predicting numbers.\n• **Classification** — predicting categories.\n• **Loss functions** — MSE, MAE, cross-entropy.\n• **Overfitting** — memorising vs generalising. Train/val/test splits.\n• **Metrics** — accuracy is not enough. Precision, recall, F1.\n• **Decision trees** — learning by asking questions.\n• **Random forests** — many trees, averaged.\n• **k-NN** — prediction by nearest neighbours.\n• **k-Means** — finding clusters without labels.\n• **Feature engineering** — the real work of ML.',
    },
    {
      type: 'text',
      content:
        'You have all the pieces. Combine them differently for different problems. Most ML work is not about knowing the algorithms — it is about understanding the data and engineering good features. That is what this module has taught you.',
    },
    {
      type: 'note',
      content:
        'You now have a complete foundation in machine learning. From here, you can: (1) dive deeper into specific algorithms (SVMs, gradient boosting, neural networks), (2) specialise in a domain (computer vision, NLP, recommender systems), or (3) get practical experience by participating in Kaggle competitions and building your own projects. The best next step is to build something real.',
    },
    {
      type: 'tip',
      content:
        'That completes the ML module. From Python basics to a full ML pipeline — you now understand the entire stack. Time to build.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'Why do we split train/test BEFORE doing any feature engineering?',
      options: [
        'Because it is faster.',
        'To prevent data leakage — statistics should only come from the training set.',
        'Because sklearn requires it.',
        'Because the test set is smaller.',
      ],
      correct: 1,
      explanation:
        'If you compute means, medians, encodings, or scalings on the whole dataset before splitting, you leak information from the test set into training. Always split first.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'You train a model and get 52% accuracy on a binary classification problem. What does this mean?',
      options: [
        'The model is very good.',
        'The model is barely better than random guessing, so the data or features are not informative enough.',
        'You need a bigger model.',
        'The test set is wrong.',
      ],
      correct: 1,
      explanation:
        'For binary classification, 50% is the baseline of random guessing. 52% means the model has learned almost nothing useful. This is a sign to improve the features or reconsider whether the problem is learnable.',
      xp: 25,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question:
        'Why is feature engineering usually more valuable than model choice?',
      options: [
        'Because features are easier to compute.',
        'Because a simple model on well-engineered features usually beats a complex model on raw data.',
        'Because model choice does not matter.',
        'Because features are free.',
      ],
      correct: 1,
      explanation:
        'In practice, better features almost always give more improvement than a fancier model. It is why Kaggle winners often win by feature engineering, not by using the newest algorithm.',
      xp: 30,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'What is the standard first model to try on a new classification problem?',
      options: [
        'A 10-layer neural network.',
        'Logistic regression — simple, fast, interpretable, and a strong baseline.',
        'A decision tree with no depth limit.',
        'k-NN with k = 1.',
      ],
      correct: 1,
      explanation:
        'Always start simple. Logistic regression is fast, interpretable, and surprisingly effective. Only reach for a fancier model if the baseline is not good enough.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'Which metric best exposes a model that looks good on accuracy but is useless in practice?',
      options: [
        'R² score.',
        'Precision and recall together — especially on imbalanced data.',
        'Root mean squared error.',
        'Sum of coefficients.',
      ],
      correct: 1,
      explanation:
        'On imbalanced data, a model can be accurate by always predicting the majority class. Precision and recall force you to examine performance on the positive class specifically, exposing the degeneracy.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'What is the best next step after finishing this module?',
      options: [
        'Memorise every algorithm.',
        'Build a real project end-to-end on data you care about.',
        'Wait for the next module.',
        'Skip to deep learning.',
      ],
      correct: 1,
      explanation:
        'Nothing beats building a real project — from data collection and cleaning through training and evaluation. The algorithms are easy; the practical skills come from doing. Pick a dataset, ask a question, and build.',
      xp: 25,
    },
  ],
};