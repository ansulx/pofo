"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
      After completing my education, {" "}
        <span className="font-medium"> I pursued my passion for technology and programming.
          </span>I dove into the world of software development and research, gaining 
          professional experience in Blockchain and Machine Learning.{" "}
        <span className="font-medium">I am particularly passionate about leveraging 
          technology for social good, having led key research initiatives aimed 
          at addressing agronomics and enhancing privacy and transparency in the supply 
          chain.</span></p>
          
        <p>
        <span className="italic"></span> My  <span className="underline">research interests</span> focus on 
        improving system security, maintaining the integrity of 
        technological architectures, and building efficient machine learning models. 
        My core stack
        includes{" "}
        <span className="font-medium underline">
        React, Next.js, Node.js, MongoDB, Python and PyTorch
        </span>
        , and I am also proficient in TypeScript and Prisma. I am always eager to learn 
        new technologies and expand my skill set. Currently, I am seeking a {" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      

      
        <span className="italic"> Outside of coding</span>, I enjoy playing video games
        watching movies. 
        I also enjoy{" "}
        <span className="font-medium">reading</span> and have a keen interest{" "}
        <span className="font-medium">in psycology and philosophy.</span>.
      </p>
    </motion.section>
  );
}
