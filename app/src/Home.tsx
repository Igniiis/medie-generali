

import React from "react";
import '../src/css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


const Home = () => {

  return (
    <div className="homeDiv">
        <h1 >Welcome to medie generali</h1>
        
        <div className="desc">
          <p>
            This website was made by a simple student who wants to help people who need to find out their average grade.
          <br/>
          <br/>
          You can either create yourself a generator of average grade where you will choose yourself the differents matters and their coefficents. 
          <br/>Or you can use a link someone gave you with already everything setup, and so you'll just have to put your grades and find out your average.
          </p>
        </div>

        <div className="socials">
          <a href="https://twitter.com/ignisfr" target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/maxencequi" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/in/maxence-malleret1/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/Igniiis" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
    </div>
  );
};

export default Home;