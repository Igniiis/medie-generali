import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';

interface OpenLinkProps{
  url: string
}

function OpenLink({url} : OpenLinkProps){

  const startUrl:string = window.location.href.split('?page')[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(startUrl+url);
  };

  return (
    // <form action={url}>
    <div>
        <div className="linkContainer">
          <a href={url} className="linkButton" type="submit">Open calculator</a>
        </div>
        <div className="copyContainer">
          <input id="copyShowing" type="text" value={startUrl+url} readOnly />
          <div className="copy-button" onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </div>
    </div>
  );
};

export default OpenLink;