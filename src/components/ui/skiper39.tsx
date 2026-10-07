"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Skiper 39 Canvas_Landing_004 — React + Canvas
 * Adapted from https://codepen.io/zadvorsky/pen/xxwbBQV
 * Illustration: https://www.openpeeps.com/
 * Original component: @gurvinder-singh02 / https://skiper-ui.com/
 * Free-version usage requires attribution to Skiper UI.
 * This integration retains that credit in the Crowd option's footer.
 */
interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  className?: string;
  paused?: boolean;
}

type SpriteRect = [number, number, number, number];
type Peep = {
  rect: SpriteRect;
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
};

export const CROWD_SPRITE = "/artwork/open-peeps-crowd.png";

export function CrowdCanvas({ src, rows = 15, cols = 7, className, paused = false }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playbackRef = useRef<(() => void) | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    playbackRef.current?.();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || rows < 1 || cols < 1) return;

    const image = new Image();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const crowd: Peep[] = [];
    const stage = { width: 0, height: 0, dpr: 1 };
    let disposed = false;
    let loaded = false;
    let visible = true;
    let ticking = false;
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(stage.dpr, stage.dpr);
      for (const peep of crowd) {
        ctx.save();
        ctx.translate(peep.x, peep.y);
        ctx.scale(peep.scaleX, 1);
        ctx.drawImage(image, ...peep.rect, 0, 0, peep.width, peep.height);
        ctx.restore();
      }
      ctx.restore();
    };

    const updatePlayback = () => {
      const running = loaded && visible && !document.hidden && !pausedRef.current && !motion.matches;
      for (const peep of crowd) peep.walk?.paused(!running);
      if (running && !ticking) {
        gsap.ticker.add(render);
        ticking = true;
      } else if (!running && ticking) {
        gsap.ticker.remove(render);
        ticking = false;
      }
      if (loaded) render();
    };
    playbackRef.current = updatePlayback;

    const walk = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const startX = direction === 1 ? -peep.width : stage.width + peep.width;
      const endX = direction === 1 ? stage.width + peep.width : -peep.width;
      peep.scaleX = direction;
      peep.x = startX;
      peep.y = peep.anchorY;
      peep.walk = gsap.timeline({ paused: true, onComplete: () => {
        if (disposed) return;
        peep.walk?.kill();
        walk(peep);
        updatePlayback();
      } });
      peep.walk.timeScale(randomRange(0.5, 1.5));
      peep.walk.to(peep, { duration: 16, x: endX, ease: "none" }, 0);
      peep.walk.to(peep, { duration: 0.25, repeat: 63, yoyo: true, y: peep.anchorY - 7, ease: "power1.inOut" }, 0);
    };

    const resize = () => {
      if (!loaded || disposed) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      stage.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(stage.width * stage.dpr);
      canvas.height = Math.round(stage.height * stage.dpr);
      for (const peep of crowd) peep.walk?.kill();
      crowd.length = 0;

      const spriteWidth = image.naturalWidth / rows;
      const spriteHeight = image.naturalHeight / cols;
      const width = stage.width < 600 ? 100 : 132;
      const height = width * spriteHeight / spriteWidth;
      const sprites = gsap.utils.shuffle(Array.from({ length: rows * cols }, (_, index) => index));
      const count = Math.min(sprites.length, Math.ceil(stage.width / width * 5));
      for (const index of sprites.slice(0, count)) {
        const anchorY = stage.height - height + 35 - 125 * gsap.parseEase("power2.in")(Math.random());
        const peep: Peep = {
          rect: [(index % rows) * spriteWidth, Math.floor(index / rows) * spriteHeight, spriteWidth, spriteHeight],
          width, height, x: 0, y: anchorY, anchorY, scaleX: 1, walk: null,
        };
        crowd.push(peep);
        walk(peep);
        peep.walk?.progress(randomRange(0.08, 0.92));
      }
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      updatePlayback();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    visibility.observe(canvas);
    document.addEventListener("visibilitychange", updatePlayback);
    motion.addEventListener("change", updatePlayback);
    image.onload = () => {
      if (disposed) return;
      loaded = true;
      resize();
    };
    image.src = src;

    return () => {
      disposed = true;
      image.onload = null;
      playbackRef.current = null;
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      motion.removeEventListener("change", updatePlayback);
      gsap.ticker.remove(render);
      for (const peep of crowd) peep.walk?.kill();
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className ?? "absolute bottom-0 h-[90vh] w-full"} />;
}

export function Skiper39({ children, paused = false, className = "relative h-full w-full bg-white text-black", canvasClassName }: {
  children?: ReactNode;
  paused?: boolean;
  className?: string;
  canvasClassName?: string;
}) {
  return <div className={className}>
    {children}
    <CrowdCanvas src={CROWD_SPRITE} rows={15} cols={7} paused={paused} className={canvasClassName} />
  </div>;
}

export default Skiper39;
