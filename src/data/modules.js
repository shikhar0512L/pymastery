export const modules = [
  {
    id: 'python-basics',
    title: 'Python Fundamentals',
    description:
      'The complete Python core — from variables and strings to file I/O, modules, type hints, recursion and the standard library. 17 lessons, 100+ interactive challenges.',
    icon: '🐍',
    color: 'emerald',
    status: 'available',
    lessons: [
      { id: 'variables', title: 'Variables & Assignment', difficulty: 'beginner', duration: 18 },
      { id: 'data-types', title: 'Data Types & Conversion', difficulty: 'beginner', duration: 20 },
      { id: 'operators', title: 'Operators & Expressions', difficulty: 'beginner', duration: 22 },
      { id: 'strings', title: 'Strings — Slicing, Methods & f-strings', difficulty: 'beginner', duration: 25 },
      { id: 'lists', title: 'Lists — Slicing, Methods & Comprehensions', difficulty: 'beginner', duration: 28 },
      { id: 'tuples', title: 'Tuples & Named Tuples', difficulty: 'beginner', duration: 20 },
      { id: 'conditionals', title: 'Conditionals & Control Flow', difficulty: 'beginner', duration: 22 },
      { id: 'loops', title: 'Loops — for, while & Iteration Patterns', difficulty: 'beginner', duration: 24 },
      { id: 'functions', title: 'Functions — Args, Scope & First-Class Objects', difficulty: 'intermediate', duration: 26 },
      { id: 'recursion', title: 'Recursion — Functions That Call Themselves', difficulty: 'intermediate', duration: 20 },
      { id: 'dicts-sets', title: 'Dicts & Sets — Hash Maps in Practice', difficulty: 'intermediate', duration: 26 },
      { id: 'comprehensions', title: 'Comprehensions & Functional Tools', difficulty: 'intermediate', duration: 24 },
      { id: 'errors', title: 'Errors & Exceptions — Graceful Failure', difficulty: 'intermediate', duration: 22 },
      { id: 'file-io', title: 'File I/O — Reading & Writing Files', difficulty: 'intermediate', duration: 22 },
      { id: 'modules-imports', title: 'Modules, Imports & __main__', difficulty: 'intermediate', duration: 20 },
      { id: 'type-hints', title: 'Type Hints & Annotations', difficulty: 'intermediate', duration: 20 },
      { id: 'stdlib-tour', title: 'Standard Library Tour — Batteries Included', difficulty: 'intermediate', duration: 26 },
    ],
  },
  {
    id: 'python-oop',
    title: 'OOP & Advanced Python',
    description:
      'The full object model — classes, inheritance, polymorphism, dunder methods, decorators, generators, context managers, dataclasses and metaclasses. 13 lessons, 60+ interactive challenges.',
    icon: '🏗️',
    color: 'violet',
    status: 'available',
    lessons: [
      { id: 'classes-objects', title: 'Classes & Objects', difficulty: 'intermediate', duration: 22 },
      { id: 'methods', title: 'Instance, Class & Static Methods', difficulty: 'intermediate', duration: 20 },
      { id: 'inheritance', title: 'Inheritance & super()', difficulty: 'intermediate', duration: 24 },
      { id: 'polymorphism', title: 'Polymorphism & Method Overriding', difficulty: 'intermediate', duration: 18 },
      { id: 'encapsulation', title: 'Encapsulation & Properties', difficulty: 'intermediate', duration: 20 },
      { id: 'abstraction', title: 'Abstraction & Abstract Base Classes', difficulty: 'intermediate', duration: 18 },
      { id: 'dunder', title: 'Dunder Methods — Making Objects Feel Native', difficulty: 'intermediate', duration: 22 },
      { id: 'decorators', title: 'Decorators — Functions That Wrap Functions', difficulty: 'advanced', duration: 26 },
      { id: 'iterators-generators', title: 'Iterators & Generators', difficulty: 'intermediate', duration: 24 },
      { id: 'context-managers', title: 'Context Managers — the with Statement', difficulty: 'intermediate', duration: 18 },
      { id: 'composition', title: 'Composition vs Inheritance', difficulty: 'intermediate', duration: 18 },
      { id: 'dataclasses', title: 'Dataclasses — Less Boilerplate for Data', difficulty: 'intermediate', duration: 18 },
      { id: 'metaclasses', title: 'Metaclasses — Classes That Build Classes', difficulty: 'advanced', duration: 20 },
    ],
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    description:
      'The visual, code-free math behind AI — vectors, matrices, dot products, norms, transformations, inverses, eigenvalues and linear systems. Taught with interactive graphs and simulations, closing with five case studies showing how it all powers real ML. Foundation for everything in AI.',
    icon: '📐',
    color: 'blue',
    status: 'available',
    lessons: [
      { id: 'la-scalars-vectors', title: 'Scalars & Vectors — The Building Blocks', difficulty: 'beginner', duration: 22 },
      { id: 'la-vector-ops', title: 'Vector Operations — Add, Subtract, Scale', difficulty: 'beginner', duration: 24 },
      { id: 'la-norms-distance', title: 'Norms, Distance & Similarity', difficulty: 'intermediate', duration: 24 },
      { id: 'la-matrices-intro', title: 'Matrices — Grids of Numbers', difficulty: 'intermediate', duration: 26 },
      { id: 'la-matrix-multiplication', title: 'Matrix Multiplication — Combining Transformations', difficulty: 'intermediate', duration: 26 },
      { id: 'la-inverse-determinant', title: 'Identity, Inverse & Determinant', difficulty: 'intermediate', duration: 24 },
      { id: 'la-linear-systems', title: 'Linear Systems — Solving Ax = b', difficulty: 'intermediate', duration: 26 },
      { id: 'la-dot-product-deep', title: 'Dot Product — Projections & Orthogonality', difficulty: 'intermediate', duration: 26 },
      { id: 'la-eigen', title: 'Eigenvalues & Eigenvectors — The Special Directions', difficulty: 'advanced', duration: 26 },
      { id: 'la-capstone', title: 'Capstone — Linear Algebra in Real ML', difficulty: 'advanced', duration: 28 },
    ],
  },
  {
    id: 'calculus',
    title: 'Calculus',
    description:
      'How things change — slopes, limits, derivatives, gradients and how AI actually learns. 12 lessons with interactive graphs and simulations, from rate of change through to gradient descent and optimisation.',
    icon: '📈',
    color: 'pink',
    status: 'available',
    lessons: [
      { id: 'calc-functions',           title: 'What is a Function?',                        difficulty: 'beginner', duration: 22 },
      { id: 'calc-rate-of-change',      title: 'Rate of Change — How Fast Things Move',      difficulty: 'beginner', duration: 24 },
      { id: 'calc-limits',              title: 'Limits — Approaching Without Touching',      difficulty: 'intermediate', duration: 24 },
      { id: 'calc-derivatives-intro',   title: 'Derivatives — The Slope at a Point',         difficulty: 'intermediate', duration: 26 },
      { id: 'calc-derivative-rules',    title: 'Derivative Rules — The Shortcuts',           difficulty: 'intermediate', duration: 28 },
      { id: 'calc-common-derivatives',  title: 'Common Derivatives — The Reference Table',   difficulty: 'intermediate', duration: 24 },
      { id: 'calc-second-derivative',   title: 'Second Derivative — Curvature & Concavity',  difficulty: 'intermediate', duration: 24 },
      { id: 'calc-chain-rule-deep',     title: 'Chain Rule in Depth — How Backprop Works',   difficulty: 'advanced', duration: 26 },
      { id: 'calc-partial-derivatives', title: 'Partial Derivatives — Many Variables at Once', difficulty: 'advanced', duration: 26 },
      { id: 'calc-gradient',            title: 'The Gradient — Direction of Steepest Ascent', difficulty: 'advanced', duration: 26 },
      { id: 'calc-gradient-descent',    title: 'Gradient Descent — How AI Actually Learns',  difficulty: 'advanced', duration: 28 },
      { id: 'calc-optimization',        title: 'Optimisation — Minima, Maxima & Saddle Points', difficulty: 'advanced', duration: 26 },
    ],
  },
    {
    id: 'statistics',
    title: 'Statistics',
    description:
      'The science of making sense of data — means, variance, percentiles, correlation, sampling, and hypothesis testing. 8 interactive lessons from absolute zero. Foundation for all data science.',
    icon: '📊',
    color: 'sky',
    status: 'available',
    lessons: [
      { id: 'stat-intro',        title: 'What is Statistics?',                difficulty: 'beginner', duration: 18 },
      { id: 'stat-mean-median',  title: 'Mean, Median & Mode',                difficulty: 'beginner', duration: 22 },
      { id: 'stat-variance',     title: 'Variance & Standard Deviation',      difficulty: 'beginner', duration: 22 },
      { id: 'stat-percentiles',  title: 'Percentiles, Quartiles & Outliers',  difficulty: 'beginner', duration: 20 },
      { id: 'stat-correlation',  title: 'Correlation & Causation',            difficulty: 'beginner', duration: 22 },
      { id: 'stat-sampling',     title: 'Sampling & The Central Limit Theorem', difficulty: 'intermediate', duration: 24 },
      { id: 'stat-hypothesis',   title: 'Hypothesis Testing & P-Values',      difficulty: 'intermediate', duration: 26 },
      { id: 'stat-capstone',     title: 'Capstone — Analyze a Real Dataset',  difficulty: 'intermediate', duration: 30 },
    ],
  },
  {
    id: 'probability',
    title: 'Probability',
    description:
      'The language of luck and uncertainty — coins, dice, conditional probability, Bayes theorem, expected value, and the normal distribution. 8 interactive lessons.',
    icon: '🎲',
    color: 'indigo',
    status: 'available',
    lessons: [
      { id: 'prob-basics',        title: 'Probability Basics — The Language of Luck', difficulty: 'beginner', duration: 20 },
      { id: 'prob-rules',         title: 'Rules of Probability — AND / OR',           difficulty: 'beginner', duration: 22 },
      { id: 'prob-conditional',   title: 'Conditional Probability — When Things Depend', difficulty: 'beginner', duration: 22 },
      { id: 'prob-bayes',         title: 'Bayes Theorem — The Brain Teaser',          difficulty: 'intermediate', duration: 26 },
      { id: 'prob-random-vars',   title: 'Random Variables & Expected Value',         difficulty: 'intermediate', duration: 22 },
      { id: 'prob-distributions', title: 'Distributions (Uniform & Binomial)',        difficulty: 'intermediate', duration: 24 },
      { id: 'prob-normal',        title: 'The Normal Distribution — The Bell Curve',  difficulty: 'intermediate', duration: 24 },
      { id: 'prob-capstone',      title: 'Capstone — A/B Test Simulation',            difficulty: 'intermediate', duration: 26 },
    ],
  },
  {
    id: 'numpy',
    title: 'NumPy',
    description:
      'The complete numerical computing library — arrays, indexing, reshaping, vectorization, ufuncs, aggregation, broadcasting, random, linear algebra, tensors and real-world applications. Foundation for all data science.',
    icon: '📊',
    color: 'cyan',
    status: 'available',
    lessons: [
      { id: 'numpy-arrays', title: 'NumPy Arrays — Why & How', difficulty: 'beginner', duration: 24 },
      { id: 'numpy-indexing', title: 'Indexing, Slicing & Boolean Masks', difficulty: 'intermediate', duration: 26 },
      { id: 'numpy-reshaping', title: 'Reshaping, Transposing & Memory Layout', difficulty: 'intermediate', duration: 22 },
      { id: 'numpy-vectorization', title: 'Vectorization & Element-wise Operations', difficulty: 'intermediate', duration: 22 },
      { id: 'numpy-ufuncs', title: 'Universal Functions (ufuncs)', difficulty: 'intermediate', duration: 22 },
      { id: 'numpy-aggregation', title: 'Aggregation & Axis-wise Operations', difficulty: 'intermediate', duration: 24 },
      { id: 'numpy-broadcasting', title: 'Broadcasting — Operating on Different Shapes', difficulty: 'intermediate', duration: 26 },
      { id: 'numpy-random-stats', title: 'Random, Distributions & Capstone', difficulty: 'intermediate', duration: 28 },
      { id: 'numpy-linalg', title: 'Linear Algebra — Matrix Math', difficulty: 'advanced', duration: 28 },
      { id: 'numpy-tensors', title: 'Tensors — From Scalars to 5D Arrays', difficulty: 'intermediate', duration: 20 },
      { id: 'numpy-applications', title: 'Real-World Applications', difficulty: 'intermediate', duration: 18 },
    ],
  },
  {
    id: 'pandas',
    title: 'Pandas',
    description:
      'The data analysis toolkit — Series, DataFrames, indexing, cleaning, feature engineering, sorting, groupby, joins, reshaping and a full end-to-end project. 10 lessons, 60+ interactive challenges.',
    icon: '🐼',
    color: 'amber',
    status: 'available',
    lessons: [
      { id: 'pandas-series',    title: 'Series — The 1D Foundation',                difficulty: 'beginner', duration: 22 },
      { id: 'pandas-dataframe', title: 'DataFrame — The 2D Workhorse',              difficulty: 'beginner', duration: 24 },
      { id: 'pandas-indexing',  title: 'Indexing, Filtering & loc/iloc',            difficulty: 'intermediate', duration: 26 },
      { id: 'pandas-missing',   title: 'Missing Data — NaN, dropna, fillna',        difficulty: 'intermediate', duration: 22 },
      { id: 'pandas-transform', title: 'Modifying Data & New Columns',              difficulty: 'intermediate', duration: 24 },
      { id: 'pandas-sort-rank', title: 'Sorting & Ranking',                         difficulty: 'intermediate', duration: 22 },
      { id: 'pandas-groupby',   title: 'GroupBy — Split-Apply-Combine',             difficulty: 'intermediate', duration: 26 },
      { id: 'pandas-merge',     title: 'Merge, Join & Concat',                      difficulty: 'intermediate', duration: 26 },
      { id: 'pandas-reshape',   title: 'Pivot, Melt & Crosstab',                    difficulty: 'intermediate', duration: 24 },
      { id: 'pandas-capstone',  title: 'Real-World Data Analysis',                  difficulty: 'advanced', duration: 30 },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description:
      'From regression to random forests — 12 lessons covering the full supervised and unsupervised ML toolkit. Interactive training demos, decision boundaries, and a complete capstone project. Runs entirely in your browser.',
    icon: '🤖',
    color: 'rose',
    status: 'available',
    lessons: [
      { id: 'ml-what-is-ml',           title: 'What is Machine Learning?',                difficulty: 'beginner', duration: 24 },
      { id: 'ml-linear-regression',    title: 'Linear Regression — From Scratch',          difficulty: 'intermediate', duration: 28 },
      { id: 'ml-loss-functions',       title: 'Loss Functions — Measuring Error',          difficulty: 'intermediate', duration: 24 },
      { id: 'ml-overfitting',          title: 'Overfitting — The Enemy of Generalisation', difficulty: 'intermediate', duration: 26 },
      { id: 'ml-classification',       title: 'Classification — Predicting Categories',    difficulty: 'intermediate', duration: 26 },
      { id: 'ml-metrics',              title: 'Evaluation Metrics — How Good Is Your Model?', difficulty: 'intermediate', duration: 24 },
      { id: 'ml-decision-trees',       title: 'Decision Trees — Learning by Asking Questions', difficulty: 'intermediate', duration: 26 },
      { id: 'ml-random-forests',       title: 'Random Forests & Ensembles',                difficulty: 'intermediate', duration: 24 },
      { id: 'ml-knn',                  title: 'k-Nearest Neighbors — Learning by Comparison', difficulty: 'intermediate', duration: 22 },
      { id: 'ml-kmeans',               title: 'Clustering — Finding Groups Without Labels', difficulty: 'intermediate', duration: 24 },
      { id: 'ml-feature-engineering',  title: 'Feature Engineering — Where Real ML Happens', difficulty: 'intermediate', duration: 26 },
      { id: 'ml-capstone',             title: 'Capstone — Full ML Pipeline',               difficulty: 'advanced', duration: 30 },
    ],
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    description:
      'The complete deep learning curriculum — from the first neuron to Transformers and Diffusion models. Build neural networks from scratch in pure NumPy. 12 lessons, interactive visualizations.',
    icon: '🧠',
    color: 'fuchsia',
    status: 'available',
    lessons: [
      { id: 'dl-what-is-nn',      title: 'What is a Neural Network?',         difficulty: 'beginner',   duration: 24 },
      { id: 'dl-activations',     title: 'Activation Functions',              difficulty: 'intermediate', duration: 22 },
      { id: 'dl-forward-prop',    title: 'Forward Propagation',               difficulty: 'intermediate', duration: 24 },
      { id: 'dl-loss-functions',  title: 'Loss Functions',                    difficulty: 'intermediate', duration: 22 },
      { id: 'dl-backpropagation', title: 'Backpropagation',                   difficulty: 'advanced',   duration: 28 },
      { id: 'dl-training',        title: 'Training a Network',                difficulty: 'advanced',   duration: 30 },
      { id: 'dl-cnns',            title: 'CNNs — Convolutional Networks',     difficulty: 'advanced',   duration: 26 },
      { id: 'dl-rnns',            title: 'RNNs — Recurrent Networks',         difficulty: 'advanced',   duration: 24 },
      { id: 'dl-transformers',    title: 'Transformers — Attention',          difficulty: 'advanced',   duration: 30 },
      { id: 'dl-autoencoders',    title: 'Autoencoders',                      difficulty: 'advanced',   duration: 24 },
      { id: 'dl-generative-ai',   title: 'Generative AI — GANs & Diffusion',  difficulty: 'advanced',   duration: 28 },
      { id: 'dl-capstone',        title: 'Capstone — MNIST Classifier',       difficulty: 'advanced',   duration: 30 },
    ],
  },
  {
    id: 'flask',
    title: 'Flask',
    description: 'Routes, templates, REST APIs — build a web backend from scratch. Learn the micro-framework that powers millions of APIs.',
    icon: '🌶️',
    color: 'lime',
    status: 'available',
    lessons: [
      { id: 'flask-basics',    title: 'What is Flask?',                difficulty: 'intermediate', duration: 20 },
      { id: 'flask-routing',   title: 'Routing & HTTP Methods',        difficulty: 'intermediate', duration: 22 },
      { id: 'flask-requests',  title: 'Requests & Responses',          difficulty: 'intermediate', duration: 22 },
      { id: 'flask-templates', title: 'Templates & Jinja2',            difficulty: 'intermediate', duration: 24 },
    ],
  },
  {
    id: 'django',
    title: 'Django',
    description: 'MTV pattern, ORM, admin panel, and full-stack apps. Learn the "batteries-included" framework used by Instagram and Pinterest.',
    icon: '🎸',
    color: 'teal',
    status: 'available',
    lessons: [
      { id: 'django-basics',   title: 'Django — The MTV Architecture', difficulty: 'intermediate', duration: 22 },
      { id: 'django-models',   title: 'Models & ORM — Databases in Python', difficulty: 'intermediate', duration: 24 },
      { id: 'django-views',    title: 'Views & URLs — Connecting the Pieces', difficulty: 'intermediate', duration: 24 },
      { id: 'django-capstone', title: 'Capstone — Build a Blog App',   difficulty: 'intermediate', duration: 28 },
    ],
  },
];

// 🔍 Helper — ModuleView mein use hota hai
export const getModuleById = (id) => modules.find((m) => m.id === id);

// 🔒 Bulletproof lesson status — handles sparse arrays, missing data
export function getLessonStatus(module, lessonId, completedLessons) {
  if (!module || !Array.isArray(module.lessons)) return 'locked';

  const idx = module.lessons.findIndex((l) => l && l.id === lessonId);
  if (idx === -1) return 'locked';

  const key = `${module.id}:${lessonId}`;
  if (key in completedLessons) return 'completed';

  if (idx === 0) return 'unlocked';

  const prevLesson = module.lessons[idx - 1];
  if (!prevLesson || !prevLesson.id) return 'locked';

  const prevKey = `${module.id}:${prevLesson.id}`;
  return prevKey in completedLessons ? 'unlocked' : 'locked';
}