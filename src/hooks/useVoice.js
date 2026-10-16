import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════
   Voice Input — Web Speech API
   ═══════════════════════════════════════════ */
export function useVoiceInput({ onResult, onError } = {}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [interim, setInterim] = useState('');
  const [lastError, setLastError] = useState(null);

  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);

  // Keep refs up to date without re-running the main effect
  useEffect(() => {
    onResultRef.current = onResult;
    onErrorRef.current = onError;
  }, [onResult, onError]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    setSupported(true);

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-IN';
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setListening(true);
      setLastError(null);
    };
    rec.onend = () => {
      setListening(false);
      setInterim('');
    };
    rec.onerror = (e) => {
      setListening(false);
      setInterim('');
      setLastError(e.error || 'unknown');
      onErrorRef.current?.(e.error);
    };
    rec.onresult = (e) => {
      let final = '';
      let interimText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += transcript;
        else interimText += transcript;
      }
      if (interimText) setInterim(interimText);
      if (final.trim()) {
        onResultRef.current?.(final.trim());
      }
    };

    recognitionRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {
        /* ignore */
      }
    };
  }, []); // ← empty deps: create once

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    setLastError(null);
    try {
      recognitionRef.current.start();
    } catch (e) {
      // "already started" throws — ignore, but log others
      if (!String(e.message).includes('already')) {
        console.warn('[voice] start failed:', e);
        setLastError('start-failed');
      }
    }
  }, []);

  const stop = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      /* ignore */
    }
  }, []);

  return { listening, supported, interim, lastError, start, stop };
}

/* ═══════════════════════════════════════════
   Read Aloud — Speech Synthesis
   ═══════════════════════════════════════════ */
export function useReadAloud() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    setSupported(true);
    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.0;
      u.pitch = 1.0;
      u.lang = 'en-IN';
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore */
    }
  }, []);

  const stop = useCallback(() => {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking, supported };
}