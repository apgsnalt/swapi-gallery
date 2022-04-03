/**
 * Spinner component for loading sessions
 */

import styles from './Spinner.module.css';


const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner} />
  </div>
)

export default Spinner;
