"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { getErrorMessage } from "@/lib/utils"; // Import the getErrorMessage function

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  if (!experiencesData) {
    return (
      <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
        <SectionHeading>My experience</SectionHeading>
        <p>Error: Unable to fetch experience data.</p>
      </section>
    );
  }

  try {
    return (
      <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
        <SectionHeading>My experience</SectionHeading>
        <VerticalTimeline lineColor="">
          {experiencesData.map((item, index) => (
            <React.Fragment key={index}>
              <VerticalTimelineElement
                contentStyle={{
                  background:
                    theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                  boxShadow: "none",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  textAlign: "left",
                  padding: "1.3rem 2rem",
                }}
              >
                {/* Your timeline element content here */}
              </VerticalTimelineElement>
            </React.Fragment>
          ))}
        </VerticalTimeline>
      </section>
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return (
      <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
        <SectionHeading>My experience</SectionHeading>
        <p>Error: {errorMessage}</p>
      </section>
    );
  }
}