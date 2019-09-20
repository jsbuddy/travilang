import React from 'react';
import { IoMdPlanet } from 'react-icons/io';
import Translator from './Translator/Translator';

const App = () => (
  <div className="container">
    <div className="logo-wrap">
      <div className="logo">
        <IoMdPlanet />
      </div>
    </div>
    <Translator />
    <footer>
      <a href="https://judecodes.netlify.com" target="_blank" rel="noopener noreferrer">Judecodes</a>
    </footer>
  </div>
);

export default App;
