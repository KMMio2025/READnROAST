import React from "react";
import { StyledH1, AboutContainer, LinkedinLink } from "./AboutPage.js";
import risencoffee from "../../assets/rise&coffee.png";
export default function AboutPage() {
  return (
    <>
      <AboutContainer>
        <div>find us on Linkedin</div>
        <img src={risencoffee} alt="Rise and coffee" style={{ width: "100px", marginTop: "20px" }} />
                
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

      </AboutContainer>
    </>
  );
}
