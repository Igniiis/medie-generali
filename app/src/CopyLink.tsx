import React from "react";


function CopyLink(stringToCopy:string){

  const copyToClipboard = () => {
    navigator.clipboard.writeText(stringToCopy);
  };

  return (
        <button className="copyButton" onClick={copyToClipboard}>Copy the link</button>
  );
};

export default CopyLink;