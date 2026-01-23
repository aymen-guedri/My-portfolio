"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "./styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "./hoc";
import { slideIn } from "./utils/motion";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setMessage({ text: "Please fill out all fields.", type: "error" });
      setLoading(false);
      return;
    }

    if (!validateEmail(form.email)) {
      setMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_cjltpvm",
        "template_8iwe221",
        {
          from_name: form.name,
          to_name: "Aymen Guedri",
          from_email: form.email,
          to_email: "aymenguedri01@gmail.com",
          message: form.message,
        },
        "JhHD_fnBE7sejB7Zm"
      );
      setLoading(false);
      setMessage({
        text: "Thank you. I will get back to you as soon as possible.",
        type: "success",
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
      setMessage({
        text: "Ahh, something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <footer className="w-full pt-20 pb-10" id="contact" key={i18n.language}>
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          {t('contact.title')}
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          {t('contact.subtitle')}
        </p>
      </div>
      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl w-full"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">{t('contact.name')}</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('contact.namePlaceholder')}
                className="bg-tertiary py-4 px-3 text-white rounded-lg outline-none border-none font-medium custom-placeholder"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">{t('contact.email')}</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('contact.emailPlaceholder')}
                className="bg-tertiary py-4 px-3 text-white rounded-lg outline-none border-none font-medium custom-placeholder"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">{t('contact.message')}</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.messagePlaceholder')}
                className="bg-tertiary py-4 px-3 text-white rounded-lg outline-none border-none font-medium custom-placeholder"
                required
              />
            </label>

            <MagicButton
              title={t('contact.submit')}
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="!bg-transparent"
            />
          </form>
          {message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {message.text}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          {t('footer.copyright')}
        </p>

        <p className="md:text-base text-sm md:font-normal font-light">
          {t('footer.madeWith')}
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
