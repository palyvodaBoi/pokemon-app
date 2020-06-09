import React from 'react';
import PokemonMain from './Pokemon/PokemonMain';
import styles from './App.module.css';

function App() {
  return (
    <React.Fragment>
      <div className={styles.Header}>Pokedex</div>
      <div className={styles.Content}>
        <PokemonMain />
      </div>
    </React.Fragment>
  );
}

export default App;
