/**
 * List of character names to display.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { extractNumber } from '../../../helpers/utils';
import styles from './List.module.css';


const List = ({ characters }) => {
  const renderList = () => {

    if (!characters.length) {
      return (
        <div className={styles.emptyList}>
          No matches for the selected criteria
        </div>
      );
    }

    return characters.map((el) => (
      <Link 
        to={`/character/${extractNumber(el.url)}`}
        key={`character-${extractNumber(el.url)}`}
      >
        <div className={styles.listItem}>
          {el.name}
        </div>
      </Link>
    ));
  }

  return (
    <div className={styles.list}>
      {renderList()}
    </div>
  );
};

List.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

List.defaultProps = {
  people: [],
};

export default List;
