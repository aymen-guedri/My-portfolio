"use client";

import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import RecentProjectsMobile from "./RecentProjectsMobile";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaMicrochip,
  FaYoutube,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiThreedotjs,
  SiMongodb,
  SiArduino,
  SiRaspberrypi,
  SiMqtt,
} from "react-icons/si";

const techIcons: { [key: string]: JSX.Element } = {
  "/re.svg": <FaReact />,
  "/tail.svg": <SiTailwindcss />,
  "/ts.svg": <SiTypescript />,
  "/three.svg": <SiThreedotjs />,
  "/mongo.png": <SiMongodb />,
  "/node.png": <FaNodeJs />,
  "/arduino.png": <SiArduino />,
  "/iot.png": <FaMicrochip />,
  "/mqtt.png": <SiMqtt />,
  "/rasberry.png": <SiRaspberrypi />,
  "/Youtube_logo.png": <FaYoutube />,
};

const RecentProjects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <RecentProjectsMobile />
  ) : (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full py-20 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex flex-col justify-between"
            key={item.id}
          >
            <PinContainer title={item.title} href={item.link}>
              <div className="relative flex items-center justify-center sm:w-80 w-full overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img
                    src="/bg.png"
                    alt="bgimg"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <h1 className="font-bold lg:text-xl md:text-lg text-base line-clamp-1">
                {item.title}
              </h1>

              <p className="sm:text-sm md:text-sm text-xs font-light text-gray-400">
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center space-x-2">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    >
                      {icon === "/unity.jpg" ? (
                        <img src={icon} alt={`icon${index}`} className="p-2" />
                      ) : (
                        techIcons[icon as keyof typeof techIcons]
                      )}
                    </div>
                  ))}
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center"
                  >
                    <p className="sm:text-sm md:text-sm text-xs font-light text-purple">
                      Check details
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </a>
                )}
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
