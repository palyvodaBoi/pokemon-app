import React from 'react';
import styles from '../Pokemon/PokemonMain.module.css';

function LoadButtons(props) {
  const isPrevDisabled = !props.pokemonList.previous;
  const isNextDisabled = !props.pokemonList.next;

  return (
    <div className={styles.Buttons}>
      <button className="ui icon left labeled blue button"
              disabled={isPrevDisabled}
              onClick={() => props.onLoadOther('previous')}>
        <i aria-hidden="true" className="left arrow icon" />
        Load Prev
      </button>
      <button className="ui icon right labeled blue button"
              disabled={isNextDisabled}
              onClick={() => props.onLoadOther('next')}>
        Load Next
        <i aria-hidden="true" className="right arrow icon" />
      </button>
    </div>
  )
}

export default LoadButtons;