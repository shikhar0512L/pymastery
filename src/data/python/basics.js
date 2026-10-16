// 📘 Python Fundamentals — Lesson content
// Depth standard: intermediate. Every lesson covers fundamentals + advanced
// forms + idioms + gotchas + performance notes.
// Rule: All website-facing content must be in English.
//
// Challenge types supported:
//   - mcq             → multiple choice
//   - predict-output  → code + mcq on output
//   - code-fill       → fill a blank in a code snippet
//   - code-challenge  → user writes code, auto-tested against test cases
//   - output-match    → user writes code, stdout must match expected

/* ═══════════════════════════════════════════════════════════
   LESSON 1 — Variables & Assignment
   ═══════════════════════════════════════════════════════════ */
export const variablesLesson = {
  id: "variables",
  title: "Variables & Assignment",
  difficulty: "intermediate",
  duration: 18,
  intro:
    "A variable is not a box — it is a name that points to an object. Understand that, and half of Python's surprises disappear.",
  sections: [
    {
      type: "text",
      content:
        "You create a variable by assigning a value with =. The name on the left becomes a reference to the object on the right.",
    },
    {
      type: "code",
      content: "Basic assignment:",
      code: 'age = 20\nname = "Ada"\nprint(age, name)',
      output: "20 Ada",
      language: "python",
    },
    {
      type: "note",
      content:
        "Python variables do not have types. Objects have types. A variable is just a name bound to an object.",
    },
    {
      type: "text",
      content:
        "Use `id()` to see an object's identity, and `is` to check whether two names point to the same object. `==` checks value equality, `is` checks identity.",
    },
    {
      type: "code",
      content: "References and identity:",
      code: "a = [1, 2, 3]\nb = a            # b points to the SAME list\nc = [1, 2, 3]    # c is a different list with equal contents\n\nprint(a is b)    # same object\nprint(a is c)    # different object\nprint(a == c)    # equal value",
      output: "True\nFalse\nTrue",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Assignment never copies. `b = a` makes b point to the same object as a. If the object is mutable, changes through b are visible through a. This is the #1 gotcha for beginners.",
    },
    {
      type: "text",
      content:
        "Multiple assignment lets you set several names in one line, and unpack sequences into separate variables.",
    },
    {
      type: "code",
      content: "Multiple assignment and unpacking:",
      code: "x, y = 1, 2\nx, y = y, x              # swap without a temp variable\nprint(x, y)\n\nfirst, *rest = [10, 20, 30, 40]\nprint(first)\nprint(rest)",
      output: "2 1\n10\n[20, 30, 40]",
      language: "python",
    },
    {
      type: "tip",
      content:
        "The `*` unpacking works anywhere a sequence is expected. `a, *b, c = [1,2,3,4,5]` grabs first and last, puts the middle in b.",
    },
    {
      type: "text",
      content:
        "Augmented assignments (+=, -=, *=, etc.) look like shortcuts but behave differently for mutable objects.",
    },
    {
      type: "code",
      content: "Augmented assignment on a list mutates in place:",
      code: "a = [1, 2]\nb = a\nb += [3]        # equivalent to b.extend([3]) — mutates in place\nprint(a)\nprint(b)\nprint(a is b)",
      output: "[1, 2, 3]\n[1, 2, 3]\nTrue",
      language: "python",
    },
    {
      type: "warning",
      content:
        "For lists, `b += [x]` and `b = b + [x]` are NOT the same. `+=` mutates the original list. `+` creates a new list and rebinds b, leaving the original untouched.",
    },
    {
      type: "text",
      content:
        "Variable names should be lowercase with underscores (snake_case). Constants use UPPER_CASE by convention.",
    },
    {
      type: "code",
      content: "Naming conventions in action:",
      code: "MAX_RETRIES = 3          # constant by convention\nuser_score = 0           # regular variable\nis_logged_in = True      # boolean — prefix with is/has/can\n\ndef calculate_total(price, qty):\n    return price * qty",
      language: "python",
    },
    {
      type: "text",
      content:
        "You can delete a name with `del`. The object stays alive if other names still reference it.",
    },
    {
      type: "code",
      content: "del removes the binding, not the object:",
      code: "a = [1, 2, 3]\nb = a\ndel a\nprint(b)      # still valid — b still points to the list\n# print(a)    # would raise NameError",
      output: "[1, 2, 3]",
      language: "python",
    },
    {
      type: "text",
      content:
        "Chained assignment binds the same object to multiple names in a single statement.",
    },
    {
      type: "code",
      content: "Chained assignment:",
      code: "a = b = c = 0\nprint(a, b, c)",
      output: "0 0 0",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Chaining with mutable objects is dangerous: `a = b = []` makes both names point to the SAME list. Prefer `a = []; b = []`.",
    },
    {
      type: "tip",
      content:
        "Prefer descriptive names. `user_score` beats `x`. Future-you reads code more than writes it.",
    },
    {
      type: "text",
      content:
        "That is enough on variables. The mental model: name → object. Everything else in Python is built on this.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this print?",
      code: "a = [1, 2]\nb = a\na += [3]\nprint(b)",
      options: ["[1, 2]", "[1, 2, 3]", "[3]", "Error"],
      correct: 1,
      explanation:
        "`+=` on a list mutates the same object in place. Since b points to that object, b sees the change.",
      xp: 15,
    },
    {
      id: "q2",
      type: "predict-output",
      question: "What is the value of `rest`?",
      code: "a, *rest, c = [1, 2, 3, 4, 5]\nprint(rest)",
      options: ["[2, 3, 4]", "[2, 3, 4, 5]", "[2, 3]", "Error"],
      correct: 0,
      explanation:
        "Star unpacking: a = 1, c = 5, and everything in between goes into rest as a list → [2, 3, 4].",
      xp: 15,
    },
    {
      id: "q3",
      type: "mcq",
      question: "Which statement is TRUE about Python variables?",
      options: [
        "A variable is a box that stores a value",
        "A variable is a name bound to an object",
        "A variable has a fixed type",
        "Assigning one variable to another copies its value",
      ],
      correct: 1,
      explanation:
        "Python variables are names bound to objects. Assignment never copies. Types belong to objects, not to names.",
      xp: 15,
    },
    {
      id: "q4",
      type: "code-challenge",
      question:
        "Write a function `swap(a, b)` that returns a tuple `(b, a)` — the two values in reversed order.",
      starterCode: "def swap(a, b):\n    # your code here\n    pass",
      tests: [
        { input: "swap(1, 2)", expected: "(2, 1)" },
        { input: 'swap("x", "y")', expected: "('y', 'x')" },
        { input: "swap(0, 0)", expected: "(0, 0)" },
      ],
      hint: "You can return multiple values at once: `return b, a` creates a tuple automatically.",
      solution: "def swap(a, b):\n    return b, a",
      explanation:
        "Returning `b, a` packs the values into a tuple. Python makes swapping trivial — no temp variable needed.",
      xp: 25,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 2 — Data Types
   ═══════════════════════════════════════════════════════════ */
export const dataTypesLesson = {
  id: "data-types",
  title: "Data Types & Conversion",
  difficulty: "intermediate",
  duration: 20,
  intro:
    "Types decide what operations make sense. Mutable vs immutable, truthy vs falsy, and float precision are the three ideas that trip up every beginner.",
  sections: [
    {
      type: "text",
      content:
        "The four core scalar types are int, float, str and bool. Everything you build uses these.",
    },
    {
      type: "code",
      content: "Core types with type():",
      code: 'age = 20            # int\nprice = 19.99       # float\nname = "Ada"        # str\nis_active = True    # bool\n\nprint(type(age))\nprint(type(price))\nprint(type(name))\nprint(type(is_active))',
      output: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>",
      language: "python",
    },
    {
      type: "text",
      content:
        "Python ints have arbitrary precision. They grow as large as memory allows. Floats are 64-bit IEEE 754, which means they have limited precision.",
    },
    {
      type: "code",
      content: "Big ints and float precision:",
      code: "big = 2 ** 100\nprint(big)\nprint(0.1 + 0.2)",
      output: "1267650600228229401496703205376\n0.30000000000000004",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Never compare floats with ==. Use `math.isclose()` or check that the difference is small. The 0.1 + 0.2 example is the classic proof.",
    },
    {
      type: "code",
      content: "Safe float comparison:",
      code: "import math\nprint(0.1 + 0.2 == 0.3)\nprint(math.isclose(0.1 + 0.2, 0.3))",
      output: "False\nTrue",
      language: "python",
    },
    {
      type: "text",
      content:
        'Every value has a truthiness. The following are falsy: False, 0, 0.0, "", [], {}, (), set(), and None. Everything else is truthy.',
    },
    {
      type: "code",
      content: "Truthiness in action:",
      code: 'print(bool(0))\nprint(bool(""))\nprint(bool([]))\nprint(bool("False"))    # non-empty string is truthy!\nprint(bool(-1))',
      output: "False\nFalse\nFalse\nTrue\nTrue",
      language: "python",
    },
    {
      type: "tip",
      content:
        "This is why `if my_list:` is idiomatic. It checks both existence and non-emptiness. No need for `if len(my_list) > 0:`.",
    },
    {
      type: "text",
      content:
        "Mutable types can be changed in place: list, dict, set. Immutable types cannot: int, float, str, tuple, frozenset.",
    },
    {
      type: "code",
      content: "Mutable vs immutable:",
      code: 'a = [1, 2, 3]\na[0] = 99\nprint(a)          # list modified in place\n\ns = "hello"\n# s[0] = "H"     # TypeError — strings are immutable\ns = "H" + s[1:]\nprint(s)',
      output: "[99, 2, 3]\nHello",
      language: "python",
    },
    {
      type: "note",
      content:
        "Immutable objects are hashable and can be dict keys or set members. Mutable objects cannot.",
    },
    {
      type: "text",
      content:
        "Convert between types with int(), float(), str(), bool(), list(), tuple(). Conversion may fail or lose information.",
    },
    {
      type: "code",
      content: "Conversion gotchas:",
      code: 'print(int("42"))      # works\nprint(int(3.9))       # truncates, does not round\n# print(int("3.5"))   # ValueError — int() cannot parse "3.5"\nprint(float("3.5"))\nprint(int(float("3.5")))',
      output: "42\n3\n3.5\n3",
      language: "python",
    },
    {
      type: "warning",
      content:
        "`int(3.9)` returns 3, not 4. Use `round(3.9)` if you want rounding. Rounding and truncation are different operations.",
    },
    {
      type: "text",
      content:
        "bool is a subclass of int. True == 1 and False == 0. This is intentional and lets you do arithmetic on booleans.",
    },
    {
      type: "code",
      content: "Booleans are integers:",
      code: "print(True + True)\nprint(True * 5)\nprint(sum([True, False, True]))",
      output: "2\n5\n2",
      language: "python",
    },
    {
      type: "text",
      content:
        'None is its own type. It means "no value" and is not the same as 0, "", or False.',
    },
    {
      type: "code",
      content: "None is unique:",
      code: "x = None\nprint(x is None)\nprint(x == 0)\nprint(x == False)\nprint(type(x))",
      output: "True\nFalse\nFalse\n<class 'NoneType'>",
      language: "python",
    },
    {
      type: "tip",
      content:
        "Always test for None with `is None` or `is not None`, never `== None`. `is` checks identity and is the correct semantic.",
    },
    {
      type: "text",
      content:
        "Use isinstance() to check types — it handles inheritance and is faster than type() == comparisons.",
    },
    {
      type: "code",
      content: "isinstance() is the right tool:",
      code: 'print(isinstance(5, int))\nprint(isinstance(True, int))     # bool is a subclass of int\nprint(isinstance("hi", (int, str)))  # check multiple types',
      output: "True\nTrue\nTrue",
      language: "python",
    },
    {
      type: "text",
      content:
        "Types, mutability, truthiness and None. Master these and the rest of Python will feel predictable.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this code print?",
      code: "print(0.1 + 0.2 == 0.3)",
      options: ["True", "False", "Error", "0.3"],
      correct: 1,
      explanation:
        "Binary floating point cannot represent 0.1 or 0.2 exactly. The sum is 0.30000000000000004, not 0.3. Use math.isclose() for float comparisons.",
      xp: 15,
    },
    {
      id: "q2",
      type: "predict-output",
      question: "What is the result?",
      code: 'print(int("7") + int(2.9))\nprint(int(2.9))',
      options: ["9 and 2", "9.9 and 2.9", "9 and 3", "Error"],
      correct: 0,
      explanation:
        'int("7") is 7. int(2.9) truncates to 2. So the sum is 9 and int(2.9) is 2. int() truncates, it does not round.',
      xp: 15,
    },
    {
      id: "q3",
      type: "mcq",
      question: "Which of these values is TRUTHY in a boolean context?",
      options: ["0", '""', "[]", '"False"'],
      correct: 3,
      explanation:
        'Any non-empty string is truthy, including "False" (that is just a 5-character string). Numbers, empty strings, and empty containers are falsy.',
      xp: 15,
    },
    {
      id: "q4",
      type: "mcq",
      question: "What is the correct way to check whether x is None?",
      options: ["if x == None:", "if x is None:", "if not x:", "if x == 0:"],
      correct: 1,
      explanation:
        'Use `is None`. `not x` would be True for many values (0, "", []). `x == 0` checks number equality. `is` checks identity, which is what we want for None.',
      xp: 15,
    },
    {
      id: "q5",
      type: "code-challenge",
      question:
        "Write a function `celsius_to_fahrenheit(c)` that converts Celsius to Fahrenheit using the formula: F = C × 9/5 + 32. Return the result as a float.",
      starterCode:
        "def celsius_to_fahrenheit(c):\n    # your code here\n    pass",
      tests: [
        { input: "celsius_to_fahrenheit(0)", expected: "32.0" },
        { input: "celsius_to_fahrenheit(100)", expected: "212.0" },
        { input: "celsius_to_fahrenheit(-40)", expected: "-40.0" },
        { input: 'celsius_to_fahrenheit(35)', expected: '95.0' },

      ],
      hint: "Use `c * 9 / 5 + 32`. The division `/` returns a float automatically.",
      solution: "def celsius_to_fahrenheit(c):\n    return c * 9 / 5 + 32",
      explanation:
  'Simple formula. In Python 3, `/` returns a float. Clean values like 35, 100, and -40 give exact results, but 37°C gives 98.60000000000001 — the classic float imprecision from the Data Types lesson.',
      xp: 25,
    },
    {
      id: "q6",
      type: "output-match",
      question:
        "Print the value of `0.1 + 0.2` rounded to 2 decimal places. (Yes, this is the famous float precision example.)",
      starterCode: "# Compute and print here\n",
      expectedOutput: "0.3",
      hint: "Use `round(value, 2)` to round to 2 decimals.",
      solution: "result = round(0.1 + 0.2, 2)\nprint(result)",
      explanation:
        "`0.1 + 0.2` gives 0.30000000000000004 in memory. `round(..., 2)` gives a clean 0.3. Always round floats before displaying them.",
      xp: 20,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 3 — Operators
   ═══════════════════════════════════════════════════════════ */
export const operatorsLesson = {
  id: "operators",
  title: "Operators & Expressions",
  difficulty: "intermediate",
  duration: 22,
  intro:
    "Operators are the atoms of every expression. Beyond the basics, precedence, short-circuit logic, bitwise ops and the walrus operator separate beginners from intermediates.",
  sections: [
    {
      type: "text",
      content:
        "Arithmetic operators: + - * / // % **. Note that / always returns a float; // is floor division.",
    },
    {
      type: "code",
      content: "Arithmetic — the full set:",
      code: "print(7 + 2)      # 9\nprint(7 - 2)      # 5\nprint(7 * 2)      # 14\nprint(7 / 2)      # 3.5\nprint(7 // 2)     # 3\nprint(7 % 2)      # 1\nprint(7 ** 2)     # 49",
      output: "9\n5\n14\n3.5\n3\n1\n49",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Floor division and modulo behave surprisingly with negative numbers. `-7 // 2` is -4, not -3. `-7 % 2` is 1, not -1. Python rounds toward negative infinity.",
    },
    {
      type: "code",
      content: "Negative numbers with // and %:",
      code: "print(-7 // 2)\nprint(-7 % 2)\nprint(7 // -2)\nprint(7 % -2)",
      output: "-4\n1\n-4\n-1",
      language: "python",
    },
    {
      type: "tip",
      content:
        'The rule: `a == (a // b) * b + (a % b)` always holds in Python, even for negatives. This is why the results look "off".',
    },
    {
      type: "text",
      content:
        "Comparison operators return booleans: == != < > <= >=. Python lets you chain them.",
    },
    {
      type: "code",
      content: "Chained comparisons read like math:",
      code: "x = 5\nprint(0 < x < 10)\nprint(1 < x < 3)\nprint(x == 5 == 5.0)",
      output: "True\nFalse\nTrue",
      language: "python",
    },
    {
      type: "text",
      content:
        "Logical operators: and, or, not. They short-circuit — the second operand is only evaluated if needed.",
    },
    {
      type: "code",
      content: "Short-circuiting saves work and prevents errors:",
      code: "x = 5\nprint(x > 0 and x < 10)\nprint(x < 0 or x > 100)\nprint(not (x == 5))\n\n# short-circuit prevents division by zero:\ny = 0\nprint(y != 0 and 10 / y > 1)",
      output: "True\nFalse\nFalse\nFalse",
      language: "python",
    },
    {
      type: "note",
      content:
        '`and` and `or` return one of the operands, not necessarily a boolean. `5 and 3` returns 3. `0 or "default"` returns "default". This is a common idiom for defaults.',
    },
    {
      type: "code",
      content: "and/or return values, not booleans:",
      code: 'print(5 and 3)\nprint(0 or "default")\nprint("" or "fallback")\nprint("value" and "used")',
      output: "3\ndefault\nfallback\nused",
      language: "python",
    },
    {
      type: "text",
      content:
        "Operator precedence matters. ** is highest, then unary -, then * / // %, then + -, then comparisons, then not, then and, then or. When in doubt, use parentheses.",
    },
    {
      type: "code",
      content: "Precedence in action:",
      code: "print(2 + 3 * 4)         # 14, not 20\nprint(2 ** 3 ** 2)       # right-associative → 512\nprint((2 + 3) * 4)       # parentheses win → 20\nprint(not True or True)  # (not True) or True → True",
      output: "14\n512\n20\nTrue",
      language: "python",
    },
    {
      type: "warning",
      content:
        "`**` is right-associative: `2 ** 3 ** 2` means `2 ** (3 ** 2)` = 512, not `(2 ** 3) ** 2` = 64.",
    },
    {
      type: "text",
      content:
        "Bitwise operators work on integers bit by bit: & (and), | (or), ^ (xor), ~ (not), << (shift left), >> (shift right).",
    },
    {
      type: "code",
      content: "Bitwise operations:",
      code: "a = 6      # 0b110\nb = 3      # 0b011\nprint(a & b)     # 0b010 = 2\nprint(a | b)     # 0b111 = 7\nprint(a ^ b)     # 0b101 = 5\nprint(a << 1)    # 0b1100 = 12\nprint(a >> 1)    # 0b011 = 3",
      output: "2\n7\n5\n12\n3",
      language: "python",
    },
    {
      type: "tip",
      content:
        "Fast even/odd check: `n & 1` is 0 for even, 1 for odd. Faster than `n % 2` in tight loops.",
    },
    {
      type: "text",
      content:
        "The walrus operator := assigns and returns a value in one expression. Great for avoiding repeated computation.",
    },
    {
      type: "code",
      content: "Walrus in a while loop:",
      code: "data = [1, 2, 3, 4, 5]\ni = 0\nwhile (n := data[i]) < 4:\n    print(n)\n    i += 1\n    if i >= len(data):\n        break",
      output: "1\n2\n3",
      language: "python",
    },
    {
      type: "note",
      content:
        "The walrus operator was added in Python 3.8. It is useful in comprehensions and while loops where you would otherwise compute the same value twice.",
    },
    {
      type: "text",
      content:
        "Augmented assignment works for all binary operators: +=, -=, *=, /=, //=, %=, **=, &=, |=, ^=, <<=, >>=.",
    },
    {
      type: "code",
      content: "Augmented assignment:",
      code: "x = 10\nx += 5      # x = 15\nx *= 2      # x = 30\nx //= 4     # x = 7\nprint(x)",
      output: "7",
      language: "python",
    },
    {
      type: "text",
      content:
        "The ternary expression — `value_if_true if condition else value_if_false` — is a compact if-else that returns a value.",
    },
    {
      type: "code",
      content: "Ternary in action:",
      code: 'age = 20\nstatus = "adult" if age >= 18 else "minor"\nprint(status)\n\nx = 5\nprint("even" if x % 2 == 0 else "odd")',
      output: "adult\nodd",
      language: "python",
    },
    {
      type: "tip",
      content:
        "Ternary is great for simple choices. If the expression gets long or nests, use an if-else block instead — readability wins.",
    },
    {
      type: "text",
      content:
        "That is the operator toolkit. Precedence, short-circuiting, bitwise ops and the walrus operator — master these and you write idiomatic Python.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this print?",
      code: "print(-7 % 3)",
      options: ["-1", "1", "2", "-2"],
      correct: 2,
      explanation:
        "Python modulo returns a result with the sign of the divisor. -7 = 3 * (-3) + 2, so -7 % 3 = 2. In Python, the result of a % b always has the same sign as b.",
      xp: 15,
    },
    {
      id: "q2",
      type: "predict-output",
      question: "What is the value of result?",
      code: "result = 2 + 3 * 4 ** 2 // 8\nprint(result)",
      options: ["4", "8", "10", "25"],
      correct: 1,
      explanation:
        "Precedence: ** first (4 ** 2 = 16), then * and // left-to-right: 3 * 16 = 48, 48 // 8 = 6. Then +: 2 + 6 = 8.",
      xp: 15,
    },
    {
      id: "q3",
      type: "mcq",
      question: "What does `5 and 3` return?",
      options: ["True", "False", "3", "5"],
      correct: 2,
      explanation:
        "In Python, `and` returns the second operand if the first is truthy. Since 5 is truthy, `5 and 3` evaluates and returns 3.",
      xp: 15,
    },
    {
      id: "q4",
      type: "predict-output",
      question: "What will this print?",
      code: "a = 6\nb = 3\nprint(a ^ b)",
      options: ["2", "5", "9", "18"],
      correct: 1,
      explanation:
        "XOR: bits that differ become 1. 6 = 0b110, 3 = 0b011. 110 XOR 011 = 101 = 5.",
      xp: 15,
    },
    {
      id: "q5",
      type: "code-challenge",
      question:
        "Write a function `is_even(n)` that returns True if n is even, False otherwise. Use bitwise AND (&) — not the modulo operator.",
      starterCode: "def is_even(n):\n    # your code here\n    pass",
      tests: [
        { input: "is_even(4)", expected: "True" },
        { input: "is_even(7)", expected: "False" },
        { input: "is_even(0)", expected: "True" },
        { input: "is_even(-3)", expected: "False" },
      ],
      hint: "The last bit of an even number is 0. Check `n & 1 == 0`.",
      solution: "def is_even(n):\n    return (n & 1) == 0",
      explanation:
        "`n & 1` extracts the lowest bit. It is 0 for even, 1 for odd. This is faster than `n % 2 == 0` in tight loops.",
      xp: 25,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 4 — Strings
   ═══════════════════════════════════════════════════════════ */
export const stringsLesson = {
  id: "strings",
  title: "Strings — Slicing, Methods & f-strings",
  difficulty: "intermediate",
  duration: 25,
  intro:
    "Strings are sequences, not just text. Master slicing with steps, the split/join pattern, and f-string format specs — and you can handle 90% of real-world string work.",
  sections: [
    {
      type: "text",
      content:
        "Create a string with single quotes, double quotes, or triple quotes. Use raw strings (r-prefix) when you do not want backslashes interpreted.",
    },
    {
      type: "code",
      content: "Four ways to write a string — each has a purpose:",
      code: `a = 'hello'
b = "world"
c = """multi
line"""
path = r"C:\\Users\\name"   # raw string — backslashes stay literal

print(a, b)
print(c)
print(path)`,
      output: `hello world
multi
line
C:\\Users\\name`,
      language: "python",
    },
    {
      type: "text",
      content:
        'Escape sequences let you embed special characters. Common ones: \\n (newline), \\t (tab), \\\\ (backslash), \\" (quote).',
    },
    {
      type: "code",
      content: "Escape sequences in action:",
      code: `print("Line1\\nLine2")
print("Tab\\tSeparated")
print("She said \\"hi\\"")
print("Backslash: \\\\")`,
      output: `Line1
Line2
Tab	Separated
She said "hi"
Backslash: \\`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Combine strings with + (concatenation) and repeat with *. Both are operators, not methods.",
    },
    {
      type: "code",
      content: "Concatenation and repetition:",
      code: `first = "Ada"
last = "Lovelace"
print(first + " " + last)
print("-" * 30)
print("ab" * 3)`,
      output: `Ada Lovelace
------------------------------
ababab`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Strings are sequences. Every character has an index. Positive indices go left-to-right from 0. Negative indices go right-to-left from -1.",
    },
    {
      type: "code",
      content: "Indexing — positive and negative:",
      code: `s = "Python"
print(s[0])    # first char
print(s[2])    # third char
print(s[-1])   # last char
print(s[-3])   # third from end`,
      output: `P
t
n
h`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Slicing extracts a range: s[start:stop]. Start is inclusive, stop is exclusive. Omit either side to go to the ends.",
    },
    {
      type: "code",
      content: "Basic slicing:",
      code: `s = "Python"
print(s[0:3])   # chars 0, 1, 2
print(s[2:])    # from index 2 to end
print(s[:3])    # from start to index 3 (exclusive)
print(s[:])     # full copy`,
      output: `Pyt
thon
Pyt
Python`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Slices accept a third argument — the step. This unlocks some very powerful patterns, including reversing a string.",
    },
    {
      type: "code",
      content: "Slicing with step — s[start:stop:step]:",
      code: `s = "Python"
print(s[::2])     # every 2nd char from start
print(s[1::2])    # every 2nd char starting at index 1
print(s[::-1])    # REVERSE the string
print(s[5:1:-1])  # reverse from index 5 down to index 2`,
      output: `Pto
yhn
nohtyP
noht`,
      language: "python",
    },
    {
      type: "tip",
      content:
        "`s[::-1]` is the idiomatic Python way to reverse a string. No loop, no library. Memorize it — you will use it a lot.",
    },
    {
      type: "text",
      content:
        'Strings are immutable. You cannot change a character in place. Every "modification" creates a new string.',
    },
    {
      type: "code",
      content: "Immutability — this fails, and this is the fix:",
      code: `s = "hello"
# s[0] = "H"      # TypeError: str does not support item assignment

s = "H" + s[1:]   # create a new string
print(s)`,
      output: `Hello`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Common string methods. Know these cold: strip/lstrip/rstrip, upper/lower/title, replace, count, find, startswith, endswith.",
    },
    {
      type: "code",
      content: "A quick tour of the most-used methods:",
      code: `s = "  Hello World  "
print(repr(s.strip()))      # remove both sides
print(repr(s.lstrip()))     # remove left only
print(repr(s.rstrip()))     # remove right only
print(s.lower())
print(s.upper())
print(s.title())
print(s.count("l"))
print(s.find("World"))      # index of first match, -1 if not found
print(s.strip().startswith("Hello"))`,
      output: `'Hello World'
'Hello World  '
'  Hello World'
  hello world  
  HELLO WORLD  
  Hello World  
3
8
True`,
      language: "python",
    },
    {
      type: "text",
      content:
        "split() and join() are the workhorses of text processing. split() breaks a string into a list. join() glues a list into a string.",
    },
    {
      type: "code",
      content: "split() and join() — the pattern to remember:",
      code: `csv = "a,b,c,d"
print(csv.split(","))           # split on comma

words = "hello world".split()   # split on whitespace
print(words)

print("-".join(["a", "b", "c"]))   # glue with dash
print(" ".join(words))             # glue with space
print("".join(["a", "b", "c"]))    # glue with nothing`,
      output: `['a', 'b', 'c', 'd']
['hello', 'world']
a-b-c
hello world
abc`,
      language: "python",
    },
    {
      type: "warning",
      content:
        'In a loop, do NOT do `result += piece` repeatedly — that is O(n²). Collect pieces in a list and `"".join(pieces)` at the end. This one trick makes your code 100x faster on long strings.',
    },
    {
      type: "text",
      content:
        "f-strings are the modern format syntax. Prefix the string with f and use {} to insert expressions — not just variables.",
    },
    {
      type: "code",
      content: "f-strings with expressions:",
      code: `name = "Ada"
age = 36
print(f"{name} is {age} years old")
print(f"{name.upper()} in 5 years: {age + 5}")
print(f"{'even' if age % 2 == 0 else 'odd'}")`,
      output: `Ada is 36 years old
ADA in 5 years: 41
even`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Format specs inside f-strings give you precise control: decimal places, padding, alignment, thousand separators. Syntax: {value:spec}.",
    },
    {
      type: "code",
      content: "Format specs — the power move:",
      code: `pi = 3.14159
print(f"{pi:.2f}")        # 2 decimal places
print(f"{pi:10.2f}")      # padded to width 10
print(f"{42:05d}")        # zero-pad to 5 digits
print(f"{1234567:,}")     # thousand separators
print(f"{'hi':>10}|")     # right-align in 10
print(f"{'hi':<10}|")     # left-align in 10
print(f"{'hi':^10}|")     # center in 10`,
      output: `3.14
      3.14
00042
1,234,567
        hi|
hi        |
    hi    |`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Membership and iteration: use `in` to test for substring, and loop directly over characters.",
    },
    {
      type: "code",
      content: "Membership and for-loop:",
      code: `print("Py" in "Python")
print("xy" in "Python")

for ch in "abc":
    print(ch, end=" ")`,
      output: `True
False
a b c `,
      language: "python",
    },
    {
      type: "note",
      content:
        'Strings are iterable. `enumerate("abc")` gives you (index, char) pairs — useful when you need both.',
    },
    {
      type: "text",
      content:
        "Practical pattern — palindrome check. Combining lower(), replace() and slicing gives an elegant one-liner.",
    },
    {
      type: "code",
      content: "Palindrome check using slicing:",
      code: `def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(is_palindrome("racecar"))
print(is_palindrome("A man a plan a canal panama"))
print(is_palindrome("hello"))`,
      output: `True
True
False`,
      language: "python",
    },
    {
      type: "tip",
      content:
        "Slicing, split/join and f-string format specs cover almost every string problem you will hit day to day. Regex is the last 10% — for later.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this print?",
      code: 's = "abcdefg"\nprint(s[::2])',
      options: ["aceg", "bdf", "abcdefg", "Error"],
      correct: 0,
      explanation:
        'The step of 2 takes characters at indices 0, 2, 4, 6 → "a", "c", "e", "g" → "aceg".',
      xp: 15,
    },
    {
      id: "q2",
      type: "code-fill",
      question: "Fill the slice so the code prints: nohtyP",
      code: 's = "Python"\nprint(s[___])',
      options: ["::-1", "0:-1", "-1", "1:"],
      correct: 0,
      explanation:
        "`[::-1]` means start at the end, stop at the beginning, step backwards — the idiomatic way to reverse a string.",
      xp: 15,
    },
    {
      id: "q3",
      type: "predict-output",
      question: "What will this print?",
      code: 'x = 3.14159\nprint(f"{x:.3f}")',
      options: ["3.141", "3.142", "3.14", "3.14159"],
      correct: 1,
      explanation:
        "`.3f` means 3 digits after the decimal point, rounded. 3.14159 rounds to 3.142.",
      xp: 15,
    },
    {
      id: "q4",
      type: "mcq",
      question:
        "You are building a long string from 10,000 pieces in a loop. What is the fastest approach?",
      options: [
        'result = "" then result += piece in the loop',
        'Collect each piece in a list, then "".join(list) at the end',
        "Use str(piece) + result and reverse at the end",
        "Use % formatting inside the loop",
      ],
      correct: 1,
      explanation:
        "`+=` on strings is O(n²) because each addition creates a new string. Collecting pieces and joining once is O(n) — dramatically faster.",
      xp: 15,
    },
    {
      id: "q5",
      type: "code-challenge",
      question:
        'Write a function `reverse_words(s)` that returns the words of s in reverse order. For "hello world foo", return "foo world hello".',
      starterCode: "def reverse_words(s):\n    # your code here\n    pass",
      tests: [
        {
          input: 'reverse_words("hello world foo")',
          expected: "'foo world hello'",
        },
        { input: 'reverse_words("one")', expected: "'one'" },
        { input: 'reverse_words("a b c d")', expected: "'d c b a'" },
      ],
      hint: "Split into a list, reverse the list, then join with spaces. Combine `split()`, `[::-1]`, and `join()`.",
      solution:
        'def reverse_words(s):\n    words = s.split()\n    return " ".join(words[::-1])',
      explanation:
        "The split/reverse/join pattern is idiomatic Python. Three methods chained — much cleaner than a manual loop.",
      xp: 25,
    },
    {
      id: "q6",
      type: "output-match",
      question: 'Print the string "banana" with every "a" replaced by "o".',
      starterCode: "# Write your code here\n",
      expectedOutput: "bonono",
      hint: 'Use `"banana".replace("a", "o")` and print the result.',
      solution: 'print("banana".replace("a", "o"))',
      explanation:
        '`replace()` replaces every occurrence by default. The result is "bonono" — three "a"s become three "o"s.',
      xp: 20,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 5 — Lists & Indexing
   ═══════════════════════════════════════════════════════════ */
export const listsLesson = {
  id: "lists",
  title: "Lists — Slicing, Methods & Comprehensions",
  difficulty: "intermediate",
  duration: 28,
  intro:
    "Lists are Python's workhorse. Master slicing with steps, the copy vs reference trap, and comprehensions — and you will write cleaner, faster code than most beginners.",
  sections: [
    {
      type: "text",
      content:
        "A list is an ordered, mutable collection. Create it with square brackets, or with list() from any iterable.",
    },
    {
      type: "code",
      content: "Creating lists in several ways:",
      code: 'a = [1, 2, 3]\nb = list("abc")            # from string → ["a", "b", "c"]\nc = list(range(5))         # [0, 1, 2, 3, 4]\nd = [i * 2 for i in range(4)]  # comprehension\nprint(a, b, c, d)',
      output: "[1, 2, 3] ['a', 'b', 'c'] [0, 1, 2, 3, 4] [0, 2, 4, 6]",
      language: "python",
    },
    {
      type: "text",
      content:
        "Indexing and slicing work the same way as strings: positive indices from 0, negative from the end, s[start:stop:step].",
    },
    {
      type: "code",
      content: "Indexing and slicing with step:",
      code: "nums = [10, 20, 30, 40, 50, 60]\nprint(nums[0])\nprint(nums[-1])\nprint(nums[1:4])\nprint(nums[::2])\nprint(nums[::-1])",
      output: "10\n60\n[20, 30, 40]\n[10, 30, 50]\n[60, 50, 40, 30, 20, 10]",
      language: "python",
    },
    {
      type: "tip",
      content:
        "`nums[::-1]` returns a REVERSED COPY of the list. It does not modify the original. Compare with `nums.reverse()` which reverses in place and returns None.",
    },
    {
      type: "text",
      content:
        "Lists are mutable. Assigning to an index changes the list in place. Slices can also be assigned, which can grow or shrink the list.",
    },
    {
      type: "code",
      content: "Item and slice assignment:",
      code: 'nums = [1, 2, 3, 4, 5]\nnums[0] = 99\nprint(nums)\n\nnums[1:4] = [0, 0]     # replace 3 items with 2\nprint(nums)\n\nnums[1:1] = ["X", "Y"]  # insert without removing\nprint(nums)',
      output: '[99, 2, 3, 4, 5]\n[99, 0, 0, 5]\n[99, "X", "Y", 0, 0, 5]',
      language: "python",
    },
    {
      type: "text",
      content:
        "Common methods: append, extend, insert, remove, pop, clear, index, count, sort, reverse, copy.",
    },
    {
      type: "code",
      content: "Methods you will use daily:",
      code: "a = [3, 1, 4, 1, 5]\na.append(9)           # add to end\na.extend([2, 6])      # add multiple\na.insert(0, 0)        # insert at index\nprint(a)\na.remove(1)           # remove first occurrence\nprint(a)\nprint(a.pop())        # remove and return last\na.sort()              # in place\nprint(a)\na.reverse()           # in place\nprint(a)",
      output: `[0, 3, 1, 4, 1, 5, 9, 2, 6]
[0, 3, 4, 1, 5, 9, 2, 6]
6
[0, 1, 2, 3, 4, 5, 9]
[9, 5, 4, 3, 2, 1, 0]`,
      language: "python",
    },
    {
      type: "warning",
      content:
        "`a.sort()` mutates a and returns None. `sorted(a)` returns a new sorted list and leaves a alone. Beginners often write `a = a.sort()` and end up with a = None.",
    },
    {
      type: "code",
      content: "sort() vs sorted():",
      code: "a = [3, 1, 2]\nb = sorted(a)      # new list, a unchanged\nprint(a, b)\n\na.sort()           # in place\nprint(a)\n\nresult = a.sort()\nprint(result)      # None!",
      output: "[3, 1, 2] [1, 2, 3]\n[1, 2, 3]\nNone",
      language: "python",
    },
    {
      type: "text",
      content:
        "The classic trap: `b = a` does NOT copy. Both names point to the same list. Use `a.copy()`, `list(a)`, or `a[:]` to make a shallow copy.",
    },
    {
      type: "code",
      content: "Copy vs reference — the #1 gotcha:",
      code: "a = [1, 2, 3]\nb = a              # same object\nb.append(4)\nprint(a)           # a is also affected!\n\nc = a.copy()       # shallow copy\nc.append(5)\nprint(a)\nprint(c)",
      output: `[1, 2, 3, 4]
[1, 2, 3, 4]
[1, 2, 3, 4, 5]`,
      language: "python",
    },
    {
      type: "note",
      content:
        "`.copy()` is a SHALLOW copy. Nested objects (like lists inside lists) are still shared. Use `copy.deepcopy()` for a full clone.",
    },
    {
      type: "code",
      content: "Shallow vs deep copy:",
      code: "import copy\noriginal = [[1, 2], [3, 4]]\nshallow = original.copy()\ndeep = copy.deepcopy(original)\n\noriginal[0].append(99)\nprint(shallow)     # inner list change is visible\nprint(deep)        # fully isolated",
      output: "[[1, 2, 99], [3, 4]]\n[[1, 2], [3, 4]]",
      language: "python",
    },
    {
      type: "text",
      content:
        "Membership testing with `in` and size with `len()` are O(n) and O(1) respectively. Use sets if you need fast lookups.",
    },
    {
      type: "code",
      content: "Membership and length:",
      code: 'fruits = ["apple", "banana", "cherry"]\nprint("banana" in fruits)\nprint("kiwi" in fruits)\nprint(len(fruits))',
      output: "True\nFalse\n3",
      language: "python",
    },
    {
      type: "text",
      content:
        "List comprehensions build a new list from an iterable in one line. Syntax: [expression for item in iterable if condition].",
    },
    {
      type: "code",
      content: "Comprehensions — clean and fast:",
      code: 'squares = [n ** 2 for n in range(6)]\nprint(squares)\n\nevens = [n for n in range(10) if n % 2 == 0]\nprint(evens)\n\nwords = ["hi", "hello", "hey"]\nupper = [w.upper() for w in words]\nprint(upper)',
      output: `[0, 1, 4, 9, 16, 25]
[0, 2, 4, 6, 8]
['HI', 'HELLO', 'HEY']`,
      language: "python",
    },
    {
      type: "tip",
      content:
        "Nested comprehension: `[[row[i] for row in matrix] for i in range(cols)]` transposes a 2D list. Powerful, but if it takes more than 30 seconds to read, use a loop.",
    },
    {
      type: "text",
      content:
        "enumerate and zip let you iterate with index and iterate multiple lists together.",
    },
    {
      type: "code",
      content: "enumerate and zip:",
      code: 'letters = ["a", "b", "c"]\n\nfor i, ch in enumerate(letters):\n    print(i, ch)\n\nnums = [1, 2, 3]\nfor ch, n in zip(letters, nums):\n    print(ch, n)',
      output: `0 a
1 b
2 c
a 1
b 2
c 3`,
      language: "python",
    },
    {
      type: "text",
      content:
        "Unpacking with *: pull the first, the last, or split a list at any point.",
    },
    {
      type: "code",
      content: "Star unpacking with lists:",
      code: "nums = [1, 2, 3, 4, 5]\nfirst, *middle, last = nums\nprint(first)\nprint(middle)\nprint(last)",
      output: "1\n[2, 3, 4]\n5",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Never initialize a grid like `[[0] * 3] * 3`. All three inner lists are the SAME object. Use a comprehension: `[[0] * 3 for _ in range(3)]`.",
    },
    {
      type: "code",
      content: "The grid initialization trap:",
      code: "bad = [[0] * 3] * 3\nbad[0][0] = 9\nprint(bad)      # every row changed!\n\ngood = [[0] * 3 for _ in range(3)]\ngood[0][0] = 9\nprint(good)",
      output:
        "[[9, 0, 0], [9, 0, 0], [9, 0, 0]]\n[[9, 0, 0], [0, 0, 0], [0, 0, 0]]",
      language: "python",
    },
    {
      type: "text",
      content:
        "Built-in helpers: sum, min, max, any, all. Any/all are especially useful with comprehensions.",
    },
    {
      type: "code",
      content: "Built-ins for lists:",
      code: "nums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(sum(nums))\nprint(min(nums))\nprint(max(nums))\nprint(any(n > 8 for n in nums))\nprint(all(n > 0 for n in nums))",
      output: `31
1
9
True
True`,
      language: "python",
    },
    {
      type: "tip",
      content:
        "Slicing, comprehensions and copy vs reference are the three concepts that separate beginners from intermediates. Master them early.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this print?",
      code: "a = [1, 2, 3]\nb = a\nb.append(4)\na.append(5)\nprint(b)",
      options: ["[1, 2, 3, 4]", "[1, 2, 3, 5]", "[1, 2, 3, 4, 5]", "Error"],
      correct: 2,
      explanation:
        "a and b point to the same list. Every mutation is visible through both names. Appending 4 via b and 5 via a both affect the shared object.",
      xp: 20,
    },
    {
      id: "q2",
      type: "code-fill",
      question: "Fill the blank so the list becomes [1, 2, 3, 4, 5, 6]",
      code: "nums = [1, 2, 3]\nnums.___([4, 5, 6])\nprint(nums)",
      options: ["append", "extend", "insert", "add"],
      correct: 1,
      explanation:
        "`extend()` adds multiple items from an iterable. `append([4,5,6])` would add the list itself as a single element. `add()` is not a list method.",
      xp: 20,
    },
    {
      id: "q3",
      type: "predict-output",
      question: "What will this print?",
      code: "grid = [[0] * 2] * 3\ngrid[0][0] = 9\nprint(grid)",
      options: [
        "[[9, 0], [0, 0], [0, 0]]",
        "[[9, 0], [9, 0], [9, 0]]",
        "[[9, 9, 9], [0, 0, 0]]",
        "Error",
      ],
      correct: 1,
      explanation:
        "`[[0]*2] * 3` creates three references to the SAME inner list. Mutating one row mutates all rows. Use a comprehension to make distinct rows.",
      xp: 20,
    },
    {
      id: "q4",
      type: "mcq",
      question: "What does `sorted(a)` do that `a.sort()` does not?",
      options: [
        "It sorts faster",
        "It returns a new sorted list and leaves a unchanged",
        "It works only on numbers",
        "It sorts in reverse",
      ],
      correct: 1,
      explanation:
        "`sorted()` is a built-in that returns a new list. `a.sort()` is a method that mutates in place and returns None. Very different!",
      xp: 20,
    },
    {
      id: "q5",
      type: "predict-output",
      question: "What is the value of `result`?",
      code: "result = [n ** 2 for n in range(5) if n % 2 == 0]\nprint(result)",
      options: ["[0, 1, 4, 9, 16]", "[0, 4, 16]", "[1, 9]", "[0, 2, 4]"],
      correct: 1,
      explanation:
        "Only even n survive the filter: 0, 2, 4. Squared: 0, 4, 16. So the list is [0, 4, 16].",
      xp: 20,
    },
    {
      id: "q6",
      type: "code-challenge",
      question:
        "Write a function `second_largest(nums)` that returns the second largest number in the list. Assume the list has at least 2 distinct values.",
      starterCode: "def second_largest(nums):\n    # your code here\n    pass",
      tests: [
        { input: "second_largest([3, 1, 4, 1, 5, 9, 2, 6])", expected: "6" },
        { input: "second_largest([10, 20, 30])", expected: "20" },
        { input: "second_largest([-1, -2, -3])", expected: "-2" },
        { input: "second_largest([5, 5, 3])", expected: "3" },
      ],
      hint: "Sort a COPY of the list, then return the element at index -2. Or use `sorted(set(nums))[-2]`.",
      solution:
        "def second_largest(nums):\n    unique_sorted = sorted(set(nums))\n    return unique_sorted[-2]",
      explanation:
        "`set(nums)` removes duplicates, `sorted(...)` returns a sorted list, `[-2]` grabs the second largest. Three built-ins, one clean solution.",
      xp: 30,
    },
    {
      id: "q7",
      type: "output-match",
      question:
        "Print each element of the list `[1, 2, 3, 4]` doubled, each on its own line.",
      starterCode: "nums = [1, 2, 3, 4]\n# Print doubled values here\n",
      expectedOutput: "2\n4\n6\n8",
      hint: "Loop over nums and print `n * 2` each iteration.",
      solution: "nums = [1, 2, 3, 4]\nfor n in nums:\n    print(n * 2)",
      explanation:
        "A simple for-loop over the list. Python iterates directly over elements — no index needed.",
      xp: 20,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 6 — Conditionals
   ═══════════════════════════════════════════════════════════ */
export const conditionalsLesson = {
  id: "conditionals",
  title: "Conditionals & Control Flow",
  difficulty: "intermediate",
  duration: 22,
  intro:
    "if / elif / else decide what your code does. Master truthiness, short-circuit logic, ternary expressions and match-case — and your branches will read like prose.",
  sections: [
    {
      type: "text",
      content:
        "The basic form: `if condition:` runs a block when the condition is truthy. `elif` checks another condition if the previous was false. `else` catches the rest.",
    },
    {
      type: "code",
      content: "Grade classifier:",
      code: 'score = 82\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(grade)',
      output: "B",
      language: "python",
    },
    {
      type: "note",
      content:
        "Python uses indentation, not braces, to mark blocks. Mixing tabs and spaces will raise a TabError. Use 4 spaces consistently.",
    },
    {
      type: "text",
      content:
        'Conditions use truthiness. Any falsy value — 0, "", [], {}, None, False — is treated as False. Everything else is True.',
    },
    {
      type: "code",
      content: "Truthiness in conditions:",
      code: 'items = []\n\nif items:\n    print("have items")\nelse:\n    print("empty")\n\nname = "Ada"\nif name:\n    print(f"hello {name}")',
      output: "empty\nhello Ada",
      language: "python",
    },
    {
      type: "tip",
      content:
        "Prefer `if my_list:` over `if len(my_list) > 0:`. It reads better and works for any container or None check.",
    },
    {
      type: "text",
      content:
        "Logical operators `and`, `or`, `not` combine conditions. They short-circuit, so the second part is only evaluated if needed.",
    },
    {
      type: "code",
      content: "Combining conditions:",
      code: 'age = 25\nhas_id = True\n\nif age >= 18 and has_id:\n    print("allowed")\n\nis_weekend = False\nis_holiday = True\n\nif is_weekend or is_holiday:\n    print("day off")\n\nif not is_weekend:\n    print("work day")',
      output: "allowed\nday off\nwork day",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Short-circuit protects against errors. `if x != 0 and 10 / x > 1:` will not divide by zero when x is 0. Order matters!",
    },
    {
      type: "text",
      content:
        "Python supports chained comparisons — they read exactly like math.",
    },
    {
      type: "code",
      content: "Chained comparisons:",
      code: 'age = 25\n\nif 18 <= age < 65:\n    print("working age")\n\nx = 5\nif 0 < x < 10:\n    print("in range")',
      output: "working age\nin range",
      language: "python",
    },
    {
      type: "text",
      content:
        "Membership with `in` is often cleaner than chained equality checks.",
    },
    {
      type: "code",
      content: "Membership in conditions:",
      code: 'color = "green"\n\nif color in ["red", "green", "blue"]:\n    print("primary")\n\nif "py" in "python":\n    print("found substring")',
      output: "primary\nfound substring",
      language: "python",
    },
    {
      type: "text",
      content:
        "The ternary expression chooses between two values in one line: `a if condition else b`.",
    },
    {
      type: "code",
      content: "Ternary for compact choices:",
      code: 'n = 7\nparity = "even" if n % 2 == 0 else "odd"\nprint(parity)\n\nage = 15\nlabel = "minor" if age < 18 else "adult"\nprint(label)',
      output: "odd\nminor",
      language: "python",
    },
    {
      type: "tip",
      content:
        "Use ternary only for simple choices. If it nests or grows, use an if-else block — readability wins over compactness.",
    },
    {
      type: "text",
      content:
        "Guard clauses — early returns — flatten nested logic and make functions easier to read.",
    },
    {
      type: "code",
      content: "Guard clause vs nested if:",
      code: 'def process(user):\n    if user is None:\n        return "no user"\n    if not user.get("active"):\n        return "inactive"\n    return "processing"\n\nprint(process(None))\nprint(process({"active": False}))\nprint(process({"active": True}))',
      output: "no user\ninactive\nprocessing",
      language: "python",
    },
    {
      type: "text",
      content:
        "match-case (Python 3.10+) is a cleaner way to write multi-way branching, especially with structure.",
    },
    {
      type: "code",
      content: "match-case for pattern matching:",
      code: 'def http_status(code):\n    match code:\n        case 200:\n            return "OK"\n        case 404:\n            return "Not Found"\n        case 500:\n            return "Server Error"\n        case _:\n            return "Unknown"\n\nprint(http_status(200))\nprint(http_status(404))\nprint(http_status(999))',
      output: "OK\nNot Found\nUnknown",
      language: "python",
    },
    {
      type: "note",
      content:
        "The wildcard `case _:` acts like else. Without it, unmatched values raise nothing — the block simply does nothing.",
    },
    {
      type: "code",
      content: "match-case with patterns:",
      code: 'def describe(point):\n    match point:\n        case (0, 0):\n            return "origin"\n        case (x, 0):\n            return f"on x-axis at {x}"\n        case (0, y):\n            return f"on y-axis at {y}"\n        case (x, y):\n            return f"at ({x}, {y})"\n\nprint(describe((0, 0)))\nprint(describe((5, 0)))\nprint(describe((0, 7)))\nprint(describe((2, 3)))',
      output: "origin\non x-axis at 5\non y-axis at 7\nat (2, 3)",
      language: "python",
    },
    {
      type: "text",
      content:
        "The walrus operator (:=) inside if assigns and tests in one step — handy when you need the value later.",
    },
    {
      type: "code",
      content: "Walrus in if:",
      code: 'data = [1, 2, 3]\n\nif (n := len(data)) > 2:\n    print(f"list has {n} items")',
      output: "list has 3 items",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Do not chain `if`/`elif` for mutually exclusive conditions if a dict or match-case would be clearer. Flat is better than nested.",
    },
    {
      type: "text",
      content:
        "That is conditionals. Truthiness, short-circuit, ternary, guards and match-case cover the entire spectrum from one-liners to complex branching.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this print?",
      code: 'x = 0\nif x:\n    print("yes")\nelse:\n    print("no")',
      options: ["yes", "no", "Error", "nothing"],
      correct: 1,
      explanation:
        "0 is falsy in Python. The `if x:` condition evaluates to False, so the else branch runs.",
      xp: 20,
    },
    {
      id: "q2",
      type: "predict-output",
      question: "What is the value of `result`?",
      code: 'n = 5\nresult = "big" if n > 10 else "small" if n > 2 else "tiny"\nprint(result)',
      options: ["big", "small", "tiny", "Error"],
      correct: 1,
      explanation:
        'Nested ternary: n > 10 is False, so we move to `"small" if n > 2 else "tiny"`. n = 5 > 2 is True, so result is "small".',
      xp: 20,
    },
    {
      id: "q3",
      type: "mcq",
      question: "Which value is FALSY in Python?",
      options: ['"0"', "[0]", "0.0", "(1,)"],
      correct: 2,
      explanation:
        '0.0 (float zero) is falsy. "0" is a non-empty string (truthy), [0] is a non-empty list (truthy), (1,) is a non-empty tuple (truthy).',
      xp: 20,
    },
    {
      id: "q4",
      type: "code-fill",
      question: 'Fill the blank so the function returns "even" for even n:',
      code: 'def parity(n):\n    return "even" ___ n % 2 == 0 else "odd"',
      options: ["if", "when", "and", "or"],
      correct: 0,
      explanation:
        "The ternary expression syntax is: `value_if_true if condition else value_if_false`. So we use `if`.",
      xp: 20,
    },
    {
      id: "q5",
      type: "code-challenge",
      question:
        "Write a function `absolute(n)` that returns the absolute value of n — without using the built-in abs().",
      starterCode: "def absolute(n):\n    # your code here\n    pass",
      tests: [
        { input: "absolute(-5)", expected: "5" },
        { input: "absolute(7)", expected: "7" },
        { input: "absolute(0)", expected: "0" },
        { input: "absolute(-100)", expected: "100" },
      ],
      hint: "Use an if-else: if n is less than 0, return -n. Otherwise return n.",
      solution:
        "def absolute(n):\n    if n < 0:\n        return -n\n    return n",
      explanation:
        "A simple if-else handles it. Under the hood, Python's built-in abs() does exactly this.",
      xp: 25,
    },
    {
      id: "q6",
      type: "output-match",
      question:
        'For each number 1 through 5, print "even" if even, "odd" if odd. Each on its own line.',
      starterCode:
        'for n in range(1, 6):\n    # print "even" or "odd"\n    pass',
      expectedOutput: "odd\neven\nodd\neven\nodd",
      hint: "Inside the loop, use an if-else with `n % 2 == 0`.",
      solution:
        'for n in range(1, 6):\n    if n % 2 == 0:\n        print("even")\n    else:\n        print("odd")',
      explanation:
        "Classic if-else inside a loop. `n % 2 == 0` identifies evens. The loop hits 1, 2, 3, 4, 5 in order.",
      xp: 20,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 7 — Loops
   ═══════════════════════════════════════════════════════════ */
export const loopsLesson = {
  id: "loops",
  title: "Loops — for, while & Iteration Patterns",
  difficulty: "intermediate",
  duration: 24,
  intro:
    "Loops repeat work. But Python loops are more than repetition — enumerate, zip, and the for-else clause are tools most beginners never learn.",
  sections: [
    {
      type: "text",
      content:
        "Use `for` when you know what you are iterating over. Use `while` when you loop until a condition becomes false.",
    },
    {
      type: "code",
      content: "The two loop forms:",
      code: "for i in [1, 2, 3]:\n    print(i)\n\nn = 3\nwhile n > 0:\n    print(n)\n    n -= 1",
      output: "1\n2\n3\n3\n2\n1",
      language: "python",
    },
    {
      type: "text",
      content:
        "`range()` generates a sequence of integers without storing them all in memory. It takes 1, 2, or 3 arguments: stop, start/stop, or start/stop/step.",
    },
    {
      type: "code",
      content: "range() in all its forms:",
      code: "print(list(range(5)))         # 0..4\nprint(list(range(2, 6)))      # 2..5\nprint(list(range(0, 10, 2)))  # 0, 2, 4, 6, 8\nprint(list(range(5, 0, -1)))  # 5, 4, 3, 2, 1",
      output: "[0, 1, 2, 3, 4]\n[2, 3, 4, 5]\n[0, 2, 4, 6, 8]\n[5, 4, 3, 2, 1]",
      language: "python",
    },
    {
      type: "warning",
      content:
        "A `while` loop with a condition that never becomes False runs forever. Always ensure something inside the loop moves the state toward termination.",
    },
    {
      type: "code",
      content: "Infinite loop — and the fix:",
      code: "n = 3\n# while n > 0:      # BAD — n never changes\n#     print(n)\n\nwhile n > 0:\n    print(n)\n    n -= 1         # GOOD — n decreases each iteration",
      output: "3\n2\n1",
      language: "python",
    },
    {
      type: "text",
      content:
        "`break` exits the loop entirely. `continue` skips to the next iteration.",
    },
    {
      type: "code",
      content: "break vs continue:",
      code: 'for i in range(6):\n    if i == 3:\n        break\n    print(i)\n\nprint("---")\n\nfor i in range(6):\n    if i % 2 == 0:\n        continue\n    print(i)',
      output: "0\n1\n2\n---\n1\n3\n5",
      language: "python",
    },
    {
      type: "note",
      content:
        "Python has a unique `for-else` and `while-else` clause. The else block runs only if the loop finished WITHOUT hitting break. Very handy for search loops.",
    },
    {
      type: "code",
      content: "for-else — search pattern:",
      code: 'nums = [2, 4, 6, 8]\n\nfor n in nums:\n    if n % 2 == 1:\n        print(f"found odd: {n}")\n        break\nelse:\n    print("all even")',
      output: "all even",
      language: "python",
    },
    {
      type: "text",
      content:
        "`enumerate()` gives you both index and item in a loop. Never write `for i in range(len(lst))` — that is unpythonic.",
    },
    {
      type: "code",
      content: "enumerate() — index + value:",
      code: 'names = ["Ada", "Alan", "Grace"]\n\nfor i, name in enumerate(names):\n    print(f"{i}: {name}")\n\n# start counting from 1\nfor i, name in enumerate(names, start=1):\n    print(f"{i}. {name}")',
      output: "0: Ada\n1: Alan\n2: Grace\n1. Ada\n2. Alan\n3. Grace",
      language: "python",
    },
    {
      type: "text",
      content:
        "`zip()` iterates multiple sequences in parallel, stopping at the shortest one.",
    },
    {
      type: "code",
      content: "zip() — parallel iteration:",
      code: 'names = ["Ada", "Alan", "Grace"]\nages = [36, 41, 85]\n\nfor name, age in zip(names, ages):\n    print(f"{name} is {age}")\n\n# zip of uneven lengths stops at shortest\nprint(list(zip([1, 2, 3], ["a", "b"])))',
      output: "Ada is 36\nAlan is 41\nGrace is 85\n[(1, 'a'), (2, 'b')]",
      language: "python",
    },
    {
      type: "tip",
      content:
        "Nested loops are fine, but if you find yourself writing three levels deep, step back and see if you can flatten the logic. Deep nesting hurts readability.",
    },
    {
      type: "code",
      content: "Nested loops — multiplication table:",
      code: 'for i in range(1, 4):\n    for j in range(1, 4):\n        print(i * j, end=" ")\n    print()',
      output: "1 2 3 \n2 4 6 \n3 6 9 ",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Never modify a list while iterating over it. The indices shift under you and items get skipped. Build a new list instead.",
    },
    {
      type: "code",
      content: "The list-mutation-during-iteration trap:",
      code: "nums = [1, 2, 3, 4, 5, 6]\n\n# BAD — skips items\n# for n in nums:\n#     if n % 2 == 0:\n#         nums.remove(n)\n\n# GOOD — build a new list\nevens_removed = [n for n in nums if n % 2 == 1]\nprint(evens_removed)",
      output: "[1, 3, 5]",
      language: "python",
    },
    {
      type: "text",
      content:
        "Comprehensions are loops in disguise — often clearer for simple transforms. Use a real loop only when the body is complex.",
    },
    {
      type: "code",
      content: "Loop vs comprehension:",
      code: "squares = []\nfor n in range(5):\n    squares.append(n ** 2)\nprint(squares)\n\n# same thing, one line\nprint([n ** 2 for n in range(5)])",
      output: "[0, 1, 4, 9, 16]\n[0, 1, 4, 9, 16]",
      language: "python",
    },
    {
      type: "tip",
      content:
        "That is the loop toolkit. `enumerate`, `zip`, and `for-else` are the three underused features that make Python loops feel different from other languages.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this print?",
      code: "for i in range(1, 10, 3):\n    print(i)",
      options: ["1 4 7", "1 3 6 9", "1 2 3 4 5 6 7 8 9", "Error"],
      correct: 0,
      explanation:
        "range(1, 10, 3) starts at 1, stops before 10, step 3: 1, 4, 7. Next would be 10 which is excluded.",
      xp: 15,
    },
    {
      id: "q2",
      type: "predict-output",
      question: "What will this print?",
      code: 'for i in range(5):\n    if i == 3:\n        break\nelse:\n    print("done")\nprint("end")',
      options: ["done\\nend", "end", "done", "Error"],
      correct: 1,
      explanation:
        'The loop hits break when i == 3, so the else block is skipped. Only "end" prints. The else on a loop runs only if the loop completed without break.',
      xp: 20,
    },
    {
      id: "q3",
      type: "mcq",
      question: "What is the difference between break and continue?",
      options: [
        "break skips one iteration, continue exits the loop",
        "break exits the loop entirely, continue skips to the next iteration",
        "They are the same",
        "break only works in while loops",
      ],
      correct: 1,
      explanation:
        "break exits the loop immediately. continue skips the rest of the current iteration and moves to the next one.",
      xp: 15,
    },
    {
      id: "q4",
      type: "code-fill",
      question: "Fill the blank so the code prints: 0-a 1-b 2-c (one per line)",
      code: 'letters = ["a", "b", "c"]\nfor i, ch in ___(letters):\n    print(f"{i}-{ch}")',
      options: ["enumerate", "zip", "range", "iter"],
      correct: 0,
      explanation:
        "enumerate() gives (index, value) pairs. That is exactly what we need for numbered iteration.",
      xp: 15,
    },
    {
      id: "q5",
      type: "code-challenge",
      question:
        "Write a function `sum_of_squares(n)` that returns the sum of squares of 1 through n (inclusive). For n=3, return 1 + 4 + 9 = 14.",
      starterCode: "def sum_of_squares(n):\n    # your code here\n    pass",
      tests: [
        { input: "sum_of_squares(3)", expected: "14" },
        { input: "sum_of_squares(5)", expected: "55" },
        { input: "sum_of_squares(1)", expected: "1" },
        { input: "sum_of_squares(0)", expected: "0" },
      ],
      hint: "Loop over `range(1, n + 1)`, accumulate `i ** 2` into a total variable, return the total.",
      solution:
        "def sum_of_squares(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i ** 2\n    return total",
      explanation:
        "Simple accumulator pattern. `range(1, n+1)` gives 1 through n. Each iteration adds i² to total. Returns 0 for n=0 because the loop body never runs.",
      xp: 25,
    },
    {
      id: "q6",
      type: "output-match",
      question:
        'Print a countdown from 5 to 1 (each on its own line), then print "Go!" on the final line.',
      starterCode: "# Countdown here\n",
      expectedOutput: "5\n4\n3\n2\n1\nGo!",
      hint: 'Use `for i in range(5, 0, -1):` to count down, then print("Go!") after the loop.',
      solution: 'for i in range(5, 0, -1):\n    print(i)\nprint("Go!")',
      explanation:
        "Negative step counts down. range(5, 0, -1) gives 5, 4, 3, 2, 1. The final print runs after the loop finishes.",
      xp: 20,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 8 — Functions
   ═══════════════════════════════════════════════════════════ */
export const functionsLesson = {
  id: "functions",
  title: "Functions — Args, Scope & First-Class Objects",
  difficulty: "intermediate",
  duration: 26,
  intro:
    "Functions are the atoms of every program. Beyond the syntax, mutable defaults, *args/**kwargs, closures and first-class functions separate beginners from intermediate developers.",
  sections: [
    {
      type: "text",
      content:
        "A function bundles a piece of logic under a name. Define it with `def`, call it by name followed by parentheses.",
    },
    {
      type: "code",
      content: "Basic function with parameters and return:",
      code: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Ada"))\nprint(greet("Alan"))',
      output: "Hello, Ada!\nHello, Alan!",
      language: "python",
    },
    {
      type: "text",
      content:
        "`return` sends a value back to the caller. `print` just displays something. A function without explicit return sends back None.",
    },
    {
      type: "code",
      content: "return vs print — very different:",
      code: "def bad_add(a, b):\n    print(a + b)\n\ndef good_add(a, b):\n    return a + b\n\nx = bad_add(2, 3)\nprint(x)              # x is None!\n\ny = good_add(2, 3)\nprint(y * 2)          # can use the value",
      output: "5\nNone\n5\n10",
      language: "python",
    },
    {
      type: "warning",
      content:
        "Beginners often print inside a function when they meant to return. Then callers get None. If you want the value back, use return.",
    },
    {
      type: "text",
      content:
        "Arguments can be passed positionally or by keyword. Keyword arguments make calls self-documenting.",
    },
    {
      type: "code",
      content: "Positional vs keyword:",
      code: 'def describe(name, age, city):\n    return f"{name}, {age}, from {city}"\n\nprint(describe("Ada", 36, "London"))\nprint(describe(age=36, name="Ada", city="London"))\nprint(describe("Ada", city="London", age=36))',
      output:
        "Ada, 36, from London\nAda, 36, from London\nAda, 36, from London",
      language: "python",
    },
    {
      type: "text",
      content:
        "Default arguments let you omit parameters. They give a function sensible defaults without forcing callers to specify every argument.",
    },
    {
      type: "code",
      content: "Default arguments:",
      code: "def power(base, exp=2):\n    return base ** exp\n\nprint(power(5))\nprint(power(5, 3))",
      output: "25\n125",
      language: "python",
    },
    {
      type: "warning",
      content:
        "NEVER use a mutable object as a default argument. The default value is created once and shared across every call.",
    },
    {
      type: "code",
      content: "The mutable default gotcha — and the fix:",
      code: "def bad_append(x, target=[]):\n    target.append(x)\n    return target\n\nprint(bad_append(1))\nprint(bad_append(2))   # [1, 2] — NOT [2]!\n\ndef good_append(x, target=None):\n    if target is None:\n        target = []\n    target.append(x)\n    return target\n\nprint(good_append(1))\nprint(good_append(2))",
      output: "[1]\n[1, 2]\n[1]\n[2]",
      language: "python",
    },
    {
      type: "text",
      content:
        "`*args` collects extra positional arguments into a tuple. `**kwargs` collects extra keyword arguments into a dict.",
    },
    {
      type: "code",
      content: "*args and **kwargs:",
      code: 'def sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4))\nprint(sum_all())\n\ndef show_info(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key} = {value}")\n\nshow_info(name="Ada", age=36)',
      output: "10\n0\nname = Ada\nage = 36",
      language: "python",
    },
    {
      type: "tip",
      content:
        "You can combine: `def f(a, b, *args, c=10, **kwargs)` — required args, then extra positional, then keyword-only, then extra keywords.",
    },
    {
      type: "text",
      content:
        "Scope: Python looks up names in four places — Local, Enclosing, Global, Built-in (LEGB). A function sees its own locals and the surrounding globals.",
    },
    {
      type: "code",
      content: "Scope in action:",
      code: 'x = "global"\n\ndef outer():\n    x = "outer"\n    def inner():\n        return x     # sees outer\'s x (enclosing)\n    return inner()\n\nprint(outer())\nprint(x)',
      output: "outer\nglobal",
      language: "python",
    },
    {
      type: "note",
      content:
        "To modify a global from inside a function, you would need `global x`. But avoid it — pass values as arguments and return results instead.",
    },
    {
      type: "text",
      content:
        "`lambda` creates a small anonymous function in one line. Useful for sorting keys, short callbacks, and one-off transforms.",
    },
    {
      type: "code",
      content: "Lambda with sorted() — the classic use case:",
      code: 'people = [\n    {"name": "Ada", "age": 36},\n    {"name": "Alan", "age": 41},\n    {"name": "Grace", "age": 85},\n]\n\nby_age = sorted(people, key=lambda p: p["age"])\nfor p in by_age:\n    print(p["name"], p["age"])',
      output: "Ada 36\nAlan 41\nGrace 85",
      language: "python",
    },
    {
      type: "text",
      content:
        "A function can return multiple values in one statement — Python packs them into a tuple.",
    },
    {
      type: "code",
      content: "Multiple return values:",
      code: "def min_max(nums):\n    return min(nums), max(nums)\n\nlow, high = min_max([3, 1, 4, 1, 5, 9])\nprint(low, high)",
      output: "1 9",
      language: "python",
    },
    {
      type: "text",
      content:
        "Functions are first-class objects. You can store them in variables, pass them as arguments, and return them from other functions.",
    },
    {
      type: "code",
      content: "Functions as arguments:",
      code: "def apply_twice(func, x):\n    return func(func(x))\n\ndef add_one(n):\n    return n + 1\n\nprint(apply_twice(add_one, 5))\nprint(apply_twice(lambda n: n * 2, 3))",
      output: "7\n12",
      language: "python",
    },
    {
      type: "tip",
      content:
        "Docstrings document functions. Use triple quotes right after `def`. `help(my_func)` displays them. This is how Python tools auto-generate documentation.",
    },
    {
      type: "code",
      content: "Docstring example:",
      code: 'def add(a, b):\n    """Return the sum of a and b."""\n    return a + b\n\nprint(add.__doc__)',
      output: "Return the sum of a and b.",
      language: "python",
    },
    {
      type: "text",
      content:
        "That is functions. Defaults, *args/**kwargs, scope, lambdas, and first-class functions — master these and you write reusable, composable code.",
    },
  ],
  challenges: [
    {
      id: "q1",
      type: "predict-output",
      question: "What will this print?",
      code: "def f(x, items=[]):\n    items.append(x)\n    return items\n\nprint(f(1))\nprint(f(2))\nprint(f(3))",
      options: [
        "[1] [2] [3]",
        "[1] [1, 2] [1, 2, 3]",
        "[1, 2, 3] [1, 2, 3] [1, 2, 3]",
        "Error",
      ],
      correct: 1,
      explanation:
        "The default list is created once when the function is defined. Every call without an explicit items arg shares the same list. Use `items=None` and create a fresh list inside.",
      xp: 20,
    },
    {
      id: "q2",
      type: "predict-output",
      question: "What will this print?",
      code: 'def f(*args):\n    return len(args)\n\nprint(f(1, 2, 3))\nprint(f())\nprint(f("a", "b"))',
      options: ["3 0 2", "3 1 2", "Error", "1 0 1"],
      correct: 0,
      explanation:
        "`*args` collects all positional arguments into a tuple. Three args → length 3. No args → length 0. Two args → length 2.",
      xp: 15,
    },
    {
      id: "q3",
      type: "mcq",
      question: "What is the LEGB rule?",
      options: [
        "The order Python evaluates logical operators",
        "The order Python looks up variable names: Local, Enclosing, Global, Built-in",
        "A syntax for defining classes",
        "The rule for default arguments",
      ],
      correct: 1,
      explanation:
        "LEGB describes name resolution order. When Python sees a name, it looks in locals first, then enclosing scopes, then globals, then built-ins.",
      xp: 15,
    },
    {
      id: "q4",
      type: "code-fill",
      question: "Fill the blank so the code prints 12",
      code: "double = ___ n: n * 2\nprint(double(6))",
      options: ["lambda", "def", "func", "fn"],
      correct: 0,
      explanation:
        "The syntax `lambda n: n * 2` creates an anonymous function. Lambdas are single-expression, used for short transforms.",
      xp: 15,
    },
    {
      id: "q5",
      type: "code-challenge",
      question:
        'Write a function `make_greeting(name, greeting="Hello")` that returns a string like "Hello, Ada!". The greeting should default to "Hello".',
      starterCode:
        'def make_greeting(name, greeting="Hello"):\n    # your code here\n    pass',
      tests: [
        { input: 'make_greeting("Ada")', expected: "'Hello, Ada!'" },
        { input: 'make_greeting("Alan", "Hi")', expected: "'Hi, Alan!'" },
        {
          input: 'make_greeting("Grace", greeting="Hey")',
          expected: "'Hey, Grace!'",
        },
      ],
      hint: 'Use an f-string: `return f"{greeting}, {name}!"`. The default parameter is already set for you.',
      solution:
        'def make_greeting(name, greeting="Hello"):\n    return f"{greeting}, {name}!"',
      explanation:
        "Default arguments let callers use the function with just a name. Keyword or positional overrides work too.",
      xp: 25,
    },
    {
      id: "q6",
      type: "code-challenge",
      question:
        "Write a function `apply_twice(func, x)` that calls func twice on x and returns the result. E.g. apply_twice(lambda n: n + 1, 5) → 7.",
      starterCode: "def apply_twice(func, x):\n    # your code here\n    pass",
      tests: [
        { input: "apply_twice(lambda n: n + 1, 5)", expected: "7" },
        { input: "apply_twice(lambda n: n * 2, 3)", expected: "12" },
        { input: 'apply_twice(str.upper, "hi")', expected: "'HI'" },
      ],
      hint: "Return `func(func(x))`. The inner call runs first, its result is passed to the outer call.",
      solution: "def apply_twice(func, x):\n    return func(func(x))",
      explanation:
        "Functions are values in Python — you can pass them around like any other object. `func(func(x))` applies the function twice in a nested call.",
      xp: 30,
    },
    {
      id: "q7",
      type: "output-match",
      question:
        "Write a function `square(n)` that returns n × n. Then loop from 1 to 5 and print each square on its own line.",
      starterCode:
        "def square(n):\n    # your code\n    pass\n\n# Loop and print squares here\n",
      expectedOutput: "1\n4\n9\n16\n25",
      hint: "Define `def square(n): return n * n`, then `for i in range(1, 6): print(square(i))`.",
      solution:
        "def square(n):\n    return n * n\n\nfor i in range(1, 6):\n    print(square(i))",
      explanation:
        "You combine a small pure function with a loop. This pattern — define once, reuse many times — is the core benefit of functions.",
      xp: 25,
    },
  ],
};


/* ═══════════════════════════════════════════════════════════
   LESSON 9 — Dicts & Sets
   ═══════════════════════════════════════════════════════════ */
export const dictsSetsLesson = {
  id: 'dicts-sets',
  title: 'Dicts & Sets — Hash Maps in Practice',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'Dicts and sets are the fastest lookup tools in Python. Master them, and half of your algorithms go from O(n) to O(1).',
  sections: [
    {
      type: 'text',
      content:
        'A dict maps keys to values. Both the key and value can be any type — but keys must be immutable (hashable).',
    },
    {
      type: 'code',
      content: 'Creating dicts — literal, dict(), comprehension:',
      code: `person = {"name": "Ada", "age": 36, "city": "London"}\nempty = {}\nfrom_pairs = dict([("a", 1), ("b", 2)])\nsquares = {n: n ** 2 for n in range(4)}\n\nprint(person)\nprint(from_pairs)\nprint(squares)`,
      output: `{'name': 'Ada', 'age': 36, 'city': 'London'}\n{'a': 1, 'b': 2}\n{0: 0, 1: 1, 2: 4, 3: 9}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Access values with square brackets or with `.get()`. The difference matters: `[]` raises KeyError if the key is missing, `.get()` returns None (or a default you provide).',
    },
    {
      type: 'code',
      content: 'Bracket vs get() — a critical distinction:',
      code: `d = {"a": 1, "b": 2}\n\nprint(d["a"])              # 1\nprint(d.get("a"))          # 1\nprint(d.get("missing"))    # None\nprint(d.get("missing", 0)) # 0 (default)\n\n# print(d["missing"])     # KeyError`,
      output: '1\n1\nNone\n0',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Use `.get(key, default)` for optional lookups. Reaching for `d[key]` on a missing key crashes your program. This is the #1 dict bug.',
    },
    {
      type: 'text',
      content:
        'Add or update a key by assigning to it. `del` removes a key. `.pop(key)` removes and returns its value.',
    },
    {
      type: 'code',
      content: 'Mutating dicts:',
      code: `d = {"a": 1}\nd["b"] = 2            # add\nd["a"] = 99           # update\nprint(d)\n\ndel d["b"]            # remove\nprint(d)\n\nprint(d.pop("a"))     # remove + return\nprint(d)`,
      output: `{'a': 99, 'b': 2}\n{'a': 99}\n99\n{}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Iterate with `.keys()`, `.values()`, or `.items()`. The `.items()` view is the most useful — it gives you (key, value) pairs directly.',
    },
    {
      type: 'code',
      content: 'Three ways to iterate:',
      code: `person = {"name": "Ada", "age": 36}\n\nfor k in person:\n    print(k)             # keys by default\n\nfor v in person.values():\n    print(v)\n\nfor k, v in person.items():\n    print(f"{k} = {v}")`,
      output: `name\nage\nAda\n36\nname = Ada\nage = 36`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Merging dicts — three ways. `.update()` mutates in place. The `|` operator (Python 3.9+) returns a new dict. `{**a, **b}` also returns a new dict.',
    },
    {
      type: 'code',
      content: 'Three merge patterns:',
      code: `a = {"x": 1, "y": 2}\nb = {"y": 99, "z": 3}\n\na.update(b)            # a is mutated\nprint(a)\n\nc = {"x": 1, "y": 2}\nd = {**c, **b}         # new dict, c untouched\nprint(c, d)\n\ne = {"x": 1, "y": 2}\nf = e | b              # Python 3.9+ operator\nprint(e, f)`,
      output: `{'x': 1, 'y': 99, 'z': 3}\n{'x': 1, 'y': 2} {'x': 1, 'y': 99, 'z': 3}\n{'x': 1, 'y': 2} {'x': 1, 'y': 99, 'z': 3}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'On merge, later keys win. `{**a, **b}` keeps b\'s values where keys overlap.',
    },
    {
      type: 'text',
      content:
        'A set stores unique values. Create it with {} literals (with elements), or set() for an empty set. Duplicates are silently removed.',
    },
    {
      type: 'code',
      content: 'Creating sets — duplicates vanish:',
      code: `s = {1, 2, 2, 3, 3, 3}\nprint(s)\n\nempty = set()          # NOT {} — that is an empty dict\nfrom_list = set([1, 2, 2, 3])\nprint(from_list)`,
      output: `{1, 2, 3}\n{1, 2, 3}`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        '`{}` creates an empty DICT, not a set. Use `set()` when you need an empty set. This is one of Python\'s most confusing syntax quirks.',
    },
    {
      type: 'text',
      content:
        'Set operations: `|` union, `&` intersection, `-` difference, `^` symmetric difference. All return new sets.',
    },
    {
      type: 'code',
      content: 'Set math:',
      code: `a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\nprint(a | b)     # union — everything\nprint(a & b)     # intersection — common\nprint(a - b)     # in a but not in b\nprint(a ^ b)     # in exactly one`,
      output: `{1, 2, 3, 4, 5, 6}\n{3, 4}\n{1, 2}\n{1, 2, 5, 6}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Add and remove set elements with `.add()`, `.remove()`, `.discard()`. `.remove()` raises KeyError if missing; `.discard()` is silent.',
    },
    {
      type: 'code',
      content: 'Set mutation:',
      code: `s = {1, 2, 3}\ns.add(4)\ns.remove(1)      # raises if not found\ns.discard(99)    # silent if not found\nprint(s)\nprint(2 in s)    # O(1) membership`,
      output: `{2, 3, 4}\nTrue`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Both dicts and sets use hashing, so membership testing is O(1). List membership is O(n). When you are doing thousands of `in` checks, convert to a set.',
    },
    {
      type: 'code',
      content: 'Set vs list membership — the performance difference:',
      code: `nums_list = list(range(10_000))\nnums_set = set(nums_list)\n\n# Both work, but the set is instant for large inputs\nprint(9999 in nums_list)\nprint(9999 in nums_set)`,
      output: 'True\nTrue',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Rule of thumb: use a set when you care about "is X in this collection?" and a list when you care about order or indexing.',
    },
    {
      type: 'text',
      content:
        'Common pattern — frequency count. Loop items, use `.get(key, 0) + 1` to increment safely.',
    },
    {
      type: 'code',
      content: 'Counting frequencies with a dict:',
      code: `words = ["apple", "banana", "apple", "cherry", "banana", "apple"]\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)`,
      output: `{'apple': 3, 'banana': 2, 'cherry': 1}`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'For this pattern, `collections.Counter(words)` is even cleaner — it does the same thing in one line. We will cover collections in the next module.',
    },
    {
      type: 'text',
      content:
        'Dict comprehension builds a dict in one line: `{key_expr: value_expr for item in iterable if condition}`.',
    },
    {
      type: 'code',
      content: 'Dict and set comprehensions:',
      code: `squares = {n: n ** 2 for n in range(5)}\nprint(squares)\n\n# Filter\nevens_sq = {n: n ** 2 for n in range(10) if n % 2 == 0}\nprint(evens_sq)\n\n# Set comprehension — unique lengths\nlengths = {len(w) for w in ["hi", "hello", "hey", "world"]}\nprint(lengths)`,
      output: `{0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n{0: 0, 2: 4, 4: 16, 6: 36, 8: 64}\n{2, 5}`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Merging two dicts with value addition — a classic pattern for combining scores, counts, or totals.',
    },
    {
      type: 'code',
      content: 'Merge-with-sum:',
      code: `a = {"math": 80, "physics": 70}\nb = {"math": 10, "chem": 60}\n\nfor k, v in b.items():\n    a[k] = a.get(k, 0) + v\nprint(a)`,
      output: `{'math': 90, 'physics': 70, 'chem': 60}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Dicts preserve insertion order (Python 3.7+). Sets do not — never rely on set iteration order.',
    },
    {
      type: 'text',
      content:
        'That is the dict + set toolkit. Fast lookups, uniqueness, and the frequency-count pattern are the three things you will use every week.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'd = {"a": 1}\nprint(d.get("b", 0))\nprint(d.get("a", 100))',
      options: ['None then 1', '0 then 1', '0 then 100', 'Error'],
      correct: 1,
      explanation:
        '`get(key, default)` returns default if the key is missing. "b" is missing so we get 0. "a" exists so we get its value 1, not the default 100.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 's = {1, 2, 2, 3, 3, 3}\nprint(len(s))',
      options: ['6', '3', '1', 'Error'],
      correct: 1,
      explanation:
        'Sets store unique values. The literal {1, 2, 2, 3, 3, 3} becomes {1, 2, 3} — 3 elements.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You are checking "is x in this collection?" a million times. Which type gives you the fastest lookup?',
      options: ['list', 'tuple', 'set', 'string'],
      correct: 2,
      explanation:
        'Sets (and dicts) use hashing for O(1) lookups. Lists and tuples scan element-by-element, which is O(n). A set is dramatically faster for repeated membership tests.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so the dict maps each number to its square:',
      code: 'squares = {___: n ** 2 for n in range(5)}\nprint(squares)',
      options: ['n', 'n ** 2', 'key', 'i'],
      correct: 0,
      explanation:
        'Dict comprehension syntax is `{key_expr: value_expr for item in iterable}`. We want the key to be n and the value to be n ** 2.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a function `word_count(text)` that returns a dict mapping each word in text (split by whitespace) to the number of times it appears.',
      starterCode:
        'def word_count(text):\n    # your code here\n    pass',
      tests: [
        {
          input: 'word_count("a b a c b a")',
          expected: "{'a': 3, 'b': 2, 'c': 1}",
        },
        {
          input: 'word_count("hi hi hi")',
          expected: "{'hi': 3}",
        },
        {
          input: 'word_count("")',
          expected: '{}',
        },
      ],
      hint: 'Split the text into words, then loop: `counts[w] = counts.get(w, 0) + 1`.',
      solution:
        'def word_count(text):\n    counts = {}\n    for w in text.split():\n        counts[w] = counts.get(w, 0) + 1\n    return counts',
      explanation:
        'The frequency-count pattern: use `.get(key, 0) + 1` to safely increment. This is the single most common dict pattern you will use.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'code-challenge',
      question:
        'Write a function `common_keys(a, b)` that returns a set of keys present in BOTH dicts a and b.',
      starterCode:
        'def common_keys(a, b):\n    # your code here\n    pass',
      tests: [
        {
          input: 'common_keys({"x": 1, "y": 2}, {"y": 3, "z": 4})',
          expected: "{'y'}",
        },
        {
          input: 'common_keys({"a": 1}, {"b": 2})',
          expected: 'set()',
        },
        {
          input: 'common_keys({"a": 1, "b": 2, "c": 3}, {"a": 9, "c": 8})',
          expected: "{'a', 'c'}",
        },
      ],
      hint: 'Convert keys to sets and use `&` (intersection). Or use `a.keys() & b.keys()` directly.',
      solution: 'def common_keys(a, b):\n    return set(a) & set(b)',
      explanation:
        'Iterating a dict gives its keys. `set(a)` gives the key set. The `&` operator intersects two sets in one step.',
      xp: 25,
    },
    {
      id: 'q7',
      type: 'output-match',
      question:
        'Create a dict `{"a": 1, "b": 2, "c": 3}` and print each key-value pair as "key: value", one per line, sorted by key.',
      starterCode: '# Create and print here\n',
      expectedOutput: 'a: 1\nb: 2\nc: 3',
      hint: 'Loop over `sorted(d.items())` — sorting the pairs sorts by key first.',
      solution:
        'd = {"a": 1, "b": 2, "c": 3}\nfor k, v in sorted(d.items()):\n    print(f"{k}: {v}")',
      explanation:
        '`.items()` gives (key, value) tuples. `sorted()` on tuples sorts by the first element (key). Unpack in the loop and print.',
      xp: 20,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 10 — Errors & Exceptions
   ═══════════════════════════════════════════════════════════ */
export const errorsLesson = {
  id: 'errors',
  title: 'Errors & Exceptions — Graceful Failure',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Good code expects failure. try / except / else / finally and the raise statement are how Python handles things going wrong — without crashing.',
  sections: [
    {
      type: 'text',
      content:
        'There are two kinds of problems in Python: syntax errors (the code will not run) and runtime exceptions (the code starts and then crashes).',
    },
    {
      type: 'code',
      content: 'Syntax error vs runtime exception:',
      code: `# Syntax error — the code never runs\n# if True\n#     print("hi")\n\n# Runtime exception — the code starts, then crashes at this line\n# print(1 / 0)         # ZeroDivisionError\n# print(int("abc"))    # ValueError`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Common built-in exceptions you will meet every day. Learn their names — the error message tells you exactly what went wrong.',
    },
    {
      type: 'code',
      content: 'A field guide to common exceptions:',
      code: `# ValueError        — right type, wrong value: int("abc")\n# TypeError         — wrong type entirely: 1 + "a"\n# KeyError          — missing dict key: {"a": 1}["b"]\n# IndexError        — list index out of range: [1, 2][5]\n# ZeroDivisionError — dividing by zero: 1 / 0\n# AttributeError    — attribute does not exist: "hi".bark()\n# FileNotFoundError — file is missing: open("nope.txt")`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Wrap risky code in `try`. Catch specific exceptions with `except`. Python runs the except block if the matching exception is raised.',
    },
    {
      type: 'code',
      content: 'Basic try / except:',
      code: `try:\n    n = int("abc")\nexcept ValueError as e:\n    print("failed:", e)\nprint("continues after except")`,
      output: `failed: invalid literal for int() with base 10: 'abc'\ncontinues after except`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Never write a bare `except:` — it catches EVERYTHING, including keyboard interrupts and system exits, hiding real bugs. Always name the exception you expect.',
    },
    {
      type: 'text',
      content:
        'You can have multiple except blocks for different exception types. Python tries them in order and runs the first one that matches.',
    },
    {
      type: 'code',
      content: 'Multiple except blocks:',
      code: `try:\n    n = int("abc")\n    result = 10 / n\nexcept ValueError:\n    print("bad number")\nexcept ZeroDivisionError:\n    print("cannot divide by zero")`,
      output: 'bad number',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Catch the narrowest exception you can handle. If you cannot do anything useful in the except block, let the exception bubble up.',
    },
    {
      type: 'text',
      content:
        'The full structure: `try / except / else / finally`. The `else` block runs only if no exception was raised. The `finally` block always runs, with or without an error.',
    },
    {
      type: 'code',
      content: 'Full try structure in action:',
      code: `def safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print("cannot divide by zero")\n        return None\n    else:\n        print("division succeeded")\n        return result\n    finally:\n        print("done with attempt")\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))`,
      output: `division succeeded\ndone with attempt\n5.0\ncannot divide by zero\ndone with attempt\nNone`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`finally` is used for cleanup — closing files, releasing locks, resetting state. It runs even if the except block runs, or if an uncaught exception is on its way out.',
    },
    {
      type: 'text',
      content:
        'Raise your own exceptions with `raise`. This is how functions refuse bad input and tell the caller exactly why.',
    },
    {
      type: 'code',
      content: 'The raise statement:',
      code: `def set_age(age):\n    if age < 0:\n        raise ValueError("age cannot be negative")\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print("rejected:", e)`,
      output: 'rejected: age cannot be negative',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Fail fast. Validate inputs at the top of a function with `raise` — do not let bad data flow into your logic.',
    },
    {
      type: 'text',
      content:
        'Define your own exception classes when you need a domain-specific error. Subclass Exception and give it a meaningful name.',
    },
    {
      type: 'code',
      content: 'Custom exception class:',
      code: `class InsufficientFunds(Exception):\n    pass\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFunds(f"need {amount - balance} more")\n    return balance - amount\n\ntry:\n    withdraw(50, 100)\nexcept InsufficientFunds as e:\n    print("declined:", e)`,
      output: 'declined: need 50 more',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Context managers use `with` to guarantee cleanup — the file always closes, even if an exception happens inside the block.',
    },
    {
      type: 'code',
      content: 'with statement — safe resource handling:',
      code: `with open("data.txt", "w") as f:\n    f.write("hello")\n\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)\n# File is closed automatically after the block`,
      output: 'hello',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Opening files without `with` means you must call `.close()` manually. If an exception happens before close(), the file stays open. Always prefer `with`.',
    },
    {
      type: 'text',
      content:
        'Anti-patterns to avoid: bare except, silently swallowing exceptions, catching exceptions you cannot handle.',
    },
    {
      type: 'code',
      content: 'Anti-pattern vs correct handling:',
      code: `# BAD — hides everything\ndef bad():\n    try:\n        return 1 / 0\n    except:\n        pass              # silent failure — what happened?\n\n# GOOD — narrow, informative\ndef good():\n    try:\n        return 1 / 0\n    except ZeroDivisionError:\n        print("cannot divide by zero")\n        return None\n\nprint(bad())\nprint(good())`,
      output: `None\ncannot divide by zero\nNone`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'If you do not know how to handle an exception, do not catch it. Let it propagate — the traceback tells the real story.',
    },
    {
      type: 'text',
      content:
        'That is exceptions. `try / except / else / finally`, `raise`, custom classes, and `with` cover nearly every real-world error-handling pattern you will write.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What exception is raised?',
      code: 'nums = [1, 2, 3]\nprint(nums[10])',
      options: ['IndexError', 'KeyError', 'ValueError', 'TypeError'],
      correct: 0,
      explanation:
        'Accessing a list index that does not exist raises IndexError. (KeyError is for dicts, ValueError is for wrong-value casts.)',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: `try:\n    print("try")\n    n = 1 / 0\nexcept ZeroDivisionError:\n    print("except")\nelse:\n    print("else")\nfinally:\n    print("finally")`,
      options: [
        'try, except, else, finally',
        'try, except, finally',
        'try, else, finally',
        'try, finally',
      ],
      correct: 1,
      explanation:
        'The except block runs (ZeroDivisionError). The else block is SKIPPED when an exception is caught. The finally block always runs.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Why is a bare `except:` (with no exception class) considered bad?',
      options: [
        'It is slower than a typed except',
        'It is a syntax error in Python 3',
        'It catches ALL exceptions, hiding bugs and even blocking Ctrl+C',
        'It only catches ValueError',
      ],
      correct: 2,
      explanation:
        'A bare except catches everything — including KeyboardInterrupt and SystemExit. Real bugs get silently swallowed. Always name the exception you expect to handle.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the function raises ValueError for negative input:',
      code: 'def validate(n):\n    if n < 0:\n        ___ ValueError("must be non-negative")\n    return n',
      options: ['raise', 'throw', 'except', 'return'],
      correct: 0,
      explanation:
        'Use `raise` to raise an exception. `throw` is not Python syntax. `except` is for catching, not raising.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write `safe_divide(a, b)` that returns a / b. If b is 0, return the string "undefined" instead of crashing.',
      starterCode:
        'def safe_divide(a, b):\n    # your code here\n    pass',
      tests: [
        { input: 'safe_divide(10, 2)', expected: '5.0' },
        { input: 'safe_divide(10, 0)', expected: "'undefined'" },
        { input: 'safe_divide(0, 5)', expected: '0.0' },
        { input: 'safe_divide(-8, 4)', expected: '-2.0' },
      ],
      hint: 'Use try/except ZeroDivisionError and return "undefined" in the except block.',
      solution:
        'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "undefined"',
      explanation:
        'Catch the specific exception. Returning a sentinel value ("undefined") is one valid pattern — raising is another. Choose based on whether the caller can reasonably continue.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'code-challenge',
      question:
        'Write `parse_ints(strings)` that takes a list of strings and returns a list of integers. Skip any string that cannot be converted to an int (do not crash).',
      starterCode:
        'def parse_ints(strings):\n    # your code here\n    pass',
      tests: [
        { input: 'parse_ints(["1", "2", "3"])', expected: '[1, 2, 3]' },
        { input: 'parse_ints(["1", "x", "3"])', expected: '[1, 3]' },
        { input: 'parse_ints(["a", "b"])', expected: '[]' },
        { input: 'parse_ints([])', expected: '[]' },
      ],
      hint: 'Loop, wrap int(s) in try/except ValueError, append only successes.',
      solution:
        'def parse_ints(strings):\n    result = []\n    for s in strings:\n        try:\n            result.append(int(s))\n        except ValueError:\n            pass\n    return result',
      explanation:
        'This is a legitimate use of try/except: we EXPECT bad input and want to skip it. Different from the bare-except anti-pattern because we specifically catch ValueError.',
      xp: 30,
    },
    {
      id: 'q7',
      type: 'output-match',
      question:
        'Try to divide 10 by 0. Catch the ZeroDivisionError and print "cannot divide". Do NOT crash.',
      starterCode:
        '# Write your try/except here\n',
      expectedOutput: 'cannot divide',
      hint: 'Wrap `10 / 0` in a try block. In the except ZeroDivisionError block, print "cannot divide".',
      solution:
        'try:\n    10 / 0\nexcept ZeroDivisionError:\n    print("cannot divide")',
      explanation:
        'The try block raises ZeroDivisionError. The except block catches it and prints the message instead of crashing.',
      xp: 20,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   Lesson registry
   ═══════════════════════════════════════════════════════════ */ 
export const pythonBasicsLessons = {
  variables: variablesLesson,
  'data-types': dataTypesLesson,
  operators: operatorsLesson,
  strings: stringsLesson,
  lists: listsLesson,
  conditionals: conditionalsLesson,
  loops: loopsLesson,
  functions: functionsLesson,
  'dicts-sets': dictsSetsLesson,
  errors: errorsLesson,
};

export const getLesson = (lessonId) => pythonBasicsLessons[lessonId] || null;