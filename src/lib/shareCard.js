// 🎨 Generate a shareable progress card using Canvas API
// Zero dependencies — fast and lightweight

export async function generateShareCard({
  name = 'Learner',
  xp = 0,
  streak = 0,
  achievementsCount = 0,
  accuracy = 0,
  lessonsDone = 0,
  modulesDone = 0,
}) {
  // Ensure fonts are loaded (avoid drawing before font is ready)
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');

  // ── Background ──
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, 1200, 630);

  // Radial glow — orange top right
  const grad1 = ctx.createRadialGradient(1000, 100, 50, 1000, 100, 400);
  grad1.addColorStop(0, 'rgba(249, 115, 22, 0.25)');
  grad1.addColorStop(1, 'rgba(249, 115, 22, 0)');
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, 1200, 630);

  // Radial glow — cyan bottom left
  const grad2 = ctx.createRadialGradient(200, 550, 50, 200, 550, 400);
  grad2.addColorStop(0, 'rgba(34, 211, 238, 0.15)');
  grad2.addColorStop(1, 'rgba(34, 211, 238, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, 1200, 630);

  // Subtle grid
  ctx.strokeStyle = 'rgba(37, 37, 51, 0.4)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1200; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 630);
    ctx.stroke();
  }
  for (let y = 0; y < 630; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // ── Header ──
  ctx.font = 'bold 32px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#f97316';
  ctx.fillText('🐍', 80, 100);

  ctx.font = 'bold 36px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Py', 120, 100);
  ctx.fillStyle = '#fb923c';
  ctx.fillText('Mastery', 176, 100);

  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(145, 152, 166, 0.7)';
  ctx.textAlign = 'right';
  ctx.fillText('PROGRESS CARD', 1120, 100);
  ctx.textAlign = 'left';

  // ── User name ──
  ctx.font = 'bold 56px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, 80, 200);

  ctx.font = '22px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(145, 152, 166, 0.85)';
  ctx.fillText('Learning Python, Math & Machine Learning', 80, 240);

  // ── Stats grid ──
  const stats = [
    { icon: '⚡', value: `${xp}`, label: 'Total XP', color: '#fbbf24' },
    { icon: '🔥', value: `${streak}`, label: 'Day Streak', color: '#fb923c' },
    { icon: '🏆', value: `${achievementsCount}`, label: 'Achievements', color: '#fbbf24' },
    { icon: '🎯', value: accuracy ? `${accuracy}%` : '—', label: 'Accuracy', color: '#22d3ee' },
    { icon: '📚', value: `${lessonsDone}`, label: 'Lessons Done', color: '#34d399' },
    { icon: '🚀', value: `${modulesDone}`, label: 'Modules Mastered', color: '#f97316' },
  ];

  const startX = 80;
  const startY = 320;
  const boxW = 320;
  const boxH = 110;
  const gapX = 20;
  const gapY = 20;

  stats.forEach((stat, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const x = startX + col * (boxW + gapX);
    const y = startY + row * (boxH + gapY);

    // Box background
    ctx.fillStyle = 'rgba(28, 31, 39, 0.75)';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 14);
    ctx.fill();

    // Border
    ctx.strokeStyle = 'rgba(37, 37, 51, 0.9)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 14);
    ctx.stroke();

    // Icon
    ctx.font = '36px Inter, sans-serif';
    ctx.fillStyle = stat.color;
    ctx.fillText(stat.icon, x + 20, y + 48);

    // Value
    ctx.font = 'bold 40px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(stat.value, x + 75, y + 58);

    // Label
    ctx.font = '15px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(145, 152, 166, 0.9)';
    ctx.fillText(stat.label.toUpperCase(), x + 20, y + 90);
  });

  // ── Footer ──
  ctx.font = '20px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(95, 102, 115, 1)';
  ctx.fillText('Built with ❤️  by Shikhar Singh', 80, 590);

  ctx.textAlign = 'right';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(251, 146, 60, 0.9)';
  ctx.fillText('pymastery-in.web.app', 1120, 590);
  ctx.textAlign = 'left';

  // ── Download ──
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `pymastery-progress-${new Date().toISOString().slice(0, 10)}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}