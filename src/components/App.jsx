import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const App = ({ title }) => {
  const [name, setName] = useState(title);

  useEffect(() => {
    setName(`${title} ✈`);
  }, [title]);

  return (
    <div className="container">
      <div className="hgroup">
        <h1>{name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Itaque reiciendis impedit atque. Esse culpa officia at quas, neque dolor eos!
        </p>
      </div>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
