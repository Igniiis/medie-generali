

import React, { useState } from "react";
import '../src/css/home.css';

const Home = () => {

  //when you submit the code :
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
  };


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
    </div>
  );
};

export default Home;