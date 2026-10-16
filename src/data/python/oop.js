// 📘 Python OOP — Classes, Inheritance, Dunder Methods
// Depth standard: intermediate.

/* ═══════════════════════════════════════════════════════════
   LESSON 1 — Classes & Objects
   ═══════════════════════════════════════════════════════════ */
export const classesObjectsLesson = {
  id: 'classes-objects',
  title: 'Classes & Objects',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'A class is a blueprint; an object is a thing built from that blueprint. Understand __init__ and self and you understand OOP.',
  sections: [
    {
      type: 'text',
      content:
        'Define a class with `class`. Attributes are data attached to the class or object. Methods are functions attached to the class.',
    },
    {
      type: 'code',
      content: 'A minimal class:',
      code: `class Dog:\n    species = "Canis lupus"      # class attribute\n\n    def bark(self):              # method\n        print("Woof!")\n\nmy_dog = Dog()                   # instantiate\nprint(my_dog.species)\nmy_dog.bark()`,
      output: 'Canis lupus\nWoof!',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`__init__` is the constructor — it runs automatically when you create an object. `self` is the object itself; Python passes it implicitly.',
    },
    {
      type: 'code',
      content: 'The constructor and self:',
      code: `class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n\n    def intro(self):\n        print(f"I am {self.name}, grade {self.grade}")\n\ns1 = Student("Ada", "A")\ns2 = Student("Alan", "B")\ns1.intro()\ns2.intro()`,
      output: 'I am Ada, grade A\nI am Alan, grade B',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The first parameter of every instance method is `self` by convention. Python passes the instance automatically — you never supply it explicitly.',
    },
    {
      type: 'text',
      content:
        'Class attributes are shared by all instances. Instance attributes belong to a single object.',
    },
    {
      type: 'code',
      content: 'Class vs instance attributes:',
      code: `class Car:\n    wheels = 4              # class attribute\n\n    def __init__(self, color):\n        self.color = color  # instance attribute\n\nc1 = Car("red")\nc2 = Car("blue")\n\nprint(c1.wheels, c2.wheels)   # both share\nprint(c1.color, c2.color)     # distinct\n\nCar.wheels = 6\nprint(c1.wheels, c2.wheels)   # both see the change`,
      output: '4 4\nred blue\n6 6',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'If you set `c1.wheels = 8`, you create an INSTANCE attribute that shadows the class one. c2.wheels stays 4 (or 6, or whatever the class value is). Read-only sharing, not automatic syncing.',
    },
    {
      type: 'text',
      content:
        'Every object has a `__dict__` that shows its instance attributes. Class attributes live on the class, not in the instance dict.',
    },
    {
      type: 'code',
      content: 'Looking under the hood with __dict__:',
      code: `class Point:\n    dims = 2\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Point(3, 4)\nprint(p.__dict__)\nprint(Point.__dict__.keys())`,
      output: `{'x': 3, 'y': 4}\ndict_keys(['__module__', 'dims', '__init__', '__dict__', '__weakref__', '__doc__'])`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'You can add attributes to an object after it is created (Python is dynamic). Useful for quick prototyping, but keep it tidy.',
    },
    {
      type: 'code',
      content: 'Adding attributes dynamically:',
      code: `class Empty:\n    pass\n\ne = Empty()\ne.name = "Ada"\ne.age = 36\nprint(e.__dict__)`,
      output: `{'name': 'Ada', 'age': 36}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'A class is a factory for objects. Design it around the data the object needs (attributes) and the actions it performs (methods).',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    x = 1\n\na = A()\nb = A()\na.x = 5\nprint(a.x, b.x, A.x)',
      options: ['5 1 1', '5 5 5', '1 1 1', '5 5 1'],
      correct: 0,
      explanation:
        'Setting `a.x = 5` creates a new INSTANCE attribute on a. The class attribute x=1 and b.x are untouched. So: a.x=5, b.x=1, A.x=1.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\n\nc1 = Counter()\nc2 = Counter()\nc3 = Counter()\nprint(Counter.count)',
      options: ['0', '1', '3', 'Error'],
      correct: 2,
      explanation:
        'Each instantiation increments the CLASS attribute via Counter.count. After three instances, Counter.count is 3.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'What is `self` in a Python method?',
      options: [
        'A reserved keyword like `this` in Java',
        'A reference to the instance the method was called on',
        'A reference to the class itself',
        'A global variable',
      ],
      correct: 1,
      explanation:
        'self is a regular parameter that Python automatically fills with the instance. It is not a keyword — you could call it anything, but convention is `self`.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so the object stores the given name:',
      code: 'class User:\n    def __init__(___, name):\n        self.name = name',
      options: ['self', 'cls', 'obj', 'this'],
      correct: 0,
      explanation:
        'The first parameter of __init__ is the instance itself, conventionally named `self`. It is where you attach instance attributes.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a class `Rectangle` with __init__ taking width and height. Add a method `area()` that returns width × height.',
      starterCode:
        'class Rectangle:\n    def __init__(self, width, height):\n        # your code\n        pass\n\n    def area(self):\n        # your code\n        pass',
      tests: [
        { input: 'Rectangle(3, 4).area()', expected: '12' },
        { input: 'Rectangle(5, 5).area()', expected: '25' },
        { input: 'Rectangle(1, 100).area()', expected: '100' },
      ],
      hint: 'Store width and height as `self.width = width` and `self.height = height`. In area(), return `self.width * self.height`.',
      solution:
        'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height',
      explanation:
        'Standard OOP structure: constructor captures data, method uses it. Note that `self` is available in every method — no need to re-pass width or height.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 2 — Instance, Class & Static Methods
   ═══════════════════════════════════════════════════════════ */
export const methodsLesson = {
  id: 'methods',
  title: 'Instance, Class & Static Methods',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'Three kinds of methods, three different purposes. Knowing which to use is a hallmark of intermediate Python.',
  sections: [
    {
      type: 'text',
      content:
        'Instance methods take `self` and operate on a specific object. This is what you have been writing so far.',
    },
    {
      type: 'code',
      content: 'Instance method — bound to an object:',
      code: `class Account:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\nacc = Account(100)\nacc.deposit(50)\nprint(acc.balance)`,
      output: '150',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'A classmethod takes `cls` and operates on the class itself. Decorated with `@classmethod`. Frequently used as an alternative constructor.',
    },
    {
      type: 'code',
      content: 'Classmethod as alternate constructor:',
      code: `class Date:\n    def __init__(self, year, month, day):\n        self.year = year\n        self.month = month\n        self.day = day\n\n    @classmethod\n    def from_string(cls, s):\n        y, m, d = map(int, s.split("-"))\n        return cls(y, m, d)\n\n    def show(self):\n        return f"{self.year}-{self.month:02d}-{self.day:02d}"\n\nd = Date.from_string("2024-03-15")\nprint(d.show())`,
      output: '2024-03-15',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Use `@classmethod` when you need an alternative way to build objects — parsing from a string, from a dict, from JSON, etc.',
    },
    {
      type: 'text',
      content:
        'A staticmethod takes neither `self` nor `cls`. It is a plain function living in the class namespace — for grouping related utilities.',
    },
    {
      type: 'code',
      content: 'Staticmethod — no binding:',
      code: `class Math:\n    @staticmethod\n    def is_even(n):\n        return n % 2 == 0\n\n    @staticmethod\n    def add(a, b):\n        return a + b\n\nprint(Math.is_even(4))\nprint(Math.add(3, 5))`,
      output: 'True\n8',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'A staticmethod is essentially a namespaced function. If the function never touches self or cls, make it static — this communicates intent.',
    },
    {
      type: 'text',
      content:
        'You can call classmethods and staticmethods on the class or on an instance. Python figures it out.',
    },
    {
      type: 'code',
      content: 'Both call styles work:',
      code: `class Demo:\n    @classmethod\n    def cm(cls):\n        return f"class method on {cls.__name__}"\n\n    @staticmethod\n    def sm():\n        return "static method"\n\nprint(Demo.cm())\nprint(Demo().cm())\nprint(Demo.sm())\nprint(Demo().sm())`,
      output: 'class method on Demo\nclass method on Demo\nstatic method\nstatic method',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Do NOT use `self.some_classmethod()` if you can just call `type(self).some_classmethod()` or `ClassName.some_classmethod()`. It works, but the intent is clearer when called on the class.',
    },
    {
      type: 'text',
      content:
        'Choosing between them: instance method when you operate on the object, classmethod when you operate on the class (factories, counters), staticmethod for utilities that do not need either.',
    },
    {
      type: 'tip',
      content:
        'Reading OOP code: when you see `@classmethod`, think factory. When you see `@staticmethod`, think helper. When there is no decorator, it is a normal method acting on the instance.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    @staticmethod\n    def f():\n        return "static"\n\n    @classmethod\n    def g(cls):\n        return f"class {cls.__name__}"\n\nprint(A.f())\nprint(A.g())',
      options: [
        'static then class A',
        'static then class A',
        'Error',
        'class A then static',
      ],
      correct: 0,
      explanation:
        'A.f() calls the static method — no binding, returns "static". A.g() calls the classmethod — cls is the class A, so it returns "class A".',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class Factory:\n    count = 0\n\n    @classmethod\n    def make(cls):\n        cls.count += 1\n        return cls()\n\nFactory.make()\nFactory.make()\nprint(Factory.count)',
      options: ['0', '1', '2', 'Error'],
      correct: 2,
      explanation:
        '`cls.count += 1` increments the class attribute on the class. After two calls, count is 2.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'When should you use a staticmethod?',
      options: [
        'When you need to modify class state',
        'When the method does not use self or cls — it is just a utility',
        'When you want the method to be called only on the class',
        'When you need inheritance-aware factory logic',
      ],
      correct: 1,
      explanation:
        'Staticmethods are plain functions that happen to live inside the class. Use them when you do not need the instance or the class — just for organizing related utilities.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the factory method builds a Temperature from a Fahrenheit value:',
      code: 'class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n\n    @___\n    def from_fahrenheit(cls, f):\n        return cls((f - 32) * 5 / 9)',
      options: ['classmethod', 'staticmethod', 'property', 'abstractmethod'],
      correct: 0,
      explanation:
        'The method returns an instance of cls and takes cls as first arg — that is exactly what a classmethod is for. Calling Temperature.from_fahrenheit(212) gives a Temperature(100).',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a class `Circle` with __init__ taking radius. Add a classmethod `from_diameter(cls, d)` that builds a Circle from a diameter (radius = d / 2). Add an instance method `area()` returning π · r².',
      starterCode:
        'import math\n\nclass Circle:\n    def __init__(self, radius):\n        # your code\n        pass\n\n    @classmethod\n    def from_diameter(cls, d):\n        # your code\n        pass\n\n    def area(self):\n        # your code\n        pass',
      tests: [
        { input: 'round(Circle(1).area(), 4)', expected: '3.1416' },
        {
          input: 'round(Circle.from_diameter(4).area(), 4)',
          expected: '12.5664',
        },
        { input: 'Circle.from_diameter(10).radius', expected: '5.0' },
      ],
      hint: 'from_diameter should return `cls(d / 2)`. area returns `math.pi * self.radius ** 2`.',
      solution:
        'import math\n\nclass Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    @classmethod\n    def from_diameter(cls, d):\n        return cls(d / 2)\n\n    def area(self):\n        return math.pi * self.radius ** 2',
      explanation:
        'The classmethod uses `cls(...)` instead of hard-coding `Circle(...)` — this makes it subclass-friendly.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 3 — Inheritance
   ═══════════════════════════════════════════════════════════ */
export const inheritanceLesson = {
  id: 'inheritance',
  title: 'Inheritance & super()',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Inheritance lets a class reuse another class. super() is the glue. Get both right and half of your code becomes reusable.',
  sections: [
    {
      type: 'text',
      content:
        'To inherit, put the parent class in parentheses after the child class name. The child gets every attribute and method of the parent.',
    },
    {
      type: 'code',
      content: 'Basic single inheritance:',
      code: `class Animal:\n    def breathe(self):\n        print("Breathing...")\n\nclass Dog(Animal):\n    def bark(self):\n        print("Woof!")\n\nd = Dog()\nd.breathe()    # inherited\nd.bark()       # own`,
      output: 'Breathing...\nWoof!',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'When both classes have __init__, call `super().__init__(...)` in the child to run the parent constructor. Otherwise the parent attributes are never set.',
    },
    {
      type: 'code',
      content: 'super().__init__ in the child:',
      code: `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def introduce(self):\n        print(f"I am {self.name}, {self.age}")\n\nclass Student(Person):\n    def __init__(self, name, age, student_id):\n        super().__init__(name, age)\n        self.student_id = student_id\n\n    def show_id(self):\n        print(f"ID: {self.student_id}")\n\ns = Student("Ada", 18, "S123")\ns.introduce()\ns.show_id()`,
      output: 'I am Ada, 18\nID: S123',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Forgetting `super().__init__()` leaves the parent attributes undefined. You will get an AttributeError when a parent method tries to use them.',
    },
    {
      type: 'text',
      content:
        'Multiple inheritance: a class can inherit from several parents. Python uses MRO (Method Resolution Order) — a specific algorithm (C3 linearization) — to decide which method wins.',
    },
    {
      type: 'code',
      content: 'Multiple inheritance:',
      code: `class Swimmer:\n    def move(self):\n        print("Swimming")\n\nclass Walker:\n    def move(self):\n        print("Walking")\n\nclass Duck(Swimmer, Walker):\n    pass\n\nDuck().move()    # Swimmer wins — it is listed first\nprint(Duck.__mro__)`,
      output: `Swimming\n(<class '__main__.Duck'>, <class '__main__.Swimmer'>, <class '__main__.Walker'>, <class 'object'>)`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'You can check the MRO anytime with `ClassName.__mro__`. It shows the exact lookup order Python uses.',
    },
    {
      type: 'text',
      content:
        'Multilevel inheritance: A → B → C. C inherits everything from B, which itself inherits everything from A.',
    },
    {
      type: 'code',
      content: 'Multilevel — the chain:',
      code: `class Person:\n    def greet(self):\n        print("Hi")\n\nclass Employee(Person):\n    def work(self):\n        print("Working")\n\nclass Professor(Employee):\n    def teach(self):\n        print("Teaching")\n\np = Professor()\np.greet()    # from Person\np.work()     # from Employee\np.teach()    # own`,
      output: 'Hi\nWorking\nTeaching',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`isinstance()` checks the object against a class (or tuple of classes). `issubclass()` checks a class against another class.',
    },
    {
      type: 'code',
      content: 'isinstance and issubclass:',
      code: `class Animal: pass\nclass Dog(Animal): pass\n\nd = Dog()\nprint(isinstance(d, Dog))\nprint(isinstance(d, Animal))       # Dog is-a Animal\nprint(issubclass(Dog, Animal))\nprint(issubclass(Animal, Dog))     # parent is not a subclass of child`,
      output: 'True\nTrue\nTrue\nFalse',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Every class in Python inherits from `object` ultimately. That is why all objects have methods like `__str__`, `__repr__`, `__eq__` — they come from `object`.',
    },
    {
      type: 'tip',
      content:
        'Inheritance is a strong tool, but do not overuse it. Prefer composition ("has-a") when the relationship is not really "is-a". A Car has-an Engine — it is not an Engine.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    def hi(self):\n        print("A")\n\nclass B(A):\n    pass\n\nB().hi()',
      options: ['A', 'B', 'Error', 'None'],
      correct: 0,
      explanation:
        'B inherits everything from A. It has no `hi` method of its own, so the lookup finds A.hi.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    def __init__(self):\n        self.x = 1\n\nclass B(A):\n    def __init__(self):\n        self.y = 2\n\ntry:\n    b = B()\n    print(b.x)\nexcept AttributeError:\n    print("no x")',
      options: ['1', '2', 'no x', 'Error'],
      correct: 2,
      explanation:
        'B.__init__ overrides A.__init__ and does NOT call super().__init__(). So self.x is never set. Accessing it raises AttributeError.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'Class Duck(Swimmer, Walker) — both parents define move(). Which method runs when calling Duck().move()?',
      options: [
        'Walker.move — last in the parent list',
        'Swimmer.move — first in the parent list',
        'Both run sequentially',
        'Python raises an error',
      ],
      correct: 1,
      explanation:
        'Python uses MRO. The first parent listed wins — Swimmer. To check, run `Duck.__mro__`.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the child constructor calls the parent constructor:',
      code: 'class Child(Parent):\n    def __init__(self, a, b):\n        ___.__init__(a)\n        self.b = b',
      options: ['super()', 'parent()', 'self', 'cls'],
      correct: 0,
      explanation:
        '`super()` returns a proxy to the parent class. `super().__init__(a)` calls the parent constructor. It also handles MRO correctly for multiple inheritance.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a `Vehicle` class with __init__ taking brand. Create a `Car(Vehicle)` class with __init__ taking brand and doors. Car must call super().__init__(brand) and store doors. Add a method `describe()` that returns "{brand} with {doors} doors".',
      starterCode:
        'class Vehicle:\n    def __init__(self, brand):\n        self.brand = brand\n\nclass Car(Vehicle):\n    def __init__(self, brand, doors):\n        # your code\n        pass\n\n    def describe(self):\n        # your code\n        pass',
      tests: [
        {
          input: 'Car("Toyota", 4).describe()',
          expected: "'Toyota with 4 doors'",
        },
        {
          input: 'Car("BMW", 2).describe()',
          expected: "'BMW with 2 doors'",
        },
        { input: 'Car("Audi", 4).brand', expected: "'Audi'" },
      ],
      hint: 'Call super().__init__(brand) first, then self.doors = doors. In describe, use an f-string.',
      solution:
        'class Vehicle:\n    def __init__(self, brand):\n        self.brand = brand\n\nclass Car(Vehicle):\n    def __init__(self, brand, doors):\n        super().__init__(brand)\n        self.doors = doors\n\n    def describe(self):\n        return f"{self.brand} with {self.doors} doors"',
      explanation:
        'super().__init__ ensures the parent constructor runs. Without it, self.brand would not exist. This is the standard pattern for extending a parent constructor.',
      xp: 35,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 4 — Polymorphism & Overriding
   ═══════════════════════════════════════════════════════════ */
export const polymorphismLesson = {
  id: 'polymorphism',
  title: 'Polymorphism & Method Overriding',
  difficulty: 'intermediate',
  duration: 18,
  intro:
    'Same method name, different behavior — that is polymorphism. In Python it comes naturally, thanks to duck typing.',
  sections: [
    {
      type: 'text',
      content:
        'Polymorphism: you call the same method name on different objects, and each object responds its own way. The caller does not need to know the type.',
    },
    {
      type: 'code',
      content: 'Same call, different results:',
      code: `class Dog:\n    def speak(self):\n        return "Woof"\n\nclass Cat:\n    def speak(self):\n        return "Meow"\n\nclass Duck:\n    def speak(self):\n        return "Quack"\n\nfor a in [Dog(), Cat(), Duck()]:\n    print(a.speak())`,
      output: 'Woof\nMeow\nQuack',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'The pattern works because Python uses "duck typing". It does not care about the type — only whether the method exists.',
    },
    {
      type: 'note',
      content:
        '"If it walks like a duck and quacks like a duck, it is a duck." — the caller just needs `.speak()`. Any object providing that method is fine.',
    },
    {
      type: 'text',
      content:
        'Method overriding: a child class re-defines a method with the same name. When called on the child object, the child\'s version runs — the parent\'s is shadowed.',
    },
    {
      type: 'code',
      content: 'Overriding a method:',
      code: `class Animal:\n    def details(self):\n        print("Generic animal")\n\nclass Human(Animal):\n    def details(self):\n        print("Human — the talkative animal")\n\nHuman().details()   # child version`,
      output: 'Human — the talkative animal',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'If you still want the parent\'s behavior as part of the child\'s, call `super().method()`. Very common in overridden constructors and methods.',
    },
    {
      type: 'code',
      content: 'Calling super() inside an override:',
      code: `class Shape:\n    def describe(self):\n        return "Shape"\n\nclass Square(Shape):\n    def describe(self):\n        parent = super().describe()\n        return f"{parent} → Square"\n\nprint(Square().describe())`,
      output: 'Shape → Square',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Python does NOT support method overloading (same name, different signatures). If you define two methods with the same name in the same class, the LAST one silently replaces the first.',
    },
    {
      type: 'code',
      content: 'Overloading does not work in Python:',
      code: `class Hello:\n    def speak(self, a):\n        print("one arg")\n\n    def speak(self, a, b):    # overwrites the previous\n        print("two args")\n\nh = Hello()\nh.speak(1, 2)\n# h.speak(1)   # TypeError — the second def replaced the first`,
      output: 'two args',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'To emulate overloading, use default arguments or `*args` — or check argument types inside the method. Rarely needed in practice.',
    },
    {
      type: 'text',
      content:
        'Polymorphism shines in combination with inheritance: define a common interface on the parent, override in children, and iterate a heterogeneous list uniformly.',
    },
    {
      type: 'code',
      content: 'Full polymorphism with inheritance:',
      code: `class Shape:\n    def area(self):\n        raise NotImplementedError\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14159 * self.r ** 2\n\nclass Square(Shape):\n    def __init__(self, s):\n        self.s = s\n    def area(self):\n        return self.s ** 2\n\nfor sh in [Circle(2), Square(3)]:\n    print(f"{sh.area():.2f}")`,
      output: '12.57\n9.00',
      language: 'python',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    def hi(self):\n        print("A")\n\nclass B(A):\n    def hi(self):\n        print("B")\n\nB().hi()',
      options: ['A', 'B', 'A then B', 'Error'],
      correct: 1,
      explanation:
        'B overrides hi(). Python looks up hi on B first, finds B.hi, and calls it. A.hi is shadowed.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    def hi(self):\n        return "A"\n\nclass B(A):\n    def hi(self):\n        return super().hi() + "B"\n\nprint(B().hi())',
      options: ['A', 'B', 'AB', 'BA'],
      correct: 2,
      explanation:
        'B.hi calls super().hi() first (returns "A") and concatenates "B". Result: "AB".',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'What happens if you define two methods with the same name in one class?',
      options: [
        'Python raises a SyntaxError',
        'Both are kept; Python picks based on arguments',
        'The second replaces the first — Python does not support overloading',
        'The first wins by default',
      ],
      correct: 2,
      explanation:
        'Python has no method overloading. The second definition silently overwrites the first in the class namespace. Only the last one is callable.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so Cat.speak returns "Cat says Meow" while calling the parent first:',
      code: 'class Animal:\n    def speak(self):\n        return "Animal"\n\nclass Cat(Animal):\n    def speak(self):\n        return f"Cat says {___().speak()}"',
      options: ['super', 'parent', 'Animal', 'self'],
      correct: 0,
      explanation:
        'super().speak() invokes the parent method. Combined with the f-string, we get "Cat says Animal".',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a base class Shape with a method area() that raises NotImplementedError. Then Circle(Shape) with __init__(radius) and area() returning 3.14 * radius ** 2. Also Rectangle(Shape) with __init__(w, h) and area() returning w * h.',
      starterCode:
        'class Shape:\n    def area(self):\n        raise NotImplementedError\n\nclass Circle(Shape):\n    # your code\n    pass\n\nclass Rectangle(Shape):\n    # your code\n    pass',
      tests: [
        { input: 'round(Circle(2).area(), 2)', expected: '12.56' },
        { input: 'Rectangle(3, 4).area()', expected: '12' },
        { input: 'Rectangle(5, 5).area()', expected: '25' },
      ],
      hint: 'Circle stores self.radius = radius. Rectangle stores self.w and self.h. Both override area().',
      solution:
        'class Shape:\n    def area(self):\n        raise NotImplementedError\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return 3.14 * self.radius ** 2\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h',
      explanation:
        'Both Circle and Rectangle provide their own area(). Any code calling shape.area() works on either type — that is polymorphism.',
      xp: 35,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 5 — Encapsulation & Properties
   ═══════════════════════════════════════════════════════════ */
export const encapsulationLesson = {
  id: 'encapsulation',
  title: 'Encapsulation & Properties',
  difficulty: 'intermediate',
  duration: 20,
  intro:
    'Python does not enforce privacy — it uses convention and name mangling. The @property decorator is how you build controlled access.',
  sections: [
    {
      type: 'text',
      content:
        'Python has three "levels" of attribute visibility: public (no prefix), protected (single underscore), and private (double underscore).',
    },
    {
      type: 'code',
      content: 'Public, protected, private:',
      code: `class Account:\n    def __init__(self):\n        self.owner = "Ada"          # public\n        self._balance = 1000        # protected (convention only)\n        self.__pin = 1234           # private (name-mangled)\n\nacc = Account()\nprint(acc.owner)\nprint(acc._balance)                 # works, but bad practice\n# print(acc.__pin)                  # AttributeError\nprint(acc._Account__pin)            # mangled name — technically accessible`,
      output: 'Ada\n1000\n1234',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Python does NOT enforce privacy. `_x` is a warning ("do not touch"). `__x` is name-mangled to `_ClassName__x`, so it is harder but not impossible to access. The rule is courtesy, not a wall.',
    },
    {
      type: 'text',
      content:
        'Name mangling is used to prevent accidental collisions in subclasses — not to hide data from determined callers.',
    },
    {
      type: 'text',
      content:
        'The proper way to expose controlled access is with `@property`. It lets you define getters and setters that look like plain attribute access.',
    },
    {
      type: 'code',
      content: 'Property getter and setter:',
      code: `class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius\n\n    @property\n    def celsius(self):\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("below absolute zero")\n        self._celsius = value\n\nt = Temperature(25)\nprint(t.celsius)     # looks like attribute access\nt.celsius = 30\nprint(t.celsius)\n# t.celsius = -300   # ValueError`,
      output: '25\n30',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Notice the user writes `t.celsius = 30` — no method call syntax. The @property system makes the validation transparent.',
    },
    {
      type: 'text',
      content:
        'You can make a read-only property by defining only the getter. Attempting to set it raises AttributeError.',
    },
    {
      type: 'code',
      content: 'Read-only property:',
      code: `class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def radius(self):\n        return self._radius\n\n    @property\n    def area(self):\n        return 3.14159 * self._radius ** 2\n\nc = Circle(3)\nprint(c.radius)\nprint(f"{c.area:.2f}")\n# c.area = 100   # AttributeError: cannot set`,
      output: '3\n28.27',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Use @property when you want the simplicity of attribute access with the safety of validation or computed values. You can start with a plain attribute, and later "upgrade" it to a property without breaking callers.',
    },
    {
      type: 'text',
      content:
        'Do NOT add a property just to have one. If the attribute needs no validation and no computation, a plain attribute is simpler and faster.',
    },
    {
      type: 'warning',
      content:
        'Watch out: if you define both `self.x` and a property called `x`, you create an infinite recursion. Use a private backing attribute (`self._x`) inside the property.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    def __init__(self):\n        self.__x = 5\n\na = A()\nprint(a._A__x)',
      options: ['5', 'Error', 'None', '__x'],
      correct: 0,
      explanation:
        'Private attributes are name-mangled to `_ClassName__attr`. `a._A__x` retrieves it. This is why "private" in Python is convention, not enforcement.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class Box:\n    def __init__(self):\n        self._items = []\n\n    @property\n    def count(self):\n        return len(self._items)\n\nb = Box()\nb._items.append(1)\nb._items.append(2)\nprint(b.count)',
      options: ['0', '1', '2', 'Error'],
      correct: 2,
      explanation:
        'The property computes from the backing list. After two appends, count returns 2. Properties often compute values on the fly.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'Why is a single underscore (`_x`) called "protected" and not "private" in Python?',
      options: [
        'It is enforced by the interpreter',
        'It is only a convention — a hint to other developers, not a real access restriction',
        'It works only inside methods',
        'It is reserved for class attributes',
      ],
      correct: 1,
      explanation:
        'Single underscore is purely conventional. Python does not prevent access. It says "please do not touch this from outside, it is internal".',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so celsius can be read as an attribute:',
      code: 'class Temp:\n    def __init__(self, c):\n        self._c = c\n\n    @___\n    def celsius(self):\n        return self._c',
      options: ['property', 'staticmethod', 'classmethod', 'getter'],
      correct: 0,
      explanation:
        '@property turns a method into something that looks like an attribute. Access it as `temp.celsius` (no parentheses).',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a `Person` class with a `name` property backed by `_name`. The setter should raise ValueError if assigned an empty string. Reading the property returns the name.',
      starterCode:
        'class Person:\n    def __init__(self, name):\n        self.name = name    # will use the setter\n\n    @property\n    def name(self):\n        # your code\n        pass\n\n    @name.setter\n    def name(self, value):\n        # your code\n        pass',
      tests: [
        { input: 'Person("Ada").name', expected: "'Ada'" },
        {
          input: 'p = Person("Bob"); p.name = "Charlie"; p.name',
          expected: "'Charlie'",
        },
        {
          input: 'try:\n    Person("")\n    result = "no error"\nexcept ValueError:\n    result = "raised"\nresult',
          expected: "'raised'",
        },
      ],
      hint: 'Getter returns self._name. Setter checks `if not value:` and raises ValueError, else sets self._name = value.',
      solution:
        'class Person:\n    def __init__(self, name):\n        self.name = name\n\n    @property\n    def name(self):\n        return self._name\n\n    @name.setter\n    def name(self, value):\n        if not value:\n            raise ValueError("name cannot be empty")\n        self._name = value',
      explanation:
        'Assigning in __init__ hits the setter automatically. This gives you validation from the moment the object is created. Note the property and backing field have different names (name vs _name) — otherwise you would get infinite recursion.',
      xp: 35,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 6 — Abstraction (ABC)
   ═══════════════════════════════════════════════════════════ */
export const abstractionLesson = {
  id: 'abstraction',
  title: 'Abstraction & Abstract Base Classes',
  difficulty: 'intermediate',
  duration: 18,
  intro:
    'An abstract class is a contract: "any subclass MUST implement these methods". Use it to enforce interfaces.',
  sections: [
    {
      type: 'text',
      content:
        'Python ships an `abc` module. Subclass `ABC`, decorate methods with `@abstractmethod`, and any subclass that does not implement them cannot be instantiated.',
    },
    {
      type: 'code',
      content: 'A simple abstract base class:',
      code: `from abc import ABC, abstractmethod\n\nclass Vehicle(ABC):\n    @abstractmethod\n    def start(self):\n        pass\n\nclass Bike(Vehicle):\n    def start(self):\n        print("Bike starting")\n\nclass Car(Vehicle):\n    def start(self):\n        print("Car starting")\n\nBike().start()\nCar().start()\n# Vehicle().start()    # TypeError: cannot instantiate`,
      output: 'Bike starting\nCar starting',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'You cannot instantiate an abstract class directly. Attempting to do so raises `TypeError: Can\'t instantiate abstract class`.',
    },
    {
      type: 'text',
      content:
        'The abstract method has no body — it just declares "this method must exist in the subclass". The subclass provides the actual behavior.',
    },
    {
      type: 'note',
      content:
        'You can have both abstract methods and concrete methods (with real bodies) in the same abstract class. The concrete ones are inherited and can be called by subclasses.',
    },
    {
      type: 'code',
      content: 'Abstract class with a concrete method:',
      code: `from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\n    def describe(self):\n        return f"Area is {self.area():.2f}"\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\ns = Square(3)\nprint(s.describe())`,
      output: 'Area is 9.00',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Multiple abstract methods can be declared. A subclass must implement ALL of them (unless it too is abstract).',
    },
    {
      type: 'code',
      content: 'Enforcing an interface:',
      code: `from abc import ABC, abstractmethod\n\nclass Storage(ABC):\n    @abstractmethod\n    def save(self, key, value):\n        pass\n\n    @abstractmethod\n    def load(self, key):\n        pass\n\nclass MemoryStorage(Storage):\n    def __init__(self):\n        self._data = {}\n    def save(self, key, value):\n        self._data[key] = value\n    def load(self, key):\n        return self._data.get(key)\n\nms = MemoryStorage()\nms.save("x", 42)\nprint(ms.load("x"))`,
      output: '42',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Use ABCs when you want to guarantee that every implementation provides certain methods. This catches bugs early — at instantiation time, not deep inside your code later.',
    },
    {
      type: 'text',
      content:
        'Contrast with duck typing: duck typing asks "does this object have the method?" — Python trusts you. ABC enforces the contract upfront. Both are useful; pick by context.',
    },
    {
      type: 'warning',
      content:
        'Do not create abstract classes for everything. If the interface has only one implementation or you do not need enforcement, a plain base class is enough.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will happen?',
      code: 'from abc import ABC, abstractmethod\n\nclass Animal(ABC):\n    @abstractmethod\n    def speak(self):\n        pass\n\na = Animal()',
      options: [
        'a is created normally',
        'TypeError — cannot instantiate abstract class',
        'The abstract method becomes a no-op',
        'AttributeError',
      ],
      correct: 1,
      explanation:
        'Abstract classes cannot be instantiated. `TypeError: Can\'t instantiate abstract class Animal with abstract method speak`.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: `from abc import ABC, abstractmethod\n\nclass A(ABC):\n    @abstractmethod\n    def f(self):\n        pass\n\nclass B(A):\n    def f(self):\n        return "implemented"\n\nprint(B().f())`,
      options: ['None', 'implemented', 'Error', 'pass'],
      correct: 1,
      explanation:
        'B provides the required implementation of f, so it can be instantiated. Calling f returns "implemented".',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'What is the main purpose of an abstract class?',
      options: [
        'To make code run faster',
        'To prevent inheritance',
        'To define a contract — subclasses MUST implement certain methods',
        'To hide private attributes',
      ],
      correct: 2,
      explanation:
        'ABCs enforce a contract. Any subclass that does not implement all abstract methods cannot be instantiated. This catches missing implementations early.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so the method becomes abstract:',
      code: 'from abc import ABC, ___\n\nclass Base(ABC):\n    @___(method)\n    def process(self):\n        pass',
      options: ['abstractmethod', 'abstract', 'virtual', 'interface'],
      correct: 0,
      explanation:
        'Import `abstractmethod` from `abc` and use `@abstractmethod` as a decorator. Any subclass of ABC must implement it.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create an abstract base class `Payment` with an abstract method `pay(amount)`. Then implement two subclasses: `CashPayment` (returns f"Paid {amount} in cash") and `CardPayment` (returns f"Paid {amount} by card").',
      starterCode:
        'from abc import ABC, abstractmethod\n\nclass Payment(ABC):\n    # your code\n    pass\n\nclass CashPayment(Payment):\n    # your code\n    pass\n\nclass CardPayment(Payment):\n    # your code\n    pass',
      tests: [
        { input: 'CashPayment().pay(50)', expected: "'Paid 50 in cash'" },
        { input: 'CardPayment().pay(100)', expected: "'Paid 100 by card'" },
        {
          input: 'isinstance(CashPayment(), Payment)',
          expected: 'True',
        },
      ],
      hint: 'Payment declares `@abstractmethod def pay(self, amount)`. Each subclass implements its own version of pay().',
      solution:
        'from abc import ABC, abstractmethod\n\nclass Payment(ABC):\n    @abstractmethod\n    def pay(self, amount):\n        pass\n\nclass CashPayment(Payment):\n    def pay(self, amount):\n        return f"Paid {amount} in cash"\n\nclass CardPayment(Payment):\n    def pay(self, amount):\n        return f"Paid {amount} by card"',
      explanation:
        'The abstract class defines the contract. Each concrete subclass provides its behavior. Any code written against Payment can call pay() without knowing which concrete type it is.',
      xp: 35,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 7 — Dunder Methods
   ═══════════════════════════════════════════════════════════ */
export const dunderLesson = {
  id: 'dunder',
  title: 'Dunder Methods — Making Objects Feel Native',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Dunder methods (double underscore on both sides) hook your objects into Python\'s syntax: print, +, ==, len, [], iteration. This is how your classes feel built-in.',
  sections: [
    {
      type: 'text',
      content:
        'Dunder methods are called automatically by Python. You never call `obj.__str__()` yourself — you call `print(obj)` and Python routes through it.',
    },
    {
      type: 'code',
      content: 'Without __str__ — ugly output:',
      code: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Point(3, 4)\nprint(p)`,
      output: '<__main__.Point object at 0x...>',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Define `__str__` to control what `print(obj)` shows. Define `__repr__` to control what the REPL / `repr(obj)` shows. Convention: __repr__ should look like code that recreates the object.',
    },
    {
      type: 'code',
      content: 'Custom __str__ and __repr__:',
      code: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\n    def __repr__(self):\n        return f"Point({self.x}, {self.y})"\n\np = Point(3, 4)\nprint(p)              # uses __str__\nprint([p, p])         # list repr uses __repr__`,
      output: '(3, 4)\n[Point(3, 4), Point(3, 4)]',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'If you define only one, define __repr__. It is the fallback for both print and REPL display. Debugging is much nicer with a good __repr__.',
    },
    {
      type: 'text',
      content:
        'Arithmetic operators map to dunders: `+` → `__add__`, `-` → `__sub__`, `*` → `__mul__`, `==` → `__eq__`, `<` → `__lt__`.',
    },
    {
      type: 'code',
      content: 'Operator overloading with __add__ and __eq__:',
      code: `class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nprint(v1 + v2)\nprint(v1 == Vector(1, 2))\nprint(v1 == v2)`,
      output: 'Vector(4, 6)\nTrue\nFalse',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`__len__` powers `len(obj)`. `__getitem__` powers `obj[i]` and slicing. `__iter__` powers `for x in obj`.',
    },
    {
      type: 'code',
      content: 'Container dunders:',
      code: `class Deck:\n    def __init__(self, cards):\n        self.cards = cards\n\n    def __len__(self):\n        return len(self.cards)\n\n    def __getitem__(self, i):\n        return self.cards[i]\n\n    def __iter__(self):\n        return iter(self.cards)\n\nd = Deck(["A", "K", "Q"])\nprint(len(d))\nprint(d[0])\nprint(d[-1])\nfor c in d:\n    print(c)`,
      output: '3\nA\nQ\nA\nK\nQ',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Once you define `__getitem__`, you get slicing for free (Python passes slice objects). Once you define `__iter__` (or `__getitem__`), you get `for` loops, `in`, and comprehensions.',
    },
    {
      type: 'text',
      content:
        '`__call__` makes instances callable — the object behaves like a function.',
    },
    {
      type: 'code',
      content: '__call__ — callable objects:',
      code: `class Multiplier:\n    def __init__(self, factor):\n        self.factor = factor\n\n    def __call__(self, x):\n        return x * self.factor\n\nm = Multiplier(3)\nprint(m(5))\nprint(m(10))`,
      output: '15\n30',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Cheat sheet of the most useful dunders. You do not need all of them — only the ones that fit your class.',
    },
    {
      type: 'code',
      content: 'Quick reference:',
      code: `# __init__      → obj = Class(args)\n# __str__       → print(obj), str(obj)\n# __repr__      → repr(obj), REPL display\n# __eq__        → obj == other\n# __lt__        → obj < other\n# __add__       → obj + other\n# __len__       → len(obj)\n# __getitem__   → obj[key]\n# __setitem__   → obj[key] = value\n# __iter__      → for x in obj\n# __call__      → obj(args)`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is OOP in Python. Classes, inheritance, polymorphism, encapsulation, abstraction and dunder methods — the six pillars. Everything from here (frameworks, libraries) is built on these.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    def __repr__(self):\n        return "A!"\n\nprint(A())',
      options: ['A!', '<A object>', 'A', 'Error'],
      correct: 0,
      explanation:
        'When __str__ is not defined, print() falls back to __repr__. So it prints "A!".',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class Vec:\n    def __init__(self, x):\n        self.x = x\n    def __add__(self, other):\n        return Vec(self.x + other.x)\n    def __repr__(self):\n        return f"Vec({self.x})"\n\nprint(Vec(2) + Vec(3))',
      options: ['Vec(5)', 'Vec(2) + Vec(3)', '5', 'Error'],
      correct: 0,
      explanation:
        'The + operator triggers Vec.__add__, which returns a new Vec(5). Its __repr__ is "Vec(5)".',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You want `len(my_obj)` to work. Which dunder method must you define?',
      options: ['__str__', '__len__', '__length__', '__count__'],
      correct: 1,
      explanation:
        '`len(obj)` calls `obj.__len__()`. This method must return a non-negative integer.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so `+` works on Money objects:',
      code: 'class Money:\n    def __init__(self, amount):\n        self.amount = amount\n\n    def ___(self, other):\n        return Money(self.amount + other.amount)',
      options: ['add__', 'add', 'plus', '+'],
      correct: 0,
      explanation:
        'The full name is `__add__` (double underscores both sides). Dunder names always start and end with __.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a class `Fraction` with __init__(num, den). Define __add__ so `f1 + f2` returns a new Fraction with the standard cross-multiply formula (a/b + c/d = (a*d + c*b) / (b*d)). Define __eq__ to compare fractions by value (2/4 == 1/2).',
      starterCode:
        'class Fraction:\n    def __init__(self, num, den):\n        self.num = num\n        self.den = den\n\n    def __add__(self, other):\n        # your code\n        pass\n\n    def __eq__(self, other):\n        # your code\n        pass\n\n    def __repr__(self):\n        return f"Fraction({self.num}, {self.den})"',
      tests: [
        {
          input: '(Fraction(1, 2) + Fraction(1, 3)).__repr__()',
          expected: "'Fraction(5, 6)'",
        },
        {
          input: 'Fraction(2, 4) == Fraction(1, 2)',
          expected: 'True',
        },
        {
          input: 'Fraction(1, 3) == Fraction(1, 2)',
          expected: 'False',
        },
      ],
      hint: '__add__: new_num = self.num * other.den + other.num * self.den; new_den = self.den * other.den. __eq__: cross-multiply and compare: self.num * other.den == other.num * self.den.',
      solution:
        'class Fraction:\n    def __init__(self, num, den):\n        self.num = num\n        self.den = den\n\n    def __add__(self, other):\n        new_num = self.num * other.den + other.num * self.den\n        new_den = self.den * other.den\n        return Fraction(new_num, new_den)\n\n    def __eq__(self, other):\n        return self.num * other.den == other.num * self.den\n\n    def __repr__(self):\n        return f"Fraction({self.num}, {self.den})"',
      explanation:
        'Dunder methods let your custom class behave like a built-in numeric type. + and == now work naturally on Fraction objects.',
      xp: 40,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 8 — Decorators Deep Dive
   ═══════════════════════════════════════════════════════════ */
export const decoratorsLesson = {
  id: 'decorators',
  title: 'Decorators — Functions That Wrap Functions',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'A decorator takes a function, wraps it with extra behavior, and returns the new function. Master closures first, and decorators become trivial.',
  sections: [
    {
      type: 'text',
      content:
        'In Python, functions are first-class objects. You can assign them to variables, pass them as arguments, and return them from other functions.',
    },
    {
      type: 'code',
      content: 'Functions as values:',
      code: `def greet():\n    return "hi"\n\nf = greet           # no parentheses — the function object itself\nprint(f())          # call it through the new name\nprint(greet)        # <function greet at 0x...>`,
      output: 'hi\n<function greet at 0x...>',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'A closure is an inner function that remembers variables from its enclosing scope — even after the outer function has finished running.',
    },
    {
      type: 'code',
      content: 'Closures — inner functions remember:',
      code: `def multiplier(n):\n    def times(x):\n        return x * n     # n comes from the outer scope\n    return times\n\ndouble = multiplier(2)\ntriple = multiplier(3)\n\nprint(double(5))\nprint(triple(5))`,
      output: '10\n15',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Closures are the mechanism behind decorators. A decorator is a function that returns a closure that wraps the original function.',
    },
    {
      type: 'text',
      content:
        'A decorator is a function that takes another function as argument and returns a new function. Applied with `@decorator_name` above the target.',
    },
    {
      type: 'code',
      content: 'Your first decorator:',
      code: `def log_calls(fn):\n    def wrapper(*args, **kwargs):\n        print(f"calling {fn.__name__}")\n        result = fn(*args, **kwargs)\n        print(f"done {fn.__name__}")\n        return result\n    return wrapper\n\n@log_calls\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))`,
      output: 'calling add\ndone add\n5',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'After decoration, `add` is no longer the original function — it is the wrapper. Without `@wraps`, the original name and docstring get lost.',
    },
    {
      type: 'code',
      content: 'Without @wraps — name is lost:',
      code: `def log_calls(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs)\n    return wrapper\n\n@log_calls\ndef add(a, b):\n    """Add two numbers."""\n    return a + b\n\nprint(add.__name__)     # wrapper, not add\nprint(add.__doc__)      # None, docstring lost`,
      output: 'wrapper\nNone',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Fix it with `functools.wraps`. It copies `__name__`, `__doc__`, and other metadata from the original function onto the wrapper.',
    },
    {
      type: 'code',
      content: 'Correct decorator with @wraps:',
      code: `from functools import wraps\n\ndef log_calls(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs)\n    return wrapper\n\n@log_calls\ndef add(a, b):\n    """Add two numbers."""\n    return a + b\n\nprint(add.__name__)\nprint(add.__doc__)`,
      output: 'add\nAdd two numbers.',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Always use `@wraps(fn)` inside your decorators. It is a small habit with big debugging dividends.',
    },
    {
      type: 'text',
      content:
        'Decorators with arguments: the outer function takes the arguments and returns the actual decorator. Triple nesting.',
    },
    {
      type: 'code',
      content: 'Decorator with arguments — @repeat(n):',
      code: `from functools import wraps\n\ndef repeat(times):\n    def decorator(fn):\n        @wraps(fn)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                result = fn(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef say(msg):\n    print(msg)\n\nsay("hi")`,
      output: 'hi\nhi\nhi',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Multiple decorators stack. The one closest to the function is applied first, and the outermost runs first when the function is called.',
    },
    {
      type: 'code',
      content: 'Stacked decorators:',
      code: `from functools import wraps\n\ndef bold(fn):\n    @wraps(fn)\n    def wrapper(*a, **k):\n        return f"**{fn(*a, **k)}**"\n    return wrapper\n\ndef italic(fn):\n    @wraps(fn)\n    def wrapper(*a, **k):\n        return f"_{fn(*a, **k)}_"\n    return wrapper\n\n@bold\n@italic\ndef text():\n    return "hello"\n\nprint(text())     # italic runs first, bold wraps it`,
      output: '**_hello_**',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'Reading stacked decorators: `@bold @italic def f()` is the same as `f = bold(italic(f))`. Inner decorator applied first.',
    },
    {
      type: 'text',
      content:
        'Decorators are commonly used for timing, logging, authentication checks, caching, and retry logic. Python ships several in the standard library.',
    },
    {
      type: 'code',
      content: 'functools.cache — built-in memoization:',
      code: `from functools import cache\n\n@cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(30))     # fast thanks to caching`,
      output: '832040',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is decorators. The mechanism: closure + first-class function. The pattern: any "wrap a function with extra behavior" use case.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'def outer(fn):\n    def inner():\n        print("before")\n        fn()\n        print("after")\n    return inner\n\n@outer\ndef greet():\n    print("hi")\n\ngreet()',
      options: [
        'hi',
        'before\\nhi\\nafter',
        'before\\nafter\\nhi',
        'Error',
      ],
      correct: 1,
      explanation:
        'The decorator wraps greet so that calling greet() runs the wrapper: prints "before", calls greet (prints "hi"), then "after".',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'def d(fn):\n    def w():\n        return fn() * 2\n    return w\n\n@d\ndef n():\n    return 5\n\nprint(n())',
      options: ['5', '10', '0', 'Error'],
      correct: 1,
      explanation:
        'The decorator wraps n so that calling n() returns the original result doubled. 5 * 2 = 10.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Why is `@wraps(fn)` important inside a decorator?',
      options: [
        'It makes the decorator faster',
        'It preserves the original function name and docstring',
        'It prevents the decorator from running twice',
        'It handles exceptions',
      ],
      correct: 1,
      explanation:
        'Without @wraps, the decorated function loses its __name__ and __doc__, becoming "wrapper". This breaks debugging tools, introspection, and documentation.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so `@repeat(3)` prints "hi" three times:',
      code: 'def repeat(times):\n    def decorator(fn):\n        def wrapper():\n            for _ in range(times):\n                ___\n        return wrapper\n    return decorator',
      options: ['fn()', 'wrapper()', 'repeat()', 'print(fn)'],
      correct: 0,
      explanation:
        'We want to call the original function on each iteration. `fn()` invokes it. `wrapper()` would cause infinite recursion.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a decorator `@uppercase` that makes a function return its result in uppercase.',
      starterCode:
        'from functools import wraps\n\ndef uppercase(fn):\n    # your code\n    pass\n\n@uppercase\ndef greet(name):\n    return f"hello, {name}"',
      tests: [
        { input: 'greet("world")', expected: "'HELLO, WORLD'" },
        { input: 'greet("Ada")', expected: "'HELLO, ADA'" },
      ],
      hint: 'Define a wrapper that calls fn, then applies .upper() to the result. Add @wraps(fn) for good practice.',
      solution:
        'from functools import wraps\n\ndef uppercase(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs).upper()\n    return wrapper',
      explanation:
        'The wrapper forwards *args, **kwargs to the original function, then transforms its result. This is the universal pattern for result-transforming decorators.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 9 — Iterators & Generators
   ═══════════════════════════════════════════════════════════ */
export const iteratorsLesson = {
  id: 'iterators-generators',
  title: 'Iterators & Generators',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'Generators produce values one at a time, saving memory. Iterators power every for-loop. Understanding them unlocks a whole class of elegant patterns.',
  sections: [
    {
      type: 'text',
      content:
        'An iterable is anything you can loop over (list, string, dict, set). An iterator is the thing that actually produces values, one at a time.',
    },
    {
      type: 'code',
      content: 'iter() and next():',
      code: `nums = [1, 2, 3]\nit = iter(nums)\nprint(next(it))\nprint(next(it))\nprint(next(it))\n# print(next(it))   # StopIteration`,
      output: '1\n2\n3',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'A for-loop calls `iter()` to get an iterator, then `next()` until StopIteration is raised. That is the whole machinery behind `for`.',
    },
    {
      type: 'text',
      content:
        'Build a custom iterator by implementing `__iter__` (returns self) and `__next__` (returns the next value or raises StopIteration).',
    },
    {
      type: 'code',
      content: 'A custom iterator:',
      code: `class Counter:\n    def __init__(self, limit):\n        self.limit = limit\n        self.n = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.n >= self.limit:\n            raise StopIteration\n        self.n += 1\n        return self.n - 1\n\nfor x in Counter(3):\n    print(x)`,
      output: '0\n1\n2',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Generators are functions that use `yield` instead of `return`. Each yield pauses the function; the next call resumes right after.',
    },
    {
      type: 'code',
      content: 'Your first generator:',
      code: `def count_up(limit):\n    n = 0\n    while n < limit:\n        yield n\n        n += 1\n\nfor x in count_up(3):\n    print(x)`,
      output: '0\n1\n2',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Generator functions are a one-line replacement for iterator classes. Same behavior, way less code. Prefer them unless you need complex state.',
    },
    {
      type: 'text',
      content:
        'Generators are lazy — they produce values only when asked. For large or infinite sequences, this saves memory.',
    },
    {
      type: 'code',
      content: 'Infinite generator (safe because it is lazy):',
      code: `def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\nit = naturals()\nfor _ in range(5):\n    print(next(it))`,
      output: '1\n2\n3\n4\n5',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'A generator can be iterated only ONCE. After exhaustion, it is empty. If you need to loop again, convert to a list or call the generator function again.',
    },
    {
      type: 'code',
      content: 'Generators are single-use:',
      code: `g = (x for x in range(3))\nprint(list(g))\nprint(list(g))    # empty — already consumed`,
      output: '[0, 1, 2]\n[]',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Generator expressions `(expr for item in iterable)` are compact generators. Same as list comprehensions but lazy.',
    },
    {
      type: 'code',
      content: 'Generator expression vs list comprehension:',
      code: `import sys\n\nlst = [x ** 2 for x in range(1000)]\ngen = (x ** 2 for x in range(1000))\n\nprint(sys.getsizeof(lst))    # list holds everything\nprint(sys.getsizeof(gen))    # generator holds state only`,
      output: '8856\n208',
      language: 'python',
    },
    {
      type: 'note',
      content:
        'For 1000 items the difference is small. For 10 million items, the list would use ~400 MB while the generator stays under 200 bytes.',
    },
    {
      type: 'text',
      content:
        '`yield from` delegates to another iterable. Useful for chaining generators or flattening nested structures.',
    },
    {
      type: 'code',
      content: 'yield from — chaining:',
      code: `def chain(*iterables):\n    for it in iterables:\n        yield from it\n\nprint(list(chain([1, 2], [3, 4], [5])))`,
      output: '[1, 2, 3, 4, 5]',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Generators can receive values with `.send()`. This turns them into coroutines — small state machines that cooperate with the caller.',
    },
    {
      type: 'code',
      content: 'send() into a generator:',
      code: `def echo():\n    while True:\n        received = yield\n        print(f"got: {received}")\n\ng = echo()\nnext(g)          # prime the generator\ng.send("hi")\ng.send("bye")`,
      output: 'got: hi\ngot: bye',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is iterators and generators. Lazy evaluation, single-use streams, and yield-based coroutines are all built from these primitives.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'def gen():\n    yield 1\n    yield 2\n    yield 3\n\ng = gen()\nprint(next(g))\nprint(next(g))',
      options: ['1 2', '1 2 3', '[1, 2, 3]', 'Error'],
      correct: 0,
      explanation:
        'Each next() call resumes the generator at the last yield. Two nexts give 1 and 2. The third would give 3.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'predict-output',
      question: 'What will this print?',
      code: `g = (x ** 2 for x in range(4))\nprint(list(g))\nprint(list(g))`,
      options: [
        '[0, 1, 4, 9] then [0, 1, 4, 9]',
        '[0, 1, 4, 9] then []',
        'Error',
        '[] then [0, 1, 4, 9]',
      ],
      correct: 1,
      explanation:
        'Generators are single-use. After the first list() consumes it, the second list() gets nothing — the generator is exhausted.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You need to process a 10-million-row file line by line. Which is memory-efficient?',
      options: [
        'Read the whole file with file.read().splitlines()',
        'Load it with list(open(...))',
        'Iterate line by line with `for line in file:`',
        'Convert to a tuple first',
      ],
      correct: 2,
      explanation:
        'Iterating a file object lazily reads one line at a time. Loading into a list/tuple materializes the entire file in memory. For huge files, iterate directly.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the generator yields squares of 0 to n-1:',
      code: 'def squares(n):\n    for i in range(n):\n        ___ i ** 2',
      options: ['yield', 'return', 'print', 'emit'],
      correct: 0,
      explanation:
        '`yield` pauses the function and produces a value. `return` would end the function after the first iteration, defeating the purpose.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a generator function `evens_up_to(n)` that yields even numbers from 0 up to (and including) n.',
      starterCode:
        'def evens_up_to(n):\n    # your code\n    pass',
      tests: [
        { input: 'list(evens_up_to(10))', expected: '[0, 2, 4, 6, 8, 10]' },
        { input: 'list(evens_up_to(0))', expected: '[0]' },
        { input: 'list(evens_up_to(7))', expected: '[0, 2, 4, 6]' },
      ],
      hint: 'Loop over range(n + 1) and yield i when i % 2 == 0.',
      solution:
        'def evens_up_to(n):\n    for i in range(n + 1):\n        if i % 2 == 0:\n            yield i',
      explanation:
        'Generators look like regular functions with `yield` instead of `return`. The `for` loop produces values lazily — nothing is computed until someone iterates.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 10 — Context Managers
   ═══════════════════════════════════════════════════════════ */
export const contextManagersLesson = {
  id: 'context-managers',
  title: 'Context Managers — the with Statement',
  difficulty: 'intermediate',
  duration: 18,
  intro:
    'The `with` statement guarantees cleanup: files close, locks release, resources free — even if an exception happens inside the block.',
  sections: [
    {
      type: 'text',
      content:
        'You have already used `with open(...)`. That pattern is called a context manager: an object that sets up a resource and tears it down automatically.',
    },
    {
      type: 'code',
      content: 'Manual file handling vs with:',
      code: `# Manual — must remember to close, even on exception\nf = open("data.txt", "w")\nf.write("hello")\nf.close()\n\n# With — Python closes it for you\nwith open("data.txt", "w") as f:\n    f.write("hello")`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'The `with` block is not just sugar — it is exception-safe. If an exception is raised inside the block, `close()` still runs.',
    },
    {
      type: 'text',
      content:
        'To build your own, implement `__enter__` (setup, returns the bound variable) and `__exit__` (cleanup, runs always).',
    },
    {
      type: 'code',
      content: 'A custom context manager:',
      code: `class Timer:\n    import time as _t\n    def __enter__(self):\n        self._start = self._t.time()\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.elapsed = self._t.time() - self._start\n        return False     # do not suppress exceptions\n\nwith Timer() as t:\n    total = sum(range(1_000_000))\nprint(f"took {t.elapsed:.4f}s")`,
      output: 'took 0.0...s',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`__exit__` receives the exception type, value, and traceback if one occurred. Returning True suppresses the exception; returning False (or None) lets it propagate.',
    },
    {
      type: 'warning',
      content:
        'Returning True from `__exit__` swallows the exception — the caller will not see it. Use this only when you intentionally want to suppress (rare).',
    },
    {
      type: 'text',
      content:
        'The easier way: `contextlib.contextmanager`. Turn a generator into a context manager with two yields — one before the block, one in finally.',
    },
    {
      type: 'code',
      content: 'contextlib.contextmanager — much cleaner:',
      code: `from contextlib import contextmanager\n\n@contextmanager\ndef tagged(name):\n    print(f"<{name}>")\n    try:\n        yield\n    finally:\n        print(f"</{name}>")\n\nwith tagged("div"):\n    print("content")`,
      output: '<div>\ncontent\n</div>',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Use `@contextmanager` for 90% of custom context managers. The class-based version is only needed when you want to keep lots of state.',
    },
    {
      type: 'text',
      content:
        'Common library examples: `open()`, `threading.Lock()`, `decimal.localcontext()`, `tempfile.TemporaryDirectory()`.',
    },
    {
      type: 'code',
      content: 'threading.Lock — exception-safe locking:',
      code: `import threading\n\nlock = threading.Lock()\n\ndef safe_increment():\n    with lock:\n        # critical section — only one thread inside\n        pass`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        'That is context managers. Use `with` for anything that needs cleanup, and reach for `@contextmanager` when building your own.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: `from contextlib import contextmanager\n\n@contextmanager\ndef greeting():\n    print("before")\n    yield\n    print("after")\n\nwith greeting():\n    print("inside")`,
      options: [
        'before\\ninside\\nafter',
        'before\\nafter',
        'inside',
        'before\\ninside',
      ],
      correct: 0,
      explanation:
        'The generator runs up to `yield` before the block, then continues after yield when the block exits. Result: before, inside, after.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      question:
        'What happens if an exception is raised inside a `with` block?',
      options: [
        'The with block swallows it silently',
        '__exit__ is still called — cleanup always runs',
        'The program crashes before cleanup',
        '__enter__ runs again',
      ],
      correct: 1,
      explanation:
        '`__exit__` always runs, even on exception. That is the entire point of a context manager — guaranteed cleanup. Whether the exception propagates afterward depends on the return value of __exit__.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Which methods must a class implement to work with `with`?',
      options: [
        '__init__ and __del__',
        '__enter__ and __exit__',
        'open and close',
        '__iter__ and __next__',
      ],
      correct: 1,
      explanation:
        'The context manager protocol is `__enter__` (runs at the start of the with block) and `__exit__` (runs at the end, always).',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so the generator becomes a context manager:',
      code: 'from contextlib import contextmanager\n\n@___\ndef cm():\n    print("enter")\n    yield\n    print("exit")',
      options: ['contextmanager', 'contextlib', 'property', 'staticmethod'],
      correct: 0,
      explanation:
        '`@contextmanager` from contextlib turns a generator into a context manager. The code before yield runs at entry, after yield at exit.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Write a `@contextmanager` called `section(name)` that prints `[start name]` before the block and `[end name]` after. Use it with `with section("main"): pass` — output should be "[start main]\\n[end main]".',
      starterCode:
        'from contextlib import contextmanager\n\n@contextmanager\ndef section(name):\n    # your code\n    pass\n\n# with section("main"):\n#     pass',
      tests: [
        {
          input:
            'import io, sys\nbuf = io.StringIO()\nold = sys.stdout\nsys.stdout = buf\nwith section("main"):\n    pass\nsys.stdout = old\nbuf.getvalue().strip()',
          expected: "'[start main]\\n[end main]'",
        },
      ],
      hint: 'Print `[start {name}]`, yield, then print `[end {name}]` in a finally block.',
      solution:
        'from contextlib import contextmanager\n\n@contextmanager\ndef section(name):\n    print(f"[start {name}]")\n    try:\n        yield\n    finally:\n        print(f"[end {name}]")',
      explanation:
        'Wrap yield in try/finally so the end print runs even if the block raises. This is the standard pattern for resource-style context managers.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 11 — Composition vs Inheritance
   ═══════════════════════════════════════════════════════════ */
export const compositionLesson = {
  id: 'composition',
  title: 'Composition vs Inheritance',
  difficulty: 'intermediate',
  duration: 18,
  intro:
    'Inheritance says "is-a". Composition says "has-a". Most real code needs composition more than inheritance — and knowing when is a mark of maturity.',
  sections: [
    {
      type: 'text',
      content:
        'Inheritance: "Dog is-a Animal". Composition: "Car has-a Engine". Both reuse code, but for different relationships.',
    },
    {
      type: 'code',
      content: 'Inheritance — is-a:',
      code: `class Animal:\n    def breathe(self):\n        print("breathing")\n\nclass Dog(Animal):\n    def bark(self):\n        print("woof")\n\nDog().breathe()    # Dog IS an Animal`,
      output: 'breathing',
      language: 'python',
    },
    {
      type: 'code',
      content: 'Composition — has-a:',
      code: `class Engine:\n    def start(self):\n        print("engine started")\n\nclass Car:\n    def __init__(self):\n        self.engine = Engine()    # Car HAS an Engine\n\n    def drive(self):\n        self.engine.start()\n        print("car driving")\n\nCar().drive()`,
      output: 'engine started\ncar driving',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Rule of thumb: if the child can always stand in for the parent without surprise, inheritance is fine. Otherwise, use composition.',
    },
    {
      type: 'text',
      content:
        'Deep inheritance hierarchies (4+ levels) are hard to reason about. Small, focused classes composed together are easier to test and change.',
    },
    {
      type: 'warning',
      content:
        'The fragile base class problem: a small change in a base class can break every subclass in unexpected ways. Composition limits the blast radius.',
    },
    {
      type: 'text',
      content:
        'Prefer composition when: you need the same behavior in unrelated classes, you want to swap implementations at runtime, or the inheritance chain is getting deep.',
    },
    {
      type: 'code',
      content: 'Composition lets you swap implementations:',
      code: `class Logger:\n    def log(self, msg):\n        print(f"LOG: {msg}")\n\nclass NullLogger:\n    def log(self, msg):\n        pass\n\nclass Service:\n    def __init__(self, logger=None):\n        self.logger = logger or NullLogger()\n\n    def run(self):\n        self.logger.log("running")\n\nService(Logger()).run()\nService().run()        # silent`,
      output: 'LOG: running',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Dependency injection — passing collaborators into __init__ — is composition done well. It makes testing easy: pass a mock in tests.',
    },
    {
      type: 'code',
      content: 'Easy to test with a fake:',
      code: `class FakeLogger:\n    def __init__(self):\n        self.messages = []\n    def log(self, msg):\n        self.messages.append(msg)\n\nfake = FakeLogger()\nsvc = Service(fake)\nsvc.run()\nprint(fake.messages)`,
      output: `['running']`,
      language: 'python',
    },
    {
      type: 'note',
      content:
        'You still need inheritance for genuine "is-a" relationships — abstract interfaces, exceptions, framework hooks. Use both tools; just default to composition.',
    },
    {
      type: 'text',
      content:
        'A common pattern: inherit from an interface (ABC) to declare the type, compose helpers to implement the behavior.',
    },
    {
      type: 'code',
      content: 'Interface + composition:',
      code: `from abc import ABC, abstractmethod\n\nclass Notifier(ABC):\n    @abstractmethod\n    def send(self, msg):\n        pass\n\nclass ConsoleNotifier(Notifier):\n    def send(self, msg):\n        print(msg)\n\nclass App:\n    def __init__(self, notifier: Notifier):\n        self.notifier = notifier\n\n    def notify(self, msg):\n        self.notifier.send(f"[APP] {msg}")\n\nApp(ConsoleNotifier()).notify("hello")`,
      output: '[APP] hello',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'That is composition. It is the quiet majority of good OOP design — inheritance gets the spotlight, but composition does most of the work.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Which relationship is best expressed by composition?',
      options: [
        'A Dog is an Animal',
        'A Car has an Engine',
        'A Square is a Shape',
        'A SavingsAccount is an Account',
      ],
      correct: 1,
      explanation:
        '"has-a" is composition. A Car contains an Engine. The other three are "is-a" relationships — inheritance is appropriate for them.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'What is the "fragile base class" problem?',
      options: [
        'Base classes cannot be subclassed',
        'Changing a base class can break every subclass silently',
        'Subclasses run slower than base classes',
        'Base classes cannot have methods',
      ],
      correct: 1,
      explanation:
        'Deep inheritance couples base and subclasses tightly. A small change in the parent often breaks children. Composition keeps the boundaries clearer.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What will this print?',
      code: `class Engine:\n    def run(self):\n        return "vroom"\n\nclass Car:\n    def __init__(self):\n        self.engine = Engine()\n    def drive(self):\n        return f"car {self.engine.run()}"\n\nprint(Car().drive())`,
      options: ['vroom', 'car vroom', 'Error', 'None'],
      correct: 1,
      explanation:
        'The Car holds an Engine instance and delegates the "vroom" call to it. Composition: reuse behavior through delegation, not inheritance.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question:
        'Fill the blank so Service holds a Logger via composition:',
      code: 'class Service:\n    def __init__(self, logger):\n        self.___ = logger',
      options: ['logger', 'log', 'engine', 'component'],
      correct: 0,
      explanation:
        'Storing the collaborator as an attribute (`self.logger = logger`) is the simplest form of composition — the service has-a logger.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a class `Printer` with a method `output(text)` that prints the text. Then create a class `Document` that takes a `title` and a `printer` in __init__, stores them, and has a `render()` method that calls `self.printer.output(self.title)`.',
      starterCode:
        'class Printer:\n    def output(self, text):\n        # your code\n        pass\n\nclass Document:\n    def __init__(self, title, printer):\n        # your code\n        pass\n\n    def render(self):\n        # your code\n        pass',
      tests: [
        {
          input:
            'import io, sys\nbuf = io.StringIO()\nold = sys.stdout\nsys.stdout = buf\nDocument("Report", Printer()).render()\nsys.stdout = old\nbuf.getvalue().strip()',
          expected: "'Report'",
        },
      ],
      hint: 'Printer.output just print(text). Document.__init__ stores self.title and self.printer. render() calls self.printer.output(self.title).',
      solution:
        'class Printer:\n    def output(self, text):\n        print(text)\n\nclass Document:\n    def __init__(self, title, printer):\n        self.title = title\n        self.printer = printer\n\n    def render(self):\n        self.printer.output(self.title)',
      explanation:
        'Document has-a Printer. The printer can be swapped (ConsolePrinter, FilePrinter, MockPrinter) without changing Document — that is the power of composition.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 12 — Dataclasses
   ═══════════════════════════════════════════════════════════ */
export const dataclassesLesson = {
  id: 'dataclasses',
  title: 'Dataclasses — Less Boilerplate for Data',
  difficulty: 'intermediate',
  duration: 18,
  intro:
    'Dataclasses auto-generate __init__, __repr__, and __eq__ from class annotations. Perfect for the boring "class that just holds data".',
  sections: [
    {
      type: 'text',
      content:
        'A plain data class requires a lot of boilerplate. Look at the amount of code needed for a simple 3-field class.',
    },
    {
      type: 'code',
      content: 'Without dataclasses — boilerplate:',
      code: `class Point:\n    def __init__(self, x, y, z):\n        self.x = x\n        self.y = y\n        self.z = z\n\n    def __repr__(self):\n        return f"Point(x={self.x}, y={self.y}, z={self.z})"\n\n    def __eq__(self, other):\n        return (self.x, self.y, self.z) == (other.x, other.y, other.z)\n\np = Point(1, 2, 3)\nprint(p)\nprint(p == Point(1, 2, 3))`,
      output: 'Point(x=1, y=2, z=3)\nTrue',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Same thing with `@dataclass` — three annotations and you are done.',
    },
    {
      type: 'code',
      content: 'With @dataclass — compact:',
      code: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n    z: int\n\np = Point(1, 2, 3)\nprint(p)\nprint(p == Point(1, 2, 3))`,
      output: 'Point(x=1, y=2, z=3)\nTrue',
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Dataclasses auto-generate __init__, __repr__, and __eq__. You write the fields; Python writes the rest.',
    },
    {
      type: 'note',
      content:
        'The type annotations (int, str) are required syntactically but NOT enforced at runtime. Dataclasses use them to build __init__ signatures — they do not type-check.',
    },
    {
      type: 'text',
      content:
        'Default values work as expected. Fields with defaults must come AFTER fields without defaults — same rule as regular function arguments.',
    },
    {
      type: 'code',
      content: 'Defaults and defaults-after:',
      code: `from dataclasses import dataclass\n\n@dataclass\nclass User:\n    name: str\n    role: str = "user"\n    active: bool = True\n\nu = User("Ada")\nprint(u)\nprint(User("Alan", "admin"))`,
      output: `User(name='Ada', role='user', active=True)\nUser(name='Alan', role='admin', active=True)`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Mutable defaults (like lists) are still dangerous — same issue as regular functions. Use `field(default_factory=list)` instead of `= []`.',
    },
    {
      type: 'code',
      content: 'field(default_factory=...) — the right way:',
      code: `from dataclasses import dataclass, field\n\n@dataclass\nclass Cart:\n    items: list = field(default_factory=list)\n\nc1 = Cart()\nc2 = Cart()\nc1.items.append("apple")\nprint(c1.items)\nprint(c2.items)    # different list — no shared state`,
      output: `['apple']\n[]`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`frozen=True` makes instances immutable. Attempting to set an attribute raises an exception. Great for keys in dicts and values in sets.',
    },
    {
      type: 'code',
      content: 'Frozen dataclasses:',
      code: `from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Point:\n    x: int\n    y: int\n\np = Point(1, 2)\n# p.x = 99     # FrozenInstanceError\nprint(p)`,
      output: 'Point(x=1, y=2)',
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`__post_init__` runs after the auto-generated __init__. Use it for derived fields or validation.',
    },
    {
      type: 'code',
      content: '__post_init__ for validation:',
      code: `from dataclasses import dataclass\n\n@dataclass\nclass Rectangle:\n    width: int\n    height: int\n\n    def __post_init__(self):\n        if self.width <= 0 or self.height <= 0:\n            raise ValueError("dims must be positive")\n\nprint(Rectangle(3, 4))\ntry:\n    Rectangle(-1, 4)\nexcept ValueError as e:\n    print("rejected:", e)`,
      output: 'Rectangle(width=3, height=4)\nrejected: dims must be positive',
      language: 'python',
    },
    {
      type: 'text',
      content:
        'Use dataclasses for: config objects, DTOs, API payloads, small value objects, test fixtures. Anything where the class is mostly data.',
    },
    {
      type: 'tip',
      content:
        'Dataclasses are one of the biggest quality-of-life improvements in modern Python. If a class has more than 2 fields and no complex behavior, try @dataclass first.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'from dataclasses import dataclass\n\n@dataclass\nclass P:\n    x: int\n    y: int\n\nprint(P(1, 2))\nprint(P(1, 2) == P(1, 2))',
      options: [
        'P(x=1, y=2) and True',
        '<P object> and False',
        'P(1, 2) and True',
        'Error',
      ],
      correct: 0,
      explanation:
        'Dataclasses auto-generate __repr__ (pretty format) and __eq__ (compare all fields). Both Point(x=1, y=2) and True are correct outputs.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'Why use `field(default_factory=list)` instead of `= []` in a dataclass?',
      options: [
        'It is faster',
        'It is required syntax',
        'Shared mutable default — all instances would share the same list',
        'It allows type checking',
      ],
      correct: 2,
      explanation:
        'A literal [] as a default creates ONE list shared by all instances. default_factory=list calls list() fresh for each instance. Classic mutable-default bug.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass P:\n    x: int\n\np = P(1)\ntry:\n    p.x = 99\n    print(p.x)\nexcept Exception as e:\n    print(type(e).__name__)',
      options: ['99', 'FrozenInstanceError', 'AttributeError', 'None'],
      correct: 1,
      explanation:
        'frozen=True makes instances immutable. Attempting to set an attribute raises FrozenInstanceError (a subclass of AttributeError).',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank so the dataclass has a fresh list per instance:',
      code: 'from dataclasses import dataclass, field\n\n@dataclass\nclass Cart:\n    items: list = field(___)',
      options: ['default_factory=list', 'default=[]', 'factory=list', 'new=list'],
      correct: 0,
      explanation:
        'The syntax is `field(default_factory=list)`. `default_factory` takes a callable that produces the default value for each instance.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a `Book` dataclass with fields `title: str`, `author: str`, `year: int`. Add a __post_init__ that raises ValueError if year < 0.',
      starterCode:
        'from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    # your fields\n    pass',
      tests: [
        {
          input: 'Book("Python", "Ada", 2024).title',
          expected: "'Python'",
        },
        {
          input: 'Book("Python", "Ada", 2024).year',
          expected: '2024',
        },
        {
          input:
            'try:\n    Book("X", "Y", -1)\n    result = "ok"\nexcept ValueError:\n    result = "raised"\nresult',
          expected: "'raised'",
        },
      ],
      hint: 'Declare fields with type annotations. Add a method `__post_init__(self)` that checks `self.year < 0` and raises ValueError.',
      solution:
        'from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    author: str\n    year: int\n\n    def __post_init__(self):\n        if self.year < 0:\n            raise ValueError("year must be non-negative")',
      explanation:
        'Dataclasses handle the boring parts; __post_init__ lets you add validation or derived fields without rewriting the generated __init__.',
      xp: 30,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   LESSON 13 — Metaclasses (Intro)
   ═══════════════════════════════════════════════════════════ */
export const metaclassesLesson = {
  id: 'metaclasses',
  title: 'Metaclasses — Classes That Build Classes',
  difficulty: 'advanced',
  duration: 20,
  intro:
    'Metaclasses are the "classes of classes". Rarely needed, but understanding them demystifies how Python itself works under the hood.',
  sections: [
    {
      type: 'text',
      content:
        'In Python, everything is an object — including classes. A class is an instance of its metaclass. The default metaclass is `type`.',
    },
    {
      type: 'code',
      content: 'Classes are objects too:',
      code: `class Dog:\n    pass\n\nprint(type(Dog))            # <class \'type\'>\nprint(type(Dog()))          # <class \'__main__.Dog\'>\nprint(type(int))            # <class \'type\'>`,
      output: `<class 'type'>\n<class '__main__.Dog'>\n<class 'type'>`,
      language: 'python',
    },
    {
      type: 'text',
      content:
        '`type()` has two meanings. With one argument it returns the type of an object. With three arguments it CREATES a new class dynamically.',
    },
    {
      type: 'code',
      content: 'type() as a class factory:',
      code: `# These two are equivalent\nclass Dog:\n    species = "Canis lupus"\n    def bark(self):\n        return "woof"\n\nDog2 = type("Dog2", (), {"species": "Canis lupus", "bark": lambda self: "woof"})\n\nprint(Dog().bark())\nprint(Dog2().bark())`,
      output: 'woof\nwoof',
      language: 'python',
    },
    {
      type: 'note',
      content:
        '`type(name, bases, dict)` — name is a string, bases is a tuple of parent classes, dict is the class namespace. This is exactly what the class statement desugars to.',
    },
    {
      type: 'text',
      content:
        'A metaclass is a subclass of `type`. By overriding `__new__` or `__init__`, you can intercept class creation and modify it.',
    },
    {
      type: 'code',
      content: 'A minimal metaclass:',
      code: `class UppercaseMeta(type):\n    def __new__(mcs, name, bases, namespace):\n        # Uppercase all method names\n        new_ns = {}\n        for k, v in namespace.items():\n            if k.startswith("__"):\n                new_ns[k] = v\n            else:\n                new_ns[k.upper()] = v\n        return super().__new__(mcs, name, bases, new_ns)\n\nclass Greeter(metaclass=UppercaseMeta):\n    def greet(self):\n        return "hi"\n\nprint(hasattr(Greeter, "GREET"))\nprint(hasattr(Greeter, "greet"))`,
      output: 'True\nFalse',
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Metaclasses are powerful and easy to misuse. If you are not building a framework or DSL, you probably do not need one.',
    },
    {
      type: 'text',
      content:
        'A real-world use: registering subclasses automatically. A metaclass can add every subclass to a registry the moment it is defined.',
    },
    {
      type: 'code',
      content: 'The registry pattern:',
      code: `class PluginMeta(type):\n    registry = {}\n\n    def __new__(mcs, name, bases, namespace):\n        cls = super().__new__(mcs, name, bases, namespace)\n        if name != "Plugin":\n            mcs.registry[name] = cls\n        return cls\n\nclass Plugin(metaclass=PluginMeta):\n    pass\n\nclass LoggerPlugin(Plugin):\n    pass\n\nclass AuthPlugin(Plugin):\n    pass\n\nprint(PluginMeta.registry)`,
      output: `{'LoggerPlugin': <class '__main__.LoggerPlugin'>, 'AuthPlugin': <class '__main__.AuthPlugin'>}`,
      language: 'python',
    },
    {
      type: 'tip',
      content:
        'Alternatives to metaclasses for 90% of cases: decorators, `__init_subclass__`, class attributes. Reach for metaclasses only when nothing else fits.',
    },
    {
      type: 'text',
      content:
        '`__init_subclass__` is a lighter alternative — it runs when a subclass is created, without needing a metaclass.',
    },
    {
      type: 'code',
      content: '__init_subclass__ — the modern approach:',
      code: `class Plugin:\n    registry = {}\n\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        Plugin.registry[cls.__name__] = cls\n\nclass LoggerPlugin(Plugin):\n    pass\n\nclass AuthPlugin(Plugin):\n    pass\n\nprint(Plugin.registry)`,
      output: `{'LoggerPlugin': <class '__main__.LoggerPlugin'>, 'AuthPlugin': <class '__main__.AuthPlugin'>}`,
      language: 'python',
    },
    {
      type: 'warning',
      content:
        'Do not use metaclasses just because you can. Most "clever" metaclass code can be replaced by `__init_subclass__`, class decorators, or descriptors — simpler and clearer.',
    },
    {
      type: 'text',
      content:
        'That is the OOP deep dive. Classes, inheritance, dunder methods, decorators, generators, context managers, composition, dataclasses, and metaclasses — the full Python object model.',
    },
  ],
  challenges: [
    {
      id: 'q1',
      type: 'predict-output',
      question: 'What will this print?',
      code: 'class A:\n    pass\n\nprint(type(A))',
      options: [
        "<class 'type'>",
        "<class 'A'>",
        "<class '__main__.A'>",
        'Error',
      ],
      correct: 0,
      explanation:
        'Classes are instances of `type` (the default metaclass). So type(A) is <class \'type\'>.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'What is a metaclass?',
      options: [
        'A class that cannot be instantiated',
        'A class whose instances are classes',
        'An abstract base class',
        'A class decorated with @classmethod',
      ],
      correct: 1,
      explanation:
        'A metaclass is a class whose instances are classes. `type` is the default metaclass — when you write `class Foo: ...`, Python calls `type(name, bases, dict)` behind the scenes.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      question:
        'You want subclasses to be automatically registered when defined. What is the simplest modern approach?',
      options: [
        'Write a metaclass with a __new__ hook',
        'Use __init_subclass__ on the base class',
        'Add a decorator to every subclass',
        'Override type()',
      ],
      correct: 1,
      explanation:
        '`__init_subclass__` runs whenever a subclass is created — no metaclass needed. It is the recommended modern approach for this pattern.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'code-fill',
      question: 'Fill the blank to create a class dynamically:',
      code: 'Dog = ___("Dog", (), {"bark": lambda self: "woof"})\nprint(Dog().bark())',
      options: ['type', 'class', 'object', 'make_class'],
      correct: 0,
      explanation:
        '`type(name, bases, dict)` is the three-argument form that creates a class. It is what the `class` statement desugars to.',
      xp: 15,
    },
    {
      id: 'q5',
      type: 'code-challenge',
      question:
        'Create a base class `Base` that uses __init_subclass__ to add each new subclass name to `Base.subclasses` (a list). Then define two subclasses A and B. Return the list via `Base.subclasses`.',
      starterCode:
        'class Base:\n    subclasses = []\n    # your __init_subclass__ here\n\nclass A(Base):\n    pass\n\nclass B(Base):\n    pass',
      tests: [
        { input: 'Base.subclasses', expected: "['A', 'B']" },
        { input: 'len(Base.subclasses)', expected: '2' },
      ],
      hint: 'Define `def __init_subclass__(cls, **kwargs):` that calls super and appends `cls.__name__` to Base.subclasses.',
      solution:
        'class Base:\n    subclasses = []\n\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        Base.subclasses.append(cls.__name__)\n\nclass A(Base):\n    pass\n\nclass B(Base):\n    pass',
      explanation:
        'This is the metaclass registry pattern without a metaclass — __init_subclass__ runs automatically when a subclass is defined. It is simpler and the modern recommendation.',
      xp: 35,
    },
  ],
};
/* ═══════════════════════════════════════════════════════════
   Module registry
   ═══════════════════════════════════════════════════════════ */
export const pythonOopLessons = {
  'classes-objects': classesObjectsLesson,
  methods: methodsLesson,
  inheritance: inheritanceLesson,
  polymorphism: polymorphismLesson,
  encapsulation: encapsulationLesson,
  abstraction: abstractionLesson,
  dunder: dunderLesson,
  decorators: decoratorsLesson,
  'iterators-generators': iteratorsLesson,
  'context-managers': contextManagersLesson,
  composition: compositionLesson,
  dataclasses: dataclassesLesson,
  metaclasses: metaclassesLesson,
};