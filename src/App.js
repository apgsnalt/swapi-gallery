/**
 * Main App node.
 * Navigation with routing is defined here.
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Gallery from './scenes/Gallery';
import Detail from './scenes/Detail';


const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Gallery />} />
        <Route exact path="/character/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
