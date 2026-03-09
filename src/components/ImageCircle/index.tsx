import s from "./ImageCircle.module.css";
import selfImage from "../../assets/images/self.jpg";
import blow from "../../assets/audio/blowing.wav";
import { useEffect, useRef } from "react";
import { motion, useAnimate } from "motion/react";
import { paths, paths2, paths3 } from "./utils";

export function ImageCircle() {
  const audio = useRef(new Audio(blow)).current;

  const [scope, animate] = useAnimate();
  const controls = useRef<ReturnType<typeof animate>[]>([]);

  useEffect(() => {
    const configs = [
      { selector: ".p1", d: paths, duration: 5 },
      { selector: ".p2", d: paths2, duration: 8 },
      { selector: ".p3", d: paths3, duration: 10 },
    ];

    controls.current = configs.map(({ selector, d, duration }) =>
      animate(selector, { d }, { duration, ease: "linear", repeat: Infinity }),
    );
  }, [animate]);

  const setSpeed = (speed: number) => {
    controls.current.forEach((c) => (c.speed = speed));
  };

  return (
    <div ref={scope} className={s.circle}>
      <div
        className={s.imageWrapper}
        onClick={() => {
          audio.currentTime = 0;
          audio.play();

          audio.onplay = () => setSpeed(10);
          audio.onended = () => setSpeed(1);
        }}
      >
        <img className={s.image} src={selfImage} alt="img" />
      </div>

      <svg
        style={{ position: "absolute", zIndex: -1 }}
        viewBox="0 0 200 200"
        width="170%"
      >
        <motion.path
          className="p1"
          fill="#F2F4F8"
          fillOpacity={0.75}
          transform="translate(100 100)"
        />
      </svg>

      <svg
        style={{ position: "absolute", zIndex: -2 }}
        viewBox="0 0 200 200"
        width="170%"
      >
        <motion.path
          className="p2"
          fill="#b4b4b4"
          fillOpacity={0.75}
          transform="translate(100 100)"
        />
      </svg>

      <svg
        style={{ position: "absolute", zIndex: -3 }}
        viewBox="0 0 200 200"
        width="170%"
      >
        <motion.path
          className="p3"
          fill="#d9d9d9"
          fillOpacity={0.75}
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}
