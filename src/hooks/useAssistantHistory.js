import { useEffect, useState } from 'react';

const HISTORY_KEY = 'pymastery-assistant-history';
const FEEDBACK_KEY = 'pymastery-assistant-feedback';
const OPENED_KEY = 'pymastery-assistant-opened';
const MAX_MESSAGES = 50;

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export function useAssistantHistory(defaultMessage) {
  const [messages, setMessages] = useState(() => {
    const stored = loadJSON(HISTORY_KEY, null);
    if (Array.isArray(stored) && stored.length > 0) return stored;
    return [defaultMessage];
  });

  useEffect(() => {
    saveJSON(HISTORY_KEY, messages.slice(-MAX_MESSAGES));
  }, [messages]);

  const clear = () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
    setMessages([defaultMessage]);
  };

  return { messages, setMessages, clear };
}

export function useAssistantFeedback() {
  const [feedback, setFeedbackState] = useState(() =>
    loadJSON(FEEDBACK_KEY, {})
  );

  const setFeedback = (messageId, value) => {
    setFeedbackState((prev) => {
      const next = { ...prev };
      if (next[messageId] === value) {
        delete next[messageId]; // toggle off
      } else {
        next[messageId] = value;
      }
      saveJSON(FEEDBACK_KEY, next);
      return next;
    });
  };

  return { feedback, setFeedback };
}

export function useAssistantOpened() {
  const [opened, setOpened] = useState(() => {
    try {
      return localStorage.getItem(OPENED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const markOpened = () => {
    try {
      localStorage.setItem(OPENED_KEY, 'true');
    } catch {
      /* ignore */
    }
    setOpened(true);
  };

  return { opened, markOpened };
}