// 🎸 Django — Lesson 4: Capstone — The Blog App

export const djangoCapstoneLesson = {
  id: 'django-capstone',
  title: 'Capstone — Build a Blog App',
  difficulty: 'intermediate',
  duration: 28,
  intro:
    'Let us put everything together. We will build the skeleton of a blog application using Django: a Post model, a list view, and a detail view. This is the "Hello World" of Django projects.',

  sections: [
    {
      type: 'text',
      content:
        'A blog has two main pages:\n\n• **Blog list page** — Shows all posts (title + excerpt).\n• **Blog detail page** — Shows one post (title + full content).',
    },
    {
      type: 'note',
      content:
        'Every Django project starts with `django-admin startproject myproject`. Then you create "apps" with `python manage.py startapp blog`. Each app is a self-contained module with its own models, views, and templates.',
    },

    // ── THE MODEL ────────────────────
    {
      type: 'text',
      content:
        '**Step 1: The Model (blog/models.py).**',
    },
    {
      type: 'code',
      content: 'blog/models.py:',
      code: `from django.db import models\n\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    slug = models.SlugField(unique=True)\n    content = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)\n\n    def __str__(self):\n        return self.title`,
      language: 'python',
    },

    // ── THE VIEWS ────────────────────
    {
      type: 'text',
      content:
        '**Step 2: The Views (blog/views.py).**',
    },
    {
      type: 'code',
      content: 'blog/views.py:',
      code: `from django.shortcuts import render, get_object_or_404\nfrom .models import Post\n\ndef post_list(request):\n    posts = Post.objects.all().order_by('-created_at')\n    return render(request, 'blog/list.html', {'posts': posts})\n\ndef post_detail(request, slug):\n    post = get_object_or_404(Post, slug=slug)\n    return render(request, 'blog/detail.html', {'post': post})`,
      language: 'python',
    },

    // ── THE URLS ─────────────────────
    {
      type: 'text',
      content:
        '**Step 3: The URLs (blog/urls.py).**',
    },
    {
      type: 'code',
      content: 'blog/urls.py:',
      code: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.post_list, name='post_list'),\n    path('<slug:slug>/', views.post_detail, name='post_detail'),\n]`,
      language: 'python',
    },

    // ── THE TEMPLATES ────────────────
    {
      type: 'text',
      content:
        '**Step 4: The Templates.**',
    },
    {
      type: 'code',
      content: 'blog/templates/blog/list.html:',
      code: `{% extends "base.html" %}\n\n{% block content %}\n  <h1>All Posts</h1>\n  {% for post in posts %}\n    <article>\n      <h2><a href="{% url 'post_detail' post.slug %}">{{ post.title }}</a></h2>\n      <p>{{ post.created_at|date:"M d, Y" }}</p>\n    </article>\n  {% empty %}\n    <p>No posts yet.</p>\n  {% endfor %}\n{% endblock %}`,
      language: 'html',
    },
    {
      type: 'code',
      content: 'blog/templates/blog/detail.html:',
      code: `{% extends "base.html" %}\n\n{% block content %}\n  <h1>{{ post.title }}</h1>\n  <p>Published: {{ post.created_at|date:"M d, Y" }}</p>\n  <div>{{ post.content }}</div>\n{% endblock %}`,
      language: 'html',
    },

    // ── THE ADMIN PANEL ──────────────
    {
      type: 'text',
      content:
        '**Step 5: The Admin Panel (blog/admin.py).**',
    },
    {
      type: 'code',
      content: 'blog/admin.py:',
      code: `from django.contrib import admin\nfrom .models import Post\n\nadmin.site.register(Post)`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That one line gives you a full admin interface at `/admin/`. You can log in, create posts, edit them, delete them — all with a polished UI. No extra code needed. This is Django`s "batteries-included" magic.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Blog request cycle',
      description:
        'Move through the request cycle to see how a blog post is displayed.',
      sliders: [
        { id: 'step', label: 'Step', min: 0, max: 4, step: 1, default: 0, decimals: 0 },
      ],
      render: ({ step }) => {
        const steps = [
          'GET /',
          'urls.py → post_list',
          'Post.objects.all()',
          'render(list.html)',
          'HTML to browser',
        ];
        return {
          points: steps.map((label, i) => ({
            x: i,
            y: i === step ? 1.5 : 0.5,
            color: i === step ? 'brand' : 'surface-700',
            r: i === step ? 12 : 8,
            label,
          })),
          domain: [-0.5, 4.5],
          range: [-0.5, 2],
          fns: [],
        };
      },
      formula: ({ step }) => {
        const steps = ['Request', 'URL Match', 'Query DB', 'Render', 'Response'];
        return `\\text{Step: } ${steps[step]}`;
      },
      caption:
        'Every page in a Django app follows this same flow. Once you understand it, you can build anything.',
    },

    // ── WHAT YOU BUILT ───────────────
    {
      type: 'text',
      content:
        'Look at what you just built:\n\n• A **Model** representing the database table.\n• **Views** that fetch data and render templates.\n• **URLs** that route requests.\n• **Templates** that render HTML.\n• A fully working **Admin panel** with one line of code.',
    },
    {
      type: 'note',
      content:
        'This is a mini version of a production Django app. Real projects add authentication, forms, static files, and deployment — but the core is the same MTV pattern.',
    },
    {
      type: 'tip',
      content:
        'You now know both Flask and Django. Flask is great for APIs and microservices. Django is great for full apps. Together, they cover the entire Python web development landscape.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the correct command to create a new Django project?',
      options: [
        'django start',
        'python manage.py startproject myproject',
        'django-admin startproject myproject',
        'pip install django',
      ],
      correct: 2,
      explanation:
        'The `django-admin startproject` command scaffolds a new project. After that, you use `python manage.py` for most commands.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does `Post.objects.all().order_by("-created_at")` do?',
      options: [
        'Deletes all posts.',
        'Returns all posts, newest first.',
        'Returns the oldest post.',
        'Creates a new post.',
      ],
      correct: 1,
      explanation:
        'The `-` prefix means descending order. So `-created_at` means newest first.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'code-challenge',
      question:
        'Write `latest_posts(posts, n)` that returns the last `n` posts sorted by date (newest first).',
      starterCode:
        'def latest_posts(posts, n):\n    # your code here\n    pass',
      tests: [
        { input: 'latest_posts([{"title": "A", "date": 1}, {"title": "B", "date": 2}, {"title": "C", "date": 3}], 2)', expected: "[{'title': 'C', 'date': 3}, {'title': 'B', 'date': 2}]" },
      ],
      hint: 'Sort by date descending, take first n.',
      solution:
        'def latest_posts(posts, n):\n    return sorted(posts, key=lambda p: p["date"], reverse=True)[:n]',
      explanation:
        'This mirrors the Django ORM`s `order_by("-created_at")[:n]`.',
      xp: 30,
    },
    {
      id: 'q4',
      type: 'output-match',
      question:
        'Simulate the list page: given a list of post titles, print each title on a new line.',
      starterCode: 'titles = ["Hello World", "Django 101"]\n# your code here\n',
      expectedOutput: 'Hello World\nDjango 101',
      hint: 'Loop and print.',
      solution:
        'titles = ["Hello World", "Django 101"]\nfor t in titles:\n    print(t)',
      explanation:
        'In Django, this is what the `{% for post in posts %}{{ post.title }}{% endfor %}` template does.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question: 'What does the admin panel give you automatically?',
      options: [
        'A database backup.',
        'A fully functional CRUD interface for your models.',
        'Free hosting.',
        'A REST API.',
      ],
      correct: 1,
      explanation:
        'With just `admin.site.register(Post)`, Django auto-generates a UI to create, read, update, and delete posts. It is incredibly powerful for internal tools and admin dashboards.',
      xp: 20,
    },
  ],
};