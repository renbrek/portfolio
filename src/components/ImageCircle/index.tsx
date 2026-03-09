import s from "./ImageCircle.module.css";
import selfImage from "../../assets/images/self.jpg";
import blow from "../../assets/audio/blowing.wav";
import { useState } from "react";
import { motion } from "motion/react";
import { paths, paths2, paths3 } from "./utils";

export function ImageCircle() {
  const audio = new Audio(blow);

  const [animationMultiplier, setAnimationMultiplier] = useState(1);

  return (
    <>
      <div
        className={s.circle}
        onClick={() => {
          audio.play();
          audio.onplay = () => {
            setAnimationMultiplier(1);
          };
          audio.onended = () => {
            setAnimationMultiplier(10);
          };
        }}
      >
        <div className={s.imageWrapper}>
          <img className={s.image} src={selfImage} alt="img" />
        </div>
        <svg
          style={{ position: "absolute", zIndex: -1 }}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          width="170%"
        >
          <motion.path
            fill="#F2F4F8"
            fillOpacity={0.75}
            transform="translate(100 100)"
            d={
              "M53.6,-62.1C68.3,-51.4,78.6,-33.5,78.1,-16.7C77.6,0.2,66.4,16,55.7,29.8C44.9,43.6,34.7,55.3,21.2,61.8C7.7,68.3,-9.1,69.7,-25.5,65.6C-41.9,61.6,-57.9,52.1,-62.5,38.7C-67,25.3,-60.1,8,-55.2,-8C-50.3,-24,-47.4,-38.6,-38.6,-50.4C-29.7,-62.1,-14.9,-71.1,2.3,-73.8C19.4,-76.5,38.8,-72.9,53.6,-62.1Z"
            }
            animate={{
              d: paths,
              transition: {
                duration: 5 * animationMultiplier,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          ></motion.path>
        </svg>

        <svg
          style={{ position: "absolute", zIndex: -2 }}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          width="170%"
        >
          <motion.path
            fill="#b4b4b4"
            fillOpacity={0.75}
            transform="translate(100 100)"
            transition={{
              duration: 8 * animationMultiplier,
              repeat: Infinity,
              ease: "linear",
            }}
            animate={{
              d: paths2,
            }}
          ></motion.path>
        </svg>

        <svg
          style={{ position: "absolute", zIndex: -3 }}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          width="170%"
        >
          <motion.path
            fill="#d9d9d9"
            fillOpacity={0.75}
            transform="translate(100 100)"
            transition={{
              duration: 10 * animationMultiplier,
              repeat: Infinity,
              ease: "linear",
            }}
            animate={{
              d: paths3,
            }}
          ></motion.path>
        </svg>
      </div>
    </>
  );
}
