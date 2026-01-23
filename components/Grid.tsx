"use client";

import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { useTranslation } from "react-i18next";

const Grid = () => {
  const { t, i18n } = useTranslation();
  
  const translatedGridItems = gridItems.map(item => {
    if (item.id === 1) return { ...item, title: t('about.name') };
    if (item.id === 2) return { ...item, title: t('about.title') };
    if (item.id === 3) return { ...item, description: t('about.description') };
    if (item.id === 4) return { ...item, title: t('about.techEnthusiast') };
    if (item.id === 5) return { ...item, title: t('about.techCore') };
    if (item.id === 6) return { ...item, title: t('about.startProject') };
    return item;
  });
  return (
    <section id="about" key={i18n.language}>
      <BentoGrid className="w-full py-20">
        {translatedGridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            // remove icon prop
            // remove original classname condition
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
