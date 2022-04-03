import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Filters.module.css';
import {
  selectLists,
  selectFilters,
  setFilters,
} from '../gallerySlice';
import SelectField from '../../../components/Fields/SelectField';
import YearField from '../../../components/Fields/YearField';

const Gallery = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const lists = useSelector(selectLists);
  const hasDateError = Number(filters.from || Number.NEGATIVE_INFINITY) > Number(filters.to || Number.POSITIVE_INFINITY);

  return (
    <form action="" className={styles.filters}>
      <div className={styles.selectContainer}>
        <SelectField
          name="film"
          value={filters.film}
          list={lists.films}
          onChange={(e) => dispatch(setFilters({ film: e.target.value }))}
        />
        <SelectField
          name="species"
          value={filters.species}
          list={lists.species}
          onChange={(e) => dispatch(setFilters({ species: e.target.value }))}
        />
      </div>
      <div className={styles.inputContainer}>
        Birth date (BY = 0)
        <div className={styles.inputFields}>
          <YearField
            name="from"
            value={filters.from}
            onChange={(e) => dispatch(setFilters({ from: e.target.value }))}
          />
          <YearField
            name="to"
            value={filters.to}
            onChange={(e) => dispatch(setFilters({ to: e.target.value }))}
          />

        </div>
        {hasDateError && (
          <div id={styles.dateError}>
            Error: <em>Birthdate from</em> cannot be larger than <em>Birthdate to</em>
          </div>
        )}
      </div>
    </form>
  );
}

export default Gallery;