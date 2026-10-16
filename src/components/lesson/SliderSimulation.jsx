import { useState, useMemo } from 'react';
import Graph from './Graph';
import MathText from './MathText';

export default function SliderSimulation({ section }) {
  const { title, description, sliders = [], render, formula, caption } = section;

  const initial = useMemo(() => {
    const o = {};
    for (const s of sliders) o[s.id] = s.default ?? s.min ?? 0;
    return o;
  }, [sliders]);

  const [params, setParams] = useState(initial);

  const setP = (id, value) => setParams((p) => ({ ...p, [id]: value }));

  const graphProps = typeof render === 'function' ? render(params) : {};
  const formulaText = typeof formula === 'function' ? formula(params) : null;

  return (
    <div className="space-y-4 rounded-2xl border border-surface-700 bg-surface-900/40 p-4 sm:p-5">
      {title && (
        <div>
          <h4 className="text-[15px] font-semibold text-white">{title}</h4>
          {description && (
            <p className="mt-1 text-[13px] text-surface-600">
              <MathText>{description}</MathText>
            </p>
          )}
        </div>
      )}

      <Graph {...graphProps} />

      {sliders.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {sliders.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-surface-700 bg-surface-950/40 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[12px] font-medium text-slate-300">
                  <MathText>{`$${s.label}$`}</MathText>
                </label>
                <span className="font-mono text-[12px] font-semibold text-brand-400">
                  {Number(params[s.id]).toFixed(s.decimals ?? 2)}
                </span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step ?? 0.1}
                value={params[s.id]}
                onChange={(e) => setP(s.id, parseFloat(e.target.value))}
                className="w-full accent-brand-500"
              />
            </div>
          ))}
        </div>
      )}

      {formulaText && (
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 px-4 py-3 text-center">
          <MathText className="text-[15px] text-cyan-300">
            {`$$${formulaText}$$`}
          </MathText>
        </div>
      )}

      {caption && (
        <p className="text-[12px] text-surface-600">
          <MathText>{caption}</MathText>
        </p>
      )}
    </div>
  );
}