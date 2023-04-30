import React from 'react';
import '../src/css/header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><a href='./?page=home'>Home</a></li>
          <li><a href="./?page=generator">Create a grade calculator</a></li>
          <li><a href="./?page=search">Open a grade</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
