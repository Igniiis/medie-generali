/**
 * @author Maxence Malleret
 */

import React, { useState } from "react";
import '../src/css/App.css';

interface Group {
  name: string,
  coef: string;
  matters: Subject[];
}

interface Subject {
  name: string;
  coeff: number;
}

function GradeCalculatorWith() {
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
        return { name, coeff: cNumb };
      })
    : [];

  const groupsParam = urlParams.get('groups');
  const groups: Group[] = groupsParam
    ? groupsParam.split(",").map((param) => {

        const [name, p] = param.split(":");

        const [matters,coeff] = p.split("~");

        const tabMatters = matters.split("!");

        const filteredSubjects = subjects.filter(subject => tabMatters.includes(subject.name) );
        
        return {name:name,coef:coeff,matters:filteredSubjects};
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
    let totalGrade = 0;
    let totalCoeff = 0;
    
    groups.forEach(group => {
      const {coef, matters} = group;
      let groupCoeff = 0;
      let groupGrade = 0;

      matters.forEach(matter => {
        const mark = parseFloat(marks[matter.name]);
        groupGrade += mark*matter.coeff;
        groupCoeff += matter.coeff;
      })

      const resultGroup = groupGrade/groupCoeff;

      totalCoeff += parseFloat(coef);
      totalGrade += resultGroup*parseFloat(coef);
    })


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

      {groups.map((group) => (
        <div key={group.name}>
          <label className="groupName">{group.name} ({group.coef})</label>
          {group.matters.map((subject) => (
            <div key={subject.name}>
              <label htmlFor={subject.name} > - {subject.name} ({subject.coeff}) </label>
              <input type="number" name={subject.name} value={marks[subject.name]} onChange={handleMarkChange} />
          </div>
          ))}
        </div>
      ))}
      <button type="submit">Calculate final grade</button>
    </form>
  );
}

export default GradeCalculatorWith;