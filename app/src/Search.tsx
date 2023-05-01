import React, { useState } from "react";


const Search = () => {

  const [inputValue, setInputValue] = useState('');

  //when you submit the code :
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUrl = window.location.href;

    console.log('The form action has been changed to', inputValue,currentUrl);
    
    if (inputValue) {
      window.location.href = inputValue;      
    }else{
      //TODO
    }
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const inputStyle = {
    backgroundColor: inputValue === "" ? "#615D6C" : "#80b918",
  };

  return (
    <form onSubmit={handleSubmit} action={inputValue}>
      <label htmlFor="url_input">Link of the calculator :</label>
      <input 
      type="url" 
      name="url_input"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="paste your copied url here"
      required 
      />

      <div className="notes">
        <p>
          <a href="http://localhost:3000/?page=calculator&subjects=Probabilit%C3%A9%20Avanc%C3%A9es:1,Recherche%20Op%C3%A9rationnelle:1,Interface%20Homme%20Machine:1,Conception%20de%20Syst%C3%A8mes%20d%27Information:1,Compilation:1,Complexit%C3%A9%20algorithmique:1,Stage:1,Anglais:1,CHOI%20LV2:1,MTU:1&groups=Math%C3%A9matiques:Probabilit%C3%A9%20Avanc%C3%A9es!Recherche%20Op%C3%A9rationnelle~2,Informatique%201:Interface%20Homme%20Machine!Conception%20de%20Syst%C3%A8mes%20d%27Information~3,Informatique%202:Compilation!Complexit%C3%A9%20algorithmique~3,Stage:Stage~1,Transversale:Anglais!CHOI%20LV2!MTU~1">link</a>
            (to delete)
          <br/>
          <br/>
          Note : you can use your copied link directly onto your browser to open the same window.
        </p>
      </div>

      <button type="submit" style={inputStyle}>Submit</button>
    </form>
  );
};

export default Search;
