// 🌶️ Flask — Lesson 3: Requests & Responses

export const flaskRequestsLesson = {
  id: 'flask-requests',
  title: 'Requests & Responses',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'A web application is just a loop: receive a request, do some work, send a response. Flask gives you clean tools to read the request (URL, query string, form data) and build the response (status code, headers, body).',

  sections: [
    {
      type: 'text',
      content:
        'Every request contains a lot of information. Flask wraps all of it in the `request` object. You import it and use it inside your route handler.',
    },
    {
      type: 'code',
      content: 'Reading request data:',
      code: `from flask import request\n\n# URL: /search?q=flask&limit=10\n@app.route('/search')\ndef search():\n    query = request.args.get('q')        # "flask"\n    limit = request.args.get('limit')    # "10"\n    return f"Searching for {query}"\n\n# POST body: {"title": "Hello"}\n@app.route('/create', methods=['POST'])\ndef create():\n    title = request.json.get('title')    # "Hello"\n    return f"Created: {title}"`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`request.args` is for the query string (the `?key=value` part). `request.form` is for HTML form data (form-encoded). `request.json` is for JSON payloads. Use the right one based on what the client sends.',
    },

    // ── RESPONSE OBJECTS ─────────────
    {
      type: 'text',
      content:
        'Returning a string from a route creates a 200 OK response by default. But you often need more control: custom status codes, headers, JSON.',
    },
    {
      type: 'code',
      content: 'Building responses:',
      code: `from flask import jsonify, make_response\n\n# Return JSON\n@app.route('/api/user')\ndef api_user():\n    return jsonify({"name": "Ada", "age": 36})\n\n# Custom status code\n@app.route('/not-here')\ndef not_here():\n    return "Not Found", 404\n\n# Custom headers\n@app.route('/custom')\ndef custom():\n    resp = make_response("Hello")\n    resp.headers['X-Custom'] = '42'\n    return resp`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        '`jsonify` is Flask\'s magic. It takes a Python dictionary, converts it to JSON, and sets the correct `Content-Type: application/json` header automatically. If you return `{"name": "Ada"}` directly, Flask 2.x now does this for you too.',
    },

    // ── STATUS CODES ─────────────────
    {
      type: 'text',
      content:
        'Status codes tell the client what happened:\n\n• **200 OK:** Success.\n• **201 Created:** Resource created (used for POST).\n• **400 Bad Request:** Client sent invalid data.\n• **401 Unauthorized:** Not logged in.\n• **404 Not Found:** URL does not exist.\n• **500 Internal Server Error:** Server crashed.',
    },
    {
      type: 'simulation',
      title: 'Response inspector',
      description:
        'Slide to choose a status code. See what it means and when you would use it.',
      sliders: [
        { id: 'code', label: 'Status Code (0=200, 1=201, 2=400, 3=404, 4=500)', min: 0, max: 4, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ code }) => {
        const codes = [200, 201, 400, 404, 500];
        const meanings = ['OK', 'Created', 'Bad Request', 'Not Found', 'Server Error'];
        const current = codes[code];
        const color = current < 300 ? 'emerald' : current < 500 ? 'amber' : 'rose';
        
        return {
          points: [
            { x: 0, y: 1, color: 'cyan', r: 10, label: `HTTP ${current}` },
            { x: 1, y: 1, color: color, r: 10, label: meanings[code] },
          ],
          domain: [-0.5, 1.5],
          range: [0.5, 1.5],
          fns: [],
        };
      },
      formula: ({ code }) => {
        const codes = [200, 201, 400, 404, 500];
        return `\\text{Status: } ${codes[code]}`;
      },
      caption:
        'Always return the right code. 200 is not always correct. A POST that creates a resource should return 201.',
    },
    {
      type: 'warning',
      content:
        'Do not return a 200 OK with the body "Error". If something failed, return a 4xx or 5xx status. APIs and frontends depend on the status code to know what happened, not the response body.',
    },
    {
      type: 'tip',
      content:
        'Next: Templates. Instead of returning raw strings, you can render HTML pages with variables, loops, and conditionals using Jinja2.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Which Flask object holds data from the request?',
      options: ['response', 'request', 'session', 'app'],
      correct: 1,
      explanation:
        '`request` is the global object (context-local in Flask) that contains the URL, query string, form data, JSON, headers, etc.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does `request.args` contain?',
      options: [
        'The JSON body of a POST request.',
        'The query string (the `?key=value` part of the URL).',
        'The form-encoded body.',
        'The HTTP headers.',
      ],
      correct: 1,
      explanation:
        '`request.args` is a dict-like object for URL query parameters. `request.form` is for HTML form data. `request.json` is for JSON body.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'What does `jsonify()` do?',
      options: [
        'Parses JSON from the request.',
        'Returns a JSON response with the correct Content-Type header.',
        'Stores JSON in a file.',
        'Validates JSON input.',
      ],
      correct: 1,
      explanation:
        '`jsonify` is a convenience function that converts a Python dict to a JSON string and sets `Content-Type: application/json` automatically.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-challenge',
      question:
        'Write a function `parse_query(query_string)` that parses a string like "a=1&b=2" into a dict.',
      starterCode:
        'def parse_query(qs):\n    # your code here\n    pass',
      tests: [
        { input: 'parse_query("a=1&b=2")', expected: "{'a': '1', 'b': '2'}" },
        { input: 'parse_query("")', expected: '{}' },
        { input: 'parse_query("name=Ada")', expected: "{'name': 'Ada'}" },
      ],
      hint: 'Split by "&", then split each part by "=".',
      solution:
        'def parse_query(qs):\n    if not qs: return {}\n    out = {}\n    for part in qs.split("&"):\n        k, v = part.split("=")\n        out[k] = v\n    return out',
      explanation:
        'This is what Flask does under the hood when it populates `request.args`.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'output-match',
      question: 'Given request body JSON `{"name": "Ada"}`, print "Hello, Ada" using `.get()`.',
      // 👇 Simple starter code (No Flask import needed)
      starterCode: 'data = {"name": "Ada"}\n# Extract the name using .get() and print "Hello, Ada"\n',
      expectedOutput: 'Hello, Ada',
      hint: 'Use `data.get("name")` inside an f-string.',
      solution: 'data = {"name": "Ada"}\nprint(f"Hello, {data.get(\'name\')}")',
      explanation: 'In real Flask, this data comes from `request.json`, but the Python logic is exactly the same.',
      xp: 15,
    },
  ],
};