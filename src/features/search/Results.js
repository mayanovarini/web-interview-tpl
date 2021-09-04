import React from 'react';
import styles from './Results.module.css';

const Item = ({ image_url, title, subtitle }) => (
  <li className={styles.item}>
    <img src={image_url} width="32" height="32" alt={title} />
    <div className={styles.description}>
      <div className={styles.title}>{ title }</div>
      <div className={styles.subtitle}>{ subtitle }</div>
    </div>
  </li>
);

export function Results(props) {
  const { events = [], performers = [], venues = [] } = props;

  // Take the first three results from each entity.
  const firstEvents = events.slice(0, 3);
  const firstPerformers = performers.slice(0, 3);
  const firstVenues = venues.slice(0, 3);

  return (
    <ul className={styles.results}>
      {firstEvents.map(({ event, venue, performers: [ firstPerformer ] }) => (
        <Item
          key={event.id}
          image_url={firstPerformer.hero_image_url}
          title={event.name}
          subtitle={venue.name}
        />
      ))}
      {firstPerformers.map(({ id, hero_image_url, name, category }) => (
        <Item
          key={id}
          image_url={hero_image_url}
          title={name}
          subtitle={category.toUpperCase()}
        />
      ))}
      {firstVenues.map(({ id, image_url, name, city }) => (
        <Item
          key={id}
          image_url={image_url}
          title={name}
          subtitle={city}
        />
      ))}
    </ul>
  );
}
