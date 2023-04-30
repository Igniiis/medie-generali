import React, { useState } from "react";
import '../src/css/buttons.css';
import OpenLink from "./OpenLink";


interface FormValues {
  [key: string]: {
    matter: string;
    coefficient: string;
  };
}

const Form = () => {

  //for the css button color
  const [showButtons, setShowButtons] = useState(false);

  const [url,setUrlLoad] = useState('');

  const [values, setValues] = useState<FormValues>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //for the value of the differents matters
    const { name, value, dataset } = event.target;
    const index = dataset.index!;
    const newValue = {
      ...values[index],
      [name]: value
    };
    setValues({ ...values, [index]: newValue });

    //for the color of the generate button
    //TODO
  };

  //when you submit the code :
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEmpty = Object.values(values).every(
      (value) => !value.matter && !value.coefficient
    );

    //preparation of the url :
    if(Object.keys(values).length === 0 || isEmpty){
      // We do nothing
      console.log('no matters declared');
    }else{
      let url = '';
      let t = false;
      Object.keys(values).map((index) => {
        if(t){
          url+= ',';
        }else{
          t=true;
        }
        console.log(index);
        url += values[index].matter+":"+values[index].coefficient.replace(',','!').replace('.','!');
      });
      const currentUrl = window.location.href;

      url = '?page=calculator&subjects=' + url;

      setUrlLoad(url);

      setShowButtons(true);
    }
  };

  const addNewPair = () => {
    const index = Object.keys(values).length;
    setValues({
      ...values,
      [index]: {
        matter: "",
        coefficient: ""
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(values).map((index) => {
        return (
          <div key={index}>
            <label htmlFor={`matter_${index}`}>Matter:</label>
            <input
              type="text"
              id={`matter_${index}`}
              name="matter"
              data-index={index}
              value={values[index] ? values[index].matter : ''}
              onChange={handleInputChange}
            required />
            <label htmlFor={`coefficient_${index}`}>Coefficient:</label>
            <input
              type="number"
              id={`coefficient_${index}`}
              name="coefficient"
              data-index={index}
              value={values[index] ? values[index].coefficient : ''}
              onChange={handleInputChange}
            required />
          </div>
        );
      })}
      <div>
        <button type="button" id="addButton" onClick={addNewPair}>Add Matter</button>
        <button type="submit" >Generate</button>
      </div>

      <div>
        {showButtons ? (
          <OpenLink url={url} />
        ) : (
          null
        )}
      </div>
    </form>
  );
};

export default Form;
