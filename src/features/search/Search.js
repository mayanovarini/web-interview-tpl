import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'debounce';
import { Results } from './Results';
import {
  search,
  selectEvents,
  selectPerformers,
  selectVenues
} from './searchSlice';
import styles from './Search.module.css';
import icon from './search-icon.png';

export function Search() {
  const [query, setQuery] = useState('');
  const events = useSelector(selectEvents);
  const performers = useSelector(selectPerformers);
  const venues = useSelector(selectVenues);
  const dispatch = useDispatch();

  // Wait for one second of inactivity by wrapping handler in debounce.
  // Prevents API from being called on every keystroke, which can cause performance problems.
  const debounceSearch = useMemo(() => debounce(() => {
    dispatch(search(query));
  }, 1000), [query, dispatch]);

  useEffect(() => {
    debounceSearch()
  }, [debounceSearch]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const showResults = !!(query && (events.length || performers.length || venues.length));

  const iconStyle = {
    background: `url(${icon}) no-repeat 5px center`,
    backgroundSize: '30px 30px'
  };

  return (
    <div className={styles.search}>
      <input onChange={handleChange} value={query} style={iconStyle} />
      { showResults && <Results {...{ events, performers, venues }} /> }
    </div>
  );
}
