// 🌶️ Flask — Lesson 1: What is Flask?

export const flaskBasicsLesson = {
  id: 'flask-basics',
  title: 'What is Flask?',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'Flask is a micro web framework for Python. It is called "micro" because it does not force you to use a specific database, template engine, or authentication system. You build it your way. This is the perfect starting point for web development.',

  sections: [
    {
      type: 'text',
      content:
        'A web framework is just a piece of software that handles the boring parts of web development: listening for HTTP requests, parsing the URL, matching it to a function, and sending back a response.',
    },
    {
      type: 'note',
      content:
        'In real-world Flask, you run `app.run()` and it starts a server on your machine. In this browser environment, we will simulate the server logic using pure Python classes. The routing, request, and response concepts are 100% identical.',
    },

    // ── THE MINIMAL APP ──────────────
    {
      type: 'text',
      content:
        'A minimal Flask app is just 5 lines of code:',
    },
    {
      type: 'code',
      content: 'Flask "Hello World" (conceptual):',
      code: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return "Hello, World!"\n\n# In real Flask, this starts the server\n# app.run()`,
      output: `(Server running on http://localhost:5000)`,
      language: 'python',
    },

    // ── HOW ROUTING WORKS ────────────
    {
      type: 'text',
      content:
        'The `@app.route("/")` is called a **decorator**. It tells Flask: "When a user visits the `/` URL, run this function and return its result".',
    },
    {
      type: 'text',
      content:
        'Routing is just a mapping between a URL path and a Python function. When a request comes in, Flask looks at the URL, finds the matching function, calls it, and returns the string as the HTTP response.',
    },
    {
      type: 'code',
      content: 'Simulating Flask routing in pure Python:',
      code: `class MockFlask:\n    def __init__(self):\n        self.routes = {}\n    \n    def route(self, path):\n        def decorator(func):\n            self.routes[path] = func\n            return func\n        return decorator\n    \n    def request(self, path):\n        if path in self.routes:\n            return self.routes[path]()\n        return "404 Not Found"\n\napp = MockFlask()\n\n@app.route('/')\ndef home():\n    return "Hello, World!"\n\n@app.route('/about')\ndef about():\n    return "About page"\n\nprint(app.request('/'))\nprint(app.request('/about'))\nprint(app.request('/unknown'))`,
      output: `Hello, World!\nAbout page\n404 Not Found`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'This is exactly how Flask works under the hood — just a dictionary of paths and functions. The real Flask adds a lot of features (HTTP methods, parsing, cookies), but the core idea is this simple.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'The routing table',
      description:
        'This is what happens when a request comes in. Flask looks up the URL in a routing table and calls the matching function.',
      sliders: [
        { id: 'path', label: 'URL Path', min: 0, max: 2, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ path }) => {
        const paths = ['/', '/about', '/contact'];
        const current = paths[path];
        const routes = { '/': 'home()', '/about': 'about()', '/contact': 'contact()' };
        const response = routes[current] ? `Runs ${routes[current]}` : '404 Not Found';
        
        return {
          points: [
            { x: 0, y: 2, color: 'brand', r: 10, label: `Request: ${current}` },
            { x: 1, y: 1, color: 'cyan', r: 10, label: 'Router' },
            { x: 2, y: response.includes('404') ? 0 : 2, color: response.includes('404') ? 'rose' : 'emerald', r: 10, label: response },
          ],
          domain: [-0.5, 2.5],
          range: [-0.5, 2.5],
          fns: [],
        };
      },
      formula: ({ path }) => {
        const paths = ['/', '/about', '/contact'];
        return `\\text{Route lookup for } "${paths[path]}"`;
      },
      caption:
        'Move the slider to send different requests. The router matches the path and calls the function.',
    },

    // ── WHY FLASK ────────────────────
    {
      type: 'text',
      content:
        'Why use Flask?\n\n• **Minimal:** You only add what you need.\n• **Flexible:** Use any database, ORM, or template engine.\n• **Perfect for APIs:** A Flask JSON API is 10 lines of code.\n• **Great for learning:** You can read the entire source code in an afternoon.',
    },
    {
      type: 'note',
      content:
        'If you are building a small API, a prototype, or learning web development, Flask is the best choice. For large, complex apps with lots of built-in features, Django (the next module) is better.',
    },
    {
      type: 'tip',
      content:
        'Next: HTTP methods. Not all requests are the same. GET requests ask for data. POST requests submit data. Let us see how Flask handles both.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does the `@app.route()` decorator do in Flask?',
      options: [
        'Starts the server.',
        'Maps a URL to a Python function.',
        'Connects to a database.',
        'Renders an HTML template.',
      ],
      correct: 1,
      explanation:
        'The decorator tells Flask which function to run when a specific URL is visited. It is the core of routing.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'Why is Flask called a "micro" framework?',
      options: [
        'Because it is only for small projects.',
        'Because it provides the minimum features and you add what you need.',
        'Because it uses less memory.',
        'Because it is written in C.',
      ],
      correct: 1,
      explanation:
        '"Micro" does not mean limited. It means Flask does not force you into specific tools. You choose your own database, auth, and templates.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write a `MockFlask` class with a `route` method and a `handle` method. `route(path)` should store a function, and `handle(path)` should return the function output or "404".',
      starterCode:
        'class MockFlask:\n    def __init__(self):\n        # your code here\n        pass\n',
      tests: [
        {
          input: `app = MockFlask()\n@app.route('/')\ndef home(): return "ok"\napp.handle('/')`,
          expected: "'ok'",
        },
        {
          input: `app = MockFlask()\n@app.route('/')\ndef home(): return "ok"\napp.handle('/missing')`,
          expected: "'404'",
        },
      ],
      hint: 'Store routes in a dictionary. Return "404" if not found.',
      solution:
        'class MockFlask:\n    def __init__(self):\n        self.routes = {}\n    def route(self, path):\n        def decorator(func):\n            self.routes[path] = func\n            return func\n        return decorator\n    def handle(self, path):\n        if path in self.routes:\n            return self.routes[path]()\n        return "404"',
      explanation:
        'This is the core of Flask. Everything else is built on top of this simple routing concept.',
      xp: 30,
    },
    {
      id: 'q4',
      type: 'output-match',
      question:
        'Create a route "/hello" that returns "Hi!". Handle a request to "/hello" and print the result.',
      starterCode: '# your code here\n',
      expectedOutput: 'Hi!',
      hint: 'Use the MockFlask class from the previous challenge.',
      solution:
        'class MockFlask:\n    def __init__(self): self.routes = {}\n    def route(self, p):\n        def d(f): self.routes[p] = f; return f\n        return d\n    def handle(self, p): return self.routes[p]() if p in self.routes else "404"\napp = MockFlask()\n@app.route("/hello")\ndef hello(): return "Hi!"\nprint(app.handle("/hello"))',
      explanation:
        'The function registered for "/hello" is called and its result is returned.',
      xp: 20,
    },
  ],
};