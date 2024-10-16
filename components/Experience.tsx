import React from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import {
  FaPython,
  FaNodeJs,
  FaReact,
  FaDatabase,
  FaMicrochip,
  FaBusinessTime,
  FaChalkboardTeacher,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBrain,
} from "react-icons/fa";
import {
  SiDjango,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiUml,
  SiFigma,
  SiMqtt,
} from "react-icons/si";

const skillIcons: { [key: string]: JSX.Element } = {
  django: <SiDjango />,
  restapi: <FaDatabase />,
  financial: <FaBusinessTime />,
  mongodb: <SiMongodb />,
  expressjs: <SiExpress />,
  reactjs: <FaReact />,
  nodejs: <FaNodeJs />,
  nextjs: <SiNextdotjs />,
  html: <FaHtml5 />,
  css: <FaCss3Alt />,
  javascript: <FaJs />,
  criticalthinking: <FaBrain />,
  uml: <SiUml />,
  figma: <SiFigma />,
  iot: <FaMicrochip />,
  "3d": <FaMicrochip />,
  mqtt: <SiMqtt />,
  entrepreneurship: <FaBusinessTime />,
  mentoring: <FaChalkboardTeacher />,
};

const Experience = () => {
  return (
    <div className="py-20 w-full" id="experience">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16 rounded-[10%]"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-sm text-gray-500 mt-1">
                  {card.duration}
                </p>
                <ul className="text-start text-white-100 mt-3 font-semibold list-disc list-inside">
                  {card.desc.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="flex mt-3 space-x-2 flex-wrap">
                  {card.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xl p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {skillIcons[skill as keyof typeof skillIcons]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
