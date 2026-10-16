// SVG graph plotter — no external dependencies.
// Supports: functions, points, tangent lines, vectors (arrows), helper lines, legend.

const COLOR_MAP = {
  brand: '#f97316',
  cyan: '#22d3ee',
  emerald: '#34d399',
  violet: '#a78bfa',
  rose: '#fb7185',
  amber: '#fbbf24',
  slate: '#94a3b8',
  blue: '#60a5fa',
  pink: '#f472b6',
};

function resolveColor(c) {
  return COLOR_MAP[c] || c || COLOR_MAP.brand;
}

function niceStep(rawStep) {
  if (!Number.isFinite(rawStep) || rawStep <= 0) return 1;
  const exp = Math.floor(Math.log10(rawStep));
  const base = Math.pow(10, exp);
  const frac = rawStep / base;
  let nice;
  if (frac < 1.5) nice = 1;
  else if (frac < 3) nice = 2;
  else if (frac < 7) nice = 5;
  else nice = 10;
  return nice * base;
}

function fmt(n) {
  if (Math.abs(n) < 1e-9) return '0';
  if (Math.abs(n) >= 1000 || (Math.abs(n) < 0.01 && n !== 0))
    return n.toExponential(1);
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/\.?0+$/, '');
}

export default function Graph({
  fns = [],
  points = [],
  vectors = [],
  tangent,
  lines = [],
  domain = [-5, 5],
  range = [-5, 5],
  grid = true,
  width = 640,
  height = 400,
  ariaLabel = 'graph',
}) {
  const [xMin, xMax] = domain;
  const [yMin, yMax] = range;

  const pad = { top: 28, right: 24, bottom: 32, left: 46 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const sx = (x) => pad.left + ((x - xMin) / (xMax - xMin)) * plotW;
  const sy = (y) => pad.top + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

  const sample = (fn, samples = 240) => {
    const coords = [];
    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i / samples) * (xMax - xMin);
      let y;
      try {
        y = fn(x);
      } catch {
        y = NaN;
      }
      if (Number.isFinite(y) && Math.abs(y) < 1e6) {
        coords.push([sx(x), sy(y)]);
      } else {
        coords.push(null);
      }
    }
    let d = '';
    let penDown = false;
    for (const pt of coords) {
      if (pt === null) {
        penDown = false;
        continue;
      }
      d += `${penDown ? 'L' : 'M'} ${pt[0].toFixed(2)} ${pt[1].toFixed(2)} `;
      penDown = true;
    }
    return d;
  };

  const gridXs = [];
  const gridYs = [];
  const stepX = niceStep((xMax - xMin) / 8);
  const stepY = niceStep((yMax - yMin) / 6);
  for (let x = Math.ceil(xMin / stepX) * stepX; x <= xMax + 1e-9; x += stepX) {
    gridXs.push(+x.toFixed(6));
  }
  for (let y = Math.ceil(yMin / stepY) * stepY; y <= yMax + 1e-9; y += stepY) {
    gridYs.push(+y.toFixed(6));
  }

  const axisY = yMin <= 0 && yMax >= 0 ? sy(0) : null;
  const axisX = xMin <= 0 && xMax >= 0 ? sx(0) : null;

  const legendItems = fns.filter((f) => f.label);

  // Unique colors used by vectors → generate arrow markers
  const vectorColors = [
    ...new Set(vectors.map((v) => resolveColor(v.color || 'brand'))),
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-full rounded-xl border border-surface-700 bg-surface-900/60"
      role="img"
      aria-label={ariaLabel}
    >
      {/* Arrow markers */}
      <defs>
        {vectorColors.map((c) => (
          <marker
            key={c}
            id={`arrow-${c.replace('#', '')}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={c} />
          </marker>
        ))}
      </defs>

      {/* Grid */}
      {grid &&
        gridXs.map((x, i) => (
          <line
            key={`gx-${i}`}
            x1={sx(x)}
            y1={pad.top}
            x2={sx(x)}
            y2={pad.top + plotH}
            stroke="#252533"
            strokeWidth={1}
          />
        ))}
      {grid &&
        gridYs.map((y, i) => (
          <line
            key={`gy-${i}`}
            x1={pad.left}
            y1={sy(y)}
            x2={pad.left + plotW}
            y2={sy(y)}
            stroke="#252533"
            strokeWidth={1}
          />
        ))}

      {/* Axes */}
      {axisY !== null && (
        <line
          x1={pad.left}
          y1={axisY}
          x2={pad.left + plotW}
          y2={axisY}
          stroke="#5f6673"
          strokeWidth={1.5}
        />
      )}
      {axisX !== null && (
        <line
          x1={axisX}
          y1={pad.top}
          x2={axisX}
          y2={pad.top + plotH}
          stroke="#5f6673"
          strokeWidth={1.5}
        />
      )}

      {/* Tick labels */}
      {gridXs.map((x, i) => (
        <text
          key={`tx-${i}`}
          x={sx(x)}
          y={pad.top + plotH + 18}
          textAnchor="middle"
          fontSize="11"
          fill="#9198a6"
          fontFamily="JetBrains Mono, monospace"
        >
          {fmt(x)}
        </text>
      ))}
      {gridYs.map((y, i) => (
        <text
          key={`ty-${i}`}
          x={pad.left - 8}
          y={sy(y) + 4}
          textAnchor="end"
          fontSize="11"
          fill="#9198a6"
          fontFamily="JetBrains Mono, monospace"
        >
          {fmt(y)}
        </text>
      ))}

      {/* Helper lines */}
      {lines.map((ln, i) => {
        if (ln.type === 'v') {
          return (
            <line
              key={`l-${i}`}
              x1={sx(ln.value)}
              y1={pad.top}
              x2={sx(ln.value)}
              y2={pad.top + plotH}
              stroke={resolveColor(ln.color)}
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
          );
        }
        if (ln.type === 'h') {
          return (
            <line
              key={`l-${i}`}
              x1={pad.left}
              y1={sy(ln.value)}
              x2={pad.left + plotW}
              y2={sy(ln.value)}
              stroke={resolveColor(ln.color)}
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
          );
        }
        return null;
      })}

      {/* Function curves */}
      {fns.map((f, i) => (
        <path
          key={`fn-${i}`}
          d={sample(f.fn)}
          fill="none"
          stroke={resolveColor(f.color)}
          strokeWidth={f.strokeWidth || 2.5}
          strokeDasharray={f.dashed ? '6 4' : undefined}
          strokeLinecap="round"
        />
      ))}

      {/* Vectors — arrows from origin (or from specified origin) */}
      {vectors.map((v, i) => {
        const ox = v.from ? v.from[0] : 0;
        const oy = v.from ? v.from[1] : 0;
        const x1 = sx(ox);
        const y1 = sy(oy);
        const x2 = sx(v.x);
        const y2 = sy(v.y);
        const color = resolveColor(v.color || 'brand');
        const markerId = `arrow-${color.replace('#', '')}`;
        return (
          <g key={`vec-${i}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth={v.strokeWidth || 2.5}
              strokeLinecap="round"
              markerEnd={`url(#${markerId})`}
            />
            {v.label && (
              <text
                x={x2 + (x2 > x1 ? 8 : -8)}
                y={y2 + (y2 > y1 ? -8 : 14)}
                fontSize="12"
                fill={color}
                fontFamily="JetBrains Mono, monospace"
                textAnchor={x2 > x1 ? 'start' : 'end'}
              >
                {v.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Tangent line */}
      {tangent &&
        (() => {
          const { at, fn, color = 'brand', span = 1.2 } = tangent;
          const h = 0.001;
          const slope = (fn(at + h) - fn(at - h)) / (2 * h);
          const yAt = fn(at);
          const x1 = at - span;
          const x2 = at + span;
          const y1 = yAt + slope * (x1 - at);
          const y2 = yAt + slope * (x2 - at);
          return (
            <g>
              <line
                x1={sx(x1)}
                y1={sy(y1)}
                x2={sx(x2)}
                y2={sy(y2)}
                stroke={resolveColor(color)}
                strokeWidth={2}
              />
              <circle
                cx={sx(at)}
                cy={sy(yAt)}
                r={5}
                fill={resolveColor(color)}
                stroke="#0a0a0f"
                strokeWidth={2}
              />
            </g>
          );
        })()}

      {/* Points */}
      {points.map((p, i) => (
        <g key={`p-${i}`}>
          <circle
            cx={sx(p.x)}
            cy={sy(p.y)}
            r={p.r || 5}
            fill={resolveColor(p.color || 'brand')}
            stroke="#0a0a0f"
            strokeWidth={2}
          />
          {p.label && (
            <text
              x={sx(p.x) + 8}
              y={sy(p.y) - 8}
              fontSize="11"
              fill="#e9e7e2"
              fontFamily="JetBrains Mono, monospace"
            >
              {p.label}
            </text>
          )}
        </g>
      ))}

      {/* Legend */}
      {legendItems.length > 0 &&
        legendItems.map((f, i) => {
          const y = pad.top + 12 + i * 18;
          const x = pad.left + plotW - 130;
          return (
            <g key={`leg-${i}`}>
              <line
                x1={x}
                y1={y}
                x2={x + 20}
                y2={y}
                stroke={resolveColor(f.color)}
                strokeWidth={2.5}
              />
              <text
                x={x + 26}
                y={y + 4}
                fontSize="11"
                fill="#e9e7e2"
                fontFamily="JetBrains Mono, monospace"
              >
                {f.label}
              </text>
            </g>
          );
        })}
    </svg>
  );
}