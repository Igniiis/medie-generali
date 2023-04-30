

import React, { useState } from "react";


const Error = () => {

  //when you submit the code :
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
  };


  return (
    <div>
        ERREUR 404 : Page introuvable
    </div>
  );
};

export default Error;
