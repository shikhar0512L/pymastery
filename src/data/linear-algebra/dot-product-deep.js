// 📐 Linear Algebra — Lesson 8: Dot Product Deep Dive

export const laDotProductLesson = {
  id: 'la-dot-product-deep',
  title: 'Dot Product — Projections & Orthogonality',
  difficulty: 'intermediate',
  duration: 26,
  intro:
    'The dot product is the single most-used operation in all of ML. It measures similarity, computes projections, and defines what "perpendicular" means. This lesson unpacks it fully.',

  sections: [
    {
      type: 'text',
      content:
        'You have already met the dot product twice, briefly. Now we do it properly. Everything from attention in transformers, to recommendations, to regression is built on this one operation.',
    },

    // ── DEFINITION ─────────────────────
    {
      type: 'text',
      content:
        'The **dot product** of two vectors takes two vectors of the same length and returns a **single number**. Multiply matching components, then add them up.',
    },
    {
      type: 'math',
      latex:
        'u \\cdot v = u_1 v_1 + u_2 v_2 + \\cdots + u_n v_n = \\sum_{i=1}^{n} u_i v_i',
      caption:
        'The dot product. Multiply component-by-component, then sum. The result is a scalar, not a vector.',
    },
    {
      type: 'text',
      content:
        'Example: $(3, 4) \\cdot (1, 2) = 3 \\cdot 1 + 4 \\cdot 2 = 3 + 8 = 11$. One number out.',
    },
    {
      type: 'note',
      content:
        'Two different notations for the same thing. $u \\cdot v$ is the dot notation. $u^T v$ is the matrix notation. They mean exactly the same — you will see both in ML papers.',
    },

    // ── GEOMETRIC MEANING ─────────────
    {
      type: 'text',
      content:
        'But what does the number **mean**? Here is the geometric interpretation:',
    },
    {
      type: 'math',
      latex:
        'u \\cdot v = \\|u\\| \\, \\|v\\| \\cos\\theta',
      caption:
        'The dot product equals the lengths of both vectors times the cosine of the angle between them.',
    },
    {
      type: 'text',
      content:
        'This formula is one of the most useful identities in mathematics. It tells you that the dot product encodes **how aligned** two vectors are.',
    },
    {
      type: 'text',
      content:
        '• Large positive — the vectors point in similar directions.\n• Zero — the vectors are perpendicular.\n• Large negative — the vectors point in opposite directions.',
    },
    {
      type: 'graph',
      title: 'Three dot products',
      vectors: [
        { x: 2, y: 0, color: 'slate', label: 'u = (2, 0)' },
        { x: 1.5, y: 1.5, color: 'emerald', label: 'v = (1.5, 1.5)' },
        { x: 0, y: 2, color: 'violet', label: 'w = (0, 2)' },
        { x: -1.5, y: 1.5, color: 'rose', label: 'z = (−1.5, 1.5)' },
      ],
      domain: [-3, 3],
      range: [-1, 3],
      caption:
        '$u \\cdot v > 0$ (v is "forward"), $u \\cdot w = 0$ (w is perpendicular), $u \\cdot z < 0$ (z is "backward").',
    },
    {
      type: 'tip',
      content:
        'Because the dot product scales with the lengths of the vectors, it is not a clean "similarity" measure on its own. To remove the length effect, divide by both norms — that gives **cosine similarity**, which you met in Lesson 3.',
    },

    // ── PROJECTION ─────────────────────
    {
      type: 'text',
      content:
        'Here is where the dot product really shines: **projections**. The projection of u onto v is the "shadow" that u casts on the line through v.',
    },
    {
      type: 'math',
      latex:
        '\\text{proj}_v(u) = \\frac{u \\cdot v}{\\|v\\|^2} \\, v',
      caption:
        'The projection of u onto v. It is a vector, pointing along v.',
    },
    {
      type: 'text',
      content:
        'The dot product appears in the numerator — because it measures how much of u is "already in the direction" of v.',
    },
    {
      type: 'graph',
      title: 'Projecting u onto v',
      vectors: [
        { x: 3, y: 3, color: 'slate', label: 'u = (3, 3)' },
        { x: 4, y: 0, color: 'emerald', label: 'v = (4, 0)' },
        { x: 3, y: 0, color: 'brand', label: 'proj_v(u) = (3, 0)' },
      ],
      lines: [
        { type: 'v', value: 3, color: 'slate' },
      ],
      domain: [-1, 5],
      range: [-1, 4],
      caption:
        'The projection of u onto v is (3, 0) — the horizontal component of u. The dashed line shows the "drop" from u down to the projection.',
    },
    {
      type: 'note',
      content:
        'Projections are how you break a vector into "part along direction v" and "part perpendicular to v". This decomposition powers: solving linear systems (least squares is a projection), PCA, Fourier analysis, and neural network training.',
    },

    // ── ORTHOGONALITY ─────────────────
    {
      type: 'text',
      content:
        'Two vectors are **orthogonal** (perpendicular) when their dot product is zero. This is not a coincidence — it is the definition.',
    },
    {
      type: 'math',
      latex:
        'u \\perp v \\iff u \\cdot v = 0',
      caption:
        'The symbol ⟂ means "perpendicular to". Orthogonal vectors have zero dot product.',
    },
    {
      type: 'text',
      content:
        'Check: $(1, 0) \\cdot (0, 1) = 0$ — the x-axis and y-axis are orthogonal. $(2, 3) \\cdot (-3, 2) = -6 + 6 = 0$ — orthogonal too. $(1, 1) \\cdot (1, -1) = 0$ — orthogonal (the diagonal directions).',
    },
    {
      type: 'tip',
      content:
        'Why is orthogonality important? Because orthogonal directions carry **independent information**. If two features in a dataset are orthogonal, they tell you completely different things. When they are highly aligned, they tell you the same thing twice — which is why ML has a whole toolkit (PCA, regularization, dropout) for dealing with redundancy.',
    },

    // ── SIMULATION ────────────────────
    {
      type: 'simulation',
      title: 'Explore the dot product',
      description:
        'Change u and v. Watch the dot product value and the angle between them.',
      sliders: [
        { id: 'ux', label: 'u_x', min: -3, max: 3, step: 0.5, default: 2, decimals: 1 },
        { id: 'uy', label: 'u_y', min: -3, max: 3, step: 0.5, default: 0, decimals: 1 },
        { id: 'vx', label: 'v_x', min: -3, max: 3, step: 0.5, default: 1.5, decimals: 1 },
        { id: 'vy', label: 'v_y', min: -3, max: 3, step: 0.5, default: 1.5, decimals: 1 },
      ],
      render: ({ ux, uy, vx, vy }) => ({
        vectors: [
          { x: ux, y: uy, color: 'blue', label: 'u' },
          { x: vx, y: vy, color: 'emerald', label: 'v' },
        ],
        domain: [-4, 4],
        range: [-4, 4],
      }),
      formula: ({ ux, uy, vx, vy }) => {
        const dot = ux * vx + uy * vy;
        return `u \\cdot v = ${ux} \\cdot ${vx} + ${uy} \\cdot ${vy} = ${dot.toFixed(2)}`;
      },
      caption:
        'Try making the arrows perpendicular — the dot product will hit exactly 0. Try pointing them the same way — it will be large and positive.',
    },

    // ── ATTENTION ─────────────────────
    {
      type: 'text',
      content:
        'One last example, and it is the biggest one: **attention in transformers** — the mechanism behind GPT, Claude, and every modern chatbot.',
    },
    {
      type: 'text',
      content:
        'Every word in a sentence gets converted to a vector (an embedding). To decide "which other words should this word pay attention to?", the model computes the **dot product** between the current word\'s vector and every other word\'s vector.',
    },
    {
      type: 'text',
      content:
        'Large dot products → words are relevant to each other. Small dot products → words are unrelated. The model uses these scores to build a weighted combination of all the other words.',
    },
    {
      type: 'math',
      latex:
        '\\text{attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d}}\\right) V',
      caption:
        'The attention formula. QK^T is a matrix of dot products between all query and key vectors. This single line describes the core operation inside every transformer.',
    },
    {
      type: 'note',
      content:
        'You are now looking at the same formula printed in every GPT paper. QK^T is dot products. Softmax turns them into probabilities. Multiply by V and you get a weighted average. Three lines of linear algebra, running on thousands of GPUs, producing what the world calls AI.',
    },
    {
      type: 'tip',
      content:
        'That is Lesson 8. The dot product is the atomic unit of AI computation. Similarity, projection, orthogonality, attention — all built from this one operation. Next: eigenvalues and eigenvectors, the "special directions" hidden inside every matrix.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'numeric-answer',
      math: true,
      question: 'Compute $(2, 3) \\cdot (4, 1)$.',
      correct: 11,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'Multiply matching components, then add.',
      explanation:
        '$(2)(4) + (3)(1) = 8 + 3 = 11$.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question:
        'If $u \\cdot v = 0$ and neither vector is zero, what can you say about u and v?',
      options: [
        'They point in the same direction.',
        'They point in opposite directions.',
        'They are perpendicular (orthogonal).',
        'They are the same vector.',
      ],
      correct: 2,
      explanation:
        'A zero dot product (with non-zero vectors) means the cosine of the angle is 0, so the angle is 90°. They are perpendicular — mathematically orthogonal.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question: 'Compute $(1, 2, 3) \\cdot (4, 5, 6)$.',
      correct: 32,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'This is 3D — three products to add.',
      explanation:
        '$1 \\cdot 4 + 2 \\cdot 5 + 3 \\cdot 6 = 4 + 10 + 18 = 32$.',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question:
        'In transformer attention, why is the dot product used to compute relevance between words?',
      options: [
        'Because it is the only operation available.',
        'Because it measures how aligned two vectors are — a natural similarity score.',
        'Because it produces a vector, not a number.',
        'Because it always equals 1 for related words.',
      ],
      correct: 1,
      explanation:
        'The dot product measures alignment between two vectors. Words with aligned embeddings have high dot products, meaning they are contextually related. This is exactly the "similarity" signal the attention mechanism needs.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'mcq',
      math: true,
      question:
        'The projection of u onto v produces:',
      options: [
        'A scalar — a single number.',
        'A vector pointing along v.',
        'A vector perpendicular to v.',
        'The same as u.',
      ],
      correct: 1,
      explanation:
        'The projection is a vector — specifically, the "shadow" of u along the line of v. It points along v (or against v if the angle is obtuse). Projections decompose u into a part along v and a part perpendicular to v.',
      xp: 25,
    },
    {
      id: 'q6',
      type: 'mcq',
      math: true,
      question:
        'Two feature vectors in a dataset are orthogonal. What does this mean about the features?',
      options: [
        'They are the same feature.',
        'They carry independent information — knowing one tells you nothing about the other.',
        'They cannot both be used in the same model.',
        'They must have unit length.',
      ],
      correct: 1,
      explanation:
        'Orthogonal vectors share no information — mathematically, their correlation is zero. This is the "ideal" case in data science: features that each tell you something different. When features are highly aligned (not orthogonal), they are redundant, which is why techniques like PCA try to find orthogonal directions.',
      xp: 25,
    },
  ],
};