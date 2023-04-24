import React, { useState } from "react";
import Form from './Form';
import GradeCalculator from "./GradeCalculator";

interface Subject {
  name: string;
  coeff: number;
}

function App() {
  // Retrieve the subjects and their coefficients from the URL
  const urlParams = new URLSearchParams(window.location.search);
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

  // If there are no subjects in the URL, render the form component
  if (subjects.length === 0) {
    return <Form />;
  }else{
    return <GradeCalculator />;
  }

  
}

export default App;
