import { useEffect, useState } from 'react';
import styles from '../../styles/EpisodeDetail.module.css';

const EpisodeDetail = ({ episode }) => {
    return (
        <div>
            <h1>{episode.name}</h1>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
            <p>Url: {episode.url}</p>
            <p>Created: {episode.created}</p>
        </div>
    );
};

export default EpisodeDetail;

export async function getServerSideProps({ query }) {
    const { id } = query;
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    const episode = await res.json();

    return {
        props: {
            episode,
        },
    };
    <style jsx global>{`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
        background-image: url('https://wallpapers.com/images/hd/rick-and-morty-unamused-rick-agpuysmhk3lhdl4p.jpg');

background-position: center;
background-size: cover;

    }

    * {
      box-sizing: border-box;
    }
  `}</style>
}
