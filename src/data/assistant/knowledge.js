// 🤖 PyMastery Assistant — Knowledge Base
// Each entry: { id, keywords[], question, answer, code?, lessonLink? }

export const knowledge = [
  /* ═══════════════════════════════════════════
     PYTHON BASICS — VARIABLES
     ═══════════════════════════════════════════ */
  {
    id: 'what-is-variable',
    keywords: ['variable', 'variables', 'assign', 'assignment'],
    question: 'What is a variable in Python?',
    answer:
      'A variable is a NAME bound to an OBJECT. Not a box — a label. When you write `x = 5`, Python creates the int 5 and binds the name `x` to it. Reassigning `x` changes what it points to, not the object itself.',
    code: 'age = 20\nname = "Ada"\nage = 21    # rebinding',
    lessonLink: { moduleId: 'python-basics', lessonId: 'variables' },
  },
  {
    id: 'is-vs-equals',
    keywords: ['is', '==', 'equals', 'identity', 'equality', 'difference'],
    question: 'What is the difference between `is` and `==`?',
    answer:
      '`==` checks VALUE equality. `is` checks IDENTITY (same object in memory). Two lists can be `==` (same contents) but not `is` (different objects). Use `is` only for None, True, False.',
    code: 'a = [1, 2, 3]\nb = [1, 2, 3]\na == b    # True — same value\na is b    # False — different objects',
    lessonLink: { moduleId: 'python-basics', lessonId: 'variables' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — DATA TYPES
     ═══════════════════════════════════════════ */
  {
    id: 'data-types',
    keywords: ['type', 'types', 'data-type', 'int', 'float', 'str', 'bool'],
    question: 'What are the core data types in Python?',
    answer:
      'Four core scalars: int (whole numbers), float (decimals), str (text), bool (True/False). Plus None for "no value". Python is dynamically typed — you do not declare types, Python infers them.',
    code: 'age = 20            # int\nprice = 19.99       # float\nname = "Ada"        # str\nis_active = True    # bool\nx = None            # NoneType',
    lessonLink: { moduleId: 'python-basics', lessonId: 'data-types' },
  },
  {
    id: 'float-precision',
    keywords: ['float', 'precision', '0.1', '0.2', 'rounding'],
    question: 'Why does 0.1 + 0.2 not equal 0.3?',
    answer:
      'Binary floats cannot represent 0.1 or 0.2 exactly — just like 1/3 has no clean decimal. The sum becomes 0.30000000000000004. Never compare floats with `==`. Use `math.isclose()` or round before displaying.',
    code: 'print(0.1 + 0.2)                    # 0.30000000000000004\nimport math\nprint(math.isclose(0.1 + 0.2, 0.3))  # True',
    lessonLink: { moduleId: 'python-basics', lessonId: 'data-types' },
  },
  {
    id: 'type-conversion',
    keywords: ['convert', 'conversion', 'cast', 'casting', 'int', 'float', 'str'],
    question: 'How do I convert between types?',
    answer:
      'Use `int()`, `float()`, `str()`, `bool()`, `list()`, `tuple()`. Note: `int()` truncates toward zero (does not round). `int("3.5")` fails — parse as float first.',
    code: 'int("42")      # 42\nfloat("3.5")   # 3.5\nint(3.9)       # 3 (truncates)\nstr(99)        # "99"\nbool(0)        # False',
    lessonLink: { moduleId: 'python-basics', lessonId: 'data-types' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — STRINGS
     ═══════════════════════════════════════════ */
  {
    id: 'string-slicing',
    keywords: ['slice', 'slicing', 'substring', 'start', 'stop', 'step', 'reverse'],
    question: 'How does string slicing work?',
    answer:
      'Syntax: `s[start:stop:step]`. Start inclusive, stop exclusive. Omit either side to go to the ends. Negative indices count from the end. `s[::-1]` reverses the string — the idiomatic Python trick.',
    code: `s = "Python"\ns[0:3]    # "Pyt"\ns[2:]     # "thon"\ns[:3]     # "Pyt"\ns[::-1]   # "nohtyP"`,
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },
  {
    id: 'f-strings',
    keywords: ['f-string', 'fstring', 'f string', 'format', 'interpolation'],
    question: 'What are f-strings?',
    answer:
      'f-strings embed expressions inside strings: prefix with `f` and use `{...}`. Faster and cleaner than concatenation or `.format()`. Supports format specs: `{x:.2f}` for 2 decimals, `{n:,}` for thousand separators.',
    code: `name = "Ada"\nage = 36\nprint(f"{name} is {age}")\nprint(f"Pi: {3.14159:.2f}")     # Pi: 3.14\nprint(f"{1234567:,}")            # 1,234,567`,
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },
  {
    id: 'string-immutable',
    keywords: ['immutable', 'string', 'change', 'modify', 'in place'],
    question: 'Why can I not change a character in a string?',
    answer:
      'Strings are immutable. `s[0] = "H"` raises TypeError. Every "modification" creates a NEW string. To change, build a new one: `s = "H" + s[1:]`.',
    code: 's = "hello"\n# s[0] = "H"        # TypeError\ns = "H" + s[1:]      # "Hello"',
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },
  {
    id: 'split-join',
    keywords: ['split', 'join', 'string', 'list', 'convert'],
    question: 'How do split() and join() work?',
    answer:
      '`split()` breaks a string into a list. `join()` glues a list into a string. Together they are the workhorses of text processing. Never use `+=` on strings in a loop — use join instead.',
    code: 'csv = "a,b,c"\nparts = csv.split(",")      # ["a", "b", "c"]\nback = "-".join(parts)       # "a-b-c"',
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },
  {
    id: 'string-methods',
    keywords: ['strip', 'upper', 'lower', 'replace', 'startswith', 'endswith', 'find'],
    question: 'What are the most-used string methods?',
    answer:
      'strip/lstrip/rstrip (trim whitespace), upper/lower/title (case), replace, count, find (index, -1 if missing), startswith/endswith, split, join, format. Know these cold — they cover 90% of text work.',
    code: '"  hi  ".strip()        # "hi"\n"hello".upper()         # "HELLO"\n"a-b-c".replace("-","_") # "a_b_c"\n"hello".startswith("he") # True\n"hello".find("l")        # 2',
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },
  {
    id: 'string-in',
    keywords: ['in', 'contains', 'substring', 'check', 'string'],
    question: 'How do I check if a string contains something?',
    answer:
      'Use the `in` operator. `"sub" in text` returns True if the substring appears anywhere. Case-sensitive.',
    code: '"py" in "python"      # True\n"PY" in "python"      # False\n"py" not in "python"  # False',
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },
  {
    id: 'string-format-specs',
    keywords: ['format', 'spec', 'padding', 'align', 'f-string', 'decimal'],
    question: 'What format specs can I use in f-strings?',
    answer:
      'Inside `{value:spec}`: `.2f` (2 decimals), `10.2f` (width 10), `05d` (zero-pad), `,` (thousands), `>`/`<`/`^` (align), `%` (percent). Combine: `{x:>10,.2f}`.',
    code: 'f"{3.14159:.2f}"       # "3.14"\nf"{42:05d}"            # "00042"\nf"{1234567:,}"         # "1,234,567"\nf"{\'hi\':>5}|"          # "   hi|"',
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },
  {
    id: 'string-reverse',
    keywords: ['reverse', 'string', 'backwards', 'palindrome'],
    question: 'How do I reverse a string?',
    answer:
      'Use slicing with a negative step: `s[::-1]`. No loop, no library. This is the idiomatic Python one-liner — memorise it.',
    code: 's = "Python"\ns[::-1]    # "nohtyP"',
    lessonLink: { moduleId: 'python-basics', lessonId: 'strings' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — LISTS
     ═══════════════════════════════════════════ */
  {
    id: 'list-basics',
    keywords: ['list', 'lists', 'array', 'create', 'mutable'],
    question: 'What is a list?',
    answer:
      'An ordered, mutable collection. Create with `[]` or `list()`. Supports indexing, slicing, append, extend, insert, remove, sort. Lists are the workhorse of Python.',
    code: 'nums = [1, 2, 3]\nnums.append(4)      # [1, 2, 3, 4]\nnums[0] = 99        # [99, 2, 3, 4]\nnums[1:3]           # [2, 3]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'list-vs-tuple',
    keywords: ['list', 'tuple', 'difference', 'vs', 'mutable', 'immutable'],
    question: 'What is the difference between a list and a tuple?',
    answer:
      'Lists are mutable (`[]`); tuples are immutable (`()`). Tuples are hashable — usable as dict keys. Tuples are lighter and faster. Rule: list for growing collections, tuple for fixed records.',
    code: 'a = [1, 2, 3]      # list — mutable\nt = (1, 2, 3)      # tuple — immutable\n# t[0] = 99        # TypeError',
    lessonLink: { moduleId: 'python-basics', lessonId: 'tuples' },
  },
  {
    id: 'list-comprehension',
    keywords: ['list', 'comprehension', 'one-line', 'line', 'loop'],
    question: 'What is a list comprehension?',
    answer:
      'A one-line way to build a list: `[expression for item in iterable if condition]`. Faster and more Pythonic than a for-loop + append. Can nest, filter, transform.',
    code: 'squares = [n ** 2 for n in range(5)]     # [0, 1, 4, 9, 16]\nevens = [n for n in range(10) if n % 2 == 0]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'list-copy',
    keywords: ['copy', 'reference', 'alias', 'list', 'same', 'shared'],
    question: 'Why does changing one list change another?',
    answer:
      'Assignment never copies. `b = a` makes both names point to the SAME object. Use `.copy()`, `list(a)`, or `a[:]` for a shallow copy. Use `copy.deepcopy()` for nested structures.',
    code: 'a = [1, 2, 3]\nb = a              # same object\nb.append(4)\nprint(a)           # [1, 2, 3, 4]\n\nc = a.copy()       # separate\nc.append(99)\nprint(a)           # unchanged',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'sort-vs-sorted',
    keywords: ['sort', 'sorted', 'order', 'ascending', 'descending'],
    question: 'What is the difference between sort() and sorted()?',
    answer:
      '`a.sort()` mutates the list in place and returns None. `sorted(a)` returns a new sorted list and leaves `a` untouched. Classic bug: `a = a.sort()` gives `None`.',
    code: 'a = [3, 1, 2]\nb = sorted(a)      # [1, 2, 3], a unchanged\na.sort()           # a is now [1, 2, 3]\nresult = a.sort()  # None!',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'append-vs-extend',
    keywords: ['append', 'extend', 'insert', 'list', 'add', 'difference'],
    question: 'What is the difference between append and extend?',
    answer:
      '`append(x)` adds ONE item (if x is a list, the list itself). `extend(iterable)` adds MANY items individually. `insert(i, x)` adds at a specific index (slow — shifts everything).',
    code: 'a = [1, 2]\na.append([3, 4])    # [1, 2, [3, 4]]\nb = [1, 2]\nb.extend([3, 4])    # [1, 2, 3, 4]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'remove-vs-pop',
    keywords: ['remove', 'pop', 'delete', 'list', 'by value', 'by index'],
    question: 'What is the difference between remove and pop?',
    answer:
      '`list.remove(x)` removes the FIRST matching VALUE and returns None (raises ValueError if missing). `list.pop(i)` removes and RETURNS the item at index i (default: last). pop is faster for the end; both are O(n).',
    code: 'a = [1, 2, 3, 2]\na.remove(2)     # [1, 3, 2]\nb = [1, 2, 3]\nx = b.pop()     # x=3, b=[1, 2]\ny = b.pop(0)    # y=1, b=[2]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'list-slicing',
    keywords: ['list', 'slice', 'slicing', 'step', 'reverse'],
    question: 'How does list slicing work?',
    answer:
      'Same as strings: `a[start:stop:step]`. Returns a NEW list. `a[::-1]` gives a reversed copy. `a[1:4] = [9]` can replace a range in place.',
    code: 'a = [10, 20, 30, 40, 50]\na[1:4]        # [20, 30, 40]\na[::2]        # [10, 30, 50]\na[::-1]       # [50, 40, 30, 20, 10]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'nested-list',
    keywords: ['nested', 'matrix', '2d', 'list of lists', 'grid'],
    question: 'How do I work with nested lists (2D)?',
    answer:
      'A list of lists. Access with `matrix[row][col]`. CRITICAL: never initialize with `[[0] * n] * m` — all rows share the same list. Use `[[0] * n for _ in range(m)]`.',
    code: '# BAD\nbad = [[0] * 3] * 3\nbad[0][0] = 9   # every row is [9, 0, 0]\n\n# GOOD\ngood = [[0] * 3 for _ in range(3)]\ngood[0][0] = 9  # only first row changes',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — TUPLES
     ═══════════════════════════════════════════ */
  {
    id: 'tuple-single',
    keywords: ['tuple', 'single', 'one', 'comma', 'element'],
    question: 'How do I create a single-element tuple?',
    answer:
      'Add a trailing comma: `(42,)`. Without the comma, `(42)` is just the int 42 in parentheses. The COMMA makes the tuple, not the parentheses.',
    code: 'a = (42,)      # tuple\ntype(a)        # <class \'tuple\'>\nb = (42)       # just int\ntype(b)        # <class \'int\'>',
    lessonLink: { moduleId: 'python-basics', lessonId: 'tuples' },
  },
  {
    id: 'unpacking',
    keywords: ['unpack', 'unpacking', 'multiple', 'assign', 'swap'],
    question: 'How do multiple assignment and unpacking work?',
    answer:
      'Python can unpack a sequence into multiple names: `a, b = 1, 2`. Star unpacking grabs the middle: `first, *rest = [...]`. Swapping is a one-liner: `a, b = b, a`.',
    code: 'a, b = 1, 2\na, b = b, a          # swap\nx, *rest = [1, 2, 3]  # x=1, rest=[2, 3]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'variables' },
  },
  {
    id: 'swap-variables',
    keywords: ['swap', 'exchange', 'two', 'variables'],
    question: 'How do I swap two variables?',
    answer:
      'One-liner: `a, b = b, a`. No temp variable needed. Python evaluates the right side first, then unpacks into the left side.',
    code: 'a, b = 1, 2\na, b = b, a\nprint(a, b)    # 2 1',
    lessonLink: { moduleId: 'python-basics', lessonId: 'variables' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — OPERATORS
     ═══════════════════════════════════════════ */
  {
    id: 'floor-mod',
    keywords: ['floor', 'modulo', 'mod', 'remainder', '//', '%'],
    question: 'What do // and % do?',
    answer:
      '`//` is floor division — divides and rounds DOWN to the nearest integer. `%` is modulo — returns the remainder. Together: `a == (a // b) * b + (a % b)`. With negatives, `%` takes the sign of the divisor.',
    code: '7 // 2     # 3\n7 % 2      # 1\n-7 // 2    # -4 (rounds down)\n-7 % 2     # 1',
    lessonLink: { moduleId: 'python-basics', lessonId: 'operators' },
  },
  {
    id: 'and-or-values',
    keywords: ['and', 'or', 'logical', 'short-circuit', 'truthy'],
    question: 'What do `and` and `or` actually return?',
    answer:
      'They return one of the OPERANDS, not necessarily a boolean. `5 and 3` returns 3. `0 or "default"` returns "default". This is the common idiom for defaults.',
    code: '5 and 3              # 3\n0 or "default"       # "default"\n"" or "fallback"     # "fallback"',
    lessonLink: { moduleId: 'python-basics', lessonId: 'operators' },
  },
  {
    id: 'chained-comparison',
    keywords: ['chain', 'comparison', 'and', 'range', '0 < x < 10'],
    question: 'Can I chain comparisons in Python?',
    answer:
      'Yes! `0 < x < 10` works and reads like math. Equivalent to `0 < x and x < 10`, but x is only evaluated once. Works with any comparison operators.',
    code: 'x = 5\n0 < x < 10       # True\n0 < x < 3        # False\n1 < x == 5       # True',
    lessonLink: { moduleId: 'python-basics', lessonId: 'operators' },
  },
  {
    id: 'bitwise',
    keywords: ['bitwise', 'and', 'or', 'xor', 'shift', '&', '|', '^'],
    question: 'What are bitwise operators?',
    answer:
      'Operate on integers bit-by-bit: `&` AND, `|` OR, `^` XOR, `~` NOT, `<<` shift left, `>>` shift right. Useful for flags, fast even/odd check (`n & 1`), and low-level tricks.',
    code: '6 & 3     # 2    (0b110 & 0b011)\n6 | 3     # 7\n6 ^ 3     # 5\n6 << 1    # 12\n6 >> 1    # 3',
    lessonLink: { moduleId: 'python-basics', lessonId: 'operators' },
  },
  {
    id: 'walrus',
    keywords: ['walrus', ':=', 'assign', 'expression'],
    question: 'What is the walrus operator?',
    answer:
      '`:=` assigns a value INSIDE an expression. Useful in while loops and comprehensions where you would otherwise compute the same value twice. Added in Python 3.8.',
    code: 'data = [1, 2, 3, 4, 5]\ni = 0\nwhile (n := data[i]) < 4:\n    print(n)\n    i += 1',
    lessonLink: { moduleId: 'python-basics', lessonId: 'operators' },
  },
  {
    id: 'even-odd',
    keywords: ['even', 'odd', 'modulo', 'bitwise'],
    question: 'How do I check if a number is even?',
    answer:
      '`n % 2 == 0` for even. `n & 1 == 0` is the same test but faster (bitwise). Both work with negatives.',
    code: 'n = 7\nn % 2 == 0        # False\n(n & 1) == 0      # False\n\nm = 10\nm % 2 == 0        # True',
    lessonLink: { moduleId: 'python-basics', lessonId: 'operators' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — CONDITIONALS
     ═══════════════════════════════════════════ */
  {
    id: 'truthiness',
    keywords: ['truthy', 'falsy', 'boolean', 'if', 'condition', 'empty'],
    question: 'What values are falsy in Python?',
    answer:
      'Falsy values: False, 0, 0.0, "", [], {}, (), set(), None. Everything else is truthy. This is why `if my_list:` is idiomatic — it checks non-empty AND non-None.',
    code: 'if []:\n    pass          # does not run\nif "False":\n    print("truthy")  # runs — non-empty string',
    lessonLink: { moduleId: 'python-basics', lessonId: 'conditionals' },
  },
  {
    id: 'ternary',
    keywords: ['ternary', 'one-line', 'if else', 'conditional expression'],
    question: 'What is the ternary expression?',
    answer:
      'A compact if-else that returns a value: `value_if_true if condition else value_if_false`. Use only for simple choices. Do not nest more than once.',
    code: 'age = 20\nstatus = "adult" if age >= 18 else "minor"',
    lessonLink: { moduleId: 'python-basics', lessonId: 'conditionals' },
  },
  {
    id: 'check-empty',
    keywords: ['empty', 'check', 'list', 'string', 'dict', 'if', 'len'],
    question: 'How do I check if a list/string/dict is empty?',
    answer:
      'Use truthiness: `if not my_list:` — idiomatic. Do NOT use `if len(my_list) == 0:` — works but unpythonic. Empty containers are falsy.',
    code: 'if not my_list:\n    print("empty")\n\nif my_list:\n    print("has items")',
    lessonLink: { moduleId: 'python-basics', lessonId: 'conditionals' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — LOOPS
     ═══════════════════════════════════════════ */
  {
    id: 'for-vs-while',
    keywords: ['for', 'while', 'loop', 'difference', 'vs'],
    question: 'What is the difference between for and while?',
    answer:
      'Use `for` when you know what you are iterating over. Use `while` when the loop continues until a condition changes. Both support `break` and `continue`.',
    code: 'for i in range(3):    # fixed count\n    print(i)\n\nn = 3\nwhile n > 0:          # until condition\n    print(n)\n    n -= 1',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },
  {
    id: 'break-continue',
    keywords: ['break', 'continue', 'loop', 'exit', 'skip'],
    question: 'What is the difference between break and continue?',
    answer:
      '`break` exits the loop entirely. `continue` skips to the next iteration. Both can be used with `for` and `while`.',
    code: 'for i in range(5):\n    if i == 3:\n        break       # exits loop\n    print(i)        # 0, 1, 2\n\nfor i in range(5):\n    if i % 2 == 0:\n        continue    # skip even\n    print(i)        # 1, 3',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },
  {
    id: 'enumerate',
    keywords: ['enumerate', 'index', 'loop', 'position'],
    question: 'How do I loop with index?',
    answer:
      'Use `enumerate()`. It gives you (index, value) pairs. Never write `for i in range(len(lst))` — that is unpythonic.',
    code: 'names = ["Ada", "Alan"]\nfor i, name in enumerate(names):\n    print(i, name)\n# 0 Ada\n# 1 Alan',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },
  {
    id: 'enumerate-start',
    keywords: ['enumerate', 'start', 'index', 'one'],
    question: 'How do I start enumerate from 1 instead of 0?',
    answer:
      'Pass `start=1`: `enumerate(items, start=1)`. Useful for numbered output like "1. Ada, 2. Alan".',
    code: 'for i, name in enumerate(["Ada", "Alan"], start=1):\n    print(f"{i}. {name}")',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },
  {
    id: 'zip',
    keywords: ['zip', 'parallel', 'loop', 'combine', 'pair'],
    question: 'How do I iterate multiple lists in parallel?',
    answer:
      'Use `zip()`. It pairs items index by index and stops at the shortest list. Common pattern: build a dict from two parallel lists.',
    code: 'names = ["A", "B"]\nscores = [90, 85]\nfor n, s in zip(names, scores):\n    print(n, s)\n\nd = dict(zip(names, scores))    # {"A": 90, "B": 85}',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },
  {
    id: 'iterate-two-lists',
    keywords: ['iterate', 'two', 'lists', 'parallel', 'zip'],
    question: 'How do I loop over two lists at once?',
    answer:
      'Use `zip(a, b)`. It pairs items index by index, stopping at the shortest. To loop with an index too, combine with `enumerate`.',
    code: 'a = [1, 2, 3]\nb = ["x", "y", "z"]\nfor n, s in zip(a, b):\n    print(n, s)',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },
  {
    id: 'for-else',
    keywords: ['for else', 'else', 'loop', 'search'],
    question: 'What is the for-else clause?',
    answer:
      'A `for` or `while` loop can have an `else` block. It runs ONLY if the loop finished without hitting `break`. Great for search loops — runs "not found" only when nothing matched.',
    code: 'for n in [2, 4, 6]:\n    if n % 2 == 1:\n        print("found odd")\n        break\nelse:\n    print("all even")    # runs',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },
  {
    id: 'sum-range',
    keywords: ['sum', 'range', 'natural', 'numbers', 'n'],
    question: 'How do I sum numbers from 1 to n?',
    answer:
      'Use `sum(range(1, n + 1))` — clean and fast. Or the closed form `n * (n + 1) // 2` — O(1), faster for huge n.',
    code: 'n = 100\nsum(range(1, n + 1))      # 5050\nn * (n + 1) // 2          # 5050 (formula)',
    lessonLink: { moduleId: 'python-basics', lessonId: 'loops' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — FUNCTIONS
     ═══════════════════════════════════════════ */
  {
    id: 'function-basics',
    keywords: ['function', 'def', 'return', 'parameter', 'argument'],
    question: 'How do I define a function?',
    answer:
      'Use `def name(params):`. Use `return` to send a value back. A function without return sends back None. Distinguish `print` (display) from `return` (send back).',
    code: 'def add(a, b):\n    return a + b\n\nresult = add(2, 3)    # 5',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },
  {
    id: 'args-kwargs',
    keywords: ['args', 'kwargs', '*args', '**kwargs', 'variable arguments'],
    question: 'What are *args and **kwargs?',
    answer:
      '`*args` collects extra positional arguments into a tuple. `**kwargs` collects extra keyword arguments into a dict. Use them when a function takes a variable number of arguments.',
    code: 'def f(*args, **kwargs):\n    print(args)      # tuple\n    print(kwargs)    # dict\n\nf(1, 2, 3, name="Ada")',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },
  {
    id: 'mutable-default',
    keywords: ['default', 'argument', 'mutable', 'list', 'shared', 'bug'],
    question: 'Why is a mutable default argument dangerous?',
    answer:
      'The default is created ONCE and shared across all calls. `def f(items=[])` — every call without an explicit items arg uses the SAME list. Use `None` as default and create inside.',
    code: '# Bad\ndef bad(x, items=[]):\n    items.append(x)\n    return items\n# bad(1) → [1]; bad(2) → [1, 2]\n\n# Good\ndef good(x, items=None):\n    if items is None:\n        items = []\n    items.append(x)\n    return items',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },
  {
    id: 'lambda',
    keywords: ['lambda', 'anonymous', 'one-line', 'function'],
    question: 'What is a lambda?',
    answer:
      'A one-expression anonymous function: `lambda args: expression`. Useful for short callbacks — most commonly as the `key=` argument to `sorted()`.',
    code: 'people = [{"name": "Ada", "age": 36}]\nby_age = sorted(people, key=lambda p: p["age"])',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },
  {
    id: 'scope-legb',
    keywords: ['scope', 'legb', 'local', 'global', 'enclosing', 'built-in'],
    question: 'What is the LEGB rule?',
    answer:
      'Python looks up names in order: Local, Enclosing, Global, Built-in. A function sees its own locals and the surrounding globals. To modify a global from inside a function, you would need `global x` — avoid it.',
    code: 'x = "global"\ndef f():\n    x = "local"     # new local\ndef g():\n    return x        # finds global',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },
  {
    id: 'keyword-only',
    keywords: ['keyword', 'only', 'arguments', 'required'],
    question: 'What are keyword-only arguments?',
    answer:
      'Args after `*` must be passed by name: `def f(a, *, b):` — b cannot be positional. This makes call sites self-documenting and is used in the standard library.',
    code: 'def greet(name, *, greeting="Hello"):\n    return f"{greeting}, {name}"\n\ngreet("Ada", greeting="Hi")   # OK\n# greet("Ada", "Hi")          # TypeError',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },
  {
    id: 'return-multiple',
    keywords: ['return', 'multiple', 'values', 'tuple'],
    question: 'How do I return multiple values from a function?',
    answer:
      'Return a tuple: `return a, b`. The caller can unpack: `x, y = f()`. Python wraps the values in a tuple automatically.',
    code: 'def min_max(nums):\n    return min(nums), max(nums)\n\nlo, hi = min_max([3, 1, 4])   # lo=1, hi=4',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },
  {
    id: 'docstring',
    keywords: ['docstring', 'documentation', 'help', 'doc'],
    question: 'What is a docstring?',
    answer:
      'A triple-quoted string right after `def` or `class` that documents it. Accessible via `func.__doc__` or `help(func)`. Tools auto-generate documentation from them.',
    code: 'def add(a, b):\n    """Return the sum of a and b."""\n    return a + b\n\nprint(add.__doc__)',
    lessonLink: { moduleId: 'python-basics', lessonId: 'functions' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — RECURSION
     ═══════════════════════════════════════════ */
  {
    id: 'recursion',
    keywords: ['recursion', 'recursive', 'factorial', 'base case'],
    question: 'What is recursion?',
    answer:
      'A function that calls itself on a smaller version of the problem. Two rules: (1) base case — when to stop, (2) progress toward it. Without a base case: RecursionError. Python has a ~1000 depth limit.',
    code: 'def factorial(n):\n    if n <= 1:              # base case\n        return 1\n    return n * factorial(n - 1)',
    lessonLink: { moduleId: 'python-basics', lessonId: 'recursion' },
  },
  {
    id: 'fibonacci',
    keywords: ['fibonacci', 'fib', 'sequence', 'recursion'],
    question: 'How do I generate fibonacci numbers?',
    answer:
      'For simple cases, iterative is fastest. For recursive, ALWAYS add `@cache` — naive fibonacci is exponential.',
    code: 'from functools import cache\n\n@cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\n\nfib(50)    # instant',
    lessonLink: { moduleId: 'python-basics', lessonId: 'recursion' },
  },
  {
    id: 'factorial',
    keywords: ['factorial', 'recursion', 'math'],
    question: 'How do I compute a factorial?',
    answer:
      'Either `math.factorial(n)` (fast, built-in), or a recursive version, or a loop. For large n, use the math module — it uses an efficient algorithm.',
    code: 'import math\nmath.factorial(10)    # 3628800\n\n# Or manual\ndef fact(n):\n    r = 1\n    for i in range(2, n + 1):\n        r *= i\n    return r',
    lessonLink: { moduleId: 'python-basics', lessonId: 'recursion' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — DICTS & SETS
     ═══════════════════════════════════════════ */
  {
    id: 'dict-basics',
    keywords: ['dict', 'dictionary', 'key', 'value', 'hash'],
    question: 'What is a dict?',
    answer:
      'A key-value map. Lookups are O(1). Keys must be immutable (hashable). Access with `d[key]` — raises KeyError if missing. Use `.get(key, default)` for optional lookups.',
    code: 'd = {"name": "Ada", "age": 36}\nd["name"]              # "Ada"\nd.get("missing", 0)    # 0\nd["email"] = "a@b.c"   # add',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'set-basics',
    keywords: ['set', 'unique', 'duplicates', 'hash', 'empty'],
    question: 'What is a set?',
    answer:
      'An unordered collection of unique values. Membership is O(1). Create with `{}` or `set()`. `{}` is an empty DICT — use `set()` for an empty set.',
    code: 's = {1, 2, 2, 3}    # {1, 2, 3}\nempty = set()       # empty set\ns.add(4)\n2 in s              # True',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'set-operations',
    keywords: ['set', 'union', 'intersection', 'difference', 'operation'],
    question: 'What set operations are available?',
    answer:
      'Union `|`, intersection `&`, difference `-`, symmetric difference `^`. All return new sets. Extremely useful for finding shared elements between collections.',
    code: 'a = {1, 2, 3}\nb = {3, 4, 5}\na | b    # {1, 2, 3, 4, 5}\na & b    # {3}\na - b    # {1, 2}',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'frequency-count',
    keywords: ['count', 'frequency', 'occurrences', 'word count'],
    question: 'How do I count word frequencies?',
    answer:
      'Use the frequency-count pattern: `counts[key] = counts.get(key, 0) + 1`. Or use `collections.Counter` — one line.',
    code: 'words = "a b a c a".split()\nfrom collections import Counter\nCounter(words)      # Counter({"a": 3, "b": 1, "c": 1})',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'get-with-default',
    keywords: ['get', 'default', 'dict', 'safe', 'missing'],
    question: 'How do I safely read a dict value without KeyError?',
    answer:
      'Use `.get(key, default)`. Returns the default if the key is missing — no exception. Very common for optional config values.',
    code: 'd = {"a": 1}\nd.get("a")             # 1\nd.get("missing")       # None\nd.get("missing", 0)    # 0',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'iterate-dict',
    keywords: ['iterate', 'dict', 'loop', 'items', 'keys', 'values'],
    question: 'How do I iterate over a dict?',
    answer:
      'Four ways: loop over keys (default), `.values()`, `.items()` (best), or `sorted(d.items())` for ordered output. `.items()` gives (key, value) tuples.',
    code: 'd = {"a": 1, "b": 2}\n\nfor k in d:                     # keys\n    print(k)\nfor k, v in d.items():          # key-value\n    print(k, v)',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'dict-merge',
    keywords: ['merge', 'combine', 'dict', 'update', 'union'],
    question: 'How do I merge two dicts?',
    answer:
      'Three ways: `a.update(b)` mutates a in place. `{**a, **b}` returns a new dict. `a | b` (3.9+) returns a new dict. Later keys win on collision.',
    code: 'a = {"x": 1}\nb = {"y": 2, "x": 99}\n\n{**a, **b}    # {"x": 99, "y": 2}\na | b         # {"x": 99, "y": 2}',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'unique-list',
    keywords: ['unique', 'duplicate', 'remove', 'set', 'distinct'],
    question: 'How do I remove duplicates from a list?',
    answer:
      '`list(set(items))` — fast, but loses order. If order matters, use `dict.fromkeys(items)` which preserves insertion order.',
    code: 'a = [1, 2, 2, 3, 3, 3]\nlist(set(a))              # any order\nlist(dict.fromkeys(a))    # preserves order',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },
  {
    id: 'when-to-use-what',
    keywords: ['when', 'use', 'list', 'dict', 'set', 'tuple'],
    question: 'When should I use list vs dict vs set vs tuple?',
    answer:
      'LIST: ordered, mutable, indexable — general purpose. DICT: key→value lookup — configs, counts, caches. SET: unique values, fast membership — dedupe, common elements. TUPLE: immutable fixed records — return values, dict keys.',
    code: 'scores = [90, 85, 78]            # list — order matters\nuser = {"name": "Ada", "age": 36} # dict — lookup by key\nseen = {"a", "b", "c"}            # set — uniqueness\npoint = (3, 4)                    # tuple — fixed record',
    lessonLink: { moduleId: 'python-basics', lessonId: 'dicts-sets' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — COMPREHENSIONS
     ═══════════════════════════════════════════ */
  {
    id: 'dict-comprehension',
    keywords: ['dict', 'comprehension', 'one-line', 'map'],
    question: 'How do I build a dict in one line?',
    answer:
      'Use a dict comprehension: `{key_expr: value_expr for item in iterable if condition}`. Any expression can be a key or value.',
    code: 'squares = {n: n ** 2 for n in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}',
    lessonLink: { moduleId: 'python-basics', lessonId: 'comprehensions' },
  },
  {
    id: 'generator-expression',
    keywords: ['generator', 'expression', 'lazy', 'memory'],
    question: 'What is a generator expression?',
    answer:
      'Like a list comprehension but lazy: `(expr for item in iterable)`. Produces values on demand — constant memory. Single-use: iterate once, then it is empty. Perfect for `sum()`, `any()`, `all()`.',
    code: 'sum(n ** 2 for n in range(1_000_000))   # O(1) memory',
    lessonLink: { moduleId: 'python-basics', lessonId: 'comprehensions' },
  },
  {
    id: 'flatten-list',
    keywords: ['flatten', 'nested', 'list', '2d', 'one'],
    question: 'How do I flatten a list of lists?',
    answer:
      'Use a nested comprehension: `[item for row in matrix for item in row]`. Or `itertools.chain.from_iterable(matrix)`. Both O(n).',
    code: 'matrix = [[1, 2], [3, 4]]\nflat = [x for row in matrix for x in row]\n# [1, 2, 3, 4]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'comprehensions' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — ERRORS
     ═══════════════════════════════════════════ */
  {
    id: 'try-except',
    keywords: ['try', 'except', 'error', 'exception', 'handle', 'catch'],
    question: 'How do I handle exceptions?',
    answer:
      'Wrap risky code in `try`, catch specific exceptions with `except`. Never use a bare `except:` — it catches everything including bugs. Name the exception you expect.',
    code: 'try:\n    n = int("abc")\nexcept ValueError:\n    print("bad input")',
    lessonLink: { moduleId: 'python-basics', lessonId: 'errors' },
  },
  {
    id: 'raise',
    keywords: ['raise', 'custom', 'exception', 'throw', 'error'],
    question: 'How do I raise an exception?',
    answer:
      'Use `raise ExceptionType("message")`. Validate inputs at the top of a function and raise early. Define custom exceptions by subclassing Exception.',
    code: 'def set_age(age):\n    if age < 0:\n        raise ValueError("age cannot be negative")\n    return age',
    lessonLink: { moduleId: 'python-basics', lessonId: 'errors' },
  },
  {
    id: 'read-error-traceback',
    keywords: ['traceback', 'error', 'read', 'debug', 'exception'],
    question: 'How do I read a Python error traceback?',
    answer:
      'Read BOTTOM-UP. The last line has the error type and message. Above it, the stack traces show which line in which file. Start from the last frame — it usually shows where the actual failure happened.',
  },
  {
    id: 'debug-tips',
    keywords: ['debug', 'bug', 'fix', 'tips', 'find', 'issue'],
    question: 'How do I debug Python code?',
    answer:
      'Three moves: (1) `print()` values along the way. (2) Use `breakpoint()` to pause and inspect. (3) Read the error message carefully — it tells you the exact line and type. 90% of bugs are typos, wrong types, or off-by-one indices.',
    code: 'def f(a, b):\n    print(f"a={a}, b={b}")    # trace values\n    breakpoint()                # pause here\n    return a + b',
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — FILE I/O
     ═══════════════════════════════════════════ */
  {
    id: 'file-open',
    keywords: ['file', 'open', 'read', 'write', 'with'],
    question: 'How do I read or write a file?',
    answer:
      'Use `with open(path, mode)`. Modes: "r" read, "w" write (truncates), "a" append, "x" create. The `with` block closes the file automatically — even on exceptions.',
    code: 'with open("data.txt", "w") as f:\n    f.write("hello")\n\nwith open("data.txt") as f:\n    print(f.read())',
    lessonLink: { moduleId: 'python-basics', lessonId: 'file-io' },
  },
  {
    id: 'json',
    keywords: ['json', 'load', 'dump', 'parse', 'serialize'],
    question: 'How do I work with JSON?',
    answer:
      'Use the `json` module. `json.dump(obj, file)` writes to a file; `json.load(file)` reads. `dumps` / `loads` (with s) work with strings.',
    code: 'import json\ndata = {"name": "Ada", "age": 36}\n\nwith open("d.json", "w") as f:\n    json.dump(data, f)\n\nwith open("d.json") as f:\n    loaded = json.load(f)',
    lessonLink: { moduleId: 'python-basics', lessonId: 'file-io' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — MODULES
     ═══════════════════════════════════════════ */
  {
    id: 'import-styles',
    keywords: ['import', 'module', 'from', 'as', 'package'],
    question: 'How do imports work?',
    answer:
      'Four styles: `import module`, `from module import name`, `from module import name as alias`, `from module import *`. Avoid star imports — they pollute the namespace.',
    code: 'import math\nfrom math import sqrt\nfrom math import sqrt as sq\nprint(sq(16))',
    lessonLink: { moduleId: 'python-basics', lessonId: 'modules-imports' },
  },
  {
    id: 'main-guard',
    keywords: ['main', '__main__', 'name', 'guard', 'script'],
    question: 'What is the if __name__ == "__main__" trick?',
    answer:
      'When a file is run directly, `__name__` is `"__main__"`. When imported, it is the module name. Wrapping runnable code under this check makes the file both runnable and importable.',
    code: 'def run():\n    print("running")\n\nif __name__ == "__main__":\n    run()',
    lessonLink: { moduleId: 'python-basics', lessonId: 'modules-imports' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — TYPE HINTS
     ═══════════════════════════════════════════ */
  {
    id: 'type-hints',
    keywords: ['type', 'hints', 'annotation', 'typing', 'mypy'],
    question: 'What are type hints?',
    answer:
      'Annotations that document types: `def add(a: int, b: int) -> int:`. NOT enforced at runtime — they are for tools like mypy, IDEs, and readers. Modern Python code uses them everywhere.',
    code: 'def add(a: int, b: int) -> int:\n    return a + b\n\nadd("x", "y")    # runs fine — hints are not checked',
    lessonLink: { moduleId: 'python-basics', lessonId: 'type-hints' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — STANDARD LIBRARY
     ═══════════════════════════════════════════ */
  {
    id: 'stdlib-common',
    keywords: ['standard library', 'stdlib', 'module', 'math', 'random', 'datetime'],
    question: 'What are the most useful standard library modules?',
    answer:
      'math (sqrt, gcd, pi), random (randint, choice, shuffle), datetime (dates, times), collections (Counter, defaultdict, deque, namedtuple), itertools (chain, product, combinations), os/sys (system), pathlib (file paths), json, csv, re (regex).',
    code: 'from collections import Counter\nCounter("aabbbcccc").most_common(1)   # [("c", 4)]',
    lessonLink: { moduleId: 'python-basics', lessonId: 'stdlib-tour' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — DSA QUICK ANSWERS
     ═══════════════════════════════════════════ */
  {
    id: 'prime-check',
    keywords: ['prime', 'check', 'algorithm', 'trial division'],
    question: 'How do I check if a number is prime?',
    answer:
      'Trial division up to √n. If n has any divisor other than 1 and itself, it is not prime. O(√n).',
    code: 'def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True',
  },
  {
    id: 'reverse-list',
    keywords: ['reverse', 'list', 'backwards', 'order'],
    question: 'How do I reverse a list?',
    answer:
      'Two ways: `a[::-1]` returns a NEW reversed list. `a.reverse()` reverses IN PLACE and returns None. Pick based on whether you want to keep the original.',
    code: 'a = [1, 2, 3]\nb = a[::-1]     # b=[3,2,1], a unchanged\na.reverse()     # a=[3,2,1], in place',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },
  {
    id: 'min-max-index',
    keywords: ['min', 'max', 'index', 'position', 'argmax'],
    question: 'How do I find the index of the max value?',
    answer:
      'Use `a.index(max(a))` — two passes but clean. Or a single-pass loop keeping track of index. For numpy arrays, use `np.argmax()`.',
    code: 'a = [3, 1, 4, 1, 5, 9, 2]\nidx = a.index(max(a))    # 5 (value 9)',
    lessonLink: { moduleId: 'python-basics', lessonId: 'lists' },
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — PRODUCTION & TOOLING
     ═══════════════════════════════════════════ */
  {
    id: 'virtual-env',
    keywords: ['venv', 'virtual', 'environment', 'pip', 'isolated', 'package'],
    question: 'What is a virtual environment?',
    answer:
      'An isolated Python environment for a single project. Its own pip, its own packages. Prevents dependency clashes between projects. Create with `python -m venv .venv`, activate, then pip install.',
    code: '# Terminal:\n# python -m venv .venv\n# source .venv/bin/activate    (Linux/Mac)\n# .venv\\Scripts\\activate       (Windows)\n# pip install requests',
  },
  {
    id: 'pip-requirements',
    keywords: ['pip', 'requirements', 'install', 'dependency', 'freeze'],
    question: 'How do I manage project dependencies?',
    answer:
      'Install with `pip install pkg`. Freeze your exact set with `pip freeze > requirements.txt`. Restore with `pip install -r requirements.txt`. Modern alternative: `pyproject.toml` + tools like Poetry or uv.',
    code: '# pip install requests numpy\n# pip freeze > requirements.txt\n# pip install -r requirements.txt',
  },
  {
    id: 'pep8',
    keywords: ['pep8', 'style', 'naming', 'convention', 'format'],
    question: 'What are Python style conventions?',
    answer:
      'PEP 8: snake_case for functions/variables, PascalCase for classes, UPPER_CASE for constants. 4-space indent. Max ~79-100 chars per line. Two blank lines between top-level defs. Tools: black, ruff.',
    code: '# Good\nMAX_RETRIES = 3\n\ndef calculate_total(price, qty):\n    return price * qty\n\nclass BankAccount:\n    pass',
  },
  {
    id: 'naming-tips',
    keywords: ['naming', 'variable', 'function', 'class', 'convention'],
    question: 'How should I name variables and functions?',
    answer:
      'Be specific. `user_score` beats `x`. `calculate_total` beats `calc`. `is_logged_in` for booleans. Classes: PascalCase. Constants: UPPER_CASE. Do not abbreviate to the point of confusion. Longer names cost nothing at runtime.',
    code: '# Bad\nx = 1000\ndef f(a, b): ...\n\n# Good\nretry_limit = 1000\ndef calculate_total(price, qty): ...',
  },
  {
    id: 'code-review-checklist',
    keywords: ['review', 'clean', 'checklist', 'quality', 'code'],
    question: 'What should I check before submitting code?',
    answer:
      'Read it aloud. Names descriptive? No magic numbers? Handles empty input? No bare excepts? Uses the right collection for the job? Docstrings on public functions? Would a stranger understand it in 30 seconds?',
  },
  {
    id: 'practice-plan',
    keywords: ['practice', 'plan', 'how to', 'learn', 'roadmap'],
    question: 'What is a good practice plan for Python?',
    answer:
      'Daily for 30 min beats weekly for 3 hours. Order: syntax → small scripts → DSA basics (lists, dicts, strings) → build 3 small projects → learn a library (NumPy, Pandas, Flask). Solve challenges here, then rebuild them without looking.',
  },
  {
    id: 'how-to-improve',
    keywords: ['improve', 'better', 'sharpen', 'skill', 'python'],
    question: 'How do I improve my Python skills?',
    answer:
      'Read good code (stdlib source, popular open-source repos). Write small things often. Learn one new library per month. Rewrite old code once a quarter. Contribute to open source once you can read unfamiliar code confidently.',
  },
  {
    id: 'when-not-python',
    keywords: ['not python', 'other', 'language', 'choose'],
    question: 'When should I NOT use Python?',
    answer:
      'When raw speed is critical (systems programming → C/Rust/Go). When building mobile apps (Swift/Kotlin). When building browser UI only (JS/TS). For everything else — Python is a great default.',
  },

  /* ═══════════════════════════════════════════
     PYTHON BASICS — META / GENERAL
     ═══════════════════════════════════════════ */
  {
    id: 'what-is-python',
    keywords: ['python', 'what', 'about', 'overview'],
    question: 'What is Python?',
    answer:
      'A high-level, dynamically typed, interpreted language. Known for readability, huge standard library, and dominance in data science, ML, scripting, and web backends. Batteries included — and everything is an object.',
  },
  {
    id: 'how-to-run',
    keywords: ['run', 'execute', 'code', 'playground', 'try'],
    question: 'How do I run Python here?',
    answer:
      'Every code block in a lesson has a ▶ Run button — click to execute in your browser. Each lesson also has a full Playground at the bottom where you can write and run your own code. No install needed.',
  },
  {
    id: 'study-tips',
    keywords: ['tips', 'learn', 'study', 'how to', 'advice', 'approach'],
    question: 'Any advice for learning Python?',
    answer:
      'Three rules: (1) Type every example yourself — reading is not learning. (2) Break things on purpose — see what errors look like. (3) Solve the challenges before moving on. The unlock chain will guide you.',
  },

  /* ═══════════════════════════════════════════
     OOP — CORE
     ═══════════════════════════════════════════ */
  {
    id: 'class-basics',
    keywords: ['class', 'object', 'oop', 'init', 'self', 'constructor'],
    question: 'How do I define a class?',
    answer:
      'Use `class Name:`. The `__init__` method is the constructor — it runs when you create an instance. The first parameter of every instance method is `self` (the object itself).',
    code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(f"{self.name} says woof")\n\nDog("Rex").bark()',
    lessonLink: { moduleId: 'python-oop', lessonId: 'classes-objects' },
  },
  {
    id: 'class-vs-instance-attr',
    keywords: ['class', 'attribute', 'instance', 'shared', 'static'],
    question: 'What is the difference between class and instance attributes?',
    answer:
      'Class attributes are shared by all instances. Instance attributes belong to a single object. Assigning `obj.attr = x` creates an instance attribute that shadows the class one.',
    code: 'class Car:\n    wheels = 4              # class attribute\n    def __init__(self, color):\n        self.color = color  # instance attribute',
    lessonLink: { moduleId: 'python-oop', lessonId: 'classes-objects' },
  },
  {
    id: 'self',
    keywords: ['self', 'this', 'method'],
    question: 'What is self?',
    answer:
      'A regular parameter that Python automatically fills with the instance. NOT a keyword — you could name it anything, but convention is `self`. It is how a method knows which object it was called on.',
    code: 'class A:\n    def m(self):\n        return self',
  },
  {
    id: 'classmethod-staticmethod',
    keywords: ['classmethod', 'staticmethod', 'cls', 'method', 'types'],
    question: 'What is the difference between classmethod and staticmethod?',
    answer:
      '`@classmethod` takes `cls` (the class) — used for alternate constructors. `@staticmethod` takes neither self nor cls — just a namespaced utility function. Instance methods take `self`.',
    code: 'class D:\n    @classmethod\n    def cm(cls): return cls.__name__\n\n    @staticmethod\n    def sm(): return "helper"',
    lessonLink: { moduleId: 'python-oop', lessonId: 'methods' },
  },
  {
    id: 'inheritance',
    keywords: ['inheritance', 'extends', 'parent', 'child', 'super'],
    question: 'What is inheritance?',
    answer:
      'A child class inherits attributes and methods from a parent. Use `class Child(Parent):`. Call `super().__init__(...)` to run the parent constructor.',
    code: 'class Animal:\n    def breathe(self): print("breathe")\n\nclass Dog(Animal):\n    def bark(self): print("woof")\n\nDog().breathe()   # inherited',
    lessonLink: { moduleId: 'python-oop', lessonId: 'inheritance' },
  },
  {
    id: 'super',
    keywords: ['super', 'parent', 'inherit', 'constructor'],
    question: 'What does super() do?',
    answer:
      'Calls a method from the parent class. Most commonly used in __init__ to run the parent constructor. Handles MRO correctly for multiple inheritance.',
    code: 'class Child(Parent):\n    def __init__(self, a, b):\n        super().__init__(a)   # run parent\n        self.b = b',
    lessonLink: { moduleId: 'python-oop', lessonId: 'inheritance' },
  },
  {
    id: 'dunder',
    keywords: ['dunder', 'magic', 'str', 'repr', 'add', 'len'],
    question: 'What are dunder methods?',
    answer:
      'Double-underscore methods like `__str__`, `__add__`, `__len__`, `__eq__`. They hook your objects into Python syntax: print, +, ==, len, [], for-loop.',
    code: 'class Vec:\n    def __init__(self, x): self.x = x\n    def __add__(self, o): return Vec(self.x + o.x)\n    def __repr__(self): return f"Vec({self.x})"',
    lessonLink: { moduleId: 'python-oop', lessonId: 'dunder' },
  },
  {
    id: 'str-vs-repr',
    keywords: ['str', 'repr', 'dunder', 'print', 'display'],
    question: 'What is the difference between __str__ and __repr__?',
    answer:
      '`__str__` is for end users — what `print()` shows. `__repr__` is for developers — how the object looks in the REPL, ideally code that recreates it. If you define only one, define `__repr__`.',
    code: 'class P:\n    def __init__(self, x): self.x = x\n    def __str__(self): return f"point at {self.x}"\n    def __repr__(self): return f"P({self.x})"\n\np = P(3)\nprint(p)       # point at 3\n[p]            # [P(3)]',
    lessonLink: { moduleId: 'python-oop', lessonId: 'dunder' },
  },
  {
    id: 'property-decorator',
    keywords: ['property', 'getter', 'setter', 'encapsulation'],
    question: 'What is @property used for?',
    answer:
      'Turns a method into something that looks like an attribute. Add `@x.setter` to control assignment. Use it when you want validation or computed values with attribute syntax.',
    code: 'class Temp:\n    @property\n    def celsius(self):\n        return self._c\n\n    @celsius.setter\n    def celsius(self, v):\n        if v < -273.15:\n            raise ValueError\n        self._c = v',
    lessonLink: { moduleId: 'python-oop', lessonId: 'encapsulation' },
  },
  {
    id: 'abc-abstract',
    keywords: ['abstract', 'abc', 'abstractmethod', 'interface', 'contract'],
    question: 'What is an abstract class?',
    answer:
      'A class that defines methods subclasses MUST implement. Use `ABC` from abc and decorate methods with `@abstractmethod`. Cannot be instantiated directly.',
    code: 'from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): ...\n\n# Shape()     # TypeError\n# Subclasses must define area()',
    lessonLink: { moduleId: 'python-oop', lessonId: 'abstraction' },
  },
  {
    id: 'isinstance-vs-type',
    keywords: ['isinstance', 'type', 'check', 'compare'],
    question: 'Should I use isinstance() or type()?',
    answer:
      'Prefer `isinstance(obj, Cls)` — it handles inheritance and is faster. `type(obj) == Cls` fails for subclasses and is rarely what you want.',
    code: 'class Animal: pass\nclass Dog(Animal): pass\n\nd = Dog()\nisinstance(d, Animal)    # True\ntype(d) == Animal        # False',
    lessonLink: { moduleId: 'python-basics', lessonId: 'data-types' },
  },
  {
    id: 'decorators',
    keywords: ['decorator', 'wraps', 'closure', 'wrap'],
    question: 'What is a decorator?',
    answer:
      'A function that takes another function, wraps it with extra behavior, and returns the new function. Apply with `@decorator` above the target. Use `@wraps(fn)` to preserve the original name and docstring.',
    code: 'from functools import wraps\n\ndef log(fn):\n    @wraps(fn)\n    def wrapper(*a, **k):\n        print(f"calling {fn.__name__}")\n        return fn(*a, **k)\n    return wrapper\n\n@log\ndef add(a, b): return a + b',
    lessonLink: { moduleId: 'python-oop', lessonId: 'decorators' },
  },
  {
    id: 'generators',
    keywords: ['generator', 'yield', 'lazy', 'memory'],
    question: 'What is a generator?',
    answer:
      'A function that uses `yield` instead of `return`. Each yield pauses the function; the next call resumes right after. Generators are lazy and single-use. Perfect for large or infinite sequences.',
    code: 'def count_up(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\nfor x in count_up(3):\n    print(x)',
    lessonLink: { moduleId: 'python-oop', lessonId: 'iterators-generators' },
  },
  {
    id: 'context-manager',
    keywords: ['context', 'manager', 'with', 'enter', 'exit'],
    question: 'What is a context manager?',
    answer:
      'An object usable with `with` that guarantees cleanup. Implement `__enter__` (setup) and `__exit__` (teardown). Or use `@contextmanager` from contextlib with a generator.',
    code: 'from contextlib import contextmanager\n\n@contextmanager\ndef tagged(name):\n    print(f"<{name}>")\n    try:\n        yield\n    finally:\n        print(f"</{name}>")\n\nwith tagged("div"):\n    print("content")',
    lessonLink: { moduleId: 'python-oop', lessonId: 'context-managers' },
  },
  {
    id: 'dataclasses',
    keywords: ['dataclass', 'boilerplate', 'field', 'default_factory'],
    question: 'What is @dataclass?',
    answer:
      'A decorator that auto-generates `__init__`, `__repr__`, and `__eq__` from class annotations. Perfect for classes that just hold data. Use `field(default_factory=list)` for mutable defaults.',
    code: 'from dataclasses import dataclass, field\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n    tags: list = field(default_factory=list)\n\nprint(Point(1, 2))    # Point(x=1, y=2, tags=[])',
    lessonLink: { moduleId: 'python-oop', lessonId: 'dataclasses' },
  },
  {
    id: 'composition-vs-inheritance',
    keywords: ['composition', 'inheritance', 'has-a', 'is-a'],
    question: 'When should I use composition vs inheritance?',
    answer:
      'Inheritance for "is-a" (Dog is-an Animal). Composition for "has-a" (Car has-an Engine). Prefer composition when: behavior is shared across unrelated classes, you want to swap implementations, or the inheritance chain is deep.',
    code: 'class Engine:\n    def start(self): return "vroom"\n\nclass Car:\n    def __init__(self):\n        self.engine = Engine()    # has-a',
    lessonLink: { moduleId: 'python-oop', lessonId: 'composition' },
  },

  /* ═══════════════════════════════════════════
     NUMPY — CORE
     ═══════════════════════════════════════════ */
  {
    id: 'what-is-numpy',
    keywords: ['numpy', 'array', 'ndarray', 'import np', 'numpy library'],
    question: 'What is NumPy?',
    answer:
      'The numerical computing library for Python. Core type: `ndarray` — fast, typed, N-dimensional arrays. Underlies Pandas, scikit-learn, TensorFlow, PyTorch. If you do any data work, you will use it.',
    code: 'import numpy as np\na = np.array([1, 2, 3, 4])\nprint(a * 2)     # [2 4 6 8] — vectorized',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-arrays' },
  },
  {
    id: 'list-vs-numpy',
    keywords: ['numpy', 'list', 'vs', 'difference', 'performance'],
    question: 'NumPy array vs Python list — what is different?',
    answer:
      'NumPy arrays are typed (all elements same type), fixed-size, and support vectorized math. `a * 2` doubles each element (no loop). Lists are heterogeneous and require loops. NumPy is 10-100× faster for numeric work.',
    code: 'import numpy as np\n\n[1,2,3] * 2          # [1,2,3,1,2,3]  (repeat!)\nnp.array([1,2,3])*2  # [2 4 6]        (multiply)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-arrays' },
  },
  {
    id: 'numpy-what-is-array',
    keywords: ['numpy', 'array', 'ndarray', 'create', 'np.array', 'make'],
    question: 'How do I create a NumPy array?',
    answer:
      'Use `np.array(list)` to convert a Python list. For a list of lists you get a 2D array. NumPy arrays are homogeneous — one dtype for every element. Mixing types silently coerces to the highest type (bool → int → float → str).',
    code: 'import numpy as np\n\na = np.array([1, 2, 3])\nb = np.array([[1, 2], [3, 4]])\nprint(a.shape)    # (3,)\nprint(b.shape)    # (2, 2)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-arrays' },
  },
  {
    id: 'numpy-generators',
    keywords: ['zeros', 'ones', 'full', 'eye', 'identity', 'arange', 'linspace', 'empty'],
    question: 'What are the NumPy array generators?',
    answer:
      '`np.zeros(shape)`, `np.ones(shape)`, `np.full(shape, value)`, `np.eye(n)` (identity), `np.arange(start, stop, step)` (like range), `np.linspace(a, b, n)` (n evenly-spaced points inclusive), `np.empty(shape)` (uninitialized). The shape is a SINGLE tuple: `np.zeros((3, 4))`, not `np.zeros(3, 4)`.',
    code: 'np.zeros((2, 3))\nnp.ones((2, 3))\nnp.full((2, 2), 7)\nnp.eye(3)\nnp.arange(0, 10, 2)      # [0 2 4 6 8]\nnp.linspace(0, 1, 5)     # [0. 0.25 0.5 0.75 1.]',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-arrays' },
  },
  {
    id: 'numpy-shape-attributes',
    keywords: ['shape', 'ndim', 'size', 'dtype', 'itemsize', 'nbytes', 'attributes'],
    question: 'What attributes does every NumPy array have?',
    answer:
      '`.shape` (tuple of axis lengths), `.ndim` (number of dimensions), `.size` (total elements = product of shape), `.dtype` (element type), `.itemsize` (bytes per element), `.nbytes` (total bytes = size × itemsize), `.T` (transpose view).',
    code: 'a = np.zeros((3, 4))\na.shape     # (3, 4)\na.ndim      # 2\na.size      # 12\na.dtype     # float64\na.nbytes    # 96',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-arrays' },
  },
  {
    id: 'numpy-2d-indexing',
    keywords: ['indexing', '2d', 'comma', 'row', 'column', 'a[i,j]', 'slice'],
    question: 'How does 2D indexing work in NumPy?',
    answer:
      'Use comma syntax: `a[row, col]`. Cleaner and faster than `a[row][col]`. A single index returns a whole row. Use `:` for "all along this axis" — `a[:, 1]` is all rows, column 1.',
    code: 'a = np.array([[1, 2, 3], [4, 5, 6]])\na[0, 0]      # 1\na[1, 2]      # 6\na[0]         # [1 2 3] — full row\na[:, 1]      # [2 5]   — full column',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-indexing' },
  },
  {
    id: 'numpy-views-vs-copies',
    keywords: ['view', 'copy', 'slice', 'modify', 'memory', 'reference'],
    question: 'Do NumPy slices return views or copies?',
    answer:
      'Slices return **views** — modifying the slice modifies the original. Boolean masks and fancy indexing return **copies**. Call `.copy()` explicitly to isolate a slice.',
    code: 'a = np.arange(10)\nb = a[2:5]\nb[0] = 999\nprint(a)     # a IS modified!\n\nc = a[2:5].copy()\nc[0] = 0\nprint(a)     # a unchanged',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-indexing' },
  },
  {
    id: 'numpy-boolean-mask',
    keywords: ['boolean', 'mask', 'filter', 'condition', 'where', 'numpy filter'],
    question: 'How do I filter a NumPy array?',
    answer:
      'Build a boolean mask with a condition, then index with it: `a[a > 5]`. Combine conditions with `&` (and), `|` (or), `~` (not) — never Python `and`/`or`. Always put parentheses around each condition.',
    code: 'a = np.array([3, 8, 1, 9, 4, 7, 2])\na[a > 5]                          # [8 9 7]\na[(a > 3) & (a < 8)]              # [4 7]\na[~(a > 5)]                       # [3 1 4 2]',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-indexing' },
  },
  {
    id: 'numpy-fancy-indexing',
    keywords: ['fancy', 'indexing', 'array of indices', 'pick', 'select'],
    question: 'What is fancy indexing?',
    answer:
      'Passing an array of indices to pick specific elements in any order: `a[[0, 2, 4]]`. Always returns a COPY, never a view. Works in multiple dimensions: `a[[0, 2], :]` picks rows 0 and 2.',
    code: 'a = np.array([10, 20, 30, 40, 50])\na[[0, 2, 4]]         # [10 30 50]\na[[4, 3, 2, 1, 0]]   # reverse via fancy indexing',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-indexing' },
  },
  {
    id: 'numpy-where',
    keywords: ['where', 'if', 'else', 'ternary', 'conditional', 'np.where'],
    question: 'What does `np.where()` do?',
    answer:
      'Element-wise if/else: `np.where(cond, x, y)` returns x where cond is True, y elsewhere. Both branches are evaluated fully — beware of division by zero in the unused branch.',
    code: 'a = np.array([3, 8, 1, 9, 4, 7])\nnp.where(a > 5, "big", "small")\nnp.where(a > 5, a * 10, a)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-indexing' },
  },
  {
    id: 'numpy-reshape',
    keywords: ['reshape', 'shape', '2d', '3d', 'infer', 'minus one'],
    question: 'How does `reshape()` work?',
    answer:
      'Changes the shape without changing the data — total size must match. Use `-1` to infer one dimension: `a.reshape(3, -1)` figures out the second dim automatically.',
    code: 'a = np.arange(12)\na.reshape(3, 4)     # 3x4\na.reshape(2, 6)     # 2x6\na.reshape(3, -1)    # 3x4 (inferred)\na.reshape(2, 2, 3)  # 3D',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-reshaping' },
  },
  {
    id: 'numpy-flatten-vs-ravel',
    keywords: ['flatten', 'ravel', 'flatten vs ravel', '1d', 'copy'],
    question: 'What is the difference between `flatten()` and `ravel()`?',
    answer:
      '`.flatten()` returns a COPY. `.ravel()` returns a VIEW when possible (faster, but modifying it modifies the original). Use `.reshape(-1)` as a synonym for ravel.',
    code: 'a = np.arange(6).reshape(2, 3)\nf = a.flatten()    # copy — safe\nr = a.ravel()      # view when possible',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-reshaping' },
  },
  {
    id: 'numpy-transpose',
    keywords: ['transpose', 'T', 'swap axes', 'matrix flip'],
    question: 'How do I transpose a NumPy array?',
    answer:
      '`.T` flips rows and columns as a view. For 3D+ arrays, `.T` reverses ALL axes — rarely what you want. Use `np.swapaxes(a, i, j)` or `np.transpose(a, axes_order)` for full control.',
    code: 'a = np.array([[1, 2, 3], [4, 5, 6]])\na.T.shape            # (3, 2)\n\nb = np.arange(24).reshape(2, 3, 4)\nb.swapaxes(0, 1).shape       # (3, 2, 4)\nnp.transpose(b, (1, 2, 0)).shape  # (3, 4, 2)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-reshaping' },
  },
  {
    id: 'numpy-newaxis',
    keywords: ['newaxis', 'None', 'add axis', 'column vector', 'row vector'],
    question: 'How do I add a new axis to an array?',
    answer:
      'Use `np.newaxis` (or `None`). `a[:, np.newaxis]` turns a 1D array into a column vector (N, 1); `a[np.newaxis, :]` makes a row vector (1, N). Essential for controlling broadcasting direction.',
    code: 'a = np.array([1, 2, 3, 4])\na.shape                    # (4,)\na[:, np.newaxis].shape     # (4, 1)\na[np.newaxis, :].shape     # (1, 4)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-reshaping' },
  },
  {
    id: 'numpy-vectorization',
    keywords: ['vectorization', 'element-wise', 'loop', 'fast', 'performance'],
    question: 'What is vectorization in NumPy?',
    answer:
      'Doing math on whole arrays at once, in pre-compiled C — no Python loops. `a * 2` doubles every element. 10-100× faster than a Python loop. If you write `for x in arr:`, pause and search for the vectorized version first.',
    code: 'import time\narr = np.arange(1_000_000)\nout = arr ** 2 + 2 * arr + 1     # instant',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-vectorization' },
  },
  {
    id: 'numpy-ufuncs',
    keywords: ['ufunc', 'sqrt', 'exp', 'log', 'sin', 'cos', 'clip', 'abs', 'math'],
    question: 'What are NumPy ufuncs?',
    answer:
      'Universal functions — element-wise math applied to whole arrays in one call. `np.sqrt`, `np.exp`, `np.log`, `np.abs`, `np.sin`, `np.cos`, `np.clip`. Use `np.sqrt` — NOT `math.sqrt` (which only takes scalars).',
    code: 'a = np.array([1, 4, 9, 16])\nnp.sqrt(a)                # [1. 2. 3. 4.]\nnp.clip(a, 2, 10)         # [2 4 9 10]\nnp.exp(np.array([0, 1]))  # [1. 2.718...]',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-ufuncs' },
  },
  {
    id: 'numpy-nan-handling',
    keywords: ['nan', 'isnan', 'sqrt negative', 'missing', 'nan_to_num'],
    question: 'Why does `np.sqrt(-1)` return NaN instead of crashing?',
    answer:
      'NumPy ufuncs return `nan` for undefined results instead of raising — so an array with one bad value still processes the rest. Detect with `np.isnan(arr)`. Replace with `np.nan_to_num(arr, nan=0)`.',
    code: 'a = np.array([-4, 1, 4, 9])\nnp.sqrt(a)             # [nan 1. 2. 3.]\nnp.isnan(np.sqrt(a))   # [True False False False]',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-ufuncs' },
  },
  {
    id: 'numpy-axis',
    keywords: ['axis', 'axis=0', 'axis=1', 'collapse', 'aggregate', 'sum'],
    question: 'How does the `axis` parameter work?',
    answer:
      'For a 2D array: `axis=0` collapses rows (result per column), `axis=1` collapses columns (result per row). No axis = collapse everything to a scalar. "Axis N means go DOWN axis N and aggregate."',
    code: 'a = np.array([[1, 2, 3], [4, 5, 6]])\na.sum(axis=0)    # [5 7 9]   — per column\na.sum(axis=1)    # [ 6 15]   — per row\na.sum()          # 21        — everything',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-aggregation' },
  },
  {
    id: 'numpy-keepdims',
    keywords: ['keepdims', 'broadcast back', 'shape', 'subtract mean'],
    question: 'What does `keepdims=True` do?',
    answer:
      'Preserves the reduced axis as size 1, so you can broadcast the aggregate back to the original shape. `a - a.mean(axis=1, keepdims=True)` centers each row in one line.',
    code: 'a = np.array([[1, 2, 3], [4, 5, 6]])\na.mean(axis=1).shape                  # (2,)\na.mean(axis=1, keepdims=True).shape   # (2, 1)\na - a.mean(axis=1, keepdims=True)     # centers rows',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-aggregation' },
  },
  {
    id: 'numpy-argmax',
    keywords: ['argmax', 'argmin', 'index of max', 'position', 'probs'],
    question: 'How do I get the index of the max value?',
    answer:
      '`a.argmax()` returns the INDEX (not the value). `a.argmax(axis=1)` gives one index per row — the classic "pick the winning class" in ML.',
    code: 'a = np.array([3, 1, 4, 1, 5, 9])\na.argmax()    # 5 (where 9 is)\n\nprobs = np.array([[0.1, 0.2, 0.7], [0.6, 0.3, 0.1]])\nprobs.argmax(axis=1)    # [2 0]',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-aggregation' },
  },
  {
    id: 'numpy-broadcasting',
    keywords: ['broadcasting', 'shape', 'stretch', 'different shapes', 'rules'],
    question: 'What are the broadcasting rules?',
    answer:
      'When arrays have different shapes, NumPy aligns them from the RIGHT. For each axis, either the sizes match, or one is 1. Otherwise error. No memory is actually allocated — the smaller array is virtually stretched.',
    code: 'a = np.ones((3, 4))\nb = np.array([1, 2, 3, 4])    # (4,)\na + b     # OK — b stretches across rows\n\n# (3, 4) + (3,)  → ERROR — 4 vs 3 on last axis',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-broadcasting' },
  },
  {
    id: 'numpy-standardize',
    keywords: ['standardize', 'normalize', 'z-score', 'mean', 'std', 'column'],
    question: 'How do I standardize columns of a matrix?',
    answer:
      'Subtract column mean, divide by column std — using broadcasting + keepdims. `(X - X.mean(axis=0, keepdims=True)) / X.std(axis=0, keepdims=True)`. Result has column-mean 0, column-std 1.',
    code: 'X = np.array([[1.0, 100.0], [2.0, 200.0], [3.0, 300.0]])\nX_norm = (X - X.mean(axis=0, keepdims=True)) / X.std(axis=0, keepdims=True)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-broadcasting' },
  },
  {
    id: 'numpy-random-seed',
    keywords: ['random', 'seed', 'reproducible', 'rand', 'randn', 'randint'],
    question: 'How do I make random numbers reproducible?',
    answer:
      'Call `np.random.seed(n)` before generating. Same seed → same numbers every run. Common generators: `np.random.rand(n)` (uniform [0,1)), `np.random.randn(n)` (standard normal), `np.random.randint(lo, hi, n)` (integers).',
    code: 'import numpy as np\nnp.random.seed(42)\nprint(np.random.rand(3))\nnp.random.seed(42)\nprint(np.random.rand(3))    # same numbers',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-random-stats' },
  },
  {
    id: 'numpy-normal-distribution',
    keywords: ['normal', 'gaussian', 'distribution', 'sample', 'mean', 'std'],
    question: 'How do I sample from a normal distribution?',
    answer:
      '`np.random.normal(mean, std, size)` — general normal. `np.random.randn(n)` is just `normal(0, 1, n)`. To bound the output, use `np.clip(arr, low, high)` after sampling — standard trick for realistic data.',
    code: 'heights = np.random.normal(170, 8, 1000)\nheights = np.clip(heights, 140, 210)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-random-stats' },
  },
  {
    id: 'numpy-matmul',
    keywords: ['matmul', '@', 'matrix multiply', 'dot product', 'vs *'],
    question: 'What is the difference between `*` and `@` on NumPy arrays?',
    answer:
      '`A * B` is element-wise multiplication. `A @ B` is matrix multiplication (row-times-column dot product). For 1D arrays, `@` is the dot product — a single number. These are completely different operations — using `*` when you meant `@` is a classic bug.',
    code: 'A = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\n\nA * B     # [[ 5 12] [21 32]] — element-wise\nA @ B     # [[19 22] [43 50]] — matrix product',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-linalg' },
  },
  {
    id: 'numpy-solve-vs-inv',
    keywords: ['solve', 'inv', 'inverse', 'linear system', 'Ax=b', 'stability'],
    question: 'Should I use `np.linalg.inv` or `np.linalg.solve` to solve Ax=b?',
    answer:
      'Use **`solve`**. `np.linalg.solve(A, b)` is faster and more numerically stable — it never computes the explicit inverse. Only use `inv` when you genuinely need the inverse matrix itself.',
    code: 'A = np.array([[2, 3], [4, 5]])\nb = np.array([8, 14])\nx = np.linalg.solve(A, b)     # [1. 2.]\n# NOT: x = np.linalg.inv(A) @ b',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-linalg' },
  },
  {
    id: 'numpy-lstsq',
    keywords: ['lstsq', 'least squares', 'regression', 'fit', 'linear regression'],
    question: 'How do I fit a line to data with NumPy?',
    answer:
      'Least squares: `np.linalg.lstsq(X, y, rcond=None)` minimizes sum of squared residuals. Build the design matrix with a column of 1s for the intercept: `X = np.column_stack([x, np.ones_like(x)])`. This is linear regression from scratch.',
    code: 'x = np.linspace(0, 10, 50)\ny = 3 * x + 5 + np.random.normal(0, 2, 50)\n\nX = np.column_stack([x, np.ones_like(x)])\ncoeffs, *_ = np.linalg.lstsq(X, y, rcond=None)\nm, c = coeffs    # ~3 and ~5',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-linalg' },
  },
  {
    id: 'numpy-tensors',
    keywords: ['tensor', 'ndim', 'shape', '3d', '4d', 'image', 'batch'],
    question: 'What is a tensor in NumPy?',
    answer:
      'Just an array with 3 or more dimensions. Same type (`ndarray`), same rules — one more axis, one more index. Common shapes: **(H, W, C)** for a color image, **(batch, H, W, C)** for a batch of images. PyTorch/TensorFlow tensors are the same idea plus GPU + autograd.',
    code: 'img    = np.zeros((224, 224, 3))            # one image\nbatch  = np.zeros((32, 224, 224, 3))        # 32 images\nvideo  = np.zeros((16, 4, 224, 224, 3))     # 16 frames',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-tensors' },
  },
  {
    id: 'numpy-image-array',
    keywords: ['image', 'rgb', 'grayscale', 'channels', 'uint8', 'pixel'],
    question: 'How is an image represented in NumPy?',
    answer:
      'A color image is `(height, width, 3)` — channels are RGB. Values are usually `uint8` (0-255). Grayscale is `(height, width)`. To convert RGB → gray: `0.299*R + 0.587*G + 0.114*B`.',
    code: 'img = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)\ngray = 0.299 * img[:,:,0] + 0.587 * img[:,:,1] + 0.114 * img[:,:,2]\nprint(gray.shape)    # (100, 100)',
    lessonLink: { moduleId: 'numpy', lessonId: 'numpy-applications' },
  },

  /* ═══════════════════════════════════════════
     PANDAS — CORE
     ═══════════════════════════════════════════ */
  {
    id: 'what-is-pandas',
    keywords: ['pandas', 'what', 'about', 'overview', 'library', 'dataframe library'],
    question: 'What is Pandas?',
    answer:
      'The data analysis library for Python. Built on top of NumPy. Two core types: **Series** (1D labeled array) and **DataFrame** (2D labeled table). Every CSV, Excel file, or SQL query result becomes one of these. Used everywhere in data science, analytics, and ML.',
    code: 'import pandas as pd\n\ndf = pd.DataFrame({"name": ["Ada", "Alan"], "age": [36, 41]})\nprint(df)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-series' },
  },
  {
    id: 'what-is-series',
    keywords: ['series', 'what', '1d', 'column', 'labeled', 'pandas series'],
    question: 'What is a Series in Pandas?',
    answer:
      'A 1D labeled array — a NumPy array plus an **index** of labels. Every column of a DataFrame is a Series. The index lets you access values by label (`s["math"]`) instead of just position.',
    code: 'import pandas as pd\n\ns = pd.Series([95, 87, 72], index=["math", "physics", "chem"])\nprint(s["physics"])    # 87',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-series' },
  },
  {
    id: 'what-is-dataframe',
    keywords: ['dataframe', 'what', 'table', '2d', 'df', 'pandas dataframe'],
    question: 'What is a DataFrame?',
    answer:
      'A 2D labeled table — a dict of Series sharing the same row index. Rows are observations, columns are features. This is the shape of nearly every dataset you will ever load.',
    code: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ada", "Alan"],\n    "age": [36, 41],\n})\nprint(df.shape)    # (2, 2)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-dataframe' },
  },
  {
    id: 'series-vs-dataframe',
    keywords: ['series', 'dataframe', 'difference', 'vs'],
    question: 'What is the difference between a Series and a DataFrame?',
    answer:
      'A Series is 1D (one column), a DataFrame is 2D (many columns sharing an index). Selecting `df["col"]` gives a Series; selecting `df[["col"]]` gives a DataFrame with one column.',
    code: 'print(type(df["name"]).__name__)      # Series\nprint(type(df[["name"]]).__name__)    # DataFrame',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-dataframe' },
  },
  {
    id: 'create-series',
    keywords: ['create', 'series', 'list', 'dict', 'make series'],
    question: 'How do I create a Series?',
    answer:
      'Three ways: from a list (default 0..n index), from a list with an explicit `index=`, or from a dict (keys become the index).',
    code: 'pd.Series([10, 20, 30])\npd.Series([10, 20], index=["a", "b"])\npd.Series({"a": 10, "b": 20})',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-series' },
  },
  {
    id: 'create-dataframe',
    keywords: ['create', 'dataframe', 'dict', 'list of dicts', 'make dataframe'],
    question: 'How do I create a DataFrame?',
    answer:
      'Most common: dict of lists — keys become column names, values become columns. Or list of dicts — one dict per row. Dict-of-lists is column-oriented; list-of-dicts is row-oriented.',
    code: 'pd.DataFrame({"a": [1, 2], "b": [3, 4]})\npd.DataFrame([{"a": 1, "b": 3}, {"a": 2, "b": 4}])',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-dataframe' },
  },
  {
    id: 'read-csv',
    keywords: ['read', 'csv', 'read_csv', 'load', 'file', 'excel', 'json'],
    question: 'How do I load a CSV file?',
    answer:
      'Use `pd.read_csv(path)`. Related: `read_excel`, `read_json`, `read_parquet`. Useful params: `sep` (default ","), `header` (which row is the header), `encoding` (UTF-8 by default).',
    code: 'df = pd.read_csv("employees.csv")\ndf = pd.read_excel("employees.xlsx")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-dataframe' },
  },
  {
    id: 'inspect-dataframe',
    keywords: ['inspect', 'head', 'tail', 'info', 'describe', 'shape', 'columns'],
    question: 'How do I inspect a new DataFrame?',
    answer:
      'Five first-look functions: `.head()` (first rows), `.tail()` (last rows), `.shape` (rows × cols), `.info()` (dtypes + non-null counts), `.describe()` (numeric stats). Always inspect before analyzing.',
    code: 'df.head()\ndf.shape\ndf.info()\ndf.describe()',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-dataframe' },
  },
  {
    id: 'describe-missing-column',
    keywords: ['describe', 'missing', 'numeric', 'dtype', 'why'],
    question: 'Why is a numeric-looking column missing from `.describe()`?',
    answer:
      '`.describe()` only summarizes numeric columns. If a column of numbers is missing from the output, its dtype is probably `object` (string) — often from a CSV where the column had mixed values. Fix with `pd.to_numeric(col, errors="coerce")`.',
    code: 'df["salary"] = pd.to_numeric(df["salary"], errors="coerce")\ndf.describe()',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'shape-vs-size',
    keywords: ['shape', 'size', 'len', 'rows', 'columns', 'count'],
    question: 'What is the difference between `.shape`, `.size`, and `len(df)`?',
    answer:
      '`.shape` → (rows, cols) tuple. `.size` → total number of cells (rows × cols). `len(df)` → number of ROWS (same as `df.shape[0]`).',
    code: 'df.shape     # (100, 5)\ndf.size      # 500\nlen(df)      # 100',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-dataframe' },
  },
  {
    id: 'select-column',
    keywords: ['select', 'column', 'brackets', 'double', 'single'],
    question: 'What is the difference between `df["col"]` and `df[["col"]]`?',
    answer:
      '`df["col"]` returns a **Series** (one column). `df[["col"]]` returns a **DataFrame** with one column. The outer brackets are "select from df", the inner brackets are a list of column names. This matters when downstream code expects one or the other.',
    code: 'type(df["salary"]).__name__      # Series\ntype(df[["salary"]]).__name__    # DataFrame',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-indexing' },
  },
  {
    id: 'loc-vs-iloc',
    keywords: ['loc', 'iloc', 'select', 'label', 'position', 'difference'],
    question: 'What is the difference between `.loc[]` and `.iloc[]`?',
    answer:
      '`.loc[]` selects by **label** (index name). `.iloc[]` selects by **integer position**. Slice behavior differs: `.loc[0:3]` includes 3 (inclusive); `.iloc[0:3]` excludes 3 (half-open, like Python).',
    code: 'df.loc[105]        # row labeled 105\ndf.iloc[0]         # first physical row\ndf.loc[0:3]        # 4 rows (0,1,2,3)\ndf.iloc[0:3]       # 3 rows (0,1,2)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-indexing' },
  },
  {
    id: 'boolean-filter',
    keywords: ['filter', 'boolean', 'mask', 'condition', 'where'],
    question: 'How do I filter rows by a condition?',
    answer:
      'Use a boolean mask: `df[df["col"] > value]`. The inner expression produces a True/False Series, and pandas keeps rows where it is True. Single most-used idiom in pandas.',
    code: 'df[df["salary"] > 60000]\ndf[df["department"] == "Engineering"]',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-indexing' },
  },
  {
    id: 'combine-conditions-pandas',
    keywords: ['and', 'or', 'combine', 'multiple', 'conditions', 'filter'],
    question: 'How do I combine multiple filter conditions?',
    answer:
      'Use `&` (AND), `|` (OR), `~` (NOT) with **parentheses around each condition**. Python\'s `and`/`or` fail on Series because truthiness is ambiguous.',
    code: 'df[(df["salary"] > 60000) & (df["experience"] > 5)]\ndf[(df["dept"] == "Eng") | (df["dept"] == "Data")]\ndf[~(df["city"] == "Delhi")]',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-indexing' },
  },
  {
    id: 'isin-between-pandas',
    keywords: ['isin', 'between', 'range', 'list', 'membership'],
    question: 'How do I filter by a set of values or a numeric range?',
    answer:
      '`.isin([...])` matches any value in a list — replaces long OR chains. `.between(a, b)` checks a range — inclusive on both ends by default.',
    code: 'df[df["dept"].isin(["Engineering", "Data Science"])]\ndf[df["salary"].between(50000, 80000)]',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-indexing' },
  },
  {
    id: 'query-method',
    keywords: ['query', 'sql', 'filter', 'string'],
    question: 'What is the `.query()` method?',
    answer:
      'SQL-like filtering with a string. Cleaner than chained `&` for complex conditions. Inside the string, `and`/`or` work normally. Use `@variable` to reference Python variables.',
    code: 'df.query("salary > 60000 and experience > 5")\ndf.query("dept in [\'Eng\', \'Data\']")\nthreshold = 60000\ndf.query("salary > @threshold")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-indexing' },
  },
  {
    id: 'value-counts',
    keywords: ['value_counts', 'count', 'unique', 'frequency', 'tally'],
    question: 'How do I count unique values in a column?',
    answer:
      '`df["col"].value_counts()` returns a Series of counts, sorted descending. Add `normalize=True` for proportions. Use `.nunique()` for just the count of distinct values.',
    code: 'df["dept"].value_counts()\ndf["dept"].value_counts(normalize=True)    # proportions\ndf["dept"].nunique()                       # number of unique',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-series' },
  },
  {
    id: 'isnull-pandas',
    keywords: ['isnull', 'isna', 'missing', 'nan', 'detect'],
    question: 'How do I detect missing values?',
    answer:
      '`.isnull()` and `.isna()` are identical — both return True/False per cell. Chain `.sum()` to count missing values per column. This is the fastest audit before cleaning.',
    code: 'df.isnull().sum()    # missing count per column\ndf.isnull().any()    # does ANY column have NaN?',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'dropna',
    keywords: ['dropna', 'remove', 'missing', 'nan', 'delete'],
    question: 'How do I drop rows with missing values?',
    answer:
      '`df.dropna()` removes rows with ANY NaN — dangerous on real data. Use `subset=[...]` to target specific columns. `how="all"` drops only fully-empty rows. `thresh=n` requires at least n non-null values.',
    code: 'df.dropna(subset=["salary"])       # drop rows missing salary\ndf.dropna(how="all")                # drop all-NaN rows\ndf.dropna(thresh=3)                 # keep rows with ≥3 non-null',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'fillna',
    keywords: ['fillna', 'fill', 'missing', 'impute', 'mean', 'median'],
    question: 'How do I fill missing values?',
    answer:
      '`fillna(value)` replaces NaN. Better: fill numeric columns with mean or median. Median is safer when outliers exist. `ffill()` copies last valid value; `.interpolate()` fits a line.',
    code: 'df["salary"] = df["salary"].fillna(df["salary"].median())\ndf["age"]    = df["age"].fillna(df["age"].mean())\ndf["status"] = df["status"].ffill()',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'duplicates-pandas',
    keywords: ['duplicated', 'duplicate', 'drop_duplicates', 'unique', 'dedup'],
    question: 'How do I find and remove duplicates?',
    answer:
      '`.duplicated()` returns True for duplicate rows. By default it checks EVERY column — two rows must match completely. Use `subset=[...]` to check specific columns (like an ID). Remove with `.drop_duplicates(subset=[...])`.',
    code: 'df.duplicated().sum()                              # count\nx = df.duplicated(subset=["employee_id"]).sum()    # by ID\ndf = df.drop_duplicates(subset=["employee_id"], keep="first")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'dtype-conversion-pandas',
    keywords: ['astype', 'to_numeric', 'to_datetime', 'dtype', 'convert', 'coerce'],
    question: 'Why does `.astype(int)` crash on messy data?',
    answer:
      '`astype()` fails the moment it hits a value it cannot convert — a missing value, or stray text in a numeric column. Use `pd.to_numeric(col, errors="coerce")` instead: bad values become NaN, no crash. Same for `pd.to_datetime(col, errors="coerce")`.',
    code: 'df["salary"] = pd.to_numeric(df["salary"], errors="coerce")\ndf["date"]   = pd.to_datetime(df["date"], errors="coerce")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'chained-assignment-pandas',
    keywords: ['chained', 'assignment', 'settingwithcopy', 'warning', 'loc'],
    question: 'Why is `df["x"][mask] = value` dangerous?',
    answer:
      'Chained indexing (two `[]` in a row) may operate on a COPY, not the original. Pandas raises `SettingWithCopyWarning` and your assignment silently disappears. Always use `.loc[row_mask, column] = value` in one call.',
    code: '# BAD — may not modify df\ndf["score"][df["score"] < 0] = 0\n\n# GOOD — always modifies df\ndf.loc[df["score"] < 0, "score"] = 0',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-indexing' },
  },
  {
    id: 'rename-columns-pandas',
    keywords: ['rename', 'column', 'columns', 'header', 'inplace'],
    question: 'How do I rename columns?',
    answer:
      'Use `.rename(columns={old: new})`. It returns a NEW DataFrame — reassign or use `inplace=True`. To bulk-clean every column name: `df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")`.',
    code: 'df = df.rename(columns={"emp_name": "employee_name"})\n\ndf.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'add-new-column',
    keywords: ['add', 'column', 'new', 'assign', 'create'],
    question: 'How do I add a new column?',
    answer:
      'Assign to a name that does not exist: `df["total"] = df["price"] * df["qty"]`. Vectorized math — no loop needed. For chained pipelines, use `.assign(total=lambda d: d["price"] * d["qty"])`.',
    code: 'df["total"] = df["price"] * df["qty"]\n\ndf = df.assign(total=lambda d: d["price"] * d["qty"])',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-transform' },
  },
  {
    id: 'apply-vs-map-pandas',
    keywords: ['apply', 'map', 'difference', 'transform', 'custom', 'function'],
    question: 'When to use `map()` vs `apply()`?',
    answer:
      'Use **map** for value-to-value substitution with a dictionary (`{"A": "X", "B": "Y"}`). Use **apply** for custom logic with branching (if/elif/else). Direct math beats both.',
    code: '# map — dictionary lookup\ndf["code"] = df["dept"].map({"Eng": "E", "Mkt": "M"})\n\n# apply — custom function\ndf["grade"] = df["score"].apply(lambda s: "A" if s >= 90 else "B")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-transform' },
  },
  {
    id: 'map-missing-values',
    keywords: ['map', 'nan', 'missing', 'unmapped', 'keys'],
    question: 'Why does `map()` produce NaN?',
    answer:
      '`map(dict)` returns NaN for any value NOT in the dictionary — silently. Always verify your mapping covers every unique value: `set(df["col"].unique()) - set(mapping.keys())`.',
    code: 'mapping = {"Eng": "E", "Mkt": "M"}\nmissing = set(df["dept"].unique()) - set(mapping.keys())\nif missing:\n    print("unmapped:", missing)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-transform' },
  },
  {
    id: 'lambda-pandas',
    keywords: ['lambda', 'apply', 'inline', 'anonymous', 'one-line'],
    question: 'How do I use a lambda with pandas apply?',
    answer:
      'A lambda is a single expression — the if/else must be the inline ternary form: `lambda x: "A" if cond else "B"`. For multiple branches, use a named `def` function instead.',
    code: 'df["level"] = df["salary"].apply(lambda s: "High" if s > 70000 else "Low")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-transform' },
  },
  {
    id: 'feature-engineering-pandas',
    keywords: ['feature', 'engineering', 'flags', 'buckets', 'cut', 'bin'],
    question: 'What is feature engineering?',
    answer:
      'Creating new columns from existing ones — the skill that turns raw data into signals a model can learn from. Three patterns: **flags** (True/False → 0/1), **buckets** (`pd.cut` continuous → categorical), **ratios** (combine columns).',
    code: 'df["senior"]    = (df["experience"] >= 5).astype(int)\ndf["exp_level"] = pd.cut(df["experience"], bins=[0,2,5,100], labels=["Junior","Mid","Senior"])\ndf["rate"]      = df["score"] / df["experience"].clip(lower=1)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-transform' },
  },
  {
    id: 'apply-missing-return',
    keywords: ['apply', 'none', 'return', 'forgot', 'bug'],
    question: 'Why is my apply() producing all None?',
    answer:
      'Your custom function forgot `return`. Every code path must return a value — otherwise Python returns None by default, and the whole column fills with None silently, no error.',
    code: '# BAD\ndef grade(s):\n    if s >= 90:\n        "A"          # computes, throws away\n\n# GOOD\ndef grade(s):\n    if s >= 90:\n        return "A"',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-transform' },
  },
  {
    id: 'sort-values',
    keywords: ['sort', 'sort_values', 'order', 'ascending', 'descending'],
    question: 'How do I sort a DataFrame?',
    answer:
      '`df.sort_values(by="col")` ascending by default. Pass `ascending=False` for descending. Multi-column: pass a list of columns and a matching list of flags.',
    code: 'df.sort_values("salary", ascending=False)\ndf.sort_values(["dept", "salary"], ascending=[True, False])',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-sort-rank' },
  },
  {
    id: 'nlargest-nsmallest',
    keywords: ['nlargest', 'nsmallest', 'top', 'bottom', 'highest', 'lowest'],
    question: 'How do I get the top N rows by a column?',
    answer:
      'Use `.nlargest(n, "col")` or `.nsmallest(n, "col")`. Faster than `sort_values().head(n)` on big DataFrames — never fully sorts, uses a heap.',
    code: 'df.nlargest(5, "salary")\ndf.nsmallest(5, "performance_score")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-sort-rank' },
  },
  {
    id: 'rank-pandas',
    keywords: ['rank', 'ranking', 'position', 'tie', 'method'],
    question: 'How does `.rank()` handle ties?',
    answer:
      'Default method is `"average"` — two tied for 2nd both get 2.5. `method="min"` gives both 2; `"max"` gives both 3; `"dense"` gives both 2 and no gaps; `"first"` breaks by original order. `.rank()` always returns FLOAT.',
    code: 'df["rank"] = df["score"].rank(ascending=False)\ndf["rank"] = df["score"].rank(method="min", ascending=False)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-sort-rank' },
  },
  {
    id: 'groupby-rank',
    keywords: ['rank', 'group', 'within', 'leaderboard', 'category'],
    question: 'How do I rank within a group?',
    answer:
      'Combine `groupby` with `rank`: `df.groupby("team")["score"].rank(ascending=False)`. Each row gets its rank within its own team. Perfect for leaderboards.',
    code: 'df["rank_in_team"] = df.groupby("team")["score"].rank(ascending=False)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-sort-rank' },
  },
  {
    id: 'sort-pandas-returns-new',
    keywords: ['sort', 'inplace', 'new', 'copy', 'mutate'],
    question: 'Why did my sort not change the DataFrame?',
    answer:
      '`sort_values()` returns a NEW DataFrame by default — the original is untouched. Reassign (`df = df.sort_values(...)`) or pass `inplace=True`. Same for `dropna`, `fillna`, `rename`.',
    code: 'df = df.sort_values("salary", ascending=False)\n# or\ndf.sort_values("salary", ascending=False, inplace=True)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-sort-rank' },
  },
  {
    id: 'groupby-basics',
    keywords: ['groupby', 'group', 'aggregate', 'split', 'apply', 'combine'],
    question: 'How does `groupby()` work?',
    answer:
      'Split-apply-combine: split rows into groups by a key, apply an aggregation to each group, combine into a new table. The result is indexed by the group key.',
    code: 'df.groupby("dept")["salary"].mean()\ndf.groupby("dept")["salary"].sum()\ndf.groupby("dept")["salary"].count()',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-groupby' },
  },
  {
    id: 'agg-multiple',
    keywords: ['agg', 'aggregate', 'multiple', 'stats', 'summary'],
    question: 'How do I compute multiple aggregations at once?',
    answer:
      '`.agg([...])` on a Series-GroupBy → one column per aggregation. `.agg({...})` on a DataFrame-GroupBy → per-column aggregations. Use NAMED aggregation for clean column names in the output.',
    code: 'df.groupby("dept")["salary"].agg(["sum", "mean", "max"])\n\ndf.groupby("dept").agg(\n    avg_salary=("salary", "mean"),\n    max_salary=("salary", "max"),\n    n=("employee_id", "count"),\n)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-groupby' },
  },
  {
    id: 'transform-vs-agg',
    keywords: ['transform', 'agg', 'difference', 'broadcast', 'same shape'],
    question: 'What is the difference between `.agg()` and `.transform()`?',
    answer:
      '`agg()` reduces each group to ONE value (fewer rows in output). `transform()` returns a result with the SAME shape as the original — every row gets its group-level aggregate. Use transform when you want to add a group stat back as a column.',
    code: 'df["dept_avg"] = df.groupby("dept")["salary"].transform("mean")\ndf["vs_avg"]   = df["salary"] - df["dept_avg"]',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-groupby' },
  },
  {
    id: 'count-vs-size',
    keywords: ['count', 'size', 'groupby', 'missing', 'difference'],
    question: 'What is the difference between `count()` and `size()` in groupby?',
    answer:
      '`size()` counts every row in the group (including NaN). `count()` counts only non-null values. They diverge exactly when a group has missing values — the gap is how you spot missing data hiding inside a group.',
    code: 'df.groupby("dept")["salary"].count()    # non-null count per group\ndf.groupby("dept")["salary"].size()     # total rows per group',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-groupby' },
  },
  {
    id: 'reset-index-after-groupby',
    keywords: ['reset_index', 'groupby', 'index', 'keyerror', 'column'],
    question: 'Why does `groupby` output give me a KeyError on the group column?',
    answer:
      'After `groupby().agg()`, the group key becomes the INDEX, not a regular column. `df_result["dept"]` raises KeyError. Fix with `.reset_index()` — turns the index back into a column.',
    code: 'result = df.groupby("dept")["salary"].mean().reset_index()\nprint(result["dept"])    # now works',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-groupby' },
  },
  {
    id: 'merge-basics',
    keywords: ['merge', 'join', 'combine', 'key', 'sql', 'on', 'pandas merge'],
    question: 'How do I merge two DataFrames?',
    answer:
      '`df1.merge(df2, on="key")` is an SQL join. Default is inner join — only keys present in BOTH tables. Control with `how=`: `"inner"`, `"left"`, `"right"`, `"outer"`.',
    code: 'users.merge(orders, on="user_id")\nusers.merge(orders, on="user_id", how="left")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-merge' },
  },
  {
    id: 'join-types',
    keywords: ['join', 'inner', 'left', 'right', 'outer', 'how'],
    question: 'What are the four join types?',
    answer:
      '**inner** (default) — only matching keys. **left** — all rows from left, NaN where right has no match. **right** — mirror. **outer** — everything from both sides, NaN where either is missing.',
    code: 'df.merge(other, on="id", how="inner")\ndf.merge(other, on="id", how="left")\ndf.merge(other, on="id", how="right")\ndf.merge(other, on="id", how="outer")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-merge' },
  },
  {
    id: 'merge-suffixes',
    keywords: ['suffix', 'merge', 'overlapping', 'column', '_x', '_y'],
    question: 'Why does merge add `_x` and `_y` to my columns?',
    answer:
      'When both tables have a column with the same name (other than the join key), pandas appends `_x`/`_y`. Control with `suffixes=("_left", "_right")` for readable names.',
    code: 'a.merge(b, on="id", suffixes=("_left", "_right"))',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-merge' },
  },
  {
    id: 'concat-basics',
    keywords: ['concat', 'concatenate', 'stack', 'append', 'rows'],
    question: 'How do I stack two DataFrames?',
    answer:
      '`pd.concat([df1, df2])` stacks rows (axis=0 default) or columns (axis=1). Pass `ignore_index=True` to renumber the index 0..n-1 — almost always what you want. Columns align by NAME, not position.',
    code: 'pd.concat([df1, df2], ignore_index=True)         # stack rows\npd.concat([df1, df2], axis=1)                    # glue columns',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-merge' },
  },
  {
    id: 'long-vs-wide',
    keywords: ['long', 'wide', 'format', 'reshape', 'tidy'],
    question: 'What is the difference between long and wide format?',
    answer:
      '**Long**: one row per observation (`date, metric, value`). **Wide**: one row per entity, one column per metric (`date, sales, costs`). Charts and some ML models prefer wide; tidy data is long. Pivot goes long → wide; melt goes wide → long.',
    code: 'long:  [date, metric, value]\nwide:  [date, sales, costs]',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-reshape' },
  },
  {
    id: 'pivot-pandas',
    keywords: ['pivot', 'wide', 'long', 'unstack', 'reshape'],
    question: 'How do I pivot long data to wide?',
    answer:
      '`df.pivot(index="date", columns="metric", values="value")`. Each unique (index, column) pair must be unique, otherwise pivot raises ValueError — use `.pivot_table(..., aggfunc=...)` to aggregate duplicates.',
    code: 'wide = df.pivot(index="date", columns="metric", values="value")\n\n# with duplicates, aggregate:\nwide = df.pivot_table(index="date", columns="metric", values="value", aggfunc="sum")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-reshape' },
  },
  {
    id: 'melt-pandas',
    keywords: ['melt', 'long', 'wide', 'unpivot', 'reshape'],
    question: 'How do I melt wide data to long?',
    answer:
      '`df.melt(id_vars=[...], var_name="metric", value_name="value")`. The reverse of pivot — one row per (id, metric) pair. `id_vars` are columns to keep fixed; all others become rows.',
    code: 'long = df.melt(id_vars="date", var_name="metric", value_name="value")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-reshape' },
  },
  {
    id: 'crosstab-pandas',
    keywords: ['crosstab', 'count', 'frequency', 'contingency', 'pivot table'],
    question: 'What is `pd.crosstab()`?',
    answer:
      'A frequency table — pandas version of Excel\'s PivotTable. Without `values`, it gives counts per cell. With `values=` and `aggfunc=`, it gives any aggregation.',
    code: 'pd.crosstab(df["dept"], df["city"])                              # counts\npd.crosstab(df["dept"], df["city"], values=df["salary"], aggfunc="sum")',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-reshape' },
  },
  {
    id: 'inplace-vs-reassign',
    keywords: ['inplace', 'reassign', 'mutate', 'assign', 'copy'],
    question: 'Should I use `inplace=True` or reassign?',
    answer:
      'Modern pandas discourages `inplace=True` — it is deprecated in some methods and makes chaining impossible. Prefer reassigning: `df = df.sort_values(...)`. Every pandas method returns a value unless told otherwise.',
    code: '# Prefer\ndf = df.dropna(subset=["salary"])\ndf = df.sort_values("salary")\n\n# Avoid (breaking in future pandas)\ndf.dropna(subset=["salary"], inplace=True)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'str-accessor',
    keywords: ['str', 'string', 'text', 'contains', 'lower', 'upper', 'replace'],
    question: 'How do I apply string methods to a whole column?',
    answer:
      'Use the `.str` accessor — vectorized string methods on a Series. `.str.lower()`, `.str.contains()`, `.str.replace()`, `.str.strip()`, `.str.split()`. All work without loops.',
    code: 'df["name"].str.lower()\ndf["name"].str.contains("Verma")\ndf["dept"].str.strip().str.title()',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-missing' },
  },
  {
    id: 'groupby-merge-pattern',
    keywords: ['groupby', 'merge', 'pattern', 'per user', 'combine'],
    question: 'What is the groupby → merge pattern?',
    answer:
      'The workhorse of analytics: group one table, aggregate, merge the result back onto another table. Example — "total spent per user, including users who spent nothing": group orders by user, sum amount, then LEFT JOIN onto users and fill NaN with 0.',
    code: 'totals = orders.groupby("user_id")["amount"].sum().reset_index()\nresult = users.merge(totals, on="user_id", how="left")\nresult["amount"] = result["amount"].fillna(0)',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-merge' },
  },
  {
    id: 'pandas-vs-numpy',
    keywords: ['pandas', 'numpy', 'difference', 'vs', 'when'],
    question: 'When should I use Pandas vs NumPy?',
    answer:
      '**NumPy** for raw numeric computation — matrices, linear algebra, image data, fast vectorized math. **Pandas** for labeled, mixed-type, messy tabular data — CSVs, groupby, joins, missing values. Pandas is built on NumPy; use Pandas for tables and drop to NumPy for tight numeric loops.',
    code: 'import numpy as np\nimport pandas as pd\n\narr = np.array([1, 2, 3])              # numeric math\ns   = pd.Series([1, 2, 3])             # labeled column\ndf  = pd.DataFrame({"a": [1, 2, 3]})   # labeled table',
    lessonLink: { moduleId: 'pandas', lessonId: 'pandas-series' },
  },

  /* ═══════════════════════════════════════════
     LINEAR ALGEBRA — CORE
     ═══════════════════════════════════════════ */
  {
    id: 'la-what-is-scalar',
    keywords: ['scalar', 'single number', 'what is scalar'],
    question: 'What is a scalar?',
    answer:
      'A single number — no direction, no structure. Temperature, age, price, mass. Scalars are the simplest mathematical objects. When we multiply a vector by a scalar, we scale every component by that same number.',
    code: '# Scalar in Python\nx = 5\nprice = 19.99\n\n# Scalar in NumPy\nimport numpy as np\ns = np.array(5)     # 0-dimensional array\nprint(s.ndim)       # 0',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-scalars-vectors' },
  },
  {
    id: 'la-what-is-vector',
    keywords: ['vector', 'what is vector', 'list of numbers', 'arrow'],
    question: 'What is a vector?',
    answer:
      'An **ordered list of numbers**. Each number is a component. The position of a component has meaning — (3, 5) means "3 across, 5 up" and is completely different from (5, 3). Vectors are the fundamental data structure of AI.',
    code: 'import numpy as np\nv = np.array([3, 4])\nprint(v.shape)    # (2,) — 2D vector',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-scalars-vectors' },
  },
  {
    id: 'la-vector-dimension',
    keywords: ['dimension', 'components', 'how many', 'length of vector'],
    question: 'What is the dimension of a vector?',
    answer:
      'The **number of components** in the vector. A vector (3, 5) has dimension 2. A 3D position (x, y, z) has dimension 3. A word embedding might have dimension 768. Dimension = how many numbers are inside the parentheses.',
    code: 'import numpy as np\nprint(np.array([3, 5]).shape)          # (2,) — dimension 2\nprint(np.array([1, 2, 3, 4, 5]).shape) # (5,) — dimension 5',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-scalars-vectors' },
  },
  {
    id: 'la-vector-addition',
    keywords: ['add', 'addition', 'vector sum', 'combine vectors'],
    question: 'How do I add two vectors?',
    answer:
      'Add them **component by component** — first to first, second to second, and so on. Result is a new vector of the same dimension. Geometrically, this is "tip-to-tail": place the tail of the second vector at the tip of the first, and the sum goes from the origin to the new tip.',
    code: 'import numpy as np\n\nu = np.array([3, 4])\nv = np.array([1, 2])\nprint(u + v)    # [4 6]',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-vector-ops' },
  },
  {
    id: 'la-vector-scaling',
    keywords: ['scale', 'scalar multiplication', 'stretch', 'shrink'],
    question: 'How do I scale a vector?',
    answer:
      'Multiply every component by the same scalar. `2 * (3, 4) = (6, 8)` stretches it. `0.5 * (3, 4) = (1.5, 2)` shrinks it. A negative scalar flips the direction. Scaling never changes the "line" the vector sits on — only how far along it you go.',
    code: 'import numpy as np\nv = np.array([3, 4])\nprint(2 * v)      # [6 8]\nprint(0.5 * v)    # [1.5 2.]\nprint(-1 * v)     # [-3 -4] — direction flips',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-vector-ops' },
  },
  {
    id: 'la-linear-combination',
    keywords: ['linear combination', 'combine', 'au + bv', 'span'],
    question: 'What is a linear combination?',
    answer:
      'Taking some amount of one vector, plus some amount of another: $a \\cdot u + b \\cdot v$. The scalars $a$ and $b$ choose how much of each vector to use. Every neural network layer is literally a stack of linear combinations — this is the single most important idea in all of ML.',
    code: 'import numpy as np\n\nu = np.array([2, 0])\nv = np.array([0, 3])\na, b = 1.5, 2.0\nprint(a * u + b * v)    # [3. 6.]',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-vector-ops' },
  },
  {
    id: 'la-dot-product',
    keywords: ['dot', 'dot product', 'inner product', 'similarity', 'u . v'],
    question: 'What is the dot product?',
    answer:
      'Multiply matching components, then add them up. The result is a **single number** (a scalar). Geometrically, $u \\cdot v = \\|u\\| \\, \\|v\\| \\cos\\theta$ — it measures how aligned two vectors are. The single most-used operation in all of ML.',
    code: 'import numpy as np\n\nu = np.array([3, 4])\nv = np.array([1, 2])\nprint(u @ v)           # 11\nprint(np.dot(u, v))    # 11 — same thing',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-dot-product-deep' },
  },
  {
    id: 'la-dot-product-meaning',
    keywords: ['dot product meaning', 'aligned', 'angle', 'cosine theta'],
    question: 'What does the dot product actually tell me?',
    answer:
      'How aligned two vectors are. **Large positive** = pointing the same way. **Zero** = perpendicular. **Large negative** = pointing opposite. Because it scales with length, you usually divide by both norms to get cosine similarity — a clean measure between −1 and 1.',
    code: 'import numpy as np\n\n# Aligned → positive\nprint(np.array([1, 0]) @ np.array([1, 0]))   # 1\n\n# Perpendicular → zero\nprint(np.array([1, 0]) @ np.array([0, 1]))   # 0\n\n# Opposite → negative\nprint(np.array([1, 0]) @ np.array([-1, 0]))  # -1',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-dot-product-deep' },
  },
  {
    id: 'la-norm',
    keywords: ['norm', 'length', 'magnitude', 'size of vector', 'L2'],
    question: 'How do I find the length of a vector?',
    answer:
      'The **norm** — square each component, add them up, take the square root. This is Pythagoras generalised to any dimension. In NumPy: `np.linalg.norm(v)`. The L1 norm just sums absolute values instead — different notion of "size".',
    code: 'import numpy as np\n\nv = np.array([3, 4])\nprint(np.linalg.norm(v))          # 5.0 — L2 norm\nprint(np.linalg.norm(v, ord=1))   # 7.0 — L1 norm',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-norms-distance' },
  },
  {
    id: 'la-unit-vector',
    keywords: ['unit vector', 'normalize', 'normalization', 'length 1'],
    question: 'What is a unit vector?',
    answer:
      'A vector of length exactly 1. You get one by dividing any vector by its own norm: $\\hat{v} = v / \\|v\\|$. It points in the same direction as the original but strips away magnitude. Perfect for comparing directions.',
    code: 'import numpy as np\n\nv = np.array([3, 4])\nv_hat = v / np.linalg.norm(v)\nprint(v_hat)                          # [0.6 0.8]\nprint(np.linalg.norm(v_hat))          # 1.0',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-norms-distance' },
  },
  {
    id: 'la-distance',
    keywords: ['distance', 'between vectors', 'far', 'euclidean'],
    question: 'How do I find the distance between two vectors?',
    answer:
      'Subtract them, then take the norm of the result: $d(u, v) = \\|u - v\\|$. This is the straight-line distance between the two points. It is the basis of every "find similar items" system — search engines, recommendations, image matching.',
    code: 'import numpy as np\n\nu = np.array([1, 2])\nv = np.array([4, 6])\nprint(np.linalg.norm(u - v))   # 5.0',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-norms-distance' },
  },
  {
    id: 'la-cosine-similarity',
    keywords: ['cosine similarity', 'similar', 'angle', 'text similarity'],
    question: 'What is cosine similarity?',
    answer:
      'The cosine of the angle between two vectors. Ignores magnitude, only cares about direction. Ranges from −1 (opposite) to +1 (identical). The default similarity measure for text, embeddings, and search.',
    code: 'import numpy as np\n\ndef cosine(a, b):\n    return (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\na = np.array([3, 4])\nb = np.array([6, 8])   # same direction, double length\nprint(cosine(a, b))    # 1.0',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-norms-distance' },
  },
  {
    id: 'la-what-is-matrix',
    keywords: ['matrix', 'what is matrix', 'grid', 'rows columns'],
    question: 'What is a matrix?',
    answer:
      'A 2D grid of numbers — rows and columns. Shape is written rows × columns. A 3×4 matrix has 3 rows and 4 columns. Every dataset you will ever load is a matrix: rows are examples, columns are features.',
    code: 'import numpy as np\n\nA = np.array([[1, 2, 3],\n              [4, 5, 6]])\nprint(A.shape)   # (2, 3)',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-matrices-intro' },
  },
  {
    id: 'la-matrix-vector-mul',
    keywords: ['matrix vector', 'matrix times vector', 'transform'],
    question: 'How does a matrix multiply a vector?',
    answer:
      'Each row of the matrix takes the dot product with the vector, producing one output number. An $m \\times n$ matrix takes an $n$-dimensional vector to an $m$-dimensional vector. Geometrically, it **transforms** the vector — stretch, rotate, project.',
    code: 'import numpy as np\n\nA = np.array([[1, 2],\n              [3, 4]])\nv = np.array([5, 6])\nprint(A @ v)   # [17 39]',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-matrices-intro' },
  },
  {
    id: 'la-matrix-multiplication',
    keywords: ['matrix multiplication', 'AB', 'compose', 'matmul'],
    question: 'How does matrix multiplication work?',
    answer:
      'Each entry of the result is a dot product: (row of A) · (column of B). Geometrically, AB means "first apply B, then apply A" — function composition. Order matters: $AB \\neq BA$ in general.',
    code: 'import numpy as np\n\nA = np.array([[1, 2],\n              [3, 4]])\nB = np.array([[5, 6],\n              [7, 8]])\nprint(A @ B)\n# [[19 22]\n#  [43 50]]',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-matrix-multiplication' },
  },
  {
    id: 'la-shape-rule',
    keywords: ['shape rule', 'compatible', 'dimensions match', 'matmul shape'],
    question: 'What are the shape rules for matrix multiplication?',
    answer:
      'Inner dimensions must match. $(m \\times n) \\cdot (n \\times p) = (m \\times p)$. If the inner dimensions differ, the multiplication is not defined. This is the single most common source of shape errors in ML code.',
    code: 'import numpy as np\n\nA = np.ones((3, 5))\nB = np.ones((5, 4))\nprint((A @ B).shape)     # (3, 4)\n\n# A @ np.ones((4, 2))   # ERROR — 5 vs 4',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-matrix-multiplication' },
  },
  {
    id: 'la-identity-matrix',
    keywords: ['identity', 'I matrix', 'do nothing', 'neutral'],
    question: 'What is the identity matrix?',
    answer:
      'The matrix that does nothing — ones on the diagonal, zeros elsewhere. $Iv = v$ for any vector v. It is the matrix version of multiplying by 1. NumPy: `np.eye(n)`.',
    code: 'import numpy as np\n\nI = np.eye(3)\nv = np.array([1, 2, 3])\nprint(I @ v)   # [1. 2. 3.] — unchanged',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-inverse-determinant' },
  },
  {
    id: 'la-inverse-matrix',
    keywords: ['inverse', 'undo', 'A inverse', 'invertible'],
    question: 'What is the inverse of a matrix?',
    answer:
      'The matrix that undoes A: $A A^{-1} = I$. Only exists when the determinant is not zero. In NumPy: `np.linalg.inv(A)`. In practice, avoid computing it directly — use `np.linalg.solve` instead.',
    code: 'import numpy as np\n\nA = np.array([[4.0, 7.0],\n              [2.0, 6.0]])\nA_inv = np.linalg.inv(A)\nprint(np.round(A @ A_inv, 6))   # identity',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-inverse-determinant' },
  },
  {
    id: 'la-determinant',
    keywords: ['determinant', 'det', 'area', 'singular'],
    question: 'What is the determinant?',
    answer:
      'A single number that captures how much a matrix scales area (in 2D) or volume (in 3D). For 2×2: `det = ad - bc`. Zero determinant means the matrix is **singular** — it collapses space and has no inverse. Negative determinant flips orientation.',
    code: 'import numpy as np\n\nA = np.array([[3, 1],\n              [2, 4]])\nprint(np.linalg.det(A))   # 10.0',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-inverse-determinant' },
  },
  {
    id: 'la-linear-system',
    keywords: ['linear system', 'Ax = b', 'solve', 'equations'],
    question: 'How do I solve a linear system Ax = b?',
    answer:
      'Use `np.linalg.solve(A, b)`. It is faster and more numerically stable than computing `inv(A) @ b`. Only works when A is square and invertible. For over-determined systems (more rows than columns), use `np.linalg.lstsq`.',
    code: 'import numpy as np\n\nA = np.array([[2, 3],\n              [4, 5]])\nb = np.array([8, 14])\nx = np.linalg.solve(A, b)\nprint(x)          # [1. 2.]\nprint(A @ x)      # [8. 14.] — verifies',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-linear-systems' },
  },
  {
    id: 'la-least-squares',
    keywords: ['least squares', 'lstsq', 'regression', 'overdetermined'],
    question: 'What is least squares?',
    answer:
      'When a system $Ax = b$ has no exact solution (more equations than unknowns — the usual case in ML), we find the x that minimises the sum of squared errors $\\|Ax - b\\|^2$. NumPy: `np.linalg.lstsq`. This is linear regression from scratch.',
    code: 'import numpy as np\n\nx = np.linspace(0, 10, 50)\ny = 3 * x + 5 + np.random.normal(0, 1, 50)\n\nX = np.column_stack([x, np.ones_like(x)])\ncoeffs, *_ = np.linalg.lstsq(X, y, rcond=None)\nprint(coeffs)   # ~[3, 5]',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-linear-systems' },
  },
  {
    id: 'la-orthogonality',
    keywords: ['orthogonal', 'perpendicular', 'dot product zero'],
    question: 'What does it mean for two vectors to be orthogonal?',
    answer:
      'Perpendicular — their dot product is zero. Orthogonal directions carry **independent information** — knowing one tells you nothing about the other. In ML, orthogonal features are ideal (no redundancy).',
    code: 'import numpy as np\n\nu = np.array([1, 0])\nv = np.array([0, 1])\nprint(u @ v)   # 0 — orthogonal\n\n# Also: (1, 1) and (1, -1)\nprint(np.array([1, 1]) @ np.array([1, -1]))   # 0',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-dot-product-deep' },
  },
  {
    id: 'la-projection',
    keywords: ['projection', 'project', 'shadow', 'component along'],
    question: 'What is a projection?',
    answer:
      'The "shadow" of one vector cast onto another. $\\text{proj}_v(u) = \\frac{u \\cdot v}{\\|v\\|^2} v$. It is a vector pointing along v. Projections power least squares, PCA, and Fourier analysis — breaking a vector into "part along v" and "part perpendicular".',
    code: 'import numpy as np\n\nu = np.array([3.0, 3.0])\nv = np.array([4.0, 0.0])\n\nproj = (u @ v) / (v @ v) * v\nprint(proj)    # [3. 0.] — the horizontal shadow of u',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-dot-product-deep' },
  },
  {
    id: 'la-eigen',
    keywords: ['eigenvalue', 'eigenvector', 'eigen', 'special direction'],
    question: 'What are eigenvalues and eigenvectors?',
    answer:
      'A **special direction** that does not rotate when the matrix is applied — it only stretches or shrinks. Mathematically, $A v = \\lambda v$, where $\\lambda$ (the eigenvalue) is the stretch factor. NumPy: `np.linalg.eig(A)`.',
    code: 'import numpy as np\n\nA = np.array([[2, 1],\n              [1, 2]])\nvals, vecs = np.linalg.eig(A)\nprint(vals)    # [3. 1.] — the two eigenvalues',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-eigen' },
  },
  {
    id: 'la-pca',
    keywords: ['PCA', 'principal component', 'dimensionality reduction', 'compress'],
    question: 'What is PCA?',
    answer:
      'Principal Component Analysis — a technique to compress high-dimensional data by finding the directions of maximum variance. Those directions are the **eigenvectors** of the covariance matrix. You keep the top-k and drop the rest. Used for visualisation, noise removal, and faster training.',
    code: 'import numpy as np\n\n# Center the data\nX_c = X - X.mean(axis=0)\n\n# Covariance matrix\nC = X_c.T @ X_c / len(X_c)\n\n# Eigen-decomposition\nvals, vecs = np.linalg.eigh(C)\n\n# Top-k directions (largest eigenvalues)\ntop_k = vecs[:, -3:]',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-eigen' },
  },
  {
    id: 'la-attention-mechanism',
    keywords: ['attention', 'transformer', 'self attention', 'QKV'],
    question: 'How does attention in transformers work?',
    answer:
      'Every word is embedded as a vector. To decide which other words matter, the model computes **dot products** between every pair of word vectors — high dot product = relevant. The formula is $\\text{softmax}(QK^T / \\sqrt{d}) V$. That is the entire mechanism inside GPT, Claude, and every modern chatbot.',
    code: '# Attention is literally dot products + a weighted average\n# scores = Q @ K.T          # every pair of dot products\n# weights = softmax(scores) # turn into probabilities\n# output = weights @ V      # weighted average',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-capstone' },
  },
  {
    id: 'la-why-matters',
    keywords: ['why linear algebra', 'why learn', 'ML math', 'AI math'],
    question: 'Why does linear algebra matter for AI?',
    answer:
      'Because **every ML model is built from it**. Data is a matrix (rows = examples). Weights are matrices (learned transformations). Predictions are matrix multiplications. Similarity is a dot product. Compression is eigen-decomposition. If you can think in vectors and matrices, you can read any ML paper.',
    code: '# Every layer of a neural network:\n# output = activation(X @ W + b)\n#\n# X — batch of examples (matrix)\n# W — learned weights (matrix)\n# b — bias (vector)\n# @ — matrix multiply',
    lessonLink: { moduleId: 'linear-algebra', lessonId: 'la-capstone' },
  },

  /* ═══════════════════════════════════════════
     CALCULUS — TOP LEVEL
     ═══════════════════════════════════════════ */
  {
    id: 'what-is-calculus',
    keywords: ['calculus', 'what is calculus', 'define calculus', 'calculus overview', 'math of change'],
    question: 'What is calculus?',
    answer:
      'The mathematics of **change**. While algebra deals with static values, calculus studies how things change — how fast, in which direction, and how the rate itself changes. Two big ideas: **derivatives** (rates of change, slopes) and **integrals** (accumulation, areas). In AI, calculus is what makes learning possible — every training step uses derivatives to reduce error.',
    code: '# Calculus in one line of code:\n#   loss = (prediction - actual)²\n#   derivative tells us which way to nudge the weights\n#   move weights a tiny step in the opposite direction\n#   repeat millions of times\n# That IS training an AI.',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-functions' },
  },
  {
    id: 'why-learn-calculus',
    keywords: ['why calculus', 'why learn calculus', 'calculus use', 'calculus ML', 'calculus AI', 'calculus important'],
    question: 'Why do we need calculus for AI?',
    answer:
      'Because **training a model means minimising a loss function** — and finding minima requires derivatives. The gradient (a collection of derivatives) tells the optimiser which way to move each weight. Without calculus, there is no gradient descent, no backprop, no deep learning. Calculus is literally the engine of AI.',
    code: '# Every training step:\n#   1. Forward pass: predict output\n#   2. Compute loss\n#   3. Compute gradient (calculus!)\n#   4. Update weights: w -= lr * grad\n#   5. Repeat',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-gradient-descent' },
  },
  {
    id: 'calculus-vs-algebra',
    keywords: ['calculus vs algebra', 'difference algebra calculus', 'static dynamic math'],
    question: 'What is the difference between algebra and calculus?',
    answer:
      '**Algebra** studies static relationships — "if x = 3, then y = 9". **Calculus** studies dynamic relationships — "how fast does y change when x changes?" Algebra answers "what is the value", calculus answers "how does the value change". AI is dynamic — weights move, loss changes, so AI needs calculus.',
    code: '# Algebra:      f(3) = 9          — a single value\n# Calculus:     f\'(3) = 6         — how fast f is changing at x=3\n# ML uses the second one — how to change weights.',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-derivatives-intro' },
  },
  {
    id: 'calc-what-is-function',
    keywords: ['function', 'what is function', 'f(x)', 'input output'],
    question: 'What is a function?',
    answer:
      'A rule that takes an input and produces exactly one output. Written $f(x)$. Every ML model is a function — it takes an input (an image, a sentence) and returns an output (a prediction).',
    code: 'def f(x):\n    return x ** 2\n\nprint(f(3))    # 9',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-functions' },
  },
  {
    id: 'calc-domain-range',
    keywords: ['domain', 'range', 'input', 'output', 'valid inputs'],
    question: 'What are the domain and range of a function?',
    answer:
      '**Domain** — the set of all valid inputs the function accepts. **Range** — the set of all outputs it can produce. For $f(x) = \\sqrt{x}$, the domain is $x \\geq 0$ — you cannot take the square root of a negative number (in real numbers).',
    code: 'import math\n\n# math.sqrt(-1) raises ValueError — not in the domain\nmath.sqrt(4)   # 2 — valid',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-functions' },
  },
  {
    id: 'calc-rate-of-change',
    keywords: ['rate of change', 'average rate', 'speed', 'slope', 'delta'],
    question: 'What is a rate of change?',
    answer:
      'How much the output changes when the input changes. Average rate = $\\frac{\\Delta y}{\\Delta x} = \\frac{f(b) - f(a)}{b - a}$. Geometrically, it is the slope of the secant line between two points.',
    code: '# Average speed: 180 km in 3 hours\nrate = 180 / 3\nprint(rate)   # 60 km/h',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-rate-of-change' },
  },
  {
    id: 'calc-secant-vs-tangent',
    keywords: ['secant', 'tangent', 'difference', 'slope'],
    question: 'What is the difference between a secant line and a tangent line?',
    answer:
      'A **secant** line connects two points on a curve — its slope is the average rate of change. A **tangent** line touches one point and matches the curve\'s direction there — its slope is the instantaneous rate of change (the derivative). Shrinking the secant interval makes it approach the tangent.',
    code: '# Secant slope between x=1 and x=2 on f(x)=x²:\n# (4 - 1) / (2 - 1) = 3\n# Tangent slope at x=1 is 2 — the secant moves toward it as the interval shrinks.',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-rate-of-change' },
  },
  {
    id: 'calc-limits',
    keywords: ['limit', 'lim', 'approach', 'infinity', 'as x approaches'],
    question: 'What is a limit?',
    answer:
      'The value that $f(x)$ approaches as $x$ gets arbitrarily close to some point — even if the function is not defined there. Written $\\lim_{x \\to a} f(x) = L$. Limits give meaning to "instantaneous rate of change".',
    code: '# Limit of (x² - 1)/(x - 1) as x → 1\n# Direct substitution gives 0/0 — undefined\n# But simplify: (x-1)(x+1)/(x-1) = x+1 → 2\nprint("Limit is 2")',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-limits' },
  },
  {
    id: 'calc-derivative',
    keywords: ['derivative', 'dy/dx', 'f prime', 'instantaneous rate', 'slope at a point'],
    question: 'What is a derivative?',
    answer:
      'The instantaneous rate of change of a function. Defined as the limit $f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$. Geometrically, it is the slope of the tangent line. In ML, gradients are derivatives of the loss.',
    code: '# Derivative of x² is 2x\n# At x = 3, slope = 6\n# At x = 0, slope = 0 (flat — minimum)',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-derivatives-intro' },
  },
  {
    id: 'calc-derivative-notation',
    keywords: ['notation', 'dy/dx', 'f prime', 'leibniz', 'lagrange', 'notation derivative'],
    question: 'What are the notations for a derivative?',
    answer:
      'Four common ones: $f\'(x)$ (Lagrange prime), $\\frac{dy}{dx}$ (Leibniz), $\\frac{df}{dx}$, and $Df(x)$ (Euler). All mean the same thing. ML papers usually use $\\frac{\\partial L}{\\partial w}$ for partial derivatives of the loss.',
    code: '# In symbolic form:\n#   f\'(x)   =   dy/dx   =   df/dx   =   Df(x)',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-derivatives-intro' },
  },
  {
    id: 'calc-power-rule',
    keywords: ['power rule', 'x^n', 'differentiate power'],
    question: 'What is the power rule?',
    answer:
      'The workhorse of differentiation: $\\frac{d}{dx}[x^n] = n x^{n-1}$. Bring the exponent down, subtract one. Works for any real $n$ — positive, negative, fractions.',
    code: '# d/dx[x²]  = 2x\n# d/dx[x³]  = 3x²\n# d/dx[x¹⁰] = 10x⁹\n# d/dx[√x]  = 1/(2√x)',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-derivative-rules' },
  },
  {
    id: 'calc-sum-rule',
    keywords: ['sum rule', 'add', 'combine derivatives'],
    question: 'What is the sum rule?',
    answer:
      'The derivative of a sum is the sum of derivatives: $(f + g)\' = f\' + g\'$. Differentiate each term separately. Makes long polynomials easy.',
    code: '# d/dx[x³ + 5x² − 3x + 7] = 3x² + 10x − 3',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-derivative-rules' },
  },
  {
    id: 'calc-product-rule',
    keywords: ['product rule', 'multiply', 'fg', 'differentiate product'],
    question: 'What is the product rule?',
    answer:
      'The derivative of a product: $(f \\cdot g)\' = f\'g + fg\'$. Derivative of the first times the second, plus the first times the derivative of the second. NOT just the product of the derivatives.',
    code: '# d/dx[x² · sin(x)] = 2x·sin(x) + x²·cos(x)',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-derivative-rules' },
  },
  {
    id: 'calc-chain-rule',
    keywords: ['chain rule', 'compose', 'nested', 'inner outer', 'backprop'],
    question: 'What is the chain rule?',
    answer:
      'For composed functions: $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$. Outer derivative times inner derivative. The single most important rule in all of ML — it is what makes backpropagation possible.',
    code: '# d/dx[sin(x²)] = cos(x²) · 2x\n# d/dx[e^(2x)]  = e^(2x) · 2\n# d/dx[(3x+2)⁴] = 4(3x+2)³ · 3',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-chain-rule-deep' },
  },
  {
    id: 'calc-common-derivatives',
    keywords: ['common derivatives', 'e^x', 'ln(x)', 'sin', 'cos', 'reference'],
    question: 'What are the most common derivatives I should memorise?',
    answer:
      '$e^x \\to e^x$, $\\ln(x) \\to 1/x$, $\\sin(x) \\to \\cos(x)$, $\\cos(x) \\to -\\sin(x)$, $\\tan(x) \\to \\sec^2(x)$. Plus the power rule $x^n \\to nx^{n-1}$. These cover 90% of what you will see in ML.',
    code: '# d/dx[eˣ]   = eˣ       — exponential is its own derivative\n# d/dx[ln x]  = 1/x\n# d/dx[sin x] = cos x\n# d/dx[cos x] = −sin x',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-common-derivatives' },
  },
  {
    id: 'calc-second-derivative',
    keywords: ['second derivative', 'f double prime', 'curvature', 'concavity'],
    question: 'What is the second derivative?',
    answer:
      'The derivative of the derivative. Measures how the slope changes — the curvature of the curve. $f\'\'(x) > 0$ → concave up (valley shape). $f\'\'(x) < 0$ → concave down (peak shape). Used to classify critical points.',
    code: '# f(x)  = x²\n# f\'(x) = 2x\n# f\'\'(x) = 2  — always positive → concave up',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-second-derivative' },
  },
  {
    id: 'calc-critical-points',
    keywords: ['critical point', 'minimum', 'maximum', 'peak', 'valley', 'stationary'],
    question: 'How do I find a peak or valley of a function?',
    answer:
      'Set $f\'(x) = 0$ — critical points. Then use the second derivative to classify: $f\'\' > 0$ → minimum (valley); $f\'\' < 0$ → maximum (peak); $f\'\' = 0$ → inconclusive (test more, maybe saddle).',
    code: '# f(x) = x² - 4x + 5\n# f\'(x) = 2x - 4 = 0  →  x = 2\n# f\'\'(x) = 2 > 0      →  minimum at x = 2',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-second-derivative' },
  },
  {
    id: 'calc-partial-derivative',
    keywords: ['partial derivative', 'partial', 'many variables', '∂f/∂x'],
    question: 'What is a partial derivative?',
    answer:
      'Derivative with respect to ONE variable while treating all others as constants. Written with curly ∂: $\\frac{\\partial f}{\\partial x}$. Essential for ML — the loss depends on millions of weights, and each partial tells you how one weight affects it.',
    code: '# f(x, y) = x² + 3xy + y³\n# ∂f/∂x = 2x + 3y     (treat y as a number)\n# ∂f/∂y = 3x + 3y²    (treat x as a number)',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-partial-derivatives' },
  },
  {
    id: 'calc-gradient',
    keywords: ['gradient', '∇', 'nabla', 'vector of partials', 'steepest ascent'],
    question: 'What is the gradient?',
    answer:
      'The vector of all partial derivatives: $\\nabla f = [\\partial f/\\partial x, \\partial f/\\partial y, \\ldots]$. It points in the direction of **steepest ascent**. Its magnitude is the slope in that direction. Every ML training step uses the gradient of the loss.',
    code: 'import numpy as np\n\n# Gradient of f(x,y) = x² + y² is [2x, 2y]\ndef grad(x, y):\n    return np.array([2*x, 2*y])\n\nprint(grad(3, 4))   # [6 8]',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-gradient' },
  },
  {
    id: 'calc-gradient-descent',
    keywords: ['gradient descent', 'training', 'optimizer', 'learn', 'update rule'],
    question: 'What is gradient descent?',
    answer:
      'The algorithm that trains every neural network. Step in the negative gradient direction: $w \\leftarrow w - \\alpha \\nabla L(w)$. The gradient points uphill; going opposite direction reduces the loss. Repeat until convergence.',
    code: '# Simple gradient descent on L(w) = w²\nw = 4.0\nlr = 0.1\nfor _ in range(10):\n    grad = 2 * w       # dL/dw = 2w\n    w -= lr * grad\nprint(w)   # ~0 (converging to minimum)',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-gradient-descent' },
  },
  {
    id: 'calc-learning-rate',
    keywords: ['learning rate', 'alpha', 'step size', 'lr'],
    question: 'What is the learning rate?',
    answer:
      'The size of the step in gradient descent, usually called $\\alpha$ (alpha). Too small → training is slow. Too large → overshoots and diverges. Modern ML uses adaptive schedules and optimisers like Adam to tune it automatically.',
    code: '# Too small:  lr = 1e-8  → crawls\n# Just right: lr = 0.01  → converges\n# Too large:  lr = 10    → explodes',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-gradient-descent' },
  },
  {
    id: 'calc-sgd',
    keywords: ['SGD', 'stochastic gradient descent', 'mini batch', 'batch'],
    question: 'What is stochastic gradient descent (SGD)?',
    answer:
      'Gradient descent using a small random batch of examples instead of the full dataset. Much faster, and the noise helps escape saddle points. Standard batch sizes: 32, 64, 128. This is what `batch_size` means in every ML framework.',
    code: '# For each batch (e.g., 32 examples):\n#   grad = gradient of loss on that batch\n#   w -= lr * grad\n# Repeat until all data is seen (one epoch)',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-gradient-descent' },
  },
  {
    id: 'calc-saddle-point',
    keywords: ['saddle', 'saddle point', 'critical point', 'optimization trap'],
    question: 'What is a saddle point?',
    answer:
      'A critical point (gradient = 0) that is a minimum in some directions and a maximum in others. Looks like a mountain pass. Gradient descent can stall there. Very common in deep learning because of high dimensionality. SGD noise helps escape.',
    code: '# f(x, y) = x² − y²\n# ∇f = [2x, -2y]\n# At (0, 0): gradient = 0, but it is a saddle\n# Curve up in x-direction, down in y-direction',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-optimization' },
  },
  {
    id: 'calc-backprop',
    keywords: ['backpropagation', 'backprop', 'backward pass', 'gradients neural network'],
    question: 'What is backpropagation?',
    answer:
      'The algorithm that computes gradients through a neural network. It applies the chain rule backward, from the loss to the earliest layer, reusing intermediate values. Without it, training a deep network would be computationally impossible. It is the engine of all modern AI.',
    code: '# For each layer (from output back to input):\n#   grad_layer = grad_next_layer * d(layer)/d(input)\n# Backprop = the chain rule applied systematically,\n#            cached and reused for efficiency.',
    lessonLink: { moduleId: 'calculus', lessonId: 'calc-chain-rule-deep' },
  },

  /* ═══════════════════════════════════════════
     WEB / ML / DL / CAREER (preview)
     ═══════════════════════════════════════════ */
  {
    id: 'flask-vs-django',
    keywords: ['flask', 'django', 'difference', 'web', 'framework'],
    question: 'Flask vs Django — which should I learn?',
    answer:
      'Flask: minimal, flexible, you bring the pieces. Best for small APIs and learning. Django: batteries-included — ORM, admin, auth, templates. Best for full apps. Learn Flask first for concepts, then Django for production.',
  },
  {
    id: 'how-to-start-ml',
    keywords: ['ml', 'machine learning', 'start', 'begin', 'roadmap'],
    question: 'How do I start learning Machine Learning?',
    answer:
      'Order: (1) Python + NumPy + Pandas, (2) matplotlib for visuals, (3) scikit-learn basics (fit/predict), (4) 3-4 classic datasets (Iris, Titanic, Boston Housing), (5) one real project end-to-end. Skip deep learning until you have shipped 3 ML projects.',
  },
  {
    id: 'ml-algorithm-choice',
    keywords: ['algorithm', 'which', 'choose', 'ml', 'model'],
    question: 'Which ML algorithm should I use?',
    answer:
      'Start simple. Tabular classification: Logistic Regression → Random Forest → XGBoost. Tabular regression: Linear Regression → Random Forest. Images: CNNs. Text: Transformers. Always try the simple baseline first — you might not need deep learning.',
  },
  {
    id: 'ml-vs-dl',
    keywords: ['ml', 'dl', 'difference', 'vs', 'machine learning', 'deep learning'],
    question: 'What is the difference between ML and DL?',
    answer:
      'ML: algorithms that learn from data, often with hand-crafted features (regression, trees, SVM). DL: neural networks that learn features too — layers of transformation. DL needs more data and compute; ML is often enough.',
  },
  
  /* ═══════════════════════════════════════════
     MACHINE LEARNING — TOP LEVEL
     ═══════════════════════════════════════════ */
  {
    id: 'what-is-ml',
    keywords: ['machine learning', 'what is ml', 'ml overview', 'define ml', 'define machine learning'],
    question: 'What is Machine Learning?',
    answer:
      'A way of programming where instead of writing rules by hand, you **feed examples and let the computer find the rules**. You provide inputs and correct outputs, and the algorithm discovers the mapping. Every modern AI system works this way.',
    code: '# Traditional: you write the rules\n#   if email has "FREE": mark spam\n\n# ML: you show examples\n#   trained model learns the rule automatically',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-what-is-ml' },
  },
  {
    id: 'why-ml',
    keywords: ['why machine learning', 'why ml', 'why learn ml', 'ml important'],
    question: 'Why do we need Machine Learning?',
    answer:
      'Some problems have rules that are easy to show by example but nearly impossible to write down — "what makes a face?", "what makes a sentence funny?". ML lets you solve these by example instead of by explicit logic. It is also the foundation of ChatGPT, image recognition, recommendations, and self-driving cars.',
    code: '# Problems too hard to write rules for:\n#   - face recognition\n#   - language translation\n#   - spam detection (spammers keep evolving)\n#   - medical diagnosis\n# ML solves these by learning from data.',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-what-is-ml' },
  },
  {
    id: 'ml-vs-traditional',
    keywords: ['ml vs traditional', 'traditional programming', 'difference ml'],
    question: 'What is the difference between traditional programming and ML?',
    answer:
      '**Traditional:** Input + Rules (written by human) → Output. **ML:** Input + Output (examples) → Rules (learned automatically). You write the logic in traditional programming; the algorithm learns it in ML.',
    code: '# Traditional\n#   input: number, rule: "square it", output: result\n\n# ML\n#   input: examples, output: labels\n#   learned rule: the model itself',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-what-is-ml' },
  },
  {
    id: 'supervised-learning',
    keywords: ['supervised', 'supervised learning', 'labeled data'],
    question: 'What is supervised learning?',
    answer:
      'Learning from **labelled examples** — each input comes with the correct output. The model learns the mapping from input to output. Most real ML is supervised: spam detection, image classification, price prediction, speech recognition.',
    code: '# Supervised data:\n#   (features, label)\n#   (size=1000, price=48)\n#   (size=1500, price=72)\n# The model learns: price = f(size)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-what-is-ml' },
  },
  {
    id: 'unsupervised-learning',
    keywords: ['unsupervised', 'unsupervised learning', 'no labels', 'clustering'],
    question: 'What is unsupervised learning?',
    answer:
      'Learning from **unlabeled data** — the model finds structure on its own. Common tasks: clustering (group similar items), anomaly detection (find outliers), dimensionality reduction (compress features). No correct answers are provided.',
    code: '# Unsupervised data — just points, no labels\n# Model discovers: "these 3 groups exist"\n# Applications:\n#   - customer segmentation\n#   - topic discovery in text\n#   - fraud detection',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-kmeans' },
  },
  {
    id: 'reinforcement-learning',
    keywords: ['reinforcement', 'reinforcement learning', 'rl', 'reward'],
    question: 'What is reinforcement learning?',
    answer:
      'Learning by **interacting with an environment and receiving rewards**. An agent takes actions, observes the consequences, and adjusts to maximize long-term reward. This is how AlphaGo beat the world champion at Go, and how robots learn to walk.',
    code: '# RL loop:\n#   agent observes state\n#   takes an action\n#   receives reward (positive or negative)\n#   updates its policy\n#   repeat, learning from experience',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-what-is-ml' },
  },
  {
    id: 'regression-vs-classification',
    keywords: ['regression vs classification', 'difference regression classification'],
    question: 'What is the difference between regression and classification?',
    answer:
      '**Regression** predicts a continuous number (price, temperature, stock return). **Classification** predicts a category (spam/not-spam, cat/dog, digit 0-9). Different output types, different loss functions, different metrics.',
    code: '# Regression:  y = 47.3 (a number)\n# Classification: y = "spam" (a category)\n#                  y = 2 (which of 10 digits)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-classification' },
  },
  {
    id: 'features-and-labels',
    keywords: ['feature', 'label', 'target', 'input', 'output'],
    question: 'What are features and labels?',
    answer:
      '**Features** — the input. The description of the thing. For a house: size, rooms, location, age. **Label** (or target) — the output we want to predict. For a house: its price. Every supervised example is (features, label).',
    code: '# Training example:\n#   features: [1200, 4, 5]      (size, rooms, age)\n#   label:    75                (price in lakhs)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-what-is-ml' },
  },

  /* ── REGRESSION ─────────────────────────── */
  {
    id: 'what-is-linear-regression',
    keywords: ['linear regression', 'regression', 'line fit', 'best fit line'],
    question: 'What is linear regression?',
    answer:
      'The simplest ML model. It fits a **straight line** through the data: $y = mx + c$. Two parameters (slope m and intercept c) found by gradient descent. Fast, interpretable, and surprisingly effective — always try it first.',
    code: 'import numpy as np\n\n# Data\nx = np.array([500, 800, 1000, 1500, 2000], dtype=float)\ny = np.array([25, 40, 48, 72, 95], dtype=float)\n\n# Closed-form via least squares\nX = np.column_stack([x, np.ones_like(x)])\ncoeffs, *_ = np.linalg.lstsq(X, y, rcond=None)\nprint(f"y = {coeffs[0]:.4f}x + {coeffs[1]:.2f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-linear-regression' },
  },
  {
    id: 'multiple-linear-regression',
    keywords: ['multiple regression', 'multi feature', 'matrix regression'],
    question: 'How does linear regression work with multiple features?',
    answer:
      'Instead of one slope, you have one weight per feature. Written as a matrix product: $\\hat{y} = Xw + b$. This is exactly the matrix-vector multiplication from Linear Algebra. All weights can be found at once using least squares.',
    code: 'import numpy as np\n\n# X: 5 examples, 3 features each\nX = np.array([\n    [500, 2, 20],\n    [800, 3, 10],\n    [1200, 4, 5],\n    [1800, 4, 2],\n    [2500, 5, 1],\n], dtype=float)\ny = np.array([25, 40, 60, 95, 140], dtype=float)\n\nX_with_bias = np.column_stack([X, np.ones(len(X))])\nw, *_ = np.linalg.lstsq(X_with_bias, y, rcond=None)\nprint("Weights:", w[:3].round(3))\nprint("Bias:   ", round(w[3], 2))',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-linear-regression' },
  },

  /* ── LOSS FUNCTIONS ─────────────────────── */
  {
    id: 'what-is-loss',
    keywords: ['loss', 'loss function', 'cost function', 'error', 'objective'],
    question: 'What is a loss function?',
    answer:
      'A formula that measures how wrong your model is. It turns predictions and true values into a **single number**. Training means minimising this number. Smaller loss = better model.',
    code: '# Loss(y_pred, y_true) → a single number\n# The whole training loop:\n#   1. Predict\n#   2. Compute loss\n#   3. Compute gradient of loss\n#   4. Adjust parameters to reduce loss',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-loss-functions' },
  },
  {
    id: 'mse',
    keywords: ['mse', 'mean squared error', 'squared error', 'regression loss'],
    question: 'What is Mean Squared Error (MSE)?',
    answer:
      'The standard loss for regression. Squares each error and averages them: $\\frac{1}{n} \\sum (\\hat{y}_i - y_i)^2$. Squaring makes errors positive and heavily penalises large mistakes — good when big errors are much worse than small ones.',
    code: 'import numpy as np\n\ny_true = np.array([3.0, 5.0, 7.0])\ny_pred = np.array([2.5, 5.2, 6.8])\n\nmse = np.mean((y_pred - y_true) ** 2)\nprint(f"MSE: {mse:.4f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-loss-functions' },
  },
  {
    id: 'mae',
    keywords: ['mae', 'mean absolute error', 'absolute error', 'robust loss'],
    question: 'What is Mean Absolute Error (MAE)?',
    answer:
      'The sum of absolute differences: $\\frac{1}{n} \\sum |\\hat{y}_i - y_i|$. Less aggressive than MSE — treats all errors proportionally. **Robust to outliers**, so use MAE when your data has noisy extremes.',
    code: 'import numpy as np\n\ny_true = np.array([3.0, 5.0, 7.0])\ny_pred = np.array([2.5, 5.2, 6.8])\n\nmae = np.mean(np.abs(y_pred - y_true))\nprint(f"MAE: {mae:.4f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-loss-functions' },
  },
  {
    id: 'cross-entropy',
    keywords: ['cross entropy', 'cross-entropy', 'log loss', 'classification loss'],
    question: 'What is cross-entropy loss?',
    answer:
      'The standard loss for classification. It measures how "surprised" the model is by the truth. Confident correct predictions → tiny loss. Confident wrong predictions → huge loss. Uses logarithms, which is why it explodes near zero probability.',
    code: 'import numpy as np\n\n# True label 1, various predictions\nfor p in [0.9, 0.5, 0.1, 0.01]:\n    loss = -np.log(p)\n    print(f"p={p:.2f}, loss={loss:.3f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-loss-functions' },
  },

  /* ── OVERFITTING ────────────────────────── */
  {
    id: 'what-is-overfitting',
    keywords: ['overfitting', 'what is overfitting', 'memorize', 'generalize'],
    question: 'What is overfitting?',
    answer:
      'When a model **memorises the training data** (including its noise) instead of learning the underlying pattern. It does great on training data, poorly on new data. The single most important problem in ML.',
    code: '# Sign of overfitting:\n#   train accuracy = 99%\n#   test accuracy  = 55%\n# Fixes:\n#   - more data\n#   - simpler model\n#   - regularization\n#   - early stopping',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-overfitting' },
  },
  {
    id: 'underfitting',
    keywords: ['underfitting', 'too simple', 'high bias'],
    question: 'What is underfitting?',
    answer:
      'When a model is **too simple** to capture the pattern in the data. It performs poorly on both training and test sets. Fix by using a more flexible model or adding better features.',
    code: '# Sign of underfitting:\n#   train accuracy = 55%\n#   test accuracy  = 52%\n# The model has not learned enough. Try a more complex model.',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-overfitting' },
  },
  {
    id: 'train-test-split',
    keywords: ['train test split', 'validation', 'holdout', 'split data'],
    question: 'Why do we split data into train/test?',
    answer:
      'To check whether the model **generalises** to data it has never seen. Train on ~80%, test on ~20%. The test set is the only honest measure of real-world performance. Never train on the test set.',
    code: 'from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-overfitting' },
  },
  {
    id: 'regularization-l1-l2',
    keywords: ['regularization', 'l1', 'l2', 'ridge', 'lasso', 'weight decay'],
    question: 'What is regularization (L1 and L2)?',
    answer:
      'Adding a penalty for large weights to the loss function. **L2 (ridge)** adds $\\lambda \\sum w_i^2$ — smooths weights toward zero. **L1 (lasso)** adds $\\lambda \\sum |w_i|$ — drives some weights exactly to zero (feature selection). Both reduce overfitting.',
    code: 'from sklearn.linear_model import Ridge, Lasso\n\nridge = Ridge(alpha=1.0)   # L2\nlasso = Lasso(alpha=0.1)   # L1',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-overfitting' },
  },

  /* ── CLASSIFICATION ─────────────────────── */
  {
    id: 'what-is-classification',
    keywords: ['classification', 'classifier', 'binary classification', 'multiclass'],
    question: 'What is classification?',
    answer:
      'Predicting a **category** instead of a number. Binary = two classes (spam/not-spam). Multiclass = three or more (digit 0-9). The model outputs a probability per class, then picks the highest.',
    code: '# Binary:\n#   {0: "not spam", 1: "spam"}\n#\n# Multiclass (digits):\n#   {0: 0.05, 1: 0.02, ..., 7: 0.89, ...}\n#   predicted class = argmax = 7',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-classification' },
  },
  {
    id: 'sigmoid-function',
    keywords: ['sigmoid', 'logistic', 'squash', 'probability function'],
    question: 'What is the sigmoid function?',
    answer:
      'A function that squashes any real number into the range (0, 1): $\\sigma(z) = \\frac{1}{1 + e^{-z}}$. Used to convert model scores into probabilities for binary classification. $\\sigma(0) = 0.5$ — the decision boundary.',
    code: 'import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\nprint(sigmoid(-5))   # ~0.007\nprint(sigmoid(0))    # 0.5\nprint(sigmoid(5))    # ~0.993',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-classification' },
  },
  {
    id: 'logistic-regression',
    keywords: ['logistic regression', 'logistic', 'linear classifier'],
    question: 'What is logistic regression?',
    answer:
      'A linear classifier — linear regression followed by a sigmoid. Compute $z = w \\cdot x + b$, then squash through sigmoid to get a probability. Simple, fast, interpretable. The default first classifier to try.',
    code: 'from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\nprobs = model.predict_proba(X_test)   # probabilities',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-classification' },
  },
  {
    id: 'softmax',
    keywords: ['softmax', 'multiclass', 'probability distribution', 'argmax'],
    question: 'What is softmax?',
    answer:
      'The multiclass version of sigmoid. Takes a vector of scores and returns a probability distribution over all classes that sums to 1. $\\text{softmax}(z)_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$. Every image classifier and GPT uses it.',
    code: 'import numpy as np\n\ndef softmax(z):\n    exp_z = np.exp(z - np.max(z))   # numerical stability\n    return exp_z / exp_z.sum()\n\nscores = np.array([2.0, 1.0, 0.1])\nprint(softmax(scores).round(3))\n# [0.659 0.242 0.099]',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-classification' },
  },

  /* ── METRICS ────────────────────────────── */
  {
    id: 'confusion-matrix',
    keywords: ['confusion matrix', 'tp', 'fp', 'fn', 'tn', 'true positive'],
    question: 'What is a confusion matrix?',
    answer:
      'A 2×2 table showing how a classifier\'s predictions break down: True Positives, True Negatives, False Positives, False Negatives. From it, you compute precision, recall, and F1. Always the first thing to look at for a classifier.',
    code: 'from sklearn.metrics import confusion_matrix\n\ncm = confusion_matrix(y_true, y_pred)\n#  [[TN  FP]\n#   [FN  TP]]\nprint(cm)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-metrics' },
  },
  {
    id: 'accuracy',
    keywords: ['accuracy', 'correctness', 'accuracy metric'],
    question: 'What is accuracy?',
    answer:
      'The fraction of predictions that were correct: $(TP + TN) / (TP + TN + FP + FN)$. Simple and intuitive — but **misleading on imbalanced data**. A model that always predicts "not spam" gets 99% accuracy if 99% of emails are not spam.',
    code: 'from sklearn.metrics import accuracy_score\n\nacc = accuracy_score(y_true, y_pred)\nprint(f"Accuracy: {acc:.3f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-metrics' },
  },
  {
    id: 'precision-recall',
    keywords: ['precision', 'recall', 'precision recall', 'sensitivity'],
    question: 'What are precision and recall?',
    answer:
      '**Precision** = of all predicted positives, how many were correct: $\\frac{TP}{TP + FP}$. **Recall** = of all actual positives, how many we caught: $\\frac{TP}{TP + FN}$. There is always a tradeoff — improving one hurts the other.',
    code: 'from sklearn.metrics import precision_score, recall_score\n\nprec = precision_score(y_true, y_pred)\nrec  = recall_score(y_true, y_pred)\nprint(f"Precision: {prec:.3f}")\nprint(f"Recall:    {rec:.3f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-metrics' },
  },
  {
    id: 'f1-score',
    keywords: ['f1', 'f1 score', 'harmonic mean', 'combined metric'],
    question: 'What is the F1 score?',
    answer:
      'A single number combining precision and recall: $F_1 = 2 \\cdot \\frac{P \\cdot R}{P + R}$. High only when **both** are high. Uses harmonic mean so it punishes imbalanced precision/recall.',
    code: 'from sklearn.metrics import f1_score\n\nf1 = f1_score(y_true, y_pred)\nprint(f"F1: {f1:.3f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-metrics' },
  },
  {
    id: 'rmse-r2',
    keywords: ['rmse', 'r2', 'r squared', 'regression metric', 'coefficient of determination'],
    question: 'What are RMSE and R² for regression?',
    answer:
      '**RMSE** = root of MSE — same units as the target, punishes big errors. **R²** = fraction of variance explained. R² = 1 is perfect, R² = 0 means no better than always predicting the mean. R² < 0 means worse than baseline.',
    code: 'from sklearn.metrics import mean_squared_error, r2_score\nimport numpy as np\n\nrmse = np.sqrt(mean_squared_error(y_true, y_pred))\nr2   = r2_score(y_true, y_pred)\nprint(f"RMSE: {rmse:.3f}, R²: {r2:.3f}")',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-metrics' },
  },

  /* ── ALGORITHMS ─────────────────────────── */
  {
    id: 'decision-tree',
    keywords: ['decision tree', 'tree', 'gini', 'entropy', 'splitting'],
    question: 'What is a decision tree?',
    answer:
      'A sequence of yes/no questions about features, ending in a prediction. Each internal node asks about a feature, each branch is an answer, each leaf is a prediction. Interpretable, handles mixed data, no scaling needed. But overfits easily if left to grow.',
    code: 'from sklearn.tree import DecisionTreeClassifier\n\nmodel = DecisionTreeClassifier(max_depth=3, random_state=42)\nmodel.fit(X_train, y_train)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-decision-trees' },
  },
  {
    id: 'gini-impurity',
    keywords: ['gini', 'gini impurity', 'split quality', 'node purity'],
    question: 'What is Gini impurity?',
    answer:
      'A measure of how "mixed" a node is. $\\text{Gini} = 1 - \\sum p_i^2$. Zero for a pure node (all one class), 0.5 for a maximally mixed 50/50 node. Decision trees split on the question that reduces weighted Gini the most.',
    code: '# Pure node (all one class):\n#   Gini = 1 - (1² + 0²) = 0\n#\n# Mixed node (50/50):\n#   Gini = 1 - (0.5² + 0.5²) = 0.5',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-decision-trees' },
  },
  {
    id: 'random-forest',
    keywords: ['random forest', 'ensemble', 'bagging', 'forest'],
    question: 'What is a Random Forest?',
    answer:
      'An ensemble of many decision trees, each trained on a different bootstrap sample of the data, with random feature subsets at each split. Their predictions are averaged (or voted). The ensemble is far more accurate than any single tree.',
    code: 'from sklearn.ensemble import RandomForestClassifier\n\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\n# feature_importances_ tells you which features matter',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-random-forests' },
  },
  {
    id: 'bootstrap-sampling',
    keywords: ['bootstrap', 'sampling with replacement', 'bagging'],
    question: 'What is bootstrap sampling?',
    answer:
      'Drawing N examples from the dataset **with replacement** — some examples appear twice, some not at all. Roughly 37% are left out of each bootstrap sample. This is how Random Forests make each tree see slightly different data.',
    code: 'import numpy as np\n\nidx = np.random.choice(len(X), size=len(X), replace=True)\nX_boot = X[idx]\n# About 37% of original indices will be missing',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-random-forests' },
  },
  {
    id: 'knn',
    keywords: ['knn', 'k nearest neighbors', 'k-nearest', 'lazy learner'],
    question: 'What is k-Nearest Neighbors (k-NN)?',
    answer:
      'A classifier that finds the **k closest training points** to a new example and takes a majority vote. No training phase — it just stores data. Simple, but slow at prediction and suffers in high dimensions.',
    code: 'from sklearn.neighbors import KNeighborsClassifier\n\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-knn' },
  },
  {
    id: 'curse-of-dimensionality',
    keywords: ['curse of dimensionality', 'high dimension', 'distance fails'],
    question: 'What is the curse of dimensionality?',
    answer:
      'In very high dimensions (100+ features), distances between points concentrate — the closest and furthest point differ by only a few percent. "Nearest neighbor" loses meaning, so k-NN and other distance-based methods fail. Dimensionality reduction (like PCA) fixes this.',
    code: '# In 2D: distinct distances\n# In 100D: nearly all distances are equal\n# k-NN cannot distinguish "close" from "far"',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-knn' },
  },
  {
    id: 'kmeans-clustering',
    keywords: ['kmeans', 'k-means', 'clustering', 'unsupervised grouping'],
    question: 'What is k-Means clustering?',
    answer:
      'An unsupervised algorithm that partitions data into **k clusters** by minimizing the distance from each point to its cluster center. Alternates between (1) assigning points to nearest centroid and (2) updating centroids to the mean of their points.',
    code: 'from sklearn.cluster import KMeans\n\nmodel = KMeans(n_clusters=3, random_state=42)\nlabels = model.fit_predict(X)\nprint(model.cluster_centers_)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-kmeans' },
  },
  {
    id: 'elbow-method',
    keywords: ['elbow', 'choose k', 'elbow method', 'optimal clusters'],
    question: 'How do I choose the number of clusters in k-Means?',
    answer:
      'The **elbow method**. Run k-Means for k = 1, 2, 3, ..., and plot total within-cluster distance vs. k. This always decreases, but the rate slows dramatically at the "right" k. The bend (elbow) is a good choice.',
    code: '# Compute inertia for k = 1 to 10\n#   inertia = sum of squared distances to centroids\n# Plot: elbow at the "right" k',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-kmeans' },
  },

  /* ── FEATURE ENGINEERING ────────────────── */
  {
    id: 'feature-engineering',
    keywords: ['feature engineering', 'feature creation', 'feature importance'],
    question: 'What is feature engineering?',
    answer:
      'Creating new features from raw data to make the learning problem easier. Ratios (salary/experience), differences (end − start), bins (age → age_group), time features (hour, weekday). Often gives more accuracy improvement than switching algorithms.',
    code: 'import pandas as pd\n\n# Ratio feature\ndf["price_per_sqft"] = df["price"] / df["area_sqft"]\n\n# Time feature\ndf["hour"] = df["timestamp"].dt.hour\ndf["is_weekend"] = df["hour"].isin([0, 6]).astype(int)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-feature-engineering' },
  },
  {
    id: 'one-hot-encoding',
    keywords: ['one hot', 'one-hot encoding', 'encoding', 'categorical'],
    question: 'What is one-hot encoding?',
    answer:
      'Converting a categorical feature into multiple binary columns — one per category. "Delhi" → [1, 0, 0], "Mumbai" → [0, 1, 0]. Use for **nominal** categories (no ordering). Avoid label encoding for nominal data — it falsely implies ordering.',
    code: 'from sklearn.preprocessing import OneHotEncoder\n\nenc = OneHotEncoder(sparse_output=False)\nX_encoded = enc.fit_transform(df[["city"]])',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-feature-engineering' },
  },
  {
    id: 'standardization-scaling',
    keywords: ['standardization', 'scaling', 'z score', 'normalize'],
    question: 'Why do we standardize features?',
    answer:
      'Different features have wildly different scales. Age 0–100, salary 0–10,000,000. Distance-based algorithms (k-NN, k-Means) would be dominated by the bigger feature. Standardisation: $x\' = (x - \\mu)/\\sigma$ — mean 0, std 1.',
    code: 'from sklearn.preprocessing import StandardScaler\n\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)   # fit on train only!\nX_test_scaled  = scaler.transform(X_test)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-feature-engineering' },
  },
  {
    id: 'data-leakage',
    keywords: ['data leakage', 'leakage', 'cheating', 'fit on test'],
    question: 'What is data leakage?',
    answer:
      'When information from the test set contaminates training. Classic example: scaling features using statistics from the full dataset (including test). The model looks great in evaluation but fails in production. **Always fit transformations on the training set only**.',
    code: '# WRONG\nscaler.fit(X_full)                  # leaks test stats\n\n# RIGHT\nscaler.fit(X_train)                 # train stats only\nX_test_scaled = scaler.transform(X_test)',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-feature-engineering' },
  },

  /* ── CAPSTONE / WORKFLOW ────────────────── */
  {
    id: 'ml-workflow',
    keywords: ['ml workflow', 'ml pipeline', 'process', 'workflow'],
    question: 'What is the standard ML workflow?',
    answer:
      'Seven steps: **1.** Load data. **2.** Split into train/test. **3.** Engineer features. **4.** Choose model. **5.** Train. **6.** Evaluate. **7.** Interpret. Real projects loop 3–6 many times — better features usually beat fancier models.',
    code: '# The whole ML project in 7 lines:\n# df = pd.read_csv(...)                    # 1. load\n# X_tr, X_te = train_test_split(...)       # 2. split\n# X_tr = engineer(X_tr)                    # 3. features\n# model = LogisticRegression()             # 4. choose\n# model.fit(X_tr, y_tr)                    # 5. train\n# score = model.score(X_te, y_te)          # 6. evaluate\n# print(model.coef_)                       # 7. interpret',
    lessonLink: { moduleId: 'ml', lessonId: 'ml-capstone' },
  },
];