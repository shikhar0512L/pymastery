// 📐 Linear Algebra — Lesson 1: Scalars & Vectors

export const laScalarsVectorsLesson = {
  id: 'la-scalars-vectors',
  title: 'Scalars & Vectors — The Building Blocks',
  difficulty: 'intermediate',
  duration: 22,
  intro:
    'Every AI system, from Netflix recommendations to ChatGPT, is built on one idea: turning real-world things into lists of numbers. This lesson shows you how — and why it works.',

  sections: [
    {
      type: 'text',
      content:
        'Think about the last time you described someone. You probably did not just say one thing. You said their height, their age, their favourite colour — maybe several things at once. Numbers work the same way. Sometimes one is enough. Sometimes you need a whole list.',
    },
    {
      type: 'text',
      content:
        'A **scalar** is just one number, on its own. Temperature. Age. Price. The speed of a car. Scalars answer questions like "how much?" or "how many?".',
    },
    {
      type: 'text',
      content:
        'But most things in the real world are not one number. Your location on a map is two: how far across, how far up. A colour on a screen is three: red, green, blue. A movie might be rated on several qualities at once.',
    },
    {
      type: 'text',
      content:
        'When you need more than one number together, you use a **vector**: an ordered list of numbers. The word "ordered" matters — the position of each number tells you what it means.',
    },
    {
      type: 'math',
      latex: '\\vec{v} = \\begin{bmatrix} x \\\\ y \\end{bmatrix}',
      caption:
        'A 2-dimensional vector — two numbers stacked. We usually write vectors as columns, with an arrow on top.',
    },
    {
      type: 'tip',
      content:
        'Order matters! The vector $(3, 5)$ is **not** the same as $(5, 3)$. If the first number is "how far across" and the second is "how far up", swapping them moves you to a completely different place.',
    },
    {
      type: 'text',
      content:
        'Each number inside a vector is called a **component**. The number of components is the vector\'s **dimension**. So $(3, 5)$ is 2-dimensional — it has two components.',
    },
    {
      type: 'text',
      content:
        'Here is why this is beautiful: **almost anything can be turned into a vector**. Once you do that, you can do maths on it — add, compare, measure distance. This is exactly what AI does all day, under the hood.',
    },
    {
      type: 'text',
      content:
        'Some real examples of vectors:',
    },
    {
      type: 'text',
      content:
        '• A location on a map — $(x, y)$\n• A colour — $(R, G, B)$, each between 0 and 255\n• A student\'s report card — $(\\text{math}, \\text{science}, \\text{english})$\n• A movie\'s ratings on IMDb — $(\\text{story}, \\text{acting}, \\text{visuals})$\n• A person in a dataset — $(\\text{height}, \\text{weight}, \\text{age})$',
    },
    {
      type: 'note',
      content:
        'In machine learning, **every single data point is a vector**. One email → a vector of word counts. One image → a vector of pixel values. One customer → a vector of habits. The model never sees the raw thing — only its vector form.',
    },
    {
      type: 'text',
      content:
        'Vectors also have a **geometric** meaning. A vector $(3, 4)$ can be drawn as an arrow: start at $(0, 0)$, end at $(3, 4)$. The arrow points in a direction and has a length. This picture is how many people first understand vectors.',
    },
    {
      type: 'graph',
      title: 'The vector (3, 4) drawn as an arrow',
      vectors: [{ x: 3, y: 4, color: 'blue', label: 'v = (3, 4)' }],
      domain: [-1, 5],
      range: [-1, 5],
      caption:
        'The arrow points from the origin to the point (3, 4). Its slope and length describe the vector completely.',
    },
    {
      type: 'text',
      content:
        'You can also think of a vector as a **set of instructions**. "Go 3 steps right, then 4 steps up." Different vectors are just different instructions.',
    },
    {
      type: 'simulation',
      title: 'Build your own vector',
      description:
        'Drag the sliders to change the two components. Watch the arrow move.',
      sliders: [
        { id: 'x', label: 'x', min: -5, max: 5, step: 1, default: 3, decimals: 0 },
        { id: 'y', label: 'y', min: -5, max: 5, step: 1, default: 4, decimals: 0 },
      ],
      render: ({ x, y }) => ({
        vectors: [{ x, y, color: 'blue', label: `v = (${x}, ${y})` }],
        domain: [-6, 6],
        range: [-6, 6],
        points: [{ x, y, color: 'blue', r: 4 }],
      }),
      formula: ({ x, y }) => `\\vec{v} = \\begin{bmatrix} ${x} \\\\ ${y} \\end{bmatrix}`,
      caption:
        'Every combination of (x, y) gives a different arrow. There are infinitely many 2D vectors.',
    },
    {
      type: 'warning',
      content:
        'Do not confuse a **position** with a **vector**. A position is a point on a map — "I am at (3, 4)." A vector is a movement — "go 3 right, 4 up." They look the same as numbers, but they mean different things. In ML, we mostly think of them as points, but the arrow picture is still useful.',
    },
    {
      type: 'text',
      content:
        'Why does this matter for AI? Because once a thing is a vector, you can do **maths on it**. Ask: how similar are these two customers? How far is this image from that one? Which direction should we nudge this vector to make it more like a cat and less like a dog? All of these are vector questions. All of them have precise answers — which is the whole point.',
    },
    {
      type: 'text',
      content:
        'You now know the two most important words in all of ML: **scalar** (one number) and **vector** (an ordered list of numbers). Almost everything that follows in this course is built from them.',
    },
    {
      type: 'tip',
      content:
        'Next, you will see how to combine vectors: adding them, scaling them, and measuring them. These three operations power every neural network ever built.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'Which of these is a **vector**?',
      options: [
        'The temperature in Delhi: $32$',
        'The price of a coffee: $\\$4.50$',
        'The position of a drone: $(12, 5, 8)$',
        'A student\'s age: $14$',
      ],
      correct: 2,
      explanation:
        'A vector is an **ordered list** of numbers. The drone\'s position has three numbers (x, y, z), so it is a vector. The others are single numbers — scalars.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'A vector describes a student\'s marks as $(\\text{math}, \\text{science}, \\text{english}) = (85, 92, 78)$. How many **components** does this vector have?',
      options: ['$1$', '$2$', '$3$', '$5$'],
      correct: 2,
      explanation:
        'There are three numbers in the vector — one for each subject. So it has three components. We call this a 3-dimensional vector.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      question:
        'What is the **dimension** of the vector $\\vec{v} = (7, -2, 0, 5, 3)$?',
      correct: 5,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'The dimension is just the number of components — how many numbers are inside the parentheses.',
      explanation:
        'There are 5 numbers in the vector, so its dimension is 5. Dimension = number of components.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'Are $(2, 5)$ and $(5, 2)$ the same vector?',
      options: [
        'Yes, they contain the same numbers.',
        'No — order matters, they describe different things.',
        'Only if we add them together first.',
        'Yes, but only in 2D.',
      ],
      correct: 1,
      explanation:
        'The **order** of components matters. $(2, 5)$ means "2 across, 5 up", while $(5, 2)$ means "5 across, 2 up" — completely different positions on a map.',
      xp: 20,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'A colour on screen is stored as $(R, G, B)$. What is the vector for pure green?',
      options: [
        '$(0, 0, 0)$',
        '$(255, 0, 0)$',
        '$(0, 255, 0)$',
        '$(255, 255, 255)$',
      ],
      correct: 2,
      explanation:
        'Pure green means "no red, full green, no blue" — $(0, 255, 0)$. Each component runs from 0 (none) to 255 (full). This is exactly how every pixel on your screen is stored.',
      xp: 20,
    },
  ],
};