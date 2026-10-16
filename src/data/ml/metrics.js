// 🤖 ML — Lesson 6: Evaluation Metrics

export const mlMetricsLesson = {
  id: 'ml-metrics',
  title: 'Evaluation Metrics — How Good is Your Model?',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'A model is only as good as its measurement. Accuracy is the first metric everyone learns, and the first one that misleads them. This lesson teaches you to measure classifiers the right way.',

  sections: [
    {
      type: 'text',
      content:
        'You trained a model. It got 95% accuracy. Is it good?',
    },
    {
      type: 'text',
      content:
        'It depends. If you are predicting whether an email is spam, and 95% of emails are normal, a model that always predicts "not spam" also gets 95% accuracy — while being completely useless. This is the **accuracy paradox**.',
    },
    {
      type: 'note',
      content:
        'Accuracy alone is not enough. You need to look at **what kinds of mistakes** the model is making — false positives and false negatives — and weigh them by how much each costs in your real problem.',
    },

    // ── CONFUSION MATRIX ─────────────
    {
      type: 'text',
      content:
        'The foundation of every classification metric is the **confusion matrix**. It breaks down predictions into four categories.',
    },
    {
      type: 'text',
      content:
        '• **True Positive (TP):** model said positive, and it was positive. ✅\n• **True Negative (TN):** model said negative, and it was negative. ✅\n• **False Positive (FP):** model said positive, but it was negative. ❌ (Type I error)\n• **False Negative (FN):** model said negative, but it was positive. ❌ (Type II error)',
    },
    {
      type: 'math',
      latex:
        '\\begin{array}{c|cc} & \\text{Pred 0} & \\text{Pred 1} \\\\ \\hline \\text{True 0} & \\text{TN} & \\text{FP} \\\\ \\text{True 1} & \\text{FN} & \\text{TP} \\end{array}',
      caption:
        'The confusion matrix. Two right answers (TN, TP) and two kinds of mistakes (FP, FN).',
    },
    {
      type: 'tip',
      content:
        'In a spam filter, FP = good email marked spam (bad — you miss an important message). FN = spam in your inbox (mild annoyance). Different costs. In a cancer detector, FP = unnecessary test (bad, but tolerable). FN = missed cancer (very bad). The confusion matrix is how you decide which tradeoff matters more.',
    },

    // ── ACCURACY ─────────────────────
    {
      type: 'text',
      content:
        '**Accuracy** = (correct predictions) / (total predictions). The simplest metric.',
    },
    {
      type: 'math',
      latex:
        '\\text{Accuracy} = \\frac{\\text{TP} + \\text{TN}}{\\text{TP} + \\text{TN} + \\text{FP} + \\text{FN}}',
      caption:
        'Accuracy. Works fine when classes are balanced, misleading when they are not.',
    },
    {
      type: 'warning',
      content:
        'On an imbalanced dataset (say, 99% class 0, 1% class 1), a model that always predicts class 0 achieves 99% accuracy while having zero useful skill. Never trust accuracy alone on imbalanced data.',
    },

    // ── PRECISION & RECALL ───────────
    {
      type: 'text',
      content:
        'Two metrics fix this. They focus on the positive class specifically.',
    },
    {
      type: 'math',
      latex:
        '\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}}',
      caption:
        'Precision — of all predicted positives, how many were actually positive?',
    },
    {
      type: 'math',
      latex:
        '\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}}',
      caption:
        'Recall — of all actual positives, how many did we catch?',
    },
    {
      type: 'text',
      content:
        '• **High precision** = when we say positive, we are usually right. Few false alarms.\n• **High recall** = we catch most of the positives. Few misses.\n• **You usually cannot have both.** Boosting one trades off the other.',
    },
    {
      type: 'graph',
      title: 'The precision-recall tradeoff',
      fns: [
        { fn: (t) => 1.05 - 0.9 * t, color: 'cyan', label: 'recall (as threshold ↑)', strokeWidth: 2.5 },
        { fn: (t) => 0.15 + 0.9 * t, color: 'rose', label: 'precision (as threshold ↑)', strokeWidth: 2.5 },
      ],
      domain: [0, 1],
      range: [-0.05, 1.1],
      caption:
        'As you raise the decision threshold, precision goes up (fewer false alarms) but recall goes down (more misses). There is no free lunch.',
    },
    {
      type: 'tip',
      content:
        'Choose which to optimise based on the problem. **Cancer detection:** prioritise recall (do not miss cases). **Spam filter:** prioritise precision (do not block good emails). The confusion matrix tells you what a mistake costs.',
    },

    // ── F1 SCORE ─────────────────────
    {
      type: 'text',
      content:
        'If you want a single number that balances both, use the **F1 score** — the harmonic mean of precision and recall.',
    },
    {
      type: 'math',
      latex:
        'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
      caption:
        'F1 score. High only when both precision AND recall are high.',
    },
    {
      type: 'note',
      content:
        'The harmonic mean is used (not the regular average) because it punishes imbalance. If precision is 1.0 and recall is 0.01, the ordinary average is 0.505 — misleadingly respectable. The harmonic mean gives 0.02 — correctly reflecting that the model is basically useless.',
    },

    // ── CODE EXAMPLE ─────────────────
    {
      type: 'code',
      content: 'Computing all metrics from scratch:',
      code: `import numpy as np\n\n# True labels and predictions\ny_true = np.array([1, 0, 1, 1, 0, 0, 1, 0, 1, 0])\ny_pred = np.array([1, 0, 1, 0, 0, 1, 1, 0, 1, 0])\n\nTP = np.sum((y_true == 1) & (y_pred == 1))\nTN = np.sum((y_true == 0) & (y_pred == 0))\nFP = np.sum((y_true == 0) & (y_pred == 1))\nFN = np.sum((y_true == 1) & (y_pred == 0))\n\naccuracy  = (TP + TN) / len(y_true)\nprecision = TP / (TP + FP) if (TP + FP) > 0 else 0\nrecall    = TP / (TP + FN) if (TP + FN) > 0 else 0\nf1        = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0\n\nprint(f"TP={TP}, TN={TN}, FP={FP}, FN={FN}")\nprint(f"Accuracy:  {accuracy:.3f}")\nprint(f"Precision: {precision:.3f}")\nprint(f"Recall:    {recall:.3f}")\nprint(f"F1:        {f1:.3f}")`,
      output: `TP=4, TN=4, FP=1, FN=1\nAccuracy:  0.800\nPrecision: 0.800\nRecall:    0.800\nF1:        0.800`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Here, the model is symmetric — it makes 1 false positive and 1 false negative. Precision, recall, and F1 all come out to 0.8. In imbalanced problems, they diverge and tell you different stories.',
    },

    // ── REGRESSION METRICS ───────────
    {
      type: 'text',
      content:
        'For regression, the standard metrics are RMSE, MAE, and R².',
    },
    {
      type: 'text',
      content:
        '• **RMSE** (Root Mean Squared Error) — same units as the target. Punishes large errors heavily.\n• **MAE** (Mean Absolute Error) — average absolute error. Robust to outliers.\n• **R²** (R-squared) — fraction of variance explained. 1.0 is perfect; 0 is no better than predicting the mean.',
    },
    {
      type: 'math',
      latex:
        'R^2 = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}',
      caption:
        'R² — how much better the model is than always predicting the mean.',
    },
    {
      type: 'note',
      content:
        'R² = 0 means your model is no better than just predicting the average every time. R² = 1 means perfect predictions. R² < 0 (yes, it can go negative) means your model is worse than the baseline.',
    },

    // ── SUMMARY ─────────────────────
    {
      type: 'text',
      content:
        'Picking the right metric is a decision, not a default. Guidelines:',
    },
    {
      type: 'text',
      content:
        '• **Balanced classes, roughly equal error costs** → accuracy.\n• **Imbalanced classes, care about positives** → F1 or AUC-PR.\n• **Missing positives is bad** → prioritise recall.\n• **False positives are bad** → prioritise precision.\n• **Regression, care about all errors equally** → MAE.\n• **Regression, big errors are worse** → RMSE.\n• **Regression, want a "goodness of fit" number** → R².',
    },
    {
      type: 'tip',
      content:
        'That wraps up Phase A of the ML module. You now understand the fundamentals of supervised learning: regression, classification, loss functions, overfitting, and metrics. Next phase: the algorithms — decision trees, random forests, k-NN, and clustering.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question:
        'A model predicts the same class for every example in an imbalanced dataset. What metric would expose this?',
      options: [
        'Accuracy — it would be low.',
        'Precision or recall — they look at performance on the positive class specifically.',
        'Neither — accuracy is enough.',
        'R² score.',
      ],
      correct: 1,
      explanation:
        'A degenerate model can have high accuracy on imbalanced data. Precision and recall expose it — precision would be 0 if the model never predicts positive, or recall would be 0 if it never catches any true positives.',
      xp: 25,
    },
    {
      id: 'q2',
      type: 'numeric-answer',
      math: true,
      question:
        'A model produces TP = 30, FP = 10, FN = 20, TN = 40. What is the precision?',
      correct: 0.75,
      tolerance: 0.01,
      placeholder: 'e.g. 0.75',
      hint: 'Precision = TP / (TP + FP).',
      explanation:
        'Precision = 30 / (30 + 10) = 30/40 = 0.75. Of all predicted positives, 75% were correct.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question:
        'Same model: TP = 30, FP = 10, FN = 20, TN = 40. What is the recall?',
      correct: 0.6,
      tolerance: 0.01,
      placeholder: 'e.g. 0.6',
      hint: 'Recall = TP / (TP + FN).',
      explanation:
        'Recall = 30 / (30 + 20) = 30/50 = 0.6. Of all actual positives, we caught 60%.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'You are building a cancer detection system. Missing a real cancer case (false negative) is very dangerous. Which metric should you prioritise?',
      options: [
        'Precision — minimise false positives.',
        'Recall — minimise false negatives.',
        'Accuracy — overall correctness.',
        'Neither — just train longer.',
      ],
      correct: 1,
      explanation:
        'Recall measures how many actual positives you catch. When missing a positive (FN) is the dangerous mistake, you optimise for recall.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question: 'What does an R² of 0 mean in regression?',
      options: [
        'The model is perfect.',
        'The model is no better than always predicting the mean.',
        'The model is terrible.',
        'The model has zero parameters.',
      ],
      correct: 1,
      explanation:
        'R² = 0 means the model performs the same as the trivial baseline of predicting the average. It adds no information. R² = 1 is perfect; R² < 0 means worse than the baseline.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Why use the F1 score instead of just averaging precision and recall?',
      options: [
        'Because averages are hard to compute.',
        'Because the harmonic mean heavily penalises imbalance between the two.',
        'Because F1 is always higher.',
        'Because precision and recall cannot both be nonzero.',
      ],
      correct: 1,
      explanation:
        'The harmonic mean penalises when either precision OR recall is low. A model with precision 1.0 and recall 0.01 gets F1 ≈ 0.02 (correctly showing it is useless), while the ordinary average would be 0.505 (misleadingly respectable).',
      xp: 30,
    },
  ],
};