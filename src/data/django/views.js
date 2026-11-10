// 🎸 Django — Lesson 3: Views & URLs

export const djangoViewsLesson = {
  id: 'django-views',
  title: 'Views & URLs — Connecting the Pieces',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'The URL router looks at the incoming request and decides which View to call. The View fetches data from the Model, renders a Template, and returns an HTTP response. This is the glue of Django.',

  sections: [
    {
      type: 'text',
      content:
        'Django uses two files to connect URLs to Views: `urls.py` (the routing table) and `views.py` (the actual logic).',
    },
    {
      type: 'code',
      content: 'urls.py:',
      code: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.home, name='home'),\n    path('books/', views.book_list, name='book_list'),\n    path('books/<int:id>/', views.book_detail, name='book_detail'),\n]`,
      language: 'python',
    },
    {
      type: 'code',
      content: 'views.py:',
      code: `from django.shortcuts import render, get_object_or_404\nfrom .models import Book\n\ndef home(request):\n    return render(request, 'home.html')\n\ndef book_list(request):\n    books = Book.objects.all()\n    return render(request, 'books/list.html', {'books': books})\n\ndef book_detail(request, id):\n    book = get_object_or_404(Book, id=id)\n    return render(request, 'books/detail.html', {'book': book})`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice `get_object_or_404`. This is a Django helper. It tries to fetch the book. If it does not exist, it automatically returns a 404 page instead of crashing. Always use this for detail views.',
    },

    // ── VIEW TYPES ───────────────────
    {
      type: 'text',
      content:
        'There are two kinds of views:\n\n• **Function-Based Views (FBV):** Just a Python function. Simple and readable. Best for beginners.\n• **Class-Based Views (CBV):** A class that inherits from `View` or `TemplateView`. More structured, reusable, and used in large projects.',
    },
    {
      type: 'code',
      content: 'Class-based view:',
      code: `from django.views.generic import ListView\n\nclass BookListView(ListView):\n    model = Book\n    template_name = 'books/list.html'\n    context_object_name = 'books'`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'For a beginner, stick to Function-Based Views. They are easier to understand and reason about. Django`s generic class views are powerful but can be confusing when you need to customize things.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'URL matching',
      description:
        'Move the slider to test different URL paths against the urlpatterns list. See which view gets called.',
      sliders: [
        { id: 'path', label: 'URL Path (0=/, 1=/books/, 2=/books/1/, 3=/unknown/)', min: 0, max: 3, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ path }) => {
        const paths = ['/', '/books/', '/books/1/', '/unknown/'];
        const matches = ['home()', 'book_list()', 'book_detail(id=1)', '404 Not Found'];
        return {
          points: [
            { x: 0, y: 1, color: 'cyan', r: 10, label: paths[path] },
            { x: 1, y: 1, color: matches[path].includes('404') ? 'rose' : 'emerald', r: 10, label: matches[path] },
          ],
          domain: [-0.5, 1.5],
          range: [0.5, 1.5],
          fns: [],
        };
      },
      formula: ({ path }) => {
        const paths = ['/', '/books/', '/books/1/', '/unknown/'];
        return `\\text{Requesting: } ${paths[path]}`;
      },
      caption:
        'Django checks the URL patterns in order. The first matching one wins. If nothing matches, you get a 404.',
    },

    // ── RENDER VS HTTPRESPONSE ───────
    {
      type: 'text',
      content:
        'You will use two main response types:\n\n• `HttpResponse("text")` — Returns a raw string.\n• `render(request, template, context)` — Renders an HTML template.',
    },
    {
      type: 'code',
      content: 'Both in one view:',
      code: `from django.http import HttpResponse\n\ndef hello(request):\n    return HttpResponse("<h1>Hello</h1>")  # raw HTML\n\ndef book_page(request):\n    return render(request, 'books.html', {'books': []})  # rendered template`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Never build large HTML strings in Python. Use templates. It makes your code much easier to maintain and keeps HTML and logic separate.',
    },
    {
      type: 'tip',
      content:
        'Next: Capstone. You will build a small blog app that uses everything: Models, Views, URLs, and Templates.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Where are URL patterns defined in Django?',
      options: ['models.py', 'views.py', 'urls.py', 'settings.py'],
      correct: 2,
      explanation:
        '`urls.py` is the routing file. It maps URL paths to view functions.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does `get_object_or_404` do?',
      options: [
        'Returns 404 if the object does not exist.',
        'Fetches all objects.',
        'Deletes an object.',
        'Creates a new object.',
      ],
      correct: 0,
      explanation:
        'It tries to fetch the object. If no matching row exists, it raises a 404 error page (instead of crashing with a 500).',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write `match_url(path, patterns)` that returns the view name matching the path. `patterns` is a list of tuples `(path, view)`. Return "404" if no match.',
      starterCode:
        'def match_url(path, patterns):\n    # your code here\n    pass',
      tests: [
        { input: 'match_url("/books/", [("/", "home"), ("/books/", "books")])', expected: "'books'" },
        { input: 'match_url("/x/", [("/", "home")])', expected: "'404'" },
      ],
      hint: 'Loop and compare exact paths.',
      solution:
        'def match_url(path, patterns):\n    for p, view in patterns:\n        if p == path:\n            return view\n    return "404"',
      explanation:
        'Django does this comparison in order. The first matching pattern wins.',
      xp: 25,
    },
    {
      id: 'q4',
      type: 'output-match',
      question:
        'Simulate rendering: given book title "Python", print "Welcome to Python".',
      starterCode: 'title = "Python"\n# your code here\n',
      expectedOutput: 'Welcome to Python',
      hint: 'Use an f-string.',
      solution: 'title = "Python"\nprint(f"Welcome to {title}")',
      explanation:
        'In Django, this would be `render(request, "book.html", {"title": title})` and the template would have `Welcome to {{ title }}`.',
      xp: 15,
    },
  ],
};