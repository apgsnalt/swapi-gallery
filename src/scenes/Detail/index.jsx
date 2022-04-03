/**
 * Component displaying some details about the chosen character.
 */

import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import styles from './Detail.module.css';
import {
  fetchSwapiList,
  selectLists,
} from '../Gallery/gallerySlice';
import Title from '../../components/Title';
import Spinner from '../../components/Spinner';


const Detail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const characterId = location.pathname.replace(/^\/character\//, '');
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
    return (
      <div>
        <Title /> 
        <Spinner />
      </div>
    );
  }

  const character = (() => {    
    const char = people.find((el) => el.url.includes(`people/${characterId}/`));
    if (!char) {
      return null;
    }

    const charSpecies = char.species.map((id) => species.find((el) => el.url === id).name);
    const charFilms = char.films.map((id) => films.find((el) => el.url === id).title);
    const charStarships = char.starships.map((id) => starships.find((el) => el.url === id).name);

    return {
      name: char.name,
      species: charSpecies,
      films: charFilms,
      spaceships: charStarships,
    }
  })();

  if (!characterId || !character) {
    return (
      <div>
        <Title /> 
        <div className={classnames([styles.detail, styles.detailNotFound])}>
          Character not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <Title />
      <div className={styles.detail}>
        <div className={styles.galleryItem}>
          <p>
            <strong>Name:</strong> {character.name}
          </p>
          <p>
            <strong>Species:</strong> {character.species.join(', ') || 'Human'}
          </p>
          <p>
            <strong>Movies:</strong> {character.films.join(', ')}
          </p>
          <p>
            <strong>Spaceships:</strong> {character.spaceships.join(', ') || 'None'}
          </p>
        </div>
        <Link to={-1}>
          &#9665; Back
        </Link>
      </div>
    </div>
  );
}


export default Detail;
