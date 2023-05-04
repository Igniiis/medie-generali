import React, { useState } from "react";
import '../src/css/buttons.css';
import OpenLink from "./OpenLink";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import '../src/css/form.css';

interface FormValues {
  [key: string]: {
    matter: string;
    coefficient: string;
  };
}

const FormWithout = () => {

  const [showButtons, setShowButtons] = useState(false);
  const [url,setUrlLoad] = useState('');
  const [values, setValues] = useState<FormValues>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = event.target;
    const index = dataset.index!;
    const newValue = {
      ...values[index],
      [name]: value
    };
    setValues({ ...values, [index]: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEmpty = Object.values(values).every(
      (value) => !value.matter && !value.coefficient
    );

    if(Object.keys(values).length === 0 || isEmpty){
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
    setShowButtons(false);
  };

  const removeMatter = (name: string) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value.matter !== name)
    );
    setValues(filteredValues);
    setShowButtons(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(values).map((index) => {
        return (
          <div key={index} className="wrapperMatter">
            <label htmlFor={`matter_${index}`}>Matter:</label>
            <input
              type="text"
              id={`matter_${index}`}
              name="matter"
              pattern="[^:|!?=~]*"
              data-index={index}
              value={values[index] ? values[index].matter : ''}
              onChange={handleInputChange}
              required
            />

            <label htmlFor={`coefficient_${index}`}>Coefficient:</label>
            <div className="coeff">
                <input
                type="number"
                id={`coefficient_${index}`}
                name="coefficient"
                data-index={index}
                value={values[index] ? values[index].coefficient : ''}
                onChange={handleInputChange}
                required
              />
              <div className="deleteButton" onClick={() => removeMatter(values[index].matter)}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <button type="button" className="addButton" onClick={addNewPair}>Add Matter</button>
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

export default FormWithout;
