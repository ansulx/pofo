import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Web Developer Intern",
    location: "InternPe, Roorkee",
    description:
      "I worked as a full stack developer in my period of time. I also upskilled to the by learning the advanced Deployment Tools.",
    icon: React.createElement(LuGraduationCap),
    date: "September 2023",
  },
  {
    title: "Machine Learning Intern",
    location: "Prodigy Infotech, Roorkee",
    description:
      "Gained understanding of malware detection and file clustering, and established project scope. Identified and aggregated data from multiple sources, including MySQL databases.",
    icon: React.createElement(CgWorkAlt),
    date: "April 2024 - May 2024",
  },
  {
    title: "Artificial Intelligence Intern",
    location: "IHub IIT Mandi",
    description:
      "I'm now a AI Intern working mainly in Data Analysis and Machine Learning. My stack includes Python and PyTorch, SQL, React and Typescript. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "August 2024 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Finanseer",
    description:
      "Finance Dashboard App for the ease of the data analysis to the user and the accessibility of the data.",
    tags: ["React", "TypeScript", "Node", "MongoDB", "Tailwind", "Prisma", "AWS"],
    imageUrl: corpcommentImg,
  },
  {
    title: "Project Management Tool",
    description:
      "Project Management Tool for the ease of the project management and the productivity of the user.",
    tags: ["Cognito", "TypeScript", "Next.js", "Tailwind", "EC2", "Node", "RDS", "Postgres"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Potato-Disease Detection",
    description:
      "Potato Disease Detection Platform for the farmers to check if the yield is going in the right direction.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Tensorflow", "FastAPI", "TF Serve"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Github/Gitlab",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apache & Kafka",
  "Express",
  "Prisma ORM",
  "PostgreSQL",
  "Redis",
  "WebRTC",
  "Python",
  "PyTorch",
  "Scikit-learn",
  "Tableau",
  "Academic Writing",
  "Docker & Kubernetes",
  "AWS(EC2, S3, Lambda, Sagemaker)",
  "CI/CD with Jenkins",
  "ETL Processes",
  "Microservices",
  "RESTful API",
  "Websocket",
] as const;
