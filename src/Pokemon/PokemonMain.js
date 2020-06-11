import React from 'react';
import axios from 'axios'
import { Loader } from 'semantic-ui-react'
import PokemonCard from './PokemonCard';
import PokemonDetails from './PokemonDetails';
import LoadButtons from '../Components/LoadButtons';
import Dropdown from '../Components/Dropdown';
import styles from './PokemonMain.module.css';

const { useState, useEffect } = React;

function PokemonMain() {
  let [loadingInfo, setLoadingInfo] = useState('App Loading...'),
      [pokemonList, setPokemonList] = useState(''),
      [pokemonData, setPokemonData] = useState(''),
      [dropdownData, setDropdownData] = useState(null),
      [dropdownValue, setDropdownValue] = useState('all'),
      [activeCardID, setActiveCardID] = useState(null);

  const fetchPokemonData = async(url) => {
    setLoadingInfo('Loading pokemons...');

    try {
      const pokemonListResponse = await axios.get(url);
      pokemonListResponse.data.results.forEach(item => item.id = item.url.split('/').slice(-2, -1)[0]);
      setPokemonList(pokemonListResponse.data);

      setLoadingInfo('Loading pokemons info...');
      const pokemonInfoArray = pokemonListResponse.data.results
        .map(item => axios.get(`https://pokeapi.co/api/v2/pokemon/${item.id}`));
      const pokemonInfoResponse = await Promise.all(pokemonInfoArray)
        .then(responses => responses.map(response => response.data));
      const dropdownTypes = ['all', ...new Set(pokemonInfoResponse
        .map(pokemon => pokemon.types.map(type => type.type.name)).flat(1))];
      setPokemonData(pokemonInfoResponse);
      setDropdownData(dropdownTypes);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData('https://pokeapi.co/api/v2/pokemon?limit=12').finally(() => setLoadingInfo(''));
  }, []);

  const onLoadOtherHandler = (direction) => {
    fetchPokemonData(pokemonList[direction]).finally(() => setLoadingInfo(''));
    setDropdownValue('all');
    setActiveCardID(null);
  }

  const onShowInfoHandler = (pokemonID) => {
    setActiveCardID(pokemonID);
  }

  const pokemonListGenerator = () => {
    if (dropdownValue !== 'all') {
      pokemonData = pokemonData
        .filter(pokemon => pokemon.types
          .some(type => type.type.name === dropdownValue));
    }
    return pokemonData.map(pokemon => {
      const isActive = activeCardID === pokemon.id;

      return (<PokemonCard key={pokemon.id}
                           id={pokemon.id}
                           image={pokemon.sprites.front_default}
                           name={pokemon.name}
                           types={pokemon.types}
                           active={isActive}
                           onClick={onShowInfoHandler}/>)
    })
  }

  const dropdownChangeHandler = (event) => {
    setActiveCardID(null);
    setDropdownValue(event.target.value);
  }

  const List = loadingInfo ? <Loader active>{loadingInfo}</Loader> : pokemonListGenerator()

  return (
    <React.Fragment>
      <div className={styles.List}>
        { dropdownData && <Dropdown options={dropdownData}
                                    value={dropdownValue}
                                    dropdownChangeHandler={dropdownChangeHandler} /> }

        <div className={styles.ListWrapper}>{ List }</div>

        <LoadButtons pokemonList={pokemonList} onLoadOther={onLoadOtherHandler} />
      </div>

      { activeCardID && <PokemonDetails activeCard={pokemonData.find(item => item.id === activeCardID)} /> }
    </React.Fragment>
  )
}

export default PokemonMain;