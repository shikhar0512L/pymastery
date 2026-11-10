// 🎸 Django — Lesson 2: Models & ORM

export const djangoModelsLesson = {
  id: 'django-models',
  title: 'Models & ORM — Databases in Python',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'In Django, you never write SQL. You define a Python class, and Django creates the database table for you. This is the ORM (Object-Relational Mapping) in action.',

  sections: [
    {
      type: 'text',
      content:
        'A Django model is a Python class that inherits from `models.Model`. Each attribute represents a column in the database table.',
    },
    {
      type: 'code',
      content: 'Defining a model (models.py):',
      code: `from django.db import models\n\nclass Book(models.Model):\n    title = models.CharField(max_length=200)\n    author = models.CharField(max_length=100)\n    published_year = models.IntegerField()\n    is_available = models.BooleanField(default=True)\n\n    def __str__(self):\n        return self.title`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'This class creates a table with 4 columns. `CharField` becomes `VARCHAR`, `IntegerField` becomes `INT`, and so on. But you do not need to know the SQL — you just use the Python methods.',
    },
    {
      type: 'note',
      content:
        'Django has a specific command flow for database changes:\n\n1. `python manage.py makemigrations` → Creates a migration file describing the change.\n2. `python manage.py migrate` → Applies the changes to the database.',
    },

    // ── QUERYING THE ORM ─────────────
    {
      type: 'text',
      content:
        'To work with the data, you use the `objects` manager (this is added to every model automatically).',
    },
    {
      type: 'code',
      content: 'ORM queries:',
      code: `# Create\nbook = Book.objects.create(title="Python 101", author="Ada", published_year=2020)\n\n# Read all\nall_books = Book.objects.all()\n\n# Filter\nrecent = Book.objects.filter(published_year__gte=2020)\n\n# Get a single record\none_book = Book.objects.get(id=1)\n\n# Update\nbook.title = "Python 201"\nbook.save()\n\n# Delete\nbook.delete()`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Notice `published_year__gte=2020`. The double underscore (`__gte` means "greater than or equal to") is how you do comparisons in the ORM. You can also do `__contains`, `__startswith`, `__in`, etc.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'ORM query explorer',
      description:
        'Slide through different query types to see what SQL they would generate.',
      sliders: [
        { id: 'query', label: 'Query Type', min: 0, max: 3, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ query }) => {
        const queries = [
          { orm: 'Book.objects.all()', sql: 'SELECT * FROM book;' },
          { orm: 'Book.objects.filter(published_year__gte=2020)', sql: "SELECT * FROM book WHERE published_year >= 2020;" },
          { orm: 'Book.objects.get(id=1)', sql: 'SELECT * FROM book WHERE id = 1;' },
          { orm: 'Book.objects.filter(title__contains="Python")', sql: "SELECT * FROM book WHERE title LIKE '%Python%';" },
        ];
        return {
          points: [
            { x: 0, y: 1, color: 'cyan', r: 10, label: queries[query].orm },
            { x: 1, y: 0, color: 'rose', r: 10, label: queries[query].sql },
          ],
          domain: [-0.5, 1.5],
          range: [-0.5, 1.5],
          fns: [],
        };
      },
      formula: ({ query }) => {
        return `\\text{Current query: }`;
      },
      caption:
        'The ORM converts your Python methods into SQL automatically. You write Python, Django writes SQL.',
    },

    // ── MIGRATIONS ───────────────────
    {
      type: 'text',
      content:
        'What happens when you add a new field to the model? You need to update the database schema. This is where **migrations** come in.',
    },
    {
      type: 'code',
      content: 'Migration workflow:',
      code: `# 1. Add a field to your model\nclass Book(models.Model):\n    # ... old fields ...\n    rating = models.FloatField(default=0.0)\n\n# 2. Create the migration\n# python manage.py makemigrations\n\n# 3. Apply it\n# python manage.py migrate`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Never edit the database directly. Always go through migrations. Otherwise, Django will lose track of the schema and your app will break. Migrations are version-controlled, so you can roll them back if something goes wrong.',
    },
    {
      type: 'tip',
      content:
        'Next: Views and URLs. How do you connect a URL to a model and a template?',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does `Book.objects.all()` do?',
      options: [
        'Deletes all books.',
        'Returns all rows in the book table as objects.',
        'Creates a new book.',
        'Connects to the database.',
      ],
      correct: 1,
      explanation:
        '`objects.all()` is the simplest ORM query. It returns a QuerySet containing every row in the table.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does the `__gte` suffix mean in `filter(year__gte=2020)`?',
      options: [
        'Greater than or equal to',
        'Greater than every value',
        'Get the exact value',
        'Group by the value',
      ],
      correct: 0,
      explanation:
        'Django uses `__gte` (and friends: `__lte`, `__gt`, `__lt`, `__contains`) to specify how the filter should work.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write a function `filter_books(books, year)` that returns only the books published in or after `year`. Assume `books` is a list of `{"title": str, "year": int}` dicts.',
      starterCode:
        'def filter_books(books, year):\n    # your code here\n    pass',
      tests: [
        { input: 'filter_books([{"title": "A", "year": 2018}, {"title": "B", "year": 2020}], 2020)', expected: "[{'title': 'B', 'year': 2020}]" },
        { input: 'filter_books([], 2000)', expected: '[]' },
      ],
      hint: 'Use a list comprehension with `b["year"] >= year`.',
      solution:
        'def filter_books(books, year):\n    return [b for b in books if b["year"] >= year]',
      explanation:
        'This is exactly what `Book.objects.filter(year__gte=year)` does behind the scenes.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'output-match',
      question:
        'Simulate an ORM query: given a list of books, print the titles of books with year >= 2020.',
      starterCode: 'books = [("A", 2018), ("B", 2020), ("C", 2021)]\n# your code here\n',
      expectedOutput: 'B\nC',
      hint: 'Loop and check condition.',
      solution:
        'books = [("A", 2018), ("B", 2020), ("C", 2021)]\nfor title, year in books:\n    if year >= 2020:\n        print(title)',
      explanation:
        'This is what `Book.objects.filter(year__gte=2020)` would return.',
      xp: 15,
    },
  ],
};