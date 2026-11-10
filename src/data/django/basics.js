// 🎸 Django — Lesson 1: MTV Architecture

export const djangoBasicsLesson = {
  id: 'django-basics',
  title: 'Django — The MTV Architecture',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Django is a "batteries-included" web framework. It gives you a database ORM, an admin panel, and authentication out of the box. Its core pattern is MTV: Model, Template, View.',

  sections: [
    {
      type: 'text',
      content:
        'Unlike Flask, which is a micro-framework, Django is designed for large applications. The creators of Django (at a newspaper) wanted a framework that could handle massive amounts of content and data without breaking a sweat.',
    },
    {
      type: 'note',
      content:
        'Django uses the **MTV** pattern. If you have heard of **MVC** (Model-View-Controller), MTV is just Django\'s renamed version of it.\n\n• **Model** = Database structure.\n• **Template** = HTML UI.\n• **View** = The Python logic that connects them.',
    },

    // ── THE MTV FLOW ─────────────────
    {
      type: 'text',
      content:
        'Here is how a request flows through a Django app:\n\n1. User visits `/books/`\n2. Django\'s URL router matches the path to a **View**.\n3. The View asks the **Model** for data (e.g., "get all books").\n4. The Model fetches rows from the database.\n5. The View passes the data to a **Template**.\n6. The Template renders HTML.\n7. Django sends the HTML back to the user.',
    },
    {
      type: 'code',
      content: 'A conceptual Django View:',
      code: `# views.py\nfrom django.shortcuts import render\nfrom .models import Book\n\ndef book_list(request):\n    books = Book.objects.all()   # Ask the Model\n    return render(request, 'books/list.html', {'books': books})  # Pass to Template`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Notice `Book.objects.all()`. This is the Django ORM. You do not write SQL like `SELECT * FROM books`. You call Python methods. The ORM converts your Python code into SQL behind the scenes.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'The MTV flow',
      description:
        'Move the slider to trace a request through the Django architecture.',
      sliders: [
        { id: 'stage', label: 'Stage (0=URL, 1=View, 2=Model, 3=Template, 4=Response)', min: 0, max: 4, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ stage }) => {
        const labels = ['URL Router', 'View Logic', 'Model (DB)', 'Template', 'HTML Response'];
        const colors = ['brand', 'cyan', 'violet', 'amber', 'emerald'];
        return {
          points: labels.map((label, i) => ({
            x: i,
            y: i === stage ? 1.5 : 0.5,
            color: i === stage ? colors[i] : 'surface-700',
            r: i === stage ? 12 : 8,
            label: label,
          })),
          domain: [-0.5, 4.5],
          range: [-0.5, 2],
          fns: [],
        };
      },
      formula: ({ stage }) => {
        const labels = ['URL Router', 'View Logic', 'Model (DB)', 'Template', 'HTML Response'];
        return `\\text{Current Stage: } ${labels[stage]}`;
      },
      caption:
        'Django processes the request in this exact order. The View acts as the middleman between the database and the HTML.',
    },

    // ── WHY DJANGO ───────────────────
    {
      type: 'text',
      content:
        'Why choose Django?\n\n• **Admin Panel:** You get a full admin interface for free. Just define your models, and Django builds the UI to manage them.\n• **ORM:** Database operations are in Python, not SQL.\n• **Auth:** User login, signup, and permissions are built-in.\n• **Security:** Protects against SQL injection, CSRF, XSS by default.',
    },
    {
      type: 'tip',
      content:
        'Next: Models. The heart of Django. You will see how to turn a Python class into a database table without writing a single line of SQL.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does MTV stand for in Django?',
      options: ['Model, Template, View', 'Method, Table, Vector', 'Main, Test, Verify', 'Model, Tool, Visual'],
      correct: 0,
      explanation: 'Django uses MTV: Model (database), Template (HTML), View (logic).',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What is the Django ORM?',
      options: [
        'A type of HTML template.',
        'A tool to write database queries in Python instead of SQL.',
        'A JavaScript library.',
        'A server configuration.',
      ],
      correct: 1,
      explanation:
        'ORM stands for Object-Relational Mapping. It lets you interact with the database using Python objects and methods.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write a simple function `render_template(template, context)` that replaces `{{ key }}` with values from context.',
      starterCode:
        'def render_template(template, context):\n    # your code here\n    pass',
      tests: [
        { input: 'render_template("Hello {{ name }}", {"name": "Ada"})', expected: "'Hello Ada'" },
        { input: 'render_template("{{ a }}{{ b }}", {"a": 1, "b": 2})', expected: "'12'" },
      ],
      hint: 'Use .replace() for each key.',
      solution:
        'def render_template(template, context):\n    for key, val in context.items():\n        template = template.replace("{{ " + key + " }}", str(val))\n    return template',
      explanation:
        'This is a tiny version of what Django templates do. Real Django templates also support loops, conditions, filters, and more.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'output-match',
      question:
        'Simulate the ORM: given a list of books, print "Book: <title>" for each. Use `for b in books: print(f"Book: {b[0]}")`.',
      starterCode: 'books = [("Python", 2020), ("Django", 2021)]\n# your code here\n',
      expectedOutput: 'Book: Python\nBook: Django',
      hint: 'Loop through books and print.',
      solution:
        'books = [("Python", 2020), ("Django", 2021)]\nfor b in books:\n    print(f"Book: {b[0]}")',
      explanation:
        'In Django, this would be `Book.objects.all()` returning a QuerySet of Book objects, each with a `.title` attribute.',
      xp: 15,
    },
  ],
};