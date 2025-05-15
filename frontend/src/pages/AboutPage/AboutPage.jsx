import React from "react";
import { StyledH1, AboutContainer, LinkedinLink } from "./AboutPage.js";

export default function AboutPage() {
  return (
    <>
      <AboutContainer>
        <div>find us on Linkedin</div>
        <LinkedinLink
          href="https://www.linkedin.com/in/karolina-kulas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          karo <i className="bx bxl-linkedin"></i>
        </LinkedinLink>

        <LinkedinLink
          href="https://www.linkedin.com/in/mateusz-markiewicz-4684a82b5/"
          target="_blank"
          rel="noopener noreferrer"
        >
          matiM <i className="bx bxl-linkedin"></i>
        </LinkedinLink>

        <LinkedinLink
          href="https://www.linkedin.com/in/mateusz-j%C4%99drkowiak-7094802b2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          matiJ <i className="bx bxl-linkedin"></i>
        </LinkedinLink>
      </AboutContainer>
    </>
  );
}
