// 📘 Bonus lesson — Comprehensions & Functional Tools
// Depth standard: intermediate.

export const comprehensionsLesson = {
  id: 'comprehensions',
  title: 'Comprehensions & Functional Tools',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Comprehensions, generators, map/filter and lambda are the four idioms that make Python code feel Pythonic. Master them and your loops shrink by half.',
  sections: [
    {
      type: 'text',
      content:
        'A comprehension builds a new collection in a single expression. Syntax: `[expression for item in iterable if condition]`.',
    },
    {
      type: 'code',
      content: 'List comprehension — the basics:',
      code: `squares = [n ** 2 for n in range(6)]\nevens = [n for n in range(10) if n % 2 == 0]\nwords = ["hi", "hello", "hey"]\nupper = [w.upper() for w in words]\n\nprint(squares)\nprint(evens)\nprint(upper)`,
      output: `[0, 1, 4, 9, 16, 25]\n[0, 2, 4, 6, 8]\n['HI', 'HELLO', 'HEY']`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'The condition goes at the END. The expression goes at the START. This flipped order trips up beginners — read it as: "give me X for each item, if condition holds".',
    },
    {
      type: 'text',
      content:
        'You can have if/else in the expression position — a ternary inside the comprehension. Different from the filter if at the end.',
    },
    {
      type: 'code',
      content: 'if-else inside comprehension:',
      code: `labels = ["even" if n % 2 == 0 else "odd" for n in range(6)]\nprint(labels)\n\n# Filter only (if at end): skips items\nonly_even = [n for n in range(10) if n % 2 == 0]\nprint(only_even)`,
      output: `['even', 'odd', 'even', 'odd', 'even', 'odd']\n[0, 2, 4, 6, 8]`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'A filter `if` at the END drops items. An if-else in the EXPRESSION keeps all items but transforms them. Do not mix them up.',
    },
    {
      type: 'text',
      content:
        'Nested comprehensions — a comprehension inside a comprehension. Two forms: nested loops, or nested output.',
    },
    {
      type: 'code',
      content: 'Flatten a 2D list, then rebuild it:',
      code: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\nflat = [n for row in matrix for n in row]\nprint(flat)\n\ntable = [[i * j for j in range(1, 4)] for i in range(1, 4)]\nprint(table)`,
      output: `[1, 2, 3, 4, 5, 6, 7, 8, 9]\n[[1, 2, 3], [2, 4, 6], [3, 6, 9]]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'If a nested comprehension takes more than 20 seconds to read, use a nested loop. Readability beats cleverness.',
    },
    {
      type: 'text',
      content:
        'Dict and set comprehensions share the same syntax. Dict uses `key: value`, set uses just the expression.',
    },
    {
      type: 'code',
      content: 'Dict and set comprehensions:',
      code: `squares = {n: n ** 2 for n in range(5)}\nprint(squares)\n\nnames = ["Ada", "Alan", "Grace"]\nlengths = {n: len(n) for n in names}\nprint(lengths)\n\nunique_lengths = {len(w) for w in ["hi", "hello", "hey", "world"]}\nprint(unique_lengths)`,
      output: `{0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n{'Ada': 3, 'Alan': 4, 'Grace': 5}\n{2, 5}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'A generator expression `(expr for item in iterable)` produces values lazily — one at a time, not all in memory. Use it inside `sum()`, `any()`, `all()` for huge savings.',
    },
    {
      type: 'code',
      content: 'Generator expressions — lazy evaluation:',
      code: `# List comp — builds the whole list in memory\nsquares_list = [n ** 2 for n in range(1_000_000)]\n\n# Generator — produces values on demand\nsquares_gen = (n ** 2 for n in range(1_000_000))\n\n# Use in aggregation functions\nprint(sum(n ** 2 for n in range(10)))\nprint(any(n > 5 for n in range(10)))\nprint(all(n >= 0 for n in range(10)))`,
      output: `285\nTrue\nTrue`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Generator expressions save memory but can only be iterated ONCE. If you need to loop twice, materialize with `list()` or use a list comprehension.',
    },
    {
      type: 'text',
      content:
        '`map(func, iterable)` applies func to every item. `filter(func, iterable)` keeps items where func returns True. Both return lazy iterators.',
    },
    {
      type: 'code',
      content: 'map and filter:',
      code: `nums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x * 2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))\n\nprint(doubled)\nprint(evens)`,
      output: `[2, 4, 6, 8, 10]\n[2, 4]`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Comprehensions are usually cleaner than map/filter for simple cases. Reach for map/filter when you already have a named function to pass, like `map(str.upper, words)`.',
    },
    {
      type: 'text',
      content:
        '`lambda` is a one-expression anonymous function. Useful for short callbacks — especially `sorted()` with a `key`.',
    },
    {
      type: 'code',
      content: 'lambda with sorted — the classic pattern:',
      code: `people = [\n    {"name": "Ada", "age": 36},\n    {"name": "Alan", "age": 41},\n    {"name": "Grace", "age": 85},\n]\n\nby_age = sorted(people, key=lambda p: p["age"])\nby_age_desc = sorted(people, key=lambda p: p["age"], reverse=True)\n\nfor p in by_age:\n    print(p["name"], p["age"])\nprint("---")\nfor p in by_age_desc:\n    print(p["name"], p["age"])`,
      output: `Ada 36\nAlan 41\nGrace 85\n---\nGrace 85\nAlan 41\nAda 36`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`zip()` pairs items from multiple iterables. The most common pattern: build a dict from two parallel lists.',
    },
    {
      type: 'code',
      content: 'zip patterns:',
      code: `names = ["A", "B", "C"]\nscores = [90, 85, 78]\n\npairs = list(zip(names, scores))\nprint(pairs)\n\n# dict from two lists\nscore_dict = dict(zip(names, scores))\nprint(score_dict)\n\n# Unzip with *\nn, s = zip(*pairs)\nprint(n)\nprint(s)`,
      output: `[('A', 90), ('B', 85), ('C', 78)]\n{'A': 90, 'B': 85, 'C': 78}\n('A', 'B', 'C')\n(90, 85, 78)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`zip()` stops at the shortest iterable. If you want the longest, use `itertools.zip_longest()`.',
    },
    {
      type: 'text',
      content:
        '`any()` and `all()` combine with generator expressions to check conditions over a whole collection in one line.',
    },
    {
      type: 'code',
      content: 'any and all with generators:',
      code: `nums = [3, 1, 4, 1, 5, 9, 2, 6]\n\nprint(any(n > 8 for n in nums))\nprint(any(n > 100 for n in nums))\nprint(all(n > 0 for n in nums))\nprint(all(n % 2 == 0 for n in nums))`,
      output: `True\nFalse\nTrue\nFalse`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`functools.reduce(func, iterable, initial)` folds a collection into a single value. Less common than it used to be (sum/prod cover many cases), but useful for custom folds.',
    },
    {
      type: 'code',
      content: 'reduce for a custom fold:',
      code: `from functools import reduce\n\nnums = [1, 2, 3, 4, 5]\n\n# Sum via reduce (sum() is simpler, but this shows the pattern)\nprint(reduce(lambda a, b: a + b, nums))\n\n# Maximum via reduce\nprint(reduce(lambda a, b: a if a > b else b, nums))`,
      output: `15\n5`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is the functional toolbox. Comprehensions for building, generators for laziness, map/filter for iterables, lambda for short callbacks, and reduce for folds. Combined, they make half your loops disappear.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'print([x * 2 for x in range(5) if x % 2 == 0])',
      options: ['[0, 2, 4, 6, 8]', '[0, 4, 8]', '[2, 6]', '[0, 1, 2, 3, 4]'],
      correct: 1,
      explanation:
        'Filter keeps only even x: 0, 2, 4. Then each is doubled: 0, 4, 8. Result: [0, 4, 8].',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'matrix = [[1, 2], [3, 4]]\nprint([n * 10 for row in matrix for n in row])',
      options: ['[[10, 20], [30, 40]]', '[10, 20, 30, 40]', '[10, 30]', 'Error'],
      correct: 1,
      explanation:
        'Two for clauses means a nested loop. Iterating row-by-row, then item-by-item, produces a FLAT list: [10, 20, 30, 40].',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You need to iterate a 1-million-element range once and sum the values. Which is most memory-efficient?',
      options: [
        '[n for n in range(1_000_000)]',
        'list(range(1_000_000))',
        'sum(n for n in range(1_000_000))',
        'tuple(range(1_000_000))',
      ],
      correct: 2,
      explanation:
        'A generator expression `(n for n in ...)` produces values on demand — O(1) memory. List comp, list(), and tuple() all materialize the full collection, using O(n) memory.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the dict maps each number 0-4 to its cube:',
      code: 'cubes = {n: ___ for n in range(5)}\nprint(cubes)',
      options: ['n ** 3', 'n * 3', 'n + n', 'cube(n)'],
      correct: 0,
      explanation:
        'Cube is n raised to the 3rd power: `n ** 3`. The dict comprehension syntax is `{key: value_expr for item in iterable}`.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `flatten(matrix)` that takes a 2D list and returns a single 1D list containing all elements in order. Use a comprehension.',
      starterCode: 'def flatten(matrix):\n    # your code here\n    pass',
      tests: [
        {
          input: 'flatten([[1, 2], [3, 4]])',
          expected: '[1, 2, 3, 4]',
        },
        {
          input: 'flatten([[1], [2], [3]])',
          expected: '[1, 2, 3]',
        },
        {
          input: 'flatten([[], [1, 2]])',
          expected: '[1, 2]',
        },
        { input: 'flatten([])', expected: '[]' },
      ],
      hint: 'Two for clauses: `[n for row in matrix for n in row]`. The order matters — outer loop first.',
      solution:
        'def flatten(matrix):\n    return [n for row in matrix for n in row]',
      explanation:
        'Nested comprehension flattens in one line. The first for iterates rows, the second iterates within each row.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'code-challenge',
      question:
        'Write `word_lengths(words)` that returns a dict mapping each word to its length. Use a dict comprehension.',
      starterCode: 'def word_lengths(words):\n    # your code here\n    pass',
      tests: [
        {
          input: 'word_lengths(["hi", "hello", "hey"])',
          expected: "{'hi': 2, 'hello': 5, 'hey': 3}",
        },
        { input: 'word_lengths(["a"])', expected: "{'a': 1}" },
        { input: 'word_lengths([])', expected: '{}' },
      ],
      hint: 'Use `{w: len(w) for w in words}`.',
      solution:
        'def word_lengths(words):\n    return {w: len(w) for w in words}',
      explanation:
        'A dict comprehension is the cleanest way to build a lookup table from an iterable.',
      xp: 25,
    },
    {
      id: 'q7',
      type: 'output-match',
      question:
        'Print the squared values of 1 through 5, each on its own line. Use a comprehension to build the list, then loop to print.',
      starterCode:
        '# Build a list of squares using a comprehension, then print each\n',
      expectedOutput: '1\n4\n9\n16\n25',
      hint: 'Build `squares = [n ** 2 for n in range(1, 6)]`, then `for s in squares: print(s)`.',
      solution:
        'squares = [n ** 2 for n in range(1, 6)]\nfor s in squares:\n    print(s)',
      explanation:
        'Comprehensions build; loops print. Combining both is a very common pattern — build once, then use many times.',
      xp: 20,
    },
  ],
};