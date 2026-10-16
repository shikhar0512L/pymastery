import { useEffect, useState } from 'react';
import {
  getPyodide,
  getPyodideStatus,
  subscribePyodide,
} from '../lib/pyodide';

export function usePyodideStatus() {
  const [state, setState] = useState(getPyodideStatus());

  useEffect(() => {
    const unsub = subscribePyodide((s) => setState(s));
    return unsub;
  }, []);

  return state; // { status, message }
}

export function usePyodidePreload() {
  const state = usePyodideStatus();

  useEffect(() => {
    const { status } = getPyodideStatus();
    if (status === 'idle') {
      getPyodide().catch(() => {
        /* error handled via status */
      });
    }
  }, []);

  return state;
}