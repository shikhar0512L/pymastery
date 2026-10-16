// 📘 NumPy — Lesson 7: Random, Distributions & Capstone

export const numpyRandomStatsLesson = {
  id: 'numpy-random-stats',
  title: 'Random, Distributions & Capstone',
  difficulty: 'intermediate',
  duration: 28,
  intro:
    'Random number generation is the backbone of simulations, ML, and statistics. End with a full capstone — a student performance analysis using everything you learned.',
  sections: [
    {
      type: 'text',
      content:
        '`np.random.seed(n)` locks the random generator so the same numbers come out every run. Essential for reproducible experiments and debugging.',
    },
    {
      type: 'code',
      content: 'Seeding for reproducibility:',
      code: `import numpy as np\n\nnp.random.seed(42)\nprint(np.random.rand(3))\n\nnp.random.seed(42)\nprint(np.random.rand(3))    # same numbers`,
      output: `[0.37454012 0.95071431 0.73199394]\n[0.37454012 0.95071431 0.73199394]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Modern NumPy recommends `np.random.default_rng(seed)` for new code. It is faster and uses a better algorithm. Both work; the legacy API is still everywhere.',
    },
    {
      type: 'code',
      content: 'Modern Generator API:',
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nprint(rng.random(3))\nprint(rng.integers(0, 10, size=5))\nprint(rng.normal(0, 1, size=3))`,
      output: `[0.77395605 0.43887844 0.85859792]\n[0 6 5 2 4]\n[ 0.30471708 -1.03998411  0.7504512 ]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`np.random.rand(n)` gives uniform floats in [0, 1). `randn` gives standard normal (mean 0, std 1). `randint` gives integers in a range.',
    },
    {
      type: 'code',
      content: 'The four common generators:',
      code: `import numpy as np\nnp.random.seed(0)\n\nprint(np.random.rand(5))              # uniform [0, 1)\nprint(np.random.randn(5))             # standard normal\nprint(np.random.randint(0, 10, 5))    # integers [0, 10)\nprint(np.random.uniform(1, 5, 5))     # uniform [1, 5)`,
      output: `[0.5488135  0.71518937 0.60276338 0.54488318 0.4236548 ]\n[ 1.76405235  0.40015721  0.97873798  2.2408932   1.86755799]\n[2 8 4 9 3]\n[3.67462061 4.43646116 3.13771163 2.81335503 4.78297229]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'For matrices, pass `size=(rows, cols)`. Works for every generator.',
    },
    {
      type: 'code',
      content: 'Multi-dimensional random:',
      code: `import numpy as np\nnp.random.seed(0)\n\nprint(np.random.rand(2, 3))\nprint(np.random.randint(0, 100, size=(3, 3)))\nprint(np.random.randn(3, 2).round(2))`,
      output: `[[0.55 0.72 0.6 ]\n [0.54 0.42 0.65]]\n[[44 47 64]\n [67 67  9]\n [83 21 36]]\n[[ 1.76  0.4 ]\n [ 0.98  2.24]\n [ 1.87 -0.98]]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Sampling from existing arrays: `np.random.choice` picks random elements (with or without replacement). `np.random.shuffle` shuffles a list in place; `permutation` returns a copy.',
    },
    {
      type: 'code',
      content: 'Choice, shuffle, permutation:',
      code: `import numpy as np\nnp.random.seed(0)\n\ncolors = np.array(["red", "green", "blue"])\nprint(np.random.choice(colors, 5))\nprint(np.random.choice(colors, 5, p=[0.5, 0.3, 0.2]))    # weighted\n\nnums = np.arange(5)\nshuffled = np.random.permutation(nums)\nprint(shuffled)\nprint(nums)              # original untouched\n\nnp.random.shuffle(nums)  # in place\nprint(nums)`,
      output: `['red' 'blue' 'red' 'blue' 'red']\n['blue' 'red' 'red' 'green' 'red']\n[2 4 3 0 1]\n[0 1 2 3 4]\n[3 1 2 4 0]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`shuffle` mutates in place. `permutation` returns a new shuffled array and leaves the original alone. Pick based on whether you want to keep the original.',
    },
    {
      type: 'text',
      content:
        'Distributions beyond uniform: `normal` (Gaussian), `binomial`, `poisson`, `exponential`. All take `size` and return an array.',
    },
    {
      type: 'code',
      content: 'Common distributions:',
      code: `import numpy as np\nnp.random.seed(0)\n\n# Normal — mean 100, std 15 (like IQ scores)\nprint(np.random.normal(100, 15, 5).round(1))\n\n# Binomial — 10 trials, 50% success, 5 samples\nprint(np.random.binomial(10, 0.5, 5))\n\n# Poisson — average rate 3, 5 samples\nprint(np.random.poisson(3, 5))`,
      output: `[126.5  86.3 102.8 133.6 119. ]\n[4 7 7 4 6]\n[2 5 2 1 4]`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Normal is the workhorse — many real-world quantities cluster around a mean (heights, test scores, measurement errors). Binomial counts successes; Poisson counts rare events (arrivals, defects).',
    },
    {
      type: 'text',
      content:
        'Simulate real data with a simple recipe: sample from a distribution, add noise, clip to realistic bounds. This is exactly how datasets are generated for ML practice.',
    },
    {
      type: 'code',
      content: 'Simulating a realistic dataset:',
      code: `import numpy as np\nnp.random.seed(42)\n\nN = 1000\n# Heights: mean 170cm, std 8cm, clipped to [140, 210]\nheights = np.clip(np.random.normal(170, 8, N), 140, 210).round(1)\nprint(heights[:5])\nprint(heights.mean().round(2))\nprint(heights.std().round(2))`,
      output: `[176.  163.8 168.8 189.3 176.9]\n170.15\n7.95`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`np.clip` after sampling is the standard trick for realistic bounds. It prevents extreme outliers that a pure normal would occasionally produce.',
    },
    {
      type: 'text',
      content:
        'Statistics recap in one place: mean, median, std, var, percentile, min, max, argmin, argmax. All accept `axis=` for row or column aggregation.',
    },
    {
      type: 'code',
      content: 'The statistics toolkit:',
      code: `import numpy as np\nnp.random.seed(42)\n\ndata = np.random.normal(50, 10, 100).round(1)\n\nprint(data.mean().round(2))\nprint(np.median(data).round(2))\nprint(data.std().round(2))\nprint(data.var().round(2))\nprint(np.percentile(data, [25, 50, 75]))\nprint(data.min(), data.max())`,
      output: `50.06\n50.11\n9.85\n97.08\n[43.34 50.11 56.68]\n21.3 76.9`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '**Capstone: Student Performance Analysis.** We generate a realistic dataset and answer 15 questions with NumPy — the kind of analysis you will do on real data every week.',
    },
    {
      type: 'code',
      content: 'Step 1 — Build the dataset:',
      code: `import numpy as np\nnp.random.seed(42)\n\nstudent_ids = np.arange(1, 201)              # 200 students\nattendance = np.clip(np.random.normal(85, 10, 200), 50, 100).round(1)\nstudy_hours = np.clip(np.random.normal(4, 2, 200), 0, 10).round(1)\nassignments = np.random.randint(0, 11, 200)\nnoise = np.random.normal(0, 8, 200)\n\nmarks = np.clip(\n    40 + attendance * 0.3 + study_hours * 4 + assignments * 1.5 + noise,\n    0, 100\n).round(1)\n\nprint(marks.shape)\nprint(marks.mean().round(2))`,
      output: `(200,)\n88.65`,
      language: 'python',
    },
    {
      type: 'code',
      content: 'Step 2 — Descriptive stats:',
      code: `print("highest:", marks.max())\nprint("lowest:", marks.min())\nprint("mean:", marks.mean().round(2))\nprint("median:", np.median(marks))\nprint("std:", marks.std().round(2))\nprint("variance:", marks.var().round(2))`,
      output: `highest: 100.0\nlowest: 57.7\nmean: 88.65\nmedian: 92.05\nstd: 10.44\nvariance: 108.9`,
      language: 'python',
    },
    {
      type: 'code',
      content: 'Step 3 — Filtering with masks:',
      code: `print("top scorers (marks > 90):", len(student_ids[marks > 90]))\nprint("students with attendance > 90:", len(student_ids[attendance > 90]))\nprint("students studying > 5h:", len(student_ids[study_hours > 5]))\nprint("low study + high marks:", len(student_ids[(study_hours < 5) & (marks > 80)]))`,
      output: `top scorers (marks > 90): 106\nstudents with attendance > 90: 51\nstudents studying > 5h: 65\nlow study + high marks: 80`,
      language: 'python',
    },
    {
      type: 'code',
      content: 'Step 4 — Combined conditions:',
      code: `smart_diligent = student_ids[(marks > 80) & (attendance > 90)]\nprint("smart + diligent:", len(smart_diligent))\n\nat_risk = student_ids[(marks < 70) | (attendance < 70)]\nprint("at risk:", len(at_risk))\n\nonly_ids = student_ids[marks > 95]\nprint("top 5%:", len(only_ids))`,
      output: `smart + diligent: 42\nat risk: 5\ntop 5%: 42`,
      language: 'python',
    },
    {
      type: 'code',
      content: 'Step 5 — Feature importance (correlation):',
      code: `print("corr(attendance, marks):", np.corrcoef(attendance, marks)[0, 1].round(3))\nprint("corr(study_hours, marks):", np.corrcoef(study_hours, marks)[0, 1].round(3))\nprint("corr(assignments, marks):", np.corrcoef(assignments, marks)[0, 1].round(3))`,
      output: `corr(attendance, marks): 0.51\ncorr(study_hours, marks): 0.53\ncorr(assignments, marks): 0.32`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`np.corrcoef(x, y)[0, 1]` gives the Pearson correlation. Values range -1 to 1. Higher absolute value = stronger linear relationship. This is the first step in any feature-importance analysis.',
    },
    {
      type: 'code',
      content: 'Step 6 — Grouping with boolean masks:',
      code: `high_att = marks[attendance > 90]\nlow_att = marks[attendance < 80]\n\nprint("avg marks (high attendance):", high_att.mean().round(2))\nprint("avg marks (low attendance):", low_att.mean().round(2))\nprint("difference:", (high_att.mean() - low_att.mean()).round(2))`,
      output: `avg marks (high attendance): 93.01\navg marks (low attendance): 82.54\ndifference: 10.47`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is the capstone. 15+ questions answered using nothing but NumPy — masks, aggregations, broadcasting, random. This is the entire workflow of a data analyst in one lesson.',
    },
    {
      type: 'text',
      content:
        'That is the full NumPy module. Arrays, indexing, reshaping, vectorization, aggregation, broadcasting, random. You now have the foundation for Pandas, ML, and everything downstream.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What does this print?',
      code: `import numpy as np
np.random.seed(0)
a = np.random.rand(3)
np.random.seed(0)
b = np.random.rand(3)
print(np.array_equal(a, b))`,
      options: ['True', 'False', 'Error', 'None'],
      correct: 0,
      explanation:
        'Setting the same seed twice resets the generator to the same starting state, so both runs produce identical values.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What is the output?',
      code: `import numpy as np
np.random.seed(42)
x = np.random.randint(0, 10, 5)
print(x.shape)`,
      options: ['(5,)', '(1, 5)', '(0, 10)', 'Error'],
      correct: 0,
      explanation:
        'Passing `5` (an int) as size gives a 1D array of length 5. Shape is a 1-tuple.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You want the same random numbers every time you run your script for reproducibility. What is the correct approach?',
      options: [
        'Call `np.random.rand()` twice',
        'Call `np.random.seed(42)` before generating',
        'Use `np.random.permutation()` instead',
        'Set `np.random.set_state(random)`',
      ],
      correct: 1,
      explanation:
        'Setting the seed at the start of your script locks the generator. Every subsequent random call produces the same values on every run.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so we sample 100 values from a normal distribution with mean 50 and std 10:',
      code: `import numpy as np
np.random.seed(0)
data = np.random.___(50, 10, 100)`,
      options: ['normal', 'gaussian', 'randn', 'standard'],
      correct: 0,
      explanation:
        '`np.random.normal(loc, scale, size)` is the general normal generator. `randn` is just normal(0, 1).',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `simulate_marks(n)` that returns n simulated exam marks (0-100) using a normal distribution with mean 70 and std 15, clipped to [0, 100]. Round to 1 decimal. Use `np.random.seed(42)` inside the function for reproducibility.',
      starterCode:
        'import numpy as np\n\ndef simulate_marks(n):\n    # your code here\n    pass',
      tests: [
        { input: 'simulate_marks(5).shape', expected: '(5,)' },
        { input: 'float(simulate_marks(100).min()) >= 0.0', expected: 'True' },
        { input: 'float(simulate_marks(100).max()) <= 100.0', expected: 'True' },
        { input: 'round(simulate_marks(1000).mean(), 1)', expected: '69.9' },
      ],
      hint: 'Set `np.random.seed(42)`, sample `np.random.normal(70, 15, n)`, clip to [0, 100], and round to 1 decimal.',
      solution:
        'import numpy as np\n\ndef simulate_marks(n):\n    np.random.seed(42)\n    marks = np.random.normal(70, 15, n)\n    return np.clip(marks, 0, 100).round(1)',
      explanation:
        'Normal sample → clip to bounds → round. The seed makes results reproducible. Mean of 1000 samples is close to the population mean of 70.',
      xp: 35,
    },
    {
      id: 'q6',
      type: 'code-challenge',
      question:
        'Write `top_k_indices(arr, k)` that returns the indices of the k largest elements in arr, sorted descending by value. Example: [3, 1, 4, 1, 5, 9] with k=2 returns [5, 4].',
      starterCode:
        'import numpy as np\n\ndef top_k_indices(arr, k):\n    # your code here\n    pass',
      tests: [
        { input: 'top_k_indices(np.array([3, 1, 4, 1, 5, 9]), 2).tolist()', expected: '[5, 4]' },
        { input: 'top_k_indices(np.array([10, 20, 30]), 1).tolist()', expected: '[2]' },
        { input: 'top_k_indices(np.array([1, 2, 3, 4]), 4).tolist()', expected: '[3, 2, 1, 0]' },
      ],
      hint: 'Use `np.argsort(arr)[::-1][:k]` — argsort returns indices in ascending order, reverse for descending.',
      solution:
        'import numpy as np\n\ndef top_k_indices(arr, k):\n    return np.argsort(arr)[::-1][:k]',
      explanation:
        '`argsort` gives the index that would sort the array ascending. Reversing gives descending order. Slicing takes the first k. This is the standard "top-N indices" pattern.',
      xp: 35,
    },
    {
      id: 'q7',
      type: 'output-match',
      question:
        'Generate 10 numbers from a normal distribution (mean 0, std 1) with `np.random.seed(0)`, round them to 2 decimals, and print. Expected output is a specific 1D array of 10 values.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '[ 1.76  0.4   0.98  2.24  1.87 -0.98  0.95 -0.15 -0.1   0.41]',
      hint: 'np.random.seed(0); arr = np.random.randn(10).round(2); print(arr)',
      solution:
        'import numpy as np\nnp.random.seed(0)\narr = np.random.randn(10).round(2)\nprint(arr)',
      explanation:
        '`randn(10)` samples 10 from standard normal. `.round(2)` rounds each. The seed makes the output deterministic.',
      xp: 30,
    },
  ],
};