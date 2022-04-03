/**
 * Module where utility functions are collected.
 */

import { SWAPI_LIMIT, COUNTS } from "./const";

/**
 * Fetch a complete list from the Star Wars API.
 *
 * Swapi has a limit of 10 returned elements per call. Since we need all characters to have
 * the application work the way it was intended, the idea is to make parallel calls and merge the results.
 * This can be performed through Promise.all, although this technique should be used sparingly as servers
 * may be susceptible to high rates of traffic and potentially block users. Naturally, this is ok
 * for a PoC like this project, but for production applications, a standard pagination/infinite scroll solution
 * with filtering parameters should be preferred.
 *
 * The total amount of elements is retrieved as a constant since this value hardly changes over time. 
 * For dynamic lists, it is advisable to "prefetch", e.g. get the first page and use the "count" value returned
 * to initialize the 'urls' array (possibly skipping the first page fetch). I didn't implement this solution
 * because it slows down the fetching process and adds code complexity.
 *
 * @param {String} entity       The type of entity to fetch (people, species, etc.)
 */
export const fetchList = ({ entity }) => {
  const pages = Math.ceil(COUNTS[entity] / SWAPI_LIMIT);
  const urls = new Array(pages).fill().map((_, i) => i + 1)
    .map(page => `https://swapi.dev/api/${entity}/?page=${page}`);

  return Promise.all(urls.map(url => fetch(url).then(r => r.json())))
    .then(r => r.map(page => page.results).filter(Boolean))
    .then(r => new Promise((resolve) => resolve({ [entity]: r.flat() })));
};

/**
 * Function to extract a number from a string (typically a URL).
 * 
 * @param {String} s    The string to parse 
 * @returns {Number}    The number that has been parsed (0 if not found)
 */
export const extractNumber = (s) => Number(s.replace(/[^\d]+/g, ''));
