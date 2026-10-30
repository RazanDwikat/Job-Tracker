// Video player hook - handles scene advancement, pausing, and looping

import { createContext, useContext, useEffect, useRef, useState } from 'react';

export interface SceneDurations {
  [key: string]: number;
}

// Lets in-scene timers (useSceneTimer) freeze without threading a prop
// through every scene component.
export const VideoPausedContext = createContext(false);

export interface UseVideoPlayerOptions {
  durations: SceneDurations;
  onVideoEnd?: () => void;
  loop?: boolean;
  paused?: boolean;
}

export interface UseVideoPlayerReturn {
  currentScene: number;
  totalScenes: number;
  currentSceneKey: string;
  hasEnded: boolean;
}

export function useVideoPlayer(
  options: UseVideoPlayerOptions,
): UseVideoPlayerReturn {
  const { durations, onVideoEnd, loop = true, paused = false } = options;

  // Captured once on mount -- durations must be a static object
  const sceneKeys = useRef(Object.keys(durations)).current;
  const totalScenes = sceneKeys.length;
  const durationsArray = useRef(Object.values(durations)).current;

  const [currentScene, setCurrentScene] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  // Time left in the current scene, carried across pause/resume cycles
  const remainingMsRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused || (hasEnded && !loop)) return;

    const currentDuration =
      remainingMsRef.current ?? durationsArray[currentScene];
    const startedAt = performance.now();
    let fired = false;

    const timer = setTimeout(() => {
      fired = true;
      if (currentScene >= totalScenes - 1) {
        if (!hasEnded) {
          setHasEnded(true);
          onVideoEnd?.();
        }
        if (loop) {
          setCurrentScene(0);
        }
      } else {
        setCurrentScene((prev) => prev + 1);
      }
    }, currentDuration);

    return () => {
      clearTimeout(timer);
      // Only carry leftover time when interrupted mid-scene (pause); a scene
      // that advanced normally must not shorten the next one.
      remainingMsRef.current = fired
        ? null
        : Math.max(0, currentDuration - (performance.now() - startedAt));
    };
  }, [currentScene, totalScenes, durationsArray, hasEnded, loop, onVideoEnd, paused]);

  return {
    currentScene,
    totalScenes,
    currentSceneKey: sceneKeys[currentScene],
    hasEnded,
  };
}

export function useSceneTimer(
  events: Array<{ time: number; callback: () => void }>,
) {
  const paused = useContext(VideoPausedContext);
  const firedRef = useRef<Set<number>>(new Set());
  const callbacksRef = useRef<Array<() => void>>([]);
  const elapsedMsRef = useRef(0);

  useEffect(() => {
    callbacksRef.current = events.map((e) => e.callback);
  }, [events]);

  const scheduleKey = events.map((event, i) => `${i}:${event.time}`).join('|');

  useEffect(() => {
    firedRef.current = new Set();
    elapsedMsRef.current = 0;
  }, [scheduleKey]);

  useEffect(() => {
    if (paused) return;

    const startedAt = performance.now();
    const timers = events.map(({ time }, index) => {
      return setTimeout(
        () => {
          if (!firedRef.current.has(index)) {
            firedRef.current.add(index);
            callbacksRef.current[index]?.();
          }
        },
        Math.max(0, time - elapsedMsRef.current),
      );
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      elapsedMsRef.current += performance.now() - startedAt;
    };
  }, [scheduleKey, paused]);
}
