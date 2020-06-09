import React from 'react';
import { Label } from 'semantic-ui-react'
import styles from './PokemonCard.module.css';

const COLOR_MAP = {
  'grass': 'green',
  'poison': 'purple',
  'fire': 'orange',
  'water': 'blue',
  'flying': 'teal',
  'bug': 'olive',
  'normal': 'grey',
  'fairy': 'pink',
  'ground': 'brown',
  'fighting': 'black',
  'electric': 'yellow',
  'psychic': 'red',
  'ice': 'violet'
}

function PokemonCard(props) {
  const types = props.types.map(type => (
    <Label className={styles.Label} key={props.name+type.type.name} color={COLOR_MAP[type.type.name]}>{type.type.name}</Label>
  ))

  return (
    <div className={styles.Card} onClick={() => props.onClick(props.id)}>
      {props.active && <Label className={styles.Ribbon} as='span' color='teal' ribbon>Selected</Label>}

      <div className={styles.ImageWrapper}>
        <img src={props.image} alt={props.name + ' image'} />
      </div>

      <div className={styles.InfoWrapper}>
        <p className={styles.Name}>{ props.name }</p>
        { types }
      </div>
    </div>
  )
}

export default PokemonCard;