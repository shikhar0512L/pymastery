// 🐛 PyMastery Debug Helper
// Detects common Python errors and code smells in pasted text.

const ERROR_PATTERNS = [
  {
    match: /TypeError.*(can only concatenate str|unsupported operand type.*str)/i,
    cause: 'You are mixing strings and numbers with `+` (e.g. `"5" + 5`).',
    fix: 'Cast one side: `str(5)` or `int("5")`. Or use an f-string.',
    code: 'age = "25"\nprint("I am " + age)            # works\nprint("Next year: " + str(int(age) + 1))',
  },
  {
    match: /TypeError.*not (supported|callable|subscriptable)/i,
    cause: 'Wrong type for the operation — likely calling or indexing something that is not a function or list.',
    fix: 'Check what the value actually is with `print(type(x))` before the failing line.',
    code: 'x = 5\nprint(type(x))   # <class \'int\'>\n# x()  would fail — x is not callable',
  },
  {
    match: /KeyError/i,
    cause: 'The dict does not have that key.',
    fix: 'Use `.get(key, default)` for safe lookup, or check `if key in d:` first.',
    code: 'd = {"a": 1}\nprint(d.get("b", 0))    # 0 instead of KeyError',
  },
  {
    match: /IndexError/i,
    cause: 'List/string index is out of range — usually off-by-one, or the collection is empty.',
    fix: 'Check `len(x)` before indexing, or use slicing which never raises.',
    code: 'a = [1, 2, 3]\nprint(a[-1])              # safe\nprint(a[len(a) - 1])      # safe\n# a[5]  would fail',
  },
  {
    match: /NameError.*name '(\w+)' is not defined/i,
    cause: 'You are using a name that does not exist — typo, wrong scope, or defined later.',
    fix: 'Check spelling, or define the variable/function before using it.',
    code: '# name = "Ada"    # define first\n# print(name)      # then use',
  },
  {
    match: /AttributeError.*has no attribute/i,
    cause: 'The object does not have that method/attribute.',
    fix: 'Check `type(x)` and confirm the correct method name for that type.',
    code: 'x = "hi"\nprint(x.upper())    # OK\n# x.append(1)       # AttributeError — strings have no append',
  },
  {
    match: /IndentationError|TabError/i,
    cause: 'Inconsistent indentation, or tabs mixed with spaces.',
    fix: 'Use 4 spaces per level. Never mix tabs and spaces.',
  },
  {
    match: /ZeroDivisionError/i,
    cause: 'Dividing by zero.',
    fix: 'Guard before dividing: `if b != 0:`.',
    code: 'b = 0\nif b != 0:\n    print(10 / b)\nelse:\n    print("cannot divide by zero")',
  },
  {
    match: /ValueError.*invalid literal for int/i,
    cause: 'You are calling `int()` on a string that is not a number.',
    fix: 'Validate input, or catch ValueError.',
    code: 'try:\n    n = int("abc")\nexcept ValueError:\n    print("not a number")',
  },
  {
    match: /RecursionError/i,
    cause: 'Recursion depth exceeded — missing base case, or the base case is never reached.',
    fix: 'Add a base case that returns without recursing. Make sure each call moves toward it.',
  },
  {
    match: /UnboundLocalError/i,
    cause: 'A variable is used before being assigned in the current scope.',
    fix: 'Assign it before the loop/if, or pass it as an argument.',
  },
  {
    match: /ValueError.*too many values to unpack|not enough values to unpack/i,
    cause: 'The number of names on the left does not match the number of items on the right.',
    fix: 'Match the count, or use `*` to capture the rest.',
    code: 'a, b = [1, 2]         # OK\na, *rest = [1, 2, 3]  # a=1, rest=[2,3]',
  },
];

const CODE_SMELLS = [
  {
    match: /(\w+)\s*=\s*\1\.sort\s*\(\s*\)/,
    message: '`a = a.sort()` gives None',
    fix: '`a.sort()` mutates in place and returns None. Drop the assignment, or use `sorted(a)`.',
    code: 'a = [3, 1, 2]\na.sort()          # in place, a is sorted\nb = sorted(a)     # new sorted list, a unchanged',
  },
  {
    match: /def\s+\w+\s*\([^)]*=\s*(\[\]|\{\}|set\(\))/,
    message: 'Mutable default argument — shared across all calls',
    fix: 'Use `None` as default and create the container inside.',
    code: 'def f(items=None):\n    if items is None:\n        items = []\n    items.append(1)\n    return items',
  },
  {
    match: /for\s+\w+\s+in\s+range\s*\(\s*len\s*\(/,
    message: '`for i in range(len(lst))` is unpythonic',
    fix: 'Loop directly, or use `enumerate` if you need the index.',
    code: 'for x in lst:\n    print(x)\n\nfor i, x in enumerate(lst):\n    print(i, x)',
  },
  {
    match: /\bprint\s*\([^)]*\)\s*\n\s*return\s/,
    message: '`print` used where `return` was probably intended',
    fix: 'If the value needs to leave the function, use `return`, not `print`.',
  },
  {
    match: /==\s*None\b/,
    message: 'Use `is None`, not `== None`',
    fix: 'Identity check is correct for None.',
    code: 'if x is None:\n    ...',
  },
  {
    match: /==\s*(True|False)\b/,
    message: 'Comparing to True/False is redundant',
    fix: 'Use the value directly — `if x:`, or `if not x:` for False.',
    code: 'if x:\n    ...\nif not x:\n    ...',
  },
  {
    match: /\b(list|dict|set|id|type|sum|min|max|input|str|int|float)\s*=(?!=)/,
    message: 'You are shadowing a builtin name',
    fix: 'Rename the variable — e.g. `my_list`, `my_dict`. Shadowing breaks the builtin inside that scope.',
  },
  {
    match: /except\s*:/,
    message: 'Bare `except:` catches everything',
    fix: 'Always name the exception — e.g. `except ValueError:`. Bare excepts hide real bugs.',
    code: 'try:\n    n = int("abc")\nexcept ValueError:\n    print("bad input")',
  },
];

/**
 * Analyze pasted text. Returns null if nothing found.
 * Returns { errors: [...], smells: [...] } otherwise.
 */
export function analyzeCode(text) {
  const q = text || '';
  if (!q.trim() || q.length < 8) return null;

  const errors = [];
  const smells = [];

  // Error message detection (line by line)
  const lines = q.split('\n');
  for (const line of lines) {
    for (const p of ERROR_PATTERNS) {
      if (p.match.test(line) && !errors.includes(p)) {
        errors.push(p);
      }
    }
  }

  // Code smell detection — only if it looks like code
  const looksLikeCode =
    /(\bdef\s|\bclass\s|\bfor\s|\bif\s|\bwhile\s|=)/.test(q) && q.includes('\n');
  if (looksLikeCode) {
    for (const s of CODE_SMELLS) {
      if (s.match.test(q) && !smells.includes(s)) {
        smells.push(s);
      }
    }
  }

  if (!errors.length && !smells.length) return null;
  return { errors, smells };
}