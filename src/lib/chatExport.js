// 📤 Export the assistant conversation as a .txt file.

export function exportConversation(messages) {
  const now = new Date();
  const header = [
    'PyMastery Assistant — Conversation Export',
    `Saved: ${now.toLocaleString()}`,
    `Messages: ${messages.length}`,
    '─'.repeat(48),
    '',
  ].join('\n');

  const body = messages
    .map((m) => {
      const role = m.role === 'user' ? 'YOU' : 'PYMASTERY';
      let content = m.content || '';

      if (m.code) {
        content += `\n\n\`\`\`python\n${m.code}\n\`\`\``;
      }

      if (m.lessonLink) {
        content += `\n→ Lesson: /module/${m.lessonLink.moduleId}/lesson/${m.lessonLink.lessonId}`;
      }

      if (m.lessonResults && m.lessonResults.length > 0) {
        content += '\n\nLessons found:';
        for (const l of m.lessonResults) {
          content += `\n  · ${l.title} → /module/${l.moduleId}/lesson/${l.lessonId}`;
        }
      }

      return `[${role}]\n${content}`;
    })
    .join('\n\n' + '─'.repeat(48) + '\n\n');

  const text = header + body + '\n';

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pymastery-chat-${now.toISOString().slice(0, 19).replace(/[:T]/g, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}