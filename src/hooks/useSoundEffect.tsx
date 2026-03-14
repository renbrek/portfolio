import { useEffect, useRef } from "react";

interface PlayOptions {
  /**
   * Called when the sound playback ends.
   */
  onended: () => void;
}

export const useSoundEffect = (src: string) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const ctx = new AudioContext();

    const loadSoundEffect = async () => {
      try {
        const res = await fetch(src);
        const audioData = await res.arrayBuffer();
        const buffer = await ctx.decodeAudioData(audioData);

        bufferRef.current = buffer;
      } catch (e) {
        console.error("Audio loading failed", e);
      }
    };

    loadSoundEffect();

    return () => {
      ctx.close();
    };
  }, [src]);

  const play = async (options: PlayOptions) => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    const buffer = bufferRef.current;

    if (!ctx || !buffer) return;

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const oldSource = sourceRef.current;
    if (oldSource) {
      oldSource.onended = null;
      oldSource.stop();
    }

    const source = ctx.createBufferSource();
    sourceRef.current = source;

    if (!source.buffer) {
      source.buffer = buffer;
    }

    source.connect(ctx.destination);

    source.start(0);
    source.onended = options.onended;
  };

  return { play, ctxRef, bufferRef, sourceRef };
};
