"use client";

import React from "react";
import { workExperience, volunteeringExperience } from "@/data";
import { getTranslatedData } from "@/data/translatedData";
import { Button } from "./ui/MovingBorders";
import { useTranslation } from "react-i18next";
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
  "Educational platforms": <FaChalkboardTeacher />,
  "Community building": <FaBusinessTime />,
  "Student engagement": <FaBrain />,
  FireBase: <FaDatabase />,
  DevOps: <FaBusinessTime />,
  IQ: <FaBrain />,
  Ambassador: <FaChalkboardTeacher />,
  Android: <FaReact />,
  Arduino: <FaMicrochip />,
};

const Experience = () => {
  const { t, i18n } = useTranslation();
  const translatedData = getTranslatedData(i18n.language);
  
  const mergedWorkExperience = workExperience.map((exp, index: number) => ({
    ...exp,
    ...translatedData.workExperience[index]
  }));
  
  const mergedVolunteeringExperience = volunteeringExperience.map((exp, index: number) => ({
    ...exp,
    ...translatedData.volunteeringExperience[index]
  }));
  
  return (
    <div className="py-20 w-full" id="experience" key={i18n.language}>
      <h1 className="heading">
        {t('experience.work')}
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {mergedWorkExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
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
                  {card.desc.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="flex mt-3 space-x-2 flex-wrap">
                  {card.skills.map((skill: string, index: number) => (
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

      <h1 className="heading mt-20">
        {t('experience.volunteering')}
      </h1>
      <div className="w-full mt-12 flex flex-col items-center gap-10">
        {mergedVolunteeringExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="w-full max-w-4xl text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16 rounded-full"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-sm text-gray-500 mt-1">
                  {card.duration}
                </p>
                <ul className="text-start text-white-100 mt-3 font-semibold list-disc list-inside">
                  {card.desc.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="flex mt-3 space-x-2 flex-wrap">
                  {card.skills.map((skill: string, index: number) => (
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
