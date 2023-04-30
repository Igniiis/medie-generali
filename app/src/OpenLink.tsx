import React from "react";

interface OpenLinkProps{
  url: string
}

function OpenLink({url} : OpenLinkProps){

  const copyToClipboard = () => {
    let a:string = window.location.href;
    
    navigator.clipboard.writeText(a.split('?page')[0]+url);
  };

  return (
    // <form action={url}>
    <div>
        <a href={url} className="linkButton" type="submit">Open calculator</a>
        <button className="copyButton" onClick={copyToClipboard}>Copy the link</button>
    </div>
  );
};

export default OpenLink;