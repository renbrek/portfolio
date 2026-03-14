import { useEffect, useRef } from "react";

export const useSoundEffect = (src: string) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

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

  return { ctxRef, bufferRef, sourceRef };
};
