import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ChallengeCard from "../components/lesson/ChallengeCard";
import useProgress from "../store/useProgress";
import useStreak from "../hooks/useStreak";
import {
  buildChallengePool,
  filterPool,
  pickRandom,
  getDailyChallenge,
  getModuleOptions,
  localDateKey,
  DIFFICULTY_OPTIONS,
  TYPE_OPTIONS,
} from "../lib/practicePool";

export default function Practice() {
  const { completedChallenges, recordDailyComplete, lastDailyChallengeDate } =
    useProgress();
  const { currentStreak, longestStreak } = useStreak();

  const moduleOptions = useMemo(() => getModuleOptions(), []);
  const dailyChallenge = useMemo(() => getDailyChallenge(), []);

  const [moduleFilter, setModuleFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [currentItem, setCurrentItem] = useState(null);
  const [seenKeys, setSeenKeys] = useState(() => new Set());
  const [baseline, setBaseline] = useState(null);

  // ── Session baseline (attempts/correct this session) ──
  useEffect(() => {
    setBaseline(Object.keys(completedChallenges).length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Pick initial / on-filter-change challenge ──
  useEffect(() => {
    const pool = filterPool(buildChallengePool(), {
      moduleId: moduleFilter,
      difficulty: difficultyFilter,
      type: typeFilter,
    });
    const picked = pickRandom(pool, null, seenKeys);
    setCurrentItem(picked);
    if (picked) setSeenKeys((s) => new Set(s).add(picked.key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleFilter, difficultyFilter, typeFilter]);

  // ── Award daily bonus when daily challenge answered correctly ──
  const dailyKey = dailyChallenge?.key;
  const dailyDoneToday =
    dailyChallenge && completedChallenges[dailyKey] === true;
  const today = localDateKey();

  useEffect(() => {
    if (dailyDoneToday && lastDailyChallengeDate !== today) {
      recordDailyComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyDoneToday]);

  const handleNext = () => {
    const pool = filterPool(buildChallengePool(), {
      moduleId: moduleFilter,
      difficulty: difficultyFilter,
      type: typeFilter,
    });
    const picked = pickRandom(pool, currentItem?.key, seenKeys);
    if (picked) {
      setCurrentItem(picked);
      setSeenKeys((s) => new Set(s).add(picked.key));
    }
  };

  const sessionAttempts =
    baseline !== null ? Object.keys(completedChallenges).length - baseline : 0;
  const totalPool = buildChallengePool().length;
  const filteredPool = filterPool(buildChallengePool(), {
    moduleId: moduleFilter,
    difficulty: difficultyFilter,
    type: typeFilter,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 pb-32 sm:px-6 sm:pb-36">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1
            className="font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.25rem)" }}
          >
            🎯 Practice Mode
          </h1>
          {currentStreak > 0 && (
            <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-400">
              🔥 {currentStreak}-day streak
            </span>
          )}
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-surface-600">
          Random challenges from across all lessons. No signup needed, no scores
          at stake — just sharpen your skills. {totalPool} challenges in the
          pool.
        </p>
      </div>

      {/* Daily Challenge */}
      {dailyChallenge && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-amber-500/5">
          <div className="flex items-center justify-between border-b border-orange-500/20 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-base">🔥</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-400">
                Daily Challenge
              </span>
              <span className="text-[11px] text-surface-600">· {today}</span>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                dailyDoneToday
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-orange-500/15 text-orange-400"
              }`}
            >
              {dailyDoneToday ? "✓ Done today" : "+25 XP bonus"}
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 text-[11px] text-surface-600">
              From{" "}
              <Link
                to={`/module/${dailyChallenge.moduleId}/lesson/${dailyChallenge.lessonId}`}
                className="text-brand-400 hover:underline"
              >
                {dailyChallenge.lessonTitle}
              </Link>
            </div>
            <ChallengeCard
              key={`daily-${dailyChallenge.key}`}
              moduleId={dailyChallenge.moduleId}
              lessonId={dailyChallenge.lessonId}
              challenge={dailyChallenge.challenge}
              index={0}
              total={1}
            />
          </div>
        </div>
      )}
      {/* Filters — full-width on mobile, inline on sm+ */}
      <div className="mb-6 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="w-full rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 text-xs text-white outline-none transition-colors focus:border-brand-500/60 sm:w-auto sm:py-1.5"
        >
          <option value="all">All modules</option>
          {moduleOptions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="w-full rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 text-xs text-white outline-none transition-colors focus:border-brand-500/60 sm:w-auto sm:py-1.5"
        >
          {DIFFICULTY_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 text-xs text-white outline-none transition-colors focus:border-brand-500/60 sm:w-auto sm:py-1.5"
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <span className="text-center text-[11px] text-surface-600 sm:ml-auto sm:text-left">
          {filteredPool.length} challenge
          {filteredPool.length === 1 ? "" : "s"} match
        </span>
      </div>

      {/* Session stats */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-surface-800 bg-surface-900/40 px-4 py-3 text-xs">
        <span className="text-surface-600">This session:</span>
        <span className="font-medium text-slate-300">
          {sessionAttempts} attempt{sessionAttempts === 1 ? "" : "s"}
        </span>
        <span className="h-3 w-px bg-surface-700" />
        <span className="text-surface-600">Streak:</span>
        <span className="font-medium text-orange-400">
          🔥 {currentStreak} (longest: {longestStreak})
        </span>
      </div>

      {/* Practice challenge */}
      {currentItem ? (
        <div>
          <div className="mb-3 text-[11px] text-surface-600">
            From{" "}
            <Link
              to={`/module/${currentItem.moduleId}/lesson/${currentItem.lessonId}`}
              className="text-brand-400 hover:underline"
            >
              {currentItem.lessonTitle}
            </Link>
            <span className="ml-2 text-surface-700">
              · {currentItem.lessonDifficulty}
            </span>
          </div>
          <ChallengeCard
            key={currentItem.key}
            moduleId={currentItem.moduleId}
            lessonId={currentItem.lessonId}
            challenge={currentItem.challenge}
            index={0}
            total={1}
          />
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleNext}
              className="text-xs text-surface-600 transition-colors hover:text-white"
            >
              Skip →
            </button>
            <button
              onClick={handleNext}
              className="rounded-lg bg-gradient-to-r from-brand-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              Next challenge →
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-surface-800 bg-surface-900/40 p-8 text-center">
          <div className="text-3xl">🤷</div>
          <p className="mt-3 text-sm text-surface-600">
            No challenges match your filters. Try adjusting them.
          </p>
        </div>
      )}
    </div>
  );
}
