import { Link } from 'react-router-dom';
import useProgress from '../store/useProgress';

// Tailwind needs literal class strings in source to detect them at build time.
// Never construct class names dynamically via .replace() etc.
const colorMap = {
  emerald: {
    border: 'hover:border-emerald-500/60',
    glow: 'group-hover:shadow-emerald-500/20',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    bar: 'bg-emerald-500',
  },
  violet: {
    border: 'hover:border-violet-500/60',
    glow: 'group-hover:shadow-violet-500/20',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    bar: 'bg-violet-500',
  },
  cyan: {
    border: 'hover:border-cyan-500/60',
    glow: 'group-hover:shadow-cyan-500/20',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    bar: 'bg-cyan-500',
  },
  amber: {
    border: 'hover:border-amber-500/60',
    glow: 'group-hover:shadow-amber-500/20',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    bar: 'bg-amber-500',
  },
  rose: {
    border: 'hover:border-rose-500/60',
    glow: 'group-hover:shadow-rose-500/20',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    bar: 'bg-rose-500',
  },
  fuchsia: {
    border: 'hover:border-fuchsia-500/60',
    glow: 'group-hover:shadow-fuchsia-500/20',
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
    bar: 'bg-fuchsia-500',
  },
  lime: {
    border: 'hover:border-lime-500/60',
    glow: 'group-hover:shadow-lime-500/20',
    text: 'text-lime-400',
    bg: 'bg-lime-500/10',
    bar: 'bg-lime-500',
  },
  teal: {
    border: 'hover:border-teal-500/60',
    glow: 'group-hover:shadow-teal-500/20',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    bar: 'bg-teal-500',
  },
};

export default function ModuleCard({ module }) {
  const { getModuleProgress } = useProgress();
  const colors = colorMap[module.color] || colorMap.emerald;
  const totalLessons = module.lessons?.length || 0;
  const progress = getModuleProgress(module.id, totalLessons);
  const isAvailable = module.status === 'available';
  const isComplete = isAvailable && totalLessons > 0 && progress === 100;

  const Card = (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-surface-800 bg-surface-900/50 p-5 transition-all duration-300 ${
        isAvailable
          ? `cursor-pointer ${colors.border} hover:-translate-y-1 hover:shadow-xl ${colors.glow}`
          : 'opacity-60'
      }`}
    >
      {/* Icon */}
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} text-2xl`}
        >
          {module.icon}
        </div>
        {!isAvailable && (
          <span className="rounded-full bg-surface-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-surface-600">
            Soon
          </span>
        )}
        {isAvailable && progress > 0 && (
          <span
            className={`rounded-full ${colors.bg} px-2.5 py-1 text-[10px] font-semibold ${colors.text}`}
          >
            {progress}%
          </span>
        )}
      </div>

      {/* Title + Description */}
      <h3 className="mb-1.5 text-base font-semibold text-white">
        {module.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-surface-600">
        {module.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-surface-600">
          {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}
        </span>
        {isAvailable && (
          <span
            className={`font-medium ${colors.text} transition-transform group-hover:translate-x-1`}
          >
            {isComplete ? 'Review →' : 'Start →'}
          </span>
        )}
      </div>

      {/* Progress bar — visible & filled when progress > 0 */}
      {isAvailable && progress > 0 && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-800">
          <div
            className={`h-full ${colors.bar} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );

  if (!isAvailable) return Card;

  return (
    <Link to={`/module/${module.id}`} className="block h-full">
      {Card}
    </Link>
  );
}