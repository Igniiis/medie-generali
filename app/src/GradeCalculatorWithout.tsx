import React, { useState } from "react";
import '../src/css/App.css';


interface Subject {
  name: string;
  coeff: number;
}

function GradeCalculatorWithout() {
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

  // Define the state for the marks of each subject
  const [marks, setMarks] = useState<{ [key: string]: string }>(
    subjects.reduce((acc, subject) => ({ ...acc, [subject.name]: "" }), {})
  );

  // Define the function to handle form submissions
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Calculate the final grade using the marks and coefficients
    const totalCoeff = subjects.reduce((acc, subject) => acc + subject.coeff, 0);
    const totalGrade = subjects.reduce((acc, subject) => {
      const mark = parseFloat(marks[subject.name]);
      const coeff = subject.coeff;

      return isNaN(mark) ? acc : acc + mark * coeff;
    }, 0);

    const finalGrade = totalGrade / totalCoeff;

    // Display the final grade
    alert(`Your final grade is ${finalGrade.toFixed(2)}`);
  };

  // Define the function to handle changes to the marks
  const handleMarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMarks({ ...marks, [name]: value });
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      {subjects.map((subject) => (
        <div key={subject.name}>
          <label htmlFor={subject.name} > {subject.name} ({subject.coeff}) </label>
            <input type="number" name={subject.name} value={marks[subject.name]} onChange={handleMarkChange} />
          
        </div>
      ))}
      <button type="submit">Calculate final grade</button>
    </form>
  );
}

export default GradeCalculatorWithout;