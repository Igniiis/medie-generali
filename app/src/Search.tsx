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
          <a href="http://localhost:3000/?page=calculator&subjects=Math:4,English:3,Science:3,History:2,Art:2&groups=engineer:Math!Science~3,human%20sciences:English!History!Art~2">link</a>
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
