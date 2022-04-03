import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Gallery.module.css';
import {
  fetchSwapiList,
  selectLists,
} from './gallerySlice';
import Spinner from '../../components/Spinner';

const Gallery = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);
  const { people, films, species } = useSelector(selectLists);

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

  if (!(people && films && species)) {
    return <Spinner />;
  }

  return (
    <div className={styles.gallery}>
      {people.map((el) => (
        <Link 
          to={`/character/${el.url.replace(/[^\d]+/g, '')}`}
          key={`character-${el.url.replace(/[^\d]+/g, '')}`}
        >
          <div className={styles.galleryItem}>
            {el.name}
          </div>
        </Link>
      ))}
    </div>
  );
}


export default Gallery;
