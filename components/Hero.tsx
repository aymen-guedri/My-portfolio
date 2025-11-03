import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import headerImg from "./aymen.png";
import "animate.css";
import styles from "./Hero.module.css";

const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const toRotate = ["a Full stack Developer", "a Designer", "an Entrepreneur"];
  const typingDelay = 100;
  const deletingDelay = 50;
  const pauseDelay = 1500;
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    let ticker = setTimeout(
      () => {
        tick();
      },
      isDeleting ? deletingDelay : typingDelay
    );

    return () => {
      clearTimeout(ticker);
    };
  }, [text, isDeleting]);

  useEffect(() => {
    setImageVisible(true);
  }, []);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];

    if (isDeleting) {
      setText((prevText) => prevText.slice(0, -1));
    } else {
      setText((prevText) => fullText.slice(0, prevText.length + 1));
    }

    if (!isDeleting && text === fullText) {
      setTimeout(() => {
        setIsDeleting(true);
      }, pauseDelay);
    } else if (isDeleting && text === "") {
      setTimeout(() => {
        setIsDeleting(false);
        setLoopNum((prevLoopNum) => prevLoopNum + 1);
      }, pauseDelay);
    }
  };

  return (
    <div className="pb-20 pt-36 relative">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center relative my-20 z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-start justify-center flex-1 space-y-6">
          <TextGenerateEffect
            words="Hi, it's me 👋 Aymen Guedri"
            className="text-left text-lg md:text-5xl lg:text-6xl"
          />
          <h1 className="text-left text-lg md:text-5xl lg:text-4xl">
            <TextGenerateEffect
              words="and I'm"
              className="text-left text-lg md:text-4xl lg:text-4xl"
            />
            <TextGenerateEffect
              words="a software engineer"
              className="text-left text-lg md:text-4xl lg:text-4xl"
            />
          </h1>

          <a
            href="https://drive.google.com/file/d/1t5FOtoL4DG9BWxC5eHKQmiNXDZc2BRUA/view?usp=sharing"
            target="_blank"
          >
            <MagicButton
              title="Show my resume"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>

        <div
          className={`flex-1 flex justify-end items-center mt-10 md:mt-0 ${
            imageVisible
              ? `animate__animated animate__zoomIn ${styles.imageFloat}`
              : ""
          }`}
        >
          <Image src={headerImg} alt="Header Img" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
