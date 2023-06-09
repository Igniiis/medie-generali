import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './header';
import { languageGeneration } from './language';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//Generate the website in the language of the browser
//languageGeneration();

root.render(
  <div>
    <Header />
    <App />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
