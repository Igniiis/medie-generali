import React, { useState } from "react";
import Form from './Form';
import GradeCalculator from "./GradeCalculator";
import Header from "./header";
import Error from "./Error";
import Home from "./Home";
import Search from "./Search";

interface Subject {
  name: string;
  coeff: number;
}

function App() {
  // Retrieve the subjects and their coefficients from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const PageParam = urlParams.get('page');
  const subjectsParam = urlParams.get("subjects");
  const subjects: Subject[] = subjectsParam
    ? subjectsParam.split(",").map((param) => {
        const [name, coeff] = param.split(":");
        let cNumb: number;
        if (coeff.includes("!")) {
          cNumb = parseFloat(coeff.replace("!", "."));
        } else {
          cNumb = parseInt(coeff);
        }
        console.log(cNumb);
        return { name, coeff: cNumb };
      })
    : [];

  // // If there are no subjects in the URL, render the form component
  // if (subjects.length === 0) {
  //   return <Form />;
  // }

  

  switch (PageParam) {
    case 'home':
      return <Home />;
    case 'generator':
      return <Form />
    case 'calculator':
      return <GradeCalculator />;
      case 'search':
        return <Search />;
    default:
      console.log('pd');
      
      return <Error />;
  }

  
}

export default App;
