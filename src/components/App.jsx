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
    <div className="hgroup">
      {/* <h1>{name}</h1> */}
      {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Itaque reiciendis impedit atque. Esse culpa officia at quas, neque dolor eos!
        </p> */}
    </div>
    <Translator />
  </div>
);

export default App;
