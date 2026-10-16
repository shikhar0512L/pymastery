import CodeBlock from './CodeBlock';
import MathText from './MathText';
import Graph from './Graph';
import SliderSimulation from './SliderSimulation';

export default function SectionRenderer({ section }) {
  switch (section.type) {
    case 'text':
      return (
        <p className="text-[15px] leading-relaxed text-slate-300">
          <MathText>{section.content}</MathText>
        </p>
      );

    case 'math':
      return (
        <div className="rounded-xl border border-surface-700 bg-surface-950/40 px-4 py-5 text-center">
          <MathText className="text-[17px] text-slate-100">
            {`$$${section.latex}$$`}
          </MathText>
          {section.caption && (
            <p className="mt-3 text-[12px] text-surface-600">
              <MathText>{section.caption}</MathText>
            </p>
          )}
        </div>
      );

    case 'graph':
      return (
        <div className="space-y-2">
          {section.title && (
            <div className="text-[13px] font-semibold text-slate-300">
              <MathText>{section.title}</MathText>
            </div>
          )}
          <Graph {...section} />
          {section.caption && (
            <p className="text-[12px] text-surface-600">
              <MathText>{section.caption}</MathText>
            </p>
          )}
        </div>
      );

    case 'simulation':
      return <SliderSimulation section={section} />;

    case 'code':
      return (
        <div className="space-y-3">
          {section.content && (
            <p className="text-[15px] leading-relaxed text-slate-300">
              <MathText>{section.content}</MathText>
            </p>
          )}
          <CodeBlock
            code={section.code}
            output={section.output}
            language={section.language || 'python'}
            runnable
          />
        </div>
      );

    case 'note':
      return (
        <Callout
          icon="ℹ️"
          label="Note"
          borderClass="border-cyan-500/40"
          bgClass="bg-cyan-500/5"
          labelClass="text-cyan-400"
          content={section.content}
        />
      );

    case 'tip':
      return (
        <Callout
          icon="💡"
          label="Tip"
          borderClass="border-emerald-500/40"
          bgClass="bg-emerald-500/5"
          labelClass="text-emerald-400"
          content={section.content}
        />
      );

    case 'warning':
      return (
        <Callout
          icon="⚠️"
          label="Warning"
          borderClass="border-amber-500/40"
          bgClass="bg-amber-500/5"
          labelClass="text-amber-400"
          content={section.content}
        />
      );

    default:
      return null;
  }
}

function Callout({ icon, label, content, borderClass, bgClass, labelClass }) {
  return (
    <div className={`rounded-xl border ${borderClass} ${bgClass} p-4`}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider ${labelClass}`}
        >
          {label}
        </span>
      </div>
      <p className="text-[14px] leading-relaxed text-slate-300">
        <MathText>{content}</MathText>
      </p>
    </div>
  );
}