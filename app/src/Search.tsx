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
          Note : you can use your copied link directly onto your browser to open the same window.
        </p>
      </div>

      <button type="submit" style={inputStyle}>Submit</button>
    </form>
  );
};

export default Search;
