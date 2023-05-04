import React from 'react';
import '../src/css/header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul className='topList'>
          <li className='topLine'><a href='./?page=home'>Home</a></li>
          
          <div className='show'>
            <li className='topLine'><a id="generator" href='./?page=generator!without'>Create a grade calculator</a></li>
            <ul className='list-categories'>
                <li><a href="./?page=generator!with">with groups</a></li>
                <li><a href="./?page=generator!without">without groups</a></li>
            </ul>
          </div>
          <li className='topLine'><a href="./?page=search">Open a grade</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
