// 🧠 DL — Lesson 11: Generative AI — GANs & Diffusion

export const dlGenerativeAiLesson = {
  id: 'dl-generative-ai',
  title: 'Generative AI — GANs & Diffusion Models',
  difficulty: 'advanced',
  duration: 28,
  intro:
    'How does Stable Diffusion draw a cat from a text prompt? How does AI generate photorealistic faces that do not exist? This lesson covers the two most important families of generative models: GANs and Diffusion.',

  sections: [
    {
      type: 'text',
      content:
        'All previous models were **discriminative** — given an input, they predict a label or a value. Generative models are different: they learn the distribution of the data itself, so they can create brand new examples.',
    },

    // ── GANs ─────────────────────────
    {
      type: 'text',
      content:
        '**Generative Adversarial Networks (GANs, 2014)** use two networks fighting each other:\n\n• **Generator** — takes random noise, outputs a fake image.\n• **Discriminator** — takes an image, outputs "real" or "fake".',
    },
    {
      type: 'math',
      latex:
        '\\min_G \\max_D \\; \\mathbb{E}_{x \\sim p_{data}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log (1 - D(G(z)))]',
      caption:
        'The generator tries to minimize this; the discriminator tries to maximize it. It is a zero-sum game.',
    },
    {
      type: 'note',
      content:
        'The generator gets better at fooling the discriminator. The discriminator gets better at spotting fakes. They push each other to improve. After thousands of rounds, the generator produces images so realistic that the discriminator cannot distinguish them from real ones.',
    },
    {
      type: 'text',
      content:
        'GANs dominated the field from 2014 to 2021 (StyleGAN, BigGAN). They produce very sharp images but are notoriously hard to train — they can collapse (generator keeps producing the same image) or oscillate.',
    },

    // ── DIFFUSION ────────────────────
    {
      type: 'text',
      content:
        '**Diffusion Models (2015, popularized 2020)** are the current state of the art. Stable Diffusion, DALL-E 2, Midjourney, Sora — all use diffusion.',
    },
    {
      type: 'text',
      content:
        'The core idea is beautifully simple: **learn to remove noise**.',
    },
    {
      type: 'text',
      content:
        '• **Forward process:** Take a real image and add Gaussian noise to it, step by step, until it becomes pure noise. You do this over 1000 steps.\n• **Reverse process:** Train a neural network that can reverse this — given a noisy image, predict the noise and remove it. Repeat 1000 times, and you go from pure noise to a sharp image.',
    },
    {
      type: 'math',
      latex:
        'x_0 \\xrightarrow{\\text{add noise}} x_1 \\to x_2 \\to \\cdots \\to x_T \\approx \\mathcal{N}(0, I)',
      caption:
        'Forward diffusion. The network learns to reverse this.',
    },
    {
      type: 'simulation',
      title: 'Diffusion in action',
      description:
        'Slide the timestep. At t=0 you have the real image. At t=1000 you have pure noise. The network learns to reverse this.',
      sliders: [
        { id: 't', label: 'Timestep t', min: 0, max: 1000, step: 50, default: 0, decimals: 0 },
      ],
      render: ({ t }) => {
        // Simulate "image" as a sum of frequencies + noise
        const noiseAmt = t / 1000;
        const signalAmt = 1 - noiseAmt;
        
        // Generate a "cat" shape using sine waves
        const imageFn = (x) => {
          const signal = Math.sin(x * 4) * 0.6 + Math.sin(x * 8) * 0.4;
          const noise = (Math.random() - 0.5) * 2 * noiseAmt;
          return signal * signalAmt + noise;
        };
        
        return {
          fns: [
            { fn: imageFn, color: 'cyan', label: `Image (t=${t})` },
          ],
          domain: [-3, 3],
          range: [-1.5, 1.5],
        };
      },
      formula: ({ t }) => {
        const noise = t / 1000;
        const signal = 1 - noise;
        return `\\text{Signal} = ${(signal * 100).toFixed(0)}\\%,\\;\\; \\text{Noise} = ${(noise * 100).toFixed(0)}\\%`;
      },
      caption:
        'At t=0, the shape is clear. At t=1000, it is pure noise. The network learns to reverse this process.',
    },
    {
      type: 'note',
      content:
        'Why does this work better than GANs? Because the reverse process is a **supervised learning problem**: at each step, you know the exact noise you added. So you can train with simple MSE loss. No adversarial game, no instability.',
    },

    // ── TEXT-TO-IMAGE ────────────────
    {
      type: 'text',
      content:
        'How does Stable Diffusion turn "a cat riding a bicycle" into an image?',
    },
    {
      type: 'text',
      content:
        'The text is encoded into a vector by a **text encoder** (usually a Transformer). That vector is used to **condition** the noise-removal network at each step. So the network does not just remove random noise — it removes noise in a way that steers toward "a cat on a bicycle".',
    },
    {
      type: 'math',
      latex:
        '\\epsilon_\\theta(x_t, t, c) \\approx \\epsilon',
      caption:
        'The network predicts the noise, given the noisy image, timestep, and text conditioning (c).',
    },
    {
      type: 'tip',
      content:
        'This is why Stable Diffusion is so fast to run on your phone or browser. It does not generate pixels; it generates a small "latent" image (like 64×64) and then upscales. That latent-space trick was the breakthrough of Latent Diffusion Models (2022).',
    },
    {
      type: 'note',
      content:
        'Stable Diffusion is open source (Stability AI). You can literally download the weights and run it on your own laptop. The entire model fits in ~4 GB. This is the same tech behind Midjourney and DALL-E.',
    },
    {
      type: 'tip',
      content:
        'You now know how modern AI creates images. GANs (sharp, unstable) and Diffusion (stable, slow but accurate). ChatGPT, Sora, and every other generative model on Earth uses one of these families — plus Transformers for the text side.',
    },
  ],

  challenges: [
    {
      id: 'q1',
      type: 'mcq',
      math: true,
      question: 'In a GAN, what does the Generator do?',
      options: [
        'Classifies images as real or fake.',
        'Creates fake images from random noise.',
        'Removes noise from images.',
        'Encodes text into vectors.',
      ],
      correct: 1,
      explanation:
        'The Generator takes random noise and produces a fake image. The Discriminator tries to tell if it is fake or real.',
      xp: 20,
    },
    {
      id: 'q2',
      type: 'mcq',
      math: true,
      question: 'What does a Diffusion model learn to do?',
      options: [
        'Generate fake images and fool a discriminator.',
        'Reverse the process of adding noise to an image.',
        'Classify images.',
        'Compress images for storage.',
      ],
      correct: 1,
      explanation:
        'Diffusion models learn to denoise. They take a noisy image, predict the noise, subtract it, and repeat until a clean image emerges.',
      xp: 20,
    },
    {
      id: 'q3',
      type: 'numeric-answer',
      math: true,
      question: 'If a diffusion model uses T=1000 timesteps, how many denoising steps are needed to generate an image from pure noise?',
      correct: 1000,
      tolerance: 0,
      placeholder: 'Enter a number',
      hint: 'One step per timestep.',
      explanation:
        'The reverse process starts at t=1000 (pure noise) and goes down to t=0. That is 1000 denoising steps. (Note: modern fast samplers like DDIM reduce this to 20-50 steps.)',
      xp: 15,
    },
    {
      id: 'q4',
      type: 'mcq',
      math: true,
      question: 'Why is Stable Diffusion so fast to run in a browser?',
      options: [
        'Because it uses GANs.',
        'Because it operates in latent space — a smaller, compressed image representation.',
        'Because it uses small text models.',
        'Because it does not use noise.',
      ],
      correct: 1,
      explanation:
        'Stable Diffusion generates in latent space (e.g., 64×64) instead of pixel space (e.g., 512×512). This is 64x less computation, which is why it works on laptops and phones.',
      xp: 25,
    },
    {
      id: 'q5',
      type: 'output-match',
      question: 'Simulate the forward diffusion process: add 0.5 noise to an image of value 1.0. Print the result rounded to 2 decimals.',
      starterCode: 'import numpy as np\n# your code here\n',
      expectedOutput: '1.5',
      hint: 'Add 0.5 to 1.0.',
      solution: 'import numpy as np\nx = 1.0\nnoise = 0.5\nprint(round(x + noise, 2))',
      explanation:
        'In forward diffusion, at each step we add a small amount of noise. The image gets progressively noisier.',
      xp: 15,
    },
  ],
};