/**
 * Scene including the list of characters and the filters
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { extractNumber } from '../../helpers/utils';
import styles from './Gallery.module.css';
import {
  fetchSwapiList,
  selectLists,
  selectFilters,
} from './gallerySlice';
import Spinner from '../../components/Spinner';
import Filters from './Filters';
import List from './List';
import Title from '../../components/Title';


const Gallery = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);
  const filters = useSelector(selectFilters);
  const { people, films, species } = useSelector(selectLists);

  /* Hook to fetch all missing lists from Swapi */
  useEffect(() => {
    Object.entries(lists).forEach(([key, value]) => {
      // We can safely ignore fetching the starships list for now
      if (key === 'starships') {
        return;
      }

      if (!value) {
        dispatch(fetchSwapiList({ entity: key }));
      }
    })
  }, []);

  /**
   * Function that, given a character, checks whether it should be displayed,
   * given the filters parameters.
   * 
   * @param {Object} character  The character to test, taken from the people list
   * @returns {boolean}
   */
  const filterPeople = (character) => {
    const { film, species, from, to } = filters;
    
    // Test film select field
    if (film && !character.films.includes(film)) {
      return false;
    }

    // Test species select field
    // Add human species when the list is empty
    const humanSpecies = "https://swapi.dev/api/species/1/";
    const characterSpecies = [...character.species];
    if (!characterSpecies.length) {
      characterSpecies.push(humanSpecies);
    }
    if (species && !characterSpecies.includes(species)) {
      return false;
    }

    // Test date fields
    const { birth_year: birthYear } = character;

    // Display characters with unknown birth year only when date fields are clean
    if (birthYear === 'unknown' && (from || to)) {
      return false
    }

    const sign = birthYear.includes("BBY") ? -1 : 1;
    const year = extractNumber(birthYear) * sign;
    if ((from && year < from) || (to && year > to)) {
      return false;
    }

    return true;
  }

  return (
    <div>
      <Title />
      {!(people && films && species)
        ? <Spinner />
        : (
          <div className={styles.galleryContainer}>
            <Filters />
            <List characters={people.filter(filterPeople)} />
          </div>
        )
      }
    </div>
  );
}


export default Gallery;
