import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  search,
  SUGGESTIONS,
  randomEntry,
  getContextSuggestions,
  searchLessons,
  resolveShortcut,
  SHORTCUTS_HELP,
} from '../../lib/assistantSearch';
import { analyzeCode } from '../../lib/debugHelper';
import { exportConversation } from '../../lib/chatExport';
import CodeBlock from '../lesson/CodeBlock';
import {
  useAssistantHistory,
  useAssistantFeedback,
} from '../../hooks/useAssistantHistory';
import { useVoiceInput, useReadAloud } from '../../hooks/useVoice';

const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hey! I'm the PyMastery Assistant. Ask me anything about Python — or paste buggy code for a quick debug. Type `?help` for shortcuts.",
};

const VOICE_ERROR_MESSAGES = {
  'not-allowed':
    'Mic permission blocked. Click the lock icon in your address bar → allow microphone.',
  'service-not-allowed':
    'Speech service blocked. Try Chrome or Edge, or check browser settings.',
  'no-speech': "Didn't catch that. Try again closer to the mic.",
  'audio-capture':
    'No microphone found. Plug one in or check system audio settings.',
  network: 'Network issue — speech recognition needs internet.',
  aborted: 'Voice input cancelled.',
  'start-failed': 'Could not start mic. Try again.',
};

const CATEGORIES = [
  { label: 'Basics', icon: '📘', query: 'What is a variable?' },
  { label: 'Strings', icon: '🔤', query: 'How does slicing work?' },
  { label: 'Lists', icon: '📋', query: 'What is a list comprehension?' },
  { label: 'Functions', icon: '⚙️', query: 'How do I define a function?' },
  { label: 'OOP', icon: '🏗️', query: 'What is a class?' },
  { label: 'Files', icon: '📁', query: 'How do I read a file?' },
];

export default function AssistantPanel({ onClose, context }) {
  const { messages, setMessages, clear } = useAssistantHistory(WELCOME);
  const { feedback, setFeedback } = useAssistantFeedback();
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [streamState, setStreamState] = useState(null);
  const [historyIdx, setHistoryIdx] = useState(null);
  const [voiceError, setVoiceError] = useState(null);

  const endRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const handleSendRef = useRef(null);

  const {
    listening,
    supported: voiceSupported,
    interim,
    start: startVoice,
    stop: stopVoice,
  } = useVoiceInput({
    onResult: (text) => {
      setInput(text);
      setTimeout(() => handleSendRef.current?.(text), 60);
    },
    onError: (err) => {
      setVoiceError(err);
      setTimeout(() => setVoiceError(null), 5000);
    },
  });

  const { speak, stop: stopSpeak, speaking, supported: ttsSupported } =
    useReadAloud();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Streaming effect
  useEffect(() => {
    if (!streamState) return;
    const { id, fullText, currentIndex } = streamState;

    if (currentIndex >= fullText.length) {
      setMessages((m) =>
        m.map((x) =>
          x.id === id ? { ...x, content: fullText, _streaming: false } : x
        )
      );
      setStreamState(null);
      return;
    }

    const step = Math.max(3, Math.ceil(fullText.length / 90));
    const t = setTimeout(() => {
      const next = Math.min(currentIndex + step, fullText.length);
      setMessages((m) =>
        m.map((x) =>
          x.id === id ? { ...x, content: fullText.slice(0, next) } : x
        )
      );
      setStreamState({ id, fullText, currentIndex: next });
    }, 14);

    return () => clearTimeout(t);
  }, [streamState, setMessages]);

  const pushMessage = useCallback(
    (msg) => {
      const id = `m${Date.now()}${Math.random().toString(36).slice(2, 6)}`;
      setMessages((m) => [...m, { id, ...msg }]);
      return id;
    },
    [setMessages]
  );

  const pushAssistant = useCallback(
    (payload) => {
      const id = pushMessage({
        role: 'assistant',
        content: '',
        code: payload.code,
        lessonLink: payload.lessonLink,
        related: payload.related,
        lessonResults: payload.lessonResults,
        debug: payload.debug,
        _streaming: true,
      });
      setStreamState({ id, fullText: payload.content, currentIndex: 0 });
    },
    [pushMessage]
  );

  const handleSend = useCallback(
    (text) => {
      const q = (text || input).trim();
      if (!q || thinking || streamState) return;

      pushMessage({ role: 'user', content: q });
      setInput('');
      setHistoryIdx(null);
      setThinking(true);

      setTimeout(() => {
        setThinking(false);

        // 1. Shortcuts
        const shortcut = resolveShortcut(q);
        if (shortcut) {
          if (shortcut.type === 'random') {
            const e = randomEntry();
            pushAssistant({
              content: `${e.question}\n\n${e.answer}`,
              code: e.code,
              lessonLink: e.lessonLink,
            });
            return;
          }
          if (shortcut.type === 'shortcuts-help') {
            const lines = SHORTCUTS_HELP.map(
              (s) => `• \`${s.cmd}\` — ${s.desc}`
            ).join('\n');
            pushAssistant({
              content:
                `Here are the shortcuts you can type:\n\n${lines}\n\n` +
                'You can also paste buggy code — I will try to spot common issues.',
            });
            return;
          }
          if (shortcut.type === 'lesson-search') {
            const results = searchLessons(shortcut.query, 6);
            if (results.length) {
              pushAssistant({
                content: `Found ${results.length} lesson${
                  results.length === 1 ? '' : 's'
                } matching "${shortcut.query}":`,
                lessonResults: results,
              });
            } else {
              pushAssistant({
                content: `No lessons matched "${shortcut.query}". Try a different topic or ask me directly.`,
              });
            }
            return;
          }
          if (shortcut.type === 'debug-wait') {
            pushAssistant({
              content:
                'Paste your code (or error message) in the next message and I will try to spot common issues.',
            });
            return;
          }
          pushAssistant({
            content: `Unknown shortcut \`?${shortcut.word}\`. Type \`?help\` to see available commands.`,
          });
          return;
        }

        // 2. Debug helper — runs on any message that looks like code or an error
        const debug = analyzeCode(q);
        if (debug) {
          const parts = [];
          if (debug.errors.length) {
            parts.push('**Likely cause(s):**');
            for (const e of debug.errors) {
              parts.push(`• ${e.cause}\n  Fix: ${e.fix}`);
            }
          }
          if (debug.smells.length) {
            if (parts.length) parts.push('');
            parts.push('**Code improvements:**');
            for (const s of debug.smells) {
              parts.push(`• ${s.message}\n  ${s.fix}`);
            }
          }
          const sampleCode =
            debug.smells[0]?.code || debug.errors[0]?.code || undefined;
          pushAssistant({
            content: parts.join('\n'),
            code: sampleCode,
          });
          return;
        }

        // 3. Normal search
        const result = search(q, context);

        if (result.type === 'intent') {
          if (result.intent === 'greeting') {
            pushAssistant({
              content: 'Hey! Ready to help. What are you learning today?',
            });
          } else if (result.intent === 'thanks') {
            pushAssistant({
              content: "Anytime! Keep going — you're building real skills. 🚀",
            });
          } else {
            pushAssistant({
              content:
                'I can explain concepts, show examples, compare things, find lessons, and debug pasted code. Try a category below or type `?help`.',
            });
          }
          return;
        }

        if (result.type === 'lesson-results') {
          pushAssistant({
            content: `Found ${result.results.length} lesson${
              result.results.length === 1 ? '' : 's'
            } matching "${result.query}":`,
            lessonResults: result.results,
          });
          return;
        }

        if (result.type === 'answer') {
          pushAssistant({
            content: result.entry.answer,
            code: result.entry.code,
            lessonLink: result.entry.lessonLink,
            related: result.related,
          });
          return;
        }

        pushAssistant({
          content:
            "Hmm, I don't have a specific answer for that yet. Try rephrasing, or type `?help` for shortcuts. You can also paste buggy code for a quick debug.",
        });
      }, 320);
    },
    [input, thinking, streamState, pushMessage, pushAssistant, context]
  );

  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  const handleRandom = () => {
    if (thinking || streamState) return;
    const e = randomEntry();
    pushMessage({ role: 'user', content: 'Surprise me 🎲' });
    setTimeout(() => {
      pushAssistant({
        content: `${e.question}\n\n${e.answer}`,
        code: e.code,
        lessonLink: e.lessonLink,
      });
    }, 320);
  };

  const handleRelatedClick = (q) => {
    if (thinking || streamState) return;
    handleSend(q);
  };

  const handleVoiceClick = () => {
    setVoiceError(null);
    if (listening) stopVoice();
    else startVoice();
  };

  const handleExport = () => {
    exportConversation(messages);
  };

  const handleKeyDown = (e) => {
    if (!userQueries.length) return;
    if (e.key === 'ArrowUp' && !input.trim()) {
      e.preventDefault();
      const nextIdx =
        historyIdx === null
          ? userQueries.length - 1
          : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(userQueries[nextIdx]);
    } else if (e.key === 'ArrowDown' && historyIdx !== null) {
      e.preventDefault();
      if (historyIdx >= userQueries.length - 1) {
        setHistoryIdx(null);
        setInput('');
      } else {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(userQueries[nextIdx]);
      }
    }
  };

  const userQueries = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content);

  const showWelcomeState = messages.length <= 1 && !thinking && !streamState;
  const contextSuggestions = getContextSuggestions(
    context.moduleId,
    context.lessonId,
    3
  );

  const voiceErrorMessage =
    voiceError &&
    (VOICE_ERROR_MESSAGES[voiceError] || `Voice error: ${voiceError}`);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-4 right-4 z-50 flex h-[640px] w-[400px] max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-surface-700 bg-surface-900 shadow-2xl shadow-black/60 animate-slide-up"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-800 bg-surface-950/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-amber-400 text-base shadow-glow">
            🤖
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface-900 bg-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              PyMastery Assistant
            </div>
            <div className="text-[10px] text-surface-600">
              {listening
                ? '🎙 Listening…'
                : speaking
                ? '🔊 Speaking…'
                : streamState
                ? 'typing…'
                : 'Ask · Search · Debug'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {speaking && (
            <button
              onClick={stopSpeak}
              title="Stop speaking"
              className="flex h-7 items-center rounded-md bg-rose-500/15 px-2 text-[10px] font-medium text-rose-400 transition-colors hover:bg-rose-500/25"
            >
              ■ Stop
            </button>
          )}
          <button
            onClick={handleExport}
            title="Export conversation"
            className="flex h-7 w-7 items-center justify-center rounded-md text-surface-600 transition-colors hover:bg-surface-800 hover:text-white"
          >
            📤
          </button>
          <button
            onClick={clear}
            title="Clear chat"
            className="flex h-7 w-7 items-center justify-center rounded-md text-surface-600 transition-colors hover:bg-surface-800 hover:text-white"
          >
            🗑
          </button>
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="flex h-7 w-7 items-center justify-center rounded-md text-surface-600 transition-colors hover:bg-surface-800 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={m}
            feedback={feedback[m.id]}
            onFeedback={(v) => setFeedback(m.id, v)}
            onRelatedClick={handleRelatedClick}
            onSpeak={ttsSupported ? speak : null}
            disabled={thinking || !!streamState}
          />
        ))}

        {thinking && (
          <div className="flex items-center gap-2 text-xs text-surface-600">
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500/60 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500/60 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500/60 [animation-delay:300ms]" />
            </span>
            thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Welcome state */}
      {showWelcomeState && (
        <div className="border-t border-surface-800 px-3 pt-3">
          {contextSuggestions.length > 0 && (
            <>
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-400">
                <span>🎯</span>
                <span>About this lesson</span>
              </div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {contextSuggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-brand-500/40 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-surface-600">
            Browse topics
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.label}
                onClick={() => handleSend(c.query)}
                className="flex items-center gap-1.5 rounded-full border border-surface-700 bg-surface-950/60 px-2.5 py-1 text-[11px] text-surface-300 transition-colors hover:border-brand-500/50 hover:text-white"
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {SUGGESTIONS.slice(0, 2).map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="rounded-full bg-surface-950/60 px-2.5 py-1 text-[11px] text-surface-400 transition-colors hover:bg-surface-800 hover:text-white"
              >
                {s}
              </button>
            ))}
            <button
              onClick={handleRandom}
              className="rounded-full border border-brand-500/40 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
            >
              🎲 Surprise me
            </button>
          </div>
        </div>
      )}

      {/* Voice error */}
      {voiceErrorMessage && (
        <div className="animate-slide-up border-t border-rose-500/30 bg-rose-500/10 px-4 py-2 text-[11px] leading-relaxed text-rose-300">
          ⚠️ {voiceErrorMessage}
        </div>
      )}

      {!voiceSupported && !voiceErrorMessage && (
        <div className="border-t border-surface-800 bg-surface-950/40 px-4 py-1.5 text-[10px] text-surface-600">
          💡 Voice input needs Chrome, Edge or Safari.
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 border-t border-surface-800 bg-surface-950/60 p-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={listening && interim ? interim : input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            listening
              ? '🎙 Listening…'
              : 'Ask, paste code, or type ?help'
          }
          disabled={thinking || !!streamState}
          className="flex-1 rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 text-sm text-white placeholder:text-surface-700 outline-none transition-colors focus:border-brand-500/50 disabled:opacity-50"
        />

        {voiceSupported && (
          <button
            type="button"
            onClick={handleVoiceClick}
            disabled={thinking || !!streamState}
            title={listening ? 'Stop listening' : 'Speak your question (voice)'}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
              listening
                ? 'bg-rose-500 text-white shadow-glow'
                : 'border border-surface-700 text-surface-500 hover:border-brand-500/50 hover:text-brand-400'
            } disabled:opacity-40`}
          >
            {listening ? (
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
            ) : (
              '🎙'
            )}
          </button>
        )}

        <button
          type="submit"
          disabled={!input.trim() || thinking || !!streamState}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-amber-500 text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          aria-label="Send"
        >
          ➤
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Message Bubble
   ═══════════════════════════════════════════ */
function MessageBubble({
  message,
  feedback,
  onFeedback,
  onRelatedClick,
  onSpeak,
  disabled,
}) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let text = message.content || '';
      if (message.code) text += `\n\n${message.code}`;
      if (message.lessonResults) {
        text += '\n\nLessons:';
        for (const l of message.lessonResults) text += `\n· ${l.title}`;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-500/15 px-3 py-2 text-sm text-white">
          <p className="whitespace-pre-line">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="w-full max-w-[92%] space-y-2">
        {message.content ? (
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200">
            {message.content}
            {message._streaming && (
              <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-brand-400 align-middle" />
            )}
          </p>
        ) : message._streaming ? (
          <p className="text-sm text-surface-600">
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500/60" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500/60 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500/60 [animation-delay:300ms]" />
            </span>
          </p>
        ) : null}

        {/* Lesson search results */}
        {message.lessonResults && !message._streaming && (
          <div className="space-y-1.5 pt-1">
            {message.lessonResults.map((r) => (
              <Link
                key={`${r.moduleId}:${r.lessonId}`}
                to={`/module/${r.moduleId}/lesson/${r.lessonId}`}
                className="block rounded-lg border border-surface-800 bg-surface-950/40 p-2.5 transition-all hover:border-brand-500/40 hover:bg-surface-950"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold text-white">
                    {r.title}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-surface-600">
                    →
                  </span>
                </div>
                {r.snippet && (
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-surface-500">
                    {r.snippet}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {message.code && !message._streaming && (
          <div className="mt-2">
            <CodeBlock code={message.code} language="python" runnable />
          </div>
        )}

        {message.lessonLink && !message._streaming && (
          <Link
            to={`/module/${message.lessonLink.moduleId}/lesson/${message.lessonLink.lessonId}`}
            className="mt-1 inline-flex items-center gap-1 rounded-md border border-brand-500/40 bg-brand-500/10 px-2 py-1 text-[11px] font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
          >
            📖 Open the full lesson →
          </Link>
        )}

        {message.related && message.related.length > 0 && !message._streaming && (
          <div className="mt-2 rounded-lg border border-surface-800 bg-surface-950/40 p-2.5">
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-surface-600">
              Related
            </div>
            <div className="space-y-1">
              {message.related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onRelatedClick(r.question)}
                  disabled={disabled}
                  className="block w-full text-left text-[12px] text-surface-400 transition-colors hover:text-brand-400 disabled:opacity-50"
                >
                  · {r.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {!message._streaming && message.content && (
          <div className="flex items-center gap-1 pt-1">
            <button
              onClick={handleCopy}
              title="Copy answer"
              className="flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] font-medium text-surface-600 transition-colors hover:bg-surface-800 hover:text-white"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>

            {onSpeak && (
              <button
                onClick={() => onSpeak(message.content)}
                title="Read aloud"
                className="flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] font-medium text-surface-600 transition-colors hover:bg-surface-800 hover:text-white"
              >
                🔊 Speak
              </button>
            )}

            <span className="mx-1 h-3 w-px bg-surface-800" />
            <button
              onClick={() => onFeedback('up')}
              title="Helpful"
              className={`flex h-6 w-6 items-center justify-center rounded-md text-[12px] transition-colors ${
                feedback === 'up'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-surface-600 hover:bg-surface-800 hover:text-white'
              }`}
            >
              👍
            </button>
            <button
              onClick={() => onFeedback('down')}
              title="Not helpful"
              className={`flex h-6 w-6 items-center justify-center rounded-md text-[12px] transition-colors ${
                feedback === 'down'
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'text-surface-600 hover:bg-surface-800 hover:text-white'
              }`}
            >
              👎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}