// 📊 Stats — Lesson 6: Sampling & The Central Limit Theorem

export const statSamplingLesson = {
  id: 'stat-sampling',
  title: 'Sampling & The Central Limit Theorem',
  difficulty: 'intermediate',
  duration: 24,
  intro:
    'How can a survey of 1,000 people predict the election results of 900 million voters? The answer is the Central Limit Theorem — the most important theorem in all of statistics.',

  sections: [
    {
      type: 'text',
      content:
        'We cannot measure an entire population. So we take a **sample**. But how do we know our sample is not just an unlucky one? What if we accidentally surveyed only people from one city?',
    },
    {
      type: 'text',
      content:
        'This is where **sampling distribution** comes in. Imagine taking 1,000 different samples, each of 100 people. Calculate the mean for each sample. You now have 1,000 means.',
    },
    {
      type: 'note',
      content:
        'The **Central Limit Theorem (CLT)** says: if you take enough random samples, the distribution of their means will form a **Normal Distribution (bell curve)** — regardless of what the original data looked like!',
    },

    // ── THE MAGIC OF CLT ─────────────
    {
      type: 'math',
      latex:
        '\\bar{X} \\sim \\text{Normal}\\left(\\mu, \\frac{\\sigma}{\\sqrt{n}}\\right)',
      caption:
        'The sample mean has a normal distribution with mean μ and standard error σ/√n.',
    },
    {
      type: 'text',
      content:
        'Two huge consequences:\n\n1. **The mean of the sample means** equals the true population mean (μ). So our sample is unbiased.\n2. **The spread** (Standard Error) is σ/√n. As the sample size `n` increases, the spread shrinks. This is why bigger samples are better.',
    },
    {
      type: 'code',
      content: 'Simulating the CLT:',
      code: `import numpy as np\n\n# Imagine a population that is NOT normal (exponential, skewed)\npopulation = np.random.exponential(scale=2.0, size=100000)\nprint(f"Population mean: {population.mean():.2f}")\n\n# Take 1000 samples, each of size 30, and calculate their means\nsample_means = []\nfor _ in range(1000):\n    sample = np.random.choice(population, size=30)\n    sample_means.append(sample.mean())\n\nsample_means = np.array(sample_means)\nprint(f"Mean of sample means: {sample_means.mean():.2f}")\nprint(f"Standard error: {sample_means.std():.4f}")\nprint(f"Expected SE (σ/√n): {population.std() / np.sqrt(30):.4f}")`,
      output: `Population mean: 2.00\nMean of sample means: 2.00\nStandard error: 0.3637\nExpected SE (σ/√n): 0.3651`,
      language: 'python',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'The Bell Curve Emerges',
      description:
        'The original data is completely random (uniform). But as we average larger samples, the distribution of those averages becomes a perfect bell curve.',
      sliders: [
        { id: 'sampleSize', label: 'Sample Size (n)', min: 1, max: 50, step: 1, default: 1, decimals: 0 },
      ],
      render: ({ sampleSize }) => {
        // Generate sample means
        const means = [];
        for (let i = 0; i < 500; i++) {
          let sum = 0;
          for (let j = 0; j < sampleSize; j++) {
            sum += Math.random(); // Uniform(0,1)
          }
          means.push(sum / sampleSize);
        }
        
        // Map to points for the graph (density approximation)
        const points = means.map(m => ({
          x: m * 10, // scale to 0-10 domain
          y: Math.random() * 0.5, // fake density jitter for visual
          color: 'cyan',
          r: 2,
        }));

        return {
          points,
          fns: [],
          domain: [0, 10],
          range: [-0.1, 1.2],
        };
      },
      formula: ({ sampleSize }) => 
        `\\text{Sampling } n = ${sampleSize}. \\;\\; \\text{Standard Error} = \\frac{1}{\\sqrt{12 \\cdot n}}`,
      caption:
        'At n=1, the means are flat (uniform). At n=10, it starts looking like a bell. At n=30, it is a perfect bell curve. This is the magic of CLT.',
    },

    {
      type: 'warning',
      content:
        'CLT only works if the sample is **random**. If you survey 1000 people but only from your college, it is a biased sample. CLT cannot save you from bad sampling.',
    },
    {
      type: 'tip',
      content:
        'Next: Hypothesis Testing. How do we use samples to prove something? "Did this new feature actually increase sales, or was it just luck?"',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What does the Central Limit Theorem state?',
      options: [
        'All data is normally distributed.',
        'The distribution of sample means approaches normal as sample size increases.',
        'Large samples are always accurate.',
        'The mean of a sample is always the population mean.',
      ],
      correct: 1,
      explanation:
        'CLT is about the distribution of the SAMPLE MEANS, not the original data. It says sample means become normally distributed regardless of the underlying data.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What happens to the standard error (spread of sample means) as sample size n increases?',
      options: [
        'It increases.',
        'It stays the same.',
        'It decreases (proportional to 1/√n).',
        'It becomes negative.',
      ],
      correct: 2,
      explanation:
        'Standard error = σ/√n. As n goes up, the denominator gets bigger, so SE gets smaller. Bigger samples give more precise estimates.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question: 'If σ = 10 and n = 100, what is the standard error?',
      correct: 1,
      tolerance: 0.01,
      placeholder: 'Enter a number',
      hint: 'SE = σ / √n = 10 / 10.',
      explanation: '10 / √100 = 10 / 10 = 1.',
      xp: 20,
    },
  ],
};