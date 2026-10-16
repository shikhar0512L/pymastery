// 📘 Python Fundamentals — Remaining core lessons
// Tuples, File I/O, Modules & Imports

/* ═══════════════════════════════════════════════════════════
   LESSON — Tuples & Named Tuples
   ═══════════════════════════════════════════════════════════ */
export const tuplesLesson = {
  id: 'tuples',
  title: 'Tuples & Named Tuples',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'A tuple is an immutable list. It is the return type of every multi-value function, the key type in dicts, and the backbone of fast, safe code.',
  sections: [
    {
      type: 'text',
      content:
        'Create a tuple with parentheses. A single-element tuple needs a trailing comma — otherwise Python treats it as a grouped expression.',
    },
    {
      type: 'code',
      content: 'Tuple creation — the comma is the key:',
      code: `t = (1, 2, 3)\nempty = ()\nsingle = (42,)        # trailing comma required\nnot_a_tuple = (42)    # this is just the int 42\n\nprint(t)\nprint(single)\nprint(not_a_tuple)\nprint(type(single), type(not_a_tuple))`,
      output: `(1, 2, 3)\n(42,)\n42\n<class 'tuple'> <class 'int'>`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`(42)` is not a tuple — it is just 42 in parentheses. `(42,)` is. The comma, not the parentheses, makes a tuple.',
    },
    {
      type: 'text',
      content:
        'Tuples are immutable. You cannot change, add, or remove items. This is a feature, not a limitation — it means tuples are safe to share.',
    },
    {
      type: 'code',
      content: 'Immutability:',
      code: `t = (1, 2, 3)\n# t[0] = 99      # TypeError: 'tuple' object does not support item assignment\n\n# But a tuple containing a mutable object is still partially mutable\nt2 = ([1, 2], 3)\nt2[0].append(99)\nprint(t2)`,
      output: `([1, 2, 99], 3)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Immutability applies to the tuple itself, not the objects inside it. A tuple holding a list means the list can still change.',
    },
    {
      type: 'text',
      content:
        'Indexing, slicing, and iteration work exactly like lists. Negative indices, steps, everything.',
    },
    {
      type: 'code',
      content: 'Slicing and iteration:',
      code: `t = (10, 20, 30, 40, 50)\nprint(t[0])\nprint(t[-1])\nprint(t[1:4])\nprint(t[::-1])\nprint(len(t))\nprint(30 in t)\n\nfor x in t:\n    print(x, end=" ")`,
      output: `10\n50\n(20, 30, 40)\n(50, 40, 30, 20, 10)\n5\nTrue\n10 20 30 40 50 `,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Tuple unpacking is everywhere. Multiple assignment, function returns, `for k, v in items()` — all rely on it.',
    },
    {
      type: 'code',
      content: 'Unpacking tuples:',
      code: `point = (3, 4)\nx, y = point\nprint(x, y)\n\n# Star unpacking\na, *rest = (1, 2, 3, 4, 5)\nprint(a, rest)\n\n# Swap without a temp variable\np, q = 1, 2\np, q = q, p\nprint(p, q)`,
      output: `3 4\n1 [2, 3, 4, 5]\n2 1`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Returning a tuple is the standard way to return multiple values from a function. `return min_val, max_val` — Python wraps them.',
    },
    {
      type: 'code',
      content: 'Multiple return values:',
      code: `def min_max(nums):\n    return min(nums), max(nums)\n\nlo, hi = min_max([3, 1, 4, 1, 5, 9])\nprint(lo, hi)`,
      output: `1 9`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Because tuples are immutable, they are hashable — usable as dict keys or set members. Lists cannot be keys.',
    },
    {
      type: 'code',
      content: 'Tuples as dict keys:',
      code: `grid = {}\ngrid[(0, 0)] = "origin"\ngrid[(1, 2)] = "point A"\nprint(grid)\nprint(grid[(1, 2)])\n\n# A list key would fail:\n# grid[[0, 0]] = "x"    # TypeError: unhashable type: 'list'`,
      output: `{(0, 0): 'origin', (1, 2): 'point A'}\npoint A`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`namedtuple` from `collections` gives tuple fields names. Same speed and immutability, but readable attribute access.',
    },
    {
      type: 'code',
      content: 'namedtuple — the readable tuple:',
      code: `from collections import namedtuple\n\nPoint = namedtuple("Point", ["x", "y"])\np = Point(3, 4)\n\nprint(p)\nprint(p.x, p.y)\nprint(p[0], p[1])    # still indexable\nx, y = p             # still unpackable`,
      output: `Point(x=3, y=4)\n3 4\n3 4`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Namedtuples are a lightweight alternative to dataclasses. Use them when you need speed + immutability. Dataclasses when you want mutability and defaults.',
    },
    {
      type: 'text',
      content:
        'Tuples vs lists — when to use which. Rule of thumb: tuple when the elements are fixed and heterogeneous (a point, a person record). List when the collection is homogeneous and can grow.',
    },
    {
      type: 'code',
      content: 'Choosing between them:',
      code: `# Tuple — fixed structure, mixed types\npoint = (3, 4)\nuser = ("Ada", 36, "London")\n\n# List — growing collection, same type\nscores = [90, 85, 78]\ntodo = ["buy milk", "call mom"]\n\n# Tuples are lighter and faster\nimport sys\nprint(sys.getsizeof((1, 2, 3)))\nprint(sys.getsizeof([1, 2, 3]))`,
      output: `64\n80`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is tuples. Immutable, hashable, unpackable, fast. The quiet workhorse behind multi-return functions, dict keys, and namedtuple records.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 't = (1,)\nprint(type(t))\nu = (1)\nprint(type(u))',
      options: [
        "<class 'tuple'> then <class 'int'>",
        "<class 'tuple'> then <class 'tuple'>",
        "<class 'int'> then <class 'int'>",
        'Error',
      ],
      correct: 0,
      explanation:
        '`(1,)` is a single-element tuple — the trailing comma matters. `(1)` is just the int 1 in parentheses.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 't = (1, 2, 3, 4, 5)\na, *mid, z = t\nprint(mid)',
      options: ['[2, 3, 4]', '(2, 3, 4)', '[2, 3, 4, 5]', 'Error'],
      correct: 0,
      explanation:
        'Star unpacking collects the middle into a LIST, not a tuple. So mid is [2, 3, 4].',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Why can a tuple be used as a dict key but a list cannot?',
      options: [
        'Tuples are faster',
        'Tuples are immutable and therefore hashable',
        'Tuples use less memory',
        'Python just decided so',
      ],
      correct: 1,
      explanation:
        'Dict keys must be hashable. Tuples are hashable because they are immutable. Lists are mutable, so their hash could change — Python forbids them as keys.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so we can access the namedtuple field `.x`:',
      code: 'from collections import ___\n\nPoint = ___("Point", ["x", "y"])\np = Point(3, 4)\nprint(p.x)',
      options: ['namedtuple', 'tuple', 'record', 'dataclass'],
      correct: 0,
      explanation:
        '`namedtuple` from the collections module creates a tuple subclass with named fields. It supports both attribute access (p.x) and index access (p[0]).',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `stats(nums)` that returns a tuple `(min, max, sum)` of a list of numbers. Use Python built-ins.',
      starterCode:
        'def stats(nums):\n    # your code here\n    pass',
      tests: [
        { input: 'stats([3, 1, 4, 1, 5])', expected: '(1, 5, 14)' },
        { input: 'stats([10])', expected: '(10, 10, 10)' },
        { input: 'stats([-1, -2, -3])', expected: '(-3, -1, -6)' },
      ],
      hint: 'Return `(min(nums), max(nums), sum(nums))`. Python packs the three values into a tuple automatically.',
      solution:
        'def stats(nums):\n    return (min(nums), max(nums), sum(nums))',
      explanation:
        'Returning multiple values is trivial — just comma-separate them. Python packs them into a tuple. The caller can unpack with `lo, hi, total = stats(...)`.',
      xp: 25,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON — File I/O
   ═══════════════════════════════════════════════════════════ */
export const fileIOLesson = {
  id: 'file-io',
  title: 'File I/O — Reading & Writing Files',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Every real program eventually reads or writes a file. Master `open`, `with`, and the text encoding basics — plus a look at CSV and JSON.',
  sections: [
    {
      type: 'text',
      content:
        'Open a file with `open(path, mode)`. Modes: "r" read, "w" write (truncates), "a" append, "x" create new, "b" binary, "t" text (default).',
    },
    {
      type: 'code',
      content: 'The four common modes:',
      code: `# "r" — read (default). File must exist.\n# "w" — write. Truncates or creates.\n# "a" — append. Creates if missing.\n# "x" — create exclusive. Fails if exists.\n\nwith open("demo.txt", "w") as f:\n    f.write("first line\\n")\n    f.write("second line\\n")\n\nwith open("demo.txt", "r") as f:\n    print(f.read())`,
      output: `first line\nsecond line\n\n`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Opening with "w" wipes the file first. If you want to keep existing content, use "a" (append). If the file must not exist, use "x".',
    },
    {
      type: 'text',
      content:
        'Always use `with open(...)` — it closes the file automatically, even on exceptions. Manual `f.close()` gets forgotten.',
    },
    {
      type: 'code',
      content: 'with vs manual:',
      code: `# Bad — leaks on exception\nf = open("demo.txt", "r")\ntry:\n    data = f.read()\nfinally:\n    f.close()\n\n# Good — automatic cleanup\nwith open("demo.txt", "r") as f:\n    data = f.read()\nprint(len(data))`,
      output: '23',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Three main ways to read: `.read()` (whole file as one string), `.readline()` (one line), and iterating the file (line by line — memory efficient).',
    },
    {
      type: 'code',
      content: 'Three read patterns:',
      code: `with open("demo.txt", "w") as f:\n    f.write("line1\\nline2\\nline3\\n")\n\nwith open("demo.txt") as f:\n    whole = f.read()\nprint(repr(whole))\n\nwith open("demo.txt") as f:\n    first = f.readline()\nprint(repr(first))\n\nwith open("demo.txt") as f:\n    for line in f:\n        print(line.strip())`,
      output: `'line1\\nline2\\nline3\\n'\n'line1\\n'\nline1\nline2\nline3`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'For huge files, iterate line by line. `for line in f:` reads lazily — one line at a time, regardless of file size.',
    },
    {
      type: 'text',
      content:
        'Note the difference between `.read()` and `.readlines()`. `.read()` gives a single string; `.readlines()` gives a list of lines with trailing newlines included.',
    },
    {
      type: 'code',
      content: 'read vs readlines:',
      code: `with open("demo.txt", "w") as f:\n    f.write("a\\nb\\nc")\n\nwith open("demo.txt") as f:\n    s = f.read()\nprint(type(s), repr(s))\n\nwith open("demo.txt") as f:\n    lines = f.readlines()\nprint(type(lines), lines)\n\n# Common: strip newlines on read\nwith open("demo.txt") as f:\n    clean = [line.strip() for line in f]\nprint(clean)`,
      output: `str 'a\\nb\\nc'\nlist ['a\\n', 'b\\n', 'c']\n['a', 'b', 'c']`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Writing is symmetric: `.write(str)` for strings, `.writelines(iterable)` for many strings at once. Neither adds newlines for you.',
    },
    {
      type: 'code',
      content: 'Write patterns:',
      code: `lines = ["one\\n", "two\\n", "three\\n"]\n\nwith open("out.txt", "w") as f:\n    f.writelines(lines)\n\nwith open("out.txt") as f:\n    print(f.read())`,
      output: `one\ntwo\nthree\n`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`.write()` and `.writelines()` do NOT add newlines. You must include them yourself. This is a common surprise.',
    },
    {
      type: 'text',
      content:
        'For CSV: Python ships the `csv` module. It handles quoting, commas inside fields, and different delimiters automatically. Do not parse CSV by hand.',
    },
    {
      type: 'code',
      content: 'CSV read and write:',
      code: `import csv\n\n# Write\nrows = [\n    ["name", "age"],\n    ["Ada", 36],\n    ["Alan", 41],\n]\nwith open("people.csv", "w", newline="") as f:\n    writer = csv.writer(f)\n    writer.writerows(rows)\n\n# Read\nwith open("people.csv") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)`,
      output: `['name', 'age']\n['Ada', '36']\n['Alan', '41']`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Use `newline=""` when opening files for CSV writing. It prevents extra blank lines on Windows.',
    },
    {
      type: 'text',
      content:
        'For JSON: use the `json` module. `json.dump()` writes an object to a file, `json.load()` reads it back. `dumps` / `loads` (with s) work with strings.',
    },
    {
      type: 'code',
      content: 'JSON round-trip:',
      code: `import json\n\ndata = {"name": "Ada", "age": 36, "tags": ["math", "code"]}\n\nwith open("data.json", "w") as f:\n    json.dump(data, f, indent=2)\n\nwith open("data.json") as f:\n    loaded = json.load(f)\nprint(loaded)\nprint(loaded["tags"][1])\n\n# String variants\ns = json.dumps(data)\nprint(s[:30])\nparsed = json.loads(s)\nprint(parsed == data)`,
      output: `{'name': 'Ada', 'age': 36, 'tags': ['math', 'code']}\ncode\n{"name": "Ada", "age": 36, "ta\nTrue`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`json.dump` (no s) writes to a file object. `json.dumps` (with s) returns a string. Same for `load` vs `loads`.',
    },
    {
      type: 'warning',
      content:
        'Always specify encoding when opening text files: `open(path, "r", encoding="utf-8")`. Default encoding varies by OS and can corrupt non-ASCII text.',
    },
    {
      type: 'code',
      content: 'Encoding — always be explicit:',
      code: `with open("hello.txt", "w", encoding="utf-8") as f:\n    f.write("Hello, नमस्ते, 你好\\n")\n\nwith open("hello.txt", encoding="utf-8") as f:\n    print(f.read().strip())`,
      output: 'Hello, नमस्ते, 你好',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'That is file I/O. `with open(...)`, the four modes, three read patterns, csv and json modules — this is 95% of real-world file handling.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Which mode truncates an existing file?',
      options: ['"r"', '"a"', '"w"', '"x"'],
      correct: 2,
      explanation:
        '"w" truncates (empties) the file, then writes. "a" appends without truncating. "x" creates but fails if the file exists. "r" is read-only.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What does this print?',
      code: `with open("t.txt", "w") as f:\n    f.write("a\\nb\\nc")\n\nwith open("t.txt") as f:\n    print(f.readlines())`,
      options: [
        "['a', 'b', 'c']",
        "['a\\n', 'b\\n', 'c']",
        "'a\\nb\\nc'",
        "['abc']",
      ],
      correct: 1,
      explanation:
        '`.readlines()` splits on newline but keeps the newline character at the end of each line. Only the last line has no trailing newline (since the file ended without one).',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Why is `with open(...)` preferred over `f = open(...)`?',
      options: [
        'It is faster',
        'It closes the file automatically, even on exceptions',
        'It works only on Linux',
        'It supports more file types',
      ],
      correct: 1,
      explanation:
        'The `with` statement guarantees cleanup. If an exception happens mid-file, `with` still closes it. Manual `f.close()` gets forgotten or skipped on errors.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'Which function returns a JSON STRING (not a file-write)?',
      options: ['json.dump', 'json.dumps', 'json.load', 'json.loads'],
      correct: 1,
      explanation:
        '`json.dumps` (with "s" for string) returns a string. `json.dump` (no s) writes directly to a file object. Same pattern for load vs loads.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `count_lines(path)` that returns the number of non-empty lines in the file at path. Assume the file exists.',
      starterCode:
        'def count_lines(path):\n    # your code here\n    pass',
      tests: [
        {
          input: `import os\np = "test_count.txt"\nwith open(p, "w") as f:\n    f.write("a\\n\\nb\\nc\\n")\ncount_lines(p)`,
          expected: '3',
        },
        {
          input: `p = "test_empty.txt"\nwith open(p, "w") as f:\n    pass\ncount_lines(p)`,
          expected: '0',
        },
      ],
      hint: 'Open with `with open(path) as f:`. Count lines using a generator: `sum(1 for line in f if line.strip())`.',
      solution:
        'def count_lines(path):\n    with open(path) as f:\n        return sum(1 for line in f if line.strip())',
      explanation:
        'Iterating a file gives lines with newlines. `line.strip()` removes whitespace; if anything is left, the line is non-empty. The sum counts them.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'output-match',
      question:
        'Write code that creates a file `greeting.txt` with the content "Hello, world!" (no trailing newline). Then read and print the content.',
      starterCode:
        '# Write to greeting.txt, then read and print\n',
      expectedOutput: 'Hello, world!',
      hint: 'Use `with open("greeting.txt", "w") as f: f.write("Hello, world!")`, then open again in read mode and print.',
      solution:
        'with open("greeting.txt", "w") as f:\n    f.write("Hello, world!")\n\nwith open("greeting.txt") as f:\n    print(f.read())',
      explanation:
        'Two `with` blocks: one writes, one reads. The file is closed automatically between them. `print` adds a newline, but `write` did not — the expected output has the full string on one line.',
      xp: 25,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON — Modules, Imports & __main__
   ═══════════════════════════════════════════════════════════ */
export const modulesLesson = {
  id: 'modules-imports',
  title: 'Modules, Imports & __main__',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'Every real program splits into modules. Understand imports, packages, and the __main__ idiom, and your code becomes readable and reusable.',
  sections: [
    {
      type: 'text',
      content:
        'A module is a .py file. A package is a directory of modules with an `__init__.py` file. Import brings names from one into another.',
    },
    {
      type: 'code',
      content: 'Four import styles:',
      code: `import math                        # import the module\nprint(math.sqrt(16))\n\nfrom math import sqrt              # import a specific name\nprint(sqrt(16))\n\nfrom math import sqrt as sq        # rename\nprint(sq(16))\n\nfrom math import *                 # import everything (avoid!)`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Avoid `from module import *`. It pollutes your namespace with unknown names and makes bugs hard to track. Explicit imports are almost always better.',
    },
    {
      type: 'text',
      content:
        'You can import your own files too. Create `helpers.py`, then `import helpers` from a sibling file — the whole module becomes available.',
    },
    {
      type: 'code',
      content: 'Importing your own module:',
      code: `# helpers.py\ndef double(n):\n    return n * 2\n\n# main.py\n# import helpers\n# print(helpers.double(5))\n\n# Or:\n# from helpers import double\n# print(double(5))\n\n# Simulated here:\ndef double(n):\n    return n * 2\nprint(double(5))`,
      output: '10',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Python searches for modules in: the current directory, PYTHONPATH, and site-packages. The `sys.path` list shows the exact order.',
    },
    {
      type: 'text',
      content:
        'Every module has a `__name__`. When run directly, `__name__` is `"__main__"`. When imported, `__name__` is the module name.',
    },
    {
      type: 'code',
      content: 'The __name__ check:',
      code: `# In a file called greet.py:\ndef greet(name):\n    return f"hi {name}"\n\nif __name__ == "__main__":\n    # only runs when the file is executed directly,\n    # NOT when it is imported\n    print(greet("world"))\n\n# Simulated here since we are in a lesson\nprint(__name__)`,
      output: '__main__',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Always wrap runnable code under `if __name__ == "__main__":`. This makes the file both importable (no side effects) and runnable (as a script).',
    },
    {
      type: 'text',
      content:
        'Packages are directories. `my_project/mypkg/__init__.py` marks the directory as a package. Sub-modules are imported as `mypkg.submodule`.',
    },
    {
      type: 'code',
      content: 'Package layout (conceptual):',
      code: `# my_project/\n#   main.py\n#   mypkg/\n#     __init__.py\n#     utils.py\n#     models.py\n#\n# In main.py:\n#     from mypkg import utils\n#     from mypkg.models import User`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'In modern Python (3.3+), `__init__.py` is not strictly required for a directory to be a package, but it is still conventional and clarifies intent.',
    },
    {
      type: 'text',
      content:
        '`__init__.py` runs when the package is imported. Often it is empty. Sometimes it re-exports names so users can import from the top level.',
    },
    {
      type: 'code',
      content: '__init__.py re-exporting:',
      code: `# mypkg/__init__.py\n# from .utils import helper\n# from .models import User\n#\n# Then users can do:\n# from mypkg import User, helper`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Standard library imports first, then third-party, then local. Sort each group alphabetically. This is a widely followed convention (PEP 8).',
    },
    {
      type: 'code',
      content: 'Import order:',
      code: `# 1. Standard library\nimport os\nimport sys\nfrom datetime import datetime\n\n# 2. Third-party (pip installed)\n# import numpy as np\n# import requests\n\n# 3. Local project\n# from mypkg import utils\n# from .sibling import helper\n\nprint("imports organized")`,
      output: 'imports organized',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'That is modules. Four import styles, packages, the `__name__ == "__main__"` guard, and the convention for organizing imports — the whole picture in one lesson.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is `__name__` when a Python file is run directly?',
      options: ['The filename', '"__main__"', '"__init__"', 'None'],
      correct: 1,
      explanation:
        'When run directly, `__name__` is the string "__main__". When imported, it is the module name. This is the mechanism behind the `if __name__ == "__main__":` idiom.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'Why should you avoid `from module import *`?',
      options: [
        'It is slow',
        'It pollutes the namespace with unknown names, making bugs hard to track',
        'It only works for standard library modules',
        'It causes syntax errors',
      ],
      correct: 1,
      explanation:
        'Star imports dump every public name into your namespace. You lose track of where names come from, and collisions are common. Explicit imports make code clearer.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'import math\nfrom math import sqrt\nprint(sqrt(25))\nprint(math.sqrt(25))',
      options: ['5 5', '5.0 5.0', 'Error', '5 then Error'],
      correct: 1,
      explanation:
        'Both forms work. `sqrt` (imported directly) and `math.sqrt` (via the module) refer to the same function. Output is 5.0 twice.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the code runs only when executed directly (not when imported):',
      code: 'def run():\n    print("running")\n\nif ___ == "__main__":\n    run()',
      options: ['__name__', '__main__', '__file__', '__module__'],
      correct: 0,
      explanation:
        '`__name__` holds the module name. When run directly, it is "__main__". Comparing it to the string "__main__" separates script-mode from import-mode.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `safe_import(name)` that tries to import the named module and returns True if successful, False otherwise. Use try/except ImportError.',
      starterCode:
        'def safe_import(name):\n    # your code here\n    pass',
      tests: [
        { input: 'safe_import("math")', expected: 'True' },
        { input: 'safe_import("sys")', expected: 'True' },
        { input: 'safe_import("not_a_real_module_xyz")', expected: 'False' },
      ],
      hint: 'Use `__import__(name)` inside a try block, catch ImportError, return False in except.',
      solution:
        'def safe_import(name):\n    try:\n        __import__(name)\n        return True\n    except ImportError:\n        return False',
      explanation:
        '`__import__(name)` imports a module by string name. If the module does not exist, ImportError is raised — we catch it and return False.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON — Type Hints
   ═══════════════════════════════════════════════════════════ */
export const typeHintsLesson = {
  id: 'type-hints',
  title: 'Type Hints & Annotations',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'Type hints are documentation that tools can read. Python does not enforce them at runtime, but they catch bugs before they run — and modern code uses them everywhere.',
  sections: [
    {
      type: 'text',
      content:
        'Annotations attach type information to variables, function parameters, and return values. Python ignores them at runtime; tools like mypy, IDEs, and linters use them.',
    },
    {
      type: 'code',
      content: 'Basic function annotations:',
      code: `def add(a: int, b: int) -> int:\n    return a + b\n\ndef greet(name: str) -> str:\n    return f"Hello, {name}"\n\nprint(add(2, 3))\nprint(greet("Ada"))\nprint(add.__annotations__)`,
      output: `5\nHello, Ada\n{'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'str'>}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Annotations do NOT enforce anything. `add("a", "b")` still runs (and returns "ab"). The hint is a promise, not a check.',
    },
    {
      type: 'warning',
      content:
        'Never rely on annotations for runtime validation. If you need to enforce types, do it explicitly with `isinstance()` or a library like Pydantic.',
    },
    {
      type: 'text',
      content:
        'Variables can be annotated too. Useful in complex code, especially in class bodies and function signatures.',
    },
    {
      type: 'code',
      content: 'Variable annotations:',
      code: `name: str = "Ada"\nage: int = 36\nscores: list = [90, 85, 78]\n\n# Annotations without assignment are allowed (for docs)\nuser_id: int\n\nprint(name, age, scores)`,
      output: 'Ada 36 [90, 85, 78]',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'For containers, use `typing` module generics: `List[int]`, `Dict[str, int]`, `Tuple[int, str]`. Modern Python (3.9+) also accepts `list[int]`, `dict[str, int]`.',
    },
    {
      type: 'code',
      content: 'Container type hints:',
      code: `from typing import List, Dict, Tuple\n\n# Old style (works everywhere)\ndef process(nums: List[int]) -> List[int]:\n    return [n * 2 for n in nums]\n\n# Modern style (Python 3.9+)\ndef process2(nums: list[int]) -> list[int]:\n    return [n * 2 for n in nums]\n\nprint(process([1, 2, 3]))\nprint(process2([1, 2, 3]))\nprint(process.__annotations__)`,
      output: '[2, 4, 6]\n[2, 4, 6]\n{\'nums\': typing.List[int], \'return\': typing.List[int]}',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`Optional[X]` means "X or None". `Union[X, Y]` means "X or Y". Python 3.10+ lets you write `X | None` for Optional.',
    },
    {
      type: 'code',
      content: 'Optional and Union:',
      code: `from typing import Optional, Union\n\ndef find(items: list, target) -> Optional[int]:\n    try:\n        return items.index(target)\n    except ValueError:\n        return None\n\ndef to_int(x: Union[int, str]) -> int:\n    return int(x)\n\nprint(find([1, 2, 3], 2))\nprint(find([1, 2, 3], 99))\nprint(to_int("42"))`,
      output: '1\nNone\n42',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Python 3.10+ syntax: `def find(...) -> int | None:`. Cleaner than `Optional[int]`. Use whichever your project targets.',
    },
    {
      type: 'text',
      content:
        '`Any` disables type checking for a value. Useful when you genuinely do not know the type — sparingly.',
    },
    {
      type: 'code',
      content: 'Any — escape hatch:',
      code: `from typing import Any\n\ndef log(value: Any) -> None:\n    print(value)\n\nlog(42)\nlog("hello")\nlog([1, 2, 3])`,
      output: '42\nhello\n[1, 2, 3]',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`Callable` describes functions as parameters. Syntax: `Callable[[arg_types], return_type]`.',
    },
    {
      type: 'code',
      content: 'Callable hints:',
      code: `from typing import Callable\n\ndef apply(fn: Callable[[int], int], x: int) -> int:\n    return fn(x)\n\nprint(apply(lambda n: n * 2, 5))\nprint(apply(abs, -7))`,
      output: '10\n7',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Tooling: `mypy` and `pyright` are the two main type checkers. They read the annotations and flag mismatches — before you run anything.',
    },
    {
      type: 'text',
      content:
        'For classes, use forward references (strings) when a class refers to itself or to a class defined later.',
    },
    {
      type: 'code',
      content: 'Forward references:',
      code: `class Node:\n    def __init__(self, value: int, next: "Node | None" = None):\n        self.value = value\n        self.next = next\n\nn = Node(1, Node(2))\nprint(n.value)\nprint(n.next.value)`,
      output: '1\n2',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is type hints. They improve readability, enable IDE autocomplete, catch bugs early — and modern Python code uses them everywhere. Type them or your future self will curse you.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add("x", "y"))',
      options: ['Error', "'xy'", '0', 'None'],
      correct: 1,
      explanation:
        'Annotations do NOT enforce types at runtime. `add("x", "y")` runs fine and returns "xy" (string concatenation). The hint is documentation, not a check.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'What does `Optional[int]` mean?',
      options: [
        'The parameter is required and must be int',
        'int or None',
        'The parameter has a default value',
        'Any type is allowed',
      ],
      correct: 1,
      explanation:
        '`Optional[X]` is shorthand for `Union[X, None]` — either X or None. In Python 3.10+, you can write `int | None` instead.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Are type hints enforced at runtime in Python?',
      options: [
        'Yes, always',
        'Only inside functions',
        'No — they are for documentation and static analysis tools',
        'Only for class attributes',
      ],
      correct: 2,
      explanation:
        'Python ignores annotations at runtime. Tools like mypy and pyright read them and check your code statically. If you need runtime enforcement, use Pydantic or explicit isinstance checks.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the function accepts an int OR a string and returns an int:',
      code: 'from typing import ___\n\ndef to_int(x: ___[int, str]) -> int:\n    return int(x)',
      options: ['Union', 'Optional', 'Either', 'Any'],
      correct: 0,
      explanation:
        '`Union[int, str]` means "int or str". `Optional` means "X or None". `Union` is the general "this or that" combinator.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `repeat(s: str, n: int) -> str` that returns the string s repeated n times. (Annotations are part of the function signature — the tests will call it with correct types.)',
      starterCode:
        'def repeat(s: str, n: int) -> str:\n    # your code here\n    pass',
      tests: [
        { input: 'repeat("ab", 3)', expected: "'ababab'" },
        { input: 'repeat("x", 0)', expected: "''" },
        { input: 'repeat("hi", 2)', expected: "'hihi'" },
      ],
      hint: 'Just `return s * n`. The annotations do not change the behavior — they document it.',
      solution:
        'def repeat(s: str, n: int) -> str:\n    return s * n',
      explanation:
        'Annotations ride alongside the code without changing it. Add them for clarity, run-time behavior is identical.',
      xp: 25,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON — Recursion
   ═══════════════════════════════════════════════════════════ */
export const recursionLesson = {
  id: 'recursion',
  title: 'Recursion — Functions That Call Themselves',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'A recursive function solves a problem by calling itself on a smaller version of the same problem. Two rules: a base case and progress toward it.',
  sections: [
    {
      type: 'text',
      content:
        'Every recursive function needs two things: a base case (when to stop) and a recursive case (how to break the problem down). Without the first, infinite recursion. Without the second, no recursion happens.',
    },
    {
      type: 'code',
      content: 'Countdown — the simplest recursion:',
      code: `def countdown(n):\n    if n <= 0:            # base case\n        print("done")\n        return\n    print(n)\n    countdown(n - 1)      # recursive case, moving toward 0\n\ncountdown(3)`,
      output: '3\n2\n1\ndone',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'If the base case never triggers, Python raises `RecursionError` after ~1000 calls (the recursion limit). This is not a crash-proof ceiling — you cannot recurse arbitrarily deep.',
    },
    {
      type: 'text',
      content:
        'Factorial is the classic example. n! = n × (n-1)! with 0! = 1 as the base.',
    },
    {
      type: 'code',
      content: 'Factorial — recursive:',
      code: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))\nprint(factorial(10))`,
      output: '120\n3628800',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Every recursive function has an equivalent iterative version. Recursion is often shorter and clearer for tree-shaped problems — but slower (function call overhead) and limited in depth.',
    },
    {
      type: 'text',
      content:
        'Fibonacci — a cautionary tale. Naive recursion recomputes the same subproblems exponentially.',
    },
    {
      type: 'code',
      content: 'Naive fibonacci is slow:',
      code: `def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(10))\n# fib(30) would take ~1 million calls`,
      output: '55',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Naive fib is O(2ⁿ). fib(30) is slow; fib(50) takes hours. Memoization (caching results) turns it into O(n). Use `functools.cache`.',
    },
    {
      type: 'code',
      content: 'Memoized fibonacci — instant:',
      code: `from functools import cache\n\n@cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(30))\nprint(fib(100))`,
      output: '832040\n354224848179261915075',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Any time you see a recursion that recomputes the same input, add @cache. It is a one-line fix that turns exponential into linear.',
    },
    {
      type: 'text',
      content:
        'Recursion shines on tree-shaped problems: file systems, JSON structures, DOM trees, nested comments. Iterative versions are painful.',
    },
    {
      type: 'code',
      content: 'Sum nested list — perfect for recursion:',
      code: `def deep_sum(items):\n    total = 0\n    for item in items:\n        if isinstance(item, list):\n            total += deep_sum(item)   # recurse\n        else:\n            total += item\n    return total\n\nprint(deep_sum([1, [2, 3], [4, [5, 6]], 7]))`,
      output: '28',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'The recursion limit is adjustable via `sys.setrecursionlimit()`. But if you find yourself increasing it, an iterative solution is usually the right answer.',
    },
    {
      type: 'code',
      content: 'Checking the limit:',
      code: `import sys\nprint(sys.getrecursionlimit())     # default 1000\n\n# Default limit — keep it. If you need more, redesign iteratively.`,
      output: '1000',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Rule of thumb: use recursion for tree-like data, small depth, or when the recursive version is dramatically clearer. Otherwise, iterate.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'def f(n):\n    if n <= 0:\n        return 0\n    return n + f(n - 1)\n\nprint(f(4))',
      options: ['4', '10', '24', 'Error'],
      correct: 1,
      explanation:
        'f(4) = 4 + f(3) = 4 + 3 + f(2) = 4 + 3 + 2 + f(1) = 4 + 3 + 2 + 1 + f(0) = 10. Classic sum from 1 to n.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What happens when this runs?',
      code: 'def f(n):\n    return f(n + 1)\n\nf(0)',
      options: [
        'Returns 0',
        'Infinite loop, no error',
        'RecursionError — maximum recursion depth exceeded',
        'Returns None',
      ],
      correct: 2,
      explanation:
        'No base case. The function keeps calling itself until Python hits its recursion limit (~1000 frames) and raises RecursionError.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Why is naive recursive fibonacci slow?',
      options: [
        'Python has no tail-call optimization',
        'It recomputes the same subproblems exponentially many times',
        'Recursion is always slower than loops',
        'Numbers get too big',
      ],
      correct: 1,
      explanation:
        'fib(n) calls fib(n-1) and fib(n-2). fib(n-1) itself calls fib(n-2) again. The same inputs are solved over and over — 2ⁿ work. Memoization fixes this.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so the function counts down from n to 0:',
      code: 'def countdown(n):\n    if n < 0:\n        return\n    print(n)\n    ___(n - 1)',
      options: ['countdown', 'self', 'loop', 'repeat'],
      correct: 0,
      explanation:
        'A recursive function calls itself by name. `countdown(n - 1)` moves toward the base case (n < 0).',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a recursive function `sum_digits(n)` that returns the sum of the digits of a non-negative integer n. For 1234, return 1+2+3+4 = 10.',
      starterCode:
        'def sum_digits(n):\n    # your code here\n    pass',
      tests: [
        { input: 'sum_digits(1234)', expected: '10' },
        { input: 'sum_digits(9)', expected: '9' },
        { input: 'sum_digits(0)', expected: '0' },
        { input: 'sum_digits(99999)', expected: '45' },
      ],
      hint: 'Base case: if n < 10, return n. Recursive case: return (n % 10) + sum_digits(n // 10). The last digit plus the sum of the remaining digits.',
      solution:
        'def sum_digits(n):\n    if n < 10:\n        return n\n    return (n % 10) + sum_digits(n // 10)',
      explanation:
        'Peel off the last digit with `n % 10`, then recurse on the rest with `n // 10`. The base case catches single-digit numbers.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON — Standard Library Tour
   ═══════════════════════════════════════════════════════════ */
export const stdlibTourLesson = {
  id: 'stdlib-tour',
  title: 'Standard Library Tour — Batteries Included',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Python ships with over 200 modules. You will use a dozen of them constantly. Here is the tour: math, random, datetime, collections, itertools, os, sys.',
  sections: [
    {
      type: 'text',
      content:
        '`math` — mathematical functions. Everything from `sqrt` to `log`, `factorial`, `gcd`, and constants.',
    },
    {
      type: 'code',
      content: 'math basics:',
      code: `import math\n\nprint(math.sqrt(16))\nprint(math.floor(3.7))\nprint(math.ceil(3.2))\nprint(math.factorial(5))\nprint(math.gcd(12, 18))\nprint(math.pi)\nprint(math.log(100, 10))`,
      output: '4.0\n3\n4\n120\n6\n3.141592653589793\n2.0',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`random` — pseudo-random numbers. Seeded for reproducibility, useful for simulations, games, and sampling.',
    },
    {
      type: 'code',
      content: 'random — several patterns:',
      code: `import random\n\nrandom.seed(42)           # reproducible\n\nprint(random.randint(1, 6))       # dice roll\nprint(random.random())            # [0.0, 1.0)\nprint(random.choice(["a", "b", "c"]))\nprint(random.sample(range(10), 3))    # 3 unique picks\nlst = [1, 2, 3, 4, 5]\nrandom.shuffle(lst)\nprint(lst)`,
      output: '1\n0.6394...\nc\n[1, 4, 9]\n[2, 5, 4, 1, 3]',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`random` is NOT cryptographically secure. For passwords, tokens, secrets — use `secrets` module.',
    },
    {
      type: 'text',
      content:
        '`datetime` — dates, times, arithmetic. `date`, `time`, `datetime`, `timedelta`. Essential for logs, scheduling, and anything time-based.',
    },
    {
      type: 'code',
      content: 'datetime essentials:',
      code: `from datetime import datetime, date, timedelta\n\nnow = datetime.now()\nprint(now.year, now.month, now.day)\n\ntoday = date.today()\nprint(today)\n\none_week = timedelta(days=7)\nprint(today + one_week)\n\ndiff = date(2025, 1, 1) - today\nprint(diff.days)`,
      output: '2026 10 15\n2026-10-15\n2026-10-22\n78',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'For timezone-aware dates, use `datetime.now(timezone.utc)` or the third-party `pytz` / `zoneinfo`. The stdlib `zoneinfo` (3.9+) handles most cases.',
    },
    {
      type: 'text',
      content:
        '`collections` — specialized containers. The big four: `Counter`, `defaultdict`, `deque`, `namedtuple`.',
    },
    {
      type: 'code',
      content: 'Counter — counting made easy:',
      code: `from collections import Counter\n\nwords = "the quick the lazy the end".split()\ncounts = Counter(words)\nprint(counts)\nprint(counts.most_common(2))\nprint(counts["the"])`,
      output: `Counter({'the': 3, 'quick': 1, 'lazy': 1, 'end': 1})\n[('the', 3), ('quick', 1)]\n3`,
      language: 'python',
    },
    {
      type: 'code',
      content: 'defaultdict — no more KeyError:',
      code: `from collections import defaultdict\n\n# Group words by first letter\ngroups = defaultdict(list)\nfor w in ["apple", "banana", "avocado", "blueberry"]:\n    groups[w[0]].append(w)\n\nprint(dict(groups))`,
      output: `{'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry']}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`defaultdict(list)` creates an empty list on first access. Saves you from `if key not in d: d[key] = []` boilerplate.',
    },
    {
      type: 'code',
      content: 'deque — fast from both ends:',
      code: `from collections import deque\n\nd = deque([1, 2, 3])\nd.appendleft(0)      # O(1)\nd.append(4)          # O(1)\nprint(d)\nprint(d.popleft())\nprint(d.pop())\nprint(d)`,
      output: `deque([0, 1, 2, 3, 4])\n0\n4\ndeque([1, 2, 3])`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`itertools` — the iterable toolbox. `count`, `cycle`, `chain`, `combinations`, `permutations`, `product`.',
    },
    {
      type: 'code',
      content: 'itertools patterns:',
      code: `import itertools\n\nprint(list(itertools.chain([1, 2], [3, 4])))\nprint(list(itertools.product([1, 2], ["a", "b"])))\nprint(list(itertools.combinations([1, 2, 3], 2)))\nprint(list(itertools.permutations([1, 2, 3], 2)))\nprint(list(itertools.islice(itertools.count(10), 5)))`,
      output: `[1, 2, 3, 4]\n[(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]\n[(1, 2), (1, 3), (2, 3)]\n[(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]\n[10, 11, 12, 13, 14]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`os` and `sys` — filesystem and interpreter. File paths, environment variables, command-line arguments, exit codes.',
    },
    {
      type: 'code',
      content: 'os and sys basics:',
      code: `import os\nimport sys\n\nprint(os.getcwd())                  # current directory\nprint(os.listdir(".")[:3])          # list files (first 3)\n\n# sys\nprint(sys.version_info[:2])\nprint(sys.argv)                     # command-line args\nprint(sys.platform)`,
      output: `(varies by system)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'For file paths, prefer `pathlib.Path` over `os.path`. It is object-oriented, cross-platform, and clearer.',
    },
    {
      type: 'code',
      content: 'pathlib — the modern way:',
      code: `from pathlib import Path\n\np = Path(".")\nprint(p.resolve())          # absolute path\nprint(p.exists())\n\n# Reading and writing\npath = Path("hello.txt")\npath.write_text("hi")\nprint(path.read_text())`,
      output: `(varies)\nTrue\nhi`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is the standard library tour. math, random, datetime, collections, itertools, os, sys, pathlib — the eight modules that cover most daily work.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'import math\nprint(math.gcd(24, 36))',
      options: ['6', '12', '24', '72'],
      correct: 1,
      explanation:
        'Greatest common divisor of 24 and 36. 24 = 2³ × 3, 36 = 2² × 3². Common factors: 2² × 3 = 12.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'from collections import Counter\nc = Counter("aabbbcccc")\nprint(c.most_common(1))',
      options: [
        "[('c', 4)]",
        "[('a', 2)]",
        "[('b', 3)]",
        "Counter({'c': 4})",
      ],
      correct: 0,
      explanation:
        'Counter counts characters. "a" appears 2×, "b" 3×, "c" 4×. `most_common(1)` returns a list with the single most common item: [("c", 4)].',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'Which module should you use for a cryptographically secure random token?',
      options: ['random', 'math', 'secrets', 'os'],
      correct: 2,
      explanation:
        '`secrets` is designed for security: tokens, passwords, keys. `random` is deterministic (seeded) and predictable — never use it for security.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so we count word frequencies in one line:',
      code: 'from collections import ___\n\nwords = "a b a c a b".split()\ncounts = ___ (words)\nprint(counts["a"])',
      options: ['Counter', 'defaultdict', 'deque', 'namedtuple'],
      correct: 0,
      explanation:
        '`Counter(iterable)` builds a frequency map in one call. `counts["a"]` returns 3 for the given input.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `most_common_letter(text)` that returns the letter that appears most often in the text. Ignore spaces. Assume text is non-empty and lowercase.',
      starterCode:
        'def most_common_letter(text):\n    # your code here\n    pass',
      tests: [
        { input: 'most_common_letter("aabbbcc")', expected: "'b'" },
        { input: 'most_common_letter("hello world")', expected: "'l'" },
        { input: 'most_common_letter("aaaa")', expected: "'a'" },
      ],
      hint: 'Use Counter from collections: `Counter(text.replace(" ", "")).most_common(1)[0][0]`.',
      solution:
        'from collections import Counter\n\ndef most_common_letter(text):\n    cleaned = text.replace(" ", "")\n    return Counter(cleaned).most_common(1)[0][0]',
      explanation:
        'Counter tracks frequencies. `most_common(1)` returns a list with the top item as a (letter, count) tuple. Indexing [0][0] grabs the letter.',
      xp: 30,
    },
    {
      id: 'q6',
      type: 'code-challenge',
      question:
        'Write a function `day_of_week()` that returns the current day name in lowercase (e.g., "monday"). Use the datetime module.',
      starterCode:
        'def day_of_week():\n    # your code here\n    pass',
      tests: [
        {
          input: 'day_of_week() in ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]',
          expected: 'True',
        },
      ],
      hint: '`datetime.now().strftime("%A")` gives the full day name; `.lower()` for lowercase.',
      solution:
        'from datetime import datetime\n\ndef day_of_week():\n    return datetime.now().strftime("%A").lower()',
      explanation:
        '`strftime("%A")` returns the full day name. `.lower()` normalizes it. This pattern works for any date formatting task.',
      xp: 25,
    },
  ],
};