import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Renders a string with:
 *   - inline math: $...$
 *   - display math: $$...$$
 *   - **bold**, *italic*, `code`
 *
 * Everything else is plain text.
 */
export default function MathText({ children, className = '' }) {
  const nodes = useMemo(() => parseMath(children), [children]);
  return <span className={className}>{nodes}</span>;
}

function parseMath(text) {
  if (text === null || text === undefined) return [];
  const str = String(text);
  if (!str.includes('$')) return parseMarkdown(str, 'p');

  const parts = [];
  let i = 0;
  let key = 0;

  while (i < str.length) {
    const nextDollar = str.indexOf('$', i);
    if (nextDollar === -1) {
      parts.push(...parseMarkdown(str.slice(i), `t${key++}`));
      break;
    }
    if (nextDollar > i) {
      parts.push(...parseMarkdown(str.slice(i, nextDollar), `t${key++}`));
    }

    const isBlock = str[nextDollar + 1] === '$';
    const open = isBlock ? '$$' : '$';
    const closeIdx = str.indexOf(open, nextDollar + open.length);

    if (closeIdx === -1) {
      parts.push(...parseMarkdown(str.slice(nextDollar), `t${key++}`));
      break;
    }

    const latex = str.slice(nextDollar + open.length, closeIdx);

    try {
      const html = katex.renderToString(latex, {
        throwOnError: false,
        displayMode: isBlock,
        output: 'html',
        strict: false,
      });
      parts.push(
        <span
          key={`k${key++}`}
          dangerouslySetInnerHTML={{ __html: html }}
          className={isBlock ? 'my-3 block text-center' : 'inline-block align-middle'}
        />
      );
    } catch {
      parts.push(str.slice(nextDollar, closeIdx + open.length));
    }

    i = closeIdx + open.length;
  }

  return parts;
}

/**
 * Mini markdown parser — handles **bold**, *italic*, `code`.
 * Runs on non-math text segments only.
 */
function parseMarkdown(text, keyPrefix) {
  if (!text) return [];
  const re = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g;
  const parts = [];
  let lastIdx = 0;
  let m;
  let i = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) {
      parts.push(text.slice(lastIdx, m.index));
    }
    const token = m[0];
    if (token.startsWith('**')) {
      parts.push(
        <strong key={`${keyPrefix}-b${i++}`} className="font-semibold text-slate-100">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`')) {
      parts.push(
        <code
          key={`${keyPrefix}-c${i++}`}
          className="rounded bg-surface-800 px-1.5 py-0.5 font-mono text-[0.9em] text-amber-300"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*')) {
      parts.push(
        <em key={`${keyPrefix}-i${i++}`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIdx = re.lastIndex;
  }

  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}