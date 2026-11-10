// 📊 Stats — Lesson 1: What is Statistics?

export const statIntroLesson = {
  id: 'stat-intro',
  title: 'What is Statistics?',
  difficulty: 'beginner',
  duration: 18,
  intro:
    'Statistics is the science of making sense of data. When you have 10 numbers, you can just look at them. When you have 10 million, you need statistics to find the story. This is the foundation of all data science and AI.',

  sections: [
    {
      type: 'text',
      content:
        'Let us start with a very simple question. You have a class of 30 students and their test scores. How would you summarize the whole class with one number? That is statistics.',
    },
    {
      type: 'text',
      content:
        'Or: You have 10,000 customer reviews of a product. What is the general sentiment? Are people happy or angry? Statistics tells you.',
    },
    {
      type: 'note',
      content:
        'Statistics is not about memorizing formulas. It is about **making decisions from data**. Every ML model you will ever train is based on statistics.',
    },

    // ── TWO TYPES ────────────────────
    {
      type: 'text',
      content:
        'Statistics has two main parts:\n\n• **Descriptive Statistics** — Summarize the data you have. "The average score was 75."\n• **Inferential Statistics** — Draw conclusions beyond the data. "Based on this sample, I am 95% confident the true average is between 70 and 80."',
    },
    {
      type: 'text',
      content:
        'Think of it like this. Descriptive stats is like taking a photograph of a room. Inferential stats is like using that photo to guess what the rest of the house looks like.',
    },

    // ── POPULATION VS SAMPLE ─────────
    {
      type: 'text',
      content:
        'Two key terms:\n\n• **Population** — The ENTIRE group you care about. Every Indian voter. Every user of your app.\n• **Sample** — A small subset you actually measure. 1000 voters. 100 users.',
    },
    {
      type: 'math',
      latex:
        '\\text{Population} \\xrightarrow{\\text{sample}} \\text{Sample} \\xrightarrow{\\text{infer}} \\text{Conclusion about population}',
      caption:
        'You cannot measure every single thing. So you measure a sample, and use statistics to guess the truth.',
    },
    {
      type: 'tip',
      content:
        'The entire field of statistics exists because we cannot measure everything. We take a small sample and use math to say "this is probably true about the whole population."',
    },

    // ── WHY IT MATTERS ───────────────
    {
      type: 'text',
      content:
        'Why should you care?\n\n• **Data Science:** Every analysis starts with stats.\n• **ML:** Every model is fitted by minimizing statistical error.\n• **A/B Testing:** Should you launch this new feature? Stats tells you.\n• **Real life:** Should you trust that study? Stats helps you spot lies.',
    },
    {
      type: 'warning',
      content:
        'Here is a classic trick: "9 out of 10 dentists recommend this toothpaste!" Sounds convincing. But which 10 dentists? And who paid them? Statistics can be used to lie just as easily as to reveal truth. Learning stats helps you spot both.',
    },

    // ── SIMULATION ───────────────────
    {
      type: 'simulation',
      title: 'Population vs Sample',
      description:
        'The red dots are the whole population. The blue dots are a random sample. Try different sample sizes.',
      sliders: [
        { id: 'sampleSize', label: 'Sample Size', min: 5, max: 100, step: 5, default: 20, decimals: 0 },
      ],
      render: ({ sampleSize }) => {
        // Generate 200 "population" points
        const pop = [];
        for (let i = 0; i < 200; i++) {
          pop.push({
            x: Math.random() * 10,
            y: Math.random() * 10,
            color: 'rose',
            r: 3,
          });
        }
        // Pick sample of size sampleSize
        const sampled = pop.slice(0, sampleSize).map(p => ({
          ...p,
          color: 'cyan',
          r: 5,
        }));
        return {
          points: [...pop, ...sampled],
          domain: [-0.5, 10.5],
          range: [-0.5, 10.5],
          fns: [],
        };
      },
      formula: ({ sampleSize }) =>
        `\\text{Sample} = ${sampleSize} \\text{ out of } 200 = ${Math.round(sampleSize / 2)}%`,
      caption:
        'A sample is a small piece of the population. Bigger samples give more reliable conclusions.',
    },

    // ── WHAT YOU WILL LEARN ──────────
    {
      type: 'text',
      content:
        'In this module, you will learn:\n\n• How to summarize a dataset with one number (mean, median)\n• How to measure how spread out the data is (variance, standard deviation)\n• How probability works (coins, dice, real-world events)\n• The famous Normal Distribution (the bell curve)\n• How to test if a result is real or random luck\n• And how all of this powers modern Machine Learning',
    },
    {
      type: 'tip',
      content:
        'Next: The three most important numbers in statistics — mean, median, and mode. The absolute basics.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'What is the difference between a population and a sample?',
      options: [
        'They are the same thing.',
        'Population is the entire group; sample is a small subset.',
        'Population is small; sample is large.',
        'Population is only for humans.',
      ],
      correct: 1,
      explanation:
        'The population is the whole thing you want to study. The sample is a small piece you actually measure.',
      xp: 15,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'Which of these is DESCRIPTIVE statistics?',
      options: [
        'Predicting tomorrow\'s stock price.',
        'Calculating the average height of your class.',
        'Testing if a medicine works.',
        'Guessing election results from polls.',
      ],
      correct: 1,
      explanation:
        'Descriptive statistics summarizes the data you have. "Average height of your class" is just a summary, not a prediction.',
      xp: 15,
    },
    {
      id: 'q3',
      type: 'mcq',
      math: true,
      question: 'Why do we use samples instead of measuring the whole population?',
      options: [
        'Because samples are more accurate.',
        'Because measuring the whole population is often impossible or too expensive.',
        'Because samples are always better.',
        'Because the population is fake.',
      ],
      correct: 1,
      explanation:
        'You cannot ask every single Indian voter who they will vote for. So you take a sample and infer.',
      xp: 20,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question: 'Which of these is INFERENTIAL statistics?',
      options: [
        'The mean score of a class is 75.',
        'The tallest student is 6 feet.',
        'Based on a sample of 1000 people, the average Indian is 5\'7".',
        'The class has 30 students.',
      ],
      correct: 2,
      explanation:
        'You measured 1000 people (sample) and are drawing a conclusion about all Indians (population). That is inference.',
      xp: 25,
    },
  ],
};