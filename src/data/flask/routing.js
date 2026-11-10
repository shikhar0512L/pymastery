// 🌶️ Flask — Lesson 2: Routing & HTTP Methods

export const flaskRoutingLesson = {
  id: 'flask-routing',
  title: 'Routing & HTTP Methods',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Not all web requests are the same. When you load a page, that is a GET request. When you submit a form, that is a POST request. Flask lets you handle each method differently for the same URL.',

  sections: [
    {
      type: 'text',
      content:
        'HTTP has a few common methods:\n\n• **GET:** Ask the server for data (e.g., load a page).\n• **POST:** Send data to the server (e.g., submit a form).\n• **PUT/PATCH:** Update data.\n• **DELETE:** Delete data.',
    },
    {
      type: 'text',
      content:
        'In Flask, you can specify which methods a route accepts. If a request comes in with a method the route does not handle, Flask returns a 405 Method Not Allowed error.',
    },
    {
      type: 'code',
      content: 'Handling multiple methods:',
      code: `from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.route('/login', methods=['GET', 'POST'])\ndef login():\n    if request.method == 'POST':\n        return "Processing login..."\n    else:\n        return "Please enter your credentials"\n\n# In this browser environment, we simulate the request:`,
      language: 'python',
    },

    // ── URL VARIABLES ────────────────
    {
      type: 'text',
      content:
        'What if you have a URL like `/user/123` and another like `/user/456`? You do not want to write a separate function for every ID. This is where **URL variables** come in.',
    },
    {
      type: 'math',
      latex:
        "\\text{@app.route('/user/<username>')}",
      caption:
        "The `<username>` part is a placeholder. Flask passes it as an argument to your function.",
    },
    {
      type: 'code',
      content: 'Dynamic routing:',
      code: `@app.route('/user/<username>')\ndef profile(username):\n    return f"Profile of {username}"\n\n# In real Flask:\n# /user/ada -> "Profile of ada"`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'You can even specify types. `/user/<int:id>` means the URL will only match if the `id` is an integer. This saves you from having to parse strings manually.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Method-based routing',
      description:
        'Slide to change the request method. Notice how the same URL behaves differently for GET vs POST.',
      sliders: [
        { id: 'method', label: 'Method (0=GET, 1=POST)', min: 0, max: 1, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ method }) => {
        const isPost = method === 1;
        return {
          points: [
            { x: 0, y: 1, color: isPost ? 'rose' : 'cyan', r: 10, label: isPost ? 'POST' : 'GET' },
            { x: 1, y: 0, color: 'brand', r: 10, label: 'Server' },
            { x: 2, y: 1, color: isPost ? 'rose' : 'cyan', r: 10, label: isPost ? 'Process Form' : 'Show Form' },
          ],
          domain: [-0.5, 2.5],
          range: [-0.5, 1.5],
          fns: [],
        };
      },
      formula: ({ method }) => {
        return method === 0
          ? `\\text{GET} \\to \\text{Show login form}`
          : `\\text{POST} \\to \\text{Process login data}`;
      },
      caption:
        'Same URL (/login), different methods, different responses. This is how authentication pages work.',
    },

    // ── 404 VS 405 ───────────────────
    {
      type: 'text',
      content:
        'Two common errors you will see:\n\n• **404 Not Found:** The URL does not exist.\n• **405 Method Not Allowed:** The URL exists, but does not accept this method (e.g., trying to POST to a GET-only URL).',
    },
    {
      type: 'tip',
      content:
        'Next: Request data. How does Flask read form data from a POST request? That is where `request.args`, `request.form`, and `request.json` come in.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Which HTTP method is used to submit a form?',
      options: ['GET', 'POST', 'DELETE', 'HEAD'],
      correct: 1,
      explanation:
        'POST is used to send data to the server. GET is for retrieving data.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does `/user/<int:id>` do?',
      options: [
        'Creates a route that only matches if `<id>` is an integer.',
        'Returns an integer.',
        'Creates a database table.',
        'Converts the URL to an int.',
      ],
      correct: 0,
      explanation:
        'The `<int:id>` syntax is a type converter. The route only matches if the URL segment is a valid integer.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write `match_route(path)` that returns the function name for `/user/123` → "user", or `/post/42` → "post", or "404".',
      starterCode:
        'def match_route(path):\n    # your code here\n    pass',
      tests: [
        { input: 'match_route("/user/123")', expected: "'user'" },
        { input: 'match_route("/post/42")', expected: "'post'" },
        { input: 'match_route("/unknown")', expected: "'404'" },
      ],
      hint: 'Split the path by "/" and check the first non-empty segment.',
      solution:
        'def match_route(path):\n    parts = path.strip("/").split("/")\n    if parts and parts[0] in ("user", "post"):\n        return parts[0]\n    return "404"',
      explanation:
        'This is a simplified version of Flask URL parsing.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'output-match',
      question:
        'Simulate a route handler for GET /hello. Print "Hi" if method is GET, else "405". Test with GET.',
      starterCode: 'method = "GET"\n# your code here\n',
      expectedOutput: 'Hi',
      hint: 'Check if method == "GET".',
      solution: 'method = "GET"\nif method == "GET":\n    print("Hi")\nelse:\n    print("405")',
      explanation:
        'This is a manually implemented method check. Flask does it automatically when you specify `methods=[...]`.',
      xp: 15,
    },
  ],
};