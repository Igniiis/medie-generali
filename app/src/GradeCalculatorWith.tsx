/**
 * @author Maxence Malleret
 */

import React, { useState } from "react";
import '../src/css/App.css';

interface Group {
  name: string,
  coef: number;
  matters: Subject[];
}

interface Subject {
  name: string;
  coeff: number;
}

function GradeCalculatorWith() {
  // LINK TO RESPECT
  //?page=calculator&groups=Science:math$1!5|physic$4~2,Human%20Sciences:English$2!5|Art$3~2!5

  // Retrieve the subjects and their coefficients from the URL
  const urlParams = new URLSearchParams(window.location.search);


  const groupsParam  = urlParams.get("groups");

  const groups: Group[] = groupsParam
  ? groupsParam.split(",").map((param) => {
        //here are the value we get into param :
        //Science:math(1!5)|physic(4)~2
        //Human%20Sciences:English(2!5)|Art(3)~2!5

        //we get the the name of the of the group + the subjects linked 
        const [name, subjects] = param.split(":");

        //we get the coeff of the group with the ~ separator
        const [matterString, numbCoeff] = subjects.split("~");
        
        //we create the coeff as a Float
        let coef;
        if(numbCoeff==null){
          throw new Error('$number not set');
        }
        if (numbCoeff.includes("!")) {
          coef = parseFloat(numbCoeff.replace("!", "."));
        } else {
          coef = parseFloat(numbCoeff);
        }

        //we get a tab of all the matters linked
        const tabMatterString = matterString.split("|");
        
        console.log(tabMatterString);
        

        //we create all the the Matters 
        //in a tab of Matters
        let matters:Subject[] = [];
        tabMatterString.forEach((param) => {
            //we get the values of the coeff
            //we use the "$" splitter to get coeff and matter        
            const [mattersName,mattersCoef] = param.split('$');

            let coefMatter;
            if(numbCoeff===null){
              throw new Error('$number not set');
            }
            if (mattersCoef.includes("!")) {
              coefMatter = parseFloat(mattersCoef.replace("!", "."));
            } else {
              coefMatter = parseFloat(mattersCoef);
            }

            console.log(mattersName + coefMatter);
            

            matters = [
              ...matters,
              {
                name: mattersName,
                coeff: coefMatter
              }
            ];
        })

        //we return the whole thing as a tab of group
        return {name, coef, matters};
      })
    : [];

  // Define the state for the marks of each subject
  const [marks, setMarks] = useState<{ [key: string]: string }>(() => {
    const initialMarks: { [key: string]: string } = {};
    groups.forEach(group => {
      group.matters.forEach(subject => {
        initialMarks[subject.name] = "";
      });
    });
    return initialMarks;
  });


  // Define the function to handle form submissions
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let totalCoeff = 0;
    let totalPoints = 0;
    groups.forEach((group) => {
      let groupCoeff = 0;
      let groupPoints = 0;
      group.matters.forEach((matter) => {
        if(matter.coeff!=0){
          groupCoeff += matter.coeff;
          groupPoints += parseFloat(marks[matter.name])*matter.coeff;
        }
      });
      totalCoeff += group.coef;
      totalPoints += (groupPoints / groupCoeff)*group.coef;
    });
    
    const finalGrade = totalPoints / totalCoeff;

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
