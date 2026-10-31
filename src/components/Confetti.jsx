import { useEffect, useRef } from 'react';

export default function Confetti({ onDone, duration = 3500 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    // Brand colors + extras
    const colors = [
      '#f97316', // brand orange
      '#fb923c', // light orange
      '#fbbf24', // amber
      '#22d3ee', // cyan
      '#34d399', // emerald
      '#a78bfa', // violet
      '#f472b6', // pink
    ];

    // Build particles — dual burst from two points
    const particles = [];
    const bursts = [
      { x: w * 0.5, y: h * 0.4, count: 90, spread: 22 },
      { x: w * 0.3, y: h * 0.5, count: 40, spread: 14 },
      { x: w * 0.7, y: h * 0.5, count: 40, spread: 14 },
    ];

    for (const b of bursts) {
      for (let i = 0; i < b.count; i++) {
        const angle = (Math.random() - 0.5) * Math.PI * 1.1 - Math.PI / 2;
        const speed = Math.random() * b.spread + 4;

        particles.push({
          x: b.x,
          y: b.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: Math.random() * 7 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.35,
          opacity: 1,
          decay: Math.random() * 0.006 + 0.004,
          gravity: 0.4,
          shape: Math.random() > 0.6 ? 'circle' : 'rect',
          wobble: Math.random() * 0.3 + 0.1,
          wobblePhase: Math.random() * Math.PI * 2,
        });
      }
    }
    particlesRef.current = particles;

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      let alive = false;
      for (const p of particlesRef.current) {
        if (p.opacity <= 0) continue;
        alive = true;

        p.vy += p.gravity;
        p.vx *= 0.995;
        p.x += p.vx + Math.sin(frame * p.wobble + p.wobblePhase) * 0.5;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    const timeout = setTimeout(() => {
      onDone?.();
    }, duration);

    return () => {
      clearTimeout(timeout);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ctx.clearRect(0, 0, w, h);
    };
  }, [onDone, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[150]"
      aria-hidden="true"
    />
  );
}