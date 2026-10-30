import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import { AnimatePresence } from 'framer-motion';
import { VideoCanvas, VideoPausedContext, type VideoAspectRatio, useVideoPlayer } from '@/lib/video';
import { OpenerScene, AboutScene, OverviewScene, ScheduleScene, ExtractScene, CvScene, ApplicationsScene, CelebrateScene, OutroScene } from './scenes';

// Durations sized to the Arabic voiceover (vo_*.mp3 + 300 ms lead + tail); audio is composite_audio.mp3.
export const SCENE_DURATIONS = {
  opener: 7200,
  about: 13800,
  overview: 10000,
  schedule: 7600,
  extract: 12000,
  cv: 7200,
  applications: 7600,
  celebrate: 6200,
  outro: 4600,
};

const SCENE_COMPONENTS: Record<string, ComponentType> = {
  opener: OpenerScene,
  about: AboutScene,
  overview: OverviewScene,
  schedule: ScheduleScene,
  extract: ExtractScene,
  cv: CvScene,
  applications: ApplicationsScene,
  celebrate: CelebrateScene,
  outro: OutroScene,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let ms = 0;
  for (const [key, d] of Object.entries(SCENE_DURATIONS)) { out[key] = ms / 1000; ms += d; }
  return out;
})();

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';
const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  useEffect(() => { onSceneChange?.(currentSceneKey); }, [currentSceneKey, onSceneChange]);
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 1;
    if (paused) { audio.pause(); return; }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const target = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - target) > AUDIO_SEEK_EPSILON_SEC) audio.currentTime = target;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted, paused]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <AnimatePresence>
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>
        <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/composite_audio.mp3`} preload="auto" autoPlay muted={muted} />
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
