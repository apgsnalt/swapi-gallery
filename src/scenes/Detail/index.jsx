import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Detail.module.css';
import Spinner from '../../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { COUNTS } from '../../helpers/const';
import {
  fetchSwapiList,
  selectLists,
} from '../Gallery/gallerySlice';


const Detail = (s) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const characterId = Number(location.pathname.replace(/[^\d]+/g, ''))
  const lists = useSelector(selectLists);
  const { people, films, species, starships } = lists;

  // Fetch missing lists in case they're yet to be fetched
  useEffect(() => {
    Object.entries(lists).forEach(([key, value]) => {
      if (!value) {
        dispatch(fetchSwapiList({ entity: key }));
      }
    })
  }, []);

  if (!Object.values(lists).every(Boolean)) {
    return <Spinner />;
  }

  const getCharacter = () => {    
    const char = people.find((el) => el.url.includes(`/${characterId}/`));
    const charSpecies = char?.species.map((id) => species.find((el) => el.url === id)?.name);
    const charFilms = char?.films.map((id) => films.find((el) => el.url === id)?.title);
    const charStarships = char?.starships.map((id) => starships.find((el) => el.url === id)?.name);

    return {
      name: char?.name,
      species: charSpecies,
      films: charFilms,
      spaceships: charStarships,
    }
  }

  const character = getCharacter();

  return (
    <div className={styles.detail}>
      <Link to={-1}>
        Back
      </Link>
      <div
        key={`character-card-${character?.url?.replace(/[^\d]+/g, '')}`}
        className={styles.galleryItem}
      >
        Name: {character.name}
        <br />
        Species: {character.species?.join(', ') || 'Human'}
        <br />
        films: {character.films?.join(', ')}
        <br />
        SpaceShips: {character.spaceships?.join(', ') || 'None'}
      </div>     
    </div>
  );
}


export default Detail;
