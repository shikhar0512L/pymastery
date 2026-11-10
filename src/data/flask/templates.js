// 🌶️ Flask — Lesson 4: Templates & Jinja2

export const flaskTemplatesLesson = {
  id: 'flask-templates',
  title: 'Templates & Jinja2',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Returning raw strings from every route gets messy fast. Jinja2 is Flask\'s template engine — it lets you write HTML files with placeholders that get filled in with Python data.',

  sections: [
    {
      type: 'text',
      content:
        'Instead of building HTML in Python strings, you write a template file. Flask\'s `render_template()` reads the file, injects variables, and returns HTML.',
    },
    {
      type: 'code',
      content: 'A simple template (templates/index.html):',
      code: `<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello, {{ name }}!</h1>\n    <p>You have {{ count }} messages.</p>\n  </body>\n</html>`,
      language: 'html',
    },
    {
      type: 'code',
      content: 'Rendering it from Flask:',
      code: `from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return render_template('index.html', name='Ada', count=3)`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`{{ }}` is where variables go. Jinja2 replaces each placeholder with the value from the render function. Everything else in the template stays exactly as written.',
    },

    // ── TEMPLATE SYNTAX ──────────────
    {
      type: 'text',
      content:
        'Jinja2 has three main constructs:\n\n• **`{{ value }}`** — print a variable.\n• **`{% for item in items %} ... {% endfor %}`** — loop.\n• **`{% if condition %} ... {% endif %}`** — conditional.',
    },
    {
      type: 'code',
      content: 'Loops and conditionals in Jinja2:',
      code: `{# Template: users.html #}\n<ul>\n  {% for user in users %}\n    <li>{% if user.active %}✓{% else %}✗{% endif %} {{ user.name }}</li>\n  {% endfor %}\n</ul>\n\n{# Flask route: #}\n@app.route('/users')\ndef users():\n    users = [\n        {"name": "Ada", "active": True},\n        {"name": "Alan", "active": False},\n    ]\n    return render_template('users.html', users=users)`,
      language: 'python',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Template rendering',
      description:
        'See how a template with placeholders gets filled in with real data.',
      sliders: [
        { id: 'name', label: 'Name index (0=Ada, 1=Alan, 2=Grace)', min: 0, max: 2, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ name }) => {
        const names = ['Ada', 'Alan', 'Grace'];
        const counts = [3, 7, 0];
        return {
          points: [
            { x: 0, y: 2, color: 'cyan', r: 10, label: '{{ name }}' },
            { x: 0, y: 1, color: 'cyan', r: 10, label: '{{ count }}' },
            { x: 1, y: 2, color: 'brand', r: 10, label: names[name] },
            { x: 1, y: 1, color: 'brand', r: 10, label: counts[name].toString() },
          ],
          domain: [-0.5, 1.5],
          range: [0.5, 2.5],
          fns: [],
        };
      },
      formula: ({ name }) => {
        const names = ['Ada', 'Alan', 'Grace'];
        return `\\text{Hello, } ${names[name]}!`;
      },
      caption:
        'The template string stays the same. Only the data changes. That is why templates are reusable.',
    },

    // ── TEMPLATE INHERITANCE ─────────
    {
      type: 'text',
      content:
        'Real websites reuse layouts. Jinja2 has **template inheritance** for this. You write a `base.html` with the common structure, and child templates fill in blocks.',
    },
    {
      type: 'code',
      content: 'Base template (base.html):',
      code: `<!DOCTYPE html>\n<html>\n  <head><title>{% block title %}My Site{% endblock %}</title></head>\n  <body>\n    <nav>Home | About</nav>\n    <main>\n      {% block content %}{% endblock %}\n    </main>\n  </body>\n</html>`,
      language: 'html',
    },
    {
      type: 'code',
      content: 'Child template (home.html):',
      code: `{% extends "base.html" %}\n\n{% block title %}Home{% endblock %}\n\n{% block content %}\n  <h1>Welcome!</h1>\n{% endblock %}`,
      language: 'html',
    },
    {
      type: 'note',
      content:
        '`{% extends %}` pulls in the base template. `{% block %}` overrides specific sections. This is how every real Flask app is organized. Without inheritance, you would copy-paste the navbar into every page.',
    },

    // ── FILTERS ──────────────────────
    {
      type: 'text',
      content:
        'Jinja2 has filters for formatting values. They use the `|` syntax:\n\n• `{{ name|upper }}` — uppercase.\n• `{{ price|round(2) }}` — round.\n• `{{ text|truncate(50) }}` — truncate.\n• `{{ items|length }}` — count.',
    },
    {
      type: 'code',
      content: 'Using filters:',
      code: `{{ user.name|title }}\n{{ product.price|round(2) }}\n{{ article.body|truncate(100) }}`,
      language: 'html',
    },
    {
      type: 'tip',
      content:
        'You now know the entire Flask framework: routing, methods, requests, responses, and templates. Next: Django, which takes a different approach — batteries included.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does `{{ name }}` do in a Jinja2 template?',
      options: [
        'Starts a for-loop.',
        'Prints the value of the `name` variable.',
        'Calls a Python function.',
        'Defines a new variable.',
      ],
      correct: 1,
      explanation:
        '`{{ }}` is the output tag. Jinja2 replaces it with the string value of the variable.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What is template inheritance?',
      options: [
        'Copying a template file.',
        'Using a base template with `{% extends %}` and filling in blocks in child templates.',
        'Reading HTML from a database.',
        'A way to share variables.',
      ],
      correct: 1,
      explanation:
        '`{% extends "base.html" %}` pulls in the base. `{% block content %}` replaces the default content. This avoids copy-pasting the layout.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write a mini `render(template, data)` function that replaces `{{ key }}` placeholders with data values. Assume data is a dict.',
      starterCode:
        'def render(template, data):\n    # your code here\n    pass',
      tests: [
        { input: 'render("Hello, {{ name }}!", {"name": "Ada"})', expected: "'Hello, Ada!'" },
        { input: 'render("{{ a }} + {{ b }}", {"a": 1, "b": 2})', expected: "'1 + 2'" },
        { input: 'render("No placeholders", {})', expected: "'No placeholders'" },
      ],
      hint: 'Loop over data items, do template.replace("{{ key }}", str(value)).',
      solution:
        'def render(template, data):\n    for key, value in data.items():\n        template = template.replace("{{ " + key + " }}", str(value))\n    return template',
      explanation:
        'This is essentially what Jinja2 does under the hood, but Jinja2 also handles loops, conditionals, filters, etc.',
      xp: 30,
    },
    {
      id: 'q4',
      type: 'output-match',
      question:
        'Simulate a loop in a template: given items = ["a", "b", "c"], render them as "- a\\n- b\\n- c".',
      starterCode: 'items = ["a", "b", "c"]\n# your code here\n',
      expectedOutput: '- a\n- b\n- c',
      hint: 'Use a loop with print.',
      solution: 'items = ["a", "b", "c"]\nfor item in items:\n    print(f"- {item}")',
      explanation:
        'In Jinja2, this would be `{% for item in items %}- {{ item }}\\n{% endfor %}`.',
      xp: 15,
    },
  ],
};