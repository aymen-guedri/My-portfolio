"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { getTranslatedData } from "@/data/translatedData";
import { PinContainer } from "./ui/Pin";
import { useTranslation } from "react-i18next";
import {
  FaReact,
  FaNodeJs,
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
  SiWordpress,
  SiPhp,
  SiFigma,
  SiIonic,
  SiFirebase,
  SiStripe,
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
  "/wordpress.svg": <SiWordpress />,
  "/php.svg": <SiPhp />,
  "/figma.svg": <SiFigma />,
  "/ionic.svg": <SiIonic />,
  "/firebase.svg": <SiFirebase />,
  "/stripe.svg": <SiStripe />,
};

const RecentProjectsMobile = () => {
  const { t, i18n } = useTranslation();
  const translatedData = getTranslatedData(i18n.language);
  
  const mergedProjects = projects.map((proj, index) => ({
    ...proj,
    ...translatedData.projects[index]
  }));

  return (
    <div className="py-20" key={i18n.language}>
      <h1 className="heading">
        {t('projects.title')}{" "}
        <span className="text-purple">{t('projects.recent')}</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {mergedProjects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title={item.title}
              href={item.link}
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                {item.isProduction && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm border border-purple-500/50 text-purple-300 text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-xl">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    LIVE
                  </div>
                )}
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full ${item.img === '/bringzz.png' || item.img === '/ionic.png' ? 'object-contain' : 'object-cover'}`}
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              {item.company && (
                <p className="text-xs text-purple-400 font-semibold mt-1">By {item.company}</p>
              )}

              <p className="sm:text-sm md:text-sm text-xs font-light text-gray-400">
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center space-x-2">
                  {item.iconLists.map((icon: string, index: number) => (
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
                      {t('projects.checkDetails')}
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

export default RecentProjectsMobile;
