import React from 'react';
import styles from '../Pokemon/PokemonMain.module.css';

function Dropdown(props) {
  const options = props.options.map(option => (
    <option key={option} value={option}>{ option.charAt(0).toUpperCase() + option.slice(1) }</option>
  ))

  return (
    <div className={styles.DropdownWrapper}>
      <label htmlFor="types">Pokemon type:</label>
      <select name="types" id="types" value={props.value} onChange={props.dropdownChangeHandler}>
        { options }
      </select>
    </div>
  )
}

export default Dropdown;
