import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

interface OpenLinkProps {
  url: string;
}

function OpenLink({ url }: OpenLinkProps) {
  const startUrl: string = window.location.href.split('?page')[0];
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(startUrl + url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    },1000); // Reset the copied state after 1 seconds 
  };

  return (
    <div>
      <div className="linkContainer">
        <a href={url} target="_blank" className="linkButton" type="submit">Open calculator</a>
      </div>
      <div className="copyContainer">
        <input id="copyShowing" type="text" value={startUrl + url} readOnly />
        <div className="copy-button" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={isCopied?faClipboardCheck:faCopy} />
        </div>
      </div>
    </div>
  );
}

export default OpenLink;
